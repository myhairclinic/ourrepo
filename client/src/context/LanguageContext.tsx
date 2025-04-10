import { createContext, useState, useEffect, ReactNode } from "react";
import { Language, DEFAULT_LANGUAGE, getLanguageFromPath } from "@/lib/languages";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  addPrefix: (path: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  
  useEffect(() => {
    // Detect language from URL path on initial load
    const detectedLanguage = getLanguageFromPath(window.location.pathname);
    setLanguage(detectedLanguage);
    
    // Listen for path changes to update language
    const handleLocationChange = () => {
      const newLanguage = getLanguageFromPath(window.location.pathname);
      if (newLanguage !== language) {
        setLanguage(newLanguage);
      }
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // Add language prefix to paths
  const addPrefix = (path: string): string => {
    // If path already starts with language, return it
    if (path.startsWith(`/${language}/`)) {
      return path;
    }
    
    // If path is just language code, return it
    if (path === `/${language}`) {
      return path;
    }
    
    // If path is root, just add the language
    if (path === '/') {
      return `/${language}`;
    }
    
    // Otherwise, add language prefix
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `/${language}/${cleanPath}`;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, addPrefix }}>
      {children}
    </LanguageContext.Provider>
  );
};