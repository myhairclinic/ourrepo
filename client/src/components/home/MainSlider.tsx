import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  CalendarCheck, 
  MapPin,
  Phone
} from "lucide-react";

// Slider görselleri
import tbilisiImage from "@assets/tbilisi.jpg";
import tiflisNatureImage from "@assets/tiflis-gezi-rehberi-tiflis-gezilecek-yerler-gürcistan-gezi-rehberi-gürcistan-gezilecek-yerler-2.webp";
import prpTreatmentImage from "@assets/ChatGPT Image 11 Nis 2025 03_09_54.png";
import hairTreatmentImage from "@assets/ChatGPT Image 11 Nis 2025 03_04_57.png";
import operationRoomImage from "@assets/IMG-20250325-WA0050.jpg";

interface SlideType {
  id: number;
  imageUrl: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  descriptionTR: string;
  descriptionEN: string;
  descriptionRU: string;
  descriptionKA: string;
  ctaLinkTR: string;
  ctaLinkEN: string;
  ctaLinkRU: string;
  ctaLinkKA: string;
  ctaTextTR: string;
  ctaTextEN: string;
  ctaTextRU: string;
  ctaTextKA: string;
  badgeTextTR?: string;
  badgeTextEN?: string;
  badgeTextRU?: string;
  badgeTextKA?: string;
}

export default function MainSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation();
  
  // Slider içeriği 
  const slides: SlideType[] = [
    {
      id: 1,
      imageUrl: operationRoomImage,
      titleTR: "MyHair Tbilisi",
      titleEN: "MyHair Tbilisi",
      titleRU: "MyHair Тбилиси",
      titleKA: "MyHair თბილისი",
      descriptionTR: "Tiflis'in kalbinde hizmet veren modern saç ekimi kliniğimizde en yüksek standartlarda hizmet sunuyoruz.",
      descriptionEN: "Our modern hair transplant clinic in the heart of Tbilisi offers services at the highest standards.",
      descriptionRU: "Наша современная клиника по трансплантации волос в самом сердце Тбилиси предоставляет услуги по самым высоким стандартам.",
      descriptionKA: "ჩვენი თანამედროვე თმის გადანერგვის კლინიკა თბილისის გულში გთავაზობთ მომსახურებას უმაღლესი სტანდარტებით.",
      ctaLinkTR: "/tr/hakkimizda",
      ctaLinkEN: "/en/about",
      ctaLinkRU: "/ru/о-нас",
      ctaLinkKA: "/ka/ჩვენს-შესახებ",
      ctaTextTR: "Bizi Tanıyın",
      ctaTextEN: "About Us",
      ctaTextRU: "О Нас",
      ctaTextKA: "ჩვენს შესახებ",
      badgeTextTR: "EN İYİ KLİNİK",
      badgeTextEN: "TOP CLINIC",
      badgeTextRU: "ЛУЧШАЯ КЛИНИКА",
      badgeTextKA: "საუკეთესო კლინიკა"
    },
    {
      id: 2,
      imageUrl: tiflisNatureImage,
      titleTR: "Tiflis'te Saç Ekimi",
      titleEN: "Hair Transplant in Tbilisi",
      titleRU: "Трансплантация волос в Тбилиси",
      titleKA: "თმის გადანერგვა თბილისში",
      descriptionTR: "Gürcistan'ın güzel başkenti Tiflis'te, yüksek kaliteli saç ekimi uygun fiyatlarla.",
      descriptionEN: "High-quality hair transplantation at affordable prices in the beautiful capital of Georgia, Tbilisi.",
      descriptionRU: "Высококачественная трансплантация волос по доступным ценам в красивой столице Грузии, Тбилиси.",
      descriptionKA: "მაღალი ხარისხის თმის გადანერგვა ხელმისაწვდომ ფასად საქართველოს მშვენიერ დედაქალაქში, თბილისში.",
      ctaLinkTR: "/tr/paketler",
      ctaLinkEN: "/en/packages",
      ctaLinkRU: "/ru/пакеты",
      ctaLinkKA: "/ka/პაკეტები",
      ctaTextTR: "Paketlere Göz Atın",
      ctaTextEN: "View Packages",
      ctaTextRU: "Посмотреть Пакеты",
      ctaTextKA: "პაკეტების ნახვა",
    },
    {
      id: 3,
      imageUrl: prpTreatmentImage,
      titleTR: "PRP Tedavisi",
      titleEN: "PRP Treatment",
      titleRU: "PRP Терапия",
      titleKA: "PRP მკურნალობა",
      descriptionTR: "Kendi kanınızdan elde edilen trombositler ile saç dökülmesini durdurun ve saç büyümesini hızlandırın.",
      descriptionEN: "Stop hair loss and accelerate hair growth with platelets derived from your own blood.",
      descriptionRU: "Остановите выпадение волос и ускорьте рост волос с помощью тромбоцитов, полученных из вашей собственной крови.",
      descriptionKA: "შეაჩერეთ თმის ცვენა და დააჩქარეთ თმის ზრდა თქვენი საკუთარი სისხლიდან მიღებული თრომბოციტებით.",
      ctaLinkTR: "/tr/hizmetler/prp-treatment",
      ctaLinkEN: "/en/services/prp-treatment",
      ctaLinkRU: "/ru/услуги/prp-treatment",
      ctaLinkKA: "/ka/სერვისები/prp-treatment",
      ctaTextTR: "Detaylı Bilgi",
      ctaTextEN: "Learn More",
      ctaTextRU: "Узнать больше",
      ctaTextKA: "დამატებითი ინფორმაცია",
      badgeTextTR: "POPÜLER TEDAVİ",
      badgeTextEN: "POPULAR TREATMENT",
      badgeTextRU: "ПОПУЛЯРНОЕ ЛЕЧЕНИЕ",
      badgeTextKA: "პოპულარული მკურნალობა"
    },
    {
      id: 4,
      imageUrl: hairTreatmentImage,
      titleTR: "Modern Saç Ekimi",
      titleEN: "Modern Hair Transplant",
      titleRU: "Современная Трансплантация Волос",
      titleKA: "თანამედროვე თმის გადანერგვა",
      descriptionTR: "En son teknoloji ve deneyimli uzmanlarla doğal görünümlü, kalıcı sonuçlar.",
      descriptionEN: "Natural-looking, permanent results with the latest technology and experienced experts.",
      descriptionRU: "Естественно выглядящие, постоянные результаты с новейшими технологиями и опытными экспертами.",
      descriptionKA: "ბუნებრივი გარეგნობის, მუდმივი შედეგები უახლესი ტექნოლოგიებითა და გამოცდილი ექსპერტებით.",
      ctaLinkTR: "/tr/randevu",
      ctaLinkEN: "/en/appointment",
      ctaLinkRU: "/ru/запись-на-прием",
      ctaLinkKA: "/ka/დაჯავშნა",
      ctaTextTR: "Randevu Alın",
      ctaTextEN: "Make Appointment",
      ctaTextRU: "Записаться на прием",
      ctaTextKA: "შეხვედრის დანიშვნა",
    },
  ];
  
  const getTitle = (slide: SlideType) => {
    switch (language) {
      case 'tr': return slide.titleTR;
      case 'en': return slide.titleEN;
      case 'ru': return slide.titleRU;
      case 'ka': return slide.titleKA;
      default: return slide.titleEN;
    }
  };
  
  const getDescription = (slide: SlideType) => {
    switch (language) {
      case 'tr': return slide.descriptionTR;
      case 'en': return slide.descriptionEN;
      case 'ru': return slide.descriptionRU;
      case 'ka': return slide.descriptionKA;
      default: return slide.descriptionEN;
    }
  };
  
  const getCtaLink = (slide: SlideType) => {
    let link = '';
    switch (language) {
      case 'tr': link = slide.ctaLinkTR; break;
      case 'en': link = slide.ctaLinkEN; break;
      case 'ru': link = slide.ctaLinkRU; break;
      case 'ka': link = slide.ctaLinkKA; break;
      default: link = slide.ctaLinkEN;
    }
    return link;
  };
  
  const getCtaText = (slide: SlideType) => {
    switch (language) {
      case 'tr': return slide.ctaTextTR;
      case 'en': return slide.ctaTextEN;
      case 'ru': return slide.ctaTextRU;
      case 'ka': return slide.ctaTextKA;
      default: return slide.ctaTextEN;
    }
  };
  
  const getBadgeText = (slide: SlideType) => {
    if (!slide.badgeTextTR && !slide.badgeTextEN && !slide.badgeTextRU && !slide.badgeTextKA) return null;
    
    switch (language) {
      case 'tr': return slide.badgeTextTR;
      case 'en': return slide.badgeTextEN;
      case 'ru': return slide.badgeTextRU;
      case 'ka': return slide.badgeTextKA;
      default: return slide.badgeTextEN;
    }
  };
  
  const startSlideTimer = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    if (!isHovering) {
      slideInterval.current = setInterval(() => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000); // 5 saniye aralıkla
    }
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isHovering, slides.length]);
  
  const handlePrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    
    // Animasyon için kısa bir süre bekle
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    // Timer'ı yeniden başlat
    startSlideTimer();
  };
  
  const handleNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    
    // Animasyon için kısa bir süre bekle
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    // Timer'ı yeniden başlat
    startSlideTimer();
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeSlide) return;
    
    setIsAnimating(true);
    setActiveSlide(index);
    
    // Animasyon için kısa bir süre bekle
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    // Timer'ı yeniden başlat
    startSlideTimer();
  };
  
  // Intersection Observer ile slider'ın görünür olup olmadığını takip et
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }
    
    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);
  
  // Timer'ı başlat ve temizle
  useEffect(() => {
    startSlideTimer();
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [startSlideTimer]);
  
  return (
    <div 
      ref={sliderRef}
      className="relative w-full bg-gradient-to-b from-primary/5 to-white overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Arka plan desenleri */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
      
      {/* Dekoratif elementler */}
      <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-blob"></div>
      <div className="absolute right-1/3 bottom-0 w-60 h-60 rounded-full bg-blue-300/5 blur-3xl animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        {/* Slider Ana Bileşeni */}
        <div className="relative h-[600px] md:h-[550px] overflow-hidden rounded-2xl shadow-xl">
          {/* Tüm Slides */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === activeSlide
                    ? 'opacity-100 translate-x-0 z-10'
                    : index < activeSlide
                    ? 'opacity-0 -translate-x-full z-0'
                    : 'opacity-0 translate-x-full z-0'
                }`}
              >
                {/* Arka plan görseli */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.imageUrl}
                    alt={getTitle(slide)}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-105"
                  />
                </div>
                
                {/* Gradient katmanı */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                
                {/* Badge */}
                {getBadgeText(slide) && (
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
                    <Badge 
                      variant="outline" 
                      className="bg-primary text-white border-0 px-3 py-1.5 text-sm shadow-lg"
                    >
                      {getBadgeText(slide)}
                    </Badge>
                  </div>
                )}
                
                {/* İçerik alanı */}
                <div className="absolute inset-0 z-10 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-xl ml-auto mr-0"> {/* Text içeriğini sağa yerleştirmek için */}
                      <div 
                        className={`transition-all duration-1000 delay-300 transform ${
                          index === activeSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
                          {getTitle(slide)}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                          {getDescription(slide)}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href={addPrefix(getCtaLink(slide))}>
                            <Button 
                              size="lg" 
                              className="bg-primary hover:bg-primary/90 text-white border-none shadow-md"
                            >
                              {getCtaText(slide)}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                          
                          <a 
                            href="tel:+995555003044" 
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all"
                          >
                            <Phone className="mr-2 h-5 w-5" />
                            +995 555 003044
                          </a>
                        </div>
                        
                        {/* Özellikler - Tüm slidelarda görünecek */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
                          <div className="flex items-center space-x-2 text-white/80">
                            <MapPin className="h-4 w-4 text-primary/90" />
                            <span className="text-sm">Tsotne Dadiani 59, Tbilisi</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/80">
                            <CalendarCheck className="h-4 w-4 text-primary/90" />
                            <span className="text-sm">{t("home.location.weekdaysLabel")}: 09:00-18:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigasyon Okları */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white border-white/20 h-10 w-10 md:h-12 md:w-12"
            onClick={handlePrevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white border-white/20 h-10 w-10 md:h-12 md:w-12"
            onClick={handleNextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          {/* Dots Navigasyon */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeSlide
                    ? 'w-8 bg-primary'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}