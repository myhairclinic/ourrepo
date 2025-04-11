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

// Ülke görsellerini doğrudan import edelim
import turkeyImage from "@assets/kız-kulesi.webp";
import russiaImage from "@assets/U-kremlin-sarayi-rusya-sehir-manzarasi-dunyaca-unlu-sehirler-kanvas-tablo1455893402-800.jpg";
import azerbaijanImage from "@assets/azerbaycan-giris-Jy5Z_cover.jpg";
import kazakhstanImage from "@assets/kazakistanin-ruhu-bu-topr-700.jpg";
import iranImage from "@assets/iran-resimleri.jpg";
import ukraineImage from "@assets/st-andrew-s-church.jpg";

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
  countryOrigin: string;
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

// Utility functions
function getCountryEmoji(countryCode: string): string {
  switch (countryCode) {
    case 'TR':
      return '🇹🇷';
    case 'RU':
      return '🇷🇺';
    case 'AZ':
      return '🇦🇿';
    case 'KZ':
      return '🇰🇿';
    case 'IR':
      return '🇮🇷';
    case 'EU':
      return '🇪🇺';
    default:
      return '🌍';
  }
}

function getCountryName(countryCode: string, t: (key: string) => string): string {
  switch (countryCode) {
    case 'TR':
      return t("countries.turkey");
    case 'RU':
      return t("countries.russia");
    case 'AZ':
      return t("countries.azerbaijan");
    case 'KZ':
      return t("countries.kazakhstan");
    case 'IR':
      return t("countries.iran");
    case 'EU':
      return t("countries.europe");
    default:
      return t("countries.international");
  }
}

function getCountryImage(countryCode: string): string {
  // İmport edilen görsellere referans ver
  switch (countryCode) {
    case 'TR':
      return turkeyImage;
    case 'RU':
      return russiaImage;
    case 'AZ':
      return azerbaijanImage;
    case 'KZ':
      return kazakhstanImage;
    case 'IR':
      return iranImage;
    case 'UA': // Ukraine
      return ukraineImage;
    case 'GE': // Georgia
      return '/images/countries/georgia.jpg';
    default:
      return '/images/packages/default-package.jpg';
  }
}

function PackageCard({ package: pkg, getTitle, getDescription, addPrefix, t }: PackageCardProps) {
  const title = getTitle(pkg);
  const description = getDescription(pkg);
  const packageUrl = addPrefix(`/packages/${pkg.slug}`);
  
  // Get country info if countryOrigin exists
  const countryInfo = pkg.countryOrigin ? {
    flag: getCountryEmoji(pkg.countryOrigin),
    name: getCountryName(pkg.countryOrigin, t),
    image: getCountryImage(pkg.countryOrigin)
  } : { 
    flag: '🌍', 
    name: t("countries.international"),
    image: '/images/packages/default-package.jpg'
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-border/30 group">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={countryInfo.image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
        
        {/* Country Badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge 
            variant="secondary" 
            className="bg-white/90 backdrop-blur-sm text-foreground shadow-lg font-medium px-3 py-1 flex items-center gap-1"
          >
            <span className="text-lg mr-1">{countryInfo.flag}</span> {countryInfo.name}
          </Badge>
        </div>
        
        {/* All Inclusive Badge - if applicable */}
        {pkg.isAllInclusive && (
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              variant="secondary" 
              className="bg-primary/90 text-white shadow-lg font-medium px-3 py-1 flex items-center gap-1"
            >
              <Heart className="h-3 w-3" /> {t("packages.home.allInclusive")}
            </Badge>
          </div>
        )}
        
        {/* Location Badge */}
        {pkg.location && (
          <div className="absolute bottom-4 left-4 z-10">
            <Badge 
              variant="outline" 
              className="bg-black/50 text-white border-white/20 shadow-md backdrop-blur-sm flex items-center gap-1"
            >
              <MapPin className="h-3 w-3 text-primary/90" /> {pkg.location}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        {/* Duration and Guest info */}
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary/80" />
            {pkg.durationDays} {t("packages.home.days")}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary/80" />
            {t("packages.home.forPerson")}
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
                {t("packages.home.details")}
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
    queryKey: ["/api/packages/one-per-country"],
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
  
  // Helper function to get country flag and name
  const getCountryInfo = (countryCode: string) => {
    switch (countryCode) {
      case 'TR':
        return { flag: '🇹🇷', name: t("countries.turkey") };
      case 'RU':
        return { flag: '🇷🇺', name: t("countries.russia") };
      case 'AZ':
        return { flag: '🇦🇿', name: t("countries.azerbaijan") };
      case 'KZ':
        return { flag: '🇰🇿', name: t("countries.kazakhstan") };
      case 'IR':
        return { flag: '🇮🇷', name: t("countries.iran") };
      case 'EU':
        return { flag: '🇪🇺', name: t("countries.europe") };
      default:
        return { flag: '🌍', name: t("countries.international") };
    }
  };
  
  // Debug: Konsola paketleri ve ülke bilgilerini yazdır
  console.log("Paketler:", packages);
  
  // Ülke görselleri ve countryOrigin bilgilerini kontrol et
  if (packages && packages.length > 0) {
    packages.forEach(pkg => {
      console.log(`Paket: ${pkg.titleTR}, Ülke: ${pkg.countryOrigin}, Görsel URL: ${getCountryImage(pkg.countryOrigin || '')}`);
    });
  }
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/5 to-white"
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
        <div className="flex justify-between items-center mb-12">
          <div 
            className={`flex flex-col items-start transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Badge variant="outline" className="mb-3 px-4 py-1 text-sm font-medium rounded-full border-primary/30 bg-primary/5 shadow-sm">
              {t("packages.home.tagline")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
              {t("packages.home.title")}
            </h2>
            <p className="text-foreground/70 max-w-xl text-base font-light leading-relaxed">
              {t("packages.home.subtitle")}
            </p>
            
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-primary/30"></div>
              <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              <div className="w-2 h-2 rounded-full bg-primary/70"></div>
            </div>
          </div>
          
          {/* Tüm paketleri görüntüle butonu - sağ üste taşındı */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '200ms' }}>
            <Link href={addPrefix("/packages")}>
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
            
            {/* Alt butonu kaldırıldı - üstte artık */}
          </div>
        )}
        
        {/* Modern dekoratif unsurlar */}
        <div className="mx-auto max-w-md mt-10 flex justify-center transition-all duration-1000 opacity-80"
             style={{ transitionDelay: '600ms' }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
        
        {/* Sosyal medya alanı */}
        <div className={`mt-16 mb-8 text-center transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
             style={{ transitionDelay: '700ms' }}>
          <h3 className="text-xl font-semibold mb-3 text-foreground/90">
            {t("common.followUs")}
          </h3>
          <p className="text-foreground/60 text-base font-light mb-6 max-w-md mx-auto">
            {t("common.socialMediaDesc")}
          </p>
          
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/myhairtbilisi" target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 border border-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            <a href="https://facebook.com/myhairtbilisi" target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 border border-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            
            <a href="https://tiktok.com/@myhairtbilisi" target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 border border-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                <path d="M15 8a4 4 0 1 0 0 8"></path>
                <path d="M15 5c-.18-.19-.36-.36-.53-.53a3.8 3.8 0 0 1-1.13-2.15A3.5 3.5 0 0 1 13.5 1"></path>
                <path d="M14.5 23c.28-.1.54-.22.78-.38.76-.5 1.16-1.35 1.21-2.73.003-1.14.003-2.04 0-2.7"></path>
                <path d="M16.5 8.5c1.92.13 3.41 1.23 5.3 3.27-1.4 2.34-4.35 8.9-7.8 9.97 0 0 0-6.3.03-10.82"></path>
              </svg>
            </a>
            
            <a href="https://wa.me/995555003044" target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all transform hover:scale-110 border border-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}