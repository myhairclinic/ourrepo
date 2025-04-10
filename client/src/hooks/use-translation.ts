import { useLanguage } from "./use-language";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  // Enhanced translation function with nested key support
  const t = (key: string): any => {
    // Split the key by dots to support nested objects
    const keys = key.split('.');
    
    // Try to get translation from current language
    let result = getNestedTranslation(translations[language], keys);
    
    // If not found, try English as fallback
    if (result === key && language !== 'en') {
      result = getNestedTranslation(translations["en"], keys);
    }
    
    return result;
  };
  
  // Helper function to get nested translations
  const getNestedTranslation = (obj: any, keys: string[]): any => {
    // Start with the translation object
    let current = obj;
    
    // Navigate through nested keys
    for (let i = 0; i < keys.length; i++) {
      // If we've reached a non-object or the key doesn't exist, return original key
      if (!current || typeof current !== 'object' || !(keys[i] in current)) {
        return keys.join('.');
      }
      current = current[keys[i]];
    }
    
    return current;
  };
  
  return { t };
}