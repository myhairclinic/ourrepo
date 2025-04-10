import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle";

// Fallback service data (real data would come from API)
const fallbackServices = [
  {
    id: 1,
    slug: "hair-transplant",
    imageUrl: "https://images.unsplash.com/photo-1626954079979-ec4f7b84f35c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    titleKey: "services.hairTransplant.title",
    descriptionKey: "services.hairTransplant.description"
  },
  {
    id: 2,
    slug: "eyebrow-transplant",
    imageUrl: "https://images.unsplash.com/photo-1621631210452-7a6b53521eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    titleKey: "services.eyebrowTransplant.title",
    descriptionKey: "services.eyebrowTransplant.description"
  },
  {
    id: 3,
    slug: "prp",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    titleKey: "services.prpTreatment.title",
    descriptionKey: "services.prpTreatment.description"
  }
];

export default function ServiceCards() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Fetch services from API
  const { data: services, isLoading, error } = useQuery({
    queryKey: ["/api/services"],
  });
  
  // If API data is available, use it; otherwise use fallback data
  const serviceItems = services || fallbackServices;

  // Get title based on language and service data
  const getTitle = (service: any) => {
    if (services) {
      return service[`title${language.toUpperCase()}`];
    }
    // If using fallback data, translate the key
    return t(service.titleKey);
  };

  // Get description based on language and service data
  const getDescription = (service: any) => {
    if (services) {
      return service[`description${language.toUpperCase()}`];
    }
    // If using fallback data, translate the key
    return t(service.descriptionKey);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.services.title')}
          description={t('home.services.description')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service) => (
            <div key={service.id} className="bg-neutral-100 rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
              <img 
                src={service.imageUrl} 
                alt={getTitle(service)} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-3">{getTitle(service)}</h3>
                <p className="text-neutral-600 mb-4">
                  {getDescription(service)}
                </p>
                <Link href={addPrefix(`/services/${service.slug}`)}>
                  <a className="inline-flex items-center text-primary font-medium">
                    {t('common.moreInfo')}
                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href={addPrefix('/services')}>
            <a className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
              {t('common.allServices')}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
