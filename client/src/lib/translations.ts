import { Language } from "@shared/types";

type TranslationKey = string;

// Çeviri nesnesinde her dil kodu için karşılık gelen çeviriler tanımlanır
type TranslationsDict = {
  [key in Language]: {
    [key: TranslationKey]: string;
  };
};

// Belirli bir çeviri anahtarı için dile göre çeviriyi döndüren yardımcı fonksiyon
export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key] || key;
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
    
    // სხვა თარგმანები...
  }
};