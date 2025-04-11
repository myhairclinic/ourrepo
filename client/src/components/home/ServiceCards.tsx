import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { ArrowRight, CheckCircle2, Loader2, Star, TrendingUp, Clock, Sparkles, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Language } from "@shared/types";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';

// Import service images
import hairTransplantImage from "@/assets/images/hair-transplant.png";
import consultationImage from "@/assets/images/consultation.png";

const FeatureIcon = ({ index }: { index: number }) => {
  switch (index % 4) {
    case 0:
      return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
    case 1:
      return <Star className="h-4 w-4 text-amber-500 shrink-0" />;
    case 2:
      return <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />;
    case 3:
      return <Users className="h-4 w-4 text-violet-500 shrink-0" />;
    default:
      return <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />;
  }
};

// Modern ve kompakt hizmet kartı bileşeni
function ServiceCard({ 
  service, 
  getTitle, 
  getDescription, 
  addPrefix, 
  t 
}: { 
  service: Service;
  getTitle: (service: Service) => string;
  getDescription: (service: Service) => string;
  addPrefix: (path: string) => string;
  t: (key: string) => string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="min-w-[280px] max-w-[320px] h-[420px] overflow-hidden border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-gradient-to-br from-white to-primary/5 group mx-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden relative">
        {/* Arka plan gradient efekti */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-70 transition-opacity duration-300 z-10 ${isHovered ? 'opacity-40' : 'opacity-70'}`}></div>
        
        {/* Resim */}
        <img 
          src={service.slug === 'hair-transplantation' 
              ? '/images/services/hair-transplant.jpg'
              : service.slug === 'eyebrow-transplantation' 
                  ? '/images/services/eyebrow-transplant.jpg' 
                  : service.slug === 'beard-transplantation'
                      ? '/images/services/beard-transplant.jpg'
                      : service.slug === 'prp-treatment'
                          ? '/images/services/prp-treatment.jpg'
                          : service.slug === 'hair-mesotherapy'
                              ? '/images/services/hair-mesotherapy.jpg'
                              : service.imageUrl || '/images/placeholder.jpg'
          } 
          alt={`${getTitle(service)} - MyHair Clinic`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            console.log('Resim yüklenirken hata:', service.slug, service.imageUrl);
            target.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=MyHair+Clinic';
          }}
        />
        
        {/* Rozet */}
        <div className="absolute top-3 right-3 z-20">
          <Badge className={`border-0 shadow-md ${isHovered ? 'bg-primary text-white' : 'bg-white/90 text-primary'} transition-all duration-300 py-1 px-2 text-xs font-medium`}>
            {t("services.popular.label")}
          </Badge>
        </div>
        
        {/* Süre */}
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-black/40 text-white shadow-md border-0 py-1 px-2 text-xs font-medium backdrop-blur-sm">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {service.slug === 'hair-transplantation' 
                ? '6-8 saat'
                : service.slug === 'eyebrow-transplantation' 
                  ? '2-3 saat'
                  : service.slug === 'beard-transplantation'
                    ? '3-5 saat'
                    : service.slug === 'prp-treatment' || service.slug === 'hair-mesotherapy'
                      ? '30-45 dk'
                      : '60-90 dk'
              }
            </span>
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {getTitle(service)}
        </h3>
        
        <CardDescription className="text-foreground/70 text-sm mb-4 line-clamp-3">
          {getDescription(service)}
        </CardDescription>
        
        {/* Hızlı bilgi rozetleri */}
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          <Badge variant="secondary" className="bg-primary/5 text-primary/90 border border-primary/10 text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {service.slug === 'hair-transplantation' 
              ? t("services.features.naturalResults")
              : service.slug === 'eyebrow-transplantation' 
                ? t("services.features.customDesign") 
                : service.slug === 'beard-transplantation'
                  ? t("services.features.densityControl")
                  : t("services.features.consultation")
            }
          </Badge>
          <Badge variant="secondary" className="bg-primary/5 text-primary/90 border border-primary/10 text-xs">
            <Star className="h-3 w-3 mr-1" />
            {t("services.features.satisfaction")}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="pb-4 px-4 pt-0">
        <Link href={addPrefix(`/services/${service.slug}`)} className="w-full">
          <Button 
            variant="default" 
            className={`w-full transition-all duration-300 rounded-lg h-9 text-sm ${
              isHovered 
                ? 'bg-gradient-to-r from-primary to-primary/90 shadow-md' 
                : 'bg-primary'
            }`}
          >
            <span className="font-medium">{t("common.learnMore")}</span>
            <ArrowRight className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ServiceCards() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Embla Carousel hooks
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  
  // Carousel kontrol fonksiyonları
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // Prev/next buton etkinlik durumlarını güncelleme
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Intersection observer to trigger animations when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // API endpoint'in tam URL olarak belirtilmesi (port farklılıklarını çözmek için)
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, // 1 dakika
  });

  // Helper function to get the title based on the current language
  const getLocalizedTitle = (service: Service) => {
    switch (language) {
      case Language.Turkish:
        return service.titleTR;
      case Language.English:
        return service.titleEN;
      case Language.Russian:
        return service.titleRU;
      case Language.Georgian:
        return service.titleKA;
      default:
        return service.titleEN;
    }
  };

  // Helper function to get the description based on the current language
  const getLocalizedDescription = (service: Service) => {
    switch (language) {
      case Language.Turkish:
        return service.descriptionTR;
      case Language.English:
        return service.descriptionEN;
      case Language.Russian:
        return service.descriptionRU;
      case Language.Georgian:
        return service.descriptionKA;
      default:
        return service.descriptionEN;
    }
  };

  // Create service features
  const commonFeatures = [
    t("services.features.consultation"),
    t("services.features.aftercare"),
    t("services.features.support"),
    t("services.features.satisfaction")
  ];

  // Add more custom features for each service
  const getServiceFeatures = (serviceId: number) => {
    const customFeatures: Record<number, string[]> = {
      1: [t("services.features.naturalResults"), t("services.features.permanentSolution")],
      2: [t("services.features.customDesign"), t("services.features.naturalAppearance")],
      3: [t("services.features.densityControl"), t("services.features.facialHarmony")],
      4: [t("services.features.regeneration"), t("services.features.noChemicals")],
      5: [t("services.features.hairStrength"), t("services.features.scalpeHealth")],
    };

    return [...(customFeatures[serviceId] || []), ...commonFeatures];
  };

  // Debug: Konsola servisleri yazdır
  console.log("Hizmetler:", services);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-white to-primary/5"
    >
      {/* Modern arka plan desenleri */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent z-10"></div>
      
      {/* Gelişmiş animasyonlu arka plan efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-blob"></div>
        <div className="absolute right-10 top-1/3 w-[30rem] h-[30rem] rounded-full bg-blue-300/5 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/3 bottom-10 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Dekoratif elementler */}
      <div className="absolute top-24 left-8 w-16 h-16 border-2 border-primary/10 rounded-lg rotate-12 opacity-40"></div>
      <div className="absolute bottom-24 right-8 w-24 h-24 border-2 border-primary/10 rounded-full opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex justify-between items-center mb-12">
          <div 
            className={`flex flex-col items-start transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge variant="outline" className="mb-3 px-4 py-1 text-sm font-medium rounded-full border-primary/30 bg-primary/5 shadow-sm">
              {t("services.badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
              {t("common.services")}
            </h2>
            <p className="text-foreground/70 max-w-xl text-base font-light leading-relaxed">
              {t("services.subtitle")}
            </p>
            
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-primary/30"></div>
              <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              <div className="w-2 h-2 rounded-full bg-primary/70"></div>
            </div>
          </div>
          
          {/* Tüm hizmetleri görüntüle butonu - sağ üste taşındı */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '200ms' }}>
            <Link href={addPrefix("/services")}>
              <Button className="bg-white border border-primary/30 text-primary hover:bg-primary/5 transition-all px-6">
                {t("common.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <Loader2 className="h-8 w-8 animate-spin text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-lg border border-red-100 shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-medium">{t("error.somethingWentWrong")}</span>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                {t("common.tryAgain")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex py-4">
                {services && services.length > 0 ? (
                  // Önce saç ekimini (hair-transplantation) en başa almak için servisleri sıralayıp map'liyoruz
                  [...services]
                    .sort((a, b) => {
                      // Saç ekimi her zaman ilk sırada olsun
                      if (a.slug === 'hair-transplantation') return -1;
                      if (b.slug === 'hair-transplantation') return 1;
                      // Diğer servisler için mevcut sırayı koru
                      return 0;
                    })
                    .map((service, index) => (
                      <div
                        key={service.id}
                        className={`transition-all duration-700 transform flex-shrink-0 min-w-[320px] w-[320px] px-3 ${
                          isInView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        }`}
                        style={{ transitionDelay: `${index * 120}ms` }}
                      >
                        <ServiceCard
                          service={service}
                          getTitle={getLocalizedTitle}
                          getDescription={getLocalizedDescription}
                          addPrefix={addPrefix}
                          t={t}
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-center py-10 w-full">
                    <p>Hizmetler bulunamadı.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Carousel navigation buttons */}
            <div className="flex justify-between mt-6 px-2">
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full border border-primary/30 bg-white shadow-sm transition-all ${
                  prevBtnEnabled ? 'opacity-100 hover:scale-105' : 'opacity-40 cursor-not-allowed'
                }`}
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
              >
                <ChevronLeft className="h-5 w-5 text-primary" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full border border-primary/30 bg-white shadow-sm transition-all ${
                  nextBtnEnabled ? 'opacity-100 hover:scale-105' : 'opacity-40 cursor-not-allowed'
                }`}
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
              >
                <ChevronRight className="h-5 w-5 text-primary" />
              </Button>
            </div>
            
            {/* Alt butonu kaldırıldı - üstte artık */}
          </div>
        )}
        
        {/* Modern dekoratif unsurlar (tüm hizmetleri gör butonu kaldırıldı) */}
        <div className="mx-auto max-w-md mt-10 flex justify-center transition-all duration-1000 opacity-80"
             style={{ transitionDelay: '600ms' }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}