import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

export default function PackagesPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Fetch packages
  const { data: packages, isLoading } = useQuery({
    queryKey: ["/api/packages"],
  });
  
  // Fetch FAQs related to packages
  const { data: faqs } = useQuery({
    queryKey: ["/api/faqs"],
  });
  
  // Filter package-related FAQs
  const packageFaqs = faqs ? faqs.filter((faq: any) => !faq.serviceId) : [];
  
  return (
    <>
      <Helmet>
        <title>{t('packages.title') + META.TITLE_SUFFIX}</title>
        <meta name="description" content={t('packages.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/packages")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/packages"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/packages"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/packages"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/packages"} />
      </Helmet>
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('packages.title')}
            description={t('packages.description')}
          />
          
          {/* Intro Section */}
          <section className="mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-neutral-600 mb-8">
                {t('packages.intro')}
              </p>
              <div className="bg-primary/5 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-heading text-xl font-semibold mb-3 text-center">{t('packages.notIncluded')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-info-circle text-primary mr-2"></i>
                    <span>{t('packages.notIncludedTreatment')}</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-info-circle text-primary mr-2"></i>
                    <span>{t('packages.notIncludedExtras')}</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-info-circle text-primary mr-2"></i>
                    <span>{t('packages.contactForPricing')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Main Package Categories */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="transportation">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden" id="accommodation">
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
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
          </section>
          
          {/* Custom Packages */}
          {!isLoading && packages && packages.length > 0 && (
            <section className="mb-16">
              <h2 className="font-heading text-2xl font-bold text-secondary mb-8 text-center">{t('packages.customTitle')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {packages.map((pkg: any) => (
                  <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg[`title${language.toUpperCase()}`]} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        {pkg[`title${language.toUpperCase()}`]}
                      </h3>
                      <p className="text-neutral-600 mb-4">
                        {pkg[`description${language.toUpperCase()}`]}
                      </p>
                      <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: pkg[`content${language.toUpperCase()}`] }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <SectionTitle 
              title={t('packages.faqTitle')}
            />
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {packageFaqs.map((faq: any) => (
                  <details 
                    key={faq.id} 
                    className="bg-white rounded-lg shadow-sm p-6 group"
                  >
                    <summary className="font-medium text-lg cursor-pointer list-none flex justify-between items-center">
                      {faq[`question${language.toUpperCase()}`]}
                      <i className="fas fa-chevron-down group-open:rotate-180 transition-transform duration-200"></i>
                    </summary>
                    <div className="mt-4 text-neutral-600">
                      <p>{faq[`answer${language.toUpperCase()}`]}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-4">{t('packages.ctaTitle')}</h2>
            <p className="text-neutral-600 mb-6 max-w-3xl mx-auto">{t('home.packages.customizedPackagesDesc')}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={addPrefix('/appointment')}>
                <a className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
                  {t('common.bookAppointment')}
                </a>
              </Link>
              <Link href={addPrefix('/contact')}>
                <a className="bg-white hover:bg-neutral-100 text-secondary font-medium px-6 py-3 rounded-md transition duration-200 border border-neutral-200">
                  {t('common.contactUs')}
                </a>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
