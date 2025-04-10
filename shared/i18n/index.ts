import { Language } from '../types';
import { translations as enTranslations } from './locales/en';
import { translations as trTranslations } from './locales/tr';
import { translations as ruTranslations } from './locales/ru';
import { translations as kaTranslations } from './locales/ka';

// Export all translations
export const translations = {
  [Language.English]: enTranslations,
  [Language.Turkish]: trTranslations,
  [Language.Russian]: ruTranslations,
  [Language.Georgian]: kaTranslations,
};

// Default language
export const DEFAULT_LANGUAGE = Language.Turkish;

// Get translation function
export const getTranslation = (language: Language, key: string, params?: Record<string, string>): string => {
  const langTranslations = translations[language] || translations[DEFAULT_LANGUAGE];
  
  // Split the key by dots to support nested objects
  const keys = key.split('.');
  let value = keys.reduce((obj, k) => obj && obj[k], langTranslations as any);
  
  // Fallback to English if the key doesn't exist in the selected language
  if (!value && language !== Language.English) {
    value = keys.reduce((obj, k) => obj && obj[k], translations[Language.English] as any);
  }
  
  // If still no value, return the key
  if (!value) {
    return key;
  }
  
  // Replace parameters in the string if present
  if (params) {
    return Object.entries(params).reduce(
      (str, [paramKey, paramValue]) => str.replace(new RegExp(`{${paramKey}}`, 'g'), paramValue),
      value
    );
  }
  
  return value;
};

// Get language from path
export const getLanguageFromPath = (path: string): Language => {
  const pathParts = path.split('/').filter(Boolean);
  const langCode = pathParts[0];
  
  if (Object.values(Language).includes(langCode as Language)) {
    return langCode as Language;
  }
  
  return DEFAULT_LANGUAGE;
};

// Add language prefix to path
export const addLanguagePrefix = (path: string, language: Language): string => {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(tr|en|ru|ka)/, '');
  
  // Add the new language prefix
  return `/${language}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
};
