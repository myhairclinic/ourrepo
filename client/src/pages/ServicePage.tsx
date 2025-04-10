import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Service } from "@shared/schema";
import { Helmet } from "react-helmet";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getTranslation, useTranslation } from "@/lib/translations";
import { META } from "@/lib/constants";
import { Language } from "@shared/types";
import { ReviewsSection } from "@/components/services/ReviewsSection";
import FaqsSection from "@/components/services/FaqsSection";

export default function ServicePage() {
  const { language, currentLanguage, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  const [, params] = useRoute("/:lang/services/:slug");
  const slug = params?.slug;

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
    enabled: !!slug,
  });

  // Helper function to get the localized title based on current language
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

  // Helper function to get the localized description based on current language
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

  // Translations
  const appointmentButton = t("services.bookAppointment");
  const backToServices = t("services.allServices");
  const errorMessage = t("errors.loading_services");

  if (isLoading) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-6">{errorMessage}</h1>
          <Link href={`/${currentLanguage}/services`}>
            <Button variant="outline">{backToServices}</Button>
          </Link>
        </div>
      </main>
    );
  }

  const pageTitle = `${getLocalizedTitle(service)} ${META.TITLE_SUFFIX}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={getLocalizedDescription(service)} />
      </Helmet>

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href={addPrefix("/")}>
              <span className="hover:text-primary cursor-pointer">{t("common.home")}</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href={addPrefix("/services")}>
              <span className="hover:text-primary cursor-pointer">{t("common.services")}</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{getLocalizedTitle(service)}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Image */}
            <div className="overflow-hidden rounded-lg">
              <img 
                src={service.imageUrl} 
                alt={getLocalizedTitle(service)} 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Service Content */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{getLocalizedTitle(service)}</h1>
              <div className="prose prose-lg max-w-none mb-8">
                <p>{getLocalizedDescription(service)}</p>
              </div>
              <Link href={addPrefix(`/appointment?service=${service.id}`)}>
                <Button size="lg" className="mr-4">{appointmentButton}</Button>
              </Link>
              <Link href={addPrefix('/services')}>
                <Button variant="outline" size="lg">{backToServices}</Button>
              </Link>
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-20">
            {/* FAQs related to this service */}
            <FaqsSection serviceId={service.id} />

            {/* Customer Reviews Section */}
            <ReviewsSection serviceId={service.id} />
            
            {/* Before/After gallery for this service would go here */}
          </div>
        </div>
      </main>
    </>
  );
}