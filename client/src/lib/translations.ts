import { Language } from "@shared/types";

// Çeviri nesnesinde her dil kodu için karşılık gelen çeviriler tanımlanır
type TranslationsDict = {
  [key in Language]: Record<string, any>;
};

// Belirli bir çeviri anahtarı için dile göre çeviriyi döndüren yardımcı fonksiyon
export function getTranslation(key: string, language: Language): any {
  const keys = key.split('.');
  let current = translations[language];
  
  // Navigate through nested keys
  for (let i = 0; i < keys.length; i++) {
    if (!current || typeof current !== 'object' || !(keys[i] in current)) {
      return key;
    }
    current = current[keys[i]];
  }
  
  return current;
}

// Uygulamadaki tüm çeviriler
export const translations: TranslationsDict = {
  [Language.Turkish]: {
    // Genel metin
    app_name: "MyHair Clinic",
    slogan: "Tiflis'te Profesyonel Saç Ekimi",
    learn_more: "Detaylı Bilgi",
    
    // Navigasyon
    nav_home: "Ana Sayfa",
    nav_services: "Hizmetlerimiz",
    nav_packages: "Paketler",
    nav_gallery: "Galeri",
    nav_blog: "Blog",
    nav_about: "Hakkımızda",
    nav_contact: "İletişim",
    nav_appointment: "Randevu Al",
    
    // Ana sayfa
    home_hero_title: "Güçlü ve Doğal Saçlara Kavuşun",
    home_hero_subtitle: "Tiflis'in lider saç ekimi ve estetik merkezine hoş geldiniz",
    home_hero_cta: "Ücretsiz Danışmanlık",
    
    // Hizmetler
    our_services: "Hizmetlerimiz",
    service_subtitle: "Uzman kadromuz ve son teknoloji ile sunduğumuz hizmetlerimiz",
    error_loading_services: "Hizmetler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    
    // Genel form alanları
    common: {
      name: "Ad",
      surname: "Soyad",
      email: "E-posta",
      phoneNumber: "Telefon Numarası",
      message: "Mesaj",
      selectService: "Hizmet Seçin",
      consentText: "Kişisel verilerimin işlenmesini ve benimle iletişim kurulmasını kabul ediyorum",
      bookAppointment: "Randevu Al",
    },
    
    // Ana sayfa randevu bölümü
    home: {
      appointment: {
        namePlaceholder: "Adınız ve soyadınız",
        emailPlaceholder: "E-posta adresiniz",
        phonePlaceholder: "Telefon numaranız",
        servicePlaceholder: "Hizmet seçin",
        messagePlaceholder: "Bize sormak istedikleriniz..."
      }
    },
    
    // Randevu sayfası
    appointment: {
      title: "Randevu Al",
      description: "Uzmanlarımız tarafından saç ekimi ve estetik prosedürler hakkında ücretsiz danışmanlık alın",
      formTitle: "Randevu Formu",
      formDescription: "Aşağıdaki formu doldurarak ücretsiz danışmanlık için randevu alabilirsiniz. En kısa sürede sizinle iletişime geçeceğiz.",
      preferredDate: "Tercih Ettiğiniz Tarih",
      sending: "Gönderiliyor...",
      success: "Randevunuz Oluşturuldu",
      successMessage: "Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      error: "Hata Oluştu",
      errorMessage: "Randevu oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      localPatients: "Yerel Hastalar İçin",
      localInfo1: "Tiflis içinden gelecek hastalarımız için kolay randevu süreci sunuyoruz.",
      localInfo2: "Yerel hastalarımıza sağladığımız avantajlar:",
      localPoint1: "Aynı gün konsültasyon imkanı",
      localPoint2: "Ücretsiz saç analizi",
      localPoint3: "Esnek randevu saatleri",
      internationalPatients: "Uluslararası Hastalar İçin",
      internationalInfo1: "Tiflis dışından gelecek hastalarımız için özel hizmetler sunuyoruz.",
      internationalInfo2: "Uluslararası hastalarımıza sunduğumuz hizmetler:",
      internationalPoint1: "Havalimanı transferi",
      internationalPoint2: "Konaklama desteği",
      internationalPoint3: "Çeviri ve tercüman hizmeti"
    },

    // Diğer metinler...
  },
  [Language.English]: {
    // General
    app_name: "MyHair Clinic",
    slogan: "Professional Hair Transplant in Tbilisi",
    learn_more: "Learn More",
    
    // Navigation
    nav_home: "Home",
    nav_services: "Services",
    nav_packages: "Packages",
    nav_gallery: "Gallery",
    nav_blog: "Blog",
    nav_about: "About",
    nav_contact: "Contact",
    nav_appointment: "Book Appointment",
    
    // Home page
    home_hero_title: "Get Strong and Natural Hair",
    home_hero_subtitle: "Welcome to the leading hair transplant and aesthetic center in Tbilisi",
    home_hero_cta: "Free Consultation",
    
    // Services
    our_services: "Our Services",
    service_subtitle: "Services we provide with our expert team and latest technology",
    error_loading_services: "An error occurred while loading services. Please try again later.",
    
    // Common form fields
    common: {
      name: "Name",
      surname: "Surname",
      email: "Email",
      phoneNumber: "Phone Number",
      message: "Message",
      selectService: "Select Service",
      consentText: "I agree to the processing of my personal data and to be contacted",
      bookAppointment: "Book Appointment",
    },
    
    // Home page appointment section
    home: {
      appointment: {
        namePlaceholder: "Your full name",
        emailPlaceholder: "Your email address",
        phonePlaceholder: "Your phone number",
        servicePlaceholder: "Select a service",
        messagePlaceholder: "Your questions or requests..."
      }
    },
    
    // Appointment page
    appointment: {
      title: "Book an Appointment",
      description: "Get free consultation about hair transplantation and aesthetic procedures by our experts",
      formTitle: "Appointment Form",
      formDescription: "Fill out the form below to book a free consultation. We will contact you as soon as possible.",
      preferredDate: "Preferred Date",
      sending: "Sending...",
      success: "Appointment Created",
      successMessage: "Your appointment request has been successfully received. We will contact you soon.",
      error: "Error Occurred",
      errorMessage: "An error occurred while creating your appointment. Please try again later.",
      localPatients: "For Local Patients",
      localInfo1: "We offer an easy appointment process for our patients from Tbilisi.",
      localInfo2: "Benefits we provide to our local patients:",
      localPoint1: "Same-day consultation opportunity",
      localPoint2: "Free hair analysis",
      localPoint3: "Flexible appointment hours",
      internationalPatients: "For International Patients",
      internationalInfo1: "We provide special services for our patients coming from outside Tbilisi.",
      internationalInfo2: "Services we offer to our international patients:",
      internationalPoint1: "Airport transfer",
      internationalPoint2: "Accommodation support",
      internationalPoint3: "Translation and interpreter service"
    },
    
    // Other translations...
  },
  [Language.Russian]: {
    // Общие
    app_name: "MyHair Clinic",
    slogan: "Профессиональная трансплантация волос в Тбилиси",
    learn_more: "Подробнее",
    
    // Навигация
    nav_home: "Главная",
    nav_services: "Услуги",
    nav_packages: "Пакеты",
    nav_gallery: "Галерея",
    nav_blog: "Блог",
    nav_about: "О нас",
    nav_contact: "Контакты",
    nav_appointment: "Записаться",
    
    // Главная страница
    home_hero_title: "Получите крепкие и натуральные волосы",
    home_hero_subtitle: "Добро пожаловать в ведущий центр трансплантации волос и эстетики в Тбилиси",
    home_hero_cta: "Бесплатная консультация",
    
    // Услуги
    our_services: "Наши услуги",
    service_subtitle: "Услуги, которые мы предоставляем с нашей командой экспертов и новейшими технологиями",
    error_loading_services: "Произошла ошибка при загрузке услуг. Пожалуйста, повторите попытку позже.",
    
    // Общие поля формы
    common: {
      name: "Имя",
      surname: "Фамилия",
      email: "Эл. почта",
      phoneNumber: "Номер телефона",
      message: "Сообщение",
      selectService: "Выберите услугу",
      consentText: "Я согласен на обработку моих персональных данных и на то, чтобы со мной связались",
      bookAppointment: "Записаться на прием",
    },
    
    // Раздел записи на главной странице
    home: {
      appointment: {
        namePlaceholder: "Ваше полное имя",
        emailPlaceholder: "Ваш адрес эл. почты",
        phonePlaceholder: "Ваш номер телефона",
        servicePlaceholder: "Выберите услугу",
        messagePlaceholder: "Ваши вопросы или пожелания..."
      }
    },
    
    // Страница записи на прием
    appointment: {
      title: "Записаться на прием",
      description: "Получите бесплатную консультацию по трансплантации волос и эстетическим процедурам от наших экспертов",
      formTitle: "Форма записи",
      formDescription: "Заполните форму ниже, чтобы записаться на бесплатную консультацию. Мы свяжемся с вами в ближайшее время.",
      preferredDate: "Предпочтительная дата",
      sending: "Отправка...",
      success: "Запись создана",
      successMessage: "Ваша заявка на прием успешно получена. Мы свяжемся с вами в ближайшее время.",
      error: "Произошла ошибка",
      errorMessage: "Произошла ошибка при создании записи. Пожалуйста, попробуйте позже.",
      localPatients: "Для местных пациентов",
      localInfo1: "Мы предлагаем простой процесс записи для наших пациентов из Тбилиси.",
      localInfo2: "Преимущества, которые мы предоставляем нашим местным пациентам:",
      localPoint1: "Возможность консультации в тот же день",
      localPoint2: "Бесплатный анализ волос",
      localPoint3: "Гибкие часы приема",
      internationalPatients: "Для иностранных пациентов",
      internationalInfo1: "Мы предоставляем особые услуги для наших пациентов, приезжающих из-за пределов Тбилиси.",
      internationalInfo2: "Услуги, которые мы предлагаем нашим иностранным пациентам:",
      internationalPoint1: "Трансфер из аэропорта",
      internationalPoint2: "Поддержка с размещением",
      internationalPoint3: "Услуги перевода и переводчика"
    },
    
    // Другие переводы...
  },
  [Language.Georgian]: {
    // ზოგადი
    app_name: "MyHair Clinic",
    slogan: "პროფესიონალური თმის გადანერგვა თბილისში",
    learn_more: "მეტის ნახვა",
    
    // ნავიგაცია
    nav_home: "მთავარი",
    nav_services: "სერვისები",
    nav_packages: "პაკეტები",
    nav_gallery: "გალერეა",
    nav_blog: "ბლოგი",
    nav_about: "ჩვენს შესახებ",
    nav_contact: "კონტაქტი",
    nav_appointment: "ჩაწერა",
    
    // მთავარი გვერდი
    home_hero_title: "მიიღეთ ძლიერი და ბუნებრივი თმა",
    home_hero_subtitle: "მოგესალმებით თბილისის წამყვან თმის გადანერგვისა და ესთეტიკის ცენტრში",
    home_hero_cta: "უფასო კონსულტაცია",
    
    // სერვისები
    our_services: "ჩვენი სერვისები",
    service_subtitle: "მომსახურება, რომელსაც ვაწვდით ჩვენი ექსპერტებისა და უახლესი ტექნოლოგიებით",
    error_loading_services: "სერვისების ჩატვირთვისას მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.",
    
    // ზოგადი ფორმის ველები
    common: {
      name: "სახელი",
      surname: "გვარი",
      email: "ელ-ფოსტა",
      phoneNumber: "ტელეფონის ნომერი",
      message: "შეტყობინება",
      selectService: "აირჩიეთ სერვისი",
      consentText: "ვეთანხმები ჩემი პირადი მონაცემების დამუშავებას და ჩემთან დაკავშირებას",
      bookAppointment: "ჩაწერა",
    },
    
    // მთავარი გვერდის ჩაწერის სექცია
    home: {
      appointment: {
        namePlaceholder: "თქვენი სრული სახელი",
        emailPlaceholder: "თქვენი ელ-ფოსტის მისამართი",
        phonePlaceholder: "თქვენი ტელეფონის ნომერი",
        servicePlaceholder: "აირჩიეთ სერვისი",
        messagePlaceholder: "თქვენი შეკითხვები ან მოთხოვნები..."
      }
    },
    
    // ჩაწერის გვერდი
    appointment: {
      title: "ჩაწერა კონსულტაციაზე",
      description: "მიიღეთ უფასო კონსულტაცია თმის გადანერგვისა და ესთეტიკური პროცედურების შესახებ ჩვენი ექსპერტებისგან",
      formTitle: "ჩაწერის ფორმა",
      formDescription: "შეავსეთ ქვემოთ მოცემული ფორმა უფასო კონსულტაციაზე ჩასაწერად. ჩვენ დაგიკავშირდებით რაც შეიძლება მალე.",
      preferredDate: "სასურველი თარიღი",
      sending: "იგზავნება...",
      success: "ჩაწერა წარმატებით შეიქმნა",
      successMessage: "თქვენი ჩაწერის მოთხოვნა წარმატებით იქნა მიღებული. ჩვენ მალე დაგიკავშირდებით.",
      error: "დაფიქსირდა შეცდომა",
      errorMessage: "ჩაწერის შექმნისას მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.",
      localPatients: "ადგილობრივი პაციენტებისთვის",
      localInfo1: "ჩვენ გთავაზობთ მარტივ ჩაწერის პროცესს ჩვენი თბილისიდან პაციენტებისთვის.",
      localInfo2: "ჩვენი ადგილობრივი პაციენტებისთვის შემოთავაზებული უპირატესობები:",
      localPoint1: "იმავე დღის კონსულტაციის შესაძლებლობა",
      localPoint2: "უფასო თმის ანალიზი",
      localPoint3: "მოქნილი ჩაწერის საათები",
      internationalPatients: "საერთაშორისო პაციენტებისთვის",
      internationalInfo1: "ჩვენ ვთავაზობთ სპეციალურ მომსახურებას ჩვენს პაციენტებს, რომლებიც თბილისის გარედან ჩამოდიან.",
      internationalInfo2: "ჩვენი საერთაშორისო პაციენტებისთვის შემოთავაზებული მომსახურება:",
      internationalPoint1: "აეროპორტის ტრანსფერი",
      internationalPoint2: "საცხოვრებელი ადგილის მხარდაჭერა",
      internationalPoint3: "თარგმნისა და თარჯიმნის მომსახურება"
    },
    
    // სხვა თარგმანები...
  }
};