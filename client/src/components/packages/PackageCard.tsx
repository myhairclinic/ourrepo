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
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
        {/* Package Type Ribbon - Top Left Corner, Angled */}
        {(pkg.packageType === 'premium' || pkg.isAllInclusive) && (
          <div className="absolute top-0 left-0 z-20 w-32 h-32 overflow-hidden">
            <div className={`absolute top-0 left-0 transform -translate-x-1/2 translate-y-1/4 rotate-[-45deg] py-1.5 px-12 shadow-md text-white text-sm font-bold
              ${pkg.packageType === 'premium' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
                'bg-gradient-to-r from-teal-500 to-emerald-500'}`}>
              {pkg.packageType === 'premium'
                ? getPackageTranslation("packages.premium", language)
                : getPackageTranslation("packages.allInclusive", language)
              }
            </div>
          </div>
        )}
        
        {/* Main image with radiant overlay */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={getCountrySpecificImage(country) || pkg.imageUrl || '/images/package-placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Image Gradient Overlay - Colorful & Vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-60 mix-blend-multiply" />
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern-dots.svg')] bg-center mix-blend-overlay"></div>
          
          {/* Country Flag Badge - Bottom Left on Image */}
          <div className="absolute bottom-20 left-4 z-20 py-1.5 px-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md flex items-center gap-2 border border-white/50 dark:border-gray-700/50">
            <span className="text-lg">{getCountryFlag(country)}</span>
            <span className="font-medium text-sm text-gray-800 dark:text-white">{countryName}</span>
          </div>
          
          {/* Featured Badge */}
          {pkg.isFeatured && (
            <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs py-1.5 px-3 rounded-full shadow-md flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1.5 fill-white" />
              {getPackageTranslation("packages.exclusive", language)}
            </div>
          )}
          
          {/* Package Title Overlay - Large & Bold with bright gradient */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg py-2 px-3 shadow-lg border border-white/30 dark:border-gray-700/30">
              <h3 className="text-lg font-bold leading-tight bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">{title}</h3>
            </div>
          </div>
          
          {/* Duration Badge - Top Right on Image */}
          <div className="absolute top-3 right-3 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-white text-xs py-1.5 px-3 rounded-full shadow-md flex items-center border border-white/50 dark:border-gray-700/50">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
            {pkg.durationDays} {getPackageTranslation("packages.days", language)}
          </div>
        </div>
        
        <div className="relative p-5">
          {/* Main Description */}
          <div className="mb-5">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          </div>
          
          {/* Divider with colorful styling */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-800 px-4 text-sm font-medium text-primary">
                {getPackageTranslation("packages.features", language)}
              </span>
            </div>
          </div>
          
          {/* Features List - Colorful icons */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-blue-200 dark:border-blue-800/30 shadow-sm">
                <Building className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{getPackageTranslation("packages.luxuryAccommodation", language)}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-purple-200 dark:border-purple-800/30 shadow-sm">
                <Plane className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{getPackageTranslation("packages.airportTransfer", language)}</p>
            </div>
            
            {packageFeatures.length > 0 ? (
              // Show actual package features if available
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-green-200 dark:border-green-800/30 shadow-sm">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{packageFeatures[0]}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-amber-200 dark:border-amber-800/30 shadow-sm">
                  <Globe className="h-5 w-5 text-amber-500" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{getPackageTranslation("packages.features.citytour", language)}</p>
              </div>
            )}
          </div>
          
          {/* Action Button with Colorful Gradient */}
          <div className="pt-1">
            <Button asChild 
              className="w-full relative bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 group overflow-hidden shadow-md"
              variant="default"
            >
              <Link href={addPrefix(`/packages/${pkg.slug}`)} className="py-4 flex items-center justify-center">
                <span className="relative z-10 flex items-center gap-1.5 text-[15px] font-medium">
                  <Search className="h-4 w-4 mr-1" />
                  {getPackageTranslation("packages.viewDetails", language)}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shimmering effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-[20deg] animate-[shimmer_2.5s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundSize: '200% 100%' }}></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;