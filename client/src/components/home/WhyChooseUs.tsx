import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Award, Leaf, Clock, ThumbsUp, BadgeCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "../shared/SectionTitle";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <div className="group flex flex-col items-center text-center transition-all hover:translate-y-[-5px]">
      <div className={cn(
        "mb-5 relative flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-br transition-all duration-300",
        index % 3 === 0 ? "from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700" :
        index % 3 === 1 ? "from-primary/80 to-primary group-hover:from-primary/90 group-hover:to-primary" :
        "from-cyan-400 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-600"
      )}>
        <div className="text-white z-10">
          {icon}
        </div>
        <div className="absolute inset-0 rounded-full bg-white/20 blur-sm"></div>
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm max-w-xs mx-auto">{description}</p>
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
    <section className="relative py-16 overflow-hidden">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title={t("home.whyChooseUs.title")}
          subtitle={t("home.whyChooseUs.subtitle")}
          centered
        />
        
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-16 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent h-[1px] w-full"></div>
            <div className="bg-white px-6 py-1 relative">
              <div className="flex items-center gap-2 text-primary font-medium">
                <BadgeCheck className="h-5 w-5" />
                <span>{t("home.whyChooseUs.experience.years", { years: 10 })}</span>
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-center max-w-xl mx-auto italic">
              "{t("home.whyChooseUs.doctorQuote")}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}