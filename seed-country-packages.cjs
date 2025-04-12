// Node.js global fetch API'sini kullan
// Node.js 18.0.0+ sürümlerinde fetch global olarak mevcuttur

async function makeRequest(url, method, data) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, details:`, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
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
        order: 1,
        // Zorunlu alanlar eklenmiş hali
        accommodationTR: "5 yıldızlı lüks konaklama tesislerimiz Tiflis şehir merkezinde yer almaktadır. Her detayı düşünülmüş modern odalarda konfor ve lüksü bir arada yaşayacaksınız.",
        accommodationEN: "Our 5-star luxury accommodations are located in the center of Tbilisi. You will experience comfort and luxury together in modern rooms where every detail has been considered.",
        accommodationRU: "Наши 5-звездочные роскошные гостиницы расположены в центре Тбилиси. Вы будете наслаждаться комфортом и роскошью в современных номерах, где продумана каждая деталь.",
        accommodationKA: "ჩვენი 5-ვარსკვლავიანი ლუქსის საცხოვრებლები მდებარეობს თბილისის ცენტრში. თქვენ გამოსცდით კომფორტს და ფუფუნებას ერთად თანამედროვე ოთახებში, სადაც ყველა დეტალი გათვალისწინებულია.",
        transportationTR: "Havalimanı transferleriniz özel lüks araçlarla gerçekleştirilecek. Tiflis içi ulaşımlarınız için de 7/24 özel şoför hizmeti sunulmaktadır.",
        transportationEN: "Your airport transfers will be carried out with private luxury vehicles. 24/7 private chauffeur service is also provided for your transportation within Tbilisi.",
        transportationRU: "Ваши трансферы из аэропорта будут осуществляться на частных роскошных автомобилях. Также предоставляется круглосуточная услуга частного шофера для вашего передвижения по Тбилиси.",
        transportationKA: "თქვენი აეროპორტის ტრანსფერები განხორციელდება კერძო ფეშენებელური მანქანებით. ასევე უზრუნველყოფილია 24/7 კერძო მძღოლის მომსახურება თქვენი ტრანსპორტირებისთვის თბილისში.",
        activitiesTR: "Paketinize dahil olan aktiviteler: Tiflis Şehir Turu, Mtskheta Antik Kenti Gezisi, Kazbegi Dağ Turu, şarap tadımı ve geleneksel Gürcü mutfağı workshop'ı.",
        activitiesEN: "Activities included in your package: Tbilisi City Tour, Mtskheta Ancient City Excursion, Kazbegi Mountain Tour, wine tasting, and traditional Georgian cuisine workshop.",
        activitiesRU: "Мероприятия, включенные в ваш пакет: Обзорная экскурсия по Тбилиси, Экскурсия по древнему городу Мцхета, Горный тур Казбеги, дегустация вин и мастер-класс традиционной грузинской кухни.",
        activitiesKA: "თქვენს პაკეტში შემავალი აქტივობები: თბილისის საქალაქო ტური, მცხეთის უძველესი ქალაქის ექსკურსია, ყაზბეგის მთის ტური, ღვინის დეგუსტაცია და ტრადიციული ქართული სამზარეულოს სემინარი."
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
        order: 2,
        // Zorunlu alanlar eklenmiş hali
        accommodationTR: "4 yıldızlı tarihi Tiflis otellerimiz, şehrin eski bölgesinde geleneksel mimari ile modern konforu birleştiriyor. Etrafınızda Rus misafirlerin de konakladığı ortamda kendinizi evinizde hissedeceksiniz.",
        accommodationEN: "Our 4-star historic Tbilisi hotels combine traditional architecture with modern comfort in the old district of the city. You will feel at home in an environment where Russian guests also stay.",
        accommodationRU: "Наши 4-звездочные исторические отели в Тбилиси сочетают в себе традиционную архитектуру с современным комфортом в старом районе города. Вы будете чувствовать себя как дома в среде, где также останавливаются российские гости.",
        accommodationKA: "ჩვენი 4-ვარსკვლავიანი ისტორიული თბილისის სასტუმროები აერთიანებენ ტრადიციულ არქიტექტურას თანამედროვე კომფორტთან ქალაქის ძველ უბანში. თქვენ იგრძნობთ თავს სახლში გარემოში, სადაც რუსი სტუმრებიც რჩებიან.",
        transportationTR: "Tiflis Havalimanı'ndan özel VIP transferleriniz ve şehir içi ulaşımlarınız lüks araçlarla sağlanacak. Tüm gezilerinizde Rusça konuşan özel rehber hizmeti sunulmaktadır.",
        transportationEN: "Your private VIP transfers from Tbilisi Airport and your transportation within the city will be provided with luxury vehicles. Special Russian-speaking guide service is offered for all your excursions.",
        transportationRU: "Ваши частные VIP-трансферы из аэропорта Тбилиси и ваше передвижение по городу будут обеспечены роскошными автомобилями. Для всех ваших экскурсий предлагается услуга специального русскоговорящего гида.",
        transportationKA: "თქვენი კერძო VIP ტრანსფერები თბილისის აეროპორტიდან და თქვენი ტრანსპორტირება ქალაქში უზრუნველყოფილი იქნება ძვირადღირებული მანქანებით. ყველა თქვენი ექსკურსიისთვის შეთავაზებულია სპეციალური რუსულენოვანი გიდის მომსახურება.",
        activitiesTR: "Paketiniz kapsamında: Tiflis tarihi merkezinin detaylı turu, Rus-Gürcü dostluğu müzesi ziyareti, Rus kültürel mirasının önemli mekanları, geleneksel Gürcü şarap tadımı ve yerel gastronomide Rus etkisi workshopuna katılım.",
        activitiesEN: "Within the scope of your package: Detailed tour of Tbilisi historical center, visit to the Russian-Georgian friendship museum, important venues of Russian cultural heritage, traditional Georgian wine tasting, and participation in a workshop on Russian influence in local gastronomy.",
        activitiesRU: "В рамках вашего пакета: Подробная экскурсия по историческому центру Тбилиси, посещение музея российско-грузинской дружбы, важные места российского культурного наследия, традиционная дегустация грузинских вин и участие в мастер-классе о российском влиянии в местной гастрономии.",
        activitiesKA: "თქვენი პაკეტის ფარგლებში: თბილისის ისტორიული ცენტრის დეტალური ტური, რუსულ-ქართული მეგობრობის მუზეუმის დათვალიერება, რუსული კულტურული მემკვიდრეობის მნიშვნელოვანი ადგილები, ტრადიციული ქართული ღვინის დეგუსტაცია და ადგილობრივ გასტრონომიაში რუსული გავლენის შესახებ სემინარში მონაწილეობა."
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
        order: 3,
        // Zorunlu alanlar eklenmiş hali
        accommodationTR: "5 yıldızlı lüks otellerimiz Tiflis'in modern bölgesinde yer almaktadır. Azeri misafirlerimizin özel ihtiyaçlarına göre tasarlanmış odalar ve daireler mevcuttur.",
        accommodationEN: "Our 5-star luxury hotels are located in the modern district of Tbilisi. Rooms and apartments designed according to the special needs of our Azerbaijani guests are available.",
        accommodationRU: "Наши 5-звездочные роскошные отели расположены в современном районе Тбилиси. Доступны номера и апартаменты, разработанные в соответствии с особыми потребностями наших азербайджанских гостей.",
        accommodationKA: "ჩვენი 5-ვარსკვლავიანი ლუქს სასტუმროები მდებარეობს თბილისის თანამედროვე უბანში. ხელმისაწვდომია ოთახები და აპარტამენტები, რომლებიც შექმნილია ჩვენი აზერბაიჯანელი სტუმრების სპეციალური საჭიროებების მიხედვით.",
        transportationTR: "Lüks araçlarla VIP transfer hizmeti ve tüm şehir içi ulaşımlar. Azeri konuşan özel şoför ve rehber 24 saat hizmetinizdedir.",
        transportationEN: "VIP transfer service with luxury vehicles and all intra-city transportation. Azerbaijani-speaking private driver and guide are at your service 24 hours a day.",
        transportationRU: "VIP-трансфер на роскошных автомобилях и весь городской транспорт. Частный водитель и гид, говорящие на азербайджанском языке, к вашим услугам 24 часа в сутки.",
        transportationKA: "VIP ტრანსფერის სერვისი ძვირადღირებული ავტომობილებით და ყველა შიდა საქალაქო ტრანსპორტირება. აზერბაიჯანულენოვანი კერძო მძღოლი და გიდი თქვენს განკარგულებაშია დღე-ღამის 24 საათის განმავლობაში.",
        activitiesTR: "Paketinizde yer alan aktiviteler: Tiflis Modern Mimari Turu, Azerbaycan-Gürcistan Dostluk Müzesi, Azerbaycan restoranlarında özel akşam yemekleri, Azerbaycan kültür mirası tanıtımı, Tiflis Güzellik Merkezi'nde cilt bakımı.",
        activitiesEN: "Activities included in your package: Tbilisi Modern Architecture Tour, Azerbaijan-Georgia Friendship Museum, special dinners at Azerbaijani restaurants, introduction to Azerbaijan cultural heritage, skin care at Tbilisi Beauty Center.",
        activitiesRU: "Мероприятия, включенные в ваш пакет: Тур по современной архитектуре Тбилиси, Музей дружбы Азербайджан-Грузия, специальные ужины в азербайджанских ресторанах, знакомство с культурным наследием Азербайджана, уход за кожей в Центре красоты Тбилиси.",
        activitiesKA: "თქვენს პაკეტში შემავალი აქტივობები: თბილისის თანამედროვე არქიტექტურის ტური, აზერბაიჯან-საქართველოს მეგობრობის მუზეუმი, სპეციალური ვახშმები აზერბაიჯანულ რესტორნებში, აზერბაიჯანის კულტურული მემკვიდრეობის გაცნობა, კანის მოვლა თბილისის სილამაზის ცენტრში."
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
        order: 4,
        // Zorunlu alanlar eklenmiş hali
        accommodationTR: "Tiflis'in en lüks semtlerinde deluxe 5 yıldızlı otellerde konaklama. Geniş odalar, spa ve masaj hizmetleri, havuz ve fitness merkezi dahil. Kazak misafirlere özel olarak VIP süitler tahsis edilmektedir.",
        accommodationEN: "Accommodation in deluxe 5-star hotels in the most luxurious districts of Tbilisi. Spacious rooms, spa and massage services, pool and fitness center included. VIP suites are allocated specially for Kazakh guests.",
        accommodationRU: "Размещение в роскошных 5-звездочных отелях в самых шикарных районах Тбилиси. Просторные номера, спа и массажные услуги, бассейн и фитнес-центр включены. Специально для казахстанских гостей выделяются VIP-люксы.",
        accommodationKA: "განთავსება დელუქს 5-ვარსკვლავიან სასტუმროებში თბილისის ყველაზე ფეშენებელურ უბნებში. ფართო ოთახები, სპა და მასაჟის სერვისები, აუზი და ფიტნეს ცენტრი. VIP აპარტამენტები გამოყოფილია სპეციალურად ყაზახი სტუმრებისთვის.",
        transportationTR: "Premium lüks araçlarla özel VIP transfer. Kişisel şoför hizmeti, özel tur otobüsleri, Kazak konuşan profesyonel rehberler. Şehir turu ve çevre gezileri için premium araç hizmetleri.",
        transportationEN: "Private VIP transfer with premium luxury vehicles. Personal chauffeur service, private tour buses, Kazakh-speaking professional guides. Premium vehicle services for city tours and excursions.",
        transportationRU: "Частный VIP-трансфер на премиальных роскошных автомобилях. Услуги личного шофера, частные туристические автобусы, профессиональные гиды, говорящие на казахском языке. Услуги премиум-автомобилей для экскурсий по городу и экскурсий.",
        transportationKA: "კერძო VIP ტრანსფერი პრემიუმ ლუქს მანქანებით. პირადი მძღოლის მომსახურება, კერძო ტურისტული ავტობუსები, ყაზახურენოვანი პროფესიონალი გიდები. პრემიუმ ავტომობილების მომსახურება საქალაქო ტურებისა და ექსკურსიებისთვის.",
        activitiesTR: "Paketinize dahil özel aktiviteler: VIP Tiflis şehir turu, Kazak-Gürcü kültürü ortak etkinlikler, geleneksel Kazak yemekleri yapan aşçı ile özel atölye çalışması, özel müze ve sanat galerisi ziyaretleri, yerel zanaatkarlarla VIP görüşmeler, özel alışveriş turu.",
        activitiesEN: "Special activities included in your package: VIP Tbilisi city tour, Kazakh-Georgian culture joint events, special workshop with a chef making traditional Kazakh dishes, special museum and art gallery visits, VIP meetings with local artisans, special shopping tour.",
        activitiesRU: "Специальные мероприятия, включенные в ваш пакет: VIP-тур по Тбилиси, совместные мероприятия казахской и грузинской культуры, специальный мастер-класс с шеф-поваром, готовящим традиционные казахские блюда, специальные посещения музеев и художественных галерей, VIP-встречи с местными ремесленниками, специальный шоппинг-тур.",
        activitiesKA: "თქვენს პაკეტში შემავალი სპეციალური აქტივობები: VIP თბილისის საქალაქო ტური, ყაზახურ-ქართული კულტურის ერთობლივი ღონისძიებები, სპეციალური სემინარი შეფ-მზარეულთან, რომელიც ამზადებს ტრადიციულ ყაზახურ კერძებს, სპეციალური მუზეუმისა და ხელოვნების გალერეის ვიზიტები, VIP შეხვედრები ადგილობრივ ხელოსნებთან, სპეციალური შოპინგის ტური."
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
        order: 5,
        // Zorunlu alanlar eklenmiş hali
        accommodationTR: "Tiflis'in yeşillikler içindeki bölgelerinde yer alan butik otellerde konaklama. Ukraynalı turistlerin tercih ettiği otellerde rahat edecek, kendinizi evinizde hissedeceksiniz.",
        accommodationEN: "Accommodation in boutique hotels located in the green areas of Tbilisi. You will feel comfortable and at home in hotels preferred by Ukrainian tourists.",
        accommodationRU: "Размещение в бутик-отелях, расположенных в зеленых районах Тбилиси. Вы будете чувствовать себя комфортно и как дома в отелях, предпочитаемых украинскими туристами.",
        accommodationKA: "განთავსება ბუტიკის სასტუმროებში, რომლებიც მდებარეობს თბილისის მწვანე უბნებში. თქვენ იგრძნობთ თავს კომფორტულად და სახლში სასტუმროებში, რომლებსაც უპირატესობას ანიჭებენ უკრაინელი ტურისტები.",
        transportationTR: "Havaalanından doğrudan otelinize özel transfer. Ayrıca tüm şehir içi geziler, doğa turları için araç hizmetleri ve Ukraynaca konuşan profesyonel rehberler eşliğinde ulaşım.",
        transportationEN: "Special transfer directly from the airport to your hotel. Also, vehicle services for all city trips, nature tours, and transportation accompanied by Ukrainian-speaking professional guides.",
        transportationRU: "Специальный трансфер прямо из аэропорта в ваш отель. Также услуги автомобилей для всех городских поездок, природных туров и транспорт в сопровождении профессиональных гидов, говорящих по-украински.",
        transportationKA: "სპეციალური ტრანსფერი პირდაპირ აეროპორტიდან თქვენს სასტუმრომდე. ასევე, სატრანსპორტო საშუალებების მომსახურება ყველა საქალაქო მოგზაურობისთვის, ბუნების ტურებისთვის და ტრანსპორტირება უკრაინულენოვანი პროფესიონალი გიდების თანხლებით.",
        activitiesTR: "Paketinizde yer alan aktiviteler: Tiflis'in doğal güzelliklerini keşif turu, organik çiftlik ziyareti, Ukrayna-Gürcistan kültürel bağları üzerine interaktif seminer, yerel şarap tadımı, Ukrayna restoranlarında akşam yemeği, doğa sporları aktiviteleri.",
        activitiesEN: "Activities included in your package: Exploration tour of Tbilisi's natural beauties, organic farm visit, interactive seminar on Ukrainian-Georgian cultural ties, local wine tasting, dinner at Ukrainian restaurants, nature sports activities.",
        activitiesRU: "Мероприятия, включенные в ваш пакет: Экскурсионный тур по природным красотам Тбилиси, посещение органической фермы, интерактивный семинар по украинско-грузинским культурным связям, дегустация местных вин, ужин в украинских ресторанах, мероприятия природного спорта.",
        activitiesKA: "თქვენს პაკეტში შემავალი აქტივობები: თბილისის ბუნებრივი სილამაზის აღმოჩენის ტური, ორგანული ფერმის მონახულება, ინტერაქტიული სემინარი უკრაინულ-ქართულ კულტურულ კავშირებზე, ადგილობრივი ღვინის დეგუსტაცია, ვახშამი უკრაინულ რესტორნებში, ბუნებრივი სპორტის აქტივობები."
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