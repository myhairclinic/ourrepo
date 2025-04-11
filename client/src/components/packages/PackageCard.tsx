import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Package } from "@shared/schema";
import { Language } from "@shared/types";
import { Link } from "wouter";
import { MapPin, Calendar, Users, Briefcase, ArrowRight, Star, Sparkles, Check, Building, Plane } from "lucide-react";
import { getTranslation } from "@/lib/translations";
import { getPackageTranslation } from "@/lib/packageTranslations";
import { Separator } from "@/components/ui/separator";

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { language, addPrefix } = useLanguage();
  
  // Get the title and description based on language
  const title = pkg[`title${language}` as keyof Package] as string;
  const description = pkg[`description${language}` as keyof Package] as string;
  const country = pkg.countryOrigin;
  
  // Get translated country name
  const countryName = getPackageTranslation(`countries.${country.toLowerCase()}`, language) || country;
  
  // Helper function to get country flag
  const getCountryFlag = (code: string): string => {
    const flagMap: Record<string, string> = {
      'TR': '🇹🇷', // Türkiye
      'RU': '🇷🇺', // Rusya
      'UA': '🇺🇦', // Ukrayna
      'AZ': '🇦🇿', // Azerbaycan
      'IR': '🇮🇷', // İran
      'EU': '🇪🇺', // Avrupa Birliği
      'SA': '🇸🇦', // Suudi Arabistan
      'AE': '🇦🇪', // Birleşik Arap Emirlikleri
      'IQ': '🇮🇶', // Irak
      'AM': '🇦🇲', // Ermenistan
      'KZ': '🇰🇿', // Kazakistan
      'BY': '🇧🇾', // Belarus
      'MD': '🇲🇩', // Moldova
      'GR': '🇬🇷', // Yunanistan
      'BG': '🇧🇬', // Bulgaristan
      'RO': '🇷🇴', // Romanya
    };
    
    return flagMap[code] || '🏳️';
  };
  
  // Extract features from highlights if available
  const getPackageFeatures = (): string[] => {
    if (!pkg.highlights) return [];
    
    try {
      const highlights = JSON.parse(pkg.highlights as string);
      return highlights.slice(0, 4); // Get first 4 highlights
    } catch (e) {
      console.error("Error parsing highlights:", e);
      return [];
    }
  };
  
  const packageFeatures = getPackageFeatures();
  
  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-300 border-border">
      {/* Country Badge - Now moved above image as a prominent header with gradient */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/70 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getCountryFlag(country)}</span>
          <span className="font-medium">{countryName}</span>
        </div>
        
        {/* Duration badge */}
        <div className="bg-white/20 text-white text-xs py-1 px-2.5 rounded-full flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          {pkg.durationDays} {getPackageTranslation("packages.days", language)}
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <img
          src={pkg.imageUrl || '/images/package-placeholder.jpg'}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {pkg.isFeatured && (
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500 to-amber-600 text-white text-xs py-1 px-3 shadow-md">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {getPackageTranslation("packages.exclusive", language)}
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200 line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1 text-sm">{description}</CardDescription>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium">4.9</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="grow pb-2">
        <div className="flex gap-3 flex-wrap mt-1">
          {/* Premium badge */}
          {pkg.packageType === 'premium' && (
            <Badge variant="secondary" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-none">
              <Sparkles className="h-3 w-3 mr-1" />
              {getPackageTranslation("packages.premium", language)}
            </Badge>
          )}
          
          {/* All-inclusive badge */}
          {pkg.isAllInclusive && (
            <Badge variant="secondary" className="bg-teal-500 hover:bg-teal-600 text-white border-none">
              <Check className="h-3 w-3 mr-1" />
              {getPackageTranslation("packages.allInclusive", language)}
            </Badge>
          )}
        </div>
        
        <Separator className="my-3" />
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Building className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm">
              {getPackageTranslation("packages.luxuryAccommodation", language)}
            </span>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Plane className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm">
              {getPackageTranslation("packages.airportTransfer", language)}
            </span>
          </div>
          
          {packageFeatures.length > 0 ? (
            // Show actual package features if available
            packageFeatures.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))
          ) : (
            // Show default features if no specific ones are available
            <>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <Users className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">
                  {getPackageTranslation("packages.features.translator", language)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">
                  {getPackageTranslation("packages.features.citytour", language)}
                </span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 mt-auto">
        <Button asChild className="w-full gap-2 mt-2 shadow-sm group">
          <Link href={addPrefix(`/packages/${pkg.slug}`)}>
            {getPackageTranslation("packages.viewDetails", language)}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;