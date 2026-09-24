const DREAM_DATA = {
  "destinations": [
    {
      "id": "dest-tokyo",
      "name": "โตเกียว (Tokyo)",
      "country": "ญี่ปุ่น",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "description": "มหานครที่ไม่เคยหลับใหล ผสมผสานเทคโนโลยีล้ำสมัยกับวัฒนธรรมโบราณ",
      "tagline": "ชิมราเมนมิชลิน ช้อปปิ้งชินจูกุ ศาลเจ้าเมจิ",
      "startingPrice": 15900,
      "currencyCode": "JPY",
      "rating": 4.95,
      "reviewCount": 3450
    },
    {
      "id": "dest-osaka",
      "name": "โอซาก้า & เกียวโต (Osaka & Kyoto)",
      "country": "ญี่ปุ่น",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "description": "ครัวแห่งญี่ปุ่นและเมืองหลวงเก่า วัดทองคินคะคุจิและปราสาทโอซาก้า",
      "tagline": "สตรีทฟู้ดโดทงโบริ สวนป่าไผ่อาราชิยามะ",
      "startingPrice": 14500,
      "currencyCode": "JPY",
      "rating": 4.92,
      "reviewCount": 2890
    },
    {
      "id": "dest-hokkaido",
      "name": "ฮอกไกโด / ซัปโปโร (Hokkaido)",
      "country": "ญี่ปุ่น",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      "description": "ดินแดนหิมะขาวโพลน ลานสกีระดับโลก อาหารทะเลสด และทุ่งลาเวนเดอร์",
      "tagline": "สกีรีสอร์ทนิเซโกะ คลองโอตารุ ปูยักษ์ทาระบะ",
      "startingPrice": 17900,
      "currencyCode": "JPY",
      "rating": 4.93,
      "reviewCount": 2150
    },
    {
      "id": "dest-seoul",
      "name": "โซล (Seoul)",
      "country": "เกาหลีใต้",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80",
      "description": "เมืองหลวงแห่งเคป็อป แฟชั่น คาเฟ่สุดชิค และพระราชวังโบราณ",
      "tagline": "ช้อปปิ้งเมียงดง พระราชวังเคียงบก ชิมปิ้งย่างฮงแด",
      "startingPrice": 11900,
      "currencyCode": "KRW",
      "rating": 4.88,
      "reviewCount": 2600
    },
    {
      "id": "dest-phuket",
      "name": "ภูเก็ต (Phuket)",
      "country": "ไทย",
      "region": "domestic",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
      "description": "ไข่มุกอันดามัน ชายหาดทรายขาว น้ำทะเลใส พูลวิลล่าหรูริมหน้าผา",
      "tagline": "ล่องเรือยอชต์ ดำน้ำเกาะพีพี ชิมอาหารพื้นเมืองมิชลิน",
      "startingPrice": 3890,
      "currencyCode": "THB",
      "rating": 4.89,
      "reviewCount": 4120
    },
    {
      "id": "dest-chiangmai",
      "name": "เชียงใหม่ (Chiang Mai)",
      "country": "ไทย",
      "region": "domestic",
      "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
      "description": "เสน่ห์เมืองล้านนา ทิวเขาสลับซับซ้อน คาเฟ่ธรรมชาติ และวิถีสโลว์ไลฟ์",
      "tagline": "ไหว้พระธาตุดอยสุเทพ จิบกาแฟแม่กำปอง ถนนคนเดินท่าแพ",
      "startingPrice": 2990,
      "currencyCode": "THB",
      "rating": 4.91,
      "reviewCount": 3650
    },
    {
      "id": "dest-krabi",
      "name": "กระบี่ (Krabi)",
      "country": "ไทย",
      "region": "domestic",
      "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
      "description": "หน้าผาหินปูนตระการตา เกาะห้อง ทะเลแหวก และอ่าวไร่เลย์",
      "tagline": "ปีนผาไร่เลย์ พายคายัคอ่าวท่าเลน ดำน้ำเกาะปอดะ",
      "startingPrice": 3200,
      "currencyCode": "THB",
      "rating": 4.86,
      "reviewCount": 1980
    },
    {
      "id": "dest-samui",
      "name": "เกาะสมุย (Koh Samui)",
      "country": "ไทย",
      "region": "domestic",
      "image": "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1200&q=80",
      "description": "สวรรค์แห่งอ่าวไทย ทะเลสีคราม ต้นมะพร้าวสูงสง่า รีสอร์ตลักชัวรี่",
      "tagline": "หาดเฉวง หินตาหินยาย ทัวร์หมู่เกาะอ่างทอง",
      "startingPrice": 4500,
      "currencyCode": "THB",
      "rating": 4.87,
      "reviewCount": 2340
    },
    {
      "id": "dest-swiss",
      "name": "สวิตเซอร์แลนด์ (Switzerland)",
      "country": "สวิตเซอร์แลนด์",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      "description": "เทือกเขาแอลป์ ทะเลสาบสีมรกต รถไฟชมวิว และยอดเขาจุงเฟรา",
      "tagline": "ยอดเขาจุงเฟรา ธารน้ำแข็งอเลทช์ นั่ง Glacier Express",
      "startingPrice": 46900,
      "currencyCode": "CHF",
      "rating": 4.97,
      "reviewCount": 1950
    },
    {
      "id": "dest-paris",
      "name": "ปารีส (Paris)",
      "country": "ฝรั่งเศส",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "description": "มหานครแห่งความโรแมนติก แฟชั่นระดับโลก และศิลปะอันทรงคุณค่า",
      "tagline": "หอไอเฟล พิพิธภัณฑ์ลูฟวร์ ล่องเรือแม่น้ำแซน",
      "startingPrice": 39900,
      "currencyCode": "EUR",
      "rating": 4.91,
      "reviewCount": 3100
    },
    {
      "id": "dest-london",
      "name": "ลอนดอน (London)",
      "country": "สหราชอาณาจักร",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
      "description": "เสน่ห์เมืองผู้ดี หอนาฬิกาบิ๊กเบน สะพานทาวเวอร์บริดจ์ และพระราชวังบักกิงแฮม",
      "tagline": "จิบชายามบ่าย ขึ้นลอนดอนอาย ช้อปปิ้งถนนออกซ์ฟอร์ด",
      "startingPrice": 42500,
      "currencyCode": "GBP",
      "rating": 4.89,
      "reviewCount": 2420
    },
    {
      "id": "dest-bali",
      "name": "บาหลี (Bali)",
      "country": "อินโดนีเซีย",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "description": "เกาะสวรรค์แห่งศิลปวัฒนธรรม นาขั้นบันไดเขียวชอุ่ม และวิหารริมหน้าผา",
      "tagline": "วิหารทานาห์ลอต โยคะอูบุด ชายหาดเซมินญัก พูลวิลล่า",
      "startingPrice": 8900,
      "currencyCode": "IDR",
      "rating": 4.85,
      "reviewCount": 3150
    },
    {
      "id": "dest-singapore",
      "name": "สิงคโปร์ (Singapore)",
      "country": "สิงคโปร์",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      "description": "มหานครสีเขียวล้ำสมัย สวน Gardens by the Bay และโรงแรม Marina Bay Sands",
      "tagline": "ยูนิเวอร์แซล สิงคโปร์ ช้อปปิ้งถนนออร์ชาร์ด ชิมข้าวมันไก่",
      "startingPrice": 7900,
      "currencyCode": "SGD",
      "rating": 4.87,
      "reviewCount": 2780
    },
    {
      "id": "dest-maldives",
      "name": "มัลดีฟส์ (Maldives)",
      "country": "มัลดีฟส์",
      "region": "international",
      "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      "description": "เกาะสวรรค์กลางมหาสมุทรอินเดีย วิลล่ากลางน้ำสีเทอร์ควอยซ์ ปะการังสมบูรณ์",
      "tagline": "Water Villa สัมผัสฉลามวาฬ ดินเนอร์ใต้ทะเลสุดโรแมนติก",
      "startingPrice": 48000,
      "currencyCode": "USD",
      "rating": 4.98,
      "reviewCount": 1450
    }
  ],
  "hotels": [
    {
      "id": "h-tok-1",
      "name": "The Ritz-Carlton Tokyo",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 16500,
      "rating": 4.95,
      "reviewsCount": 840,
      "address": "Tokyo Midtown 9-7-1 Akasaka, Tokyo",
      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สระว่ายน้ำลอยฟ้า",
        "สปาหรู",
        "ห้องอาหารมิชลิน",
        "ฟิตเนส 24 ชม."
      ],
      "description": "โรงแรมหรูบนยอดตึก Midtown Tower วิวภูเขาไฟฟูจิและโตเกียวทาวเวอร์",
      "roomTypes": [
        {
          "name": "Deluxe King Room",
          "price": 16500,
          "bed": "1 คิงไซส์",
          "size": "52 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-tok-2",
      "name": "Aman Tokyo (อามาน โตเกียว)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 28000,
      "rating": 4.98,
      "reviewsCount": 620,
      "address": "Otemachi Tower, Chiyoda, Tokyo",
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สถาปัตยกรรมไม้ญี่ปุ่น",
        "บ่อออนเซ็นลอยฟ้า",
        "สปาญี่ปุ่นดั้งเดิม"
      ],
      "description": "โอเอซิสแห่งความเงียบสงบใจกลางย่านการเงินโอเตะมาจิ",
      "roomTypes": [
        {
          "name": "Premier Room",
          "price": 28000,
          "bed": "1 คิงไซส์",
          "size": "80 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-tok-3",
      "name": "Shinjuku Granbell Hotel",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 4,
      "pricePerNight": 4500,
      "rating": 4.75,
      "reviewsCount": 1450,
      "address": "Kabukicho, Shinjuku, Tokyo",
      "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใกล้สถานีรถไฟ",
        "รูฟท็อปบาร์",
        "ฟรี Wi-Fi"
      ],
      "description": "ดีไซน์โฮเทลใจกลางชินจูกุ เดินทางสะดวก ใกล้แหล่งช้อปปิ้ง",
      "roomTypes": [
        {
          "name": "Standard Double",
          "price": 4500,
          "bed": "1 ควีนไซส์",
          "size": "22 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-tok-4",
      "name": "Hoshinoya Tokyo (เรียวกังหรู)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 22500,
      "rating": 4.96,
      "reviewsCount": 480,
      "address": "Otemachi, Tokyo",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เสื่อทาทามิแท้",
        "ออนเซ็นน้ำแร่ธรรมชาติกลางแจ้ง",
        "ชุดกิโมโน"
      ],
      "description": "เรียวกังแนวตั้งร่วมสมัย สัมผัสวิถีชีวิตญี่ปุ่นดั้งเดิมระดับลักชัวรี่",
      "roomTypes": [
        {
          "name": "Yuri Deluxe Room",
          "price": 22500,
          "bed": "2 ฟูกญี่ปุ่นพรีเมียม",
          "size": "50 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-tok-5",
      "name": "Hotel Gracery Shinjuku (ก็อดซิลล่า)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 4,
      "pricePerNight": 3900,
      "rating": 4.72,
      "reviewsCount": 3100,
      "address": "Shinjuku, Tokyo",
      "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิวหัวก็อดซิลล่า",
        "ใกล้สถานี JR",
        "ร้านสะดวกซื้อในตึก"
      ],
      "description": "แลนด์มาร์กยอดฮิตในคาบุกิโจ มีหัวก็อดซิลล่ายักษ์อันโด่งดัง",
      "roomTypes": [
        {
          "name": "Comfort Twin",
          "price": 3900,
          "bed": "2 เตียงเดี่ยว",
          "size": "24 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-tok-b1",
      "name": "Nine Hours Shinjuku-North (แคปซูล)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 2,
      "pricePerNight": 650,
      "rating": 4.65,
      "reviewsCount": 4200,
      "address": "Shin-Okubo, Shinjuku, Tokyo",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "แคปซูลยานอวกาศ",
        "ล็อกเกอร์ส่วนตัว",
        "ห้องอาบน้ำอุ่น 24 ชม.",
        "ใกล้สถานี JR 2 นาที"
      ],
      "description": "แคปซูลโฮเทลดีไซน์ล้ำยุค สะอาด ปลอดภัย เหมาะสำหรับสายแบ็กแพ็กเกอร์และเที่ยวคนเดียว",
      "roomTypes": [
        {
          "name": "Standard Sleeping Pod",
          "price": 650,
          "bed": "1 ฟูกแคปซูลพรีเมียม",
          "size": "3 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-tok-b2",
      "name": "Book And Bed Tokyo Shinjuku (โฮสเทลหนังสือ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 2,
      "pricePerNight": 780,
      "rating": 4.7,
      "reviewsCount": 1850,
      "address": "Kabukicho, Tokyo",
      "image": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "นอนในชั้นหนังสือ",
        "คาเฟ่กาแฟดริป",
        "ฟรี Wi-Fi ความเร็วสูง"
      ],
      "description": "โฮสเทลคอนเซปต์ 'นอนอ่านหนังสือ' เตียงซ่อนอยู่ในชั้นวางหนังสือกว่า 4,000 เล่ม บรรยากาศสุดชิค",
      "roomTypes": [
        {
          "name": "Bookshelf Bunk",
          "price": 780,
          "bed": "1 เตียงในชั้นหนังสือ",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-tok-b3",
      "name": "Khaosan Tokyo Origami (โฮสเทลอาซากุสะ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "country": "ญี่ปุ่น",
      "stars": 2,
      "pricePerNight": 550,
      "rating": 4.68,
      "reviewsCount": 3100,
      "address": "Asakusa, Taito-ku, Tokyo",
      "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใกล้ศาลเจ้าอาซากุสะ 5 นาที",
        "ครัวส่วนกลางทำอาหารได้",
        "เลานจ์ชมวิววัด"
      ],
      "description": "โฮสเทลยอดนิยมขวัญใจคนไทย เดินไปวัดเซนโซจิได้ง่าย บรรยากาศอบอุ่นเป็นกันเอง",
      "roomTypes": [
        {
          "name": "Dormitory Bed",
          "price": 550,
          "bed": "1 เตียง 2 ชั้น",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-osa-1",
      "name": "W Osaka (ดับเบิ้ลยู โอซาก้า)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 12900,
      "rating": 4.88,
      "reviewsCount": 910,
      "address": "Shinsaibashi, Chuo Ward, Osaka",
      "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ดีไซน์สดใสโมเดิร์น",
        "สระว่ายน้ำในร่ม",
        "WET Bar",
        "ฟิตเนส"
      ],
      "description": "โรงแรมไลฟ์สไตล์สุดเก๋ใจกลางชินไซบาชิ ดีไซน์โดยทาดาโอะ อันโดะ",
      "roomTypes": [
        {
          "name": "Wonderful King",
          "price": 12900,
          "bed": "1 คิงไซส์",
          "size": "40 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-kyo-1",
      "name": "Four Seasons Hotel Kyoto",
      "city": "Kyoto",
      "cityTh": "เกียวโต",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 23500,
      "rating": 4.96,
      "reviewsCount": 540,
      "address": "Higashiyama Ward, Kyoto",
      "image": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สวนสไตล์ญี่ปุ่น 800 ปี",
        "ศาลาชงชา",
        "สปาหรู",
        "สระว่ายน้ำ"
      ],
      "description": "โอบล้อมด้วยสวนประวัติศาสตร์ชาคุนซุอิเอน สัมผัสความสงบแห่งเกียวโต",
      "roomTypes": [
        {
          "name": "Deluxe Garden View",
          "price": 23500,
          "bed": "1 คิงไซส์",
          "size": "53 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-osa-2",
      "name": "Swissôtel Nankai Osaka",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 6800,
      "rating": 4.82,
      "reviewsCount": 2200,
      "address": "Namba, Osaka",
      "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เชื่อมต่อสถานี Namba",
        "ตรงสู่สนามบินคันไซ",
        "สปา"
      ],
      "description": "ทำเลดีที่สุดในโอซาก้า อยู่เหนือสถานีรถไฟนัมบะโดยตรง",
      "roomTypes": [
        {
          "name": "Advantage Room",
          "price": 6800,
          "bed": "2 เตียงเดี่ยว",
          "size": "32 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-hok-1",
      "name": "Aya Niseko (สกีรีสอร์ทฮอกไกโด)",
      "city": "Hokkaido",
      "cityTh": "ฮอกไกโด",
      "country": "ญี่ปุ่น",
      "stars": 5,
      "pricePerNight": 18500,
      "rating": 4.92,
      "reviewsCount": 430,
      "address": "Niseko, Hokkaido",
      "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "Ski-in/Ski-out",
        "ออนเซ็นวิวหิมะ",
        "ครัวส่วนตัว",
        "สปา"
      ],
      "description": "สกีรีสอร์ทระดับพรีเมียม สัมผัสหิมะพาวเดอร์สโนว์ที่ดีที่สุดในโลก",
      "roomTypes": [
        {
          "name": "1-Bedroom Forest View",
          "price": 18500,
          "bed": "1 คิงไซส์",
          "size": "48 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-osa-b1",
      "name": "Drop Inn Osaka (โฮสเทลอุเมดะ)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "country": "ญี่ปุ่น",
      "stars": 2,
      "pricePerNight": 480,
      "rating": 4.74,
      "reviewsCount": 2600,
      "address": "Fukushima, Umeda, Osaka",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เตียงไม้ส่วนตัวมีม่านกั้น",
        "ชาเขียวฟรีตลอดวัน",
        "เครื่องซักผ้าหยอดเหรียญ"
      ],
      "description": "โฮสเทลญี่ปุ่นสะอาดสะอ้าน ใกล้สถานี Osaka/Umeda เดินทางไปเกียวโตและโกเบสะดวกมาก",
      "roomTypes": [
        {
          "name": "Bunk Bed in Dorm",
          "price": 480,
          "bed": "1 เตียงในหอนอน",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-osa-b2",
      "name": "Dotonbori Riverside Guesthouse",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "country": "ญี่ปุ่น",
      "stars": 2,
      "pricePerNight": 620,
      "rating": 4.69,
      "reviewsCount": 1980,
      "address": "Namba, Dotonbori, Osaka",
      "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ติดป้ายกูลิโกะ 3 นาที",
        "เดินกินสตรีทฟู้ดได้ทั้งคืน",
        "ฝากกระเป๋าฟรี"
      ],
      "description": "ทำเลทองริมคลองโดทงโบริ ก้าวเท้าออกจากที่พักก็เจอป้ายกูลิโกะและร้านทาโกะยากิชื่อดัง",
      "roomTypes": [
        {
          "name": "Single Pod Room",
          "price": 620,
          "bed": "1 เตียงเดี่ยว",
          "size": "5 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-kyo-b1",
      "name": "Piece Hostel Kyoto (บูทีคโฮสเทลเกียวโต)",
      "city": "Kyoto",
      "cityTh": "เกียวโต",
      "country": "ญี่ปุ่น",
      "stars": 3,
      "pricePerNight": 550,
      "rating": 4.88,
      "reviewsCount": 3900,
      "address": "Minami-ku, Kyoto Station",
      "image": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "อาหารเช้าฟรี",
        "ใกล้สถานีเกียวโต 3 นาที",
        "ลานระเบียงสวนหิน"
      ],
      "description": "โฮสเทลรางวัลยอดเยี่ยมระดับโลก สไตล์มินิมอลโมเดิร์น บริการอาหารเช้าและกาแฟฟรี",
      "roomTypes": [
        {
          "name": "Custom Pod Bed",
          "price": 550,
          "bed": "1 เตียงพ็อด",
          "size": "4 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-hok-b1",
      "name": "The Stay Sapporo (โฮสเทลใจกลางซัปโปโร)",
      "city": "Hokkaido",
      "cityTh": "ฮอกไกโด",
      "country": "ญี่ปุ่น",
      "stars": 2,
      "pricePerNight": 490,
      "rating": 4.71,
      "reviewsCount": 1720,
      "address": "Susukino, Sapporo",
      "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใกล้สวนโอโดริและย่านซูซูกิโนะ",
        "ห้องครัวส่วนกลาง",
        "ที่เก็บสกี/สโนว์บอร์ด"
      ],
      "description": "ที่พักราคาประหยัดสำหรับทริปชมเทศกาลหิมะและเล่นสกี เดินทางขึ้นรถไฟสะดวกสบาย",
      "roomTypes": [
        {
          "name": "Capsule Bed",
          "price": 490,
          "bed": "1 เตียงแคปซูล",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-sel-1",
      "name": "Signiel Seoul (ซิกเนียล โซล)",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 5,
      "pricePerNight": 16800,
      "rating": 4.94,
      "reviewsCount": 880,
      "address": "Lotte World Tower, Songpa-gu, Seoul",
      "image": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ชั้น 76-101 สูงเสียดฟ้า",
        "มิชลินไดน์นิ่ง",
        "สปา Evian",
        "วิวแม่น้ำฮัน"
      ],
      "description": "โรงแรมหรูบนยอดตึก Lotte World Tower ที่สูงเป็นอันดับ 6 ของโลก",
      "roomTypes": [
        {
          "name": "Grand Deluxe River View",
          "price": 16800,
          "bed": "1 คิงไซส์",
          "size": "45 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sel-2",
      "name": "RYSE, Autograph Collection",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 4,
      "pricePerNight": 5800,
      "rating": 4.85,
      "reviewsCount": 1650,
      "address": "Hongdae, Mapo-gu, Seoul",
      "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใจกลางย่านฮงแด",
        "แกลเลอรีศิลปะ",
        "รูฟท็อปบาร์",
        "ร้านกาแฟคราฟต์"
      ],
      "description": "โรงแรมสุดอาร์ตขวัญใจคนรุ่นใหม่ เดินเที่ยว ช้อปปิ้ง และปาร์ตี้ฮงแดสะดวก",
      "roomTypes": [
        {
          "name": "Creator Room",
          "price": 5800,
          "bed": "1 คิงไซส์",
          "size": "35 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sel-3",
      "name": "Nine Tree Premier Hotel Myeongdong II",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 4,
      "pricePerNight": 3200,
      "rating": 4.78,
      "reviewsCount": 2900,
      "address": "Myeongdong, Jung-gu, Seoul",
      "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใกล้ตลาดเมียงดง",
        "เลานจ์พักผ่อน",
        "เมนูหมอน 9 ชนิด"
      ],
      "description": "ทำเลทองสำหรับการช้อปปิ้งเครื่องสำอางและสตรีทฟู้ดเมียงดง",
      "roomTypes": [
        {
          "name": "Standard Twin",
          "price": 3200,
          "bed": "2 เตียงเดี่ยว",
          "size": "26 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-sel-b1",
      "name": "Lazy Fox Hostel Hongdae (โฮสเทลฮงแด)",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 2,
      "pricePerNight": 420,
      "rating": 4.82,
      "reviewsCount": 3400,
      "address": "Hongdae, Seoul",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "อาหารเช้าไข่ดาวโทสต์ฟรี",
        "เดินไปสถานีฮงแด 5 นาที",
        "บรรยากาศสนุกสนาน"
      ],
      "description": "โฮสเทลชื่อดังย่านฮงแด ใกล้แหล่งช้อปปิ้งเสื้อผ้า เครื่องสำอาง และปาร์ตี้กลางคืน",
      "roomTypes": [
        {
          "name": "Bunk in 6-Bed Dorm",
          "price": 420,
          "bed": "1 เตียง 2 ชั้น",
          "size": "4 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sel-b2",
      "name": "Step Inn Myeongdong 1 (แคปซูลเมียงดง)",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 2,
      "pricePerNight": 680,
      "rating": 4.79,
      "reviewsCount": 2800,
      "address": "Myeongdong, Seoul",
      "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิว N Seoul Tower",
        "ติดตลาดเมียงดง",
        "ชา กาแฟ ขนมปังฟรี"
      ],
      "description": "ที่พักสไตล์มินิมอลพ็อดใจกลางเมียงดง เดินช้อปปิ้งเหนื่อยๆ กลับมานอนพักได้ทันที",
      "roomTypes": [
        {
          "name": "Single Capsule Pod",
          "price": 680,
          "bed": "1 เตียงพ็อดส่วนตัว",
          "size": "5 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sel-b3",
      "name": "Bukchon Hanok Guesthouse (เกสต์เฮาส์ฮันอก)",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 3,
      "pricePerNight": 950,
      "rating": 4.86,
      "reviewsCount": 1400,
      "address": "Bukchon Hanok Village, Seoul",
      "image": "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เรือนไม้โบราณเกาหลี",
        "ระบบทำความร้อนใต้พื้น Ondol",
        "ชุดฮันบกให้ลอง"
      ],
      "description": "สัมผัสการนอนฟูกเกาหลีดั้งเดิมในหมู่บ้านโบราณบุกชอน สงบ ร่มรื่น และมีเสน่ห์",
      "roomTypes": [
        {
          "name": "Traditional Korean Room",
          "price": 950,
          "bed": "ฟูกหนานุ่มเกาหลี",
          "size": "18 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sel-b4",
      "name": "K-Guesthouse Dongdaemun 1",
      "city": "Seoul",
      "cityTh": "โซล",
      "country": "เกาหลีใต้",
      "stars": 2,
      "pricePerNight": 580,
      "rating": 4.67,
      "reviewsCount": 1650,
      "address": "Dongdaemun, Seoul",
      "image": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใกล้ตลาดทงแดมุน 24 ชม.",
        "ลิฟต์โดยสาร",
        "ฟรี Wi-Fi"
      ],
      "description": "เหมาะสำหรับสายช้อปปิ้งตลาดผ้าและแฟชั่นทงแดมุนที่เปิดตลอดคืน",
      "roomTypes": [
        {
          "name": "Standard Single",
          "price": 580,
          "bed": "1 เตียงเดี่ยว",
          "size": "12 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-1",
      "name": "Keemala Resort Phuket (กีมาลา)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 12800,
      "rating": 4.88,
      "reviewsCount": 1120,
      "address": "กมลา กะทู้ ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "พูลวิลล่ารังนก",
        "สปาองค์รวม",
        "วิวป่าเขา",
        "สระว่ายน้ำส่วนตัว"
      ],
      "description": "รีสอร์ตสไตล์รังนกอันโด่งดัง ท่ามกลางธรรมชาติเขียวขจีริมหาดกมลา",
      "roomTypes": [
        {
          "name": "Bird's Nest Pool Villa",
          "price": 12800,
          "bed": "1 คิงไซส์",
          "size": "185 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-2",
      "name": "Trisara Resort Phuket (ตรีสรา)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 24500,
      "rating": 4.96,
      "reviewsCount": 650,
      "address": "หาดลายัน ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "หาดส่วนตัว",
        "มิชลิน 1 ดาว PRU",
        "วิลล่าริมผา",
        "สระอินฟินิตี้"
      ],
      "description": "รีสอร์ตลักชัวรี่ระดับเวิลด์คลาส จุดชมพระอาทิตย์ตกที่สวยที่สุดในภูเก็ต",
      "roomTypes": [
        {
          "name": "Ocean View Pool Villa",
          "price": 24500,
          "bed": "1 คิงไซส์",
          "size": "240 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-3",
      "name": "The Shore at Katathani",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 9900,
      "rating": 4.91,
      "reviewsCount": 1400,
      "address": "หาดกะตะน้อย ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิลล่าติดหาด",
        "จากุซซี่คู่",
        "สปาติดทะเล",
        "วิวพาโนรามา"
      ],
      "description": "พูลวิลล่าโรแมนติกริมหาดกะตะน้อย เหมาะสำหรับคู่รักและฮันนีมูน",
      "roomTypes": [
        {
          "name": "Seaview Pool Villa",
          "price": 9900,
          "bed": "1 คิงไซส์",
          "size": "130 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-4",
      "name": "SALA Phuket Mai Khao Beach Resort",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 7500,
      "rating": 4.84,
      "reviewsCount": 1250,
      "address": "หาดไม้ขาว ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ห้องน้ำกลางแจ้ง",
        "สระว่ายน้ำส่วนตัว",
        "สปาหรู",
        "ชายหาดเงียบสงบ"
      ],
      "description": "ดีไซน์สไตล์มินิมอลขาวสะอาดตา มอบความเป็นส่วนตัวสูงสุดริมหาดไม้ขาว",
      "roomTypes": [
        {
          "name": "SALA Pool Villa",
          "price": 7500,
          "bed": "1 คิงไซส์",
          "size": "157 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-5",
      "name": "The Memory at On On Hotel (เมืองเก่า)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 3,
      "pricePerNight": 1650,
      "rating": 4.79,
      "reviewsCount": 2400,
      "address": "ถนนพังงา ตลาดใหญ่ เมืองภูเก็ต",
      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ตึกชิโน-โปรตุกีสแท้",
        "โรงแรมแห่งแรกในภูเก็ต",
        "เดินเที่ยวเมืองเก่า"
      ],
      "description": "โรงแรมประวัติศาสตร์ใจกลางเมืองเก่าภูเก็ต สถาปัตยกรรมคลาสสิกสวยงาม",
      "roomTypes": [
        {
          "name": "Heritage Deluxe Room",
          "price": 1650,
          "bed": "1 ควีนไซส์",
          "size": "28 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-b1",
      "name": "Phuket Backpacker Hostel (หลาดใหญ่)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 290,
      "rating": 4.75,
      "reviewsCount": 3100,
      "address": "ถนนถลาง เมืองเก่าภูเก็ต",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ติดถนนคนเดินหลาดใหญ่",
        "แอร์เย็นฉ่ำ 24 ชม.",
        "ตู้ล็อกเกอร์และปลั๊กหัวเตียง"
      ],
      "description": "โฮสเทลราคาประหยัดที่สุดในเมืองเก่าภูเก็ต ก้าวออกจากที่พักก็เจอสตรีทฟู้ดและตึกชิโนโปรตุกีสสีสดใส",
      "roomTypes": [
        {
          "name": "Dorm Bed with Locker",
          "price": 290,
          "bed": "1 เตียงในหอนอนรวม",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-phk-b2",
      "name": "Sino House Phuket Hotel (ชิโน เฮาส์)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 3,
      "pricePerNight": 750,
      "rating": 4.72,
      "reviewsCount": 2200,
      "address": "ถนนมนตรี ตลาดใหญ่ ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "มินิบาร์และขนมทานฟรี",
        "ที่จอดรถสะดวก",
        "กาแฟสด"
      ],
      "description": "โรงแรมบูทีคดีไซน์จีนผสมเปอรานากัน ราคาคุ้มค่ามาก สะอาด กว้างขวาง มีขนมกินเล่นฟรี",
      "roomTypes": [
        {
          "name": "Deluxe Sino Room",
          "price": 750,
          "bed": "1 คิงไซส์",
          "size": "32 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-phk-b3",
      "name": "Rawai Sea Breeze Bungalow (ราไวย์)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 690,
      "rating": 4.68,
      "reviewsCount": 1540,
      "address": "หาดราไวย์ ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สระว่ายน้ำกลางสวน",
        "ใกล้ตลาดซีฟู้ดราไวย์",
        "เช่ามอเตอร์ไซค์ถูก"
      ],
      "description": "บังกะโลบรรยากาศทรอปิคอล เหมาะสำหรับพักผ่อนใกล้ชิดทะเลและทานอาหารทะเลสดๆ ราคาชาวบ้าน",
      "roomTypes": [
        {
          "name": "Garden View Bungalow",
          "price": 690,
          "bed": "1 ควีนไซส์",
          "size": "28 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-cnx-1",
      "name": "Four Seasons Resort Chiang Mai",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 9800,
      "rating": 4.92,
      "reviewsCount": 1420,
      "address": "แม่ริม เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิวทุ่งนาขั้นบันได",
        "เรียนทำอาหารไทย",
        "โยคะกลางแจ้ง",
        "สปา"
      ],
      "description": "ดื่มด่ำความเงียบสงบท่ามกลางทุ่งนาสีเขียวขจี สถาปัตยกรรมล้านนาร่วมสมัย",
      "roomTypes": [
        {
          "name": "Upper Rice Terrace Pavilion",
          "price": 9800,
          "bed": "1 คิงไซส์",
          "size": "70 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-cnx-2",
      "name": "137 Pillars House Chiang Mai",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 8200,
      "rating": 4.94,
      "reviewsCount": 950,
      "address": "วัดเกต เมืองเชียงใหม่",
      "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "บ้านไม้สักโบราณ",
        "สระว่ายน้ำสวนแนวตั้ง",
        "บัตเลอร์ส่วนตัว"
      ],
      "description": "บูทีคโฮเทลระดับตำนาน สร้างขึ้นรอบบ้านไม้สักโบราณอายุกว่า 130 ปี",
      "roomTypes": [
        {
          "name": "Rajah Brooke Suite",
          "price": 8200,
          "bed": "1 คิงไซส์",
          "size": "75 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-cnx-3",
      "name": "Raya Heritage (รายา เฮอริเทจ)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 7200,
      "rating": 4.91,
      "reviewsCount": 820,
      "address": "ริมแม่น้ำปิง แม่ริม เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิวแม่น้ำปิง",
        "งานหัตถศิลป์ล้านนาแท้",
        "สปาชาสมุนไพร"
      ],
      "description": "ดีไซน์หรูหราเรียบง่าย ผสมผสานวัสดุธรรมชาติและงานช่างฝีมือพื้นบ้าน",
      "roomTypes": [
        {
          "name": "Rin Terrace Suite",
          "price": 7200,
          "bed": "1 คิงไซส์",
          "size": "75 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-cnx-4",
      "name": "U Chiang Mai (ยู เชียงใหม่)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 4,
      "pricePerNight": 2800,
      "rating": 4.82,
      "reviewsCount": 2600,
      "address": "ถนนราชดำเนิน ใจกลางคูเมือง",
      "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เช็คอินเวลาไหน เช็คเอาต์เวลานั้น",
        "อาหารเช้าทานได้ทุกที่ทุกเวลา",
        "ติดถนนคนเดิน"
      ],
      "description": "โรงแรมสุดคุ้มค่าใจกลางเมืองเก่า ติดถนนคนเดินวันอาทิตย์ยอดฮิต",
      "roomTypes": [
        {
          "name": "Superior Room",
          "price": 2800,
          "bed": "1 คิงไซส์",
          "size": "33 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-cnx-b1",
      "name": "Mae Kampong Stream Homestay (แม่กำปอง)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 650,
      "rating": 4.89,
      "reviewsCount": 2100,
      "address": "หมู่บ้านแม่กำปอง แม่ออน เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เสียงลำธารไหลผ่านระเบียง",
        "อากาศเย็นสบายตลอดปี",
        "รวมอาหารเช้าพื้นบ้าน"
      ],
      "description": "โฮมสเตย์ริมลำธารใสในหมู่บ้านแม่กำปอง สัมผัสวิถีชีวิตชาวเขาและกาแฟอาราบิก้าแท้",
      "roomTypes": [
        {
          "name": "Riverside Wooden Room",
          "price": 650,
          "bed": "1 ฟูกนอนคู่อุ่น",
          "size": "22 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-cnx-b2",
      "name": "Hug Hostel Chiang Mai (ฮัก โฮสเทล)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 320,
      "rating": 4.83,
      "reviewsCount": 3800,
      "address": "ถนนช้างเผือก คูเมืองเชียงใหม่",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "รูฟท็อปบาร์มองเห็นดอยสุเทพ",
        "กาแฟผลไม้ฟรีตอนเช้า",
        "ใกล้ตลาดช้างเผือก"
      ],
      "description": "โฮสเทลยอดฮิตบรรยากาศอบอุ่น ตกแต่งด้วยไม้ไผ่และงานศิลปะ ใกล้สตรีทฟู้ดสุกี้ช้างเผือก",
      "roomTypes": [
        {
          "name": "Bunk Bed in Air-con Dorm",
          "price": 320,
          "bed": "1 เตียง 2 ชั้น",
          "size": "4 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-cnx-b3",
      "name": "Nimman Cozy Studio (นิมมาน)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 3,
      "pricePerNight": 790,
      "rating": 4.78,
      "reviewsCount": 1890,
      "address": "นิมมานเหมินท์ ซอย 9 เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ใจกลางคาเฟ่นิมมาน",
        "ไมโครเวฟและตู้เย็น",
        "สระว่ายน้ำคอนโด"
      ],
      "description": "สตูดิโอห้องพักส่วนตัวทำเลทองย่านนิมมาน เดินไป One Nimman และร้านอาหารดังได้ใน 2 นาที",
      "roomTypes": [
        {
          "name": "Cozy Studio",
          "price": 790,
          "bed": "1 ควีนไซส์",
          "size": "30 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-cnx-b4",
      "name": "The Greenery Ping River Guest (ริมปิง)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 520,
      "rating": 4.7,
      "reviewsCount": 1150,
      "address": "ถนนเจริญราษฎร์ ริมแม่น้ำปิง",
      "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สวนริมแม่น้ำปิง",
        "เช่าจักรยานฟรี",
        "ใกล้ร้านอาหารริมน้ำ"
      ],
      "description": "เกสต์เฮาส์บรรยากาศร่มรื่นใต้ร่มไม้ใหญ่ริมแม่น้ำปิง สงบและใกล้ร้านข้าวซอยลำดวน",
      "roomTypes": [
        {
          "name": "Standard River Garden",
          "price": 520,
          "bed": "1 ควีนไซส์",
          "size": "20 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-kbv-1",
      "name": "Rayavadee Resort Krabi (รายาวดี)",
      "city": "Krabi",
      "cityTh": "กระบี่",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 16500,
      "rating": 4.95,
      "reviewsCount": 920,
      "address": "อ่าวไร่เลย์ กระบี่",
      "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิลล่าทรงศาลา",
        "ร้านอาหารในถ้ำหินปูน",
        "ล้อมรอบด้วย 3 ชายหาด"
      ],
      "description": "รีสอร์ตหรูระดับไอคอนิก ตั้งอยู่ใจกลางแหลมพระนางและอ่าวไร่เลย์",
      "roomTypes": [
        {
          "name": "Deluxe Pavilion",
          "price": 16500,
          "bed": "1 คิงไซส์",
          "size": "90 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-kbv-b1",
      "name": "Ao Nang Friendly Guesthouse (อ่าวนาง)",
      "city": "Krabi",
      "cityTh": "กระบี่",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 490,
      "rating": 4.74,
      "reviewsCount": 2300,
      "address": "อ่าวนาง เมืองกระบี่",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เดินไปหาดอ่าวนาง 5 นาที",
        "จองทัวร์ 4 เกาะราคาพิเศษ",
        "แอร์เย็นฉ่ำ"
      ],
      "description": "เกสต์เฮาส์ยอดนิยมของนักท่องเที่ยวสายลุย ใกล้คิวเรือหางยาวไปเกาะพีพีและไร่เลย์",
      "roomTypes": [
        {
          "name": "Standard Double Room",
          "price": 490,
          "bed": "1 ควีนไซส์",
          "size": "22 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-usm-1",
      "name": "W Koh Samui (ดับเบิ้ลยู เกาะสมุย)",
      "city": "Samui",
      "cityTh": "เกาะสมุย",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 17800,
      "rating": 4.92,
      "reviewsCount": 780,
      "address": "หาดแม่น้ำ เกาะสมุย",
      "image": "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "WOOBAR ลอยน้ำไอคอนิก",
        "พูลวิลล่าทุกหลัง",
        "หาดส่วนตัว"
      ],
      "description": "รีสอร์ตริมชายหาดที่มีบาร์กลางน้ำสุดโด่งดัง ชมวิวอ่าวไทยแบบ 360 องศา",
      "roomTypes": [
        {
          "name": "Jungle Oasis Pool Villa",
          "price": 17800,
          "bed": "1 คิงไซส์",
          "size": "163 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-usm-b1",
      "name": "Lub d Koh Samui Chaweng Beach (เฉวง)",
      "city": "Samui",
      "cityTh": "เกาะสมุย",
      "country": "ไทย",
      "stars": 3,
      "pricePerNight": 590,
      "rating": 4.86,
      "reviewsCount": 2950,
      "address": "หาดเฉวง เกาะสมุย",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สระว่ายน้ำติดหาดเฉวง",
        "บาร์ริมสระว่ายน้ำ",
        "กิจกรรมปาร์ตี้"
      ],
      "description": "โซเชียลโฮสเทลติดหาดที่ดีที่สุดในสมุย มีสระว่ายน้ำซีทรูติดหาดทรายขาวละเอียด",
      "roomTypes": [
        {
          "name": "Mixed Dormitory Bed",
          "price": 590,
          "bed": "1 เตียงในหอนอน",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-bkk-1",
      "name": "Capella Bangkok (คาเพลลา กรุงเทพฯ)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "stars": 5,
      "pricePerNight": 19500,
      "rating": 4.98,
      "reviewsCount": 890,
      "address": "ถนนเจริญกรุง กรุงเทพฯ",
      "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "วิวแม่น้ำเจ้าพระยาทุกห้อง",
        "มิชลิน Côte",
        "จากุซซี่ระเบียง"
      ],
      "description": "โรงแรมระดับ Best Hotel in the World ริมแม่น้ำเจ้าพระยาบนถนนเจริญกรุง",
      "roomTypes": [
        {
          "name": "Riverfront Premier",
          "price": 19500,
          "bed": "1 คิงไซส์",
          "size": "61 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-bkk-b1",
      "name": "Lub d Bangkok Siam (สยาม)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "stars": 2,
      "pricePerNight": 490,
      "rating": 4.81,
      "reviewsCount": 4500,
      "address": "BTS สนามกีฬาแห่งชาติ สยาม กรุงเทพฯ",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ติดบันไดทางขึ้น BTS",
        "ใกล้มาบุญครองและสยาม",
        "บาร์กาแฟ"
      ],
      "description": "ทำเลใจกลางสยามที่ดีที่สุด นั่ง BTS ไปไหนก็สะดวก ปลอดภัย สะอาด ได้มาตรฐานสากล",
      "roomTypes": [
        {
          "name": "Ladies/Mixed Dorm Bed",
          "price": 490,
          "bed": "1 เตียงเดี่ยว",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-bkk-b2",
      "name": "The Yard Hostel Ari (อารีย์)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "stars": 3,
      "pricePerNight": 650,
      "rating": 4.88,
      "reviewsCount": 2100,
      "address": "พหลโยธิน ซอย 5 อารีย์ กรุงเทพฯ",
      "image": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สวนสีเขียวร่มรื่น",
        "คาเฟ่คราฟต์เบียร์",
        "โยคะในสวน"
      ],
      "description": "โอเอซิสสีเขียวสร้างจากตู้คอนเทนเนอร์ในย่านอารีย์ บรรยากาศเงียบสงบผ่อนคลาย",
      "roomTypes": [
        {
          "name": "Garden Bunk Bed",
          "price": 650,
          "bed": "1 เตียงวิวสวน",
          "size": "5 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sin-1",
      "name": "Marina Bay Sands Singapore",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "country": "สิงคโปร์",
      "stars": 5,
      "pricePerNight": 19800,
      "rating": 4.93,
      "reviewsCount": 5400,
      "address": "10 Bayfront Avenue, Singapore",
      "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สระว่ายน้ำอินฟินิตี้ชั้น 57",
        "ห้าง The Shoppes",
        "คาสิโนระดับโลก"
      ],
      "description": "แลนด์มาร์กสำคัญของสิงคโปร์ สระว่ายน้ำลอยฟ้าที่มองเห็นวิวเมืองได้ทั้งเกาะ",
      "roomTypes": [
        {
          "name": "Deluxe City View",
          "price": 19800,
          "bed": "1 คิงไซส์",
          "size": "47 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-sin-b1",
      "name": "Spacepod@sg Capsule Hostel (สิงคโปร์)",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "country": "สิงคโปร์",
      "stars": 2,
      "pricePerNight": 620,
      "rating": 4.7,
      "reviewsCount": 3600,
      "address": "Kallang, Singapore",
      "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "แคปซูลอวกาศมีประตูเลื่อน",
        "อาหารเช้าฟรี",
        "ใกล้รถไฟฟ้า MRT 1 นาที"
      ],
      "description": "แคปซูลโฮเทลยอดฮิตในสิงคโปร์ที่ราคาประหยัดที่สุด สะอาด เป็นส่วนตัวสูง",
      "roomTypes": [
        {
          "name": "Single Space Pod",
          "price": 620,
          "bed": "1 พ็อดอวกาศ",
          "size": "3.5 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-bal-1",
      "name": "Mulia Resort Nusa Dua Bali",
      "city": "Bali",
      "cityTh": "บาหลี",
      "country": "อินโดนีเซีย",
      "stars": 5,
      "pricePerNight": 8500,
      "rating": 4.87,
      "reviewsCount": 960,
      "address": "Nusa Dua, Bali",
      "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สระว่ายน้ำหินอ่อน",
        "หาดส่วนตัว",
        "9 ห้องอาหาร"
      ],
      "description": "รีสอร์ตริมชายหาดที่ได้รับรางวัลระดับโลก สระว่ายน้ำโอเอซิสริมทะเล",
      "roomTypes": [
        {
          "name": "Grandeur Ocean View",
          "price": 8500,
          "bed": "1 คิงไซส์",
          "size": "65 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-bal-b1",
      "name": "Ubud Tropical Glamping (อูบุด บาหลี)",
      "city": "Bali",
      "cityTh": "บาหลี",
      "country": "อินโดนีเซีย",
      "stars": 2,
      "pricePerNight": 380,
      "rating": 4.84,
      "reviewsCount": 2200,
      "address": "Ubud, Bali",
      "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เต็นท์แกลมปิ้งกลางป่ากล้วย",
        "สระว่ายน้ำกลางแจ้ง",
        "โยคะฟรี"
      ],
      "description": "พักผ่อนในเต็นท์หรูติดแอร์ราคาประหยัด โอบล้อมด้วยธรรมชาติสีเขียวขจีของอูบุด",
      "roomTypes": [
        {
          "name": "Glamping Tent Bed",
          "price": 380,
          "bed": "1 เตียงในเต็นท์",
          "size": "6 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-swi-1",
      "name": "The Chedi Andermatt",
      "city": "Switzerland",
      "cityTh": "สวิตเซอร์แลนด์",
      "country": "สวิตเซอร์แลนด์",
      "stars": 5,
      "pricePerNight": 26900,
      "rating": 4.96,
      "reviewsCount": 650,
      "address": "Andermatt, Switzerland",
      "image": "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สระน้ำอุ่นกลางหิมะ",
        "สกีรีสอร์ท",
        "เตาผิงส่วนตัว"
      ],
      "description": "รีสอร์ตระดับไอคอนิกใจกลางเทือกเขาแอลป์ ผสมผสานสวิสชาเลต์กับเอเชีย",
      "roomTypes": [
        {
          "name": "Deluxe Alpine Room",
          "price": 26900,
          "bed": "1 คิงไซส์",
          "size": "55 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-swi-b1",
      "name": "Backpackers Villa Sonnenhof (อินเทอร์ลาเคน)",
      "city": "Switzerland",
      "cityTh": "สวิตเซอร์แลนด์",
      "country": "สวิตเซอร์แลนด์",
      "stars": 2,
      "pricePerNight": 1450,
      "rating": 4.9,
      "reviewsCount": 3800,
      "address": "Interlaken, Switzerland",
      "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "อาหารเช้าสวิสฟรี",
        "ตั๋วรถบัสฟรีทั่วเมือง",
        "วิวเทือกเขาจุงเฟรา"
      ],
      "description": "โฮสเทลระดับ 5 ดาวในสวิส วิวเทือกเขาแอลป์ตระการตา มีอาหารเช้าและกาแฟไม่อั้น",
      "roomTypes": [
        {
          "name": "Dorm Bed with Mountain View",
          "price": 1450,
          "bed": "1 เตียงวิวภูเขา",
          "size": "4 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-par-1",
      "name": "Hôtel Plaza Athénée Paris",
      "city": "Paris",
      "cityTh": "ปารีส",
      "country": "ฝรั่งเศส",
      "stars": 5,
      "pricePerNight": 35000,
      "rating": 4.97,
      "reviewsCount": 780,
      "address": "Avenue Montaigne, Paris",
      "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "ระเบียงดอกไม้แดงวิวหอไอเฟล",
        "Dior Spa",
        "มิชลินสตาร์"
      ],
      "description": "โรงแรมหรูบนถนนแฟชั่นชั้นสูงมองแตญญ์ ใจกลางย่านหรูหราของปารีส",
      "roomTypes": [
        {
          "name": "Superior Boulevard View",
          "price": 35000,
          "bed": "1 คิงไซส์",
          "size": "40 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-par-b1",
      "name": "Generator Paris Hostel (ปารีส)",
      "city": "Paris",
      "cityTh": "ปารีส",
      "country": "ฝรั่งเศส",
      "stars": 2,
      "pricePerNight": 1250,
      "rating": 4.76,
      "reviewsCount": 4200,
      "address": "Canal Saint-Martin, Paris",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "รูฟท็อปบาร์วิวซาเคร-เกอร์",
        "สถานีรถไฟใต้ดินหน้าประตู",
        "บิสโทรคาเฟ่"
      ],
      "description": "ดีไซน์โฮสเทลสุดฮิปย่านคลองแซงต์มาร์แตง รูฟท็อปบาร์ชมพระอาทิตย์ตกดินสุดโรแมนติก",
      "roomTypes": [
        {
          "name": "Shared Dorm Bed",
          "price": 1250,
          "bed": "1 เตียงในหอนอน",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-lon-1",
      "name": "The Savoy London",
      "city": "London",
      "cityTh": "ลอนดอน",
      "country": "สหราชอาณาจักร",
      "stars": 5,
      "pricePerNight": 29500,
      "rating": 4.96,
      "reviewsCount": 1350,
      "address": "Strand, London",
      "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "บาร์อเมริกันอันดับ 1",
        "วิวแม่น้ำเทมส์",
        "บัตเลอร์ส่วนตัว"
      ],
      "description": "โรงแรมหรูระดับตำนานแห่งแรกของอังกฤษ ริมแม่น้ำเทมส์และย่านโคเวนต์การ์เดน",
      "roomTypes": [
        {
          "name": "Deluxe King River View",
          "price": 29500,
          "bed": "1 คิงไซส์",
          "size": "40 ตร.ม.",
          "breakfast": true
        }
      ]
    },
    {
      "id": "h-lon-b1",
      "name": "Wombat's City Hostel London (ลอนดอน)",
      "city": "London",
      "cityTh": "ลอนดอน",
      "country": "สหราชอาณาจักร",
      "stars": 2,
      "pricePerNight": 1350,
      "rating": 4.82,
      "reviewsCount": 3800,
      "address": "Tower Bridge, London",
      "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "เดินไปสะพานทาวเวอร์บริดจ์ 5 นาที",
        "บาร์ใต้ถุนคลาสสิก",
        "ครัวทันสมัย"
      ],
      "description": "โฮสเทลระดับท็อปของลอนดอน ดัดแปลงจากโกดังสินค้าโบราณ สะอาด ปลอดภัย",
      "roomTypes": [
        {
          "name": "Bunk Bed in Mixed Dorm",
          "price": 1350,
          "bed": "1 เตียงไม้สัก",
          "size": "4 ตร.ม.",
          "breakfast": false
        }
      ]
    },
    {
      "id": "h-mle-1",
      "name": "Soneva Jani Maldives (โซเนวา ยานี)",
      "city": "Maldives",
      "cityTh": "มัลดีฟส์",
      "country": "มัลดีฟส์",
      "stars": 5,
      "pricePerNight": 65000,
      "rating": 4.99,
      "reviewsCount": 380,
      "address": "Noonu Atoll, Maldives",
      "image": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      "gallery": [
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80"
      ],
      "amenities": [
        "สไลเดอร์ลงทะเลจากวิลล่า",
        "หลังคาเปิดดูดาว",
        "โรงหนังกลางน้ำ"
      ],
      "description": "วิลล่ากลางน้ำพร้อมสไลเดอร์ส่วนตัวลงสู่ลากูนสีเทอร์ควอยซ์อันงดงาม",
      "roomTypes": [
        {
          "name": "1-Bedroom Water Retreat with Slide",
          "price": 65000,
          "bed": "1 คิงไซส์",
          "size": "411 ตร.ม.",
          "breakfast": true
        }
      ]
    }
  ],
  "restaurants": [
    {
      "id": "r-tok-1",
      "name": "Sukiyabashi Jiro Roppongi",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "โอมากาเสะพรีเมียม",
      "priceLevel": "฿฿฿฿",
      "averagePrice": 8500,
      "rating": 4.95,
      "reviewsCount": 420,
      "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      "address": "Roppongi Hills, Tokyo",
      "highlight": "สุดยอดซูชิระดับตำนาน วัตถุดิบสดส่งตรงจากโทโยสุทุกเช้า",
      "openHours": "12:00-14:00, 18:00-21:30",
      "menuHighlights": [
        "Otoro Nigiri",
        "Uni ฮอกไกโด",
        "Anago ย่างซอสหวาน"
      ]
    },
    {
      "id": "r-tok-2",
      "name": "Ginza Kojyu (กินซ่า โคจู - มิชลิน 3 ดาว)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "ไคเซกิญี่ปุ่นโบราณ",
      "priceLevel": "฿฿฿฿",
      "averagePrice": 9800,
      "rating": 4.96,
      "reviewsCount": 310,
      "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      "address": "Ginza, Chuo, Tokyo",
      "highlight": "ศาสตร์อาหารไคเซกิตามฤดูกาลอันประณีตสูงสุดของญี่ปุ่น",
      "openHours": "18:00-22:30",
      "menuHighlights": [
        "ปูมัตสึบะย่างถ่าน",
        "ซุปหอยเป๋าฮื้อ",
        "เนื้อวากิวมัตสึซากะ A5"
      ]
    },
    {
      "id": "r-tok-3",
      "name": "Ichiran Ramen Shinjuku (ราเมนข้อสอบ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "ราเมนกระดูกหมูเข้มข้น",
      "priceLevel": "฿",
      "averagePrice": 380,
      "rating": 4.88,
      "reviewsCount": 4800,
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      "address": "Shinjuku, Tokyo",
      "highlight": "ราเมนข้อสอบในตำนาน เลือกระดับความเข้มข้นและความเผ็ดได้ตามใจชอบ",
      "openHours": "เปิด 24 ชั่วโมง",
      "menuHighlights": [
        "ทงคัตสึราเมนสูตรต้นตำรับ",
        "ไข่ต้มยางมะตูม",
        "หมูชาชูสูตรพิเศษ"
      ]
    },
    {
      "id": "r-tok-4",
      "name": "Afuri Ramen Harajuku (ยูซุราเมน)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "ยูซุราเมนรสสดชื่น",
      "priceLevel": "฿",
      "averagePrice": 420,
      "rating": 4.84,
      "reviewsCount": 3200,
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "address": "Harajuku, Tokyo",
      "highlight": "น้ำซุปไก่ใสผสมส้มยูซุหอมสดชื่น หมูชาชูย่างเตาถ่านสดๆ ชิ้นต่อชิ้น",
      "openHours": "11:00-23:00",
      "menuHighlights": [
        "Yuzu Shio Ramen",
        "Tsukemen ซอสยูซุเข้มข้น",
        "ข้าวหน้าหมูชาชูย่างถ่าน"
      ]
    },
    {
      "id": "r-tok-5",
      "name": "Gyukatsu Motomura Shibuya",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "เนื้อทอดกิวคัตสึ",
      "priceLevel": "฿฿",
      "averagePrice": 650,
      "rating": 4.91,
      "reviewsCount": 3900,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "address": "Shibuya, Tokyo",
      "highlight": "เนื้อวัวชุบเกล็ดขนมปังทอดกรอบนอกนุ่มใน ย่างต่อบนเตาหินส่วนตัว",
      "openHours": "11:00-22:00",
      "menuHighlights": [
        "เซ็ตเนื้อทอดกิวคัตสึ",
        "ซอสหัวไชเท้าและวาซาบิสด",
        "ข้าวมอลต์ข้าวบาร์เลย์"
      ]
    },
    {
      "id": "r-tok-b1",
      "name": "Harajuku Gyoza Lou (เกี๊ยวซ่าฮาราจูกุ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "เกี๊ยวซ่าทอดกระทะร้อน",
      "priceLevel": "฿",
      "averagePrice": 120,
      "rating": 4.78,
      "reviewsCount": 5200,
      "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
      "address": "Harajuku, Shibuya, Tokyo",
      "highlight": "เกี๊ยวซ่าราคาประหยัดที่สุดในฮาราจูกุ จานละ 6 ชิ้น แป้งกรอบ ไส้หมูชุ่มฉ่ำ",
      "openHours": "11:30-02:00",
      "menuHighlights": [
        "เกี๊ยวซ่าทอดสูตรใส่กระเทียม",
        "เกี๊ยวซ่านึ่งน้ำมันพริก",
        "กะหล่ำปลีสดราดมิโซะ"
      ]
    },
    {
      "id": "r-tok-b2",
      "name": "Tsukiji Yamacho (ไข่หวานย่างเสียบไม้)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "ไข่หวานญี่ปุ่น สตรีทฟู้ด",
      "priceLevel": "฿",
      "averagePrice": 50,
      "rating": 4.82,
      "reviewsCount": 4100,
      "address": "ตลาดปลาซึกิจิเก่า (Tsukiji Outer Market)",
      "highlight": "ทามาโกะยากิไข่หวานย่างสดๆ บนเตาร้อนๆ ชิ้นหนานุ่มหวานกลมกล่อม ไม้ละ 150 เยน",
      "openHours": "06:30-14:30",
      "menuHighlights": [
        "ไข่หวานย่างเสียบไม้ร้อนๆ",
        "ไข่หวานผสมปูอัด",
        "ไข่หวานรสหวานน้อย"
      ],
      "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-tok-b3",
      "name": "Yoshinoya Shinjuku (ข้าวหน้าเนื้อดั้งเดิม)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "กิวด้ง ข้าวหน้าเนื้อ",
      "priceLevel": "฿",
      "averagePrice": 130,
      "rating": 4.65,
      "reviewsCount": 6800,
      "address": "Shinjuku Station, Tokyo",
      "highlight": "ข้าวหน้าเนื้อสไลซ์บางตุ๋นซอสถั่วเหลืองและหอมใหญ่ อิ่มเร็ว อร่อย สบายกระเป๋า 24 ชม.",
      "openHours": "เปิด 24 ชั่วโมง",
      "menuHighlights": [
        "กิวด้งเนื้อวากิวไซส์ M",
        "ไข่ออนเซ็น",
        "ซุปมิโซะสาหร่าย"
      ],
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "r-osa-1",
      "name": "Mizuno Okonomiyaki Dotonbori",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "cuisine": "พิซซ่าญี่ปุ่น / มิชลินบิบ",
      "priceLevel": "฿",
      "averagePrice": 450,
      "rating": 4.82,
      "reviewsCount": 3600,
      "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "address": "Dotonbori, Osaka",
      "highlight": "ร้านโอโคโนมิยากิเก่าแก่ที่สุดในโดทงโบริ มิชลิน บิบ กูร์มองด์ 6 ปีซ้อน",
      "openHours": "11:00-22:00",
      "menuHighlights": [
        "Mizuno Yaki รวมมิตร",
        "โอโคโนมิยากิหอยเชลล์",
        "ยากิโซบะกระทะร้อน"
      ]
    },
    {
      "id": "r-osa-2",
      "name": "Kushikatsu Daruma Shinsekai",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "cuisine": "ของทอดเสียบไม้ชินเซไก",
      "priceLevel": "฿",
      "averagePrice": 380,
      "rating": 4.79,
      "reviewsCount": 2900,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "address": "Shinsekai, Osaka",
      "highlight": "ตำนานของทอดเสียบไม้ชินเซไก ซอสสูตรลับ 'ห้ามจุ่มซอสซ้ำสองครั้ง'",
      "openHours": "11:00-22:30",
      "menuHighlights": [
        "เนื้อวัวเสียบไม้ทอด",
        "กุ้งสดทอด",
        "ชีสมอสซาเรลล่าทอด"
      ]
    },
    {
      "id": "r-osa-b1",
      "name": "Takoyaki Wanaka Dotonbori (ทาโกะยากิ)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "cuisine": "ทาโกะยากิต้นตำรับโอซาก้า",
      "priceLevel": "฿",
      "averagePrice": 140,
      "rating": 4.85,
      "reviewsCount": 6200,
      "address": "Dotonbori, Osaka",
      "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      "highlight": "ทาโกะยากิหมึกยักษ์ชิ้นโต กรอบนอกนุ่มใน ควันฉุย ราดซอสหวานและปลาแห้งพูนๆ",
      "openHours": "10:00-23:00",
      "menuHighlights": [
        "ทาโกะยากิ 8 ชิ้นซอสต้นตำรับ",
        "ทาโกะยากิเกลือพริกไทย",
        "Takosen ข้าวเกรียบประกบทาโกะยากิ"
      ]
    },
    {
      "id": "r-osa-b2",
      "name": "Kinryu Ramen Dotonbori (ราเมนมังกรทอง)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "cuisine": "ราเมนสตรีทฟู้ดกิมจิฟรี",
      "priceLevel": "฿",
      "averagePrice": 190,
      "rating": 4.68,
      "reviewsCount": 4500,
      "address": "Dotonbori, Osaka",
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      "highlight": "ป้ายมังกรทองยักษ์แลนด์มาร์กโดทงโบริ ซุปกระดูกหมูหอมกระเทียม พร้อมกิมจิและต้นหอมเติมไม่อั้น",
      "openHours": "เปิด 24 ชั่วโมง",
      "menuHighlights": [
        "ชาชูราเมนชามยักษ์",
        "กิมจิเกาหลีเติมฟรีไม่อั้น",
        "ข้าวสวยร้อนๆ"
      ]
    },
    {
      "id": "r-kyo-1",
      "name": "Kikunoi Honten (มิชลิน 3 ดาว เกียวโต)",
      "city": "Kyoto",
      "cityTh": "เกียวโต",
      "cuisine": "ไคเซกิชั้นสูง",
      "priceLevel": "฿฿฿฿",
      "averagePrice": 12500,
      "rating": 4.98,
      "reviewsCount": 510,
      "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      "address": "Higashiyama, Kyoto",
      "highlight": "สัมผัสจิตวิญญาณแห่งวัฒนธรรมอาหารเกียวโต โดยเชฟโยชิฮิโระ มูราตะ",
      "openHours": "12:00-14:30, 17:30-21:30",
      "menuHighlights": [
        "คอร์สไคเซกิ 12 เมนู",
        "ปลาอายุย่างเกลือ",
        "เป็ดตุ๋นสมุนไพร"
      ]
    },
    {
      "id": "r-kyo-2",
      "name": "Gion Duck Noodles",
      "city": "Kyoto",
      "cityTh": "เกียวโต",
      "cuisine": "ราเมนเป็ดฝรั่งเศสรมควัน",
      "priceLevel": "฿฿",
      "averagePrice": 550,
      "rating": 4.86,
      "reviewsCount": 1400,
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      "address": "Gion, Kyoto",
      "highlight": "ร้านลับในตรอกกิออน เสิร์ฟราเมนเนื้อเป็ดฝรั่งเศสรมควันและซอสส้ม",
      "openHours": "11:30-21:00",
      "menuHighlights": [
        "Duck Ramen ซุปเข้มข้น",
        "Duck Tsukemen จุ่มซอส",
        "ข้าวหน้าตับเป็ด"
      ]
    },
    {
      "id": "r-hok-1",
      "name": "Kani Shogun Sapporo (ราชาปูฮอกไกโด)",
      "city": "Hokkaido",
      "cityTh": "ฮอกไกโด",
      "cuisine": "ปูยักษ์ฮอกไกโด & ชาบูชาบู",
      "priceLevel": "฿฿฿",
      "averagePrice": 3200,
      "rating": 4.89,
      "reviewsCount": 1750,
      "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
      "address": "Susukino, Sapporo",
      "highlight": "เพลิดเพลินกับปูทาระบะ ปูขน และปูซูไว สดหวานจากทะเลเหนือฮอกไกโด",
      "openHours": "11:30-22:00",
      "menuHighlights": [
        "ซาชิมิปูทาระบะสด",
        "หม้อไฟชาบูชาบูปู",
        "ข้าวอบมันปู"
      ]
    },
    {
      "id": "r-hok-b1",
      "name": "Ramen Yokocho Alley (ตรอกราเมนซัปโปโร)",
      "city": "Hokkaido",
      "cityTh": "ฮอกไกโด",
      "cuisine": "มิโซะราเมนข้าวโพดเนย",
      "priceLevel": "฿",
      "averagePrice": 220,
      "rating": 4.81,
      "reviewsCount": 5600,
      "address": "Susukino, Sapporo",
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "highlight": "ตรอกราเมนในตำนานกว่า 17 ร้าน เสิร์ฟมิโซะราเมนร้อนๆ โปะเนยฮอกไกโดและข้าวโพดหวานหอม",
      "openHours": "11:00-03:00",
      "menuHighlights": [
        "Butter Corn Miso Ramen",
        "สไปซี่มิโซะราเมน",
        "เกี๊ยวซ่าฮอกไกโด"
      ]
    },
    {
      "id": "r-sel-1",
      "name": "Born & Bred Seoul (เนื้อฮันอูพรีเมียม)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "โอมากาเสะเนื้อวัวฮันอู A++",
      "priceLevel": "฿฿฿฿",
      "averagePrice": 6900,
      "rating": 4.95,
      "reviewsCount": 620,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "address": "Majang-dong, Seoul",
      "highlight": "สวรรค์ของคนรักเนื้อ คัดสรรสุดยอดเนื้อวัวฮันอูเกรดสูงสุดของเกาหลี",
      "openHours": "18:00-22:00",
      "menuHighlights": [
        "Hanwoo Tasting Course",
        "แซนด์วิชคัตสึเนื้อฮันอู",
        "ซุปเนื้อตุ๋นโสม"
      ]
    },
    {
      "id": "r-sel-2",
      "name": "Tosokchon Samgyetang (ไก่ตุ๋นโสม)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "ไก่ตุ๋นโสมเกาหลีต้นตำรับ",
      "priceLevel": "฿฿",
      "averagePrice": 650,
      "rating": 4.87,
      "reviewsCount": 4200,
      "image": "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80",
      "address": "Jongno-gu, Seoul (ใกล้พระราชวังเคียงบก)",
      "highlight": "ร้านไก่ตุ๋นโสมอันดับหนึ่งของเกาหลี ที่อดีตประธานาธิบดีเกาหลีโปรดปราน",
      "openHours": "10:00-21:30",
      "menuHighlights": [
        "ไก่ตุ๋นโสมป่าเข้มข้น",
        "ไก่ดำตุ๋นยาจีน",
        "พาจอนซีฟู้ด"
      ]
    },
    {
      "id": "r-sel-3",
      "name": "Myeongdong Kyoja (มิชลิน บิบ กูร์มองด์)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "ก๋วยเตี๋ยวคัลกุกซู & เกี๊ยว",
      "priceLevel": "฿",
      "averagePrice": 320,
      "rating": 4.81,
      "reviewsCount": 5500,
      "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
      "address": "Myeongdong, Seoul",
      "highlight": "เส้นคัลกุกซูเหนียวนุ่มในน้ำซุปไก่หอมเข้มข้น เคียงคู่กิมจิกระเทียมรสจัดจ้าน",
      "openHours": "10:30-21:00",
      "menuHighlights": [
        "คัลกุกซูเส้นสด",
        "มันดู (เกี๊ยวนึ่งไส้แน่น)",
        "บิบิมกุกซูยำเผ็ด"
      ]
    },
    {
      "id": "r-sel-b1",
      "name": "Gwangjang Market Bindaetteok (ตลาดกวางจัง)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "แพนเค้กถั่วเขียว & ต๊อกบกกี",
      "priceLevel": "฿",
      "averagePrice": 120,
      "rating": 4.88,
      "reviewsCount": 7800,
      "address": "Gwangjang Market, Jongno-gu, Seoul",
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "highlight": "บินแดต็อก แพนเค้กถั่วเขียวบดทอดกระทะน้ำมันร้อนๆ หอมกรอบ สตรีทฟู้ดดังระดับ Netflix",
      "openHours": "09:00-22:00",
      "menuHighlights": [
        "บินแดต็อกถั่วเขียวทอดกรอบ",
        "มินิมักกอลลีไวน์ข้าวเกาหลี",
        "ต๊อกบกกีและคิมบับเส้นเล็ก"
      ]
    },
    {
      "id": "r-sel-b2",
      "name": "Isaac Toast Myeongdong (ไอแซค โทสต์)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "แซนด์วิชไข่เกาหลี",
      "priceLevel": "฿",
      "averagePrice": 95,
      "rating": 4.83,
      "reviewsCount": 4600,
      "address": "Myeongdong, Seoul",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "highlight": "ขนมปังปิ้งเนยสดไส้ไข่คนนุ่มๆ กะหล่ำปลีฝอย แฮม ชีส และซอสกีวี่สูตรพิเศษ",
      "openHours": "07:30-19:30",
      "menuHighlights": [
        "Bacon Best Toast",
        "Ham Special Toast",
        "ชาพีชเย็นชื่นใจ"
      ]
    },
    {
      "id": "r-sel-b3",
      "name": "Saemaeul Sikdang Hongdae (หมูย่างกิมจิ 7 นาที)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "หมูย่างสตรีทฟู้ดเกาหลี",
      "priceLevel": "฿",
      "averagePrice": 280,
      "rating": 4.79,
      "reviewsCount": 3900,
      "address": "Hongdae, Seoul",
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "highlight": "ร้านหมูย่างของเชฟแบคจงวอน เมนูหมูสไลซ์บางราดซอสเผ็ดและซุปกิมจิตุ๋น 7 นาทีคลุกข้าว",
      "openHours": "11:00-02:00",
      "menuHighlights": [
        "Yeoltan Bulgogi หมูสไลซ์หมักเผ็ด",
        "ซุปกิมจิ 7 นาทีคลุกข้าว",
        "หนังหมูย่างเหนียวนุ่ม"
      ]
    },
    {
      "id": "r-sel-b4",
      "name": "Cafe Onion Anguk (คาเฟ่ฮันอก)",
      "city": "Seoul",
      "cityTh": "โซล",
      "cuisine": "เบเกอรี่ & คราฟต์กาแฟ",
      "priceLevel": "฿",
      "averagePrice": 220,
      "rating": 4.83,
      "reviewsCount": 3800,
      "address": "Jongno-gu, Seoul",
      "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "highlight": "จิบกาแฟและเบเกอรี่อบใหม่ในเรือนฮันอกโบราณ 100 ปี จุดเช็คอินยอดนิยม",
      "openHours": "07:00-22:00",
      "menuHighlights": [
        "ขนมปัง Pandoro ภูเขาหิมะ",
        "Baguette ไข่ปลา",
        "Einspanner Coffee"
      ]
    },
    {
      "id": "r-phk-1",
      "name": "PRU Restaurant Phuket (มิชลิน 1 ดาว)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "ไฟน์ไดน์นิ่ง ฟาร์มทูเทเบิล",
      "priceLevel": "฿฿฿฿",
      "averagePrice": 5500,
      "rating": 4.94,
      "reviewsCount": 510,
      "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      "address": "ตรีสรา รีสอร์ต ภูเก็ต",
      "highlight": "ร้านอาหารดาวมิชลินสีเขียว ใช้วัตถุดิบท้องถิ่นไทย 100% จากฟาร์มพรุจัมปา",
      "openHours": "18:00-22:30",
      "menuHighlights": [
        "ข้าวโพดหวานรมควัน",
        "ปลาหมึกอันดามันย่างถ่าน",
        "เนื้อโคขุนสกลนคร"
      ]
    },
    {
      "id": "r-phk-2",
      "name": "ระย้า (Raya Restaurant ภูเก็ต)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "อาหารพื้นเมืองภูเก็ตแท้",
      "priceLevel": "฿฿",
      "averagePrice": 850,
      "rating": 4.89,
      "reviewsCount": 3900,
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "address": "ถนนดีบุก เมืองเก่าภูเก็ต",
      "highlight": "ตำนานอาหารปักษ์ใต้ในบ้านโบราณกว่า 100 ปี แกงปูใบชะพลูที่อร่อยที่สุด",
      "openHours": "10:00-22:00",
      "menuHighlights": [
        "แกงเนื้อปูใบชะพลูหมี่หุ้น",
        "หมูฮ้องสูตรโบราณ",
        "น้ำพริกกุ้งเสียบ"
      ]
    },
    {
      "id": "r-phk-3",
      "name": "วันจันทร์ (One Chun Cafe & Restaurant)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "อาหารปักษ์ใต้ / มิชลิน บิบ",
      "priceLevel": "฿฿",
      "averagePrice": 450,
      "rating": 4.86,
      "reviewsCount": 4200,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "address": "ถนนเทพกระษัตรี เมืองเก่าภูเก็ต",
      "highlight": "บรรยากาศย้อนยุคสไตล์วินเทจ เสิร์ฟรสชาติอาหารภูเก็ตเข้มข้นจัดจ้าน",
      "openHours": "10:00-22:00",
      "menuHighlights": [
        "หมูกรอบคั่วเกลือ",
        "แกงส้มปลากะพงยอดมะพร้าว",
        "ไข่เจียวกากหมูโบราณ"
      ]
    },
    {
      "id": "r-phk-b1",
      "name": "บุญรัตน์ติ่มซำ (ติ่มซำ 100 ปี ภูเก็ต)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "ติ่มซำกวางตุ้งโบราณ",
      "priceLevel": "฿",
      "averagePrice": 45,
      "rating": 4.87,
      "reviewsCount": 5100,
      "address": "ถนนบางกอก เมืองภูเก็ต",
      "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
      "highlight": "อาหารเช้าวัฒนธรรมภูเก็ต ขนมจีบหมู ฮะเก๋า ซาลาเปา นึ่งสดๆ เข่งละ 20-30 บาท",
      "openHours": "06:00-10:30 (เช้าเท่านั้น)",
      "menuHighlights": [
        "ขนมจีบกุ้งหมูสับ",
        "บะกุ๊ดเต๋ซี่โครงหมูยาจีน",
        "ชาชักร้อนสูตรโบราณ"
      ]
    },
    {
      "id": "r-phk-b2",
      "name": "โรตีแถวน้ำ (มิชลิน บิบ กูร์มองด์)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "โรตีกรอบ & มัสมั่นเนื้อ",
      "priceLevel": "฿",
      "averagePrice": 50,
      "rating": 4.84,
      "reviewsCount": 3800,
      "address": "สี่แยกแถวน้ำ ถนนถลาง ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      "highlight": "โรตีทอดเตาถ่านกรอบนอกนุ่มใน เสิร์ฟคู่แกงมัสมั่นเนื้อและไข่ดาวดาวเยิ้มๆ จานละ 40-50 บาท",
      "openHours": "07:00-12:00",
      "menuHighlights": [
        "โรตี 2:1 (โรตีสองแผ่นไข่ดาวหนึ่ง)",
        "แกงมัสมั่นเนื้อรสเข้มข้น",
        "ชาร้อนใส่นม"
      ]
    },
    {
      "id": "r-phk-b3",
      "name": "โกเบ๊นซ์ข้าวต้มแห้งภูเก็ต (มิชลิน บิบ)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "ข้าวต้มแห้งเครื่องในหมู",
      "priceLevel": "฿",
      "averagePrice": 85,
      "rating": 4.88,
      "reviewsCount": 6500,
      "address": "ถนนกระบี่ เมืองภูเก็ต",
      "image": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
      "highlight": "ข้าวต้มแห้งในตำนาน ข้าวสวยร้อนๆ คลุกเคล้าหมูกรอบ กระดูกอ่อน หมูสับ กากหมูเจียว และน้ำซุปพริกไทย",
      "openHours": "17:30-01:30",
      "menuHighlights": [
        "ข้าวต้มแห้งทรงเครื่อง",
        "ก๋วยจั๊บน้ำใสพริกไทยดำ",
        "กระดูกหมูต้มซุป"
      ]
    },
    {
      "id": "r-phk-b4",
      "name": "หมี่ต้นโพธิ์ วงเวียนหอนาฬิกา",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "country": "ไทย",
      "cuisine": "หมี่ฮกเกี้ยนผัดกระทะร้อน",
      "priceLevel": "฿",
      "averagePrice": 70,
      "rating": 4.77,
      "reviewsCount": 4200,
      "address": "วงเวียนหอนาฬิกา ภูเก็ต",
      "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
      "highlight": "หมี่ฮกเกี้ยนเส้นใหญ่ผัดซีอิ๊วเตาถ่าน ใส่กุ้ง หอยติบ หมูแดง และไข่ลวกเยิ้มๆ อร่อยกว่า 80 ปี",
      "openHours": "09:00-18:30",
      "menuHighlights": [
        "หมี่ฮกเกี้ยนผัดไข่หมก",
        "หมี่สะปำน้ำข้น",
        "ห่อหมกปลาภูเก็ต"
      ]
    },
    {
      "id": "r-cnx-1",
      "name": "ข้าวซอยลำดวนฟ้าฮ่าม (Chiang Mai)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "cuisine": "ข้าวซอยล้านนาต้นตำรับ",
      "priceLevel": "฿",
      "averagePrice": 60,
      "rating": 4.81,
      "reviewsCount": 4100,
      "address": "ถนนเจริญราษฎร์ เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
      "highlight": "ตำนานข้าวซอยเมืองเหนือกว่า 70 ปี น้ำแกงกะทิหอมกรุ่นเครื่องเทศล้านนา เส้นข้าวซอยเหนียวนุ่ม",
      "openHours": "08:30-16:30",
      "menuHighlights": [
        "ข้าวซอยไก่น่องโต",
        "ข้าวซอยเนื้อน่องลายตุ๋น",
        "ไส้อั่วสมุนไพรย่างเตาถ่าน"
      ]
    },
    {
      "id": "r-cnx-2",
      "name": "ต๋องเต็มโต๊ะ (Tong Tem Toh นิมมาน)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "cuisine": "อาหารเหนือร่วมสมัย นิมมาน",
      "priceLevel": "฿",
      "averagePrice": 150,
      "rating": 4.79,
      "reviewsCount": 4500,
      "address": "นิมมานเหมินท์ ซอย 13 เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "highlight": "ร้านอาหารเหนือสุดฮิตใจกลางนิมมาน เมนูย่างเตาถ่านหอมฉุยหน้าร้าน ราคาจับต้องได้",
      "openHours": "11:00-23:00",
      "menuHighlights": [
        "อ่องปูนาจิ้มข้าวเหนียว",
        "แกงฮังเลหมูนุ่ม",
        "ลาบคั่วหมูสูตรเชียงใหม่"
      ]
    },
    {
      "id": "r-cnx-b1",
      "name": "ก๋วยเตี๋ยว 3 บาท เชียงใหม่ (ราคาถูกที่สุด)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "cuisine": "ก๋วยเตี๋ยวน้ำตกรสเด็ด",
      "priceLevel": "฿",
      "averagePrice": 35,
      "rating": 4.73,
      "reviewsCount": 3600,
      "address": "ถนนรัตนโกสินทร์ ซอย 1 เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
      "highlight": "ก๋วยเตี๋ยวชามละ 3 บาทในตำนาน กินเรียงชามเป็นคอนโด สนุก อิ่ม อร่อย ประหยัดเงินสุดๆ",
      "openHours": "08:00-17:00",
      "menuHighlights": [
        "เส้นเล็กน้ำตกหมู 3 บาท",
        "หมี่เหลืองต้มยำ 3 บาท",
        "กากหมูกระเทียมเจียวจานละ 15 บาท"
      ]
    },
    {
      "id": "r-cnx-b2",
      "name": "สุกี้ช้างเผือก (มิชลิน บิบ กูร์มองด์)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "cuisine": "สุกี้แห้งกระทะเหล็กไฟลุก",
      "priceLevel": "฿",
      "averagePrice": 65,
      "rating": 4.88,
      "reviewsCount": 6200,
      "address": "ตลาดโต้รุ่งประตูช้างเผือก เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "highlight": "สุกี้แห้งผัดไฟลุก ผักกาดกรอบอร่อย น้ำจิ้มเต้าหู้ยี้สูตรเด็ดที่คนต่อคิวแน่นทุกคืน",
      "openHours": "17:30-00:00",
      "menuHighlights": [
        "สุกี้แห้งเนื้อหมูนุ่ม",
        "สุกี้แห้งทะเลรวมมิตร",
        "สุกี้น้ำซุปร้อนๆ"
      ]
    },
    {
      "id": "r-cnx-b3",
      "name": "โกเหน่ง ปาท่องโก๋ไดโนเสาร์",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "cuisine": "ปาท่องโก๋แฟนซี & น้ำเต้าหู้",
      "priceLevel": "฿",
      "averagePrice": 40,
      "rating": 4.82,
      "reviewsCount": 4100,
      "address": "กาดหลวง (ตลาดวโรรส) เชียงใหม่",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "highlight": "ปาท่องโก๋ทอดปั้นเป็นรูปไดโนเสาร์ ทีเร็กซ์ มังกร ช้าง กรอบนอกนุ่มใน ทานคู่สังขยาใบเตย",
      "openHours": "06:00-12:00",
      "menuHighlights": [
        "ปาท่องโก๋ไดโนเสาร์",
        "น้ำเต้าหู้ทรงเครื่อง",
        "สังขยาใบเตยนมสด"
      ]
    },
    {
      "id": "r-cnx-b4",
      "name": "ไก่ย่าง SP นิมมาน (SP Chicken)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "country": "ไทย",
      "cuisine": "ไก่ย่างหมุนเตาถ่าน & ส้มตำ",
      "priceLevel": "฿",
      "averagePrice": 120,
      "rating": 4.85,
      "reviewsCount": 2900,
      "address": "ใกล้พระสิงห์ คูเมืองเชียงใหม่",
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "highlight": "ไก่บ้านหมุนย่างเตาถ่าน หนังกรอบเนื้อนุ่ม ยัดไส้กระเทียมพริกไทย น้ำจิ้มแจ่วรสจัดจ้าน",
      "openHours": "10:00-17:00",
      "menuHighlights": [
        "ไก่ย่างหมุนทั้งตัว",
        "ส้มตำไทยไข่เค็ม",
        "ต้มแซ่บกระดูกอ่อน"
      ]
    },
    {
      "id": "r-bkk-1",
      "name": "Gaa Bangkok (มิชลิน 2 ดาว)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "cuisine": "อินเดียโมเดิร์นไฟน์ไดน์นิ่ง",
      "priceLevel": "฿฿฿฿",
      "averagePrice": 4900,
      "rating": 4.91,
      "reviewsCount": 680,
      "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "address": "ซอยสุขุมวิท 53 กรุงเทพฯ",
      "highlight": "เรือนไทยโบราณผสานกับศาสตร์อาหารอินเดียสมัยใหม่โดยเชฟการิมา อะโรรา",
      "openHours": "17:30-23:00",
      "menuHighlights": [
        "ขนุนย่างเครื่องเทศ",
        "คาเวียร์กับนานทรัฟเฟิล",
        "ช็อกโกแลตเครื่องเทศ"
      ]
    },
    {
      "id": "r-bkk-2",
      "name": "เจ๊ไฝ (Raan Jay Fai - มิชลิน 1 ดาว)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "cuisine": "สตรีทฟู้ดกระทะถ่านระดับโลก",
      "priceLevel": "฿฿฿",
      "averagePrice": 1500,
      "rating": 4.83,
      "reviewsCount": 3800,
      "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
      "address": "ประตูผี พระนคร กรุงเทพฯ",
      "highlight": "ราชินีสตรีทฟู้ดสวมแว่นตาดำน้ำ ผัดเตาถ่านไฟลุก ไข่เจียวปูเนื้อก้อนยักษ์ระดับตำนาน",
      "openHours": "09:00-19:30 (ปิดวันอาทิตย์-อังคาร)",
      "menuHighlights": [
        "ไข่เจียวปูยักษ์",
        "ราดหน้าทะเลเส้นกรอบ",
        "ผัดขี้เมาทะเลกระทะถ่าน"
      ]
    },
    {
      "id": "r-bkk-b1",
      "name": "ทิพย์สมัย ผัดไทยประตูผี",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "cuisine": "ผัดไทยเส้นจันท์ห่อไข่",
      "priceLevel": "฿",
      "averagePrice": 120,
      "rating": 4.86,
      "reviewsCount": 8900,
      "address": "ถนนมหาไชย ประตูผี พระนคร",
      "image": "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80",
      "highlight": "สุดยอดผัดไทยอันดับ 1 ของเมืองไทย ผัดเตาถ่านห่อไข่บางเฉียบพร้อมกุ้งสด น้ำส้มคั้นสดในตำนาน",
      "openHours": "09:00-00:00",
      "menuHighlights": [
        "ผัดไทยเส้นจันท์ห่อไข่กุ้งสด",
        "น้ำส้มคั้นสดผสมเกล็ดส้ม",
        "ผัดไทยมังสวิรัติ"
      ]
    },
    {
      "id": "r-bkk-b2",
      "name": "มนต์ นมสด เสาชิงช้า",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "cuisine": "ขนมปังปิ้งเนยสด & นมสดร้อน",
      "priceLevel": "฿",
      "averagePrice": 55,
      "rating": 4.89,
      "reviewsCount": 9200,
      "address": "ถนนดินสอ เสาชิงช้า พระนคร",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "highlight": "ตำนานขนมปังปิ้งเตาถ่านกว่า 50 ปี ขนมปังกรอบนอกนุ่มใน ราดสังขยาไข่และสังขยาใบเตยเยิ้มๆ",
      "openHours": "13:00-22:00",
      "menuHighlights": [
        "ขนมปังปิ้งหน้าสังขยาไข่",
        "ขนมปังปิ้งเนยนมข้น",
        "นมสดพาสเจอร์ไรส์ร้อน/เย็น"
      ]
    },
    {
      "id": "r-bkk-b3",
      "name": "ก๋วยจั๊บอ้วนโภชนา เยาวราช (มิชลิน บิบ)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "cuisine": "ก๋วยจั๊บน้ำใสพริกไทยจัดจ้าน",
      "priceLevel": "฿",
      "averagePrice": 70,
      "rating": 4.82,
      "reviewsCount": 5400,
      "address": "หน้าโรงหนังเก่า ถนนเยาวราช",
      "image": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
      "highlight": "น้ำซุปใสเผ็ดร้อนพริกไทยสะท้านทรวง หมูกรอบหนังพองกรอบสนั่น เคียงคู่เครื่องในไร้กลิ่นคาว",
      "openHours": "17:00-01:00",
      "menuHighlights": [
        "ก๋วยจั๊บหมูกรอบน้ำใส",
        "เกาเหลาเครื่องในรวม",
        "หมูกรอบจานเดี่ยว"
      ]
    },
    {
      "id": "r-bkk-b4",
      "name": "โจ๊กสามย่าน (บรรทัดทอง)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "country": "ไทย",
      "cuisine": "โจ๊กหมูสับก้อนโต",
      "priceLevel": "฿",
      "averagePrice": 55,
      "rating": 4.8,
      "reviewsCount": 3900,
      "address": "ถนนบรรทัดทอง กรุงเทพฯ",
      "image": "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80",
      "highlight": "เนื้อโจ๊กข้นเนียนนุ่ม หมูสับปั้นก้อนโตหมักหอมพริกไทย ใส่ไข่ลวกหรือไข่เยี่ยวม้าอร่อยเต็มคำ",
      "openHours": "05:00-10:00, 16:00-22:00",
      "menuHighlights": [
        "โจ๊กหมูสับใส่ไข่ลวก",
        "โจ๊กหมูเครื่องในไข่เยี่ยวม้า",
        "ปาท่องโก๋กรอบจิ๋ว"
      ]
    },
    {
      "id": "r-sin-b1",
      "name": "Tian Tian Hainanese Chicken Rice (ข้าวมันไก่ในตำนาน)",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "country": "สิงคโปร์",
      "cuisine": "ข้าวมันไก่ไหหลำ มิชลิน บิบ",
      "priceLevel": "฿",
      "averagePrice": 120,
      "rating": 4.89,
      "reviewsCount": 8900,
      "address": "Maxwell Food Centre, Singapore",
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "highlight": "ข้าวมันไก่สิงคโปร์อันดับ 1 ในใจนักเดินทาง ไก่นุ่มฉ่ำน้ำสต็อก ข้าวหอมมันเรียงเม็ด น้ำจิ้มพริกส้มสูตรเด็ด",
      "openHours": "10:00-19:30",
      "menuHighlights": [
        "Hainanese Chicken Rice",
        "ผักกวางตุ้งราดน้ำมันหอย",
        "น้ำซุปไก่หอมกรุ่น"
      ]
    },
    {
      "id": "r-sin-b2",
      "name": "Old Chang Kee (กะหรี่ปั๊บสิงคโปร์)",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "country": "สิงคโปร์",
      "cuisine": "กะหรี่ปั๊บไส้ไก่ไข่ต้ม",
      "priceLevel": "฿",
      "averagePrice": 45,
      "rating": 4.75,
      "reviewsCount": 4200,
      "address": "Orchard Road & ทั่วสิงคโปร์",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "highlight": "กะหรี่ปั๊บแป้งกรอบ ไส้แกงกะหรี่ไก่แน่นๆ มีไข่ต้มด้านใน สตรีทฟู้ดทานเล่นยอดฮิต",
      "openHours": "08:00-21:30",
      "menuHighlights": [
        "Curry'O ไส้กะหรี่ไก่ไข่ต้ม",
        "ลูกชิ้นปลาหมึกทอด",
        "เกี๊ยวซ่ากุ้ง"
      ]
    },
    {
      "id": "r-bal-b1",
      "name": "Warung Babi Guling Ibu Oka (หมูหันบาหลี)",
      "city": "Bali",
      "cityTh": "บาหลี",
      "country": "อินโดนีเซีย",
      "cuisine": "หมูหันสมุนไพรบาหลี",
      "priceLevel": "฿",
      "averagePrice": 110,
      "rating": 4.83,
      "reviewsCount": 5100,
      "address": "Ubud, Bali",
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "highlight": "หมูหันบาหลีในตำนาน หนังหมูกรอบสีทอง เนื้อนุ่มคลุกเคล้าสมุนไพรเครื่องเทศบาหลี",
      "openHours": "11:00-18:00",
      "menuHighlights": [
        "Special Babi Guling Rice",
        "ไส้กรอกหมูสมุนไพรบาหลี",
        "น้ำซุปกระดูกหมูพริกไทย"
      ]
    },
    {
      "id": "r-swi-1",
      "name": "Restaurant Taverne Interlaken (ฟองดูว์สวิส)",
      "city": "Switzerland",
      "cityTh": "สวิตเซอร์แลนด์",
      "country": "สวิตเซอร์แลนด์",
      "cuisine": "ฟองดูว์ชีส & สเต็กหินร้อน",
      "priceLevel": "฿฿",
      "averagePrice": 1200,
      "rating": 4.84,
      "reviewsCount": 1400,
      "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "address": "Interlaken, Switzerland",
      "highlight": "ดื่มด่ำฟองดูว์ชีสกรูแยร์และเอ็มเมนทาลเข้มข้น คู่ไวน์ขาวสวิสแท้",
      "openHours": "11:30-22:00",
      "menuHighlights": [
        "Swiss Cheese Fondue",
        "Rösti มันฝรั่งทอดกรอบ",
        "ช็อกโกแลตฟองดูว์"
      ]
    },
    {
      "id": "r-par-b1",
      "name": "L'As du Fallafel (ฟลาเฟลปารีส)",
      "city": "Paris",
      "cityTh": "ปารีส",
      "country": "ฝรั่งเศส",
      "cuisine": "ฟลาเฟลแซนด์วิชพิต้า",
      "priceLevel": "฿",
      "averagePrice": 190,
      "rating": 4.86,
      "reviewsCount": 7800,
      "address": "Rue des Rosiers, Le Marais, Paris",
      "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      "highlight": "แซนด์วิชฟลาเฟลถั่วลูกไก่ทอดกรอบ ราดซอสงาขาวทาฮินีและมะเขือม่วงย่างในย่านมาเรส์",
      "openHours": "11:00-23:00 (ปิดวันเสาร์)",
      "menuHighlights": [
        "Special Falafel Pita",
        "Shawarma เนื้อแกะ",
        "ชามะนาวใบสะระแหน่"
      ]
    },
    {
      "id": "r-par-b2",
      "name": "Du Pain et des Idées (ครัวซองต์เนยสดปารีส)",
      "city": "Paris",
      "cityTh": "ปารีส",
      "country": "ฝรั่งเศส",
      "cuisine": "ครัวซองต์ & ขนมปังฝรั่งเศส",
      "priceLevel": "฿",
      "averagePrice": 90,
      "rating": 4.92,
      "reviewsCount": 4800,
      "address": "Rue Yves Toudic, Paris",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "highlight": "ร้านเบเกอรี่โบราณปี 1875 ครัวซองต์เนยสดแท้จากนอร์มองดี กรอบเป็นชั้นๆ หอมละลายในปาก",
      "openHours": "07:00-19:30",
      "menuHighlights": [
        "Croissant au Beurre",
        "Escargot Pistache ช็อกโกแลต",
        "ขนมปัง Pain des Amis"
      ]
    },
    {
      "id": "r-lon-b1",
      "name": "Borough Market Salt Beef Bagel (ลอนดอน)",
      "city": "London",
      "cityTh": "ลอนดอน",
      "country": "สหราชอาณาจักร",
      "cuisine": "เบเกิลเนื้อเค็มลอนดอน",
      "priceLevel": "฿",
      "averagePrice": 220,
      "rating": 4.88,
      "reviewsCount": 6500,
      "address": "Borough Market, London",
      "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "highlight": "เบเกิลแป้งเหนียวนุ่ม อัดแน่นด้วยเนื้อวัวหมักเกลือต้มเปื่อยจนละลาย ปาดมัสตาร์ดอังกฤษและแตงกวาดอง",
      "openHours": "10:00-17:00",
      "menuHighlights": [
        "Salt Beef Bagel ไส้พูน",
        "Fish & Chips ปลาค็อดทอดกรอบ",
        "น้ำแอปเปิ้ลไซเดอร์สด"
      ]
    },
    {
      "id": "r-bkk-b5",
      "name": "Jok Prince Bang Rak (โจ๊กปริ้นซ์ บางรัก)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "cuisine": "โจ๊กเตาถ่านหมูสับก้อนโต / มิชลินบิบกูร์มองด์",
      "priceRange": "฿ (45 - 65 ฿)",
      "rating": 4.82,
      "reviewsCount": 8900,
      "address": "ถนนเจริญกรุง ตรงข้ามโรบินสันบางรัก กรุงเทพฯ",
      "highlightDish": "โจ๊กหมูสับไข่เยี่ยวม้า หอมกลิ่นไหม้เตาถ่านอันเป็นเอกลักษณ์",
      "description": "โจ๊กเนื้อเนียนละเอียดสไตล์กวางตุ้ง กลิ่นไหม้เตาถ่านเฉพาะตัว หมูก้อนยักษ์หมักพริกไทยนุ่มเด้ง ราคาเบาๆ สบายกระเป๋า",
      "budgetFriendly": true,
      "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
      "priceLevel": "฿",
      "openHours": "10:00 - 21:00 น.",
      "highlight": "โจ๊กหมูสับไข่เยี่ยวม้า หอมกลิ่นไหม้เตาถ่านอันเป็นเอกลักษณ์",
      "averagePrice": 45
    },
    {
      "id": "r-tok-b4",
      "name": "Harajuku Marion Crepes (เครปมาริออน ฮาราจูกุ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "cuisine": "ของหวาน / เครปเย็นญี่ปุ่น",
      "priceRange": "฿ (130 - 200 ฿ / 500-800 JPY)",
      "rating": 4.75,
      "reviewsCount": 7800,
      "address": "Takeshita Street, Harajuku, Tokyo",
      "highlightDish": "เครปสตรอว์เบอร์รี ครีมสด ไอศกรีมวานิลลา ช็อกโกแลต",
      "description": "ร้านเครปชื่อดังประจำถนนทาเคชิตะ แป้งนุ่มหอมเนย ไส้ครีมสดละลายในปาก สดชื่น เดินกินชิลๆ ย่านแฟชั่นวัยรุ่น",
      "budgetFriendly": true,
      "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      "priceLevel": "฿",
      "openHours": "10:00 - 21:00 น.",
      "highlight": "เครปสตรอว์เบอร์รี ครีมสด ไอศกรีมวานิลลา ช็อกโกแลต",
      "averagePrice": 130
    },
    {
      "id": "r-osa-b3",
      "name": "Kushikatsu Daruma Shinsekai (คุชิคัตสึ ดารุมะ ชินเซไก)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "cuisine": "ของทอดเสียบไม้โอซาก้าแท้ / บาร์อิซากายะ",
      "priceRange": "฿ (30 - 280 ฿ / 130-1,200 JPY)",
      "rating": 4.84,
      "reviewsCount": 14200,
      "address": "Shinsekai, Naniwa-ku, Osaka",
      "highlightDish": "เนื้อวัวเสียบไม้ทอดกรอบ กุ้ง ชีสเยิ้ม กะหล่ำปลีสด (ห้ามจุ่มซอส 2 รอบ)",
      "description": "ต้นกำเนิดของทอดเสียบไม้คุชิคัตสึแห่งโอซาก้า แป้งบางกรอบไม่อมน้ำมัน น้ำซอสสูตรลับเข้มข้น สั่งได้ตั้งแต่ไม้ละ 130 เยน",
      "budgetFriendly": true,
      "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
      "priceLevel": "฿",
      "openHours": "10:00 - 21:00 น.",
      "highlight": "เนื้อวัวเสียบไม้ทอดกรอบ กุ้ง ชีสเยิ้ม กะหล่ำปลีสด (ห้ามจุ่มซอส 2 รอบ)",
      "averagePrice": 30
    },
    {
      "id": "r-hkt-b3",
      "name": "Roti Taew Nam (โรตีแถวน้ำ ภูเก็ต)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "cuisine": "โรตีกรอบเตาถ่าน แกงมัสมั่น / มิชลินบิบกูร์มองด์",
      "priceRange": "฿ (35 - 90 ฿)",
      "rating": 4.82,
      "reviewsCount": 6700,
      "address": "สี่แยกแถวน้ำ ถนนเทพกระษัตรี ต.ตลาดใหญ่ ภูเก็ต",
      "highlightDish": "โรตี 2:1 (สองแผ่นไข่ดาว 1 ฟอง) จิ้มแกงเนื้อ หรือแกงไก่หอมกะทิ",
      "description": "ร้านอาหารเช้าพื้นเมืองภูเก็ตระดับมิชลิน โรตีกรอบทอดบนเตาถ่านกรอบนอกนุ่มใน แกงรสกลมกล่อม ชาเย็นเข้มข้น ราคาประหยัดสุดๆ",
      "budgetFriendly": true,
      "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "priceLevel": "฿",
      "openHours": "10:00 - 21:00 น.",
      "highlight": "โรตี 2:1 (สองแผ่นไข่ดาว 1 ฟอง) จิ้มแกงเนื้อ หรือแกงไก่หอมกะทิ",
      "averagePrice": 35
    },
    {
      "id": "r-sin-b3",
      "name": "Lau Pa Sat Satay Street (ถนนสะเต๊ะเหลาปาสัท สิงคโปร์)",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "cuisine": "สะเต๊ะเนื้อ-ไก่-กุ้งย่างเตาถ่าน / สตรีทฟู้ดกลางคืน",
      "priceRange": "฿ (220 - 450 ฿ / 9-18 SGD)",
      "rating": 4.8,
      "reviewsCount": 13500,
      "address": "Boon Tat St, Downtown Core, Singapore",
      "highlightDish": "เซตสะเต๊ะไก่-เนื้อ 15 ไม้ จิ้มน้ำจิ้มถั่วบดรสเข้มข้น และอาจาดแตงกวา",
      "description": "ตกดึกปิดถนนกลางย่านการเงินกลายเป็นถนนสตรีทฟู้ดย่างสะเต๊ะควันโขมง นั่งจิบเครื่องดื่มเย็นๆ รับลมกลางแจ้งสไตล์สิงคโปร์",
      "budgetFriendly": true,
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "priceLevel": "฿",
      "openHours": "10:00 - 21:00 น.",
      "highlight": "เซตสะเต๊ะไก่-เนื้อ 15 ไม้ จิ้มน้ำจิ้มถั่วบดรสเข้มข้น และอาจาดแตงกวา",
      "averagePrice": 220
    }
  ],
  "attractions": [
    {
      "id": "a-tok-1",
      "name": "teamLab Planets TOKYO (DMM)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "ศิลปะดิจิทัลอินเทอร์แอคทีฟ",
      "price": 950,
      "originalPrice": 1200,
      "rating": 4.96,
      "reviewsCount": 6200,
      "duration": "2-3 ชม.",
      "includes": [
        "ตั๋วเข้าชมดิจิทัล",
        "โซนเดินลุยน้ำคริสตัล",
        "สวนกล้วยไม้ลอยได้ Floating Flower Garden"
      ],
      "description": "พิพิธภัณฑ์ศิลปะดิจิทัลระดับโลก สัมผัสประสบการณ์เดินเท้าเปล่าลุยน้ำและจมดิ่งสู่โลกแห่งแสงสี",
      "comboDiscount": "จองคู่กับตั๋วโตเกียวเมโทรลดเพิ่ม 10%",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-2",
      "name": "Tokyo Disneyland & DisneySea 1-Day Pass",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "สวนสนุกระดับโลก",
      "price": 2150,
      "originalPrice": 2450,
      "rating": 4.94,
      "reviewsCount": 8900,
      "duration": "เต็มวัน",
      "includes": [
        "บัตรเข้าสวนสนุก 1 วันเต็ม",
        "เครื่องเล่น Beauty and the Beast",
        "โซนใหม่ Fantasy Springs"
      ],
      "description": "ดินแดนมหัศจรรย์ของดิสนีย์ สนุกกับเครื่องเล่นอลังการ การแสดงพาเหรด และจุดถ่ายรูปสุดประทับใจ",
      "comboDiscount": "ตั๋ว E-Ticket สแกนเข้าได้ทันทีไม่ต้องต่อคิว",
      "image": "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-3",
      "name": "Shibuya Sky Observation Deck",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "จุดชมวิวพาโนรามาลอยฟ้า",
      "price": 580,
      "originalPrice": 700,
      "rating": 4.92,
      "reviewsCount": 4500,
      "duration": "1.5 ชม.",
      "includes": [
        "ขึ้นลิฟต์ Transit Pod สู่ชั้น 47",
        "ดาดฟ้าเปิดโล่ง Sky Edge",
        "มุมถ่ายรูปกระจกใสพาโนรามา"
      ],
      "description": "จุดชมวิวแบบ 360 องศาบนดาดฟ้าตึก Shibuya Scramble Square มองเห็นภูเขาไฟฟูจิและโตเกียวทาวเวอร์",
      "comboDiscount": "รอบพระอาทิตย์ตกดินจองล่วงหน้าฟรี",
      "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b1",
      "name": "Senso-ji Temple & Nakamise Street (วัดอาซากุสะ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "วัดโบราณ & วัฒนธรรม (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.89,
      "reviewsCount": 9500,
      "duration": "2 ชม.",
      "includes": [
        "เข้าชมศาลเจ้าและโคมแดงยักษ์ฟรี",
        "ถนนคนเดินนากามิเสะ",
        "ชิมขนมเซมเบ้และซาลาเปาทอด"
      ],
      "description": "วัดที่เก่าแก่ที่สุดในโตเกียว ถ่ายรูปกับโคมแดงยักษ์คามินาริมง และเดินชิมสตรีทฟู้ดโบราณ",
      "comboDiscount": "ฟรีค่าเข้าชมทุกวันตลอดปี",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b2",
      "name": "Meiji Jingu Shrine & Yoyogi Park (ศาลเจ้าเมจิ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "ธรรมชาติ & ป่าในเมือง (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.88,
      "reviewsCount": 7800,
      "duration": "2 ชม.",
      "includes": [
        "เสาโทริอิไม้ขนาดยักษ์",
        "กำแพงถังสาเกโบราณ",
        "ป่าศักดิ์สิทธิ์กว่า 100,000 ต้น"
      ],
      "description": "ศาลเจ้าชินโตอันศักดิ์สิทธิ์ใจกลางฮาราจูกุ ร่มรื่นด้วยต้นไม้เขียวขจี สงบ เย็นสบาย ไม่เสียค่าเข้าชม",
      "comboDiscount": "เข้าชมฟรีตลอดปี",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b3",
      "name": "Shibuya Crossing (ห้าแยกชิบูย่า)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "แลนด์มาร์กสำคัญ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.85,
      "reviewsCount": 12000,
      "duration": "1 ชม.",
      "includes": [
        "รูปปั้นสุนัขฮาจิโกะ",
        "ทางม้าลายที่พลุกพล่านที่สุดในโลก",
        "จอ LED ยักษ์แสงสีเสียง"
      ],
      "description": "แลนด์มาร์กที่มีชื่อเสียงที่สุดในโลก สัมผัสพลังชีวิตของโตเกียว และถ่ายรูปมุมไอคอนิกข้ามถนน",
      "comboDiscount": "ฟรี",
      "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b4",
      "name": "Ueno Onshi Park (สวนอุเอโนะ & ทะเลสาบ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "สวนสาธารณะ & ดอกซากุระ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.86,
      "reviewsCount": 6800,
      "duration": "2-3 ชม.",
      "includes": [
        "จุดชมดอกซากุระยอดนิยม",
        "สระบัวชิโนบาซุ",
        "ศาลเจ้าโทโชกุ"
      ],
      "description": "สวนสาธารณะขนาดใหญ่ใจกลางเมือง จุดชมดอกซากุระบานสะพรั่งในฤดูใบไม้ผลิ และเดินเล่นริมทะเลสาบ",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-osa-1",
      "name": "Universal Studios Japan (USJ) 1-Day Studio Pass",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "category": "สวนสนุกระดับโลก",
      "price": 2190,
      "originalPrice": 2490,
      "rating": 4.95,
      "reviewsCount": 9200,
      "duration": "เต็มวัน",
      "includes": [
        "บัตรผ่านประตู 1 วันเต็ม",
        "โซน Super Nintendo World",
        "โซน The Wizarding World of Harry Potter"
      ],
      "description": "สวนสนุกระดับโลกอันดับหนึ่งของญี่ปุ่น ผจญภัยในปราสาทฮอกวอตส์ และขี่เรือเหาะมาริโอคาร์ท",
      "comboDiscount": "ยืนยันการจองตั๋วทันทีการันตีเข้าได้ 100%",
      "image": "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-osa-b1",
      "name": "Osaka Castle Park (สวนปราสาทโอซาก้า)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "category": "ประวัติศาสตร์ & ปราสาท (สวนเข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.9,
      "reviewsCount": 8800,
      "duration": "2-3 ชม.",
      "includes": [
        "เดินชมคูเมืองและกำแพงหินโบราณ",
        "จุดชมวิวรอบปราสาท",
        "สวนซากุระนิชิโนมารุ"
      ],
      "description": "แลนด์มาร์กสำคัญแห่งโอซาก้า ปราสาทสีขาวทองสง่างามท่ามกลางสวนต้นไม้ร่มรื่น",
      "comboDiscount": "บริเวณสวนสาธารณะเข้าฟรี",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-kyo-b1",
      "name": "Fushimi Inari Taisha (ศาลเจ้าเสาโทริอิพันต้น)",
      "city": "Kyoto",
      "cityTh": "เกียวโต",
      "category": "ศาลเจ้า & ธรรมชาติ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.98,
      "reviewsCount": 15000,
      "duration": "2-3 ชม.",
      "includes": [
        "อุโมงค์เสาโทริอิสีแดงพันต้น",
        "ศาลเจ้าสุนัขจิ้งจอก",
        "เดินเขาชมวิวเมืองเกียวโต"
      ],
      "description": "ศาลเจ้าชินโตที่มีชื่อเสียงที่สุดในญี่ปุ่น อุโมงค์เสาสีส้มแดงทอดยาวขึ้นยอดเขาอินาริ",
      "comboDiscount": "เปิดตลอด 24 ชั่วโมง เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-kyo-b2",
      "name": "Arashiyama Bamboo Grove (ป่าไผ่อาราชิยามะ)",
      "city": "Kyoto",
      "cityTh": "เกียวโต",
      "category": "ป่าไผ่ธรรมชาติ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.92,
      "reviewsCount": 9800,
      "duration": "2 ชม.",
      "includes": [
        "ทางเดินป่าไผ่สูงเสียดฟ้า",
        "สะพานโทเก็ตสึเคียว",
        "เสียงลมพัดต้นไผ่"
      ],
      "description": "เดินทอดน่องใต้ร่มเงาของต้นไผ่สีเขียวชอุ่ม ฟังเสียงกระซิบของสายลม สัมผัสความสงบแห่งเกียวโต",
      "comboDiscount": "เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sel-1",
      "name": "Lotte World Theme Park & Aquarium (โซล)",
      "city": "Seoul",
      "cityTh": "โซล",
      "category": "สวนสนุกในร่มยักษ์",
      "price": 1050,
      "originalPrice": 1350,
      "rating": 4.88,
      "reviewsCount": 5400,
      "duration": "เต็มวัน",
      "includes": [
        "ตั๋วสวนสนุกในร่มและกลางแจ้ง Magic Island",
        "พิพิธภัณฑ์สัตว์น้ำอควาเรียม",
        "รถไฟเหาะ French Revolution"
      ],
      "description": "สวนสนุกในร่มที่ใหญ่ที่สุดแห่งหนึ่งของโลก สนุกได้ทุกสภาพอากาศ พร้อมมุมถ่ายรูปปราสาทดิสนีย์เกาหลี",
      "comboDiscount": "ลดเพิ่ม 10% เมื่อจองพร้อมหอคอยโซลสกาย",
      "image": "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sel-b1",
      "name": "Gyeongbokgung Palace (พระราชวังเคียงบกกุง)",
      "city": "Seoul",
      "cityTh": "โซล",
      "category": "พระราชวังประวัติศาสตร์",
      "price": 80,
      "originalPrice": 80,
      "rating": 4.93,
      "reviewsCount": 11000,
      "duration": "2-3 ชม.",
      "includes": [
        "พิธีเปลี่ยนเวรยามทหารรักษาพระองค์",
        "ศาลาเคียงฮเวรูเหนือน้ำ",
        "ใส่ชุดฮันบกเข้าชมฟรี"
      ],
      "description": "พระราชวังหลวงที่ใหญ่ที่สุดของราชวงศ์โชซอน สวมชุดฮันบกถ่ายรูปสวยๆ เข้าชมฟรีไม่ต้องเสียค่าบัตร",
      "comboDiscount": "ใส่ชุดฮันบกเข้าฟรี 100%",
      "image": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sel-b2",
      "name": "Bukchon Hanok Village (หมู่บ้านฮันอก)",
      "city": "Seoul",
      "cityTh": "โซล",
      "category": "หมู่บ้านโบราณ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.87,
      "reviewsCount": 8900,
      "duration": "2 ชม.",
      "includes": [
        "บ้านโบราณอายุกว่า 600 ปี",
        "มุมถ่ายรูปยอดฮิตมองเห็น N Seoul Tower",
        "ตรอกซอกซอยสไตล์ดั้งเดิม"
      ],
      "description": "หมู่บ้านบ้านเรือนเกาหลีโบราณที่ยังคงมีคนอาศัยอยู่จริง เดินเล่นถ่ายรูปกับสถาปัตยกรรมคลาสสิก",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sel-b3",
      "name": "Cheonggyecheon Stream (คลองชองกเยชอน)",
      "city": "Seoul",
      "cityTh": "โซล",
      "category": "สวนสาธารณะริมน้ำ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.86,
      "reviewsCount": 7200,
      "duration": "1-2 ชม.",
      "includes": [
        "ธารน้ำใสทอดยาว 11 กิโลเมตร",
        "ไฟประดับน้ำพุตอนค่ำ",
        "ก้าวข้ามโขดหินกลางน้ำ"
      ],
      "description": "โอเอซิสกลางกรุงโซล เดินทอดน่องจุ่มน้ำคลายร้อน สัมผัสวิถีชีวิตคนเมืองสุดผ่อนคลาย",
      "comboDiscount": "เข้าฟรี 24 ชั่วโมง",
      "image": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-phk-1",
      "name": "ทริปล่องเรือยอชต์คาตามารัน เกาะพีพี & มาหยา VIP",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "category": "ทัวร์เกาะ & ดำน้ำอันดามัน",
      "price": 2350,
      "originalPrice": 2990,
      "rating": 4.96,
      "reviewsCount": 3800,
      "duration": "เต็มวัน (08:00 - 17:00)",
      "includes": [
        "เรือใบคาตามารันส่วนตัว",
        "อุปกรณ์ดำน้ำสนอร์เกิลครบเซ็ต",
        "บุฟเฟต์อาหารกลางวันซีฟู้ด",
        "เครื่องดื่มและผลไม้"
      ],
      "description": "ล่องเรือหรูชมความงามอ่าวมาหยา ถ้ำไวกิ้ง ปิเละลากูน และดำน้ำดูปะการังน้ำใสแจ๋ว",
      "comboDiscount": "ฟรีรถตู้รับส่งจากโรงแรมในภูเก็ต",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-phk-b1",
      "name": "Promthep Cape Sunset (แหลมพรหมเทพ ชมอาทิตย์ตก)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "category": "จุดชมวิวอันดามัน (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.94,
      "reviewsCount": 14000,
      "duration": "1.5 ชม.",
      "includes": [
        "จุดชมวิวพระอาทิตย์ตกดินที่สวยที่สุดในไทย",
        "ประภาคารกาญจนาภิเษก",
        "วิวทะเลอันดามันสุดลูกหูลูกตา"
      ],
      "description": "แลนด์มาร์กระดับไอคอนิกของภูเก็ต ชมแสงสีส้มทองลับขอบฟ้ากระทบเกลียวคลื่นอันดามัน",
      "comboDiscount": "เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-phk-b2",
      "name": "Big Buddha Phuket (พระใหญ่เขานาคเกิด)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "category": "ปูชนียสถาน & วิวมุมสูง (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.9,
      "reviewsCount": 8900,
      "duration": "2 ชม.",
      "includes": [
        "พระพุทธรูปหินอ่อนหยกขาวสูง 45 เมตร",
        "วิวอ่าวฉลองและแหลมพันวา 360 องศา",
        "บรรยากาศเงียบสงบ"
      ],
      "description": "กราบสักการะองค์พระใหญ่สีขาวสง่าบนยอดเขานาคเกิด มองเห็นทัศนียภาพทั่วทั้งเกาะภูเก็ต",
      "comboDiscount": "เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-kbv-b1",
      "name": "Emerald Pool & Hot Spring (สระมรกต & น้ำตกร้อน)",
      "city": "Krabi",
      "cityTh": "กระบี่",
      "category": "ธรรมชาติ & น้ำแร่ธรรมชาติ",
      "price": 200,
      "originalPrice": 200,
      "rating": 4.88,
      "reviewsCount": 4200,
      "duration": "ครึ่งวัน",
      "includes": [
        "สระน้ำใสสีเขียวมรกตกลางป่าพรุ",
        "แช่น้ำตกร้อนธรรมชาติ 38-40 องศา",
        "เส้นทางศึกษาธรรมชาติ"
      ],
      "description": "มหัศจรรย์สระว่ายน้ำธรรมชาติใจกลางผืนป่ากระบี่ น้ำใสจนเห็นทรายก้นสระ และผ่อนคลายในสปาน้ำแร่อุ่น",
      "comboDiscount": "ค่าเข้าอุทยานแห่งชาติ",
      "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-cnx-b1",
      "name": "Wat Phra That Doi Suthep (วัดพระธาตุดอยสุเทพ)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "category": "ปูชนียสถานศักดิ์สิทธิ์",
      "price": 30,
      "originalPrice": 30,
      "rating": 4.97,
      "reviewsCount": 16000,
      "duration": "2-3 ชม.",
      "includes": [
        "บันไดนาค 306 ขั้น",
        "พระธาตุทองคำสุกปลั่งล้านนา",
        "จุดชมวิวเมืองเชียงใหม่ทั้งเมือง"
      ],
      "description": "สัญลักษณ์คู่บ้านคู่เมืองเชียงใหม่ ขึ้นบันไดนาคไปกราบสักการะพระธาตุทองคำและชมวิวมุมสูง",
      "comboDiscount": "ค่าเข้าเพียง 30 บาท",
      "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-cnx-b2",
      "name": "Tha Phae Sunday Walking Street (ถนนคนเดินท่าแพ)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "category": "ถนนคนเดิน & วัฒนธรรม (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.91,
      "reviewsCount": 11000,
      "duration": "3 ชม.",
      "includes": [
        "สินค้าหัตถกรรมล้านนาแฮนด์เมด",
        "ดนตรีเปิดหมวกพื้นเมือง",
        "สตรีทฟู้ดของกินเมืองเหนือ"
      ],
      "description": "ถนนคนเดินวันอาทิตย์ที่ใหญ่และคึกคักที่สุดในเมืองไทย ช้อปงานฝีมือ ชิมขนมจีนน้ำเงี้ยว ไส้อั่ว",
      "comboDiscount": "เข้าฟรีทุกเย็นวันอาทิตย์",
      "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-bkk-b1",
      "name": "Wat Phra Kaew & Grand Palace (วัดพระแก้ว)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "category": "มรดกโลก & วัฒนธรรมสยาม",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.98,
      "reviewsCount": 22000,
      "duration": "3 ชม.",
      "includes": [
        "พระพุทธมหามณีรัตนปฏิมากร (พระแก้วมรกต)",
        "พระที่นั่งจักรีมหาปราสาท",
        "จิตรกรรมฝาผนังรามเกียรติ์"
      ],
      "description": "วัดคู่บ้านคู่เมืองของราชอาณาจักรไทย ความวิจิตรงดงามของสถาปัตยกรรมไทยทองอร่าม (คนไทยเข้าฟรี)",
      "comboDiscount": "คนไทยเข้าฟรีตลอดปี",
      "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-bkk-b2",
      "name": "Chao Phraya Express Boat (ล่องเรือด่วนเจ้าพระยา)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "category": "ท่องเที่ยวทางน้ำ & ชมวิวแม่น้ำ",
      "price": 30,
      "originalPrice": 30,
      "rating": 4.82,
      "reviewsCount": 6500,
      "duration": "1 ชม.",
      "includes": [
        "ชมพระปรางค์วัดอรุณราชวรารามริมน้ำ",
        "สะพานพระราม 8",
        "ไอคอนสยาม"
      ],
      "description": "นั่งเรือด่วนธงส้มรับลมเย็นสบาย ชมวิถีชีวิตริมสองฝั่งแม่น้ำเจ้าพระยาและวัดวาอารามในราคา 30 บาท",
      "comboDiscount": "ค่าโดยสารเรือด่วน 16-30 บาท",
      "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sin-1",
      "name": "Gardens by the Bay & Cloud Forest",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "category": "สวนพฤกษศาสตร์ล้ำอนาคต",
      "price": 890,
      "originalPrice": 1100,
      "rating": 4.95,
      "reviewsCount": 8200,
      "duration": "3 ชม.",
      "includes": [
        "โดมปรับอากาศ Flower Dome",
        "น้ำตกในร่ม Cloud Forest",
        "การแสดงไฟ Supertree"
      ],
      "description": "สวนพฤกษศาสตร์ระดับโลก ชมน้ำตกในร่มสูง 35 เมตรท่ามกลางหมอก และทางเดินลอยฟ้า OCBC Skyway",
      "comboDiscount": "การแสดงไฟ Supertree ยามค่ำคืนเข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sin-b1",
      "name": "Supertree Grove Light Show (การแสดงไฟฟรี)",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "category": "การแสดงแสงสีเสียง (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.94,
      "reviewsCount": 9500,
      "duration": "45 นาที",
      "includes": [
        "ต้นไม้ยักษ์ Supertree 18 ต้น",
        "การแสดง Garden Rhapsody แสงสีเสียง",
        "ลมพัดเย็นสบายริมอ่าว"
      ],
      "description": "การแสดงแสงสีเสียงตระการตาใต้ต้นไม้ยักษ์เรืองแสง จัดแสดงวันละ 2 รอบ ชมฟรีไม่มีค่าใช้จ่าย",
      "comboDiscount": "ชมฟรีทุกคืนรอบ 19:45 และ 20:45 น.",
      "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-par-b1",
      "name": "Eiffel Tower Gardens & Champ de Mars (ชมหอไอเฟล)",
      "city": "Paris",
      "cityTh": "ปารีส",
      "category": "แลนด์มาร์กโรแมนติก (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.97,
      "reviewsCount": 18000,
      "duration": "2 ชม.",
      "includes": [
        "ลานสนามหญ้าช็องเดอมาร์ส",
        "วิวหอไอเฟลเต็มตา",
        "การแสดงไฟกะพริบระยิบระยับยามค่ำคืน"
      ],
      "description": "ปิกนิกบนสนามหญ้าใต้หอไอเฟล ชิมครัวซองต์และไวน์ฝรั่งเศส รอชมไฟระยิบระยับทุกต้นชั่วโมงยามค่ำคืน",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-par-b2",
      "name": "Louvre Pyramid Courtyard (ลานพีระมิดลูฟวร์)",
      "city": "Paris",
      "cityTh": "ปารีส",
      "category": "ศิลปะ & สถาปัตยกรรม (ลานเข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.93,
      "reviewsCount": 12500,
      "duration": "1.5 ชม.",
      "includes": [
        "พีระมิดแก้วไอคอนิกของไอ. เอ็ม. เป",
        "พระราชวังลูฟวร์โบราณ",
        "สระน้ำสะท้อนแสง"
      ],
      "description": "ถ่ายรูปมุมสุดคลาสสิกกับพีระมิดแก้วที่ลานหน้าพระราชวังลูฟวร์ เข้าชมบริเวณลานด้านนอกได้ฟรี",
      "comboDiscount": "เข้าชมบริเวณลานฟรี 24 ชม.",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-lon-b1",
      "name": "Buckingham Palace Changing of the Guard",
      "city": "London",
      "cityTh": "ลอนดอน",
      "category": "พิธีหลวงทหารรักษาพระองค์ (ชมฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.91,
      "reviewsCount": 9800,
      "duration": "1.5 ชม.",
      "includes": [
        "พิธีเปลี่ยนเวรยามทหารรักษาพระองค์สวมหมวกขนหมี",
        "ขบวนดุริยางค์ทหารม้า",
        "หน้าพระราชวังบักกิงแฮม"
      ],
      "description": "สัมผัสวัฒนธรรมราชสำนักอังกฤษโบราณอันสง่างาม ชมขบวนพาเหรดทหารม้าอย่างใกล้ชิดฟรี",
      "comboDiscount": "ชมฟรี",
      "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-bkk-b3",
      "name": "Wat Arun Ratchawararam (วัดอรุณราชวราราม ราชวรมหาวิหาร)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "category": "มรดกวัฒนธรรม & ถ่ายรูปชุดไทย",
      "price": 100,
      "originalPrice": 100,
      "rating": 4.95,
      "reviewsCount": 26000,
      "duration": "2 ชม.",
      "includes": [
        "พระปรางค์ประดับกระเบื้องเคลือบโบราณ",
        "จุดชมวิวริมแม่น้ำเจ้าพระยา",
        "เช่าชุดไทยถ่ายรูปริมน้ำ (คนไทยเข้าฟรี)"
      ],
      "description": "พระปรางค์วัดอรุณสีขาวประดับกระเบื้องลายครามริมแม่น้ำเจ้าพระยา สัญลักษณ์ความงามของสยามประเทศ มุมถ่ายรูปชุดไทยยอดฮิตของนักท่องเที่ยวทั่วโลก",
      "comboDiscount": "คนไทยเข้าฟรี ชาวต่างชาติ 100 บาท",
      "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-bkk-b4",
      "name": "Chatuchak Weekend Market (ตลาดนัดจตุจักร)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "category": "ตลาดนัดสุดสัปดาห์ใหญ่ที่สุดในโลก (เดินฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.88,
      "reviewsCount": 38000,
      "duration": "4 ชม.",
      "includes": [
        "ร้านค้ากว่า 15,000 ร้าน",
        "โซนเสื้อผ้า แฟชั่นวินเทจ",
        "สตรีทฟู้ด ไอติมกะทิมะพร้าวอ่อน"
      ],
      "description": "สวรรค์ของนักช้อปปิ้งและคนรักของวินเทจ มีร้านค้ากว่า 15,000 แผง ครบทั้งแฟชั่น ของแต่งบ้าน งานคราฟต์ และอาหารอร่อย เดินชมฟรีไม่มีค่าเข้า",
      "comboDiscount": "เข้าชมฟรีทุกวันเสาร์-อาทิตย์",
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-bkk-b5",
      "name": "Yaowarat Chinatown Night Food Walk (สตรีทฟู้ดเยาวราชยามค่ำคืน)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "category": "สตรีทฟู้ดระดับโลก & แสงสีนีออน (เดินฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.93,
      "reviewsCount": 32000,
      "duration": "3 ชม.",
      "includes": [
        "ป้ายไฟนีออนมังกรเยาวราช",
        "ร้านขนมปังปิ้งไส้ทะลัก",
        "กวยจั๊บนายเอ็ก ก๋วยเตี๋ยวคั่วไก่"
      ],
      "description": "ถนนคนเดินสายอาหารที่คึกคักที่สุดในเอเชีย ดื่มด่ำบรรยากาศแสงสีนีออนและกลิ่นหอมอาหารริมทาง ถ่ายรูปสตรีทโฟโต้สุดเท่",
      "comboDiscount": "เดินชมบรรยากาศฟรี",
      "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-bkk-b6",
      "name": "Lumphini Park & Monitor Lizards (สวนลุมพินี โอเอซิสใจกลางเมือง)",
      "city": "Bangkok",
      "cityTh": "กรุงเทพฯ",
      "category": "สวนสาธารณะ & พักผ่อนธรรมชาติ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.78,
      "reviewsCount": 14000,
      "duration": "2 ชม.",
      "includes": [
        "ปั่นเรือเป็ดในทะเลสาบ (40 ฿)",
        "ชมตัวเงินตัวทองขวัญใจนักท่องเที่ยว",
        "ลู่วิ่งใต้ร่มเงาต้นไม้ใหญ่"
      ],
      "description": "ปอดสีเขียวขนาดใหญ่ใจกลางกรุงเทพฯ สัมผัสความร่มรื่น นั่งปิกนิก ปั่นเรือเป็ด และชมสัตว์ประจำถิ่นที่เป็นมิตร",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-cnx-b3",
      "name": "Tha Phae Gate & Walking Street (ประตูท่าแพ & ถนนคนเดินวันอาทิตย์)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "category": "ประวัติศาสตร์ล้านนา & ถนนคนเดิน (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.86,
      "reviewsCount": 16500,
      "duration": "3 ชม.",
      "includes": [
        "กำแพงอิฐแดงโบราณและฝูงนกพิราบ",
        "ถนนคนเดินวันอาทิตย์ยาว 1 กม.",
        "งานฝีมือแฮนด์เมด อาหารพื้นเมือง"
      ],
      "description": "จุดนัดพบยอดฮิตของเชียงใหม่ ถ่ายรูปกับแนวกำแพงเมืองเก่าอิฐสีส้ม และช้อปปิ้งของทำมือราคาสบายกระเป๋าในคืนวันอาทิตย์",
      "comboDiscount": "เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-cnx-b4",
      "name": "Ang Ka Nature Trail Doi Inthanon (เส้นทางศึกษาธรรมชาติอ่างกา ดอยอินทนนท์)",
      "city": "Chiang Mai",
      "cityTh": "เชียงใหม่",
      "category": "ป่าโบราณดึกดำบรรพ์ & อากาศหนาวเย็น",
      "price": 50,
      "originalPrice": 50,
      "rating": 4.96,
      "reviewsCount": 8400,
      "duration": "2 ชม.",
      "includes": [
        "ป่าเมฆมอสเฟิร์นเขียวชอุ่มคลุมต้นไม้",
        "จุดสูงสุดแดนสยาม 2,565 เมตร",
        "อากาศหนาวเย็นตลอดทั้งปี 5-15°C"
      ],
      "description": "ทางเดินสะพานไม้ลัดเลาะในผืนป่าดึกดำบรรพ์ที่สมบูรณ์ที่สุดของไทย สัมผัสหมอกขาวและพืชพันธุ์หายาก",
      "comboDiscount": "ค่าเข้าอุทยานคนไทย 50 บาท",
      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-hkt-b2",
      "name": "Phuket Big Buddha (พระพุทธมิ่งมงคลเอกนาคคีรี ยอดเขานาคเกิด)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "category": "พระใหญ่หินอ่อนขาว & วิว 360 องศา (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.89,
      "reviewsCount": 19800,
      "duration": "2 ชม.",
      "includes": [
        "องค์พระหินอ่อนหยกขาวสูง 45 เมตร",
        "จุดชมวิวพาโนรามาอ่าวฉลองและแหลมพรหมเทพ",
        "ระฆังนำโชคและรับศีลพร"
      ],
      "description": "พระพุทธรูปปางมารวิชัยองค์มหึมาบนยอดเขาสูง มองเห็นวิวเกาะภูเก็ตได้เกือบทั้งเกาะ ลมพัดเย็นสบาย เข้าชมฟรี",
      "comboDiscount": "เข้าชมฟรี มีจุดทำบุญตามศรัทธา",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-hkt-b3",
      "name": "Promthep Cape Sunset (แหลมพรหมเทพ ชมพระอาทิตย์ตก)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "category": "จุดชมวิวพระอาทิตย์ตกที่สวยที่สุดในไทย (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.94,
      "reviewsCount": 28000,
      "duration": "2 ชม.",
      "includes": [
        "วิวพระอาทิตย์ตกลับขอบฟ้าทะเลอันดามัน",
        "ประภาคารกาญจนาภิเษก",
        "เดินลงปลายแหลมถ่ายรูปยอดหญ้าสีทอง"
      ],
      "description": "แลนด์มาร์กอันดับ 1 ของภูเก็ต บรรยากาศแสนโรแมนติกยามเย็นเมื่อท้องฟ้าเปลี่ยนเป็นสีส้มทองสะท้อนผิวน้ำทะเล",
      "comboDiscount": "เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-hkt-b4",
      "name": "Old Phuket Town Sino-Portuguese Walk (ย่านเมืองเก่าภูเก็ต ชิโนโปรตุกีส)",
      "city": "Phuket",
      "cityTh": "ภูเก็ต",
      "category": "สถาปัตยกรรมโบราณ & สตรีทอาร์ต (เดินฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.87,
      "reviewsCount": 15400,
      "duration": "2.5 ชม.",
      "includes": [
        "ตึกแถวโบราณสีพาสเทลถนนถลาง",
        "ภาพวาดสตรีทอาร์ตน้องมาร์ดี",
        "คาเฟ่เก๋ในตึกเก่ากว่า 100 ปี"
      ],
      "description": "เดินทอดน่องถ่ายรูปกับสถาปัตยกรรมผสมผสานระหว่างจีนและตะวันตก ดื่มด่ำมนต์เสน่ห์ประวัติศาสตร์เหมืองแร่ดีบุก",
      "comboDiscount": "เดินชมฟรี",
      "image": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-kbv-b2",
      "name": "Tiger Cave Temple (วัดถ้ำเสือ กระบี่ บันได 1,260 ขั้น)",
      "city": "Krabi",
      "cityTh": "กระบี่",
      "category": "ท้าทายพิชิตยอดเขา & ทะเลหมอก (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.9,
      "reviewsCount": 11500,
      "duration": "3 ชม.",
      "includes": [
        "เดินขึ้นบันได 1,260 ขั้นสู่ยอดเขา",
        "พระพุทธรูปทองคำบนยอดเขาหินปูน",
        "วิว 360 องศาเมืองกระบี่และทิวเขา"
      ],
      "description": "วัดที่มีชื่อเสียงด้านการปฏิบัติธรรมและบันไดทดสอบพลังใจ ขึ้นไปชมวิวทะเลหมอกยามเช้าและวิวเขาหินปูนสุดอลังการ",
      "comboDiscount": "เข้าชมฟรี",
      "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-kbv-b3",
      "name": "Railay Beach & Phra Nang Cave (หาดไร่เลย์ & ถ้ำพระนาง กระบี่)",
      "city": "Krabi",
      "cityTh": "กระบี่",
      "category": "หาดทรายขาว หน้าผาหินปูน & ปีนผา",
      "price": 100,
      "originalPrice": 100,
      "rating": 4.95,
      "reviewsCount": 22000,
      "duration": "4 ชม.",
      "includes": [
        "นั่งเรือหางยาวข้ามฟากจากอ่าวนาง (100 ฿)",
        "หาดทรายขาวละเอียดและหน้าผาหินย้อย",
        "จุดปีนผาระดับโลก"
      ],
      "description": "ชายหาดที่เข้าถึงได้เฉพาะทางเรือเท่านั้น ล้อมรอบด้วยหน้าผาหินปูนสูงตระหง่าน น้ำทะเลใสแจ๋ว และถ้ำพระนางอันศักดิ์สิทธิ์",
      "comboDiscount": "ค่าเรือหางยาวไปกลับเพียง 200 บาท",
      "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b5",
      "name": "Meiji Jingu Shrine (ศาลเจ้าเมจิ ย่านฮาราจูกุ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "ป่าสงบใจกลางเมือง & วัฒนธรรมชินโต (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.89,
      "reviewsCount": 31000,
      "duration": "2 ชม.",
      "includes": [
        "เสาโทริอิไม้ซีดาร์ยักษ์",
        "ถังสาเกญี่ปุ่นโบราณเรียงราย",
        "ป่าธรรมชาติกว่า 100,000 ต้น"
      ],
      "description": "ศาลเจ้าชินโตที่สำคัญที่สุดของโตเกียว เงียบสงบจนลืมไปว่าอยู่ใจกลางเมืองติดกับฮาราจูกุ เข้าชมฟรีเพื่อขอพรเสริมสิริมงคล",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b6",
      "name": "Ueno Onshi Park & Shinobazu Pond (สวนอุเอโนะ & บึงชิโนบาซุ)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "สวนสาธารณะ ซากุระ & บึงบัว (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.82,
      "reviewsCount": 24000,
      "duration": "2.5 ชม.",
      "includes": [
        "จุดชมซากุระชื่อดังกว่า 1,000 ต้น",
        "บึงบัวชิโนบาซุขนาดใหญ่",
        "ตลาดอะเมโยโกะติดกับสวน"
      ],
      "description": "สวนสาธารณะขนาดใหญ่ยอดฮิตสำหรับครอบครัวและนักท่องเที่ยว ปิกนิกใต้ต้นซากุระ เดินช้อปของกินตลาดอะเมโยโกะราคาถูก",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-tok-b7",
      "name": "Odaiba Seaside Park & Life-Sized Unicorn Gundam (โอไดบะ & หุ่นกันดั้มยักษ์)",
      "city": "Tokyo",
      "cityTh": "โตเกียว",
      "category": "ริมอ่าวโตเกียว หุ่นกันดั้ม & เทพีเสรีภาพจำลอง (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.88,
      "reviewsCount": 22000,
      "duration": "2 ชม.",
      "includes": [
        "หุ่น Unicorn Gundam ขนาดเท่าจริงสูง 19.7 เมตร",
        "การแปลงร่างแสงสีของกันดั้ม",
        "วิวสะพานสายรุ้ง Rainbow Bridge ริมอ่าว"
      ],
      "description": "ชมการแปลงร่างของหุ่นกันดั้มยักษ์สเกล 1:1 หน้าห้าง DiverCity และเดินเล่นรับลมริมชายหาดเทียมโอไดบะชมสะพานสายรุ้ง",
      "comboDiscount": "ชมฟรี",
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-osa-b2",
      "name": "Dotonbori Glico Running Man (ป้ายกูลิโกะ โดทงโบริ โอซาก้า)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "category": "แลนด์มาร์กไอคอนิก & คลองโดทงโบริ (ชมฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.91,
      "reviewsCount": 42000,
      "duration": "1.5 ชม.",
      "includes": [
        "ถ่ายรูปท่ากูลิโกะบนสะพานเอบิสึ",
        "ป้ายไฟนีออนปูยักษ์ คานิดาราคุ",
        "ชิมทาโกะยากิริมคลอง"
      ],
      "description": "จุดถ่ายรูปที่ใครมาโอซาก้าต้องไม่พลาด ยกแขนวิ่งตามป้ายกูลิโกะยักษ์ ท่ามกลางบรรยากาศริมคลองที่คึกคักไปด้วยผู้คนและของกิน",
      "comboDiscount": "ชมฟรี",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-osa-b3",
      "name": "Osaka Castle Park (สวนปราสาทโอซาก้า สวนสาธารณะรอบนอก)",
      "city": "Osaka",
      "cityTh": "โอซาก้า",
      "category": "ปราสาทโบราณ & คูเมืองประวัติศาสตร์ (รอบนอกเข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.9,
      "reviewsCount": 35000,
      "duration": "2 ชม.",
      "includes": [
        "คูเมืองหินโบราณขนาดมหึมา",
        "สวนต้นบ๊วยและซากุระ",
        "จุดถ่ายรูปหน้าตัวปราสาทโอซาก้าทองอร่าม"
      ],
      "description": "พื้นที่สวนสาธารณะกว้างขวางรอบปราสาทโอซาก้า มีต้นซากุระกว่า 3,000 ต้น ชมความงามของกำแพงหินและปราสาทภายนอกได้ฟรี",
      "comboDiscount": "เข้าชมบริเวณสวนฟรี (เข้าในตัวปราสาท 600 JPY)",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sel-b4",
      "name": "Hangang Park Banpo Rainbow Bridge (สวนแม่น้ำฮัน สะพานสายรุ้งพันโพ)",
      "city": "Seoul",
      "cityTh": "โซล",
      "category": "ปิกนิกกินรามยอนริมแม่น้ำฮัน & น้ำพุสายรุ้ง (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.91,
      "reviewsCount": 22500,
      "duration": "2.5 ชม.",
      "includes": [
        "ตู้ต้มรามยอนอัตโนมัติริมแม่น้ำฮัน (สั่งกินเอง)",
        "การแสดงน้ำพุสายรุ้งริมสะพาน Banpo Bridge",
        "เช่าจักรยานปั่นเลียบแม่น้ำ"
      ],
      "description": "กิจกรรมสุดฮิตตามซีรีส์เกาหลี ปูเสื่อปิกนิก กินไก่ทอดเบียร์และรามยอนร้อนๆ ริมแม่น้ำฮัน พร้อมชมการแสดงน้ำพุประกอบแสงสีเสียงฟรี",
      "comboDiscount": "เข้าฟรี",
      "image": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-sin-b2",
      "name": "Merlion Park (สวนเมอร์ไลออน อ่าวมารีน่าเบย์)",
      "city": "Singapore",
      "cityTh": "สิงคโปร์",
      "category": "แลนด์มาร์กรูปปั้นสิงโตพ่นน้ำ (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.85,
      "reviewsCount": 36000,
      "duration": "1 ชม.",
      "includes": [
        "รูปปั้นสิงโตทะเลพ่นน้ำ Merlion สูง 8.6 เมตร",
        "วิวตึก Marina Bay Sands ฝั่งตรงข้าม",
        "ลมทะเลเย็นสบายริมอ่าว"
      ],
      "description": "สัญลักษณ์ระดับไอคอนิกของสิงคโปร์ แวะถ่ายรูปท่าอ้าปากรับน้ำจากสิงโตทะเล และชมวิวอ่าวมารีน่าเบย์แบบ 180 องศาโดยไม่มีค่าใช้จ่าย",
      "comboDiscount": "เข้าชมฟรี 24 ชม.",
      "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-par-b3",
      "name": "Basilique du Sacre-Coeur de Montmartre (มหาวิหารซาเคร-เกอร์ มงมาตร์)",
      "city": "Paris",
      "cityTh": "ปารีส",
      "category": "วิหารสีขาวบนยอดเขา & จุดชมวิวปารีส (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.92,
      "reviewsCount": 31000,
      "duration": "2 ชม.",
      "includes": [
        "มหาวิหารหินทราเวอร์ทีนสีขาวบริสุทธิ์",
        "ขั้นบันไดชมวิวมุมสูงทั่วทั้งปารีส",
        "ย่านศิลปินวาดภาพริมทางมงมาตร์"
      ],
      "description": "ตั้งอยู่บนเนินเขาที่สูงที่สุดของปารีส นั่งชมพระอาทิตย์ตกดินพร้อมฟังเสียงดนตรีสดจากศิลปินเปิดหมวก บรรยากาศสุดแสนโรแมนติก",
      "comboDiscount": "เข้าชมภายในวิหารและลานหน้าฟรี",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-lon-b2",
      "name": "British Museum (พิพิธภัณฑ์บริติช ลอนดอน)",
      "city": "London",
      "cityTh": "ลอนดอน",
      "category": "พิพิธภัณฑ์ประวัติศาสตร์มนุษยชาติระดับโลก (เข้าฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.96,
      "reviewsCount": 42000,
      "duration": "3.5 ชม.",
      "includes": [
        "ศิลาโรเซตตา (Rosetta Stone)",
        "มัมมี่อียิปต์โบราณและโลงศพทองคำ",
        "หลังคาโดมกระจกยักษ์ Great Court"
      ],
      "description": "หนึ่งในพิพิธภัณฑ์ที่ยิ่งใหญ่ที่สุดในโลก รวบรวมโบราณวัตถุล้ำค่ากว่า 8 ล้านชิ้นจากทุกอารยธรรม เปิดให้ทุกคนเข้าชมฟรีอย่างเท่าเทียม",
      "comboDiscount": "เข้าชมฟรีตลอดปี",
      "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-lon-b3",
      "name": "Tower Bridge Walk & Thames Riverside (เดินข้ามสะพานทาวเวอร์บริดจ์)",
      "city": "London",
      "cityTh": "ลอนดอน",
      "category": "สถาปัตยกรรมวิกตอเรียน & ริมแม่น้ำเทมส์ (เดินฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.92,
      "reviewsCount": 36000,
      "duration": "1.5 ชม.",
      "includes": [
        "เดินบนสะพานข้ามแม่น้ำเทมส์",
        "ชมหอคอยคู่สไตล์โกธิก",
        "จุดถ่ายรูปสะพานยกเปิดให้เรือแล่นผ่าน"
      ],
      "description": "สะพานเปิด-ปิดที่เป็นสัญลักษณ์แห่งกรุงลอนดอน ข้ามฝั่งแม่น้ำเทมส์พร้อมชมทัศนียภาพเรือแล่นผ่านและตึกสูง The Shard",
      "comboDiscount": "เดินข้ามสะพานฟรี",
      "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-swi-b1",
      "name": "Lauterbrunnen Valley & Staubbach Falls (หุบเขาน้ำตกเลาเทอร์บรุนเนิน)",
      "city": "Switzerland",
      "cityTh": "สวิตเซอร์แลนด์",
      "category": "หุบเขาน้ำตก 72 สาย & หมู่บ้านเทพนิยาย (ชมฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.98,
      "reviewsCount": 21000,
      "duration": "3 ชม.",
      "includes": [
        "น้ำตกชเตาบ์บาคตกลงมาจากหน้าผาสูง 300 เมตร",
        "บ้านไม้สไตล์ชาเลต์สวิสดั้งเดิม",
        "วิวเทือกเขาแอลป์หิมะ"
      ],
      "description": "หุบเขาที่ได้ชื่อว่าเป็นแรงบันดาลใจแห่งดินแดนเอลฟ์ใน The Lord of the Rings เดินเล่นชมน้ำตกและทุ่งหญ้าเขียวขจีฟรี",
      "comboDiscount": "เดินชมหุบเขาและหมู่บ้านฟรี",
      "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": "a-swi-b2",
      "name": "Kapellbrücke Chapel Bridge Lucerne (สะพานไม้ชาเปล ลูเซิร์น)",
      "city": "Switzerland",
      "cityTh": "สวิตเซอร์แลนด์",
      "category": "สะพานไม้เก่าแก่ที่สุดในยุโรป & หอคอยน้ำ (ชมฟรี)",
      "price": 0,
      "originalPrice": 0,
      "rating": 4.93,
      "reviewsCount": 18500,
      "duration": "1.5 ชม.",
      "includes": [
        "สะพานไม้หลังคาคลุมจากศตวรรษที่ 14",
        "ภาพวาดสามเหลี่ยมใต้หลังคากว่า 100 ภาพ",
        "ฝูงหงส์ขาวในทะเลสาบลูเซิร์น"
      ],
      "description": "แลนด์มาร์กคลาสสิกของเมืองลูเซิร์น สะพานไม้ข้ามแม่น้ำรอยส์ประดับดอกไม้หลากสีสัน ถ่ายรูปคู่กับหอคอยแปดเหลี่ยมกลางน้ำ",
      "comboDiscount": "เดินชมฟรีตลอดเวลา",
      "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
    }
  ],
  "flights": [
    {
      "id": "f-th-1",
      "airline": "Thai AirAsia (แอร์เอเชีย)",
      "flightNo": "FD 3025",
      "from": "DMK (ดอนเมือง)",
      "to": "CNX (เชียงใหม่)",
      "destinationCity": "Chiang Mai",
      "destinationCityTh": "เชียงใหม่",
      "departureTime": "06:30",
      "arrivalTime": "07:45",
      "duration": "1 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 890,
      "baggage": "7 กก. ถือขึ้นเครื่อง",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-2",
      "airline": "Nok Air (นกแอร์)",
      "flightNo": "DD 124",
      "from": "DMK (ดอนเมือง)",
      "to": "CNX (เชียงใหม่)",
      "destinationCity": "Chiang Mai",
      "destinationCityTh": "เชียงใหม่",
      "departureTime": "08:15",
      "arrivalTime": "09:30",
      "duration": "1 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 950,
      "baggage": "7 กก. + น้ำดื่มฟรี",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-3",
      "airline": "Thai Vietjet (เวียตเจ็ท)",
      "flightNo": "VZ 102",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "CNX (เชียงใหม่)",
      "destinationCity": "Chiang Mai",
      "destinationCityTh": "เชียงใหม่",
      "departureTime": "10:30",
      "arrivalTime": "11:45",
      "duration": "1 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 920,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-4",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 110",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "CNX (เชียงใหม่)",
      "destinationCity": "Chiang Mai",
      "destinationCityTh": "เชียงใหม่",
      "departureTime": "14:15",
      "arrivalTime": "15:30",
      "duration": "1 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 2150,
      "baggage": "20 กก. โหลดฟรี",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-5",
      "airline": "Thai AirAsia",
      "flightNo": "FD 3005",
      "from": "DMK (ดอนเมือง)",
      "to": "HKT (ภูเก็ต)",
      "destinationCity": "Phuket",
      "destinationCityTh": "ภูเก็ต",
      "departureTime": "06:50",
      "arrivalTime": "08:15",
      "duration": "1 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 990,
      "baggage": "7 กก. ถือขึ้นเครื่อง",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-6",
      "airline": "Thai Lion Air (ไทย ไลอ้อน แอร์)",
      "flightNo": "SL 756",
      "from": "DMK (ดอนเมือง)",
      "to": "HKT (ภูเก็ต)",
      "destinationCity": "Phuket",
      "destinationCityTh": "ภูเก็ต",
      "departureTime": "11:20",
      "arrivalTime": "12:45",
      "duration": "1 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 1050,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-7",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 208",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "HKT (ภูเก็ต)",
      "destinationCity": "Phuket",
      "destinationCityTh": "ภูเก็ต",
      "departureTime": "10:30",
      "arrivalTime": "11:55",
      "duration": "1 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 2450,
      "baggage": "20 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-8",
      "airline": "Bangkok Airways (บางกอกแอร์เวย์ส)",
      "flightNo": "PG 275",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "HKT (ภูเก็ต)",
      "destinationCity": "Phuket",
      "destinationCityTh": "ภูเก็ต",
      "departureTime": "13:40",
      "arrivalTime": "15:05",
      "duration": "1 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Boutique Lounge",
      "price": 2850,
      "baggage": "20 กก. + เลานจ์ข้าวต้มมัดฟรี",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-9",
      "airline": "Thai AirAsia",
      "flightNo": "FD 3229",
      "from": "DMK (ดอนเมือง)",
      "to": "KBV (กระบี่)",
      "destinationCity": "Krabi",
      "destinationCityTh": "กระบี่",
      "departureTime": "07:20",
      "arrivalTime": "08:40",
      "duration": "1 ชม. 20 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 950,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-10",
      "airline": "Bangkok Airways",
      "flightNo": "PG 125",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "USM (เกาะสมุย)",
      "destinationCity": "Samui",
      "destinationCityTh": "เกาะสมุย",
      "departureTime": "09:30",
      "arrivalTime": "10:35",
      "duration": "1 ชม. 05 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Boutique Lounge",
      "price": 3900,
      "baggage": "20 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-1",
      "airline": "Thai AirAsia X",
      "flightNo": "XJ 600",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "NRT (โตเกียวนาริตะ)",
      "destinationCity": "Tokyo",
      "destinationCityTh": "โตเกียว",
      "departureTime": "23:50",
      "arrivalTime": "08:00 (+1)",
      "duration": "6 ชม. 10 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 8200,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-2",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 642",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "NRT (โตเกียวนาริตะ)",
      "destinationCity": "Tokyo",
      "destinationCityTh": "โตเกียว",
      "departureTime": "23:55",
      "arrivalTime": "08:10 (+1)",
      "duration": "6 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 15800,
      "baggage": "30 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-3",
      "airline": "All Nippon Airways (ANA)",
      "flightNo": "NH 850",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "HND (โตเกียวฮาเนดะ)",
      "destinationCity": "Tokyo",
      "destinationCityTh": "โตเกียว",
      "departureTime": "07:10",
      "arrivalTime": "15:05",
      "duration": "5 ชม. 55 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 18500,
      "baggage": "2 ชิ้น (46 กก.)",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-4",
      "airline": "Japan Airlines (JAL)",
      "flightNo": "JL 034",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "HND (โตเกียวฮาเนดะ)",
      "destinationCity": "Tokyo",
      "destinationCityTh": "โตเกียว",
      "departureTime": "21:55",
      "arrivalTime": "06:05 (+1)",
      "duration": "6 ชม. 10 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 18200,
      "baggage": "2 ชิ้น (46 กก.)",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-5",
      "airline": "Peach Aviation",
      "flightNo": "MM 92",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "KIX (โอซาก้า คันไซ)",
      "destinationCity": "Osaka",
      "destinationCityTh": "โอซาก้า",
      "departureTime": "01:10",
      "arrivalTime": "08:55",
      "duration": "5 ชม. 45 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 7900,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-6",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 672",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "KIX (โอซาก้า คันไซ)",
      "destinationCity": "Osaka",
      "destinationCityTh": "โอซาก้า",
      "departureTime": "11:00",
      "arrivalTime": "18:30",
      "duration": "5 ชม. 30 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 16200,
      "baggage": "30 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-jp-7",
      "airline": "Thai Airways",
      "flightNo": "TG 670",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "CTS (ซัปโปโร ฮอกไกโด)",
      "destinationCity": "Hokkaido",
      "destinationCityTh": "ฮอกไกโด",
      "departureTime": "23:45",
      "arrivalTime": "08:30 (+1)",
      "duration": "6 ชม. 45 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 19800,
      "baggage": "30 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-kr-1",
      "airline": "Thai AirAsia X",
      "flightNo": "XJ 700",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "ICN (โซล อินชอน)",
      "destinationCity": "Seoul",
      "destinationCityTh": "โซล",
      "departureTime": "02:35",
      "arrivalTime": "10:05",
      "duration": "5 ชม. 30 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 6900,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-kr-2",
      "airline": "Korean Air (โคเรียนแอร์)",
      "flightNo": "KE 652",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "ICN (โซล อินชอน)",
      "destinationCity": "Seoul",
      "destinationCityTh": "โซล",
      "departureTime": "23:30",
      "arrivalTime": "06:55 (+1)",
      "duration": "5 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 14500,
      "baggage": "23 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-kr-3",
      "airline": "Asiana Airlines (เอเชียนา)",
      "flightNo": "OZ 742",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "ICN (โซล อินชอน)",
      "destinationCity": "Seoul",
      "destinationCityTh": "โซล",
      "departureTime": "01:10",
      "arrivalTime": "08:35",
      "duration": "5 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 13900,
      "baggage": "23 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-sg-1",
      "airline": "Scoot (สกู๊ต)",
      "flightNo": "TR 611",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "SIN (สิงคโปร์ ชางงี)",
      "destinationCity": "Singapore",
      "destinationCityTh": "สิงคโปร์",
      "departureTime": "17:00",
      "arrivalTime": "20:30",
      "duration": "2 ชม. 30 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 2650,
      "baggage": "10 กก. ถือขึ้นเครื่อง",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-sg-2",
      "airline": "Singapore Airlines (สิงคโปร์ แอร์ไลน์ส)",
      "flightNo": "SQ 709",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "SIN (สิงคโปร์ ชางงี)",
      "destinationCity": "Singapore",
      "destinationCityTh": "สิงคโปร์",
      "departureTime": "15:30",
      "arrivalTime": "19:00",
      "duration": "2 ชม. 30 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 6800,
      "baggage": "25 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-id-1",
      "airline": "AirAsia",
      "flightNo": "QZ 521",
      "from": "DMK (ดอนเมือง)",
      "to": "DPS (บาหลี เดนปาซาร์)",
      "destinationCity": "Bali",
      "destinationCityTh": "บาหลี",
      "departureTime": "06:15",
      "arrivalTime": "11:35",
      "duration": "4 ชม. 20 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 4200,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-mv-1",
      "airline": "AirAsia",
      "flightNo": "AK 72",
      "from": "DMK (ดอนเมือง)",
      "to": "MLE (มัลดีฟส์ มาเล่)",
      "destinationCity": "Maldives",
      "destinationCityTh": "มัลดีฟส์",
      "departureTime": "09:30",
      "arrivalTime": "11:45",
      "duration": "4 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 5900,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-eu-1",
      "airline": "Qatar Airways (กาตาร์ แอร์เวย์ส)",
      "flightNo": "QR 837",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "CDG (ปารีส ชาร์ลเดอโกล)",
      "destinationCity": "Paris",
      "destinationCityTh": "ปารีส",
      "departureTime": "02:15",
      "arrivalTime": "13:40",
      "duration": "16 ชม. 25 นาที",
      "stops": "แวะพักโดฮา 2 ชม.",
      "cabinClass": "Full Service",
      "price": 27500,
      "baggage": "30 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-eu-2",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 930",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "CDG (ปารีส ชาร์ลเดอโกล)",
      "destinationCity": "Paris",
      "destinationCityTh": "ปารีส",
      "departureTime": "00:05",
      "arrivalTime": "07:05",
      "duration": "13 ชม. 00 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 33800,
      "baggage": "30 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-eu-3",
      "airline": "EVA Air (อีวีเอ แอร์)",
      "flightNo": "BR 067",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "LHR (ลอนดอน ฮีทโธรว์)",
      "destinationCity": "London",
      "destinationCityTh": "ลอนดอน",
      "departureTime": "12:50",
      "arrivalTime": "19:25",
      "duration": "13 ชม. 35 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 29900,
      "baggage": "2 ชิ้น (46 กก.)",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-eu-4",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 910",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "LHR (ลอนดอน ฮีทโธรว์)",
      "destinationCity": "London",
      "destinationCityTh": "ลอนดอน",
      "departureTime": "00:55",
      "arrivalTime": "07:15",
      "duration": "13 ชม. 20 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 35900,
      "baggage": "30 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-eu-5",
      "airline": "Swiss International Air Lines (SWISS)",
      "flightNo": "LX 181",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "ZRH (ซูริก สวิตเซอร์แลนด์)",
      "destinationCity": "Switzerland",
      "destinationCityTh": "สวิตเซอร์แลนด์",
      "departureTime": "13:20",
      "arrivalTime": "19:45",
      "duration": "12 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 34500,
      "baggage": "23 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-11",
      "airline": "Thai AirAsia (แอร์เอเชีย)",
      "flightNo": "FD 3209",
      "from": "DMK (ดอนเมือง)",
      "to": "CEI (เชียงราย)",
      "destinationCity": "Chiang Rai",
      "destinationCityTh": "เชียงราย",
      "departureTime": "07:05",
      "arrivalTime": "08:25",
      "duration": "1 ชม. 20 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 890,
      "baggage": "7 กก. ถือขึ้นเครื่อง",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-12",
      "airline": "Nok Air (นกแอร์)",
      "flightNo": "DD 108",
      "from": "DMK (ดอนเมือง)",
      "to": "CEI (เชียงราย)",
      "destinationCity": "Chiang Rai",
      "destinationCityTh": "เชียงราย",
      "departureTime": "12:45",
      "arrivalTime": "14:10",
      "duration": "1 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 940,
      "baggage": "7 กก. + น้ำดื่มฟรี",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-13",
      "airline": "Thai Vietjet (เวียตเจ็ท)",
      "flightNo": "VZ 130",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "CEI (เชียงราย)",
      "destinationCity": "Chiang Rai",
      "destinationCityTh": "เชียงราย",
      "departureTime": "15:20",
      "arrivalTime": "16:45",
      "duration": "1 ชม. 25 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 910,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-14",
      "airline": "Thai AirAsia (แอร์เอเชีย)",
      "flightNo": "FD 3102",
      "from": "DMK (ดอนเมือง)",
      "to": "HDY (หาดใหญ่)",
      "destinationCity": "Hat Yai",
      "destinationCityTh": "หาดใหญ่",
      "departureTime": "06:15",
      "arrivalTime": "07:45",
      "duration": "1 ชม. 30 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 950,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-15",
      "airline": "Thai Lion Air (ไทย ไลอ้อน แอร์)",
      "flightNo": "SL 708",
      "from": "DMK (ดอนเมือง)",
      "to": "HDY (หาดใหญ่)",
      "destinationCity": "Hat Yai",
      "destinationCityTh": "หาดใหญ่",
      "departureTime": "13:30",
      "arrivalTime": "15:00",
      "duration": "1 ชม. 30 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 980,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-16",
      "airline": "Nok Air (นกแอร์)",
      "flightNo": "DD 304",
      "from": "DMK (ดอนเมือง)",
      "to": "URT (สุราษฎร์ธานี)",
      "destinationCity": "Surat Thani",
      "destinationCityTh": "สุราษฎร์ธานี",
      "departureTime": "09:10",
      "arrivalTime": "10:25",
      "duration": "1 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 880,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-17",
      "airline": "Thai AirAsia",
      "flightNo": "FD 3188",
      "from": "DMK (ดอนเมือง)",
      "to": "URT (สุราษฎร์ธานี)",
      "destinationCity": "Surat Thani",
      "destinationCityTh": "สุราษฎร์ธานี",
      "departureTime": "14:20",
      "arrivalTime": "15:35",
      "duration": "1 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 890,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-18",
      "airline": "Nok Air",
      "flightNo": "DD 202",
      "from": "DMK (ดอนเมือง)",
      "to": "UTH (อุดรธานี)",
      "destinationCity": "Udon Thani",
      "destinationCityTh": "อุดรธานี",
      "departureTime": "07:30",
      "arrivalTime": "08:35",
      "duration": "1 ชม. 05 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 850,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-19",
      "airline": "Thai AirAsia",
      "flightNo": "FD 3350",
      "from": "DMK (ดอนเมือง)",
      "to": "UTH (อุดรธานี)",
      "destinationCity": "Udon Thani",
      "destinationCityTh": "อุดรธานี",
      "departureTime": "11:15",
      "arrivalTime": "12:20",
      "duration": "1 ชม. 05 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 860,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-th-20",
      "airline": "Thai Airways (การบินไทย)",
      "flightNo": "TG 241",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "KBV (กระบี่)",
      "destinationCity": "Krabi",
      "destinationCityTh": "กระบี่",
      "departureTime": "11:50",
      "arrivalTime": "13:10",
      "duration": "1 ชม. 20 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 2200,
      "baggage": "20 กก. โหลดฟรี",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-1",
      "airline": "Thai AirAsia",
      "flightNo": "FD 372",
      "from": "DMK (ดอนเมือง)",
      "to": "KUL (กัวลาลัมเปอร์)",
      "destinationCity": "Kuala Lumpur",
      "destinationCityTh": "กัวลาลัมเปอร์",
      "departureTime": "08:35",
      "arrivalTime": "11:50",
      "duration": "2 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 1850,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-2",
      "airline": "Batik Air Malaysia",
      "flightNo": "OD 523",
      "from": "DMK (ดอนเมือง)",
      "to": "KUL (กัวลาลัมเปอร์)",
      "destinationCity": "Kuala Lumpur",
      "destinationCityTh": "กัวลาลัมเปอร์",
      "departureTime": "11:45",
      "arrivalTime": "15:00",
      "duration": "2 ชม. 15 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service (ประหยัด)",
      "price": 2190,
      "baggage": "20 กก. ฟรี",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-3",
      "airline": "Thai Vietjet",
      "flightNo": "VZ 960",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "DAD (ดานัง เวียดนาม)",
      "destinationCity": "Da Nang",
      "destinationCityTh": "ดานัง",
      "departureTime": "10:50",
      "arrivalTime": "12:30",
      "duration": "1 ชม. 40 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 2450,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-4",
      "airline": "Thai AirAsia",
      "flightNo": "FD 636",
      "from": "DMK (ดอนเมือง)",
      "to": "DAD (ดานัง เวียดนาม)",
      "destinationCity": "Da Nang",
      "destinationCityTh": "ดานัง",
      "departureTime": "07:25",
      "arrivalTime": "09:05",
      "duration": "1 ชม. 40 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 2590,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-5",
      "airline": "Greater Bay Airlines (เกรทเตอร์เบย์)",
      "flightNo": "HB 282",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "HKG (ฮ่องกง)",
      "destinationCity": "Hong Kong",
      "destinationCityTh": "ฮ่องกง",
      "departureTime": "04:30",
      "arrivalTime": "08:15",
      "duration": "2 ชม. 45 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Value Carrier",
      "price": 3890,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-6",
      "airline": "Cathay Pacific (คาเธ่ย์ แปซิฟิค)",
      "flightNo": "CX 700",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "HKG (ฮ่องกง)",
      "destinationCity": "Hong Kong",
      "destinationCityTh": "ฮ่องกง",
      "departureTime": "08:25",
      "arrivalTime": "12:15",
      "duration": "2 ชม. 50 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Full Service",
      "price": 6400,
      "baggage": "23 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-7",
      "airline": "Thai Vietjet",
      "flightNo": "VZ 564",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "TPE (ไทเป ไต้หวัน)",
      "destinationCity": "Taipei",
      "destinationCityTh": "ไทเป",
      "departureTime": "09:00",
      "arrivalTime": "13:45",
      "duration": "3 ชม. 45 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 3950,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-8",
      "airline": "Tigerair Taiwan (ไทเกอร์แอร์ ไต้หวัน)",
      "flightNo": "IT 506",
      "from": "DMK (ดอนเมือง)",
      "to": "TPE (ไทเป ไต้หวัน)",
      "destinationCity": "Taipei",
      "destinationCityTh": "ไทเป",
      "departureTime": "20:00",
      "arrivalTime": "00:40 (+1)",
      "duration": "3 ชม. 40 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 4100,
      "baggage": "10 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-9",
      "airline": "Thai Vietjet",
      "flightNo": "VZ 810",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "FUK (ฟุกุโอกะ ญี่ปุ่น)",
      "destinationCity": "Fukuoka",
      "destinationCityTh": "ฟุกุโอกะ",
      "departureTime": "00:15",
      "arrivalTime": "07:25",
      "duration": "5 ชม. 10 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 6490,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-10",
      "airline": "Thai AirAsia X",
      "flightNo": "XJ 638",
      "from": "BKK (สุวรรณภูมิ)",
      "to": "NGO (นาโกย่า ญี่ปุ่น)",
      "destinationCity": "Nagoya",
      "destinationCityTh": "นาโกย่า",
      "departureTime": "00:45",
      "arrivalTime": "08:40",
      "duration": "5 ชม. 55 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 7600,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    },
    {
      "id": "f-asia-11",
      "airline": "AirAsia",
      "flightNo": "FD 398",
      "from": "DMK (ดอนเมือง)",
      "to": "DPS (บาหลี เดนปาซาร์)",
      "destinationCity": "Bali",
      "destinationCityTh": "บาหลี",
      "departureTime": "13:40",
      "arrivalTime": "19:00",
      "duration": "4 ชม. 20 นาที",
      "stops": "บินตรง (Non-stop)",
      "cabinClass": "Low-Cost",
      "price": 3990,
      "baggage": "7 กก.",
      "airlineLogo": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80"
    }
  ],
  "esim": [
    {
      "id": "esim-jp-1",
      "country": "ญี่ปุ่น (Japan)",
      "countryCode": "JP",
      "type": "esim",
      "name": "eSIM Japan ญี่ปุ่น 5G ไม่จำกัด",
      "operator": "SoftBank / NTT Docomo 5G",
      "dataPlan": "Unlimited (ความเร็ว 5G สูงสุด)",
      "days": 5,
      "price": 350,
      "originalPrice": 490,
      "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
      "features": [
        "ส่ง QR Code เปิดใช้งานทางอีเมลทันที",
        "แชร์ Hotspot ได้",
        "รองรับ iPhone XS ขึ้นไป & Samsung ซีรีส์ S"
      ],
      "badge": "ยอดฮิตอันดับ 1",
      "rating": 4.95,
      "reviewsCount": 3820
    },
    {
      "id": "esim-jp-2",
      "country": "ญี่ปุ่น (Japan)",
      "countryCode": "JP",
      "type": "wifi",
      "name": "Pocket WiFi ญี่ปุ่น แบตอึด 15 ชม. แชร์ได้ 5 เครื่อง",
      "operator": "SoftBank Unlimited LTE",
      "dataPlan": "เน็ตไม่อั้น ไม่ลดสปีด 4G/LTE",
      "days": 7,
      "price": 890,
      "originalPrice": 1250,
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      "features": [
        "รับเครื่องที่สนามบินสุวรรณภูมิ/ดอนเมือง",
        "แชร์ได้พร้อมกันสูงสุด 5 เครื่อง",
        "รวมประกันตัวเครื่องและสายชาร์จ"
      ],
      "badge": "เหมาะสำหรับครอบครัว",
      "rating": 4.91,
      "reviewsCount": 2410
    },
    {
      "id": "esim-kr-1",
      "country": "เกาหลีใต้ (South Korea)",
      "countryCode": "KR",
      "type": "esim",
      "name": "eSIM South Korea 5G ความเร็วสูงสุด",
      "operator": "SK Telecom / KT Olleh",
      "dataPlan": "Unlimited 5G เร็วแรงทั่วโซล-ปูซาน",
      "days": 5,
      "price": 320,
      "originalPrice": 450,
      "image": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80",
      "features": [
        "สแกน QR ใช้งานได้ทันทีที่ลงเครื่อง",
        "รองรับ Hotspot",
        "ไม่มีค่าโรมมิ่งส่วนเกิน"
      ],
      "badge": "สแกนปุ๊บ ติดปั๊บ",
      "rating": 4.93,
      "reviewsCount": 2980
    },
    {
      "id": "esim-eu-1",
      "country": "ยุโรป 33 ประเทศ (Europe 33 Countries)",
      "countryCode": "EU",
      "type": "esim",
      "name": "eSIM Europe 33 ประเทศ (สวิส ฝรั่งเศส อิตาลี เยอรมนี ฯลฯ)",
      "operator": "Vodafone / Orange / Swisscom 5G",
      "dataPlan": "10GB Max Speed (ใช้งานนาน 15 วัน)",
      "days": 15,
      "price": 690,
      "originalPrice": 950,
      "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
      "features": [
        "ข้ามแดนอัตโนมัติไม่ต้องเปลี่ยนซิม",
        "ครอบคลุม สวิส ฝรั่งเศส อังกฤษ อิตาลี",
        "มีเบอร์ยุโรปสำหรับรับสาย"
      ],
      "badge": "ยอดนิยมเที่ยวยุโรป",
      "rating": 4.97,
      "reviewsCount": 3120
    },
    {
      "id": "esim-eu-2",
      "country": "ยุโรป 33 ประเทศ (Europe 33 Countries)",
      "countryCode": "EU",
      "type": "wifi",
      "name": "Euro Pocket WiFi พกพาทั่วยุโรป ไม่จำกัดความเร็ว",
      "operator": "Multi-Carrier Europe 4G/LTE",
      "dataPlan": "เน็ตไม่จำกัดความเร็ววันละ 2GB แล้วความเร็ว 384kbps",
      "days": 10,
      "price": 1850,
      "originalPrice": 2400,
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      "features": [
        "ส่งฟรีถึงบ้านก่อนวันเดินทาง",
        "แชร์ได้ 5 เครื่องพร้อมกัน",
        "รวมหัวแปลงปลั๊กไฟยุโรป"
      ],
      "badge": "พกเครื่องเดียวคุ้ม",
      "rating": 4.88,
      "reviewsCount": 1540
    },
    {
      "id": "esim-sg-1",
      "country": "สิงคโปร์ & มาเลเซีย (Singapore & Malaysia)",
      "countryCode": "SG-MY",
      "type": "esim",
      "name": "eSIM Dual Sing-Malay ไฮสปีด 5G 10GB",
      "operator": "Singtel / Maxis",
      "dataPlan": "10GB Max Speed 5G (ใช้งานได้ 7 วัน)",
      "days": 7,
      "price": 260,
      "originalPrice": 380,
      "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
      "features": [
        "ใช้ข้ามแดนสิงคโปร์-มาเลเซียได้ราบรื่น",
        "เปิดใช้งานง่ายใน 1 นาที",
        "สัญญาณครอบคลุมใต้ดิน MRT"
      ],
      "badge": "คุ้มค่า 2 ประเทศ",
      "rating": 4.92,
      "reviewsCount": 2210
    },
    {
      "id": "esim-us-1",
      "country": "สหรัฐอเมริกา (USA)",
      "countryCode": "US",
      "type": "esim",
      "name": "eSIM USA อเมริกา 5G Unlimited + โทรในประเทศฟรี",
      "operator": "T-Mobile / AT&T 5G",
      "dataPlan": "Unlimited Data 5G ไม่จำกัดความเร็ว",
      "days": 10,
      "price": 890,
      "originalPrice": 1200,
      "image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
      "features": [
        "รวมโทรฟรีในอเมริกาไม่จำกัด",
        "สัญญาณครอบคลุมทุกรัฐและอุทยานแห่งชาติ",
        "แชร์ Hotspot ได้"
      ],
      "badge": "ซิมอเมริกาแนะนำ",
      "rating": 4.89,
      "reviewsCount": 1780
    },
    {
      "id": "esim-global-1",
      "country": "ทั่วโลก 85+ ประเทศ (Global Worldwide)",
      "countryCode": "GLOBAL",
      "type": "esim",
      "name": "eSIM Global World Traveler ครอบคลุม 85 ประเทศ",
      "operator": "Tier-1 Global Telecom Partners",
      "dataPlan": "15GB Global High-Speed (30 วัน)",
      "days": 30,
      "price": 1490,
      "originalPrice": 2100,
      "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
      "features": [
        "ใช้ได้ทั่วโลก เอเชีย ยุโรป อเมริกา ตะวันออกกลาง",
        "อายุการใช้งาน 30 วัน",
        "ไม่ต้องลงทะเบียนยืนยันตัวตน"
      ],
      "badge": "ท่องโลกใบเดียวจบ",
      "rating": 4.96,
      "reviewsCount": 1420
    }
  ],
  "insurance": [
    {
      "id": "ins-lite",
      "tier": "Lite (ประหยัดสุดคุ้ม)",
      "badge": "เริ่มต้นเบาๆ",
      "medicalCoverage": "1,500,000 บาท",
      "baggageCoverage": "15,000 บาท",
      "delayCoverage": "10,000 บาท (ทุกๆ 6 ชม.)",
      "emergencySos": "ครอบคลุมการส่งตัวกลับประเทศ 1,000,000 ฿",
      "features": [
        "คุ้มครองค่ารักษาพยาบาลจากอุบัติเหตุและการเจ็บป่วยฉุกเฉิน",
        "บริการช่วยเหลือฉุกเฉินทางการแพทย์ SOS ตลอด 24 ชม.",
        "ยื่นขอวีซ่าเชงเก้นได้ตามเกณฑ์สถานทูต",
        "ชดเชยเที่ยวบินล่าช้าเกิน 6 ชั่วโมง"
      ],
      "pricePerDay": 49,
      "packagePrices": {
        "asia3days": 180,
        "asia7days": 350,
        "world7days": 590,
        "world15days": 950
      },
      "popular": false
    },
    {
      "id": "ins-standard",
      "tier": "Standard (ยอดนิยมอันดับ 1)",
      "badge": "⭐ คุ้มครองครอบคลุม แนะนำ",
      "medicalCoverage": "3,500,000 บาท",
      "baggageCoverage": "35,000 บาท",
      "delayCoverage": "20,000 บาท (ทุกๆ 6 ชม.)",
      "emergencySos": "ครอบคลุมการส่งตัวกลับประเทศ ไม่จำกัดวงเงิน",
      "features": [
        "คุ้มครองค่ารักษาพยาบาลสูงถึง 3.5 ล้านบาท ไม่ต้องสำรองจ่าย",
        "คุ้มครองสัมภาระสูญหายหรือเสียหายระหว่างขนส่ง",
        "ชดเชยกรณีถูกยกเลิกทริป หรือต้องลดวันเดินทางจากเหตุสุดวิสัย",
        "คุ้มครองอุปกรณ์อิเล็กทรอนิกส์ กล้อง มือถือ โน้ตบุ๊ก",
        "หนังสือรับรองยื่นขอวีซ่าภาษาอังกฤษทันทีหลังชำระเงิน"
      ],
      "pricePerDay": 89,
      "packagePrices": {
        "asia3days": 290,
        "asia7days": 590,
        "world7days": 990,
        "world15days": 1550
      },
      "popular": true
    },
    {
      "id": "ins-vip",
      "tier": "Comprehensive VIP (การดูแลระดับสูงสุด)",
      "badge": "VIP ไร้กังวล 100%",
      "medicalCoverage": "5,000,000 บาท",
      "baggageCoverage": "60,000 บาท",
      "delayCoverage": "35,000 บาท",
      "emergencySos": "การส่งตัวฉุกเฉินทางอากาศยาน (Air Ambulance) ไม่จำกัดวงเงิน",
      "features": [
        "วงเงินรักษาพยาบาลสูงสุด 5 ล้านบาท ครอบคลุมทั่วโลก 100%",
        "บริการเคลื่อนย้ายผู้ป่วยทางอากาศยานฉุกเฉินระดับพรีเมียม",
        "คุ้มครองความรับผิดต่อบุคคลภายนอก 2,000,000 บาท",
        "ชดเชยค่าเดินทางของญาติเพื่อมาเยี่ยมผู้ป่วย",
        "คุ้มครองกีฬาฤดูหนาว สกี และดำน้ำสันทนาการ"
      ],
      "pricePerDay": 145,
      "packagePrices": {
        "asia3days": 480,
        "asia7days": 990,
        "world7days": 1690,
        "world15days": 2650
      },
      "popular": false
    },
    {
      "id": "ins-annual",
      "tier": "Annual Multi-Trip (รายปี เดินทางไม่จำกัดครั้ง)",
      "badge": "️ สำหรับนักเดินทางประจำ",
      "medicalCoverage": "5,000,000 บาท / ครั้ง",
      "baggageCoverage": "50,000 บาท / ครั้ง",
      "delayCoverage": "30,000 บาท / ครั้ง",
      "emergencySos": "คุ้มครองเต็มรูปแบบตลอด 365 วัน",
      "features": [
        "เดินทางกี่ครั้งก็ได้ตลอด 1 ปี (สูงสุด 90 วันต่อครั้ง)",
        "คุ้มครองทั่วโลกทุกทริปโดยไม่ต้องแจ้งล่วงหน้า",
        "รวมหนังสือรับรองวีซ่าสำหรับเดินทางซ้ำได้ตลอดปี",
        "สายด่วน Concierge ช่วยเหลือส่วนบุคคลทั่วโลก 24 ชม."
      ],
      "pricePerDay": 12,
      "packagePrices": {
        "asia3days": 3800,
        "asia7days": 3800,
        "world7days": 5900,
        "world15days": 5900
      },
      "popular": false
    }
  ],
  "transport": {
    "cars": [
      {
        "id": "car-tok-1",
        "name": "Toyota Yaris / Aqua Hybrid (รถประหยัดน้ำมัน)",
        "type": "car",
        "category": "รถเช่า (Car Rental)",
        "city": "Tokyo",
        "cityTh": "โตเกียว / ฮาเนดะ",
        "country": "ญี่ปุ่น",
        "seats": "4-5 ที่นั่ง",
        "luggage": "กระเป๋าใหญ่ 2 ใบ",
        "transmission": "เกียร์ออโต้ (Auto)",
        "pricePerDay": 1490,
        "originalPrice": 1950,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        "features": [
          "รับรถที่สนามบินฮาเนดะ/นาริตะ",
          "รวมประกันชั้น 1 Zero Deductible",
          "GPS นำทางภาษาอังกฤษ/ไทย",
          "ETC Card ทางด่วน"
        ],
        "badge": "ประหยัดน้ำมัน 35 กม./ลิตร"
      },
      {
        "id": "car-phk-1",
        "name": "Toyota Fortuner 4WD 7-Seater (SUV เที่ยวทั้งเกาะ)",
        "type": "car",
        "category": "รถเช่า (Car Rental)",
        "city": "Phuket",
        "cityTh": "ภูเก็ต",
        "country": "ไทย",
        "seats": "7 ที่นั่ง",
        "luggage": "กระเป๋าใหญ่ 4 ใบ",
        "transmission": "เกียร์ออโต้ ขับเคลื่อน 4 ล้อ",
        "pricePerDay": 1790,
        "originalPrice": 2400,
        "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
        "features": [
          "ส่งรถฟรีสนามบินภูเก็ตหรือโรงแรม",
          "ประกันชั้น 1 ครบวงจร",
          "เบาะนั่งกว้างขวางเดินทางสบาย",
          "ไม่จำกัดระยะทาง"
        ],
        "badge": "ยอดนิยมเที่ยวครอบครัว"
      },
      {
        "id": "car-swi-1",
        "name": "BMW X3 xDrive / Mercedes GLC (ขับชมวิวเทือกเขาแอลป์)",
        "type": "car",
        "category": "รถเช่า (Car Rental)",
        "city": "Switzerland",
        "cityTh": "สวิตเซอร์แลนด์ (ซูริก)",
        "country": "สวิตเซอร์แลนด์",
        "seats": "5 ที่นั่ง",
        "luggage": "กระเป๋าใหญ่ 4 ใบ",
        "transmission": "เกียร์ออโต้ ขับเคลื่อนทุกล้อ",
        "pricePerDay": 3600,
        "originalPrice": 4800,
        "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
        "features": [
          "ยางหิมะพร้อมขับฤดูหนาว",
          "สติกเกอร์ทางด่วนสวิส Vignette ฟรี",
          "ขับข้ามประเทศเข้าฝรั่งเศส/อิตาลีได้",
          "GPS ดาวเทียม"
        ],
        "badge": "ขับสนุกชมวิวแอลป์"
      },
      {
        "id": "car-bkk-1",
        "name": "Toyota Alphard VIP Executive Lounge (พร้อมคนขับมืออาชีพ)",
        "type": "car",
        "category": "รถเช่าพร้อมคนขับ",
        "city": "Bangkok",
        "cityTh": "กรุงเทพฯ / พัทยา / หัวหิน",
        "country": "ไทย",
        "seats": "5-6 ที่นั่ง VIP",
        "luggage": "กระเป๋าใหญ่ 4 ใบ",
        "transmission": "พร้อมพนักงานขับรถสุภาพ",
        "pricePerDay": 4500,
        "originalPrice": 5800,
        "image": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        "features": [
          "เบาะปรับไฟฟ้า First-Class",
          "รวมค่าน้ำมันและทางด่วนในเขต",
          "บริการรับส่งสนามบินสุวรรณภูมิ/ดอนเมือง",
          "Wi-Fi และน้ำดื่มบนรถ"
        ],
        "badge": "หรูหราสะดวกสบายสูงสุด"
      }
    ],
    "cruises": [
      {
        "id": "cru-phk-1",
        "name": "เหมาลำเรือใบคาตามารันส่วนตัว ภูเก็ต-เกาะเฮ-เกาะราชา",
        "type": "cruise",
        "category": "เช่าเรือยอชต์ส่วนตัว (Yacht Charter)",
        "city": "Phuket",
        "cityTh": "ภูเก็ต",
        "country": "ไทย",
        "duration": "เต็มวัน (09:00 - 18:30 น.)",
        "capacity": "รองรับสูงสุด 15 ท่าน",
        "pricePerDay": 19500,
        "originalPrice": 26000,
        "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
        "features": [
          "กัปตันและลูกเรือคอยบริการตลอดทริป",
          "อาหารกลางวันซีฟู้ดและผลไม้สด",
          "อุปกรณ์ดำน้ำตื้น พายซับบอร์ด สไลเดอร์เป่าลม",
          "ชมพระอาทิตย์ตกแหลมพรหมเทพ"
        ],
        "badge": "ส่วนตัวสุดโรแมนติก"
      },
      {
        "id": "cru-sg-1",
        "name": "เรือสำราญ Genting Dream สิงคโปร์ - ปีนัง - ภูเก็ต 4 วัน 3 คืน",
        "type": "cruise",
        "category": "เรือสำราญนานาชาติ (Luxury Cruise)",
        "city": "Singapore",
        "cityTh": "สิงคโปร์ - มาเลเซีย - ไทย",
        "country": "สิงคโปร์",
        "duration": "4 วัน 3 คืน",
        "capacity": "ห้องพัก Balcony Stateroom (2 ท่าน)",
        "pricePerDay": 18900,
        "originalPrice": 24500,
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "features": [
          "อาหารและเครื่องดื่มไม่อั้นใน 6 ภัตตาคาร",
          "สวนน้ำกลางมหาสมุทรและสไลเดอร์ 6 สาย",
          "การแสดงบรอดเวย์ระดับโลกทุกค่ำคืน",
          "แวะท่องเที่ยวปีนังและภูเก็ต"
        ],
        "badge": "ท่องทะเลสุดอลังการ"
      },
      {
        "id": "cru-halong-1",
        "name": "เรือสำราญหรูล่องอ่าวฮาลอง 5 ดาว Ambassador Cruise 2 วัน 1 คืน",
        "type": "cruise",
        "category": "เรือสำราญมรดกโลก",
        "city": "Halong",
        "cityTh": "อ่าวฮาลอง",
        "country": "เวียดนาม",
        "duration": "2 วัน 1 คืน",
        "capacity": "ห้องพัก Balcony Suite วิวเขาหินปูน",
        "pricePerDay": 8900,
        "originalPrice": 11500,
        "image": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=600&q=80",
        "features": [
          "บุฟเฟต์กุ้งมังกรและอาหารนานาชาติ",
          "พายคายัคถ้ำแสงสว่างและถ้ำมืด",
          "ชมพระอาทิตย์ขึ้นและฝึกไทเก๊กบนดาดฟ้าเรือ",
          "สปาและจากุซซี่ลอยน้ำ"
        ],
        "badge": "มรดกโลกยูเนสโก"
      }
    ],
    "trains": [
      {
        "id": "trn-jr-1",
        "name": "JR Pass All Japan (บัตรโดยสารรถไฟทั่วประเทศญี่ปุ่น 7 วัน)",
        "type": "train",
        "category": "บัตรรถไฟ (Rail Pass)",
        "city": "Tokyo",
        "cityTh": "ทั่วประเทศญี่ปุ่น",
        "country": "ญี่ปุ่น",
        "validity": "7 วันต่อเนื่อง (Ordinary Car)",
        "pricePerDay": 11900,
        "originalPrice": 13500,
        "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
        "features": [
          "นั่งชินคันเซ็น Shinkansen ได้ไม่จำกัด (Hikari, Sakura, Kodama)",
          "ใช้ได้ทั้ง JR East, Central, West, Kyushu, Hokkaido",
          "จองที่นั่งฟรีผ่านตู้จำหน่ายตั๋ว",
          "ส่งบัตรแลก Exchange Order ถึงบ้านฟรี"
        ],
        "badge": "บัตรเดียวเที่ยวทั่วญี่ปุ่น"
      },
      {
        "id": "trn-swiss-1",
        "name": "Swiss Travel Pass (ตั๋วรถไฟ เรือ และรถบัสทั่วสวิตเซอร์แลนด์ 4 วัน)",
        "type": "train",
        "category": "บัตรรถไฟ (Rail Pass)",
        "city": "Switzerland",
        "cityTh": "ทั่วสวิตเซอร์แลนด์",
        "country": "สวิตเซอร์แลนด์",
        "validity": "4 วันต่อเนื่อง (2nd Class E-Ticket)",
        "pricePerDay": 9800,
        "originalPrice": 11200,
        "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
        "features": [
          "นั่งรถไฟสายพาโนรามาชื่อดัง Glacier Express, Bernina Express",
          "นั่งเรือล่องทะเลสาบเจนีวา ทูน เบรียนซ์ ฟรี",
          "เข้าฟรีพิพิธภัณฑ์กว่า 500 แห่งทั่วสวิส",
          "ส่วนลดขึ้นกระเช้าลอยฟ้าและยอดเขา 50%"
        ],
        "badge": "สวิสพาสยอดนิยม"
      },
      {
        "id": "trn-eu-1",
        "name": "Eurail Global Pass (บัตรรถไฟท่องยุโรป 33 ประเทศ - 5 วันใน 1 เดือน)",
        "type": "train",
        "category": "บัตรรถไฟ (Rail Pass)",
        "city": "Europe",
        "cityTh": "33 ประเทศทั่วยุโรป",
        "country": "ยุโรป",
        "validity": "ยืดหยุ่น 5 วันเดินทางภายใน 1 เดือน",
        "pricePerDay": 12500,
        "originalPrice": 14900,
        "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80",
        "features": [
          "นั่งรถไฟความเร็วสูงเชื่อมเมืองหลัก ปารีส อัมสเตอร์ดัม โรม ซูริก",
          "เปิดใช้งานผ่านแอปพลิเคชันมือถือ Eurail Rail Planner",
          "เดินทางข้ามประเทศได้แบบไร้พรมแดน",
          "ส่วนลดโรงแรมและสถานที่ท่องเที่ยวทั่วยุโรป"
        ],
        "badge": "ท่องยุโรปไร้ขีดจำกัด"
      }
    ]
  },
  "visa": [
    {
      "id": "visa-schengen",
      "country": "วีซ่าเชงเก้น (Schengen Visa - ยุโรป 29 ประเทศ)",
      "targetCountries": "สวิตเซอร์แลนด์, ฝรั่งเศส, อิตาลี, เยอรมนี, ออสเตรีย, เนเธอร์แลนด์ ฯลฯ",
      "type": "ท่องเที่ยว / เยี่ยมเยียน / ธุรกิจ",
      "processingTime": "15 - 20 วันทำการ",
      "price": 3500,
      "embassyFeeNote": "ไม่รวมค่าธรรมเนียมสถานทูต ~3,500 ฿ (ชำระวันสัมภาษณ์)",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      "services": [
        "ตรวจสอบและวิเคราะห์โปรไฟล์ผู้สมัคร เพื่อลดความเสี่ยงการถูกปฏิเสธ",
        "จัดทำแผนการเดินทางท่องเที่ยว (Itinerary) รายวันอย่างสมบูรณ์",
        "จองคิวสัมภาษณ์สถานทูต (VFS / TLS / BLS)",
        "แปลเอกสารราชการ ทะเบียนบ้าน ทะเบียนสมรส ใบเปลี่ยนชื่อ (ฟรี 3 ฉบับ)",
        "ร่างจดหมายแนะนำตัว (Cover Letter) ภาษาอังกฤษตามประวัติจริง",
        "มีทีมผู้เชี่ยวชาญติวเข้มและซักซ้อมก่อนวันสัมภาษณ์จริง"
      ],
      "successRate": "อัตราผ่าน 98.4%",
      "badge": "⭐ แนะนำสำหรับทริปยุโรป"
    },
    {
      "id": "visa-usa",
      "country": "วีซ่าสหรัฐอเมริกา (US Visa B1/B2)",
      "targetCountries": "สหรัฐอเมริกา (50 รัฐ)",
      "type": "ท่องเที่ยว / ธุรกิจ (อายุวีซ่าสูงสุด 10 ปี)",
      "processingTime": "ตามคิวสัมภาษณ์สถานทูต (มีบริการจองคิวด่วน)",
      "price": 4900,
      "embassyFeeNote": "ไม่รวมค่าธรรมเนียมสถานทูต 185 USD (~6,600 ฿)",
      "image": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
      "services": [
        "กรอกแบบฟอร์ม DS-160 ภาษาอังกฤษอย่างละเอียดและถูกต้อง 100%",
        "สร้างโปรไฟล์ระบบนัดคิวสถานทูตสหรัฐฯ ถนนวิทยุ หรือเชียงใหม่",
        "บริการเฝ้าคิวสัมภาษณ์เร่งด่วน (Expedited Appointment Slot)",
        "ซักซ้อมจำลองคำถามสัมภาษณ์ภาษาไทยและภาษาอังกฤษแบบตัวต่อตัว",
        "จัดเตรียมชุดเอกสารสนับสนุนความผูกพันในประเทศไทยอย่างรัดกุม"
      ],
      "successRate": "อัตราผ่าน 96.8%",
      "badge": "วีซ่าอเมริกา 10 ปี"
    },
    {
      "id": "visa-uk",
      "country": "วีซ่าสหราชอาณาจักร (UK Standard Visitor Visa)",
      "targetCountries": "อังกฤษ, สกอตแลนด์, เวลส์, ไอร์แลนด์เหนือ",
      "type": "ท่องเที่ยว 6 เดือน, 2 ปี, 5 ปี",
      "processingTime": "15 วันทำการ (มีฟาสต์แทร็ก 5 วัน)",
      "price": 3900,
      "embassyFeeNote": "ไม่รวมค่าธรรมเนียมสถานทูตตามระยะเวลาที่เลือก",
      "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
      "services": [
        "กรอกใบสมัครออนไลน์บนพอร์ทัลทางการของรัฐบาลอังกฤษ GOV.UK",
        "อัปโหลดไฟล์เอกสารเข้าระบบ VFS Global ก่อนวันนัดหมาย",
        "เขียนจดหมายแสดงเจตจำนงการเดินทางและการเงิน",
        "ตรวจสเตทเมนต์บัญชีและหลักฐานการทำงานให้ตรงตามเกณฑ์ Home Office"
      ],
      "successRate": "อัตราผ่าน 98.9%",
      "badge": "เมืองผู้ดีอังกฤษ"
    },
    {
      "id": "visa-aus",
      "country": "วีซ่าออสเตรเลีย (Australia Subclass 600)",
      "targetCountries": "ออสเตรเลีย (ทุกรัฐ)",
      "type": "ท่องเที่ยวออนไลน์ (e-Visa)",
      "processingTime": "10 - 25 วันทำการ",
      "price": 3200,
      "embassyFeeNote": "ไม่รวมค่าธรรมเนียมตรวจไบโอเมตริกซ์ VFS",
      "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      "services": [
        "ยื่นผ่านระบบออนไลน์ ImmiAccount ของรัฐบาลออสเตรเลีย",
        "แปลเอกสารไทยเป็นอังกฤษพร้อมตรารับรอง",
        "จองคิวเก็บข้อมูลชีวมิติ (Biometrics) ที่ VFS ออสเตรเลีย",
        "ติดตามผลการพิจารณาและรับวีซ่าทางอีเมลโดยตรง"
      ],
      "successRate": "อัตราผ่าน 97.5%",
      "badge": "ยื่นออนไลน์สะดวกรวดเร็ว"
    }
  ],
  "deals": [
    {
      "id": "deal-1",
      "badge": "Flash Deal 35% OFF",
      "title": "โตเกียว ซากุระ โรแมนติก 5 วัน 4 คืน",
      "subtitle": "โรงแรม 5 ดาว + ตั๋วบินตรง ANA + บัตร teamLab",
      "price": 38900,
      "originalPrice": 58000,
      "destination": "โตเกียว, ญี่ปุ่น",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "expireHours": 14,
      "tag": "ยอดนิยมอันดับ 1"
    },
    {
      "id": "deal-2",
      "badge": "ซัมเมอร์ฮิต ลด 40%",
      "title": "พูลวิลล่าภูเก็ต Keemala 3 วัน 2 คืน + ดำน้ำพีพี VIP",
      "subtitle": "วิลล่ารังนกพร้อมสระว่ายน้ำส่วนตัว + รถตู้รับส่งสนามบิน",
      "price": 19900,
      "originalPrice": 33000,
      "destination": "ภูเก็ต, ไทย",
      "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      "expireHours": 8,
      "tag": "ลดล้างสต็อก"
    },
    {
      "id": "deal-3",
      "badge": "️ สวิสในฝัน ลด 25%",
      "title": "เทือกเขาแอลป์สวิส ชาเลต์หรู 6 วัน 5 คืน + Swiss Travel Pass",
      "subtitle": "สัมผัสหิมะยอดเขาจุงเฟรา และนั่งรถไฟชมวิว Glacier Express",
      "price": 74900,
      "originalPrice": 99000,
      "destination": "สวิตเซอร์แลนด์",
      "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      "expireHours": 22,
      "tag": "พรีเมียมการันตี"
    }
  ],
  "blogPosts": [
    {
      "id": "blog-1",
      "title": "10 พิกัดถ่ายรูปซากุระโตเกียว ที่คนท้องถิ่นแนะนำปี 2026",
      "excerpt": "หลีกหนีฝูงชนไปชมดอกซากุระบานสะพรั่งริมแม่น้ำเมกุโระ สวนชินจูกุเกียวเอ็น และจุดลับในย่านยานากะ",
      "author": "แพรวา Travel Hopper",
      "readTime": "5 นาที",
      "date": "1 มี.ค. 2026",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
    },
    {
      "id": "blog-2",
      "title": "วิธีเตรียมตัวแลกเงินเที่ยวต่างประเทศ ให้ได้เรทคุ้มที่สุดและปลอดภัย",
      "excerpt": "เจาะลึกเทคนิคจองเรทแลกเงินล่วงหน้าออนไลน์ การใช้ Travel Wallet คู่เงินสด และจุดรับเงินที่สนามบิน",
      "author": "ทีมผู้เชี่ยวชาญการเงิน MY PROGRAM",
      "readTime": "4 นาที",
      "date": "28 ก.พ. 2026",
      "image": "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80"
    },
    {
      "id": "blog-3",
      "title": "คู่มือเที่ยวยุโรปด้วยรถไฟเส้นทางพาโนรามา สวิตเซอร์แลนด์-ปารีส",
      "excerpt": "วางแผนการเดินทางข้ามประเทศอย่างสะดวกสบาย นั่งรถไฟความเร็วสูง TGV เชื่อมสองมหานครในฝัน",
      "author": "มาร์ค Voyageur",
      "readTime": "7 นาที",
      "date": "25 ก.พ. 2026",
      "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80"
    }
  ],
  "exchangeBranches": [
    {
      "name": "สนามบินสุวรรณภูมิ (Suvarnabhumi BKK)",
      "location": "ชั้น B ใกล้สถานี Airport Rail Link",
      "open": "24 ชั่วโมง ทุกวัน"
    },
    {
      "name": "สนามบินดอนเมือง (Don Mueang DMK)",
      "location": "อาคาร 1 ชั้น 1 ขาออกระหว่างประเทศ",
      "open": "04:30 - 23:30 น."
    },
    {
      "name": "สนามบินภูเก็ต (Phuket International HKT)",
      "location": "อาคารผู้โดยสารระหว่างประเทศ ชั้น 2",
      "open": "06:00 - 24:00 น."
    },
    {
      "name": "สาขาสยามพารากอน (Siam Paragon)",
      "location": "ชั้น G โซนธนาคาร",
      "open": "10:00 - 21:00 น."
    },
    {
      "name": "สาขาเซ็นทรัลเวิลด์ (CentralWorld)",
      "location": "ชั้น 4 ฝั่ง Dazzle",
      "open": "10:00 - 21:30 น."
    },
    {
      "name": "บริการจัดส่งถึงบ้านด่วน (Home Delivery)",
      "location": "กรุงเทพฯ และปริมณฑล ส่งด่วนโดยพนักงานรักษาความปลอดภัย",
      "open": "08:00 - 20:00 น."
    }
  ]
};

if (typeof window !== "undefined") { window.DREAM_DATA = DREAM_DATA; }
if (typeof module !== "undefined" && module.exports) { module.exports = DREAM_DATA; }
