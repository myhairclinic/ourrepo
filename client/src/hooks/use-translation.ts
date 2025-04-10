import { useLanguage } from "./use-language";
import { getTranslation } from "@shared/i18n";

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: string, params?: Record<string, string>) => {
    return getTranslation(language, key, params);
  };
  
  return { t };
}
