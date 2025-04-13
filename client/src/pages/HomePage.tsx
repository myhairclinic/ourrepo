import { useLanguage } from "@/hooks/use-language";
import { Language } from "@shared/types";
import HeroSlider from "@/components/home/HeroSlider";
import ServiceCards from "@/components/home/ServiceCards";
import { PackageCards } from "@/components/home/PackageCards";
import { FeaturedPackageCards } from "@/components/home/FeaturedPackageCards";
import { useTranslation } from "@/hooks/use-translation";
import MainSlider from "@/components/home/MainSlider";
import PatientJourney from "@/components/home/PatientJourney";
import ExpertSection from "@/components/home/ExpertSection";
import BlogSlider from "@/components/home/BlogSlider";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AppointmentButton from "@/components/layout/AppointmentButton";
import SEO from "@/components/layout/SEO";
import { generateOrganizationSchema } from "@/lib/seo";

export default function HomePage() {
  const { language } = useLanguage();
  const { t, formatCurrency } = useTranslation();
  
  // Sayfa başlık ve açıklaması - çeviri sistemi kullanılıyor
  const pageTitle = t("home.title") || "Tiflis Saç Ekimi ve Estetik Merkezi";
  const pageDescription = t("home.description") || "MyHair Clinic, Tiflis'te lider saç ekimi ve estetik merkezi. FUE ve DHI teknikleri kullanarak doğal görünümlü saç ekimi, sakal ekimi ve kaş ekimi hizmetleri sunuyoruz.";
  
  // Para birimi formatlama örneği
  const packagePrice = formatCurrency(1500);
  
  // JSON-LD şeması
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        schema={organizationSchema}
        pageType="website"
      />
      
      <main>
        
        <MainSlider />
        <PatientJourney />
        <ExpertSection />
        <ServiceCards />
        <PackageCards />
        <BlogSlider />
        
        {/* Fixed buttons */}
        <WhatsAppButton />
        <AppointmentButton />
      </main>
    </>
  );
}