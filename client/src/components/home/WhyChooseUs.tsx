import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Award, Leaf, Clock, ThumbsUp, BadgeCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "../shared/SectionTitle";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:bg-primary/5", className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 text-primary mr-4 mt-1">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
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
    <section className="relative py-16 bg-gradient-to-b from-white to-neutral-50">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-48 -top-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-blue-200/10 blur-3xl"></div>
        <div className="absolute left-1/4 bottom-0 w-44 h-44 rounded-full bg-primary/3 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title={t("home.whyChooseUs.title")}
          subtitle={t("home.whyChooseUs.subtitle")}
          centered
        />
        
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              {t("home.whyChooseUs.doctorQuote")}
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 text-primary">
              <BadgeCheck className="h-5 w-5" />
              <span className="text-sm font-medium">{t("home.whyChooseUs.experience.years", { years: 10 })}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}