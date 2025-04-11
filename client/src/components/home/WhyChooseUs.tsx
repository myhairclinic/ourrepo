import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Award, Leaf, Clock, ThumbsUp, BadgeCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import doctorImage from "@assets/IMG-20250325-WA0095.jpg";
import SectionTitle from "../shared/SectionTitle";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md", className)}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-primary mt-1">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  // Bu bölümün başlıkları ve içerikleri için çevirileri hazırlayın
  const features = [
    {
      icon: <Award className="h-6 w-6" />,
      title: t("home.whyChooseUs.experience.title"),
      description: t("home.whyChooseUs.experience.description"),
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: t("home.whyChooseUs.results.title"),
      description: t("home.whyChooseUs.results.description"),
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: t("home.whyChooseUs.technology.title"),
      description: t("home.whyChooseUs.technology.description"),
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: t("home.whyChooseUs.natural.title"),
      description: t("home.whyChooseUs.natural.description"),
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: t("home.whyChooseUs.aftercare.title"),
      description: t("home.whyChooseUs.aftercare.description"),
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: t("home.whyChooseUs.satisfaction.title"),
      description: t("home.whyChooseUs.satisfaction.description"),
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-48 -top-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-blue-200/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title={t("home.whyChooseUs.title")}
          subtitle={t("home.whyChooseUs.subtitle")}
          centered
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Sol taraf: Doktor Görselimiz */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={doctorImage} 
                alt="MyHair Tbilisi Doctors" 
                className="w-full h-auto rounded-2xl object-cover"
              />
              
              {/* Üst bilgi kartı - İsteğe bağlı */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{t("home.whyChooseUs.experience.years", { years: 10 })}</span>
                </div>
              </div>
            </div>
            
            {/* Alt bilgi kartı - İsteğe bağlı */}
            <div className="absolute -bottom-5 -right-5 md:right-5 bg-primary text-white rounded-lg p-4 shadow-lg max-w-[200px]">
              <p className="text-sm font-medium">{t("home.whyChooseUs.doctorQuote")}</p>
            </div>
          </div>
          
          {/* Sağ taraf: Özellikler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className={index % 2 === 0 ? "md:transform md:translate-y-4" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}