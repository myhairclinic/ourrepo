import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { META } from "@/lib/constants";
import { translations } from "@/lib/translations";

export default function ServicesListPage() {
  const { language, currentLanguage } = useLanguage();
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Page title and description
  const pageTitle = translations[language].nav_services || "Services";
  const fullTitle = `${pageTitle} ${META.TITLE_SUFFIX}`;
  const pageDescription = translations[language].service_subtitle || "Our hair transplantation and aesthetic services";

  // Button texts
  const learnMoreButton = translations[language].learn_more || "Learn More";
  const errorMessage = translations[language].error_loading_services || "An error occurred while loading services. Please try again later.";

  // Helper function to get the title based on the current language
  const getLocalizedTitle = (service: Service) => {
    switch (language) {
      case "tr":
        return service.titleTR;
      case "en":
        return service.titleEN;
      case "ru":
        return service.titleRU;
      case "ka":
        return service.titleKA;
      default:
        return service.titleEN;
    }
  };

  // Helper function to get the description based on the current language
  const getLocalizedDescription = (service: Service) => {
    switch (language) {
      case "tr":
        return service.descriptionTR;
      case "en":
        return service.descriptionEN;
      case "ru":
        return service.descriptionRU;
      case "ka":
        return service.descriptionKA;
      default:
        return service.descriptionEN;
    }
  };

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href={`/${currentLanguage}`}>
              <span className="hover:text-primary cursor-pointer">{translations[language].nav_home || "Home"}</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{pageTitle}</span>
          </div>

          <h1 className="text-4xl font-bold text-center mb-3">{pageTitle}</h1>
          <p className="text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
            {pageDescription}
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">
              {errorMessage}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <Card key={service.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={getLocalizedTitle(service)} 
                      className="w-full h-full object-cover transform transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{getLocalizedTitle(service)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base">{getLocalizedDescription(service)}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/${currentLanguage}/services/${service.slug}`}>
                      <Button className="w-full">{learnMoreButton}</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}