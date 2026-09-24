/**
 * MY PROGRAM Platform - Cart, Checkout & Multi-Channel Payment Gateway
 * Supports PromptPay QR, Credit/Debit Card, Travel Wallet, e-Wallets, 0% Installment, and E-Tickets
 */

class CartCheckoutController {
  constructor() {
    this.currentPaymentMethod = "promptpay";
    this.promptPayTimer = null;
    this.promptPaySecondsLeft = 300;
  }

  renderCartDrawer() {
    const container = document.getElementById("cart-items-container");
    const countBadge = document.getElementById("cart-badge-count");
    const summaryContainer = document.getElementById("cart-summary-container");
    const emptyState = document.getElementById("cart-empty-state");

    if (!container) return;

    const cart = window.DreamState.state.cart;
    const { subtotal, discount, taxes, finalTotal, count } = window.DreamState.getCartTotal();

    if (countBadge) {
      countBadge.textContent = count;
      countBadge.classList.toggle("hidden", count === 0);
    }

    if (cart.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      container.innerHTML = "";
      if (summaryContainer) summaryContainer.classList.add("hidden");
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    if (summaryContainer) summaryContainer.classList.remove("hidden");

    container.innerHTML = cart.map(item => `
      <div class="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-all shadow-xs group">
        <img src="${item.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200&q=80'}" alt="${item.title}" class="w-20 h-20 rounded-xl object-cover flex-shrink-0 shadow-inner">
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <span class="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${this.getTypeBadgeClass(item.type)}">${this.getTypeBadgeText(item.type)}</span>
            <button onclick="DreamCart.removeItem('${item.cartId}')" class="text-slate-400 hover:text-rose-600 transition p-1" title="ลบรายการ">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
          <h4 class="font-bold text-slate-800 text-sm mt-1 truncate" title="${item.title}">${item.title}</h4>
          <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${item.subtitle || item.date || ''}</p>
          
          <div class="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60">
            <div class="flex items-center gap-2 border border-slate-300 rounded-lg bg-white px-2 py-0.5 shadow-xs">
              <button onclick="DreamCart.changeQty('${item.cartId}', ${(item.quantity || 1) - 1})" class="text-slate-500 hover:text-sky-600 font-bold px-1 text-xs">-</button>
              <span class="text-xs font-semibold text-slate-700 min-w-4 text-center">${item.quantity || 1}</span>
              <button onclick="DreamCart.changeQty('${item.cartId}', ${(item.quantity || 1) + 1})" class="text-slate-500 hover:text-sky-600 font-bold px-1 text-xs">+</button>
            </div>
            <div class="text-right">
              <div class="text-sm font-black text-sky-900">${(item.price * (item.quantity || 1)).toLocaleString()} ฿</div>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    // Summary numbers
    document.getElementById("cart-subtotal").textContent = `${subtotal.toLocaleString()} ฿`;
    document.getElementById("cart-discount").textContent = `-${discount.toLocaleString()} ฿`;
    document.getElementById("cart-tax").textContent = `${taxes.toLocaleString()} ฿`;
    document.getElementById("cart-total").textContent = `${finalTotal.toLocaleString()} ฿`;

    const appliedCoupon = window.DreamState.state.appliedCoupon;
    const couponTag = document.getElementById("cart-applied-coupon-tag");
    if (couponTag) {
      if (appliedCoupon) {
        couponTag.innerHTML = `
          <div class="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-xl mt-2">
            <span>โค้ดส่วนลด: <strong>${appliedCoupon.code}</strong> (${appliedCoupon.title})</span>
            <button onclick="DreamCart.removeCoupon()" class="text-emerald-600 hover:text-emerald-900 font-bold ml-2">ยกเลิก</button>
          </div>
        `;
        couponTag.classList.remove("hidden");
      } else {
        couponTag.classList.add("hidden");
      }
    }

    if (window.refreshIcons) {
      window.refreshIcons(document.getElementById("cart-drawer"));
    } else if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  getTypeBadgeClass(type) {
    switch (type) {
      case "hotel": return "bg-indigo-100 text-indigo-800";
      case "flight": return "bg-sky-100 text-sky-800";
      case "restaurant": return "bg-amber-100 text-amber-800";
      case "attraction": return "bg-emerald-100 text-emerald-800";
      case "currency": return "bg-purple-100 text-purple-800";
      case "custom_package": return "bg-rose-100 text-rose-800";
      default: return "bg-slate-100 text-slate-800";
    }
  }

  getTypeBadgeText(type) {
    switch (type) {
      case "hotel": return "ที่พัก (Hotel)";
      case "flight": return "เที่ยวบิน (Flight)";
      case "restaurant": return "ร้านอาหาร (Dining)";
      case "attraction": return "กิจกรรม (Activity)";
      case "currency": return "แลกเงิน (Currency)";
      case "custom_package": return "แพ็กเกจ AI (Package)";
      default: return "ทริป";
    }
  }

  removeItem(cartId) {
    window.DreamState.removeFromCart(cartId);
    this.renderCartDrawer();
    window.showToast("ลบรายการออกจากตะกร้าเรียบร้อย");
  }

  changeQty(cartId, newQty) {
    window.DreamState.updateCartQuantity(cartId, newQty);
    this.renderCartDrawer();
  }

  applyCouponCode() {
    const input = document.getElementById("cart-coupon-input");
    if (!input) return;
    const res = window.DreamState.applyCoupon(input.value);
    window.showToast(res.message, res.success ? "success" : "error");
    if (res.success) {
      input.value = "";
      this.renderCartDrawer();
    }
  }

  removeCoupon() {
    window.DreamState.removeCoupon();
    this.renderCartDrawer();
    window.showToast("ยกเลิกโค้ดส่วนลดแล้ว");
  }

  // --- Checkout Modal ---
  openCheckoutModal() {
    const cart = window.DreamState.state.cart;
    if (cart.length === 0) {
      window.showToast("กรุณาเลือกบริการท่องเที่ยวลงในตะกร้าก่อนชำระเงิน", "warning");
      return;
    }

    const { finalTotal } = window.DreamState.getCartTotal();
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    // Fill user info defaults from state.auth
    const user = window.DreamState.state.auth.currentUser;
    const isGuest = !window.DreamState.state.auth.isLoggedIn || !user || user.email === "-";
    document.getElementById("checkout-name").value = isGuest ? "" : (user.name || "");
    document.getElementById("checkout-email").value = isGuest ? "" : (user.email || "");
    document.getElementById("checkout-phone").value = isGuest ? "" : (user.phone || "");
    document.getElementById("checkout-total-display").textContent = `${finalTotal.toLocaleString()} ฿`;

    // Update wallet balance preview in payment options
    const walletBalance = window.DreamState.state.wallet.balances.THB || 0;
    const walletBalanceLabel = document.getElementById("pay-wallet-balance-label");
    if (walletBalanceLabel) {
      walletBalanceLabel.textContent = `(คงเหลือ ${walletBalance.toLocaleString()} ฿)`;
    }

    this.selectPaymentMethod("promptpay");
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    const floatingChat = document.getElementById("floating-chat-container");
    if (floatingChat) floatingChat.classList.add("hidden");
  }

  closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) modal.classList.add("hidden");
    document.body.style.overflow = "";
    if (this.promptPayTimer) clearInterval(this.promptPayTimer);

    const floatingChat = document.getElementById("floating-chat-container");
    if (floatingChat) floatingChat.classList.remove("hidden");
  }

  backToCart() {
    this.closeCheckoutModal();
    toggleCartDrawer(true);
  }

  selectPaymentMethod(method) {
    this.currentPaymentMethod = method;

    ["promptpay", "wallet", "card", "installment"].forEach(m => {
      const btn = document.getElementById(`pay-method-${m}`);
      const pane = document.getElementById(`pay-pane-${m}`);
      if (btn && pane) {
        if (m === method) {
          btn.className = "flex flex-col items-center sm:items-start text-center sm:text-left p-3 rounded-2xl border-2 border-sky-600 bg-sky-50 text-sky-900 font-bold transition shadow-xs cursor-pointer";
          pane.classList.remove("hidden");
        } else {
          btn.className = "flex flex-col items-center sm:items-start text-center sm:text-left p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition cursor-pointer";
          pane.classList.add("hidden");
        }
      }
    });

    if (method === "promptpay") {
      this.startPromptPayCountdown();
    } else {
      if (this.promptPayTimer) clearInterval(this.promptPayTimer);
    }

    if (method === "installment") {
      this.calculateInstallment();
    }
  }

  startPromptPayCountdown() {
    if (this.promptPayTimer) clearInterval(this.promptPayTimer);
    this.promptPaySecondsLeft = 300;
    const timerElem = document.getElementById("promptpay-timer");

    const updateTimer = () => {
      const mins = Math.floor(this.promptPaySecondsLeft / 60);
      const secs = this.promptPaySecondsLeft % 60;
      if (timerElem) {
        timerElem.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      if (this.promptPaySecondsLeft <= 0) {
        clearInterval(this.promptPayTimer);
        if (timerElem) timerElem.textContent = "หมดเวลา กรุณากดสร้าง QR ใหม่";
      }
      this.promptPaySecondsLeft--;
    };

    updateTimer();
    this.promptPayTimer = setInterval(updateTimer, 1000);
  }

  calculateInstallment() {
    const { finalTotal } = window.DreamState.getCartTotal();
    const termElem = document.getElementById("installment-term");
    const displayElem = document.getElementById("installment-monthly-calc");
    if (!termElem || !displayElem) return;

    const months = parseInt(termElem.value, 10) || 6;
    const perMonth = Math.round(finalTotal / months);
    displayElem.textContent = `ชำระเดือนละ ${perMonth.toLocaleString()} ฿ (ดอกเบี้ย 0% นาน ${months} เดือน)`;
  }

  // --- Confirm Payment ---
  processPayment() {
    const name = document.getElementById("checkout-name").value.trim();
    const email = document.getElementById("checkout-email").value.trim();
    const phone = document.getElementById("checkout-phone").value.trim();
    const { finalTotal } = window.DreamState.getCartTotal();

    if (!name || !email || !phone) {
      window.showToast("กรุณากรอกข้อมูลผู้เดินทางให้ครบถ้วน", "warning");
      return;
    }

    // Check Travel Wallet Balance if wallet selected
    if (this.currentPaymentMethod === "wallet") {
      const walletRes = window.DreamState.payWithWallet(finalTotal);
      if (!walletRes.success) {
        window.showToast(walletRes.message, "error");
        return;
      }
    }

    const submitBtn = document.getElementById("confirm-pay-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        กำลังยืนยันการชำระเงินและออกตั๋ว...
      `;
    }

    setTimeout(() => {
      let refId = "REF-" + Math.floor(100000 + Math.random() * 900000);
      let methodName = "พร้อมเพย์ QR Code (PromptPay)";

      if (this.currentPaymentMethod === "wallet") {
        methodName = "กระเป๋าเงินออนไลน์ (MY PROGRAM Travel Wallet)";
      } else if (this.currentPaymentMethod === "card") {
        methodName = "บัตรเครดิต/เดบิต (Visa/Mastercard/JCB)";
      } else if (this.currentPaymentMethod === "installment") {
        const months = document.getElementById("installment-term").value;
        methodName = `ผ่อนชำระ 0% (${months} เดือน)`;
      }

      const booking = window.DreamState.completeCheckout({
        method: methodName,
        reference: refId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone
      });

      // Send order to Google Sheets in real-time
      this.sendBookingToGoogleSheet(booking);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `ยืนยันการชำระเงิน`;
      }

      this.closeCheckoutModal();
      this.renderCartDrawer();
      this.showTicketModal(booking);
      window.showToast("ชำระเงินสำเร็จ! ออกใบยืนยันการจองเรียบร้อยแล้ว", "success");
    }, 1100);
  }

  showTicketModal(booking) {
    const modal = document.getElementById("ticket-modal");
    if (!modal) return;

    document.getElementById("ticket-booking-id").textContent = booking.id;
    document.getElementById("ticket-date").textContent = new Date(booking.createdAt).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
    document.getElementById("ticket-name").textContent = booking.customer.name;
    document.getElementById("ticket-email").textContent = booking.customer.email;
    document.getElementById("ticket-phone").textContent = booking.customer.phone;
    document.getElementById("ticket-method").textContent = booking.paymentMethod;
    document.getElementById("ticket-ref").textContent = booking.paymentRef;
    document.getElementById("ticket-total").textContent = `${booking.totalAmount.toLocaleString()} ฿`;

    const itemsList = document.getElementById("ticket-items-list");
    if (itemsList) {
      itemsList.innerHTML = booking.items.map(item => `
        <div class="flex items-center justify-between py-2 border-b border-dashed border-slate-200 text-sm">
          <div>
            <span class="font-bold text-slate-800">${item.title}</span>
            <span class="text-xs text-slate-500 block">${item.subtitle || item.date || ''} (จำนวน: ${item.quantity || 1})</span>
          </div>
          <div class="font-bold text-slate-900">${(item.price * (item.quantity || 1)).toLocaleString()} ฿</div>
        </div>
      `).join("");
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  closeTicketModal() {
    const modal = document.getElementById("ticket-modal");
    if (modal) modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  printTicket() {
    window.print();
  }

  sendBookingToGoogleSheet(booking) {
    const defaultUrl = "https://script.google.com/macros/s/AKfycbxko-aJKu6ACCbeSsL12v9koe0KshBd5fa_fEE1orsFG4aS8ugPUFwMTDvvZ4rjax2g/exec";
    const webhookUrl = window.DreamState?.state?.preferences?.googleSheetsWebhookUrl || defaultUrl;
    if (!webhookUrl) return;

    const payload = {
      bookingId: booking.id,
      createdAt: new Date(booking.createdAt).toLocaleString("th-TH"),
      customerName: booking.customer?.name || "-",
      customerEmail: booking.customer?.email || "-",
      customerPhone: booking.customer?.phone || "-",
      itemsSummary: (booking.items || []).map(i => `${i.title} (x${i.quantity || 1})`).join(", "),
      totalAmount: booking.totalAmount || 0,
      paymentMethod: booking.paymentMethod || "-",
      paymentRef: booking.paymentRef || "-"
    };

    fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    }).then(() => {
      console.log("[Google Sheets] บันทึกข้อมูลคำสั่งจองลง Google Sheet เรียบร้อยแล้ว:", booking.id);
    }).catch(err => {
      console.warn("[Google Sheets] ส่งข้อมูลไม่สำเร็จ:", err);
    });

    // Also sync to backend server database for CSV / Excel export
    try {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: booking.id,
          userEmail: booking.customer?.email || 'guest@myprogram.com',
          customerName: booking.customer?.name || 'ลูกค้า',
          contactPhone: booking.customer?.phone || '-',
          hotelName: (booking.items || []).map(i => `${i.title} (x${i.quantity || 1})`).join(", "),
          totalPrice: booking.totalAmount || 0,
          paymentMethod: booking.paymentMethod || 'PromptPay QR',
          paymentRef: booking.paymentRef || 'REF-' + Date.now(),
          status: 'CONFIRMED',
          source: 'cart-checkout'
        })
      }).catch(() => {});
    } catch (e) {}
  }
}

window.DreamCart = new CartCheckoutController();
