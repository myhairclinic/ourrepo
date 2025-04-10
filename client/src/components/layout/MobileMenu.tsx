import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import LanguageSelector from "./LanguageSelector";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  const { addPrefix } = useLanguage();
  const [isServicesSubmenuOpen, setIsServicesSubmenuOpen] = useState(false);
  
  const toggleServicesSubmenu = () => {
    setIsServicesSubmenuOpen(!isServicesSubmenuOpen);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="lg:hidden bg-white border-t border-neutral-200">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex flex-col space-y-3">
          <Link href={addPrefix('/')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.home')}
          </Link>
          
          <div className="border-b border-neutral-100">
            <button 
              className="flex items-center justify-between w-full font-medium text-secondary hover:text-primary py-2"
              onClick={toggleServicesSubmenu}
            >
              {t('nav.services')}
              <i className={`fas fa-chevron-${isServicesSubmenuOpen ? 'up' : 'down'} text-xs`}></i>
            </button>
            {isServicesSubmenuOpen && (
              <div className="pl-4 py-2 space-y-2">
                <Link 
                  href={addPrefix('/services/hair-transplant')} 
                  className="block py-1 text-secondary hover:text-primary"
                  onClick={onClose}
                >
                  {t('services.hairTransplant.title')}
                </Link>
                <Link 
                  href={addPrefix('/services/eyebrow-transplant')} 
                  className="block py-1 text-secondary hover:text-primary"
                  onClick={onClose}
                >
                  {t('services.eyebrowTransplant.title')}
                </Link>
                <Link 
                  href={addPrefix('/services/beard-transplant')} 
                  className="block py-1 text-secondary hover:text-primary"
                  onClick={onClose}
                >
                  {t('services.beardTransplant.title')}
                </Link>
                <Link 
                  href={addPrefix('/services/prp')} 
                  className="block py-1 text-secondary hover:text-primary"
                  onClick={onClose}
                >
                  {t('services.prpTreatment.title')}
                </Link>
                <Link 
                  href={addPrefix('/services/hair-mesotherapy')} 
                  className="block py-1 text-secondary hover:text-primary"
                  onClick={onClose}
                >
                  {t('services.hairMesotherapy.title')}
                </Link>
                <Link 
                  href={addPrefix('/services/hair-analysis')} 
                  className="block py-1 text-secondary hover:text-primary"
                  onClick={onClose}
                >
                  {t('services.hairAnalysis.title')}
                </Link>
              </div>
            )}
          </div>
          
          <Link href={addPrefix('/gallery')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.gallery')}
          </Link>
          <Link href={addPrefix('/packages')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.packages')}
          </Link>
          <Link href={addPrefix('/products')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.products')}
          </Link>
          <Link href={addPrefix('/blog')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.blog')}
          </Link>
          <Link href={addPrefix('/about')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.about')}
          </Link>
          <Link href={addPrefix('/contact')} className="font-medium text-secondary hover:text-primary py-2 border-b border-neutral-100" onClick={onClose}>
            {t('nav.contact')}
          </Link>
        </nav>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-center">
            <LanguageSelector mobile />
          </div>
          
          <Link href={addPrefix('/appointment')} className="block bg-primary hover:bg-primary/90 text-white text-center px-4 py-3 rounded-md transition duration-200" onClick={onClose}>
            {t('common.bookAppointment')}
          </Link>
        </div>
      </div>
    </div>
  );
}
