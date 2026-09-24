/**
 * MY PROGRAM Platform - Main Application Controller
 * High-Performance Navigation, Smart Live Autocomplete Search, Budget AI Planner, 2-Way Currency & Travel Wallet, and Authentication
 */
// Global Authentication State Controller (default = false)
window.isLoggedIn = false;

// High-Performance Scoped & Debounced Lucide Icons Controller
let _lucideScheduled = false;
function refreshIcons(container = null) {
  if (!window.lucide) return;
  if (container && container.nodeType === 1) {
    try {
      window.lucide.createIcons({ root: container });
      return;
    } catch (e) {}
  }
  if (_lucideScheduled) return;
  _lucideScheduled = true;
  requestAnimationFrame(() => {
    _lucideScheduled = false;
    try {
      window.lucide.createIcons();
    } catch (e) {}
  });
}
window.refreshIcons = refreshIcons;

// Toast notification helper
window.showToast = function(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgColors = {
    info: "bg-slate-900 text-white border-slate-700",
    success: "bg-emerald-600 text-white border-emerald-500",
    warning: "bg-amber-500 text-white border-amber-400",
    error: "bg-rose-600 text-white border-rose-500"
  };

  const icons = {
    info: "info",
    success: "check-circle",
    warning: "alert-triangle",
    error: "alert-circle"
  };

  toast.className = `toast-card flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'info'}" class="w-5 h-5 flex-shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  refreshIcons(toast);

  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  window.DreamState.subscribe(state => {
    updateNavBadges(state);
    if (document.getElementById("cart-drawer") && !document.getElementById("cart-drawer").classList.contains("translate-x-full")) {
      window.DreamCart.renderCartDrawer();
    }
  });

  // 1. Critical Above-The-Fold renders (Instant paint)
  renderDestinations();
  renderDeals();
  updateNavBadges(window.DreamState.state);
  setupSmartLiveSearch();
  setupLiveChat();
  initClientRouter();
  refreshIcons();

  // 2. Progressive Staggered Below-The-Fold renders (Non-blocking)
  requestAnimationFrame(() => {
    renderHotels();
    renderRestaurants();

    setTimeout(() => {
      renderAttractions();
      renderFlights();
      renderBlogPosts();
      renderMyAccount();
      renderTravelWalletOverview();
      refreshIcons();
    }, 40);
  });
}

function updateNavBadges(state) {
  const cartCount = state.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishCount = (state.wishlist || []).length;

  document.querySelectorAll(".cart-count-badge").forEach(b => {
    b.textContent = cartCount;
    b.classList.toggle("hidden", cartCount === 0);
  });
  const drawerCartBadge = document.getElementById("cart-badge-count");
  if (drawerCartBadge) drawerCartBadge.textContent = cartCount;

  document.querySelectorAll(".wishlist-count-badge").forEach(w => {
    w.textContent = wishCount;
  });
  const drawerWishBadge = document.getElementById("wishlist-badge-count");
  if (drawerWishBadge) drawerWishBadge.textContent = wishCount;

  const user = state.auth ? state.auth.currentUser : null;
  const isLoggedIn = Boolean(state.auth && state.auth.isLoggedIn && user && user.email && user.email !== "-");
  window.isLoggedIn = isLoggedIn;
  
  // Toggle Guest actions vs Logged-in Dropdown container
  const guestActions = document.getElementById("nav-guest-actions");
  const userDropdownContainer = document.getElementById("nav-user-dropdown-container");

  if (guestActions) {
    guestActions.classList.toggle("hidden", isLoggedIn);
  }
  if (userDropdownContainer) {
    userDropdownContainer.classList.toggle("hidden", !isLoggedIn);
  }

  const navUserTier = document.getElementById("nav-user-tier");
  const navUserName = document.getElementById("nav-user-name");
  const navUserAvatar = document.getElementById("nav-user-avatar");

  if (navUserTier) navUserTier.textContent = isLoggedIn ? (user.tier || "Member") : "สมัครสมาชิก";
  if (navUserName) navUserName.textContent = isLoggedIn ? user.name.split(" ")[0] : "เข้าสู่ระบบ";
  if (navUserAvatar) {
    if (isLoggedIn && user.avatar) navUserAvatar.src = user.avatar;
    else navUserAvatar.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80";
  }

  // Update dropdown preview
  const dropAvatar = document.getElementById("dropdown-user-avatar");
  const dropName = document.getElementById("dropdown-user-name");
  const dropEmail = document.getElementById("dropdown-user-email");
  if (dropAvatar && isLoggedIn && user.avatar) dropAvatar.src = user.avatar;
  if (dropName) dropName.textContent = isLoggedIn ? user.name : "ผู้เยี่ยมชม (Guest)";
  if (dropEmail) dropEmail.textContent = isLoggedIn ? user.email : "ยังไม่ได้เข้าสู่ระบบ";
}

function handleNavAuthClick() {
  const state = window.DreamState.state;
  if (state.auth && state.auth.isLoggedIn && state.auth.currentUser && state.auth.currentUser.email !== "-") {
    showSection("account");
  } else {
    window.location.href = "login.html";
  }
}

// --- Section Navigation ---
function showSection(sectionId) {
  const sections = ["home", "hotels", "restaurants", "attractions", "flights", "planner", "currency", "account", "help", "esim", "insurance", "transport", "visa"];
  sections.forEach(id => {
    const el = document.getElementById(`section-${id}`);
    const navBtn = document.getElementById(`nav-link-${id}`);
    if (el) el.classList.toggle("hidden", id !== sectionId);
    if (navBtn) {
      if (id === sectionId) {
        navBtn.classList.add("text-sky-600", "font-bold");
        navBtn.classList.remove("text-slate-600");
      } else {
        navBtn.classList.remove("text-sky-600", "font-bold");
        navBtn.classList.add("text-slate-600");
      }
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (sectionId === "account") {
    renderMyAccount();
  } else if (sectionId === "currency") {
    initCurrencyView();
  } else if (sectionId === "esim") {
    renderEsim();
  } else if (sectionId === "insurance") {
    updateInsuranceView();
  } else if (sectionId === "transport") {
    renderTransport();
  } else if (sectionId === "visa") {
    renderVisa();
  }

  refreshIcons();
}

// --- Smart Live Search & Autocomplete ---
function setupSmartLiveSearch() {
  const input = document.getElementById("unified-search-input");
  const dropdown = document.getElementById("search-autocomplete-dropdown");
  const searchBtn = document.getElementById("unified-search-btn");

  if (!input || !dropdown) return;

  const handleAutocomplete = () => {
    const query = input.value.trim().toLowerCase();
    if (query.length < 1) {
      dropdown.classList.add("hidden");
      return;
    }

    // Match across categories
    const matchedDests = DREAM_DATA.destinations.filter(d => d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query));
    const matchedHotels = DREAM_DATA.hotels.filter(h => h.name.toLowerCase().includes(query) || h.cityTh.includes(query) || h.city.toLowerCase().includes(query)).slice(0, 3);
    const matchedRests = DREAM_DATA.restaurants.filter(r => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query) || r.cityTh.includes(query)).slice(0, 3);
    const matchedAttrs = DREAM_DATA.attractions.filter(a => a.name.toLowerCase().includes(query) || a.cityTh.includes(query)).slice(0, 3);
    const matchedFlights = DREAM_DATA.flights.filter(f => f.airline.toLowerCase().includes(query) || f.to.toLowerCase().includes(query) || f.from.toLowerCase().includes(query)).slice(0, 2);

    const totalMatches = matchedDests.length + matchedHotels.length + matchedRests.length + matchedAttrs.length + matchedFlights.length;

    if (totalMatches === 0) {
      dropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-400">
          ไม่พบผลการค้นหาสำหรับ "${query}" ลองค้นหาด้วยชื่อเมือง เช่น โตเกียว, ภูเก็ต, สวิส
        </div>
      `;
      dropdown.classList.remove("hidden");
      return;
    }

    let html = `<div class="p-2 space-y-2 max-h-96 overflow-y-auto">`;

    // Destinations
    if (matchedDests.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">จุดหมายปลายทาง</div>`;
      matchedDests.forEach(d => {
        html += `
          <div onclick="selectSearchDestination('${d.name.split(' ')[0]}')" class="flex items-center gap-3 p-2 rounded-xl hover:bg-sky-50 cursor-pointer transition">
            <img src="${d.image}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">
            <div>
              <span class="font-bold text-slate-900 text-xs block">${d.name}</span>
              <span class="text-[11px] text-slate-400">${d.tagline}</span>
            </div>
          </div>
        `;
      });
    }

    // Hotels
    if (matchedHotels.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1 border-t border-slate-100">โรงแรม / ที่พัก</div>`;
      matchedHotels.forEach(h => {
        html += `
          <div onclick="openHotelDetailModal('${h.id}'); closeSearchDropdown()" class="flex items-center justify-between p-2 rounded-xl hover:bg-sky-50 cursor-pointer transition">
            <div class="flex items-center gap-2.5">
              <img src="${h.image}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'" class="w-9 h-9 rounded-lg object-cover flex-shrink-0">
              <div>
                <span class="font-bold text-slate-900 text-xs block line-clamp-1">${h.name}</span>
                <span class="text-[10px] text-slate-400">${h.cityTh} • ${h.rating}</span>
              </div>
            </div>
            <span class="text-xs font-black text-sky-900">${h.pricePerNight.toLocaleString()} ฿</span>
          </div>
        `;
      });
    }

    // Restaurants
    if (matchedRests.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1 border-t border-slate-100">ร้านอาหาร</div>`;
      matchedRests.forEach(r => {
        html += `
          <div onclick="openRestaurantModal('${r.id}'); closeSearchDropdown()" class="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50 cursor-pointer transition">
            <div class="flex items-center gap-2.5">
              <img src="${r.image}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'" class="w-9 h-9 rounded-lg object-cover flex-shrink-0">
              <div>
                <span class="font-bold text-slate-900 text-xs block line-clamp-1">${r.name}</span>
                <span class="text-[10px] text-slate-400">${r.cuisine} • ${r.cityTh}</span>
              </div>
            </div>
            <span class="text-xs font-bold text-amber-600">${r.priceLevel}</span>
          </div>
        `;
      });
    }

    // Attractions
    if (matchedAttrs.length > 0) {
      html += `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1 border-t border-slate-100">กิจกรรม / บัตรเข้าชม</div>`;
      matchedAttrs.forEach(a => {
        html += `
          <div onclick="bookAttractionTicket('${a.id}'); closeSearchDropdown()" class="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50 cursor-pointer transition">
            <div class="flex items-center gap-2.5">
              <img src="${a.image}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'" class="w-9 h-9 rounded-lg object-cover flex-shrink-0">
              <div>
                <span class="font-bold text-slate-900 text-xs block line-clamp-1">${a.name}</span>
                <span class="text-[10px] text-slate-400">${a.cityTh} • ${a.duration}</span>
              </div>
            </div>
            <span class="text-xs font-black text-emerald-700">${a.price.toLocaleString()} ฿</span>
          </div>
        `;
      });
    }

    html += `</div>`;
    dropdown.innerHTML = html;
    dropdown.classList.remove("hidden");
  };

  input.addEventListener("input", handleAutocomplete);
  input.addEventListener("focus", handleAutocomplete);

  document.addEventListener("click", e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      closeSearchDropdown();
    }
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      closeSearchDropdown();
      executeUnifiedSearch();
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      closeSearchDropdown();
      executeUnifiedSearch();
    });
  }
}

function closeSearchDropdown() {
  const dropdown = document.getElementById("search-autocomplete-dropdown");
  if (dropdown) dropdown.classList.add("hidden");
}

function selectSearchDestination(cityKeyword) {
  closeSearchDropdown();
  document.getElementById("unified-search-input").value = cityKeyword;
  filterByDestination(cityKeyword);
}

// --- Render Popular Destinations ---
function renderDestinations() {
  const container = document.getElementById("popular-destinations-grid");
  if (!container) return;

  container.innerHTML = DREAM_DATA.destinations.map(dest => `
    <div class="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer bg-slate-900" onclick="filterByDestination('${dest.name.split(' ')[0]}')">
      <div class="h-80 w-full overflow-hidden">
        <img src="${dest.image}" alt="${dest.name}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 brightness-90 group-hover:brightness-100">
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
      
      <div class="absolute top-4 left-4 right-4 flex justify-between items-center">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/20 text-white border border-white/20">
          ${dest.region === 'domestic' ? 'TH ในประเทศ' : 'ต่างประเทศ'}
        </span>
        <button onclick="event.stopPropagation(); toggleWishlistItem('${dest.id}')" class="w-9 h-9 rounded-full backdrop-blur-md bg-white/25 hover:bg-white text-white hover:text-rose-500 flex items-center justify-center transition shadow-md">
          <i data-lucide="heart" class="w-4 h-4 ${window.DreamState.isInWishlist(dest.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
        </button>
      </div>

      <div class="absolute bottom-4 left-4 right-4 text-white">
        <div class="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
          <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
          <span>${dest.rating} (${dest.reviewCount.toLocaleString()} รีวิว)</span>
        </div>
        <h3 class="text-xl font-bold text-white tracking-tight">${dest.name}</h3>
        <p class="text-xs text-slate-200 line-clamp-1 mt-1 opacity-90">${dest.tagline}</p>
        
        <div class="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-300 block">เริ่มต้นเพียง</span>
            <span class="text-base font-extrabold text-amber-400">${dest.startingPrice.toLocaleString()} ฿</span>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-bold text-sky-300 group-hover:text-white transition">
            สำรวจ <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </span>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

// --- Render Deals ---
function renderDeals() {
  const container = document.getElementById("weekly-deals-grid");
  if (!container) return;

  container.innerHTML = DREAM_DATA.deals.map(deal => `
    <div class="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div class="relative h-48 overflow-hidden">
        <img src="${deal.image}" alt="${deal.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <div class="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-md pulse-badge">
          ${deal.badge}
        </div>
        <div class="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1">
          <i data-lucide="clock" class="w-3 h-3 text-amber-400"></i>
          <span>เหลืออีก ${deal.expireHours} ชม.</span>
        </div>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-xs font-bold text-sky-600 uppercase tracking-wide">${deal.destination}</span>
          <h4 class="text-base font-bold text-slate-900 mt-1 line-clamp-2">${deal.title}</h4>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">${deal.subtitle}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 line-through block">${deal.originalPrice.toLocaleString()} ฿</span>
            <span class="text-lg font-black text-slate-900">${deal.price.toLocaleString()} ฿</span>
          </div>
          <button onclick="bookDeal('${deal.id}')" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center gap-1.5">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> จองดีลนี้
          </button>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function bookDeal(dealId) {
  const deal = DREAM_DATA.deals.find(d => d.id === dealId);
  if (!deal) return;
  window.DreamState.addToCart({
    id: deal.id,
    type: "custom_package",
    title: deal.title,
    subtitle: `${deal.destination} - ${deal.subtitle}`,
    price: deal.price,
    quantity: 1,
    image: deal.image
  });
  window.showToast(`เพิ่ม "${deal.title}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// --- Render Hotels & Sorting ---
function filterHotels() {
  const keyword = (document.getElementById("hotel-filter-search")?.value || "").trim().toLowerCase();
  const city = document.getElementById("hotel-filter-city")?.value || "all";
  const stars = parseInt(document.getElementById("hotel-filter-stars")?.value || "0", 10);
  const maxPrice = parseInt(document.getElementById("hotel-filter-price")?.value || "70000", 10);
  const sort = document.getElementById("hotel-sort-select")?.value || "default";
  renderHotels(city, stars, maxPrice, sort, keyword);
}

function renderHotels(filterCity = "all", filterStars = 0, maxPrice = 70000, sortBy = "default", searchKeyword = "") {
  const container = document.getElementById("hotels-grid");
  const countLabel = document.getElementById("hotels-count-label");
  if (!container) return;

  const keyword = (searchKeyword || (document.getElementById("hotel-filter-search")?.value || "")).trim().toLowerCase();

  let list = [...DREAM_DATA.hotels];

  // Search keyword (Deep search across name, city, address, amenities, description)
  if (keyword) {
    list = list.filter(h => 
      h.name.toLowerCase().includes(keyword) ||
      h.city.toLowerCase().includes(keyword) ||
      (h.cityTh && h.cityTh.includes(keyword)) ||
      (h.country && h.country.includes(keyword)) ||
      (h.address && h.address.toLowerCase().includes(keyword)) ||
      (h.amenities && h.amenities.join(' ').toLowerCase().includes(keyword)) ||
      (h.description && h.description.toLowerCase().includes(keyword))
    );
  }

  // City filter
  if (filterCity !== "all") {
    list = list.filter(h => h.city.toLowerCase() === filterCity.toLowerCase() || (h.cityTh && h.cityTh.includes(filterCity)));
  }

  // Stars filter
  if (filterStars > 0) {
    list = list.filter(h => h.stars >= filterStars);
  }

  // Price filter
  list = list.filter(h => h.pricePerNight <= maxPrice);

  // Sorting
  if (sortBy === "price-low") {
    list.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sortBy === "price-high") {
    list.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (sortBy === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  if (countLabel) {
    const minPrice = list.length > 0 ? Math.min(...list.map(h => h.pricePerNight)) : 0;
    countLabel.textContent = `พบที่พักทั้งหมด ${list.length} แห่ง ${filterCity !== 'all' ? `ใน "${filterCity}"` : ''} ${minPrice > 0 ? `(เริ่มต้น ${minPrice.toLocaleString()} ฿/คืน)` : ''}`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="hotel" class="w-12 h-12 mx-auto stroke-1 mb-2"></i>
        <p class="font-medium">ไม่พบที่พักที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
        <button onclick="resetHotelFilters()" class="mt-3 px-4 py-2 rounded-xl bg-sky-100 text-sky-700 text-xs font-bold hover:bg-sky-200 transition">รีเซ็ตตัวกรอง</button>
      </div>
    `;
    refreshIcons(container);
    return;
  }


  container.innerHTML = list.map(h => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group">
      <div class="relative h-56 overflow-hidden">
        <img src="${h.image}" alt="${h.name}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <button onclick="toggleWishlistItem('${h.id}')" class="absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 flex items-center justify-center transition shadow-md">
          <i data-lucide="heart" class="w-4 h-4 ${window.DreamState.isInWishlist(h.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
        </button>
        <div class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
          <i data-lucide="map-pin" class="w-3 h-3 text-sky-400"></i>
          <span>${h.cityTh}, ${h.country}</span>
        </div>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-1 text-amber-500 text-xs mb-1">
            ${Array(h.stars).fill('<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>').join('')}
            <span class="text-slate-600 font-bold ml-1">${h.rating}</span>
            <span class="text-slate-400 text-[11px]">(${h.reviewsCount} รีวิว)</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-sky-600 transition">${h.name}</h3>
          <p class="text-xs text-slate-500 line-clamp-2 mt-1">${h.description}</p>
          
          <div class="flex flex-wrap gap-1 mt-2.5">
            ${h.amenities.slice(0, 3).map(a => `
              <span class="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">${a}</span>
            `).join('')}
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block">ราคาเริ่มต้น / คืน</span>
            <span class="text-lg font-black text-sky-900">${h.pricePerNight.toLocaleString()} ฿</span>
          </div>
          <button onclick="openHotelDetailModal('${h.id}')" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center gap-1">
            ดูห้องพัก & จอง <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function openHotelDetailModal(hotelId) {
  const hotel = DREAM_DATA.hotels.find(h => h.id === hotelId);
  if (!hotel) return;

  const modal = document.getElementById("hotel-detail-modal");
  if (!modal) return;

  document.getElementById("hotel-modal-title").textContent = hotel.name;
  document.getElementById("hotel-modal-location").textContent = `${hotel.address} (${hotel.cityTh}, ${hotel.country})`;
  document.getElementById("hotel-modal-desc").textContent = hotel.description;
  document.getElementById("hotel-modal-rating").textContent = `${hotel.rating} / 5.0 (${hotel.reviewsCount} รีวิวจากผู้เข้าพักจริง)`;

  const galleryContainer = document.getElementById("hotel-modal-gallery");
  galleryContainer.innerHTML = hotel.gallery.map((img, i) => `
    <img src="${img}" alt="${hotel.name} ${i+1}" loading="lazy" decoding="async" class="w-full h-44 object-cover rounded-2xl shadow-xs">
  `).join("");

  const amenContainer = document.getElementById("hotel-modal-amenities");
  amenContainer.innerHTML = hotel.amenities.map(a => `
    <div class="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
      <i data-lucide="check" class="w-4 h-4 text-emerald-600 flex-shrink-0"></i>
      <span>${a}</span>
    </div>
  `).join("");

  const roomsContainer = document.getElementById("hotel-modal-rooms");
  roomsContainer.innerHTML = hotel.roomTypes.map(room => `
    <div class="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-sky-300 transition shadow-xs">
      <div>
        <h4 class="font-bold text-slate-900 text-sm">${room.name}</h4>
        <div class="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
          <span>${room.bed}</span>
          <span>${room.size}</span>
          <span>${room.breakfast ? 'รวมอาหารเช้า 2 ท่าน' : 'ไม่รวมอาหารเช้า'}</span>
        </div>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <div class="text-right">
          <span class="text-xs text-slate-400 block">ต่อคืน (รวมภาษี)</span>
          <span class="text-base font-black text-sky-900">${room.price.toLocaleString()} ฿</span>
        </div>
        <button onclick="bookHotelRoom('${hotel.id}', '${room.name}', ${room.price})" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition whitespace-nowrap">
          จองห้องนี้
        </button>
      </div>
    </div>
  `).join("");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons(modal);
}

function closeHotelDetailModal() {
  const modal = document.getElementById("hotel-detail-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function bookHotelRoom(hotelId, roomName, price) {
  const hotel = DREAM_DATA.hotels.find(h => h.id === hotelId);
  if (!hotel) return;

  const nights = 2;
  window.DreamState.addToCart({
    id: `${hotel.id}-${roomName.replace(/\s+/g, '-').toLowerCase()}`,
    type: "hotel",
    title: `${hotel.name}`,
    subtitle: `${roomName} (${nights} คืน)`,
    price: price * nights,
    quantity: 1,
    image: hotel.image,
    details: { hotelId, roomName, nights }
  });

  closeHotelDetailModal();
  window.showToast(`เพิ่ม ${hotel.name} ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// --- Render Restaurants & Deep Filter ---
let currentRestaurantCuisine = "all";

function setRestaurantCuisineTab(cuisine, btn) {
  currentRestaurantCuisine = cuisine;
  document.querySelectorAll(".restaurant-tab-pill").forEach(p => {
    p.classList.remove("bg-slate-900", "text-white");
    p.classList.add("bg-white", "text-slate-700", "border", "border-slate-200");
  });
  if (btn) {
    btn.classList.add("bg-slate-900", "text-white");
    btn.classList.remove("bg-white", "text-slate-700", "border", "border-slate-200");
  }
  filterRestaurants();
}

function filterRestaurants() {
  const keyword = (document.getElementById("restaurant-filter-search")?.value || "").trim().toLowerCase();
  const city = document.getElementById("restaurant-filter-city")?.value || "all";
  const priceTier = document.getElementById("restaurant-filter-price")?.value || "all";
  const sort = document.getElementById("restaurant-filter-sort")?.value || "default";

  let list = [...DREAM_DATA.restaurants];

  // Search keyword (Deep search across name, cuisine, city, highlight, address, menuHighlights)
  if (keyword) {
    list = list.filter(r => 
      r.name.toLowerCase().includes(keyword) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(keyword)) ||
      (r.city && r.city.toLowerCase().includes(keyword)) ||
      (r.cityTh && r.cityTh.includes(keyword)) ||
      (r.highlight && r.highlight.toLowerCase().includes(keyword)) ||
      (r.address && r.address.toLowerCase().includes(keyword)) ||
      (r.menuHighlights && r.menuHighlights.join(' ').toLowerCase().includes(keyword))
    );
  }

  // City filter
  if (city !== "all") {
    list = list.filter(r => r.city.toLowerCase() === city.toLowerCase() || (r.cityTh && r.cityTh.includes(city)));
  }

  // Cuisine tab
  if (currentRestaurantCuisine !== "all") {
    list = list.filter(r => r.cuisine.toLowerCase().includes(currentRestaurantCuisine.toLowerCase()));
  }

  // Price tier
  if (priceTier === "budget") {
    list = list.filter(r => r.priceLevel === "฿" || (r.averagePrice && r.averagePrice <= 180));
  } else if (priceTier === "medium") {
    list = list.filter(r => (r.averagePrice && r.averagePrice > 180 && r.averagePrice <= 800));
  } else if (priceTier === "luxury") {
    list = list.filter(r => (r.averagePrice && r.averagePrice > 800) || r.priceLevel === "฿฿฿" || r.priceLevel === "฿฿฿฿");
  }

  // Sorting
  if (sort === "price-low") {
    list.sort((a, b) => (a.averagePrice || 0) - (b.averagePrice || 0));
  } else if (sort === "price-high") {
    list.sort((a, b) => (b.averagePrice || 0) - (a.averagePrice || 0));
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  const countLabel = document.getElementById("restaurants-count-label");
  if (countLabel) {
    const minPrice = list.length > 0 ? Math.min(...list.map(r => r.averagePrice || 100)) : 0;
    countLabel.textContent = `พบร้านอาหารทั้งหมด ${list.length} ร้าน ${city !== 'all' ? `ใน "${city}"` : ''} ${minPrice > 0 ? `(ราคาเฉลี่ยเริ่มต้น ${minPrice.toLocaleString()} ฿)` : ''}`;
  }

  const container = document.getElementById("restaurants-grid");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="utensils" class="w-12 h-12 mx-auto stroke-1 mb-2"></i>
        <p class="font-medium">ไม่พบร้านอาหารที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
        <button onclick="resetRestaurantFilters()" class="mt-3 px-4 py-2 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold hover:bg-amber-200 transition">รีเซ็ตตัวกรอง</button>
      </div>
    `;
    refreshIcons(container);
    return;
  }

  container.innerHTML = list.map(r => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div class="relative h-48 overflow-hidden">
        <img src="${r.image}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'" alt="${r.name}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <span class="absolute top-3 left-3 bg-amber-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
          ${r.priceLevel || '฿'}
        </span>
        <button onclick="toggleWishlistItem('${r.id}')" class="absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 flex items-center justify-center transition shadow-md">
          <i data-lucide="heart" class="w-4 h-4 ${window.DreamState.isInWishlist(r.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
        </button>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-1 text-amber-500 text-xs mb-1">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
            <span class="text-slate-700 font-bold">${r.rating}</span>
            <span class="text-slate-400">(${r.reviewsCount} รีวิว)</span>
            <span class="text-slate-300 mx-1">•</span>
            <span class="text-slate-500 font-medium">${r.cityTh}</span>
          </div>
          <h3 class="font-bold text-slate-900 text-base group-hover:text-sky-600 transition">${r.name}</h3>
          <p class="text-xs text-sky-700 font-semibold mt-0.5">${r.cuisine}</p>
          <p class="text-xs text-slate-500 line-clamp-2 mt-1">${r.highlight || r.description || ''}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block">งบเฉลี่ย / ท่าน</span>
            <span class="text-base font-bold text-slate-900">~${(r.averagePrice || 100).toLocaleString()} ฿</span>
          </div>
          <button onclick="openRestaurantModal('${r.id}')" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition flex items-center gap-1">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i> จองโต๊ะ
          </button>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function renderRestaurants(filterCuisine = "all") {
  currentRestaurantCuisine = filterCuisine;
  filterRestaurants();
}

function resetRestaurantFilters() {
  if (document.getElementById("restaurant-filter-search")) document.getElementById("restaurant-filter-search").value = "";
  if (document.getElementById("restaurant-filter-city")) document.getElementById("restaurant-filter-city").value = "all";
  if (document.getElementById("restaurant-filter-price")) document.getElementById("restaurant-filter-price").value = "all";
  if (document.getElementById("restaurant-filter-sort")) document.getElementById("restaurant-filter-sort").value = "default";
  currentRestaurantCuisine = "all";
  document.querySelectorAll(".restaurant-tab-pill").forEach((p, idx) => {
    if (idx === 0) {
      p.classList.add("bg-slate-900", "text-white");
      p.classList.remove("bg-white", "text-slate-700", "border", "border-slate-200");
    } else {
      p.classList.remove("bg-slate-900", "text-white");
      p.classList.add("bg-white", "text-slate-700", "border", "border-slate-200");
    }
  });
  filterRestaurants();
}

function openRestaurantModal(restId) {
  const rest = DREAM_DATA.restaurants.find(r => r.id === restId);
  if (!rest) return;

  const modal = document.getElementById("restaurant-modal");
  if (!modal) return;

  document.getElementById("rest-modal-name").textContent = rest.name;
  document.getElementById("rest-modal-info").textContent = `${rest.cuisine} | ${rest.address} | เวลาเปิด-ปิด: ${rest.openHours}`;
  document.getElementById("rest-modal-highlight").textContent = rest.highlight;
  document.getElementById("rest-modal-id").value = rest.id;

  const menuCont = document.getElementById("rest-modal-menu");
  menuCont.innerHTML = rest.menuHighlights.map(m => `
    <span class="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg font-medium">${m}</span>
  `).join("");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons(modal);
}

function closeRestaurantModal() {
  const modal = document.getElementById("restaurant-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function confirmRestaurantBooking() {
  const restId = document.getElementById("rest-modal-id").value;
  const rest = DREAM_DATA.restaurants.find(r => r.id === restId);
  if (!rest) return;

  const date = document.getElementById("rest-book-date").value || "16 มี.ค. 2026";
  const time = document.getElementById("rest-book-time").value || "18:00 น.";
  const guests = parseInt(document.getElementById("rest-book-guests").value || "2", 10);
  const depositPrice = 500 * guests;

  window.DreamState.addToCart({
    id: `dining-${rest.id}-${Date.now()}`,
    type: "restaurant",
    title: `จองโต๊ะร้าน ${rest.name}`,
    subtitle: `วันที่: ${date} เวลา: ${time} (${guests} ที่นั่ง) | มัดจำจองโต๊ะ`,
    price: depositPrice,
    quantity: 1,
    image: rest.image
  });

  closeRestaurantModal();
  window.showToast(`เพิ่มการจองโต๊ะ "${rest.name}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// --- Render Attractions & Deep Filter ---
function filterAttractions() {
  const keyword = (document.getElementById("attraction-filter-search")?.value || "").trim().toLowerCase();
  const city = document.getElementById("attraction-filter-city")?.value || "all";
  const priceFilter = document.getElementById("attraction-filter-price")?.value || "all";
  const sort = document.getElementById("attraction-filter-sort")?.value || "default";

  let list = [...DREAM_DATA.attractions];

  // Keyword search
  if (keyword) {
    list = list.filter(a => 
      a.name.toLowerCase().includes(keyword) ||
      (a.city && a.city.toLowerCase().includes(keyword)) ||
      (a.cityTh && a.cityTh.includes(keyword)) ||
      (a.category && a.category.toLowerCase().includes(keyword)) ||
      (a.description && a.description.toLowerCase().includes(keyword)) ||
      (a.includes && a.includes.join(' ').toLowerCase().includes(keyword))
    );
  }

  // City filter
  if (city !== "all") {
    list = list.filter(a => a.city.toLowerCase() === city.toLowerCase() || (a.cityTh && a.cityTh.includes(city)));
  }

  // Price filter
  if (priceFilter === "free") {
    list = list.filter(a => a.price === 0);
  } else if (priceFilter === "under500") {
    list = list.filter(a => a.price <= 500);
  } else if (priceFilter === "over500") {
    list = list.filter(a => a.price > 500);
  }

  // Sorting
  if (sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  const countLabel = document.getElementById("attractions-count-label");
  if (countLabel) {
    const freeCount = list.filter(a => a.price === 0).length;
    countLabel.textContent = `พบกิจกรรม & สถานที่ท่องเที่ยวทั้งหมด ${list.length} แห่ง ${city !== 'all' ? `ใน "${city}"` : ''} ${freeCount > 0 ? `(เข้าชมฟรี ${freeCount} แห่ง)` : ''}`;
  }

  const container = document.getElementById("attractions-grid");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="compass" class="w-12 h-12 mx-auto stroke-1 mb-2"></i>
        <p class="font-medium">ไม่พบสถานที่ท่องเที่ยวที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
        <button onclick="resetAttractionFilters()" class="mt-3 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200 transition">รีเซ็ตตัวกรอง</button>
      </div>
    `;
    refreshIcons(container);
    return;
  }

  container.innerHTML = list.map(a => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div class="relative h-52 overflow-hidden">
        <img src="${a.image}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80'" alt="${a.name}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <span class="absolute top-3 left-3 ${a.price === 0 ? 'bg-emerald-600' : 'bg-sky-600'} text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
          ${a.price === 0 ? '🆓 เข้าชมฟรี' : a.duration}
        </span>
        <button onclick="toggleWishlistItem('${a.id}')" class="absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500 flex items-center justify-center transition shadow-md">
          <i data-lucide="heart" class="w-4 h-4 ${window.DreamState.isInWishlist(a.id) ? 'fill-rose-500 text-rose-500' : ''}"></i>
        </button>
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-xs font-semibold text-emerald-700 uppercase">${a.cityTh} • ${a.category}</span>
          <h3 class="font-bold text-slate-900 text-base mt-1 line-clamp-2 group-hover:text-sky-600 transition">${a.name}</h3>
          <p class="text-xs text-slate-500 line-clamp-2 mt-1.5">${a.description}</p>
          
          <div class="mt-2.5 p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
            <i data-lucide="tag" class="w-3.5 h-3.5 flex-shrink-0"></i>
            <span>${a.comboDiscount || 'รับประกันราคาดีที่สุด'}</span>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            ${a.price === 0 ? `
              <span class="text-[11px] text-slate-400 block">ค่าเข้าชม</span>
              <span class="text-lg font-black text-emerald-600">เข้าชมฟรี (0 ฿)</span>
            ` : `
              <span class="text-[11px] text-slate-400 line-through block">${(a.originalPrice || Math.round(a.price * 1.25)).toLocaleString()} ฿</span>
              <span class="text-lg font-black text-sky-900">${a.price.toLocaleString()} ฿</span>
            `}
          </div>
          <button onclick="bookAttractionTicket('${a.id}')" class="px-4 py-2 rounded-xl ${a.price === 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'} text-white text-xs font-bold shadow-md transition flex items-center gap-1">
            <i data-lucide="${a.price === 0 ? 'check-circle' : 'ticket'}" class="w-3.5 h-3.5"></i> ${a.price === 0 ? 'เพิ่มในแผนทริป' : 'ซื้อบัตรทันที'}
          </button>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function renderAttractions(filterCat = "all") {
  filterAttractions();
}

function resetAttractionFilters() {
  if (document.getElementById("attraction-filter-search")) document.getElementById("attraction-filter-search").value = "";
  if (document.getElementById("attraction-filter-city")) document.getElementById("attraction-filter-city").value = "all";
  if (document.getElementById("attraction-filter-price")) document.getElementById("attraction-filter-price").value = "all";
  if (document.getElementById("attraction-filter-sort")) document.getElementById("attraction-filter-sort").value = "default";
  filterAttractions();
}

function bookAttractionTicket(attrId) {
  const attr = DREAM_DATA.attractions.find(a => a.id === attrId);
  if (!attr) return;

  window.DreamState.addToCart({
    id: `ticket-${attr.id}-${Date.now()}`,
    type: "attraction",
    title: attr.name,
    subtitle: `${attr.duration} | รวม: ${attr.includes.slice(0, 2).join(", ")}`,
    price: attr.price,
    quantity: 1,
    image: attr.image
  });

  window.showToast(`เพิ่มบัตรเข้าชม "${attr.name}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// --- Render Flights & Deep Filter ---
function filterFlights() {
  const keyword = (document.getElementById("flight-search-keyword")?.value || "").trim().toLowerCase();
  const origin = document.getElementById("flight-filter-origin")?.value || "all";
  const dest = document.getElementById("flight-filter-dest")?.value || "all";
  const cabinClass = document.getElementById("flight-filter-class")?.value || "all";
  const sort = document.getElementById("flight-filter-sort")?.value || "price-asc";

  let list = [...DREAM_DATA.flights];

  // Keyword search (airline, flightNo, destination, city, airport code)
  if (keyword) {
    list = list.filter(fl => 
      fl.flightNo.toLowerCase().includes(keyword) ||
      fl.airline.toLowerCase().includes(keyword) ||
      fl.from.toLowerCase().includes(keyword) ||
      fl.to.toLowerCase().includes(keyword) ||
      (fl.destinationCity && fl.destinationCity.toLowerCase().includes(keyword)) ||
      (fl.destinationCityTh && fl.destinationCityTh.includes(keyword)) ||
      fl.cabinClass.toLowerCase().includes(keyword)
    );
  }

  // Origin filter
  if (origin !== "all") {
    list = list.filter(fl => fl.from.includes(origin));
  }

  // Destination filter
  if (dest !== "all") {
    list = list.filter(fl => 
      fl.destinationCity === dest || 
      fl.to.includes(dest) || 
      (fl.destinationCityTh && fl.destinationCityTh.includes(dest))
    );
  }

  // Cabin Class filter
  if (cabinClass !== "all") {
    list = list.filter(fl => fl.cabinClass.toLowerCase().includes(cabinClass.toLowerCase()));
  }

  // Sorting
  if (sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "time-asc") {
    list.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  }

  const countLabel = document.getElementById("flights-count-label");
  if (countLabel) {
    const minPrice = list.length > 0 ? Math.min(...list.map(fl => fl.price)) : 0;
    countLabel.textContent = `พบตั๋วเครื่องบินทั้งหมด ${list.length} เส้นทาง ${dest !== 'all' ? `สู่ "${dest}"` : ''} ${minPrice > 0 ? `(ราคาเริ่มต้น ${minPrice.toLocaleString()} ฿)` : ''}`;
  }

  const container = document.getElementById("flights-list");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 shadow-xs">
        <i data-lucide="plane-takeoff" class="w-12 h-12 mx-auto stroke-1 mb-2"></i>
        <p class="font-medium text-slate-600">ไม่พบเที่ยวบินที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
        <p class="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา ปลายทาง หรือกดล้างตัวกรองเพื่อดูทุกเส้นทาง</p>
        <button onclick="resetFlightFilters()" class="mt-4 px-4 py-2 rounded-xl bg-sky-100 text-sky-700 text-xs font-bold hover:bg-sky-200 transition">รีเซ็ตตัวกรอง</button>
      </div>
    `;
    refreshIcons(container);
    return;
  }

  container.innerHTML = list.map(fl => `
    <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group">
      <div class="flex items-center gap-4">
        <img src="${fl.airlineLogo}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80'" alt="${fl.airline}" loading="lazy" decoding="async" class="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-xs">
        <div>
          <span class="text-xs font-bold text-sky-600 uppercase tracking-wide">${fl.airline}</span>
          <h4 class="font-extrabold text-slate-900 text-base">${fl.flightNo} • ${fl.cabinClass}</h4>
          <span class="text-xs text-slate-400 block mt-0.5">${fl.baggage}</span>
        </div>
      </div>

      <div class="flex items-center gap-6 text-center w-full lg:w-auto justify-around">
        <div class="text-left">
          <div class="text-xl font-black text-slate-900">${fl.departureTime}</div>
          <div class="text-xs text-slate-500 font-medium">${fl.from}</div>
        </div>
        <div class="flex flex-col items-center px-4">
          <span class="text-[11px] text-slate-400 font-semibold mb-1">${fl.duration}</span>
          <div class="w-24 h-0.5 bg-slate-300 relative flex items-center justify-center">
            <i data-lucide="plane" class="w-3.5 h-3.5 text-sky-600 bg-white px-0.5"></i>
          </div>
          <span class="text-[11px] text-emerald-600 font-bold mt-1">${fl.stops}</span>
        </div>
        <div class="text-right">
          <div class="text-xl font-black text-slate-900">${fl.arrivalTime}</div>
          <div class="text-xs text-slate-500 font-medium">${fl.to}</div>
        </div>
      </div>

      <div class="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
        <div class="text-left lg:text-right">
          <span class="text-[11px] text-slate-400 block">ราคาไป-กลับ / ท่าน</span>
          <span class="text-xl font-black text-slate-900">${fl.price.toLocaleString()} ฿</span>
        </div>
        <button onclick="openSeatPickerModal('${fl.id}')" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center gap-1.5 whitespace-nowrap">
          <i data-lucide="armchair" class="w-4 h-4"></i> เลือกที่นั่ง & จอง
        </button>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function renderFlights() {
  filterFlights();
}

function resetFlightFilters() {
  if (document.getElementById("flight-search-keyword")) document.getElementById("flight-search-keyword").value = "";
  if (document.getElementById("flight-filter-origin")) document.getElementById("flight-filter-origin").value = "all";
  if (document.getElementById("flight-filter-dest")) document.getElementById("flight-filter-dest").value = "all";
  if (document.getElementById("flight-filter-class")) document.getElementById("flight-filter-class").value = "all";
  if (document.getElementById("flight-filter-sort")) document.getElementById("flight-filter-sort").value = "price-asc";
  filterFlights();
}

function openSeatPickerModal(flightId) {
  const flight = DREAM_DATA.flights.find(f => f.id === flightId);
  if (!flight) return;

  const modal = document.getElementById("seat-picker-modal");
  if (!modal) return;

  document.getElementById("seat-modal-flight-info").textContent = `${flight.airline} (${flight.flightNo}) : ${flight.from} -> ${flight.to}`;
  document.getElementById("seat-modal-flight-id").value = flight.id;

  const grid = document.getElementById("airplane-seat-grid");
  const rows = [12, 14, 15, 16, 17, 18, 19, 20];
  const cols = ["A", "B", "C", "D", "E", "F"];

  let html = "";
  rows.forEach(r => {
    html += `<div class="flex items-center justify-center gap-2 my-1.5">`;
    html += `<span class="w-6 text-center text-xs font-bold text-slate-400">${r}</span>`;
    cols.forEach((c, idx) => {
      if (idx === 3) html += `<div class="w-6 text-center text-[10px] text-slate-300">| ทางเดิน |</div>`;
      const seatCode = `${r}${c}`;
      const isOccupied = (r === 12 && c === "A") || (r === 15 && c === "C") || (r === 17 && c === "D");
      html += `
        <div class="airplane-seat ${isOccupied ? 'occupied' : 'available'}" data-seat="${seatCode}" onclick="selectAirplaneSeat('${seatCode}', this)">
          ${c}
        </div>
      `;
    });
    html += `</div>`;
  });

  grid.innerHTML = html;
  document.getElementById("selected-seat-display").textContent = "ยังไม่ได้เลือกที่นั่ง (คลิกที่นั่งที่ต้องการ)";

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function selectAirplaneSeat(seatCode, elem) {
  if (elem.classList.contains("occupied")) {
    window.showToast("ที่นั่งนี้มีผู้โดยสารสำรองแล้ว กรุณาเลือกที่นั่งอื่น", "warning");
    return;
  }

  document.querySelectorAll(".airplane-seat.selected").forEach(s => {
    s.classList.remove("selected");
    s.classList.add("available");
  });

  elem.classList.remove("available");
  elem.classList.add("selected");
  document.getElementById("selected-seat-display").textContent = `ที่นั่งที่เลือก: ${seatCode} (ชั้น Economy)`;
  document.getElementById("seat-modal-selected-seat").value = seatCode;
}

function closeSeatPickerModal() {
  const modal = document.getElementById("seat-picker-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function confirmFlightBooking() {
  const flightId = document.getElementById("seat-modal-flight-id").value;
  const seatCode = document.getElementById("seat-modal-selected-seat").value || "14A";
  const flight = DREAM_DATA.flights.find(f => f.id === flightId);
  if (!flight) return;

  window.DreamState.addToCart({
    id: `flight-${flight.id}-${Date.now()}`,
    type: "flight",
    title: `ตั๋วเครื่องบิน ${flight.airline} (${flight.flightNo})`,
    subtitle: `${flight.from} -> ${flight.to} | ที่นั่ง: ${seatCode}`,
    price: flight.price,
    quantity: 1,
    image: flight.airlineLogo
  });

  closeSeatPickerModal();
  window.showToast(`เพิ่มเที่ยวบิน ${flight.flightNo} ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// --- AI Trip Planner Controller with Budget Settings ---
function setAIBudgetPreset(amount) {
  const input = document.getElementById("ai-budget-input");
  const slider = document.getElementById("ai-budget-slider");
  if (input) input.value = amount;
  if (slider) slider.value = amount;
}

function syncAIBudgetSlider(val) {
  const input = document.getElementById("ai-budget-input");
  if (input) input.value = val;
}

function syncAIBudgetInput(val) {
  const slider = document.getElementById("ai-budget-slider");
  if (slider) slider.value = val;
}

function formatCurrencyPrice(amountThb) {
  return window.DreamCurrency ? window.DreamCurrency.formatPrice(amountThb) : `${Math.round(amountThb).toLocaleString()} ฿`;
}

function toggleStyleTag(btn, style) {
  const isActive = btn.getAttribute("data-active") === "true";
  btn.setAttribute("data-active", !isActive ? "true" : "false");
  if (!isActive) {
    btn.className = "ai-style-tag px-3.5 py-2 rounded-xl border border-sky-300 bg-sky-50 text-sky-800 font-bold text-xs transition flex items-center gap-1.5 shadow-xs";
  } else {
    btn.className = "ai-style-tag px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs transition flex items-center gap-1.5 hover:border-sky-300";
  }
}

function selectAIDayTab(dayTab) {
  if (window.DreamPlanner) {
    window.DreamPlanner.setActiveDayTab(dayTab);
    if (window.DreamPlanner.currentPlan) {
      renderAIPlan(window.DreamPlanner.currentPlan);
    }
  }
}

let isPlanGenerating = false;

async function runAITripPlanner() {
  if (isPlanGenerating) {
    window.showToast(" AI กำลังจัดสรรงบประมาณและแพลนการเดินทาง กรุณารอสักครู่...", "warning");
    return;
  }
  isPlanGenerating = true;

  const destSelect = document.getElementById("ai-dest-select");
  const destId = destSelect ? destSelect.value : "dest-tokyo";
  const days = parseInt(document.getElementById("ai-days-select")?.value || 3, 10);
  const travelers = parseInt(document.getElementById("ai-travelers-select")?.value || 2, 10);
  const budget = parseInt(document.getElementById("ai-budget-input")?.value || 35000, 10);
  const isBudgetPerPerson = document.getElementById("ai-budget-mode-person")?.checked ?? true;

  // Multi-style tags
  const activeStyles = [];
  document.querySelectorAll(".ai-style-tag").forEach(b => {
    if (b.getAttribute("data-active") === "true") {
      activeStyles.push(b.getAttribute("data-style"));
    }
  });

  const resultContainer = document.getElementById("ai-plan-results");
  const loadingContainer = document.getElementById("ai-plan-loading");
  const btn = document.getElementById("ai-generate-btn");
  const btnText = document.getElementById("ai-generate-btn-text");

  // Disable button & loading animation
  if (btn) {
    btn.disabled = true;
    btn.classList.add("opacity-75", "cursor-not-allowed", "pointer-events-none");
  }
  if (btnText) {
    btnText.textContent = "AI กำลังจัดสรรงบประมาณและแพลนท่องเที่ยวของคุณ...";
  }
  if (loadingContainer) loadingContainer.classList.remove("hidden");
  if (resultContainer) resultContainer.classList.add("hidden");

  try {
    let plan;
    if (window.DreamPlanner && typeof window.DreamPlanner.generateWithGemini === "function") {
      plan = await window.DreamPlanner.generateWithGemini({
        destinationId: destId,
        days,
        travelers,
        styles: activeStyles,
        budget,
        isBudgetPerPerson
      });
    } else {
      plan = window.DreamPlanner.generateItinerary({
        destinationId: destId,
        days,
        travelers,
        styles: activeStyles,
        budget,
        isBudgetPerPerson
      });
    }

    if (loadingContainer) loadingContainer.classList.add("hidden");
    if (resultContainer) {
      resultContainer.classList.remove("hidden");
      renderAIPlan(plan);
      resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (plan && plan.isFallback) {
      window.showToast("ระบบจัดสรรงบประมาณด้วย Smart Travel Engine ออฟไลน์เรียบร้อย", "info");
    } else {
      window.showToast("Google Gemini AI สร้างแพลนท่องเที่ยวและงบประมาณสำเร็จ!", "success");
    }
  } catch (err) {
    console.error("runAITripPlanner error:", err);
    // Smooth fallback guarantee
    const fallbackPlan = window.DreamPlanner.generateItinerary({
      destinationId: destId,
      days,
      travelers,
      styles: activeStyles,
      budget,
      isBudgetPerPerson
    });
    if (loadingContainer) loadingContainer.classList.add("hidden");
    if (resultContainer) {
      resultContainer.classList.remove("hidden");
      renderAIPlan(fallbackPlan);
      resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.showToast("จัดสรรแผนการเดินทางสำเร็จ", "info");
  } finally {
    isPlanGenerating = false;
    if (btn) {
      btn.disabled = false;
      btn.classList.remove("opacity-75", "cursor-not-allowed", "pointer-events-none");
    }
    if (btnText) {
      btnText.textContent = "สร้างแผนการเดินทางอัจฉริยะ (AI Generate Plan)";
    }
  }
}

function switchAIPlanVariant(variantKey) {
  const plan = window.DreamPlanner.switchVariant(variantKey);
  if (plan) {
    renderAIPlan(plan);
  }
}

function renderAIPlan(plan) {
  if (!plan) return;

  const destTitle = document.getElementById("ai-result-dest-title");
  const summary = document.getElementById("ai-result-summary");
  const rawPrice = document.getElementById("ai-result-raw-price");
  const discountPrice = document.getElementById("ai-result-discount-price");
  const finalPrice = document.getElementById("ai-result-final-price");

  if (destTitle) destTitle.textContent = `แผนการท่องเที่ยวในฝัน: ${plan.destination.name} ${plan.days} วัน ${plan.days > 1 ? plan.days - 1 : 0} คืน`;
  if (summary) summary.textContent = `${plan.variantTitle} • ผู้เดินทาง ${plan.travelers} ท่าน`;
  if (rawPrice) rawPrice.textContent = formatCurrencyPrice(plan.rawTotal);
  if (discountPrice) discountPrice.textContent = `-${formatCurrencyPrice(plan.bundleDiscount)}`;
  if (finalPrice) finalPrice.textContent = formatCurrencyPrice(plan.estimatedTotal);

  // Budget Tracker Indicator
  const target = plan.targetBudgetTotal;
  const actual = plan.estimatedTotal;
  const pct = Math.min(100, Math.round((actual / target) * 100));
  const bar = document.getElementById("ai-budget-progress-bar");
  const badge = document.getElementById("ai-budget-status-badge");

  if (bar) {
    bar.style.width = `${pct}%`;
    bar.className = actual <= target ? "bg-emerald-500 h-2.5 rounded-full transition-all duration-500" : "bg-rose-500 h-2.5 rounded-full transition-all duration-500";
  }

  if (badge) {
    if (actual <= target) {
      badge.textContent = `อยู่ในงบประมาณ (ใช้ไป ${formatCurrencyPrice(actual)} จากงบ ${formatCurrencyPrice(target)})`;
      badge.className = "text-xs font-bold text-emerald-400";
    } else {
      badge.textContent = ` เกินงบที่ตั้งไว้ ${formatCurrencyPrice(actual - target)}`;
      badge.className = "text-xs font-bold text-rose-400";
    }
  }

  // 1. BUDGET BREAKDOWN CARD UPDATE
  const bd = plan.breakdown;
  if (bd) {
    const barHotel = document.getElementById("bar-hotel");
    const barFood = document.getElementById("bar-food");
    const barAct = document.getElementById("bar-activity");
    const barBuf = document.getElementById("bar-buffer");

    if (barHotel) barHotel.style.width = `${bd.hotel.percent}%`;
    if (barFood) barFood.style.width = `${bd.food.percent}%`;
    if (barAct) barAct.style.width = `${bd.activity.percent}%`;
    if (barBuf) barBuf.style.width = `${bd.buffer.percent}%`;

    const pctHotel = document.getElementById("pct-hotel");
    const pctFood = document.getElementById("pct-food");
    const pctAct = document.getElementById("pct-activity");
    const pctBuf = document.getElementById("pct-buffer");

    if (pctHotel) pctHotel.textContent = `${bd.hotel.percent}%`;
    if (pctFood) pctFood.textContent = `${bd.food.percent}%`;
    if (pctAct) pctAct.textContent = `${bd.activity.percent}%`;
    if (pctBuf) pctBuf.textContent = `${bd.buffer.percent}%`;

    const bdHotelAmt = document.getElementById("bd-hotel-amount");
    const bdFoodAmt = document.getElementById("bd-food-amount");
    const bdActAmt = document.getElementById("bd-act-amount");
    const bdBufAmt = document.getElementById("bd-buf-amount");

    if (bdHotelAmt) bdHotelAmt.textContent = formatCurrencyPrice(bd.hotel.cost);
    if (bdFoodAmt) bdFoodAmt.textContent = formatCurrencyPrice(bd.food.cost);
    if (bdActAmt) bdActAmt.textContent = formatCurrencyPrice(bd.activity.cost);
    if (bdBufAmt) bdBufAmt.textContent = formatCurrencyPrice(bd.buffer.cost);

    const bdHotelPct = document.getElementById("bd-hotel-pct");
    const bdFoodPct = document.getElementById("bd-food-pct");
    const bdActPct = document.getElementById("bd-act-pct");
    const bdBufPct = document.getElementById("bd-buf-pct");

    if (bdHotelPct) bdHotelPct.textContent = `${bd.hotel.percent}% ของงบ`;
    if (bdFoodPct) bdFoodPct.textContent = `${bd.food.percent}% ของงบ`;
    if (bdActPct) bdActPct.textContent = `${bd.activity.percent}% ของงบ`;
    if (bdBufPct) bdBufPct.textContent = `${bd.buffer.percent}% ของงบ`;
  }

  // 2. DAY SELECTOR TABS
  const dayTabsContainer = document.getElementById("ai-day-tabs-container");
  if (dayTabsContainer) {
    const activeTab = window.DreamPlanner.activeDayTab || "all";
    let tabsHtml = `
      <button type="button" onclick="selectAIDayTab('all')" class="px-3.5 py-1.5 rounded-xl transition ${activeTab === 'all' ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
        ทุกวัน (${plan.days} วัน)
      </button>
    `;
    plan.itineraryDays.forEach(d => {
      const isDayActive = String(activeTab) === String(d.dayNumber);
      tabsHtml += `
        <button type="button" onclick="selectAIDayTab(${d.dayNumber})" class="px-3 py-1.5 rounded-xl transition whitespace-nowrap ${isDayActive ? 'bg-sky-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}">
          วันที่ ${d.dayNumber}
        </button>
      `;
    });
    dayTabsContainer.innerHTML = tabsHtml;
  }

  // Tips Box
  const tipsContainer = document.getElementById("ai-local-tips-box");
  if (tipsContainer && plan.localTips) {
    tipsContainer.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div class="p-3 bg-sky-50 rounded-xl border border-sky-100 text-sky-900">
          <strong class="block mb-1 font-bold">การเดินทาง:</strong> ${plan.localTips.transport}
        </div>
        <div class="p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-900">
          <strong class="block mb-1 font-bold">สภาพอากาศ:</strong> ${plan.localTips.weather}
        </div>
        <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900">
          <strong class="block mb-1 font-bold">จุดลับแนะนำ:</strong> ${plan.localTips.secretSpot}
        </div>
      </div>
    `;
  }

  // Update variant tabs UI
  ["A", "B", "C"].forEach(k => {
    const tab = document.getElementById(`ai-variant-tab-${k}`);
    if (tab) {
      if (k === window.DreamPlanner.activeVariant) {
        tab.className = "px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs transition shadow-xs";
      } else {
        tab.className = "px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition";
      }
    }
  });

  // 3. TIMELINE SLOTS & DIRECT BOOKING CTAS
  const timelineContainer = document.getElementById("ai-timeline-container");
  if (!timelineContainer) return;

  const activeTab = window.DreamPlanner.activeDayTab || "all";
  const displayedDays = activeTab === "all" ? plan.itineraryDays : plan.itineraryDays.filter(d => String(d.dayNumber) === String(activeTab));

  timelineContainer.innerHTML = displayedDays.map((day, dIdx) => `
    <div class="mb-8 relative pl-8 timeline-stem">
      <div class="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md">
        ${day.dayNumber}
      </div>
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-extrabold text-slate-900 text-base">${day.dayTitle}</h4>
        <span class="text-xs text-slate-400 font-semibold">${day.slots.length} ช่วงเวลา</span>
      </div>

      <div class="space-y-3.5">
        ${day.slots.map((slot, sIdx) => {
          let ctaBtn = "";
          const itemId = slot.itemRef?.id || "";

          if (slot.actionType === "hotel") {
            ctaBtn = `<button type="button" onclick="openHotelDetailModal('${itemId}')" class="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"><i data-lucide="building" class="w-3.5 h-3.5"></i> <span>จองที่พักนี้ผ่านระบบ</span></button>`;
          } else if (slot.actionType === "restaurant") {
            ctaBtn = `<button type="button" onclick="openRestaurantModal('${itemId}')" class="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"><i data-lucide="utensils" class="w-3.5 h-3.5"></i> <span>จองโต๊ะร้านนี้</span></button>`;
          } else if (slot.actionType === "attraction") {
            ctaBtn = `<button type="button" onclick="bookAttractionTicket('${itemId}')" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"><i data-lucide="ticket" class="w-3.5 h-3.5"></i> <span>ซื้อตั๋วกิจกรรมทันที</span></button>`;
          } else if (slot.actionType === "flight") {
            ctaBtn = `<button type="button" onclick="openSeatPicker('${itemId}')" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"><i data-lucide="plane" class="w-3.5 h-3.5"></i> <span>เลือกที่นั่ง / จองตั๋ว</span></button>`;
          }

          return `
            <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-sky-300 transition group">
              <div class="flex items-start sm:items-center gap-3.5 min-w-0">
                <img src="${slot.image || plan.destination.image}" alt="${slot.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'" class="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-inner ring-1 ring-slate-100">
                <div class="min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-sky-700">${slot.periodLabel || slot.time}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${slot.time}</span>
                  </div>
                  <h5 class="font-black text-slate-900 text-sm group-hover:text-sky-600 transition truncate">${slot.title}</h5>
                  <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${slot.description}</p>
                </div>
              </div>

              <div class="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
                <div class="text-left md:text-right">
                  <span class="text-slate-400 block text-[10px]">ค่าใช้จ่ายประมาณการ</span>
                  <span class="text-sm font-black text-slate-900">${slot.price > 0 ? formatCurrencyPrice(slot.price) : 'รวมในแพ็กเกจ'}</span>
                </div>
                ${ctaBtn}
                <button type="button" onclick="removeAISlot(${day.dayNumber - 1}, ${sIdx})" class="text-slate-300 hover:text-rose-500 transition p-1.5 rounded-lg hover:bg-rose-50" title="ลบรายการนี้">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function removeAISlot(dIdx, sIdx) {
  const updatedPlan = window.DreamPlanner.removeItemFromPlan(dIdx, sIdx);
  renderAIPlan(updatedPlan);
  window.showToast("ปรับแต่งและคำนวณงบประมาณใหม่เรียบร้อย", "info");
}

function bookEntireAITrip() {
  const cartItem = window.DreamPlanner.bookEntirePlanToCart();
  if (cartItem) {
    window.showToast(`เพิ่มแพ็กเกจ "${cartItem.title}" ลงในตะกร้าแล้ว!`, "success");
    toggleCartDrawer(true);
  }
}

function backToAISettings() {
  document.getElementById("ai-plan-results").classList.add("hidden");
  document.getElementById("ai-dest-select").scrollIntoView({ behavior: "smooth" });
}

// --- Currency Exchange & Two-Way Converter ---
function initCurrencyView() {
  const select = document.getElementById("curr-calc-currency");
  if (!select) return;

  select.innerHTML = Object.entries(CURRENCY_CONFIG.currencies).map(([code, info]) => `
    <option value="${code}">${info.flag} ${info.name}</option>
  `).join("");

  renderCurrencyRatesTable();
  calculateTwoWayCurrency();
}

function setTwoWayExchangeMode(mode) {
  window.DreamCurrency.setExchangeMode(mode);

  const buyTab = document.getElementById("curr-tab-buy");
  const sellTab = document.getElementById("curr-tab-sell");
  const labelInput = document.getElementById("curr-calc-input-label");

  if (mode === "buy") {
    buyTab.className = "flex-1 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-xs";
    sellTab.className = "flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200";
    if (labelInput) labelInput.textContent = "จำนวนเงินบาทไทย (THB) ที่ต้องการแลก";
  } else {
    sellTab.className = "flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs";
    buyTab.className = "flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200";
    if (labelInput) labelInput.textContent = "จำนวนเงินต่างประเทศที่ต้องการแลกกลับเป็นเงินบาท";
  }

  calculateTwoWayCurrency();
}

function calculateTwoWayCurrency() {
  const mode = window.DreamCurrency.exchangeMode || "buy";
  const currCode = document.getElementById("curr-calc-currency")?.value || "USD";
  const amount = parseFloat(document.getElementById("curr-calc-amount")?.value || 10000);
  const resultElem = document.getElementById("curr-calc-result");
  const rateElem = document.getElementById("curr-calc-rate-info");

  const info = CURRENCY_CONFIG.currencies[currCode];
  if (!info) return;

  if (mode === "buy") {
    // THB -> Foreign
    const foreign = window.DreamCurrency.convert(amount, currCode, false);
    if (resultElem) resultElem.textContent = `${foreign.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currCode}`;
    if (rateElem) rateElem.textContent = `อัตราขายออก (ธนาคารขาย): 1 ${currCode} = ${info.unitSellThb} ฿`;
  } else {
    // Foreign -> THB
    const thb = window.DreamCurrency.convert(amount, currCode, true);
    if (resultElem) resultElem.textContent = `${thb.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿ (THB)`;
    if (rateElem) rateElem.textContent = `อัตรารับซื้อ (ธนาคารซื้อคืน): 1 ${currCode} = ${info.unitBuyThb} ฿`;
  }
}

function renderCurrencyRatesTable() {
  const container = document.getElementById("currency-rates-table-body");
  if (!container) return;

  container.innerHTML = Object.entries(CURRENCY_CONFIG.currencies).map(([code, info]) => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 transition text-xs">
      <td class="py-3 px-4 flex items-center gap-2">
        <span class="text-base">${info.flag}</span>
        <span class="font-bold text-slate-900">${code}</span>
        <span class="text-slate-400 hidden sm:inline text-[11px]">${info.name.split(" ")[0]}</span>
      </td>
      <td class="py-3 px-4 font-bold text-emerald-700">${info.unitBuyThb} ฿</td>
      <td class="py-3 px-4 font-bold text-sky-800">${info.unitSellThb} ฿</td>
      <td class="py-3 px-4 text-center">
        <button onclick="openCurrencyModal('${code}')" class="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] transition">แลกเงิน</button>
      </td>
    </tr>
  `).join("");
}

function openCurrencyModal(code = "USD") {
  showSection("currency");
  const sel = document.getElementById("curr-calc-currency");
  if (sel) {
    sel.value = code;
    calculateTwoWayCurrency();
  }
}

// --- Travel Wallet UI Controller ---
function renderTravelWalletOverview() {
  const wallet = window.DreamState.state.wallet;
  const thbElem = document.getElementById("wallet-thb-balance");
  if (thbElem) thbElem.textContent = `${(wallet.balances.THB || 0).toLocaleString()} ฿`;

  const currGrid = document.getElementById("wallet-currencies-grid");
  if (currGrid) {
    currGrid.innerHTML = Object.entries(wallet.balances).map(([code, bal]) => {
      const info = CURRENCY_CONFIG.currencies[code] || { flag: "TH" };
      return `
        <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">${info.flag}</span>
            <div>
              <span class="font-bold text-slate-800 text-xs block">${code}</span>
              <span class="text-[10px] text-slate-400">คงเหลือ</span>
            </div>
          </div>
          <span class="font-black text-slate-900 text-sm">${bal.toLocaleString()}</span>
        </div>
      `;
    }).join("");
  }

  const txCont = document.getElementById("wallet-transactions-list");
  if (txCont) {
    txCont.innerHTML = wallet.transactions.slice(0, 5).map(tx => `
      <div class="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
        <div>
          <span class="font-bold text-slate-800 block">${tx.title}</span>
          <span class="text-[10px] text-slate-400">${tx.date}</span>
        </div>
        <span class="font-black ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}">${tx.amount}</span>
      </div>
    `).join("");
  }
}

function openWalletTopUpModal() {
  const modal = document.getElementById("wallet-topup-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeWalletTopUpModal() {
  const modal = document.getElementById("wallet-topup-modal");
  if (modal) modal.classList.add("hidden");
}

function submitWalletTopUp() {
  const amount = document.getElementById("topup-amount-input")?.value || 5000;
  const method = document.getElementById("topup-method-select")?.value || "พร้อมเพย์ QR";

  const ok = window.DreamState.topUpWallet(amount, method);
  if (ok) {
    closeWalletTopUpModal();
    renderTravelWalletOverview();
    window.showToast(`เติมเงินสำเร็จ ${parseFloat(amount).toLocaleString()} บาทเข้ากระเป๋า Travel Wallet!`, "success");
  }
}

function openWalletExchangeModal() {
  const modal = document.getElementById("wallet-exchange-modal");
  if (modal) {
    const selFrom = document.getElementById("wallet-swap-from");
    const selTo = document.getElementById("wallet-swap-to");

    selFrom.innerHTML = Object.keys(window.DreamState.state.wallet.balances).map(c => `<option value="${c}">${c}</option>`).join("");
    selTo.innerHTML = Object.keys(CURRENCY_CONFIG.currencies).map(c => `<option value="${c}">${c}</option>`).join("");
    selTo.value = "JPY";

    calculateWalletSwapPreview();
    modal.classList.remove("hidden");
  }
}

function closeWalletExchangeModal() {
  const modal = document.getElementById("wallet-exchange-modal");
  if (modal) modal.classList.add("hidden");
}

function calculateWalletSwapPreview() {
  const from = document.getElementById("wallet-swap-from")?.value || "THB";
  const to = document.getElementById("wallet-swap-to")?.value || "JPY";
  const amt = parseFloat(document.getElementById("wallet-swap-amount")?.value || 1000);

  let targetAmt = 0;
  if (from === "THB") {
    targetAmt = window.DreamCurrency.convert(amt, to, false);
  } else if (to === "THB") {
    targetAmt = window.DreamCurrency.convert(amt, from, true);
  } else {
    const inThb = window.DreamCurrency.convert(amt, from, true);
    targetAmt = window.DreamCurrency.convert(inThb, to, false);
  }

  const previewElem = document.getElementById("wallet-swap-preview");
  if (previewElem) {
    previewElem.textContent = `คุณจะได้รับ: ${targetAmt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}`;
    previewElem.dataset.targetVal = targetAmt;
  }
}

function submitWalletSwap() {
  const from = document.getElementById("wallet-swap-from").value;
  const to = document.getElementById("wallet-swap-to").value;
  const amt = parseFloat(document.getElementById("wallet-swap-amount").value);
  const targetVal = parseFloat(document.getElementById("wallet-swap-preview")?.dataset?.targetVal || 0);

  const res = window.DreamState.convertWalletCurrency(from, to, amt, targetVal);
  if (res.success) {
    closeWalletExchangeModal();
    renderTravelWalletOverview();
    window.showToast(res.message, "success");
  } else {
    window.showToast(res.message, "error");
  }
}

// --- Cash Order Modal State & 2-Way Linking ---
let cashModalState = {
  mode: "buy", // "buy" = THB -> Foreign, "sell" = Foreign -> THB
  currency: "USD",
  lastEdited: "thb"
};

function openCashOrderModal(currencyCode, initialForeign, initialThb) {
  const modal = document.getElementById("currency-order-modal");
  if (!modal) return;

  const currentGlobalMode = window.DreamCurrency?.exchangeMode || "buy";
  cashModalState.mode = currentGlobalMode;

  const globalCurr = document.getElementById("curr-calc-currency")?.value || "USD";
  cashModalState.currency = currencyCode || globalCurr;

  const globalThb = parseFloat(document.getElementById("curr-calc-amount")?.value || 20000);
  const startingThb = initialThb !== undefined ? initialThb : globalThb;

  // Populate branch select
  const branchSelect = document.getElementById("cash-order-branch");
  if (branchSelect) {
    branchSelect.innerHTML = DREAM_DATA.exchangeBranches.map(b => `
      <option value="${b.name}">${b.name} (${b.location})</option>
    `).join("");
  }

  // Populate currency select
  const currSelect = document.getElementById("cash-order-currency");
  if (currSelect) {
    currSelect.innerHTML = Object.entries(CURRENCY_CONFIG.currencies).map(([code, info]) => `
      <option value="${code}">${info.flag} ${code} - ${info.name}</option>
    `).join("");
    currSelect.value = cashModalState.currency;
  }

  // Set date default (tomorrow)
  const dateInput = document.getElementById("cash-order-date");
  if (dateInput && !dateInput.value) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    dateInput.value = d.toISOString().split("T")[0];
  }

  // Sync mode tabs & fields
  setCashModalMode(cashModalState.mode, false);

  // Set initial THB amount and calculate foreign
  const thbInput = document.getElementById("cash-order-thb");
  if (thbInput) thbInput.value = startingThb;
  onCashOrderThbInput();

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons(modal);
}

function setCashModalMode(mode, triggerRecalc = true) {
  cashModalState.mode = mode;
  const buyTab = document.getElementById("modal-curr-tab-buy");
  const sellTab = document.getElementById("modal-curr-tab-sell");
  const thbLabel = document.getElementById("cash-order-thb-label");

  if (buyTab && sellTab) {
    if (mode === "buy") {
      buyTab.className = "flex-1 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-xs transition";
      sellTab.className = "flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition";
      if (thbLabel) thbLabel.textContent = "จำนวนเงินบาทที่จ่าย (THB)";
    } else {
      sellTab.className = "flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs transition";
      buyTab.className = "flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition";
      if (thbLabel) thbLabel.textContent = "จำนวนเงินบาทที่จะได้รับ (THB)";
    }
  }

  updateCashModalRateBox();
  if (triggerRecalc) {
    if (cashModalState.lastEdited === "thb") {
      onCashOrderThbInput();
    } else {
      onCashOrderForeignInput();
    }
  }
}

function onCashOrderCurrencyChange() {
  const currSelect = document.getElementById("cash-order-currency");
  if (currSelect) cashModalState.currency = currSelect.value;
  updateCashModalRateBox();
  onCashOrderThbInput();
}

function updateCashModalRateBox() {
  const code = cashModalState.currency;
  const info = CURRENCY_CONFIG.currencies[code];
  if (!info) return;

  const foreignLabel = document.getElementById("cash-order-foreign-label");
  if (foreignLabel) {
    foreignLabel.textContent = cashModalState.mode === "buy" 
      ? `จำนวนเงินต่างประเทศที่จะได้รับ (${code})` 
      : `จำนวนเงินต่างประเทศที่นำมาแลก (${code})`;
  }

  const rateBox = document.getElementById("cash-order-rate-box");
  if (rateBox) {
    if (cashModalState.mode === "buy") {
      rateBox.className = "p-3 bg-sky-50 rounded-xl border border-sky-100 text-center font-bold text-sky-900 text-xs";
      rateBox.innerHTML = `<span>อัตราแลกเปลี่ยนขายออก: <strong>1 ${code} = ${info.unitSellThb} ฿</strong> (อัปเดตเรียลไทม์)</span>`;
    } else {
      rateBox.className = "p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center font-bold text-emerald-900 text-xs";
      rateBox.innerHTML = `<span>อัตราแลกเปลี่ยนรับซื้อ: <strong>1 ${code} = ${info.unitBuyThb} ฿</strong> (อัปเดตเรียลไทม์)</span>`;
    }
  }
}

function onCashOrderThbInput() {
  cashModalState.lastEdited = "thb";
  const code = cashModalState.currency;
  const info = CURRENCY_CONFIG.currencies[code];
  if (!info) return;

  const thbVal = parseFloat(document.getElementById("cash-order-thb")?.value || 0);
  const foreignInput = document.getElementById("cash-order-foreign");
  if (!foreignInput) return;

  const rate = (cashModalState.mode === "buy") ? info.unitSellThb : info.unitBuyThb;
  const multiplier = (code === "JPY" || code === "KRW" || code === "IDR" || code === "VND")
    ? (code === "JPY" ? 100 : (code === "KRW" ? 1000 : 1000))
    : 1;

  const foreign = (thbVal / rate) * multiplier;
  foreignInput.value = foreign > 0 ? (foreign % 1 === 0 ? foreign : foreign.toFixed(2)) : 0;
}

function onCashOrderForeignInput() {
  cashModalState.lastEdited = "foreign";
  const code = cashModalState.currency;
  const info = CURRENCY_CONFIG.currencies[code];
  if (!info) return;

  const foreignVal = parseFloat(document.getElementById("cash-order-foreign")?.value || 0);
  const thbInput = document.getElementById("cash-order-thb");
  if (!thbInput) return;

  const rate = (cashModalState.mode === "buy") ? info.unitSellThb : info.unitBuyThb;
  const multiplier = (code === "JPY" || code === "KRW" || code === "IDR" || code === "VND")
    ? (code === "JPY" ? 100 : (code === "KRW" ? 1000 : 1000))
    : 1;

  const thb = (foreignVal / multiplier) * rate;
  thbInput.value = thb > 0 ? Math.round(thb) : 0;
}

function closeCashOrderModal() {
  const modal = document.getElementById("currency-order-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function submitCashCurrencyOrder() {
  const currency = cashModalState.currency;
  const foreignAmount = parseFloat(document.getElementById("cash-order-foreign")?.value || 1000);
  const thbAmount = parseFloat(document.getElementById("cash-order-thb")?.value || 20000);
  const deliveryMethod = document.getElementById("cash-order-method")?.value || "รับที่สนามบิน";
  const branchOrAddress = document.getElementById("cash-order-branch")?.value || "ท่าอากาศยานสุวรรณภูมิ";
  const pickupDate = document.getElementById("cash-order-date")?.value || "2026-03-20";
  const isSellBack = cashModalState.mode === "sell";

  window.DreamCurrency.orderCashCurrency({
    currency,
    foreignAmount,
    deliveryMethod,
    branchOrAddress,
    pickupDate,
    isSellBack
  });

  closeCashOrderModal();
  window.showToast(`เพิ่มรายการแลกเงินสด ${foreignAmount.toLocaleString()} ${currency} (${thbAmount.toLocaleString()} ฿) ลงในตะกร้าเรียบร้อย`, "success");
  toggleCartDrawer(true);
}

// --- Auth Modal & User Account ---
function openAuthModal(isRegister = false) {
  window.location.href = isRegister ? "login.html?tab=register" : "login.html";
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.add("hidden");
}

async function submitLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  
  if (!email || !password) {
    window.showToast("กรุณาระบุอีเมลและรหัสผ่าน", "warning");
    return;
  }

  const consent = document.getElementById("login-consent-checkbox");
  if (consent && !consent.checked) {
    window.showToast("กรุณากดยินยอมให้ประมวลผลข้อมูลตามประกาศความเป็นส่วนตัวก่อนเข้าสู่ระบบ", "warning");
    return;
  }

  const res = await window.DreamState.login(email, password);
  if (res.success) {
    try {
      localStorage.setItem("myprogram_pdpa_consent", JSON.stringify({
        accepted: true,
        acceptedAt: new Date().toISOString(),
        email: email
      }));
    } catch (e) {}

    closeAuthModal();
    renderMyAccount();
    updateNavBadges(window.DreamState.state);
    window.showToast(res.message, "success");
  } else {
    window.showToast(res.message, "error");
  }
}

async function submitRegister() {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();
  const password = document.getElementById("reg-password") ? document.getElementById("reg-password").value.trim() : "123456";

  if (!name || !email) {
    window.showToast("กรุณากรอกชื่อและอีเมล", "warning");
    return;
  }
  if (!password || password.length < 6) {
    window.showToast("กรุณากำหนดรหัสผ่านอย่างน้อย 6 ตัวอักษร", "warning");
    return;
  }

  const regConsent = document.getElementById("reg-consent-checkbox");
  if (regConsent && !regConsent.checked) {
    window.showToast("กรุณากดยินยอมให้ประมวลผลข้อมูลตามประกาศความเป็นส่วนตัวก่อนสมัครสมาชิก", "warning");
    return;
  }

  const res = await window.DreamState.register({ name, email, phone, password });
  if (res.success) {
    closeAuthModal();
    renderMyAccount();
    updateNavBadges(window.DreamState.state);
    window.showToast(res.message, "success");
  } else {
    window.showToast(res.message, "error");
  }
}

function handleUserLogout(e) {
  if (e) e.stopPropagation();
  closeUserDropdown();
  const modal = document.getElementById("logout-confirm-modal");
  if (modal) {
    modal.classList.remove("hidden");
    refreshIcons(modal);
  } else {
    if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
      confirmUserLogout();
    }
  }
}

function closeLogoutConfirmModal() {
  const modal = document.getElementById("logout-confirm-modal");
  if (modal) modal.classList.add("hidden");
}

function confirmUserLogout() {
  closeLogoutConfirmModal();
  let res;
  if (window.DreamState && typeof window.DreamState.clearSession === "function") {
    res = window.DreamState.clearSession();
  } else if (window.DreamState && typeof window.DreamState.logout === "function") {
    res = window.DreamState.logout();
  }
  window.isLoggedIn = false;
  renderMyAccount();
  updateNavBadges(window.DreamState ? window.DreamState.state : {});
  window.showToast(res?.message || "ออกจากระบบเรียบร้อยแล้ว", "info");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 400);
}

function renderMyAccount() {
  const state = window.DreamState.state;
  const user = state.auth.currentUser;
  const isLoggedIn = state.auth.isLoggedIn && user && user.email !== "-";

  const userNameElem = document.getElementById("account-user-name");
  const userEmailElem = document.getElementById("account-user-email");
  const userPhoneElem = document.getElementById("account-user-phone");
  const tierTitleElem = document.getElementById("account-tier-title");
  const pointsElem = document.getElementById("account-points-count");
  const progressBar = document.getElementById("account-tier-progress");

  if (userNameElem) userNameElem.textContent = isLoggedIn ? user.name : "ผู้เยี่ยมชม (Guest)";
  if (userEmailElem) userEmailElem.textContent = isLoggedIn ? user.email : "ยังไม่ได้เข้าสู่ระบบ";
  if (userPhoneElem) userPhoneElem.textContent = isLoggedIn ? user.phone : "-";
  if (tierTitleElem) tierTitleElem.textContent = isLoggedIn ? (user.tier || "Member") : "บุคคลทั่วไป";
  if (pointsElem) pointsElem.textContent = isLoggedIn ? (user.points || 0).toLocaleString() : "0";

  const avatarElem = document.getElementById("account-user-avatar");
  if (avatarElem) {
    if (isLoggedIn && user.avatar) avatarElem.src = user.avatar;
    else avatarElem.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
  }

  // Profile Edit fields
  const editName = document.getElementById("profile-edit-name");
  const editPhone = document.getElementById("profile-edit-phone");
  const editPassport = document.getElementById("profile-edit-passport");
  if (editName) editName.value = isLoggedIn ? user.name : "";
  if (editPhone) editPhone.value = isLoggedIn ? user.phone : "";
  if (editPassport) editPassport.value = isLoggedIn ? (user.passportNo || "") : "";

  // Progress Bar
  const progressPercent = isLoggedIn ? Math.min(100, Math.round(((user.points || 0) / (user.nextTierPoints || 5000)) * 100)) : 0;
  if (progressBar) progressBar.style.width = `${progressPercent}%`;

  // Saved Travelers
  const travelersList = document.getElementById("account-travelers-list");
  if (travelersList) {
    if (!isLoggedIn) {
      travelersList.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">กรุณาเข้าสู่ระบบเพื่อจัดการรายชื่อผู้ร่วมเดินทาง</div>`;
    } else if (!state.auth.savedTravelers || state.auth.savedTravelers.length === 0) {
      travelersList.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">ยังไม่มีข้อมูลผู้เดินทางที่บันทึกไว้</div>`;
    } else {
      travelersList.innerHTML = state.auth.savedTravelers.map(t => `
        <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span class="font-bold text-slate-800">${t.name}</span>
            <span class="text-[11px] text-slate-400 block">${t.relation} • Passport: ${t.passportNo}</span>
          </div>
          <button onclick="deleteTraveler('${t.id}')" class="text-rose-500 hover:text-rose-700 p-1">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `).join("");
    }
  }

  // Bookings List
  const bookingsContainer = document.getElementById("account-bookings-list");
  if (bookingsContainer) {
    if (!isLoggedIn) {
      bookingsContainer.innerHTML = `
        <div class="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <i data-lucide="lock" class="w-10 h-10 mx-auto text-slate-400 stroke-1"></i>
          <h4 class="font-black text-sm text-slate-800">คุณยังไม่ได้เข้าสู่ระบบ</h4>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">กรุณาเข้าสู่ระบบหรือสมัครสมาชิกใหม่ เพื่อดูประวัติการจอง ตั๋ว E-Ticket และยอดเงินในกระเป๋า</p>
          <button onclick="openAuthModal(false)" class="mt-3 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition">
            เข้าสู่ระบบ / สมัครสมาชิก
          </button>
        </div>
      `;
    } else if (state.bookings.length === 0) {
      bookingsContainer.innerHTML = `<div class="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">ยังไม่มีประวัติการจองสำหรับบัญชีนี้</div>`;
    } else {
      bookingsContainer.innerHTML = state.bookings.map(b => `
        <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-sky-900">${b.id}</span>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">${b.status}</span>
              <span class="text-xs text-slate-400">${new Date(b.createdAt).toLocaleDateString("th-TH")}</span>
            </div>
            <p class="text-xs text-slate-600 mt-1.5 font-medium">${b.items.map(i => i.title).join(" • ")}</p>
            <span class="text-xs text-slate-400">ชำระผ่าน: ${b.paymentMethod}</span>
          </div>
          <div class="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <div class="text-right">
              <span class="text-xs text-slate-400 block">ยอดชำระสุทธิ</span>
              <span class="text-base font-black text-slate-900">${b.totalAmount.toLocaleString()} ฿</span>
            </div>
            <button onclick="viewPastBookingTicket('${b.id}')" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i> ใบเสร็จ / E-Ticket
            </button>
          </div>
        </div>
      `).join("");
    }
  }

  renderTravelWalletOverview();
  refreshIcons();
}

async function saveUserProfile() {
  const name = document.getElementById("profile-edit-name")?.value.trim();
  const phone = document.getElementById("profile-edit-phone")?.value.trim();
  const passportNo = document.getElementById("profile-edit-passport")?.value.trim();
  const curPass = document.getElementById("profile-edit-cur-pass")?.value.trim();
  const newPass = document.getElementById("profile-edit-new-pass")?.value.trim();
  const confirmPass = document.getElementById("profile-edit-confirm-pass")?.value.trim();

  if (!name) {
    window.showToast("กรุณาระบุชื่อ-นามสกุล", "warning");
    return;
  }

  if (newPass) {
    if (!curPass) {
      window.showToast("กรุณากรอกรหัสผ่านเดิมเพื่อยืนยันความปลอดภัย", "warning");
      return;
    }
    if (newPass.length < 6) {
      window.showToast("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร", "warning");
      return;
    }
    if (newPass !== confirmPass) {
      window.showToast("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน", "warning");
      return;
    }
  }

  const payload = { name, phone, passportNo };
  if (newPass) {
    payload.currentPassword = curPass;
    payload.newPassword = newPass;
    payload.confirmPassword = confirmPass;
  }

  const res = await window.DreamState.updateProfile(payload);
  if (res && res.success) {
    renderMyAccount();
    if (document.getElementById("profile-edit-cur-pass")) document.getElementById("profile-edit-cur-pass").value = "";
    if (document.getElementById("profile-edit-new-pass")) document.getElementById("profile-edit-new-pass").value = "";
    if (document.getElementById("profile-edit-confirm-pass")) document.getElementById("profile-edit-confirm-pass").value = "";
    window.showToast(res.message || "บันทึกข้อมูลส่วนตัวและรหัสผ่านเรียบร้อย", "success");
  } else {
    window.showToast(res?.message || "ไม่สามารถบันทึกข้อมูลได้", "error");
  }
}

function addNewTravelerPrompt() {
  const name = prompt("ระบุชื่อ-นามสกุล ผู้ร่วมเดินทาง:");
  if (!name) return;
  const relation = prompt("ความสัมพันธ์ (เช่น คู่สมรส, บุตร, เพื่อน):", "เพื่อน");
  const passportNo = prompt("เลขที่หนังสือเดินทาง (Passport No.):", "AA" + Math.floor(1000000 + Math.random() * 9000000));
  window.DreamState.addSavedTraveler({ name, relation, phone: "-", passportNo });
  renderMyAccount();
  window.showToast(`เพิ่มคุณ ${name} ในรายชื่อผู้ร่วมเดินทางแล้ว`, "success");
}

function deleteTraveler(id) {
  window.DreamState.deleteSavedTraveler(id);
  renderMyAccount();
  window.showToast("ลบผู้ร่วมเดินทางเรียบร้อย", "info");
}

function viewPastBookingTicket(bookingId) {
  const booking = window.DreamState.state.bookings.find(b => b.id === bookingId);
  if (booking) {
    window.DreamCart.showTicketModal(booking);
  }
}

// --- Wishlist Handler & Slide-Over Drawer ---
function toggleWishlistItem(id) {
  const active = window.DreamState.toggleWishlist(id);
  window.showToast(
    active 
      ? 'บันทึกในรายการโปรดเรียบร้อย ❤️ <a href="wishlist.html" class="underline font-bold text-white hover:text-rose-200 ml-1">ดูหน้ารายการโปรด →</a>' 
      : 'นำออกจากรายการโปรดแล้ว', 
    "info"
  );
  if (typeof renderHotels === "function") renderHotels();
  if (typeof renderDestinations === "function") renderDestinations();
  if (typeof renderRestaurants === "function") renderRestaurants();
  if (typeof renderAttractions === "function") renderAttractions();
  if (typeof renderMyAccount === "function") renderMyAccount();
  renderWishlistDrawer();
  updateNavBadges(window.DreamState.state);
  if (active && typeof openWishlistDrawer === "function") {
    setTimeout(() => {
      openWishlistDrawer();
    }, 150);
  }
}

function openWishlistDrawer() {
  renderWishlistDrawer();
  const drawer = document.getElementById("wishlist-drawer");
  const overlay = document.getElementById("wishlist-backdrop");
  if (drawer && overlay) {
    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeWishlistDrawer() {
  const drawer = document.getElementById("wishlist-drawer");
  const overlay = document.getElementById("wishlist-backdrop");
  if (drawer && overlay) {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function renderWishlistDrawer() {
  const state = window.DreamState.state;
  const wishIds = state.wishlist || [];
  const emptyState = document.getElementById("wishlist-empty-state");
  const container = document.getElementById("wishlist-items-container");
  const badge = document.getElementById("wishlist-badge-count");

  if (badge) badge.textContent = wishIds.length;
  updateNavBadges(state);

  if (!container || !emptyState) return;

  if (wishIds.length === 0) {
    emptyState.classList.remove("hidden");
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  emptyState.classList.add("hidden");
  container.classList.remove("hidden");

  // Lookup items from data
  const allItems = [];
  wishIds.forEach(id => {
    const h = (DREAM_DATA.hotels || []).find(x => x.id === id);
    if (h) {
      const price = Number(h.pricePerNight || h.price || 0);
      allItems.push({
        id: h.id,
        type: "hotel",
        title: h.name,
        subtitle: `${h.cityTh || h.city || ''} • ${h.country || ''}`,
        price: `${price.toLocaleString()} ฿ / คืน`,
        image: h.image,
        rating: h.rating || 4.8
      });
      return;
    }
    const r = (DREAM_DATA.restaurants || []).find(x => x.id === id);
    if (r) {
      const price = Number(r.averagePrice || r.avgPrice || 0);
      allItems.push({
        id: r.id,
        type: "restaurant",
        title: r.name,
        subtitle: `${r.cuisine || ''} • ${r.cityTh || r.city || ''}`,
        price: `${price.toLocaleString()} ฿ / ท่าน`,
        image: r.image,
        rating: r.rating || 4.8
      });
      return;
    }
    const a = (DREAM_DATA.attractions || []).find(x => x.id === id);
    if (a) {
      const price = Number(a.price ?? a.ticketPrice ?? 0);
      allItems.push({
        id: a.id,
        type: "attraction",
        title: a.name,
        subtitle: `${a.category || ''} • ${a.cityTh || a.city || ''}`,
        price: price === 0 ? "เข้าชมฟรี" : `${price.toLocaleString()} ฿`,
        image: a.image,
        rating: a.rating || 4.8
      });
      return;
    }
    const d = (DREAM_DATA.destinations || []).find(x => x.id === id);
    if (d) {
      const price = Number(d.startingPrice || d.startPrice || 0);
      allItems.push({
        id: d.id,
        type: "destination",
        title: d.name,
        subtitle: d.country || '',
        price: `เริ่มต้น ${price.toLocaleString()} ฿`,
        image: d.image,
        rating: d.rating || 4.8
      });
      return;
    }
  });

  container.innerHTML = allItems.map(item => `
    <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex items-center justify-between gap-3">
      <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" class="w-16 h-16 rounded-xl object-cover flex-shrink-0">
      <div class="flex-1 min-w-0">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 inline-block mb-1">${getTypeLabel(item.type)}</span>
        <h4 class="font-bold text-slate-900 text-xs truncate">${item.title}</h4>
        <span class="text-[11px] text-slate-400 block truncate">${item.subtitle}</span>
        <span class="font-black text-sky-900 text-xs mt-0.5 block">${item.price}</span>
      </div>
      <div class="flex flex-col items-end gap-2 flex-shrink-0">
        <button onclick="handleWishlistAction('${item.id}', '${item.type}')" class="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] shadow-xs transition cursor-pointer">
          ดู / จอง
        </button>
        <button onclick="toggleWishlistItem('${item.id}')" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="ลบออกจากรายการโปรด">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function getTypeLabel(type) {
  switch (type) {
    case "hotel": return "โรงแรม";
    case "restaurant": return "ร้านอาหาร";
    case "attraction": return "บัตรกิจกรรม";
    case "destination": return "ปลายทาง";
    default: return "บริการ";
  }
}

function handleWishlistAction(id, type) {
  closeWishlistDrawer();
  if (type === "hotel") {
    if (typeof openHotelDetailModal === "function") openHotelDetailModal(id);
    else showSection("hotels");
  } else if (type === "restaurant") {
    if (typeof openRestaurantModal === "function") openRestaurantModal(id);
    else showSection("restaurants");
  } else if (type === "attraction") {
    if (typeof bookAttractionTicket === "function") bookAttractionTicket(id);
    else showSection("attractions");
  } else if (type === "destination") {
    if (typeof filterByDestination === "function") filterByDestination(id);
    else showSection("hotels");
  }
}

// --- Cart Drawer ---
function toggleCartDrawer(open) {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-backdrop");
  const floatingChat = document.getElementById("floating-chat-container");
  if (!drawer || !overlay) return;

  if (open) {
    window.DreamCart.renderCartDrawer();
    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (floatingChat) floatingChat.classList.add("hidden");
  } else {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
    if (floatingChat) floatingChat.classList.remove("hidden");
  }
}


// --- Destination Filter Shortcut ---
function filterByDestination(destKeyword) {
  showSection("hotels");
  const citySelect = document.getElementById("hotel-filter-city");
  if (citySelect) {
    citySelect.value = destKeyword;
  }
  renderHotels(destKeyword);
  window.showToast(`แสดงรายการที่พักใน ${destKeyword}`, "info");
}

function resetHotelFilters() {
  if (document.getElementById("hotel-filter-search")) document.getElementById("hotel-filter-search").value = "";
  if (document.getElementById("hotel-filter-city")) document.getElementById("hotel-filter-city").value = "all";
  if (document.getElementById("hotel-filter-stars")) document.getElementById("hotel-filter-stars").value = "0";
  if (document.getElementById("hotel-filter-price")) document.getElementById("hotel-filter-price").value = "70000";
  if (document.getElementById("hotel-price-label")) document.getElementById("hotel-price-label").textContent = "70,000 ฿";
  if (document.getElementById("hotel-sort-select")) document.getElementById("hotel-sort-select").value = "default";
  filterHotels();
}

// --- Travel Blog Posts ---
function renderBlogPosts() {
  const container = document.getElementById("blog-posts-grid");
  if (!container) return;

  container.innerHTML = DREAM_DATA.blogPosts.map(b => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer" onclick="window.showToast('เปิดอ่านบทความ: ${b.title}', 'info')">
      <div class="h-44 overflow-hidden">
        <img src="${b.image}" alt="${b.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>${b.date}</span>
            <span>•</span>
            <span>⏱️ อ่าน ${b.readTime}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition line-clamp-2">${b.title}</h4>
          <p class="text-xs text-slate-500 line-clamp-2 mt-1.5">${b.excerpt}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span class="font-medium">โดย ${b.author}</span>
          <span class="text-sky-600 font-bold flex items-center gap-0.5">อ่านต่อ →</span>
        </div>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

// ==========================================
// SUPERCHARGED LIVE AI CHATBOT & SUPPORT SYSTEM
// ==========================================
const CHATBOT_GEMINI_API_KEY = "AIzaSyDwy8Xcn-wRISQxUydowFiwJrxvOo0L9_U";
const CHATBOT_SYSTEM_INSTRUCTION = `คุณคือผู้ช่วยวางแผนและจองการเดินทางอัจฉริยะของแพลตฟอร์ม "MY PROGRAM"
คุณมีความเชี่ยวชาญด้านการท่องเที่ยว โรงแรม ร้านอาหาร และการบริหารงบประมาณอย่างละเอียด เป็นกันเอง และให้คำตอบอย่างมืออาชีพ

🎯 ภารกิจพิเศษ: ระบบจองที่พักเชิงลึก (Deep Accommodation Booking Flow)
เมื่อผู้ใช้แสดงความสนใจหรือต้องการจองโรงแรม/ที่พัก (เช่น "อยากจองโรงแรม", "หาที่พัก", "จอง Keemala", "อยากได้ห้องพักที่โตเกียว 2 คืน"):
1. คุณต้องตรวจสอบว่าได้รับข้อมูลสำคัญครบถ้วนทั้ง 4 ด้านนี้แล้วหรือยัง:
   (A) ชื่อโรงแรม หรือ เมือง/จุดหมายปลายทางที่ต้องการ (Hotel Name / Destination)
   (B) วันที่เช็คอิน และ วันที่เช็คเอาต์ หรือ จำนวนคืนที่เข้าพัก (Check-in, Check-out, Nights)
   (C) จำนวนผู้เข้าพัก โดยแยกเป็น "ผู้ใหญ่กี่ท่าน" และ "เด็กกี่ท่าน" (Adults & Children)
   (D) จำนวนห้องพัก และ ประเภทห้องพักที่ต้องการ (Rooms Count & Room Type เช่น Deluxe, Villa, Standard, Seaview ฯลฯ)

2. หากข้อมูลยังไม่ครบถ้วน (Missing Criteria):
   - ห้ามเดาหรือสุ่มข้อมูลสำคัญเองเด็ดขาด
   - ตอบกลับอย่างสุภาพ เป็นมิตร และ "ถามซ้ำ (Follow-up Questions)" เฉพาะข้อมูลที่ยังขาดอย่างกระชับ ชัดเจน เป็นข้อๆ
   - ตัวอย่างคำถามซ้ำ:
     "🏨 ยินดีช่วยดำเนินการจองที่พักครับ! เพื่อตรวจสอบห้องว่างและราคาที่แม่นยำ ขอทราบข้อมูลเพิ่มเติมดังนี้ครับ:
      1. 📅 วันที่ต้องการเช็คอินและเช็คเอาต์ (หรือต้องการพักกี่คืน)?
      2. 👥 จำนวนผู้เข้าพัก (ผู้ใหญ่กี่ท่าน / มีเด็กด้วยหรือไม่)?
      3. 🛏️ จำนวนห้องและประเภทห้องพักที่ต้องการ (เช่น ห้อง Deluxe / Pool Villa)?"

3. เมื่อผู้ใช้ให้ข้อมูลครบถ้วนทั้ง 4 ด้านแล้ว (Complete Booking Criteria):
   - สรุปรายละเอียดการจองให้ผู้ใช้ทราบอย่างชัดเจน พร้อมคำนวณราคาประเมิน
   - และสร้าง Structured Output เป็น JSON Action Block ที่ท้ายข้อความ โดยครอบด้วย \`\`\`json_booking ... \`\`\` อย่างเคร่งครัดตามฟอร์แมตนี้:
\`\`\`json_booking
{
  "status": "ready",
  "hotelName": "ชื่อโรงแรม",
  "hotelId": "h-phk-1",
  "checkIn": "YYYY-MM-DD",
  "checkOut": "YYYY-MM-DD",
  "nights": 2,
  "guests": { "adults": 2, "children": 0 },
  "roomsCount": 1,
  "roomType": "Deluxe Pool Villa",
  "pricePerNight": 4500,
  "totalPrice": 9000,
  "currency": "THB"
}
\`\`\`

จงสื่อสารด้วยภาษาไทยที่เป็นธรรมชาติ ไม่ตอบเป็นหุ่นยนต์ และกระตือรือร้นในการให้บริการ`;

let conversationHistory = [];

function toggleChatDrawer(forceState) {
  const box = document.getElementById("live-chat-box");
  if (!box) return;
  const shouldOpen = typeof forceState === "boolean" ? forceState : box.classList.contains("hidden");
  if (shouldOpen) {
    box.classList.remove("hidden");
    const container = document.getElementById("chat-messages-container");
    if (container) container.scrollTop = container.scrollHeight;
    const input = document.getElementById("chat-input-text");
    if (input) setTimeout(() => input.focus(), 150);
  } else {
    box.classList.add("hidden");
  }
}

function resetAIChatHistory() {
  conversationHistory = [];
  const container = document.getElementById("chat-messages-container");
  if (!container) return;

  container.innerHTML = `
    <!-- Initial Welcome Message from AI -->
    <div class="flex gap-2 items-start">
      <div class="w-8 h-8 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0 font-black shadow-xs">AI</div>
      <div class="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-slate-200 text-slate-800 max-w-[85%] shadow-xs space-y-2">
        <p class="leading-relaxed">
          สวัสดีครับ! ผมคือผู้ช่วยท่องเที่ยวของ MY PROGRAM อยากให้ช่วยวางแผนทริปที่ไหน คำนวณงบ หรือกำลังมองหาโรงแรมและร้านอาหารเด็ดๆ ถามผมได้เลยนะครับ!
        </p>
        <div class="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5" id="chat-welcome-quick-prompts">
          <button onclick="sendQuickChatMessage('แนะนำทริปงบประหยัด')" class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-[10px] font-bold text-slate-600 transition">แนะนำทริปงบประหยัด</button>
          <button onclick="sendQuickChatMessage('ทริปโตเกียว 3 วัน 2 คืน')" class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-[10px] font-bold text-slate-600 transition">ทริปโตเกียว 3 วัน 2 คืน</button>
          <button onclick="sendQuickChatMessage('วิธีคำนวณงบเดินทาง')" class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-600 text-[10px] font-bold text-slate-600 transition">วิธีคำนวณงบเดินทาง</button>
          <button onclick="openSupportTicketModal()" class="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold transition flex items-center gap-1 border border-amber-200">
            <i data-lucide="phone-call" class="w-3 h-3 text-amber-600"></i>
            <span>โอนสายคุยกับเจ้าหน้าที่</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Typing Indicator -->
    <div id="chat-typing-indicator" class="flex gap-2 items-start hidden">
      <div class="w-8 h-8 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0 font-black shadow-xs">AI</div>
      <div class="px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-white border border-slate-200 text-slate-500 flex items-center gap-1.5 text-xs shadow-xs">
        <span class="text-[11px] font-medium mr-1 text-slate-400">AI กำลังพิมพ์</span>
        <span class="w-1.5 h-1.5 rounded-full bg-sky-500 typing-dot"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-sky-500 typing-dot"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-sky-500 typing-dot"></span>
      </div>
    </div>
  `;

  refreshIcons(container);
  window.showToast("รีเซ็ตบทสนทนาเรียบร้อยแล้ว", "info");
}

let isChatLoading = false;

function sendQuickChatMessage(promptText) {
  if (isChatLoading) {
    window.showToast(" ผู้ช่วย AI กำลังประมวลผลคำตอบ กรุณารอสักครู่...", "warning");
    return;
  }
  const input = document.getElementById("chat-input-text");
  const box = document.getElementById("live-chat-box");
  if (box && box.classList.contains("hidden")) {
    toggleChatDrawer(true);
  }
  if (input) {
    input.value = promptText;
    handleSendChatMessage();
  }
}

async function handleSendChatMessage() {
  if (isChatLoading) {
    window.showToast(" กำลังประมวลผลข้อความ กรุณารอสักครู่...", "warning");
    return;
  }

  const input = document.getElementById("chat-input-text");
  const messagesCont = document.getElementById("chat-messages-container");
  const typingIndicator = document.getElementById("chat-typing-indicator");
  const sendBtn = document.getElementById("chat-send-btn");

  if (!input) return;
  const userText = input.value.trim();
  if (!userText) return;

  isChatLoading = true;

  // Append user message bubble
  const userDiv = document.createElement("div");
  userDiv.className = "flex justify-end items-end";
  userDiv.innerHTML = `
    <div class="p-3.5 rounded-2xl rounded-br-xs bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs leading-relaxed max-w-[82%] shadow-xs break-words">
      ${escapeHtml(userText)}
    </div>
  `;
  if (typingIndicator) {
    messagesCont.insertBefore(userDiv, typingIndicator);
  } else {
    messagesCont.appendChild(userDiv);
  }
  input.value = "";
  messagesCont.scrollTop = messagesCont.scrollHeight;

  // Push to conversation history
  conversationHistory.push({
    role: "user",
    parts: [{ text: userText }]
  });

  // Show typing indicator & lock send button
  if (typingIndicator) typingIndicator.classList.remove("hidden");
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.classList.add("opacity-50", "cursor-not-allowed");
  }
  messagesCont.scrollTop = messagesCont.scrollHeight;

  const userLower = userText.toLowerCase();
  const needsHuman = userLower.includes("ติดต่อคน") || userLower.includes("คุยกับคน") || userLower.includes("เจ้าหน้าที่") || userLower.includes("call center") || userLower.includes("support");

  try {
    let botReplyText = "";
    let aiSuccess = false;

    // 1. Try Backend AI Proxy (gemini-2.5-flash with server-side retry & fallback)
    try {
      const activeUserEmail = window.DreamState?.state?.auth?.currentUser?.email || "anant.traveler@myprogram.com";
      const serverRes = await fetch("/api/ai/deep-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: conversationHistory,
          systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
          userEmail: activeUserEmail
        })
      });

      if (serverRes.ok) {
        const serverData = await serverRes.json();
        if (serverData.success && serverData.text) {
          botReplyText = serverData.text;
          aiSuccess = true;
        }
      }
    } catch (netErr) {
      console.warn("Backend AI proxy unreachable, trying direct API...", netErr);
    }

    // 2. Direct Fallback via browser fetch if backend proxy is offline
    if (!aiSuccess) {
      const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
      for (const m of modelsToTry) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${CHATBOT_GEMINI_API_KEY}`;
          const payload = {
            system_instruction: { parts: [{ text: CHATBOT_SYSTEM_INSTRUCTION }] },
            contents: conversationHistory,
            generationConfig: { temperature: 0.5, maxOutputTokens: 1000 }
          };
          const directResp = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (directResp.status === 429) {
            console.warn(`Direct Gemini API rate limit on ${m}, trying fallback...`);
            continue;
          }

          if (directResp.ok) {
            const json = await directResp.json();
            botReplyText = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
            if (botReplyText) {
              aiSuccess = true;
              break;
            }
          }
        } catch (e) {
          console.warn(`Direct fetch failed for ${m}:`, e);
        }
      }
    }

    // 3. Smart Heuristic Engine Fallback
    if (!botReplyText) {
      window.showToast("⚡ ขณะนี้ AI มีผู้ใช้งานหนาแน่น ระบบสลับมาใช้ Smart Travel Engine ให้ทันที", "info");
      botReplyText = generateSmartOfflineChatReply(userText);
    }

    conversationHistory.push({
      role: "model",
      parts: [{ text: botReplyText }]
    });

    renderBotChatMessage(botReplyText, needsHuman);
  } catch (err) {
    console.warn("Gemini Chat API error:", err);
    let offlineReply = generateSmartOfflineChatReply(userText);
    conversationHistory.push({
      role: "model",
      parts: [{ text: offlineReply }]
    });
    renderBotChatMessage(offlineReply, needsHuman);
  } finally {
    isChatLoading = false;
    if (typingIndicator) typingIndicator.classList.add("hidden");
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
    messagesCont.scrollTop = messagesCont.scrollHeight;
  }
}

function renderBotChatMessage(text, forceShowHumanBtn = false) {
  const messagesCont = document.getElementById("chat-messages-container");
  const typingIndicator = document.getElementById("chat-typing-indicator");
  if (!messagesCont) return;

  // Extract Structured Booking Action Block
  let bookingData = null;
  let displayText = text;
  const bookingRegex = /```(?:json_booking|json)\s*([\s\S]*?)\s*```/;
  const match = text.match(bookingRegex);

  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed && (parsed.hotelName || parsed.hotel_name || parsed.roomType)) {
        bookingData = parsed;
        displayText = text.replace(bookingRegex, "").trim();
      }
    } catch (e) {
      console.warn("Could not parse AI booking json:", e);
    }
  }

  const formattedHtml = formatChatMarkdown(displayText);
  const botDiv = document.createElement("div");
  botDiv.className = "flex gap-2 items-start";
  
  const showContactButton = forceShowHumanBtn || text.includes("เจ้าหน้าที่") || text.includes("02-") || text.includes("ติดต่อ");

  // Booking Card HTML
  let bookingCardHtml = "";
  if (bookingData) {
    const hotelName = bookingData.hotelName || bookingData.hotel_name || "ที่พักที่เลือก";
    const roomType = bookingData.roomType || bookingData.room_type || "Deluxe Room";
    const checkIn = bookingData.checkIn || bookingData.check_in || "ไม่ระบุวัน";
    const checkOut = bookingData.checkOut || bookingData.check_out || "ไม่ระบุวัน";
    const nights = bookingData.nights || 1;
    const adults = bookingData.guests?.adults || bookingData.adults || 2;
    const children = bookingData.guests?.children || bookingData.children || 0;
    const roomsCount = bookingData.roomsCount || bookingData.rooms_count || 1;
    const totalPrice = Number(bookingData.totalPrice || bookingData.total_price || bookingData.price || 5000);
    const encoded = encodeURIComponent(JSON.stringify(bookingData));

    bookingCardHtml = `
      <div class="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-2 border-sky-300/80 shadow-md space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-600 text-white shadow-xs">
            <i data-lucide="sparkles" class="w-3 h-3"></i> แพลนจองที่พัก AI พร้อมยืนยัน
          </span>
          <span class="text-xs font-black text-sky-950">${totalPrice.toLocaleString()} ฿</span>
        </div>

        <div>
          <h4 class="font-black text-slate-900 text-sm leading-snug">${hotelName}</h4>
          <p class="text-[11px] font-semibold text-sky-800 flex items-center gap-1 mt-0.5">
            <i data-lucide="bed-double" class="w-3.5 h-3.5 text-sky-600"></i> ${roomType} (${roomsCount} ห้อง)
          </p>
        </div>

        <div class="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-white/90 border border-sky-100 text-[11px]">
          <div>
            <span class="text-slate-400 block text-[9px] font-bold">📅 เช็คอิน - เช็คเอาต์</span>
            <span class="font-bold text-slate-800">${checkIn} ➔ ${checkOut}</span>
            <span class="text-sky-600 font-extrabold block text-[10px]">(${nights} คืน)</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[9px] font-bold">👥 ผู้เข้าพัก</span>
            <span class="font-bold text-slate-800">ผู้ใหญ่ ${adults} ท่าน${children > 0 ? `, เด็ก ${children} ท่าน` : ''}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <button type="button" onclick="confirmAIBooking('${encoded}')" class="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-[11px] shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer">
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
            <span>ยืนยันการจองทันที</span>
          </button>
          <button type="button" onclick="addAIBookingToCart('${encoded}')" class="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-[11px] border border-slate-200 transition flex items-center gap-1 shadow-xs cursor-pointer" title="ใส่ตะกร้า">
            <i data-lucide="shopping-cart" class="w-3.5 h-3.5 text-sky-600"></i>
            <span>ใส่ตะกร้า</span>
          </button>
        </div>
      </div>
    `;
  }

  botDiv.innerHTML = `
    <div class="w-8 h-8 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xs flex-shrink-0 font-black shadow-xs">AI</div>
    <div class="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-slate-200 text-slate-800 text-xs leading-relaxed max-w-[88%] shadow-xs space-y-2">
      <div class="space-y-1.5">${formattedHtml}</div>
      ${bookingCardHtml}
      ${showContactButton ? `
        <div class="pt-2.5 mt-1 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <button type="button" onclick="sendInstantStaffAlert()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-[11px] transition flex items-center gap-1.5 shadow-md shadow-rose-600/20 cursor-pointer">
            <i data-lucide="bell-ring" class="w-3.5 h-3.5 text-amber-200"></i>
            <span>🔔 ส่งอีเมลเรียกเจ้าหน้าที่ทันที (ด่วน)</span>
          </button>
          <button type="button" onclick="openSupportTicketModal()" class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-[11px] transition flex items-center gap-1.5 shadow-xs cursor-pointer">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-amber-600"></i>
            <span>กรอกรายละเอียดเพิ่มเติม</span>
          </button>
        </div>
      ` : ''}
    </div>
  `;

// Direct 1-Click Email Dispatch to Staff
window.sendInstantStaffAlert = async function() {
  const user = window.DreamState?.state?.auth?.currentUser;
  const lastUserMsg = [...conversationHistory].reverse().find(m => m.role === 'user');
  const userText = lastUserMsg ? (lastUserMsg.parts?.[0]?.text || lastUserMsg.text || 'ลูกค้าต้องการความช่วยเหลือด่วน') : 'ลูกค้าต้องการความช่วยเหลือด่วน';

  window.showToast("กำลังส่งอีเมลแจ้งเตือนถึงเจ้าหน้าที่...", "info");

  try {
    const res = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id || "usr-guest",
        userName: user?.name || "ผู้ใช้งานหน้าเว็บ",
        userEmail: user?.email || "guest@myprogram.com",
        category: "ติดต่อด่วน (ผ่านแชท)",
        message: userText,
        chatTranscript: [...conversationHistory]
      })
    });

    if (res.ok) {
      const data = await res.json();
      window.showToast("🔔 ส่งอีเมลแจ้งเตือนถึงเจ้าหน้าที่เรียบร้อยแล้ว!", "success");
      appendSystemChatMessage(`
        <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 text-xs">
          <div class="flex items-center gap-1.5 font-black text-emerald-800">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
            <span>ส่งอีเมลแจ้งเตือนเจ้าหน้าที่เรียบร้อยแล้ว (รหัส: #${data.issueId})</span>
          </div>
          <p class="text-[11px] text-emerald-700 leading-relaxed">
            ระบบได้ยิงอีเมลพร้อมประวัติการสนทนานี้ไปยังกล่องจดหมายของเจ้าหน้าที่แล้ว เจ้าหน้าที่จะเปิดอ่านและตอบกลับโดยเร็วที่สุดครับ
          </p>
        </div>
      `);
      refreshIcons(messagesCont);
    }
  } catch (err) {
    window.showToast("ไม่สามารถส่งแจ้งเตือนได้ กรุณาลองใหม่อีกครั้ง", "error");
  }
};

  if (typingIndicator) {
    messagesCont.insertBefore(botDiv, typingIndicator);
  } else {
    messagesCont.appendChild(botDiv);
  }

  messagesCont.scrollTop = messagesCont.scrollHeight;
  refreshIcons(messagesCont);
}

// Handler for AI Instant Booking confirmation
window.confirmAIBooking = async function(encodedJson) {
  try {
    const data = JSON.parse(decodeURIComponent(encodedJson));
    const user = window.DreamState?.state?.auth?.currentUser;
    const hotelName = data.hotelName || data.hotel_name || "โรงแรมที่พัก";
    const roomType = data.roomType || data.room_type || "Deluxe Room";
    const checkIn = data.checkIn || data.check_in || new Date().toISOString().split("T")[0];
    const checkOut = data.checkOut || data.check_out || "";
    const nights = Number(data.nights) || 2;
    const adults = Number(data.guests?.adults || data.adults) || 2;
    const children = Number(data.guests?.children || data.children) || 0;
    const roomsCount = Number(data.roomsCount || data.rooms_count) || 1;
    const totalPrice = Number(data.totalPrice || data.total_price || 6000);

    const bookingPayload = {
      userId: user?.id || "usr-guest",
      userEmail: user?.email || "guest@myprogram.com",
      customerName: user?.name || "คุณผู้เข้าพัก",
      contactPhone: user?.phone || "089-123-4567",
      hotelId: data.hotelId || "h-custom",
      hotelName,
      roomType,
      checkIn,
      checkOut,
      nights,
      guests: { adults, children },
      roomsCount,
      totalPrice,
      currency: data.currency || "THB",
      paymentMethod: "PromptPay QR (AI Instant)",
      source: "ai_deep_booking"
    };

    // Save to backend REST API
    let confirmedBooking = bookingPayload;
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.booking) confirmedBooking = json.booking;
      }
    } catch (netErr) {
      console.warn("Backend bookings API offline, saving to local state:", netErr);
      confirmedBooking.id = "BK-" + Date.now();
      confirmedBooking.createdAt = new Date().toISOString();
      confirmedBooking.status = "CONFIRMED";
    }

    // Update Local DreamState
    if (window.DreamState) {
      if (!window.DreamState.state.bookings) window.DreamState.state.bookings = [];
      window.DreamState.state.bookings.unshift({
        id: confirmedBooking.id,
        createdAt: confirmedBooking.createdAt,
        status: "CONFIRMED",
        paymentMethod: confirmedBooking.paymentMethod,
        paymentRef: confirmedBooking.paymentRef || "TX-AI-9921",
        totalAmount: totalPrice,
        currency: "THB",
        items: [
          {
            type: "hotel",
            title: `${hotelName} (${roomType})`,
            date: `${checkIn} ➔ ${checkOut} (${nights} คืน)`,
            price: totalPrice,
            quantity: 1,
            guests: `${adults} ผู้ใหญ่, ${children} เด็ก`
          }
        ]
      });
      window.DreamState.saveState();
    }

    window.showToast(` ยืนยันการจอง ${hotelName} สำเร็จ! รหัสการจอง #${confirmedBooking.id}`, "success");

    appendSystemChatMessage(`
      <div class="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-1.5 shadow-xs">
        <div class="flex items-center gap-2 font-black text-xs text-emerald-900">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
          <span>การจองที่พักของคุณได้รับการยืนยันแล้ว!</span>
        </div>
        <p class="text-[11px] text-emerald-900 leading-relaxed">
          รหัสการจอง: <strong>${confirmedBooking.id}</strong> (${hotelName}) ได้ถูกบันทึกลงฐานข้อมูลและหน้า <strong>"บัญชีของฉัน"</strong> เรียบร้อยแล้ว พร้อมส่งข้อมูลไปยังระบบ Admin แบบเรียลไทม์ครับ
        </p>
      </div>
    `);

  } catch (err) {
    console.error("Failed to confirm AI booking:", err);
    window.showToast("เกิดข้อผิดพลาดในการยืนยันการจอง กรุณาลองใหม่อีกครั้ง", "error");
  }
};

window.addAIBookingToCart = function(encodedJson) {
  try {
    const data = JSON.parse(decodeURIComponent(encodedJson));
    const hotelName = data.hotelName || data.hotel_name || "โรงแรมที่พัก";
    const roomType = data.roomType || data.room_type || "Deluxe Room";
    const nights = Number(data.nights) || 1;
    const totalPrice = Number(data.totalPrice || data.total_price || 4500);

    if (window.DreamState) {
      window.DreamState.addToCart({
        id: `ai-hotel-${Date.now()}`,
        type: "hotel",
        title: hotelName,
        subtitle: `${roomType} (${nights} คืน) - จองผ่าน AI`,
        price: totalPrice,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
        details: data
      });
      window.showToast(`เพิ่ม ${hotelName} ลงในตะกร้าเรียบร้อยแล้ว`, "success");
      toggleCartDrawer(true);
    }
  } catch (err) {
    console.error("Failed to add AI booking to cart:", err);
  }
};

function formatChatMarkdown(raw) {
  if (!raw) return "";
  let s = escapeHtml(raw);

  // Bold **text**
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  const lines = s.split('\n');
  const processed = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      return `<li class="ml-3 list-disc">${trimmed.slice(2)}</li>`;
    }
    return line;
  });

  return processed.join('<br>').replace(/(<li class="ml-3 list-disc">.*?<\/li>)(<br>)?/g, '$1');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function generateSmartOfflineChatReply(query) {
  const q = (query || "").toLowerCase();

  // Smart Deep Booking Extraction Heuristic
  const isBookingIntent = q.includes("จอง") || q.includes("โรงแรม") || q.includes("ที่พัก") || q.includes("ห้อง") || q.includes("resort") || q.includes("hotel");

  if (isBookingIntent) {
    // Check if dates or nights are mentioned
    const hasDates = q.includes("คืน") || q.includes("วัน") || q.includes("check") || /\d{1,2}/.test(q);
    const hasGuests = q.includes("คน") || q.includes("ท่าน") || q.includes("ผู้ใหญ่") || q.includes("เด็ก");

    if (!hasDates || !hasGuests) {
      // Automatic Follow-up Questions
      let city = "ที่คุณเลือก";
      if (q.includes("ภูเก็ต")) city = "ภูเก็ต";
      else if (q.includes("โตเกียว")) city = "โตเกียว";
      else if (q.includes("เชียงใหม่")) city = "เชียงใหม่";
      else if (q.includes("สมุย")) city = "เกาะสมุย";

      return `🏨 ยินดีช่วยดำเนินการจองที่พักใน **${city}** ให้ครับ!\n\nเพื่อให้ระบบตรวจสอบห้องว่างและอัตราค่าบริการที่ถูกต้อง แม่นยำ ขอทราบข้อมูลเพิ่มเติมดังนี้ครับ:\n\n1. 📅 **วันที่เช็คอิน และ วันที่เช็คเอาต์** (หรือต้องการเข้าพักกี่คืน)?\n2. 👥 **จำนวนผู้เข้าพัก** (ผู้ใหญ่กี่ท่าน / มีเด็กด้วยหรือไม่)?\n3. 🛏️ **ประเภทห้องพักที่สนใจ** (เช่น Deluxe / Pool Villa / เตียงเดี่ยวหรือคู่)?\n\nเมื่อคุณแจ้งข้อมูลครบ ผมจะสร้างใบจองพร้อมราคาให้กดยืนยันได้ทันทีครับ!`;
    }

    // If details are present, generate instant proposal
    let hotelName = "กีมาลา ภูเก็ต (Keemala Resort)";
    let pricePerNight = 12800;
    if (q.includes("โตเกียว")) { hotelName = "Aman Tokyo (อามาน โตเกียว)"; pricePerNight = 25000; }
    else if (q.includes("เชียงใหม่")) { hotelName = "Raya Heritage Chiang Mai"; pricePerNight = 6500; }

    const nights = 2;
    const totalPrice = pricePerNight * nights;

    return `สรุปรายละเอียดการจองที่พักให้เรียบร้อยแล้วครับ!\n\n🏨 **${hotelName}**\n🛏️ ห้อง Deluxe Pool Villa (รวมอาหารเช้า)\n📅 เข้าพัก 2 คืนสำหรับผู้ใหญ่ 2 ท่าน\n💰 ราคาประเมินรวม: **${totalPrice.toLocaleString()} บาท**\n\nคุณสามารถตรวจสอบรายละเอียดและกดปุ่ม **"ยืนยันการจองทันที"** หรือ **"ใส่ตะกร้า"** ด้านล่างนี้ได้เลยครับ:\n\n\`\`\`json_booking\n{\n  "status": "ready",\n  "hotelName": "${hotelName}",\n  "roomType": "Deluxe Pool Villa",\n  "checkIn": "2026-04-10",\n  "checkOut": "2026-04-12",\n  "nights": ${nights},\n  "guests": { "adults": 2, "children": 0 },\n  "roomsCount": 1,\n  "pricePerNight": ${pricePerNight},\n  "totalPrice": ${totalPrice},\n  "currency": "THB"\n}\n\`\`\``;
  }

  if (q.includes("โตเกียว") || q.includes("tokyo")) {
    return "โตเกียวเป็นจุดหมายยอดเยี่ยมครับ! แนะนำเที่ยว 3-5 วัน งบประมาณ 30,000 - 45,000 บาท/คน รวมโรงแรมย่านชินจูกุ/ชิบูย่า ตั๋ว Tokyo Subway Pass และตะลุยคาเฟ่ฮิต คุณสามารถคลิกไปที่เมนู **'AI ทริป'** เพื่อดูแผนรายวันและงบประมาณแบบละเอียดได้ทันทีครับ";
  }
  if (q.includes("งบ") || q.includes("ประหยัด")) {
    return "สำหรับการเดินทางแบบประหยัดคุ้มค่า แนะนำจัดสรรงบ: ที่พัก ~35%, อาหาร ~30%, กิจกรรม/เดินทาง ~25%, สำรอง ~10% และเลือกจองช่วงโปรโมชั่นแพ็กเกจ MY PROGRAM รับส่วนลดทันที 12% ครับ!";
  }
  if (q.includes("ติดต่อ") || q.includes("เจ้าหน้าที่")) {
    return "คุณสามารถส่งเรื่องถึงทีมสนับสนุนของ MY PROGRAM ได้ตลอด 24 ชั่วโมง โดยกดปุ่มด้านล่างนี้เพื่อเปิดฟอร์มติดต่อเจ้าหน้าที่ หรือโทรสายด่วน 02-999-8888 ได้เลยครับ";
  }
  return "ยินดีให้คำแนะนำครับ! คุณสามารถสอบถามเกี่ยวกับโรงแรม เที่ยวบิน ร้านอาหารมิชลิน หรือพิมพ์แจ้งรายละเอียดที่พักที่ต้องการจองให้ผมช่วยจัดทำรายการได้ตลอด 24 ชม. ครับ";
}

function appendSystemChatMessage(htmlContent) {
  const messagesCont = document.getElementById("chat-messages-container");
  const typingIndicator = document.getElementById("chat-typing-indicator");
  if (!messagesCont) return;

  const div = document.createElement("div");
  div.className = "my-2 w-full";
  div.innerHTML = htmlContent;

  if (typingIndicator) {
    messagesCont.insertBefore(div, typingIndicator);
  } else {
    messagesCont.appendChild(div);
  }

  messagesCont.scrollTop = messagesCont.scrollHeight;
  refreshIcons(messagesCont);
}

// Support Ticket Modal Handlers (Connected to Backend REST API)
function openSupportTicketModal() {
  const modal = document.getElementById("support-ticket-modal");
  if (!modal) return;

  const user = window.DreamState?.state?.auth?.currentUser;
  const nameInput = document.getElementById("ticket-name");
  const contactInput = document.getElementById("ticket-contact");

  if (nameInput) {
    nameInput.value = user?.name || "";
  }
  if (contactInput) {
    contactInput.value = user?.email || user?.phone || "";
  }

  modal.classList.remove("hidden");
  refreshIcons(modal);
}

function closeSupportTicketModal() {
  const modal = document.getElementById("support-ticket-modal");
  if (modal) modal.classList.add("hidden");
}

function closeAdminReplyModal() {
  const modal = document.getElementById("admin-reply-modal");
  if (modal) modal.classList.add("hidden");
}

function openChatFromReplyModal() {
  closeAdminReplyModal();
  toggleChatDrawer(true);
}

async function submitSupportTicket(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("ticket-name")?.value.trim();
  const topic = document.getElementById("ticket-topic")?.value || "เรื่องอื่นๆ";
  const contact = document.getElementById("ticket-contact")?.value.trim();
  const message = document.getElementById("ticket-message")?.value.trim();
  const attachHistory = document.getElementById("ticket-attach-history")?.checked ?? true;

  if (!name || !contact || !message) {
    window.showToast("กรุณากรอกชื่อ ข้อมูลติดต่อ และรายละเอียดปัญหาให้ครบถ้วน", "warning");
    return;
  }

  const submitBtn = document.getElementById("ticket-submit-btn");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></span> กำลังส่งเรื่อง...`;
  }

  const payload = await sendTicketToBackend({
    name,
    topic,
    email: contact,
    message,
    attachHistory
  });

  closeSupportTicketModal();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> <span>ส่งเรื่องถึงเจ้าหน้าที่</span>`;
  }

  // Reset textarea
  const msgArea = document.getElementById("ticket-message");
  if (msgArea) msgArea.value = "";

  window.showToast(`ระบบได้ส่งรายงานปัญหาไปยังทีมงานแล้ว (หมายเลขตั๋ว: #${payload.ticket_id})`, "success");

  // Save last submitted email & ticket ID for reply watcher
  try {
    localStorage.setItem("myprogram_last_ticket_id", payload.ticket_id);
    localStorage.setItem("myprogram_last_ticket_email", contact);
  } catch (e) {}

  // Ensure chat window is open and show system confirmation
  toggleChatDrawer(true);
  appendSystemChatMessage(`
    <div class="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-950 space-y-1.5 shadow-xs">
      <div class="flex items-center gap-2 font-black text-xs text-amber-900">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
        <span>ส่งเรื่องถึงเจ้าหน้าที่เรียบร้อยแล้ว (รหัส: #${payload.ticket_id})</span>
      </div>
      <p class="text-[11px] text-amber-900 leading-relaxed">
        ผู้ติดต่อ: <strong>คุณ${name}</strong> (${contact})<br/>
        รายงานปัญหาถูกส่งไปยังกล่องข้อความฝั่ง Admin เรียบร้อยแล้ว เมื่อเจ้าหน้าที่แก้ไขปัญหาแล้วระบบจะ <strong>ส่งอีเมลตอบกลับไปยัง ${contact}</strong> พร้อมแจ้งเตือนในห้องแชทนี้ทันที
      </p>
    </div>
  `);
}

async function sendTicketToBackend(ticketData) {
  const user = window.DreamState?.state?.auth?.currentUser;
  const payload = {
    userId: user?.id || "usr-guest",
    userName: ticketData.name || user?.name || "ผู้ใช้งาน",
    userEmail: ticketData.email || user?.email || "-",
    category: ticketData.topic || "ทั่วไป",
    message: ticketData.message,
    chatTranscript: ticketData.attachHistory ? [...conversationHistory] : []
  };

  try {
    const res = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      return { ticket_id: data.issueId || "TK-" + Date.now() };
    }
  } catch (err) {
    console.warn("Could not save issue to server:", err);
  }
  return { ticket_id: "TK-" + Math.floor(1000 + Math.random() * 9000) };
}

// --- Admin Reply Watcher (Polls for resolved issues with replies) ---
let adminReplyWatcherStarted = false;
function startAdminReplyWatcher() {
  if (adminReplyWatcherStarted) return;
  adminReplyWatcherStarted = true;

  setInterval(async () => {
    const user = window.DreamState?.state?.auth?.currentUser;
    const email = user?.email || localStorage.getItem("myprogram_last_ticket_email") || "";
    if (!email) return;

    try {
      const res = await fetch(`/api/user/issues?email=${encodeURIComponent(email)}`);
      if (!res.ok) return;
      const data = await res.json();
      const issues = data.issues || [];

      let seenReplies = [];
      try {
        seenReplies = JSON.parse(localStorage.getItem("myprogram_seen_replies") || "[]");
      } catch (e) {}

      // Find any newly resolved issue with an admin reply that hasn't been seen yet
      const newReply = issues.find(i => i.status === "RESOLVED" && i.adminReply && !seenReplies.includes(i.id));

      if (newReply) {
        seenReplies.push(newReply.id);
        try {
          localStorage.setItem("myprogram_seen_replies", JSON.stringify(seenReplies));
        } catch (e) {}

        // 1. Show Admin Reply Notification Modal
        const modal = document.getElementById("admin-reply-modal");
        if (modal) {
          const catEl = document.getElementById("reply-modal-category");
          const timeEl = document.getElementById("reply-modal-time");
          const userMsgEl = document.getElementById("reply-modal-user-msg");
          const adminMsgEl = document.getElementById("reply-modal-admin-msg");

          if (catEl) catEl.textContent = `หมวดหมู่: ${newReply.category || 'ทั่วไป'}`;
          if (timeEl) timeEl.textContent = new Date(newReply.resolvedAt || Date.now()).toLocaleTimeString("th-TH");
          if (userMsgEl) userMsgEl.textContent = `"${newReply.message}"`;
          if (adminMsgEl) adminMsgEl.textContent = newReply.adminReply;

          modal.classList.remove("hidden");
          refreshIcons(modal);
        }

        // 2. Append reply bubble into live chat drawer
        appendSystemChatMessage(`
          <div class="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 space-y-2 shadow-sm my-2">
            <div class="flex items-center justify-between text-xs font-black text-emerald-900 border-b border-emerald-200 pb-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <i data-lucide="headphones" class="w-4 h-4 text-emerald-600"></i>
                <span>ข้อความตอบกลับจากเจ้าหน้าที่ (Admin Reply)</span>
              </div>
              <span class="text-[10px] text-emerald-700 font-normal">${new Date(newReply.resolvedAt || Date.now()).toLocaleTimeString('th-TH')} น.</span>
            </div>
            <p class="text-xs text-emerald-950 font-semibold leading-relaxed whitespace-pre-wrap">${newReply.adminReply}</p>
            <div class="text-[10px] text-emerald-800 bg-emerald-100/70 p-2 rounded-xl flex items-center justify-between">
              <span>อ้างอิงเคส: #${newReply.id} (${newReply.category})</span>
              <span class="font-bold">✉️ ส่งเข้าอีเมลแล้ว</span>
            </div>
          </div>
        `);

        // 3. Show Toast Notification
        window.showToast(`เจ้าหน้าที่ได้ตอบกลับปัญหา #${newReply.id} และส่งข้อมูลเข้าอีเมลเรียบร้อยแล้ว!`, "success");
      }
    } catch (err) {
      // Ignore network polling error
    }
  }, 8000);
}

// Start reply watcher when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    startAdminReplyWatcher();
  });
}

function setupLiveChat() {
  const input = document.getElementById("chat-input-text");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendChatMessage();
      }
    });
  }
}

// ==========================================
// NEW MODULE: eSIM & Pocket WiFi
// ==========================================
let currentEsimCountry = "all";
let currentEsimType = "all";

function filterEsimByCountry(countryCode) {
  currentEsimCountry = countryCode;
  renderEsim(currentEsimCountry, currentEsimType);
}

function filterEsimByType(type) {
  currentEsimType = type;
  document.querySelectorAll("#esim-filter-all, #esim-filter-esim, #esim-filter-wifi").forEach(btn => {
    btn.classList.remove("bg-sky-600", "text-white", "shadow-xs");
    btn.classList.add("bg-slate-100", "text-slate-700");
  });
  const activeBtn = document.getElementById(`esim-filter-${type}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-slate-100", "text-slate-700");
    activeBtn.classList.add("bg-sky-600", "text-white", "shadow-xs");
  }
  renderEsim(currentEsimCountry, currentEsimType);
}

function renderEsim(country = "all", type = "all") {
  const container = document.getElementById("esim-grid");
  if (!container || !DREAM_DATA.esim) return;

  let list = [...DREAM_DATA.esim];
  if (country !== "all") {
    list = list.filter(item => item.countryCode === country);
  }
  if (type !== "all") {
    list = list.filter(item => item.type === type);
  }

  container.innerHTML = list.map(item => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="relative h-44 overflow-hidden">
          <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold whitespace-nowrap">
            ${item.type === 'esim' ? 'eSIM ดิจิทัล' : 'Pocket WiFi'}
          </span>
          <span class="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-extrabold shadow-sm whitespace-nowrap">
            ${item.badge}
          </span>
        </div>
        <div class="p-5 space-y-2.5">
          <div class="flex items-center gap-1.5 text-xs text-slate-500 font-bold whitespace-nowrap">
            <span>${item.country}</span>
            <span>•</span>
            <span class="text-sky-600">${item.operator}</span>
          </div>
          <h3 class="font-extrabold text-slate-900 text-base leading-snug group-hover:text-sky-600 transition">${item.name}</h3>
          <div class="p-2.5 rounded-xl bg-sky-50 text-sky-900 text-xs font-semibold">
            ปริมาณเน็ต: <span class="font-black text-sky-950">${item.dataPlan}</span>
          </div>
          <ul class="space-y-1 text-[11px] text-slate-600 pt-1">
            ${item.features.map(f => `<li class="flex items-start gap-1.5"><span>${f}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[11px] text-slate-400 line-through block whitespace-nowrap">${item.originalPrice} ฿</span>
          <span class="text-lg font-black text-sky-900 whitespace-nowrap">${item.price.toLocaleString()} ฿</span>
        </div>
        <button onclick="openEsimModal('${item.id}')" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 transition flex items-center gap-1 whitespace-nowrap">
          <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> สั่งซื้อทันที
        </button>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function openEsimModal(esimId) {
  const item = DREAM_DATA.esim.find(e => e.id === esimId);
  if (!item) return;

  const modal = document.getElementById("esim-modal");
  if (!modal) return;

  document.getElementById("esim-modal-id").value = item.id;
  document.getElementById("esim-modal-title").textContent = item.name;
  document.getElementById("esim-modal-plan-info").textContent = `${item.country} • ${item.dataPlan} (${item.days} วัน)`;
  document.getElementById("esim-modal-desc").textContent = `เครือข่าย: ${item.operator} | คุณสมบัติ: ${item.features.join(", ")}`;
  document.getElementById("esim-modal-quantity").value = 1;
  document.getElementById("esim-modal-total-price").textContent = `${item.price.toLocaleString()} ฿`;

  document.getElementById("esim-modal-quantity").oninput = (e) => {
    const qty = Math.max(1, parseInt(e.target.value || "1", 10));
    document.getElementById("esim-modal-total-price").textContent = `${(item.price * qty).toLocaleString()} ฿`;
  };

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons(modal);
}

function closeEsimModal() {
  const modal = document.getElementById("esim-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function confirmEsimBooking() {
  const id = document.getElementById("esim-modal-id").value;
  const item = DREAM_DATA.esim.find(e => e.id === id);
  if (!item) return;

  const date = document.getElementById("esim-modal-date").value || "2026-03-20";
  const qty = Math.max(1, parseInt(document.getElementById("esim-modal-quantity").value || "1", 10));

  window.DreamState.addToCart({
    id: `esim-${item.id}-${Date.now()}`,
    type: "esim",
    title: item.name,
    subtitle: `${item.country} | เริ่มใช้งาน: ${date} (${qty} ชิ้น) | ${item.dataPlan}`,
    price: item.price,
    quantity: qty,
    image: item.image
  });

  closeEsimModal();
  window.showToast(`เพิ่ม "${item.name}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// ==========================================
// NEW MODULE: Travel Insurance
// ==========================================
function updateInsuranceView() {
  const zone = document.getElementById("ins-input-zone")?.value || "world";
  const days = parseInt(document.getElementById("ins-input-days")?.value || "7", 10);
  const travelers = Math.max(1, parseInt(document.getElementById("ins-input-travelers")?.value || "1", 10));
  renderInsurance(zone, days, travelers);
}

function renderInsurance(zone = "world", days = 7, travelers = 1) {
  const container = document.getElementById("insurance-cards-grid");
  if (!container || !DREAM_DATA.insurance) return;

  const key = `${zone}${days}days`;

  container.innerHTML = DREAM_DATA.insurance.map(plan => {
    let price = plan.packagePrices[key] || (plan.pricePerDay * days);
    const totalPrice = price * travelers;

    return `
      <div class="bg-white rounded-3xl p-6 border ${plan.popular ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-xl' : 'border-slate-200 shadow-md'} flex flex-col justify-between relative group">
        ${plan.popular ? '<span class="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-600 text-white font-extrabold text-[10px] shadow-sm whitespace-nowrap"> แนะนำ ยอดนิยมอันดับ 1</span>' : ''}
        
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded-md whitespace-nowrap ${plan.popular ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-700'}">${plan.badge}</span>
          </div>
          <h3 class="font-black text-slate-900 text-lg">${plan.tier}</h3>
          
          <div class="mt-4 p-3 rounded-2xl bg-slate-50 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-500">ค่ารักษาพยาบาล:</span>
              <span class="font-black text-slate-900 whitespace-nowrap">${plan.medicalCoverage}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">สัมภาระสูญหาย:</span>
              <span class="font-bold text-slate-700 whitespace-nowrap">${plan.baggageCoverage}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">เที่ยวบินดีเลย์:</span>
              <span class="font-bold text-slate-700 whitespace-nowrap">${plan.delayCoverage}</span>
            </div>
          </div>

          <ul class="mt-4 space-y-2 text-xs text-slate-600">
            ${plan.features.map(f => `
              <li class="flex items-start gap-1.5 text-[11px]">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
                <span>${f}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[11px] text-slate-400 block whitespace-nowrap">${days} วัน (${travelers} ท่าน)</span>
            <span class="text-xl font-black text-emerald-700 whitespace-nowrap">${totalPrice.toLocaleString()} ฿</span>
          </div>
          <button onclick="bookInsurancePlan('${plan.id}', ${totalPrice}, '${zone}', ${days}, ${travelers})" class="px-4 py-2.5 rounded-xl ${plan.popular ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-800 hover:bg-slate-900 text-white'} text-xs font-bold shadow-md transition flex items-center gap-1 whitespace-nowrap">
            <i data-lucide="shield" class="w-3.5 h-3.5"></i> เลือกแผนนี้
          </button>
        </div>
      </div>
    `;
  }).join("");

  refreshIcons(container);
}

function bookInsurancePlan(planId, totalPrice, zone, days, travelers) {
  const plan = DREAM_DATA.insurance.find(p => p.id === planId);
  if (!plan) return;

  window.DreamState.addToCart({
    id: `ins-${plan.id}-${Date.now()}`,
    type: "insurance",
    title: `ประกันการเดินทาง ${plan.tier}`,
    subtitle: `โซน: ${zone === 'asia' ? 'เอเชีย' : 'ทั่วโลก'} | คุ้มครอง ${days} วัน (${travelers} ท่าน) | ค่ารักษา ${plan.medicalCoverage}`,
    price: totalPrice,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
  });

  window.showToast(`เพิ่ม "${plan.tier}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// ==========================================
// NEW MODULE: Transport (Car / Cruise / Train)
// ==========================================
let currentTransportTab = "cars";

function switchTransportTab(tab) {
  currentTransportTab = tab;
  document.querySelectorAll("#transport-tab-cars, #transport-tab-cruises, #transport-tab-trains").forEach(btn => {
    btn.classList.remove("bg-white", "text-sky-700", "shadow-xs");
    btn.classList.add("text-slate-600");
  });
  const activeBtn = document.getElementById(`transport-tab-${tab}`);
  if (activeBtn) {
    activeBtn.classList.remove("text-slate-600");
    activeBtn.classList.add("bg-white", "text-sky-700", "shadow-xs");
  }
  renderTransport(tab);
}

function renderTransport(category = "cars") {
  const container = document.getElementById("transport-grid");
  if (!container || !DREAM_DATA.transport) return;

  const list = DREAM_DATA.transport[category] || [];

  container.innerHTML = list.map(item => `
    <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="relative h-48 overflow-hidden">
          <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold whitespace-nowrap">
            ${item.cityTh}
          </span>
          <span class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-orange-500 text-white text-[10px] font-extrabold shadow-sm whitespace-nowrap">
            ${item.badge}
          </span>
        </div>
        <div class="p-5 space-y-2.5">
          <span class="text-xs font-bold text-orange-600 uppercase tracking-wide">${item.category}</span>
          <h3 class="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition leading-snug">${item.name}</h3>
          
          <div class="flex flex-wrap gap-2 text-[11px] text-slate-600 font-semibold pt-1">
            ${item.seats ? `<span class="px-2 py-1 rounded-lg bg-slate-100 whitespace-nowrap">${item.seats}</span>` : ''}
            ${item.transmission ? `<span class="px-2 py-1 rounded-lg bg-slate-100 whitespace-nowrap">${item.transmission}</span>` : ''}
            ${item.duration ? `<span class="px-2 py-1 rounded-lg bg-slate-100 whitespace-nowrap">⏱️ ${item.duration}</span>` : ''}
            ${item.validity ? `<span class="px-2 py-1 rounded-lg bg-slate-100 whitespace-nowrap">${item.validity}</span>` : ''}
          </div>

          <ul class="space-y-1 text-[11px] text-slate-600 pt-1">
            ${item.features.map(f => `<li class="flex items-start gap-1.5"><span>${f}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[11px] text-slate-400 line-through block whitespace-nowrap">${item.originalPrice.toLocaleString()} ฿</span>
          <span class="text-lg font-black text-slate-900 whitespace-nowrap">${item.pricePerDay.toLocaleString()} ฿</span>
        </div>
        <button onclick="openTransportModal('${item.id}', '${category}')" class="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center gap-1 whitespace-nowrap">
          <i data-lucide="key" class="w-3.5 h-3.5"></i> จองทันที
        </button>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function openTransportModal(id, category) {
  const cat = category || currentTransportTab;
  const item = (DREAM_DATA.transport[cat] || []).find(t => t.id === id);
  if (!item) return;

  const modal = document.getElementById("transport-modal");
  if (!modal) return;

  document.getElementById("transport-modal-id").value = item.id;
  document.getElementById("transport-modal-title").textContent = item.name;
  document.getElementById("transport-modal-info").textContent = `${item.category} • ${item.cityTh}`;
  document.getElementById("transport-modal-desc").textContent = item.features.join(" | ");
  document.getElementById("transport-modal-price").textContent = `${item.pricePerDay.toLocaleString()} ฿`;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons(modal);
}

function closeTransportModal() {
  const modal = document.getElementById("transport-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function confirmTransportBooking() {
  const id = document.getElementById("transport-modal-id").value;
  let item = null;
  ['cars', 'cruises', 'trains'].forEach(c => {
    const found = (DREAM_DATA.transport[c] || []).find(t => t.id === id);
    if (found) item = found;
  });
  if (!item) return;

  const date = document.getElementById("transport-modal-date").value || "2026-03-25";
  const units = Math.max(1, parseInt(document.getElementById("transport-modal-units").value || "1", 10));
  const notes = document.getElementById("transport-modal-notes").value || "";
  const totalPrice = item.pricePerDay * units;

  window.DreamState.addToCart({
    id: `transport-${item.id}-${Date.now()}`,
    type: "transport",
    title: item.name,
    subtitle: `${item.cityTh} | เริ่มวันที่: ${date} (${units} วัน/ชุด) ${notes ? `| ${notes}` : ''}`,
    price: totalPrice,
    quantity: 1,
    image: item.image
  });

  closeTransportModal();
  window.showToast(`เพิ่ม "${item.name}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// ==========================================
// NEW MODULE: Visa Consulting Service
// ==========================================
function renderVisa() {
  const container = document.getElementById("visa-grid");
  if (!container || !DREAM_DATA.visa) return;

  container.innerHTML = DREAM_DATA.visa.map(v => `
    <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div class="flex items-start justify-between gap-4">
          <div>
            <span class="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold inline-block mb-2 whitespace-nowrap">
              ${v.badge}
            </span>
            <h3 class="text-xl font-black text-slate-900 group-hover:text-purple-600 transition leading-snug">${v.country}</h3>
            <p class="text-xs text-slate-500 mt-1">${v.targetCountries}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-[11px] font-bold text-emerald-600 block bg-emerald-50 px-2 py-1 rounded-lg whitespace-nowrap">${v.successRate}</span>
            <span class="text-[10px] text-slate-400 block mt-1 whitespace-nowrap">ระยะเวลา: ${v.processingTime}</span>
          </div>
        </div>

        <div class="mt-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/80 space-y-2">
          <span class="text-xs font-bold text-purple-950 block">ขอบเขตการดูแลระดับมืออาชีพ:</span>
          <ul class="space-y-1.5 text-xs text-slate-700">
            ${v.services.map(s => `
              <li class="flex items-start gap-2">
                <i data-lucide="check" class="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5"></i>
                <span class="text-[11px] leading-relaxed">${s}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        
        <p class="text-[11px] text-slate-400 italic mt-3">${v.embassyFeeNote}</p>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-[11px] text-slate-400 block whitespace-nowrap">ค่าบริการที่ปรึกษา</span>
          <span class="text-xl font-black text-purple-950 whitespace-nowrap">${v.price.toLocaleString()} ฿</span>
        </div>
        <button onclick="openVisaModal('${v.id}')" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition flex items-center gap-1.5 whitespace-nowrap">
          <i data-lucide="calendar" class="w-4 h-4"></i> นัดปรึกษา & ยื่นวีซ่า
        </button>
      </div>
    </div>
  `).join("");

  refreshIcons(container);
}

function openVisaModal(visaId) {
  const item = DREAM_DATA.visa.find(v => v.id === visaId);
  if (!item) return;

  const modal = document.getElementById("visa-modal");
  if (!modal) return;

  document.getElementById("visa-modal-id").value = item.id;
  document.getElementById("visa-modal-title").textContent = item.country;
  document.getElementById("visa-modal-rate").textContent = `${item.successRate} • ดำเนินการ ${item.processingTime}`;
  document.getElementById("visa-modal-target").textContent = `ประเทศเป้าหมาย: ${item.targetCountries}`;
  
  const servCont = document.getElementById("visa-modal-services");
  servCont.innerHTML = item.services.slice(0, 3).map(s => `<div>${s}</div>`).join('');
  document.getElementById("visa-modal-price").textContent = `${item.price.toLocaleString()} ฿`;

  document.getElementById("visa-modal-applicants").oninput = (e) => {
    const qty = Math.max(1, parseInt(e.target.value || "1", 10));
    document.getElementById("visa-modal-price").textContent = `${(item.price * qty).toLocaleString()} ฿`;
  };

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  refreshIcons(modal);
}

function closeVisaModal() {
  const modal = document.getElementById("visa-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function confirmVisaBooking() {
  const id = document.getElementById("visa-modal-id").value;
  const item = DREAM_DATA.visa.find(v => v.id === id);
  if (!item) return;

  const date = document.getElementById("visa-modal-date").value || "2026-03-18";
  const applicants = Math.max(1, parseInt(document.getElementById("visa-modal-applicants").value || "1", 10));
  const phone = document.getElementById("visa-modal-phone").value || "";
  const totalPrice = item.price * applicants;

  window.DreamState.addToCart({
    id: `visa-${item.id}-${Date.now()}`,
    type: "visa",
    title: `บริการยื่น ${item.country}`,
    subtitle: `นัดตรวจเอกสาร: ${date} (${applicants} ท่าน) | โทร: ${phone} | ${item.processingTime}`,
    price: totalPrice,
    quantity: 1,
    image: item.image
  });

  closeVisaModal();
  window.showToast(`เพิ่มบริการยื่น "${item.country}" ลงในตะกร้าแล้ว!`, "success");
  toggleCartDrawer(true);
}

// Global Exports
window.showSection = showSection;
window.renderEsim = renderEsim;
window.filterEsimByCountry = filterEsimByCountry;
window.filterEsimByType = filterEsimByType;
window.openEsimModal = openEsimModal;
window.closeEsimModal = closeEsimModal;
window.confirmEsimBooking = confirmEsimBooking;
window.updateInsuranceView = updateInsuranceView;
window.renderInsurance = renderInsurance;
window.bookInsurancePlan = bookInsurancePlan;
window.switchTransportTab = switchTransportTab;
window.renderTransport = renderTransport;
window.openTransportModal = openTransportModal;
window.closeTransportModal = closeTransportModal;
window.confirmTransportBooking = confirmTransportBooking;
window.renderVisa = renderVisa;
window.openVisaModal = openVisaModal;
window.closeVisaModal = closeVisaModal;
window.confirmVisaBooking = confirmVisaBooking;


// ========================================================
// UNIFIED SEARCH TAB CONTROLLER & QUICK ACTIONS
// ========================================================
let currentUnifiedTab = "all";

function setUnifiedTab(tab, btn) {
  const isAlreadyActive = (currentUnifiedTab === tab && btn && btn.classList.contains("active"));
  currentUnifiedTab = tab;

  // 1. Highlight active tab button
  document.querySelectorAll(".unified-tab-btn").forEach(b => {
    b.classList.remove("active", "bg-sky-600", "text-white", "shadow-xs");
    b.classList.add("bg-white/90", "text-slate-700");
  });

  if (btn) {
    btn.classList.add("active", "bg-sky-600", "text-white", "shadow-xs");
    btn.classList.remove("bg-white/90", "text-slate-700");
  }

  // 2. Update search input placeholder and search button text
  const input = document.getElementById("unified-search-input");
  const searchBtn = document.getElementById("unified-search-btn");

  const placeholders = {
    all: "พิมพ์ชื่อเมือง, โรงแรม, ร้านอาหาร, หรือกิจกรรม (เช่น โตเกียว, ภูเก็ต)...",
    hotels: "ค้นหาโรงแรม, พูลวิลล่า, รีสอร์ต 5 ดาว หรือเมือง (เช่น ภูเก็ต, โตเกียว)...",
    flights: "ค้นหาเที่ยวบิน, สายการบิน หรือสนามบิน (เช่น การบินไทย, ANA, KIX)...",
    restaurants: "ค้นหาร้านอาหาร, โอมากาเสะ, มิชลินไกด์ หรือสตรีทฟู้ด...",
    attractions: "ค้นหากิจกรรม, บัตรสวนสนุก, ทัวร์ดำน้ำ หรือพิพิธภัณฑ์...",
    esim: "ค้นหาแพ็กเกจเน็ต eSIM หรือ Pocket WiFi (ญี่ปุ่น, เกาหลี, ยุโรป)...",
    insurance: "ค้นหาประกันการเดินทาง คุ้มครองทั่วโลก...",
    transport: "ค้นหารถเช่า, เรือสำราญ หรือบัตรรถไฟ JR Pass...",
    visa: "ค้นหาบริการยื่นวีซ่า (เชงเก้น, อเมริกา, อังกฤษ)..."
  };

  const btnLabels = {
    all: "ค้นหาทริป",
    hotels: "เปิดดูที่พัก (45+ แห่ง)",
    flights: "เปิดดูเที่ยวบิน (32+ เที่ยวบิน)",
    restaurants: "เปิดดูร้านอาหาร (45+ ร้าน)",
    attractions: "เปิดดูกิจกรรม (31+ แห่ง)",
    esim: "ดูเน็ต eSIM & WiFi",
    insurance: "ดูประกันเดินทาง",
    transport: "ดูรถ/เรือ/รถไฟ",
    visa: "ดูบริการยื่นวีซ่า"
  };

  if (input && placeholders[tab]) {
    input.placeholder = placeholders[tab];
    input.focus();
  }

  if (searchBtn && btnLabels[tab]) {
    const span = searchBtn.querySelector("span");
    if (span) span.textContent = btnLabels[tab];
  }

  // 3. If clicking already-active tab again, open that section immediately
  if (isAlreadyActive && tab !== "all") {
    showSection(tab);
  }
}

function executeUnifiedSearch() {
  const input = document.getElementById("unified-search-input");
  const query = (input?.value || "").trim();

  if (currentUnifiedTab === "hotels") {
    showSection("hotels");
    if (document.getElementById("hotel-filter-search")) {
      document.getElementById("hotel-filter-search").value = query;
    }
    filterHotels();
    if (query) window.showToast(`ผลการค้นหาที่พักสำหรับ "${query}"`, "info");
  } else if (currentUnifiedTab === "flights") {
    showSection("flights");
    if (document.getElementById("flight-search-keyword")) {
      document.getElementById("flight-search-keyword").value = query;
    }
    filterFlights();
    if (query) window.showToast(`ผลการค้นหาเที่ยวบินสำหรับ "${query}"`, "info");
  } else if (currentUnifiedTab === "restaurants") {
    showSection("restaurants");
    if (document.getElementById("restaurant-filter-search")) {
      document.getElementById("restaurant-filter-search").value = query;
    }
    filterRestaurants();
    if (query) window.showToast(`ผลการค้นหาร้านอาหารสำหรับ "${query}"`, "info");
  } else if (currentUnifiedTab === "attractions") {
    showSection("attractions");
    if (document.getElementById("attraction-filter-search")) {
      document.getElementById("attraction-filter-search").value = query;
    }
    filterAttractions();
    if (query) window.showToast(`ผลการค้นหากิจกรรมสำหรับ "${query}"`, "info");
  } else if (currentUnifiedTab === "esim") {
    showSection("esim");
  } else if (currentUnifiedTab === "insurance") {
    showSection("insurance");
  } else if (currentUnifiedTab === "transport") {
    showSection("transport");
  } else if (currentUnifiedTab === "visa") {
    showSection("visa");
  } else {
    // "all" - Smart deep search
    if (query) {
      const qLower = query.toLowerCase();
      // If query looks like flight intent
      const isFlight = ["บิน", "ไฟล์ท", "เครื่องบิน", "สนามบิน", "airasia", "vietjet", "nok", "tg", "fd", "flight"].some(w => qLower.includes(w));
      // If query looks like food intent
      const isFood = ["อาหาร", "กิน", "ร้าน", "ข้าวซอย", "เจ๊ไฝ", "สุกี้", "ราเมน", "ซูชิ", "โอมากาเสะ", "ไก่ย่าง", "โจ๊ก", "ปิ้งย่าง"].some(w => qLower.includes(w));
      // If query looks like attraction intent
      const isAttr = ["กิจกรรม", "ตั๋ว", "เข้าชม", "สวนสนุก", "วัด", "หอไอเฟล", "ดิสนีย์", "พิพิธภัณฑ์", "ล่องเรือ", "ดำน้ำ"].some(w => qLower.includes(w));

      if (isFlight) {
        showSection("flights");
        if (document.getElementById("flight-search-keyword")) document.getElementById("flight-search-keyword").value = query;
        filterFlights();
        window.showToast(`ค้นหาเที่ยวบินสำหรับ "${query}"`, "info");
      } else if (isFood) {
        showSection("restaurants");
        if (document.getElementById("restaurant-filter-search")) document.getElementById("restaurant-filter-search").value = query;
        filterRestaurants();
        window.showToast(`ค้นหาร้านอาหารสำหรับ "${query}"`, "info");
      } else if (isAttr) {
        showSection("attractions");
        if (document.getElementById("attraction-filter-search")) document.getElementById("attraction-filter-search").value = query;
        filterAttractions();
        window.showToast(`ค้นหากิจกรรม & สถานที่สำหรับ "${query}"`, "info");
      } else {
        showSection("hotels");
        if (document.getElementById("hotel-filter-search")) document.getElementById("hotel-filter-search").value = query;
        filterHotels();
        window.showToast(`ค้นหา "${query}" ในระบบที่พักและการท่องเที่ยว`, "info");
      }
    } else {
      showSection("hotels");
      window.showToast("แสดงบริการท่องเที่ยวและที่พักทั้งหมด (55+ แห่ง)", "info");
    }
  }
}

// ==========================================
// User Profile Avatar Upload & Camera System
// ==========================================
let pendingAvatarDataUrl = null;
let activeWebcamStream = null;

function openAvatarModal() {
  const modal = document.getElementById("avatar-modal");
  const preview = document.getElementById("avatar-modal-preview");
  const state = window.DreamState?.state;
  const user = state?.auth?.currentUser;
  const currentAvatar = (user && user.avatar) 
    ? user.avatar 
    : (document.getElementById("account-user-avatar")?.src || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80");

  pendingAvatarDataUrl = currentAvatar;
  if (preview) preview.src = currentAvatar;

  const webcamBox = document.getElementById("webcam-box");
  if (webcamBox) webcamBox.classList.add("hidden");

  const floatingChat = document.getElementById("floating-chat-container");
  if (floatingChat) floatingChat.classList.add("hidden");

  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    refreshIcons(modal);
  }
}

function closeAvatarModal() {
  stopWebcam();
  const modal = document.getElementById("avatar-modal");
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";

  const floatingChat = document.getElementById("floating-chat-container");
  if (floatingChat) floatingChat.classList.remove("hidden");
}

function triggerCameraCapture() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.innerWidth >= 640) {
    startWebcam();
  } else {
    const camInput = document.getElementById("avatar-camera-input");
    if (camInput) camInput.click();
  }
}

function triggerGalleryUpload() {
  stopWebcam();
  const fileInput = document.getElementById("avatar-gallery-input");
  if (fileInput) fileInput.click();
}

function handleAvatarFile(input) {
  if (!input || !input.files || input.files.length === 0) return;
  const file = input.files[0];
  if (!file.type.startsWith("image/")) {
    window.showToast("กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (JPG, PNG, WebP)", "warning");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    pendingAvatarDataUrl = dataUrl;
    const preview = document.getElementById("avatar-modal-preview");
    if (preview) preview.src = dataUrl;
    stopWebcam();
    window.showToast("โหลดรูปภาพสำเร็จแล้ว! กดบันทึกเพื่อใช้งาน", "info");
  };
  reader.onerror = function() {
    window.showToast("ไม่สามารถอ่านไฟล์รูปภาพได้ กรุณาลองใหม่อีกครั้ง", "error");
  };
  reader.readAsDataURL(file);
}

function selectPresetAvatar(url) {
  stopWebcam();
  pendingAvatarDataUrl = url;
  const preview = document.getElementById("avatar-modal-preview");
  if (preview) preview.src = url;
}

function startWebcam() {
  const webcamBox = document.getElementById("webcam-box");
  const video = document.getElementById("webcam-video");
  if (!webcamBox || !video) return;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } })
      .then(stream => {
        activeWebcamStream = stream;
        video.srcObject = stream;
        video.play();
        webcamBox.classList.remove("hidden");
        window.showToast("เปิดกล้องเรียบร้อย จัดท่าแล้วกดปุ่มถ่ายภาพได้เลย", "info");
      })
      .catch(err => {
        console.warn("Webcam access error:", err);
        webcamBox.classList.add("hidden");
        const camInput = document.getElementById("avatar-camera-input");
        if (camInput) camInput.click();
      });
  } else {
    const camInput = document.getElementById("avatar-camera-input");
    if (camInput) camInput.click();
  }
}

function captureWebcamFrame() {
  const video = document.getElementById("webcam-video");
  const canvas = document.getElementById("webcam-canvas");
  if (!video || !canvas) return;

  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
  pendingAvatarDataUrl = dataUrl;
  const preview = document.getElementById("avatar-modal-preview");
  if (preview) preview.src = dataUrl;

  stopWebcam();
  window.showToast("ถ่ายภาพสำเร็จแล้ว! กดบันทึกเพื่อใช้งาน", "success");
}

function stopWebcam() {
  if (activeWebcamStream) {
    activeWebcamStream.getTracks().forEach(track => track.stop());
    activeWebcamStream = null;
  }
  const video = document.getElementById("webcam-video");
  if (video) video.srcObject = null;
  const webcamBox = document.getElementById("webcam-box");
  if (webcamBox) webcamBox.classList.add("hidden");
}

function saveAvatarChange() {
  if (!pendingAvatarDataUrl) {
    window.showToast("กรุณาเลือกหรือถ่ายรูปภาพก่อนบันทึก", "warning");
    return;
  }

  // Persist to user state and localStorage
  window.DreamState.updateProfile({ avatar: pendingAvatarDataUrl });

  // Update DOM elements across pages and modals
  const accountAvatar = document.getElementById("account-user-avatar");
  if (accountAvatar) accountAvatar.src = pendingAvatarDataUrl;

  const navAvatar = document.getElementById("nav-user-avatar");
  if (navAvatar) navAvatar.src = pendingAvatarDataUrl;

  const dropAvatar = document.getElementById("dropdown-user-avatar");
  if (dropAvatar) dropAvatar.src = pendingAvatarDataUrl;

  const settingsAvatar = document.getElementById("settings-profile-avatar");
  if (settingsAvatar) settingsAvatar.src = pendingAvatarDataUrl;

  const profileAvatar = document.getElementById("profile-modal-avatar");
  if (profileAvatar) profileAvatar.src = pendingAvatarDataUrl;

  closeAvatarModal();
  window.showToast("เปลี่ยนรูปโปรไฟล์ของคุณเรียบร้อยแล้ว!", "success");
}

function toggleMoreServicesDropdown(event) {
  if (event) event.stopPropagation();
  closeUserDropdown();
  const dd = document.getElementById("more-services-dropdown");
  const chevron = document.getElementById("nav-more-services-chevron") || document.querySelector("#nav-more-services-btn [data-lucide='chevron-down']");
  if (dd) {
    const isNowHidden = dd.classList.toggle("hidden");
    if (chevron) {
      chevron.style.transform = isNowHidden ? "rotate(0deg)" : "rotate(180deg)";
    }
  }
}

function closeMoreServicesDropdown() {
  const dd = document.getElementById("more-services-dropdown");
  const chevron = document.getElementById("nav-more-services-chevron") || document.querySelector("#nav-more-services-btn [data-lucide='chevron-down']");
  if (dd) dd.classList.add("hidden");
  if (chevron) chevron.style.transform = "rotate(0deg)";
}

document.addEventListener("click", (e) => {
  const dd = document.getElementById("more-services-dropdown");
  const btn = document.getElementById("nav-more-services-btn");
  if (dd && !dd.classList.contains("hidden")) {
    if (!dd.contains(e.target) && (!btn || !btn.contains(e.target))) {
      closeMoreServicesDropdown();
    }
  }

  const container = document.getElementById("nav-user-dropdown-container");
  const quickBtn = document.getElementById("nav-quick-settings-btn");
  const menu = document.getElementById("nav-user-dropdown-menu");
  if (menu && !menu.classList.contains("hidden")) {
    if ((!container || !container.contains(e.target)) && (!quickBtn || !quickBtn.contains(e.target))) {
      closeUserDropdown();
    }
  }
});

function sendQuickChatMessage(promptText) {
  const input = document.getElementById("chat-input-text");
  const sendBtn = document.getElementById("chat-send-btn");
  if (input && sendBtn) {
    input.value = promptText;
    sendBtn.click();
  }
}


// ==========================================
// USER ACCOUNT & PREFERENCES SYSTEM
// ==========================================

function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  closeMoreServicesDropdown();
  const menu = document.getElementById("nav-user-dropdown-menu");
  const chevron = document.getElementById("nav-user-chevron");
  if (!menu) return;
  const isHidden = menu.classList.contains("hidden");
  if (isHidden) {
    menu.classList.remove("hidden");
    if (chevron) chevron.style.transform = "rotate(180deg)";
  } else {
    closeUserDropdown();
  }
}

function closeUserDropdown() {
  const menu = document.getElementById("nav-user-dropdown-menu");
  const chevron = document.getElementById("nav-user-chevron");
  if (menu) menu.classList.add("hidden");
  if (chevron) chevron.style.transform = "rotate(0deg)";
}

function handleQuickSettingsClick(e) {
  if (e) e.stopPropagation();
  // Option A: Toggle Profile Dropdown menu with smooth rotation
  toggleUserDropdown(e);
}

function handleNavigateProfile(e) {
  if (e) e.stopPropagation();
  closeUserDropdown();
  window.location.href = "profile.html";
}

function handleNavigateAccounts(e) {
  if (e) e.stopPropagation();
  closeUserDropdown();
  window.location.href = "login.html";
}

function handleNavigatePreferences(e) {
  if (e) e.stopPropagation();
  closeUserDropdown();
  window.location.href = "preferences.html";
}

function handleNavigateAdmin(e) {
  if (e) e.stopPropagation();
  closeUserDropdown();
  const state = window.DreamState?.state || {};
  const user = state.auth?.currentUser;
  const isAdmin = window.DreamState?.isAdmin ? window.DreamState.isAdmin() : (user && (user.role === 'admin' || user.accountType === 'admin' || user.email === 'admin@myprogram.com' || user.email === 'corporate@globaltravel.co.th'));

  if (!isAdmin) {
    if (typeof window.showToast === 'function') {
      window.showToast("บัญชีของคุณไม่มีสิทธิ์เข้าถึงส่วนนี้", "warning");
    }
  } else {
    window.location.href = "admin.html";
  }
}

function initClientRouter() {
  function handleRoute() {
    const hash = (window.location.hash || "").toLowerCase();
    const pathname = (window.location.pathname || "").toLowerCase();
    if (hash === "#profile" || pathname === "/profile") {
      window.location.href = "profile.html";
    } else if (hash === "#accounts" || pathname === "/accounts") {
      window.location.href = "accounts.html";
    } else if (hash === "#preferences" || pathname === "/preferences" || hash === "#settings" || pathname === "/settings") {
      window.location.href = "preferences.html";
    } else if (hash === "#admin" || pathname === "/admin") {
      handleNavigateAdmin();
    }
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("popstate", handleRoute);
  if (window.location.hash) {
    setTimeout(handleRoute, 150);
  }
}

// Unified Settings Modal Controller & State
let isSettingsOpen = false;
let currentActiveSettingsTab = "preferences";
let currentPrefLang = "th";
let currentPrefCurr = "THB";
let currentBedPref = "KING";
let currentDietaryAllergies = ["SEAFOOD"];
let currentAIPersona = "VALUE_FOCUSED";

function setIsSettingsOpen(isOpen, activeTab = "preferences") {
  closeUserDropdown();
  isSettingsOpen = Boolean(isOpen);
  const modal = document.getElementById("settings-modal");
  if (!modal) return;

  if (isSettingsOpen) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    switchSettingsTab(activeTab);

    try {
      // 1. Populate Profile data
      const state = window.DreamState?.state || {};
      const user = (state.auth && state.auth.currentUser) || (state.users ? state.users["anant.traveler@myprogram.com"] : null) || {
        name: "คุณอนันต์ พิริยพงศ์",
        email: "anant.traveler@myprogram.com",
        phone: "089-123-4567",
        passportNo: "AA9876543",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      };

      const nameInp = document.getElementById("settings-input-name") || document.getElementById("profile-input-name");
      const emailInp = document.getElementById("settings-input-email") || document.getElementById("profile-input-email");
      const phoneInp = document.getElementById("settings-input-phone") || document.getElementById("profile-input-phone");
      const passInp = document.getElementById("settings-input-passport") || document.getElementById("profile-input-passport");
      const avatarImg = document.getElementById("settings-profile-avatar") || document.getElementById("profile-modal-avatar");

      if (nameInp) nameInp.value = user.name || "";
      if (emailInp) emailInp.value = user.email || "";
      if (phoneInp) phoneInp.value = user.phone || "";
      if (passInp) passInp.value = user.passportNo || "";
      if (avatarImg) avatarImg.src = user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

      // 2. Populate Travel Preferences (AI Auto-Sync)
      const travelPrefs = state.travelPreferences || {
        bedType: "KING",
        smokingAllowed: false,
        petFriendly: false,
        floorPreference: "HIGH",
        dietaryAllergies: ["SEAFOOD"],
        specialRequests: "ต้องการห้องวิวเมือง เงียบสงบ เตียงคิงไซส์"
      };
      selectBedPref(travelPrefs.bedType || "KING");
      
      const smokingInp = document.getElementById("pref-smoking");
      const petsInp = document.getElementById("pref-pets");
      const specReqInp = document.getElementById("pref-special-requests");
      if (smokingInp) smokingInp.checked = Boolean(travelPrefs.smokingAllowed);
      if (petsInp) petsInp.checked = Boolean(travelPrefs.petFriendly);
      if (specReqInp) specReqInp.value = travelPrefs.specialRequests || "";

      currentDietaryAllergies = Array.isArray(travelPrefs.dietaryAllergies) ? [...travelPrefs.dietaryAllergies] : ["SEAFOOD"];
      syncDietaryChipsUI();

      // 3. Render Saved Guests List
      renderSettingsSavedGuests();

      // 4. Render Workspaces & Accounts List
      renderSettingsWorkspaces();
      renderSettingsAccountList();

      // 5. Populate AI Persona & System Preferences
      const aiPersona = state.aiSettings?.aiPersona || "VALUE_FOCUSED";
      selectAIPersona(aiPersona, false);

      const pref = state.preferences || { language: "th", primaryCurrency: "THB", notifyDeals: true, notifyUpdates: true, notifyRates: true };
      currentPrefLang = pref.language || "th";
      currentPrefCurr = pref.primaryCurrency || "THB";
      selectPrefLanguage(currentPrefLang);
      selectPrefCurrency(currentPrefCurr);

      const deals = document.getElementById("pref-notify-deals");
      const updates = document.getElementById("pref-notify-updates");
      const rates = document.getElementById("pref-notify-rates");
      if (deals) deals.checked = pref.notifyDeals !== false;
      if (updates) updates.checked = pref.notifyUpdates !== false;
      if (rates) rates.checked = pref.notifyRates !== false;

      // 6. Populate Security & Active Sessions
      renderSettingsSecurity();
    } catch (err) {
      console.error("Error initializing settings modal data:", err);
    }
  } else {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  refreshIcons(modal);
}

function switchSettingsTab(tabName) {
  currentActiveSettingsTab = tabName;
  const tabs = ["profile", "accounts", "preferences"];
  tabs.forEach(t => {
    const btn = document.getElementById(`settings-tab-btn-${t}`);
    const content = document.getElementById(`settings-tab-${t}`);
    const isActive = (t === tabName);
    if (btn) {
      if (isActive) {
        btn.className = "flex-1 py-2.5 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-xs border border-slate-200/60 transition flex items-center justify-center gap-1.5 cursor-pointer";
      } else {
        btn.className = "flex-1 py-2.5 px-3 rounded-xl text-slate-600 font-bold text-xs hover:bg-white/60 transition flex items-center justify-center gap-1.5 cursor-pointer";
      }
    }
    if (content) {
      content.classList.toggle("hidden", !isActive);
    }
  });
  refreshIcons(document.getElementById("settings-modal"));
}

// ==========================================
// TRAVEL PREFERENCES & SAVED GUESTS CONTROLLERS
// ==========================================

function selectBedPref(type) {
  currentBedPref = type;
  ["KING", "TWIN", "SINGLE"].forEach(b => {
    const el = document.getElementById(`pref-bed-${b}`);
    if (el) {
      if (b === type) {
        el.className = "p-2 rounded-xl border-2 border-sky-600 bg-sky-50 text-sky-900 font-bold text-xs text-center cursor-pointer transition shadow-xs";
      } else {
        el.className = "p-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs text-center cursor-pointer hover:border-sky-300 transition";
      }
    }
  });
}

function toggleDietChip(btn, code) {
  const idx = currentDietaryAllergies.indexOf(code);
  if (idx > -1) {
    currentDietaryAllergies.splice(idx, 1);
  } else {
    currentDietaryAllergies.push(code);
  }
  syncDietaryChipsUI();
}

function syncDietaryChipsUI() {
  const container = document.getElementById("pref-dietary-chips");
  if (!container) return;
  const chips = [
    { code: "SEAFOOD", label: "🦐 แพ้อาหารทะเล" },
    { code: "PEANUTS", label: "🥜 แพ้ถั่วลิสง" },
    { code: "GLUTEN_FREE", label: "🌾 กลูเตนฟรี" },
    { code: "HALAL", label: "🌙 อาหารฮาลาล" },
    { code: "VEGETARIAN", label: "🥗 มังสวิรัติ" }
  ];

  container.innerHTML = chips.map(c => {
    const isSelected = currentDietaryAllergies.includes(c.code);
    return `
      <button type="button" onclick="toggleDietChip(this, '${c.code}')" class="px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition ${
        isSelected ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-xs' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'
      }">
        ${c.label}
      </button>
    `;
  }).join("");
}

function renderSettingsSavedGuests() {
  const container = document.getElementById("settings-saved-guests-list");
  if (!container) return;

  const state = window.DreamState?.state;
  const guests = state?.savedGuests || [];

  if (guests.length === 0) {
    container.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
        ยังไม่มีรายชื่อผู้ร่วมเดินทางประจำ กด "+ เพิ่มผู้ร่วมเดินทาง" ด้านบน
      </div>
    `;
    return;
  }

  container.innerHTML = guests.map(g => `
    <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
          <i data-lucide="user" class="w-4 h-4"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-xs text-slate-900">${g.fullName}</span>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-sky-100 text-sky-800">${g.relation || 'ผู้ร่วมเดินทาง'}</span>
          </div>
          <span class="text-[10px] text-slate-500 block mt-0.5">
            Passport: ${g.passportNo || '-'} • สัญชาติ: ${g.nationality || 'Thai'} • วันเกิด: ${g.dateOfBirth || '-'}
          </span>
        </div>
      </div>
      <button type="button" onclick="deleteSavedGuest('${g.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer" title="ลบรายการ">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `).join("");

  refreshIcons(container);
}

function addNewSavedGuestPrompt() {
  const name = prompt("กรุณาระบุชื่อ-นามสกุล ผู้ร่วมเดินทาง:");
  if (!name || !name.trim()) return;

  const relation = prompt("ความสัมพันธ์ (เช่น คู่สมรส, บุตร, เพื่อน, ผู้บริหาร):", "ผู้ร่วมเดินทาง") || "ผู้ร่วมเดินทาง";
  const passport = prompt("หมายเลขหนังสือเดินทาง (Passport No.):", "") || "";
  const dob = prompt("วันเกิด (รูปแบบ YYYY-MM-DD เช่น 1995-08-20):", "1995-01-01") || "";

  window.DreamState.addSavedGuest({
    fullName: name.trim(),
    relation: relation.trim(),
    passportNo: passport.trim().toUpperCase(),
    dateOfBirth: dob.trim(),
    nationality: "Thai"
  }).then(() => {
    renderSettingsSavedGuests();
    window.showToast(`เพิ่ม "${name.trim()}" ในรายชื่อผู้ร่วมเดินทางเรียบร้อยแล้ว`, "success");
  });
}

function deleteSavedGuest(id) {
  if (confirm("คุณแน่ใจว่าต้องการลบผู้ร่วมเดินทางนี้ออกจากรายชื่อประจำ?")) {
    window.DreamState.deleteSavedGuest(id).then(() => {
      renderSettingsSavedGuests();
      window.showToast("ลบผู้ร่วมเดินทางเรียบร้อย", "info");
    });
  }
}

async function saveSettingsProfile() {
  const name = document.getElementById("settings-input-name")?.value.trim() || document.getElementById("profile-input-name")?.value.trim();
  const email = document.getElementById("settings-input-email")?.value.trim() || document.getElementById("profile-input-email")?.value.trim();
  const phone = document.getElementById("settings-input-phone")?.value.trim() || document.getElementById("profile-input-phone")?.value.trim();
  const passportNo = document.getElementById("settings-input-passport")?.value.trim() || document.getElementById("profile-input-passport")?.value.trim();

  // Password fields
  const currentPassword = document.getElementById("settings-input-cur-pass")?.value.trim();
  const newPassword = document.getElementById("settings-input-new-pass")?.value.trim();
  const confirmPassword = document.getElementById("settings-input-confirm-pass")?.value.trim();

  // Travel Preferences fields
  const smokingAllowed = document.getElementById("pref-smoking")?.checked || false;
  const petFriendly = document.getElementById("pref-pets")?.checked || false;
  const specialRequests = document.getElementById("pref-special-requests")?.value.trim() || "";

  // Client-side Validation
  if (!name) {
    window.showToast("กรุณาระบุชื่อ-นามสกุล", "warning");
    return;
  }

  if (email && (!email.includes("@") || !email.includes("."))) {
    window.showToast("รูปแบบอีเมลไม่ถูกต้อง", "warning");
    return;
  }

  if (newPassword) {
    if (!currentPassword) {
      window.showToast("กรุณากรอกรหัสผ่านเดิมเพื่อยืนยันความปลอดภัย", "warning");
      return;
    }
    if (newPassword.length < 6) {
      window.showToast("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร", "warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      window.showToast("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน", "warning");
      return;
    }
  }

  const profilePayload = { name, email, phone, passportNo };
  if (newPassword) {
    profilePayload.currentPassword = currentPassword;
    profilePayload.newPassword = newPassword;
    profilePayload.confirmPassword = confirmPassword;
  }

  // 1. Update Profile Info
  const res = await window.DreamState.updateProfile(profilePayload);

  // 2. Save Travel Preferences (AI Auto-Sync)
  await window.DreamState.updateTravelPreferences({
    bedType: currentBedPref,
    smokingAllowed,
    petFriendly,
    floorPreference: "HIGH",
    dietaryAllergies: currentDietaryAllergies,
    specialRequests
  });

  if (res.success) {
    renderMyAccount();
    updateNavBadges(window.DreamState.state);
    if (document.getElementById("settings-input-cur-pass")) document.getElementById("settings-input-cur-pass").value = "";
    if (document.getElementById("settings-input-new-pass")) document.getElementById("settings-input-new-pass").value = "";
    if (document.getElementById("settings-input-confirm-pass")) document.getElementById("settings-input-confirm-pass").value = "";
    window.showToast("บันทึกข้อมูลโปรไฟล์และความชอบการเดินทางสำหรับ AI เรียบร้อยแล้ว!", "success");
    setIsSettingsOpen(false);
  } else {
    window.showToast(res.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล", "error");
  }
}

// ==========================================
// WORKSPACES & CONTEXT SWITCHING CONTROLLER
// ==========================================

function renderSettingsWorkspaces() {
  const cont = document.getElementById("settings-workspaces-list");
  if (!cont) return;

  const state = window.DreamState?.state;
  const workspaces = state?.workspaces || [];
  const activeWsId = state?.activeWorkspace?.id || "ws-personal";

  cont.innerHTML = workspaces.map(ws => {
    const isActive = (ws.id === activeWsId);
    const badgeBg = ws.type === "corporate" ? "bg-purple-100 text-purple-800" : ws.type === "family" ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800";
    const roleLabel = ws.role === "owner" ? "👑 เจ้าของ (Owner)" : ws.role === "admin" ? "🛡️ ผู้ดูแล (Admin)" : "👤 สมาชิก (Member)";

    return `
      <div onclick="handleSwitchWorkspace('${ws.id}')" class="p-3.5 rounded-2xl border-2 ${
        isActive ? 'border-indigo-600 bg-indigo-50/60 shadow-xs ring-2 ring-indigo-200' : 'border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50'
      } cursor-pointer transition flex items-center justify-between gap-3 group">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-2xl ${
            ws.type === 'corporate' ? 'bg-purple-600 text-white' : ws.type === 'family' ? 'bg-amber-500 text-white' : 'bg-sky-600 text-white'
          } flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs">
            ${ws.type === 'corporate' ? '<i data-lucide="building-2" class="w-5 h-5"></i>' : ws.type === 'family' ? '<i data-lucide="home" class="w-5 h-5"></i>' : '<i data-lucide="user" class="w-5 h-5"></i>'}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${badgeBg}">${roleLabel}</span>
              ${isActive ? '<span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-xs">บริบทปัจจุบัน</span>' : ''}
            </div>
            <span class="font-extrabold text-xs text-slate-900 block truncate mt-0.5">${ws.name}</span>
            <div class="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5 truncate">
              <span>💳 ${ws.billingMethod}</span>
              <span>•</span>
              <span class="font-bold text-slate-700">งบ: ${(ws.balance || 0).toLocaleString()} ฿</span>
              <span>•</span>
              <span>${ws.membersCount || 1} สมาชิก</span>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0">
          ${isActive 
            ? '<div class="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-xs"><i data-lucide="check" class="w-4 h-4"></i></div>' 
            : '<button class="px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 text-xs font-bold transition shadow-xs">สลับบริบท</button>'}
        </div>
      </div>
    `;
  }).join("");

  refreshIcons(cont);
}

async function handleSwitchWorkspace(wsId) {
  const res = await window.DreamState.switchWorkspace(wsId);
  if (res.success) {
    renderSettingsWorkspaces();
    window.showToast(`สลับไปใช้งานบริบท "${res.activeWorkspace.name}" เรียบร้อยแล้ว`, "success");
    if (typeof renderMyAccount === "function") renderMyAccount();
  } else {
    window.showToast(res.message || "เกิดข้อผิดพลาดในการสลับบริบท", "error");
  }
}

function renderSettingsAccountList() {
  const cont = document.getElementById("settings-accounts-list") || document.getElementById("switch-account-list");
  if (!cont) return;

  const state = window.DreamState.state;
  const currentEmail = (state.auth?.currentUser?.email || "").toLowerCase();
  const users = state.users || window.DreamState.getDefaultUsers();

  const accountTypes = {
    "anant.traveler@myprogram.com": { label: "บัญชีส่วนตัว (Personal)", badge: "bg-amber-100 text-amber-800", roleBadge: "Role: User" },
    "corporate@globaltravel.co.th": { label: "บัญชีองค์กร/ธุรกิจ (Corporate)", badge: "bg-indigo-100 text-indigo-800", roleBadge: "Role: Admin 👑" },
    "praewa.family@myprogram.com": { label: "บัญชีครอบครัว (Family)", badge: "bg-emerald-100 text-emerald-800", roleBadge: "Role: User" },
    "admin@myprogram.com": { label: "ผู้ดูแลระบบ (System Admin)", badge: "bg-rose-100 text-rose-800", roleBadge: "Role: Super Admin 🛡️" }
  };

  cont.innerHTML = Object.entries(users).map(([email, u]) => {
    const isCurrent = email.toLowerCase() === currentEmail;
    const info = accountTypes[email] || { label: "บัญชีผู้ใช้ทั่วไป", badge: "bg-slate-100 text-slate-700", roleBadge: `Role: ${u.role || 'user'}` };
    const balanceThb = u.wallet?.balances?.THB || 0;

    return `
      <div onclick="switchUserAccount('${email}')" class="p-3.5 rounded-2xl border-2 ${isCurrent ? 'border-sky-500 bg-sky-50/60 shadow-xs' : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'} cursor-pointer transition flex items-center justify-between gap-3 group">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" class="w-11 h-11 rounded-full object-cover ring-2 ${isCurrent ? 'ring-sky-400' : 'ring-slate-100'} flex-shrink-0">
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full ${info.badge}">${info.label}</span>
              <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">${info.roleBadge}</span>
              ${isCurrent ? '<span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-600 text-white">ใช้งานอยู่</span>' : ''}
            </div>
            <span class="font-bold text-xs text-slate-900 block truncate mt-0.5">${u.name}</span>
            <span class="text-[10px] text-slate-500 block truncate">${email} • ยอดเงิน: ${balanceThb.toLocaleString()} ฿</span>
          </div>
        </div>
        <div class="flex-shrink-0">
          ${isCurrent 
            ? '<div class="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs shadow-xs"><i data-lucide="check" class="w-4 h-4"></i></div>'
            : '<button class="px-3.5 py-1.5 rounded-xl bg-slate-100 group-hover:bg-sky-600 group-hover:text-white text-slate-600 text-xs font-bold transition shadow-xs">สลับบัญชี</button>'}
        </div>
      </div>
    `;
  }).join("");

  refreshIcons(cont);
}

function switchUserAccount(email) {
  const res = window.DreamState.switchAccount(email);
  if (res.success) {
    setIsSettingsOpen(false);
    updateNavBadges(window.DreamState.state);
    renderMyAccount();
    if (typeof initWalletView === "function") initWalletView();
    window.showToast(res.message, "success");
  } else {
    window.showToast(res.message, "error");
  }
}

// ==========================================
// AI PERSONA, PREFERENCES & SECURITY
// ==========================================

function selectAIPersona(persona, save = true) {
  currentAIPersona = persona;
  const personas = ["VALUE_FOCUSED", "LUXURY", "TRANSIT_CENTRIC", "FAMILY_KIDS"];

  personas.forEach(p => {
    const card = document.getElementById(`ai-persona-${p}`);
    if (card) {
      const isMatch = (p === persona);
      if (isMatch) {
        card.className = "p-2.5 rounded-xl border-2 border-amber-600 bg-amber-50/50 text-left transition shadow-xs cursor-pointer";
        const icon = card.querySelector(".persona-check");
        if (icon) {
          icon.setAttribute("data-lucide", "check-circle-2");
          icon.className = "w-3.5 h-3.5 text-amber-600 persona-check";
        }
      } else {
        card.className = "p-2.5 rounded-xl border border-slate-200 bg-white text-left transition hover:border-amber-400 cursor-pointer";
        const icon = card.querySelector(".persona-check");
        if (icon) {
          icon.setAttribute("data-lucide", "circle");
          icon.className = "w-3.5 h-3.5 text-slate-300 persona-check";
        }
      }
    }
  });

  if (save && window.DreamState && typeof window.DreamState.updateAIPersona === "function") {
    window.DreamState.updateAIPersona(persona);
  }
  refreshIcons();
}

function renderSettingsSecurity() {
  const state = window.DreamState?.state;
  const security = state?.security || { twoFactorEnabled: false, activeSessions: [] };

  // 2FA Toggle Button
  const btn2fa = document.getElementById("btn-toggle-2fa");
  if (btn2fa) {
    if (security.twoFactorEnabled) {
      btn2fa.className = "px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1";
      btn2fa.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> เปิดใช้งานแล้ว (2FA)';
    } else {
      btn2fa.className = "px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition cursor-pointer";
      btn2fa.textContent = "ปิดอยู่ (คลิกเพื่อเปิด)";
    }
  }

  // Active Sessions
  const sessionsCont = document.getElementById("settings-sessions-list");
  if (sessionsCont) {
    const sessions = security.activeSessions || [
      { id: "sess-01", device: "Windows 11 (Chrome 128) - เครื่องปัจจุบัน", ip: "182.53.89.243", lastActive: "เมื่อสักครู่", current: true }
    ];

    sessionsCont.innerHTML = sessions.map(s => `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
        <div class="flex items-center gap-2">
          <i data-lucide="${s.current ? 'laptop' : 'smartphone'}" class="w-4 h-4 ${s.current ? 'text-emerald-600' : 'text-slate-400'}"></i>
          <div>
            <span class="font-bold text-slate-800">${s.device}</span>
            <span class="text-[10px] text-slate-400 block">${s.ip} • ใช้งาน: ${s.lastActive}</span>
          </div>
        </div>
        ${s.current ? '<span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">เครื่องนี้</span>' : '<span class="text-[9px] text-slate-400">ออนไลน์</span>'}
      </div>
    `).join("");
  }

  refreshIcons(document.getElementById("settings-security"));
}

async function handleToggle2FA() {
  const isEnabled = await window.DreamState.toggleTwoFactor();
  renderSettingsSecurity();
  window.showToast(isEnabled ? "เปิดการยืนยันตัวตน 2 ชั้น (2FA) แล้ว รหัสผ่านชั่วคราวจะส่งทางอีเมล" : "ปิดการใช้งาน 2FA แล้ว", isEnabled ? "success" : "info");
}

async function handleRevokeSessions() {
  if (confirm("ต้องการยกเลิกการเข้าสู่ระบบบนอุปกรณ์อื่นทั้งหมดหรือไม่?")) {
    await window.DreamState.revokeOtherSessions();
    renderSettingsSecurity();
    window.showToast("ยกเลิกเซสชันอุปกรณ์อื่นทั้งหมดเรียบร้อยแล้ว มีเพียงเครื่องนี้ที่ยังคงเข้าสู่ระบบ", "success");
  }
}

function testLineNotification() {
  const token = document.getElementById("pref-line-token")?.value.trim();
  if (!token) {
    window.showToast("กรุณากรอก LINE Notify Token ก่อนทดสอบส่ง", "warning");
    return;
  }
  window.showToast("ส่งข้อความทดสอบไปยัง LINE Notify แล้ว! กรุณาตรวจเช็คในแอปพลิเคชัน LINE", "success");
}

function selectPrefLanguage(lang) {
  currentPrefLang = lang;
  ["th", "en", "ja"].forEach(l => {
    const btn = document.getElementById(`pref-lang-${l}`);
    if (btn) {
      if (l === lang) {
        btn.className = "p-2 rounded-xl border-2 border-sky-600 bg-sky-50 text-sky-900 font-bold text-xs transition text-center shadow-xs cursor-pointer";
      } else {
        btn.className = "p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-xs hover:border-sky-400 transition text-center cursor-pointer";
      }
    }
  });
}

function selectPrefCurrency(curr) {
  currentPrefCurr = curr;
  ["THB", "AUD", "USD", "JPY", "EUR", "GBP"].forEach(c => {
    const btn = document.getElementById(`pref-curr-${c}`);
    if (btn) {
      if (c === curr) {
        btn.className = "p-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-emerald-900 font-bold text-xs transition text-left flex items-center gap-2 cursor-pointer shadow-xs";
      } else {
        btn.className = "p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-xs hover:border-emerald-400 transition text-left flex items-center gap-2 cursor-pointer";
      }
    }
  });
}

async function savePreferencesChanges() {
  const notifyDeals = document.getElementById("pref-notify-deals")?.checked ?? true;
  const notifyUpdates = document.getElementById("pref-notify-updates")?.checked ?? true;
  const notifyRates = document.getElementById("pref-notify-rates")?.checked ?? true;
  const lineToken = document.getElementById("pref-line-token")?.value.trim() || "";

  // 1. Update Preferences in State
  window.DreamState.updatePreferences({
    language: currentPrefLang,
    primaryCurrency: currentPrefCurr,
    notifyDeals,
    notifyUpdates,
    notifyRates
  });

  // 2. Save AI Persona and Notifications to Backend
  try {
    const email = window.DreamState?.state?.auth?.currentUser?.email || "anant.traveler@myprogram.com";
    await fetch("/api/settings/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, emailNotify: true, lineNotifyToken: lineToken })
    });
  } catch (e) {
    console.warn("Could not save notifications to server:", e);
  }

  setIsSettingsOpen(false);
  applyPrimaryCurrencyUI();

  const langNames = { th: "ภาษาไทย TH", en: "English EN", ja: "日本語 JP" };
  window.showToast(`บันทึกการตั้งค่าเรียบร้อย: ${langNames[currentPrefLang] || currentPrefLang} | สกุลเงิน ${currentPrefCurr} | สไตล์ AI: ${currentAIPersona}`, "success");
}

// Backward Compatibility Aliases for older modals / calls
function openProfileModal(e) {
  if (e) e.stopPropagation();
  setIsSettingsOpen(true, "profile");
}

function closeProfileModal() {
  setIsSettingsOpen(false);
}

function saveProfileChanges() {
  saveSettingsProfile();
}

function openSwitchAccountModal(e) {
  if (e) e.stopPropagation();
  setIsSettingsOpen(true, "accounts");
}

function closeSwitchAccountModal() {
  setIsSettingsOpen(false);
}

function renderSwitchAccountList() {
  renderSettingsAccountList();
}

function openPreferencesModal(e) {
  if (e) e.stopPropagation();
  setIsSettingsOpen(true, "preferences");
}

function closePreferencesModal() {
  setIsSettingsOpen(false);
}

function applyPrimaryCurrencyUI() {
  const curr = window.DreamState?.state?.preferences?.primaryCurrency || "THB";
  const symbolElem = document.getElementById("ai-budget-currency-symbol");
  if (symbolElem) symbolElem.textContent = curr;

  const chip15 = document.getElementById("chip-budget-15k");
  const chip35 = document.getElementById("chip-budget-35k");
  const chip60 = document.getElementById("chip-budget-60k");
  const chip120 = document.getElementById("chip-budget-120k");

  if (chip15) chip15.textContent = formatCurrencyPrice(15000);
  if (chip35) chip35.textContent = formatCurrencyPrice(35000);
  if (chip60) chip60.textContent = formatCurrencyPrice(60000);
  if (chip120) chip120.textContent = formatCurrencyPrice(120000);

  if (window.DreamPlanner?.currentPlan) {
    renderAIPlan(window.DreamPlanner.currentPlan);
  }
}

// Global Window Exports
window.setUnifiedTab = setUnifiedTab;
window.executeUnifiedSearch = executeUnifiedSearch;
window.toggleMoreServicesDropdown = toggleMoreServicesDropdown;
window.closeMoreServicesDropdown = closeMoreServicesDropdown;
window.sendQuickChatMessage = sendQuickChatMessage;
window.openWishlistDrawer = openWishlistDrawer;
window.closeWishlistDrawer = closeWishlistDrawer;
window.renderWishlistDrawer = renderWishlistDrawer;
window.handleWishlistAction = handleWishlistAction;
window.toggleWishlistItem = toggleWishlistItem;
window.openCashOrderModal = openCashOrderModal;
window.closeCashOrderModal = closeCashOrderModal;
window.setCashModalMode = setCashModalMode;
window.onCashOrderCurrencyChange = onCashOrderCurrencyChange;
window.onCashOrderThbInput = onCashOrderThbInput;
window.onCashOrderForeignInput = onCashOrderForeignInput;
window.submitCashCurrencyOrder = submitCashCurrencyOrder;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.submitLogin = submitLogin;
window.submitRegister = submitRegister;
window.handleUserLogout = handleUserLogout;
window.handleNavAuthClick = handleNavAuthClick;

// Filter Exports
window.filterHotels = filterHotels;
window.resetHotelFilters = resetHotelFilters;
window.filterRestaurants = filterRestaurants;
window.setRestaurantCuisineTab = setRestaurantCuisineTab;
window.resetRestaurantFilters = resetRestaurantFilters;
window.filterAttractions = filterAttractions;
window.resetAttractionFilters = resetAttractionFilters;
window.filterFlights = filterFlights;
window.resetFlightFilters = resetFlightFilters;

// Avatar System Exports
window.openAvatarModal = openAvatarModal;
window.closeAvatarModal = closeAvatarModal;
window.triggerCameraCapture = triggerCameraCapture;
window.triggerGalleryUpload = triggerGalleryUpload;
window.handleAvatarFile = handleAvatarFile;
window.selectPresetAvatar = selectPresetAvatar;
window.startWebcam = startWebcam;
window.captureWebcamFrame = captureWebcamFrame;
window.stopWebcam = stopWebcam;
window.saveAvatarChange = saveAvatarChange;

// User Dropdown & Modals Exports
window.setIsSettingsOpen = setIsSettingsOpen;
window.switchSettingsTab = switchSettingsTab;
window.saveSettingsProfile = saveSettingsProfile;
window.renderSettingsAccountList = renderSettingsAccountList;
window.toggleUserDropdown = toggleUserDropdown;
window.closeUserDropdown = closeUserDropdown;
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.saveProfileChanges = saveProfileChanges;
window.openSwitchAccountModal = openSwitchAccountModal;
window.closeSwitchAccountModal = closeSwitchAccountModal;
window.switchUserAccount = switchUserAccount;
window.openPreferencesModal = openPreferencesModal;
window.closePreferencesModal = closePreferencesModal;
window.selectPrefLanguage = selectPrefLanguage;
window.selectPrefCurrency = selectPrefCurrency;
window.savePreferencesChanges = savePreferencesChanges;
window.applyPrimaryCurrencyUI = applyPrimaryCurrencyUI;
window.formatCurrencyPrice = formatCurrencyPrice;

// AI Planner Exports
window.toggleStyleTag = toggleStyleTag;
window.selectAIDayTab = selectAIDayTab;
window.renderAIPlan = renderAIPlan;
window.switchAIPlanVariant = switchAIPlanVariant;
window.removeAISlot = removeAISlot;
window.bookEntireAITrip = bookEntireAITrip;
window.backToAISettings = backToAISettings;

// Live AI Chat & Support Ticket Exports
window.toggleChatDrawer = toggleChatDrawer;
window.resetAIChatHistory = resetAIChatHistory;
window.handleSendChatMessage = handleSendChatMessage;
window.renderBotChatMessage = renderBotChatMessage;
window.openSupportTicketModal = openSupportTicketModal;
window.closeSupportTicketModal = closeSupportTicketModal;
window.closeAdminReplyModal = closeAdminReplyModal;
window.openChatFromReplyModal = openChatFromReplyModal;
window.submitSupportTicket = submitSupportTicket;
window.sendTicketToBackend = sendTicketToBackend;

// Travel Preferences & Saved Guests Exports
window.selectBedPref = selectBedPref;
window.toggleDietChip = toggleDietChip;
window.renderSettingsSavedGuests = renderSettingsSavedGuests;
window.addNewSavedGuestPrompt = addNewSavedGuestPrompt;
window.deleteSavedGuest = deleteSavedGuest;

// Workspaces & Account Context Exports
window.renderSettingsWorkspaces = renderSettingsWorkspaces;
window.handleSwitchWorkspace = handleSwitchWorkspace;

// AI Persona & Security Exports
window.selectAIPersona = selectAIPersona;
window.renderSettingsSecurity = renderSettingsSecurity;
window.handleToggle2FA = handleToggle2FA;
window.handleRevokeSessions = handleRevokeSessions;
window.testLineNotification = testLineNotification;

// Top Nav & Profile Dropdown Navigation Exports
window.handleQuickSettingsClick = handleQuickSettingsClick;
window.handleNavigateProfile = handleNavigateProfile;
window.handleNavigateAccounts = handleNavigateAccounts;
window.handleNavigatePreferences = handleNavigatePreferences;
window.handleNavigateAdmin = handleNavigateAdmin;
window.openAccessDeniedModal = openAccessDeniedModal;
window.closeAccessDeniedModal = closeAccessDeniedModal;
window.closeLogoutConfirmModal = closeLogoutConfirmModal;
window.confirmUserLogout = confirmUserLogout;
window.initClientRouter = initClientRouter;
