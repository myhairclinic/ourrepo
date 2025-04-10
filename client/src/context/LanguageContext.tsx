import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { Language } from "@shared/types";
import { useLocation } from "wouter";

// Genişletilmiş bağlam tipi
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  changeLanguage: (language: Language) => void;
  currentLanguage: Language;
  addPrefix: (path: string) => string;
  getContentByLanguage: (content: {
    TR: string;
    EN: string;
    RU: string;
    KA: string;
  }) => string;
}

// Varsayılan değerlerle context oluştur
export const LanguageContext = createContext<LanguageContextType>({
  language: Language.Turkish,
  setLanguage: () => {},
  changeLanguage: () => {},
  currentLanguage: Language.Turkish,
  addPrefix: (path) => path,
  getContentByLanguage: (content) => content.TR,
});

interface LanguageProviderProps {
  children: ReactNode;
}

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get pathname for detecting language from URL
  const [location, navigate] = useLocation();
  
  // Get language from localStorage or use Turkish as default
  const [language, setLanguageState] = useState<Language>(() => {
    // First check URL for language prefix
    const pathMatch = location.match(/^\/(tr|en|ru|ka)(\/|$)/);
    if (pathMatch) {
      const langFromPath = pathMatch[1].toUpperCase() as Language;
      if (Object.values(Language).includes(langFromPath)) {
        return langFromPath;
      }
    }
    
    // Then check localStorage
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage && Object.values(Language).includes(savedLanguage as Language)
      ? (savedLanguage as Language)
      : Language.Turkish;
  });

  // Update language in localStorage when changed
  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem("language", newLang);
  };
  
  // Change language and update URL if needed
  const changeLanguage = (newLang: Language) => {
    // Update state and localStorage
    setLanguage(newLang);
    
    // Update URL path to include language prefix
    const currentPath = location;
    const pathWithoutLang = currentPath.replace(/^\/(tr|en|ru|ka)(\/|$)/, '/');
    
    if (pathWithoutLang === '/') {
      navigate(`/${newLang.toLowerCase()}`);
    } else {
      navigate(`/${newLang.toLowerCase()}${pathWithoutLang}`);
    }
  };
  
  // Seçilen dile göre içerik döndürmek için yardımcı fonksiyon
  const getContentByLanguage = (content: { 
    TR: string;
    EN: string;
    RU: string;
    KA: string;
  }) => {
    switch (language) {
      case Language.Turkish:
        return content.TR;
      case Language.English:
        return content.EN;
      case Language.Russian:
        return content.RU;
      case Language.Georgian:
        return content.KA;
      default:
        return content.TR;
    }
  };
  
  // URL'lere dil öneki eklemek için yardımcı fonksiyon
  const addPrefix = (path: string) => {
    // Eğer yol zaten bir dil öneki içeriyorsa veya admin yoluysa, dokunma
    if (path.match(/^\/(tr|en|ru|ka)\//) || path.startsWith('/admin')) {
      return path;
    }
    
    // Yol ana sayfa ise, sadece dil önekini döndür
    if (path === '/') {
      return `/${language.toLowerCase()}`;
    }
    
    // Diğer tüm yollar için dil önekini ekle
    return `/${language.toLowerCase()}${path}`;
  };

  // Set HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    
    // Update URL if language changed but URL doesn't have language prefix
    const pathMatch = location.match(/^\/(tr|en|ru|ka)(\/|$)/);
    if (!pathMatch || (pathMatch[1].toUpperCase() !== language)) {
      // Don't update URL on admin pages
      if (!location.startsWith('/admin')) {
        const pathWithoutLang = location.replace(/^\/(tr|en|ru|ka)(\/|$)/, '/');
        
        if (pathWithoutLang === '/' || pathWithoutLang === '') {
          navigate(`/${language.toLowerCase()}`);
        } else {
          navigate(`/${language.toLowerCase()}${pathWithoutLang}`);
        }
      }
    }
  }, [language, location, navigate]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        changeLanguage, 
        currentLanguage: language,
        addPrefix,
        getContentByLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};