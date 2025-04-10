import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { Language } from "@shared/types";

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  // Ek yardımcı fonksiyonlar
  const changeLanguage = (lang: Language) => {
    context.setLanguage(lang);
  };

  const currentLanguage = context.language;
  
  // URL'lere dil öneki eklemek için yardımcı fonksiyon
  const addPrefix = (path: string) => {
    // Eğer yol zaten bir dil öneki içeriyorsa veya admin yoluysa, dokunma
    if (path.match(/^\/(tr|en|ru|ka)\//) || path.startsWith('/admin')) {
      return path;
    }
    
    // Yol ana sayfa ise, sadece dil önekini döndür
    if (path === '/') {
      return `/${context.language}`;
    }
    
    // Diğer tüm yollar için dil önekini ekle
    return `/${context.language}${path}`;
  };
  
  return {
    ...context,
    changeLanguage,
    currentLanguage,
    addPrefix
  };
}