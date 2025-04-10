import { createContext, ReactNode, useState, useEffect } from "react";
import { useLocation } from "wouter";
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
  
  // Şu anki dil durumu
  const [language, setLanguage] = useState<Language>(() => {
    // URL'den dil kodunu al, yoksa varsayılanı kullan
    return getLanguageFromPath(location) || DEFAULT_LANGUAGE;
  });
  
  // URL değiştiğinde dil durumunu güncelle
  useEffect(() => {
    const detectedLanguage = getLanguageFromPath(location);
    if (detectedLanguage) {
      setLanguage(detectedLanguage);
    } else if (location === "/") {
      // Ana sayfada dil belirtilmemiş, varsayılan dili kullan
      setLanguage(DEFAULT_LANGUAGE);
    }
  }, [location]);
  
  // Dil değiştirme fonksiyonu - URL'i günceller
  const changeLanguage = (newLang: Language) => {
    if (newLang === language) return;
    
    // Eğer mevcut bir dil kodu varsa, onu değiştir
    const currentLangCode = getLanguageFromPath(location);
    if (currentLangCode) {
      // "/{lang}/rest" -> "/{newLang}/rest"
      const path = location.replace(`/${currentLangCode}`, `/${newLang}`);
      navigate(path);
    } else {
      // Dil kodu yoksa, yeni dil ile ana sayfaya yönlendir
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