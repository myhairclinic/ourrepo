// Node.js global fetch API'sini kullan
// Node.js 18.0.0+ sürümlerinde fetch global olarak mevcuttur

async function makeRequest(url, method, data) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function seedCountryPackages() {
  try {
    const baseUrl = 'http://localhost:5000';
    
    // Farklı ülkeler için paketler
    const packages = [
      {
        slug: "turkiye-ozel-paketi",
        titleTR: "Türkiye Özel Paketi",
        titleEN: "Turkey Special Package",
        titleRU: "Специальный Пакет для Турции",
        titleKA: "თურქეთის სპეციალური პაკეტი",
        descriptionTR: "Türkiye'den gelen misafirlerimiz için özel olarak hazırlanmış konforlu konaklama ve premium sağlık hizmetleri paketi.",
        descriptionEN: "Comfortable accommodation and premium health services package specially prepared for our guests from Turkey.",
        descriptionRU: "Пакет с комфортным проживанием и премиальными медицинскими услугами, специально подготовленный для наших гостей из Турции.",
        descriptionKA: "კომფორტული საცხოვრებელი და პრემიუმ ჯანმრთელობის სერვისების პაკეტი სპეციალურად მომზადებული ჩვენი სტუმრებისთვის თურქეთიდან.",
        contentTR: "Türkiye'den gelen değerli misafirlerimiz için hazırladığımız bu özel paket, saç ekimi tedavisinin yanı sıra, Tiflis'in en güzel bölgelerinde konaklama, özel transfer ve şehir turu imkanı sunuyor. Türk mutfağına yakın restoranlarda yemek keyfi ve Türkçe konuşan personelimiz ile kendinizi evinizde hissetmenizi sağlıyoruz.",
        contentEN: "This special package prepared for our valued guests from Turkey offers hair transplantation treatment as well as accommodation in the most beautiful areas of Tbilisi, private transfer, and city tour opportunities. We ensure you feel at home with our Turkish-speaking staff and dining pleasure at restaurants close to Turkish cuisine.",
        contentRU: "Этот специальный пакет, подготовленный для наших уважаемых гостей из Турции, предлагает лечение по трансплантации волос, а также проживание в самых красивых районах Тбилиси, частный трансфер и возможности для экскурсий по городу. Мы гарантируем, что вы почувствуете себя как дома с нашим персоналом, говорящим по-турецки, и удовольствием от ужина в ресторанах, близких к турецкой кухне.",
        contentKA: "ეს სპეციალური პაკეტი, რომელიც მომზადებულია ჩვენი პატივცემული სტუმრებისთვის თურქეთიდან, გთავაზობთ თმის გადანერგვის მკურნალობას, ასევე საცხოვრებელს თბილისის ულამაზეს რაიონებში, კერძო ტრანსფერს და საქალაქო ტურის შესაძლებლობებს. ჩვენ უზრუნველვყოფთ, რომ თქვენ იგრძნოთ თავი სახლში თურქულენოვანი პერსონალით და სადილის სიამოვნებით რესტორნებში, რომლებიც ახლოსაა თურქულ სამზარეულოსთან.",
        imageUrl: "/attached_assets/kız-kulesi.webp",
        countryOrigin: "TR",
        location: "Tiflis Merkez",
        features: JSON.stringify(["VIP Transfer", "5* Otel", "Şehir Turu", "Türkçe Rehber"]),
        durationDays: 5,
        isAllInclusive: true,
        isActive: true,
        isFeatured: true,
        order: 1
      },
      {
        slug: "rusya-ozel-paketi",
        titleTR: "Rusya Özel Paketi",
        titleEN: "Russia Special Package",
        titleRU: "Специальный Пакет для России",
        titleKA: "რუსეთის სპეციალური პაკეტი",
        descriptionTR: "Rusya'dan gelen misafirlerimiz için özel olarak hazırlanmış konforlu konaklama ve premium sağlık hizmetleri paketi.",
        descriptionEN: "Comfortable accommodation and premium health services package specially prepared for our guests from Russia.",
        descriptionRU: "Пакет с комфортным проживанием и премиальными медицинскими услугами, специально подготовленный для наших гостей из России.",
        descriptionKA: "კომფორტული საცხოვრებელი და პრემიუმ ჯანმრთელობის სერვისების პაკეტი სპეციალურად მომზადებული ჩვენი სტუმრებისთვის რუსეთიდან.",
        contentTR: "Rusya'dan gelen değerli misafirlerimiz için hazırladığımız bu özel paket, saç ekimi tedavisinin yanı sıra, Tiflis'in tarihi bölgelerinde konaklama, özel transfer ve kültürel turlar sunuyor. Rusça konuşan personelimiz ve Rus mutfağından örnekler sunan özel restoranlarda yemek seçenekleri ile kendinizi evinizde hissetmenizi sağlıyoruz.",
        contentEN: "This special package prepared for our valued guests from Russia offers hair transplantation treatment as well as accommodation in the historical areas of Tbilisi, private transfer, and cultural tours. We ensure you feel at home with our Russian-speaking staff and dining options at special restaurants offering examples of Russian cuisine.",
        contentRU: "Этот специальный пакет, подготовленный для наших уважаемых гостей из России, предлагает лечение по трансплантации волос, а также проживание в исторических районах Тбилиси, частный трансфер и культурные туры. Мы гарантируем, что вы почувствуете себя как дома с нашим персоналом, говорящим по-русски, и вариантами питания в специальных ресторанах, предлагающих примеры русской кухни.",
        contentKA: "ეს სპეციალური პაკეტი, რომელიც მომზადებულია ჩვენი პატივცემული სტუმრებისთვის რუსეთიდან, გთავაზობთ თმის გადანერგვის მკურნალობას, ასევე საცხოვრებელს თბილისის ისტორიულ რაიონებში, კერძო ტრანსფერს და კულტურულ ტურებს. ჩვენ უზრუნველვყოფთ, რომ თქვენ იგრძნოთ თავი სახლში ჩვენი რუსულენოვანი პერსონალით და კვების ვარიანტებით სპეციალურ რესტორნებში, რომლებიც გთავაზობთ რუსული სამზარეულოს ნიმუშებს.",
        imageUrl: "/attached_assets/U-kremlin-sarayi-rusya-sehir-manzarasi-dunyaca-unlu-sehirler-kanvas-tablo1455893402-800.jpg",
        countryOrigin: "RU",
        location: "Tiflis Tarihi Merkez",
        features: JSON.stringify(["VIP Transfer", "4* Otel", "Kültürel Turlar", "Rusça Rehber"]),
        durationDays: 7,
        isAllInclusive: true,
        isActive: true,
        isFeatured: true,
        order: 2
      },
      {
        slug: "azerbaycan-ozel-paketi",
        titleTR: "Azerbaycan Özel Paketi",
        titleEN: "Azerbaijan Special Package",
        titleRU: "Специальный Пакет для Азербайджана",
        titleKA: "აზერბაიჯანის სპეციალური პაკეტი",
        descriptionTR: "Azerbaycan'dan gelen misafirlerimiz için özel olarak hazırlanmış konforlu konaklama ve premium sağlık hizmetleri paketi.",
        descriptionEN: "Comfortable accommodation and premium health services package specially prepared for our guests from Azerbaijan.",
        descriptionRU: "Пакет с комфортным проживанием и премиальными медицинскими услугами, специально подготовленный для наших гостей из Азербайджана.",
        descriptionKA: "კომფორტული საცხოვრებელი და პრემიუმ ჯანმრთელობის სერვისების პაკეტი სპეციალურად მომზადებული ჩვენი სტუმრებისთვის აზერბაიჯანიდან.",
        contentTR: "Azerbaycan'dan gelen değerli misafirlerimiz için hazırladığımız bu özel paket, saç ekimi tedavisinin yanı sıra, Tiflis'in modern bölgelerinde konaklama, lüks transfer ve şehir turları içeriyor. Azeri dilinde hizmet veren personelimiz ve Azeri mutfağına ait spesiyaliteler sunan restoranlarda yemek imkanları ile kendinizi evinizde hissetmenizi sağlıyoruz.",
        contentEN: "This special package prepared for our valued guests from Azerbaijan offers hair transplantation treatment as well as accommodation in the modern areas of Tbilisi, luxury transfer, and city tours. We ensure you feel at home with our staff providing service in Azerbaijani language and dining opportunities at restaurants offering specialties from Azerbaijani cuisine.",
        contentRU: "Этот специальный пакет, подготовленный для наших уважаемых гостей из Азербайджана, предлагает лечение по трансплантации волос, а также проживание в современных районах Тбилиси, роскошный трансфер и экскурсии по городу. Мы гарантируем, что вы почувствуете себя как дома с нашим персоналом, предоставляющим услуги на азербайджанском языке, и возможностями для ужина в ресторанах, предлагающих специалитеты из азербайджанской кухни.",
        contentKA: "ეს სპეციალური პაკეტი, რომელიც მომზადებულია ჩვენი პატივცემული სტუმრებისთვის აზერბაიჯანიდან, გთავაზობთ თმის გადანერგვის მკურნალობას, ასევე საცხოვრებელს თბილისის თანამედროვე რაიონებში, ლუქს ტრანსფერს და საქალაქო ტურებს. ჩვენ უზრუნველვყოფთ, რომ თქვენ იგრძნოთ თავი სახლში ჩვენი პერსონალით, რომელიც გთავაზობთ მომსახურებას აზერბაიჯანულ ენაზე და სადილობის შესაძლებლობებს რესტორნებში, რომლებიც გთავაზობთ აზერბაიჯანული სამზარეულოს სპეციალიტეტებს.",
        imageUrl: "/attached_assets/azerbaycan-giris-Jy5Z_cover.jpg",
        countryOrigin: "AZ",
        location: "Tiflis Modern Bölge",
        features: JSON.stringify(["Lüks Transfer", "5* Otel", "Şehir Turları", "Azeri Rehber"]),
        durationDays: 6,
        isAllInclusive: true,
        isActive: true,
        isFeatured: true,
        order: 3
      },
      {
        slug: "kazakistan-ozel-paketi",
        titleTR: "Kazakistan Özel Paketi",
        titleEN: "Kazakhstan Special Package",
        titleRU: "Специальный Пакет для Казахстана",
        titleKA: "ყაზახეთის სპეციალური პაკეტი",
        descriptionTR: "Kazakistan'dan gelen misafirlerimiz için özel olarak hazırlanmış konforlu konaklama ve premium sağlık hizmetleri paketi.",
        descriptionEN: "Comfortable accommodation and premium health services package specially prepared for our guests from Kazakhstan.",
        descriptionRU: "Пакет с комфортным проживанием и премиальными медицинскими услугами, специально подготовленный для наших гостей из Казахстана.",
        descriptionKA: "კომფორტული საცხოვრებელი და პრემიუმ ჯანმრთელობის სერვისების პაკეტი სპეციალურად მომზადებული ჩვენი სტუმრებისთვის ყაზახეთიდან.",
        contentTR: "Kazakistan'dan gelen değerli misafirlerimiz için hazırladığımız bu özel paket, saç ekimi tedavisinin yanı sıra, Tiflis'in lüks bölgelerinde konaklama, özel transfer ve kültürel etkinlikler sunuyor. Kazak diline hakim personelimiz ve geleneksel Kazak lezzetlerini sunan seçkin restoranlarda yemek seçenekleri ile kendinizi evinizde hissetmenizi sağlıyoruz.",
        contentEN: "This special package prepared for our valued guests from Kazakhstan offers hair transplantation treatment as well as accommodation in the luxury areas of Tbilisi, private transfer, and cultural activities. We ensure you feel at home with our staff fluent in Kazakh language and dining options at distinguished restaurants offering traditional Kazakh flavors.",
        contentRU: "Этот специальный пакет, подготовленный для наших уважаемых гостей из Казахстана, предлагает лечение по трансплантации волос, а также проживание в роскошных районах Тбилиси, частный трансфер и культурные мероприятия. Мы гарантируем, что вы почувствуете себя как дома с нашим персоналом, свободно говорящим на казахском языке, и вариантами питания в отличительных ресторанах, предлагающих традиционные казахские вкусы.",
        contentKA: "ეს სპეციალური პაკეტი, რომელიც მომზადებულია ჩვენი პატივცემული სტუმრებისთვის ყაზახეთიდან, გთავაზობთ თმის გადანერგვის მკურნალობას, ასევე საცხოვრებელს თბილისის ლუქს რაიონებში, კერძო ტრანსფერს და კულტურულ აქტივობებს. ჩვენ უზრუნველვყოფთ, რომ თქვენ იგრძნოთ თავი სახლში ჩვენი პერსონალით, რომელიც თავისუფლად საუბრობს ყაზახურ ენაზე და კვების ვარიანტებით გამორჩეულ რესტორნებში, რომლებიც გთავაზობთ ტრადიციულ ყაზახურ გემოვნებებს.",
        imageUrl: "/attached_assets/kazakistanin-ruhu-bu-topr-700.jpg",
        countryOrigin: "KZ",
        location: "Tiflis Lüks Mahalle",
        features: JSON.stringify(["Özel Transfer", "Deluxe Otel", "Kültürel Etkinlikler", "Kazak Rehber"]),
        durationDays: 8,
        isAllInclusive: true,
        isActive: true,
        isFeatured: true,
        order: 4
      },
      {
        slug: "ukrayna-ozel-paketi",
        titleTR: "Ukrayna Özel Paketi",
        titleEN: "Ukraine Special Package",
        titleRU: "Специальный Пакет для Украины",
        titleKA: "უკრაინის სპეციალური პაკეტი",
        descriptionTR: "Ukrayna'dan gelen misafirlerimiz için özel olarak hazırlanmış konforlu konaklama ve premium sağlık hizmetleri paketi.",
        descriptionEN: "Comfortable accommodation and premium health services package specially prepared for our guests from Ukraine.",
        descriptionRU: "Пакет с комфортным проживанием и премиальными медицинскими услугами, специально подготовленный для наших гостей из Украины.",
        descriptionKA: "კომფორტული საცხოვრებელი და პრემიუმ ჯანმრთელობის სერვისების პაკეტი სპეციალურად მომზადებული ჩვენი სტუმრებისთვის უკრაინიდან.",
        contentTR: "Ukrayna'dan gelen değerli misafirlerimiz için hazırladığımız bu özel paket, saç ekimi tedavisinin yanı sıra, Tiflis'in yeşil bölgelerinde konaklama, havaalanı transferi ve doğa turları içeriyor. Ukraynaca konuşan personelimiz ve Ukrayna mutfağından seçkin örnekler sunan restoranlarda yemek imkanları ile kendinizi evinizde hissetmenizi sağlıyoruz.",
        contentEN: "This special package prepared for our valued guests from Ukraine offers hair transplantation treatment as well as accommodation in the green areas of Tbilisi, airport transfer, and nature tours. We ensure you feel at home with our Ukrainian-speaking staff and dining opportunities at restaurants offering select examples from Ukrainian cuisine.",
        contentRU: "Этот специальный пакет, подготовленный для наших уважаемых гостей из Украины, предлагает лечение по трансплантации волос, а также проживание в зеленых районах Тбилиси, трансфер из аэропорта и природные туры. Мы гарантируем, что вы почувствуете себя как дома с нашим персоналом, говорящим по-украински, и возможностями для ужина в ресторанах, предлагающих избранные примеры из украинской кухни.",
        contentKA: "ეს სპეციალური პაკეტი, რომელიც მომზადებულია ჩვენი პატივცემული სტუმრებისთვის უკრაინიდან, გთავაზობთ თმის გადანერგვის მკურნალობას, ასევე საცხოვრებელს თბილისის მწვანე რაიონებში, აეროპორტიდან ტრანსფერს და ბუნების ტურებს. ჩვენ უზრუნველვყოფთ, რომ თქვენ იგრძნოთ თავი სახლში ჩვენი უკრაინულენოვანი პერსონალით და სადილობის შესაძლებლობებით რესტორნებში, რომლებიც გთავაზობთ შერჩეულ ნიმუშებს უკრაინული სამზარეულოდან.",
        imageUrl: "/attached_assets/st-andrew-s-church.jpg",
        countryOrigin: "UA",
        location: "Tiflis Yeşil Mahalle",
        features: JSON.stringify(["Havaalanı Transferi", "Butik Otel", "Doğa Turları", "Ukraynalı Rehber"]),
        durationDays: 7,
        isAllInclusive: true,
        isActive: true,
        isFeatured: true,
        order: 5
      }
    ];

    console.log("Farklı ülkelere ait paketler oluşturuluyor...");
    for (const packageData of packages) {
      try {
        const response = await makeRequest(`${baseUrl}/api/packages`, 'POST', packageData);
        console.log(`✅ Başarılı: ${packageData.titleTR} paketi oluşturuldu.`);
      } catch (error) {
        console.error(`❌ Hata: ${packageData.titleTR} paketi oluşturulamadı.`, error.message);
      }
    }

    console.log("Tüm paketler başarıyla eklendi!");
  } catch (error) {
    console.error('❌ İşlem sırasında bir hata oluştu:', error.message);
  }
}

seedCountryPackages();