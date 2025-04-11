import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Additional translations for package filters and features
export const packageTranslations: Record<string, LanguageMap> = {
  // Page Sections
  "packages.pageTitle": {
    [Language.Turkish]: "Tedavi ve Seyahat Paketleri",
    [Language.English]: "Treatment and Travel Packages",
    [Language.Russian]: "Пакеты Лечения и Путешествий",
    [Language.Georgian]: "მკურნალობისა და მოგზაურობის პაკეტები"
  },
  "packages.pageDescription": {
    [Language.Turkish]: "Her ülkeden hastalarımız için özel hazırlanmış konforlu seyahat ve saç ekimi paketleri",
    [Language.English]: "Comfortable travel and hair transplantation packages specially prepared for our patients from all countries",
    [Language.Russian]: "Комфортные пакеты путешествий и трансплантации волос, специально подготовленные для наших пациентов из всех стран",
    [Language.Georgian]: "კომფორტული მოგზაურობისა და თმის გადანერგვის პაკეტები, სპეციალურად მომზადებული ჩვენი პაციენტებისათვის ყველა ქვეყნიდან"
  },
  "packages.byCountry": {
    [Language.Turkish]: "Ülkelere Göre Paketler",
    [Language.English]: "Packages by Country",
    [Language.Russian]: "Пакеты по странам",
    [Language.Georgian]: "პაკეტები ქვეყნების მიხედვით"
  },
  "packages.packageCount": {
    [Language.Turkish]: "paket",
    [Language.English]: "packages",
    [Language.Russian]: "пакеты",
    [Language.Georgian]: "პაკეტები"
  },
  "packages.packageFeatures": {
    [Language.Turkish]: "Paket Özellikleri",
    [Language.English]: "Package Features",
    [Language.Russian]: "Особенности пакета",
    [Language.Georgian]: "პაკეტის მახასიათებლები"
  },
  "packages.viewDetails": {
    [Language.Turkish]: "Detayları Görüntüle",
    [Language.English]: "View Details",
    [Language.Russian]: "Посмотреть детали",
    [Language.Georgian]: "დეტალების ნახვა"
  },
  "packages.noResults": {
    [Language.Turkish]: "Hiçbir paket bulunamadı",
    [Language.English]: "No packages found",
    [Language.Russian]: "Пакеты не найдены",
    [Language.Georgian]: "პაკეტები ვერ მოიძებნა"
  },
  "packages.packageCount": {
    [Language.Turkish]: "paket",
    [Language.English]: "packages",
    [Language.Russian]: "пакетов",
    [Language.Georgian]: "პაკეტები"
  },
  "packages.emptyState": {
    [Language.Turkish]: "Seçili kriterlere uygun paket bulunamadı",
    [Language.English]: "No packages found matching your criteria",
    [Language.Russian]: "Не найдено пакетов, соответствующих вашим критериям",
    [Language.Georgian]: "თქვენი კრიტერიუმებით შესაბამისი პაკეტები ვერ მოიძებნა"
  },
  "packages.noPackages": {
    [Language.Turkish]: "Şu anda uygun paket bulunmuyor",
    [Language.English]: "No packages available at the moment",
    [Language.Russian]: "На данный момент пакеты недоступны",
    [Language.Georgian]: "ამჟამად პაკეტები არ არის ხელმისაწვდომი"
  },
  // Countries
  "countries.all": {
    [Language.Turkish]: "Tüm Ülkeler",
    [Language.English]: "All Countries",
    [Language.Russian]: "Все страны",
    [Language.Georgian]: "ყველა ქვეყანა"
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
  "countries.az": {
    [Language.Turkish]: "Azerbaycan",
    [Language.English]: "Azerbaijan",
    [Language.Russian]: "Азербайджан",
    [Language.Georgian]: "აზერბაიჯანი"
  },
  "countries.kz": {
    [Language.Turkish]: "Kazakistan",
    [Language.English]: "Kazakhstan",
    [Language.Russian]: "Казахстан",
    [Language.Georgian]: "ყაზახეთი"
  },
  "countries.ua": {
    [Language.Turkish]: "Ukrayna",
    [Language.English]: "Ukraine",
    [Language.Russian]: "Украина",
    [Language.Georgian]: "უკრაინა"
  },
  "countries.ir": {
    [Language.Turkish]: "İran",
    [Language.English]: "Iran",
    [Language.Russian]: "Иран",
    [Language.Georgian]: "ირანი"
  },
  "countries.sa": {
    [Language.Turkish]: "Suudi Arabistan",
    [Language.English]: "Saudi Arabia",
    [Language.Russian]: "Саудовская Аравия",
    [Language.Georgian]: "საუდის არაბეთი"
  },
  "countries.ae": {
    [Language.Turkish]: "BAE",
    [Language.English]: "UAE",
    [Language.Russian]: "ОАЭ",
    [Language.Georgian]: "არაბთა გაერთიანებული საამიროები"
  },
  "countries.am": {
    [Language.Turkish]: "Ermenistan",
    [Language.English]: "Armenia",
    [Language.Russian]: "Армения",
    [Language.Georgian]: "სომხეთი"
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
  // Package Filters
  "packages.filters": {
    [Language.Turkish]: "Filtreler",
    [Language.English]: "Filters",
    [Language.Russian]: "Фильтры",
    [Language.Georgian]: "ფილტრები"
  },
  "packages.filterByCountry": {
    [Language.Turkish]: "Ülkeye Göre Filtrele",
    [Language.English]: "Filter by Country",
    [Language.Russian]: "Фильтр по стране",
    [Language.Georgian]: "ფილტრი ქვეყნის მიხედვით"
  },
  "packages.filterByDuration": {
    [Language.Turkish]: "Süreye Göre Filtrele",
    [Language.English]: "Filter by Duration",
    [Language.Russian]: "Фильтр по продолжительности",
    [Language.Georgian]: "ფილტრი ხანგრძლივობის მიხედვით"
  },
  "packages.filterByFeatures": {
    [Language.Turkish]: "Özelliklere Göre Filtrele",
    [Language.English]: "Filter by Features",
    [Language.Russian]: "Фильтр по особенностям",
    [Language.Georgian]: "ფილტრი მახასიათებლების მიხედვით"
  },
  "packages.originCountry": {
    [Language.Turkish]: "Menşei Ülke",
    [Language.English]: "Origin Country",
    [Language.Russian]: "Страна происхождения",
    [Language.Georgian]: "წარმოშობის ქვეყანა"
  },
  "packages.days": {
    [Language.Turkish]: "gün",
    [Language.English]: "days",
    [Language.Russian]: "дней",
    [Language.Georgian]: "დღე"
  },
  "packages.shortStay": {
    [Language.Turkish]: "Kısa Kalış",
    [Language.English]: "Short Stay",
    [Language.Russian]: "Короткое пребывание",
    [Language.Georgian]: "მოკლე დარჩენა"
  },
  "packages.longStay": {
    [Language.Turkish]: "Uzun Kalış",
    [Language.English]: "Long Stay",
    [Language.Russian]: "Длительное пребывание",
    [Language.Georgian]: "გრძელი დარჩენა"
  },
  "packages.featuredOnly": {
    [Language.Turkish]: "Sadece Öne Çıkan Paketler",
    [Language.English]: "Featured Packages Only",
    [Language.Russian]: "Только рекомендуемые пакеты",
    [Language.Georgian]: "მხოლოდ გამორჩეული პაკეტები"
  },
  "packages.resetFilters": {
    [Language.Turkish]: "Filtreleri Sıfırla",
    [Language.English]: "Reset Filters",
    [Language.Russian]: "Сбросить фильтры",
    [Language.Georgian]: "ფილტრების გადატვირთვა"
  },
  "packages.tryDifferentFilter": {
    [Language.Turkish]: "Farklı bir filtre deneyin veya filtreleri temizleyin.",
    [Language.English]: "Please try a different filter or reset all filters.",
    [Language.Russian]: "Пожалуйста, попробуйте другой фильтр или сбросьте все фильтры.",
    [Language.Georgian]: "გთხოვთ, სცადოთ სხვა ფილტრი ან გაასუფთავოთ ყველა ფილტრი."
  },
  "packages.availablePackages": {
    [Language.Turkish]: "Mevcut Paketler",
    [Language.English]: "Available Packages",
    [Language.Russian]: "Доступные пакеты",
    [Language.Georgian]: "ხელმისაწვდომი პაკეტები"
  },
  "packages.whyOurPackages": {
    [Language.Turkish]: "Neden Paketlerimizi Seçmelisiniz?",
    [Language.English]: "Why Choose Our Packages?",
    [Language.Russian]: "Почему следует выбрать наши пакеты?",
    [Language.Georgian]: "რატომ უნდა აირჩიოთ ჩვენი პაკეტები?"
  },
  "packages.saveTime": {
    [Language.Turkish]: "Zaman Kazandırır",
    [Language.English]: "Saves Time",
    [Language.Russian]: "Экономит время",
    [Language.Georgian]: "დროის დაზოგვა"
  },
  "packages.saveTimeDesc": {
    [Language.Turkish]: "Seyahat planlamak için harcadığınız zamanı en aza indirin. Her şey sizin için organize edilmiştir.",
    [Language.English]: "Minimize the time you spend planning your travel. Everything is organized for you.",
    [Language.Russian]: "Минимизируйте время, которое вы тратите на планирование путешествия. Все организовано для вас.",
    [Language.Georgian]: "მინიმუმამდე შეამცირეთ დრო, რომელსაც ხარჯავთ მოგზაურობის დაგეგმვაზე. ყველაფერი ორგანიზებულია თქვენთვის."
  },
  "packages.expertTeam": {
    [Language.Turkish]: "Uzman Ekip",
    [Language.English]: "Expert Team",
    [Language.Russian]: "Команда экспертов",
    [Language.Georgian]: "ექსპერტთა გუნდი"
  },
  "packages.expertTeamDesc": {
    [Language.Turkish]: "Deneyimli doktor ve çok dilli rehberlerden oluşan ekibimiz sizi her adımda destekleyecek.",
    [Language.English]: "Our team of experienced doctors and multilingual guides will support you every step of the way.",
    [Language.Russian]: "Наша команда опытных врачей и многоязычных гидов будет поддерживать вас на каждом этапе.",
    [Language.Georgian]: "ჩვენი გამოცდილი ექიმებისა და მრავალენოვანი გიდების გუნდი მხარს დაგიჭერთ ყოველ ნაბიჯზე."
  },
  "packages.bestLocations": {
    [Language.Turkish]: "En İyi Konumlar",
    [Language.English]: "Best Locations",
    [Language.Russian]: "Лучшие локации",
    [Language.Georgian]: "საუკეთესო ადგილმდებარეობა"
  },
  "packages.bestLocationsDesc": {
    [Language.Turkish]: "Şehrin merkezinde konumlandırılmış 5 yıldızlı oteller ve prestijli kliniklerle konfor garantisi.",
    [Language.English]: "Guaranteed comfort with 5-star hotels located in the center of the city and prestigious clinics.",
    [Language.Russian]: "Гарантированный комфорт с 5-звездочными отелями, расположенными в центре города, и престижными клиниками.",
    [Language.Georgian]: "გარანტირებული კომფორტი 5-ვარსკვლავიანი სასტუმროებით, რომლებიც მდებარეობს ქალაქის ცენტრში და პრესტიჟულ კლინიკებში."
  },
  "packages.seamlessTransport": {
    [Language.Turkish]: "Sorunsuz Ulaşım",
    [Language.English]: "Seamless Transportation",
    [Language.Russian]: "Беспроблемный транспорт",
    [Language.Georgian]: "უპრობლემო ტრანსპორტირება"
  },
  "packages.seamlessTransportDesc": {
    [Language.Turkish]: "Havalimanından kliniğe ve turistik yerlere özel VIP transferler ile seyahat stresi olmadan.",
    [Language.English]: "Private VIP transfers from the airport to the clinic and tourist attractions without travel stress.",
    [Language.Russian]: "Частные VIP-трансферы из аэропорта в клинику и к туристическим достопримечательностям без стресса от путешествия.",
    [Language.Georgian]: "კერძო VIP ტრანსფერები აეროპორტიდან კლინიკაში და ტურისტულ ღირსშესანიშნაობებში სამოგზაურო სტრესის გარეშე."
  },
  "packages.completeExperience": {
    [Language.Turkish]: "Eksiksiz Deneyim",
    [Language.English]: "Complete Experience",
    [Language.Russian]: "Полный опыт",
    [Language.Georgian]: "სრული გამოცდილება"
  },
  "packages.medicalExcellence": {
    [Language.Turkish]: "Tıbbi Mükemmellik",
    [Language.English]: "Medical Excellence",
    [Language.Russian]: "Медицинское превосходство",
    [Language.Georgian]: "სამედიცინო უპირატესობა"
  },
  "packages.medicalExcellenceDesc": {
    [Language.Turkish]: "Deneyimli uzmanlar ve en yeni teknolojilerle üstün saç ekimi sonuçları elde edin.",
    [Language.English]: "Get superior hair transplantation results with experienced specialists and latest technologies.",
    [Language.Russian]: "Получите превосходные результаты трансплантации волос с опытными специалистами и новейшими технологиями.",
    [Language.Georgian]: "მიიღეთ უმაღლესი ხარისხის თმის გადანერგვის შედეგები გამოცდილი სპეციალისტებითა და უახლესი ტექნოლოგიებით."
  },
  "packages.luxuryAccommodation": {
    [Language.Turkish]: "Lüks Konaklama",
    [Language.English]: "Luxury Accommodation",
    [Language.Russian]: "Люкс размещение",
    [Language.Georgian]: "ლუქს საცხოვრებელი"
  },
  "packages.completeExperienceDesc": {
    [Language.Turkish]: "Tıbbi tedavi ve tatil deneyimini bir araya getiren paketlerimizle, sağlığınız ve konforunuz için her şey düşünülmüştür.",
    [Language.English]: "Our packages combine medical treatment and holiday experience, with everything thoughtfully arranged for your health and comfort.",
    [Language.Russian]: "Наши пакеты сочетают в себе медицинское лечение и отдых, с продуманной организацией всего для вашего здоровья и комфорта.",
    [Language.Georgian]: "ჩვენი პაკეტები აერთიანებს სამედიცინო მკურნალობასა და დასვენების გამოცდილებას, ყველაფერი გულმოდგინედ მოწყობილია თქვენი ჯანმრთელობისა და კომფორტისთვის."
  },
  "packages.tourism": {
    [Language.Turkish]: "Turizm",
    [Language.English]: "Tourism",
    [Language.Russian]: "Туризм",
    [Language.Georgian]: "ტურიზმი"
  },
  "packages.tourismDesc": {
    [Language.Turkish]: "Tedaviniz bittikten sonra Gürcistan'ın güzelliklerini keşfedin.",
    [Language.English]: "Discover the beauty of Georgia after your treatment.",
    [Language.Russian]: "Откройте для себя красоту Грузии после лечения.",
    [Language.Georgian]: "აღმოაჩინეთ საქართველოს სილამაზე მკურნალობის შემდეგ."
  },
  "packages.accommodationDesc": {
    [Language.Turkish]: "Şehir merkezindeki 5 yıldızlı otellerde konforlu konaklama.",
    [Language.English]: "Comfortable accommodation in 5-star hotels in the city center.",
    [Language.Russian]: "Комфортное проживание в 5-звездочных отелях в центре города.",
    [Language.Georgian]: "კომფორტული საცხოვრებელი 5-ვარსკვლავიან სასტუმროებში ქალაქის ცენტრში."
  },
  
  // Package Features
  "packages.features.vip": {
    [Language.Turkish]: "VIP Hizmetler",
    [Language.English]: "VIP Services",
    [Language.Russian]: "VIP-услуги",
    [Language.Georgian]: "VIP სერვისები"
  },
  "packages.features.spa": {
    [Language.Turkish]: "Spa ve Masaj",
    [Language.English]: "Spa & Massage",
    [Language.Russian]: "Спа и массаж",
    [Language.Georgian]: "სპა და მასაჟი"
  },
  "packages.features.translator": {
    [Language.Turkish]: "Kişisel Tercüman",
    [Language.English]: "Personal Translator",
    [Language.Russian]: "Личный переводчик",
    [Language.Georgian]: "პირადი თარჯიმანი"
  },
  "packages.features.citytour": {
    [Language.Turkish]: "Şehir Turu",
    [Language.English]: "City Tour",
    [Language.Russian]: "Экскурсия по городу",
    [Language.Georgian]: "ქალაქის ტური"
  },
  "packages.features.premium": {
    [Language.Turkish]: "Premium Saç Analizi",
    [Language.English]: "Premium Hair Analysis",
    [Language.Russian]: "Премиум-анализ волос",
    [Language.Georgian]: "პრემიუმ თმის ანალიზი"
  },
  "packages.features.wine": {
    [Language.Turkish]: "Şarap Bölgesi Turu",
    [Language.English]: "Wine Region Tour",
    [Language.Russian]: "Тур по винодельческим регионам",
    [Language.Georgian]: "ღვინის რეგიონის ტური"
  },
  "packages.features.border": {
    [Language.Turkish]: "Sınır Geçişi Yardımı",
    [Language.English]: "Border Crossing Assistance",
    [Language.Russian]: "Помощь при пересечении границы",
    [Language.Georgian]: "საზღვრის გადაკვეთის დახმარება"
  },
  "packages.features.airport": {
    [Language.Turkish]: "Havalimanı VIP Karşılama",
    [Language.English]: "Airport VIP Welcome",
    [Language.Russian]: "VIP-встреча в аэропорту",
    [Language.Georgian]: "აეროპორტის VIP მისალმება"
  },
  "packages.features.massage": {
    [Language.Turkish]: "Seyahat Sonrası Masaj",
    [Language.English]: "Post-Travel Massage",
    [Language.Russian]: "Массаж после путешествия",
    [Language.Georgian]: "მოგზაურობის შემდგომი მასაჟი"
  },
  "packages.airportTransfer": {
    [Language.Turkish]: "Havalimanı Transferi",
    [Language.English]: "Airport Transfer",
    [Language.Russian]: "Трансфер из аэропорта",
    [Language.Georgian]: "აეროპორტის ტრანსფერი"
  },
  "packages.personalCare": {
    [Language.Turkish]: "Kişisel Bakım",
    [Language.English]: "Personal Care",
    [Language.Russian]: "Личный уход",
    [Language.Georgian]: "პირადი მოვლა"
  },
  "packages.cityTours": {
    [Language.Turkish]: "Şehir Turları",
    [Language.English]: "City Tours",
    [Language.Russian]: "Городские экскурсии",
    [Language.Georgian]: "ქალაქის ტურები"
  },
  "packages.traditionalCuisine": {
    [Language.Turkish]: "Geleneksel Mutfak",
    [Language.English]: "Traditional Cuisine",
    [Language.Russian]: "Традиционная кухня",
    [Language.Georgian]: "ტრადიციული სამზარეულო"
  },
  "packages.freeConsultation": {
    [Language.Turkish]: "Ücretsiz Konsültasyon",
    [Language.English]: "Free Consultation",
    [Language.Russian]: "Бесплатная консультация",
    [Language.Georgian]: "უფასო კონსულტაცია"
  },
  
  // Package Types
  "packages.premium": {
    [Language.Turkish]: "Premium Paket",
    [Language.English]: "Premium Package",
    [Language.Russian]: "Премиум-пакет",
    [Language.Georgian]: "პრემიუმ პაკეტი"
  },
  "packages.standard": {
    [Language.Turkish]: "Standart Paket",
    [Language.English]: "Standard Package",
    [Language.Russian]: "Стандартный пакет",
    [Language.Georgian]: "სტანდარტული პაკეტი"
  },
  "packages.luxury": {
    [Language.Turkish]: "Lüks Paket",
    [Language.English]: "Luxury Package",
    [Language.Russian]: "Люкс пакет",
    [Language.Georgian]: "ლუქსი პაკეტი"
  },
  "packages.budget": {
    [Language.Turkish]: "Ekonomik Paket",
    [Language.English]: "Budget Package",
    [Language.Russian]: "Бюджетный пакет",
    [Language.Georgian]: "ეკონომიური პაკეტი"
  },
  "packages.allInclusive": {
    [Language.Turkish]: "Her Şey Dahil",
    [Language.English]: "All Inclusive",
    [Language.Russian]: "Всё включено",
    [Language.Georgian]: "ყველაფერი ჩართულია"
  }
};

// Get translation function for package translations
export function getPackageTranslation(key: string, language: Language): string {
  const nestedKeys = key.split('.');
  
  let current = packageTranslations;
  for (let i = 0; i < nestedKeys.length - 1; i++) {
    const nestedKey = nestedKeys[i];
    if (!current[nestedKey]) {
      // If we can't find the key, return the last part of the key as fallback
      return nestedKeys[nestedKeys.length - 1];
    }
    current = current[nestedKey] as any;
  }
  
  const finalKey = nestedKeys[nestedKeys.length - 1];
  const translation = current[finalKey];
  
  if (!translation) {
    return finalKey;
  }
  
  return translation[language] || finalKey;
}