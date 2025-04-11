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
        title={
          language === Language.Turkish ? 'Seyahat Paketleri' : 
          language === Language.English ? 'Travel Packages' : 
          language === Language.Russian ? 'Туристические Пакеты' : 
          'სამოგზაურო პაკეტები'
        }
        description={
          language === Language.Turkish ? 'Saç ekimi ve tatil bir arada - Gürcistan\'da konforlu seyahat paketleri' : 
          language === Language.English ? 'Hair transplantation and vacation in one - Comfortable travel packages in Georgia' : 
          language === Language.Russian ? 'Трансплантация волос и отдых вместе - Комфортные туристические пакеты в Грузии' : 
          'თმის გადანერგვა და დასვენება ერთად - კომფორტული სამოგზაურო პაკეტები საქართველოში'
        }
        imageUrl="/images/tbilisi-panorama.jpg"
      />
      
      {/* Dark overlay after header */}
      <div className="bg-gradient-to-b from-black/90 to-background py-20 -mt-20 relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {getTranslation("packages.completeExperience", language)}
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              {getTranslation("packages.completeExperienceDesc", language)}
            </p>
          </div>
        </Container>
      </div>
      
      <Container className="py-16">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-28 mb-16 relative z-20">
          <Card className="bg-background border border-border/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getTranslation("packages.medicalExcellence", language)}</h3>
              <p className="text-muted-foreground">{getTranslation("packages.medicalExcellenceDesc", language)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <LucideHotel className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getTranslation("packages.luxuryAccommodation", language)}</h3>
              <p className="text-muted-foreground">{getTranslation("packages.accommodationDesc", language)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-background border border-border/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Plane className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getTranslation("packages.tourism", language)}</h3>
              <p className="text-muted-foreground">{getTranslation("packages.tourismDesc", language)}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* "Why Choose Our Packages" Section with dark background */}
        <div className="rounded-2xl bg-black/80 p-8 md:p-12 mb-20 shadow-2xl border border-gray-800/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{getTranslation("packages.whyOurPackages", language)}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">{getTranslation("packages.saveTime", language)}</h3>
                <p className="text-gray-300">{getTranslation("packages.saveTimeDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">{getTranslation("packages.expertTeam", language)}</h3>
                <p className="text-gray-300">{getTranslation("packages.expertTeamDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">{getTranslation("packages.bestLocations", language)}</h3>
                <p className="text-gray-300">{getTranslation("packages.bestLocationsDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-white">{getTranslation("packages.seamlessTransport", language)}</h3>
                <p className="text-gray-300">{getTranslation("packages.seamlessTransportDesc", language)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Package Listings */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="h-1 w-10 bg-primary rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {getPackageTranslation("packages.availablePackages", language)}
              </h2>
            </div>
            <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          {uniqueCountryPackages && uniqueCountryPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {uniqueCountryPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-black/50 rounded-lg border border-gray-800/50 shadow-lg">
              <MapPin className="h-16 w-16 text-primary/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">
                {getPackageTranslation("packages.noPackages", language)}
              </h3>
              <p className="text-gray-400 mt-3 max-w-md mx-auto">
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