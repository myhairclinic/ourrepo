import { Language } from "@shared/types";

// A simple, non-nested translation record with full language support
type LanguageMap = {
  [Language.Turkish]: string;
  [Language.English]: string;
  [Language.Russian]: string;
  [Language.Georgian]: string;
};

// Function to get a translation with support for both direct language objects and string keys
export function getTranslation(
  keyOrObj: string | Record<Language, string>,
  language: Language,
  replacements?: Record<string, string | number>
): string {
  // Handle direct language objects
  if (typeof keyOrObj !== 'string') {
    const value = keyOrObj[language];
    return applyReplacements(value || '', replacements);
  }
  
  // Handle string keys
  const key = keyOrObj;
  const translationObj = translations[key];
  
  if (!translationObj) {
    console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
    return key; // Return the key as fallback
  }
  
  const value = translationObj[language];
  return applyReplacements(value || '', replacements);
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

// Our translations object with simple key structure
// Translations object (exported for direct usage in components)
export const translations: Record<string, LanguageMap> = {
  // ===========================================================================
  // HOME PAGE TRANSLATIONS
  // ===========================================================================
  
  // Home page SEO
  "home.title": {
    [Language.Turkish]: "Tiflis Saç Ekimi ve Estetik Merkezi | MyHair Clinic",
    [Language.English]: "Tbilisi Hair Transplant and Aesthetic Center | MyHair Clinic",
    [Language.Russian]: "Тбилисский центр трансплантации волос и эстетики | MyHair Clinic",
    [Language.Georgian]: "თბილისის თმის გადანერგვის და ესთეტიკური ცენტრი | MyHair Clinic"
  },
  "home.description": {
    [Language.Turkish]: "MyHair Clinic, Tiflis'te lider saç ekimi ve estetik merkezi. FUE ve DHI teknikleri kullanarak doğal görünümlü saç ekimi, sakal ekimi ve kaş ekimi hizmetleri sunuyoruz.",
    [Language.English]: "MyHair Clinic, leading hair transplant and aesthetic center in Tbilisi. We offer natural-looking hair, beard, and eyebrow transplantation services using FUE and DHI techniques.",
    [Language.Russian]: "MyHair Clinic, ведущий центр трансплантации волос и эстетики в Тбилиси. Мы предлагаем естественно выглядящие услуги по трансплантации волос, бороды и бровей с использованием методов FUE и DHI.",
    [Language.Georgian]: "MyHair Clinic, თმის გადანერგვისა და ესთეტიკის წამყვანი ცენტრი თბილისში. ჩვენ გთავაზობთ ბუნებრივი გარეგნობის თმის, წვერის და წარბების გადანერგვის სერვისებს FUE და DHI ტექნიკების გამოყენებით."
  },
  
  // Clinic Location Info
  "home.location.weekdaysLabel": {
    [Language.Turkish]: "Hafta içi",
    [Language.English]: "Weekdays",
    [Language.Russian]: "Будние дни",
    [Language.Georgian]: "სამუშაო დღეები"
  },
  "home.location.saturdayLabel": {
    [Language.Turkish]: "Cumartesi",
    [Language.English]: "Saturday",
    [Language.Russian]: "Суббота",
    [Language.Georgian]: "შაბათი"
  },
  "home.location.sundayLabel": {
    [Language.Turkish]: "Pazar",
    [Language.English]: "Sunday",
    [Language.Russian]: "Воскресенье",
    [Language.Georgian]: "კვირა"
  },
  "home.location.closed": {
    [Language.Turkish]: "Kapalı",
    [Language.English]: "Closed",
    [Language.Russian]: "Закрыто",
    [Language.Georgian]: "დახურულია"
  },
  
  // Home - Patient Journey
  "home.patientJourney.title": {
    [Language.Turkish]: "Hasta Yolculuğu",
    [Language.English]: "Patient Journey",
    [Language.Russian]: "Путь Пациента",
    [Language.Georgian]: "პაციენტის მოგზაურობა"
  },
  "home.patientJourney.subtitle": {
    [Language.Turkish]: "MyHair Clinic'te saç ekimi süreciniz nasıl ilerleyecek?",
    [Language.English]: "How will your hair transplant process progress at MyHair Clinic?",
    [Language.Russian]: "Как будет проходить процесс трансплантации волос в MyHair Clinic?",
    [Language.Georgian]: "როგორ წარიმართება თქვენი თმის გადანერგვის პროცესი MyHair Clinic-ში?"
  },
  "home.patientJourney.satisfaction": {
    [Language.Turkish]: "99% Hasta Memnuniyeti",
    [Language.English]: "99% Patient Satisfaction",
    [Language.Russian]: "99% Удовлетворенность Пациентов",
    [Language.Georgian]: "99% პაციენტთა კმაყოფილება"
  },
  "home.patientJourney.cta.description": {
    [Language.Turkish]: "Saç ekimi yolculuğunuza ilk adımı atmak ve ücretsiz olarak değerlendirme almak için hemen bize ulaşın. Uzmanlarımız sizinle ilgilenecektir.",
    [Language.English]: "Contact us today to take the first step in your hair transplant journey and get a free evaluation. Our experts will take care of you.",
    [Language.Russian]: "Свяжитесь с нами сегодня, чтобы сделать первый шаг в своем пути к трансплантации волос и получить бесплатную оценку. Наши эксперты позаботятся о вас.",
    [Language.Georgian]: "დაგვიკავშირდით დღესვე, რათა გადადგათ პირველი ნაბიჯი თქვენს თმის გადანერგვის გზაზე და მიიღოთ უფასო შეფასება. ჩვენი ექსპერტები იზრუნებენ თქვენზე."
  },
  "home.patientJourney.cta.button": {
    [Language.Turkish]: "Ücretsiz Danışma Randevusu Alın",
    [Language.English]: "Get Free Consultation Appointment",
    [Language.Russian]: "Получить Бесплатную Консультацию",
    [Language.Georgian]: "მიიღეთ უფასო კონსულტაციის შეხვედრა"
  },
  "home.patientJourney.steps.consultation.title": {
    [Language.Turkish]: "İlk Konsültasyon",
    [Language.English]: "Initial Consultation",
    [Language.Russian]: "Первичная Консультация",
    [Language.Georgian]: "საწყისი კონსულტაცია"
  },
  "home.patientJourney.steps.consultation.description": {
    [Language.Turkish]: "Online görüşme ile saç kaybınızın değerlendirilmesi ve kişisel tedavi planı oluşturulması.",
    [Language.English]: "Evaluation of your hair loss and creation of personalized treatment plan through online meeting.",
    [Language.Russian]: "Оценка выпадения волос и создание индивидуального плана лечения через онлайн-встречу.",
    [Language.Georgian]: "თქვენი თმის ცვენის შეფასება და პერსონალიზებული მკურნალობის გეგმის შექმნა ონლაინ შეხვედრის მეშვეობით."
  },
  "home.patientJourney.steps.scheduling.title": {
    [Language.Turkish]: "Randevu Planlaması",
    [Language.English]: "Appointment Scheduling",
    [Language.Russian]: "Планирование Встречи",
    [Language.Georgian]: "შეხვედრის დაგეგმვა"
  },
  "home.patientJourney.steps.scheduling.description": {
    [Language.Turkish]: "Size en uygun tarihin belirlenmesi ve operasyon için randevunun oluşturulması.",
    [Language.English]: "Determining the most suitable date for you and creating an appointment for the operation.",
    [Language.Russian]: "Определение наиболее подходящей для вас даты и создание встречи для операции.",
    [Language.Georgian]: "თქვენთვის ყველაზე შესაფერისი თარიღის განსაზღვრა და ოპერაციისთვის შეხვედრის შექმნა."
  },
  "home.patientJourney.steps.travel.title": {
    [Language.Turkish]: "Tiflis'e Seyahat",
    [Language.English]: "Travel to Tbilisi",
    [Language.Russian]: "Поездка в Тбилиси",
    [Language.Georgian]: "მოგზაურობა თბილისში"
  },
  "home.patientJourney.steps.travel.description": {
    [Language.Turkish]: "Gürcistan'a varışınızda, havalimanından kliniğe veya otelinize özel transfer hizmeti.",
    [Language.English]: "Upon your arrival in Georgia, private transfer service from the airport to the clinic or your hotel.",
    [Language.Russian]: "По прибытии в Грузию, частный трансфер из аэропорта в клинику или ваш отель.",
    [Language.Georgian]: "საქართველოში ჩამოსვლისას, კერძო ტრანსფერის სერვისი აეროპორტიდან კლინიკაში ან თქვენს სასტუმროში."
  },
  "home.patientJourney.steps.preOp.title": {
    [Language.Turkish]: "Operasyon Öncesi Değerlendirme",
    [Language.English]: "Pre-Operation Assessment",
    [Language.Russian]: "Предоперационная Оценка",
    [Language.Georgian]: "ოპერაციისწინა შეფასება"
  },
  "home.patientJourney.steps.preOp.description": {
    [Language.Turkish]: "Yüz yüze konsültasyon, saç çizgisi tasarımı ve operasyon öncesi son hazırlıklar.",
    [Language.English]: "Face-to-face consultation, hairline design, and final preparations before the operation.",
    [Language.Russian]: "Очная консультация, дизайн линии роста волос и окончательная подготовка перед операцией.",
    [Language.Georgian]: "პირადი კონსულტაცია, თმის ხაზის დიზაინი და საბოლოო მომზადება ოპერაციის წინ."
  },
  "home.patientJourney.steps.procedure.title": {
    [Language.Turkish]: "Saç Ekimi İşlemi",
    [Language.English]: "Hair Transplant Procedure",
    [Language.Russian]: "Процедура Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა"
  },
  "home.patientJourney.steps.procedure.description": {
    [Language.Turkish]: "Konforlu bir ortamda DHI veya FUE yöntemiyle saç ekimi operasyonunun gerçekleştirilmesi.",
    [Language.English]: "Performing the hair transplant operation using DHI or FUE method in a comfortable environment.",
    [Language.Russian]: "Проведение операции по трансплантации волос методом DHI или FUE в комфортной обстановке.",
    [Language.Georgian]: "თმის გადანერგვის ოპერაციის ჩატარება DHI ან FUE მეთოდით კომფორტულ გარემოში."
  },
  "home.patientJourney.steps.postOp.title": {
    [Language.Turkish]: "Operasyon Sonrası Bakım",
    [Language.English]: "Post-Operation Care",
    [Language.Russian]: "Послеоперационный Уход",
    [Language.Georgian]: "ოპერაციის შემდგომი მოვლა"
  },
  "home.patientJourney.steps.postOp.description": {
    [Language.Turkish]: "İlk gün sonrası kontrolü ve detaylı bakım talimatlarının verilmesi.",
    [Language.English]: "First day follow-up check and provision of detailed care instructions.",
    [Language.Russian]: "Проверка на следующий день и предоставление подробных инструкций по уходу.",
    [Language.Georgian]: "პირველი დღის შემდეგ შემოწმება და დეტალური მოვლის ინსტრუქციების მიწოდება."
  },
  "home.patientJourney.steps.tourism.title": {
    [Language.Turkish]: "Tiflis'i Keşfedin",
    [Language.English]: "Explore Tbilisi",
    [Language.Russian]: "Исследуйте Тбилиси",
    [Language.Georgian]: "აღმოაჩინეთ თბილისი"
  },
  "home.patientJourney.steps.tourism.description": {
    [Language.Turkish]: "İyileşme sürecinde Tiflis'in güzelliklerini keşfetme fırsatı ve şehir turu.",
    [Language.English]: "Opportunity to discover the beauties of Tbilisi and city tour during the recovery process.",
    [Language.Russian]: "Возможность открыть для себя красоты Тбилиси и совершить экскурсию по городу во время процесса восстановления.",
    [Language.Georgian]: "თბილისის სილამაზის აღმოჩენის და ქალაქის ტურის შესაძლებლობა აღდგენის პროცესში."
  },
  "home.patientJourney.steps.followUp.title": {
    [Language.Turkish]: "Uzun Dönem Takip",
    [Language.English]: "Long-Term Follow-up",
    [Language.Russian]: "Долгосрочное Наблюдение",
    [Language.Georgian]: "გრძელვადიანი მეთვალყურეობა"
  },
  "home.patientJourney.steps.followUp.description": {
    [Language.Turkish]: "Ülkenize döndükten sonra düzenli online kontroller ve süreç takibi.",
    [Language.English]: "Regular online check-ups and process monitoring after returning to your country.",
    [Language.Russian]: "Регулярные онлайн-проверки и мониторинг процесса после возвращения в вашу страну.",
    [Language.Georgian]: "რეგულარული ონლაინ შემოწმებები და პროცესის მონიტორინგი თქვენს ქვეყანაში დაბრუნების შემდეგ."
  },
  
  // Home - Expert Section 
  "home.expertSection.title": {
    [Language.Turkish]: "Saç Ekimi Uzmanları",
    [Language.English]: "Hair Transplant Experts",
    [Language.Russian]: "Эксперты по Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის ექსპერტები"
  },
  "home.expertSection.subtitle": {
    [Language.Turkish]: "MyHair Clinic'in deneyimli ve uzman kadrosuyla tanışın",
    [Language.English]: "Meet the experienced and expert team of MyHair Clinic",
    [Language.Russian]: "Познакомьтесь с опытной и экспертной командой MyHair Clinic",
    [Language.Georgian]: "გაიცანით MyHair Clinic-ის გამოცდილი და ექსპერტი გუნდი"
  },
  "home.expertSection.consultationCta": {
    [Language.Turkish]: "Ücretsiz Konsültasyon Alın",
    [Language.English]: "Get Free Consultation",
    [Language.Russian]: "Получить Бесплатную Консультацию",
    [Language.Georgian]: "მიიღეთ უფასო კონსულტაცია"
  },
  "home.expertSection.quote": {
    [Language.Turkish]: "MyHair Clinic'te her hasta için kişiselleştirilmiş yaklaşım sunuyoruz. Amacımız sadece saç ekimi yapmak değil, hastalarımızın özgüvenlerini yeniden kazanmalarına yardımcı olmaktır.",
    [Language.English]: "At MyHair Clinic, we offer a personalized approach for each patient. Our goal is not just to perform hair transplants, but to help our patients regain their self-confidence.",
    [Language.Russian]: "В MyHair Clinic мы предлагаем индивидуальный подход к каждому пациенту. Наша цель не просто выполнить трансплантацию волос, а помочь нашим пациентам вернуть уверенность в себе.",
    [Language.Georgian]: "MyHair Clinic-ში ჩვენ გთავაზობთ პერსონალიზებულ მიდგომას თითოეული პაციენტისთვის. ჩვენი მიზანია არა მხოლოდ თმის გადანერგვის განხორციელება, არამედ ჩვენი პაციენტების თვითრწმენის დაბრუნებაში დახმარება."
  },
  "home.expertSection.stats.years": {
    [Language.Turkish]: "Yıllık Deneyim",
    [Language.English]: "Years Experience",
    [Language.Russian]: "Лет Опыта",
    [Language.Georgian]: "წლიანი გამოცდილება"
  },
  "home.expertSection.stats.procedures": {
    [Language.Turkish]: "Başarılı İşlem",
    [Language.English]: "Successful Procedures",
    [Language.Russian]: "Успешных Процедур",
    [Language.Georgian]: "წარმატებული პროცედურები"
  },
  "home.expertSection.stats.satisfaction": {
    [Language.Turkish]: "Hasta Memnuniyeti",
    [Language.English]: "Patient Satisfaction",
    [Language.Russian]: "Удовлетворенность Пациентов",
    [Language.Georgian]: "პაციენტთა კმაყოფილება"
  },
  "home.expertSection.stats.rating": {
    [Language.Turkish]: "Uzman Değerlendirmesi",
    [Language.English]: "Expert Rating",
    [Language.Russian]: "Рейтинг Экспертов",
    [Language.Georgian]: "ექსპერტთა შეფასება"
  },
  "home.expertSection.features.technique.title": {
    [Language.Turkish]: "İleri DHI ve FUE Teknikleri",
    [Language.English]: "Advanced DHI and FUE Techniques",
    [Language.Russian]: "Продвинутые Техники DHI и FUE",
    [Language.Georgian]: "მოწინავე DHI და FUE ტექნიკები"
  },
  "home.expertSection.features.technique.description": {
    [Language.Turkish]: "Doğal görünümlü sonuçlar için son teknoloji yöntemler kullanıyoruz.",
    [Language.English]: "We use state-of-the-art methods for natural-looking results.",
    [Language.Russian]: "Мы используем новейшие методы для естественно выглядящих результатов.",
    [Language.Georgian]: "ჩვენ ვიყენებთ უახლეს მეთოდებს ბუნებრივი გარეგნობის შედეგებისთვის."
  },
  "home.expertSection.features.painless.title": {
    [Language.Turkish]: "Ağrısız Prosedür",
    [Language.English]: "Painless Procedure",
    [Language.Russian]: "Безболезненная Процедура",
    [Language.Georgian]: "უმტკივნეულო პროცედურა"
  },
  "home.expertSection.features.painless.description": {
    [Language.Turkish]: "Konforlu ve minimum rahatsızlık sağlayan özel anestezi protokolü.",
    [Language.English]: "Special anesthesia protocol that ensures comfort and minimal discomfort.",
    [Language.Russian]: "Специальный протокол анестезии, обеспечивающий комфорт и минимальный дискомфорт.",
    [Language.Georgian]: "სპეციალური ანესთეზიის პროტოკოლი, რომელიც უზრუნველყოფს კომფორტს და მინიმალურ დისკომფორტს."
  },
  "home.expertSection.features.natural.title": {
    [Language.Turkish]: "Doğal Saç Çizgisi Tasarımı",
    [Language.English]: "Natural Hairline Design",
    [Language.Russian]: "Дизайн Естественной Линии Волос",
    [Language.Georgian]: "ბუნებრივი თმის ხაზის დიზაინი"
  },
  "home.expertSection.features.natural.description": {
    [Language.Turkish]: "Yüz şeklinize ve yaşınıza uygun kişiselleştirilmiş ve doğal görünümlü tasarım.",
    [Language.English]: "Personalized and natural-looking design tailored to your face shape and age.",
    [Language.Russian]: "Индивидуальный и естественно выглядящий дизайн, адаптированный к форме вашего лица и возрасту.",
    [Language.Georgian]: "პერსონალიზებული და ბუნებრივი გარეგნობის დიზაინი, რომელიც მორგებულია თქვენი სახის ფორმასა და ასაკზე."
  },
  
  // ===========================================================================
  // SERVICES SECTION
  // ===========================================================================
  
  "services.needHelp": {
    [Language.Turkish]: "Yardıma mı İhtiyacınız Var?",
    [Language.English]: "Need Help?",
    [Language.Russian]: "Нужна помощь?",
    [Language.Georgian]: "გჭირდებათ დახმარება?"
  },
  "services.contactForQuestions": {
    [Language.Turkish]: "Saç ekimi hakkında herhangi bir sorunuz varsa veya randevu almak istiyorsanız bizimle iletişime geçin.",
    [Language.English]: "If you have any questions about hair transplantation or would like to make an appointment, please contact us.",
    [Language.Russian]: "Если у вас есть вопросы о трансплантации волос или вы хотите записаться на прием, пожалуйста, свяжитесь с нами.",
    [Language.Georgian]: "თუ გაქვთ რაიმე შეკითხვა თმის გადანერგვის შესახებ ან გსურთ შეხვედრის დანიშვნა, გთხოვთ დაგვიკავშირდეთ."
  },
  "services.badge": {
    [Language.Turkish]: "HİZMETLER",
    [Language.English]: "SERVICES",
    [Language.Russian]: "УСЛУГИ",
    [Language.Georgian]: "სერვისები"
  },
  "common.services": {
    [Language.Turkish]: "Hizmetlerimiz",
    [Language.English]: "Our Services",
    [Language.Russian]: "Наши Услуги",
    [Language.Georgian]: "ჩვენი სერვისები"
  },
  "services.subtitle": {
    [Language.Turkish]: "Saç restorasyon ve güzellik hizmetleri",
    [Language.English]: "Hair restoration and beauty services",
    [Language.Russian]: "Услуги по восстановлению волос и красоте",
    [Language.Georgian]: "თმის აღდგენისა და სილამაზის სერვისები"
  },
  "common.viewAll": {
    [Language.Turkish]: "Tümünü Görüntüle",
    [Language.English]: "View All",
    [Language.Russian]: "Посмотреть Все",
    [Language.Georgian]: "ყველას ნახვა"
  },
  "services.popular.label": {
    [Language.Turkish]: "Popüler Hizmet",
    [Language.English]: "Popular Service",
    [Language.Russian]: "Популярная Услуга",
    [Language.Georgian]: "პოპულარული სერვისი"
  },
  "services.features.naturalResults": {
    [Language.Turkish]: "Doğal Sonuçlar",
    [Language.English]: "Natural Results",
    [Language.Russian]: "Естественные Результаты",
    [Language.Georgian]: "ბუნებრივი შედეგები"
  },
  "common.learnMore": {
    [Language.Turkish]: "Daha Fazla Bilgi",
    [Language.English]: "Learn More",
    [Language.Russian]: "Узнать Больше",
    [Language.Georgian]: "მეტის გაგება"
  },
  "services.features.customDesign": {
    [Language.Turkish]: "Kişiye Özel Tasarım",
    [Language.English]: "Custom Design",
    [Language.Russian]: "Индивидуальный Дизайн",
    [Language.Georgian]: "კუსტომ დიზაინი"
  },
  "services.features.densityControl": {
    [Language.Turkish]: "Yoğunluk Kontrolü",
    [Language.English]: "Density Control",
    [Language.Russian]: "Контроль Плотности",
    [Language.Georgian]: "სიმკვრივის კონტროლი"
  },
  "services.features.consultation": {
    [Language.Turkish]: "Ücretsiz Konsültasyon",
    [Language.English]: "Free Consultation",
    [Language.Russian]: "Бесплатная Консультация",
    [Language.Georgian]: "უფასო კონსულტაცია"
  },
  "services.features.aftercare": {
    [Language.Turkish]: "Kapsamlı Bakım",
    [Language.English]: "Comprehensive Aftercare",
    [Language.Russian]: "Комплексный Послеоперационный Уход",
    [Language.Georgian]: "სრული მოვლა ოპერაციის შემდეგ"
  },
  "services.features.support": {
    [Language.Turkish]: "7/24 Destek",
    [Language.English]: "24/7 Support",
    [Language.Russian]: "Поддержка 24/7",
    [Language.Georgian]: "24/7 მხარდაჭერა"
  },
  "services.features.satisfaction": {
    [Language.Turkish]: "Müşteri Memnuniyeti",
    [Language.English]: "Customer Satisfaction",
    [Language.Russian]: "Удовлетворенность Клиентов",
    [Language.Georgian]: "კლიენტის კმაყოფილება"
  },
  "services.features.noSideEffects": {
    [Language.Turkish]: "Yan Etki Yok",
    [Language.English]: "No Side Effects",
    [Language.Russian]: "Отсутствие Побочных Эффектов",
    [Language.Georgian]: "არანაირი გვერდითი ეფექტი"
  },
  "services.features.quickRecovery": {
    [Language.Turkish]: "Hızlı İyileşme",
    [Language.English]: "Quick Recovery",
    [Language.Russian]: "Быстрое Восстановление",
    [Language.Georgian]: "სწრაფი აღდგენა"
  },
  "common.duration": {
    [Language.Turkish]: "Süre",
    [Language.English]: "Duration",
    [Language.Russian]: "Продолжительность",
    [Language.Georgian]: "ხანგრძლივობა"
  },
  "services.features.permanentSolution": {
    [Language.Turkish]: "Kalıcı Çözüm",
    [Language.English]: "Permanent Solution",
    [Language.Russian]: "Постоянное Решение",
    [Language.Georgian]: "მუდმივი გადაწყვეტა"
  },
  "services.features.naturalAppearance": {
    [Language.Turkish]: "Doğal Görünüm",
    [Language.English]: "Natural Appearance",
    [Language.Russian]: "Натуральный Вид",
    [Language.Georgian]: "ბუნებრივი გარეგნობა"
  },
  "services.features.facialHarmony": {
    [Language.Turkish]: "Yüz Uyumu",
    [Language.English]: "Facial Harmony",
    [Language.Russian]: "Гармония Лица",
    [Language.Georgian]: "სახის ჰარმონია"
  },
  "common.contactUs": {
    [Language.Turkish]: "Bize Ulaşın",
    [Language.English]: "Contact Us",
    [Language.Russian]: "Свяжитесь с Нами",
    [Language.Georgian]: "დაგვიკავშირდით"
  },
  
  // ===========================================================================
  // WHY CHOOSE US SECTION
  // ===========================================================================
  
  "home.whyChooseUs.title": {
    [Language.Turkish]: "Neden Bizi Seçmelisiniz",
    [Language.English]: "Why Choose Us",
    [Language.Russian]: "Почему Выбирают Нас",
    [Language.Georgian]: "რატომ უნდა აგვირჩიოთ"
  },
  "home.whyChooseUs.subtitle": {
    [Language.Turkish]: "MyHair Tbilisi ile saç ekimi konusunda en iyi hizmeti alın",
    [Language.English]: "Get the best hair transplantation service with MyHair Tbilisi",
    [Language.Russian]: "Получите лучший сервис по трансплантации волос с MyHair Тбилиси",
    [Language.Georgian]: "მიიღეთ საუკეთესო თმის გადანერგვის სერვისი MyHair თბილისთან ერთად"
  },
  "home.whyChooseUs.experience.title": {
    [Language.Turkish]: "Uzman Deneyimi",
    [Language.English]: "Expert Experience",
    [Language.Russian]: "Экспертный Опыт",
    [Language.Georgian]: "ექსპერტული გამოცდილება"
  },
  "home.whyChooseUs.experience.description": {
    [Language.Turkish]: "10+ yıllık deneyime sahip uzman saç ekimi cerrahlarımız ve ekibimiz",
    [Language.English]: "Our expert hair transplant surgeons and team with 10+ years of experience",
    [Language.Russian]: "Наши эксперты-хирурги по трансплантации волос и команда с более чем 10-летним опытом",
    [Language.Georgian]: "ჩვენი ექსპერტი თმის გადანერგვის ქირურგები და გუნდი 10+ წლიანი გამოცდილებით"
  },
  "home.whyChooseUs.technology.title": {
    [Language.Turkish]: "İleri Teknoloji",
    [Language.English]: "Advanced Technology",
    [Language.Russian]: "Передовые Технологии",
    [Language.Georgian]: "თანამედროვე ტექნოლოგია"
  },
  "home.whyChooseUs.technology.description": {
    [Language.Turkish]: "En son DHI ve FUE teknikleri ile doğal ve kalıcı sonuçlar",
    [Language.English]: "Natural and permanent results with the latest DHI and FUE techniques",
    [Language.Russian]: "Естественные и постоянные результаты с использованием новейших методов DHI и FUE",
    [Language.Georgian]: "ბუნებრივი და მუდმივი შედეგები უახლესი DHI და FUE ტექნიკებით"
  },
  "home.whyChooseUs.care.title": {
    [Language.Turkish]: "Özel Bakım",
    [Language.English]: "Special Care",
    [Language.Russian]: "Особый Уход",
    [Language.Georgian]: "განსაკუთრებული ზრუნვა"
  },
  "home.whyChooseUs.care.description": {
    [Language.Turkish]: "Kişiselleştirilmiş tedavi planı ve operasyon sonrası bakım hizmetleri",
    [Language.English]: "Personalized treatment plan and post-operation care services",
    [Language.Russian]: "Индивидуальный план лечения и услуги послеоперационного ухода",
    [Language.Georgian]: "პერსონალიზებული მკურნალობის გეგმა და ოპერაციის შემდგომი მოვლის სერვისები"
  },
  "home.whyChooseUs.priceReason.title": {
    [Language.Turkish]: "Uygun Fiyat",
    [Language.English]: "Affordable Price",
    [Language.Russian]: "Доступная Цена",
    [Language.Georgian]: "ხელმისაწვდომი ფასი"
  },
  "home.whyChooseUs.priceReason.description": {
    [Language.Turkish]: "Avrupa'ya kıyasla çok daha uygun fiyatlarla premium kalite hizmet",
    [Language.English]: "Premium quality service at much more affordable prices compared to Europe",
    [Language.Russian]: "Услуги премиум-класса по гораздо более доступным ценам по сравнению с Европой",
    [Language.Georgian]: "პრემიუმ ხარისხის სერვისი გაცილებით ხელმისაწვდომ ფასებში ევროპასთან შედარებით"
  },
  
  // ===========================================================================
  // PACKAGES SECTION
  // ===========================================================================
  
  "packages.home.tagline": {
    [Language.Turkish]: "ÜLKELERE ÖZEL PAKETLER",
    [Language.English]: "COUNTRY-SPECIFIC PACKAGES",
    [Language.Russian]: "ПАКЕТЫ ДЛЯ КОНКРЕТНЫХ СТРАН",
    [Language.Georgian]: "ქვეყნის სპეციფიკური პაკეტები"
  },
  "packages.home.title": {
    [Language.Turkish]: "Saç Ekimi Seyahat Paketleri",
    [Language.English]: "Hair Transplant Travel Packages",
    [Language.Russian]: "Пакеты Для Путешествий с Трансплантацией Волос",
    [Language.Georgian]: "თმის გადანერგვის სამოგზაურო პაკეტები"
  },
  "packages.home.subtitle": {
    [Language.Turkish]: "Konforlu konaklama ve VIP hizmetleri içeren ülkeye özel paketler",
    [Language.English]: "Country-specific packages including comfortable accommodation and VIP services",
    [Language.Russian]: "Пакеты для конкретных стран, включающие комфортное проживание и VIP-услуги",
    [Language.Georgian]: "ქვეყნისთვის სპეციფიკური პაკეტები, რომლებიც მოიცავს კომფორტულ საცხოვრებელს და VIP მომსახურებას"
  },
  
  // Country names
  "countries.turkey": {
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
  "packages.home.days": {
    [Language.Turkish]: "gün",
    [Language.English]: "days",
    [Language.Russian]: "дней",
    [Language.Georgian]: "დღე"
  },
  "packages.home.forPerson": {
    [Language.Turkish]: "kişi başı",
    [Language.English]: "per person",
    [Language.Russian]: "на человека",
    [Language.Georgian]: "ერთ პიროვნებაზე"
  },
  "packages.home.details": {
    [Language.Turkish]: "Paket Detayları",
    [Language.English]: "Package Details",
    [Language.Russian]: "Детали Пакета",
    [Language.Georgian]: "პაკეტის დეტალები"
  },
  "packages.home.allInclusive": {
    [Language.Turkish]: "Her Şey Dahil",
    [Language.English]: "All Inclusive",
    [Language.Russian]: "Все Включено",
    [Language.Georgian]: "ყველაფერი ჩათვლილი"
  },
  
  // ===========================================================================
  // BLOG SECTION
  // ===========================================================================
  
  "blog.badge": {
    [Language.Turkish]: "BLOG & HABERLER",
    [Language.English]: "BLOG & NEWS",
    [Language.Russian]: "БЛОГ И НОВОСТИ",
    [Language.Georgian]: "ბლოგი და სიახლეები"
  },
  "blog.title": {
    [Language.Turkish]: "Saç Ekimi Blogu | Uzman Makaleler ve Başarı Hikayeleri | MyHair Clinic",
    [Language.English]: "Hair Transplant Blog | Expert Articles and Success Stories | MyHair Clinic",
    [Language.Russian]: "Блог о Трансплантации Волос | Экспертные Статьи и Истории Успеха | MyHair Clinic",
    [Language.Georgian]: "თმის გადანერგვის ბლოგი | ექსპერტული სტატიები და წარმატების ისტორიები | MyHair Clinic"
  },
  "blog.description": {
    [Language.Turkish]: "Saç ekimi, saç dökülmesi tedavileri ve saç bakımı hakkında uzman makaleler ve gerçek başarı hikayeleri. Saç sağlığınız için en güncel bilgiler ve klinik deneyimlerimiz burada.",
    [Language.English]: "Expert articles and real success stories about hair transplantation, hair loss treatments, and hair care. Find the latest information for your hair health and our clinical experiences here.",
    [Language.Russian]: "Экспертные статьи и реальные истории успеха о трансплантации волос, лечении выпадения волос и уходе за волосами. Найдите здесь самую актуальную информацию о здоровье ваших волос и наш клинический опыт.",
    [Language.Georgian]: "ექსპერტული სტატიები და რეალური წარმატების ისტორიები თმის გადანერგვის, თმის ცვენის მკურნალობის და თმის მოვლის შესახებ. იპოვეთ აქ უახლესი ინფორმაცია თქვენი თმის ჯანმრთელობისა და ჩვენი კლინიკური გამოცდილების შესახებ."
  },
  "blog.pageHeader.title": {
    [Language.Turkish]: "Saç Ekimi Blogu | Uzman Makaleler ve Başarı Hikayeleri",
    [Language.English]: "Hair Transplant Blog | Expert Articles and Success Stories",
    [Language.Russian]: "Блог о Трансплантации Волос | Экспертные Статьи и Истории Успеха",
    [Language.Georgian]: "თმის გადანერგვის ბლოგი | ექსპერტული სტატიები და წარმატების ისტორიები"
  },
  "blog.pageHeader.description": {
    [Language.Turkish]: "Saç ekimi, saç dökülmesi tedavileri ve saç bakımı hakkında uzman makaleler ve gerçek başarı hikayeleri. Saç sağlığınız için en güncel bilgiler ve klinik deneyimlerimiz burada.",
    [Language.English]: "Expert articles and real success stories about hair transplantation, hair loss treatments, and hair care. Find the latest information for your hair health and our clinical experiences here.",
    [Language.Russian]: "Экспертные статьи и реальные истории успеха о трансплантации волос, лечении выпадения волос и уходе за волосами. Найдите здесь самую актуальную информацию о здоровье ваших волос и наш клинический опыт.",
    [Language.Georgian]: "ექსპერტული სტატიები და რეალური წარმატების ისტორიები თმის გადანერგვის, თმის ცვენის მკურნალობის და თმის მოვლის შესახებ. იპოვეთ აქ უახლესი ინფორმაცია თქვენი თმის ჯანმრთელობისა და ჩვენი კლინიკური გამოცდილების შესახებ."
  },
  "blog.featuredPosts": {
    [Language.Turkish]: "Öne Çıkan Yazılar",
    [Language.English]: "Featured Posts",
    [Language.Russian]: "Избранные Статьи",
    [Language.Georgian]: "გამორჩეული სტატიები"
  },
  "blog.latestPosts": {
    [Language.Turkish]: "En Son Yazılar",
    [Language.English]: "Latest Posts",
    [Language.Russian]: "Последние Статьи",
    [Language.Georgian]: "უახლესი სტატიები"
  },
  "blog.popularPosts": {
    [Language.Turkish]: "Popüler Yazılar",
    [Language.English]: "Popular Posts",
    [Language.Russian]: "Популярные Статьи",
    [Language.Georgian]: "პოპულარული სტატიები"
  },
  "blog.categories": {
    [Language.Turkish]: "Kategoriler",
    [Language.English]: "Categories",
    [Language.Russian]: "Категории",
    [Language.Georgian]: "კატეგორიები"
  },
  "blog.tags": {
    [Language.Turkish]: "Etiketler",
    [Language.English]: "Tags",
    [Language.Russian]: "Теги",
    [Language.Georgian]: "ტეგები"
  },
  "blog.authors": {
    [Language.Turkish]: "Yazarlar",
    [Language.English]: "Authors",
    [Language.Russian]: "Авторы",
    [Language.Georgian]: "ავტორები"
  },
  "blog.searchPlaceholder": {
    [Language.Turkish]: "Blog yazılarında ara...",
    [Language.English]: "Search blog posts...",
    [Language.Russian]: "Поиск в блоге...",
    [Language.Georgian]: "ბლოგის სტატიების ძიება..."
  },
  "blog.category.all": {
    [Language.Turkish]: "Tümü",
    [Language.English]: "All",
    [Language.Russian]: "Все",
    [Language.Georgian]: "ყველა"
  },
  "blog.category.hairTransplant": {
    [Language.Turkish]: "Saç Ekimi",
    [Language.English]: "Hair Transplant",
    [Language.Russian]: "Трансплантация Волос",
    [Language.Georgian]: "თმის გადანერგვა"
  },
  "blog.category.beardTransplant": {
    [Language.Turkish]: "Sakal Ekimi",
    [Language.English]: "Beard Transplant",
    [Language.Russian]: "Трансплантация Бороды",
    [Language.Georgian]: "წვერის გადანერგვა"
  },
  "blog.category.prp": {
    [Language.Turkish]: "PRP Tedavisi",
    [Language.English]: "PRP Treatment",
    [Language.Russian]: "PRP Терапия",
    [Language.Georgian]: "PRP მკურნალობა"
  },
  "blog.category.travel": {
    [Language.Turkish]: "Seyahat",
    [Language.English]: "Travel",
    [Language.Russian]: "Путешествие",
    [Language.Georgian]: "მოგზაურობა"
  },
  "blog.category.clinic": {
    [Language.Turkish]: "Klinik",
    [Language.English]: "Clinic",
    [Language.Russian]: "Клиника",
    [Language.Georgian]: "კლინიკა"
  },
  "blog.category.beforeAfter": {
    [Language.Turkish]: "Öncesi ve Sonrası",
    [Language.English]: "Before and After",
    [Language.Russian]: "До и После",
    [Language.Georgian]: "მანამდე და შემდეგ"
  },
  "blog.category.patientStories": {
    [Language.Turkish]: "Hasta Hikayeleri",
    [Language.English]: "Patient Stories",
    [Language.Russian]: "Истории пациентов",
    [Language.Georgian]: "პაციენტების ისტორიები"
  },
  "blog.category.hairCare": {
    [Language.Turkish]: "Saç Bakımı",
    [Language.English]: "Hair Care",
    [Language.Russian]: "Уход за волосами",
    [Language.Georgian]: "თმის მოვლა"
  },
  "blog.sort.newest": {
    [Language.Turkish]: "En Yeni",
    [Language.English]: "Newest First",
    [Language.Russian]: "Сначала новые",
    [Language.Georgian]: "ახალი თავში"
  },
  "blog.sort.oldest": {
    [Language.Turkish]: "En Eski",
    [Language.English]: "Oldest First",
    [Language.Russian]: "Сначала старые",
    [Language.Georgian]: "ძველი თავში"
  },
  "blog.sort.popular": {
    [Language.Turkish]: "En Popüler",
    [Language.English]: "Most Popular",
    [Language.Russian]: "Самые популярные",
    [Language.Georgian]: "ყველაზე პოპულარული"
  },
  "blog.filter": {
    [Language.Turkish]: "Filtrele",
    [Language.English]: "Filter",
    [Language.Russian]: "Фильтр",
    [Language.Georgian]: "ფილტრი"
  },
  "blog.sort": {
    [Language.Turkish]: "Sırala",
    [Language.English]: "Sort",
    [Language.Russian]: "Сортировка",
    [Language.Georgian]: "დალაგება"
  },
  "blog.search": {
    [Language.Turkish]: "Ara",
    [Language.English]: "Search",
    [Language.Russian]: "Поиск",
    [Language.Georgian]: "ძიება"
  },
  "blog.pagination.prev": {
    [Language.Turkish]: "Önceki",
    [Language.English]: "Previous",
    [Language.Russian]: "Предыдущая",
    [Language.Georgian]: "წინა"
  },
  "blog.pagination.next": {
    [Language.Turkish]: "Sonraki",
    [Language.English]: "Next",
    [Language.Russian]: "Следующая",
    [Language.Georgian]: "შემდეგი"
  },
  "blog.pagination.page": {
    [Language.Turkish]: "Sayfa",
    [Language.English]: "Page",
    [Language.Russian]: "Страница",
    [Language.Georgian]: "გვერდი"
  },
  "blog.noResults": {
    [Language.Turkish]: "Aradığınız kriterlere uygun sonuç bulunamadı.",
    [Language.English]: "No results match your search criteria.",
    [Language.Russian]: "Результаты, соответствующие вашим критериям поиска, не найдены.",
    [Language.Georgian]: "თქვენი ძიების კრიტერიუმებს არცერთი შედეგი არ შეესაბამება."
  },
  "common.packages": {
    [Language.Turkish]: "Paketler",
    [Language.English]: "Packages",
    [Language.Russian]: "Пакеты",
    [Language.Georgian]: "პაკეტები"
  },
  "common.gallery": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "common.blog": {
    [Language.Turkish]: "Blog",
    [Language.English]: "Blog",
    [Language.Russian]: "Блог",
    [Language.Georgian]: "ბლოგი"
  },
  "common.about": {
    [Language.Turkish]: "Hakkımızda",
    [Language.English]: "About",
    [Language.Russian]: "О нас",
    [Language.Georgian]: "ჩვენ შესახებ"
  },
  "common.contact": {
    [Language.Turkish]: "İletişim",
    [Language.English]: "Contact",
    [Language.Russian]: "Контакты",
    [Language.Georgian]: "კონტაქტი"
  },
  "common.appointment": {
    [Language.Turkish]: "Randevu",
    [Language.English]: "Appointment",
    [Language.Russian]: "Запись",
    [Language.Georgian]: "შეხვედრა"
  },
  "common.latestFromOurBlog": {
    [Language.Turkish]: "Blogdan Son Yazılar",
    [Language.English]: "Latest From Our Blog",
    [Language.Russian]: "Последние Записи из Нашего Блога",
    [Language.Georgian]: "უახლესი ჩვენი ბლოგიდან"
  },
  "blog.readMore": {
    [Language.Turkish]: "Devamını Oku",
    [Language.English]: "Read More",
    [Language.Russian]: "Читать Далее",
    [Language.Georgian]: "მეტის წაკითხვა"
  },
  "common.viewAllBlogs": {
    [Language.Turkish]: "Tüm Blog Yazılarını Görüntüle",
    [Language.English]: "View All Blog Posts",
    [Language.Russian]: "Просмотреть Все Записи Блога",
    [Language.Georgian]: "ყველა ბლოგის ნახვა"
  },
  
  // ===========================================================================
  // FOOTER SECTION
  // ===========================================================================
  
  "footer.workingHours": {
    [Language.Turkish]: "Çalışma Saatleri",
    [Language.English]: "Working Hours",
    [Language.Russian]: "Часы Работы",
    [Language.Georgian]: "სამუშაო საათები"
  },
  "footer.getDirections": {
    [Language.Turkish]: "Yol Tarifi Al",
    [Language.English]: "Get Directions",
    [Language.Russian]: "Получить Направления",
    [Language.Georgian]: "მიმართულებების მიღება"
  },
  "footer.allRightsReserved": {
    [Language.Turkish]: "Tüm Hakları Saklıdır",
    [Language.English]: "All Rights Reserved",
    [Language.Russian]: "Все Права Защищены",
    [Language.Georgian]: "ყველა უფლება დაცულია"
  },
  "footer.privacyPolicy": {
    [Language.Turkish]: "Gizlilik Politikası",
    [Language.English]: "Privacy Policy",
    [Language.Russian]: "Политика Конфиденциальности",
    [Language.Georgian]: "კონფიდენციალურობის პოლიტიკა"
  },
  "footer.termsOfUse": {
    [Language.Turkish]: "Kullanım Şartları",
    [Language.English]: "Terms of Use",
    [Language.Russian]: "Условия Использования",
    [Language.Georgian]: "გამოყენების პირობები"
  },
  "common.contactViaWhatsApp": {
    [Language.Turkish]: "WhatsApp'tan Ulaşın",
    [Language.English]: "Contact via WhatsApp",
    [Language.Russian]: "Связаться через WhatsApp",
    [Language.Georgian]: "დაგვიკავშირდით WhatsApp-ით"
  },
  "common.makeAppointment": {
    [Language.Turkish]: "Randevu Alın",
    [Language.English]: "Make an Appointment",
    [Language.Russian]: "Записаться на Прием",
    [Language.Georgian]: "დანიშნეთ შეხვედრა"
  },
  "footer.description": {
    [Language.Turkish]: "MyHair Clinic, saç ekimi ve restorasyon konusunda uzmanlaşmış öncü bir kliniktir. Yüksek kaliteli bakım, ileri teknoloji ve kişiselleştirilmiş tedavi yaklaşımı sunuyoruz.",
    [Language.English]: "MyHair Clinic is a leading clinic specializing in hair transplantation and restoration. We offer high-quality care, advanced technology, and a personalized treatment approach.",
    [Language.Russian]: "MyHair Clinic — ведущая клиника, специализирующаяся на трансплантации и восстановлении волос. Мы предлагаем высококачественный уход, передовые технологии и персонализированный подход к лечению.",
    [Language.Georgian]: "MyHair Clinic არის წამყვანი კლინიკა, რომელიც სპეციალიზირებულია თმის გადანერგვასა და აღდგენაში. ჩვენ გთავაზობთ მაღალი ხარისხის მოვლას, თანამედროვე ტექნოლოგიებს და პერსონალიზებულ მკურნალობის მიდგომას."
  },
  "footer.quickLinks": {
    [Language.Turkish]: "Hızlı Linkler",
    [Language.English]: "Quick Links",
    [Language.Russian]: "Быстрые Ссылки",
    [Language.Georgian]: "სწრაფი ბმულები"
  },
  "footer.ourServices": {
    [Language.Turkish]: "Hizmetlerimiz",
    [Language.English]: "Our Services",
    [Language.Russian]: "Наши Услуги",
    [Language.Georgian]: "ჩვენი სერვისები"
  },
  
  // ===========================================================================
  // MENU & COMMON ITEMS
  // ===========================================================================
  
  "common.home": {
    [Language.Turkish]: "Anasayfa",
    [Language.English]: "Home",
    [Language.Russian]: "Главная",
    [Language.Georgian]: "მთავარი"
  },
  "common.servicesMenu": {
    [Language.Turkish]: "Hizmetler",
    [Language.English]: "Services",
    [Language.Russian]: "Услуги",
    [Language.Georgian]: "სერვისები"
  },
  "services.hairTransplant": {
    [Language.Turkish]: "Saç Ekimi",
    [Language.English]: "Hair Transplantation",
    [Language.Russian]: "Трансплантация Волос",
    [Language.Georgian]: "თმის გადანერგვა"
  },
  "services.beardTransplant": {
    [Language.Turkish]: "Sakal Ekimi",
    [Language.English]: "Beard Transplantation",
    [Language.Russian]: "Трансплантация Бороды",
    [Language.Georgian]: "წვერის გადანერგვა"
  },
  "services.eyebrowTransplant": {
    [Language.Turkish]: "Kaş Ekimi",
    [Language.English]: "Eyebrow Transplantation",
    [Language.Russian]: "Трансплантация Бровей",
    [Language.Georgian]: "წარბების გადანერგვა"
  },
  "services.prpTreatment": {
    [Language.Turkish]: "PRP Tedavisi",
    [Language.English]: "PRP Treatment",
    [Language.Russian]: "PRP-терапия",
    [Language.Georgian]: "PRP მკურნალობა"
  },
  "services.mesotherapy": {
    [Language.Turkish]: "Saç Mezoterapisi",
    [Language.English]: "Hair Mesotherapy",
    [Language.Russian]: "Мезотерапия Волос",
    [Language.Georgian]: "თმის მეზოთერაპია"
  },
  
  // ===========================================================================
  // CONTACT PAGE
  // ===========================================================================
  
  "contact.title": {
    [Language.Turkish]: "İletişim | MyHair Clinic",
    [Language.English]: "Contact | MyHair Clinic",
    [Language.Russian]: "Контакты | MyHair Clinic",
    [Language.Georgian]: "კონტაქტი | MyHair Clinic"
  },
  "contact.description": {
    [Language.Turkish]: "MyHair Clinic ile iletişime geçin. Tiflis'teki kliniğimize ulaşın, saç ekimi hakkında sorularınızı sorun veya randevu alın. Saç ekimi ve saç bakımı konusunda tüm sorularınızı yanıtlamak için buradayız.",
    [Language.English]: "Contact MyHair Clinic. Reach our clinic in Tbilisi, ask questions about hair transplantation, or make an appointment. We are here to answer all your questions about hair transplantation and hair care.",
    [Language.Russian]: "Свяжитесь с MyHair Clinic. Свяжитесь с нашей клиникой в Тбилиси, задайте вопросы о трансплантации волос или запишитесь на прием. Мы здесь, чтобы ответить на все ваши вопросы о трансплантации волос и уходе за волосами.",
    [Language.Georgian]: "დაუკავშირდით MyHair Clinic-ს. დაუკავშირდით ჩვენს კლინიკას თბილისში, დასვით კითხვები თმის გადანერგვის შესახებ ან დანიშნეთ შეხვედრა. ჩვენ აქ ვართ, რომ ვუპასუხოთ თქვენს ყველა კითხვას თმის გადანერგვისა და თმის მოვლის შესახებ."
  },
  "contact.getInTouch": {
    [Language.Turkish]: "İletişime Geçin",
    [Language.English]: "Get in Touch",
    [Language.Russian]: "Свяжитесь с Нами",
    [Language.Georgian]: "დაგვიკავშირდით"
  },
  "contact.form.title": {
    [Language.Turkish]: "Bize Mesaj Gönderin",
    [Language.English]: "Send Us a Message",
    [Language.Russian]: "Отправьте Нам Сообщение",
    [Language.Georgian]: "გამოგვიგზავნეთ შეტყობინება"
  },
  "contact.form.description": {
    [Language.Turkish]: "Saç ekimi veya diğer tedavilerimiz hakkında sorularınız mı var? Aşağıdaki formu doldurun, en kısa sürede size dönüş yapacağız.",
    [Language.English]: "Do you have questions about hair transplantation or our other treatments? Fill out the form below, and we will get back to you as soon as possible.",
    [Language.Russian]: "У вас есть вопросы о трансплантации волос или других наших процедурах? Заполните форму ниже, и мы свяжемся с вами в кратчайшие сроки.",
    [Language.Georgian]: "გაქვთ კითხვები თმის გადანერგვის ან ჩვენი სხვა პროცედურების შესახებ? შეავსეთ ქვემოთ მოცემული ფორმა და ჩვენ დაგიკავშირდებით რაც შეიძლება მალე."
  },
  "contact.form.name": {
    [Language.Turkish]: "Adınız",
    [Language.English]: "Your Name",
    [Language.Russian]: "Ваше Имя",
    [Language.Georgian]: "თქვენი სახელი"
  },
  "contact.form.email": {
    [Language.Turkish]: "E-posta Adresiniz",
    [Language.English]: "Your Email",
    [Language.Russian]: "Ваш Email",
    [Language.Georgian]: "თქვენი ელფოსტა"
  },
  "contact.form.phone": {
    [Language.Turkish]: "Telefon Numaranız",
    [Language.English]: "Your Phone Number",
    [Language.Russian]: "Ваш Номер Телефона",
    [Language.Georgian]: "თქვენი ტელეფონის ნომერი"
  },
  "contact.form.message": {
    [Language.Turkish]: "Mesajınız",
    [Language.English]: "Your Message",
    [Language.Russian]: "Ваше Сообщение",
    [Language.Georgian]: "თქვენი შეტყობინება"
  },
  "contact.form.submit": {
    [Language.Turkish]: "Mesaj Gönder",
    [Language.English]: "Send Message",
    [Language.Russian]: "Отправить Сообщение",
    [Language.Georgian]: "შეტყობინების გაგზავნა"
  },
  "contact.form.success": {
    [Language.Turkish]: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
    [Language.English]: "Your message has been sent successfully. We will get back to you as soon as possible.",
    [Language.Russian]: "Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.",
    [Language.Georgian]: "თქვენი შეტყობინება წარმატებით გაიგზავნა. ჩვენ დაგიკავშირდებით რაც შეიძლება მალე."
  },
  "contact.form.error": {
    [Language.Turkish]: "Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while sending your message. Please try again later.",
    [Language.Russian]: "Произошла ошибка при отправке вашего сообщения. Пожалуйста, попробуйте позже.",
    [Language.Georgian]: "თქვენი შეტყობინების გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
  "contact.info.title": {
    [Language.Turkish]: "İletişim Bilgilerimiz",
    [Language.English]: "Our Contact Information",
    [Language.Russian]: "Наша Контактная Информация",
    [Language.Georgian]: "ჩვენი საკონტაქტო ინფორმაცია"
  },
  "contact.info.description": {
    [Language.Turkish]: "Aşağıdaki iletişim bilgilerinden bize ulaşabilir veya doğrudan kliniğimizi ziyaret edebilirsiniz.",
    [Language.English]: "You can reach us using the contact information below or visit our clinic directly.",
    [Language.Russian]: "Вы можете связаться с нами, используя контактную информацию ниже, или посетить нашу клинику напрямую.",
    [Language.Georgian]: "შეგიძლიათ დაგვიკავშირდეთ ქვემოთ მოცემული საკონტაქტო ინფორმაციის გამოყენებით ან პირდაპირ ეწვიოთ ჩვენს კლინიკას."
  },
  "contact.address": {
    [Language.Turkish]: "Adres",
    [Language.English]: "Address",
    [Language.Russian]: "Адрес",
    [Language.Georgian]: "მისამართი"
  },
  "contact.phone": {
    [Language.Turkish]: "Telefon",
    [Language.English]: "Phone",
    [Language.Russian]: "Телефон",
    [Language.Georgian]: "ტელეფონი"
  },
  "contact.email": {
    [Language.Turkish]: "E-posta",
    [Language.English]: "Email",
    [Language.Russian]: "Email",
    [Language.Georgian]: "ელფოსტა"
  },
  "contact.workingHours": {
    [Language.Turkish]: "Çalışma Saatleri",
    [Language.English]: "Working Hours",
    [Language.Russian]: "Часы Работы",
    [Language.Georgian]: "სამუშაო საათები"
  },
  "contact.followUs": {
    [Language.Turkish]: "Bizi Takip Edin",
    [Language.English]: "Follow Us",
    [Language.Russian]: "Подписывайтесь на Нас",
    [Language.Georgian]: "გამოგვყევით"
  },
  "contact.mapTitle": {
    [Language.Turkish]: "Kliniğimizin Konumu",
    [Language.English]: "Our Clinic Location",
    [Language.Russian]: "Расположение Нашей Клиники",
    [Language.Georgian]: "ჩვენი კლინიკის მდებარეობა"
  },
  
  // ===========================================================================
  // ABOUT PAGE
  // ===========================================================================
  
  "about.title": {
    [Language.Turkish]: "Hakkımızda | MyHair Clinic",
    [Language.English]: "About Us | MyHair Clinic",
    [Language.Russian]: "О Нас | MyHair Clinic",
    [Language.Georgian]: "ჩვენ შესახებ | MyHair Clinic"
  },
  "about.description": {
    [Language.Turkish]: "MyHair Clinic, Tiflis'te yüksek kaliteli saç ekimi ve estetik tedaviler sunan uzman bir kliniktir. FUE ve DHI teknikleri konusunda uzmanlaşmış deneyimli ekibimizle tanışın.",
    [Language.English]: "MyHair Clinic is a specialized clinic offering high-quality hair transplantation and aesthetic treatments in Tbilisi. Meet our experienced team specialized in FUE and DHI techniques.",
    [Language.Russian]: "MyHair Clinic — это специализированная клиника, предлагающая высококачественную трансплантацию волос и эстетические процедуры в Тбилиси. Познакомьтесь с нашей опытной командой, специализирующейся на методах FUE и DHI.",
    [Language.Georgian]: "MyHair Clinic არის სპეციალიზებული კლინიკა, რომელიც გთავაზობთ მაღალი ხარისხის თმის გადანერგვას და ესთეტიკურ პროცედურებს თბილისში. გაიცანით ჩვენი გამოცდილი გუნდი, რომელიც სპეციალიზებულია FUE და DHI ტექნიკებში."
  },
  "about.ourStory": {
    [Language.Turkish]: "Hikayemiz",
    [Language.English]: "Our Story",
    [Language.Russian]: "Наша История",
    [Language.Georgian]: "ჩვენი ისტორია"
  },
  "about.ourMission": {
    [Language.Turkish]: "Misyonumuz",
    [Language.English]: "Our Mission",
    [Language.Russian]: "Наша Миссия",
    [Language.Georgian]: "ჩვენი მისია"
  },
  "about.ourVision": {
    [Language.Turkish]: "Vizyonumuz",
    [Language.English]: "Our Vision",
    [Language.Russian]: "Наше Видение",
    [Language.Georgian]: "ჩვენი ხედვა"
  },
  "about.ourTeam": {
    [Language.Turkish]: "Ekibimiz",
    [Language.English]: "Our Team",
    [Language.Russian]: "Наша Команда",
    [Language.Georgian]: "ჩვენი გუნდი"
  },
  "about.ourValues": {
    [Language.Turkish]: "Değerlerimiz",
    [Language.English]: "Our Values",
    [Language.Russian]: "Наши Ценности",
    [Language.Georgian]: "ჩვენი ღირებულებები"
  },
  "about.whyChooseUs": {
    [Language.Turkish]: "Neden Bizi Seçmelisiniz",
    [Language.English]: "Why Choose Us",
    [Language.Russian]: "Почему Выбирают Нас",
    [Language.Georgian]: "რატომ უნდა აგვირჩიოთ"
  },
  "about.ourAchievements": {
    [Language.Turkish]: "Başarılarımız",
    [Language.English]: "Our Achievements",
    [Language.Russian]: "Наши Достижения",
    [Language.Georgian]: "ჩვენი მიღწევები"
  },
  "about.meetTheTeam": {
    [Language.Turkish]: "Ekibimizle Tanışın",
    [Language.English]: "Meet the Team",
    [Language.Russian]: "Познакомьтесь с Командой",
    [Language.Georgian]: "გაიცანით გუნდი"
  },
  "about.doctorTitle": {
    [Language.Turkish]: "Saç Ekimi Uzmanı",
    [Language.English]: "Hair Transplant Specialist",
    [Language.Russian]: "Специалист по Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის სპეციალისტი"
  },
  "about.nurseTitle": {
    [Language.Turkish]: "Klinik Hemşiresi",
    [Language.English]: "Clinical Nurse",
    [Language.Russian]: "Клиническая Медсестра",
    [Language.Georgian]: "კლინიკური ექთანი"
  },
  "about.consultantTitle": {
    [Language.Turkish]: "Hasta Danışmanı",
    [Language.English]: "Patient Consultant",
    [Language.Russian]: "Консультант Пациентов",
    [Language.Georgian]: "პაციენტის კონსულტანტი"
  },
  
  // ===========================================================================
  // APPOINTMENT PAGE
  // ===========================================================================
  
  "appointment.title": {
    [Language.Turkish]: "Randevu Alın | MyHair Clinic",
    [Language.English]: "Make an Appointment | MyHair Clinic", 
    [Language.Russian]: "Записаться на Прием | MyHair Clinic",
    [Language.Georgian]: "დანიშნეთ შეხვედრა | MyHair Clinic"
  },
  "appointment.description": {
    [Language.Turkish]: "MyHair Clinic'te saç ekimi, sakal ekimi veya kaş ekimi için hızlı ve kolay bir şekilde randevu alın. Uzmanlarımız sizinle en kısa sürede iletişime geçecektir.",
    [Language.English]: "Quickly and easily make an appointment for hair transplantation, beard transplantation, or eyebrow transplantation at MyHair Clinic. Our experts will contact you as soon as possible.",
    [Language.Russian]: "Быстро и легко запишитесь на трансплантацию волос, бороды или бровей в MyHair Clinic. Наши эксперты свяжутся с вами в кратчайшие сроки.",
    [Language.Georgian]: "სწრაფად და მარტივად დანიშნეთ შეხვედრა თმის, წვერის ან წარბების გადანერგვისთვის MyHair Clinic-ში. ჩვენი ექსპერტები დაგიკავშირდებიან რაც შეიძლება მალე."
  },
  "appointment.form.title": {
    [Language.Turkish]: "Randevu Talep Formu",
    [Language.English]: "Appointment Request Form",
    [Language.Russian]: "Форма Запроса на Прием",
    [Language.Georgian]: "შეხვედრის მოთხოვნის ფორმა"
  },
  "appointment.form.description": {
    [Language.Turkish]: "Saç ekimi veya diğer tedavilerimiz için randevu talep etmek için aşağıdaki formu doldurun. Ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    [Language.English]: "Fill out the form below to request an appointment for hair transplantation or our other treatments. Our team will contact you as soon as possible.",
    [Language.Russian]: "Заполните форму ниже, чтобы запросить встречу для трансплантации волос или других наших процедур. Наша команда свяжется с вами в кратчайшие сроки.",
    [Language.Georgian]: "შეავსეთ ქვემოთ მოცემული ფორმა თმის გადანერგვის ან ჩვენი სხვა პროცედურებისთვის შეხვედრის მოთხოვნისთვის. ჩვენი გუნდი დაგიკავშირდებათ რაც შეიძლება მალე."
  },
  "appointment.form.fullName": {
    [Language.Turkish]: "Adınız Soyadınız",
    [Language.English]: "Full Name",
    [Language.Russian]: "Полное Имя",
    [Language.Georgian]: "სრული სახელი"
  },
  "appointment.form.email": {
    [Language.Turkish]: "E-posta Adresiniz",
    [Language.English]: "Email Address",
    [Language.Russian]: "Адрес Электронной Почты",
    [Language.Georgian]: "ელფოსტის მისამართი"
  },
  "appointment.form.phone": {
    [Language.Turkish]: "Telefon Numaranız",
    [Language.English]: "Phone Number",
    [Language.Russian]: "Номер Телефона",
    [Language.Georgian]: "ტელეფონის ნომერი"
  },
  "appointment.form.country": {
    [Language.Turkish]: "Ülkeniz",
    [Language.English]: "Country",
    [Language.Russian]: "Страна",
    [Language.Georgian]: "ქვეყანა"
  },
  "appointment.form.service": {
    [Language.Turkish]: "İlgilendiğiniz Hizmet",
    [Language.English]: "Service of Interest",
    [Language.Russian]: "Интересующая Услуга",
    [Language.Georgian]: "სასურველი სერვისი"
  },
  "appointment.form.preferredDate": {
    [Language.Turkish]: "Tercih Ettiğiniz Tarih",
    [Language.English]: "Preferred Date",
    [Language.Russian]: "Предпочтительная Дата",
    [Language.Georgian]: "სასურველი თარიღი"
  },
  "appointment.form.preferredTime": {
    [Language.Turkish]: "Tercih Ettiğiniz Saat",
    [Language.English]: "Preferred Time",
    [Language.Russian]: "Предпочтительное Время",
    [Language.Georgian]: "სასურველი დრო"
  },
  "appointment.form.additionalNotes": {
    [Language.Turkish]: "Ek Notlar",
    [Language.English]: "Additional Notes",
    [Language.Russian]: "Дополнительные Примечания",
    [Language.Georgian]: "დამატებითი შენიშვნები"
  },
  "appointment.form.submit": {
    [Language.Turkish]: "Randevu Talep Et",
    [Language.English]: "Request Appointment",
    [Language.Russian]: "Запросить Встречу",
    [Language.Georgian]: "შეხვედრის მოთხოვნა"
  },
  "appointment.form.success": {
    [Language.Turkish]: "Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
    [Language.English]: "Your appointment request has been successfully received. We will contact you as soon as possible.",
    [Language.Russian]: "Ваш запрос на встречу успешно получен. Мы свяжемся с вами в ближайшее время.",
    [Language.Georgian]: "თქვენი შეხვედრის მოთხოვნა წარმატებით მიღებულია. ჩვენ დაგიკავშირდებით რაც შეიძლება მალე."
  },
  "appointment.form.error": {
    [Language.Turkish]: "Randevu talebiniz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while sending your appointment request. Please try again later.",
    [Language.Russian]: "Произошла ошибка при отправке вашего запроса на встречу. Пожалуйста, попробуйте позже.",
    [Language.Georgian]: "თქვენი შეხვედრის მოთხოვნის გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
  "appointment.tracker.title": {
    [Language.Turkish]: "Randevu Takibi",
    [Language.English]: "Appointment Tracker",
    [Language.Russian]: "Отслеживание Встречи",
    [Language.Georgian]: "შეხვედრის თვალთვალი"
  },
  "appointment.tracker.description": {
    [Language.Turkish]: "Randevu numaranızı girerek mevcut randevunuzun durumunu kontrol edebilirsiniz.",
    [Language.English]: "Enter your appointment number to check the status of your current appointment.",
    [Language.Russian]: "Введите номер вашей встречи, чтобы проверить статус вашей текущей встречи.",
    [Language.Georgian]: "შეიყვანეთ თქვენი შეხვედრის ნომერი, რათა შეამოწმოთ თქვენი მიმდინარე შეხვედრის სტატუსი."
  },
  "appointment.tracker.checkStatus": {
    [Language.Turkish]: "Durum Kontrol Et",
    [Language.English]: "Check Status",
    [Language.Russian]: "Проверить Статус",
    [Language.Georgian]: "სტატუსის შემოწმება"
  },
  "appointment.tracker.appointmentNumber": {
    [Language.Turkish]: "Randevu Numarası",
    [Language.English]: "Appointment Number",
    [Language.Russian]: "Номер Встречи",
    [Language.Georgian]: "შეხვედრის ნომერი"
  },
  "appointment.status.pending": {
    [Language.Turkish]: "Beklemede",
    [Language.English]: "Pending",
    [Language.Russian]: "В Ожидании",
    [Language.Georgian]: "მიმდინარე"
  },
  "appointment.status.confirmed": {
    [Language.Turkish]: "Onaylandı",
    [Language.English]: "Confirmed",
    [Language.Russian]: "Подтверждено",
    [Language.Georgian]: "დადასტურებული"
  },
  "appointment.status.cancelled": {
    [Language.Turkish]: "İptal Edildi",
    [Language.English]: "Cancelled",
    [Language.Russian]: "Отменено",
    [Language.Georgian]: "გაუქმებული"
  },
  "appointment.status.completed": {
    [Language.Turkish]: "Tamamlandı",
    [Language.English]: "Completed",
    [Language.Russian]: "Завершено",
    [Language.Georgian]: "დასრულებული"
  },
  
  // ===========================================================================
  // GALLERY PAGE
  // ===========================================================================
  
  "gallery.title": {
    [Language.Turkish]: "Galeri | Öncesi-Sonrası Fotoğraflar ve Videolar | MyHair Clinic",
    [Language.English]: "Gallery | Before-After Photos and Videos | MyHair Clinic",
    [Language.Russian]: "Галерея | Фото и Видео До и После | MyHair Clinic",
    [Language.Georgian]: "გალერეა | ფოტოები და ვიდეოები მანამდე-მერე | MyHair Clinic"
  },
  "gallery.description": {
    [Language.Turkish]: "Saç ekimi, sakal ekimi ve kaş ekimi öncesi-sonrası fotoğraflarımızı ve hasta deneyimlerimizi içeren video galerimizi keşfedin.",
    [Language.English]: "Explore our gallery of before-after photos of hair transplantation, beard transplantation, and eyebrow transplantation, as well as videos of patient experiences.",
    [Language.Russian]: "Изучите нашу галерею фотографий до и после трансплантации волос, бороды и бровей, а также видео с опытом пациентов.",
    [Language.Georgian]: "გაეცანით ჩვენს გალერეას თმის, წვერის და წარბების გადანერგვის ფოტოებით მანამდე-მერე, ასევე ვიდეოებს პაციენტების გამოცდილებებით."
  },
  "gallery.header.title": {
    [Language.Turkish]: "Başarı Hikayelerimiz",
    [Language.English]: "Our Success Stories",
    [Language.Russian]: "Наши Истории Успеха",
    [Language.Georgian]: "ჩვენი წარმატების ისტორიები"
  },
  "gallery.header.description": {
    [Language.Turkish]: "Hastalarımızın dönüşüm yolculuklarını ve memnuniyet verici sonuçlarını keşfedin.",
    [Language.English]: "Discover the transformation journeys and satisfying results of our patients.",
    [Language.Russian]: "Откройте для себя путь трансформации и удовлетворительные результаты наших пациентов.",
    [Language.Georgian]: "აღმოაჩინეთ ჩვენი პაციენტების ტრანსფორმაციის მოგზაურობები და დამაკმაყოფილებელი შედეგები."
  },
  "gallery.filter.all": {
    [Language.Turkish]: "Tümü",
    [Language.English]: "All",
    [Language.Russian]: "Все",
    [Language.Georgian]: "ყველა"
  },
  "gallery.filter.beforeAfter": {
    [Language.Turkish]: "Öncesi-Sonrası",
    [Language.English]: "Before-After",
    [Language.Russian]: "До-После",
    [Language.Georgian]: "მანამდე-მერე"
  },
  "gallery.filter.videos": {
    [Language.Turkish]: "Videolar",
    [Language.English]: "Videos",
    [Language.Russian]: "Видео",
    [Language.Georgian]: "ვიდეოები"
  },
  "gallery.filter.testimonials": {
    [Language.Turkish]: "Müşteri Yorumları",
    [Language.English]: "Testimonials",
    [Language.Russian]: "Отзывы",
    [Language.Georgian]: "გამოხმაურებები"
  },
  "gallery.filter.clinic": {
    [Language.Turkish]: "Klinik",
    [Language.English]: "Clinic",
    [Language.Russian]: "Клиника",
    [Language.Georgian]: "კლინიკა"
  },
  "gallery.filter.hairTransplant": {
    [Language.Turkish]: "Saç Ekimi",
    [Language.English]: "Hair Transplant",
    [Language.Russian]: "Трансплантация Волос",
    [Language.Georgian]: "თმის გადანერგვა"
  },
  "gallery.filter.beardTransplant": {
    [Language.Turkish]: "Sakal Ekimi",
    [Language.English]: "Beard Transplant",
    [Language.Russian]: "Трансплантация Бороды",
    [Language.Georgian]: "წვერის გადანერგვა"
  },
  "gallery.filter.eyebrowTransplant": {
    [Language.Turkish]: "Kaş Ekimi",
    [Language.English]: "Eyebrow Transplant",
    [Language.Russian]: "Трансплантация Бровей",
    [Language.Georgian]: "წარბების გადანერგვა"
  },
  "gallery.item.monthsAfter": {
    [Language.Turkish]: "ay sonra",
    [Language.English]: "months after",
    [Language.Russian]: "месяцев после",
    [Language.Georgian]: "თვის შემდეგ"
  },
  "gallery.item.viewDetails": {
    [Language.Turkish]: "Detayları Görüntüle",
    [Language.English]: "View Details",
    [Language.Russian]: "Посмотреть Детали",
    [Language.Georgian]: "დეტალების ნახვა"
  },
  "gallery.item.before": {
    [Language.Turkish]: "Öncesi",
    [Language.English]: "Before",
    [Language.Russian]: "До",
    [Language.Georgian]: "მანამდე"
  },
  "gallery.item.after": {
    [Language.Turkish]: "Sonrası",
    [Language.English]: "After",
    [Language.Russian]: "После",
    [Language.Georgian]: "მერე"
  },
  "gallery.noResults": {
    [Language.Turkish]: "Seçilen filtrelere uygun sonuç bulunamadı.",
    [Language.English]: "No results found for the selected filters.",
    [Language.Russian]: "Результатов для выбранных фильтров не найдено.",
    [Language.Georgian]: "არჩეული ფილტრებისთვის შედეგები არ მოიძებნა."
  },
  
  // ===========================================================================
  // PACKAGE PAGE
  // ===========================================================================
  
  "packages.title": {
    [Language.Turkish]: "Saç Ekimi Paketleri | MyHair Clinic",
    [Language.English]: "Hair Transplant Packages | MyHair Clinic",
    [Language.Russian]: "Пакеты Трансплантации Волос | MyHair Clinic",
    [Language.Georgian]: "თმის გადანერგვის პაკეტები | MyHair Clinic"
  },
  "packages.description": {
    [Language.Turkish]: "Saç ekimi, konaklama ve şehir turu dahil özel olarak hazırlanmış tüm dahil paketlerimizi keşfedin. Türkiye, Rusya, Azerbaycan ve diğer ülkelerden gelen hastalarımız için özel paketler.",
    [Language.English]: "Explore our specially prepared all-inclusive packages including hair transplantation, accommodation, and city tour. Special packages for our patients from Turkey, Russia, Azerbaijan, and other countries.",
    [Language.Russian]: "Изучите наши специально подготовленные пакеты «все включено», включающие трансплантацию волос, проживание и экскурсию по городу. Специальные пакеты для наших пациентов из Турции, России, Азербайджана и других стран.",
    [Language.Georgian]: "გაეცანით ჩვენს სპეციალურად მომზადებულ სრულ პაკეტებს, რომლებიც მოიცავს თმის გადანერგვას, საცხოვრებელს და ქალაქის ტურს. სპეციალური პაკეტები ჩვენი პაციენტებისთვის თურქეთიდან, რუსეთიდან, აზერბაიჯანიდან და სხვა ქვეყნებიდან."
  },
  "packages.header.title": {
    [Language.Turkish]: "Özel Saç Ekimi Seyahat Paketlerimiz",
    [Language.English]: "Our Special Hair Transplant Travel Packages",
    [Language.Russian]: "Наши Специальные Пакеты для Путешествия с Трансплантацией Волос",
    [Language.Georgian]: "ჩვენი სპეციალური თმის გადანერგვის სამოგზაურო პაკეტები"
  },
  "packages.header.description": {
    [Language.Turkish]: "MyHair Clinic olarak, saç ekimi operasyonunuzu konforlu bir seyahat deneyimiyle birleştiren özel paketler sunuyoruz. Her şey dahil paketlerimiz, tedavinizin yanı sıra konaklama, transfer ve şehir turu gibi avantajlar içerir.",
    [Language.English]: "At MyHair Clinic, we offer special packages that combine your hair transplant operation with a comfortable travel experience. Our all-inclusive packages include benefits such as accommodation, transfer, and city tour in addition to your treatment.",
    [Language.Russian]: "В MyHair Clinic мы предлагаем специальные пакеты, которые объединяют вашу операцию по трансплантации волос с комфортным путешествием. Наши пакеты «все включено» включают такие преимущества, как проживание, трансфер и экскурсия по городу в дополнение к вашему лечению.",
    [Language.Georgian]: "MyHair Clinic-ში ჩვენ გთავაზობთ სპეციალურ პაკეტებს, რომლებიც აერთიანებს თქვენს თმის გადანერგვის ოპერაციას კომფორტულ მოგზაურობასთან. ჩვენი სრული პაკეტები მოიცავს ისეთ უპირატესობებს, როგორიცაა საცხოვრებელი, ტრანსფერი და ქალაქის ტური თქვენი მკურნალობის გარდა."
  },
  "packages.filter.allCountries": {
    [Language.Turkish]: "Tüm Ülkeler",
    [Language.English]: "All Countries",
    [Language.Russian]: "Все Страны",
    [Language.Georgian]: "ყველა ქვეყანა"
  },
  "packages.detail.includes": {
    [Language.Turkish]: "Paket İçeriği",
    [Language.English]: "Package Includes",
    [Language.Russian]: "Пакет Включает",
    [Language.Georgian]: "პაკეტი მოიცავს"
  },
  "packages.detail.duration": {
    [Language.Turkish]: "Süre",
    [Language.English]: "Duration",
    [Language.Russian]: "Продолжительность",
    [Language.Georgian]: "ხანგრძლივობა"
  },
  "packages.detail.days": {
    [Language.Turkish]: "gün",
    [Language.English]: "days",
    [Language.Russian]: "дней",
    [Language.Georgian]: "დღე"
  },
  "packages.detail.itinerary": {
    [Language.Turkish]: "Program",
    [Language.English]: "Itinerary",
    [Language.Russian]: "Маршрут",
    [Language.Georgian]: "მარშრუტი"
  },
  "packages.detail.day": {
    [Language.Turkish]: "Gün",
    [Language.English]: "Day",
    [Language.Russian]: "День",
    [Language.Georgian]: "დღე"
  },
  "packages.detail.bookNow": {
    [Language.Turkish]: "Şimdi Rezervasyon Yap",
    [Language.English]: "Book Now",
    [Language.Russian]: "Забронировать Сейчас",
    [Language.Georgian]: "დაჯავშნეთ ახლავე"
  },
  "packages.detail.contactUs": {
    [Language.Turkish]: "Daha Fazla Bilgi İçin Bize Ulaşın",
    [Language.English]: "Contact Us for More Information",
    [Language.Russian]: "Свяжитесь с Нами для Получения Дополнительной Информации",
    [Language.Georgian]: "დაგვიკავშირდით მეტი ინფორმაციისთვის"
  },
  
  // ===========================================================================
  // SERVICE PAGE SPECIFIC
  // ===========================================================================
  
  "service.timeline.title": {
    [Language.Turkish]: "Tedavi Süreci",
    [Language.English]: "Treatment Process",
    [Language.Russian]: "Процесс Лечения",
    [Language.Georgian]: "მკურნალობის პროცესი"
  },
  "service.timeline.subtitle": {
    [Language.Turkish]: "Tedavi sürecimiz aşağıdaki adımlardan oluşur:",
    [Language.English]: "Our treatment process consists of the following steps:",
    [Language.Russian]: "Наш процесс лечения состоит из следующих этапов:",
    [Language.Georgian]: "ჩვენი მკურნალობის პროცესი შედგება შემდეგი ეტაპებისგან:"
  },
  "service.timeline.step": {
    [Language.Turkish]: "Adım",
    [Language.English]: "Step",
    [Language.Russian]: "Шаг",
    [Language.Georgian]: "ნაბიჯი"
  },
  "service.timeline.duration": {
    [Language.Turkish]: "Süre:",
    [Language.English]: "Duration:",
    [Language.Russian]: "Продолжительность:",
    [Language.Georgian]: "ხანგრძლივობა:"
  },
  "service.timeline.highlights": {
    [Language.Turkish]: "Önemli Noktalar:",
    [Language.English]: "Highlights:",
    [Language.Russian]: "Основные Моменты:",
    [Language.Georgian]: "მთავარი საკითხები:"
  },
  "service.faqs.title": {
    [Language.Turkish]: "Sık Sorulan Sorular",
    [Language.English]: "Frequently Asked Questions",
    [Language.Russian]: "Часто Задаваемые Вопросы",
    [Language.Georgian]: "ხშირად დასმული კითხვები"
  },
  "service.faqs.subtitle": {
    [Language.Turkish]: "Bu tedavi hakkında en çok sorulan soruları ve cevaplarını burada bulabilirsiniz.",
    [Language.English]: "Find the most commonly asked questions and answers about this treatment here.",
    [Language.Russian]: "Здесь вы найдете наиболее часто задаваемые вопросы и ответы об этом лечении.",
    [Language.Georgian]: "აქ შეგიძლიათ იპოვოთ ყველაზე ხშირად დასმული კითხვები და პასუხები ამ მკურნალობის შესახებ."
  },
  "service.faqs.searchPlaceholder": {
    [Language.Turkish]: "Soru ara...",
    [Language.English]: "Search questions...",
    [Language.Russian]: "Поиск вопросов...",
    [Language.Georgian]: "კითხვების ძიება..."
  },
  "service.faqs.allCategories": {
    [Language.Turkish]: "Tüm Kategoriler",
    [Language.English]: "All Categories",
    [Language.Russian]: "Все Категории",
    [Language.Georgian]: "ყველა კატეგორია"
  },
  "service.gallery.title": {
    [Language.Turkish]: "Öncesi ve Sonrası",
    [Language.English]: "Before and After",
    [Language.Russian]: "До и После",
    [Language.Georgian]: "მანამდე და შემდეგ"
  },
  "service.gallery.subtitle": {
    [Language.Turkish]: "Gerçek hastalarımızın öncesi ve sonrası fotoğrafları.",
    [Language.English]: "Before and after photos of our real patients.",
    [Language.Russian]: "Фотографии до и после наших реальных пациентов.",
    [Language.Georgian]: "ჩვენი რეალური პაციენტების ფოტოები მანამდე და შემდეგ."
  },
  "service.results.title": {
    [Language.Turkish]: "Sonuçlarımız",
    [Language.English]: "Our Results",
    [Language.Russian]: "Наши Результаты",
    [Language.Georgian]: "ჩვენი შედეგები"
  },
  "service.results.subtitle": {
    [Language.Turkish]: "İstatistiklerimiz ve başarılarımız",
    [Language.English]: "Our statistics and achievements",
    [Language.Russian]: "Наша статистика и достижения",
    [Language.Georgian]: "ჩვენი სტატისტიკა და მიღწევები"
  },
  "service.results.happyPatients": {
    [Language.Turkish]: "Mutlu Hasta",
    [Language.English]: "Happy Patients",
    [Language.Russian]: "Довольных Пациентов",
    [Language.Georgian]: "კმაყოფილი პაციენტები"
  },
  "service.results.successRate": {
    [Language.Turkish]: "Başarı Oranı",
    [Language.English]: "Success Rate",
    [Language.Russian]: "Показатель Успеха",
    [Language.Georgian]: "წარმატების განაკვეთი"
  },
  "service.results.yearsExperience": {
    [Language.Turkish]: "Yıllık Deneyim",
    [Language.English]: "Years Experience",
    [Language.Russian]: "Лет Опыта",
    [Language.Georgian]: "წლიანი გამოცდილება"
  },
  "service.results.internationalPatients": {
    [Language.Turkish]: "Uluslararası Hasta",
    [Language.English]: "International Patients",
    [Language.Russian]: "Международных Пациентов",
    [Language.Georgian]: "საერთაშორისო პაციენტები"
  },
  "service.cta.title": {
    [Language.Turkish]: "Ücretsiz Danışmanlık Alın",
    [Language.English]: "Get Free Consultation",
    [Language.Russian]: "Получите Бесплатную Консультацию",
    [Language.Georgian]: "მიიღეთ უფასო კონსულტაცია"
  },
  "service.cta.description": {
    [Language.Turkish]: "Saç ekimi konusunda sorularınız mı var? Deneyimli uzmanlarımızla ücretsiz danışmanlık randevusu alın.",
    [Language.English]: "Do you have questions about hair transplantation? Schedule a free consultation with our experienced specialists.",
    [Language.Russian]: "У вас есть вопросы о трансплантации волос? Запишитесь на бесплатную консультацию с нашими опытными специалистами.",
    [Language.Georgian]: "გაქვთ კითხვები თმის გადანერგვის შესახებ? დანიშნეთ უფასო კონსულტაცია ჩვენს გამოცდილ სპეციალისტებთან."
  },
  "service.cta.button": {
    [Language.Turkish]: "Randevu Alın",
    [Language.English]: "Make an Appointment",
    [Language.Russian]: "Записаться на Прием",
    [Language.Georgian]: "დანიშნეთ შეხვედრა"
  },
  "service.details.title": {
    [Language.Turkish]: "Tedavi Detayları",
    [Language.English]: "Treatment Details",
    [Language.Russian]: "Детали Лечения",
    [Language.Georgian]: "მკურნალობის დეტალები"
  },
  "service.details.duration": {
    [Language.Turkish]: "Süre",
    [Language.English]: "Duration",
    [Language.Russian]: "Продолжительность",
    [Language.Georgian]: "ხანგრძლივობა"
  },
  "service.details.minutes": {
    [Language.Turkish]: "dakika",
    [Language.English]: "minutes",
    [Language.Russian]: "минут",
    [Language.Georgian]: "წუთი"
  },
  "service.details.hours": {
    [Language.Turkish]: "saat",
    [Language.English]: "hours",
    [Language.Russian]: "часов",
    [Language.Georgian]: "საათი"
  },
  "service.details.overview": {
    [Language.Turkish]: "Genel Bakış",
    [Language.English]: "Overview",
    [Language.Russian]: "Обзор",
    [Language.Georgian]: "მიმოხილვა"
  },
  "service.details.procedure": {
    [Language.Turkish]: "Prosedür",
    [Language.English]: "Procedure",
    [Language.Russian]: "Процедура",
    [Language.Georgian]: "პროცედურა"
  },
  "service.details.candidateInfo": {
    [Language.Turkish]: "Aday Bilgisi",
    [Language.English]: "Candidate Info",
    [Language.Russian]: "Информация для Кандидатов",
    [Language.Georgian]: "კანდიდატის ინფორმაცია"
  },
  "service.details.aftercare": {
    [Language.Turkish]: "Bakım Sonrası",
    [Language.English]: "Aftercare",
    [Language.Russian]: "Послепроцедурный Уход",
    [Language.Georgian]: "პროცედურის შემდგომი მოვლა"
  },
  "service.reviews.title": {
    [Language.Turkish]: "Hasta Değerlendirmeleri",
    [Language.English]: "Patient Reviews",
    [Language.Russian]: "Отзывы Пациентов",
    [Language.Georgian]: "პაციენტების გამოხმაურებები"
  },
  "service.reviews.subtitle": {
    [Language.Turkish]: "Gerçek hastalarımızın deneyimleri hakkında ne söylediklerini okuyun",
    [Language.English]: "Read what our real patients say about their experiences",
    [Language.Russian]: "Прочитайте, что говорят наши реальные пациенты о своем опыте",
    [Language.Georgian]: "წაიკითხეთ, რას ამბობენ ჩვენი რეალური პაციენტები თავიანთი გამოცდილების შესახებ"
  },
  "service.reviews.writeReview": {
    [Language.Turkish]: "Değerlendirme Yazın",
    [Language.English]: "Write a Review",
    [Language.Russian]: "Написать Отзыв",
    [Language.Georgian]: "დაწერეთ გამოხმაურება"
  },
  "service.reviews.verified": {
    [Language.Turkish]: "Doğrulanmış Hasta",
    [Language.English]: "Verified Patient",
    [Language.Russian]: "Проверенный Пациент",
    [Language.Georgian]: "დადასტურებული პაციენტი"
  },
  "service.reviews.noReviews": {
    [Language.Turkish]: "Bu tedavi için henüz değerlendirme yok. İlk değerlendirmeyi siz yapın!",
    [Language.English]: "No reviews yet for this treatment. Be the first to leave a review!",
    [Language.Russian]: "Пока нет отзывов об этом лечении. Будьте первым, кто оставит отзыв!",
    [Language.Georgian]: "ჯერ არ არის გამოხმაურებები ამ მკურნალობისთვის. იყავით პირველი, ვინც დატოვებს გამოხმაურებას!"
  },
  "service.reviews.form.title": {
    [Language.Turkish]: "Değerlendirmenizi Yazın",
    [Language.English]: "Write Your Review",
    [Language.Russian]: "Напишите Свой Отзыв",
    [Language.Georgian]: "დაწერეთ თქვენი გამოხმაურება"
  },
  "service.reviews.form.rating": {
    [Language.Turkish]: "Puanınız",
    [Language.English]: "Your Rating",
    [Language.Russian]: "Ваша Оценка",
    [Language.Georgian]: "თქვენი შეფასება"
  },
  "service.reviews.form.name": {
    [Language.Turkish]: "Adınız",
    [Language.English]: "Your Name",
    [Language.Russian]: "Ваше Имя",
    [Language.Georgian]: "თქვენი სახელი"
  },
  "service.reviews.form.email": {
    [Language.Turkish]: "E-posta Adresiniz",
    [Language.English]: "Your Email",
    [Language.Russian]: "Ваш Email",
    [Language.Georgian]: "თქვენი ელფოსტა"
  },
  "service.reviews.form.review": {
    [Language.Turkish]: "Değerlendirmeniz",
    [Language.English]: "Your Review",
    [Language.Russian]: "Ваш Отзыв",
    [Language.Georgian]: "თქვენი გამოხმაურება"
  },
  "service.reviews.form.submit": {
    [Language.Turkish]: "Değerlendirme Gönder",
    [Language.English]: "Submit Review",
    [Language.Russian]: "Отправить Отзыв",
    [Language.Georgian]: "გამოხმაურების გაგზავნა"
  },
  
  // ===========================================================================
  // ADMIN INTERFACE  
  // ===========================================================================

  "admin.settings.saveSuccess.title": {
    [Language.Turkish]: "Ayarlar kaydedildi",
    [Language.English]: "Settings saved",
    [Language.Russian]: "Настройки сохранены",
    [Language.Georgian]: "პარამეტრები შენახულია"
  },
  "admin.settings.saveSuccess.description": {
    [Language.Turkish]: "{section} ayarları başarıyla kaydedildi",
    [Language.English]: "{section} settings saved successfully",
    [Language.Russian]: "Настройки {section} успешно сохранены",
    [Language.Georgian]: "{section} პარამეტრები წარმატებით შეინახა"
  },
  "admin.settings.saveError.title": {
    [Language.Turkish]: "Hata",
    [Language.English]: "Error",
    [Language.Russian]: "Ошибка",
    [Language.Georgian]: "შეცდომა"
  },
  "admin.settings.saveError.description": {
    [Language.Turkish]: "{section} ayarları kaydedilirken bir hata oluştu",
    [Language.English]: "An error occurred while saving {section} settings",
    [Language.Russian]: "Произошла ошибка при сохранении настроек {section}",
    [Language.Georgian]: "შეცდომა მოხდა {section} პარამეტრების შენახვისას"
  },
  
  "admin.login.title": {
    [Language.Turkish]: "Admin Girişi",
    [Language.English]: "Admin Login",
    [Language.Russian]: "Вход для Администратора",
    [Language.Georgian]: "ადმინის შესვლა"
  },
  "admin.login.username": {
    [Language.Turkish]: "Kullanıcı Adı",
    [Language.English]: "Username",
    [Language.Russian]: "Имя пользователя",
    [Language.Georgian]: "მომხმარებლის სახელი"
  },
  "admin.login.password": {
    [Language.Turkish]: "Şifre",
    [Language.English]: "Password",
    [Language.Russian]: "Пароль",
    [Language.Georgian]: "პაროლი"
  },
  "admin.login.submit": {
    [Language.Turkish]: "Giriş Yap",
    [Language.English]: "Login",
    [Language.Russian]: "Войти",
    [Language.Georgian]: "შესვლა"
  },
  "admin.dashboard.title": {
    [Language.Turkish]: "Yönetim Paneli",
    [Language.English]: "Admin Dashboard",
    [Language.Russian]: "Панель Администратора",
    [Language.Georgian]: "ადმინ პანელი"
  },
  "admin.dashboard.appointments": {
    [Language.Turkish]: "Randevular",
    [Language.English]: "Appointments",
    [Language.Russian]: "Встречи",
    [Language.Georgian]: "შეხვედრები"
  },
  "admin.dashboard.patients": {
    [Language.Turkish]: "Hastalar",
    [Language.English]: "Patients",
    [Language.Russian]: "Пациенты",
    [Language.Georgian]: "პაციენტები"
  },
  "admin.dashboard.services": {
    [Language.Turkish]: "Hizmetler",
    [Language.English]: "Services",
    [Language.Russian]: "Услуги",
    [Language.Georgian]: "სერვისები"
  },
  "admin.dashboard.packages": {
    [Language.Turkish]: "Paketler",
    [Language.English]: "Packages",
    [Language.Russian]: "Пакеты",
    [Language.Georgian]: "პაკეტები"
  },
  "admin.dashboard.blog": {
    [Language.Turkish]: "Blog",
    [Language.English]: "Blog",
    [Language.Russian]: "Блог",
    [Language.Georgian]: "ბლოგი"
  },
  "admin.dashboard.gallery": {
    [Language.Turkish]: "Galeri",
    [Language.English]: "Gallery",
    [Language.Russian]: "Галерея",
    [Language.Georgian]: "გალერეა"
  },
  "admin.dashboard.settings": {
    [Language.Turkish]: "Ayarlar",
    [Language.English]: "Settings",
    [Language.Russian]: "Настройки",
    [Language.Georgian]: "პარამეტრები"
  },
  "admin.dashboard.logout": {
    [Language.Turkish]: "Çıkış Yap",
    [Language.English]: "Logout",
    [Language.Russian]: "Выход",
    [Language.Georgian]: "გასვლა"
  },
  
  // ===========================================================================
  // ERRORS & MISC
  // ===========================================================================
  
  "errors.loading_services": {
    [Language.Turkish]: "Hizmetler yüklenirken bir hata oluştu",
    [Language.English]: "An error occurred while loading services",
    [Language.Russian]: "Произошла ошибка при загрузке услуг",
    [Language.Georgian]: "სერვისების ჩატვირთვისას მოხდა შეცდომა"
  },
  "error.somethingWentWrong": {
    [Language.Turkish]: "Bir şeyler yanlış gitti",
    [Language.English]: "Something went wrong",
    [Language.Russian]: "Что-то пошло не так",
    [Language.Georgian]: "რაღაც შეცდომა მოხდა"
  },
  "common.tryAgain": {
    [Language.Turkish]: "Tekrar Dene",
    [Language.English]: "Try Again",
    [Language.Russian]: "Попробовать снова",
    [Language.Georgian]: "სცადეთ ახლიდან"
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
  "All": {
    [Language.Turkish]: "Tümü",
    [Language.English]: "All",
    [Language.Russian]: "Все",
    [Language.Georgian]: "ყველა"
  },
  "Start": {
    [Language.Turkish]: "Başlangıç",
    [Language.English]: "Start",
    [Language.Russian]: "Начало",
    [Language.Georgian]: "დაწყება"
  }
};

// Type for the hook's return
interface UseTranslationOutput {
  t: (key: string) => string | undefined;
  formatCurrency: (value: number) => string;
  formatDate: (date: Date | string) => string;
}

// Hook to get translations based on the current language
export function useTranslation(language: Language): UseTranslationOutput {
  return {
    t: (key: string) => {
      const translation = translations[key];
      
      if (!translation) {
        console.warn(`Translation missing for key: "${key}"`);
        return undefined;
      }
      
      return translation[language];
    },
    
    // Format number as currency according to the current language
    formatCurrency: (value: number) => {
      const formatter = new Intl.NumberFormat(
        language === Language.Turkish ? 'tr-TR' : 
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
