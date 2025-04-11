import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Award, Leaf, Clock, ThumbsUp, BadgeCheck, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "../shared/SectionTitle";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const gradients = [
    "from-blue-500 to-blue-700",
    "from-primary to-blue-600",
    "from-cyan-500 to-blue-500",
  ];

  const gradientClass = gradients[index % gradients.length];
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 
      hover:shadow-[0_0_25px_rgba(0,0,0,0.06)] hover:translate-y-[-5px] border border-transparent
      hover:border-primary/10">
      {/* Dekoratif kenarlık */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
        style={{
          backgroundImage: `linear-gradient(to right, transparent, var(--color-primary), transparent)`
        }}
      ></div>
      
      {/* Arka plan daire */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-5 
        from-primary to-blue-500 group-hover:opacity-10 transition-opacity"></div>
      
      {/* İkon */}
      <div className={cn(
        "relative mb-6 flex items-center justify-center rounded-2xl w-20 h-20 transition-all duration-500 shadow-lg",
        "bg-gradient-to-br",
        gradientClass,
        "group-hover:shadow-[0_15px_25px_-5px_rgba(0,0,0,0.2)]"
      )}>
        <div className="text-white z-10">
          {icon}
        </div>
        <div className="absolute inset-0 rounded-2xl bg-white/15 blur-[1px]"></div>
      </div>
      
      {/* İçerik */}
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      
      {/* Alt divider */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r 
        from-transparent via-primary/0 to-transparent group-hover:via-primary/20 transition-all duration-500"></div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: t("home.whyChooseUs.experience.title"),
      description: t("home.whyChooseUs.experience.description"),
    },
    {
      icon: <ThumbsUp className="h-8 w-8" />,
      title: t("home.whyChooseUs.results.title"),
      description: t("home.whyChooseUs.results.description"),
    },
    {
      icon: <BadgeCheck className="h-8 w-8" />,
      title: t("home.whyChooseUs.technology.title"),
      description: t("home.whyChooseUs.technology.description"),
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: t("home.whyChooseUs.natural.title"),
      description: t("home.whyChooseUs.natural.description"),
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: t("home.whyChooseUs.aftercare.title"),
      description: t("home.whyChooseUs.aftercare.description"),
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: t("home.whyChooseUs.satisfaction.title"),
      description: t("home.whyChooseUs.satisfaction.description"),
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50/80">
      {/* Arka plan dekoratif elementleri */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-0 w-full h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent"></div>
        <div className="absolute -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute left-[-300px] bottom-[-300px] w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title={t("home.whyChooseUs.title")}
          subtitle={t("home.whyChooseUs.subtitle")}
          centered
        />
        
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
          
          <div className="mt-24 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40"></div>
              <div className="mx-4 bg-white px-7 py-3 rounded-full shadow-md border border-primary/10 transition-all duration-300 
                             hover:shadow-lg hover:border-primary/20 hover:scale-105">
                <div className="flex items-center gap-3 text-primary font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">{t("home.whyChooseUs.experience.years", { years: 10 })}</span>
                </div>
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40"></div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-primary/20 text-6xl">"</div>
              <p className="text-gray-600 text-center max-w-2xl mx-auto italic text-lg font-light leading-relaxed px-6 pt-4 relative z-10">
                {t("home.whyChooseUs.doctorQuote")}
              </p>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-primary/20 text-6xl rotate-180">"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}