import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Görseller
import tbilisiImage from "@assets/tbilisi.jpg";
import tiflisNatureImage from "@assets/tiflis-gezi-rehberi-tiflis-gezilecek-yerler-gürcistan-gezi-rehberi-gürcistan-gezilecek-yerler-2.webp";
import prpTreatmentImage from "@assets/ChatGPT Image 11 Nis 2025 03_09_54.png";
import hairTreatmentImage from "@assets/ChatGPT Image 11 Nis 2025 03_04_57.png";

export default function MainSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation();
  
  const slides = [
    {
      image: tbilisiImage,
      title: {
        tr: "MyHair Klinik Tiflis'te",
        en: "MyHair Clinic in Tbilisi",
        ru: "Клиника MyHair в Тбилиси",
        ka: "MyHair კლინიკა თბილისში"
      },
      description: {
        tr: "Tiflis'in merkezinde profesyonel saç ekimi hizmetleri",
        en: "Professional hair transplant services in the center of Tbilisi",
        ru: "Профессиональные услуги по трансплантации волос в центре Тбилиси",
        ka: "პროფესიონალური თმის გადანერგვის სერვისები თბილისის ცენტრში"
      },
      link: {
        tr: "/tr/hakkimizda",
        en: "/en/about",
        ru: "/ru/о-нас",
        ka: "/ka/ჩვენს-შესახებ"
      },
      buttonText: {
        tr: "Hakkımızda",
        en: "About Us",
        ru: "О Нас",
        ka: "ჩვენს შესახებ"
      }
    },
    {
      image: tiflisNatureImage,
      title: {
        tr: "Gürcistan'da Saç Ekimi",
        en: "Hair Transplant in Georgia",
        ru: "Трансплантация волос в Грузии",
        ka: "თმის გადანერგვა საქართველოში"
      },
      description: {
        tr: "Uygun fiyatlarla yüksek kaliteli saç ekimi hizmetleri",
        en: "High-quality hair transplant services at affordable prices",
        ru: "Высококачественные услуги по трансплантации волос по доступным ценам",
        ka: "მაღალი ხარისხის თმის გადანერგვის სერვისები ხელმისაწვდომ ფასად"
      },
      link: {
        tr: "/tr/hizmetler/hair-transplantation",
        en: "/en/services/hair-transplantation",
        ru: "/ru/услуги/hair-transplantation",
        ka: "/ka/სერვისები/hair-transplantation"
      },
      buttonText: {
        tr: "Hizmetlerimiz",
        en: "Our Services",
        ru: "Наши Услуги",
        ka: "ჩვენი სერვისები"
      }
    },
    {
      image: prpTreatmentImage,
      title: {
        tr: "Yenilikçi Tedaviler",
        en: "Innovative Treatments",
        ru: "Инновационные Методы Лечения",
        ka: "ინოვაციური მკურნალობები"
      },
      description: {
        tr: "PRP ve mezoterapiden saç ekimine kadar kapsamlı çözümler",
        en: "Comprehensive solutions from PRP and mesotherapy to hair transplantation",
        ru: "Комплексные решения от PRP и мезотерапии до трансплантации волос",
        ka: "კომპლექსური გადაწყვეტილებები PRP-დან და მეზოთერაპიიდან თმის გადანერგვამდე"
      },
      link: {
        tr: "/tr/hizmetler",
        en: "/en/services",
        ru: "/ru/услуги",
        ka: "/ka/სერვისები"
      },
      buttonText: {
        tr: "Tedavilerimiz",
        en: "Our Treatments",
        ru: "Наши Процедуры",
        ka: "ჩვენი მკურნალობები"
      }
    },
    {
      image: hairTreatmentImage,
      title: {
        tr: "Randevu Alın",
        en: "Book an Appointment",
        ru: "Записаться на Прием",
        ka: "დაჯავშნეთ შეხვედრა"
      },
      description: {
        tr: "Ücretsiz konsültasyon için hemen bizimle iletişime geçin",
        en: "Contact us now for a free consultation",
        ru: "Свяжитесь с нами сейчас для бесплатной консультации",
        ka: "დაგვიკავშირდით ახლავე უფასო კონსულტაციისთვის"
      },
      link: {
        tr: "/tr/randevu",
        en: "/en/appointment",
        ru: "/ru/запись-на-прием",
        ka: "/ka/დაჯავშნა"
      },
      buttonText: {
        tr: "Randevu Al",
        en: "Book Now",
        ru: "Записаться",
        ka: "დაჯავშნა"
      }
    }
  ];
  
  const getTranslatedText = (textObj: Record<string, string>) => {
    return textObj[language] || textObj.en;
  };
  
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };
  
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };
  
  useEffect(() => {
    // Otomatik kaydırma
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800">
      {/* Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={getTranslatedText(slide.title)} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-lg">
                  <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 delay-100 ${
                    index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {getTranslatedText(slide.title)}
                  </h1>
                  
                  <p className={`text-lg text-white/90 mb-8 transform transition-all duration-1000 delay-300 ${
                    index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {getTranslatedText(slide.description)}
                  </p>
                  
                  <div className={`transform transition-all duration-1000 delay-500 ${
                    index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <Link href={addPrefix(getTranslatedText(slide.link))}>
                      <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md shadow-lg flex items-center font-medium">
                        {getTranslatedText(slide.buttonText)}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Contact info - always visible */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:block">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
          <p>Tsotne Dadiani 59, Tbilisi</p>
          <p>+995 555 003044</p>
        </div>
      </div>
    </div>
  );
}