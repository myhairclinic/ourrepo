import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { Language } from "@shared/types";
import HeroSlider from "@/components/home/HeroSlider";
import ServiceCards from "@/components/home/ServiceCards";
import { PackageCards } from "@/components/home/PackageCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { useTranslation } from "@/lib/translations";
import MainSlider from "@/components/home/MainSlider";
import PatientJourney from "@/components/home/PatientJourney";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AppointmentButton from "@/components/layout/AppointmentButton";

export default function HomePage() {
  const { language } = useLanguage();
  const { t, formatCurrency } = useTranslation(language);
  
  // Sayfa başlık ve açıklaması - çeviri sistemi kullanılıyor
  const pageTitle = t("home.title");
  const pageDescription = t("home.description");
  
  // Yer tutucu değişkenli örnek çeviriler (örnek olarak eklenmiştir)
  const exampleTranslation1 = t("home.procedure_cost", { procedure: "FUE" });
  const exampleTranslation2 = t("home.welcome_user", { name: "John" });
  const exampleTranslation3 = t("home.results_time", { months: 6 });
  
  // Para birimi formatlama örneği
  const packagePrice = formatCurrency(1500);
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
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
        <WhyChooseUs />
        <ServiceCards />
        <PackageCards />
        
        {/* Fixed buttons */}
        <WhatsAppButton />
        <AppointmentButton />
      </main>
    </>
  );
}