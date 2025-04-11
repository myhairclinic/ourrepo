import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import SectionTitle from "../shared/SectionTitle";
import { CalendarClock, CheckCircle2, HeartHandshake, ListChecks, MessageCircle, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
  isLastStep?: boolean;
}

function JourneyStep({ icon, title, description, stepNumber, isLastStep = false }: JourneyStepProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Step number badge with icon */}
      <div className="relative z-10 mb-4">
        <div className="absolute -inset-3 bg-primary/5 rounded-full blur-md"></div>
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-primary border border-primary/10">
          {stepNumber}
        </div>
      </div>
      
      {/* Step content */}
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center max-w-xs">{description}</p>
      
      {/* Connector line between steps */}
      {!isLastStep && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-[2px] bg-gradient-to-r from-primary/40 to-primary/10"></div>
      )}
    </div>
  );
}

export default function PatientJourney() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  const journeySteps = [
    {
      icon: <MessageCircle className="h-7 w-7" />,
      title: t("home.patientJourney.consultation.title"),
      description: t("home.patientJourney.consultation.description"),
    },
    {
      icon: <ListChecks className="h-7 w-7" />,
      title: t("home.patientJourney.planning.title"),
      description: t("home.patientJourney.planning.description"),
    },
    {
      icon: <Plane className="h-7 w-7" />,
      title: t("home.patientJourney.arrival.title"),
      description: t("home.patientJourney.arrival.description"),
    },
    {
      icon: <CalendarClock className="h-7 w-7" />,
      title: t("home.patientJourney.procedure.title"),
      description: t("home.patientJourney.procedure.description"),
    },
    {
      icon: <HeartHandshake className="h-7 w-7" />,
      title: t("home.patientJourney.aftercare.title"),
      description: t("home.patientJourney.aftercare.description"),
    },
    {
      icon: <CheckCircle2 className="h-7 w-7" />,
      title: t("home.patientJourney.results.title"),
      description: t("home.patientJourney.results.description"),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-50/40 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-blue-50/70 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-full h-64 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title={t("home.patientJourney.title")}
          subtitle={t("home.patientJourney.subtitle")}
          centered
        />
        
        {/* Desktop timeline */}
        <div className="mt-16 hidden md:block max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {journeySteps.slice(0, 3).map((step, index) => (
              <JourneyStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                stepNumber={index + 1}
                isLastStep={index === 2}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-8 mt-16">
            {journeySteps.slice(3).map((step, index) => (
              <JourneyStep
                key={index + 3}
                icon={step.icon}
                title={step.title}
                description={step.description}
                stepNumber={index + 4}
                isLastStep={index === 2}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile timeline (vertical) */}
        <div className="md:hidden mt-12 max-w-sm mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/5"></div>
            
            {journeySteps.map((step, index) => (
              <div key={index} className={cn("flex items-start mb-12", index === journeySteps.length - 1 ? "mb-0" : "")}>
                <div className="relative mr-6">
                  <div className="absolute -inset-2 bg-primary/5 rounded-full blur-md"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-primary text-xs border border-primary/10">
                    {index + 1}
                  </div>
                </div>
                
                <div className="pt-1">
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Optional CTA */}
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
            <MessageCircle className="h-5 w-5" />
            <span>{t("home.patientJourney.cta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}