import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Package } from "@shared/schema";
import { Language } from "@shared/types";
import { Link } from "wouter";
import { MapPin, Calendar, Users, Briefcase, ArrowRight, Star, Sparkles, Check, Building, Plane, Trophy, Heart, Clock, Globe, Search } from "lucide-react";
import { getTranslation } from "@/lib/translations";
import { getPackageTranslation } from "@/lib/packageTranslations";
import { Separator } from "@/components/ui/separator";

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { language, addPrefix } = useLanguage();
  
  // Get the title and description based on language
  const titleFieldMap: Record<string, string> = {
    'TR': 'title_tr',
    'EN': 'title_en',
    'RU': 'title_ru',
    'KA': 'title_ka'
  };
  
  const titleField = titleFieldMap[language] as keyof Package;
  const title = pkg[titleField] as string;
  const descriptionFieldMap: Record<string, string> = {
    'TR': 'description_tr',
    'EN': 'description_en',
    'RU': 'description_ru',
    'KA': 'description_ka'
  };
  
  const descriptionField = descriptionFieldMap[language] as keyof Package;
  const description = pkg[descriptionField] as string;
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

  // Helper function to get country-specific image
  const getCountrySpecificImage = (code: string): string => {
    const imageMap: Record<string, string> = {
      'TR': '/images/packages/turkey-package.webp',
      'RU': '/images/packages/russia-package.jpg',
      'UA': '/images/packages/ukraine-package.jpg',
      'AZ': '/images/packages/azerbaijan-package.jpg',
      'IR': '/images/packages/iran-package.jpg',
      'KZ': '/images/packages/kazakhstan-package.jpg',
    };
    
    return imageMap[code] || '';
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
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 border-border relative">
      {/* Image Section with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={getCountrySpecificImage(country) || pkg.imageUrl || '/images/package-placeholder.jpg'}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Country badge */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-background/90 backdrop-blur-sm text-foreground rounded-md shadow-md px-3 py-1.5 flex items-center gap-2">
          <span className="text-xl mr-1">{getCountryFlag(country)}</span>
          <span className="font-medium text-sm">{countryName}</span>
        </div>
        
        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
        
        {/* Package Title Overlay - Large & Bold */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1 drop-shadow-md">{title}</h3>
          
          {/* Package Type Badge Row */}
          <div className="flex flex-wrap gap-2 mb-2">
            {pkg.packageType === 'luxury' && (
              <div className="bg-purple-500/90 backdrop-blur-sm text-white text-xs py-1 px-2.5 rounded-full flex items-center shadow-sm">
                <Trophy className="h-3 w-3 mr-1.5" />
                {getPackageTranslation("packages.luxury", language)}
              </div>
            )}
            
            {pkg.packageType === 'premium' && (
              <div className="bg-indigo-500/90 backdrop-blur-sm text-white text-xs py-1 px-2.5 rounded-full flex items-center shadow-sm">
                <Sparkles className="h-3 w-3 mr-1.5" />
                {getPackageTranslation("packages.premium", language)}
              </div>
            )}
            
            {pkg.isAllInclusive && (
              <div className="bg-teal-500/90 backdrop-blur-sm text-white text-xs py-1 px-2.5 rounded-full flex items-center shadow-sm">
                <Check className="h-3 w-3 mr-1.5" />
                {getPackageTranslation("packages.allInclusive", language)}
              </div>
            )}
            
            {/* Duration Badge - Always Show */}
            <div className="bg-gray-700/80 backdrop-blur-sm text-white text-xs py-1 px-2.5 rounded-full flex items-center shadow-sm">
              <Clock className="h-3 w-3 mr-1.5" />
              {pkg.durationDays} {getPackageTranslation("packages.days", language)}
            </div>
          </div>
        </div>
        
        {/* Featured Badge - Top Right Corner */}
        {pkg.isFeatured && (
          <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-md shadow-md flex items-center">
            <Heart className="h-3.5 w-3.5 mr-1.5 fill-white" />
            {getPackageTranslation("packages.exclusive", language)}
          </div>
        )}
      </div>
      
      <CardContent className="py-4 grow">
        {/* Description */}
        <div className="mb-4">
          <CardDescription className="line-clamp-2 text-sm">{description}</CardDescription>
        </div>
        
        <Separator className="mb-4" />
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Building className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm">
              {getPackageTranslation("packages.luxuryAccommodation", language)}
            </span>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
              <Plane className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm">
              {getPackageTranslation("packages.airportTransfer", language)}
            </span>
          </div>
          
          {packageFeatures.length > 0 ? (
            // Show actual package features if available
            packageFeatures.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))
          ) : (
            // Show default features if no specific ones are available
            <>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">
                  {getPackageTranslation("packages.features.translator", language)}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">
                  {getPackageTranslation("packages.features.citytour", language)}
                </span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 px-4">
        <Button asChild className="w-full gap-2 shadow-md group bg-primary hover:bg-primary/90">
          <Link href={addPrefix(`/packages/${pkg.slug}`)}>
            <Search className="h-4 w-4 mr-1 opacity-70" />
            {getPackageTranslation("packages.viewDetails", language)}
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;