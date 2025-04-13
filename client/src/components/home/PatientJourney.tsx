import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import SectionTitle from "../shared/SectionTitle";
import { Check, CalendarDays, Plane, Clock, UserPlus, MapPin, MessageSquare, Stethoscope, SprayCan, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Journey step interface
interface JourneyStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function PatientJourney() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Define patient journey steps
  const journeySteps: JourneyStep[] = [
    {
      id: 1,
      icon: <MessageSquare className="h-6 w-6" />,
      title: t("home.patientJourney.steps.consultation.title") || "İlk Konsültasyon",
      description: t("home.patientJourney.steps.consultation.description") || "Online görüşme ile saç kaybınızın değerlendirilmesi ve kişisel tedavi planı oluşturulması.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      icon: <CalendarDays className="h-6 w-6" />,
      title: t("home.patientJourney.steps.scheduling.title") || "Randevu Planlaması",
      description: t("home.patientJourney.steps.scheduling.description") || "Size en uygun tarihin belirlenmesi ve operasyon için randevunun oluşturulması.",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      id: 3,
      icon: <Plane className="h-6 w-6" />,
      title: t("home.patientJourney.steps.travel.title") || "Tiflis'e Seyahat",
      description: t("home.patientJourney.steps.travel.description") || "Gürcistan'a varışınızda, havalimanından kliniğe veya otelinize özel transfer hizmeti.",
      color: "bg-green-50 text-green-600",
    },
    {
      id: 4,
      icon: <Stethoscope className="h-6 w-6" />,
      title: t("home.patientJourney.steps.preOp.title") || "Operasyon Öncesi Değerlendirme",
      description: t("home.patientJourney.steps.preOp.description") || "Yüz yüze konsültasyon, saç çizgisi tasarımı ve operasyon öncesi son hazırlıklar.",
      color: "bg-violet-50 text-violet-600",
    },
    {
      id: 5,
      icon: <UserPlus className="h-6 w-6" />,
      title: t("home.patientJourney.steps.procedure.title") || "Saç Ekimi İşlemi",
      description: t("home.patientJourney.steps.procedure.description") || "Konforlu bir ortamda DHI veya FUE yöntemiyle saç ekimi operasyonunun gerçekleştirilmesi.",
      color: "bg-rose-50 text-rose-600",
    },
    {
      id: 6,
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: t("home.patientJourney.steps.postOp.title") || "Operasyon Sonrası Bakım",
      description: t("home.patientJourney.steps.postOp.description") || "İlk gün sonrası kontrolü ve detaylı bakım talimatlarının verilmesi.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: 7,
      icon: <MapPin className="h-6 w-6" />,
      title: t("home.patientJourney.steps.tourism.title") || "Tiflis'i Keşfedin",
      description: t("home.patientJourney.steps.tourism.description") || "İyileşme sürecinde Tiflis'in güzelliklerini keşfetme fırsatı ve şehir turu.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      id: 8,
      icon: <Clock className="h-6 w-6" />,
      title: t("home.patientJourney.steps.followUp.title") || "Uzun Dönem Takip",
      description: t("home.patientJourney.steps.followUp.description") || "Ülkenize döndükten sonra düzenli online kontroller ve süreç takibi.",
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t("home.patientJourney.title") || "Hasta Yolculuğu"}
          subtitle={t("home.patientJourney.subtitle") || "MyHair Clinic'te saç ekimi süreciniz nasıl ilerleyecek?"}
          centered
        />
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {journeySteps.map((step) => (
            <div 
              key={step.id}
              className="flex flex-col rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Step number indicator */}
              <div className="relative h-1 bg-gray-100">
                <div className={`absolute inset-0 ${step.color.split(' ')[0]}`} style={{ width: `${(step.id / journeySteps.length) * 100}%` }}></div>
              </div>
              
              <div className="px-6 py-5 md:p-6 flex-grow flex flex-col">
                {/* Icon and Step Number */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("p-3 rounded-lg", step.color)}>
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-gray-200">{step.id}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm flex-grow">{step.description}</p>
                
                {/* Success indicator */}
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span>{t("home.patientJourney.satisfaction") || "99% Hasta Memnuniyeti"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action section */}
        <div className="mt-14 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            {t("home.patientJourney.cta.description") || "Saç ekimi yolculuğunuza ilk adımı atmak ve ücretsiz olarak değerlendirme almak için hemen bize ulaşın. Uzmanlarımız sizinle ilgilenecektir."}
          </p>
          <a 
            href="/appointment" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            <CalendarDays className="h-5 w-5" />
            {t("home.patientJourney.cta.button") || "Ücretsiz Danışma Randevusu Alın"}
          </a>
        </div>
      </div>
    </section>
  );
}