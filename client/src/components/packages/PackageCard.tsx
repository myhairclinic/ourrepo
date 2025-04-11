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
      <div className="relative h-full bg-black/90 dark:bg-black rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-gray-800/40 transition-all duration-500 transform hover:translate-y-[-8px]">
        {/* Package Type Ribbon - Top Left Corner, Angled */}
        {(pkg.packageType === 'luxury' || pkg.packageType === 'premium' || pkg.isAllInclusive) && (
          <div className="absolute top-0 left-0 z-20 w-32 h-32 overflow-hidden">
            <div className={`absolute top-0 left-0 transform -translate-x-1/2 translate-y-1/4 rotate-[-45deg] py-1.5 px-12 shadow-md text-white text-sm font-bold
              ${pkg.packageType === 'luxury' ? 'bg-gradient-to-r from-purple-800 to-purple-600' : 
                pkg.packageType === 'premium' ? 'bg-gradient-to-r from-blue-800 to-indigo-600' : 
                'bg-gradient-to-r from-teal-700 to-emerald-600'}`}>
              {pkg.packageType === 'luxury' 
                ? getPackageTranslation("packages.luxury", language)
                : pkg.packageType === 'premium'
                  ? getPackageTranslation("packages.premium", language)
                  : getPackageTranslation("packages.allInclusive", language)
              }
            </div>
          </div>
        )}
        
        {/* Main image with overlay */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={getCountrySpecificImage(country) || pkg.imageUrl || '/images/package-placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.85]"
          />
          
          {/* Image Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20" />
          
          {/* Country Flag Badge - Bottom Left on Image */}
          <div className="absolute bottom-24 left-4 z-20 py-2 px-3 bg-black/70 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2 border border-gray-700/50">
            <span className="text-lg">{getCountryFlag(country)}</span>
            <span className="font-medium text-sm text-white">{countryName}</span>
          </div>
          
          {/* Featured Badge */}
          {pkg.isFeatured && (
            <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs py-1.5 px-3 rounded-full shadow-md flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1.5 fill-white" />
              {getPackageTranslation("packages.exclusive", language)}
            </div>
          )}
          
          {/* Package Title Overlay - Large & Bold */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
            <h3 className="text-2xl font-bold mb-2 drop-shadow-lg leading-tight">{title}</h3>
          </div>
          
          {/* Duration Badge - Bottom Right on Image */}
          <div className="absolute bottom-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-xs py-1.5 px-3.5 rounded-full shadow-sm flex items-center border border-gray-700/50">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {pkg.durationDays} {getPackageTranslation("packages.days", language)}
          </div>
        </div>
        
        <div className="relative p-5 bg-gradient-to-b from-gray-900 to-black">
          {/* Main Description */}
          <div className="mb-5">
            <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
          </div>
          
          {/* Divider with subtle styling */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-sm text-gray-400 font-medium">
                {getPackageTranslation("packages.features", language)}
              </span>
            </div>
          </div>
          
          {/* Features List - Vertical Layout */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors duration-300 border border-primary/20">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-gray-200">{getPackageTranslation("packages.luxuryAccommodation", language)}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors duration-300 border border-primary/20">
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-gray-200">{getPackageTranslation("packages.airportTransfer", language)}</p>
            </div>
            
            {packageFeatures.length > 0 ? (
              // Show actual package features if available
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors duration-300 border border-primary/20">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-gray-200">{packageFeatures[0]}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors duration-300 border border-primary/20">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-gray-200">{getPackageTranslation("packages.features.citytour", language)}</p>
              </div>
            )}
          </div>
          
          {/* Action Button with Hover Effect */}
          <div className="pt-1">
            <Button asChild 
              className="w-full bg-primary hover:bg-primary/90 group relative overflow-hidden shadow-lg border-t border-primary/30"
              variant="default"
            >
              <Link href={addPrefix(`/packages/${pkg.slug}`)} className="py-6 flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-2 text-[15px] tracking-wide font-medium">
                  <Search className="h-4 w-4 mr-1 opacity-70" />
                  {getPackageTranslation("packages.viewDetails", language)}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Animated background on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;