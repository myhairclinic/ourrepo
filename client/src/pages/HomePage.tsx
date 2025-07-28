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
const pageTitle = t("home.title") || "MyHair Clinic | თმის გადანერგვისა და ესთეტიკის წამყვანი კლინიკა თბილისში";

const pageDescription = t("home.description") || 
  "MyHair Clinic არის წამყვანი თმის გადანერგვისა და ესთეტიკური კლინიკა თბილისში, რომელიც სთავაზობს მაღალი ხარისხის მომსახურებებს FUE და DHI ტექნოლოგიებით. ბუნებრივი ეფექტის მქონე თმის, წვერისა და წარბების გადანერგვა – პროფესიონალური და სანდო მიდგომით.";

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
