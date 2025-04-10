import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";

// Sample hero slides - in a real implementation these would come from the API
const heroSlides = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1579165466741-7f35e4755183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1488903809927-48c9b4e43700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  }
];

export default function HeroSlider() {
  const { t } = useTranslation();
  const { addPrefix } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section className="relative bg-white">
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Main Hero Image */}
        <div className="absolute inset-0">
          <img 
            src={heroSlides[currentSlide].imageUrl} 
            alt="Hair transplant experts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
          <div className="max-w-xl text-white">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={addPrefix('/services')}>
                <a className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md transition duration-200">
                  {t('home.hero.servicesButton')}
                </a>
              </Link>
              <Link href={addPrefix('/appointment')}>
                <a className="bg-white hover:bg-neutral-100 text-secondary font-medium px-6 py-3 rounded-md transition duration-200">
                  {t('home.hero.consultationButton')}
                </a>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Navigation */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full bg-white ${index === currentSlide ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
