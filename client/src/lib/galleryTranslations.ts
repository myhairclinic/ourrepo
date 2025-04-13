import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Galeride kullanılacak çeviri fonksiyonu
export function getGalleryTranslation(
  key: string,
  language: Language,
  replacements?: Record<string, string | number>
): string {
  const translationObj = galleryTranslations[key];
  
  if (!translationObj) {
    console.log(`Translation key not found: ${key}`);
    return key; // Return the key as fallback
  }
  
  const value = translationObj[language];
  return applyReplacements(value || key, replacements);
}

// Helper function to apply replacements to a translation string
function applyReplacements(text: string, replacements?: Record<string, string | number>): string {
  if (!replacements) {
    return text;
  }
  
  let result = text;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }
  
  return result;
}

// Galeri çevirileri
export const galleryTranslations: Record<string, LanguageMap> = {
  // Sayfa başlıkları
  "gallery.pageTitle": {
    [Language.Turkish]: "Galeri - MyHair Clinic",
    [Language.English]: "Gallery - MyHair Clinic",
    [Language.Russian]: "Галерея - MyHair Clinic",
    [Language.Georgian]: "გალერეა - MyHair Clinic"
  },
  "gallery.pageDescription": {
    [Language.Turkish]: "Saç ekimi öncesi ve sonrası sonuçlarımızı, kliniğimizi ve ekibimizi görebileceğiniz galeri sayfamız",
    [Language.English]: "Our gallery page where you can see our before and after hair transplantation results, our clinic and our team",
    [Language.Russian]: "Наша галерея, где вы можете увидеть результаты до и после трансплантации волос, нашу клинику и нашу команду",
    [Language.Georgian]: "ჩვენი გალერეის გვერდი, სადაც შეგიძლიათ ნახოთ ჩვენი შედეგები თმის გადანერგვამდე და შემდეგ, ჩვენი კლინიკა და ჩვენი გუნდი"
  },
  "gallery.exploreOurWork": {
    [Language.Turkish]: "Çalışmalarımızı Keşfedin",
    [Language.English]: "Explore Our Work",
    [Language.Russian]: "Исследуйте Нашу Работу",
    [Language.Georgian]: "გაეცანით ჩვენს ნამუშევრებს"
  },
  "gallery.transformationShowcase": {
    [Language.Turkish]: "Dönüşüm Vitrini",
    [Language.English]: "Transformation Showcase",
    [Language.Russian]: "Витрина Трансформации",
    [Language.Georgian]: "ტრანსფორმაციის ჩვენება"
  },
  "gallery.showcaseDescription": {
    [Language.Turkish]: "Hastalarımızın etkileyici saç ekimi öncesi ve sonrası sonuçlarını görebilirsiniz. Her bir resim, MyHair Clinic'in saç ekimi konusundaki uzmanlığını ve mükemmelliğini göstermektedir.",
    [Language.English]: "You can see the impressive before and after hair transplantation results of our patients. Each image showcases the expertise and excellence of MyHair Clinic in hair transplantation.",
    [Language.Russian]: "Вы можете увидеть впечатляющие результаты до и после трансплантации волос наших пациентов. Каждое изображение демонстрирует опыт и мастерство MyHair Clinic в трансплантации волос.",
    [Language.Georgian]: "შეგიძლიათ ნახოთ ჩვენი პაციენტების შთამბეჭდავი შედეგები თმის გადანერგვამდე და შემდეგ. თითოეული გამოსახულება აჩვენებს MyHair Clinic-ის გამოცდილებასა და უპირატესობას თმის გადანერგვაში."
  },
  
  // Filtre seçenekleri
  "gallery.clinicImages": {
    [Language.Turkish]: "Klinik Fotoğrafları",
    [Language.English]: "Clinic Images",
    [Language.Russian]: "Фотографии Клиники",
    [Language.Georgian]: "კლინიკის სურათები"
  },
  "gallery.videos": {
    [Language.Turkish]: "Videolar",
    [Language.English]: "Videos",
    [Language.Russian]: "Видео",
    [Language.Georgian]: "ვიდეოები"
  },
  "gallery.beforeAfter": {
    [Language.Turkish]: "Öncesi & Sonrası",
    [Language.English]: "Before & After",
    [Language.Russian]: "До и После",
    [Language.Georgian]: "მანამდე და შემდეგ"
  },
  "gallery.all": {
    [Language.Turkish]: "Tümü",
    [Language.English]: "All",
    [Language.Russian]: "Все",
    [Language.Georgian]: "ყველა"
  },
  "gallery.procedures": {
    [Language.Turkish]: "Prosedürler",
    [Language.English]: "Procedures",
    [Language.Russian]: "Процедуры",
    [Language.Georgian]: "პროცედურები"
  },
  "gallery.facilities": {
    [Language.Turkish]: "Tesisler",
    [Language.English]: "Facilities",
    [Language.Russian]: "Удобства",
    [Language.Georgian]: "ობიექტები"
  },
  "gallery.team": {
    [Language.Turkish]: "Ekibimiz",
    [Language.English]: "Our Team",
    [Language.Russian]: "Наша Команда",
    [Language.Georgian]: "ჩვენი გუნდი"
  },
  
  // Görsel açıklamaları
  "gallery.highResolution": {
    [Language.Turkish]: "Yüksek Çözünürlüklü",
    [Language.English]: "High Resolution",
    [Language.Russian]: "Высокое Разрешение",
    [Language.Georgian]: "მაღალი გარჩევადობა"
  },
  "gallery.resultAfter": {
    [Language.Turkish]: "Sonuç ({{time}} ay sonra)",
    [Language.English]: "Result (after {{time}} months)",
    [Language.Russian]: "Результат (через {{time}} месяцев)",
    [Language.Georgian]: "შედეგი ({{time}} თვის შემდეგ)"
  },
  "gallery.months": {
    [Language.Turkish]: "ay",
    [Language.English]: "months",
    [Language.Russian]: "месяцев",
    [Language.Georgian]: "თვე"
  },
  "gallery.hairTransplant": {
    [Language.Turkish]: "Saç Ekimi",
    [Language.English]: "Hair Transplant",
    [Language.Russian]: "Трансплантация Волос",
    [Language.Georgian]: "თმის გადანერგვა"
  },
  
  // Belirli resim açıklamaları
  "gallery.completeHairRestoration": {
    [Language.Turkish]: "Tam Saç Restorasyonu",
    [Language.English]: "Complete Hair Restoration",
    [Language.Russian]: "Полное Восстановление Волос",
    [Language.Georgian]: "სრული თმის აღდგენა"
  },
  "gallery.eyebrowTransplant": {
    [Language.Turkish]: "Kaş Ekimi",
    [Language.English]: "Eyebrow Transplant",
    [Language.Russian]: "Трансплантация Бровей",
    [Language.Georgian]: "წარბების გადანერგვა"
  },
  "gallery.naturalEyebrowEnhancement": {
    [Language.Turkish]: "Doğal Kaş Güçlendirme",
    [Language.English]: "Natural Eyebrow Enhancement",
    [Language.Russian]: "Естественное Улучшение Бровей",
    [Language.Georgian]: "ბუნებრივი წარბების გაუმჯობესება"
  },
  "gallery.youngPatientTransformation": {
    [Language.Turkish]: "Genç Hasta Dönüşümü",
    [Language.English]: "Young Patient Transformation",
    [Language.Russian]: "Трансформация Молодого Пациента",
    [Language.Georgian]: "ახალგაზრდა პაციენტის ტრანსფორმაცია"
  },
  "gallery.improvedHairDensity": {
    [Language.Turkish]: "Geliştirilmiş Saç Yoğunluğu",
    [Language.English]: "Improved Hair Density",
    [Language.Russian]: "Улучшенная Плотность Волос",
    [Language.Georgian]: "გაუმჯობესებული თმის სიმკვრივე"
  },
  "gallery.hairlinePlanning": {
    [Language.Turkish]: "Saç Çizgisi Planlaması",
    [Language.English]: "Hairline Planning",
    [Language.Russian]: "Планирование Линии Роста Волос",
    [Language.Georgian]: "თმის ხაზის დაგეგმვა"
  },
  "gallery.precisionHairlineDesign": {
    [Language.Turkish]: "Hassas Saç Çizgisi Tasarımı",
    [Language.English]: "Precision Hairline Design",
    [Language.Russian]: "Точный Дизайн Линии Роста Волос",
    [Language.Georgian]: "ზუსტი თმის ხაზის დიზაინი"
  },
  "gallery.extensiveRestoration": {
    [Language.Turkish]: "Kapsamlı Restorasyon",
    [Language.English]: "Extensive Restoration",
    [Language.Russian]: "Обширное Восстановление",
    [Language.Georgian]: "ფართო აღდგენა"
  },
  "gallery.completeHairCoverage": {
    [Language.Turkish]: "Tam Saç Kapsama",
    [Language.English]: "Complete Hair Coverage",
    [Language.Russian]: "Полное Покрытие Волос",
    [Language.Georgian]: "სრული თმის დაფარვა"
  },
  "gallery.seniorPatientTransformation": {
    [Language.Turkish]: "Yaşlı Hasta Dönüşümü",
    [Language.English]: "Senior Patient Transformation",
    [Language.Russian]: "Трансформация Пожилого Пациента",
    [Language.Georgian]: "უფროსი პაციენტის ტრანსფორმაცია"
  },
  "gallery.naturalRejuvenation": {
    [Language.Turkish]: "Doğal Gençleşme",
    [Language.English]: "Natural Rejuvenation",
    [Language.Russian]: "Естественное Омоложение",
    [Language.Georgian]: "ბუნებრივი გაახალგაზრდავება"
  },
  "gallery.hairTransplantProcedure": {
    [Language.Turkish]: "Saç Ekimi Prosedürü",
    [Language.English]: "Hair Transplant Procedure",
    [Language.Russian]: "Процедура Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა"
  },
  "gallery.professionalApplication": {
    [Language.Turkish]: "Profesyonel Uygulama",
    [Language.English]: "Professional Application",
    [Language.Russian]: "Профессиональное Применение",
    [Language.Georgian]: "პროფესიონალური გამოყენება"
  },
  "gallery.advancedThinning": {
    [Language.Turkish]: "İleri Seyrelme",
    [Language.English]: "Advanced Thinning",
    [Language.Russian]: "Продвинутое Истончение",
    [Language.Georgian]: "წინწაწეული გათხელება"
  },
  "gallery.dramaticImprovement": {
    [Language.Turkish]: "Dramatik İyileşme",
    [Language.English]: "Dramatic Improvement",
    [Language.Russian]: "Драматическое Улучшение",
    [Language.Georgian]: "დრამატული გაუმჯობესება"
  },
  "gallery.youngMaleTransformation": {
    [Language.Turkish]: "Genç Erkek Dönüşümü",
    [Language.English]: "Young Male Transformation",
    [Language.Russian]: "Трансформация Молодого Мужчины",
    [Language.Georgian]: "ახალგაზრდა მამაკაცის ტრანსფორმაცია"
  },
  "gallery.naturalHairlineAndDensity": {
    [Language.Turkish]: "Doğal Saç Çizgisi ve Yoğunluk",
    [Language.English]: "Natural Hairline and Density",
    [Language.Russian]: "Естественная Линия Роста Волос и Плотность",
    [Language.Georgian]: "ბუნებრივი თმის ხაზი და სიმკვრივე"
  },
  
  // Klinik prosedür başlıkları
  "gallery.hairAnalysis": {
    [Language.Turkish]: "Saç Analizi",
    [Language.English]: "Hair Analysis",
    [Language.Russian]: "Анализ Волос",
    [Language.Georgian]: "თმის ანალიზი"
  },
  "gallery.donorAreaPreparation": {
    [Language.Turkish]: "Donör Alan Hazırlığı",
    [Language.English]: "Donor Area Preparation",
    [Language.Russian]: "Подготовка Донорской Зоны",
    [Language.Georgian]: "დონორის ზონის მომზადება"
  },
  "gallery.graftExtraction": {
    [Language.Turkish]: "Greft Çıkarma",
    [Language.English]: "Graft Extraction",
    [Language.Russian]: "Извлечение Графтов",
    [Language.Georgian]: "გრაფტის ექსტრაქცია"
  },
  "gallery.hairTransplantTechnique": {
    [Language.Turkish]: "Saç Ekimi Tekniği",
    [Language.English]: "Hair Transplant Technique",
    [Language.Russian]: "Техника Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის ტექნიკა"
  },
  "gallery.recipientSiteCreation": {
    [Language.Turkish]: "Alıcı Alan Oluşturma",
    [Language.English]: "Recipient Site Creation",
    [Language.Russian]: "Создание Реципиентных Участков",
    [Language.Georgian]: "მიმღები უბნის შექმნა"
  },
  "gallery.implantationProcess": {
    [Language.Turkish]: "İmplantasyon Süreci",
    [Language.English]: "Implantation Process",
    [Language.Russian]: "Процесс Имплантации",
    [Language.Georgian]: "იმპლანტაციის პროცესი"
  },
  "gallery.precisionTools": {
    [Language.Turkish]: "Hassas Aletler",
    [Language.English]: "Precision Tools",
    [Language.Russian]: "Прецизионные Инструменты",
    [Language.Georgian]: "პრეციზიული ინსტრუმენტები"
  },
  
  // Tesis açıklamaları
  "gallery.operationRoom": {
    [Language.Turkish]: "Operasyon Odası",
    [Language.English]: "Operation Room",
    [Language.Russian]: "Операционная",
    [Language.Georgian]: "საოპერაციო ოთახი"
  },
  "gallery.consultationRoom": {
    [Language.Turkish]: "Konsültasyon Odası",
    [Language.English]: "Consultation Room",
    [Language.Russian]: "Консультационный Кабинет",
    [Language.Georgian]: "საკონსულტაციო ოთახი"
  },
  "gallery.advancedEquipment": {
    [Language.Turkish]: "İleri Teknoloji Ekipmanlar",
    [Language.English]: "Advanced Equipment",
    [Language.Russian]: "Современное Оборудование",
    [Language.Georgian]: "თანამედროვე აღჭურვილობა"
  },
  "gallery.sterilizationArea": {
    [Language.Turkish]: "Sterilizasyon Alanı",
    [Language.English]: "Sterilization Area",
    [Language.Russian]: "Зона Стерилизации",
    [Language.Georgian]: "სტერილიზაციის ზონა"
  },
  
  // Ekip başlıkları
  "gallery.medicalTeam": {
    [Language.Turkish]: "Tıbbi Ekip",
    [Language.English]: "Medical Team",
    [Language.Russian]: "Медицинская Команда",
    [Language.Georgian]: "სამედიცინო გუნდი"
  },
  "gallery.surgicalTeam": {
    [Language.Turkish]: "Cerrahi Ekip",
    [Language.English]: "Surgical Team",
    [Language.Russian]: "Хирургическая Команда",
    [Language.Georgian]: "ქირურგიული გუნდი"
  },
  "gallery.technicalStaff": {
    [Language.Turkish]: "Teknik Personel",
    [Language.English]: "Technical Staff",
    [Language.Russian]: "Технический Персонал",
    [Language.Georgian]: "ტექნიკური პერსონალი"
  },
  "gallery.supportStaff": {
    [Language.Turkish]: "Destek Personeli",
    [Language.English]: "Support Staff",
    [Language.Russian]: "Вспомогательный Персонал",
    [Language.Georgian]: "დამხმარე პერსონალი"
  },
  
  // Video başlıkları
  "gallery.hairTransplantProcess": {
    [Language.Turkish]: "Saç Ekimi Süreci",
    [Language.English]: "Hair Transplant Process",
    [Language.Russian]: "Процесс Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის პროცესი"
  },
  "gallery.patientTestimonial": {
    [Language.Turkish]: "Hasta Görüşleri",
    [Language.English]: "Patient Testimonial",
    [Language.Russian]: "Отзывы Пациентов",
    [Language.Georgian]: "პაციენტის დამოწმება"
  },
  "gallery.clinicTour": {
    [Language.Turkish]: "Klinik Turu",
    [Language.English]: "Clinic Tour",
    [Language.Russian]: "Тур по Клинике",
    [Language.Georgian]: "კლინიკის ტური"
  },
  "gallery.doctorInterview": {
    [Language.Turkish]: "Doktor Röportajı",
    [Language.English]: "Doctor Interview",
    [Language.Russian]: "Интервью с Доктором",
    [Language.Georgian]: "ექიმის ინტერვიუ"
  },
  "gallery.consultationSession": {
    [Language.Turkish]: "Konsültasyon Seansı",
    [Language.English]: "Consultation Session",
    [Language.Russian]: "Консультационная Сессия",
    [Language.Georgian]: "საკონსულტაციო სესია"
  },
  "gallery.operationOverview": {
    [Language.Turkish]: "Operasyon Genel Bakışı",
    [Language.English]: "Operation Overview",
    [Language.Russian]: "Обзор Операции",
    [Language.Georgian]: "ოპერაციის მიმოხილვა"
  },
  "gallery.hairTransplantResults": {
    [Language.Turkish]: "Saç Ekimi Sonuçları",
    [Language.English]: "Hair Transplant Results",
    [Language.Russian]: "Результаты Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის შედეგები"
  },
  "gallery.patientJourney": {
    [Language.Turkish]: "Hasta Yolculuğu",
    [Language.English]: "Patient Journey",
    [Language.Russian]: "Путь Пациента",
    [Language.Georgian]: "პაციენტის მოგზაურობა"
  },
  "gallery.testimonialVideo": {
    [Language.Turkish]: "Tavsiye Videosu",
    [Language.English]: "Testimonial Video",
    [Language.Russian]: "Видео Отзыв",
    [Language.Georgian]: "სარეკომენდაციო ვიდეო"
  },
  "gallery.treatmentExplained": {
    [Language.Turkish]: "Tedavi Açıklaması",
    [Language.English]: "Treatment Explained",
    [Language.Russian]: "Объяснение Лечения",
    [Language.Georgian]: "მკურნალობის განმარტება"
  },
  "gallery.facilityTour": {
    [Language.Turkish]: "Tesis Turu",
    [Language.English]: "Facility Tour",
    [Language.Russian]: "Тур по Учреждению",
    [Language.Georgian]: "ობიექტის ტური"
  },
  
  // Öncesi/Sonrası açıklamaları
  "gallery.malePatterBaldness": {
    [Language.Turkish]: "Erkek Tipi Kellik",
    [Language.English]: "Male Pattern Baldness",
    [Language.Russian]: "Мужское Облысение",
    [Language.Georgian]: "მამაკაცის თმის ცვენის ტიპი"
  },
  "gallery.fullHairTransformation": {
    [Language.Turkish]: "Tam Saç Dönüşümü",
    [Language.English]: "Full Hair Transformation",
    [Language.Russian]: "Полная Трансформация Волос",
    [Language.Georgian]: "სრული თმის ტრანსფორმაცია"
  },
  "gallery.recededHairline": {
    [Language.Turkish]: "Gerilemiş Saç Çizgisi",
    [Language.English]: "Receded Hairline",
    [Language.Russian]: "Отступившая Линия Роста Волос",
    [Language.Georgian]: "უკან დახეული თმის ხაზი"
  },
  "gallery.naturalHairlineRestoration": {
    [Language.Turkish]: "Doğal Saç Çizgisi Restorasyonu",
    [Language.English]: "Natural Hairline Restoration",
    [Language.Russian]: "Естественное Восстановление Линии Роста Волос",
    [Language.Georgian]: "ბუნებრივი თმის ხაზის აღდგენა"
  },
  "gallery.advancedBaldness": {
    [Language.Turkish]: "İleri Kellik",
    [Language.English]: "Advanced Baldness",
    [Language.Russian]: "Прогрессирующее Облысение",
    [Language.Georgian]: "მოწინავე სიმელოტე"
  },
  "gallery.beardTransplant": {
    [Language.Turkish]: "Sakal Ekimi",
    [Language.English]: "Beard Transplant",
    [Language.Russian]: "Трансплантация Бороды",
    [Language.Georgian]: "წვერის გადანერგვა"
  }
};