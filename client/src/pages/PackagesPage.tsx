import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useLanguage } from '@/context/LanguageContext';
import { Package } from '@shared/schema';
import { Language } from '@shared/types';
import Container from '@/components/ui/container';
import PageHeader from '@/components/ui/PageHeader';
import { Loader2, Plane, MapPin, Clock, LucideHotel, Users, HeartPulse, Sparkles } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';
import CountryFilter from '@/components/packages/CountryFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTranslation } from "@/lib/translations";

const PackagesPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  
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
  
  // Extract unique countries from packages
  useEffect(() => {
    if (packages) {
      const uniqueCountries = Array.from(new Set(packages.map(pkg => pkg.countryOrigin)));
      setCountries(uniqueCountries);
    }
  }, [packages]);
  
  // Filter packages by selected country
  const filteredPackages = selectedCountry
    ? packages?.filter(pkg => pkg.countryOrigin === selectedCountry)
    : packages;
  
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
      
      <Container className="py-12">
        {/* Introduction Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            {getTranslation("packages.completeExperience", language)}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {getTranslation("packages.completeExperienceDesc", language)}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-muted/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartPulse className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{getTranslation("packages.medicalExcellence", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.medicalExcellenceDesc", language)}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LucideHotel className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{getTranslation("packages.luxuryAccommodation", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.accommodationDesc", language)}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50 border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{getTranslation("packages.tourism", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.tourismDesc", language)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        {/* "Why Choose Our Packages" Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{getTranslation("packages.whyOurPackages", language)}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{getTranslation("packages.saveTime", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.saveTimeDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{getTranslation("packages.expertTeam", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.expertTeamDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{getTranslation("packages.bestLocations", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.bestLocationsDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{getTranslation("packages.seamlessTransport", language)}</h3>
                <p className="text-sm text-muted-foreground">{getTranslation("packages.seamlessTransportDesc", language)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        {/* Package Filter and Listings */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">
              {getTranslation("packages.availablePackages", language)}
            </h2>
            
            {countries.length > 0 && (
              <CountryFilter 
                countries={countries} 
                selectedCountry={selectedCountry} 
                onCountryChange={setSelectedCountry} 
              />
            )}
          </div>
          
          {filteredPackages && filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
              <MapPin className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground">
                {getTranslation("packages.noPackages", language)}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                {getTranslation("packages.tryDifferentFilter", language)}
              </p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default PackagesPage;