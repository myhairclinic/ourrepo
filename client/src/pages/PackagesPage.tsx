import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/use-translation";
import { useTitle } from "@/hooks/use-title";
import { Package } from "@shared/schema";
import { Language } from "@shared/types";
import { Link } from "wouter";
import { Euro, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { API_ROUTES } from "@/lib/constants";

export default function PackagesPage() {
  const { t, language } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  
  // Set page title
  useTitle(t("packages.title"));
  
  // Query packages data
  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: [API_ROUTES.PACKAGES],
    staleTime: 60000, // 1 minute
  });
  
  // Helper function to get content lines as array from content field
  const getContentLines = (packageItem: Package | null) => {
    if (!packageItem) return [];
    
    let content = "";
    
    // Get content for the current language
    switch (language) {
      case Language.Turkish:
        content = packageItem.contentTR;
        break;
      case Language.English:
        content = packageItem.contentEN;
        break;
      case Language.Russian:
        content = packageItem.contentRU;
        break;
      case Language.Georgian:
        content = packageItem.contentKA;
        break;
      default:
        content = packageItem.contentEN;
    }
    
    // Split content into lines, filter out empty lines
    return content.split("\n").filter(line => line.trim() !== "");
  };
  
  // Helper function to get title for the current language
  const getTitle = (packageItem: Package) => {
    switch (language) {
      case Language.Turkish:
        return packageItem.titleTR;
      case Language.English:
        return packageItem.titleEN;
      case Language.Russian:
        return packageItem.titleRU;
      case Language.Georgian:
        return packageItem.titleKA;
      default:
        return packageItem.titleEN;
    }
  };
  
  // Helper function to get description for the current language
  const getDescription = (packageItem: Package) => {
    switch (language) {
      case Language.Turkish:
        return packageItem.descriptionTR;
      case Language.English:
        return packageItem.descriptionEN;
      case Language.Russian:
        return packageItem.descriptionRU;
      case Language.Georgian:
        return packageItem.descriptionKA;
      default:
        return packageItem.descriptionEN;
    }
  };
  
  // Sort packages by order
  const sortedPackages = packages
    ? [...packages]
        .filter(pkg => pkg.isActive)
        .sort((a, b) => a.order - b.order)
    : [];

  return (
    <div className="container py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t("packages.title")}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("packages.subtitle")}
        </p>
      </div>
      
      {/* Packages Grid */}
      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center">
          <p>{t("error.somethingWentWrong")}</p>
        </div>
      ) : sortedPackages.length === 0 ? (
        <div className="bg-muted p-8 rounded-lg text-center">
          <p className="text-lg">{t("packages.noPackages")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden h-full flex flex-col">
              {pkg.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.imageUrl}
                    alt={getTitle(pkg)}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{getTitle(pkg)}</CardTitle>
                <CardDescription>{getDescription(pkg)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center mb-4">
                  <Euro className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <span className="text-muted-foreground text-sm">{t("packages.from")}: </span>
                    <span className="text-xl font-bold">{pkg.price}€</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {getContentLines(pkg).slice(0, 3).map((line, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{line}</span>
                    </div>
                  ))}
                  {getContentLines(pkg).length > 3 && (
                    <div className="text-sm text-muted-foreground">
                      +{getContentLines(pkg).length - 3} {t("common.features")}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedPackage(pkg)}>
                      {t("packages.details")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{getTitle(pkg)}</DialogTitle>
                      <DialogDescription>
                        {getDescription(pkg)}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                      {pkg.imageUrl && (
                        <div className="overflow-hidden rounded-md">
                          <img
                            src={pkg.imageUrl}
                            alt={getTitle(pkg)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Euro className="h-5 w-5 text-primary mr-2" />
                          <div>
                            <span className="text-muted-foreground text-sm">{t("common.price")}: </span>
                            <span className="text-xl font-bold">{pkg.price}€</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">{t("packages.included")}</h4>
                          <div className="space-y-2">
                            {getContentLines(pkg).map((line, idx) => (
                              <div key={idx} className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-sm">{line}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter className="sm:justify-between">
                      <DialogClose asChild>
                        <Button variant="outline">
                          {t("packages.inquire")}
                        </Button>
                      </DialogClose>
                      <Link href="/appointment">
                        <Button className="gap-2">
                          <Calendar className="h-4 w-4" />
                          {t("packages.bookNow")}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Link href="/appointment">
                  <Button className="gap-1">
                    <Calendar className="h-4 w-4" />
                    {t("packages.bookNow")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}