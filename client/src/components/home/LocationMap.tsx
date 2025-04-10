import { useTranslation } from "@/hooks/use-translation";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle";

export default function LocationMap() {
  const { t } = useTranslation();
  
  // Fetch clinic info for contact details
  const { data: clinicInfo } = useQuery({
    queryKey: ["/api/clinic-info"],
  });
  
  const googleMapsUrl = clinicInfo?.googleMapsUrl || "https://maps.google.com/maps?q=tbilisi&t=&z=13&ie=UTF8&iwloc=&output=embed";
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.location.title')}
          description={t('home.location.description')}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-md h-[400px]">
            <iframe 
              src={googleMapsUrl}
              className="w-full h-full border-0" 
              title="Google Maps Location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="MyHair Clinic Location Map"
            ></iframe>
          </div>
          
          <div className="bg-neutral-100 rounded-lg p-6 shadow-md">
            <h3 className="font-heading text-xl font-semibold mb-6">{t('home.location.contactInfo')}</h3>
            
            <div className="space-y-6">
              {clinicInfo && (
                <>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-primary">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('home.location.address')}</h4>
                      <p className="text-neutral-600">{clinicInfo.addressEN}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-primary">
                      <i className="fas fa-phone-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('home.location.phone')}</h4>
                      <p className="text-neutral-600">{clinicInfo.phone}</p>
                      <p className="text-neutral-600">+90 (532) 123 45 67 (Türkiye)</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-primary">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('home.location.email')}</h4>
                      <p className="text-neutral-600">{clinicInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-primary">
                      <i className="fas fa-clock text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t('home.location.workingHours')}</h4>
                      <p className="text-neutral-600">{t('home.location.weekdays')}</p>
                      <p className="text-neutral-600">{t('home.location.saturday')}</p>
                      <p className="text-neutral-600">{t('home.location.sunday')}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-8">
              <a 
                href={clinicInfo ? `https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}` : "https://wa.me/995123456789"}
                className="flex items-center justify-center bg-[#25D366] text-white font-medium px-6 py-3 rounded-md hover:bg-[#25D366]/90 transition duration-200 w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
