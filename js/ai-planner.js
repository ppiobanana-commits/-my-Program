/**
 * MY PROGRAM Platform - Supercharged AI Trip & Budget Planner Engine
 * Integrated with Google Gemini AI API (gemini-3.6-flash) & Smart Budget Optimizer
 * Comprehensive destination matching, 3 daily time-slots (Morning, Afternoon, Evening),
 * Budget Breakdown (~35% Hotel, ~30% Food, ~25% Activity/Transport, ~10% Buffer),
 * Direct booking CTAs to database items, and dynamic modifications via AI Chat.
 */

const GEMINI_API_KEY = "AIzaSyDwy8Xcn-wRISQxUydowFiwJrxvOo0L9_U";

class AITripPlanner {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.currentPlan = null;
    this.activeVariant = "A"; // A = Recommended, B = Relaxed, C = Gourmet
    this.planVariants = {};
    this.activeDayTab = "all"; // "all" or day number 1, 2, 3...
  }

  async generateWithGemini({ destinationId, days = 3, travelers = 2, styles = [], budget = 35000, isBudgetPerPerson = true }) {
    const dest = DREAM_DATA.destinations.find(d => d.id === destinationId) || DREAM_DATA.destinations[0];
    const cityName = this.resolveCityName(dest.name);
    const targetBudgetTotal = isBudgetPerPerson ? (budget * travelers) : budget;
    const currency = (window.DreamState?.state?.preferences?.primaryCurrency || "THB");

    const styleLabels = {
      foodie: "สายกิน & คาเฟ่ (Foodie)",
      nature: "สายธรรมชาติ & พักผ่อน (Nature & Relax)",
      shopping: "สายช้อปปิ้ง & แฟชั่น (Shopping)",
      budget: "สายลุย & สบายกระเป๋า (Budget Traveler)",
      luxury: "สายหรูหรา & โรแมนติก (Luxury & Romance)"
    };
    const effectiveStyles = styles.length > 0 ? styles.map(s => styleLabels[s] || s) : ["ไฮไลต์ยอดนิยม (Highlights)"];

    // Auto-inject User Travel Preferences into AI prompt
    const travelPrefs = window.DreamState?.state?.travelPreferences || {};
    const travelDirectives = [];
    if (travelPrefs.bedType) travelDirectives.push(`- ประเภทเตียง: ${travelPrefs.bedType}`);
    if (travelPrefs.smokingAllowed === false || travelPrefs.nonSmoking) travelDirectives.push(`- ต้องการห้องปลอดบุหรี่เด็ดขาด (Non-smoking)`);
    if (travelPrefs.petFriendly) travelDirectives.push(`- นำสัตว์เลี้ยงเข้าได้ (Pet-friendly)`);
    if (travelPrefs.floorPreference) travelDirectives.push(`- ชั้นที่ต้องการ: ${travelPrefs.floorPreference === 'HIGH' ? 'ชั้นสูง' : 'ชั้นล่าง'}`);
    const allergies = travelPrefs.dietaryAllergies || travelPrefs.allergies;
    if (Array.isArray(allergies) && allergies.length > 0) {
      travelDirectives.push(`- ข้อจำกัดการกิน/แพ้อาหาร: ${allergies.join(", ")} (ต้องหลีกเลี่ยงร้านอาหารและเมนูที่มีสิ่งนี้)`);
    }
    if (travelPrefs.specialRequests) travelDirectives.push(`- คำขอพิเศษ: ${travelPrefs.specialRequests}`);

    const prompt = `You are an expert AI Travel and Budget Architect for "MY PROGRAM" travel platform.
Create a comprehensive, realistic travel itinerary and budget breakdown for:
- Destination: ${dest.name} (${cityName})
- Duration: ${days} days
- Travelers: ${travelers} persons
- Total Budget: ${targetBudgetTotal} ${currency} (for all travelers combined)
- Travel Styles: ${effectiveStyles.join(", ")}
${travelDirectives.length > 0 ? `\nUser Travel Preferences (Strictly comply with these):\n${travelDirectives.join("\n")}\n` : ""}

Strict Requirements:
1. Allocate budget realistically (in ${currency}):
   - hotel: ~35%
   - food: ~30%
   - activity (including transport): ~25%
   - buffer (emergency reserve): ~10%
2. For each day (Day 1 to Day ${days}), provide detailed slots:
   - morning (08:30 - 11:30)
   - afternoon (12:30 - 17:00)
   - evening (18:30 - 21:30)
3. For each slot, provide:
   - place: Name of the attraction, hotel, restaurant, or flight
   - description: Engaging description in Thai explaining what to do/eat/see
   - estimated_cost: Estimated expense in ${currency} for ${travelers} persons (number)
   - type: One of "flight", "hotel", "restaurant", "attraction"
4. Provide local tips in Thai:
   - transport: Best transit cards or tips
   - weather: Expected weather & packing advice
   - secretSpot: Hidden gem spot to visit

Respond ONLY with a valid JSON object strictly matching this schema:
{
  "trip_title": "string",
  "trip_subtitle": "string",
  "budget_summary": {
    "hotel": { "cost": number, "percent": number, "description": "string" },
    "food": { "cost": number, "percent": number, "description": "string" },
    "activity": { "cost": number, "percent": number, "description": "string" },
    "buffer": { "cost": number, "percent": number, "description": "string" },
    "total_budget": number,
    "estimated_cost": number
  },
  "itinerary": [
    {
      "day": number,
      "title": "string",
      "morning": { "place": "string", "description": "string", "estimated_cost": number, "type": "string" },
      "afternoon": { "place": "string", "description": "string", "estimated_cost": number, "type": "string" },
      "evening": { "place": "string", "description": "string", "estimated_cost": number, "type": "string" }
    }
  ],
  "local_tips": {
    "transport": "string",
    "weather": "string",
    "secretSpot": "string"
  }
}`;

    try {
      const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
      let response = null;
      let lastErr = null;

      for (const m of modelsToTry) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${this.apiKey}`;
            const payload = {
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.4,
                response_mime_type: "application/json"
              }
            };
            response = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });

            if (response.status === 429) {
              console.warn(`[AI Planner] 429 Rate limit on ${m}, attempt ${attempt + 1}/2`);
              await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
              continue;
            }

            if (response.status === 404) {
              console.warn(`[AI Planner] 404 on ${m}, falling back to next model`);
              break;
            }

            if (response.ok) break;
          } catch (e) {
            lastErr = e;
          }
        }
        if (response && response.ok) break;
      }

      if (!response || !response.ok) {
        console.warn("All Gemini API models failed or reached quota limit, falling back to Smart Engine");
        window.showToast("⚡ ขณะนี้ AI มีผู้ใช้งานหนาแน่น ระบบสลับมาใช้ Smart Travel Engine ให้ทันที", "info");
        const fallbackPlan = this.generateItinerary({ destinationId, days, travelers, styles, budget, isBudgetPerPerson });
        fallbackPlan.isFallback = true;
        fallbackPlan.fallbackReason = lastErr ? lastErr.message : "Rate limit or quota fallback";
        return fallbackPlan;
      }

      const json = await response.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("No candidate content from Gemini API");

      let cleanText = rawText.trim();
      const jsonMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        cleanText = jsonMatch[1].trim();
      } else {
        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleanText = cleanText.substring(firstBrace, lastBrace + 1);
        }
      }
      const parsed = JSON.parse(cleanText);

      return this.transformGeminiPlan(parsed, dest, cityName, days, travelers, styles, targetBudgetTotal);
    } catch (err) {
      console.warn("Gemini API call failed, falling back to built-in smart engine:", err);
      if (err && (err.message?.includes("429") || err.status === 429)) {
        window.showToast(" ระบบพบ 429 Too Many Requests จาก Gemini API สลับใช้ Smart Engine ให้เรียบร้อย", "warning");
      }
      const fallbackPlan = this.generateItinerary({ destinationId, days, travelers, styles, budget, isBudgetPerPerson });
      fallbackPlan.isFallback = true;
      fallbackPlan.fallbackReason = err.message;
      return fallbackPlan;
    }
  }

  transformGeminiPlan(geminiData, dest, cityName, days, travelers, styles, targetBudgetTotal) {
    const matchedHotels = DREAM_DATA.hotels.filter(h => h.city.toLowerCase() === cityName.toLowerCase() || h.cityTh.includes(dest.name.split(" ")[0]));
    const matchedFlights = DREAM_DATA.flights.filter(f => f.to.toLowerCase().includes(cityName.toLowerCase()) || f.to.includes(dest.name.split(" ")[0]));
    const matchedRestaurants = DREAM_DATA.restaurants.filter(r => r.city.toLowerCase() === cityName.toLowerCase() || r.cityTh.includes(dest.name.split(" ")[0]));
    const matchedAttractions = DREAM_DATA.attractions.filter(a => a.city.toLowerCase() === cityName.toLowerCase() || a.cityTh.includes(dest.name.split(" ")[0]));

    const fallbackHotels = matchedHotels.length > 0 ? matchedHotels : DREAM_DATA.hotels;
    const fallbackFlights = matchedFlights.length > 0 ? matchedFlights : DREAM_DATA.flights;
    const fallbackRestaurants = matchedRestaurants.length > 0 ? matchedRestaurants : DREAM_DATA.restaurants;
    const fallbackAttractions = matchedAttractions.length > 0 ? matchedAttractions : DREAM_DATA.attractions;

    const chosenHotel = fallbackHotels[0] || DREAM_DATA.hotels[0];
    const primaryFlight = fallbackFlights[0] || DREAM_DATA.flights[0];

    const matchDBItem = (slotType, placeName, dayIndex) => {
      const p = (placeName || "").toLowerCase();
      if (slotType === "hotel") {
        const found = fallbackHotels.find(h => p.includes(h.name.toLowerCase()) || h.name.toLowerCase().includes(p));
        return found || fallbackHotels[dayIndex % fallbackHotels.length];
      } else if (slotType === "restaurant") {
        const found = fallbackRestaurants.find(r => p.includes(r.name.toLowerCase()) || r.name.toLowerCase().includes(p) || p.includes(r.cuisine.toLowerCase()));
        return found || fallbackRestaurants[dayIndex % fallbackRestaurants.length];
      } else if (slotType === "flight") {
        return primaryFlight;
      } else {
        const found = fallbackAttractions.find(a => p.includes(a.name.toLowerCase()) || a.name.toLowerCase().includes(p) || p.includes(a.category.toLowerCase()));
        return found || fallbackAttractions[dayIndex % fallbackAttractions.length];
      }
    };

    const itineraryDays = [];
    const gItinerary = Array.isArray(geminiData.itinerary) ? geminiData.itinerary : [];

    gItinerary.forEach((dayObj, dIdx) => {
      const dayNum = dayObj.day || (dIdx + 1);
      const dayTitle = dayObj.title || `วันที่ ${dayNum}: สัมผัสไฮไลต์แห่ง ${dest.name.split(' ')[0]}`;

      const mapSlot = (rawSlot, period, periodLabel, defaultTime, fallbackType) => {
        if (!rawSlot) {
          return {
            period,
            periodLabel,
            time: defaultTime,
            title: `กิจกรรมอิสระ ${periodLabel}`,
            type: fallbackType,
            description: "พักผ่อนหรือเดินเล่นชมวิวเมืองตามอัธยาศัย",
            price: 0,
            itemRef: fallbackAttractions[0],
            image: dest.image,
            actionType: fallbackType,
            actionLabel: "ดูรายละเอียด"
          };
        }

        const type = (rawSlot.type || fallbackType).toLowerCase();
        const validTypes = ["flight", "hotel", "restaurant", "attraction"];
        const finalType = validTypes.includes(type) ? type : fallbackType;
        const matchedItem = matchDBItem(finalType, rawSlot.place, dIdx);

        let actionLabel = "ดูรายละเอียด";
        if (finalType === "hotel") actionLabel = "จองที่พักนี้ผ่านระบบ";
        else if (finalType === "restaurant") actionLabel = "จองโต๊ะร้านนี้";
        else if (finalType === "attraction") actionLabel = "ซื้อตั๋วกิจกรรมทันที";
        else if (finalType === "flight") actionLabel = "เลือกที่นั่ง / จองตั๋ว";

        return {
          period,
          periodLabel,
          time: defaultTime,
          title: rawSlot.place || `แลนด์มาร์ก ${dest.name.split(' ')[0]}`,
          type: finalType,
          description: rawSlot.description || "",
          price: Number(rawSlot.estimated_cost) || (matchedItem?.price || matchedItem?.averagePrice || 1200),
          itemRef: matchedItem,
          image: matchedItem?.image || dest.image,
          actionType: finalType,
          actionLabel
        };
      };

      const morningSlot = mapSlot(dayObj.morning, "morning", "ช่วงเช้า (Morning)", "08:30 - 11:30", dIdx === 0 ? "flight" : "attraction");
      const afternoonSlot = mapSlot(dayObj.afternoon, "afternoon", "ช่วงบ่าย (Afternoon)", "12:30 - 17:00", "restaurant");
      const eveningSlot = mapSlot(dayObj.evening, "evening", "ช่วงค่ำ (Evening)", "18:30 - 21:30", "hotel");

      itineraryDays.push({
        dayNumber: dayNum,
        dayTitle,
        slots: [morningSlot, afternoonSlot, eveningSlot]
      });
    });

    const bSummary = geminiData.budget_summary || {};
    const hotelCost = Number(bSummary.hotel?.cost) || Math.round(targetBudgetTotal * 0.35);
    const foodCost = Number(bSummary.food?.cost) || Math.round(targetBudgetTotal * 0.30);
    const actCost = Number(bSummary.activity?.cost) || Math.round(targetBudgetTotal * 0.25);
    const bufCost = Number(bSummary.buffer?.cost) || Math.round(targetBudgetTotal * 0.10);

    const rawTotal = hotelCost + foodCost + actCost;
    const bundleDiscount = Math.round(rawTotal * 0.12);
    const estimatedTotal = rawTotal - bundleDiscount;

    const breakdown = {
      hotel: {
        cost: hotelCost,
        percent: Number(bSummary.hotel?.percent) || 35,
        label: "ที่พัก (Hotels)",
        color: "bg-sky-500",
        text: "text-sky-600",
        desc: bSummary.hotel?.description || "ที่พักคัดสรรตามงบ"
      },
      food: {
        cost: foodCost,
        percent: Number(bSummary.food?.percent) || 30,
        label: "อาหาร & คาเฟ่ (Food & Dining)",
        color: "bg-amber-500",
        text: "text-amber-600",
        desc: bSummary.food?.description || "มื้ออร่อยและคาเฟ่ยอดนิยม"
      },
      activity: {
        cost: actCost,
        percent: Number(bSummary.activity?.percent) || 25,
        label: "กิจกรรม & เดินทาง (Activities & Transport)",
        color: "bg-emerald-500",
        text: "text-emerald-600",
        desc: bSummary.activity?.description || "บัตรท่องเที่ยวและการเดินทาง"
      },
      buffer: {
        cost: bufCost,
        percent: Number(bSummary.buffer?.percent) || 10,
        label: "งบสำรองฉุกเฉิน (Emergency Buffer)",
        color: "bg-purple-500",
        text: "text-purple-600",
        desc: bSummary.buffer?.description || "สำรองกรณีฉุกเฉินและของฝาก"
      }
    };

    const localTips = geminiData.local_tips || this.generateLocalTips(cityName);

    const mainPlan = {
      variantKey: "A",
      variantTitle: geminiData.trip_title || `แพลนทริป ${dest.name} (${days} วัน ${days > 1 ? days - 1 : 0} คืน)`,
      tripSubtitle: geminiData.trip_subtitle || "แผนการท่องเที่ยวอัจฉริยะวิเคราะห์โดย Google Gemini AI",
      isGemini: true,
      destination: dest,
      cityName,
      days,
      travelers,
      styles,
      targetBudgetTotal,
      chosenHotel,
      rawTotal,
      bundleDiscount,
      estimatedTotal,
      breakdown,
      itineraryDays,
      localTips
    };

    this.planVariants = {
      A: mainPlan,
      B: this.buildPlanVariant("B", "สโลว์ไลฟ์ & ธรรมชาติ (Relaxed Nature)", dest, cityName, days, travelers, ["nature"], targetBudgetTotal, fallbackHotels, fallbackFlights, fallbackRestaurants, fallbackAttractions),
      C: this.buildPlanVariant("C", "สายกินจุ๊บจิ๊บ & คาเฟ่ (Gourmet & Cafe)", dest, cityName, days, travelers, ["foodie"], targetBudgetTotal, fallbackHotels, fallbackFlights, fallbackRestaurants, fallbackAttractions)
    };

    this.activeVariant = "A";
    this.activeDayTab = "all";
    this.currentPlan = mainPlan;
    return mainPlan;
  }


  generateItinerary({ destinationId, days = 3, travelers = 2, style = "highlight", styles = [], budget = 35000, isBudgetPerPerson = true }) {
    const dest = DREAM_DATA.destinations.find(d => d.id === destinationId) || DREAM_DATA.destinations[0];
    const cityName = this.resolveCityName(dest.name);

    // Filter available database items
    const matchedHotels = DREAM_DATA.hotels.filter(h => h.city.toLowerCase() === cityName.toLowerCase() || h.cityTh.includes(dest.name.split(" ")[0]));
    const matchedFlights = DREAM_DATA.flights.filter(f => f.to.toLowerCase().includes(cityName.toLowerCase()) || f.to.includes(dest.name.split(" ")[0]));
    const matchedRestaurants = DREAM_DATA.restaurants.filter(r => r.city.toLowerCase() === cityName.toLowerCase() || r.cityTh.includes(dest.name.split(" ")[0]));
    const matchedAttractions = DREAM_DATA.attractions.filter(a => a.city.toLowerCase() === cityName.toLowerCase() || a.cityTh.includes(dest.name.split(" ")[0]));

    // Fallback if city has fewer items
    const fallbackHotels = matchedHotels.length > 0 ? matchedHotels : DREAM_DATA.hotels;
    const fallbackFlights = matchedFlights.length > 0 ? matchedFlights : DREAM_DATA.flights;
    const fallbackRestaurants = matchedRestaurants.length > 0 ? matchedRestaurants : DREAM_DATA.restaurants;
    const fallbackAttractions = matchedAttractions.length > 0 ? matchedAttractions : DREAM_DATA.attractions;

    const targetBudgetTotal = isBudgetPerPerson ? (budget * travelers) : budget;

    // Multi-styles array
    const effectiveStyles = Array.isArray(styles) && styles.length > 0 ? styles : [style];

    // Build 3 Plan Variants (A, B, C)
    this.planVariants = {
      A: this.buildPlanVariant("A", "ไฮไลต์ยอดนิยมครบเครื่อง (Recommended)", dest, cityName, days, travelers, effectiveStyles, targetBudgetTotal, fallbackHotels, fallbackFlights, fallbackRestaurants, fallbackAttractions),
      B: this.buildPlanVariant("B", "สโลว์ไลฟ์ & ธรรมชาติ (Relaxed Nature)", dest, cityName, days, travelers, ["nature"], targetBudgetTotal, fallbackHotels, fallbackFlights, fallbackRestaurants, fallbackAttractions),
      C: this.buildPlanVariant("C", "สายกินจุ๊บจิ๊บ & คาเฟ่ (Gourmet & Cafe)", dest, cityName, days, travelers, ["foodie"], targetBudgetTotal, fallbackHotels, fallbackFlights, fallbackRestaurants, fallbackAttractions)
    };

    this.activeVariant = "A";
    this.activeDayTab = "all";
    this.currentPlan = this.planVariants.A;
    return this.currentPlan;
  }

  resolveCityName(name) {
    if (!name) return "Tokyo";
    const n = name.toLowerCase();
    if (n.includes("โตเกียว") || n.includes("tokyo")) return "Tokyo";
    if (n.includes("โอซาก้า") || n.includes("osaka") || n.includes("เกียวโต") || n.includes("kyoto")) return "Osaka";
    if (n.includes("ฮอกไกโด") || n.includes("hokkaido") || n.includes("ซัปโปโร")) return "Hokkaido";
    if (n.includes("โซล") || n.includes("seoul")) return "Seoul";
    if (n.includes("ภูเก็ต") || n.includes("phuket")) return "Phuket";
    if (n.includes("เชียงใหม่") || n.includes("chiang mai")) return "Chiang Mai";
    if (n.includes("กระบี่") || n.includes("krabi")) return "Krabi";
    if (n.includes("สมุย") || n.includes("samui")) return "Samui";
    if (n.includes("สวิต") || n.includes("swiss")) return "Switzerland";
    if (n.includes("ปารีส") || n.includes("paris")) return "Paris";
    if (n.includes("ลอนดอน") || n.includes("london")) return "London";
    if (n.includes("บาหลี") || n.includes("bali")) return "Bali";
    if (n.includes("สิงคโปร์") || n.includes("singapore")) return "Singapore";
    if (n.includes("มัลดีฟส์") || n.includes("maldives")) return "Maldives";
    if (n.includes("นิวยอร์ก") || n.includes("new york")) return "New York";
    return "Bangkok";
  }

  buildPlanVariant(variantKey, variantTitle, dest, cityName, days, travelers, styles, targetBudgetTotal, hotels, flights, restaurants, attractions) {
    // Hotel Selection based on budget and styles
    let chosenHotel = hotels[0] || DREAM_DATA.hotels[0];
    const isBudgetStyle = styles.includes("budget") || (targetBudgetTotal / (days * travelers) < 3500);
    const isLuxuryStyle = styles.includes("luxury") || (targetBudgetTotal / (days * travelers) > 15000);

    if (isBudgetStyle && hotels.length > 2) {
      chosenHotel = hotels.find(h => h.pricePerNight < 2000) || hotels[hotels.length - 1];
    } else if (isLuxuryStyle && hotels.length > 0) {
      chosenHotel = hotels.find(h => h.pricePerNight >= 4000) || hotels[0];
    }

    const primaryFlight = flights[0] || DREAM_DATA.flights[0];
    const roomsCount = Math.ceil(travelers / 2);
    const itineraryDays = [];

    for (let dayNum = 1; dayNum <= days; dayNum++) {
      let morning, afternoon, evening;

      if (dayNum === 1) {
        // Day 1: Flight & Arrival
        morning = {
          period: "morning",
          periodLabel: "ช่วงเช้า (Morning)",
          time: "08:30 - 11:30",
          title: `ออกเดินทางสู่ ${dest.name.split(' ')[0]} ด้วย ${primaryFlight.airline}`,
          type: "flight",
          itemRef: primaryFlight,
          price: primaryFlight.price * travelers,
          description: `เที่ยวบินตรง ${primaryFlight.flightNo} (${primaryFlight.from} -> ${primaryFlight.to}) สัมผัสความสะดวกสบายตลอดการเดินทาง`,
          image: primaryFlight.airlineLogo || dest.image,
          actionType: "flight",
          actionLabel: "จองเที่ยวบิน / เลือกที่นั่ง"
        };

        const lunchRest = restaurants[0] || DREAM_DATA.restaurants[0];
        afternoon = {
          period: "afternoon",
          periodLabel: "ช่วงบ่าย (Afternoon)",
          time: "12:30 - 16:30",
          title: `เช็คอินที่พัก ${chosenHotel.name} & มื้อกลางวันแสนอร่อย`,
          type: "hotel",
          itemRef: chosenHotel,
          price: chosenHotel.pricePerNight * roomsCount,
          description: `เข้าพักห้องพักวิวสวย สิ่งอำนวยความสะดวกครบครัน พร้อมชิมเมนูเด็ด ณ ${lunchRest.name}`,
          image: chosenHotel.image,
          actionType: "hotel",
          actionLabel: "จองที่พักนี้ผ่านระบบ"
        };

        const dinnerRest = restaurants[1] || restaurants[0] || DREAM_DATA.restaurants[0];
        evening = {
          period: "evening",
          periodLabel: "ช่วงค่ำ (Evening)",
          time: "18:00 - 21:30",
          title: `ดินเนอร์ต้อนรับที่ ${dinnerRest.name} & ชมแสงสียามราตรี`,
          type: "restaurant",
          itemRef: dinnerRest,
          price: (dinnerRest.averagePrice || 850) * travelers,
          description: dinnerRest.highlight || `ดื่มด่ำอาหารมื้อพิเศษรสเลิศ และชมบรรยากาศประดับไฟใจกลาง ${dest.name.split(' ')[0]}`,
          image: dinnerRest.image || dest.image,
          actionType: "restaurant",
          actionLabel: "จองโต๊ะร้านนี้"
        };
      } else if (dayNum === days && days > 1) {
        // Final Day: Souvenirs & Return
        const souvenirAttr = attractions[attractions.length - 1] || attractions[0] || DREAM_DATA.attractions[0];
        morning = {
          period: "morning",
          periodLabel: "ช่วงเช้า (Morning)",
          time: "09:00 - 12:00",
          title: `ช้อปปิ้งของฝาก & เก็บภาพความทรงจำที่ ${souvenirAttr.name}`,
          type: "attraction",
          itemRef: souvenirAttr,
          price: souvenirAttr.price * travelers,
          description: souvenirAttr.description || `เดินเล่นเลือกซื้อของฝากท้องถิ่น ขนมขึ้นชื่อ และบันทึกภาพไฮไลต์`,
          image: souvenirAttr.image || dest.image,
          actionType: "attraction",
          actionLabel: "ซื้อตั๋วกิจกรรมทันที"
        };

        const farewellRest = restaurants[restaurants.length - 1] || restaurants[0];
        afternoon = {
          period: "afternoon",
          periodLabel: "ช่วงบ่าย (Afternoon)",
          time: "12:30 - 16:00",
          title: `มื้อกลางวันส่งท้ายที่ ${farewellRest.name} & เช็คเอาต์เดินทางสู่สนามบิน`,
          type: "restaurant",
          itemRef: farewellRest,
          price: (farewellRest.averagePrice || 600) * travelers,
          description: `ลิ้มรสอาหารท้องถิ่นจานโปรดส่งท้ายทริป ก่อนเดินทางสู่สนามบินอย่างตรงเวลา`,
          image: farewellRest.image,
          actionType: "restaurant",
          actionLabel: "จองโต๊ะร้านนี้"
        };

        evening = {
          period: "evening",
          periodLabel: "ช่วงค่ำ (Evening)",
          time: "18:00 - 22:00",
          title: `เดินทางกลับถึงประเทศไทยโดยสวัสดิภาพ (${primaryFlight.airline})`,
          type: "flight",
          itemRef: primaryFlight,
          price: primaryFlight.price * travelers,
          description: `เที่ยวบินขากลับพร้อมความประทับใจเต็มเปี่ยม และรับคะแนนสะสม MY PROGRAM`,
          image: primaryFlight.airlineLogo || dest.image,
          actionType: "flight",
          actionLabel: "จองเที่ยวบิน / เลือกที่นั่ง"
        };
      } else {
        // Intermediate Days
        const attrIdx = (dayNum - 2) % (attractions.length || 1);
        const morningAttr = attractions[attrIdx] || DREAM_DATA.attractions[0];

        morning = {
          period: "morning",
          periodLabel: "ช่วงเช้า (Morning)",
          time: "09:00 - 12:00",
          title: `เปิดประสบการณ์แลนด์มาร์ก ณ ${morningAttr.name}`,
          type: "attraction",
          itemRef: morningAttr,
          price: morningAttr.price * travelers,
          description: morningAttr.description || `ตื่นตาตื่นใจกับจุดท่องเที่ยวระดับโลก สัมผัสวัฒนธรรมและธรรมชาติอันงดงาม`,
          image: morningAttr.image,
          actionType: "attraction",
          actionLabel: "ซื้อตั๋วกิจกรรมทันที"
        };

        const midRest = restaurants[(dayNum) % (restaurants.length || 1)] || restaurants[0];
        afternoon = {
          period: "afternoon",
          periodLabel: "ช่วงบ่าย (Afternoon)",
          time: "12:30 - 17:00",
          title: `รับประทานมื้อกลางวันที่ ${midRest.name} & คาเฟ่ฮิต`,
          type: "restaurant",
          itemRef: midRest,
          price: (midRest.averagePrice || 550) * travelers,
          description: midRest.highlight || `ลิ้มลองอาหารยอดนิยม ถ่ายรูปเช็คอินคาเฟ่บรรยากาศดี`,
          image: midRest.image,
          actionType: "restaurant",
          actionLabel: "จองโต๊ะร้านนี้"
        };

        evening = {
          period: "evening",
          periodLabel: "ช่วงค่ำ (Evening)",
          time: "18:30 - 21:30",
          title: `พักผ่อนสุดผ่อนคลาย ณ ${chosenHotel.name}`,
          type: "hotel",
          itemRef: chosenHotel,
          price: chosenHotel.pricePerNight * roomsCount,
          description: `แช่น้ำอุ่น ดื่มด่ำวิวเมืองหรือสระว่ายน้ำ และผ่อนคลายหลังท่องเที่ยวทั้งวัน`,
          image: chosenHotel.image,
          actionType: "hotel",
          actionLabel: "จองที่พักนี้ผ่านระบบ"
        };
      }

      itineraryDays.push({
        dayNumber: dayNum,
        dayTitle: `วันที่ ${dayNum}: ${dayNum === 1 ? 'ก้าวแรกสู่ทริปในฝัน' : dayNum === days ? 'อำลาความประทับใจ' : 'สัมผัสประสบการณ์ใหม่'}`,
        slots: [morning, afternoon, evening]
      });
    }

    // Cost calculations and category breakdown
    const breakdown = this.calculateBreakdown(itineraryDays, targetBudgetTotal);

    const rawTotal = breakdown.hotel.cost + breakdown.food.cost + breakdown.activity.cost;
    const bundleDiscount = Math.round(rawTotal * 0.12);
    const estimatedTotal = rawTotal - bundleDiscount;

    const localTips = this.generateLocalTips(cityName);

    return {
      variantKey,
      variantTitle,
      destination: dest,
      cityName,
      days,
      travelers,
      styles,
      targetBudgetTotal,
      chosenHotel,
      rawTotal,
      bundleDiscount,
      estimatedTotal,
      breakdown,
      itineraryDays,
      localTips
    };
  }

  calculateBreakdown(itineraryDays, targetBudgetTotal) {
    let hotelCost = 0;
    let foodCost = 0;
    let activityCost = 0;

    itineraryDays.forEach(d => {
      d.slots.forEach(s => {
        if (s.type === "hotel") hotelCost += (s.price || 0);
        else if (s.type === "restaurant") foodCost += (s.price || 0);
        else activityCost += (s.price || 0); // flight, attraction, transfer
      });
    });

    const bufferCost = Math.max(1000, Math.round(targetBudgetTotal * 0.10));
    const combined = (hotelCost + foodCost + activityCost + bufferCost) || 1;

    const hotelPct = Math.min(60, Math.max(15, Math.round((hotelCost / combined) * 100)));
    const foodPct = Math.min(50, Math.max(15, Math.round((foodCost / combined) * 100)));
    const actPct = Math.min(50, Math.max(15, Math.round((activityCost / combined) * 100)));
    const bufPct = Math.max(5, 100 - (hotelPct + foodPct + actPct));

    return {
      hotel: { cost: hotelCost, percent: hotelPct, label: "ที่พัก (Hotels)", color: "bg-sky-500", text: "text-sky-600" },
      food: { cost: foodCost, percent: foodPct, label: "อาหาร & คาเฟ่ (Food & Dining)", color: "bg-amber-500", text: "text-amber-600" },
      activity: { cost: activityCost, percent: actPct, label: "กิจกรรม & เดินทาง (Activities & Transport)", color: "bg-emerald-500", text: "text-emerald-600" },
      buffer: { cost: bufferCost, percent: bufPct, label: "งบสำรองฉุกเฉิน (Emergency Buffer)", color: "bg-purple-500", text: "text-purple-600" }
    };
  }

  generateLocalTips(city) {
    const tipsMap = {
      Tokyo: {
        transport: "แนะนำบัตร Tokyo Subway 72-Hour Pass ประหยัดและครอบคลุมรถไฟใต้ดินทุกสายในโตเกียว",
        weather: "อากาศกำลังสบาย 15-22°C แนะนำเตรียมเสื้อคลุมบางหรือสเวตเตอร์ ถ่ายรูปสวยทุกมุม",
        secretSpot: "ตรอก Yanaka Ginza ย่านเมืองเก่าบรรยากาศย้อนยุค คนไม่พลุกพล่าน ขนมอร่อย"
      },
      Osaka: {
        transport: "ใช้บัตร Osaka Amazing Pass เข้าชมแลนด์มาร์กฟรี 40+ แห่ง และขึ้นรถไฟใต้ดินได้ไม่จำกัด",
        weather: "อากาศอบอุ่นสบาย 16-24°C แต่งตัวแนวสตรีทแฟชั่นถ่ายรูปสวยมาก",
        secretSpot: "ย่านนากาซากิโจ (Nakazakicho) แหล่งรวมคาเฟ่สไตล์วินเทจและร้านศิลปะทำมือ"
      },
      Hokkaido: {
        transport: "แนะนำเช่ารถขับเที่ยวพร้อมระบบ GPS หรือใช้ JR Hokkaido Rail Pass ข้ามเมืองสะดวก",
        weather: "อากาศเย็นสดชื่น 8-16°C ช่วงฤดูหนาวมีหิมะขาวบริสุทธิ์ แนะนำเสื้อกันลมขนเป็ด",
        secretSpot: "เนินเขา Shiroi Koibito Park และวิวทะเลสาบโทยะยามเย็นแสนโรแมนติก"
      },
      Seoul: {
        transport: "ใช้บัตร T-Money แตะผ่านรถไฟใต้ดินและรถเมล์ได้ทั่วเมือง สะดวกและมีส่วนลดต่อเที่ยว",
        weather: "อากาศแจ่มใส 14-23°C แนะนำแต่งตัวแนวเคป๊อปมินิมอล ถ่ายรูปเก๋ทุกคาเฟ่",
        secretSpot: "ย่านอิกซอนดง (Ikseon-dong) หมู่บ้านฮันอกโบราณที่ดัดแปลงเป็นคาเฟ่และบาร์ลับ"
      },
      Phuket: {
        transport: "แนะนำจองรถตู้รับส่งสนามบินล่วงหน้า หรือเช่ารถขับเที่ยวรอบเกาะสะดวกสบายที่สุด",
        weather: "แดดใส น้ำทะเลสวย อุณหภูมิ 28-33°C อย่าลืมครีมกันแดด แว่นกันแดด และชุดว่ายน้ำสีสด",
        secretSpot: "จุดชมวิวกังหันลมใกล้แหลมพรหมเทพ คนน้อยกว่าและชมวิวหาดยะนุ้ยได้สวยงามตระการตา"
      },
      ChiangMai: {
        transport: "เดินทางในเมืองสะดวกด้วยรถแดง สกู๊ตเตอร์ หรือแอปเรียกรถ Grab/Bolt",
        weather: "อากาศดี ยามเช้าบนดอย 12-18°C ในเมือง 25-30°C แนะนำเสื้อคลุมถ่ายรูปตามคาเฟ่",
        secretSpot: "อ่างแก้ว มหาวิทยาลัยเชียงใหม่ วิวอ่างน้ำสะท้อนดอยสุเทพยามเย็นสุดโรแมนติก"
      },
      Switzerland: {
        transport: "ใช้บัตร Swiss Travel Pass นั่งรถไฟชมวิว เรือล่องทะเลสาบ และเข้าพิพิธภัณฑ์ฟรีทั่วสวิส",
        weather: "บนยอดเขาอากาศหนาว 0 ถึง -5°C มีหิมะตลอดปี ควรเตรียมเสื้อกันหนาวขนเป็ดและรองเท้ากันลื่น",
        secretSpot: "ทะเลสาบ Blausee น้ำใสสีฟ้ามรกตดั่งกระจกกลางป่าสน บรรยากาศดั่งเทพนิยาย"
      },
      Paris: {
        transport: "รถไฟใต้ดิน Metro และ RER สะดวกที่สุด ซื้อตั๋ว Navigo Easy แตะผ่านสะดวกสบาย",
        weather: "อุณหภูมิ 12-19°C แฟชั่นฤดูใบไม้ผลิใส่โค้ทยาวและผ้าพันคอถ่ายรูปสวยทุกแลนด์มาร์ก",
        secretSpot: "สะพาน Pont de Bir-Hakeim จุดถ่ายรูปหอไอเฟลสองชั้นที่ไม่มีคนบัง"
      }
    };

    return tipsMap[city] || {
      transport: "เดินทางสะดวกด้วยระบบขนส่งสาธารณะท้องถิ่นและรถรับส่งของโรงแรม",
      weather: "ตรวจสอบสภาพอากาศล่วงหน้า 3 วันเพื่อเตรียมชุดที่เหมาะสม",
      secretSpot: "แนะนำตื่นเช้าเพื่อถ่ายภาพแลนด์มาร์กหลักก่อนที่นักท่องเที่ยวจะหนาแน่น"
    };
  }

  switchVariant(variantKey) {
    if (this.planVariants[variantKey]) {
      this.activeVariant = variantKey;
      this.currentPlan = this.planVariants[variantKey];
      return this.currentPlan;
    }
    return null;
  }

  setActiveDayTab(tab) {
    this.activeDayTab = tab;
  }

  removeItemFromPlan(dayIndex, slotIndex) {
    if (!this.currentPlan || !this.currentPlan.itineraryDays[dayIndex]) return;
    this.currentPlan.itineraryDays[dayIndex].slots.splice(slotIndex, 1);
    this.recalculatePlanTotal();
    return this.currentPlan;
  }

  recalculatePlanTotal() {
    if (!this.currentPlan) return;
    this.currentPlan.breakdown = this.calculateBreakdown(this.currentPlan.itineraryDays, this.currentPlan.targetBudgetTotal);
    const raw = this.currentPlan.breakdown.hotel.cost + this.currentPlan.breakdown.food.cost + this.currentPlan.breakdown.activity.cost;
    this.currentPlan.rawTotal = raw;
    this.currentPlan.bundleDiscount = Math.round(raw * 0.12);
    this.currentPlan.estimatedTotal = raw - this.currentPlan.bundleDiscount;
  }

  // --- Dynamic Modifications triggered by AI Chat Assistant ---
  modifyBudgetDistribution(mode) {
    if (!this.currentPlan) return { success: false, message: "ยังไม่มีแผนการเดินทางที่สร้างไว้" };

    const plan = this.currentPlan;
    const city = plan.cityName;

    if (mode === "lower_hotel_higher_food") {
      // Find budget hotel in city
      const budgetHotel = DREAM_DATA.hotels.find(h => (h.city.toLowerCase() === city.toLowerCase() || h.cityTh.includes(city)) && h.pricePerNight < 2500)
        || DREAM_DATA.hotels.find(h => h.pricePerNight < 2500)
        || DREAM_DATA.hotels[DREAM_DATA.hotels.length - 1];

      plan.chosenHotel = budgetHotel;

      // Update hotel slots and increase food slot budgets
      plan.itineraryDays.forEach(d => {
        d.slots.forEach(s => {
          if (s.type === "hotel") {
            s.itemRef = budgetHotel;
            s.title = `พักผ่อน ณ ${budgetHotel.name} (เกรดคุ้มค่า)`;
            s.price = Math.round(budgetHotel.pricePerNight * Math.ceil(plan.travelers / 2));
            s.image = budgetHotel.image;
          } else if (s.type === "restaurant") {
            // Upgrade food allowance by 40%
            s.price = Math.round(s.price * 1.4);
            s.description += " (อัปเกรดเซ็ตเมนูพรีเมียม / วากิว / มิชลิน)";
          }
        });
      });

      this.recalculatePlanTotal();
      return {
        success: true,
        message: `ปรับลดงบที่พักเป็น "${budgetHotel.name}" และเพิ่มงบร้านอาหารสุดพิเศษให้อัตโนมัติเรียบร้อยแล้วครับ! `,
        plan: this.currentPlan
      };
    } else if (mode === "lower_food_higher_hotel") {
      // Find luxury hotel
      const luxuryHotel = DREAM_DATA.hotels.find(h => (h.city.toLowerCase() === city.toLowerCase() || h.cityTh.includes(city)) && h.pricePerNight >= 5000)
        || DREAM_DATA.hotels[0];

      plan.chosenHotel = luxuryHotel;

      plan.itineraryDays.forEach(d => {
        d.slots.forEach(s => {
          if (s.type === "hotel") {
            s.itemRef = luxuryHotel;
            s.title = `เข้าพักโรงแรมหรูระดับ 5 ดาว ${luxuryHotel.name}`;
            s.price = Math.round(luxuryHotel.pricePerNight * Math.ceil(plan.travelers / 2));
            s.image = luxuryHotel.image;
          } else if (s.type === "restaurant") {
            s.price = Math.round(s.price * 0.75);
          }
        });
      });

      this.recalculatePlanTotal();
      return {
        success: true,
        message: `อัปเกรดที่พักเป็น "${luxuryHotel.name}" ระดับลักชัวรี่ และปรับสัดส่วนอาหารให้พอดีงบแล้วครับ! `,
        plan: this.currentPlan
      };
    }

    return { success: false, message: "ไม่พบรูปแบบการปรับงบที่ต้องการ" };
  }

  swapRestaurantSlot(dayNum, cuisineOrName) {
    if (!this.currentPlan) return { success: false, message: "ยังไม่มีแผนการเดินทางที่สร้างไว้" };

    const targetDay = this.currentPlan.itineraryDays.find(d => d.dayNumber === parseInt(dayNum, 10)) || this.currentPlan.itineraryDays[0];
    if (!targetDay) return { success: false, message: `ไม่พบวันที่ ${dayNum} ในแผนการเดินทาง` };

    const query = (cuisineOrName || "").toLowerCase();

    // Find restaurant matching query
    let matchedRest = DREAM_DATA.restaurants.find(r => 
      r.name.toLowerCase().includes(query) || 
      r.cuisine.toLowerCase().includes(query) || 
      (r.highlight && r.highlight.toLowerCase().includes(query)) ||
      (query.includes("ราเมง") && (r.name.includes("ราเมน") || r.name.includes("Ramen") || r.cuisine.includes("ราเมน"))) ||
      (query.includes("ซูชิ") && (r.name.includes("ซูชิ") || r.cuisine.includes("ญี่ปุ่น")))
    );

    if (!matchedRest) {
      matchedRest = DREAM_DATA.restaurants.find(r => r.city.toLowerCase() === this.currentPlan.cityName.toLowerCase()) || DREAM_DATA.restaurants[0];
    }

    // Replace slot
    const restSlot = targetDay.slots.find(s => s.type === "restaurant") || targetDay.slots[targetDay.slots.length - 1];
    if (restSlot) {
      restSlot.title = `ลิ้มรสความอร่อยที่ ${matchedRest.name} (${matchedRest.cuisine})`;
      restSlot.itemRef = matchedRest;
      restSlot.price = (matchedRest.averagePrice || 450) * this.currentPlan.travelers;
      restSlot.description = matchedRest.highlight || `อาหารสไตล์ ${matchedRest.cuisine} รสชาติต้นตำรับ`;
      restSlot.image = matchedRest.image;
      restSlot.actionType = "restaurant";
      restSlot.actionLabel = "จองโต๊ะร้านนี้";
    }

    this.recalculatePlanTotal();
    return {
      success: true,
      message: `เปลี่ยนร้านอาหารในวันที่ ${targetDay.dayNumber} เป็น "${matchedRest.name}" (${matchedRest.cuisine}) เรียบร้อยแล้วครับ! `,
      newRestaurant: matchedRest,
      plan: this.currentPlan
    };
  }

  bookEntirePlanToCart() {
    if (!this.currentPlan) return false;
    const { destination, days, travelers, estimatedTotal, itineraryDays, variantTitle, chosenHotel } = this.currentPlan;

    const packageCartItem = {
      id: "pkg-" + Date.now(),
      type: "custom_package",
      title: `แพ็กเกจ MY PROGRAM: ${destination.name} ${days} วัน ${days > 1 ? days - 1 : 0} คืน`,
      subtitle: `${variantTitle} | ผู้เดินทาง ${travelers} ท่าน | พัก ${chosenHotel?.name || 'โรงแรมคัดสรร'} + ร้านอาหาร + บัตรกิจกรรมครบเซ็ต (ส่วนลด 12%)`,
      price: estimatedTotal,
      quantity: 1,
      image: destination.image,
      details: {
        destination: destination.name,
        days: days,
        travelers: travelers,
        hotel: chosenHotel?.name,
        itinerary: itineraryDays.map(d => ({
          day: d.dayNumber,
          title: d.dayTitle,
          items: d.slots.map(s => s.title)
        }))
      }
    };

    window.DreamState.addToCart(packageCartItem);
    return packageCartItem;
  }
}

window.DreamPlanner = new AITripPlanner();
