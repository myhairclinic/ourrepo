import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@shared/types';
import { Package } from '@shared/schema';
import PackageCard from '@/components/packages/PackageCard';
import CountryFilter from '@/components/packages/CountryFilter';
import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { getTranslation } from "@/lib/translations";
import { getPackageTranslation } from "@/lib/packageTranslations";
import { Loader2, Plane, MapPin, Clock, LucideHotel, Users, HeartPulse, Sparkles, Globe, Shield, Check } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent } from "@/components/ui/card";

// Function to get country flag emoji
const getCountryFlag = (countryCode: string): string => {
  if (!countryCode) return '🌍';
  
  // Convert to uppercase for case-insensitive matching
  const code = countryCode.toUpperCase();
  
  switch (code) {
    case 'TR':
      return '🇹🇷';
    case 'RU':
      return '🇷🇺';
    case 'AZ':
      return '🇦🇿';
    case 'KZ':
      return '🇰🇿';
    case 'UA':
      return '🇺🇦';
    case 'IR':
      return '🇮🇷';
    case 'GE':
      return '🇬🇪';
    case 'AM':
      return '🇦🇲';
    case 'BY':
      return '🇧🇾';
    case 'MD':
      return '🇲🇩';
    case 'GR':
      return '🇬🇷';
    case 'BG':
      return '🇧🇬';
    case 'RO':
      return '🇷🇴';
    case 'UNKNOWN':
      return '🌎';
    default:
      return '🌍';
  }
};

const PackagesPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [allPackages, setAllPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [countryCounts, setCountryCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        // API isteği yapmak yerine doğrudan fetch kullanıyoruz
        const response = await fetch('/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const fetchedPackages = await response.json();
        
        // Paketleri sakla
        setAllPackages(fetchedPackages);
        
        // Ülkelere göre sayısını hesapla
        const uniqueCountries = new Map<string, number>();
        
        fetchedPackages.forEach((pkg: Package) => {
          // countryOrigin alanını kullan ve case insensitive olarak ek
          const countryCode = (pkg.countryOrigin || pkg.countryCode || "").toUpperCase();
          if (countryCode) {
            const currentCount = uniqueCountries.get(countryCode) || 0;
            uniqueCountries.set(countryCode, currentCount + 1);
            //console.log(`Paket ID: ${pkg.id}, Ülke: ${countryCode}`);
          }
        });
        
        // Debug her ülke için paket sayısını log'la
        //uniqueCountries.forEach((count, code) => {
        //  console.log(`Ülke ${code} için ${count} paket var.`);
        //});
        
        // Country Counts güncelle
        setCountryCounts(Object.fromEntries(uniqueCountries));
        
        // Ülke filtresine göre filtreleme yap
        if (selectedCountry) {
          filterPackagesByCountry(selectedCountry, fetchedPackages);
        } else {
          setFilteredPackages(fetchedPackages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        // Hata mesajını konsola yazdır
        console.error("Paketler yüklenirken bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, [selectedCountry]);
  
  // Ülkeye göre paketleri filtrele
  const filterPackagesByCountry = (countryCode: string, packages: Package[] = allPackages) => {
    if (!countryCode || countryCode === "all") {
      setFilteredPackages(packages);
      return;
    }
    
    // countryCode'u büyük harfe çevir
    const upperCountryCode = countryCode.toUpperCase();
    
    // Seçilen ülkeye göre paketleri filtrele
    const filtered = packages.filter(pkg => {
      // Mevcut ülke bilgisi (countryOrigin veya countryCode alanlarından birini kontrol et)
      const pkgCountryOrigin = pkg.countryOrigin?.toUpperCase() || "";
      const pkgCountryCode = pkg.countryCode?.toUpperCase() || "";
      
      // Debug: Ülke filtreleme bilgisini konsola yazdır
      // console.log(`Package ${pkg.id} - Country: ${pkgCountryOrigin || pkgCountryCode}, Selected: ${upperCountryCode}`);
      
      // Eğer seçilen ülkeye ait paketleri göster
      return pkgCountryOrigin === upperCountryCode || pkgCountryCode === upperCountryCode;
    });
    
    console.log(`Filtered packages for ${countryCode}: ${filtered.length} out of ${packages.length}`);
    setFilteredPackages(filtered);
  };
  
  // Function to handle country selection
  const handleCountrySelect = (countryCode: string | null) => {
    setSelectedCountry(countryCode);
    
    if (!countryCode || countryCode === "all") {
      setFilteredPackages(allPackages);
    } else {
      filterPackagesByCountry(countryCode);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <>
      <PageHeader 
        title={getPackageTranslation("packages.pageTitle", language)}
        description={getPackageTranslation("packages.pageDescription", language)}
        isSpecialPage={true}
      />
      
      {/* Colorful overlay with wave pattern after header */}
      <div className="bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 py-20 -mt-20 relative z-10">
        {/* Container */}
        <Container>
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {getPackageTranslation("packages.completeExperience", language)}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
              {getPackageTranslation("packages.completeExperienceDesc", language)}
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
              <h3 className="font-semibold text-lg mb-3">{getPackageTranslation("packages.medicalExcellence", language)}</h3>
              <p className="text-muted-foreground">{getPackageTranslation("packages.medicalExcellenceDesc", language)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <LucideHotel className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getPackageTranslation("packages.luxuryAccommodation", language)}</h3>
              <p className="text-muted-foreground">{getPackageTranslation("packages.accommodationDesc", language)}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-green-400"></div>
            <CardContent className="pt-8 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Plane className="h-7 w-7 text-teal-500" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{getPackageTranslation("packages.tourism", language)}</h3>
              <p className="text-muted-foreground">{getPackageTranslation("packages.tourismDesc", language)}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* "Why Choose Our Packages" Section with colorful background */}
        <div className="rounded-2xl bg-gradient-to-r from-sky-50/80 via-indigo-50/80 to-purple-50/80 dark:from-sky-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 p-8 md:p-12 mb-20 shadow-lg border border-blue-100 dark:border-blue-800/20 relative overflow-hidden">
          
          <div className="flex items-center gap-3 mb-8 relative">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{getPackageTranslation("packages.whyOurPackages", language)}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 relative">
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 dark:from-cyan-700/20 dark:to-blue-700/20 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-700/30 shadow-sm">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getPackageTranslation("packages.saveTime", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getPackageTranslation("packages.saveTimeDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-700/20 dark:to-pink-700/20 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-700/30 shadow-sm">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getPackageTranslation("packages.expertTeam", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getPackageTranslation("packages.expertTeamDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400/20 to-green-400/20 dark:from-teal-700/20 dark:to-green-700/20 flex items-center justify-center shrink-0 border border-teal-200 dark:border-teal-700/30 shadow-sm">
                <Globe className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getPackageTranslation("packages.bestLocations", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getPackageTranslation("packages.bestLocationsDesc", language)}</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-700/20 dark:to-orange-700/20 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-700/30 shadow-sm">
                <Check className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{getPackageTranslation("packages.seamlessTransport", language)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{getPackageTranslation("packages.seamlessTransportDesc", language)}</p>
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
            {['TR', 'RU', 'AZ', 'UA', 'IR', 'KZ'].map((countryCode, index) => {
              // Her ülke için o ülkeye ait paketleri say
              const countryPackages = allPackages.filter(pkg => 
                (pkg.countryOrigin?.toUpperCase() === countryCode || pkg.countryCode?.toUpperCase() === countryCode)
              ) || [];
              
              const delayClass = `delay-${(index + 1) * 100}`;
              
              // Get background image for countries
              let bgImage = '';
              if (countryCode === 'TR') bgImage = "bg-[url('/images/kız-kulesi.webp')]";
              else if (countryCode === 'RU') bgImage = "bg-[url('/images/U-kremlin-sarayi-rusya-sehir-manzarasi-dunyaca-unlu-sehirler-kanvas-tablo1455893402-800.jpg')]";
              else if (countryCode === 'AZ') bgImage = "bg-[url('/images/azerbaycan-giris-Jy5Z_cover.jpg')]";
              else if (countryCode === 'UA') bgImage = "bg-[url('/images/st-andrew-s-church.jpg')]";
              else if (countryCode === 'IR') bgImage = "bg-[url('/images/iran-resimleri.jpg')]";
              else if (countryCode === 'KZ') bgImage = "bg-[url('/images/kazakistanin-ruhu-bu-topr-700.jpg')]";
              
              // Animation classes - removed animations to fix layout issues
              const animationClasses = "";
              
              // Highlight the selected country
              const isSelected = selectedCountry === countryCode;
              const selectedClass = isSelected 
                ? "ring-4 ring-primary ring-offset-2 scale-105 transform" 
                : "";
              
              return (
                <button 
                  key={countryCode} 
                  className="group perspective-1000 focus:outline-none"
                  onClick={() => handleCountrySelect(countryCode)}
                >
                  <div 
                    className={`h-44 relative overflow-hidden rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500 ${selectedClass}`}
                  >
                    {/* Background with image */}
                    <div className={`absolute inset-0 ${bgImage} bg-cover bg-center`}></div>
                    
                    {/* Glass overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/25 to-indigo-600/40 backdrop-blur-[1px]"></div>
                    
                    {/* Glowing border */}
                    <div className="absolute inset-0 border border-white/20 rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                      {/* Country flag */}
                      <div className="mb-1 transform group-hover:scale-110 transition-transform duration-500 group-hover:-translate-y-1">
                        <span className="text-5xl drop-shadow-lg">{getCountryFlag(countryCode || 'unknown')}</span>
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
                </button>
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
                {selectedCountry 
                  ? `${getPackageTranslation(`countries.${selectedCountry}`, language)} ${getPackageTranslation("packages.packagesTitle", language)}`
                  : getPackageTranslation("packages.availablePackages", language)}
              </h2>
            </div>
            {selectedCountry && (
              <button
                onClick={() => setSelectedCountry(null)}
                className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                {getPackageTranslation("packages.showAll", language)}
                <Globe className="h-3.5 w-3.5" />
              </button>
            )}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 h-10 w-10 rounded-full flex items-center justify-center shadow-sm">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          
          {filteredPackages && filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredPackages.map(pkg => (
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