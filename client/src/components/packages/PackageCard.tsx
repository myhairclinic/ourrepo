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
    <div className="group h-full">
      <div className="relative h-full bg-white dark:bg-background rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:translate-y-[-5px]">
        {/* Package Type Ribbon - Top Left Corner, Angled */}
        {(pkg.packageType === 'luxury' || pkg.packageType === 'premium' || pkg.isAllInclusive) && (
          <div className="absolute top-0 left-0 z-20 w-32 h-32 overflow-hidden">
            <div className={`absolute top-0 left-0 transform -translate-x-1/2 translate-y-1/4 rotate-[-45deg] py-1 px-10 shadow-md text-white text-sm font-semibold
              ${pkg.packageType === 'luxury' ? 'bg-gradient-to-r from-purple-700 to-purple-500' : 
                pkg.packageType === 'premium' ? 'bg-gradient-to-r from-blue-700 to-indigo-500' : 
                'bg-gradient-to-r from-teal-600 to-emerald-500'}`}>
              {pkg.packageType === 'luxury' 
                ? getPackageTranslation("packages.luxury", language)
                : pkg.packageType === 'premium'
                  ? getPackageTranslation("packages.premium", language)
                  : getPackageTranslation("packages.allInclusive", language)
              }
            </div>
          </div>
        )}
        
        {/* Country Flag Badge - Bottom Left on Image */}
        <div className="absolute bottom-36 left-4 z-20 py-2 px-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
          <span className="text-lg">{getCountryFlag(country)}</span>
          <span className="font-semibold text-sm">{countryName}</span>
        </div>
        
        {/* Featured Badge */}
        {pkg.isFeatured && (
          <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs py-1.5 px-3 rounded-full shadow-md flex items-center">
            <Heart className="h-3.5 w-3.5 mr-1.5 fill-white" />
            {getPackageTranslation("packages.exclusive", language)}
          </div>
        )}
        
        {/* Main image with overlay */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={getCountrySpecificImage(country) || pkg.imageUrl || '/images/package-placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Image Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Package Title Overlay - Large & Bold */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
            <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{title}</h3>
          </div>
          
          {/* Duration Badge - Bottom Right on Image */}
          <div className="absolute bottom-3 right-3 z-10 bg-black/40 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full shadow-sm flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {pkg.durationDays} {getPackageTranslation("packages.days", language)}
          </div>
        </div>
        
        <div className="relative p-5">
          {/* Main Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          </div>
          
          {/* Divider with subtle styling */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-background px-3 text-sm text-gray-500 dark:text-gray-400">
                {getPackageTranslation("packages.features", language)}
              </span>
            </div>
          </div>
          
          {/* Features List - Vertical Layout */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <Building className="h-4.5 w-4.5 text-primary" />
              </div>
              <p className="text-sm">{getPackageTranslation("packages.luxuryAccommodation", language)}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <Plane className="h-4.5 w-4.5 text-primary" />
              </div>
              <p className="text-sm">{getPackageTranslation("packages.airportTransfer", language)}</p>
            </div>
            
            {packageFeatures.length > 0 ? (
              // Show actual package features if available
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Check className="h-4.5 w-4.5 text-primary" />
                </div>
                <p className="text-sm">{packageFeatures[0]}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <Globe className="h-4.5 w-4.5 text-primary" />
                </div>
                <p className="text-sm">{getPackageTranslation("packages.features.citytour", language)}</p>
              </div>
            )}
          </div>
          
          {/* Action Button with Hover Effect */}
          <div className="pt-2">
            <Button asChild 
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group relative overflow-hidden shadow-md"
              variant="default"
            >
              <Link href={addPrefix(`/packages/${pkg.slug}`)} className="py-6 flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-2">
                  <span>{getPackageTranslation("packages.viewDetails", language)}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Animated background on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;