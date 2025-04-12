import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { PUBLIC_PATHS, CONTACT, SOCIAL } from "@/lib/constants";
import { Language } from "@shared/types";
import { useTranslation } from "@/lib/translations";
import { MapPin, Phone, Mail, Clock, ChevronRight, Facebook, Instagram, Globe } from "lucide-react";

export default function Footer() {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation(language);

  // Sayfa linkleri
  const footerLinks = [
    { name: t("common.home"), path: "" },
    { name: t("common.services"), path: "services" },
    { name: t("common.packages"), path: "packages" },
    { name: t("common.gallery"), path: "gallery" },
    { name: t("common.blog"), path: "blog" },
    { name: t("common.about"), path: "about" },
    { name: t("common.contact"), path: "contact" },
  ];

  // Hizmetler
  const serviceLinks = [
    { name: t("services.hairTransplant"), path: "services/hair-transplantation" },
    { name: t("services.beardTransplant"), path: "services/beard-transplantation" },
    { name: t("services.eyebrowTransplant"), path: "services/eyebrow-transplantation" },
    { name: t("services.prpTreatment"), path: "services/prp-treatment" },
    { name: t("services.mesotherapy"), path: "services/hair-mesotherapy" },
  ];
  
  // Adres alma
  const getAddress = () => {
    switch(language) {
      case Language.Turkish: return CONTACT.ADDRESS.TR;
      case Language.English: return CONTACT.ADDRESS.EN;
      case Language.Russian: return CONTACT.ADDRESS.RU;
      case Language.Georgian: return CONTACT.ADDRESS.KA;
      default: return CONTACT.ADDRESS.EN;
    }
  }
  
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Üst Kısım */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Klinik Bilgileri */}
          <div className="space-y-6">
            <div className="flex flex-col items-start">
              <Link href={addPrefix("/")} className="mb-4">
                <img 
                  src="/images/logo.png" 
                  alt="MyHair Clinic Logo" 
                  className="h-10 object-contain"
                />
              </Link>
              <div className="h-1 w-16 bg-blue-500 rounded-full"></div>
            </div>
            
            <p className="text-blue-200 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            
            {/* Sosyal Medya */}
            <div className="flex space-x-4 pt-2">
              <a 
                href={SOCIAL.FACEBOOK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-800 p-2.5 rounded-full hover:bg-blue-700 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={SOCIAL.INSTAGRAM} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-800 p-2.5 rounded-full hover:bg-blue-700 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={SOCIAL.TIKTOK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-800 p-2.5 rounded-full hover:bg-blue-700 transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t("footer.quickLinks")}</h3>
              <div className="h-1 w-16 bg-blue-500 rounded-full"></div>
            </div>
            
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index} className="group">
                  <Link href={addPrefix(`/${link.path}`)} className="flex items-center text-blue-200 hover:text-white transition-colors duration-200">
                    <ChevronRight size={16} className="mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hizmetler */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t("footer.ourServices")}</h3>
              <div className="h-1 w-16 bg-blue-500 rounded-full"></div>
            </div>
            
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index} className="group">
                  <Link href={addPrefix(`/${link.path}`)} className="flex items-center text-blue-200 hover:text-white transition-colors duration-200">
                    <ChevronRight size={16} className="mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* İletişim */}
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{t("footer.contactUs")}</h3>
              <div className="h-1 w-16 bg-blue-500 rounded-full"></div>
            </div>
            
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                <span className="text-blue-200">{getAddress()}</span>
              </li>
              
              <li className="flex">
                <Phone className="h-5 w-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                <a href={`tel:${CONTACT.PHONE}`} className="text-blue-200 hover:text-white transition-colors">
                  {CONTACT.PHONE}
                </a>
              </li>
              
              <li className="flex">
                <Mail className="h-5 w-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                <a href={`mailto:${CONTACT.EMAIL}`} className="text-blue-200 hover:text-white transition-colors">
                  {CONTACT.EMAIL}
                </a>
              </li>
              
              <li className="flex">
                <Clock className="h-5 w-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                <span className="text-blue-200">
                  {t("footer.workingHours")}
                </span>
              </li>
              
              <li className="pt-2">
                <a 
                  href={`https://maps.google.com/?q=${getAddress()}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300"
                >
                  <Globe size={16} className="mr-2" />
                  <span>{t("footer.getDirections")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Alt kısım */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-300 text-sm">
              &copy; {new Date().getFullYear()} MyHair Clinic. {t("footer.allRightsReserved")}
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href={addPrefix("/privacy")} className="text-blue-300 text-sm hover:text-white transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
              <Link href={addPrefix("/terms")} className="text-blue-300 text-sm hover:text-white transition-colors">
                {t("footer.termsOfUse")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}