import { useLanguage } from "./use-language";
import { getTranslation } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  // Create a translation function bound to the current language
  const t = (key: string) => getTranslation(key, language);
  
  return { t, language };
}