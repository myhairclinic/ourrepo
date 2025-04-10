import { useEffect } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { META } from "@/lib/constants";

// Components
import HeroSlider from "@/components/home/HeroSlider";
import ServiceCards from "@/components/home/ServiceCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import Testimonials from "@/components/home/Testimonials";
import InternationalPackages from "@/components/home/InternationalPackages";
import BlogPreview from "@/components/home/BlogPreview";
import AppointmentCTA from "@/components/home/AppointmentCTA";
import LocationMap from "@/components/home/LocationMap";

export default function HomePage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [location, setLocation] = useLocation();
  
  // Redirect to language prefix if coming from root
  useEffect(() => {
    if (location === "/") {
      setLocation(addPrefix("/"));
    }
  }, [location, setLocation, addPrefix]);
  
  return (
    <>
      <Helmet>
        <title>{t('meta.homeTitle')}</title>
        <meta name="description" content={t('meta.homeDescription')} />
        <link rel="canonical" href={window.location.origin + addPrefix("/")} />
        {/* Alternate language links for SEO */}
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/"} />
        <link rel="alternate" hrefLang="x-default" href={window.location.origin + "/tr/"} />
      </Helmet>
      
      <main>
        <HeroSlider />
        <ServiceCards />
        <WhyChooseUs />
        <BeforeAfterSlider />
        <Testimonials />
        <InternationalPackages />
        <BlogPreview />
        <AppointmentCTA />
        <LocationMap />
      </main>
    </>
  );
}
