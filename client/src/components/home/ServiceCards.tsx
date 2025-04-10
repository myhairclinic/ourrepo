import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { ArrowRight, CheckCircle2, Loader2, Star, TrendingUp, Clock, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Language } from "@shared/types";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect, useRef } from "react";

const FeatureIcon = ({ index }: { index: number }) => {
  switch (index % 4) {
    case 0:
      return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
    case 1:
      return <Star className="h-4 w-4 text-amber-500 shrink-0" />;
    case 2:
      return <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />;
    case 3:
      return <Users className="h-4 w-4 text-violet-500 shrink-0" />;
    default:
      return <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />;
  }
};

// Basitleştirilmiş hizmet kartı bileşeni
function ServiceCard({ 
  service, 
  getTitle, 
  getDescription, 
  features, 
  addPrefix, 
  t 
}: { 
  service: Service;
  getTitle: (service: Service) => string;
  getDescription: (service: Service) => string;
  features: string[];
  addPrefix: (path: string) => string;
  t: (key: string) => string;
}) {
  return (
    <Card className="h-full overflow-hidden border border-border/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-background group">
      <div className="h-52 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>
        <img 
          src={service.imageUrl || '/images/placeholder.jpg'} 
          alt={getTitle(service)} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            console.log('Resim yüklenirken hata:', service.imageUrl);
            target.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=MyHair+Clinic';
          }}
        />
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-none shadow-md">
            {t("services.popular")}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors flex items-center justify-between">
          <span>{getTitle(service)}</span>
          <TrendingUp className="h-5 w-5 text-primary opacity-70" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <CardDescription className="text-muted-foreground mb-4 line-clamp-2">
          {getDescription(service)}
        </CardDescription>
        
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium">{t("services.keyFeatures")}</h4>
          <div className="flex flex-wrap gap-2">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-background/50 text-xs font-normal py-1">
                <FeatureIcon index={index} />
                <span className="ml-1">{feature}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link href={addPrefix(`/services/${service.slug}`)} className="w-full">
          <Button variant="default" className="w-full group bg-gradient-to-r from-primary to-primary/80">
            <span>{t("common.learnMore")}</span>
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ServiceCards() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer to trigger animations when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // API endpoint'in tam URL olarak belirtilmesi (port farklılıklarını çözmek için)
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60, // 1 dakika
  });

  // Helper function to get the title based on the current language
  const getLocalizedTitle = (service: Service) => {
    switch (language) {
      case Language.Turkish:
        return service.titleTR;
      case Language.English:
        return service.titleEN;
      case Language.Russian:
        return service.titleRU;
      case Language.Georgian:
        return service.titleKA;
      default:
        return service.titleEN;
    }
  };

  // Helper function to get the description based on the current language
  const getLocalizedDescription = (service: Service) => {
    switch (language) {
      case Language.Turkish:
        return service.descriptionTR;
      case Language.English:
        return service.descriptionEN;
      case Language.Russian:
        return service.descriptionRU;
      case Language.Georgian:
        return service.descriptionKA;
      default:
        return service.descriptionEN;
    }
  };

  // Create service features
  const commonFeatures = [
    t("services.features.consultation"),
    t("services.features.aftercare"),
    t("services.features.support"),
    t("services.features.satisfaction")
  ];

  // Add more custom features for each service
  const getServiceFeatures = (serviceId: number) => {
    const customFeatures: Record<number, string[]> = {
      1: [t("services.features.naturalResults"), t("services.features.permanentSolution")],
      2: [t("services.features.customDesign"), t("services.features.naturalAppearance")],
      3: [t("services.features.densityControl"), t("services.features.facialHarmony")],
      4: [t("services.features.regeneration"), t("services.features.noChemicals")],
      5: [t("services.features.hairStrength"), t("services.features.scalpeHealth")],
    };

    return [...(customFeatures[serviceId] || []), ...commonFeatures];
  };

  // Debug: Konsola servisleri yazdır
  console.log("Hizmetler:", services);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
      
      {/* Animated circles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-blob"></div>
        <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/3 bottom-0 w-72 h-72 rounded-full bg-secondary/5 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div 
          className={`flex flex-col items-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Badge variant="outline" className="mb-3 px-4 py-1 text-sm font-medium rounded-full border-primary/30 bg-primary/5">
            {t("services.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t("common.services")}
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("services.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              <Loader2 className="h-8 w-8 animate-spin text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-lg border border-red-100 shadow-sm">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-medium">{t("error.somethingWentWrong")}</span>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                {t("common.tryAgain")}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Debug: Eğer services varsa map'le, yoksa sorunu göster */}
            {services ? (
              services.length > 0 ? (
                services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`transition-all duration-1000 transform ${
                      isInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="h-full">
                      <ServiceCard
                        service={service}
                        getTitle={getLocalizedTitle}
                        getDescription={getLocalizedDescription}
                        features={getServiceFeatures(service.id)}
                        addPrefix={addPrefix}
                        t={t}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p>Hizmetler bulunamadı. Veri var ama boş: {JSON.stringify(services)}</p>
                </div>
              )
            ) : (
              <div className="col-span-3 text-center py-10">
                <p>Servis verisi yükleniyor veya bulunamadı: {JSON.stringify(services)}</p>
              </div>
            )}
          </div>
        )}
        
        <div 
          className={`mt-16 text-center transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Link href={addPrefix("/services")}>
            <Button 
              variant="outline" 
              size="lg" 
              className="group bg-gradient-to-r hover:bg-gradient-to-r from-background to-background hover:from-primary/5 hover:to-primary/10 border-primary/20"
            >
              <span>{t("services.viewAll")}</span>
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}