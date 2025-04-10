import { Language } from "@shared/types";

// Translations object 
const translations: Record<string, Record<Language, string>> = {
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
  
  // Error messages
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
 * @returns The translated string or a fallback
 */
export function getTranslation(key: string, language: Language): string {
  try {
    // Check if the key exists in our translations
    if (translations[key]) {
      // Return the translation for the requested language, or fallback to English if missing
      return translations[key][language] || translations[key][Language.English] || key;
    }
    
    // Handle nested keys (e.g. "common.home.welcome")
    const parts = key.split('.');
    if (parts.length > 1) {
      // Try to find a partial match
      const prefix = parts.slice(0, -1).join('.');
      const suffix = parts[parts.length - 1];
      
      for (const translationKey in translations) {
        if (translationKey.startsWith(prefix)) {
          console.warn(`Using partial match for "${key}": found "${translationKey}"`);
          return translations[translationKey][language] || translations[translationKey][Language.English] || key;
        }
      }
    }
    
    // If no translation found, return the key itself
    console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
    return key;
  } catch (error) {
    console.error(`Error getting translation for key: "${key}"`, error);
    return key;
  }
}