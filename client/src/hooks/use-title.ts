import { useEffect } from "react";
import { useTranslation } from "./use-translation";

export function useTitle(titleKey: string, fallback?: string) {
  const { t } = useTranslation();
  
  useEffect(() => {
    const title = t(titleKey) || fallback || "MyHair Clinic";
    document.title = `${title} | MyHair Clinic`;
    
    return () => {
      document.title = "MyHair Clinic";
    };
  }, [titleKey, fallback, t]);
}