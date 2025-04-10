import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { languageNames, Language } from "@/lib/languages";
import { PUBLIC_PATHS } from "@/lib/constants";

export default function Header() {
  const { language, setLanguage, addPrefix } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={addPrefix(PUBLIC_PATHS.HOME)}>
              <a className="text-2xl font-bold text-primary">MyHair Clinic</a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href={addPrefix(PUBLIC_PATHS.HOME)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                {language === Language.Turkish ? "Ana Sayfa" : 
                 language === Language.English ? "Home" : 
                 language === Language.Russian ? "Главная" : "მთავარი"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.SERVICES)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                {language === Language.Turkish ? "Hizmetler" : 
                 language === Language.English ? "Services" : 
                 language === Language.Russian ? "Услуги" : "სერვისები"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.GALLERY)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                {language === Language.Turkish ? "Galeri" : 
                 language === Language.English ? "Gallery" : 
                 language === Language.Russian ? "Галерея" : "გალერეა"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.PACKAGES)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                {language === Language.Turkish ? "Paketler" : 
                 language === Language.English ? "Packages" : 
                 language === Language.Russian ? "Пакеты" : "პაკეტები"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.BLOG)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                {language === Language.Turkish ? "Blog" : 
                 language === Language.English ? "Blog" : 
                 language === Language.Russian ? "Блог" : "ბლოგი"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.ABOUT)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                {language === Language.Turkish ? "Hakkımızda" : 
                 language === Language.English ? "About" : 
                 language === Language.Russian ? "О нас" : "ჩვენს შესახებ"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.CONTACT)}>
              <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                {language === Language.Turkish ? "İletişim" : 
                 language === Language.English ? "Contact" : 
                 language === Language.Russian ? "Контакты" : "კონტაქტი"}
              </a>
            </Link>
          </nav>
          
          {/* Language Selector (Desktop) */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-700 cursor-pointer"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
              >
                {Object.entries(languageNames).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Appointment Button (Desktop) */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link href={addPrefix(PUBLIC_PATHS.APPOINTMENT)}>
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                {language === Language.Turkish ? "Randevu Al" : 
                 language === Language.English ? "Book Appointment" : 
                 language === Language.Russian ? "Записаться" : "დაჯავშნა"}
              </a>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href={addPrefix(PUBLIC_PATHS.HOME)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 border-l-4 border-primary">
                {language === Language.Turkish ? "Ana Sayfa" : 
                 language === Language.English ? "Home" : 
                 language === Language.Russian ? "Главная" : "მთავარი"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.SERVICES)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "Hizmetler" : 
                 language === Language.English ? "Services" : 
                 language === Language.Russian ? "Услуги" : "სერვისები"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.GALLERY)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "Galeri" : 
                 language === Language.English ? "Gallery" : 
                 language === Language.Russian ? "Галерея" : "გალერეა"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.PACKAGES)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "Paketler" : 
                 language === Language.English ? "Packages" : 
                 language === Language.Russian ? "Пакеты" : "პაკეტები"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.BLOG)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "Blog" : 
                 language === Language.English ? "Blog" : 
                 language === Language.Russian ? "Блог" : "ბლოგი"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.ABOUT)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "Hakkımızda" : 
                 language === Language.English ? "About" : 
                 language === Language.Russian ? "О нас" : "ჩვენს შესახებ"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.CONTACT)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "İletişim" : 
                 language === Language.English ? "Contact" : 
                 language === Language.Russian ? "Контакты" : "კონტაქტი"}
              </a>
            </Link>
            <Link href={addPrefix(PUBLIC_PATHS.APPOINTMENT)}>
              <a className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50 border-l-4 border-transparent">
                {language === Language.Turkish ? "Randevu Al" : 
                 language === Language.English ? "Book Appointment" : 
                 language === Language.Russian ? "Записаться" : "დაჯავშნა"}
              </a>
            </Link>
          </div>
          
          {/* Language Selector (Mobile) */}
          <div className="pt-2 pb-3 border-t border-gray-200">
            <div className="px-4 flex flex-wrap gap-2">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    language === code 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleLanguageChange(code as Language)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}