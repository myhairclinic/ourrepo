import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useLanguage } from '@/context/LanguageContext';
import { Package } from '@shared/schema';
import { Container } from '@/components/ui/container';
import PageHeader from '@/components/ui/PageHeader';
import { Loader2 } from 'lucide-react';
import PackageCard from '@/components/packages/PackageCard';
import CountryFilter from '@/components/packages/CountryFilter';

const PackagesPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  
  // Fetch all packages
  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    queryFn: getQueryFn(),
  });
  
  // Extract unique countries from packages
  useEffect(() => {
    if (packages) {
      const uniqueCountries = [...new Set(packages.map(pkg => pkg.countryOrigin))];
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
            {language === 'TR' ? 'Bir hata oluştu!' : 
             language === 'EN' ? 'An error occurred!' : 
             language === 'RU' ? 'Произошла ошибка!' : 
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
          language === 'TR' ? 'Seyahat Paketleri' : 
          language === 'EN' ? 'Travel Packages' : 
          language === 'RU' ? 'Туристические Пакеты' : 
          'სამოგზაურო პაკეტები'
        }
        description={
          language === 'TR' ? 'Saç ekimi ve tatil bir arada - Gürcistan\'da konforlu seyahat paketleri' : 
          language === 'EN' ? 'Hair transplantation and vacation in one - Comfortable travel packages in Georgia' : 
          language === 'RU' ? 'Трансплантация волос и отдых вместе - Комфортные туристические пакеты в Грузии' : 
          'თმის გადანერგვა და დასვენება ერთად - კომფორტული სამოგზაურო პაკეტები საქართველოში'
        }
        bgImage="/images/tbilisi-panorama.jpg"
      />
      
      <Container>
        {countries.length > 0 && (
          <CountryFilter 
            countries={countries} 
            selectedCountry={selectedCountry} 
            onCountryChange={setSelectedCountry} 
          />
        )}
        
        {filteredPackages && filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">
              {language === 'TR' ? 'Henüz bu kategoride paket bulunmamaktadır.' : 
               language === 'EN' ? 'There are no packages in this category yet.' : 
               language === 'RU' ? 'В этой категории пока нет пакетов.' : 
               'ამ კატეგორიაში ჯერ არ არის პაკეტები.'}
            </h3>
          </div>
        )}
      </Container>
    </>
  );
};

export default PackagesPage;