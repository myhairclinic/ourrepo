export enum Language {
  Turkish = "tr",
  English = "en",
  Russian = "ru",
  Georgian = "ka"
}

export const languageNames = {
  [Language.Turkish]: "Türkçe",
  [Language.English]: "English",
  [Language.Russian]: "Русский",
  [Language.Georgian]: "ქართული"
};

export const DEFAULT_LANGUAGE = Language.Turkish;

export function getLanguageFromPath(path: string): Language {
  const pathParts = path.split('/').filter(Boolean);
  const langCode = pathParts[0];
  
  if (Object.values(Language).includes(langCode as Language)) {
    return langCode as Language;
  }
  
  return DEFAULT_LANGUAGE;
}
