import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Fetch clinic info
  const { data: clinicInfo } = useQuery({
    queryKey: ["/api/clinic-info"],
  });

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-6">MyHair Clinic</h3>
            <p className="text-neutral-300 mb-6">
              {clinicInfo ? clinicInfo[`about${language.toUpperCase()}`] : t('home.whyChoose.description')}
            </p>
            <div className="flex space-x-4">
              {clinicInfo?.instagram && (
                <a href={`https://instagram.com/${clinicInfo.instagram}`} className="text-neutral-300 hover:text-white transition" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {clinicInfo?.facebook && (
                <a href={`https://facebook.com/${clinicInfo.facebook}`} className="text-neutral-300 hover:text-white transition" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {clinicInfo?.youtube && (
                <a href={`https://youtube.com/${clinicInfo.youtube}`} className="text-neutral-300 hover:text-white transition" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              )}
              {clinicInfo?.whatsapp && (
                <a href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`} className="text-neutral-300 hover:text-white transition" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">{t('common.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={addPrefix('/services/hair-transplant')} className="text-neutral-300 hover:text-white transition">
                  {t('services.hairTransplant.title')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/services/eyebrow-transplant')} className="text-neutral-300 hover:text-white transition">
                  {t('services.eyebrowTransplant.title')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/services/beard-transplant')} className="text-neutral-300 hover:text-white transition">
                  {t('services.beardTransplant.title')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/services/prp')} className="text-neutral-300 hover:text-white transition">
                  {t('services.prpTreatment.title')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/gallery')} className="text-neutral-300 hover:text-white transition">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/blog')} className="text-neutral-300 hover:text-white transition">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">{t('common.internationalPatients')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={addPrefix('/packages')} className="text-neutral-300 hover:text-white transition">
                  {t('nav.packages')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/packages#transportation')} className="text-neutral-300 hover:text-white transition">
                  {t('home.packages.transportation')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/packages#accommodation')} className="text-neutral-300 hover:text-white transition">
                  {t('home.packages.accommodation')}
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/packages#faq')} className="text-neutral-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={addPrefix('/blog/tbilisi-travel-guide')} className="text-neutral-300 hover:text-white transition">
                  Tbilisi Travel Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">{t('common.contactUs')}</h3>
            <ul className="space-y-3">
              {clinicInfo && (
                <>
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                    <span>{clinicInfo[`address${language.toUpperCase()}`]}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-phone-alt mt-1 mr-3"></i>
                    <span>{clinicInfo.phone}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-envelope mt-1 mr-3"></i>
                    <span>{clinicInfo.email}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock mt-1 mr-3"></i>
                    <span>{clinicInfo[`workingHours${language.toUpperCase()}`]}</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-gray-700 mt-12 pt-8">
          <p className="text-sm text-neutral-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MyHair Clinic. {t('common.allRightsReserved')}
          </p>
          <div className="flex space-x-6">
            <Link href={addPrefix('/privacy-policy')} className="text-sm text-neutral-400 hover:text-white transition">
              {t('common.privacyPolicy')}
            </Link>
            <Link href={addPrefix('/cookie-policy')} className="text-sm text-neutral-400 hover:text-white transition">
              {t('common.cookiePolicy')}
            </Link>
            <Link href={addPrefix('/terms-of-use')} className="text-sm text-neutral-400 hover:text-white transition">
              {t('common.termsOfUse')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
