import { Language } from "@shared/types";

export { Language };

// Varsayılan dil
export const DEFAULT_LANGUAGE = Language.Turkish;

// Tüm desteklenen diller
export const ALL_LANGUAGES = [
  { code: Language.Turkish, name: "Türkçe", flag: "🇹🇷" },
  { code: Language.English, name: "English", flag: "🇬🇧" },
  { code: Language.Russian, name: "Русский", flag: "🇷🇺" },
  { code: Language.Georgian, name: "ქართული", flag: "🇬🇪" },
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