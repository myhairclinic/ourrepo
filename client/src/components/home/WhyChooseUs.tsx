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
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] hover:border-primary/20">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br opacity-10 
        from-primary to-blue-400 group-hover:opacity-20 transition-opacity"></div>
      
      <div className={cn(
        "mb-5 relative flex items-center justify-center rounded-full w-20 h-20 bg-gradient-to-br transition-all duration-500",
        index % 3 === 0 ? "from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700" :
        index % 3 === 1 ? "from-primary/80 to-primary group-hover:from-primary/90 group-hover:to-primary" :
        "from-cyan-400 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-600"
      )}>
        <div className="text-white z-10">
          {icon}
        </div>
        <div className="absolute inset-0 rounded-full bg-white/20 blur-sm"></div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
        from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all duration-500"></div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  const features = [
    {
      icon: <Award className="h-7 w-7" />,
      title: t("home.whyChooseUs.experience.title"),
      description: t("home.whyChooseUs.experience.description"),
    },
    {
      icon: <ThumbsUp className="h-7 w-7" />,
      title: t("home.whyChooseUs.results.title"),
      description: t("home.whyChooseUs.results.description"),
    },
    {
      icon: <BadgeCheck className="h-7 w-7" />,
      title: t("home.whyChooseUs.technology.title"),
      description: t("home.whyChooseUs.technology.description"),
    },
    {
      icon: <Leaf className="h-7 w-7" />,
      title: t("home.whyChooseUs.natural.title"),
      description: t("home.whyChooseUs.natural.description"),
    },
    {
      icon: <Clock className="h-7 w-7" />,
      title: t("home.whyChooseUs.aftercare.title"),
      description: t("home.whyChooseUs.aftercare.description"),
    },
    {
      icon: <Heart className="h-7 w-7" />,
      title: t("home.whyChooseUs.satisfaction.title"),
      description: t("home.whyChooseUs.satisfaction.description"),
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50/50">
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
        
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          
          <div className="mt-20 flex flex-col items-center justify-center">
            <div className="flex items-center">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30"></div>
              <div className="mx-4 bg-white px-6 py-2 rounded-full shadow-sm border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <BadgeCheck className="h-5 w-5" />
                  <span>{t("home.whyChooseUs.experience.years", { years: 10 })}</span>
                </div>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            
            <p className="text-gray-600 mt-6 text-center max-w-xl mx-auto italic text-lg font-light">
              "{t("home.whyChooseUs.doctorQuote")}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}