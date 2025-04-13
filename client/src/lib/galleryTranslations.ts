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
  }
};