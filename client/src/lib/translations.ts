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
  // Why Choose Us section
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
    [Language.Russian]: "Естественные и постоянные результаты с новейшими методами DHI и FUE",
    [Language.Georgian]: "ბუნებრივი და მუდმივი შედეგები უახლესი DHI და FUE ტექნიკით"
  },
  "home.whyChooseUs.international.title": {
    [Language.Turkish]: "Uluslararası Merkez",
    [Language.English]: "International Center",
    [Language.Russian]: "Международный Центр",
    [Language.Georgian]: "საერთაშორისო ცენტრი"
  },
  "home.whyChooseUs.international.description": {
    [Language.Turkish]: "Dünyanın dört bir yanından gelen hastaları ağırlayan çok dilli ekip",
    [Language.English]: "Multilingual team hosting patients from all around the world",
    [Language.Russian]: "Многоязычная команда, принимающая пациентов со всего мира",
    [Language.Georgian]: "მრავალენოვანი გუნდი, რომელიც მასპინძლობს პაციენტებს მთელი მსოფლიოდან"
  },
  "home.whyChooseUs.care.title": {
    [Language.Turkish]: "Kişiselleştirilmiş Bakım",
    [Language.English]: "Personalized Care",
    [Language.Russian]: "Персонализированный Уход",
    [Language.Georgian]: "პერსონალიზებული ზრუნვა"
  },
  "home.whyChooseUs.care.description": {
    [Language.Turkish]: "Her hastanın ihtiyaçlarına göre özelleştirilmiş tedavi ve bakım planları",
    [Language.English]: "Treatment and care plans customized according to each patient's needs",
    [Language.Russian]: "Планы лечения и ухода, адаптированные к потребностям каждого пациента",
    [Language.Georgian]: "მკურნალობისა და მოვლის გეგმები, რომლებიც მორგებულია თითოეული პაციენტის საჭიროებებზე"
  },

  // Patient Journey section
  "home.patientJourney.title": {
    [Language.Turkish]: "Hasta Yolculuğu",
    [Language.English]: "Patient Journey",
    [Language.Russian]: "Путь Пациента",
    [Language.Georgian]: "პაციენტის მოგზაურობა"
  },
  "home.patientJourney.subtitle": {
    [Language.Turkish]: "Saç ekimi sürecinde adım adım sizinle birlikteyiz",
    [Language.English]: "We are with you step by step in the hair transplantation process",
    [Language.Russian]: "Мы с вами шаг за шагом в процессе трансплантации волос",
    [Language.Georgian]: "ჩვენ თქვენთან ერთად ვართ ნაბიჯ-ნაბიჯ თმის გადანერგვის პროცესში"
  },
  "home.patientJourney.steps.consultation.title": {
    [Language.Turkish]: "İlk Konsültasyon",
    [Language.English]: "Initial Consultation",
    [Language.Russian]: "Первичная Консультация",
    [Language.Georgian]: "საწყისი კონსულტაცია"
  },
  "home.patientJourney.steps.consultation.description": {
    [Language.Turkish]: "Online görüşme ile saç kaybınızın değerlendirilmesi ve kişisel tedavi planı oluşturulması.",
    [Language.English]: "Assessment of your hair loss and creation of a personalized treatment plan via online meeting.",
    [Language.Russian]: "Оценка выпадения волос и создание персонализированного плана лечения через онлайн-встречу.",
    [Language.Georgian]: "თქვენი თმის ცვენის შეფასება და პერსონალიზებული მკურნალობის გეგმის შექმნა ონლაინ შეხვედრის საშუალებით."
  },
  "home.patientJourney.steps.scheduling.title": {
    [Language.Turkish]: "Randevu Planlaması",
    [Language.English]: "Appointment Scheduling",
    [Language.Russian]: "Планирование Приема",
    [Language.Georgian]: "შეხვედრის დაგეგმვა"
  },
  "home.patientJourney.steps.scheduling.description": {
    [Language.Turkish]: "Size en uygun tarihin belirlenmesi ve operasyon için randevunun oluşturulması.",
    [Language.English]: "Determining the most suitable date for you and creating an appointment for the operation.",
    [Language.Russian]: "Определение наиболее подходящей для вас даты и создание записи на операцию.",
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
    [Language.English]: "Upon your arrival in Georgia, special transfer service from the airport to the clinic or your hotel.",
    [Language.Russian]: "По прибытии в Грузию, специальная служба трансфера из аэропорта в клинику или ваш отель.",
    [Language.Georgian]: "საქართველოში ჩასვლისას, სპეციალური ტრანსფერის სერვისი აეროპორტიდან კლინიკაში ან თქვენს სასტუმროში."
  },
  "home.patientJourney.steps.preOp.title": {
    [Language.Turkish]: "Operasyon Öncesi Değerlendirme",
    [Language.English]: "Pre-Operation Evaluation",
    [Language.Russian]: "Предоперационная Оценка",
    [Language.Georgian]: "პრე-ოპერაციული შეფასება"
  },
  "home.patientJourney.steps.preOp.description": {
    [Language.Turkish]: "Yüz yüze konsültasyon, saç çizgisi tasarımı ve operasyon öncesi son hazırlıklar.",
    [Language.English]: "Face-to-face consultation, hairline design, and final preparations before the operation.",
    [Language.Russian]: "Консультация лицом к лицу, дизайн линии роста волос и окончательная подготовка перед операцией.",
    [Language.Georgian]: "პირისპირ კონსულტაცია, თმის ხაზის დიზაინი და საბოლოო მომზადება ოპერაციამდე."
  },
  "home.patientJourney.steps.procedure.title": {
    [Language.Turkish]: "Saç Ekimi İşlemi",
    [Language.English]: "Hair Transplantation Procedure",
    [Language.Russian]: "Процедура Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის პროცედურა"
  },
  "home.patientJourney.steps.procedure.description": {
    [Language.Turkish]: "Konforlu bir ortamda DHI veya FUE yöntemiyle saç ekimi operasyonunun gerçekleştirilmesi.",
    [Language.English]: "Performing the hair transplantation operation with DHI or FUE method in a comfortable environment.",
    [Language.Russian]: "Проведение операции по трансплантации волос методом DHI или FUE в комфортной обстановке.",
    [Language.Georgian]: "თმის გადანერგვის ოპერაციის ჩატარება DHI ან FUE მეთოდით კომფორტულ გარემოში."
  },
  "home.patientJourney.steps.postOp.title": {
    [Language.Turkish]: "Operasyon Sonrası Bakım",
    [Language.English]: "Post-Operation Care",
    [Language.Russian]: "Послеоперационный Уход",
    [Language.Georgian]: "პოსტ-ოპერაციული მოვლა"
  },
  "home.patientJourney.steps.postOp.description": {
    [Language.Turkish]: "İlk gün sonrası kontrolü ve detaylı bakım talimatlarının verilmesi.",
    [Language.English]: "First day follow-up check and providing detailed care instructions.",
    [Language.Russian]: "Проверка на следующий день и предоставление подробных инструкций по уходу.",
    [Language.Georgian]: "პირველი დღის შემდგომი შემოწმება და დეტალური მოვლის ინსტრუქციების მიწოდება."
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
    [Language.Russian]: "Возможность открыть для себя красоты Тбилиси и экскурсия по городу во время процесса восстановления.",
    [Language.Georgian]: "თბილისის სილამაზის აღმოჩენის შესაძლებლობა და ქალაქის ტური აღდგენის პროცესში."
  },
  "home.patientJourney.steps.followUp.title": {
    [Language.Turkish]: "Uzun Dönem Takip",
    [Language.English]: "Long-Term Follow-Up",
    [Language.Russian]: "Долгосрочное Наблюдение",
    [Language.Georgian]: "გრძელვადიანი მონიტორინგი"
  },
  "home.patientJourney.steps.followUp.description": {
    [Language.Turkish]: "Ülkenize döndükten sonra düzenli online kontroller ve süreç takibi.",
    [Language.English]: "Regular online checks and process monitoring after returning to your country.",
    [Language.Russian]: "Регулярные онлайн-проверки и мониторинг процесса после возвращения в вашу страну.",
    [Language.Georgian]: "რეგულარული ონლაინ შემოწმებები და პროცესის მონიტორინგი თქვენს ქვეყანაში დაბრუნების შემდეგ."
  },
  "home.patientJourney.satisfaction": {
    [Language.Turkish]: "98% Hasta Memnuniyeti",
    [Language.English]: "98% Patient Satisfaction",
    [Language.Russian]: "98% Удовлетворенность Пациентов",
    [Language.Georgian]: "98% პაციენტთა კმაყოფილება"
  },
  "home.patientJourney.cta.description": {
    [Language.Turkish]: "Saç ekimi yolculuğunuza ilk adımı atmak ve ücretsiz olarak değerlendirme almak için hemen bize ulaşın. Uzmanlarımız sizinle ilgilenecektir.",
    [Language.English]: "Contact us now to take the first step in your hair transplantation journey and get a free evaluation. Our experts will assist you.",
    [Language.Russian]: "Свяжитесь с нами сейчас, чтобы сделать первый шаг в вашем путешествии по трансплантации волос и получить бесплатную оценку. Наши эксперты вам помогут.",
    [Language.Georgian]: "დაგვიკავშირდით ახლავე, რომ გადადგათ პირველი ნაბიჯი თქვენი თმის გადანერგვის მოგზაურობაში და მიიღოთ უფასო შეფასება. ჩვენი ექსპერტები დაგეხმარებიან."
  },
  "home.patientJourney.cta.button": {
    [Language.Turkish]: "Ücretsiz Danışma Randevusu Alın",
    [Language.English]: "Get a Free Consultation Appointment",
    [Language.Russian]: "Получите Бесплатную Консультацию",
    [Language.Georgian]: "მიიღეთ უფასო კონსულტაცია"
  },
  
  // Expert Section
  "home.expertSection.title": {
    [Language.Turkish]: "Saç Ekimi Uzmanları",
    [Language.English]: "Hair Transplantation Experts",
    [Language.Russian]: "Эксперты по Трансплантации Волос",
    [Language.Georgian]: "თმის გადანერგვის ექსპერტები"
  },
  "home.expertSection.subtitle": {
    [Language.Turkish]: "MyHair Clinic'in deneyimli ve uzman kadrosuyla tanışın",
    [Language.English]: "Meet the experienced and expert team of MyHair Clinic",
    [Language.Russian]: "Познакомьтесь с опытной и экспертной командой клиники MyHair",
    [Language.Georgian]: "გაიცანით MyHair კლინიკის გამოცდილი და ექსპერტული გუნდი"
  },
  "home.expertSection.stats.years": {
    [Language.Turkish]: "Yıllık Deneyim",
    [Language.English]: "Years of Experience",
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
    [Language.Russian]: "Экспертная Оценка",
    [Language.Georgian]: "ექსპერტული შეფასება"
  },
  "home.expertSection.features.technique.title": {
    [Language.Turkish]: "İleri DHI ve FUE Teknikleri",
    [Language.English]: "Advanced DHI and FUE Techniques",
    [Language.Russian]: "Продвинутые Техники DHI и FUE",
    [Language.Georgian]: "უახლესი DHI და FUE ტექნიკები"
  },
  "home.expertSection.features.technique.description": {
    [Language.Turkish]: "Doğal görünümlü sonuçlar için son teknoloji yöntemler kullanıyoruz.",
    [Language.English]: "We use state-of-the-art methods for natural-looking results.",
    [Language.Russian]: "Мы используем современные методы для естественно выглядящих результатов.",
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
    [Language.English]: "Special anesthesia protocol providing comfort and minimal discomfort.",
    [Language.Russian]: "Специальный протокол анестезии, обеспечивающий комфорт и минимальный дискомфорт.",
    [Language.Georgian]: "სპეციალური ანესთეზიის პროტოკოლი, რომელიც უზრუნველყოფს კომფორტს და მინიმალურ დისკომფორტს."
  },
  "home.expertSection.features.natural.title": {
    [Language.Turkish]: "Doğal Saç Çizgisi Tasarımı",
    [Language.English]: "Natural Hairline Design",
    [Language.Russian]: "Естественный Дизайн Линии Роста Волос",
    [Language.Georgian]: "ბუნებრივი თმის ხაზის დიზაინი"
  },
  "home.expertSection.features.natural.description": {
    [Language.Turkish]: "Yüz şeklinize ve yaşınıza uygun kişiselleştirilmiş ve doğal görünümlü tasarım.",
    [Language.English]: "Personalized and natural-looking design suitable for your face shape and age.",
    [Language.Russian]: "Индивидуальный и естественно выглядящий дизайн, подходящий для формы вашего лица и возраста.",
    [Language.Georgian]: "პერსონალიზებული და ბუნებრივი გარეგნობის დიზაინი, რომელიც შეესაბამება თქვენი სახის ფორმას და ასაკს."
  },
  "home.expertSection.consultationCta": {
    [Language.Turkish]: "Ücretsiz Konsültasyon Alın",
    [Language.English]: "Get a Free Consultation",
    [Language.Russian]: "Получить Бесплатную Консультацию",
    [Language.Georgian]: "მიიღეთ უფასო კონსულტაცია"
  },
  "home.expertSection.quote": {
    [Language.Turkish]: "MyHair Clinic'te her hasta için kişiselleştirilmiş yaklaşım sunuyoruz. Amacımız sadece saç ekimi yapmak değil, hastalarımızın özgüvenlerini yeniden kazanmalarına yardımcı olmaktır.",
    [Language.English]: "At MyHair Clinic, we offer a personalized approach for each patient. Our goal is not just to perform hair transplantation, but to help our patients regain their self-confidence.",
    [Language.Russian]: "В клинике MyHair мы предлагаем индивидуальный подход к каждому пациенту. Наша цель не просто провести трансплантацию волос, а помочь нашим пациентам вернуть уверенность в себе.",
    [Language.Georgian]: "MyHair კლინიკაში ჩვენ გთავაზობთ პერსონალიზებულ მიდგომას თითოეული პაციენტისთვის. ჩვენი მიზანია არა მხოლოდ თმის გადანერგვა, არამედ პაციენტების დახმარება თვითრწმენის დაბრუნებაში."
  },
  
  // Location Section
  "home.location.weekdaysLabel": {
    [Language.Turkish]: "Pazartesi - Cumartesi",
    [Language.English]: "Monday - Saturday",
    [Language.Russian]: "Понедельник - Суббота",
    [Language.Georgian]: "ორშაბათი - შაბათი"
  },
  
  // Other sections
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