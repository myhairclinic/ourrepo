import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package } from "@shared/schema";
import { getTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Loader2, Star, Check, Clock, AtSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/container";
import { 
  Calendar, 
  Hotel as HotelIcon, 
  MapPin, 
  Plane, 
  Utensils, 
  HeartPulse, 
  ShoppingBag, 
  Car, 
  Camera, 
  Globe,
  Sparkles,
  Users,
  Coffee,
  Sun 
} from "lucide-react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
    </div>
  );
}

function ErrorContent({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] max-w-3xl mx-auto px-4 py-12 text-center">
      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Hata</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Geri Dön
        </Button>
        <Button onClick={() => window.location.href = "/"}>
          Ana Sayfaya Git
        </Button>
      </div>
    </div>
  );
}

// Helper function to parse JSON strings
const parseJsonString = (jsonString: string | null, defaultValue: any[] = []): any[] => {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON string:", e);
    return defaultValue;
  }
};

// Dil içeriğini almak için yardımcı fonksiyon
function getContentByLang(data: any, fieldPrefix: string, lang: string): string {
  if (!data) return '';
  
  // Mevcut dile göre alan adı belirle
  let fieldName = '';
  
  if (lang === 'TR') fieldName = `${fieldPrefix}TR`;
  else if (lang === 'EN') fieldName = `${fieldPrefix}EN`;
  else if (lang === 'RU') fieldName = `${fieldPrefix}RU`;
  else if (lang === 'KA') fieldName = `${fieldPrefix}KA`;
  else fieldName = `${fieldPrefix}EN`; // Fallback to English
  
  return data[fieldName] || '';
}

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch package data by slug
  const {
    data: packageData,
    error,
    isLoading,
  } = useQuery<Package, Error>({
    queryKey: ["/api/packages/slug", slug],
    queryFn: async ({ queryKey }) => {
      const [_, packageSlug] = queryKey;
      const res = await fetch(`/api/packages/slug/${packageSlug}`);
      if (!res.ok) {
        throw new Error("Failed to fetch package");
      }
      return res.json();
    },
  });

  useEffect(() => {
    if (packageData) {
      // Update the page title and meta description
      const title = getContentByLang(packageData, "title", language);
      document.title = title + " | MyHair Clinic";
    }
  }, [packageData, language]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorContent message={error.message} />;
  if (!packageData) return <ErrorContent message={getTranslation("common.notFound", language)} />;

  const title = getContentByLang(packageData, "title", language);
  const description = getContentByLang(packageData, "description", language);
  const content = getContentByLang(packageData, "content", language);
  const accommodation = getContentByLang(packageData, "accommodation", language);
  const transportation = getContentByLang(packageData, "transportation", language);
  const activities = getContentByLang(packageData, "activities", language);

  const highlights = parseJsonString(packageData.highlights);
  // Base gallery images from package data
  let galleryImages = parseJsonString(packageData.galleryImages, []);
  
  // Add Tbilisi landmark images to every package's gallery
  const tbilisiLandmarkImages = [
    '/images/tbilisi-landmarks/colorful-houses.jpg',
    '/images/tbilisi-landmarks/liberty-monument.jpg',
    '/images/tbilisi-landmarks/night-panorama.webp',
    '/images/tbilisi-landmarks/city-castle-night.webp',
    '/images/tbilisi-landmarks/souvenir-shop.webp',
    '/images/tbilisi-landmarks/old-bath-district.jpg',
    '/images/tbilisi-landmarks/trinity-cathedral.jpg',
    '/images/tbilisi-landmarks/ananuri-castle.webp',
    '/images/tbilisi-landmarks/narikala-fortress.jpg',
    '/images/tbilisi-landmarks/rustaveli-avenue.jpg',
    '/images/tbilisi-landmarks/peace-bridge.webp',
    '/images/tbilisi-landmarks/tiflis-min-scaled.jpeg',
    '/images/tbilisi-landmarks/tiflis-rustaveli-caddesi-gece.jpg',
    '/images/tbilisi-landmarks/tiflis_chrononicle-2-1-scaled.jpeg',
    '/images/tbilisi-landmarks/tifliste-gezilecek-yerler-baris-koprusu.webp',
  ];
  
  // Add clinic procedure images to showcase real treatments
  const clinicProcedureImages = [
    '/images/clinic-procedures/IMG-20250325-WA0046.jpg',
    '/images/clinic-procedures/IMG-20250325-WA0053.jpg',
    '/images/clinic-procedures/IMG-20250325-WA0062.jpg',
    '/images/clinic-procedures/IMG-20250325-WA0063.jpg',
    '/images/clinic-procedures/IMG-20250325-WA0064.jpg',
    '/images/clinic-procedures/IMG-20250325-WA0065.jpg',
    '/images/clinic-procedures/IMG-20250325-WA0066.jpg',
  ];
  
  // Combine original gallery with Tbilisi landmarks and clinic procedures
  galleryImages = [...galleryImages, ...tbilisiLandmarkImages, ...clinicProcedureImages];

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        imageUrl={packageData.imageUrl}
      />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">{getTranslation("packages.overview", language)}</TabsTrigger>
                <TabsTrigger value="details">{getTranslation("packages.details", language)}</TabsTrigger>
                <TabsTrigger value="gallery">{getTranslation("packages.gallery", language)}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* Exclusive Badge Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 p-5 rounded-xl">
                  <div>
                    <Badge variant="outline" className="bg-white/80 dark:bg-black/30 text-emerald-700 dark:text-emerald-400 mb-2 border-emerald-200 dark:border-emerald-800 px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      {getTranslation("packages.exclusive", language)}
                    </Badge>
                    <h3 className="text-xl font-semibold">{getTranslation("packages.allInclusive", language)}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{getTranslation("packages.limitedTimeOffer", language)}</p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-emerald max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed">{content}</p>
                </div>

                {/* Why Choose This Package */}
                <div className="bg-muted rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    {getTranslation("packages.whyChoose", language)}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                        <HeartPulse className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">{getTranslation("packages.medicalExcellence", language)}</h4>
                        <p className="text-sm text-muted-foreground">{getTranslation("packages.medicalExcellenceDesc", language)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                        <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">{getTranslation("packages.personalizedCare", language)}</h4>
                        <p className="text-sm text-muted-foreground">{getTranslation("packages.personalizedCareDesc", language)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                        <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">{getTranslation("packages.internationalSupport", language)}</h4>
                        <p className="text-sm text-muted-foreground">{getTranslation("packages.internationalSupportDesc", language)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                        <Coffee className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-base">{getTranslation("packages.comfortableExperience", language)}</h4>
                        <p className="text-sm text-muted-foreground">{getTranslation("packages.comfortableExperienceDesc", language)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {highlights.length > 0 && (
                  <div className="bg-white dark:bg-transparent border border-border rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      {getTranslation("packages.highlights", language)}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-base">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-xl p-6 mt-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{getTranslation("packages.readyToBook", language)}</h3>
                      <p className="text-emerald-50 max-w-md">{getTranslation("packages.contactUsNow", language)}</p>
                    </div>
                    <Button size="lg" variant="secondary" className="whitespace-nowrap">
                      <AtSign className="mr-2 h-4 w-4" />
                      {getTranslation("packages.contactNow", language)}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-8">
                {/* Introduction */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">{getTranslation("packages.completePackage", language)}</h3>
                  <p className="text-muted-foreground">{getTranslation("packages.experienceDesc", language)}</p>
                </div>

                {/* Accommodation */}
                <Card className="overflow-hidden border-emerald-200 dark:border-emerald-800/30">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 border-b border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex items-center gap-2">
                      <HotelIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      <h3 className="font-semibold text-lg">{getTranslation("packages.luxuryAccommodation", language)}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="prose prose-emerald dark:prose-invert max-w-none">
                      <p>{accommodation}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>{getTranslation("packages.centralLocation", language)}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>{getTranslation("packages.freeWifi", language)}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>{getTranslation("packages.breakfast", language)}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>{getTranslation("packages.conciergeService", language)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transportation */}
                <Card className="overflow-hidden border-emerald-200 dark:border-emerald-800/30">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 border-b border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      <h3 className="font-semibold text-lg">{getTranslation("packages.transportation", language)}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="prose prose-emerald dark:prose-invert max-w-none">
                      <p>{transportation}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Badge variant="outline" className="bg-emerald-50/50 dark:bg-emerald-900/10 text-foreground border-emerald-200 dark:border-emerald-800/30">
                        <Car className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                        {getTranslation("packages.airportTransfer", language)}
                      </Badge>
                      <Badge variant="outline" className="bg-emerald-50/50 dark:bg-emerald-900/10 text-foreground border-emerald-200 dark:border-emerald-800/30">
                        <Car className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                        {getTranslation("packages.clinicTransfer", language)}
                      </Badge>
                      <Badge variant="outline" className="bg-emerald-50/50 dark:bg-emerald-900/10 text-foreground border-emerald-200 dark:border-emerald-800/30">
                        <Car className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" />
                        {getTranslation("packages.cityTour", language)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Activities */}
                <Card className="overflow-hidden border-emerald-200 dark:border-emerald-800/30">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 border-b border-emerald-200 dark:border-emerald-800/30">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      <h3 className="font-semibold text-lg">{getTranslation("packages.leisureActivities", language)}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="prose prose-emerald dark:prose-invert max-w-none">
                      <p>{activities}</p>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-muted overflow-hidden rounded-lg relative h-48">
                        <img src="/images/activities/tbilisi-night.webp" alt="Tbilisi night view" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <span className="text-white font-medium">{getTranslation("packages.cityTours", language)}</span>
                        </div>
                      </div>
                      <div className="bg-muted overflow-hidden rounded-lg relative h-48">
                        <img src="/images/activities/georgian-cuisine.jpg" alt="Georgian cuisine" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <span className="text-white font-medium">{getTranslation("packages.traditionalCuisine", language)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <div className="bg-white dark:bg-transparent border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    {getTranslation("packages.itinerary", language)}
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-medium text-sm">1</div>
                        <div className="w-0.5 h-full bg-emerald-200 dark:bg-emerald-800/30 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <h4 className="font-medium">{getTranslation("packages.arrivalDay", language)}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{getTranslation("packages.arrivalDayDesc", language)}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-medium text-sm">2</div>
                        <div className="w-0.5 h-full bg-emerald-200 dark:bg-emerald-800/30 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <h4 className="font-medium">{getTranslation("packages.consultationDay", language)}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{getTranslation("packages.consultationDayDesc", language)}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-medium text-sm">3</div>
                        <div className="w-0.5 h-full bg-emerald-200 dark:bg-emerald-800/30 mt-2"></div>
                      </div>
                      <div className="pb-6">
                        <h4 className="font-medium">{getTranslation("packages.procedureDay", language)}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{getTranslation("packages.procedureDayDesc", language)}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-medium text-sm">4</div>
                      </div>
                      <div>
                        <h4 className="font-medium">{getTranslation("packages.departureDay", language)}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{getTranslation("packages.departureDayDesc", language)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 p-5 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Camera className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold text-lg">{getTranslation("packages.visualExperience", language)}</h3>
                  </div>
                  <p className="text-muted-foreground">{getTranslation("packages.visualExperienceDesc", language)}</p>
                </div>
                
                {galleryImages && galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((img: string, index: number) => (
                      <div 
                        key={index}
                        className="group relative overflow-hidden rounded-xl aspect-video hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${title} - ${img.includes('clinic-procedures') ? getTranslation("packages.clinicProcedure", language) : getTranslation("packages.tbilisiView", language)} ${index + 1}`}
                          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            <span className="text-sm font-medium">{img.includes('clinic-procedures') ? getTranslation("packages.clinicProcedure", language) : title}</span>
                            <p className="text-xs text-white/80">{getTranslation("packages.clickToExpand", language)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Removed redundant images that are now included in the tbilisiLandmarkImages array */}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 border border-dashed border-border rounded-xl">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">{getTranslation("packages.comingSoon", language)}</h4>
                    <p className="text-muted-foreground max-w-md mx-auto">{getTranslation("packages.noGalleryImages", language)}</p>
                  </div>
                )}
                
                <div className="mt-8 p-5 bg-muted rounded-xl">
                  <h4 className="font-medium text-lg mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    {getTranslation("packages.virtualTour", language)}
                  </h4>
                  <p className="text-muted-foreground mb-4">{getTranslation("packages.virtualTourDesc", language)}</p>
                  <Button variant="outline" className="gap-2">
                    <Globe className="w-4 h-4" />
                    {getTranslation("packages.startVirtualTour", language)}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-transparent border border-border shadow-sm p-6 rounded-xl sticky top-24">
              <div className="flex flex-col">
                <Badge className="w-fit mb-2 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100">
                  {getTranslation("packages.travelMedical", language)}
                </Badge>
                <h3 className="text-xl font-semibold mb-4">{getTranslation("packages.packageDetails", language)}</h3>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center gap-3 bg-muted/80 p-3 rounded-lg">
                  <div className="bg-white dark:bg-black/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{getTranslation("packages.fromCountry", language)}</div>
                    <div className="font-medium">{getTranslation(`countries.${packageData.countryOrigin.toLowerCase()}`, language)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-muted/80 p-3 rounded-lg">
                  <div className="bg-white dark:bg-black/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{getTranslation("packages.duration", language)}</div>
                    <div className="font-medium">{packageData.durationDays} {getTranslation("packages.days", language)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-muted/80 p-3 rounded-lg">
                  <div className="bg-white dark:bg-black/20 w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{getTranslation("packages.groupSize", language)}</div>
                    <div className="font-medium">{getTranslation("packages.individual", language)}</div>
                  </div>
                </div>
                
                <Separator className="my-2" />

                <div>
                  <h4 className="font-medium text-lg mb-3">{getTranslation("packages.includes", language)}:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span>{getTranslation("packages.hairTransplantationService", language)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span>{getTranslation("packages.luxuryAccommodation", language)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span>{getTranslation("packages.privateTransportation", language)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span>{getTranslation("packages.tourismActivities", language)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span>{getTranslation("packages.translationServices", language)}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span>{getTranslation("packages.aftercareProducts", language)}</span>
                    </li>
                  </ul>
                </div>

                <div className="py-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-4 mt-4 border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="flex items-center gap-2 font-medium mb-2">
                    <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {getTranslation("packages.satisfaction", language)}
                  </h4>
                  <p className="text-sm text-muted-foreground">{getTranslation("packages.satisfactionDesc", language)}</p>
                </div>

                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    {getTranslation("packages.requestInfo", language)}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">{getTranslation("packages.noCommitment", language)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}