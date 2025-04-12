import { Language } from "@shared/types";

export { Language };

// Varsayılan dil
export const DEFAULT_LANGUAGE = Language.Turkish;

// Tüm desteklenen diller
export const ALL_LANGUAGES = [
  { 
    code: Language.Turkish, 
    name: "Türkçe", 
    flag: "🇹🇷",
    nativeName: "Türkçe",
    fullName: "Türkiye",
    shortName: "TR" 
  },
  { 
    code: Language.English, 
    name: "English", 
    flag: "🇬🇧",
    nativeName: "English",
    fullName: "United Kingdom",
    shortName: "EN" 
  },
  { 
    code: Language.Russian, 
    name: "Русский", 
    flag: "🇷🇺",
    nativeName: "Русский",
    fullName: "Россия",
    shortName: "RU" 
  },
  { 
    code: Language.Georgian, 
    name: "ქართული", 
    flag: "🇬🇪",
    nativeName: "ქართული",
    fullName: "საქართველო",
    shortName: "KA" 
  },
  { 
    code: Language.Azerbaijani, 
    name: "Azərbaycan", 
    flag: "🇦🇿",
    nativeName: "Azərbaycan",
    fullName: "Azərbaycan",
    shortName: "AZ" 
  },
  { 
    code: Language.Persian, 
    name: "فارسی", 
    flag: "🇮🇷",
    nativeName: "فارسی",
    fullName: "ایران",
    shortName: "IR" 
  },
  { 
    code: Language.Kazakh, 
    name: "Қазақша", 
    flag: "🇰🇿",
    nativeName: "Қазақша",
    fullName: "Қазақстан",
    shortName: "KZ" 
  },
  { 
    code: Language.Ukrainian, 
    name: "Українська", 
    flag: "🇺🇦",
    nativeName: "Українська",
    fullName: "Україна",
    shortName: "UA" 
  }
];

// URL'den dil kodunu almak için yardımcı fonksiyon
export function getLanguageFromPath(path: string): Language | null {
  if (!path) return null;
  
  // İlk bölümü al, örn: "/tr/about" -> "tr"
  const match = path.match(/^\/([a-z]{2})(\/|$)/);
  if (!match) return null;
  
  const langCode = match[1];
  
  // Geçerli bir dil kodu mu kontrol et
  if (Object.values(Language).includes(langCode as Language)) {
    return langCode as Language;
  }
  
  return null;
}