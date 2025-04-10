import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { META } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

export default function AboutPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Fetch clinic info
  const { data: clinicInfo } = useQuery({
    queryKey: ["/api/clinic-info"],
  });
  
  // Fetch testimonials
  const { data: testimonials } = useQuery({
    queryKey: ["/api/testimonials"],
  });
  
  return (
    <>
      <Helmet>
        <title>{t('about.title') + META.TITLE_SUFFIX}</title>
        <meta name="description" content={t('about.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/about")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/about"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/about"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/about"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/about"} />
      </Helmet>
      
      <main className="py-16">
        {/* Intro Section */}
        <section className="bg-primary/5 py-12 mb-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-secondary">{t('about.title')}</h1>
                <div className="prose prose-lg">
                  {clinicInfo ? (
                    <p>{clinicInfo[`about${language.toUpperCase()}`]}</p>
                  ) : (
                    <p>{t('about.description')}</p>
                  )}
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                  alt="MyHair Clinic" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="container mx-auto px-4 mb-16">
          <SectionTitle 
            title={t('about.ourValues')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{t('about.excellence')}</h3>
              <p className="text-neutral-600">
                {t('about.excellenceDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <i className="fas fa-user-md text-2xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{t('about.expertise')}</h3>
              <p className="text-neutral-600">
                {t('about.expertiseDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{t('about.care')}</h3>
              <p className="text-neutral-600">
                {t('about.careDesc')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{t('about.safety')}</h3>
              <p className="text-neutral-600">
                {t('about.safetyDesc')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Team Section */}
        <section className="bg-white py-16 mb-16">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title={t('about.ourTeam')}
              description={t('about.ourTeamDesc')}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Doctor 1 */}
              <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Dr. Ahmet Yılmaz" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-1">Dr. Ahmet Yılmaz</h3>
                  <p className="text-primary mb-3">{t('about.chiefSurgeon')}</p>
                  <p className="text-neutral-600 mb-4">
                    {t('about.doctorDesc1')}
                  </p>
                </div>
              </div>
              
              {/* Doctor 2 */}
              <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Dr. Nino Tsiklauri" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-1">Dr. Nino Tsiklauri</h3>
                  <p className="text-primary mb-3">{t('about.hairSpecialist')}</p>
                  <p className="text-neutral-600 mb-4">
                    {t('about.doctorDesc2')}
                  </p>
                </div>
              </div>
              
              {/* Technician */}
              <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                  alt="Mehmet Demir" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-1">Mehmet Demir</h3>
                  <p className="text-primary mb-3">{t('about.seniorTechnician')}</p>
                  <p className="text-neutral-600 mb-4">
                    {t('about.technicianDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Facilities Section */}
        <section className="container mx-auto px-4 mb-16">
          <SectionTitle 
            title={t('about.ourFacilities')}
            description={t('about.ourFacilitiesDesc')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="MyHair Clinic Facilities" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold mb-4">{t('about.stateOfTheArt')}</h3>
              <div className="space-y-4">
                <p className="text-neutral-600">
                  {t('about.facilitiesDesc1')}
                </p>
                <p className="text-neutral-600">
                  {t('about.facilitiesDesc2')}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                    <span>{t('about.facility1')}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                    <span>{t('about.facility2')}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                    <span>{t('about.facility3')}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-success mt-1 mr-3"></i>
                    <span>{t('about.facility4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Patient Testimonials */}
        {testimonials && testimonials.length > 0 && (
          <section className="bg-neutral-100 py-16 mb-16">
            <div className="container mx-auto px-4">
              <SectionTitle 
                title={t('about.testimonials')}
                description={t('about.testimonialsDesc')}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.slice(0, 3).map((testimonial: any) => (
                  <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-primary">
                        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                        {testimonial.rating % 1 !== 0 && (
                          <i className="fas fa-star-half-alt"></i>
                        )}
                      </div>
                      <span className="ml-2 text-sm text-neutral-500">{testimonial.rating.toFixed(1)}</span>
                    </div>
                    <blockquote className="text-neutral-600 italic mb-6">
                      "{testimonial[`comment${language.toUpperCase()}`]}"
                    </blockquote>
                    <div className="flex items-center">
                      {testimonial.imageUrl && (
                        <img 
                          src={testimonial.imageUrl} 
                          alt={testimonial[`name${language.toUpperCase()}`]} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div className="ml-3">
                        <h4 className="font-medium">{testimonial[`name${language.toUpperCase()}`]}</h4>
                        <p className="text-sm text-neutral-500">{testimonial[`location${language.toUpperCase()}`]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-secondary mb-4">{t('about.ctaTitle')}</h2>
            <p className="text-neutral-600 mb-6">{t('about.ctaDesc')}</p>
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
