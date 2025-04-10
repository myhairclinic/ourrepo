import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import SectionTitle from "../shared/SectionTitle";

export default function InternationalPackages() {
  const { t } = useTranslation();
  const { addPrefix } = useLanguage();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.packages.title')}
          description={t('home.packages.description')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-100 rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary/10 flex items-center justify-center">
              <i className="fas fa-plane-arrival text-6xl text-primary"></i>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">{t('home.packages.transportation')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.vipTransfer')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.hotelClinicTransfer')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.airportTransfer')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.flightOrganization')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-neutral-100 rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary/10 flex items-center justify-center">
              <i className="fas fa-hotel text-6xl text-primary"></i>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">{t('home.packages.accommodation')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.hotelAccommodation')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.breakfastIncluded')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.nearbyHotels')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.specialNeeds')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-neutral-100 rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-primary/10 flex items-center justify-center">
              <i className="fas fa-user-md text-6xl text-primary"></i>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-semibold mb-4">{t('home.packages.clinicServices')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.chosenTreatment')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.medicationProducts')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.multilingualClinicStaff')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-success mt-1 mr-3"></i>
                  <span>{t('home.packages.yearFollowUp')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="bg-primary/5 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl font-semibold mb-3">{t('home.packages.customizedPackages')}</h3>
            <p className="text-neutral-600 mb-0">
              {t('home.packages.customizedPackagesDesc')}
            </p>
          </div>
          <Link href={addPrefix('/packages')}>
            <a className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
              {t('common.moreInfo')}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
