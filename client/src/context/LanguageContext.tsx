import { createContext, ReactNode, useState, useEffect } from "react";
import { Language } from "@shared/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: Language.Turkish,
  setLanguage: () => {}
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get language from localStorage or use Turkish as default
  const [language, setLanguageState] = useState<Language>(() => {
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

  // Set HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};