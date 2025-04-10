import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import SectionTitle from "../shared/SectionTitle";

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const { addPrefix } = useLanguage();
  
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.whyChoose.title')}
          description={t('home.whyChoose.description')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <i className="fas fa-user-md text-2xl"></i>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{t('home.whyChoose.expertTeam')}</h3>
            <p className="text-neutral-600">
              {t('home.whyChoose.expertTeamDesc')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <i className="fas fa-cogs text-2xl"></i>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{t('home.whyChoose.modernTechnology')}</h3>
            <p className="text-neutral-600">
              {t('home.whyChoose.modernTechnologyDesc')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <i className="fas fa-globe text-2xl"></i>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{t('home.whyChoose.internationalStandards')}</h3>
            <p className="text-neutral-600">
              {t('home.whyChoose.internationalStandardsDesc')}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <i className="fas fa-hand-holding-heart text-2xl"></i>
            </div>
            <h3 className="font-heading text-lg font-semibold mb-2">{t('home.whyChoose.personalizedCare')}</h3>
            <p className="text-neutral-600">
              {t('home.whyChoose.personalizedCareDesc')}
            </p>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="font-heading text-2xl font-bold mb-4">{t('home.whyChoose.clinicStandards')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                  <span>{t('home.whyChoose.sterileEnvironment')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                  <span>{t('home.whyChoose.certifiedDevices')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                  <span>{t('home.whyChoose.comfortableRooms')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                  <span>{t('home.whyChoose.patientSupport')}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                  <span>{t('home.whyChoose.multilingualStaff')}</span>
                </li>
              </ul>
              <Link href={addPrefix('/about')}>
                <a className="inline-flex items-center text-primary font-medium mt-6">
                  {t('common.moreInfo')}
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </a>
              </Link>
            </div>
            <div className="bg-neutral-200">
              <img 
                src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                alt="MyHair Clinic Tbilisi" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
