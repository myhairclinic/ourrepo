import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@shared/types";
import useEmblaCarousel from "embla-carousel-react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  Tag, 
  Users,
  Heart 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Package {
  id: number;
  slug: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  descriptionTR: string;
  descriptionEN: string;
  descriptionRU: string;
  descriptionKA: string;
  contentTR: string;
  contentEN: string;
  contentRU: string;
  contentKA: string;
  imageUrl: string;
  features: string[];
  durationDays: number;
  location: string;
  isAllInclusive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Paket kartı bileşeni
interface PackageCardProps {
  package: Package;
  getTitle: (p: Package) => string;
  getDescription: (p: Package) => string;
  addPrefix: (path: string) => string;
  t: (key: string) => string;
}

function PackageCard({ package: pkg, getTitle, getDescription, addPrefix, t }: PackageCardProps) {
  const title = getTitle(pkg);
  const description = getDescription(pkg);
  const packageUrl = addPrefix(`/packages/${pkg.slug}`);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-border/30 group">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={pkg.imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
        
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge 
            variant="secondary" 
            className="bg-white/90 backdrop-blur-sm text-primary shadow-lg font-medium px-3 py-1"
          >
            {t("packages.badge")}
          </Badge>
        </div>
        
        {/* All Inclusive Badge - if applicable */}
        {pkg.isAllInclusive && (
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              variant="secondary" 
              className="bg-primary/90 text-white shadow-lg font-medium px-3 py-1 flex items-center gap-1"
            >
              <Heart className="h-3 w-3" /> {t("packages.allInclusive")}
            </Badge>
          </div>
        )}
        
        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <Badge 
            variant="outline" 
            className="bg-black/50 text-white border-white/20 shadow-md backdrop-blur-sm flex items-center gap-1"
          >
            <MapPin className="h-3 w-3 text-primary/90" /> {pkg.location}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        {/* Duration and Guest info */}
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary/80" />
            {pkg.durationDays} {t("packages.days")}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary/80" />
            {t("packages.forPerson")}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Features */}
        <div className="mt-auto">
          <div className="border-t border-border/30 pt-4 mt-2">
            <Link href={packageUrl}>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300 border-primary/30"
              >
                {t("packages.details")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PackageCards() {
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
  
  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, // 1 dakika
  });

  // Helper function to get the title based on the current language
  const getLocalizedTitle = (pkg: Package) => {
    switch (language) {
      case Language.Turkish:
        return pkg.titleTR;
      case Language.English:
        return pkg.titleEN;
      case Language.Russian:
        return pkg.titleRU;
      case Language.Georgian:
        return pkg.titleKA;
      default:
        return pkg.titleEN;
    }
  };

  // Helper function to get the description based on the current language
  const getLocalizedDescription = (pkg: Package) => {
    switch (language) {
      case Language.Turkish:
        return pkg.descriptionTR;
      case Language.English:
        return pkg.descriptionEN;
      case Language.Russian:
        return pkg.descriptionRU;
      case Language.Georgian:
        return pkg.descriptionKA;
      default:
        return pkg.descriptionEN;
    }
  };
  
  // Debug: Konsola paketleri yazdır
  console.log("Paketler:", packages);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-gradient-to-b from-primary/5 to-white"
    >
      {/* Modern arka plan desenleri */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Gelişmiş animasyonlu arka plan efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-blob"></div>
        <div className="absolute left-10 top-1/3 w-[30rem] h-[30rem] rounded-full bg-blue-300/5 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute right-1/3 bottom-10 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Dekoratif elementler */}
      <div className="absolute top-24 right-8 w-16 h-16 border-2 border-primary/10 rounded-lg rotate-12 opacity-40"></div>
      <div className="absolute bottom-24 left-8 w-24 h-24 border-2 border-primary/10 rounded-full opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div 
          className={`flex flex-col items-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge variant="outline" className="mb-4 px-5 py-1.5 text-sm font-medium rounded-full border-primary/30 bg-primary/5 shadow-sm">
            {t("packages.tagline")}
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
            {t("packages.title")}
          </h2>
          <p className="text-center text-foreground/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {t("packages.subtitle")}
          </p>
          
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-3 h-3 rounded-full bg-primary/30"></div>
            <div className="w-3 h-3 rounded-full bg-primary/50"></div>
            <div className="w-3 h-3 rounded-full bg-primary/70"></div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <Clock className="h-8 w-8 animate-spin text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
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
                {packages && packages.length > 0 ? (
                  packages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className={`transition-all duration-700 transform flex-shrink-0 min-w-[350px] w-[350px] px-3 ${
                        isInView
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 120}ms` }}
                    >
                      <PackageCard
                        package={pkg}
                        getTitle={getLocalizedTitle}
                        getDescription={getLocalizedDescription}
                        addPrefix={addPrefix}
                        t={t}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 w-full">
                    <p>Paketler bulunamadı.</p>
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
            
            {/* Tüm paketleri görüntüle butonu */}
            <div className="mt-10 text-center">
              <Link href={addPrefix("/packages")}>
                <Button className="bg-white border border-primary/30 text-primary hover:bg-primary/5 transition-all px-6">
                  {t("common.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        {/* Modern dekoratif unsurlar */}
        <div className="mx-auto max-w-md mt-20 flex justify-center transition-all duration-1000 opacity-80"
             style={{ transitionDelay: '600ms' }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}