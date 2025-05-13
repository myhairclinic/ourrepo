import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Additional translations for package filters and features
export const packageTranslations: Record<string, Record<Language, string>> = {
  // Page Sections
  "packages.pageTitle": {
    [Language.Turkish]: "MyHair Clinic Özel Tedavi ve Seyahat Paketleri",
    [Language.English]: "MyHair Clinic Premium Treatment and Travel Packages",
    [Language.Russian]: "Премиум Пакеты Лечения и Путешествий в MyHair Clinic",
    [Language.Georgian]: "MyHair Clinic-ის პრემიუმ მკურნალობისა და მოგზაურობის პაკეტები"
  },
  "packages.pageDescription": {
    [Language.Turkish]: "Tüm ülkelerden misafirlerimiz için özenle hazırlanmış lüks seyahat ve profesyonel saç ekimi paketleri",
    [Language.English]: "Luxury travel and professional hair transplantation packages meticulously prepared for our guests from all countries",
    [Language.Russian]: "Роскошные пакеты путешествий и профессиональной трансплантации волос, тщательно подготовленные для наших гостей из всех стран",
    [Language.Georgian]: "ლუქსი მოგზაურობისა და პროფესიონალური თმის გადანერგვის პაკეტები, გულმოდგინედ მომზადებული ჩვენი სტუმრებისთვის ყველა ქვეყნიდან"
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
  "countries.unknown": {
    [Language.Turkish]: "Bilinmeyen",
    [Language.English]: "Unknown",
    [Language.Russian]: "Неизвестно",
    [Language.Georgian]: "უცნობი"
  },
  "countries.TR": {
    [Language.Turkish]: "Türkiye",
    [Language.English]: "Turkey",
    [Language.Russian]: "Турция",
    [Language.Georgian]: "თურქეთი"
  },
  "countries.RU": {
    [Language.Turkish]: "Rusya",
    [Language.English]: "Russia",
    [Language.Russian]: "Россия",
    [Language.Georgian]: "რუსეთი"
  },
  "countries.AZ": {
    [Language.Turkish]: "Azerbaycan",
    [Language.English]: "Azerbaijan",
    [Language.Russian]: "Азербайджан",
    [Language.Georgian]: "აზერბაიჯანი"
  },
  "countries.KZ": {
    [Language.Turkish]: "Kazakistan",
    [Language.English]: "Kazakhstan",
    [Language.Russian]: "Казахстан",
    [Language.Georgian]: "ყაზახეთი"
  },
  "countries.UA": {
    [Language.Turkish]: "Ukrayna",
    [Language.English]: "Ukraine",
    [Language.Russian]: "Украина",
    [Language.Georgian]: "უკრაინა"
  },
  "countries.IR": {
    [Language.Turkish]: "İran",
    [Language.English]: "Iran",
    [Language.Russian]: "Иран",
    [Language.Georgian]: "ირანი"
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
  
  // DetailPage Tab Translations
  "packages.overview": {
    [Language.Turkish]: "Genel Bakış",
    [Language.English]: "Overview",
    [Language.Russian]: "Обзор",
    [Language.Georgian]: "მიმოხილვა"
  },
  "packages.details": {
    [Language.Turkish]: "Detaylar",
    [Language.English]: "Details",
    [Language.Russian]: "Детали",
    [Language.Georgian]: "დეტალები"
  },
  "packages.gallery": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "packages.exclusive": {
    [Language.Turkish]: "Özel Fırsat",
    [Language.English]: "Exclusive Offer",
    [Language.Russian]: "Эксклюзивное предложение",
    [Language.Georgian]: "ექსკლუზიური შეთავაზება"
  },
  "packages.limitedTimeOffer": {
    [Language.Turkish]: "Sınırlı Süre Teklifi",
    [Language.English]: "Limited Time Offer",
    [Language.Russian]: "Предложение ограничено по времени",
    [Language.Georgian]: "შეზღუდული დროის შეთავაზება"
  },
  "packages.whyChoose": {
    [Language.Turkish]: "Neden Seçmelisiniz",
    [Language.English]: "Why Choose",
    [Language.Russian]: "Почему выбрать",
    [Language.Georgian]: "რატომ აირჩიოთ"
  },
  "packages.personalizedCare": {
    [Language.Turkish]: "Kişiselleştirilmiş Bakım",
    [Language.English]: "Personalized Care",
    [Language.Russian]: "Персонализированный уход",
    [Language.Georgian]: "პერსონალიზებული ზრუნვა"
  },
  "packages.personalizedCareDesc": {
    [Language.Turkish]: "Bireysel ihtiyaçlarınıza göre özel olarak tasarlanmış saç ekimi tedavisi.",
    [Language.English]: "Hair transplantation treatment specially designed according to your individual needs.",
    [Language.Russian]: "Лечение по трансплантации волос, специально разработанное в соответствии с вашими индивидуальными потребностями.",
    [Language.Georgian]: "თმის გადანერგვის მკურნალობა, სპეციალურად შექმნილია თქვენი ინდივიდუალური საჭიროებების შესაბამისად."
  },
  "packages.internationalSupport": {
    [Language.Turkish]: "Uluslararası Destek",
    [Language.English]: "International Support",
    [Language.Russian]: "Международная поддержка",
    [Language.Georgian]: "საერთაშორისო მხარდაჭერა"
  },
  "packages.internationalSupportDesc": {
    [Language.Turkish]: "Çok dilli ekibimiz tüm seyahatiniz boyunca size destek olacaktır.",
    [Language.English]: "Our multilingual team will support you throughout your entire journey.",
    [Language.Russian]: "Наша многоязычная команда будет поддерживать вас на протяжении всего путешествия.",
    [Language.Georgian]: "ჩვენი მრავალენოვანი გუნდი მხარს დაგიჭერთ მთელი თქვენი მოგზაურობის განმავლობაში."
  },
  "packages.comfortableExperience": {
    [Language.Turkish]: "Konforlu Deneyim",
    [Language.English]: "Comfortable Experience",
    [Language.Russian]: "Комфортный опыт",
    [Language.Georgian]: "კომფორტული გამოცდილება"
  },
  "packages.comfortableExperienceDesc": {
    [Language.Turkish]: "Lüks konaklama ve özel ulaşım hizmetleri ile stressiz bir saç ekimi deneyimi.",
    [Language.English]: "A stress-free hair transplant experience with luxury accommodation and private transportation services.",
    [Language.Russian]: "Безстрессовый опыт трансплантации волос с роскошным проживанием и услугами частного транспорта.",
    [Language.Georgian]: "სტრესის გარეშე თმის გადანერგვის გამოცდილება ლუქსუსური საცხოვრებლითა და კერძო ტრანსპორტირების სერვისებით."
  },
  "packages.readyToBook": {
    [Language.Turkish]: "Rezervasyon İçin Hazır",
    [Language.English]: "Ready to Book",
    [Language.Russian]: "Готовы забронировать",
    [Language.Georgian]: "მზად დასაჯავშნად"
  },
  "packages.contactUsNow": {
    [Language.Turkish]: "Şimdi Bize Ulaşın",
    [Language.English]: "Contact Us Now",
    [Language.Russian]: "Свяжитесь с нами сейчас",
    [Language.Georgian]: "დაგვიკავშირდით ახლავე"
  },
  "packages.contactNow": {
    [Language.Turkish]: "Hemen İletişime Geçin",
    [Language.English]: "Contact Now",
    [Language.Russian]: "Связаться сейчас",
    [Language.Georgian]: "დაკავშირება ახლავე"
  },
  "packages.completePackage": {
    [Language.Turkish]: "Eksiksiz Paket",
    [Language.English]: "Complete Package",
    [Language.Russian]: "Полный пакет",
    [Language.Georgian]: "სრული პაკეტი"
  },
  "packages.experienceDesc": {
    [Language.Turkish]: "Saç ekimi tedavinizi lüks bir seyahat deneyimiyle birleştiren özel olarak tasarlanmış paketimiz.",
    [Language.English]: "Our specially designed package that combines your hair transplant treatment with a luxury travel experience.",
    [Language.Russian]: "Наш специально разработанный пакет, который сочетает лечение по трансплантации волос с роскошным путешествием.",
    [Language.Georgian]: "ჩვენი სპეციალურად შექმნილი პაკეტი, რომელიც აერთიანებს თქვენს თმის გადანერგვის მკურნალობას ლუქსუსი მოგზაურობის გამოცდილებასთან."
  },
  "packages.centralLocation": {
    [Language.Turkish]: "Merkezi Konum",
    [Language.English]: "Central Location",
    [Language.Russian]: "Центральное местоположение",
    [Language.Georgian]: "ცენტრალური ადგილმდებარეობა"
  },
  "packages.freeWifi": {
    [Language.Turkish]: "Ücretsiz Wi-Fi",
    [Language.English]: "Free Wi-Fi",
    [Language.Russian]: "Бесплатный Wi-Fi",
    [Language.Georgian]: "უფასო Wi-Fi"
  },
  "packages.breakfast": {
    [Language.Turkish]: "Kahvaltı Dahil",
    [Language.English]: "Breakfast Included",
    [Language.Russian]: "Завтрак включен",
    [Language.Georgian]: "საუზმე შედის"
  },
  "packages.conciergeService": {
    [Language.Turkish]: "Concierge Hizmeti",
    [Language.English]: "Concierge Service",
    [Language.Russian]: "Услуги консьержа",
    [Language.Georgian]: "კონსიერჟის სერვისი"
  },
  "packages.transportation": {
    [Language.Turkish]: "Ulaşım",
    [Language.English]: "Transportation",
    [Language.Russian]: "Транспорт",
    [Language.Georgian]: "ტრანსპორტირება"
  },
  "packages.airportTransfer": {
    [Language.Turkish]: "Havalimanı Transferi",
    [Language.English]: "Airport Transfer",
    [Language.Russian]: "Трансфер из аэропорта",
    [Language.Georgian]: "აეროპორტის ტრანსფერი"
  },
  "packages.clinicTransfer": {
    [Language.Turkish]: "Klinik Transferi",
    [Language.English]: "Clinic Transfer",
    [Language.Russian]: "Трансфер в клинику",
    [Language.Georgian]: "კლინიკის ტრანსფერი"
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
    [Language.Russian]: "Досуг",
    [Language.Georgian]: "დასვენების აქტივობები"
  },
  "packages.cityTours": {
    [Language.Turkish]: "Şehir Turları",
    [Language.English]: "City Tours",
    [Language.Russian]: "Городские туры",
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
    [Language.Turkish]: "Varış Günü",
    [Language.English]: "Arrival Day",
    [Language.Russian]: "День прибытия",
    [Language.Georgian]: "ჩამოსვლის დღე"
  },
  "packages.arrivalDayDesc": {
    [Language.Turkish]: "Havalimanında VIP karşılama, otele transfer ve yerleşme.",
    [Language.English]: "VIP welcome at the airport, transfer to hotel and check-in.",
    [Language.Russian]: "VIP-встреча в аэропорту, трансфер в отель и заселение.",
    [Language.Georgian]: "VIP მიღება აეროპორტში, ტრანსფერი სასტუმროში და შესვლა."
  },
  "packages.consultationDay": {
    [Language.Turkish]: "Konsültasyon Günü",
    [Language.English]: "Consultation Day",
    [Language.Russian]: "День консультации",
    [Language.Georgian]: "კონსულტაციის დღე"
  },
  "packages.consultationDayDesc": {
    [Language.Turkish]: "Klinik ziyareti, saç analizi ve tedavi planının hazırlanması.",
    [Language.English]: "Clinic visit, hair analysis and preparation of treatment plan.",
    [Language.Russian]: "Посещение клиники, анализ волос и подготовка плана лечения.",
    [Language.Georgian]: "კლინიკის ვიზიტი, თმის ანალიზი და მკურნალობის გეგმის მომზადება."
  },
  "packages.procedureDay": {
    [Language.Turkish]: "İşlem Günü",
    [Language.English]: "Procedure Day",
    [Language.Russian]: "День процедуры",
    [Language.Georgian]: "პროცედურის დღე"
  },
  "packages.procedureDayDesc": {
    [Language.Turkish]: "Saç ekimi işlemi ve sonrasında otelinize konforlu transfer.",
    [Language.English]: "Hair transplantation procedure and comfortable transfer to your hotel afterwards.",
    [Language.Russian]: "Процедура трансплантации волос и комфортный трансфер в ваш отель после этого.",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა და კომფორტული ტრანსფერი თქვენს სასტუმროში შემდგომში."
  },
  "packages.departureDay": {
    [Language.Turkish]: "Dönüş Günü",
    [Language.English]: "Departure Day",
    [Language.Russian]: "День отъезда",
    [Language.Georgian]: "გამგზავრების დღე"
  },
  "packages.departureDayDesc": {
    [Language.Turkish]: "Son kontrol, bakım talimatları ve havalimanına transfer.",
    [Language.English]: "Final check, care instructions and transfer to the airport.",
    [Language.Russian]: "Финальная проверка, инструкции по уходу и трансфер в аэропорт.",
    [Language.Georgian]: "საბოლოო შემოწმება, მოვლის ინსტრუქციები და ტრანსფერი აეროპორტში."
  },
  "packages.visualExperience": {
    [Language.Turkish]: "Görsel Deneyim",
    [Language.English]: "Visual Experience",
    [Language.Russian]: "Визуальный опыт",
    [Language.Georgian]: "ვიზუალური გამოცდილება"
  },
  "packages.visualExperienceDesc": {
    [Language.Turkish]: "Paketimize dahil olan lüks konaklama, klinik prosedürler ve turistik yerlerden görüntüler.",
    [Language.English]: "Images of luxury accommodation, clinic procedures and tourist attractions included in our package.",
    [Language.Russian]: "Изображения роскошного проживания, клинических процедур и туристических достопримечательностей, включенных в наш пакет.",
    [Language.Georgian]: "ლუქსუსური საცხოვრებლის, კლინიკური პროცედურებისა და ტურისტული ღირსშესანიშნაობების გამოსახულებები, რომლებიც შედის ჩვენს პაკეტში."
  },
  "packages.clinicProcedure": {
    [Language.Turkish]: "Klinik Prosedür",
    [Language.English]: "Clinic Procedure",
    [Language.Russian]: "Клиническая процедура",
    [Language.Georgian]: "კლინიკური პროცედურა"
  },
  "packages.clickToExpand": {
    [Language.Turkish]: "Genişletmek için tıklayın",
    [Language.English]: "Click to expand",
    [Language.Russian]: "Нажмите, чтобы расширить",
    [Language.Georgian]: "დააჭირეთ გასაფართოებლად"
  },
  "packages.comingSoon": {
    [Language.Turkish]: "Yakında Eklenecek",
    [Language.English]: "Coming Soon",
    [Language.Russian]: "Скоро будет доступно",
    [Language.Georgian]: "მალე დაემატება"
  },
  "packages.noGalleryImages": {
    [Language.Turkish]: "Bu paket için henüz galeri görüntüleri bulunmamaktadır.",
    [Language.English]: "Gallery images for this package are not available yet.",
    [Language.Russian]: "Изображения галереи для этого пакета пока недоступны.",
    [Language.Georgian]: "ამ პაკეტისთვის გალერეის სურათები ჯერ არ არის ხელმისაწვდომი."
  },
  "packages.virtualTour": {
    [Language.Turkish]: "Sanal Tur",
    [Language.English]: "Virtual Tour",
    [Language.Russian]: "Виртуальный тур",
    [Language.Georgian]: "ვირტუალური ტური"
  },
  "packages.virtualTourDesc": {
    [Language.Turkish]: "Kliniğimizi ve konaklama tesislerimizi 360° sanal turumuzla keşfedin.",
    [Language.English]: "Explore our clinic and accommodation facilities with our 360° virtual tour.",
    [Language.Russian]: "Исследуйте нашу клинику и места проживания с помощью нашего 360° виртуального тура.",
    [Language.Georgian]: "მოინახულეთ ჩვენი კლინიკა და საცხოვრებელი ობიექტები ჩვენი 360° ვირტუალური ტურით."
  },
  "packages.startVirtualTour": {
    [Language.Turkish]: "Sanal Turu Başlat",
    [Language.English]: "Start Virtual Tour",
    [Language.Russian]: "Начать виртуальный тур",
    [Language.Georgian]: "ვირტუალური ტურის დაწყება"
  },
  "packages.travelMedical": {
    [Language.Turkish]: "Seyahat & Tıbbi",
    [Language.English]: "Travel & Medical",
    [Language.Russian]: "Путешествие и медицина",
    [Language.Georgian]: "მოგზაურობა და სამედიცინო"
  },
  "packages.packageDetails": {
    [Language.Turkish]: "Paket Detayları",
    [Language.English]: "Package Details",
    [Language.Russian]: "Детали пакета",
    [Language.Georgian]: "პაკეტის დეტალები"
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
    [Language.Turkish]: "Bireysel",
    [Language.English]: "Individual",
    [Language.Russian]: "Индивидуальный",
    [Language.Georgian]: "ინდივიდუალური"
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
    [Language.Turkish]: "Tercüme Hizmetleri",
    [Language.English]: "Translation Services",
    [Language.Russian]: "Услуги перевода",
    [Language.Georgian]: "თარგმნის სერვისები"
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
    [Language.Turkish]: "Uzman ekibimiz, lüks konaklama ve özenli planlanmış seyahat deneyimiyle tam memnuniyet sağlıyoruz.",
    [Language.English]: "We ensure complete satisfaction with our expert team, luxury accommodation and carefully planned travel experience.",
    [Language.Russian]: "Мы гарантируем полное удовлетворение благодаря нашей команде экспертов, роскошному проживанию и тщательно спланированному путешествию.",
    [Language.Georgian]: "ჩვენ უზრუნველვყოფთ სრულ კმაყოფილებას ჩვენი ექსპერტთა გუნდით, ლუქსუსი საცხოვრებლით და გულდასმით დაგეგმილი სამოგზაურო გამოცდილებით."
  },
  "packages.requestInfo": {
    [Language.Turkish]: "Bilgi İsteyin",
    [Language.English]: "Request Information",
    [Language.Russian]: "Запросить информацию",
    [Language.Georgian]: "ინფორმაციის მოთხოვნა"
  },
  "packages.noCommitment": {
    [Language.Turkish]: "Taahhüt yok, sadece bilgi edinme amaçlı",
    [Language.English]: "No commitment, just for information purposes",
    [Language.Russian]: "Без обязательств, только для информационных целей",
    [Language.Georgian]: "ვალდებულების გარეშე, მხოლოდ საინფორმაციო მიზნებისთვის"
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
  "packages.personalCare": {
    [Language.Turkish]: "Kişisel Bakım",
    [Language.English]: "Personal Care",
    [Language.Russian]: "Личный уход",
    [Language.Georgian]: "პირადი მოვლა"
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
  },
  
  "packages.packagesTitle": {
    [Language.Turkish]: "Paketleri",
    [Language.English]: "Packages",
    [Language.Russian]: "Пакеты",
    [Language.Georgian]: "პაკეტები",
  },
  
  "packages.showAll": {
    [Language.Turkish]: "Tüm paketleri göster",
    [Language.English]: "Show all packages",
    [Language.Russian]: "Показать все пакеты",
    [Language.Georgian]: "ყველა პაკეტის ჩვენება",
  },
};

// Get translation function for package translations
export function getPackageTranslation(key: string, language: Language): string {
  // Try accessing directly first
  const translation = packageTranslations[key];
  
  if (translation) {
    return translation[language] || key.split('.').pop() || key;
  }
  
  // If key is not found with direct access, log and return fallback
  console.log(`Translation key not found: ${key}`);
  return key.split('.').pop() || key;
}