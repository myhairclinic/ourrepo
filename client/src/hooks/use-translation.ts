import { useLanguage } from "./use-language";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  
  // Çeviri fonksiyonu
  const t = (key: string): string => {
    // Mevcut dilde çevirisi var mı?
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Yoksa İngilizce'ye bak
    if (translations["en"] && translations["en"][key]) {
      return translations["en"][key];
    }
    
    // Çeviri bulunamadıysa key'i döndür
    return key;
  };
  
  return { t };
}