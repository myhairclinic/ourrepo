import { useLanguage } from "./use-language";
import translations from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  // Translate a key based on current language
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations;
    
    // Navigate through nested translation object
    for (const k of keys) {
      if (current[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      current = current[k];
    }
    
    // Return translation for current language or fall back to English
    if (typeof current === 'object') {
      return current[language] || current.en || key;
    }
    
    return current || key;
  };
  
  return { t, language };
}