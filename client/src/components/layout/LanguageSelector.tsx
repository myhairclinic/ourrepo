import { useLanguage } from "@/hooks/use-language";
import { Language } from "@/lib/languages";
import { useLocation } from "wouter";

interface LanguageSelectorProps {
  mobile?: boolean;
}

export default function LanguageSelector({ mobile = false }: LanguageSelectorProps) {
  const { language, setLanguage, addPrefix } = useLanguage();
  const [, setLocation] = useLocation();
  
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLocation(addPrefix('/', lang));
  };
  
  if (mobile) {
    return (
      <div className="flex justify-center border border-neutral-200 rounded-md overflow-hidden">
        <button 
          onClick={() => handleLanguageChange(Language.Turkish)}
          className={`flex-1 text-center px-3 py-2 ${language === Language.Turkish ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
        >
          TR
        </button>
        <button 
          onClick={() => handleLanguageChange(Language.English)}
          className={`flex-1 text-center px-3 py-2 ${language === Language.English ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
        >
          EN
        </button>
        <button 
          onClick={() => handleLanguageChange(Language.Russian)}
          className={`flex-1 text-center px-3 py-2 ${language === Language.Russian ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
        >
          RU
        </button>
        <button 
          onClick={() => handleLanguageChange(Language.Georgian)}
          className={`flex-1 text-center px-3 py-2 ${language === Language.Georgian ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
        >
          KA
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex border border-neutral-200 rounded-md overflow-hidden">
      <button 
        onClick={() => handleLanguageChange(Language.Turkish)}
        className={`px-3 py-1 ${language === Language.Turkish ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
      >
        TR
      </button>
      <button 
        onClick={() => handleLanguageChange(Language.English)}
        className={`px-3 py-1 ${language === Language.English ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
      >
        EN
      </button>
      <button 
        onClick={() => handleLanguageChange(Language.Russian)}
        className={`px-3 py-1 ${language === Language.Russian ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
      >
        RU
      </button>
      <button 
        onClick={() => handleLanguageChange(Language.Georgian)}
        className={`px-3 py-1 ${language === Language.Georgian ? 'bg-primary text-white' : 'hover:bg-neutral-100'}`}
      >
        KA
      </button>
    </div>
  );
}
