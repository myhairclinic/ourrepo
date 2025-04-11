import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Separator } from "@/components/ui/separator";
import { Package } from "@shared/schema";
import { getTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/container";
import { Calendar, Hotel as HotelIcon, MapPin, Plane, Utensils } from "lucide-react";

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
  
  if (lang === 'TR') fieldName = `${fieldPrefix}Tr`;
  else if (lang === 'EN') fieldName = `${fieldPrefix}En`;
  else if (lang === 'RU') fieldName = `${fieldPrefix}Ru`;
  else if (lang === 'KA') fieldName = `${fieldPrefix}Ka`;
  else fieldName = `${fieldPrefix}En`; // Fallback to English
  
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
  const galleryImages = parseJsonString(packageData.galleryImages);

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

              <TabsContent value="overview" className="space-y-6">
                <div className="prose prose-emerald max-w-none">
                  <p className="text-lg">{content}</p>
                </div>

                {highlights.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">{getTranslation("packages.highlights", language)}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {highlights.map((highlight: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <HotelIcon className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">{getTranslation("packages.accommodation", language)}</h3>
                        <p>{accommodation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Plane className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">{getTranslation("packages.transportation", language)}</h3>
                        <p>{transportation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Utensils className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">{getTranslation("packages.activities", language)}</h3>
                        <p>{activities}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                {galleryImages && galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {galleryImages.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${title} - ${index + 1}`}
                        className="rounded-lg object-cover h-64 w-full"
                      />
                    ))}
                  </div>
                ) : (
                  <p>{getTranslation("packages.noGalleryImages", language)}</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-muted p-6 rounded-lg sticky top-24">
              <h3 className="text-xl font-semibold mb-4">{getTranslation("packages.packageDetails", language)}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>{getTranslation(`countries.${packageData.countryOrigin.toLowerCase()}`, language)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>{packageData.durationDays} {getTranslation("packages.days", language)}</span>
                </div>
                
                <Separator />

                <div className="pt-4">
                  <h4 className="font-medium text-lg mb-2">{getTranslation("packages.includes", language)}:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>{getTranslation("packages.hairTransplantationService", language)}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>{getTranslation("packages.accommodation", language)}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>{getTranslation("packages.transportation", language)}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>{getTranslation("packages.activities", language)}</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    {getTranslation("packages.requestInfo", language)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}