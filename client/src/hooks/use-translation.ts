import { useLanguage } from "./use-language";
import { getTranslation } from "@/lib/translations";
import { Language } from "@shared/types";

export function useTranslation() {
  const { language } = useLanguage();
  
  // Translation function that uses the improved getTranslation function
  // which can handle both string keys and direct language objects
  const t = (key: string | Record<Language, string>, replacements?: Record<string, string | number>) => {
    return getTranslation(key, language, replacements);
  };
  
  // Format currency value for the current language
  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat(
      language === Language.Turkish ? 'tr-TR' : 
      language === Language.English ? 'en-US' : 
      language === Language.Russian ? 'ru-RU' : 'ka-GE', 
      {
        style: 'currency',
        currency: 'USD'
      }
    );
    
    return formatter.format(value);
  };
  
  // Format date for the current language
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString(
      language === Language.Turkish ? 'tr-TR' : 
      language === Language.English ? 'en-US' : 
      language === Language.Russian ? 'ru-RU' : 'ka-GE'
    );
  };
  
  return { 
    t, 
    language,
    formatCurrency,
    formatDate
  };
}