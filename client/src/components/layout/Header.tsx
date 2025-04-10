import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { ALL_LANGUAGES } from "@/lib/languages";
import { PUBLIC_PATHS } from "@/lib/constants";

export default function Header() {
  const { language, changeLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${language}`} className="font-bold text-xl text-primary">
            MyHair Clinic
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href={`/${language}`} className="text-neutral-700 hover:text-primary">
              Ana Sayfa
            </Link>
            <Link href={`/${language}/services`} className="text-neutral-700 hover:text-primary">
              Hizmetlerimiz
            </Link>
            <Link href={`/${language}/packages`} className="text-neutral-700 hover:text-primary">
              Paketler
            </Link>
            <Link href={`/${language}/gallery`} className="text-neutral-700 hover:text-primary">
              Galeri
            </Link>
            <Link href={`/${language}/blog`} className="text-neutral-700 hover:text-primary">
              Blog
            </Link>
            <Link href={`/${language}/social-media`} className="text-neutral-700 hover:text-primary">
              Sosyal Medya
            </Link>
            <Link href={`/${language}/about`} className="text-neutral-700 hover:text-primary">
              Hakkımızda
            </Link>
            <Link href={`/${language}/contact`} className="text-neutral-700 hover:text-primary">
              İletişim
            </Link>
          </nav>

          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-neutral-700">
                <span>{language.toUpperCase()}</span>
                <span>▼</span>
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  {ALL_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        language === lang.code ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href={`/${language}/appointment`}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors"
            >
              Randevu Al
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link href={`/${language}`} className="text-neutral-700 py-2 border-b">
                Ana Sayfa
              </Link>
              <Link href={`/${language}/services`} className="text-neutral-700 py-2 border-b">
                Hizmetlerimiz
              </Link>
              <Link href={`/${language}/packages`} className="text-neutral-700 py-2 border-b">
                Paketler
              </Link>
              <Link href={`/${language}/gallery`} className="text-neutral-700 py-2 border-b">
                Galeri
              </Link>
              <Link href={`/${language}/blog`} className="text-neutral-700 py-2 border-b">
                Blog
              </Link>
              <Link href={`/${language}/social-media`} className="text-neutral-700 py-2 border-b">
                Sosyal Medya
              </Link>
              <Link href={`/${language}/about`} className="text-neutral-700 py-2 border-b">
                Hakkımızda
              </Link>
              <Link href={`/${language}/contact`} className="text-neutral-700 py-2 border-b">
                İletişim
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="py-2 border-b">
                <p className="text-neutral-600 text-sm mb-2">Dil Seçimi:</p>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-2 py-1 text-sm rounded ${
                        language === lang.code ? "bg-primary/10 text-primary" : "bg-neutral-100"
                      }`}
                    >
                      <span className="mr-1">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <Link
                href={`/${language}/appointment`}
                className="bg-primary text-white px-4 py-2 rounded-md text-center"
              >
                Randevu Al
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}