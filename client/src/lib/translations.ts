import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Our translations object with simple key structure
// Translations object (exported for direct usage in components)
export const translations: Record<string, LanguageMap> = {
  // Gallery Page
  "gallery.pageTitle": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "gallery.pageDescription": {
    [Language.Turkish]: "Kliniğimizden görüntüler, öncesi/sonrası fotoğraflar ve videolar",
    [Language.English]: "Images from our clinic, before/after photos, and videos",
    [Language.Russian]: "Изображения нашей клиники, фотографии до/после и видео",
    [Language.Georgian]: "ჩვენი კლინიკის სურათები, ფოტოები სამკურნალომდე/შემდეგ და ვიდეოები"
  },
  "gallery.clinicImages": {
    [Language.Turkish]: "Klinik Görüntüleri",
    [Language.English]: "Clinic Images",
    [Language.Russian]: "Изображения клиники",
    [Language.Georgian]: "კლინიკის სურათები"
  },
  "gallery.videos": {
    [Language.Turkish]: "Videolar",
    [Language.English]: "Videos",
    [Language.Russian]: "Видео",
    [Language.Georgian]: "ვიდეოები"
  },
  "gallery.beforeAfter": {
    [Language.Turkish]: "Öncesi/Sonrası",
    [Language.English]: "Before/After",
    [Language.Russian]: "До/После",
    [Language.Georgian]: "მკურნალობამდე/შემდეგ"
  },
  "gallery.all": {
    [Language.Turkish]: "Tümü",
    [Language.English]: "All",
    [Language.Russian]: "Все",
    [Language.Georgian]: "ყველა"
  },
  "gallery.procedures": {
    [Language.Turkish]: "İşlemler",
    [Language.English]: "Procedures",
    [Language.Russian]: "Процедуры",
    [Language.Georgian]: "პროცედურები"
  },
  "gallery.facilities": {
    [Language.Turkish]: "Tesisler",
    [Language.English]: "Facilities",
    [Language.Russian]: "Помещения",
    [Language.Georgian]: "ობიექტები"
  },
  "gallery.team": {
    [Language.Turkish]: "Ekip",
    [Language.English]: "Team",
    [Language.Russian]: "Команда",
    [Language.Georgian]: "გუნდი"
  },
  "gallery.highResolution": {
    [Language.Turkish]: "Yüksek Çözünürlük",
    [Language.English]: "High Resolution",
    [Language.Russian]: "Высокое разрешение",
    [Language.Georgian]: "მაღალი გარჩევადობა"
  },
  "gallery.before": {
    [Language.Turkish]: "Öncesi",
    [Language.English]: "Before",
    [Language.Russian]: "До",
    [Language.Georgian]: "მკურნალობამდე"
  },
  "gallery.after": {
    [Language.Turkish]: "Sonrası",
    [Language.English]: "After",
    [Language.Russian]: "После",
    [Language.Georgian]: "შემდეგ"
  },
  "gallery.resultAfter": {
    [Language.Turkish]: "Sonuç: İşlemden",
    [Language.English]: "Result: After",
    [Language.Russian]: "Результат: После",
    [Language.Georgian]: "შედეგი: შემდეგ"
  },
  "gallery.months": {
    [Language.Turkish]: "ay sonra",
    [Language.English]: "months",
    [Language.Russian]: "месяцев",
    [Language.Georgian]: "თვე"
  },
  "gallery.hairTransplantProcedure": {
    [Language.Turkish]: "Saç Ekimi İşlemi",
    [Language.English]: "Hair Transplant Procedure",
    [Language.Russian]: "Процедура трансплантации волос",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა"
  },
  "gallery.hairAnalysis": {
    [Language.Turkish]: "Saç Analizi",
    [Language.English]: "Hair Analysis",
    [Language.Russian]: "Анализ волос",
    [Language.Georgian]: "თმის ანალიზი"
  },
  "gallery.postOperativeCare": {
    [Language.Turkish]: "Operasyon Sonrası Bakım",
    [Language.English]: "Post-Operative Care",
    [Language.Russian]: "Послеоперационный уход",
    [Language.Georgian]: "პოსტოპერაციული მოვლა"
  },
  "gallery.consultationProcess": {
    [Language.Turkish]: "Danışma Süreci",
    [Language.English]: "Consultation Process",
    [Language.Russian]: "Процесс консультации",
    [Language.Georgian]: "კონსულტაციის პროცესი"
  },
  "gallery.donorAreaPreparation": {
    [Language.Turkish]: "Donör Alan Hazırlığı",
    [Language.English]: "Donor Area Preparation",
    [Language.Russian]: "Подготовка донорской зоны",
    [Language.Georgian]: "დონორის ზონის მომზადება"
  },
  "gallery.hairTransplantTechnique": {
    [Language.Turkish]: "Saç Ekimi Tekniği",
    [Language.English]: "Hair Transplant Technique",
    [Language.Russian]: "Техника трансплантации волос",
    [Language.Georgian]: "თმის გადანერგვის ტექნიკა"
  },
  "gallery.microscopicView": {
    [Language.Turkish]: "Mikroskobik Görünüm",
    [Language.English]: "Microscopic View",
    [Language.Russian]: "Микроскопический вид",
    [Language.Georgian]: "მიკროსკოპული ხედი"
  },
  "gallery.clinicExterior": {
    [Language.Turkish]: "Klinik Dış Mekan",
    [Language.English]: "Clinic Exterior",
    [Language.Russian]: "Внешний вид клиники",
    [Language.Georgian]: "კლინიკის ექსტერიერი"
  },
  "gallery.receptionArea": {
    [Language.Turkish]: "Resepsiyon Alanı",
    [Language.English]: "Reception Area",
    [Language.Russian]: "Зона приема",
    [Language.Georgian]: "მიმღები ზონა"
  },
  "gallery.surgeryRoom": {
    [Language.Turkish]: "Ameliyathane",
    [Language.English]: "Surgery Room",
    [Language.Russian]: "Операционная",
    [Language.Georgian]: "საოპერაციო ოთახი"
  },
  "gallery.recoveryRoom": {
    [Language.Turkish]: "İyileşme Odası",
    [Language.English]: "Recovery Room",
    [Language.Russian]: "Комната восстановления",
    [Language.Georgian]: "სარეაბილიტაციო ოთახი"
  },
  "gallery.headSurgeon": {
    [Language.Turkish]: "Baş Cerrah",
    [Language.English]: "Head Surgeon",
    [Language.Russian]: "Главный хирург",
    [Language.Georgian]: "მთავარი ქირურგი"
  },
  "gallery.medicalTeam": {
    [Language.Turkish]: "Medikal Ekip",
    [Language.English]: "Medical Team",
    [Language.Russian]: "Медицинская команда",
    [Language.Georgian]: "სამედიცინო გუნდი"
  },
  "gallery.supportStaff": {
    [Language.Turkish]: "Destek Personeli",
    [Language.English]: "Support Staff",
    [Language.Russian]: "Вспомогательный персонал",
    [Language.Georgian]: "დამხმარე პერსონალი"
  },
  "gallery.hairTransplantProcess": {
    [Language.Turkish]: "Saç Ekimi Süreci",
    [Language.English]: "Hair Transplant Process",
    [Language.Russian]: "Процесс трансплантации волос",
    [Language.Georgian]: "თმის გადანერგვის პროცესი"
  },
  "gallery.patientTestimonial": {
    [Language.Turkish]: "Hasta Memnuniyeti",
    [Language.English]: "Patient Testimonial",
    [Language.Russian]: "Отзыв пациента",
    [Language.Georgian]: "პაციენტის გამოხმაურება"
  },
  "gallery.clinicTour": {
    [Language.Turkish]: "Klinik Turu",
    [Language.English]: "Clinic Tour",
    [Language.Russian]: "Тур по клинике",
    [Language.Georgian]: "კლინიკის ტური"
  },
  "gallery.doctorInterview": {
    [Language.Turkish]: "Doktor Röportajı",
    [Language.English]: "Doctor Interview",
    [Language.Russian]: "Интервью с доктором",
    [Language.Georgian]: "ექიმის ინტერვიუ"
  },
  "gallery.consultationSession": {
    [Language.Turkish]: "Danışma Seansı",
    [Language.English]: "Consultation Session",
    [Language.Russian]: "Консультационная сессия",
    [Language.Georgian]: "საკონსულტაციო სესია"
  },
  "gallery.operationOverview": {
    [Language.Turkish]: "Operasyon Genel Bakış",
    [Language.English]: "Operation Overview",
    [Language.Russian]: "Обзор операции",
    [Language.Georgian]: "ოპერაციის მიმოხილვა"
  },
  "gallery.hairTransplantResults": {
    [Language.Turkish]: "Saç Ekimi Sonuçları",
    [Language.English]: "Hair Transplant Results",
    [Language.Russian]: "Результаты пересадки волос",
    [Language.Georgian]: "თმის გადანერგვის შედეგები"
  },
  "gallery.patientJourney": {
    [Language.Turkish]: "Hasta Yolculuğu",
    [Language.English]: "Patient Journey",
    [Language.Russian]: "Путешествие пациента",
    [Language.Georgian]: "პაციენტის მოგზაურობა"
  },
  "gallery.testimonialVideo": {
    [Language.Turkish]: "Müşteri Yorumu",
    [Language.English]: "Testimonial Video",
    [Language.Russian]: "Видео с отзывом",
    [Language.Georgian]: "სარეკომენდაციო ვიდეო"
  },
  "gallery.treatmentExplained": {
    [Language.Turkish]: "Tedavi Açıklaması",
    [Language.English]: "Treatment Explained",
    [Language.Russian]: "Объяснение лечения",
    [Language.Georgian]: "მკურნალობის განმარტება"
  },
  "gallery.facilityTour": {
    [Language.Turkish]: "Tesis Turu",
    [Language.English]: "Facility Tour",
    [Language.Russian]: "Тур по объекту",
    [Language.Georgian]: "ობიექტის ტური"
  },
  "gallery.malePatterBaldness": {
    [Language.Turkish]: "Erkek Tipi Saç Dökülmesi",
    [Language.English]: "Male Pattern Baldness",
    [Language.Russian]: "Мужской тип облысения",
    [Language.Georgian]: "მამაკაცის ტიპის მელოტი"
  },
  "gallery.recededHairline": {
    [Language.Turkish]: "Geri Çekilmiş Saç Çizgisi",
    [Language.English]: "Receded Hairline",
    [Language.Russian]: "Отступающая линия волос",
    [Language.Georgian]: "უკან დახეული თმის ხაზი"
  },
  "gallery.crownThinning": {
    [Language.Turkish]: "Tepe Bölgesinde Seyrelme",
    [Language.English]: "Crown Thinning",
    [Language.Russian]: "Истончение в области макушки",
    [Language.Georgian]: "გვირგვინის გათხელება"
  },
  "gallery.eyebrowTransplant": {
    [Language.Turkish]: "Kaş Ekimi",
    [Language.English]: "Eyebrow Transplant",
    [Language.Russian]: "Пересадка бровей",
    [Language.Georgian]: "წარბების გადანერგვა"
  },
  "gallery.advancedBaldness": {
    [Language.Turkish]: "İlerlemiş Kellik",
    [Language.English]: "Advanced Baldness",
    [Language.Russian]: "Прогрессирующее облысение",
    [Language.Georgian]: "მოწინავე მელოტი"
  },
  "gallery.youngPatientTransformation": {
    [Language.Turkish]: "Genç Hasta Dönüşümü",
    [Language.English]: "Young Patient Transformation",
    [Language.Russian]: "Трансформация молодого пациента",
    [Language.Georgian]: "ახალგაზრდა პაციენტის ტრანსფორმაცია"
  },
  "gallery.hairlinePlanning": {
    [Language.Turkish]: "Saç Çizgisi Planlama",
    [Language.English]: "Hairline Planning",
    [Language.Russian]: "Планирование линии волос",
    [Language.Georgian]: "თმის ხაზის დაგეგმვა"
  },
  "gallery.extensiveRestoration": {
    [Language.Turkish]: "Kapsamlı Restorasyon",
    [Language.English]: "Extensive Restoration",
    [Language.Russian]: "Комплексное восстановление",
    [Language.Georgian]: "ფართო რესტავრაცია"
  },
  "gallery.seniorPatientTransformation": {
    [Language.Turkish]: "Yaşlı Hasta Dönüşümü",
    [Language.English]: "Senior Patient Transformation",
    [Language.Russian]: "Трансформация пожилого пациента",
    [Language.Georgian]: "უფროსი პაციენტის ტრანსფორმაცია"
  },
  "gallery.advancedThinning": {
    [Language.Turkish]: "İlerlemiş Saç Seyrelmesi",
    [Language.English]: "Advanced Thinning",
    [Language.Russian]: "Прогрессирующее истончение волос",
    [Language.Georgian]: "მოწინავე გათხელება"
  },
  "gallery.youngMaleTransformation": {
    [Language.Turkish]: "Genç Erkek Dönüşümü",
    [Language.English]: "Young Male Transformation",
    [Language.Russian]: "Трансформация молодого мужчины",
    [Language.Georgian]: "ახალგაზრდა მამაკაცის ტრანსფორმაცია"
  },
  "gallery.fullHairTransformation": {
    [Language.Turkish]: "Tam Saç Dönüşümü",
    [Language.English]: "Full Hair Transformation",
    [Language.Russian]: "Полная трансформация волос",
    [Language.Georgian]: "სრული თმის ტრანსფორმაცია"
  },
  "gallery.naturalHairlineRestoration": {
    [Language.Turkish]: "Doğal Saç Çizgisi Restorasyonu",
    [Language.English]: "Natural Hairline Restoration",
    [Language.Russian]: "Восстановление естественной линии волос",
    [Language.Georgian]: "ბუნებრივი თმის ხაზის აღდგენა"
  },
  "gallery.completeHairRestoration": {
    [Language.Turkish]: "Tam Saç Restorasyonu",
    [Language.English]: "Complete Hair Restoration",
    [Language.Russian]: "Полное восстановление волос",
    [Language.Georgian]: "სრული თმის აღდგენა"
  },
  "gallery.naturalEyebrowEnhancement": {
    [Language.Turkish]: "Doğal Kaş Geliştirme",
    [Language.English]: "Natural Eyebrow Enhancement",
    [Language.Russian]: "Естественное улучшение бровей",
    [Language.Georgian]: "ბუნებრივი წარბების გაუმჯობესება"
  },
  "gallery.improvedHairDensity": {
    [Language.Turkish]: "Geliştirilmiş Saç Yoğunluğu",
    [Language.English]: "Improved Hair Density",
    [Language.Russian]: "Улучшенная плотность волос",
    [Language.Georgian]: "გაუმჯობესებული თმის სიმკვრივე"
  },
  "gallery.precisionHairlineDesign": {
    [Language.Turkish]: "Hassas Saç Çizgisi Tasarımı",
    [Language.English]: "Precision Hairline Design",
    [Language.Russian]: "Точный дизайн линии волос",
    [Language.Georgian]: "ზუსტი თმის ხაზის დიზაინი"
  },
  "gallery.completeHairCoverage": {
    [Language.Turkish]: "Tam Saç Kaplaması",
    [Language.English]: "Complete Hair Coverage",
    [Language.Russian]: "Полное покрытие волос",
    [Language.Georgian]: "სრული თმის დაფარვა"
  },
  "gallery.naturalRejuvenation": {
    [Language.Turkish]: "Doğal Gençleşme",
    [Language.English]: "Natural Rejuvenation",
    [Language.Russian]: "Естественное омоложение",
    [Language.Georgian]: "ბუნებრივი განახლება"
  },
  "gallery.professionalApplication": {
    [Language.Turkish]: "Profesyonel Uygulama",
    [Language.English]: "Professional Application",
    [Language.Russian]: "Профессиональное применение",
    [Language.Georgian]: "პროფესიონალური გამოყენება"
  },
  "gallery.dramaticImprovement": {
    [Language.Turkish]: "Çarpıcı İyileşme",
    [Language.English]: "Dramatic Improvement",
    [Language.Russian]: "Значительное улучшение",
    [Language.Georgian]: "დრამატული გაუმჯობესება"
  },
  "gallery.naturalHairlineAndDensity": {
    [Language.Turkish]: "Doğal Saç Çizgisi ve Yoğunluğu",
    [Language.English]: "Natural Hairline and Density",
    [Language.Russian]: "Естественная линия волос и плотность",
    [Language.Georgian]: "ბუნებრივი თმის ხაზი და სიმკვრივე"
  },
  "gallery.hairTransplant": {
    [Language.Turkish]: "Saç Ekimi",
    [Language.English]: "Hair Transplant",
    [Language.Russian]: "Пересадка волос",
    [Language.Georgian]: "თმის გადანერგვა"
  },
  "gallery.beardTransplant": {
    [Language.Turkish]: "Sakal Ekimi",
    [Language.English]: "Beard Transplant",
    [Language.Russian]: "Пересадка бороды",
    [Language.Georgian]: "წვერის გადანერგვა"
  },
  "gallery.graftExtraction": {
    [Language.Turkish]: "Greft Çıkarma",
    [Language.English]: "Graft Extraction",
    [Language.Russian]: "Экстракция графтов",
    [Language.Georgian]: "გრაფტის ექსტრაქცია"
  },
  "gallery.recipientSiteCreation": {
    [Language.Turkish]: "Alıcı Bölge Hazırlama",
    [Language.English]: "Recipient Site Creation",
    [Language.Russian]: "Создание зоны пересадки",
    [Language.Georgian]: "რეციპიენტის ადგილის შექმნა"
  },
  "gallery.implantationProcess": {
    [Language.Turkish]: "Ekim İşlemi",
    [Language.English]: "Implantation Process",
    [Language.Russian]: "Процесс имплантации",
    [Language.Georgian]: "იმპლანტაციის პროცესი"
  },
  "gallery.precisionTools": {
    [Language.Turkish]: "Hassas Ekipmanlar",
    [Language.English]: "Precision Tools",
    [Language.Russian]: "Прецизионные инструменты",
    [Language.Georgian]: "პრეციზიული ხელსაწყოები"
  },
  "gallery.operationRoom": {
    [Language.Turkish]: "Operasyon Odası",
    [Language.English]: "Operation Room",
    [Language.Russian]: "Операционная комната",
    [Language.Georgian]: "საოპერაციო ოთახი"
  },
  "gallery.consultationRoom": {
    [Language.Turkish]: "Danışma Odası",
    [Language.English]: "Consultation Room",
    [Language.Russian]: "Консультационная комната",
    [Language.Georgian]: "საკონსულტაციო ოთახი"
  },
  "gallery.advancedEquipment": {
    [Language.Turkish]: "İleri Teknoloji Ekipmanlar",
    [Language.English]: "Advanced Equipment",
    [Language.Russian]: "Современное оборудование",
    [Language.Georgian]: "თანამედროვე აღჭურვილობა"
  },
  "gallery.sterilizationArea": {
    [Language.Turkish]: "Sterilizasyon Alanı",
    [Language.English]: "Sterilization Area",
    [Language.Russian]: "Зона стерилизации",
    [Language.Georgian]: "სტერილიზაციის ზონა"
  },
  "gallery.surgicalTeam": {
    [Language.Turkish]: "Cerrahi Ekip",
    [Language.English]: "Surgical Team",
    [Language.Russian]: "Хирургическая команда",
    [Language.Georgian]: "ქირურგიული გუნდი"
  },
  "gallery.technicalStaff": {
    [Language.Turkish]: "Teknik Ekip",
    [Language.English]: "Technical Staff",
    [Language.Russian]: "Технический персонал",
    [Language.Georgian]: "ტექნიკური პერსონალი"
  },
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
  "packages.overview": {
    [Language.Turkish]: "Genel Bakış",
    [Language.English]: "Overview",
    [Language.Russian]: "Обзор",
    [Language.Georgian]: "მიმოხილვა"
  },
  "packages.gallery": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "packages.accommodation": {
    [Language.Turkish]: "Konaklama",
    [Language.English]: "Accommodation",
    [Language.Russian]: "Проживание",
    [Language.Georgian]: "საცხოვრებელი"
  },
  "packages.transportation": {
    [Language.Turkish]: "Ulaşım",
    [Language.English]: "Transportation",
    [Language.Russian]: "Транспорт",
    [Language.Georgian]: "ტრანსპორტირება"
  },
  "packages.activities": {
    [Language.Turkish]: "Aktiviteler",
    [Language.English]: "Activities",
    [Language.Russian]: "Мероприятия",
    [Language.Georgian]: "აქტივობები"
  },
  "packages.requestInfo": {
    [Language.Turkish]: "Bilgi İste",
    [Language.English]: "Request Information",
    [Language.Russian]: "Запросить информацию",
    [Language.Georgian]: "ინფორმაციის მოთხოვნა"
  },
  "packages.packageDetails": {
    [Language.Turkish]: "Paket Detayları",
    [Language.English]: "Package Details",
    [Language.Russian]: "Детали пакета",
    [Language.Georgian]: "პაკეტის დეტალები"
  },
  "packages.days": {
    [Language.Turkish]: "gün",
    [Language.English]: "days",
    [Language.Russian]: "дней",
    [Language.Georgian]: "დღე"
  },
  "packages.includes": {
    [Language.Turkish]: "Dahil Olanlar",
    [Language.English]: "Includes",
    [Language.Russian]: "Включает",
    [Language.Georgian]: "მოიცავს"
  },
  "packages.hairTransplantationService": {
    [Language.Turkish]: "Saç Ekimi Hizmeti",
    [Language.English]: "Hair Transplantation Service",
    [Language.Russian]: "Услуга трансплантации волос",
    [Language.Georgian]: "თმის გადანერგვის სერვისი"
  },
  "packages.highlights": {
    [Language.Turkish]: "Öne Çıkanlar",
    [Language.English]: "Highlights",
    [Language.Russian]: "Основные моменты",
    [Language.Georgian]: "მთავარი მომენტები"
  },
  "packages.noGalleryImages": {
    [Language.Turkish]: "Bu paket için galeri görüntüleri henüz eklenmemiştir.",
    [Language.English]: "Gallery images for this package have not been added yet.",
    [Language.Russian]: "Изображения галереи для этого пакета еще не добавлены.",
    [Language.Georgian]: "ამ პაკეტისთვის გალერეის სურათები ჯერ არ არის დამატებული."
  },
  "packages.exclusive": {
    [Language.Turkish]: "Özel Paket",
    [Language.English]: "Exclusive Package",
    [Language.Russian]: "Эксклюзивный Пакет",
    [Language.Georgian]: "ექსკლუზიური პაკეტი"
  },
  "packages.allInclusive": {
    [Language.Turkish]: "Her Şey Dahil Paket",
    [Language.English]: "All-Inclusive Package",
    [Language.Russian]: "Пакет «Все включено»",
    [Language.Georgian]: "ყველაფერი ჩართული პაკეტი"
  },
  "packages.limitedTimeOffer": {
    [Language.Turkish]: "Sınırlı Süreli Fırsat",
    [Language.English]: "Limited Time Offer",
    [Language.Russian]: "Предложение ограничено по времени",
    [Language.Georgian]: "დროში შეზღუდული შეთავაზება"
  },
  "packages.whyChoose": {
    [Language.Turkish]: "Neden Bu Paketi Seçmelisiniz?",
    [Language.English]: "Why Choose This Package?",
    [Language.Russian]: "Почему стоит выбрать этот пакет?",
    [Language.Georgian]: "რატომ უნდა აირჩიოთ ეს პაკეტი?"
  },
  "packages.medicalExcellence": {
    [Language.Turkish]: "Tıbbi Mükemmellik",
    [Language.English]: "Medical Excellence",
    [Language.Russian]: "Медицинское совершенство",
    [Language.Georgian]: "სამედიცინო უპირატესობა"
  },
  "packages.medicalExcellenceDesc": {
    [Language.Turkish]: "En yeni teknikler ve deneyimli uzmanlarla üstün sonuçlar.",
    [Language.English]: "Superior results with latest techniques and experienced specialists.",
    [Language.Russian]: "Превосходные результаты с новейшими методиками и опытными специалистами.",
    [Language.Georgian]: "უმაღლესი შედეგები უახლესი ტექნიკით და გამოცდილი სპეციალისტებით."
  },
  "packages.personalizedCare": {
    [Language.Turkish]: "Kişiselleştirilmiş Bakım",
    [Language.English]: "Personalized Care",
    [Language.Russian]: "Персонализированный уход",
    [Language.Georgian]: "პერსონალიზებული მოვლა"
  },
  "packages.personalizedCareDesc": {
    [Language.Turkish]: "Size özel tedavi planı ve bireysel danışmanlık desteği.",
    [Language.English]: "Tailored treatment plan and individual consultation support.",
    [Language.Russian]: "Индивидуальный план лечения и персональные консультации.",
    [Language.Georgian]: "მორგებული მკურნალობის გეგმა და ინდივიდუალური საკონსულტაციო მხარდაჭერა."
  },
  "packages.internationalSupport": {
    [Language.Turkish]: "Uluslararası Destek",
    [Language.English]: "International Support",
    [Language.Russian]: "Международная поддержка",
    [Language.Georgian]: "საერთაშორისო მხარდაჭერა"
  },
  "packages.internationalSupportDesc": {
    [Language.Turkish]: "Çok dilli personel ve ülkenize özel hizmetler.",
    [Language.English]: "Multilingual staff and country-specific services.",
    [Language.Russian]: "Многоязычный персонал и услуги для вашей страны.",
    [Language.Georgian]: "მრავალენოვანი პერსონალი და ქვეყნისთვის სპეციფიკური მომსახურება."
  },
  "packages.comfortableExperience": {
    [Language.Turkish]: "Konforlu Deneyim",
    [Language.English]: "Comfortable Experience",
    [Language.Russian]: "Комфортный опыт",
    [Language.Georgian]: "კომფორტული გამოცდილება"
  },
  "packages.comfortableExperienceDesc": {
    [Language.Turkish]: "Konaklama ve ulaşım dahil sorunsuz yolculuk.",
    [Language.English]: "Hassle-free journey including accommodation and transportation.",
    [Language.Russian]: "Беспроблемное путешествие, включая проживание и транспорт.",
    [Language.Georgian]: "უპრობლემო მოგზაურობა, მათ შორის საცხოვრებელი და ტრანსპორტირება."
  },
  "packages.readyToBook": {
    [Language.Turkish]: "Rezervasyon Yapmaya Hazır mısınız?",
    [Language.English]: "Ready to Book?",
    [Language.Russian]: "Готовы забронировать?",
    [Language.Georgian]: "მზად ხართ დასაჯავშნად?"
  },
  "packages.contactUsNow": {
    [Language.Turkish]: "Daha fazla bilgi için hemen bizimle iletişime geçin ve Tiflis'teki saç ekimi yolculuğunuzu başlatın.",
    [Language.English]: "Contact us now for more information and start your hair transplant journey in Tbilisi.",
    [Language.Russian]: "Свяжитесь с нами сейчас для получения дополнительной информации и начните свой путь по трансплантации волос в Тбилиси.",
    [Language.Georgian]: "დაგვიკავშირდით ახლავე დამატებითი ინფორმაციისთვის და დაიწყეთ თქვენი თმის გადანერგვის მოგზაურობა თბილისში."
  },
  "packages.contactNow": {
    [Language.Turkish]: "Şimdi İletişime Geç",
    [Language.English]: "Contact Now",
    [Language.Russian]: "Связаться сейчас",
    [Language.Georgian]: "დაკავშირება ახლავე"
  },
  "packages.completePackage": {
    [Language.Turkish]: "Eksiksiz Paket Deneyimi",
    [Language.English]: "Complete Package Experience",
    [Language.Russian]: "Полный пакетный опыт",
    [Language.Georgian]: "სრული პაკეტის გამოცდილება"
  },
  "packages.experienceDesc": {
    [Language.Turkish]: "Tüm seyahat detayları planlanmış, tedavi ve tatil bir arada - tek bir pakette.",
    [Language.English]: "All travel details planned, treatment and holiday combined - in one package.",
    [Language.Russian]: "Все детали путешествия спланированы, лечение и отдых объединены в одном пакете.",
    [Language.Georgian]: "ყველა სამოგზაურო დეტალი დაგეგმილია, მკურნალობა და დასვენება ერთად - ერთ პაკეტში."
  },
  "packages.luxuryAccommodation": {
    [Language.Turkish]: "Lüks Konaklama",
    [Language.English]: "Luxury Accommodation",
    [Language.Russian]: "Люкс-размещение",
    [Language.Georgian]: "ლუქს საცხოვრებელი"
  },
  "packages.centralLocation": {
    [Language.Turkish]: "Merkezi Konum",
    [Language.English]: "Central Location",
    [Language.Russian]: "Центральное расположение",
    [Language.Georgian]: "ცენტრალური მდებარეობა"
  },
  "packages.freeWifi": {
    [Language.Turkish]: "Ücretsiz WiFi",
    [Language.English]: "Free WiFi",
    [Language.Russian]: "Бесплатный WiFi",
    [Language.Georgian]: "უფასო WiFi"
  },
  "packages.breakfast": {
    [Language.Turkish]: "Kahvaltı Dahil",
    [Language.English]: "Breakfast Included",
    [Language.Russian]: "Завтрак включен",
    [Language.Georgian]: "საუზმე ჩართულია"
  },
  "packages.conciergeService": {
    [Language.Turkish]: "Concierge Hizmeti",
    [Language.English]: "Concierge Service",
    [Language.Russian]: "Консьерж-сервис",
    [Language.Georgian]: "კონსიერჟის მომსახურება"
  },
  "packages.airportTransfer": {
    [Language.Turkish]: "Havalimanı Transferi",
    [Language.English]: "Airport Transfer",
    [Language.Russian]: "Трансфер из аэропорта",
    [Language.Georgian]: "აეროპორტის ტრანსფერი"
  },
  "packages.clinicTransfer": {
    [Language.Turkish]: "Klinik Transferleri",
    [Language.English]: "Clinic Transfers",
    [Language.Russian]: "Трансфер в клинику",
    [Language.Georgian]: "კლინიკის ტრანსფერები"
  },
  "packages.cityTour": {
    [Language.Turkish]: "Şehir Turu",
    [Language.English]: "City Tour",
    [Language.Russian]: "Экскурсия по городу",
    [Language.Georgian]: "ქალაქის ტური"
  },
  "packages.leisureActivities": {
    [Language.Turkish]: "Boş Zaman Aktiviteleri",
    [Language.English]: "Leisure Activities",
    [Language.Russian]: "Досуг и развлечения",
    [Language.Georgian]: "გასართობი აქტივობები"
  },
  "packages.cityTours": {
    [Language.Turkish]: "Şehir Turları",
    [Language.English]: "City Tours",
    [Language.Russian]: "Экскурсии по городу",
    [Language.Georgian]: "ქალაქის ტურები"
  },
  "packages.traditionalCuisine": {
    [Language.Turkish]: "Geleneksel Mutfak",
    [Language.English]: "Traditional Cuisine",
    [Language.Russian]: "Традиционная кухня",
    [Language.Georgian]: "ტრადიციული სამზარეულო"
  },
  "packages.itinerary": {
    [Language.Turkish]: "Seyahat Programı",
    [Language.English]: "Itinerary",
    [Language.Russian]: "Маршрут",
    [Language.Georgian]: "მარშრუტი"
  },
  "packages.arrivalDay": {
    [Language.Turkish]: "1. Gün: Varış",
    [Language.English]: "Day 1: Arrival",
    [Language.Russian]: "День 1: Прибытие",
    [Language.Georgian]: "დღე 1: ჩამოსვლა"
  },
  "packages.arrivalDayDesc": {
    [Language.Turkish]: "Havalimanından özel transfer, otele yerleşme ve hoş geldin toplantısı.",
    [Language.English]: "Private transfer from airport, hotel check-in and welcome meeting.",
    [Language.Russian]: "Частный трансфер из аэропорта, заселение в отель и приветственная встреча.",
    [Language.Georgian]: "პირადი ტრანსფერი აეროპორტიდან, სასტუმროში შესვლა და მისალმების შეხვედრა."
  },
  "packages.consultationDay": {
    [Language.Turkish]: "2. Gün: Konsültasyon",
    [Language.English]: "Day 2: Consultation",
    [Language.Russian]: "День 2: Консультация",
    [Language.Georgian]: "დღე 2: კონსულტაცია"
  },
  "packages.consultationDayDesc": {
    [Language.Turkish]: "Klinik ziyareti, doktor konsültasyonu ve tedavi planlaması.",
    [Language.English]: "Clinic visit, doctor consultation and treatment planning.",
    [Language.Russian]: "Посещение клиники, консультация с врачом и планирование лечения.",
    [Language.Georgian]: "კლინიკის ვიზიტი, ექიმის კონსულტაცია და მკურნალობის დაგეგმვა."
  },
  "packages.procedureDay": {
    [Language.Turkish]: "3. Gün: İşlem",
    [Language.English]: "Day 3: Procedure",
    [Language.Russian]: "День 3: Процедура",
    [Language.Georgian]: "დღე 3: პროცედურა"
  },
  "packages.procedureDayDesc": {
    [Language.Turkish]: "Saç ekimi işlemi ve ilk bakım talimatları.",
    [Language.English]: "Hair transplant procedure and initial care instructions.",
    [Language.Russian]: "Процедура трансплантации волос и начальные инструкции по уходу.",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა და საწყისი მოვლის ინსტრუქციები."
  },
  "packages.departureDay": {
    [Language.Turkish]: "4. Gün: Ayrılış",
    [Language.English]: "Day 4: Departure",
    [Language.Russian]: "День 4: Отъезд",
    [Language.Georgian]: "დღე 4: გამგზავრება"
  },
  "packages.departureDayDesc": {
    [Language.Turkish]: "Son kontrol, bakım ürünleri ve havalimanına transfer.",
    [Language.English]: "Final check-up, aftercare products and transfer to airport.",
    [Language.Russian]: "Финальный осмотр, средства послеоперационного ухода и трансфер в аэропорт.",
    [Language.Georgian]: "საბოლოო შემოწმება, მოვლის პროდუქტები და ტრანსფერი აეროპორტში."
  },
  "packages.visualExperience": {
    [Language.Turkish]: "Görsel Deneyim",
    [Language.English]: "Visual Experience",
    [Language.Russian]: "Визуальный Опыт",
    [Language.Georgian]: "ვიზუალური გამოცდილება"
  },
  "packages.visualExperienceDesc": {
    [Language.Turkish]: "Konaklama, klinik ve Tiflis şehrinden fotoğraflar.",
    [Language.English]: "Photos from accommodation, clinic and Tbilisi city.",
    [Language.Russian]: "Фотографии размещения, клиники и города Тбилиси.",
    [Language.Georgian]: "ფოტოები საცხოვრებლიდან, კლინიკიდან და თბილისის ქალაქიდან."
  },
  "packages.tbilisiOldTown": {
    [Language.Turkish]: "Tiflis Eski Şehir",
    [Language.English]: "Tbilisi Old Town",
    [Language.Russian]: "Старый Тбилиси",
    [Language.Georgian]: "ძველი თბილისი"
  },
  "packages.clinicExterior": {
    [Language.Turkish]: "Klinik Dış Görünüm",
    [Language.English]: "Clinic Exterior",
    [Language.Russian]: "Внешний вид клиники",
    [Language.Georgian]: "კლინიკის ექსტერიერი"
  },
  "packages.clickToExpand": {
    [Language.Turkish]: "Büyütmek için tıklayın",
    [Language.English]: "Click to expand",
    [Language.Russian]: "Нажмите, чтобы увеличить",
    [Language.Georgian]: "დააჭირეთ გასაფართოებლად"
  },
  "packages.tbilisiView": {
    [Language.Turkish]: "",
    [Language.English]: "",
    [Language.Russian]: "",
    [Language.Georgian]: ""
  },
  "packages.clinicProcedure": {
    [Language.Turkish]: "Klinik Tedavi Süreci",
    [Language.English]: "Clinic Procedure",
    [Language.Russian]: "Процедура в клинике",
    [Language.Georgian]: "კლინიკის პროცედურა"
  },
  "packages.comingSoon": {
    [Language.Turkish]: "Yakında",
    [Language.English]: "Coming Soon",
    [Language.Russian]: "Скоро",
    [Language.Georgian]: "მალე"
  },
  "packages.virtualTour": {
    [Language.Turkish]: "Sanal Tur",
    [Language.English]: "Virtual Tour",
    [Language.Russian]: "Виртуальный тур",
    [Language.Georgian]: "ვირტუალური ტური"
  },
  "packages.virtualTourDesc": {
    [Language.Turkish]: "Kliniğimizi ve konaklama imkanlarını 360° sanal tur ile keşfedin.",
    [Language.English]: "Explore our clinic and accommodation facilities with a 360° virtual tour.",
    [Language.Russian]: "Исследуйте нашу клинику и места размещения с помощью виртуального тура на 360°.",
    [Language.Georgian]: "გაეცანით ჩვენს კლინიკას და საცხოვრებელ ობიექტებს 360° ვირტუალური ტურით."
  },
  "packages.startVirtualTour": {
    [Language.Turkish]: "Sanal Turu Başlat",
    [Language.English]: "Start Virtual Tour",
    [Language.Russian]: "Начать виртуальный тур",
    [Language.Georgian]: "დაიწყეთ ვირტუალური ტური"
  },
  "packages.travelMedical": {
    [Language.Turkish]: "Sağlık Turizmi",
    [Language.English]: "Medical Tourism",
    [Language.Russian]: "Медицинский туризм",
    [Language.Georgian]: "სამედიცინო ტურიზმი"
  },
  "packages.fromCountry": {
    [Language.Turkish]: "Kaynak Ülke",
    [Language.English]: "From Country",
    [Language.Russian]: "Из страны",
    [Language.Georgian]: "ქვეყნიდან"
  },
  "packages.duration": {
    [Language.Turkish]: "Süre",
    [Language.English]: "Duration",
    [Language.Russian]: "Продолжительность",
    [Language.Georgian]: "ხანგრძლივობა"
  },
  "packages.groupSize": {
    [Language.Turkish]: "Grup Boyutu",
    [Language.English]: "Group Size",
    [Language.Russian]: "Размер группы",
    [Language.Georgian]: "ჯგუფის ზომა"
  },
  "packages.individual": {
    [Language.Turkish]: "Bireysel Paket",
    [Language.English]: "Individual Package",
    [Language.Russian]: "Индивидуальный пакет",
    [Language.Georgian]: "ინდივიდუალური პაკეტი"
  },
  "packages.privateTransportation": {
    [Language.Turkish]: "Özel Ulaşım",
    [Language.English]: "Private Transportation",
    [Language.Russian]: "Частный транспорт",
    [Language.Georgian]: "კერძო ტრანსპორტირება"
  },
  "packages.tourismActivities": {
    [Language.Turkish]: "Turizm Aktiviteleri",
    [Language.English]: "Tourism Activities",
    [Language.Russian]: "Туристические мероприятия",
    [Language.Georgian]: "ტურისტული აქტივობები"
  },
  "packages.translationServices": {
    [Language.Turkish]: "Çeviri Hizmetleri",
    [Language.English]: "Translation Services",
    [Language.Russian]: "Услуги перевода",
    [Language.Georgian]: "თარგმნის მომსახურება"
  },
  "packages.aftercareProducts": {
    [Language.Turkish]: "Bakım Ürünleri",
    [Language.English]: "Aftercare Products",
    [Language.Russian]: "Продукты для ухода",
    [Language.Georgian]: "მოვლის პროდუქტები"
  },
  "packages.satisfaction": {
    [Language.Turkish]: "Memnuniyet Garantisi",
    [Language.English]: "Satisfaction Guarantee",
    [Language.Russian]: "Гарантия удовлетворения",
    [Language.Georgian]: "კმაყოფილების გარანტია"
  },
  "packages.satisfactionDesc": {
    [Language.Turkish]: "Tedavi sonuçlarınızdan memnun kalmamanız durumunda, ücretsiz kontrol ve bakım hizmeti sunuyoruz.",
    [Language.English]: "If you are not satisfied with your treatment results, we offer free check-up and care services.",
    [Language.Russian]: "Если вы не удовлетворены результатами лечения, мы предлагаем бесплатный осмотр и услуги по уходу.",
    [Language.Georgian]: "თუ თქვენ არ ხართ კმაყოფილი თქვენი მკურნალობის შედეგებით, ჩვენ გთავაზობთ უფასო შემოწმებას და მოვლის სერვისებს."
  },
  "packages.noCommitment": {
    [Language.Turkish]: "Hiçbir taahhüt yok, sadece bilgi isteyin",
    [Language.English]: "No commitment, just ask for info",
    [Language.Russian]: "Никаких обязательств, просто запросите информацию",
    [Language.Georgian]: "არანაირი ვალდებულება, უბრალოდ მოითხოვეთ ინფორმაცია"
  },
  "packages.viewDetails": {
    [Language.Turkish]: "Detayları Gör",
    [Language.English]: "View Details",
    [Language.Russian]: "Посмотреть детали",
    [Language.Georgian]: "დეტალების ნახვა"
  },
  "packages.completeExperience": {
    [Language.Turkish]: "Saç Ekimi için Eksiksiz Seyahat Deneyimi",
    [Language.English]: "Complete Travel Experience for Hair Transplantation",
    [Language.Russian]: "Полный опыт путешествия для трансплантации волос",
    [Language.Georgian]: "სრული სამოგზაურო გამოცდილება თმის გადანერგვისთვის"
  },
  "packages.completeExperienceDesc": {
    [Language.Turkish]: "Tiflis'teki saç ekimi tedaviniz için tüm seyahat ihtiyaçlarınız tek pakette. Profesyonel tıbbi hizmet ve konforlu bir tatil deneyimini bir arada sunuyoruz.",
    [Language.English]: "All your travel needs for your hair transplant treatment in Tbilisi in one package. We offer professional medical service and a comfortable holiday experience together.",
    [Language.Russian]: "Все ваши потребности в путешествии для лечения по трансплантации волос в Тбилиси в одном пакете. Мы предлагаем профессиональное медицинское обслуживание и комфортный отдых вместе.",
    [Language.Georgian]: "თქვენი მოგზაურობის ყველა საჭიროება თმის გადანერგვის მკურნალობისთვის თბილისში ერთ პაკეტში. ჩვენ გთავაზობთ პროფესიონალურ სამედიცინო მომსახურებას და კომფორტულ დასვენებას ერთად."
  },
  "packages.tourism": {
    [Language.Turkish]: "Tiflis Turizmi",
    [Language.English]: "Tbilisi Tourism",
    [Language.Russian]: "Туризм в Тбилиси",
    [Language.Georgian]: "თბილისის ტურიზმი"
  },
  "packages.tourismDesc": {
    [Language.Turkish]: "Tedaviniz sırasında Tiflis'in kültürel güzelliklerini keşfedin. Şehir turları ve yerel deneyimler içerir.",
    [Language.English]: "Discover the cultural beauties of Tbilisi during your treatment. Includes city tours and local experiences.",
    [Language.Russian]: "Откройте для себя культурные красоты Тбилиси во время лечения. Включает городские туры и местный опыт.",
    [Language.Georgian]: "აღმოაჩინეთ თბილისის კულტურული სილამაზეები თქვენი მკურნალობის დროს. მოიცავს ქალაქის ტურებს და ადგილობრივ გამოცდილებას."
  },
  "packages.accommodationDesc": {
    [Language.Turkish]: "Şehir merkezinde en iyi otellerde konaklayın. Tüm paketlerimiz yüksek kaliteli konaklama içerir.",
    [Language.English]: "Stay at the best hotels in the city center. All our packages include high-quality accommodation.",
    [Language.Russian]: "Остановитесь в лучших отелях в центре города. Все наши пакеты включают проживание высокого качества.",
    [Language.Georgian]: "დარჩით საუკეთესო სასტუმროებში ქალაქის ცენტრში. ჩვენი ყველა პაკეტი მოიცავს მაღალი ხარისხის საცხოვრებელს."
  },
  "packages.whyOurPackages": {
    [Language.Turkish]: "Neden Paketlerimizi Seçmelisiniz?",
    [Language.English]: "Why Choose Our Packages?",
    [Language.Russian]: "Почему стоит выбрать наши пакеты?",
    [Language.Georgian]: "რატომ უნდა აირჩიოთ ჩვენი პაკეტები?"
  },
  "packages.saveTime": {
    [Language.Turkish]: "Zaman Kazanın",
    [Language.English]: "Save Time",
    [Language.Russian]: "Экономьте время",
    [Language.Georgian]: "დაზოგეთ დრო"
  },
  "packages.saveTimeDesc": {
    [Language.Turkish]: "Tüm planlama ve organizasyon işlerini biz hallediyoruz, sadece gelip tedavi ve tatil deneyiminizin tadını çıkarın.",
    [Language.English]: "We handle all planning and organization work, just come and enjoy your treatment and holiday experience.",
    [Language.Russian]: "Мы берем на себя всю работу по планированию и организации, просто приезжайте и наслаждайтесь лечением и отдыхом.",
    [Language.Georgian]: "ჩვენ ვასრულებთ ყველა დაგეგმვისა და ორგანიზაციის სამუშაოს, უბრალოდ მოდით და ისიამოვნეთ თქვენი მკურნალობით და დასვენებით."
  },
  "packages.expertTeam": {
    [Language.Turkish]: "Uzman Ekip",
    [Language.English]: "Expert Team",
    [Language.Russian]: "Команда экспертов",
    [Language.Georgian]: "ექსპერტთა გუნდი"
  },
  "packages.expertTeamDesc": {
    [Language.Turkish]: "Deneyimli doktorlar, çok dilli rehberler ve özel asistanlar - her adımda yanınızdayız.",
    [Language.English]: "Experienced doctors, multilingual guides, and personal assistants - we are with you every step of the way.",
    [Language.Russian]: "Опытные врачи, многоязычные гиды и личные помощники - мы с вами на каждом этапе пути.",
    [Language.Georgian]: "გამოცდილი ექიმები, მრავალენოვანი გიდები და პირადი ასისტენტები - ჩვენ თქვენთან ერთად ვართ ყოველ ნაბიჯზე."
  },
  "packages.bestLocations": {
    [Language.Turkish]: "En İyi Konumlar",
    [Language.English]: "Best Locations",
    [Language.Russian]: "Лучшие локации",
    [Language.Georgian]: "საუკეთესო ადგილმდებარეობები"
  },
  "packages.bestLocationsDesc": {
    [Language.Turkish]: "Tiflis'in en iyi bölgelerinde konaklama ve şehrin tüm önemli noktalarına kolay erişim.",
    [Language.English]: "Accommodation in the best areas of Tbilisi and easy access to all important points of the city.",
    [Language.Russian]: "Размещение в лучших районах Тбилиси и легкий доступ ко всем важным точкам города.",
    [Language.Georgian]: "საცხოვრებელი თბილისის საუკეთესო უბნებში და ადვილი წვდომა ქალაქის ყველა მნიშვნელოვან წერტილზე."
  },
  "packages.seamlessTransport": {
    [Language.Turkish]: "Sorunsuz Ulaşım",
    [Language.English]: "Seamless Transportation",
    [Language.Russian]: "Беспроблемный транспорт",
    [Language.Georgian]: "უპრობლემო ტრანსპორტირება"
  },
  "packages.seamlessTransportDesc": {
    [Language.Turkish]: "Havalimanı transferleri, klinik ziyaretleri ve şehir içi ulaşım - tüm ulaşım ihtiyaçlarınız karşılanır.",
    [Language.English]: "Airport transfers, clinic visits, and city transportation - all your transportation needs are met.",
    [Language.Russian]: "Трансферы из аэропорта, посещения клиники и городской транспорт - все ваши транспортные потребности удовлетворены.",
    [Language.Georgian]: "აეროპორტის ტრანსფერები, კლინიკის ვიზიტები და ქალაქის ტრანსპორტი - თქვენი ყველა სატრანსპორტო საჭიროება დაკმაყოფილებულია."
  },
  "packages.availablePackages": {
    [Language.Turkish]: "Mevcut Paketler",
    [Language.English]: "Available Packages",
    [Language.Russian]: "Доступные пакеты",
    [Language.Georgian]: "ხელმისაწვდომი პაკეტები"
  },
  "packages.tryDifferentFilter": {
    [Language.Turkish]: "Farklı bir filtre deneyebilir veya tüm paketlerimizi görmek için 'Tümü' seçeneğini kullanabilirsiniz.",
    [Language.English]: "You can try a different filter or use the 'All' option to see all our packages.",
    [Language.Russian]: "Вы можете попробовать другой фильтр или использовать опцию 'Все', чтобы увидеть все наши пакеты.",
    [Language.Georgian]: "შეგიძლიათ სცადოთ სხვა ფილტრი ან გამოიყენოთ ვარიანტი 'ყველა', რომ ნახოთ ჩვენი ყველა პაკეტი."
  },
  "packages.originCountry": {
    [Language.Turkish]: "Kaynak Ülke",
    [Language.English]: "Origin Country",
    [Language.Russian]: "Страна происхождения",
    [Language.Georgian]: "წარმოშობის ქვეყანა"
  },
  "countries.tr": {
    [Language.Turkish]: "Türkiye",
    [Language.English]: "Turkey",
    [Language.Russian]: "Турция",
    [Language.Georgian]: "თურქეთი"
  },
  "countries.ru": {
    [Language.Turkish]: "Rusya",
    [Language.English]: "Russia",
    [Language.Russian]: "Россия",
    [Language.Georgian]: "რუსეთი"
  },
  "countries.ua": {
    [Language.Turkish]: "Ukrayna",
    [Language.English]: "Ukraine",
    [Language.Russian]: "Украина",
    [Language.Georgian]: "უკრაინა"
  },
  "countries.az": {
    [Language.Turkish]: "Azerbaycan",
    [Language.English]: "Azerbaijan",
    [Language.Russian]: "Азербайджан",
    [Language.Georgian]: "აზერბაიჯანი"
  },
  "countries.ir": {
    [Language.Turkish]: "İran",
    [Language.English]: "Iran",
    [Language.Russian]: "Иран",
    [Language.Georgian]: "ირანი"
  },
  "countries.eu": {
    [Language.Turkish]: "Avrupa",
    [Language.English]: "Europe",
    [Language.Russian]: "Европа",
    [Language.Georgian]: "ევროპა"
  },
  "countries.sa": {
    [Language.Turkish]: "Suudi Arabistan",
    [Language.English]: "Saudi Arabia",
    [Language.Russian]: "Саудовская Аравия",
    [Language.Georgian]: "საუდის არაბეთი"
  },
  "countries.ae": {
    [Language.Turkish]: "Birleşik Arap Emirlikleri",
    [Language.English]: "United Arab Emirates",
    [Language.Russian]: "Объединенные Арабские Эмираты",
    [Language.Georgian]: "არაბთა გაერთიანებული საემიროები"
  },
  "countries.iq": {
    [Language.Turkish]: "Irak",
    [Language.English]: "Iraq",
    [Language.Russian]: "Ирак",
    [Language.Georgian]: "ერაყი"
  },
  "countries.am": {
    [Language.Turkish]: "Ermenistan",
    [Language.English]: "Armenia",
    [Language.Russian]: "Армения",
    [Language.Georgian]: "სომხეთი"
  },
  "countries.kz": {
    [Language.Turkish]: "Kazakistan",
    [Language.English]: "Kazakhstan",
    [Language.Russian]: "Казахстан",
    [Language.Georgian]: "ყაზახეთი"
  },
  "countries.by": {
    [Language.Turkish]: "Belarus",
    [Language.English]: "Belarus",
    [Language.Russian]: "Беларусь",
    [Language.Georgian]: "ბელარუსი"
  },
  "countries.md": {
    [Language.Turkish]: "Moldova",
    [Language.English]: "Moldova",
    [Language.Russian]: "Молдова",
    [Language.Georgian]: "მოლდოვა"
  },
  "countries.gr": {
    [Language.Turkish]: "Yunanistan",
    [Language.English]: "Greece",
    [Language.Russian]: "Греция",
    [Language.Georgian]: "საბერძნეთი"
  },
  "countries.bg": {
    [Language.Turkish]: "Bulgaristan",
    [Language.English]: "Bulgaria",
    [Language.Russian]: "Болгария",
    [Language.Georgian]: "ბულგარეთი"
  },
  "countries.ro": {
    [Language.Turkish]: "Romanya",
    [Language.English]: "Romania",
    [Language.Russian]: "Румыния",
    [Language.Georgian]: "რუმინეთი"
  },
  "countries.all": {
    [Language.Turkish]: "Tüm Ülkeler",
    [Language.English]: "All Countries",
    [Language.Russian]: "Все страны",
    [Language.Georgian]: "ყველა ქვეყანა"
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
  "reviews.title": {
    [Language.Turkish]: "Hasta Yorumları ve Değerlendirmeleri",
    [Language.English]: "Patient Reviews and Testimonials",
    [Language.Russian]: "Отзывы и рекомендации пациентов",
    [Language.Georgian]: "პაციენტების მიმოხილვები და რეკომენდაციები"
  },
  "reviews.subtitle": {
    [Language.Turkish]: "Gerçek hastalarımızın tecrübeleri ve başarı hikayeleri",
    [Language.English]: "Real experiences and success stories from our patients",
    [Language.Russian]: "Реальные истории успеха и опыт наших пациентов",
    [Language.Georgian]: "რეალური გამოცდილება და წარმატების ისტორიები ჩვენი პაციენტებისგან"
  },
  "reviews.verifiedCustomer": {
    [Language.Turkish]: "Doğrulanmış Hasta",
    [Language.English]: "Verified Patient",
    [Language.Russian]: "Проверенный пациент",
    [Language.Georgian]: "დადასტურებული პაციენტი"
  },
  "reviews.satisfactionGuarantee": {
    [Language.Turkish]: "%100 Memnuniyet Garantisi",
    [Language.English]: "100% Satisfaction Guarantee",
    [Language.Russian]: "100% гарантия удовлетворения",
    [Language.Georgian]: "100% კმაყოფილების გარანტია"
  },
  "reviews.overview": {
    [Language.Turkish]: "Değerlendirme Özeti",
    [Language.English]: "Ratings Overview",
    [Language.Russian]: "Обзор рейтингов",
    [Language.Georgian]: "შეფასებების მიმოხილვა"
  },
  "reviews.byCategory": {
    [Language.Turkish]: "Kategoriye Göre Değerlendirmeler",
    [Language.English]: "Ratings by Category",
    [Language.Russian]: "Рейтинги по категориям",
    [Language.Georgian]: "შეფასებები კატეგორიის მიხედვით"
  },
  "reviews.experienceRating": {
    [Language.Turkish]: "Genel Deneyim",
    [Language.English]: "Overall Experience",
    [Language.Russian]: "Общий опыт",
    [Language.Georgian]: "საერთო გამოცდილება"
  },
  "reviews.staffRating": {
    [Language.Turkish]: "Personel Kalitesi",
    [Language.English]: "Staff Quality",
    [Language.Russian]: "Качество персонала",
    [Language.Georgian]: "პერსონალის ხარისხი"
  },
  "reviews.facilityRating": {
    [Language.Turkish]: "Tesis Kalitesi",
    [Language.English]: "Facility Quality",
    [Language.Russian]: "Качество учреждения",
    [Language.Georgian]: "დაწესებულების ხარისხი"
  },
  "reviews.resultRating": {
    [Language.Turkish]: "Sonuçlar",
    [Language.English]: "Results",
    [Language.Russian]: "Результаты",
    [Language.Georgian]: "შედეგები"
  },
  "reviews.valueRating": {
    [Language.Turkish]: "Fiyat/Fayda",
    [Language.English]: "Value for Money",
    [Language.Russian]: "Соотношение цены и качества",
    [Language.Georgian]: "ფასი/ხარისხის შეფარდება"
  },
  "reviews.recentlyAdded": {
    [Language.Turkish]: "Yeni Eklenen Yorumlar",
    [Language.English]: "Recently Added Reviews",
    [Language.Russian]: "Недавно добавленные отзывы",
    [Language.Georgian]: "ახლახან დამატებული მიმოხილვები"
  },
  "reviews.basedOn": {
    [Language.Turkish]: "Toplam",
    [Language.English]: "Based on",
    [Language.Russian]: "На основе",
    [Language.Georgian]: "დაფუძნებული"
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