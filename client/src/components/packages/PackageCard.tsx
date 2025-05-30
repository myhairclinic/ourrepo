import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Package } from "@shared/schema";
import { Language } from "@shared/types";
import { Link } from "wouter";
import { ArrowRight, Star, Check, Building, Plane, Heart, Clock, Globe, Search, Calendar, MapPin, Users, Trophy, Shield } from "lucide-react";
import { getTranslation } from "@/lib/translations";
import { getPackageTranslation } from "@/lib/packageTranslations";

interface PackageCardProps {
  pkg: Package;
}

// Yeni ve güzel kart tasarım bileşeni
const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { language, addPrefix } = useLanguage();
  
  // Apply default values to ensure consistent display
  const pkgWithDefaults = {
    ...pkg,
    durationDays: pkg.durationDays || 3,
    price: pkg.price || 1500,
    packageType: pkg.packageType || "standard",
    isFeatured: pkg.isFeatured !== undefined ? pkg.isFeatured : false,
    isAllInclusive: pkg.isAllInclusive !== undefined ? pkg.isAllInclusive : false
  };
  
  // Get the title and description based on language
  const titleFieldMap: Record<Language, keyof Package> = {
    [Language.Turkish]: 'titleTR',
    [Language.English]: 'titleEN',
    [Language.Russian]: 'titleRU',
    [Language.Georgian]: 'titleKA',
  };
  
  const descriptionFieldMap: Record<Language, keyof Package> = {
    [Language.Turkish]: 'descriptionTR',
    [Language.English]: 'descriptionEN',
    [Language.Russian]: 'descriptionRU',
    [Language.Georgian]: 'descriptionKA',
  };
  
  const titleField = titleFieldMap[language];
  const title = pkg[titleField] as string || '';
  
  const descriptionField = descriptionFieldMap[language];
  const description = pkg[descriptionField] as string || '';
  
  // Helper function to get country flag
  const getCountryFlag = (code?: string): string => {
    if (!code || code === '') return '🌍'; // Default to globe if no country code
    
    const flagMap: Record<string, string> = {
      'TR': '🇹🇷', // Türkiye
      'RU': '🇷🇺', // Rusya
      'UA': '🇺🇦', // Ukrayna
      'AZ': '🇦🇿', // Azerbaycan
      'IR': '🇮🇷', // İran
      'KZ': '🇰🇿', // Kazakistan
      'AM': '🇦🇲', // Ermenistan
      'BY': '🇧🇾', // Belarus
      'GE': '🇬🇪', // Gürcistan
      'MD': '🇲🇩', // Moldova
      'GR': '🇬🇷', // Yunanistan
      'BG': '🇧🇬', // Bulgaristan
      'RO': '🇷🇴', // Romanya
      'UNKNOWN': '🌍' // Unknown country
    };
    
    // Convert code to uppercase for case-insensitive matching
    const upperCode = code.toUpperCase();
    return flagMap[upperCode] || '🌍'; // Bulunamazsa dünya emoji'si
  };

  // Ülke bilgisini pkg.countryOrigin veya pkg.countryCode'dan al
  const country = pkg.countryOrigin || pkg.countryCode || '';
  
  // Get translated country name based on the package's real country
  const countryName = country 
    ? getPackageTranslation(`countries.${country.toUpperCase()}`, language) || country
    : getPackageTranslation("countries.international", language); // Default to international if no country specified
  
  // Helper function to get country-specific image
  const getCountrySpecificImage = (code?: string): string => {
    if (!code) return '';
    
    // Check if premium package type to use special premium images
    if (pkg.packageType === 'premium') {
      const premiumImageMap: Record<string, string> = {
        'TR': '/images/packages/premium-package-tr.jpg',
        'RU': '/images/packages/premium-package-ru.jpg', 
        'UA': '/images/packages/premium-package-ua.jpg',
        'AZ': '/images/packages/premium-package-az.jpg',
        'IR': '/images/packages/premium-package-ir.jpg',
        'KZ': '/images/packages/premium-package-kz.jpg',
        'DEFAULT': '/images/packages/luxury-package.jpg'
      };
      
      // Convert code to uppercase for case-insensitive matching
      const upperCode = code.toUpperCase();
      return premiumImageMap[upperCode] || premiumImageMap['DEFAULT'];
    }
    
    // Regular package images
    const imageMap: Record<string, string> = {
      'TR': '/images/packages/turkey-package.webp',
      'RU': '/images/packages/russia-package.jpg',
      'UA': '/images/packages/ukraine-package.jpg',
      'AZ': '/images/packages/azerbaijan-package.jpg',
      'IR': '/images/packages/iran-package.jpg',
      'KZ': '/images/packages/kazakhstan-package.jpg',
      'LUXURY': '/images/packages/luxury-package.jpg',
      'UNKNOWN': '/images/packages/general-package.jpg'
    };
    
    // Convert code to uppercase for case-insensitive matching
    const upperCode = code.toUpperCase();
    return imageMap[upperCode] || '';
  };
  
  // Extract features from highlights if available
  const getPackageFeatures = (): string[] => {
    if (!pkg.highlights) return [];
    
    try {
      const highlights = JSON.parse(pkg.highlights as string);
      return highlights.slice(0, 3); // Get first 3 highlights
    } catch (e) {
      console.error("Error parsing highlights:", e);
      return [];
    }
  };
  
  const packageFeatures = getPackageFeatures();
  
  // Map package type to corresponding icon and color
  const getTypeIcon = () => {
    // Azerbaycan ve Kazakistan için rozet gösterme
    if (country === 'AZ' || country === 'KZ') {
      return false;
    }
    
    if (pkg.packageType === 'premium') {
      return {
        icon: <Trophy className="h-4 w-4" />,
        text: getPackageTranslation("packages.premium", language),
        color: "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
      };
    } else if (pkg.isAllInclusive) {
      return {
        icon: <Shield className="h-4 w-4" />,
        text: getPackageTranslation("packages.allInclusive", language),
        color: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
      };
    }
    return {
      icon: <Star className="h-4 w-4" />,
      text: getPackageTranslation("packages.standard", language),
      color: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100"
    };
  };
  
  const typeInfo = getTypeIcon();
  
  // İlgi çekici içerik ikon seçimi
  const getFeatureIcon = (index: number) => {
    const icons = [
      <Building className="h-5 w-5 text-fuchsia-500" />,
      <Plane className="h-5 w-5 text-cyan-500" />,
      <MapPin className="h-5 w-5 text-rose-500" />,
      <Shield className="h-5 w-5 text-amber-500" />,
      <Users className="h-5 w-5 text-indigo-500" />,
      <Calendar className="h-5 w-5 text-emerald-500" />,
    ];
    return icons[index % icons.length];
  };
  
  // Feature backgrounds for visual variety
  const getFeatureBgClass = (index: number) => {
    const bgClasses = [
      "from-fuchsia-50 to-pink-50 border-fuchsia-200 dark:from-fuchsia-900/10 dark:to-pink-900/10 dark:border-fuchsia-800/30",
      "from-cyan-50 to-blue-50 border-cyan-200 dark:from-cyan-900/10 dark:to-blue-900/10 dark:border-cyan-800/30",
      "from-rose-50 to-red-50 border-rose-200 dark:from-rose-900/10 dark:to-red-900/10 dark:border-rose-800/30",
      "from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-900/10 dark:to-yellow-900/10 dark:border-amber-800/30",
      "from-indigo-50 to-violet-50 border-indigo-200 dark:from-indigo-900/10 dark:to-violet-900/10 dark:border-indigo-800/30",
      "from-emerald-50 to-green-50 border-emerald-200 dark:from-emerald-900/10 dark:to-green-900/10 dark:border-emerald-800/30",
    ];
    return bgClasses[index % bgClasses.length];
  };
  
  // Paketteki countryOrigin bilgisini debug için yazdır
  useEffect(() => {
    //console.log(`PackageCard - Package ID: ${pkg.id}, Country: ${pkg.countryOrigin || "undefined"}, CountryCode: ${pkg.countryCode || "undefined"}`);
  }, [pkg]);
  
  return (
    <div className="group relative h-full">
      {/* Softened hover effect - more subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-purple-400/3 to-blue-400/3 rounded-2xl -m-1 group-hover:blur-lg transition-all duration-500 opacity-0 group-hover:opacity-70"></div>
      
      {/* Main card */}
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/30 hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-500 transform group-hover:-translate-y-1 group-hover:scale-[1.02] z-10">
        {/* Package Type Badge - Top Right - sadece typeInfo varsa göster */}
        {typeInfo && (
          <div className={`absolute top-4 right-4 z-30 py-1 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm ${typeInfo.color}`}>
            {typeInfo.icon}
            {typeInfo.text}
          </div>
        )}
        
        {/* Country banner on top */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-primary via-indigo-500 to-violet-600 h-1.5"></div>
        
        {/* Featured star marker - Azerbaycan ve Kazakistan için gösterme */}
        {pkg.isFeatured && country && country !== 'AZ' && country !== 'KZ' && (
          <div className="absolute top-0 left-0 z-30 w-0 h-0 border-t-[60px] border-l-[60px] border-t-amber-500 border-l-transparent border-r-transparent rotate-90">
            <Star className="absolute text-white h-4 w-4 left-[-52px] top-[-48px] fill-white" />
          </div>
        )}
        
        {/* Main image with overlay */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={getCountrySpecificImage(country) || pkg.imageUrl || '/images/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {/* Country flag badge */}
          <div className="absolute top-4 left-4 z-20 py-1.5 px-3 bg-black/50 backdrop-blur-sm rounded-lg shadow-sm flex items-center gap-2">
            <span className="text-lg">{getCountryFlag(country)}</span>
            <span className="font-bold text-sm text-white">{countryName}</span>
          </div>
          
          {/* Title banner at bottom of image */}
          <div className="absolute left-0 right-0 bottom-0 z-20 p-4">
            <h3 className="text-lg sm:text-xl font-bold leading-tight text-white drop-shadow-md">
              {title}
            </h3>
          </div>
        </div>
        
        {/* Days and Per Person information row */}
        <div className="flex items-center space-x-4 px-5 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1.5 text-blue-500" />
            <span>{pkgWithDefaults.durationDays} {getPackageTranslation("packages.days", language)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-1.5 text-blue-500" />
            <span>{language === Language.Turkish ? "Kişi Başına" : getPackageTranslation("packages.perPerson", language)}</span>
          </div>
        </div>
        
        {/* Card content */}
        <div className="p-5 pt-4">
          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{description}</p>
          
          {/* Features section */}
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <span className="h-1 w-6 bg-primary/50 rounded-full"></span>
            {getPackageTranslation("packages.packageFeatures", language)}
          </h4>
          
          {/* Features list */}
          <div className="space-y-2.5 mb-5">
            {/* Always show accommodation */}
            <div className="flex items-center gap-2.5">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${getFeatureBgClass(0)} flex items-center justify-center border`}>
                {getFeatureIcon(0)}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {getPackageTranslation("packages.luxuryAccommodation", language)}
              </p>
            </div>
            
            {/* Always show transfer */}
            <div className="flex items-center gap-2.5">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${getFeatureBgClass(1)} flex items-center justify-center border`}>
                {getFeatureIcon(1)}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {getPackageTranslation("packages.airportTransfer", language)}
              </p>
            </div>
            
            {/* Dynamic third feature */}
            <div className="flex items-center gap-2.5">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${getFeatureBgClass(2)} flex items-center justify-center border`}>
                {getFeatureIcon(2)}
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {packageFeatures.length > 0 
                  ? packageFeatures[0] 
                  : getPackageTranslation("packages.features.citytour", language)}
              </p>
            </div>
          </div>
          
          {/* View details button */}
          <Button asChild 
            className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 group overflow-hidden"
          >
            <Link href={addPrefix(`/packages/${pkg.slug}`)} className="py-2 flex items-center justify-center">
              <span className="flex items-center gap-1.5 text-[14px] font-medium relative z-10">
                <Search className="h-3.5 w-3.5 mr-1" />
                {getPackageTranslation("packages.viewDetails", language)}
                <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Subtle shimmering effect - reduced animation */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-20 animate-[shimmer_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-70 transition-opacity duration-300" style={{ backgroundSize: '200% 100%' }}></span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;