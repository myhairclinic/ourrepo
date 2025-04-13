import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import SectionTitle from "../shared/SectionTitle";
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Star, 
  UserCheck, 
  Stethoscope, 
  GraduationCap, 
  Building, 
  FileText, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AliCalıskanImage from "@/assets/ali-caliskan.png";
import { Badge } from "@/components/ui/badge";

export default function ExpertSection() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const expertStats = [
    {
      icon: <GraduationCap className="h-5 w-5 text-primary" />,
      value: "18+",
      label: t("home.expertSection.stats.years") || "Yıllık Deneyim",
    },
    {
      icon: <Stethoscope className="h-5 w-5 text-primary" />,
      value: "10.000+",
      label: t("home.expertSection.stats.procedures") || "Başarılı İşlem",
    },
    {
      icon: <UserCheck className="h-5 w-5 text-primary" />,
      value: "99%",
      label: t("home.expertSection.stats.satisfaction") || "Hasta Memnuniyeti",
    },
    {
      icon: <Star className="h-5 w-5 text-primary" />,
      value: "5/5",
      label: t("home.expertSection.stats.rating") || "Uzman Değerlendirmesi",
    },
  ];
  
  const expertQualifications = [
    {
      title: "Tıbbi Uzmanlık",
      icon: <Stethoscope className="h-5 w-5 text-primary" />,
      description: "Saç ekimi ve restorasyon alanında uzmanlaşmış estetik cerrahi eğitimi"
    },
    {
      title: "Uluslararası Sertifikalar",
      icon: <FileText className="h-5 w-5 text-primary" />,
      description: "ISHRS (Uluslararası Saç Restorasyon Cerrahisi Derneği) üyeliği"
    },
    {
      title: "Klinik Deneyim",
      icon: <Building className="h-5 w-5 text-primary" />,
      description: "Türkiye ve Avrupa'nın önde gelen kliniklerinde uzun yıllar deneyim"
    },
    {
      title: "Hasta Memnuniyeti",
      icon: <Users className="h-5 w-5 text-primary" />,
      description: "Binlerce mutlu hastadan oluşan referans portföyü"
    }
  ];

  const expertFeatures = [
    {
      title: t("home.expertSection.features.technique.title") || "İleri DHI ve FUE Teknikleri",
      description: t("home.expertSection.features.technique.description") || "Doğal görünümlü sonuçlar için son teknoloji yöntemler kullanıyoruz.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
    },
    {
      title: t("home.expertSection.features.painless.title") || "Ağrısız Prosedür",
      description: t("home.expertSection.features.painless.description") || "Konforlu ve minimum rahatsızlık sağlayan özel anestezi protokolü.",
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
    {
      title: t("home.expertSection.features.natural.title") || "Doğal Saç Çizgisi Tasarımı",
      description: t("home.expertSection.features.natural.description") || "Yüz şeklinize ve yaşınıza uygun kişiselleştirilmiş ve doğal görünümlü tasarım.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50/20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={t("home.expertSection.title") || "Saç Ekimi Uzmanları"}
          subtitle={t("home.expertSection.subtitle") || "MyHair Clinic'in deneyimli ve uzman kadrosuyla tanışın"}
          centered
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Expert Profile Column */}
          <div className="flex flex-col items-center md:items-start">
            {/* Expert Profile Card */}
            <div className="relative mb-6 overflow-hidden rounded-2xl w-full max-w-md mx-auto md:mx-0 shadow-lg">
              {/* Gradient overlay at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              
              {/* Expert Image */}
              <img 
                src={AliCalıskanImage} 
                alt="Ali Çalışkan - Saç Ekimi Uzmanı" 
                className="w-full h-auto object-cover aspect-[3/4]"
              />
              
              {/* Expert Credentials */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <Badge className="bg-primary mb-3 hover:bg-primary">Baş Saç Ekimi Uzmanı & Klinik Direktörü</Badge>
                <h3 className="text-2xl font-bold mb-1">Ali Çalışkan</h3>
                <p className="text-white/90 mb-3">Saç Ekimi Uzmanı</p>
                
                {/* Expert Stats */}
                <div className="flex flex-wrap gap-3">
                  {expertStats.map((stat, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm"
                    >
                      {stat.icon}
                      <span className="ml-1 font-semibold">{stat.value}</span>
                      <span className="ml-1 text-white/80 text-xs">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Expert Qualifications */}
            <div className="w-full max-w-md mx-auto md:mx-0 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Uzmanlık Alanları ve Yetkinlikler</h4>
              <div className="grid grid-cols-2 gap-3">
                {expertQualifications.map((qual, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      {qual.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">{qual.title}</h5>
                      <p className="text-gray-600 text-xs">{qual.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="w-full md:w-auto">
              <Button 
                className="w-full md:w-auto mt-2 gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary px-8 py-6 h-auto text-base"
                size="lg"
              >
                <Calendar className="h-5 w-5" />
                {t("home.expertSection.consultationCta") || "Ücretsiz Konsültasyon Alın"}
              </Button>
            </div>
          </div>
          
          {/* Features & Quote Column */}
          <div className="space-y-4">
            {/* Expert Title Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-100">
              <CardContent className="pt-6 pb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dr. Ali Çalışkan, MD</h3>
                    <p className="text-primary">Baş Saç Ekimi Uzmanı</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          
            {/* Features Cards */}
            {expertFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={cn(
                  "transition-all hover:shadow-md hover:scale-[1.02] duration-300",
                  index % 2 === 0 ? "bg-white" : "bg-blue-50/50"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Expert Quote */}
            <Card className="bg-primary/5 border-primary/20 border-dashed">
              <CardContent className="pt-6">
                <blockquote className="italic text-gray-700 border-l-4 border-primary/30 pl-4">
                  "{t("home.expertSection.quote") || "MyHair Clinic'te her hasta için kişiselleştirilmiş yaklaşım sunuyoruz. Amacımız sadece saç ekimi yapmak değil, hastalarımızın özgüvenlerini yeniden kazanmalarına yardımcı olmaktır."}"
                </blockquote>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Ali Çalışkan</p>
                    <p className="text-xs text-gray-600">Saç Ekimi Uzmanı</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}