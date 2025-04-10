import { createContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { Language, DEFAULT_LANGUAGE, getLanguageFromPath } from "@/lib/languages";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  addPrefix: (path: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize language from URL path if available
    return getLanguageFromPath(location);
  });
  
  // Update URL when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    // Update the URL to include the language prefix
    if (location.startsWith(`/${language}/`)) {
      // Replace existing language prefix
      setLocation(`/${newLanguage}/${location.split('/', 3)[2]}`);
    } else if (location === `/${language}`) {
      // Handle root language path
      setLocation(`/${newLanguage}`);
    } else {
      // Add language prefix
      setLocation(`/${newLanguage}${location === '/' ? '' : location}`);
    }
  };
  
  // Add language prefix to paths
  const addPrefix = (path: string): string => {
    if (path.startsWith('/')) {
      return `/${language}${path}`;
    }
    return `/${language}/${path}`;
  };
  
  // Update language when URL changes
  useEffect(() => {
    const pathLanguage = getLanguageFromPath(location);
    if (pathLanguage !== language) {
      setLanguageState(pathLanguage);
    }
  }, [location]);
  
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        addPrefix,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}