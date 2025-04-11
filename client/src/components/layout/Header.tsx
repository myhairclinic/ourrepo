import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { ALL_LANGUAGES } from "@/lib/languages";
import { PUBLIC_PATHS } from "@/lib/constants";
import { Globe, ChevronDown, Menu, X } from "lucide-react";

// Import logo
import logoSvg from '@/assets/logo.svg';

// Logo Component
const MyHairLogo = () => (
  <div className="flex items-center">
    <img 
      src={logoSvg} 
      alt="MyHair Clinic Logo" 
      className="h-10 md:h-11 mr-2"
      style={{ filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1))' }}
    />
  </div>
);

export default function Header() {
  const { language, changeLanguage } = useLanguage();
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
    <header className={`sticky top-0 z-50 transition-all duration-300 
      ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white shadow-sm"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center">
            <MyHairLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href={`/${language}`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Ana Sayfa
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/services`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Hizmetlerimiz
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/packages`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Paketler
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/gallery`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Galeri
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/blog`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/social-media`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Sosyal Medya
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/products`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              Ürünler
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href={`/${language}/contact`} 
                  className="text-neutral-700 hover:text-primary font-medium transition-colors relative py-2 group">
              İletişim
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Language Selector & Appointment Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={toggleLangMenu}
                className="flex items-center space-x-2 text-neutral-700 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <Globe size={16} className="text-primary" />
                <span className="text-sm font-medium uppercase">{language}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
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
            
            <Link
              href={`/${language}/appointment`}
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              Randevu Al
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center text-neutral-700 p-2"
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

      {/* Mobile Menu - Slide from right */}
      <div className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <img 
              src={logoSvg} 
              alt="MyHair Clinic Logo" 
              className="h-8"
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