import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { META, GALLERY_TYPES } from "@/lib/constants";
import SectionTitle from "@/components/shared/SectionTitle";

export default function GalleryPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>(GALLERY_TYPES.BEFORE_AFTER);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  // Fetch gallery items
  const { data: allGalleryItems, isLoading } = useQuery({
    queryKey: ["/api/gallery"],
  });
  
  // Fetch services for filter
  const { data: services } = useQuery({
    queryKey: ["/api/services"],
  });
  
  // Filter gallery items based on active tab and selected service
  const filteredItems = allGalleryItems ? allGalleryItems.filter((item: any) => {
    if (item.type !== activeTab) return false;
    if (selectedService && item.serviceId !== selectedService) return false;
    return true;
  }) : [];
  
  const getServiceName = (serviceId: number) => {
    if (!services) return "";
    const service = services.find((s: any) => s.id === serviceId);
    return service ? service[`title${language.toUpperCase()}`] : "";
  };
  
  const getDescription = (item: any) => {
    return item[`description${language.toUpperCase()}`] || "";
  };
  
  return (
    <>
      <Helmet>
        <title>{t('gallery.title') + META.TITLE_SUFFIX}</title>
        <meta name="description" content={t('gallery.description')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/gallery")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/gallery"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/gallery"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/gallery"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/gallery"} />
      </Helmet>
      
      <main className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('gallery.title')}
            description={t('gallery.description')}
          />
          
          {/* Gallery Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex bg-neutral-100 rounded-lg p-1">
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === GALLERY_TYPES.BEFORE_AFTER ? 'bg-primary text-white' : 'hover:bg-neutral-200'}`}
                onClick={() => setActiveTab(GALLERY_TYPES.BEFORE_AFTER)}
              >
                {t('gallery.beforeAfter')}
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === GALLERY_TYPES.CLINIC ? 'bg-primary text-white' : 'hover:bg-neutral-200'}`}
                onClick={() => setActiveTab(GALLERY_TYPES.CLINIC)}
              >
                {t('gallery.clinic')}
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === GALLERY_TYPES.VIDEO ? 'bg-primary text-white' : 'hover:bg-neutral-200'}`}
                onClick={() => setActiveTab(GALLERY_TYPES.VIDEO)}
              >
                {t('gallery.videos')}
              </button>
            </div>
          </div>
          
          {/* Service Filter (only for before/after) */}
          {activeTab === GALLERY_TYPES.BEFORE_AFTER && services && (
            <div className="mb-8 flex justify-center flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-md border ${selectedService === null ? 'bg-primary text-white border-primary' : 'border-neutral-200 hover:bg-neutral-100'}`}
                onClick={() => setSelectedService(null)}
              >
                {t('gallery.allServices')}
              </button>
              {services.map((service: any) => (
                <button 
                  key={service.id}
                  className={`px-4 py-2 rounded-md border ${selectedService === service.id ? 'bg-primary text-white border-primary' : 'border-neutral-200 hover:bg-neutral-100'}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  {service[`title${language.toUpperCase()}`]}
                </button>
              ))}
            </div>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {/* Before/After Gallery */}
          {activeTab === GALLERY_TYPES.BEFORE_AFTER && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item: any) => (
                <div key={item.id} className="bg-neutral-100 rounded-lg overflow-hidden shadow-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="bg-neutral-300 text-center text-xs p-1">{t('gallery.before')}</div>
                      <img 
                        src={item.beforeImageUrl} 
                        alt={`${getServiceName(item.serviceId)} before`} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div>
                      <div className="bg-primary text-white text-center text-xs p-1">{t('gallery.after')}</div>
                      <img 
                        src={item.afterImageUrl} 
                        alt={`${getServiceName(item.serviceId)} after`} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">
                      {item.serviceId ? getServiceName(item.serviceId) : getDescription(item)}
                    </h3>
                    {getDescription(item) && item.serviceId && (
                      <p className="text-sm text-neutral-600">{getDescription(item)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Clinic Gallery */}
          {activeTab === GALLERY_TYPES.CLINIC && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={item.imageUrl} 
                    alt={getDescription(item)}
                    className="w-full h-64 object-cover"
                  />
                  {getDescription(item) && (
                    <div className="p-4">
                      <p className="text-neutral-600">{getDescription(item)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Video Gallery */}
          {activeTab === GALLERY_TYPES.VIDEO && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-video relative">
                    <iframe
                      src={item.videoUrl}
                      title={getDescription(item)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                  {getDescription(item) && (
                    <div className="p-4">
                      <p className="text-neutral-600">{getDescription(item)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">{t('gallery.noItems')}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
