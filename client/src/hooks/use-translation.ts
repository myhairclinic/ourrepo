import { useLanguage } from "./use-language";
import { getTranslation } from "@/lib/translations";
import { Language } from "@shared/types";

export function useTranslation() {
  const { language } = useLanguage();
  
  // Create a translation function bound to the current language
  const t = (key: string | { TR: string; EN: string; RU: string; KA: string; }) => {
    if (typeof key === "string") {
      return getTranslation(key, language);
    } else {
      // Map the object to the current language
      switch (language) {
        case Language.Turkish:
          return key.TR;
        case Language.English:
          return key.EN;
        case Language.Russian:
          return key.RU;
        case Language.Georgian:
          return key.KA;
        default:
          return key.TR;
      }
    }
  };
  
  return { t, language };
}