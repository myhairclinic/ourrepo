import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/LanguageContext';
import { Package } from '@shared/schema';
import { Language } from '@shared/types';
import Container from '@/components/ui/container';
import PageHeader from '@/components/ui/PageHeader';
import { Loader2, Plane, MapPin, Clock, LucideHotel, Users, HeartPulse, Sparkles, Globe, Shield, Check } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTranslation } from "@/lib/translations";
import { getPackageTranslation } from "@/lib/packageTranslations";

// Function to get country flag emoji
const getCountryFlag = (countryCode: string): string => {
  switch (countryCode.toLowerCase()) {
    case 'tr':
      return '🇹🇷';
    case 'ru':
      return '🇷🇺';
    case 'az':
      return '🇦🇿';
    case 'kz':
      return '🇰🇿';
    case 'ua':
      return '🇺🇦';
    case 'ir':
      return '🇮🇷';
    case 'ge':
      return '🇬🇪';
    case 'am':
      return '🇦🇲';
    case 'by':
      return '🇧🇾';
    case 'md':
      return '🇲🇩';
    case 'gr':
      return '🇬🇷';
    case 'bg':
      return '🇧🇬';
    case 'ro':
      return '🇷🇴';
    default:
      return '🌍';
  }
};

const PackagesPage: React.FC = () => {
  const { language } = useLanguage();
  
  // Fetch all packages
  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    queryFn: async () => {
      const res = await fetch('/api/packages');
      if (!res.ok) {
        throw new Error('Failed to fetch packages');
      }
      return res.json();
    },
  });

  // Get one package per country - keep only the most recently added package for each country
  const uniqueCountryPackages = packages?.reduce((acc, pkg) => {
    // Get existing package for this country, if any
    const existingPkg = acc.find(p => p.countryOrigin === pkg.countryOrigin);
    
    // If no package exists for this country yet, add the current one
    if (!existingPkg) {
      return [...acc, pkg];
    }
    
    // Otherwise, replace the existing one if this one is newer (has a higher ID)
    if (pkg.id > existingPkg.id) {
      return [...acc.filter(p => p.countryOrigin !== pkg.countryOrigin), pkg];
    }
    
    // Keep the existing package
    return acc;
  }, [] as Package[]) || [];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <Container>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            {language === Language.Turkish ? 'Bir hata oluştu!' : 
             language === Language.English ? 'An error occurred!' : 
             language === Language.Russian ? 'Произошла ошибка!' : 
             'შეცდომა მოხდა!'}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </Container>
    );
  }
  
  return (
    <>
      <PageHeader 
        title={getPackageTranslation("packages.pageTitle", language)}
        description={getPackageTranslation("packages.pageDescription", language)}
        imageUrl="/images/tbilisi-panorama.jpg"
      />
      
      {/* Colorful overlay with wave pattern after header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 py-20 -mt-20 relative z-10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/30 dark:bg-pink-700/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/40 dark:bg-blue-700/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <Container>
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {getTranslation("packages.completeExperience", language)}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
              {getTranslation("packages.completeExperienceDesc", language)}
            </p>
          </div>
        </Container>
      </div>
      
      <Container className="py-16">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-28 mb-16 relative z-20">
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-400 to-purple-500"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="h-7 w-7 text-pink-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getTranslation("packages.medicalExcellence", language)}</h3>
              <p className="text-muted-foreground">{getTranslation("packages.medicalExcellenceDesc", language)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <LucideHotel className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getTranslation("packages.luxuryAccommodation", language)}</h3>
              <p className="text-muted-foreground">{getTranslation("packages.accommodationDesc", language)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-green-400"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Plane className="h-7 w-7 text-teal-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getTranslation("packages.tourism", language)}</h3>
              <p className="text-muted-foreground">{getTranslation("packages.tourismDesc", language)}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* "Why Choose Our Packages" Section with colorful background */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 dark:from-sky-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 p-8 md:p-12 mb-20 shadow-xl border border-blue-100 dark:border-blue-800/30 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-200/40 dark:bg-indigo-700/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-200/30 dark:bg-sky-700/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-8 relative">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{getTranslation("packages.whyOurPackages", language)}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 relative">
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 dark:from-cyan-700/20 dark:to-blue-700/20 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-700/30 shadow-sm">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getTranslation("packages.saveTime", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getTranslation("packages.saveTimeDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-700/20 dark:to-pink-700/20 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-700/30 shadow-sm">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getTranslation("packages.expertTeam", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getTranslation("packages.expertTeamDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400/20 to-green-400/20 dark:from-teal-700/20 dark:to-green-700/20 flex items-center justify-center shrink-0 border border-teal-200 dark:border-teal-700/30 shadow-sm">
                <Globe className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getTranslation("packages.bestLocations", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getTranslation("packages.bestLocationsDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-700/20 dark:to-orange-700/20 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-700/30 shadow-sm">
                <Check className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getTranslation("packages.seamlessTransport", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getTranslation("packages.seamlessTransportDesc", language)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Countries List */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center shadow-sm">
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              {getPackageTranslation("packages.byCountry", language)}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {['tr', 'ru', 'az', 'ua', 'ir', 'kz'].map((countryCode, index) => {
              // Count packages for this country
              const countryPackages = packages?.filter(pkg => pkg.countryOrigin === countryCode) || [];
              
              const delayClass = `delay-${(index + 1) * 100}`;
              
              // Get background image for countries
              let bgImage = '';
              if (countryCode === 'tr') bgImage = "bg-[url('/images/kız-kulesi.webp')]";
              else if (countryCode === 'ru') bgImage = "bg-[url('/images/U-kremlin-sarayi-rusya-sehir-manzarasi-dunyaca-unlu-sehirler-kanvas-tablo1455893402-800.jpg')]";
              else if (countryCode === 'az') bgImage = "bg-[url('/images/azerbaycan-giris-Jy5Z_cover.jpg')]";
              else if (countryCode === 'ua') bgImage = "bg-[url('/images/st-andrew-s-church.jpg')]";
              else if (countryCode === 'ir') bgImage = "bg-[url('/images/iran-resimleri.jpg')]";
              else if (countryCode === 'kz') bgImage = "bg-[url('/images/kazakistanin-ruhu-bu-topr-700.jpg')]";
              
              // Animation classes based on row
              const animationClasses = index < 3 ? "animate-float" : "animate-float animation-delay-2000";
              
              return (
                <div key={countryCode} className="group perspective-1000">
                  <div 
                    className={`h-44 relative overflow-hidden rounded-2xl shadow-lg fade-in opacity-0 ${delayClass} ${animationClasses} transform-style-3d group-hover:scale-105 transition-transform duration-500`}
                  >
                    {/* Background with image */}
                    <div className={`absolute inset-0 ${bgImage} bg-cover bg-center`}></div>
                    
                    {/* Glass overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-purple-500/40 to-indigo-600/60 backdrop-blur-sm"></div>
                    
                    {/* Glowing border */}
                    <div className="absolute inset-0 border-2 border-white/20 rounded-2xl"></div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/30 via-violet-500/30 to-fuchsia-500/30 rounded-2xl blur-xl -m-2"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                      {/* Country flag */}
                      <div className="mb-1 transform group-hover:scale-110 transition-transform duration-500 group-hover:-translate-y-1">
                        <span className="text-5xl drop-shadow-lg">{getCountryFlag(countryCode)}</span>
                      </div>
                      
                      {/* Country name */}
                      <h3 className="text-xl font-bold text-white drop-shadow-md mt-2 group-hover:text-white/90 transition-colors">
                        {getPackageTranslation(`countries.${countryCode}`, language)}
                      </h3>
                      
                      {/* Package count */}
                      <div className="mt-2 bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full text-white/90 font-medium border border-white/20 shadow-lg transform transition-all duration-300 group-hover:translate-y-1">
                        <span className="text-sm">
                          {countryPackages.length} {getPackageTranslation("packages.packageCount", language)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Package Listings */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-12 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                {getPackageTranslation("packages.availablePackages", language)}
              </h2>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 h-10 w-10 rounded-full flex items-center justify-center shadow-sm">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          
          {uniqueCountryPackages && uniqueCountryPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {uniqueCountryPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700/30 shadow-md">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {getPackageTranslation("packages.noPackages", language)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md mx-auto">
                {getPackageTranslation("packages.tryDifferentFilter", language)}
              </p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default PackagesPage;