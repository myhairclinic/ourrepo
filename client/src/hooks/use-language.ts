import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { Language } from "@/lib/languages";

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  // Helper function to add language prefix to paths
  const addPrefix = (path: string, lang?: Language) => {
    const selectedLang = lang || context.language;
    
    // Remove any existing language prefix
    const cleanPath = path.replace(/^\/(tr|en|ru|ka)/, '');
    
    // Clean and format the path
    const formattedPath = cleanPath === '/' ? '' : cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    
    return `/${selectedLang}${formattedPath}`;
  };
  
  return {
    ...context,
    addPrefix
  };
}
