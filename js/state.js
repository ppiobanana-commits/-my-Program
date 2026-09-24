/**
 * MY PROGRAM Platform - Global State Management
 * Includes User Authentication, Multi-Currency Travel Wallet, Saved Travelers, and Cart/Bookings
 */

class StateManager {
  constructor() {
    this.STORAGE_KEY = "myprogram_state_v2";
    this.listeners = [];
    this.state = this.loadState();
  }

  getDefaultUsers() {
    return {
      "anant.traveler@myprogram.com": {
        id: "usr-01",
        name: "คุณอนันต์ พิริยพงศ์",
        email: "anant.traveler@myprogram.com",
        password: "123",
        phone: "089-123-4567",
        passportNo: "AA9876543",
        nationality: "Thai",
        role: "user",
        tier: "Gold Elite",
        points: 3450,
        nextTierPoints: 5000,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        wallet: {
          balances: {
            THB: 45000,
            JPY: 85000,
            USD: 650,
            EUR: 320,
            GBP: 150,
            SGD: 400,
            KRW: 250000
          },
          transactions: [
            { id: "tx-1", type: "topup", title: "เติมเงินเข้ากระเป๋า (พร้อมเพย์)", amount: "+20,000 THB", date: "2026-03-01 10:15", status: "สำเร็จ" },
            { id: "tx-2", type: "exchange", title: "แลกเงินในกระเป๋า (THB -> JPY)", amount: "-10,000 THB -> +42,500 JPY", date: "2026-03-01 10:20", status: "สำเร็จ" },
            { id: "tx-3", type: "payment", title: "ชำระค่าที่พัก Keemala Phuket", amount: "-12,800 THB", date: "2026-03-02 14:40", status: "สำเร็จ" }
          ]
        },
        savedTravelers: [
          { id: "trv-1", name: "คุณแพรวา พิริยพงศ์", relation: "คู่สมรส", phone: "081-987-6543", passportNo: "AA8765432" },
          { id: "trv-2", name: "ด.ช. พศิน พิริยพงศ์", relation: "บุตร", phone: "-", passportNo: "AA7654321" }
        ],
        bookings: [
          {
            id: "MP-2026-9812",
            createdAt: "2026-02-28T14:30:00Z",
            status: "CONFIRMED",
            paymentMethod: "PromptPay QR",
            paymentRef: "PP-TX-892174",
            totalAmount: 18290,
            currency: "THB",
            items: [
              { type: "flight", title: "ตั๋วเครื่องบินไป-กลับ กรุงเทพฯ - ภูเก็ต (TG 208)", date: "15 มี.ค. 2026", price: 4900, quantity: 2, airline: "Thai Airways" },
              { type: "attraction", title: "ทัวร์เกาะพีพี - อ่าวมาหยา VIP สปีดโบ๊ต", date: "16 มี.ค. 2026", price: 1890, quantity: 2 },
              { type: "hotel", title: "กีมาลา ภูเก็ต (Keemala Resort) 2 คืน", date: "15-17 มี.ค. 2026", price: 12800, quantity: 1 }
            ]
          }
        ],
        wishlist: ["h-tok-1", "a-tok-1", "r-phk-1"]
      },
      "corporate@globaltravel.co.th": {
        id: "usr-corp-01",
        name: "บจก. โกลบอล ทราเวล คอร์ปอเรชั่น",
        email: "corporate@globaltravel.co.th",
        password: "123",
        phone: "02-999-8888",
        passportNo: "CORP-TH-9921",
        nationality: "Thai",
        role: "admin",
        tier: "Corporate VIP",
        accountType: "corporate",
        points: 18900,
        nextTierPoints: 25000,
        avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
        wallet: {
          balances: {
            THB: 250000,
            USD: 4500,
            EUR: 2800,
            JPY: 350000,
            GBP: 1200
          },
          transactions: [
            { id: "tx-c1", type: "topup", title: "เติมเงินวงเงินองค์กร (Bank Transfer)", amount: "+200,000 THB", date: "2026-03-05 09:00", status: "สำเร็จ" },
            { id: "tx-c2", type: "payment", title: "จองตั๋วเครื่องบิน Business Class สำหรับผู้บริหาร", amount: "-64,000 THB", date: "2026-03-06 11:30", status: "สำเร็จ" }
          ]
        },
        savedTravelers: [
          { id: "trv-c1", name: "ดร. กฤษฎา ธีรพงศ์พันธุ์", relation: "กรรมการผู้จัดการ (CEO)", phone: "081-111-2222", passportNo: "AA1122334" },
          { id: "trv-c2", name: "คุณสุชาดา เลิศวิริยะ", relation: "ผู้อำนวยการฝ่ายการเงิน (CFO)", phone: "089-333-4444", passportNo: "AA5566778" }
        ],
        bookings: [
          {
            id: "CORP-2026-010",
            createdAt: "2026-03-06T11:30:00Z",
            status: "CONFIRMED",
            paymentMethod: "Corporate Billing",
            paymentRef: "CORP-TX-9912",
            totalAmount: 64000,
            currency: "THB",
            items: [
              { type: "flight", title: "ตั๋วเครื่องบินไป-กลับ กรุงเทพฯ - โตเกียว (TG 676) Business Class", date: "20 มี.ค. 2026", price: 32000, quantity: 2, airline: "Thai Airways" }
            ]
          }
        ],
        wishlist: ["h-tok-1", "h-par-1"]
      },
      "praewa.family@myprogram.com": {
        id: "usr-fam-01",
        name: "คุณแพรวา พิริยพงศ์ (บัญชีครอบครัว)",
        email: "praewa.family@myprogram.com",
        password: "123",
        phone: "081-987-6543",
        passportNo: "AA8765432",
        nationality: "Thai",
        role: "user",
        tier: "Silver Member",
        accountType: "family",
        points: 850,
        nextTierPoints: 2000,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        wallet: {
          balances: {
            THB: 32000,
            JPY: 40000,
            SGD: 500
          },
          transactions: [
            { id: "tx-f1", type: "topup", title: "เติมเงินกระเป๋าครอบครัว (พร้อมเพย์)", amount: "+15,000 THB", date: "2026-03-03 16:20", status: "สำเร็จ" }
          ]
        },
        savedTravelers: [
          { id: "trv-f1", name: "คุณอนันต์ พิริยพงศ์", relation: "คู่สมรส", phone: "089-123-4567", passportNo: "AA9876543" },
          { id: "trv-f2", name: "ด.ช. พศิน พิริยพงศ์", relation: "บุตร", phone: "-", passportNo: "AA7654321" }
        ],
        bookings: [],
        wishlist: ["h-cnx-1", "a-phk-1"]
      },
      "admin@myprogram.com": {
        id: "usr-admin-01",
        name: "ผู้ดูแลระบบ (System Admin)",
        email: "admin@myprogram.com",
        password: "admin1234",
        phone: "02-111-9999",
        passportNo: "ADMIN001",
        nationality: "Thai",
        role: "admin",
        tier: "Super Admin",
        accountType: "admin",
        points: 99999,
        nextTierPoints: 99999,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        wallet: {
          balances: {
            THB: 999999,
            USD: 10000,
            AUD: 15000,
            EUR: 8000
          },
          transactions: []
        },
        savedTravelers: [],
        bookings: [],
        wishlist: []
      }
    };
  }

  getDefaultState() {
    const users = this.getDefaultUsers();
    const defaultUser = users["anant.traveler@myprogram.com"];
    return {
      users: users,
      // Auth State (Default: Logged in as demo user for instant accessibility)
      auth: {
        isLoggedIn: true,
        currentUser: defaultUser,
        savedTravelers: defaultUser.savedTravelers || []
      },

      // Preferences & App Settings
      preferences: {
        language: "th",
        primaryCurrency: "THB",
        notifyDeals: true,
        notifyUpdates: true,
        notifyRates: true,
        googleSheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbxko-aJKu6ACCbeSsL12v9koe0KshBd5fa_fEE1orsFG4aS8ugPUFwMTDvvZ4rjax2g/exec"
      },

      // Travel Preferences for AI Integration
      travelPreferences: {
        bedType: "KING",
        smokingAllowed: false,
        petFriendly: false,
        floorPreference: "HIGH",
        dietaryAllergies: ["SEAFOOD"],
        specialRequests: "ต้องการห้องวิวเมือง เงียบสงบ เตียงคิงไซส์"
      },

      // Saved Guests
      savedGuests: [
        { id: "gst-01", fullName: "คุณแพรวา พิริยพงศ์", dateOfBirth: "1992-05-14", nationality: "Thai", passportNo: "AA8765432", relation: "คู่สมรส" },
        { id: "gst-02", fullName: "ด.ช. พศิน พิริยพงศ์", dateOfBirth: "2018-09-20", nationality: "Thai", passportNo: "AA7654321", relation: "บุตร" }
      ],

      // Workspaces & Multi-Account Context
      workspaces: [
        { id: "ws-personal", name: "บัญชีส่วนตัว (Personal)", type: "personal", role: "owner", badgeColor: "sky", billingMethod: "Personal Travel Wallet", balance: 45000, membersCount: 1, description: "สำหรับจัดการทริปส่วนตัวและครอบครัว" },
        { id: "ws-corp", name: "บจก. โกลบอล ทราเวล (Corporate VIP)", type: "corporate", role: "admin", badgeColor: "purple", billingMethod: "Corporate Monthly Invoicing", balance: 250000, membersCount: 14, description: "เบิกจ่ายงบองค์กร ใบเสร็จกำกับภาษีเต็มรูป" },
        { id: "ws-family", name: "ครอบครัวพิริยพงศ์ (Family Workspace)", type: "family", role: "owner", badgeColor: "amber", billingMethod: "Family Shared Wallet", balance: 65000, membersCount: 4, description: "แชร์วอลเล็ทสำหรับทริปครอบครัว" }
      ],
      activeWorkspace: {
        id: "ws-personal",
        name: "บัญชีส่วนตัว (Personal)",
        type: "personal",
        role: "owner",
        badgeColor: "sky",
        billingMethod: "Personal Travel Wallet",
        balance: 45000,
        membersCount: 1
      },

      // AI Settings & Persona
      aiSettings: {
        aiPersona: "VALUE_FOCUSED",
        aiCreativity: 0.4
      },

      // Security & Sessions
      security: {
        twoFactorEnabled: false,
        activeSessions: [
          { id: "sess-01", device: "Windows 11 (Chrome 128) - เครื่องปัจจุบัน", ip: "182.53.89.243", lastActive: "เมื่อสักครู่", current: true },
          { id: "sess-02", device: "iPhone 15 Pro (Safari Mobile)", ip: "182.53.90.112", lastActive: "2 ชั่วโมงที่แล้ว", current: false }
        ]
      },

      // Multi-Currency Travel Wallet
      wallet: defaultUser.wallet || {
        balances: { THB: 45000, JPY: 85000, USD: 650 },
        transactions: []
      },

      // Cart & Bookings
      cart: [],
      wishlist: defaultUser.wishlist || [],
      bookings: defaultUser.bookings || [],
      appliedCoupon: null,
      displayCurrency: "THB"
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const def = this.getDefaultState();
      if (saved) {
        const loaded = JSON.parse(saved);
        const userPool = { ...def.users, ...(loaded.users || {}) };
        const activeEmail = loaded.auth?.currentUser?.email || "anant.traveler@myprogram.com";
        const currentUser = userPool[activeEmail] || def.auth.currentUser;
        const isLoggedIn = loaded.auth?.isLoggedIn !== false;

        return {
          ...def,
          ...loaded,
          users: userPool,
          preferences: { ...def.preferences, ...(loaded.preferences || {}) },
          auth: {
            isLoggedIn: isLoggedIn,
            currentUser: isLoggedIn ? currentUser : null,
            savedTravelers: currentUser?.savedTravelers || []
          }
        };
      }
    } catch (e) {
      console.warn("Could not load state:", e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save state:", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this.state); } catch (e) { console.error("Listener error:", e); }
    });
  }

  // --- Auth Actions ---
  async login(email, password, profileName) {
    const key = (email || "").trim().toLowerCase();
    if (!key) return { success: false, message: "กรุณาระบุอีเมล" };

    // 1. Try Backend REST API first
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: key, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
      }

      const userRecord = data.user;
      this.state.auth.isLoggedIn = true;
      this.state.auth.currentUser = userRecord;
      this.state.auth.savedTravelers = userRecord.savedTravelers || [];
      this.state.wallet = userRecord.wallet || { balances: { THB: 10000 }, transactions: [] };
      if (!this.state.users) this.state.users = this.getDefaultUsers();
      this.state.users[key] = { ...this.state.users[key], ...userRecord };
      this.saveState();
      return { success: true, message: data.message || `ยินดีต้อนรับเข้าสู่ระบบ, ${userRecord.name}!` };
    } catch (netErr) {
      console.warn("Backend Auth API offline, using local fallback:", netErr);
    }

    // 2. Local Fallback
    if (!this.state.users) this.state.users = this.getDefaultUsers();
    let userRecord = this.state.users[key];
    if (!userRecord) {
      const displayName = profileName || (email.includes("@") ? email.split("@")[0] : email);
      userRecord = {
        id: "usr-" + Date.now(),
        name: displayName,
        email: email,
        password: password || "123456",
        phone: "081-000-0000",
        passportNo: "AA" + Math.floor(1000000 + Math.random() * 9000000),
        nationality: "Thai",
        tier: "Silver Member",
        points: 500,
        nextTierPoints: 2000,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        wallet: { balances: { THB: 10000 }, transactions: [] },
        savedTravelers: [],
        bookings: [],
        wishlist: []
      };
      this.state.users[key] = userRecord;
    }

    this.state.auth.isLoggedIn = true;
    this.state.auth.currentUser = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      phone: userRecord.phone,
      passportNo: userRecord.passportNo,
      nationality: userRecord.nationality || "Thai",
      tier: userRecord.tier || "Member",
      points: userRecord.points || 0,
      nextTierPoints: userRecord.nextTierPoints || 2500,
      avatar: userRecord.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    };
    this.state.auth.savedTravelers = userRecord.savedTravelers || [];
    this.state.wallet = userRecord.wallet || { balances: { THB: 0 }, transactions: [] };
    this.state.bookings = userRecord.bookings || [];
    this.state.wishlist = userRecord.wishlist || [];

    this.saveState();
    return { success: true, message: `ยินดีต้อนรับเข้าสู่ระบบ, ${this.state.auth.currentUser.name}!` };
  }

  async register({ name, email, phone, passportNo, password }) {
    const key = (email || "").trim().toLowerCase();
    if (!key) return { success: false, message: "กรุณาระบุอีเมล" };
    if (!password || password.length < 6) return { success: false, message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" };

    // 1. Try Backend REST API first
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: key, phone, passportNo, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "ไม่สามารถสมัครสมาชิกได้" };
      }

      const newUser = data.user;
      this.state.auth.isLoggedIn = true;
      this.state.auth.currentUser = newUser;
      this.state.auth.savedTravelers = [];
      this.state.wallet = { balances: { THB: 10000 }, transactions: [] };
      this.state.bookings = [];
      this.state.wishlist = [];

      if (!this.state.users) this.state.users = this.getDefaultUsers();
      this.state.users[key] = newUser;
      this.saveState();
      return { success: true, message: data.message || "สมัครสมาชิกสำเร็จเรียบร้อย!" };
    } catch (netErr) {
      console.warn("Backend Auth API offline, using local fallback:", netErr);
    }

    // 2. Local Fallback
    if (!this.state.users) this.state.users = this.getDefaultUsers();
    const newUser = {
      id: "usr-" + Date.now(),
      name: name || "สมาชิกใหม่",
      email: email,
      password: password || "123456",
      phone: phone || "-",
      passportNo: passportNo || "",
      nationality: "Thai",
      tier: "Silver Traveler",
      points: 500,
      nextTierPoints: 2500,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      wallet: { balances: { THB: 0 }, transactions: [] },
      savedTravelers: [],
      bookings: [],
      wishlist: []
    };

    this.state.users[key] = newUser;
    this.state.auth.isLoggedIn = true;
    this.state.auth.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      passportNo: newUser.passportNo,
      nationality: newUser.nationality,
      tier: newUser.tier,
      points: newUser.points,
      nextTierPoints: newUser.nextTierPoints,
      avatar: newUser.avatar
    };
    this.state.auth.savedTravelers = [];
    this.state.wallet = { balances: { THB: 0 }, transactions: [] };
    this.state.bookings = [];
    this.state.wishlist = [];

    this.saveState();
    return { success: true, message: `สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${newUser.name} พร้อมรับฟรี 500 คะแนนสะสม` };
  }

  logout() {
    // 1. Save active user's data back to users database
    const currentEmail = (this.state.auth.currentUser?.email || "").toLowerCase();
    if (this.state.auth.isLoggedIn && currentEmail && this.state.users && this.state.users[currentEmail]) {
      this.state.users[currentEmail].wallet = JSON.parse(JSON.stringify(this.state.wallet));
      this.state.users[currentEmail].bookings = JSON.parse(JSON.stringify(this.state.bookings));
      this.state.users[currentEmail].wishlist = [...this.state.wishlist];
      this.state.users[currentEmail].savedTravelers = [...this.state.auth.savedTravelers];
      this.state.users[currentEmail].points = this.state.auth.currentUser.points;
      this.state.users[currentEmail].tier = this.state.auth.currentUser.tier;
    }

    // 2. Set active state to Guest with 0 bookings and 0 wallet balance
    this.state.auth.isLoggedIn = false;
    this.state.auth.currentUser = null;
    this.state.auth.savedTravelers = [];
    this.state.bookings = [];
    this.state.wallet = { balances: { THB: 0 }, transactions: [] };
    this.state.wishlist = [];

    this.saveState();
    return { success: true, message: "ออกจากระบบเรียบร้อยแล้ว" };
  }

  async updateProfile(profileData) {
    const email = (this.state.auth.currentUser?.email || profileData.email || "").toLowerCase();

    // 1. Try Backend REST API first
    try {
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...profileData })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "ไม่สามารถบันทึกข้อมูลได้" };
      }

      this.state.auth.currentUser = { ...this.state.auth.currentUser, ...data.user };
      if (this.state.users && email && this.state.users[email]) {
        this.state.users[email] = { ...this.state.users[email], ...data.user };
      }
      this.saveState();
      return { success: true, message: data.message || "บันทึกข้อมูลส่วนตัวเรียบร้อย" };
    } catch (netErr) {
      console.warn("Backend Profile API offline, saving to local state:", netErr);
    }

    // 2. Local Fallback
    if (!this.state.auth.currentUser) {
      this.state.auth.currentUser = { id: "usr-01", ...profileData };
    } else {
      this.state.auth.currentUser = { ...this.state.auth.currentUser, ...profileData };
    }
    if (this.state.users && email && this.state.users[email]) {
      this.state.users[email] = { ...this.state.users[email], ...profileData };
    }
    this.saveState();
    return { success: true, message: "บันทึกข้อมูลส่วนตัวเรียบร้อย" };
  }

  switchAccount(email) {
    const key = (email || "").trim().toLowerCase();
    if (!key || !this.state.users || !this.state.users[key]) {
      return { success: false, message: "ไม่พบบัญชีนี้ในระบบ" };
    }

    // 1. Save active user's data back to users database
    const currentEmail = (this.state.auth.currentUser?.email || "").toLowerCase();
    if (this.state.auth.isLoggedIn && currentEmail && this.state.users && this.state.users[currentEmail]) {
      this.state.users[currentEmail].wallet = JSON.parse(JSON.stringify(this.state.wallet));
      this.state.users[currentEmail].bookings = JSON.parse(JSON.stringify(this.state.bookings));
      this.state.users[currentEmail].wishlist = [...this.state.wishlist];
      this.state.users[currentEmail].savedTravelers = [...this.state.auth.savedTravelers];
      this.state.users[currentEmail].points = this.state.auth.currentUser.points;
      this.state.users[currentEmail].tier = this.state.auth.currentUser.tier;
    }

    // 2. Switch to selected user
    const targetUser = this.state.users[key];
    this.state.auth.isLoggedIn = true;
    this.state.auth.currentUser = {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      phone: targetUser.phone,
      passportNo: targetUser.passportNo,
      nationality: targetUser.nationality || "Thai",
      tier: targetUser.tier || "Member",
      points: targetUser.points || 0,
      nextTierPoints: targetUser.nextTierPoints || 2500,
      avatar: targetUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      accountType: targetUser.accountType || "personal"
    };
    this.state.auth.savedTravelers = targetUser.savedTravelers || [];
    this.state.wallet = targetUser.wallet || { balances: { THB: 0 }, transactions: [] };
    this.state.bookings = targetUser.bookings || [];
    this.state.wishlist = targetUser.wishlist || [];

    this.saveState();
    return { success: true, message: `สลับไปยังบัญชี "${targetUser.name}" เรียบร้อยแล้ว`, user: this.state.auth.currentUser };
  }

  async updatePreferences(pref) {
    if (!this.state.preferences) {
      this.state.preferences = { language: "th", primaryCurrency: "THB", notifyDeals: true, notifyUpdates: true, notifyRates: true };
    }
    this.state.preferences = { ...this.state.preferences, ...pref };
    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch("/api/settings/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...this.state.preferences })
      });
    } catch (e) {
      console.warn("Could not sync preferences to server:", e);
    }
    this.saveState();
    return { success: true, message: "บันทึกการตั้งค่าระบบเรียบร้อย", preferences: this.state.preferences };
  }

  isAdmin() {
    const user = this.state.auth?.currentUser;
    if (!user) return false;
    return user.role === 'admin' || user.accountType === 'admin' || user.email === 'admin@myprogram.com' || user.email === 'corporate@globaltravel.co.th';
  }

  clearSession() {
    this.state.auth.isLoggedIn = false;
    this.state.auth.currentUser = null;
    this.state.auth.token = null;
    try {
      localStorage.removeItem("myprogram_state");
      localStorage.removeItem("auth_token");
      sessionStorage.clear();
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (e) {
      console.warn("Error clearing session storage:", e);
    }
    this.saveState();
    return { success: true, message: "ออกจากระบบเรียบร้อยแล้ว" };
  }

  addSavedTraveler(traveler) {
    const newTrv = { id: "trv-" + Date.now(), ...traveler };
    this.state.auth.savedTravelers.push(newTrv);
    this.saveState();
    return newTrv;
  }

  deleteSavedTraveler(id) {
    this.state.auth.savedTravelers = this.state.auth.savedTravelers.filter(t => t.id !== id);
    this.saveState();
  }

  // --- Travel Preferences for AI Integration ---
  async updateTravelPreferences(prefs) {
    if (!this.state.travelPreferences) {
      this.state.travelPreferences = {};
    }
    this.state.travelPreferences = { ...this.state.travelPreferences, ...prefs };
    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch("/api/user/travel-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...this.state.travelPreferences })
      });
    } catch (e) {
      console.warn("Could not save travel preferences to server:", e);
    }
    this.saveState();
    return { success: true, preferences: this.state.travelPreferences };
  }

  // --- Saved Guests Management ---
  async addSavedGuest(guest) {
    const newGuest = {
      id: "gst-" + Date.now(),
      fullName: guest.fullName || "ผู้ร่วมเดินทาง",
      dateOfBirth: guest.dateOfBirth || "",
      nationality: guest.nationality || "Thai",
      passportNo: guest.passportNo || "",
      relation: guest.relation || "ผู้ร่วมเดินทาง"
    };
    if (!this.state.savedGuests) this.state.savedGuests = [];
    this.state.savedGuests.push(newGuest);

    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch("/api/user/saved-guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...newGuest })
      });
    } catch (e) {
      console.warn("Could not sync saved guest to server:", e);
    }
    this.saveState();
    return newGuest;
  }

  async deleteSavedGuest(id) {
    if (this.state.savedGuests) {
      this.state.savedGuests = this.state.savedGuests.filter(g => g.id !== id);
    }
    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch(`/api/user/saved-guests/${id}?email=${encodeURIComponent(email)}`, {
        method: "DELETE"
      });
    } catch (e) {
      console.warn("Could not delete saved guest on server:", e);
    }
    this.saveState();
  }

  // --- Workspaces / Context Switcher ---
  async switchWorkspace(wsId) {
    const targetWs = (this.state.workspaces || []).find(w => w.id === wsId);
    if (!targetWs) return { success: false, message: "ไม่พบพื้นที่ทำงานนี้" };

    this.state.activeWorkspace = targetWs;
    try {
      await fetch("/api/workspaces/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: wsId })
      });
    } catch (e) {
      console.warn("Could not sync workspace switch to server:", e);
    }
    this.saveState();
    return { success: true, activeWorkspace: targetWs };
  }

  // --- AI Settings & Persona ---
  async updateAIPersona(persona, creativity = 0.4) {
    if (!this.state.aiSettings) this.state.aiSettings = {};
    this.state.aiSettings.aiPersona = persona;
    this.state.aiSettings.aiCreativity = creativity;

    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch("/api/settings/ai-persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, aiPersona: persona, aiCreativity: creativity })
      });
    } catch (e) {
      console.warn("Could not save AI persona to server:", e);
    }
    this.saveState();
    return { success: true, aiSettings: this.state.aiSettings };
  }

  // --- Security & 2FA ---
  async toggleTwoFactor() {
    if (!this.state.security) this.state.security = { twoFactorEnabled: false, activeSessions: [] };
    this.state.security.twoFactorEnabled = !this.state.security.twoFactorEnabled;

    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch("/api/auth/2fa/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
    } catch (e) {
      console.warn("Could not toggle 2FA on server:", e);
    }
    this.saveState();
    return this.state.security.twoFactorEnabled;
  }

  async revokeOtherSessions() {
    if (this.state.security && this.state.security.activeSessions) {
      this.state.security.activeSessions = this.state.security.activeSessions.filter(s => s.current);
    }
    try {
      const email = this.state.auth.currentUser?.email || "anant.traveler@myprogram.com";
      await fetch(`/api/auth/sessions/revoke?email=${encodeURIComponent(email)}`, {
        method: "POST"
      });
    } catch (e) {
      console.warn("Could not revoke sessions on server:", e);
    }
    this.saveState();
    return true;
  }

  // --- Travel Wallet Actions ---
  topUpWallet(amountThb, method = "พร้อมเพย์ QR") {
    const num = Math.abs(parseFloat(amountThb) || 0);
    if (num <= 0) return false;

    this.state.wallet.balances.THB = (this.state.wallet.balances.THB || 0) + num;
    this.state.wallet.transactions.unshift({
      id: "tx-" + Date.now(),
      type: "topup",
      title: `เติมเงินเข้ากระเป๋า (${method})`,
      amount: `+${num.toLocaleString()} THB`,
      date: new Date().toLocaleString("th-TH"),
      status: "สำเร็จ"
    });
    this.saveState();
    return true;
  }

  convertWalletCurrency(fromCurr, toCurr, fromAmount, toAmount) {
    const fromVal = parseFloat(fromAmount) || 0;
    const toVal = parseFloat(toAmount) || 0;
    if (fromVal <= 0 || toVal <= 0) return false;

    const currentFromBalance = this.state.wallet.balances[fromCurr] || 0;
    if (currentFromBalance < fromVal) {
      return { success: false, message: `ยอดเงิน ${fromCurr} ในกระเป๋าไม่เพียงพอ (คงเหลือ ${currentFromBalance.toLocaleString()} ${fromCurr})` };
    }

    this.state.wallet.balances[fromCurr] = currentFromBalance - fromVal;
    this.state.wallet.balances[toCurr] = (this.state.wallet.balances[toCurr] || 0) + toVal;

    this.state.wallet.transactions.unshift({
      id: "tx-" + Date.now(),
      type: "exchange",
      title: `แลกเปลี่ยนเงินในกระเป๋า (${fromCurr} -> ${toCurr})`,
      amount: `-${fromVal.toLocaleString()} ${fromCurr} -> +${toVal.toLocaleString()} ${toCurr}`,
      date: new Date().toLocaleString("th-TH"),
      status: "สำเร็จ"
    });

    this.saveState();
    return { success: true, message: `แลกเปลี่ยน ${fromVal.toLocaleString()} ${fromCurr} เป็น ${toVal.toLocaleString()} ${toCurr} สำเร็จ!` };
  }

  payWithWallet(amountThb) {
    const currentThb = this.state.wallet.balances.THB || 0;
    if (currentThb < amountThb) {
      return { success: false, message: `ยอดเงิน THB ใน Travel Wallet ไม่เพียงพอ (คงเหลือ ${currentThb.toLocaleString()} ฿)` };
    }

    this.state.wallet.balances.THB -= amountThb;
    this.state.wallet.transactions.unshift({
      id: "tx-" + Date.now(),
      type: "payment",
      title: "ชำระค่าบริการท่องเที่ยวผ่าน Travel Wallet",
      amount: `-${amountThb.toLocaleString()} THB`,
      date: new Date().toLocaleString("th-TH"),
      status: "สำเร็จ"
    });

    this.saveState();
    return { success: true };
  }

  // --- Cart Actions ---
  addToCart(item) {
    const existingIndex = this.state.cart.findIndex(i => i.id === item.id && i.date === item.date);
    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity = (this.state.cart[existingIndex].quantity || 1) + (item.quantity || 1);
    } else {
      this.state.cart.push({
        ...item,
        cartId: "cart-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        quantity: item.quantity || 1
      });
    }
    this.saveState();
    return true;
  }

  removeFromCart(cartId) {
    this.state.cart = this.state.cart.filter(item => item.cartId !== cartId && item.id !== cartId);
    this.saveState();
  }

  updateCartQuantity(cartId, quantity) {
    const item = this.state.cart.find(i => i.cartId === cartId || i.id === cartId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(cartId);
      } else {
        item.quantity = quantity;
        this.saveState();
      }
    }
  }

  clearCart() {
    this.state.cart = [];
    this.state.appliedCoupon = null;
    this.saveState();
  }

  getCartTotal() {
    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    let discount = 0;
    if (this.state.appliedCoupon) {
      if (this.state.appliedCoupon.type === "percent") {
        discount = Math.round(subtotal * (this.state.appliedCoupon.value / 100));
      } else if (this.state.appliedCoupon.type === "fixed") {
        discount = Math.min(subtotal, this.state.appliedCoupon.value);
      }
    }
    const taxes = Math.round((subtotal - discount) * 0.07);
    const finalTotal = Math.max(0, subtotal - discount + taxes);
    return { subtotal, discount, taxes, finalTotal, count: this.state.cart.length };
  }

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (cleanCode === "DREAMTRIP2026" || cleanCode === "MYPROGRAM2026") {
      this.state.appliedCoupon = { code: cleanCode, type: "percent", value: 15, title: "ส่วนลดพิเศษ 15% ทุกบริการ" };
      this.saveState();
      return { success: true, message: `ใช้โค้ด ${cleanCode} สำเร็จ! รับส่วนลด 15%` };
    } else if (cleanCode === "FIRSTTRIP") {
      this.state.appliedCoupon = { code: "FIRSTTRIP", type: "fixed", value: 500, title: "ส่วนลดลูกค้าใหม่ 500 บาท" };
      this.saveState();
      return { success: true, message: "ใช้โค้ด FIRSTTRIP สำเร็จ! ลดทันที 500 บาท" };
    } else if (cleanCode === "AIEXPLORER") {
      this.state.appliedCoupon = { code: "AIEXPLORER", type: "percent", value: 10, title: "ส่วนลดทริป AI 10%" };
      this.saveState();
      return { success: true, message: "ใช้โค้ด AIEXPLORER สำเร็จ! รับส่วนลด 10%" };
    } else {
      return { success: false, message: "รหัสคูปองไม่ถูกต้อง หรือหมดอายุแล้ว" };
    }
  }

  removeCoupon() {
    this.state.appliedCoupon = null;
    this.saveState();
  }

  // --- Wishlist Actions ---
  toggleWishlist(itemId) {
    const idx = this.state.wishlist.indexOf(itemId);
    if (idx > -1) {
      this.state.wishlist.splice(idx, 1);
    } else {
      this.state.wishlist.push(itemId);
    }
    this.saveState();
    return this.isInWishlist(itemId);
  }

  isInWishlist(itemId) {
    return this.state.wishlist.includes(itemId);
  }

  // --- Checkout Completion ---
  completeCheckout(paymentDetails) {
    const { subtotal, discount, taxes, finalTotal } = this.getCartTotal();
    const newBooking = {
      id: "MP-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
      paymentMethod: paymentDetails.method,
      paymentRef: paymentDetails.reference,
      totalAmount: finalTotal,
      discount: discount,
      taxes: taxes,
      currency: "THB",
      customer: {
        name: paymentDetails.customerName || this.state.auth.currentUser.name,
        email: paymentDetails.customerEmail || this.state.auth.currentUser.email,
        phone: paymentDetails.customerPhone || this.state.auth.currentUser.phone
      },
      items: [...this.state.cart]
    };

    // Add reward points
    const pointsEarned = Math.floor(finalTotal / 100);
    this.state.auth.currentUser.points = (this.state.auth.currentUser.points || 0) + pointsEarned;
    if (this.state.auth.currentUser.points >= 5000 && this.state.auth.currentUser.tier !== "Platinum VIP") {
      this.state.auth.currentUser.tier = "Platinum VIP";
    }

    this.state.bookings.unshift(newBooking);
    
    // Sync to user record if logged in
    const email = (this.state.auth.currentUser?.email || "").toLowerCase();
    if (this.state.users && this.state.users[email]) {
      this.state.users[email].bookings = JSON.parse(JSON.stringify(this.state.bookings));
      this.state.users[email].wallet = JSON.parse(JSON.stringify(this.state.wallet));
      this.state.users[email].points = this.state.auth.currentUser.points;
      this.state.users[email].tier = this.state.auth.currentUser.tier;
    }

    this.clearCart();
    this.saveState();
    return newBooking;
  }
}

window.DreamState = new StateManager();
