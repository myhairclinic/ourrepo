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
