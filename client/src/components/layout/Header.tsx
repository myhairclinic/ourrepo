import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import MobileMenu from "./MobileMenu";
import LanguageSelector from "./LanguageSelector";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  
  // Fetch clinic info for contact details
  const { data: clinicInfo } = useQuery({
    queryKey: ["/api/clinic-info"],
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      {/* Top Bar with Contact Info */}
      <div className="bg-secondary text-white py-2 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-4">
            {clinicInfo && (
              <>
                <a href={`tel:${clinicInfo.phone}`} className="flex items-center text-sm">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <span>{clinicInfo.phone}</span>
                </a>
                <a href={`mailto:${clinicInfo.email}`} className="flex items-center text-sm">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>{clinicInfo.email}</span>
                </a>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {clinicInfo?.instagram && (
              <a href={`https://instagram.com/${clinicInfo.instagram}`} className="text-white hover:text-accent" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {clinicInfo?.facebook && (
              <a href={`https://facebook.com/${clinicInfo.facebook}`} className="text-white hover:text-accent" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {clinicInfo?.youtube && (
              <a href={`https://youtube.com/${clinicInfo.youtube}`} className="text-white hover:text-accent" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            )}
            {clinicInfo?.whatsapp && (
              <a href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`} className="text-white hover:text-accent" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={addPrefix('/')} className="flex items-center">
          <div className="text-primary font-heading font-bold text-2xl">MyHair Clinic</div>
        </Link>
        
        <div className="hidden lg:flex items-center justify-between space-x-6">
          <nav className="flex space-x-6">
            <Link href={addPrefix('/')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.home')}
            </Link>
            <div className="relative group">
              <button 
                className="flex items-center font-medium text-secondary hover:text-primary transition"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
              >
                {t('nav.services')}
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              {isServicesMenuOpen && (
                <div 
                  className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-1 z-50"
                  onMouseEnter={() => setIsServicesMenuOpen(true)}
                  onMouseLeave={() => setIsServicesMenuOpen(false)}
                >
                  <Link href={addPrefix('/services/hair-transplant')} className="block px-4 py-2 hover:bg-primary hover:text-white">
                    {t('services.hairTransplant.title')}
                  </Link>
                  <Link href={addPrefix('/services/eyebrow-transplant')} className="block px-4 py-2 hover:bg-primary hover:text-white">
                    {t('services.eyebrowTransplant.title')}
                  </Link>
                  <Link href={addPrefix('/services/beard-transplant')} className="block px-4 py-2 hover:bg-primary hover:text-white">
                    {t('services.beardTransplant.title')}
                  </Link>
                  <Link href={addPrefix('/services/prp')} className="block px-4 py-2 hover:bg-primary hover:text-white">
                    {t('services.prpTreatment.title')}
                  </Link>
                  <Link href={addPrefix('/services/hair-mesotherapy')} className="block px-4 py-2 hover:bg-primary hover:text-white">
                    {t('services.hairMesotherapy.title')}
                  </Link>
                  <Link href={addPrefix('/services/hair-analysis')} className="block px-4 py-2 hover:bg-primary hover:text-white">
                    {t('services.hairAnalysis.title')}
                  </Link>
                </div>
              )}
            </div>
            <Link href={addPrefix('/gallery')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.gallery')}
            </Link>
            <Link href={addPrefix('/packages')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.packages')}
            </Link>
            <Link href={addPrefix('/products')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.products')}
            </Link>
            <Link href={addPrefix('/blog')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.blog')}
            </Link>
            <Link href={addPrefix('/about')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.about')}
            </Link>
            <Link href={addPrefix('/contact')} className="font-medium text-secondary hover:text-primary transition">
              {t('nav.contact')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Link href={addPrefix('/appointment')} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition duration-200">
              {t('common.bookAppointment')}
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-secondary" onClick={toggleMobileMenu}>
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
}
