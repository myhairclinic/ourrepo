import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Loader2, Star, Check, ArrowRight, Info, Calendar, Clock, Users, BadgeCheck, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { META } from "@/lib/constants";
import { getTranslation, useTranslation } from "@/lib/translations";
import { Language } from "@shared/types";
import { useState, useRef, useEffect } from "react";

export default function ServicesListPage() {
  const { language, currentLanguage, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
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
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Page title and description
  const pageTitle = t("common.services");
  const fullTitle = `${pageTitle} ${META.TITLE_SUFFIX}`;
  const pageDescription = t("services.subtitle");

  // Button texts
  const learnMoreButton = t("common.learnMore");
  const errorMessage = t("errors.loading_services");

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

  // Get service specific icon
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'hair-transplantation':
        return <BadgeCheck className="h-5 w-5 text-primary" />;
      case 'eyebrow-transplantation':
        return <Star className="h-5 w-5 text-amber-500" />;
      case 'beard-transplantation':
        return <Heart className="h-5 w-5 text-rose-500" />;
      case 'prp-treatment':
        return <Calendar className="h-5 w-5 text-emerald-500" />;
      case 'hair-mesotherapy':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  // Helper function to get features for each service
  const getServiceFeatures = (serviceId: number) => {
    const commonFeatures = [
      t("services.features.naturalResults"),
      t("services.features.permanentSolution"),
      t("services.features.consultation"),
      t("services.features.aftercare")
    ];

    const specificFeatures: Record<number, string[]> = {
      1: [t("services.features.customDesign"), t("services.features.densityControl")], // Hair Transplantation
      2: [t("services.features.naturalAppearance"), t("services.features.facialHarmony")], // Eyebrow Transplantation
      3: [t("services.features.facialHarmony"), t("services.features.densityControl")], // Beard Transplantation
      4: [t("services.features.quickRecovery"), t("services.features.noSideEffects")], // PRP Treatment
      5: [t("services.features.noSideEffects"), t("services.features.quickRecovery")] // Hair Mesotherapy
    };

    return serviceId in specificFeatures ? [...specificFeatures[serviceId], ...commonFeatures] : commonFeatures;
  };

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyHair Clinic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      
      <main className="py-16 bg-gradient-to-b from-white to-gray-50/80 overflow-hidden" ref={sectionRef}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute right-10 top-1/3 w-[30rem] h-[30rem] rounded-full bg-blue-300/5 blur-3xl"></div>
          <div className="absolute left-1/4 bottom-1/4 w-64 h-64 rounded-full bg-blue-100/10 blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground flex items-center">
            <Link href={addPrefix("/")}>
              <span className="hover:text-primary cursor-pointer transition-colors">{t("common.home")}</span>
            </Link>
            <span className="mx-2 text-muted-foreground/50">/</span>
            <span className="text-primary font-medium">{pageTitle}</span>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="px-4 py-1 rounded-full text-primary border-primary/30 font-medium mb-4">
              {t("services.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <Loader2 className="h-8 w-8 animate-spin text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10 bg-red-50 rounded-lg border border-red-100 shadow-sm">
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg font-medium">{errorMessage}</span>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                  {t("common.tryAgain")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service, index) => (
                <div
                  key={service.id}
                  className={`transition-all duration-1000 transform ${
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-20'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Card className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 border-primary/10 group">
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={service.slug === 'eyebrow-transplantation' ? '/images/services/eyebrow-transplant.jpg' : service.imageUrl} 
                        alt={getLocalizedTitle(service)} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/images/services/default.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Service badge */}
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-primary">
                          {service.duration ? `${service.duration} ${t("common.duration")}` : '60-90 min'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        {getServiceIcon(service.slug)}
                        <CardTitle className="text-2xl font-bold">{getLocalizedTitle(service)}</CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">{getLocalizedDescription(service)}</p>
                      
                      {/* Service features */}
                      <div className="space-y-2 mt-4">
                        {getServiceFeatures(service.id).slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Link href={addPrefix(`/services/${service.slug}`)} className="w-full">
                        <Button className="w-full group-hover:bg-primary/90 transition-colors mt-2 flex items-center justify-center gap-2">
                          {learnMoreButton}
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          )}
          
          {/* Decorative bottom line */}
          <div className="mx-auto max-w-md mt-20 flex justify-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          </div>
        </div>
      </main>
    </>
  );
}