import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Loader2, Star, Check, ArrowRight, Info, Calendar, Clock, Users, BadgeCheck, Heart, Sparkles, Zap, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { META } from "@/lib/constants";
import { getTranslation, useTranslation } from "@/lib/translations";
import { Language } from "@shared/types";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";

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
  const pageTitle = t("common.services") || "Hizmetler";
  const fullTitle = `${pageTitle} | MyHair Clinic`;
  const pageDescription = t("services.subtitle") || "Saç ekimi ve güzellik hizmetleri";

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
        return <BadgeCheck className="h-6 w-6 text-primary" />;
      case 'eyebrow-transplantation':
        return <Sparkles className="h-6 w-6 text-amber-500" />;
      case 'beard-transplantation':
        return <Heart className="h-6 w-6 text-rose-500" />;
      case 'prp-treatment':
        return <Zap className="h-6 w-6 text-emerald-500" />;
      case 'hair-mesotherapy':
        return <ThumbsUp className="h-6 w-6 text-blue-500" />;
      default:
        return <Info className="h-6 w-6 text-primary" />;
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
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
      
      <PageHeader 
        title={pageTitle} 
        description={pageDescription}
        imageUrl="/images/services/hair-transplant.jpg"
        isSpecialPage={true}
      />
      
      <main className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden" ref={sectionRef}>
        {/* Modern decorative background elements */}
        <div className="relative">
          <div className="absolute -left-40 -top-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-blob opacity-30"></div>
          <div className="absolute right-10 top-1/3 w-[600px] h-[600px] rounded-full bg-blue-300/5 blur-[120px] animate-blob animation-delay-2000 opacity-30"></div>
          <div className="absolute left-1/4 bottom-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/10 blur-[80px] animate-blob animation-delay-4000 opacity-30"></div>
        </div>
        
        {/* Decorative shapes (removed to fix overlapping issues) */}

        <div className="container mx-auto px-4 relative z-10 mt-12">

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <Loader2 className="h-10 w-10 animate-spin text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            </div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-500 py-12 px-6 bg-red-50 rounded-xl border border-red-100 shadow-md max-w-2xl mx-auto"
            >
              <div className="flex flex-col items-center gap-4">
                <span className="text-xl font-medium">{errorMessage}</span>
                <Button variant="outline" size="lg" className="mt-2 px-6 hover:scale-105 transition-transform" onClick={() => window.location.reload()}>
                  {t("common.tryAgain")}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {[...(services || [])]
                .sort((a, b) => {
                  // Saç ekimi her zaman ilk sırada olsun
                  if (a.slug === 'hair-transplantation') return -1;
                  if (b.slug === 'hair-transplantation') return 1;
                  // Diğer servisler için mevcut sırayı koru
                  return 0;
                })
                .map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <Card className="overflow-hidden flex flex-col h-full rounded-xl hover:shadow-2xl transition-all duration-500 border-0 group bg-white/70 backdrop-blur-sm">
                    <div className="h-[280px] overflow-hidden relative">
                      <img 
                        src={service.slug === 'eyebrow-transplantation' 
                          ? '/images/services/eyebrow-transplant.jpg' 
                          : service.slug === 'hair-transplantation'
                            ? '/images/services/hair-transplant.jpg'
                            : service.slug === 'beard-transplantation'
                              ? '/images/services/beard-transplant.jpg'
                              : service.slug === 'prp-treatment'
                                ? '/images/services/prp-treatment.jpg'
                                : service.imageUrl} 
                        alt={getLocalizedTitle(service)} 
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/images/services/default.jpg';
                        }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                      
                      {/* Top badge with enhanced styling */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="secondary" className="bg-white shadow-lg text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                          {service.duration ? `${service.duration} ${t("common.duration")}` : '60-90 min'}
                        </Badge>
                      </div>
                      
                      {/* Service icon with floating effect - fixed positioning to avoid overlap */}
                      <div className="absolute bottom-0 right-0 transform translate-y-1/2 translate-x-0 mr-6 z-20">
                        <div className="bg-white shadow-xl rounded-full p-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          {getServiceIcon(service.slug)}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pt-8 pb-3">
                      <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                        {getLocalizedTitle(service)}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{getLocalizedDescription(service)}</p>
                      
                      {/* Service features with enhanced styling */}
                      <div className="space-y-3 mt-6 border-t border-gray-100 pt-4">
                        {getServiceFeatures(service.id).slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/feature">
                            <div className="mt-0.5 bg-primary/10 rounded-full p-1 group-hover/feature:bg-primary/20 transition-colors">
                              <Check className="h-4 w-4 text-primary shrink-0" />
                            </div>
                            <span className="text-sm text-gray-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <Link href={addPrefix(`/services/${service.slug}`)} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-xl transition-all duration-300 mt-2 text-white font-medium py-6 rounded-md flex items-center justify-center gap-2">
                          {learnMoreButton}
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Modern footer section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mt-24 mb-8 text-center max-w-xl"
          >
            {/* Animasyonlu dekoratif çizgi */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-16">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="absolute inset-[3px] bg-primary rounded-full"></div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {t("services.needHelp") || "Yardıma mı İhtiyacınız Var?"}
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              {t("services.contactForQuestions") || "Saç ekimi hakkında herhangi bir sorunuz varsa veya randevu almak istiyorsanız bizimle iletişime geçin."}
            </p>
            <Link href={addPrefix("/contact")}>
              <Button className="px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all">
                {t("common.contactUs")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      
      {/* Fixed decorative elements removed to fix overlapping issues */}
      
      {/* Global CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0%, 100% {
            transform: scale(1) translate(0px, 0px);
          }
          25% {
            transform: scale(1.1) translate(20px, 15px);
          }
          50% {
            transform: scale(1) translate(0px, 20px);
          }
          75% {
            transform: scale(0.9) translate(-20px, 15px);
          }
        }
        
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        `
      }} />
    </>
  );
}