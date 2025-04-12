import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { ALL_LANGUAGES } from "@/lib/languages";
import { PUBLIC_PATHS } from "@/lib/constants";
import { Globe, ChevronDown, Menu, X, Phone, Calendar, Clock, MapPin, Mail } from "lucide-react";

export default function Header() {
  const { language, changeLanguage, addPrefix } = useLanguage();
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
                <Globe size={14} />
                <span className="text-sm uppercase">{language}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
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
                        <span className="mr-2 text-lg">{lang.flag}</span>
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
                Ana Sayfa
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/services")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                Hizmetlerimiz
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/packages")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                Paketler
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/gallery")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                Galeri
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/blog")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/social-media")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                Sosyal Medya
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/products")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                Ürünler
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={addPrefix("/contact")} 
                    className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
                İletişim
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
                <span>Randevu Al</span>
              </Link>
            </div>

            {/* Mobile Menu Button & Language (Mobile) */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={toggleLangMenu}
                className="flex items-center justify-center space-x-1 text-neutral-700 p-2"
              >
                <Globe size={20} className="text-primary" />
                <span className="text-xs font-medium uppercase">{language}</span>
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
      <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="w-56 h-full flex items-center justify-start">
            <img 
              src="/images/logo.png" 
              alt="MyHair Clinic" 
              className="max-h-20 w-auto object-contain"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))' }}
            />
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="text-neutral-600 p-2"
            aria-label="Menüyü Kapat"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <nav className="flex flex-col">
            <Link href={`/${language}`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link href={`/${language}/services`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href={`/${language}/packages`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Paketler
            </Link>
            <Link href={`/${language}/gallery`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Galeri
            </Link>
            <Link href={`/${language}/blog`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href={`/${language}/social-media`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Sosyal Medya
            </Link>
            <Link href={`/${language}/products`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              Ürünler
            </Link>
            <Link href={`/${language}/contact`} className="text-neutral-700 py-3 hover:text-primary transition-colors">
              İletişim
            </Link>
          </nav>
          
          {/* Mobile Language Selector */}
          <div className="mt-6 border-t pt-4">
            <p className="text-neutral-600 text-sm font-medium mb-3 flex items-center">
              <Globe size={16} className="mr-2 text-primary" />
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
                  className={`flex items-center justify-center px-3 py-2 text-sm rounded-md ${
                    language === lang.code 
                      ? "bg-primary/10 text-primary font-medium border border-primary/20" 
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  <span className="mr-2 text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              href={`/${language}/appointment`}
              className="bg-primary text-white w-full py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Randevu Al</span>
            </Link>
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