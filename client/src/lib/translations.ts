import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Our translations object with simple key structure
// Translations object (exported for direct usage in components)
export const translations: Record<string, LanguageMap> = {
  // Eksik çeviriler
  "services.exclusive": {
    [Language.Turkish]: "Özel Hizmet",
    [Language.English]: "Exclusive Service",
    [Language.Russian]: "Эксклюзивное обслуживание",
    [Language.Georgian]: "ექსკლუზიური მომსახურება"
  },
  "services.satisfaction": {
    [Language.Turkish]: "100% Memnuniyet Garantisi",
    [Language.English]: "100% Satisfaction Guarantee",
    [Language.Russian]: "100% гарантия удовлетворения",
    [Language.Georgian]: "100% კმაყოფილების გარანტია"
  },
  // Common
  "common.home": {
    [Language.Turkish]: "Ana Sayfa",
    [Language.English]: "Home",
    [Language.Russian]: "Главная",
    [Language.Georgian]: "მთავარი"
  },
  "common.services": {
    [Language.Turkish]: "Hizmetler",
    [Language.English]: "Services",
    [Language.Russian]: "Услуги",
    [Language.Georgian]: "მომსახურება"
  },
  "common.packages": {
    [Language.Turkish]: "Paketler",
    [Language.English]: "Packages",
    [Language.Russian]: "Пакеты",
    [Language.Georgian]: "პაკეტები"
  },
  "common.products": {
    [Language.Turkish]: "Ürünler",
    [Language.English]: "Products",
    [Language.Russian]: "Продукты",
    [Language.Georgian]: "პროდუქტები"
  },
  "common.blog": {
    [Language.Turkish]: "Blog",
    [Language.English]: "Blog",
    [Language.Russian]: "Блог",
    [Language.Georgian]: "ბლოგი"
  },
  "common.gallery": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "common.about": {
    [Language.Turkish]: "Hakkımızda",
    [Language.English]: "About",
    [Language.Russian]: "О нас",
    [Language.Georgian]: "ჩვენს შესახებ"
  },
  "common.contact": {
    [Language.Turkish]: "İletişim",
    [Language.English]: "Contact",
    [Language.Russian]: "Контакты",
    [Language.Georgian]: "კონტაქტი"
  },
  "common.contactViaWhatsApp": {
    [Language.Turkish]: "WhatsApp ile İletişime Geç",
    [Language.English]: "Contact via WhatsApp",
    [Language.Russian]: "Связаться через WhatsApp",
    [Language.Georgian]: "დაგვიკავშირდით WhatsApp-ით"
  },
  "common.askViaSms": {
    [Language.Turkish]: "SMS ile Sor",
    [Language.English]: "Ask via SMS",
    [Language.Russian]: "Спросить через SMS",
    [Language.Georgian]: "კითხვა SMS-ით"
  },
  "common.buyNow": {
    [Language.Turkish]: "Satın Al",
    [Language.English]: "Buy Now",
    [Language.Russian]: "Купить сейчас",
    [Language.Georgian]: "ყიდვა ახლავე"
  },
  "common.appointment": {
    [Language.Turkish]: "Randevu",
    [Language.English]: "Appointment",
    [Language.Russian]: "Запись",
    [Language.Georgian]: "ჯავშანი"
  },
  "common.track.appointment": {
    [Language.Turkish]: "Randevu Sorgulama",
    [Language.English]: "Track Appointment",
    [Language.Russian]: "Отслеживание записи",
    [Language.Georgian]: "ჯავშნის მიდევნება"
  },
  "common.price": {
    [Language.Turkish]: "Fiyat",
    [Language.English]: "Price",
    [Language.Russian]: "Цена",
    [Language.Georgian]: "ფასი"
  },
  "common.features": {
    [Language.Turkish]: "Özellikler",
    [Language.English]: "Features",
    [Language.Russian]: "Особенности",
    [Language.Georgian]: "ფუნქციები"
  },
  "common.learnMore": {
    [Language.Turkish]: "Daha Fazla Bilgi",
    [Language.English]: "Learn More",
    [Language.Russian]: "Узнать больше",
    [Language.Georgian]: "მეტის გაგება"
  },
  
  // Packages Page
  "packages.title": {
    [Language.Turkish]: "Tedavi ve Konaklama Paketleri",
    [Language.English]: "Treatment and Accommodation Packages",
    [Language.Russian]: "Пакеты лечения и проживания",
    [Language.Georgian]: "მკურნალობისა და საცხოვრებელი პაკეტები"
  },
  "packages.subtitle": {
    [Language.Turkish]: "Size özel hazırlanmış en uygun paketlerimizi keşfedin",
    [Language.English]: "Discover our best packages tailored for you",
    [Language.Russian]: "Откройте для себя наши лучшие пакеты, созданные специально для вас",
    [Language.Georgian]: "აღმოაჩინეთ ჩვენი საუკეთესო პაკეტები, რომლებიც შექმნილია თქვენთვის"
  },
  "packages.from": {
    [Language.Turkish]: "Başlangıç",
    [Language.English]: "From",
    [Language.Russian]: "От",
    [Language.Georgian]: "დან"
  },
  "packages.details": {
    [Language.Turkish]: "Paket Detayları",
    [Language.English]: "Package Details",
    [Language.Russian]: "Детали пакета",
    [Language.Georgian]: "პაკეტის დეტალები"
  },
  "packages.included": {
    [Language.Turkish]: "Pakete Dahil",
    [Language.English]: "Included in Package",
    [Language.Russian]: "Включено в пакет",
    [Language.Georgian]: "შედის პაკეტში"
  },
  "packages.bookNow": {
    [Language.Turkish]: "Hemen Randevu Al",
    [Language.English]: "Book Now",
    [Language.Russian]: "Забронировать сейчас",
    [Language.Georgian]: "დაჯავშნე ახლავე"
  },
  "packages.inquire": {
    [Language.Turkish]: "Bilgi Al",
    [Language.English]: "Get Information",
    [Language.Russian]: "Получить информацию",
    [Language.Georgian]: "მიიღეთ ინფორმაცია"
  },
  "packages.noPackages": {
    [Language.Turkish]: "Şu anda mevcut paket bulunmamaktadır.",
    [Language.English]: "There are no packages available at the moment.",
    [Language.Russian]: "В настоящее время нет доступных пакетов.",
    [Language.Georgian]: "ამჟამად პაკეტები არ არის ხელმისაწვდომი."
  },
  
  // Services Page
  "services.subtitle": {
    [Language.Turkish]: "Saç ekimi ve estetik hizmetlerimiz",
    [Language.English]: "Our hair transplantation and aesthetic services",
    [Language.Russian]: "Наши услуги по трансплантации волос и эстетике",
    [Language.Georgian]: "ჩვენი თმის გადანერგვისა და ესთეტიკური სერვისები"
  },
  "services.bookAppointment": {
    [Language.Turkish]: "Randevu Al",
    [Language.English]: "Book Appointment",
    [Language.Russian]: "Записаться на прием",
    [Language.Georgian]: "დაჯავშნეთ შეხვედრა"
  },
  "services.allServices": {
    [Language.Turkish]: "Tüm Hizmetler",
    [Language.English]: "All Services",
    [Language.Russian]: "Все услуги",
    [Language.Georgian]: "ყველა სერვისი"
  },
  "services.features.consultation": {
    [Language.Turkish]: "Ücretsiz konsültasyon",
    [Language.English]: "Free consultation",
    [Language.Russian]: "Бесплатная консультация",
    [Language.Georgian]: "უფასო კონსულტაცია"
  },
  "services.features.aftercare": {
    [Language.Turkish]: "İşlem sonrası bakım desteği",
    [Language.English]: "Post-procedure aftercare",
    [Language.Russian]: "Послепроцедурный уход",
    [Language.Georgian]: "პროცედურის შემდგომი მოვლა"
  },
  "services.features.support": {
    [Language.Turkish]: "7/24 WhatsApp desteği",
    [Language.English]: "24/7 WhatsApp support",
    [Language.Russian]: "Поддержка WhatsApp 24/7",
    [Language.Georgian]: "24/7 WhatsApp მხარდაჭერა"
  },
  "services.features.satisfaction": {
    [Language.Turkish]: "Memnuniyet garantisi",
    [Language.English]: "Satisfaction guarantee",
    [Language.Russian]: "Гарантия удовлетворенности",
    [Language.Georgian]: "კმაყოფილების გარანტია"
  },
  "services.badge": {
    [Language.Turkish]: "UZMAN TEDAVİLERİ",
    [Language.English]: "EXPERT TREATMENTS",
    [Language.Russian]: "ЭКСПЕРТНОЕ ЛЕЧЕНИЕ",
    [Language.Georgian]: "ექსპერტული მკურნალობა"
  },
  "services.popular": {
    [Language.Turkish]: "POPÜLER",
    [Language.English]: "POPULAR",
    [Language.Russian]: "ПОПУЛЯРНЫЙ",
    [Language.Georgian]: "პოპულარული"
  },
  "services.viewAll": {
    [Language.Turkish]: "Tüm Hizmetleri Gör",
    [Language.English]: "View All Services",
    [Language.Russian]: "Посмотреть все услуги",
    [Language.Georgian]: "ნახეთ ყველა სერვისი"
  },
  "services.detailedInfo": {
    [Language.Turkish]: "Detaylı Bilgi",
    [Language.English]: "Detailed Info",
    [Language.Russian]: "Подробная Информация",
    [Language.Georgian]: "დეტალური ინფორმაცია"
  },
  "services.keyFeatures": {
    [Language.Turkish]: "Temel Özellikler",
    [Language.English]: "Key Features",
    [Language.Russian]: "Ключевые Особенности",
    [Language.Georgian]: "ძირითადი მახასიათებლები"
  },
  "services.details": {
    [Language.Turkish]: "Detaylar",
    [Language.English]: "Details",
    [Language.Russian]: "Детали",
    [Language.Georgian]: "დეტალები"
  },
  "services.procedureSteps": {
    [Language.Turkish]: "Prosedür Adımları",
    [Language.English]: "Procedure Steps",
    [Language.Russian]: "Шаги Процедуры",
    [Language.Georgian]: "პროცედურის ეტაპები"
  },
  "services.candidateInfo": {
    [Language.Turkish]: "İdeal Adaylar",
    [Language.English]: "Ideal Candidates",
    [Language.Russian]: "Идеальные Кандидаты",
    [Language.Georgian]: "იდეალური კანდიდატები"
  },
  "services.overview": {
    [Language.Turkish]: "Genel Bakış",
    [Language.English]: "Overview",
    [Language.Russian]: "Обзор",
    [Language.Georgian]: "მიმოხილვა"
  },
  "services.readyToStart": {
    [Language.Turkish]: "Başlamaya Hazır mısınız?",
    [Language.English]: "Ready to Start?",
    [Language.Russian]: "Готовы Начать?",
    [Language.Georgian]: "მზად ხართ დასაწყებად?"
  },
  "services.appointmentCTA": {
    [Language.Turkish]: "Profesyonel ekibimizle kişiselleştirilmiş bir danışma randevusu alın.",
    [Language.English]: "Schedule a personalized consultation with our professional team.",
    [Language.Russian]: "Запишитесь на персонализированную консультацию с нашей профессиональной командой.",
    [Language.Georgian]: "დანიშნეთ პერსონალიზებული კონსულტაცია ჩვენს პროფესიონალურ გუნდთან."
  },
  "services.beforeAfter": {
    [Language.Turkish]: "Öncesi ve Sonrası",
    [Language.English]: "Before & After",
    [Language.Russian]: "До и После",
    [Language.Georgian]: "მანამდე და შემდეგ"
  },
  "services.comingSoon": {
    [Language.Turkish]: "Yakında",
    [Language.English]: "Coming Soon",
    [Language.Russian]: "Скоро",
    [Language.Georgian]: "მალე"
  },

  "services.flipToSeeMore": {
    [Language.Turkish]: "Daha Fazlası İçin Tıklayın",
    [Language.English]: "Click for More Details",
    [Language.Russian]: "Нажмите для Подробностей",
    [Language.Georgian]: "დააჭირეთ დეტალებისთვის"
  },
  "common.duration": {
    [Language.Turkish]: "dakika",
    [Language.English]: "minutes",
    [Language.Russian]: "минут",
    [Language.Georgian]: "წუთი"
  },
  "common.tryAgain": {
    [Language.Turkish]: "Tekrar Deneyin",
    [Language.English]: "Try Again",
    [Language.Russian]: "Попробуйте снова",
    [Language.Georgian]: "სცადეთ ხელახლა"
  },
  "services.features.naturalResults": {
    [Language.Turkish]: "Doğal sonuçlar",
    [Language.English]: "Natural results",
    [Language.Russian]: "Естественные результаты",
    [Language.Georgian]: "ბუნებრივი შედეგები"
  },
  "services.features.permanentSolution": {
    [Language.Turkish]: "Kalıcı çözüm",
    [Language.English]: "Permanent solution",
    [Language.Russian]: "Постоянное решение",
    [Language.Georgian]: "მუდმივი გადაწყვეტა"
  },
  "services.features.customDesign": {
    [Language.Turkish]: "Kişiye özel tasarım",
    [Language.English]: "Custom design",
    [Language.Russian]: "Индивидуальный дизайн",
    [Language.Georgian]: "ინდივიდუალური დიზაინი"
  },
  "services.features.naturalAppearance": {
    [Language.Turkish]: "Doğal görünüm",
    [Language.English]: "Natural appearance",
    [Language.Russian]: "Естественный вид",
    [Language.Georgian]: "ბუნებრივი გარეგნობა"
  },
  "services.features.densityControl": {
    [Language.Turkish]: "Yoğunluk kontrolü",
    [Language.English]: "Density control",
    [Language.Russian]: "Контроль плотности",
    [Language.Georgian]: "სიმკვრივის კონტროლი"
  },
  "services.features.facialHarmony": {
    [Language.Turkish]: "Yüz hatlarıyla uyum",
    [Language.English]: "Facial harmony",
    [Language.Russian]: "Гармония лица",
    [Language.Georgian]: "სახის ჰარმონია"
  },
  "services.features.regeneration": {
    [Language.Turkish]: "Saç yenilenmesi",
    [Language.English]: "Hair regeneration",
    [Language.Russian]: "Регенерация волос",
    [Language.Georgian]: "თმის რეგენერაცია"
  },
  "services.features.noChemicals": {
    [Language.Turkish]: "Doğal içerikli",
    [Language.English]: "No harsh chemicals",
    [Language.Russian]: "Без агрессивных химикатов",
    [Language.Georgian]: "უქიმიკატო"
  },
  "services.features.hairStrength": {
    [Language.Turkish]: "Saç güçlendirme",
    [Language.English]: "Hair strengthening",
    [Language.Russian]: "Укрепление волос",
    [Language.Georgian]: "თმის გაძლიერება"
  },
  "services.features.scalpeHealth": {
    [Language.Turkish]: "Saç derisi sağlığı",
    [Language.English]: "Scalp health",
    [Language.Russian]: "Здоровье кожи головы",
    [Language.Georgian]: "თავის კანის ჯანმრთელობა"
  },
  "services.popular.label": {
    [Language.Turkish]: "Popüler",
    [Language.English]: "Popular",
    [Language.Russian]: "Популярный",
    [Language.Georgian]: "პოპულარული"
  },
  
  "services.postCare": {
    [Language.Turkish]: "Bakım Süreci",
    [Language.English]: "Aftercare Process",
    [Language.Russian]: "Процесс последующего ухода",
    [Language.Georgian]: "მოვლის პროცესი"
  },
  "services.procedureTimeline": {
    [Language.Turkish]: "İşlem Zaman Çizelgesi",
    [Language.English]: "Procedure Timeline",
    [Language.Russian]: "График Процедуры",
    [Language.Georgian]: "პროცედურის დროის გრაფიკი"
  },
  "services.timelineDescription": {
    [Language.Turkish]: "Saç ekimi sürecinin aşamaları ve her adımda ne bekleyeceğiniz.",
    [Language.English]: "The stages of the hair transplant process and what to expect at each step.",
    [Language.Russian]: "Этапы процесса трансплантации волос и чего ожидать на каждом шаге.",
    [Language.Georgian]: "თმის გადანერგვის პროცესის ეტაპები და რას უნდა ელოდოთ თითოეულ ნაბიჯზე."
  },
  "services.results": {
    [Language.Turkish]: "GERÇEK SONUÇLAR",
    [Language.English]: "REAL RESULTS",
    [Language.Russian]: "РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ",
    [Language.Georgian]: "ნამდვილი შედეგები"
  },
  "services.resultsStats": {
    [Language.Turkish]: "BAŞARILI İSTATİSTİKLER",
    [Language.English]: "SUCCESS STATISTICS",
    [Language.Russian]: "СТАТИСТИКА УСПЕХА",
    [Language.Georgian]: "წარმატების სტატისტიკა"
  },
  "services.resultsDescription": {
    [Language.Turkish]: "Yılların deneyimi ve yüksek hasta memnuniyetiyle gurur duyuyoruz",
    [Language.English]: "We pride ourselves on years of experience and high patient satisfaction",
    [Language.Russian]: "Мы гордимся многолетним опытом и высокой удовлетворенностью пациентов",
    [Language.Georgian]: "ჩვენ ვამაყობთ მრავალწლიანი გამოცდილებით და პაციენტების მაღალი კმაყოფილებით"
  },
  "services.statHappyPatients": {
    [Language.Turkish]: "Mutlu Hasta",
    [Language.English]: "Happy Patients",
    [Language.Russian]: "Довольных пациентов",
    [Language.Georgian]: "კმაყოფილი პაციენტები"
  },
  "services.statSuccessRate": {
    [Language.Turkish]: "Başarı Oranı",
    [Language.English]: "Success Rate",
    [Language.Russian]: "Показатель успеха",
    [Language.Georgian]: "წარმატების მაჩვენებელი"
  },
  "services.statYearsExperience": {
    [Language.Turkish]: "Yıllık Deneyim",
    [Language.English]: "Years Experience",
    [Language.Russian]: "Лет опыта",
    [Language.Georgian]: "წლიანი გამოცდილება"
  },
  "services.statCountries": {
    [Language.Turkish]: "Ülkeden Hasta",
    [Language.English]: "Countries Served",
    [Language.Russian]: "Обслуживаемых стран",
    [Language.Georgian]: "მომსახურებული ქვეყნები"
  },
  "services.bookingDescription": {
    [Language.Turkish]: "Ücretsiz konsültasyon için randevu alın",
    [Language.English]: "Schedule a free consultation",
    [Language.Russian]: "Запишитесь на бесплатную консультацию",
    [Language.Georgian]: "დანიშნეთ უფასო კონსულტაცია"
  },
  "services.beforeAfterDescription": {
    [Language.Turkish]: "Gerçek hastalarımızın saç ekimi öncesi ve sonrası dönüşümlerini görün",
    [Language.English]: "See the before and after transformations of our real patients",
    [Language.Russian]: "Посмотрите на трансформации до и после у наших реальных пациентов",
    [Language.Georgian]: "იხილეთ ჩვენი ნამდვილი პაციენტების ტრანსფორმაცია"
  },
  "services.beforeAfterDisclaimer": {
    [Language.Turkish]: "Sonuçlar kişiden kişiye değişebilir. Kendi saç ekimi sonuçlarınız hakkında daha fazla bilgi için ücretsiz konsültasyon randevusu alın.",
    [Language.English]: "Results may vary from person to person. Schedule a free consultation appointment for more information about your own hair transplant results.",
    [Language.Russian]: "Результаты могут отличаться в зависимости от человека. Запишитесь на бесплатную консультацию для получения дополнительной информации о результатах вашей трансплантации волос.",
    [Language.Georgian]: "შედეგები შეიძლება განსხვავდებოდეს პიროვნებიდან პიროვნებამდე. დანიშნეთ უფასო კონსულტაცია თქვენი თმის გადანერგვის შედეგების შესახებ მეტი ინფორმაციისთვის."
  },
  "services.viewMoreResults": {
    [Language.Turkish]: "Daha Fazla Sonuç Gör",
    [Language.English]: "View More Results",
    [Language.Russian]: "Посмотреть Больше Результатов",
    [Language.Georgian]: "იხილეთ მეტი შედეგი"
  },
  // Timeline translations
  "services.timeline.step1Title": {
    [Language.Turkish]: "Ücretsiz Konsültasyon",
    [Language.English]: "Free Consultation",
    [Language.Russian]: "Бесплатная Консультация",
    [Language.Georgian]: "უფასო კონსულტაცია"
  },
  "services.timeline.step1Description": {
    [Language.Turkish]: "Saç ekimi uzmanımızla kişisel ihtiyaçlarınızı ve beklentilerinizi değerlendiren bir konsültasyon yapın.",
    [Language.English]: "Have a consultation with our hair transplant specialist to assess your personal needs and expectations.",
    [Language.Russian]: "Пройдите консультацию с нашим специалистом по трансплантации волос, чтобы оценить ваши личные потребности и ожидания.",
    [Language.Georgian]: "გაიარეთ კონსულტაცია ჩვენს თმის გადანერგვის სპეციალისტთან თქვენი პირადი საჭიროებებისა და მოლოდინების შესაფასებლად."
  },
  "services.timeline.step1Highlight1": {
    [Language.Turkish]: "Saç analizi",
    [Language.English]: "Hair analysis",
    [Language.Russian]: "Анализ волос",
    [Language.Georgian]: "თმის ანალიზი"
  },
  "services.timeline.step1Highlight2": {
    [Language.Turkish]: "Kişisel plan",
    [Language.English]: "Personalized plan",
    [Language.Russian]: "Персонализированный план",
    [Language.Georgian]: "პერსონალიზებული გეგმა"
  },
  "services.timeline.step2Title": {
    [Language.Turkish]: "İşlem Öncesi Hazırlık",
    [Language.English]: "Pre-Procedure Preparation",
    [Language.Russian]: "Подготовка перед процедурой",
    [Language.Georgian]: "პროცედურამდე მომზადება"
  },
  "services.timeline.step2Description": {
    [Language.Turkish]: "İşlem günü için tüm gerekli hazırlıklar ve takip edilmesi gereken adımlar hakkında bilgilendirme.",
    [Language.English]: "Information about all necessary preparations and steps to follow for the procedure day.",
    [Language.Russian]: "Информация обо всех необходимых приготовлениях и шагах, которые нужно выполнить в день процедуры.",
    [Language.Georgian]: "ინფორმაცია პროცედურის დღისთვის ყველა საჭირო მომზადებისა და გასავლელი ნაბიჯების შესახებ."
  },
  "services.timeline.step2Highlight1": {
    [Language.Turkish]: "Beslenme tavsiyeleri",
    [Language.English]: "Nutrition advice",
    [Language.Russian]: "Советы по питанию",
    [Language.Georgian]: "კვების რჩევები"
  },
  "services.timeline.step2Highlight2": {
    [Language.Turkish]: "İlaç kısıtlamaları",
    [Language.English]: "Medication restrictions",
    [Language.Russian]: "Ограничения на лекарства",
    [Language.Georgian]: "მედიკამენტების შეზღუდვები"
  },
  "services.timeline.step3Title": {
    [Language.Turkish]: "Saç Ekimi İşlemi",
    [Language.English]: "Hair Transplant Procedure",
    [Language.Russian]: "Процедура трансплантации волос",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა"
  },
  "services.timeline.step3Description": {
    [Language.Turkish]: "Modern FUE veya DHI teknikleri kullanılarak saç foliküllerinin nakli işlemi gerçekleştirilir.",
    [Language.English]: "Hair follicle transplantation is performed using modern FUE or DHI techniques.",
    [Language.Russian]: "Трансплантация волосяных фолликулов выполняется с использованием современных методов FUE или DHI.",
    [Language.Georgian]: "თმის ფოლიკულების გადანერგვა ხორციელდება თანამედროვე FUE ან DHI ტექნიკის გამოყენებით."
  },
  "services.timeline.step3Highlight1": {
    [Language.Turkish]: "Ağrısız uygulama",
    [Language.English]: "Painless application",
    [Language.Russian]: "Безболезненное применение",
    [Language.Georgian]: "უმტკივნეულო პროცედურა"
  },
  "services.timeline.step3Highlight2": {
    [Language.Turkish]: "Doğal saç çizgisi",
    [Language.English]: "Natural hairline",
    [Language.Russian]: "Естественная линия волос",
    [Language.Georgian]: "ბუნებრივი თმის ხაზი"
  },
  "services.timeline.step4Title": {
    [Language.Turkish]: "İşlem Sonrası Bakım",
    [Language.English]: "Post-Procedure Care",
    [Language.Russian]: "Уход после процедуры",
    [Language.Georgian]: "პროცედურის შემდგომი მოვლა"
  },
  "services.timeline.step4Description": {
    [Language.Turkish]: "İlk günlerde dikkat edilmesi gereken önemli bakım adımları ve iyileşme sürecinin yönetimi.",
    [Language.English]: "Important care steps to follow in the first days and management of the healing process.",
    [Language.Russian]: "Важные этапы ухода, которым нужно следовать в первые дни, и управление процессом заживления.",
    [Language.Georgian]: "პირველ დღეებში გასავლელი მნიშვნელოვანი მოვლის ეტაპები და განკურნების პროცესის მართვა."
  },
  "services.timeline.step4Highlight1": {
    [Language.Turkish]: "Yıkama talimatları",
    [Language.English]: "Washing instructions",
    [Language.Russian]: "Инструкции по мытью",
    [Language.Georgian]: "დაბანის ინსტრუქციები"
  },
  "services.timeline.step4Highlight2": {
    [Language.Turkish]: "Uyku pozisyonu",
    [Language.English]: "Sleep position",
    [Language.Russian]: "Положение для сна",
    [Language.Georgian]: "ძილის პოზიცია"
  },
  "services.timeline.step5Title": {
    [Language.Turkish]: "Uzun Vadeli Sonuçlar",
    [Language.English]: "Long-Term Results",
    [Language.Russian]: "Долгосрочные результаты",
    [Language.Georgian]: "გრძელვადიანი შედეგები"
  },
  "services.timeline.step5Description": {
    [Language.Turkish]: "İlk aylardan sonra göreceğiniz sonuçlar ve yeni saçlarınızın tam olarak büyüme süreci.",
    [Language.English]: "Results you will see after the first months and the complete growth process of your new hair.",
    [Language.Russian]: "Результаты, которые вы увидите после первых месяцев, и полный процесс роста ваших новых волос.",
    [Language.Georgian]: "შედეგები, რომლებსაც პირველი თვეების შემდეგ დაინახავთ და თქვენი ახალი თმის სრული ზრდის პროცესი."
  },
  "services.timeline.step5Highlight1": {
    [Language.Turkish]: "Kalıcı sonuçlar",
    [Language.English]: "Permanent results",
    [Language.Russian]: "Постоянные результаты",
    [Language.Georgian]: "მუდმივი შედეგები"
  },
  "services.timeline.step5Highlight2": {
    [Language.Turkish]: "Doğal görünüm",
    [Language.English]: "Natural appearance",
    [Language.Russian]: "Естественный вид",
    [Language.Georgian]: "ბუნებრივი გარეგნობა"
  },
  
  // FAQ translations
  "services.faqsTitle": {
    [Language.Turkish]: "Sıkça Sorulan Sorular",
    [Language.English]: "Frequently Asked Questions",
    [Language.Russian]: "Часто Задаваемые Вопросы",
    [Language.Georgian]: "ხშირად დასმული კითხვები"
  },
  "services.faqsDescription": {
    [Language.Turkish]: "Saç ekimi hakkında merak edilen soruları ve profesyonel cevaplarımızı inceleyin.",
    [Language.English]: "Explore the most common questions about hair transplantation and our professional answers.",
    [Language.Russian]: "Изучите наиболее распространенные вопросы о трансплантации волос и наши профессиональные ответы.",
    [Language.Georgian]: "გაეცანით ყველაზე გავრცელებულ კითხვებს თმის გადანერგვის შესახებ და ჩვენს პროფესიონალურ პასუხებს."
  },
  "services.faqs.question1": {
    [Language.Turkish]: "Saç ekimi işlemi ağrılı mıdır?",
    [Language.English]: "Is the hair transplant procedure painful?",
    [Language.Russian]: "Является ли процедура трансплантации волос болезненной?",
    [Language.Georgian]: "არის თუ არა თმის გადანერგვის პროცედურა მტკივნეული?"
  },
  "services.faqs.answer1": {
    [Language.Turkish]: "Hayır, işlem lokal anestezi altında yapılır ve çoğu hasta işlem sırasında minimal rahatsızlık hisseder.",
    [Language.English]: "No, the procedure is performed under local anesthesia and most patients experience minimal discomfort during the procedure.",
    [Language.Russian]: "Нет, процедура выполняется под местной анестезией, и большинство пациентов испытывают минимальный дискомфорт во время процедуры.",
    [Language.Georgian]: "არა, პროცედურა ტარდება ადგილობრივი ანესთეზიის ქვეშ და პაციენტების უმეტესობა პროცედურის დროს მინიმალურ დისკომფორტს განიცდის."
  },
  "services.faqs.question2": {
    [Language.Turkish]: "Saç ekimi sonuçları kalıcı mıdır?",
    [Language.English]: "Are hair transplant results permanent?",
    [Language.Russian]: "Являются ли результаты трансплантации волос постоянными?",
    [Language.Georgian]: "არის თუ არა თმის გადანერგვის შედეგები მუდმივი?"
  },
  "services.faqs.answer2": {
    [Language.Turkish]: "Evet, nakledilen saç folikülleri genellikle dökülmeye karşı dirençlidir ve ömür boyu kalıcıdır.",
    [Language.English]: "Yes, transplanted hair follicles are generally resistant to hair loss and are permanent for life.",
    [Language.Russian]: "Да, пересаженные волосяные фолликулы обычно устойчивы к выпадению волос и являются постоянными на всю жизнь.",
    [Language.Georgian]: "დიახ, გადანერგილი თმის ფოლიკულები ზოგადად რეზისტენტულია თმის ცვენის მიმართ და მუდმივია მთელი სიცოცხლის განმავლობაში."
  },
  "services.faqs.question3": {
    [Language.Turkish]: "Saç ekimi sonrası ne zaman normal aktivitelere dönebilirim?",
    [Language.English]: "When can I return to normal activities after a hair transplant?",
    [Language.Russian]: "Когда я смогу вернуться к нормальной деятельности после трансплантации волос?",
    [Language.Georgian]: "როდის შემიძლია დავუბრუნდე ნორმალურ აქტივობებს თმის გადანერგვის შემდეგ?"
  },
  "services.faqs.answer3": {
    [Language.Turkish]: "Çoğu hasta 1-3 gün içinde hafif aktivitelere başlayabilir, ancak yoğun fiziksel aktivitelerden 2 hafta kaçınılmalıdır.",
    [Language.English]: "Most patients can resume light activities within 1-3 days, but intense physical activities should be avoided for 2 weeks.",
    [Language.Russian]: "Большинство пациентов могут возобновить легкую активность в течение 1-3 дней, но интенсивной физической активности следует избегать в течение 2 недель.",
    [Language.Georgian]: "პაციენტების უმეტესობას შეუძლია მსუბუქი აქტივობების განახლება 1-3 დღის განმავლობაში, მაგრამ ინტენსიური ფიზიკური აქტივობებისგან თავი უნდა შეიკავოთ 2 კვირის განმავლობაში."
  },
  "services.faqs.question4": {
    [Language.Turkish]: "Saç ekimi sonrası yeni saçlarım ne zaman büyümeye başlayacak?",
    [Language.English]: "When will my new hair start growing after a hair transplant?",
    [Language.Russian]: "Когда мои новые волосы начнут расти после трансплантации волос?",
    [Language.Georgian]: "როდის დაიწყებს ჩემი ახალი თმა ზრდას თმის გადანერგვის შემდეგ?"
  },
  "services.faqs.answer4": {
    [Language.Turkish]: "Genellikle nakledilen saçlar 2-3 hafta içinde dökülür ve yeni saç büyümesi 3-4 ay içinde başlar. Tam sonuçlar 9-12 ay içinde görülür.",
    [Language.English]: "Usually, transplanted hair sheds within 2-3 weeks, and new hair growth begins within 3-4 months. Full results are visible within 9-12 months.",
    [Language.Russian]: "Обычно пересаженные волосы выпадают в течение 2-3 недель, а новый рост волос начинается в течение 3-4 месяцев. Полные результаты видны в течение 9-12 месяцев.",
    [Language.Georgian]: "ჩვეულებრივ, გადანერგილი თმა ცვივა 2-3 კვირის განმავლობაში და ახალი თმის ზრდა იწყება 3-4 თვის განმავლობაში. სრული შედეგები ჩანს 9-12 თვის განმავლობაში."
  },
  "services.faqs.question5": {
    [Language.Turkish]: "FUE ve DHI teknikleri arasındaki fark nedir?",
    [Language.English]: "What is the difference between FUE and DHI techniques?",
    [Language.Russian]: "В чем разница между методами FUE и DHI?",
    [Language.Georgian]: "რა განსხვავებაა FUE და DHI ტექნიკებს შორის?"
  },
  "services.faqs.answer5": {
    [Language.Turkish]: "FUE tekniğinde greftler çıkarıldıktan sonra açılan kanallara yerleştirilir, DHI tekniğinde ise özel bir kalem ile doğrudan kafa derisine implante edilir. DHI daha az travmatiktir ve daha yoğun ekim sağlar.",
    [Language.English]: "In the FUE technique, grafts are placed into channels that are opened after extraction, while in the DHI technique, they are implanted directly into the scalp with a special pen. DHI is less traumatic and provides denser implantation.",
    [Language.Russian]: "При технике FUE графты помещаются в каналы, которые открываются после извлечения, а при технике DHI они имплантируются непосредственно в кожу головы с помощью специальной ручки. DHI менее травматичен и обеспечивает более плотную имплантацию.",
    [Language.Georgian]: "FUE ტექნიკაში ტრანსპლანტები თავსდება არხებში, რომლებიც იხსნება ექსტრაქციის შემდეგ, ხოლო DHI ტექნიკაში ისინი პირდაპირ ინერგება თავის კანში სპეციალური კალმით. DHI ნაკლებად ტრავმულია და უზრუნველყოფს უფრო მკვრივ იმპლანტაციას."
  },
  "services.faqs.question6": {
    [Language.Turkish]: "Saç ekimi için ideal aday kimdir?",
    [Language.English]: "Who is an ideal candidate for hair transplantation?",
    [Language.Russian]: "Кто является идеальным кандидатом для трансплантации волос?",
    [Language.Georgian]: "ვინ არის იდეალური კანდიდატი თმის გადანერგვისთვის?"
  },
  "services.faqs.answer6": {
    [Language.Turkish]: "Sağlıklı, 25 yaş üzeri, saç kaybı stabil olan ve donör bölgesinde yeterli saç yoğunluğuna sahip kişiler ideal adaylardır.",
    [Language.English]: "Healthy individuals over 25 years of age with stable hair loss and sufficient hair density in the donor area are ideal candidates.",
    [Language.Russian]: "Здоровые люди старше 25 лет со стабильной потерей волос и достаточной плотностью волос в донорской области являются идеальными кандидатами.",
    [Language.Georgian]: "ჯანმრთელი პირები 25 წელზე მეტი ასაკის სტაბილური თმის ცვენით და საკმარისი თმის სიმკვრივით დონორის ზონაში არიან იდეალური კანდიდატები."
  },
  "services.faqs.question7": {
    [Language.Turkish]: "Saç ekimi sonrası nasıl bir bakım gereklidir?",
    [Language.English]: "What kind of aftercare is required after a hair transplant?",
    [Language.Russian]: "Какой уход необходим после трансплантации волос?",
    [Language.Georgian]: "რა სახის შემდგომი მოვლაა საჭირო თმის გადანერგვის შემდეგ?"
  },
  "services.faqs.answer7": {
    [Language.Turkish]: "İlk günlerde özel şampuanlarla nazik yıkama, güneşten ve terlemeyi artıran aktivitelerden kaçınma, önerilen ilaçları kullanma ve takip randevularına uyma.",
    [Language.English]: "Gentle washing with special shampoos in the first days, avoiding sun exposure and activities that increase sweating, using recommended medications, and adhering to follow-up appointments.",
    [Language.Russian]: "Бережное мытье специальными шампунями в первые дни, избегание воздействия солнца и действий, усиливающих потоотделение, использование рекомендованных лекарств и соблюдение контрольных приемов.",
    [Language.Georgian]: "ნაზი დაბანა სპეციალური შამპუნებით პირველ დღეებში, მზის ზემოქმედებისა და აქტივობების თავიდან აცილება, რომლებიც ზრდის ოფლიანობას, რეკომენდებული მედიკამენტების გამოყენება და შემდგომი ვიზიტების დაცვა."
  },
  "services.faqs.question8": {
    [Language.Turkish]: "Saç ekimi işlemi ne kadar sürer?",
    [Language.English]: "How long does the hair transplant procedure take?",
    [Language.Russian]: "Сколько времени занимает процедура трансплантации волос?",
    [Language.Georgian]: "რამდენ ხანს გრძელდება თმის გადანერგვის პროცედურა?"
  },
  "services.faqs.answer8": {
    [Language.Turkish]: "Ekilecek greft sayısına bağlı olarak 4-8 saat arasında değişebilir. Ortalama bir işlem genellikle 6 saat sürer.",
    [Language.English]: "It can vary between 4-8 hours depending on the number of grafts to be transplanted. An average procedure usually takes 6 hours.",
    [Language.Russian]: "Это может варьироваться от 4 до 8 часов в зависимости от количества пересаживаемых графтов. Средняя процедура обычно занимает 6 часов.",
    [Language.Georgian]: "ეს შეიძლება მერყეობდეს 4-8 საათს შორის გადასანერგი გრაფტების რაოდენობის მიხედვით. საშუალო პროცედურა ჩვეულებრივ გრძელდება 6 საათი."
  },
  
  // Before After Gallery
  "Start": {
    [Language.Turkish]: "Başlangıç",
    [Language.English]: "Start",
    [Language.Russian]: "Начало",
    [Language.Georgian]: "დაწყება"
  },
  "Complete": {
    [Language.Turkish]: "Tamamlandı",
    [Language.English]: "Complete",
    [Language.Russian]: "Завершено",
    [Language.Georgian]: "დასრულებული"
  },
  "Search FAQs...": {
    [Language.Turkish]: "SSS Ara...",
    [Language.English]: "Search FAQs...",
    [Language.Russian]: "Поиск по ЧЗВ...",
    [Language.Georgian]: "ხშირად დასმული კითხვების ძიება..."
  },
  "All": {
    [Language.Turkish]: "Tümü",
    [Language.English]: "All",
    [Language.Russian]: "Все",
    [Language.Georgian]: "ყველა"
  },
  "Loading reviews...": {
    [Language.Turkish]: "Yorumlar yükleniyor...",
    [Language.English]: "Loading reviews...",
    [Language.Russian]: "Загрузка отзывов...",
    [Language.Georgian]: "მიმოხილვების ჩატვირთვა..."
  },
  "Before & After Results": {
    [Language.Turkish]: "Öncesi ve Sonrası Sonuçlar",
    [Language.English]: "Before & After Results",
    [Language.Russian]: "Результаты до и после",
    [Language.Georgian]: "შედეგები მანამდე და შემდეგ"
  },
  "Grid View": {
    [Language.Turkish]: "Izgara Görünümü",
    [Language.English]: "Grid View",
    [Language.Russian]: "Вид сеткой",
    [Language.Georgian]: "ბადის ხედი"
  },
  "Slider View": {
    [Language.Turkish]: "Sürgü Görünümü",
    [Language.English]: "Slider View",
    [Language.Russian]: "Вид слайдера",
    [Language.Georgian]: "სლაიდერის ხედი"
  },
  "Before": {
    [Language.Turkish]: "Öncesi",
    [Language.English]: "Before",
    [Language.Russian]: "До",
    [Language.Georgian]: "მანამდე"
  },
  "After": {
    [Language.Turkish]: "Sonrası",
    [Language.English]: "After",
    [Language.Russian]: "После",
    [Language.Georgian]: "შემდეგ"
  },
  "Be the First to Review": {
    [Language.Turkish]: "İlk Yorum Yapan Siz Olun",
    [Language.English]: "Be the First to Review",
    [Language.Russian]: "Будьте первым, кто оставит отзыв",
    [Language.Georgian]: "იყავით პირველი ვინც შეაფასებს"
  },
  "No reviews yet. Share your experience and help others make their decision.": {
    [Language.Turkish]: "Henüz yorum yok. Deneyiminizi paylaşın ve diğerlerine karar vermede yardımcı olun.",
    [Language.English]: "No reviews yet. Share your experience and help others make their decision.",
    [Language.Russian]: "Отзывов пока нет. Поделитесь своим опытом и помогите другим принять решение.",
    [Language.Georgian]: "ჯერ არ არის შეფასებები. გაუზიარეთ თქვენი გამოცდილება და დაეხმარეთ სხვებს გადაწყვეტილების მიღებაში."
  },
  "Write a Review": {
    [Language.Turkish]: "Yorum Yazın",
    [Language.English]: "Write a Review",
    [Language.Russian]: "Написать отзыв",
    [Language.Georgian]: "დაწერეთ შეფასება"
  },
  
  // HomePage çevirileri 
  "home.title": {
    [Language.Turkish]: "MyHair Clinic | Saç Ekimi ve Estetik Merkezi",
    [Language.English]: "MyHair Clinic | Hair Transplant and Aesthetic Center",
    [Language.Russian]: "MyHair Clinic | Центр трансплантации волос и эстетики",
    [Language.Georgian]: "MyHair Clinic | თმის გადანერგვის და ესთეტიკის ცენტრი"
  },
  "home.description": {
    [Language.Turkish]: "Tiflis'in lider saç ekimi ve estetik merkezi. FUE ve DHI tekniklerini kullanarak en iyi sonuçları elde ediyoruz. Doğal görünüm garantisi.",
    [Language.English]: "Leading hair transplant and aesthetic center in Tbilisi. We use FUE and DHI techniques to achieve the best results. Natural appearance guaranteed.",
    [Language.Russian]: "Ведущий центр трансплантации волос и эстетики в Тбилиси. Мы используем методы FUE и DHI для достижения наилучших результатов. Гарантия естественного вида.",
    [Language.Georgian]: "წამყვანი თმის გადანერგვისა და ესთეტიკის ცენტრი თბილისში. ჩვენ ვიყენებთ FUE და DHI ტექნიკას საუკეთესო შედეგების მისაღწევად. ბუნებრივი გარეგნობის გარანტია."
  },
  
  // Yer tutucu değişken örnekleri
  "home.procedure_cost": {
    [Language.Turkish]: "{procedure} işlemimizin fiyatı sadece $1500'dan başlıyor",
    [Language.English]: "Our {procedure} procedure starts at only $1500",
    [Language.Russian]: "Наша процедура {procedure} начинается всего от $1500",
    [Language.Georgian]: "ჩვენი {procedure} პროცედურა იწყება მხოლოდ $1500-დან"
  },
  "home.welcome_user": {
    [Language.Turkish]: "Hoş geldiniz {name}, size nasıl yardımcı olabiliriz?",
    [Language.English]: "Welcome {name}, how can we help you?",
    [Language.Russian]: "Добро пожаловать, {name}, чем мы можем вам помочь?",
    [Language.Georgian]: "მოგესალმებით {name}, როგორ შეგვიძლია დაგეხმაროთ?"
  },
  "home.results_time": {
    [Language.Turkish]: "Tam sonuçlar {months} ay içinde görülecektir",
    [Language.English]: "Full results will be visible within {months} months",
    [Language.Russian]: "Полные результаты будут видны через {months} месяцев",
    [Language.Georgian]: "სრული შედეგები გამოჩნდება {months} თვის განმავლობაში"
  },
  
  // Products Page
  "products.title": {
    [Language.Turkish]: "Saç Bakım Ürünlerimiz",
    [Language.English]: "Our Hair Care Products",
    [Language.Russian]: "Наши продукты для ухода за волосами",
    [Language.Georgian]: "ჩვენი თმის მოვლის პროდუქტები"
  },
  "products.description": {
    [Language.Turkish]: "Saç ekimi sonrası en iyi sonuçları elde etmek için özel olarak formüle edilmiş ürünler",
    [Language.English]: "Specially formulated products to achieve the best results after hair transplantation",
    [Language.Russian]: "Специально разработанные продукты для достижения наилучших результатов после трансплантации волос",
    [Language.Georgian]: "სპეციალურად ფორმულირებული პროდუქტები თმის გადანერგვის შემდეგ საუკეთესო შედეგების მისაღწევად"
  },
  "products.infoTitle": {
    [Language.Turkish]: "Saç Bakımı Hakkında Bilmeniz Gerekenler",
    [Language.English]: "What You Need to Know About Hair Care",
    [Language.Russian]: "Что вам нужно знать об уходе за волосами",
    [Language.Georgian]: "რა უნდა იცოდეთ თმის მოვლის შესახებ"
  },
  "products.infoText1": {
    [Language.Turkish]: "Saç ekimi sonrası bakım, işlemin başarısı için kritik öneme sahiptir. Doğru ürünleri kullanmak, yeni saç köklerinizin sağlıklı bir şekilde büyümesini destekler.",
    [Language.English]: "Post-transplant hair care is critical to the success of the procedure. Using the right products supports the healthy growth of your new hair follicles.",
    [Language.Russian]: "Уход за волосами после трансплантации имеет решающее значение для успеха процедуры. Использование правильных продуктов способствует здоровому росту ваших новых волосяных фолликулов.",
    [Language.Georgian]: "თმის გადანერგვის შემდგომი მოვლა მნიშვნელოვანია პროცედურის წარმატებისათვის. სწორი პროდუქტების გამოყენება ხელს უწყობს თქვენი ახალი თმის ფოლიკულების ჯანსაღ ზრდას."
  },
  "products.infoText2": {
    [Language.Turkish]: "MyHair Clinic olarak, saç ekimi uzmanlarımız tarafından özel olarak seçilen ve onaylanan ürünleri sunuyoruz. Bu ürünler, saç ekimi sonrası iyileşme sürecini hızlandırmak ve en iyi sonuçları elde etmek için özel olarak formüle edilmiştir.",
    [Language.English]: "At MyHair Clinic, we offer products specially selected and approved by our hair transplant specialists. These products are specially formulated to accelerate the healing process after hair transplantation and achieve the best results.",
    [Language.Russian]: "В клинике MyHair мы предлагаем продукты, специально отобранные и одобренные нашими специалистами по трансплантации волос. Эти продукты специально разработаны для ускорения процесса заживления после трансплантации волос и достижения наилучших результатов.",
    [Language.Georgian]: "MyHair კლინიკაში ჩვენ გთავაზობთ პროდუქტებს, რომლებიც სპეციალურად შერჩეულია და დამტკიცებულია ჩვენი თმის გადანერგვის სპეციალისტების მიერ. ეს პროდუქტები სპეციალურად არის შექმნილი თმის გადანერგვის შემდეგ გამოჯანმრთელების პროცესის დასაჩქარებლად და საუკეთესო შედეგების მისაღწევად."
  },
  "products.infoPoint1": {
    [Language.Turkish]: "Tüm ürünlerimiz dermatolojik olarak test edilmiş ve onaylanmıştır",
    [Language.English]: "All our products are dermatologically tested and approved",
    [Language.Russian]: "Все наши продукты дерматологически протестированы и одобрены",
    [Language.Georgian]: "ჩვენი ყველა პროდუქტი დერმატოლოგიურად ტესტირებული და დამტკიცებულია"
  },
  "products.infoPoint2": {
    [Language.Turkish]: "Saç ekimi sonrası kullanım için özel olarak formüle edilmiştir",
    [Language.English]: "Specially formulated for use after hair transplantation",
    [Language.Russian]: "Специально разработан для использования после трансплантации волос",
    [Language.Georgian]: "სპეციალურად ფორმულირებულია თმის გადანერგვის შემდეგ გამოსაყენებლად"
  },
  "products.infoPoint3": {
    [Language.Turkish]: "Paraben, silikon ve zararlı kimyasallar içermez",
    [Language.English]: "Does not contain parabens, silicones, and harmful chemicals",
    [Language.Russian]: "Не содержит парабенов, силиконов и вредных химических веществ",
    [Language.Georgian]: "არ შეიცავს პარაბენებს, სილიკონებს და მავნე ქიმიურ ნივთიერებებს"
  },
  "products.noProducts": {
    [Language.Turkish]: "Şu anda mevcut ürün bulunmamaktadır.",
    [Language.English]: "There are no products available at the moment.",
    [Language.Russian]: "В настоящее время нет доступных продуктов.",
    [Language.Georgian]: "ამჟამად პროდუქტები არ არის ხელმისაწვდომი."
  },
  "products.usage": {
    [Language.Turkish]: "Kullanım Talimatları",
    [Language.English]: "Usage Instructions",
    [Language.Russian]: "Инструкции по использованию",
    [Language.Georgian]: "გამოყენების ინსტრუქციები"
  },
  "products.ingredients": {
    [Language.Turkish]: "İçindekiler",
    [Language.English]: "Ingredients",
    [Language.Russian]: "Ингредиенты",
    [Language.Georgian]: "ინგრედიენტები"
  },
  "products.inquireProduct": {
    [Language.Turkish]: "Ürün Hakkında Bilgi Alın",
    [Language.English]: "Get Information About This Product",
    [Language.Russian]: "Получите информацию об этом продукте",
    [Language.Georgian]: "მიიღეთ ინფორმაცია ამ პროდუქტის შესახებ"
  },
  "products.inquireText": {
    [Language.Turkish]: "Bu ürün hakkında daha fazla bilgi edinmek veya sipariş vermek için bizimle iletişime geçin.",
    [Language.English]: "Contact us to learn more about this product or to place an order.",
    [Language.Russian]: "Свяжитесь с нами, чтобы узнать больше об этом продукте или разместить заказ.",
    [Language.Georgian]: "დაგვიკავშირდით ამ პროდუქტის შესახებ მეტი ინფორმაციის მისაღებად ან შეკვეთის განსათავსებლად."
  },
  "products.backToProducts": {
    [Language.Turkish]: "Ürünlere Geri Dön",
    [Language.English]: "Back to Products",
    [Language.Russian]: "Вернуться к продуктам",
    [Language.Georgian]: "პროდუქტებზე დაბრუნება"
  },
  "products.productCode": {
    [Language.Turkish]: "Ürün Kodu",
    [Language.English]: "Product Code",
    [Language.Russian]: "Код продукта",
    [Language.Georgian]: "პროდუქტის კოდი"
  },
  "errors.loading_product": {
    [Language.Turkish]: "Ürün yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while loading the product. Please try again later.",
    [Language.Russian]: "Произошла ошибка при загрузке продукта. Пожалуйста, повторите попытку позже.",
    [Language.Georgian]: "პროდუქტის ჩატვირთვისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
  "common.moreInfo": {
    [Language.Turkish]: "Daha Fazla Bilgi",
    [Language.English]: "More Information",
    [Language.Russian]: "Больше Информации",
    [Language.Georgian]: "მეტი ინფორმაცია"
  },
  "common.contactUs": {
    [Language.Turkish]: "Bizimle İletişime Geçin",
    [Language.English]: "Contact Us",
    [Language.Russian]: "Свяжитесь с нами",
    [Language.Georgian]: "დაგვიკავშირდით"
  },
  "common.share": {
    [Language.Turkish]: "Paylaş",
    [Language.English]: "Share",
    [Language.Russian]: "Поделиться",
    [Language.Georgian]: "გაზიარება"
  },
  "common.follow_us": {
    [Language.Turkish]: "Bizi Takip Edin",
    [Language.English]: "Follow Us",
    [Language.Russian]: "Подписывайтесь на нас",
    [Language.Georgian]: "გამოგვყევით"
  },
  
  // Error messages
  "errors.loading_services": {
    [Language.Turkish]: "Hizmetler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while loading services. Please try again later.",
    [Language.Russian]: "Произошла ошибка при загрузке услуг. Пожалуйста, повторите попытку позже.",
    [Language.Georgian]: "სერვისების ჩატვირთვისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
  "error.pageNotFound": {
    [Language.Turkish]: "Sayfa Bulunamadı",
    [Language.English]: "Page Not Found",
    [Language.Russian]: "Страница не найдена",
    [Language.Georgian]: "გვერდი ვერ მოიძებნა"
  },
  "error.somethingWentWrong": {
    [Language.Turkish]: "Bir şeyler ters gitti",
    [Language.English]: "Something went wrong",
    [Language.Russian]: "Что-то пошло не так",
    [Language.Georgian]: "რაღაც ცუდი მოხდა"
  },
  "error.goBackHome": {
    [Language.Turkish]: "Ana Sayfaya Dön",
    [Language.English]: "Go Back Home",
    [Language.Russian]: "Вернуться на главную",
    [Language.Georgian]: "მთავარზე დაბრუნება"
  }
};

/**
 * Gets a translation for a specific key and language
 * @param key The translation key
 * @param language The target language
 * @param replacements Optional replacements for placeholders
 * @returns The translated string or a fallback
 */
export function getTranslation(
  key: string | Record<Language, string>, 
  language: Language,
  replacements?: Record<string, string | number>
): string {
  try {
    // Handle direct language object passing
    if (typeof key === 'object' && key !== null) {
      // Key is a Language map object { TR: '...', EN: '...', ... }
      return key[language] || key[Language.English] || '';
    }
    
    // Standard key-based lookup
    if (translations[key]) {
      // Get the translated text
      let translatedText = translations[key][language] || translations[key][Language.English] || key;
      
      // Apply replacements if any
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
          translatedText = translatedText.replace(
            new RegExp(`{${placeholder}}`, 'g'), 
            String(value)
          );
        });
      }
      
      return translatedText;
    }
    
    // If key doesn't exist, return the key itself
    console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
    return typeof key === 'string' ? key : '';
  } catch (error) {
    console.error(`Error getting translation for key:`, key, error);
    return typeof key === 'string' ? key : '';
  }
}

/**
 * useTranslation hook - React hook for component translations
 */
export function useTranslation(language: Language) {
  return {
    t: (key: string | Record<Language, string>, replacements?: Record<string, string | number>) => 
      getTranslation(key, language, replacements),
    
    // Format a value to the current language format (e.g. currency)
    formatCurrency: (value: number) => {
      const formatter = new Intl.NumberFormat(language === Language.Turkish ? 'tr-TR' : 
                                            language === Language.English ? 'en-US' : 
                                            language === Language.Russian ? 'ru-RU' : 'ka-GE', 
      {
        style: 'currency',
        currency: 'USD'
      });
      
      return formatter.format(value);
    },
    
    // Format a date to the current language format
    formatDate: (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      return dateObj.toLocaleDateString(
        language === Language.Turkish ? 'tr-TR' : 
        language === Language.English ? 'en-US' : 
        language === Language.Russian ? 'ru-RU' : 'ka-GE'
      );
    }
  };
}