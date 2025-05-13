import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import { ALL_LANGUAGES } from "@/lib/languages";
import { PUBLIC_PATHS } from "@/lib/constants";
import { Globe, ChevronDown, Menu, X, Phone, Calendar, Clock, MapPin, Mail } from "lucide-react";
import { FlagIcon } from "@/components/flags";

export default function Header() {
  const { language, changeLanguage, addPrefix } = useLanguage();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Detect scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar with Contact Info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 text-sm">
              <a href="tel:+995555003044" className="flex items-center hover:text-blue-100 transition-colors">
                <Phone size={14} className="mr-1.5" />
                <span>+995 555 003044</span>
              </a>
              <a href="mailto:myhairtbilisi@gmail.com" className="flex items-center hover:text-blue-100 transition-colors">
                <Mail size={14} className="mr-1.5" />
                <span>myhairtbilisi@gmail.com</span>
              </a>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1.5" />
                <span>Tsotne Dadiani 59, Tbilisi</span>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLangMenu}
                className="flex items-center space-x-2 text-white px-3 py-1 rounded hover:bg-blue-700/40 transition-colors"
              >
                <div className="w-8 h-5 overflow-hidden rounded shadow-sm border border-gray-100">
                  <FlagIcon code={language} />
                </div>
                <span className="text-sm uppercase ml-2">{language}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                  <div className="py-1">
                    {ALL_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                          language === lang.code ? "bg-primary/5 text-primary font-medium" : "text-gray-700"
                        }`}
                      >
                        <div className="w-6 h-4 mr-2 overflow-hidden rounded shadow-sm border border-gray-100">
                          <FlagIcon code={lang.code} />
                        </div>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className={`transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white shadow-sm py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href={addPrefix("/")} className="flex items-center">
              <div className="w-72 h-full flex items-center justify-start">
                <img 
                  src="/images/logo.png" 
                  alt="MyHair Clinic" 
                  className="max-h-32 w-auto object-contain"
                  style={{ 
                    filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))',
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-5 lg:space-x-6">
              <Link href={addPrefix("/")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.home')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/services")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.services')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/packages")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.packages')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/gallery")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.gallery')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/blog")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.blog')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/social-media")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.socialMedia')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/products")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.products')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/contact")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                {t('header.contact')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Appointment Button */}
            <div className="hidden md:block">
              <Link
                href={addPrefix("/appointment")}
                className="bg-primary text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg flex items-center"
              >
                <Calendar size={16} className="mr-2" />
                <span>{t('header.appointment')}</span>
              </Link>
            </div>

            {/* Mobile Menu Button & Language (Mobile) */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={toggleLangMenu}
                className="flex items-center justify-center space-x-1 text-neutral-700 p-2"
              >
                <div className="w-6 h-4 overflow-hidden rounded shadow-sm border border-gray-100">
                  <FlagIcon code={language} />
                </div>
                <span className="text-xs font-medium uppercase ml-1">{language}</span>
              </button>
              
              <button 
                className="flex items-center justify-center text-neutral-700 p-2"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
              >
                {isMobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide from right */}
      <div className={`fixed inset-y-0 right-0 z-50 w-[88%] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="flex justify-between items-center p-3 border-b border-gray-100">
          <div className="w-48 h-full flex items-center justify-start">
            <img 
              src="/images/logo.png" 
              alt="MyHair Clinic" 
              className="max-h-16 w-auto object-contain"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))' }}
            />
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="text-neutral-600 bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Menüyü Kapat"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-70px)]">
          {/* İletişim Bilgileri (Mobil) */}
          <div className="bg-blue-50/50 p-3 border-b border-blue-100/50">
            <div className="flex flex-col space-y-2 text-xs">
              <a href="tel:+995555003044" className="flex items-center text-neutral-700 hover:text-primary transition-colors">
                <Phone size={14} className="mr-2 text-primary" />
                <span>+995 555 003044</span>
              </a>
              <a href="mailto:myhairtbilisi@gmail.com" className="flex items-center text-neutral-700 hover:text-primary transition-colors">
                <Mail size={14} className="mr-2 text-primary" />
                <span>myhairtbilisi@gmail.com</span>
              </a>
              <div className="flex items-center text-neutral-700">
                <MapPin size={14} className="mr-2 text-primary" />
                <span>Tsotne Dadiani 59, Tbilisi</span>
              </div>
            </div>
          </div>
        
          <div className="p-3">
            <nav className="flex flex-col">
              <Link href={addPrefix("/")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.home')}</span>
              </Link>
              <Link href={addPrefix("/services")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.services')}</span>
              </Link>
              <Link href={addPrefix("/packages")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.packages')}</span>
              </Link>
              <Link href={addPrefix("/gallery")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.gallery')}</span>
              </Link>
              <Link href={addPrefix("/blog")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.blog')}</span>
              </Link>
              <Link href={addPrefix("/social-media")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.socialMedia')}</span>
              </Link>
              <Link href={addPrefix("/products")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.products')}</span>
              </Link>
              <Link href={addPrefix("/contact")} 
                    className="flex items-center text-neutral-700 py-2.5 px-2 hover:text-primary hover:bg-blue-50/50 rounded-md transition-colors">
                <span>{t('header.contact')}</span>
              </Link>
            </nav>
          
            {/* Mobile Language Selector */}
            <div className="mt-5 border-t pt-4">
              <p className="text-neutral-600 text-xs font-medium mb-3 flex items-center">
                <Globe size={14} className="mr-2 text-primary" />
                Dil Seçimi:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center px-2 py-1.5 text-xs rounded-md ${
                      language === lang.code 
                        ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                    }`}
                  >
                    <div className="w-5 h-3.5 mr-1.5 overflow-hidden rounded shadow-sm border border-gray-100">
                      <FlagIcon code={lang.code} />
                    </div>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          
            <div className="mt-5 mb-4">
              <Link
                href={addPrefix("/appointment")}
                className="bg-primary text-white w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar size={16} className="mr-1.5" />
                <span>Randevu Al</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
}