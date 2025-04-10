import { useEffect } from "react";
import { META } from "@/lib/constants";
import { useLanguage } from "./use-language";

export function useTitle() {
  const { language } = useLanguage();
  
  const setTitle = (title: string) => {
    document.title = `${title} ${META.TITLE_SUFFIX}`;
  };
  
  useEffect(() => {
    const defaultTitle = META.TITLE[language as keyof typeof META.TITLE];
    document.title = defaultTitle;
    
    return () => {
      document.title = defaultTitle;
    };
  }, [language]);
  
  return { setTitle };
}