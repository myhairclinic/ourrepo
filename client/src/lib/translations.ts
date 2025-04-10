import { Language } from "@shared/types";

// A simple, non-nested translation record
type LanguageMap = Record<Language, string>;

// Our translations object with simple key structure
// Translations object (exported for direct usage in components)
export const translations: Record<string, LanguageMap> = {
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
  
  // Services Page
  "services.subtitle": {
    [Language.Turkish]: "Saç ekimi ve estetik hizmetlerimiz",
    [Language.English]: "Our hair transplantation and aesthetic services",
    [Language.Russian]: "Наши услуги по трансплантации волос и эстетике",
    [Language.Georgian]: "ჩვენი თმის გადანერგვისა და ესთეტიკური სერვისები"
  },
  "services.bookAppointment": {
    [Language.Turkish]: "Randevu Al",
    [Language.English]: "Book Appointment",
    [Language.Russian]: "Записаться на прием",
    [Language.Georgian]: "დაჯავშნეთ შეხვედრა"
  },
  "services.allServices": {
    [Language.Turkish]: "Tüm Hizmetler",
    [Language.English]: "All Services",
    [Language.Russian]: "Все услуги",
    [Language.Georgian]: "ყველა სერვისი"
  },
  
  // Error messages
  "errors.loading_services": {
    [Language.Turkish]: "Hizmetler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    [Language.English]: "An error occurred while loading services. Please try again later.",
    [Language.Russian]: "Произошла ошибка при загрузке услуг. Пожалуйста, повторите попытку позже.",
    [Language.Georgian]: "სერვისების ჩატვირთვისას მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით."
  },
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
 * @param replacements Optional replacements for placeholders
 * @returns The translated string or a fallback
 */
export function getTranslation(
  key: string, 
  language: Language,
  replacements?: Record<string, string | number>
): string {
  try {
    // Check if the key exists in our translations
    if (translations[key]) {
      // Get the translated text
      let translatedText = translations[key][language] || translations[key][Language.English] || key;
      
      // Apply replacements if any
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
          translatedText = translatedText.replace(
            new RegExp(`{${placeholder}}`, 'g'), 
            String(value)
          );
        });
      }
      
      return translatedText;
    }
    
    // If key doesn't exist, return the key itself
    console.warn(`Translation missing for key: "${key}" in language: "${language}"`);
    return key;
  } catch (error) {
    console.error(`Error getting translation for key: "${key}"`, error);
    return key;
  }
}

/**
 * useTranslation hook - React hook for component translations
 */
export function useTranslation(language: Language) {
  return {
    t: (key: string, replacements?: Record<string, string | number>) => 
      getTranslation(key, language, replacements),
    
    // Format a value to the current language format (e.g. currency)
    formatCurrency: (value: number) => {
      const formatter = new Intl.NumberFormat(language === Language.Turkish ? 'tr-TR' : 
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