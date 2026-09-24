/**
 * MY PROGRAM Platform - Currency Exchange System & Travel Wallet
 * Supports 20+ World Currencies, Two-Way Exchange (THB ⇄ Foreign), and Multi-Currency Wallet
 */

const CURRENCY_CONFIG = {
  base: "THB",
  currencies: {
    USD: { name: "ดอลลาร์สหรัฐ (USD)", symbol: "$", flag: "", unitBuyThb: 35.75, unitSellThb: 36.15, trend: "+0.14%" },
    JPY: { name: "เยนญี่ปุ่น (JPY)", symbol: "¥", flag: "", unitBuyThb: 0.234, unitSellThb: 0.238, trend: "-0.08%" },
    EUR: { name: "ยูโร (EUR)", symbol: "€", flag: "", unitBuyThb: 38.85, unitSellThb: 39.35, trend: "+0.22%" },
    GBP: { name: "ปอนด์สเตอร์ลิง (GBP)", symbol: "£", flag: "", unitBuyThb: 45.40, unitSellThb: 46.10, trend: "-0.15%" },
    KRW: { name: "วอนเกาหลีใต้ (KRW)", symbol: "₩", flag: "", unitBuyThb: 0.0262, unitSellThb: 0.0271, trend: "+0.05%" },
    SGD: { name: "ดอลลาร์สิงคโปร์ (SGD)", symbol: "S$", flag: "", unitBuyThb: 26.50, unitSellThb: 26.95, trend: "+0.10%" },
    CNY: { name: "หยวนจีน (CNY)", symbol: "¥", flag: "", unitBuyThb: 4.95, unitSellThb: 5.08, trend: "-0.04%" },
    CHF: { name: "ฟรังก์สวิส (CHF)", symbol: "CHF", flag: "", unitBuyThb: 40.50, unitSellThb: 41.20, trend: "+0.18%" },
    AUD: { name: "ดอลลาร์ออสเตรเลีย (AUD)", symbol: "A$", flag: "", unitBuyThb: 23.40, unitSellThb: 23.85, trend: "-0.11%" },
    HKD: { name: "ดอลลาร์ฮ่องกง (HKD)", symbol: "HK$", flag: "", unitBuyThb: 4.55, unitSellThb: 4.65, trend: "+0.02%" },
    TWD: { name: "ดอลลาร์ไต้หวัน (TWD)", symbol: "NT$", flag: "", unitBuyThb: 1.10, unitSellThb: 1.15, trend: "+0.06%" },
    MYR: { name: "ริงกิตมาเลเซีย (MYR)", symbol: "RM", flag: "", unitBuyThb: 7.75, unitSellThb: 8.05, trend: "-0.03%" },
    VND: { name: "ดงเวียดนาม (VND 1,000)", symbol: "₫", flag: "", unitBuyThb: 1.38, unitSellThb: 1.48, trend: "+0.09%" },
    PHP: { name: "เปโซฟิลิปปินส์ (PHP)", symbol: "₱", flag: "", unitBuyThb: 0.62, unitSellThb: 0.66, trend: "+0.01%" },
    NZD: { name: "ดอลลาร์นิวซีแลนด์ (NZD)", symbol: "NZ$", flag: "", unitBuyThb: 21.60, unitSellThb: 22.15, trend: "-0.07%" },
    CAD: { name: "ดอลลาร์แคนาดา (CAD)", symbol: "C$", flag: "", unitBuyThb: 26.10, unitSellThb: 26.65, trend: "+0.12%" },
    AED: { name: "ดีแรห์มสหรัฐอาหรับเอมิเรตส์ (AED)", symbol: "AED", flag: "", unitBuyThb: 9.70, unitSellThb: 9.95, trend: "+0.05%" },
    INR: { name: "รูปีอินเดีย (INR)", symbol: "₹", flag: "", unitBuyThb: 0.41, unitSellThb: 0.44, trend: "-0.02%" },
    SAR: { name: "ริยาลซาอุดีอาระเบีย (SAR)", symbol: "SR", flag: "", unitBuyThb: 9.50, unitSellThb: 9.75, trend: "+0.04%" },
    DKK: { name: "โครนเดนมาร์ก (DKK)", symbol: "kr", flag: "", unitBuyThb: 5.15, unitSellThb: 5.30, trend: "+0.08%" },
    SEK: { name: "โครนาสวีเดน (SEK)", symbol: "kr", flag: "", unitBuyThb: 3.40, unitSellThb: 3.52, trend: "-0.05%" }
  }
};

class CurrencyService {
  constructor() {
    this.exchangeMode = "buy"; // "buy" = THB -> Foreign, "sell" = Foreign -> THB
    this.rateAlerts = JSON.parse(localStorage.getItem("myprogram_rate_alerts") || "[]");
    this.initRates();
  }

  async initRates() {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/THB");
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          Object.keys(CURRENCY_CONFIG.currencies).forEach(code => {
            if (data.rates[code]) {
              const oneUnitInThb = 1 / data.rates[code];
              CURRENCY_CONFIG.currencies[code].unitBuyThb = Number((oneUnitInThb * 0.992).toFixed(3));
              CURRENCY_CONFIG.currencies[code].unitSellThb = Number((oneUnitInThb * 1.008).toFixed(3));
            }
          });
        }
      }
    } catch (e) {
      console.log("Using standard exchange rate cache.");
    }

    this.renderTicker();
  }

  setExchangeMode(mode) {
    this.exchangeMode = mode;
  }

  convert(amount, currencyCode, isSellBackToThb = false) {
    if (!amount || isNaN(amount) || amount <= 0) return 0;
    const info = CURRENCY_CONFIG.currencies[currencyCode];
    if (!info) return amount;

    if (isSellBackToThb) {
      // Selling foreign currency to get THB (Bank buys at unitBuyThb)
      if (currencyCode === "VND") {
        return (amount / 1000) * info.unitBuyThb;
      }
      return amount * info.unitBuyThb;
    } else {
      // Buying foreign currency using THB (Bank sells at unitSellThb)
      if (currencyCode === "VND") {
        return (amount / info.unitSellThb) * 1000;
      }
      return amount / info.unitSellThb;
    }
  }

  renderTicker() {
    if (typeof document === "undefined") return;
    const tickerContainer = document.getElementById("currency-ticker-items");
    if (!tickerContainer) return;

    const list = Object.entries(CURRENCY_CONFIG.currencies).slice(0, 10);
    tickerContainer.innerHTML = list.map(([code, info]) => {
      const isUp = info.trend.startsWith("+");
      return `
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white whitespace-nowrap hover:bg-white/20 transition cursor-pointer" onclick="openCurrencyModal('${code}')">
          <span class="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-extrabold tracking-wider">${code}</span>
          <span class="font-bold">${code}/THB</span>
          <span class="text-amber-300 font-semibold">${info.unitSellThb} ฿</span>
          <span class="${isUp ? 'text-emerald-400' : 'text-rose-400'} text-[10px] font-medium">${info.trend}</span>
        </div>
      `;
    }).join("");
  }

  addRateAlert(currency, targetRate, email) {
    const alert = {
      id: "alert-" + Date.now(),
      currency,
      targetRate: parseFloat(targetRate),
      email,
      created: new Date().toLocaleDateString("th-TH")
    };
    this.rateAlerts.push(alert);
    localStorage.setItem("myprogram_rate_alerts", JSON.stringify(this.rateAlerts));
    return alert;
  }

  orderCashCurrency({ currency, foreignAmount, deliveryMethod, branchOrAddress, pickupDate, isSellBack = false }) {
    const info = CURRENCY_CONFIG.currencies[currency];
    const rate = isSellBack ? info.unitBuyThb : info.unitSellThb;
    const totalThb = Math.round(isSellBack ? foreignAmount * rate : foreignAmount * rate);

    const cartItem = {
      id: "curr-" + currency.toLowerCase() + "-" + Date.now(),
      type: "currency",
      title: isSellBack 
        ? `แลกเงินต่างประเทศคืนเป็นเงินบาท: ${foreignAmount.toLocaleString()} ${currency} -> ${totalThb.toLocaleString()} ฿`
        : `สั่งแลกเงินสดต่างประเทศ: ${foreignAmount.toLocaleString()} ${currency}`,
      subtitle: `ช่องทาง: ${deliveryMethod} (${branchOrAddress}) | วันที่: ${pickupDate} | เรท: ${rate} ฿`,
      price: isSellBack ? 0 : totalThb,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=400&q=80",
      details: { currency, foreignAmount, rate, deliveryMethod, branchOrAddress, pickupDate, isSellBack, totalThb }
    };

    window.DreamState.addToCart(cartItem);
    return cartItem;
  }

  formatPrice(thbAmount, targetCurrency = null) {
    if (thbAmount === null || thbAmount === undefined || isNaN(thbAmount)) return "0 ฿";
    const curr = targetCurrency || (window.DreamState?.state?.preferences?.primaryCurrency) || "THB";
    if (curr === "THB") {
      return `${Math.round(thbAmount).toLocaleString()} ฿`;
    }
    const info = CURRENCY_CONFIG.currencies[curr];
    if (!info || !info.unitSellThb) return `${Math.round(thbAmount).toLocaleString()} ฿`;

    const converted = thbAmount / info.unitSellThb;
    if (curr === "JPY" || curr === "KRW" || curr === "VND") {
      return `${info.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${info.symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
}

window.DreamCurrency = new CurrencyService();
