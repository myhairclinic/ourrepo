import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

export default function ServicePage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Fetch service details
  const { data: service, isLoading, error } = useQuery({
    queryKey: [`/api/services/${slug}`],
  });
  
  // Fetch FAQs for this service
  const { data: faqs } = useQuery({
    queryKey: [`/api/faqs/service/${service?.id}`],
    enabled: !!service?.id,
  });
  
  // Fetch before/after gallery items for this service
  const { data: galleryItems } = useQuery({
    queryKey: [`/api/gallery/service/${service?.id}`],
    enabled: !!service?.id,
  });
  
  // Redirect to 404 if service not found
  useEffect(() => {
    if (!isLoading && !service && !error) {
      setLocation("/404");
    }
  }, [isLoading, service, error, setLocation]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (!service) {
    return null; // Will redirect to 404
  }
  
  // Content based on current language
  const title = service[`title${language.toUpperCase()}`];
  const description = service[`description${language.toUpperCase()}`];
  const content = service[`content${language.toUpperCase()}`];
  const process = service[`process${language.toUpperCase()}`];
  
  return (
    <>
      <Helmet>
        <title>{title + META.TITLE_SUFFIX}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={window.location.origin + addPrefix(`/services/${slug}`)} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + `/tr/services/${slug}`} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + `/en/services/${slug}`} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + `/ru/services/${slug}`} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + `/ka/services/${slug}`} />
      </Helmet>
      
      <main className="py-16">
        {/* Hero Section */}
        <section className="bg-primary/5 py-12 mb-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-secondary">{title}</h1>
                <p className="text-neutral-600 text-lg mb-6">{description}</p>
                <Link href={addPrefix('/appointment')}>
                  <a className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200 inline-flex items-center">
                    {t('common.bookAppointment')}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </Link>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={service.imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="bg-neutral-100 py-16 mb-16">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title={t('processTitle')}
              description={t('processDescription')}
            />
            
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: process }}></div>
            </div>
          </div>
        </section>
        
        {/* Before/After Gallery */}
        {galleryItems && galleryItems.length > 0 && (
          <section className="container mx-auto px-4 mb-16">
            <SectionTitle 
              title={t('beforeAfterTitle')}
              description={t('beforeAfterDescription')}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item: any) => (
                <div key={item.id} className="bg-neutral-100 rounded-lg overflow-hidden shadow-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="bg-neutral-300 text-center text-xs p-1">{t('before')}</div>
                      <img 
                        src={item.beforeImageUrl} 
                        alt={`${title} before`} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div>
                      <div className="bg-primary text-white text-center text-xs p-1">{t('after')}</div>
                      <img 
                        src={item.afterImageUrl} 
                        alt={`${title} after`} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                  {item[`description${language.toUpperCase()}`] && (
                    <div className="p-4">
                      <p className="text-neutral-600">{item[`description${language.toUpperCase()}`]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href={addPrefix('/gallery')}>
                <a className="inline-flex items-center text-primary font-medium">
                  {t('common.viewMore')}
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </a>
              </Link>
            </div>
          </section>
        )}
        
        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="bg-neutral-100 py-16">
            <div className="container mx-auto px-4">
              <SectionTitle 
                title={t('faqTitle')}
              />
              
              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {faqs.map((faq: any) => (
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
            </div>
          </section>
        )}
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-4">{t('ctaTitle')}</h2>
            <p className="text-neutral-600 mb-6">{t('ctaDescription')}</p>
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
          </div>
        </section>
      </main>
    </>
  );
}
