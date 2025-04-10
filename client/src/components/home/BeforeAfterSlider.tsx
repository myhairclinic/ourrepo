import { useState, useRef } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle";

// Fallback data (real data would come from API)
const fallbackItems = [
  {
    id: 1,
    type: "before-after",
    beforeImageUrl: "https://images.unsplash.com/photo-1580926200701-a82fbd3bf09f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1582433231177-5e63db4b43c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    descriptionTR: "FUE Saç Ekimi",
    descriptionEN: "FUE Hair Transplant",
    descriptionRU: "Пересадка волос методом FUE",
    descriptionKA: "FUE თმის გადანერგვა",
    timeFrame: "12"
  },
  {
    id: 2,
    type: "before-after",
    beforeImageUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    descriptionTR: "Sakal Ekimi",
    descriptionEN: "Beard Transplant",
    descriptionRU: "Пересадка бороды",
    descriptionKA: "წვერის გადანერგვა",
    timeFrame: "6"
  },
  {
    id: 3,
    type: "before-after",
    beforeImageUrl: "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    afterImageUrl: "https://images.unsplash.com/photo-1611175140153-bfd26338ff0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    descriptionTR: "Kaş Ekimi",
    descriptionEN: "Eyebrow Transplant",
    descriptionRU: "Пересадка бровей",
    descriptionKA: "წარბების გადანერგვა",
    timeFrame: "9"
  }
];

export default function BeforeAfterSlider() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Fetch gallery items from API
  const { data: galleryItems, isLoading, error } = useQuery({
    queryKey: ["/api/gallery/type/before-after"],
  });
  
  // Use API data if available, otherwise use fallback
  const items = galleryItems || fallbackItems;
  const itemsPerSlide = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  
  const getDescription = (item: any) => {
    return item[`description${language.toUpperCase()}`] || "";
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    goToSlide(newIndex);
  };
  
  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t('home.results.title')}
          description={t('home.results.description')}
        />
        
        <div className="relative">
          {/* Slider Controls */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-secondary"
            onClick={prevSlide}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center text-secondary"
            onClick={nextSlide}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Slider */}
          <div className="overflow-hidden" ref={sliderRef}>
            <div className="flex" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease' }}>
              {items.map((item) => (
                <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-neutral-100 rounded-lg overflow-hidden shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="bg-neutral-300 text-center text-xs p-1">{t('before')}</div>
                        <img 
                          src={item.beforeImageUrl} 
                          alt={`${getDescription(item)} before`} 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div>
                        <div className="bg-primary text-white text-center text-xs p-1">{t('after')}</div>
                        <img 
                          src={item.afterImageUrl} 
                          alt={`${getDescription(item)} after`} 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{getDescription(item)}</h3>
                      <p className="text-sm text-neutral-600">
                        {item.timeFrame} {t('monthsResult')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link href={addPrefix('/gallery')}>
            <a className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
              {t('common.viewMore')}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
