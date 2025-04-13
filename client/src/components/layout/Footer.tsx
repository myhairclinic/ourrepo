import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { PUBLIC_PATHS, CONTACT, SOCIAL } from "@/lib/constants";
import { Language } from "@shared/types";
import { useTranslation } from "@/lib/translations";
import { MapPin, Phone, Mail, Clock, ChevronRight, Facebook, Instagram, Globe, ExternalLink, Calendar, ArrowRight } from "lucide-react";

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
    <footer>
      {/* Üst bilgi bandı - mavi çizgi */}
      <div className="bg-blue-600 py-1.5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4">
            <div className="flex items-center text-white text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span>09:00 - 18:00</span>
              <span className="mx-3 text-blue-200">|</span>
              <Phone className="h-4 w-4 mr-2" />
              <a href={`tel:${CONTACT.PHONE}`} className="hover:text-blue-100 transition-colors">
                {CONTACT.PHONE}
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href={SOCIAL.FACEBOOK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-700 p-1.5 rounded-full hover:bg-blue-800 transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a 
                href={SOCIAL.INSTAGRAM} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-700 p-1.5 rounded-full hover:bg-blue-800 transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href={SOCIAL.TIKTOK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-blue-700 p-1.5 rounded-full hover:bg-blue-800 transition-colors text-white"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ana footer alanı */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white pt-16 pb-14 border-t-4 border-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-5">
            {/* Klinik Bilgileri */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex flex-col">
                <Link href={addPrefix("/")} className="mb-5">
                  <img 
                    src="/images/logo.png" 
                    alt="MyHair Clinic Logo" 
                    className="h-24 object-contain"
                  />
                </Link>
              </div>
              
              <p className="text-white text-sm leading-relaxed">
                {t("footer.description") || "MyHair Clinic, saç ekimi ve restorasyon konusunda uzmanlaşmış öncü bir kliniktir. Yüksek kaliteli bakım, ileri teknoloji ve kişiselleştirilmiş tedavi yaklaşımı sunuyoruz."}
              </p>
              
              {/* İletişim bilgileri */}
              <div className="space-y-4 pt-2 pb-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                  <span className="text-white">{getAddress()}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-3 shrink-0" />
                  <a href={`tel:${CONTACT.PHONE}`} className="text-white hover:text-blue-200 transition-colors">
                    {CONTACT.PHONE}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-3 shrink-0" />
                  <a href={`mailto:${CONTACT.EMAIL}`} className="text-white hover:text-blue-200 transition-colors">
                    {CONTACT.EMAIL}
                  </a>
                </div>
              </div>
              
              {/* CTA butonları */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={`https://wa.me/${CONTACT.WHATSAPP.replace(/\D/g, '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2.1 22l4.6-1.2c1.5.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2m0 18c-1.6 0-3.1-.4-4.4-1.1l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.2-2.9-1.2-4.5 0-4.7 3.8-8.6 8.6-8.6s8.6 3.8 8.6 8.6c-.1 4.7-3.9 8.5-8.6 8.5m5-6.4c-.3-.1-1.6-.8-1.8-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1-.2.2-.3.2-.6 0-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5"/>
                  </svg>
                  <span>{t("common.contactViaWhatsApp") || "WhatsApp'tan Ulaşın"}</span>
                </a>
                
                <Link 
                  href={addPrefix("/appointment")}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{t("common.makeAppointment") || "Randevu Alın"}</span>
                </Link>
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white" style={{color: 'white'}}>{t("footer.quickLinks")}</h3>
                <div className="h-0.5 w-12 bg-blue-500 mt-2 rounded-full"></div>
              </div>
              
              <ul className="space-y-3">
                {footerLinks.map((link, index) => (
                  <li key={index} className="group">
                    <Link href={addPrefix(`/${link.path}`)} className="flex items-center hover:text-blue-200 transition-colors duration-200">
                      <ArrowRight size={14} className="mr-2 text-blue-400" />
                      <span className="text-sm font-medium text-white">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Hizmetler */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white" style={{color: 'white'}}>{t("footer.ourServices")}</h3>
                <div className="h-0.5 w-12 bg-blue-500 mt-2 rounded-full"></div>
              </div>
              
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index} className="group">
                    <Link href={addPrefix(`/${link.path}`)} className="flex items-center hover:text-blue-200 transition-colors duration-200">
                      <ArrowRight size={14} className="mr-2 text-blue-400" />
                      <span className="text-sm font-medium text-white">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Çalışma Saatleri + Harita */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white" style={{color: 'white'}}>{t("footer.workingHours")}</h3>
                <div className="h-0.5 w-12 bg-blue-500 mt-2 rounded-full"></div>
              </div>
              
              <div className="text-white space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-sm">{t("home.location.weekdaysLabel")}</span>
                  <span className="text-sm">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-sm">{t("home.location.saturdayLabel") || "Cumartesi"}</span>
                  <span className="text-sm">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-sm">{t("home.location.sundayLabel") || "Pazar"}</span>
                  <span className="text-sm">{t("home.location.closed") || "Kapalı"}</span>
                </div>
              </div>
              
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.9767555989337!2d44.7830123!3d41.7190437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440dc7f1f3b4d7%3A0xcdd939d8ccce8bc9!2sTsotne%20Dadiani%20St%2C%20T&#39;bilisi!5e0!3m2!1sen!2sge!4v1650000000000!5m2!1sen!2sge" 
                  width="100%" 
                  height="100%" 
                  className="absolute inset-0 border-0"
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MyHair Clinic Location Map"
                  aria-label="Google Maps showing MyHair Clinic location"
                ></iframe>
              </div>
              
              <a 
                href={`https://maps.google.com/?q=${getAddress()}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} className="mr-1" />
                <span>{t("footer.getDirections")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Alt kısım - telif hakkı ve politikalar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              &copy; {new Date().getFullYear()} MyHair Clinic. {t("footer.allRightsReserved")}
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href={addPrefix("/privacy")} className="text-white text-sm hover:text-blue-200 transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
              <Link href={addPrefix("/terms")} className="text-white text-sm hover:text-blue-200 transition-colors">
                {t("footer.termsOfUse")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}