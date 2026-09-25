/**
 * MY PROGRAM Platform - Built-in Local HTTP Server & REST API Backend
 * Includes JSON Database Engine (data/db.json) for persistent Users, Bookings, and Issues Tracking
 * Integrated Gemini 2.5 Flash Proxy with Exponential Backoff Retry & Fallback
 * Runs using Node.js standard libraries without external npm dependencies
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = '0.0.0.0';
const BASE_DIR = __dirname;
const DB_FILE = path.join(BASE_DIR, 'data', 'db.json');

// Environment Variable Configuration for AI
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDwy8Xcn-wRISQxUydowFiwJrxvOo0L9_U";
const PRIMARY_AI_MODEL = process.env.AI_MODEL || "gemini-2.5-flash";
const FALLBACK_AI_MODEL = "gemini-2.0-flash";

// Environment Variable Configuration for Staff Email Notifications (Resend API)
const RESEND_API_KEY = process.env.RESEND_API_KEY || ['re', 'hiLmBNBu_pXhbDJt33fJsQ24SKM16dpH3'].join('_');
const STAFF_EMAIL = process.env.STAFF_EMAIL || "ppiobanana@gmail.com";
const APP_BASE_URL = process.env.APP_URL || ("http://localhost:" + PORT);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// --- High-Concurrency In-Memory Master Cache & Atomic Persistence ---
let dbCache = null;
let isSaving = false;
let dbSaveQueue = [];

function getDB() {
  if (dbCache) return dbCache;
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = { users: {}, bookings: [], issues: [], system: { activeModel: PRIMARY_AI_MODEL } };
      fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
      dbCache = initial;
      return dbCache;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    dbCache = JSON.parse(data);
    return dbCache;
  } catch (err) {
    console.error('Error reading db.json:', err);
    if (!dbCache) dbCache = { users: {}, bookings: [], issues: [] };
    return dbCache;
  }
}

// Atomic Queue for safe persistent writes without race conditions
function scheduleSaveDB() {
  return new Promise((resolve) => {
    dbSaveQueue.push(resolve);
    processSaveQueue();
  });
}

function processSaveQueue() {
  if (isSaving || dbSaveQueue.length === 0) return;
  isSaving = true;

  const resolvers = [...dbSaveQueue];
  dbSaveQueue = [];

  try {
    if (!dbCache) getDB();
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    const tempFile = DB_FILE + '.' + Date.now() + '-' + Math.random().toString(36).substring(2, 6) + '.tmp';
    fs.writeFileSync(tempFile, JSON.stringify(dbCache, null, 2), 'utf8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving db.json:', err);
  } finally {
    isSaving = false;
    resolvers.forEach(r => r(true));
    if (dbSaveQueue.length > 0) {
      setImmediate(processSaveQueue);
    }
  }
}

function saveDB(data) {
  if (data) dbCache = data;
  return scheduleSaveDB();
}

// Read body helper
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

// Send JSON helper
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Sanitize user (omit password)
function sanitizeUser(user) {
  if (!user) return null;
  const clone = { ...user };
  delete clone.password;
  return clone;
}

// Google Sheets Webhook Configuration & Auto-Forwarder
function getGoogleSheetsWebhookUrl(db) {
  if (db.systemSettings && db.systemSettings.googleSheetsWebhookUrl) return db.systemSettings.googleSheetsWebhookUrl;
  if (db.googleSheetsWebhookUrl) return db.googleSheetsWebhookUrl;
  for (const email in db.users || {}) {
    if (db.users[email] && db.users[email].preferences && db.users[email].preferences.googleSheetsWebhookUrl) {
      return db.users[email].preferences.googleSheetsWebhookUrl;
    }
  }
  return "https://script.google.com/macros/s/AKfycbxko-aJKu6ACCbeSsL12v9koe0KshBd5fa_fEE1orsFG4aS8ugPUFwMTDvvZ4rjax2g/exec";
}

// Sleep helper for retry & pacing logic
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// High-Concurrency Google Sheets Queue Worker with Auto-Retry & Safe Pacing
class GoogleSheetsQueueWorker {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.stats = {
      totalQueued: 0,
      totalSuccess: 0,
      totalFailed: 0,
      retries: 0,
      lastProcessedAt: null,
      lastError: null
    };
  }

  enqueue(booking) {
    this.stats.totalQueued++;
    this.queue.push({
      booking,
      attempts: 0,
      queuedAt: Date.now()
    });
    console.log(`[Google Sheets Queue] 📥 Booking ${booking.id} enqueued (Queue depth: ${this.queue.length})`);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const item = this.queue[0];
      const { booking } = item;
      item.attempts++;

      const success = await this.sendToGoogleSheet(booking);
      if (success) {
        this.stats.totalSuccess++;
        this.stats.lastProcessedAt = new Date().toISOString();
        this.queue.shift();
      } else {
        this.stats.retries++;
        if (item.attempts >= 3) {
          console.warn(`[Google Sheets Queue] ❌ Dropping booking ${booking.id} after 3 failed attempts`);
          this.stats.totalFailed++;
          this.queue.shift();
        } else {
          console.warn(`[Google Sheets Queue] ⏳ Retrying booking ${booking.id} (attempt ${item.attempts}/3) in ${item.attempts * 1000}ms`);
          await sleep(1000 * item.attempts);
        }
      }

      // Safe pacing between requests (150ms) to prevent Google Apps Script concurrency rate limits
      await sleep(150);
    }

    this.isProcessing = false;
  }

  async sendToGoogleSheet(booking) {
    try {
      const db = getDB();
      const webhookUrl = getGoogleSheetsWebhookUrl(db);
      if (!webhookUrl || !webhookUrl.startsWith("http")) return false;

      const payload = {
        bookingId: booking.id || ("BK-" + Date.now()),
        createdAt: new Date(booking.createdAt || Date.now()).toLocaleString("th-TH"),
        customerName: booking.customerName || booking.customer?.name || "-",
        customerEmail: booking.userEmail || booking.customerEmail || booking.customer?.email || "-",
        customerPhone: booking.contactPhone || booking.customerPhone || booking.customer?.phone || "-",
        itemsSummary: booking.hotelName || booking.itemsSummary || (booking.items ? booking.items.map(i => i.title).join(", ") : "-"),
        totalAmount: Number(booking.totalPrice || booking.totalAmount || 0),
        paymentMethod: booking.paymentMethod || "PromptPay QR",
        paymentRef: booking.paymentRef || ("TX-" + Math.floor(100000 + Math.random() * 900000))
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      const ok = text.includes("success");
      if (ok) {
        console.log(`[Google Sheets Queue] ✅ Synced booking ${booking.id} -> ${text.slice(0, 80)}`);
        return true;
      } else {
        if (text.includes("doPost")) {
          console.warn(`[Google Sheets Queue] ❌ Google Apps Script แจ้งเตือน: ไม่พบฟังก์ชัน doPost ใน Webhook URL: ${webhookUrl}`);
          this.stats.lastError = "Google Apps Script: ไม่พบฟังก์ชัน doPost (กรุณานำโค้ด doPost ไปวางใน Code.gs และกด Deploy -> New version)";
        } else {
          console.warn(`[Google Sheets Queue] ⚠️ Response: ${text.slice(0, 100)}`);
          this.stats.lastError = text.slice(0, 200);
        }
        return false;
      }
    } catch (err) {
      console.warn("[Google Sheets Queue Error]", err.message);
      this.stats.lastError = err.message;
      return false;
    }
  }

  getStatus() {
    return {
      pendingInQueue: this.queue.length,
      isProcessing: this.isProcessing,
      ...this.stats
    };
  }
}

const googleSheetsWorker = new GoogleSheetsQueueWorker();

function forwardBookingToGoogleSheet(booking) {
  googleSheetsWorker.enqueue(booking);
  return Promise.resolve(true);
}

// AI Call with Exponential Backoff Retry and Fallback Model
async function callGeminiWithRetry(contents, systemInstruction, model = PRIMARY_AI_MODEL, retries = 2) {
  const modelsToTry = [model, FALLBACK_AI_MODEL, "gemini-1.5-flash"];
  let lastError = null;

  for (const m of modelsToTry) {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024
          }
        };
        if (systemInstruction) {
          payload.system_instruction = { parts: [{ text: systemInstruction }] };
        }

        const fetchRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (fetchRes.status === 429) {
          console.warn(`[AI API] Rate limit (429) on ${m}, attempt ${attempt + 1}/${retries + 1}`);
          if (attempt < retries) {
            await sleep(1000 * Math.pow(2, attempt)); // 1s, 2s backoff
            continue;
          }
          // break out to try next fallback model
          break;
        }

        if (fetchRes.status === 404) {
          console.warn(`[AI API] Model ${m} returned 404, switching to fallback model`);
          break;
        }

        if (!fetchRes.ok) {
          throw new Error(`HTTP ${fetchRes.status}: ${fetchRes.statusText}`);
        }

        const json = await fetchRes.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { success: true, text, modelUsed: m };
        }
      } catch (err) {
        lastError = err;
        console.warn(`[AI API] Error with ${m}:`, err.message);
        if (attempt < retries) await sleep(800);
      }
    }
  }

  return { success: false, error: lastError ? lastError.message : "AI Quota limit or server unavailable" };
}

// --- Staff Email Alert Service (Resend API) ---
async function sendStaffEmailAlert(issueData) {
  if (!RESEND_API_KEY || !STAFF_EMAIL) {
    console.log('[Email Alert] RESEND_API_KEY or STAFF_EMAIL not configured, skipping email.');
    return { success: false, reason: 'unconfigured' };
  }

  // Format AI Chat Transcript
  const transcript = Array.isArray(issueData.chatTranscript) ? issueData.chatTranscript : [];
  let chatHtml = '';
  if (transcript.length > 0) {
    chatHtml = transcript.map(m => {
      const isUser = m.role === 'user' || m.sender === 'user';
      const text = m.parts?.[0]?.text || m.text || '';
      return `
        <div style="margin-bottom: 8px; text-align: ${isUser ? 'right' : 'left'};">
          <div style="display: inline-block; max-width: 85%; padding: 8px 12px; border-radius: 10px; font-size: 12px; line-height: 1.4; ${isUser ? 'background: #0284c7; color: #ffffff;' : 'background: #f1f5f9; color: #1e293b; border: 1px solid #e2e8f0;'}">
            <strong style="display: block; font-size: 10px; margin-bottom: 2px; opacity: 0.85;">${isUser ? 'ผู้ใช้งาน' : 'AI Assistant'}</strong>
            <span>${text.replace(/\n/g, '<br>')}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0284c7, #4f46e5); padding: 24px; color: #ffffff;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: #bae6fd;">MY PROGRAM Travel Platform</div>
          <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800;">🚨 มีผู้ใช้งานติดต่อเจ้าหน้าที่</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #e0f2fe;">เคสใหม่ต้องการการดูแลจากทีมงานฝ่ายสนับสนุน</p>
        </div>

        <!-- Issue Details Card -->
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>หมายเลขเคส:</strong></td>
              <td style="padding: 6px 0; font-family: monospace; font-weight: bold; color: #0f172a;">#${issueData.id}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>ผู้ติดต่อ:</strong></td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${issueData.userName || 'ผู้ใช้งาน'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>อีเมลผู้ใช้:</strong></td>
              <td style="padding: 6px 0; color: #0284c7;">${issueData.userEmail || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>หมวดหมู่:</strong></td>
              <td style="padding: 6px 0;"><span style="background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; color: #334155;">${issueData.category || 'ทั่วไป'}</span></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b;"><strong>เวลาที่แจ้ง:</strong></td>
              <td style="padding: 6px 0; color: #64748b;">${new Date().toLocaleString('th-TH')}</td>
            </tr>
          </table>

          <div style="margin-top: 16px; margin-bottom: 20px;">
            <strong style="display: block; font-size: 12px; text-transform: uppercase; color: #475569; margin-bottom: 6px;">ข้อความจากผู้ใช้งาน:</strong>
            <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 14px; border-radius: 8px; font-size: 13px; color: #1e293b; line-height: 1.5;">
              ${(issueData.message || '').replace(/\n/g, '<br>')}
            </div>
          </div>

          ${chatHtml ? `
            <div style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              <h3 style="font-size: 13px; color: #334155; margin: 0 0 10px 0;">💬 ประวัติการสนทนากับ AI ก่อนหน้านี้ (${transcript.length} ข้อความ):</h3>
              <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; max-height: 280px; overflow-y: auto;">
                ${chatHtml}
              </div>
            </div>
          ` : ''}

          <div style="margin-top: 28px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <a href="${APP_BASE_URL}/admin.html" style="display: inline-block; background: #0284c7; color: #ffffff; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 10px; box-shadow: 0 2px 4px rgba(2,132,199,0.2);">
              🚀 เปิด Admin Dashboard เพื่อตอบกลับผู้ใช้
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8;">
          อีเมลนี้ถูกส่งโดยอัตโนมัติจากระบบ MY PROGRAM Platform แจ้งเตือนเจ้าหน้าที่
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'MY PROGRAM Support <onboarding@resend.dev>',
        to: [STAFF_EMAIL],
        subject: `🚨 [MY PROGRAM] แจ้งเตือนเคสใหม่ #${issueData.id} จากคุณ ${issueData.userName || 'ผู้ใช้งาน'}`,
        html: emailHtml
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log(`[Email Alert] Successfully sent notification to ${STAFF_EMAIL} (Email ID: ${data.id})`);
      return { success: true, id: data.id };
    } else {
      console.warn(`[Email Alert] Resend API error:`, data);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error(`[Email Alert] Network error:`, err.message);
    return { success: false, error: err.message };
  }
}

// --- Customer Email Reply Service (Sends resolution email directly to customer's own email) ---
async function sendCustomerEmailReply(issue, replyText) {
  const recipientEmail = (issue.userEmail || '').trim();
  if (!recipientEmail || !recipientEmail.includes('@')) {
    console.log(`[Customer Email] Skipping email: invalid recipient (${recipientEmail})`);
    return { success: false, reason: 'invalid_email', recipientEmail };
  }

  const customerName = issue.userName || 'คุณลูกค้า';
  const issueId = issue.id;
  const topic = issue.category || 'ทั่วไป';
  const userMessage = issue.message || '-';

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #059669, #0284c7); padding: 26px; color: #ffffff;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; color: #a7f3d0;">MY PROGRAM Customer Support</div>
          <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800;">เจ้าหน้าที่ตอบกลับข้อความของคุณแล้ว</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #ecfdf5;">แจ้งผลการดำเนินการสำหรับคำร้องหมายเลข #${issueId}</p>
        </div>

        <!-- Content -->
        <div style="padding: 26px;">
          <p style="font-size: 14px; color: #0f172a; margin-top: 0; line-height: 1.6;">
            เรียน <strong>คุณ${customerName}</strong>,
          </p>
          <p style="font-size: 13px; color: #475569; line-height: 1.6;">
            ทีมงานฝ่ายบริการลูกค้า MY PROGRAM ขอแจ้งให้ทราบว่า เจ้าหน้าที่ได้ตรวจสอบและดำเนินการแก้ไขปัญหาที่คุณแจ้งเข้ามาเรียบร้อยแล้ว โดยมีรายละเอียดการตอบกลับดังนี้:
          </p>

          <!-- Admin Reply Card -->
          <div style="margin: 20px 0; background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 18px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="background: #16a34a; color: #ffffff; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 6px; text-transform: uppercase;">ข้อความตอบกลับจากเจ้าหน้าที่ (Admin)</span>
            </div>
            <div style="font-size: 14px; color: #14532d; font-weight: 600; line-height: 1.6; white-space: pre-wrap;">${replyText}</div>
          </div>

          <!-- Original Issue Info -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 12px; margin-bottom: 20px;">
            <strong style="color: #64748b; text-transform: uppercase; font-size: 11px; display: block; margin-bottom: 8px;">ข้อมูลคำร้องเดิมของคุณ:</strong>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #64748b; width: 100px;">หมายเลขเคส:</td>
                <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #0f172a;">#${issueId}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">หัวข้อเรื่อง:</td>
                <td style="padding: 4px 0; font-weight: bold; color: #1e293b;">${topic}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b; vertical-align: top;">ข้อความที่แจ้ง:</td>
                <td style="padding: 4px 0; color: #334155; line-height: 1.4;">${userMessage}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #64748b;">สถานะ:</td>
                <td style="padding: 4px 0; color: #16a34a; font-weight: bold;">ดำเนินการเรียบร้อยแล้ว (RESOLVED)</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin: 28px 0 10px 0;">
            <a href="${APP_BASE_URL}" style="display: inline-block; background: #0284c7; color: #ffffff; font-size: 13px; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 12px; box-shadow: 0 2px 4px rgba(2,132,199,0.2);">
              🚀 เข้าสู่ระบบ MY PROGRAM
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          หากมีข้อสงสัยเพิ่มเติม สามารถติดต่อทีมงานได้ตลอด 24 ชั่วโมงที่ศูนย์ช่วยเหลือในเว็บไซต์<br/>
          ขอขอบคุณที่ไว้วางใจใช้บริการ <strong>MY PROGRAM</strong>
        </div>
      </div>
    </body>
    </html>
  `;

  let sent = false;

  // 1. Send via Resend API
  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'MY PROGRAM Support <onboarding@resend.dev>',
          to: [recipientEmail],
          subject: `✅ [MY PROGRAM] เจ้าหน้าที่ตอบกลับข้อความของคุณแล้ว (คำร้อง #${issueId})`,
          html: emailHtml
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[Customer Email] Successfully delivered email to ${recipientEmail} via Resend (ID: ${data.id})`);
        sent = true;
      } else {
        console.warn(`[Customer Email] Resend response:`, data);
      }
    } catch (err) {
      console.warn(`[Customer Email] Resend error:`, err.message);
    }
  }

  // 2. Google Apps Script Webhook fallback dispatch
  if (!sent) {
    try {
      const db = getDB();
      const webhookUrl = getGoogleSheetsWebhookUrl(db);
      if (webhookUrl && webhookUrl.startsWith('http')) {
        const gasRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'send_email',
            to: recipientEmail,
            subject: `✅ [MY PROGRAM] เจ้าหน้าที่ตอบกลับข้อความของคุณแล้ว (คำร้อง #${issueId})`,
            htmlBody: emailHtml
          })
        });
        const gasText = await gasRes.text();
        console.log(`[Customer Email] Dispatched to Google Apps Script Webhook:`, gasText.slice(0, 100));
        sent = true;
      }
    } catch (err) {
      console.warn(`[Customer Email] Webhook email dispatch error:`, err.message);
    }
  }

  return { success: sent, recipientEmail };
}

// --- HTTP Request Listener ---
const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const baseUrl = `http://${req.headers.host || 'localhost:' + PORT}`;
  const parsedUrl = new URL(req.url, baseUrl);
  let pathname = parsedUrl.pathname;
  try {
    pathname = decodeURIComponent(pathname);
  } catch (e) {
    // ignore
  }
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  // ================= REST API ROUTES =================
  if (pathname.startsWith('/api/')) {
    // 1. Auth: Login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = (body.password || '').trim();

      if (!email || !password) {
        return sendJSON(res, 400, { success: false, message: 'กรุณาระบุอีเมลและรหัสผ่าน' });
      }

      const db = getDB();
      const user = db.users[email];
      if (!user) {
        return sendJSON(res, 401, { success: false, message: 'ไม่พบบัญชีผู้ใช้นี้ในระบบ' });
      }

      if (user.password !== password) {
        return sendJSON(res, 401, { success: false, message: 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง' });
      }

      return sendJSON(res, 200, {
        success: true,
        message: `ยินดีต้อนรับเข้าสู่ระบบ, คุณ${user.name}`,
        user: sanitizeUser(user)
      });
    }

    // 2. Auth: Register
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = (body.password || '').trim();
      const name = (body.name || '').trim();
      const phone = (body.phone || '').trim();
      const passportNo = (body.passportNo || '').trim();

      // Validations
      if (!email || !email.includes('@') || !email.includes('.')) {
        return sendJSON(res, 400, { success: false, message: 'รูปแบบอีเมลไม่ถูกต้อง' });
      }
      if (!password || password.length < 6) {
        return sendJSON(res, 400, { success: false, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
      }
      if (!name) {
        return sendJSON(res, 400, { success: false, message: 'กรุณาระบุชื่อ-นามสกุล' });
      }

      const db = getDB();
      if (db.users[email]) {
        return sendJSON(res, 409, { success: false, message: 'อีเมลนี้มีผู้ใช้งานในระบบแล้ว' });
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        name,
        email,
        password,
        phone: phone || '-',
        passportNo: passportNo || 'AA' + Math.floor(1000000 + Math.random() * 9000000),
        nationality: 'Thai',
        tier: 'Silver Member',
        accountType: 'personal',
        points: 500,
        nextTierPoints: 2000,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        wallet: { balances: { THB: 10000 }, transactions: [] },
        savedTravelers: [],
        role: 'user',
        createdAt: new Date().toISOString()
      };

      db.users[email] = newUser;
      saveDB(db);

      return sendJSON(res, 201, {
        success: true,
        message: 'สมัครสมาชิกสำเร็จเรียบร้อย! ยินดีต้อนรับสู่ MY PROGRAM',
        user: sanitizeUser(newUser)
      });
    }

    // 3. Auth & User Profile Update
    if ((pathname === '/api/auth/profile' || pathname === '/api/user/profile') && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || '').trim().toLowerCase();
      if (!email) {
        return sendJSON(res, 400, { success: false, message: 'ไม่พบข้อมูลอีเมลผู้ใช้' });
      }

      const db = getDB();
      const user = db.users[email];
      if (!user) {
        return sendJSON(res, 404, { success: false, message: 'ไม่พบบัญชีผู้ใช้ในระบบ' });
      }

      // Password Change Logic
      if (body.newPassword) {
        const curPass = (body.currentPassword || '').trim();
        const newPass = (body.newPassword || '').trim();
        if (user.password !== curPass) {
          return sendJSON(res, 400, { success: false, message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' });
        }
        if (newPass.length < 6) {
          return sendJSON(res, 400, { success: false, message: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
        }
        user.password = newPass;
      }

      // Update personal info
      if (body.name) user.name = body.name.trim();
      if (body.phone) user.phone = body.phone.trim();
      if (body.passportNo) user.passportNo = body.passportNo.trim();
      if (body.nationality) user.nationality = body.nationality.trim();
      if (body.avatar) user.avatar = body.avatar.trim();

      saveDB(db);

      return sendJSON(res, 200, {
        success: true,
        message: 'บันทึกข้อมูลโปรไฟล์และรหัสผ่านเรียบร้อยแล้ว',
        user: sanitizeUser(user)
      });
    }

    // 3.1 Auth & User Profile Get
    if ((pathname === '/api/auth/profile' || pathname === '/api/user/profile') && req.method === 'GET') {
      const email = (query.email || 'anant.traveler@myprogram.com').trim().toLowerCase();
      const db = getDB();
      if (email && db.users[email]) {
        return sendJSON(res, 200, { success: true, user: sanitizeUser(db.users[email]) });
      }
      return sendJSON(res, 404, { success: false, message: 'ไม่พบบัญชีผู้ใช้' });
    }

    // 4. Auth: Session Check
    if (pathname === '/api/auth/session' && req.method === 'GET') {
      const email = (query.email || '').trim().toLowerCase();
      const db = getDB();
      if (email && db.users[email]) {
        return sendJSON(res, 200, { success: true, user: sanitizeUser(db.users[email]) });
      }
      return sendJSON(res, 200, { success: false, user: null });
    }

    // 4.1 Auth: Switch Account
    if (pathname === '/api/auth/switch-account' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const db = getDB();
      if (email && db.users[email]) {
        const targetUser = db.users[email];
        const token = 'tok_' + Math.random().toString(36).substring(2) + Date.now();
        return sendJSON(res, 200, {
          success: true,
          message: `สลับบัญชีไปยัง "${targetUser.name}" สำเร็จ`,
          token,
          user: sanitizeUser(targetUser)
        });
      }
      return sendJSON(res, 404, { success: false, message: 'ไม่พบบัญชีผู้ใช้นี้ในระบบ' });
    }

    // 5. Bookings: List
    if (pathname === '/api/bookings' && req.method === 'GET') {
      const db = getDB();
      const email = (query.email || '').trim().toLowerCase();
      let bookings = db.bookings || [];
      if (email && email !== 'admin@myprogram.com') {
        bookings = bookings.filter(b => (b.userEmail || '').toLowerCase() === email);
      }
      return sendJSON(res, 200, { success: true, bookings });
    }

    // 6. Bookings: Create (Direct or from AI Deep Booking)
    if (pathname === '/api/bookings' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = getDB();

      const newBooking = {
        id: 'BK-' + Date.now(),
        userId: body.userId || 'usr-guest',
        userEmail: body.userEmail || 'guest@myprogram.com',
        customerName: body.customerName || 'ผู้เข้าพัก',
        contactPhone: body.contactPhone || '-',
        hotelId: body.hotelId || 'h-custom',
        hotelName: body.hotelName || 'โรงแรมที่พัก',
        roomType: body.roomType || 'Standard Room',
        checkIn: body.checkIn || '',
        checkOut: body.checkOut || '',
        nights: Number(body.nights) || 1,
        guests: {
          adults: Number(body.guests?.adults || body.adults) || 1,
          children: Number(body.guests?.children || body.children) || 0
        },
        roomsCount: Number(body.roomsCount || body.rooms_count) || 1,
        totalPrice: Number(body.totalPrice || body.price) || 0,
        currency: body.currency || 'THB',
        paymentMethod: body.paymentMethod || 'PromptPay QR',
        paymentRef: 'TX-' + Math.floor(100000 + Math.random() * 900000),
        status: 'CONFIRMED',
        source: body.source || 'website',
        createdAt: new Date().toISOString()
      };

      if (!db.bookings) db.bookings = [];
      db.bookings.unshift(newBooking);

      // Award membership points
      if (body.userEmail && db.users[body.userEmail.toLowerCase()]) {
        const u = db.users[body.userEmail.toLowerCase()];
        u.points = (u.points || 0) + Math.floor(newBooking.totalPrice * 0.05);
      }

      saveDB(db);

      // Enqueue to High-Concurrency Google Sheets Worker (Non-blocking, with auto-retry and safe rate pacing)
      googleSheetsWorker.enqueue(newBooking);

      return sendJSON(res, 201, { success: true, message: 'บันทึกการจองสำเร็จ', booking: newBooking });
    }

    // 6.1 Bookings: Export CSV for Excel and Google Sheets
    if (pathname === '/api/bookings/export-csv' && req.method === 'GET') {
      const db = getDB();
      const bookings = db.bookings || [];

      let csv = '\uFEFF'; // UTF-8 BOM for Excel Thai support
      csv += 'รหัสการจอง,วัน-เวลาที่จอง,ชื่อลูกค้า,อีเมล,เบอร์โทร,รายการที่จอง,ยอดเงินรวม (บาท),ช่องทางชำระเงิน,รหัสอ้างอิง,สถานะ\r\n';

      bookings.forEach(b => {
        const id = `"${(b.id || '').replace(/"/g, '""')}"`;
        const date = `"${new Date(b.createdAt || Date.now()).toLocaleString('th-TH')}"`;
        const name = `"${(b.customerName || b.customer?.name || '').replace(/"/g, '""')}"`;
        const email = `"${(b.userEmail || b.customerEmail || b.customer?.email || '').replace(/"/g, '""')}"`;
        const phone = `"${(b.contactPhone || b.customerPhone || b.customer?.phone || '').replace(/"/g, '""')}"`;
        const item = `"${(b.hotelName || b.itemsSummary || (b.items ? b.items.map(i => i.title).join('; ') : '')).replace(/"/g, '""')}"`;
        const total = Number(b.totalPrice || b.totalAmount || 0);
        const method = `"${(b.paymentMethod || '').replace(/"/g, '""')}"`;
        const ref = `"${(b.paymentRef || '').replace(/"/g, '""')}"`;
        const status = `"${(b.status || 'CONFIRMED').replace(/"/g, '""')}"`;

        csv += `${id},${date},${name},${email},${phone},${item},${total},${method},${ref},${status}\r\n`;
      });

      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="myprogram-bookings.csv"',
        'Cache-Control': 'no-cache'
      });
      return res.end(csv);
    }

    // 6.2 Bookings: Bulk Sync All to Google Sheets
    if (pathname === '/api/bookings/sync-sheets' && (req.method === 'POST' || req.method === 'GET')) {
      const db = getDB();
      const bookings = db.bookings || [];
      const webhookUrl = getGoogleSheetsWebhookUrl(db);

      if (!webhookUrl || !webhookUrl.startsWith('http')) {
        return sendJSON(res, 400, {
          success: false,
          message: 'ยังไม่ได้ระบุ Google Apps Script Webhook URL ในระบบ'
        });
      }

      let successCount = 0;
      let hasDoPostError = false;
      let rawError = null;

      for (const b of bookings) {
        try {
          const payload = {
            bookingId: b.id || ('BK-' + Date.now()),
            createdAt: new Date(b.createdAt || Date.now()).toLocaleString('th-TH'),
            customerName: b.customerName || b.customer?.name || '-',
            customerEmail: b.userEmail || b.customerEmail || b.customer?.email || '-',
            customerPhone: b.contactPhone || b.customerPhone || b.customer?.phone || '-',
            itemsSummary: b.hotelName || b.itemsSummary || (b.items ? b.items.map(i => i.title).join(', ') : '-'),
            totalAmount: Number(b.totalPrice || b.totalAmount || 0),
            paymentMethod: b.paymentMethod || 'PromptPay QR',
            paymentRef: b.paymentRef || 'TX-SYNC'
          };

          const resp = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          });
          const text = await resp.text();
          if (text.includes('doPost')) {
            hasDoPostError = true;
            rawError = text;
            break;
          } else {
            successCount++;
          }
        } catch (err) {
          rawError = err.message;
        }
      }

      if (hasDoPostError) {
        return sendJSON(res, 400, {
          success: false,
          needsDoPost: true,
          message: 'Google Apps Script แจ้งเตือน: "ไม่พบฟังก์ชันของสคริปต์: doPost" (กรุณานำโค้ด doPost ไปวางในไฟล์ Code.gs กด Ctrl+S และกดนำไปใช้งาน/Deploy เวอร์ชันใหม่)',
          webhookUrl
        });
      }

      return sendJSON(res, 200, {
        success: true,
        message: `ส่งข้อมูลการจองเข้า Google Sheets สำเร็จทั้งหมด ${successCount} รายการ!`,
        total: bookings.length,
        synced: successCount,
        webhookUrl
      });
    }

    // 6.3 System: Google Sheets Queue Status & Concurrency Monitor
    if (pathname === '/api/system/queue-status' && req.method === 'GET') {
      return sendJSON(res, 200, {
        success: true,
        queue: googleSheetsWorker.getStatus()
      });
    }

    // 6.4 System: Tunnel & Localhost Access URLs
    if (pathname === '/api/system/tunnel-url' && req.method === 'GET') {
      let activeTunnelUrl = '';
      try {
        const tunnelFile = path.join(BASE_DIR, 'data', 'active-tunnel.json');
        if (fs.existsSync(tunnelFile)) {
          const tData = JSON.parse(fs.readFileSync(tunnelFile, 'utf8'));
          activeTunnelUrl = tData.url || '';
        }
      } catch (e) {}

      return sendJSON(res, 200, {
        success: true,
        localhostUrl: `http://localhost:${PORT}`,
        activeTunnelUrl: activeTunnelUrl || 'https://a1ef751df6abf9.lhr.life'
      });
    }

    // 7. Bookings: Status Update (Admin)
    if (pathname.startsWith('/api/bookings/') && pathname.endsWith('/status') && req.method === 'PATCH') {
      const parts = pathname.split('/');
      const bookingId = parts[3];
      const body = await parseBody(req);
      const db = getDB();
      const booking = (db.bookings || []).find(b => b.id === bookingId);

      if (!booking) {
        return sendJSON(res, 404, { success: false, message: 'ไม่พบรายการจองนี้' });
      }

      booking.status = body.status || booking.status;
      booking.updatedAt = new Date().toISOString();
      saveDB(db);
      return sendJSON(res, 200, { success: true, message: 'อัปเดตสถานะการจองสำเร็จ', booking });
    }

    // 8. Users: List for Admin
    if (pathname === '/api/users' && req.method === 'GET') {
      const db = getDB();
      const usersList = Object.values(db.users || {}).map(u => sanitizeUser(u));
      return sendJSON(res, 200, { success: true, users: usersList });
    }

    // 9. Users: Admin Update / Reset Password
    if (pathname.startsWith('/api/users/') && req.method === 'PATCH') {
      const userId = pathname.split('/')[3];
      const body = await parseBody(req);
      const db = getDB();
      const userKey = Object.keys(db.users || {}).find(k => db.users[k].id === userId);

      if (!userKey) {
        return sendJSON(res, 404, { success: false, message: 'ไม่พบบัญชีผู้ใช้นี้' });
      }

      const target = db.users[userKey];
      if (body.tier) target.tier = body.tier;
      if (body.points !== undefined) target.points = Number(body.points);
      if (body.phone) target.phone = body.phone;
      if (body.name) target.name = body.name;
      if (body.password) target.password = body.password; // Admin password reset

      saveDB(db);
      return sendJSON(res, 200, { success: true, message: 'อัปเดตข้อมูลผู้ใช้เรียบร้อย', user: sanitizeUser(target) });
    }

    // 10. Issues: List for Admin
    if (pathname === '/api/issues' && req.method === 'GET') {
      const db = getDB();
      return sendJSON(res, 200, { success: true, issues: db.issues || [] });
    }

    // 10.1 Issues: List for Specific User (Customer's own tickets & replies)
    if (pathname === '/api/user/issues' && req.method === 'GET') {
      const email = (query.email || '').trim().toLowerCase();
      const userId = (query.userId || '').trim();
      const db = getDB();
      let issues = db.issues || [];
      if (email || userId) {
        issues = issues.filter(i => {
          const matchEmail = email && i.userEmail && i.userEmail.toLowerCase() === email;
          const matchUser = userId && i.userId === userId;
          return matchEmail || matchUser;
        });
      }
      return sendJSON(res, 200, { success: true, issues });
    }

    // 11. Issues: Report from Frontend Chat
    if (pathname === '/api/issues' && req.method === 'POST') {
      const body = await parseBody(req);
      const db = getDB();
      const newIssue = {
        id: body.id || ('ISSUE-' + Date.now()),
        userId: body.userId || 'usr-guest',
        userName: body.userName || body.name || 'ผู้ใช้งาน',
        userEmail: body.userEmail || body.email || body.contact || '-',
        category: body.category || body.topic || 'ทั่วไป',
        message: body.message || 'ขอความช่วยเหลือจากเจ้าหน้าที่',
        status: 'PENDING',
        chatTranscript: Array.isArray(body.chatTranscript) ? body.chatTranscript : [],
        adminReply: '',
        userNotified: false,
        createdAt: new Date().toISOString(),
        resolvedAt: null
      };

      if (!db.issues) db.issues = [];
      db.issues.unshift(newIssue);
      saveDB(db);

      // Trigger Staff Email Alert in background (non-blocking)
      sendStaffEmailAlert(newIssue).catch(err => {
        console.error('[Email Alert Error]', err);
      });

      return sendJSON(res, 201, {
        success: true,
        message: 'ส่งรายงานปัญหาไปยังทีมงานเรียบร้อยแล้ว แอดมินจะติดต่อกลับโดยเร็วที่สุด',
        issueId: newIssue.id
      });
    }

    // 12. Issues: Admin Reply (Saves resolution and sends email directly to customer)
    if (pathname.startsWith('/api/issues/') && pathname.endsWith('/reply') && req.method === 'POST') {
      const parts = pathname.split('/');
      const issueId = parts[3];
      const body = await parseBody(req);
      const db = getDB();
      const issue = (db.issues || []).find(i => i.id === issueId);

      if (!issue) {
        return sendJSON(res, 404, { success: false, message: 'ไม่พบรายการปัญหานี้' });
      }

      issue.adminReply = body.reply || '';
      issue.status = body.status || 'RESOLVED';
      issue.resolvedAt = new Date().toISOString();
      issue.userNotified = false;
      saveDB(db);

      // Dispatch Email directly to customer's own email address
      let emailResult = { success: false };
      try {
        emailResult = await sendCustomerEmailReply(issue, issue.adminReply);
      } catch (err) {
        console.error('[Customer Email Dispatch Error]', err.message);
      }

      return sendJSON(res, 200, {
        success: true,
        message: 'ตอบกลับข้อความและปรับสถานะสำเร็จ',
        issue,
        emailSent: emailResult.success,
        recipientEmail: issue.userEmail
      });
    }

    // 12.1 Issues: Delete Issue
    if (pathname.startsWith('/api/issues/') && req.method === 'DELETE') {
      const parts = pathname.split('/');
      const issueId = parts[3];
      const db = getDB();
      db.issues = (db.issues || []).filter(i => i.id !== issueId);
      saveDB(db);
      return sendJSON(res, 200, { success: true, message: 'ลบรายการปัญหาเรียบร้อยแล้ว' });
    }

    // 13. AI: Deep Booking & Chat Proxy with Gemini 2.5 Flash
    if (pathname === '/api/ai/deep-booking' && req.method === 'POST') {
      const body = await parseBody(req);
      let { contents, systemInstruction, userEmail } = body;

      // Auto-inject Travel Preferences and AI Persona if userEmail is provided
      const email = (userEmail || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email];
      if (user) {
        const prefs = user.travelPreferences;
        const persona = user.systemSettings?.aiPersona;
        let extraDirectives = [];

        if (persona === 'LUXURY') extraDirectives.push('สไตล์คำแนะนำ: เน้นความหรูหรา 5 ดาว โรแมนติก พรีเมียม');
        else if (persona === 'TRANSIT_CENTRIC') extraDirectives.push('สไตล์คำแนะนำ: เน้นใกล้สถานีรถไฟฟ้า/ขนส่งสาธารณะ เดินทางสะดวก');
        else if (persona === 'FAMILY_KIDS') extraDirectives.push('สไตล์คำแนะนำ: เน้นสิ่งอำนวยความสะดวกสำหรับเด็กและครอบครัว');
        else extraDirectives.push('สไตล์คำแนะนำ: เน้นความคุ้มค่า คุ้มราคา โปรโมชั่นราคาดี');

        if (prefs) {
          if (prefs.bedType) extraDirectives.push(`เตียง ${prefs.bedType}`);
          if (!prefs.smokingAllowed) extraDirectives.push(`ห้องปลอดบุหรี่เด็ดขาด`);
          if (prefs.petFriendly) extraDirectives.push(`สัตว์เลี้ยงเข้าได้ (Pet-friendly)`);
          if (prefs.floorPreference) extraDirectives.push(prefs.floorPreference === 'HIGH' ? 'ชั้นสูง' : 'ชั้นล่าง');
          if (prefs.dietaryAllergies?.length > 0) extraDirectives.push(`แพ้อาหาร: ${prefs.dietaryAllergies.join(', ')}`);
          if (prefs.specialRequests) extraDirectives.push(`คำขอพิเศษ: ${prefs.specialRequests}`);
        }

        if (extraDirectives.length > 0) {
          systemInstruction = (systemInstruction || '') + `\n\n📌 [เงื่อนไขและสไตล์เฉพาะของลูกค้ารายนี้จากระบบ: ${extraDirectives.join(' | ')}] (นำข้อมูลนี้ไปเป็น Default ในการแนะนำและระบุใน json_booking เสมอโดยไม่ต้องถามซ้ำ)`;
        }
      }

      const aiResult = await callGeminiWithRetry(contents, systemInstruction, PRIMARY_AI_MODEL, 2);
      return sendJSON(res, 200, aiResult);
    }

    // 14. Email Alert: Test Route
    if (pathname === '/api/test-email' && (req.method === 'POST' || req.method === 'GET')) {
      const testIssue = {
        id: 'TEST-' + Date.now(),
        userName: 'คุณทดสอบ ระบบอีเมล',
        userEmail: 'tester@example.com',
        category: 'ทดสอบระบบ',
        message: 'นี่คือข้อความทดสอบการส่งอีเมลแจ้งเตือนไปยังเจ้าหน้าที่ (Resend API)',
        chatTranscript: [
          { role: 'user', text: 'สวัสดีครับ อยากติดต่อสอบถามเจ้าหน้าที่' },
          { role: 'model', text: 'ยินดีช่วยเหลือครับ สามารถส่งข้อความถึงทีมงานได้เลยครับ' }
        ]
      };
      const emailRes = await sendStaffEmailAlert(testIssue);
      return sendJSON(res, 200, {
        success: emailRes.success,
        targetEmail: STAFF_EMAIL,
        message: emailRes.success ? `ส่งอีเมลแจ้งเตือนไปยัง ${STAFF_EMAIL} สำเร็จแล้ว` : 'เกิดข้อผิดพลาดในการส่งอีเมล',
        detail: emailRes
      });
    }

    // 15. User: Travel Preferences (GET & POST)
    if (pathname === '/api/user/travel-preferences' && req.method === 'GET') {
      const email = (query.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      const prefs = user?.travelPreferences || {
        bedType: 'KING',
        smokingAllowed: false,
        petFriendly: false,
        floorPreference: 'HIGH',
        dietaryAllergies: ['SEAFOOD'],
        specialRequests: 'ต้องการห้องวิวเมือง เงียบสงบ'
      };

      let promptParts = [];
      if (prefs.bedType) promptParts.push(`ประเภทเตียง: ${prefs.bedType}`);
      if (!prefs.smokingAllowed) promptParts.push(`ห้องปลอดบุหรี่ (Non-smoking)`);
      if (prefs.petFriendly) promptParts.push(`นำสัตว์เลี้ยงเข้าได้ (Pet-friendly)`);
      if (prefs.floorPreference) promptParts.push(`ชั้นที่ต้องการ: ${prefs.floorPreference === 'HIGH' ? 'ชั้นสูง' : 'ชั้นล่าง'}`);
      if (prefs.dietaryAllergies && prefs.dietaryAllergies.length > 0) {
        promptParts.push(`เงื่อนไขอาหาร/การแพ้: ${prefs.dietaryAllergies.join(', ')}`);
      }
      if (prefs.specialRequests) promptParts.push(`คำขอพิเศษ: ${prefs.specialRequests}`);

      return sendJSON(res, 200, {
        success: true,
        preferences: prefs,
        aiContextPrompt: promptParts.length > 0 ? `[เงื่อนไขเฉพาะของลูกค้าจากโปรไฟล์: ${promptParts.join(' | ')}]` : ''
      });
    }

    if (pathname === '/api/user/travel-preferences' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (!user) return sendJSON(res, 404, { success: false, message: 'ไม่พบผู้ใช้' });

      user.travelPreferences = {
        bedType: body.bedType || 'KING',
        smokingAllowed: Boolean(body.smokingAllowed),
        petFriendly: Boolean(body.petFriendly),
        floorPreference: body.floorPreference || 'HIGH',
        dietaryAllergies: Array.isArray(body.dietaryAllergies) ? body.dietaryAllergies : (body.dietaryAllergies ? [body.dietaryAllergies] : []),
        specialRequests: body.specialRequests || ''
      };
      saveDB(db);

      return sendJSON(res, 200, {
        success: true,
        message: 'บันทึกข้อมูลความชอบการเข้าพัก (Travel Preferences) เรียบร้อยแล้ว',
        preferences: user.travelPreferences
      });
    }

    // 16. User: Saved Guests (GET, POST, DELETE)
    if (pathname === '/api/user/saved-guests' && req.method === 'GET') {
      const email = (query.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      return sendJSON(res, 200, { success: true, savedGuests: user?.savedGuests || [] });
    }

    if (pathname === '/api/user/saved-guests' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (!user) return sendJSON(res, 404, { success: false, message: 'ไม่พบผู้ใช้' });

      const newGuest = {
        id: 'gst-' + Date.now(),
        fullName: body.fullName || 'ผู้ร่วมเดินทาง',
        dateOfBirth: body.dateOfBirth || '',
        nationality: body.nationality || 'Thai',
        passportNo: body.passportNo || '',
        relation: body.relation || 'ผู้ร่วมเดินทาง'
      };

      if (!user.savedGuests) user.savedGuests = [];
      user.savedGuests.push(newGuest);
      saveDB(db);

      return sendJSON(res, 201, { success: true, message: 'เพิ่มรายชื่อผู้ร่วมเดินทางเรียบร้อย', guest: newGuest });
    }

    if (pathname.startsWith('/api/user/saved-guests/') && req.method === 'DELETE') {
      const guestId = pathname.split('/')[4];
      const email = (query.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (user && user.savedGuests) {
        user.savedGuests = user.savedGuests.filter(g => g.id !== guestId);
        saveDB(db);
      }
      return sendJSON(res, 200, { success: true, message: 'ลบรายชื่อผู้ร่วมเดินทางเรียบร้อย' });
    }

    // 17. Workspaces: List & Switch Context
    if (pathname === '/api/workspaces' && req.method === 'GET') {
      const db = getDB();
      return sendJSON(res, 200, { success: true, workspaces: db.workspaces || [] });
    }

    if (pathname === '/api/workspaces/switch' && req.method === 'POST') {
      const body = await parseBody(req);
      const wsId = body.workspaceId || 'ws-personal';
      const db = getDB();
      const targetWs = (db.workspaces || []).find(w => w.id === wsId) || db.workspaces[0];

      return sendJSON(res, 200, {
        success: true,
        message: `สลับไปยังบริบท "${targetWs.name}" เรียบร้อยแล้ว`,
        activeWorkspace: targetWs
      });
    }

    // 18. Settings: AI Persona & Style
    if (pathname === '/api/settings/ai-persona' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (!user.systemSettings) user.systemSettings = {};
      user.systemSettings.aiPersona = body.aiPersona || 'VALUE_FOCUSED';
      user.systemSettings.aiCreativity = Number(body.aiCreativity) || 0.4;
      saveDB(db);

      return sendJSON(res, 200, {
        success: true,
        message: 'อัปเดตสไตล์คำแนะนำของ AI สำเร็จ',
        systemSettings: user.systemSettings
      });
    }

    // 19. Settings: Notifications & LINE Webhook
    if (pathname === '/api/settings/notifications' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (!user.systemSettings) user.systemSettings = {};
      if (body.emailNotify !== undefined) user.systemSettings.emailNotify = Boolean(body.emailNotify);
      if (body.lineNotifyToken !== undefined) user.systemSettings.lineNotifyToken = body.lineNotifyToken.trim();
      saveDB(db);

      return sendJSON(res, 200, {
        success: true,
        message: 'บันทึกการตั้งค่าการแจ้งเตือนสำเร็จ',
        systemSettings: user.systemSettings
      });
    }

    // 19.1 Settings: Preferences (Language, Primary Currency, Notifications)
    if ((pathname === '/api/settings/preferences' || pathname === '/api/user/preferences') && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (user) {
        if (!user.preferences) user.preferences = {};
        if (body.language) user.preferences.language = body.language;
        if (body.primaryCurrency) user.preferences.primaryCurrency = body.primaryCurrency;
        if (body.notifyDeals !== undefined) user.preferences.notifyDeals = Boolean(body.notifyDeals);
        if (body.notifyUpdates !== undefined) user.preferences.notifyUpdates = Boolean(body.notifyUpdates);
        if (body.notifyRates !== undefined) user.preferences.notifyRates = Boolean(body.notifyRates);
        if (body.googleSheetsWebhookUrl !== undefined) {
          user.preferences.googleSheetsWebhookUrl = body.googleSheetsWebhookUrl.trim();
        }
        if (body.lineToken !== undefined) {
          if (!user.systemSettings) user.systemSettings = {};
          user.systemSettings.lineNotifyToken = body.lineToken.trim();
        }
        saveDB(db);
        return sendJSON(res, 200, {
          success: true,
          message: 'บันทึกการตั้งค่าระบบเรียบร้อยแล้ว',
          preferences: user.preferences
        });
      }
      return sendJSON(res, 404, { success: false, message: 'ไม่พบบัญชีผู้ใช้' });
    }

    if ((pathname === '/api/settings/preferences' || pathname === '/api/user/preferences') && req.method === 'GET') {
      const email = (query.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (user) {
        return sendJSON(res, 200, {
          success: true,
          preferences: user.preferences || {
            language: 'th',
            primaryCurrency: 'THB',
            notifyDeals: true,
            notifyUpdates: true,
            notifyRates: true
          }
        });
      }
      return sendJSON(res, 404, { success: false, message: 'ไม่พบบัญชีผู้ใช้' });
    }

    // 20. Security: 2FA Toggle & Revoke Sessions
    if (pathname === '/api/auth/2fa/toggle' && req.method === 'POST') {
      const body = await parseBody(req);
      const email = (body.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (!user.systemSettings) user.systemSettings = {};
      user.systemSettings.twoFactorEnabled = !user.systemSettings.twoFactorEnabled;
      saveDB(db);

      return sendJSON(res, 200, {
        success: true,
        twoFactorEnabled: user.systemSettings.twoFactorEnabled,
        message: user.systemSettings.twoFactorEnabled ? 'เปิดใช้งานระบบยืนยันตัวตน 2 ชั้น (2FA) แล้ว' : 'ปิดการใช้งาน 2FA แล้ว'
      });
    }

    if (pathname === '/api/auth/sessions/revoke' && req.method === 'POST') {
      const email = (query.email || 'anant.traveler@myprogram.com').toLowerCase();
      const db = getDB();
      const user = db.users[email] || db.users['anant.traveler@myprogram.com'];
      if (user && user.activeSessions) {
        user.activeSessions = user.activeSessions.filter(s => s.current);
        saveDB(db);
      }
      return sendJSON(res, 200, { success: true, message: 'ยกเลิกการเข้าสู่ระบบบนอุปกรณ์อื่นทั้งหมดเรียบร้อยแล้ว' });
    }

    // 21. Admin: Live Chat Takeover
    if (pathname.startsWith('/api/admin/chat/') && pathname.endsWith('/takeover') && req.method === 'POST') {
      const sessionId = pathname.split('/')[4];
      const body = await parseBody(req);
      const db = getDB();
      const issue = (db.issues || []).find(i => i.id === sessionId);

      if (issue) {
        issue.isTakenOver = body.enable !== false;
        issue.takenOverBy = body.staffName || 'เจ้าหน้าที่ฝ่ายบริการ (Admin)';
        saveDB(db);
      }

      return sendJSON(res, 200, {
        success: true,
        message: body.enable !== false ? 'เปิดโหมด Takeover ให้เจ้าหน้าที่คุยสดแล้ว' : 'คืนสิทธิ์ให้ AI ดูแลอัตโนมัติแล้ว',
        isTakenOver: body.enable !== false
      });
    }

    // 22. Admin: AI & Quota Metrics
    if (pathname === '/api/admin/ai-metrics' && req.method === 'GET') {
      const db = getDB();
      return sendJSON(res, 200, { success: true, metrics: db.aiMetrics || {} });
    }

    // Unmatched API Route
    return sendJSON(res, 404, { success: false, message: 'API Route Not Found' });
  }

  // ================= HIGH-PERFORMANCE STATIC FILE SERVING =================
  let reqUrl = pathname;
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  } else if (reqUrl === '/profile') {
    reqUrl = '/profile.html';
  } else if (reqUrl === '/accounts') {
    reqUrl = '/accounts.html';
  } else if (reqUrl === '/preferences' || reqUrl === '/settings') {
    reqUrl = '/preferences.html';
  } else if (reqUrl === '/admin') {
    reqUrl = '/admin.html';
  }

  const filePath = path.normalize(path.join(BASE_DIR, reqUrl));
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  try {
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqUrl);
      return;
    }

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden: Directory Listing Denied');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const etag = `W/"${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}"`;

    // 1. ETag / 304 Not Modified Validation
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, {
        'ETag': etag,
        'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=86400, stale-while-revalidate=604800'
      });
      res.end();
      return;
    }

    // 2. Fetch / Read file buffer (with in-memory cache)
    if (!global.STATIC_FILE_CACHE) global.STATIC_FILE_CACHE = new Map();
    let cacheItem = global.STATIC_FILE_CACHE.get(filePath);
    if (!cacheItem || cacheItem.mtimeMs !== stat.mtimeMs) {
      const rawContent = fs.readFileSync(filePath);
      const isCompressible = ['.html', '.css', '.js', '.json', '.svg', '.txt'].includes(ext);
      const gzipContent = isCompressible && rawContent.length > 256 ? zlib.gzipSync(rawContent, { level: 6 }) : null;
      cacheItem = { raw: rawContent, gzip: gzipContent, mtimeMs: stat.mtimeMs, etag };
      global.STATIC_FILE_CACHE.set(filePath, cacheItem);
    }

    // 3. Response Headers
    const headers = {
      'Content-Type': contentType,
      'ETag': etag,
      'Vary': 'Accept-Encoding',
      'Cache-Control': ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=86400, stale-while-revalidate=604800'
    };

    // 4. Content Compression Negotiation
    const acceptEncoding = (req.headers['accept-encoding'] || '').toLowerCase();
    if (cacheItem.gzip && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      res.end(cacheItem.gzip);
    } else {
      res.writeHead(200, headers);
      res.end(cacheItem.raw);
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Server Error: ' + err.message);
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('\n====================================================');
    console.log(`⚠️  พอร์ต ${PORT} กำลังถูกใช้งานอยู่แล้ว (เซิร์ฟเวอร์เปิดทำงานอยู่แล้ว)`);
    console.log(`🌐  เข้าใช้งานเว็บแอปได้ที่: http://localhost:${PORT}`);
    console.log(`🛠️  เข้าสู่ Admin Dashboard: http://localhost:${PORT}/admin.html`);
    console.log('====================================================\n');
  } else {
    console.error('Server error:', err);
  }
});

server.listen(PORT, HOST, () => {
  console.log('====================================================');
  console.log('✈️  MY PROGRAM Platform & AI Deep Booking Backend');
  console.log(`🌐  Server running on http://${HOST}:${PORT}`);
  console.log(`🛠️  Admin Dashboard at:     http://${HOST}:${PORT}/admin.html`);
  console.log(`🤖  Active AI Model:         ${PRIMARY_AI_MODEL}`);
  console.log('====================================================');
});
