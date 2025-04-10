import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Language } from "@shared/types";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

export default function ServiceCards() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
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

  // Create common service features that would be displayed for all services
  const commonFeatures = [
    t("services.features.consultation"),
    t("services.features.aftercare"),
    t("services.features.support"),
    t("services.features.satisfaction")
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-16">
          <Badge variant="outline" className="mb-3 px-4 py-1 text-sm font-medium rounded-full">
            {t("services.badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {t("common.services")}
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("services.subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            {t("error.somethingWentWrong")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => (
              <Card key={service.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-background">
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-300 z-10"></div>
                  <img 
                    src={service.imageUrl} 
                    alt={getLocalizedTitle(service)} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 z-20">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {t("services.popular")}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {getLocalizedTitle(service)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-muted-foreground mb-6">
                    {getLocalizedDescription(service)}
                  </CardDescription>
                  
                  <div className="space-y-2 mt-4">
                    {commonFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href={addPrefix(`/services/${service.slug}`)}>
                    <Button variant="default" className="w-full group">
                      <span>{t("common.learnMore")}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link href={addPrefix("/services")}>
            <Button variant="outline" size="lg" className="group">
              <span>{t("services.viewAll")}</span>
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}