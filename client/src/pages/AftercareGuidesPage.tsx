import { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { LanguageContext } from "@/context/LanguageContext";
import { AftercareGuide } from "@shared/schema";
import { API_ROUTES } from "@/lib/constants";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

// Custom hook to use language context
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Components
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FileText, Heart, ChevronRight, ChevronLeft, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AftercareGuidesPage() {
  const params = useParams();
  const { language, getContentByLanguage } = useLanguage();
  const { t } = useTranslation();
  const [activeGuideId, setActiveGuideId] = useState<number | null>(null);

  // Fetch aftercare guides
  const { data: guides, isLoading } = useQuery<AftercareGuide[]>({
    queryKey: [API_ROUTES.AFTERCARE_GUIDES],
    queryFn: async () => {
      const res = await fetch(API_ROUTES.AFTERCARE_GUIDES);
      if (!res.ok) {
        throw new Error("Failed to fetch aftercare guides");
      }
      return res.json();
    },
  });

  // Filter only active guides
  const activeGuides = guides?.filter((guide) => guide.isActive) || [];

  // Set the first guide as active by default
  useEffect(() => {
    if (activeGuides.length > 0 && !activeGuideId) {
      setActiveGuideId(activeGuides[0].id);
    }
  }, [activeGuides, activeGuideId]);

  // Get active guide
  const activeGuide = activeGuides.find((guide) => guide.id === activeGuideId);

  // Get title by language
  const getTitle = (guide?: AftercareGuide) => {
    if (!guide) return "";
    return getContentByLanguage({
      TR: guide.titleTR,
      EN: guide.titleEN,
      RU: guide.titleRU,
      KA: guide.titleKA,
    });
  };

  // Get content by language
  const getContent = (guide?: AftercareGuide) => {
    if (!guide) return "";
    return getContentByLanguage({
      TR: guide.contentTR,
      EN: guide.contentEN,
      RU: guide.contentRU,
      KA: guide.contentKA,
    });
  };

  // Get PDF by language
  const getPdfUrl = (guide?: AftercareGuide) => {
    if (!guide) return null;
    
    // Handle null values for PDF URLs
    const pdfMap = {
      TR: guide.pdfUrlTR || "",
      EN: guide.pdfUrlEN || "",
      RU: guide.pdfUrlRU || "",
      KA: guide.pdfUrlKA || "",
    };
    
    return getContentByLanguage(pdfMap);
  };

  // Handle download PDF
  const handleDownloadPdf = (guide: AftercareGuide) => {
    const pdfUrl = getPdfUrl(guide);
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  // Translations
  const pageTitle = {
    TR: "Ameliyat Sonrası Bakım Rehberleri",
    EN: "Post-Procedure Care Guides",
    RU: "Руководства по уходу после процедуры",
    KA: "პროცედურის შემდგომი მოვლის გზამკვლევები",
  };

  const pageDescription = {
    TR: "Saç ekimi ve diğer prosedürler sonrası en iyi sonuçlar için bakım rehberlerimizi inceleyin.",
    EN: "Explore our care guides for best results after hair transplantation and other procedures.",
    RU: "Ознакомьтесь с нашими руководствами по уходу для достижения наилучших результатов после трансплантации волос и других процедур.",
    KA: "გაეცანით ჩვენს მოვლის გზამკვლევებს საუკეთესო შედეგებისთვის თმის გადანერგვის და სხვა პროცედურების შემდეგ.",
  };

  const noGuidesText = {
    TR: "Henüz ameliyat sonrası bakım rehberi eklenmemiş.",
    EN: "No post-procedure care guides have been added yet.",
    RU: "Руководства по уходу после процедуры еще не добавлены.",
    KA: "პროცედურის შემდგომი მოვლის გზამკვლევები ჯერ არ არის დამატებული.",
  };

  const downloadPdfText = {
    TR: "PDF Olarak İndir",
    EN: "Download PDF",
    RU: "Скачать в формате PDF",
    KA: "PDF-ის ჩამოტვირთვა",
  };

  const viewGuideText = {
    TR: "Rehberi Görüntüle",
    EN: "View Guide",
    RU: "Просмотреть руководство",
    KA: "გზამკვლევის ნახვა",
  };

  return (
    <>
      <Helmet>
        <title>{t(pageTitle)}</title>
        <meta name="description" content={t(pageDescription)} />
      </Helmet>

      <PageHeader title={t(pageTitle)} description={t(pageDescription)} />

      <section className="container py-12">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </div>
          </div>
        ) : activeGuides.length === 0 ? (
          <Alert>
            <AlertTitle>Bilgi</AlertTitle>
            <AlertDescription>{noGuidesText}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-10">
            {/* Featured Guide Slider */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {activeGuides.map((guide) => (
                    <CarouselItem key={guide.id}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium">
                            <Heart className="w-4 h-4 mr-2" />
                            <span>{t({
                              TR: "Bakım Rehberi",
                              EN: "Care Guide",
                              RU: "Руководство по уходу",
                              KA: "მოვლის გზამკვლევი"
                            })}</span>
                          </div>
                          
                          <h2 className="text-3xl font-bold">{getTitle(guide)}</h2>
                          
                          <div className="prose prose-lg max-w-none">
                            {getContent(guide).split('\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            {getPdfUrl(guide) && (
                              <Button onClick={() => handleDownloadPdf(guide)}>
                                <Download className="mr-2 h-4 w-4" />
                                {t(downloadPdfText)}
                              </Button>
                            )}
                            <Button variant="outline" onClick={() => setActiveGuideId(guide.id)}>
                              {viewGuideText}
                            </Button>
                          </div>
                        </div>
                        
                        {guide.imageUrl && (
                          <div className="relative aspect-video rounded-xl overflow-hidden">
                            <img 
                              src={guide.imageUrl} 
                              alt={getTitle(guide)} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute left-4 top-1/2" />
                  <CarouselNext className="absolute right-4 top-1/2" />
                </div>
              </Carousel>
            </div>

            {/* Guides Cards */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{t({
                TR: "Tüm Bakım Rehberleri",
                EN: "All Care Guides",
                RU: "Все руководства по уходу",
                KA: "ყველა მოვლის გზამკვლევი"
              })}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeGuides.map((guide) => (
                  <Card 
                    key={guide.id}
                    className={cn(
                      "transition-all hover:shadow-lg cursor-pointer",
                      guide.id === activeGuideId ? "border-primary ring-1 ring-primary" : ""
                    )}
                    onClick={() => setActiveGuideId(guide.id)}
                  >
                    {guide.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={guide.imageUrl} 
                          alt={getTitle(guide)} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{getTitle(guide)}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="line-clamp-2 text-muted-foreground">
                        {getContent(guide)}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center text-sm text-primary">
                          {getPdfUrl(guide) && (
                            <FileText className="h-4 w-4 mr-1" />
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          {t({
                            TR: "Detaylar",
                            EN: "Details",
                            RU: "Подробнее",
                            KA: "დეტალები"
                          })}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Active Guide Detail */}
            {activeGuide && (
              <div className="pt-8 border-t">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">{getTitle(activeGuide)}</h2>
                    
                    <div className="prose max-w-none mb-6">
                      {getContent(activeGuide).split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                    
                    {getPdfUrl(activeGuide) && (
                      <Button onClick={() => handleDownloadPdf(activeGuide)}>
                        <Download className="mr-2 h-4 w-4" />
                        {downloadPdfText}
                      </Button>
                    )}
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-muted p-6 rounded-xl">
                      <h3 className="text-lg font-semibold mb-4">{t({
                        TR: "Önemli Hatırlatmalar",
                        EN: "Important Reminders",
                        RU: "Важные напоминания",
                        KA: "მნიშვნელოვანი შეხსენებები"
                      })}</h3>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <span>{t({
                            TR: "Tedavi sonrası bakım talimatlarını dikkatle uygulayın.",
                            EN: "Follow post-treatment care instructions carefully.",
                            RU: "Тщательно следуйте инструкциям по уходу после лечения.",
                            KA: "ყურადღებით გაითვალისწინეთ მკურნალობის შემდგომი მოვლის ინსტრუქციები."
                          })}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <span>{t({
                            TR: "Sorularınız için her zaman kliniğimizle iletişime geçin.",
                            EN: "Always contact our clinic if you have questions.",
                            RU: "Всегда обращайтесь в нашу клинику, если у вас есть вопросы.",
                            KA: "ყოველთვის დაუკავშირდით ჩვენს კლინიკას თუ გაქვთ შეკითხვები."
                          })}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <span>{t({
                            TR: "Düzenli kontrol randevularınızı kaçırmayın.",
                            EN: "Don't miss your regular check-up appointments.",
                            RU: "Не пропускайте регулярные контрольные приемы.",
                            KA: "არ გამოტოვოთ თქვენი რეგულარული შემოწმების შეხვედრები."
                          })}</span>
                        </li>
                      </ul>
                      
                      <Separator className="my-4" />
                      
                      <div className="text-sm text-muted-foreground">
                        <p>{t({
                          TR: "Bu rehberler genel bilgi amaçlıdır ve kişisel tıbbi tavsiye yerine geçmez.",
                          EN: "These guides are for general information and do not replace personal medical advice.",
                          RU: "Эти руководства предназначены для общей информации и не заменяют персональную медицинскую консультацию.",
                          KA: "ეს გზამკვლევები ზოგადი ინფორმაციისთვისაა და არ ანაცვლებს პირად სამედიცინო რჩევას."
                        })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}