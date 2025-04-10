export enum Language {
  Turkish = "tr",
  English = "en",
  Russian = "ru",
  Georgian = "ka"
}

// Varsayılan dil
export const DEFAULT_LANGUAGE = Language.Turkish;

// Tüm desteklenen diller
export const ALL_LANGUAGES = [
  { code: Language.Turkish, name: "Türkçe", flag: "🇹🇷" },
  { code: Language.English, name: "English", flag: "🇬🇧" },
  { code: Language.Russian, name: "Русский", flag: "🇷🇺" },
  { code: Language.Georgian, name: "ქართული", flag: "🇬🇪" },
];

// Dil URL'sini kontrol eden fonksiyon
export function getLanguageFromPath(path: string): Language {
  const match = path.match(/^\/([a-z]{2})(\/|$)/);
  
  if (match) {
    const lang = match[1];
    // Desteklenen diller arasında mı kontrol et
    if (Object.values(Language).includes(lang as Language)) {
      return lang as Language;
    }
  }
  
  return DEFAULT_LANGUAGE;
}

// Dil adını döndüren fonksiyon
export function getLanguageName(lang: Language): string {
  const foundLang = ALL_LANGUAGES.find((l) => l.code === lang);
  return foundLang ? foundLang.name : "Unknown";
}

// Dil flagini döndüren fonksiyon
export function getLanguageFlag(lang: Language): string {
  const foundLang = ALL_LANGUAGES.find((l) => l.code === lang);
  return foundLang ? foundLang.flag : "🏳️";
}