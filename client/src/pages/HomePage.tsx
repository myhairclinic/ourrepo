import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { Language } from "@/lib/languages";
import HeroSlider from "@/components/home/HeroSlider";
import ServiceCards from "@/components/home/ServiceCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  const { language } = useLanguage();
  
  // Dile göre meta başlık ve açıklama
  const getTitle = () => {
    switch (language) {
      case Language.Turkish:
        return "MyHair Clinic | Saç Ekimi ve Estetik Merkezi";
      case Language.English:
        return "MyHair Clinic | Hair Transplant and Aesthetic Center";
      case Language.Russian:
        return "MyHair Clinic | Центр трансплантации волос и эстетики";
      case Language.Georgian:
        return "MyHair Clinic | თმის გადანერგვის და ესთეტიკის ცენტრი";
      default:
        return "MyHair Clinic | Hair Transplant Center";
    }
  };
  
  const getDescription = () => {
    switch (language) {
      case Language.Turkish:
        return "Tiflis'in lider saç ekimi ve estetik merkezi. FUE ve DHI tekniklerini kullanarak en iyi sonuçları elde ediyoruz. Doğal görünüm garantisi.";
      case Language.English:
        return "Leading hair transplant and aesthetic center in Tbilisi. We use FUE and DHI techniques to achieve the best results. Natural appearance guaranteed.";
      case Language.Russian:
        return "Ведущий центр трансплантации волос и эстетики в Тбилиси. Мы используем методы FUE и DHI для достижения наилучших результатов. Гарантия естественного вида.";
      case Language.Georgian:
        return "წამყვანი თმის გადანერგვისა და ესთეტიკის ცენტრი თბილისში. ჩვენ ვიყენებთ FUE და DHI ტექნიკას საუკეთესო შედეგების მისაღწევად. ბუნებრივი გარეგნობის გარანტია.";
      default:
        return "Hair transplant center in Tbilisi with the best techniques and natural results.";
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{getTitle()}</title>
        <meta name="description" content={getDescription()} />
      </Helmet>
      
      <main>
        <HeroSlider />
        <ServiceCards />
        <WhyChooseUs />
        <BeforeAfterSlider />
        <Testimonials />
      </main>
    </>
  );
}