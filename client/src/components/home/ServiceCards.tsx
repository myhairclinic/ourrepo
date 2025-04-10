import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Language } from "@shared/types";

export default function ServiceCards() {
  const { t, language } = useTranslation();
  
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

  return (
    <section className="relative bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">{t("common.services")}</h2>
        <p className="text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
          {t("services.subtitle")}
        </p>

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
              <Card key={service.id} className="overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.imageUrl} 
                    alt={getLocalizedTitle(service)} 
                    className="w-full h-full object-cover transform transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{getLocalizedTitle(service)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{getLocalizedDescription(service)}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full">{t("common.learnMore")}</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}