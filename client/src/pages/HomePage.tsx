import { useLanguage } from "@/hooks/use-language";
import { Language } from "@shared/types";
import HeroSlider from "@/components/home/HeroSlider";
import ServiceCards from "@/components/home/ServiceCards";
import { PackageCards } from "@/components/home/PackageCards";
import { useTranslation } from "@/lib/translations";
import MainSlider from "@/components/home/MainSlider";
import PatientJourney from "@/components/home/PatientJourney";
import BlogSlider from "@/components/home/BlogSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AppointmentButton from "@/components/layout/AppointmentButton";
import SEO from "@/components/layout/SEO";
import { generateOrganizationSchema } from "@/lib/seo";

export default function HomePage() {
  const { language } = useLanguage();
  const { t, formatCurrency } = useTranslation(language);
  
  // Sayfa başlık ve açıklaması - çeviri sistemi kullanılıyor
  const pageTitle = t("home.title") || "Tiflis Saç Ekimi ve Estetik Merkezi";
  const pageDescription = t("home.description") || "MyHair Clinic, Tiflis'te lider saç ekimi ve estetik merkezi. FUE ve DHI teknikleri kullanarak doğal görünümlü saç ekimi, sakal ekimi ve kaş ekimi hizmetleri sunuyoruz.";
  
  // Yer tutucu değişkenli örnek çeviriler (örnek olarak eklenmiştir)
  const exampleTranslation1 = t("home.procedure_cost", { procedure: "FUE" });
  const exampleTranslation2 = t("home.welcome_user", { name: "John" });
  const exampleTranslation3 = t("home.results_time", { months: 6 });
  
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
        {/* Yeni çeviri sistemi örneği - sadece gösterim amaçlı 
        (Bu kısım gerçek önyüzde görünmez, örnek bir kullanımdır) */}
        <div className="hidden">
          <p>{exampleTranslation1}</p>
          <p>{exampleTranslation2}</p>
          <p>{exampleTranslation3}</p>
          <p>Pakete başlangıç fiyatı: {packagePrice}</p>
        </div>
        
        <MainSlider />
        <PatientJourney />
        <ServiceCards />
        <PackageCards />
        <FeaturedProducts />
        <BlogSlider />
        
        {/* Fixed buttons */}
        <WhatsAppButton />
        <AppointmentButton />
      </main>
    </>
  );
}