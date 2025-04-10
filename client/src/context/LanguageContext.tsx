import { createContext, ReactNode, useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Language, DEFAULT_LANGUAGE, getLanguageFromPath } from "@/lib/languages";

// LanguageContext için tip tanımlaması
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  changeLanguage: (lang: Language) => void;
};

// Context oluşturma
export const LanguageContext = createContext<LanguageContextType | null>(null);

// Context Provider bileşeni
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const [matchLangPath] = useRoute("/:lang/*");
  const [matchRootPath] = useRoute("/");
  
  // Şu anki dil durumu
  const [language, setLanguage] = useState<Language>(() => {
    // URL'den dil kodunu al, yoksa varsayılanı kullan
    return getLanguageFromPath(location) || DEFAULT_LANGUAGE;
  });
  
  // URL değiştiğinde dil durumunu güncelle
  useEffect(() => {
    if (matchLangPath && typeof matchLangPath === 'object' && 'params' in matchLangPath) {
      const urlLang = matchLangPath.params.lang as Language;
      
      // URL'deki dil kodu geçerliyse, state'i güncelle
      if (Object.values(Language).includes(urlLang)) {
        setLanguage(urlLang);
      }
    } else if (matchRootPath) {
      // Ana sayfada dil belirtilmemiş, varsayılan dili kullan
      setLanguage(DEFAULT_LANGUAGE);
    }
  }, [location, matchLangPath, matchRootPath]);
  
  // Dil değiştirme fonksiyonu - URL'i günceller
  const changeLanguage = (newLang: Language) => {
    if (newLang === language) return;
    
    if (matchLangPath && typeof matchLangPath === 'object' && 'params' in matchLangPath) {
      // Mevcut URL'deki dil kodunu değiştir
      const restOfPath = location.substring(3); // "/{lang}/" sonrası
      navigate(`/${newLang}${restOfPath}`);
    } else {
      // Ana sayfada veya tanımlanmamış bir URL'de, dil ile ana sayfaya yönlendir
      navigate(`/${newLang}`);
    }
    
    // Dil durumunu güncelle
    setLanguage(newLang);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}