import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Service } from "@shared/schema";
import { Helmet } from "react-helmet";
import { 
  Loader2, 
  Clock, 
  Calendar, 
  MapPin, 
  Check, 
  BadgeCheck, 
  ThumbsUp, 
  User, 
  Award,
  Sparkles,
  Star,
  Scissors,
  Zap,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getTranslation, useTranslation } from "@/lib/translations";
import { META } from "@/lib/constants";
import { Language } from "@shared/types";
import { ReviewsSection } from "@/components/services/ReviewsSection";
import FaqsSection from "@/components/services/FaqsSection";
import { EnhancedFAQs } from "@/components/services/EnhancedFAQs";
import { BeforeAfterGallery } from "@/components/services/BeforeAfterGallery";
import { TreatmentTimeline } from "@/components/services/TreatmentTimeline";
import { ResultsStats } from "@/components/services/ResultsStats";
import SocialShareButtons from "@/components/shared/SocialShareButtons";
import SocialFollowButtons from "@/components/shared/SocialFollowButtons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import service images
import hairTransplantImage from "@/assets/images/hair-transplant.png";
import consultationImage from "@/assets/images/consultation.png";

// Service-specific icons - these will be used in the tabs and other sections
const serviceIcons = {
  'hair-transplantation': <Scissors className="h-5 w-5" />,
  'eyebrow-transplantation': <Sparkles className="h-5 w-5" />,
  'beard-transplantation': <BadgeCheck className="h-5 w-5" />,
  'prp-treatment': <Zap className="h-5 w-5" />,
  'hair-mesotherapy': <ThumbsUp className="h-5 w-5" />,
};

export default function ServicePage() {
  const { language, currentLanguage, addPrefix } = useLanguage();
  const { t } = useTranslation(language);
  const [, params] = useRoute("/:lang/services/:slug");
  const slug = params?.slug;

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: [`/api/services/${slug}`],
    enabled: !!slug,
  });

  // Helper function to get the localized title based on current language
  const getLocalizedTitle = (service: Service) => {
    switch (language) {
      case Language.Turkish:
        return service.titleTR;
      case Language.English:
        return service.titleEN;
      case Language.Russian:
        return service.titleRU;
      case Language.Georgian:
        return service.titleKA;
      default:
        return service.titleEN;
    }
  };

  // Helper function to get the localized description based on current language
  const getLocalizedDescription = (service: Service) => {
    switch (language) {
      case Language.Turkish:
        return service.descriptionTR;
      case Language.English:
        return service.descriptionEN;
      case Language.Russian:
        return service.descriptionRU;
      case Language.Georgian:
        return service.descriptionKA;
      default:
        return service.descriptionEN;
    }
  };

  // Translations
  const appointmentButton = t("services.bookAppointment");
  const backToServices = t("services.allServices");
  const errorMessage = t("errors.loading_services");

  if (isLoading) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-6">{errorMessage}</h1>
          <Link href={`/${currentLanguage}/services`}>
            <Button variant="outline">{backToServices}</Button>
          </Link>
        </div>
      </main>
    );
  }

  const pageTitle = `${getLocalizedTitle(service)} ${META.TITLE_SUFFIX}`;

  // Helper function to get localized content
  const getLocalizedContent = (service: Service, field: string) => {
    if (!service) return '';
    
    switch (field) {
      case 'detailedContent':
        switch (language) {
          case Language.Turkish: return service.detailedContentTR || '';
          case Language.English: return service.detailedContentEN || '';
          case Language.Russian: return service.detailedContentRU || '';
          case Language.Georgian: return service.detailedContentKA || '';
          default: return service.detailedContentEN || '';
        }
      case 'procedureSteps':
        switch (language) {
          case Language.Turkish: return service.procedureStepsTR || '';
          case Language.English: return service.procedureStepsEN || '';
          case Language.Russian: return service.procedureStepsRU || '';
          case Language.Georgian: return service.procedureStepsKA || '';
          default: return service.procedureStepsEN || '';
        }
      case 'candidateInfo':
        switch (language) {
          case Language.Turkish: return service.candidateInfoTR || '';
          case Language.English: return service.candidateInfoEN || '';
          case Language.Russian: return service.candidateInfoRU || '';
          case Language.Georgian: return service.candidateInfoKA || '';
          default: return service.candidateInfoEN || '';
        }
      case 'postCare':
        switch (language) {
          case Language.Turkish: return service.postCareTR || '';
          case Language.English: return service.postCareEN || '';
          case Language.Russian: return service.postCareRU || '';
          case Language.Georgian: return service.postCareKA || '';
          default: return service.postCareEN || '';
        }
      case 'faqs':
        switch (language) {
          case Language.Turkish: return service.faqsTR || '';
          case Language.English: return service.faqsEN || '';
          case Language.Russian: return service.faqsRU || '';
          case Language.Georgian: return service.faqsKA || '';
          default: return service.faqsEN || '';
        }
      case 'metaTitle':
        switch (language) {
          case Language.Turkish: return service.metaTitleTR || getLocalizedTitle(service);
          case Language.English: return service.metaTitleEN || getLocalizedTitle(service);
          case Language.Russian: return service.metaTitleRU || getLocalizedTitle(service);
          case Language.Georgian: return service.metaTitleKA || getLocalizedTitle(service);
          default: return service.metaTitleEN || getLocalizedTitle(service);
        }
      case 'metaDescription':
        switch (language) {
          case Language.Turkish: return service.metaDescriptionTR || getLocalizedDescription(service);
          case Language.English: return service.metaDescriptionEN || getLocalizedDescription(service);
          case Language.Russian: return service.metaDescriptionRU || getLocalizedDescription(service);
          case Language.Georgian: return service.metaDescriptionKA || getLocalizedDescription(service);
          default: return service.metaDescriptionEN || getLocalizedDescription(service);
        }
      default:
        return '';
    }
  };

  const metaTitle = getLocalizedContent(service, 'metaTitle') || pageTitle;
  const metaDescription = getLocalizedContent(service, 'metaDescription') || getLocalizedDescription(service);
  
  const detailedContent = getLocalizedContent(service, 'detailedContent');
  const procedureSteps = getLocalizedContent(service, 'procedureSteps');
  const candidateInfo = getLocalizedContent(service, 'candidateInfo');
  const postCare = getLocalizedContent(service, 'postCare');
  const faqs = getLocalizedContent(service, 'faqs');

  // Common translations
  const procedureStepsHeading = t("services.procedureSteps");
  const candidateInfoHeading = t("services.candidateInfo");
  const detailsHeading = t("services.details");
  const overviewHeading = t("services.overview");
  const postCareHeading = t("services.postCare");
  const serviceFeatures = t("services.keyFeatures");
  const getDurationText = (duration: string) => {
    // Hizmetlerin süresini doğru formatta göster
    if (service && service.slug) {
      if (service.slug === 'hair-transplantation') return '6-8 saat';
      if (service.slug === 'eyebrow-transplantation') return '2-3 saat';
      if (service.slug === 'beard-transplantation') return '3-5 saat';
      if (service.slug === 'prp-treatment' || service.slug === 'hair-mesotherapy') return '30-45 dk';
    }
    return `${duration} ${t("common.duration")}`;
  };
  const getPriceText = (price: number | null) => (price ? `${price} €` : t("common.contactUs"));

  // Parse markdown-like content for procedure steps
  const renderMarkdownLikeContent = (content: string) => {
    if (!content) return null;

    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        // Level 1 heading
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h2>;
      } else if (paragraph.startsWith('## ')) {
        // Level 2 heading
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h3>;
      } else if (paragraph.startsWith('### ')) {
        // Level 3 heading
        return <h4 key={index} className="text-lg font-bold mt-4 mb-2">{paragraph.substring(4)}</h4>;
      } else if (paragraph.startsWith('- ')) {
        // List item
        return (
          <ul key={index} className="list-disc pl-6 mb-4">
            {paragraph.split('\n').map((item, itemIndex) => (
              <li key={itemIndex} className="mb-1">{item.substring(2)}</li>
            ))}
          </ul>
        );
      } else if (paragraph.startsWith('1. ')) {
        // Numbered list
        const lines = paragraph.split('\n');
        return (
          <ol key={index} className="list-decimal pl-6 mb-4">
            {lines.map((item, itemIndex) => {
              const numberMatch = item.match(/^\d+\.\s+/);
              return numberMatch ? 
                <li key={itemIndex} className="mb-1">{item.substring(numberMatch[0].length)}</li> : 
                <li key={itemIndex} className="mb-1">{item}</li>;
            })}
          </ol>
        );
      } else {
        // Regular paragraph
        return <p key={index} className="mb-4">{paragraph}</p>;
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={service.imageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyHair Clinic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={service.imageUrl} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <main className="py-12 overflow-hidden bg-gradient-to-b from-white to-gray-50/80">
        <div className="container mx-auto px-4 relative">
          {/* Modern background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute right-10 top-1/3 w-[30rem] h-[30rem] rounded-full bg-blue-300/5 blur-3xl"></div>
            <div className="absolute left-1/4 bottom-1/4 w-64 h-64 rounded-full bg-blue-100/10 blur-2xl"></div>
          </div>
          
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground relative z-10 flex items-center">
            <Link href={addPrefix("/")}>
              <span className="hover:text-primary cursor-pointer transition-colors">{t("common.home")}</span>
            </Link>
            <span className="mx-2 text-muted-foreground/50">/</span>
            <Link href={addPrefix("/services")}>
              <span className="hover:text-primary cursor-pointer transition-colors">{t("common.services")}</span>
            </Link>
            <span className="mx-2 text-muted-foreground/50">/</span>
            <span className="text-primary font-medium">{getLocalizedTitle(service)}</span>
          </div>

          {/* Hero section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
            {/* Service Image */}
            <div className="overflow-hidden rounded-2xl shadow-xl group relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img 
                src={service.slug === 'hair-transplantation' ? '/images/services/hair-transplant.jpg' : 
                    (service.slug === 'beard-transplantation' ? '/images/services/beard-transplant.jpg' : 
                    (service.slug === 'prp-treatment' ? hairTransplantImage :
                    (service.slug === 'eyebrow-transplantation' ? '/images/services/eyebrow-transplant.jpg' :
                    (service.slug === 'hair-mesotherapy' ? consultationImage : service.imageUrl))))}
                alt={getLocalizedTitle(service)} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  console.log("Resim yükleme hatası düzeltiliyor:", service.slug);
                  e.currentTarget.src = hairTransplantImage;
                }}
              />
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Badge variant="secondary" className="bg-white/90 text-primary mb-2">
                  {service.duration ? getDurationText(service.duration) : getDurationText('60-90')}
                </Badge>
              </div>
            </div>

            {/* Service Overview */}
            <div>
              <div className="mb-4">
                <Badge variant="outline" className="px-4 py-1 rounded-full text-primary border-primary/30 font-medium">
                  {t("services.popular")}
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                {getLocalizedTitle(service)}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span className="text-sm">{service.duration ? getDurationText(service.duration) : getDurationText('60-90')}</span>
                </div>
                {service.price && typeof service.price === 'number' && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                    <div className="text-sm text-muted-foreground">
                      {getPriceText(service.price)}
                    </div>
                  </>
                )}
              </div>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-foreground/80 text-lg leading-relaxed">{getLocalizedDescription(service)}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-base font-medium flex items-center text-primary">
                  <BadgeCheck className="h-5 w-5 mr-2" />
                  {serviceFeatures}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{t("services.features.naturalResults")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{t("services.features.permanentSolution")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{t("services.features.consultation")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{t("services.features.aftercare")}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href={addPrefix(`/appointment?service=${service.id}`)}>
                  <Button size="lg" className="mr-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    {appointmentButton}
                  </Button>
                </Link>
                <Link href={addPrefix('/services')}>
                  <Button variant="outline" size="lg">{backToServices}</Button>
                </Link>
              </div>
              
              {/* Social Media Share & Follow */}
              <div className="border-t border-b py-4 my-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t("common.share")}:</p>
                    <SocialShareButtons 
                      title={getLocalizedTitle(service)}
                      description={getLocalizedDescription(service)}
                      hashtags={["MyHairClinic", "HairTransplant", "Tbilisi"]}
                      showCopyLink={true}
                      size="md"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t("common.follow_us")}:</p>
                    <SocialFollowButtons 
                      showText={false} 
                      size="default"
                      variant="outline"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed content with tabs */}
          {(detailedContent || procedureSteps || candidateInfo || postCare) && (
            <div className="relative z-10 mb-20">
              <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full max-w-lg mx-auto mb-10 grid grid-cols-4 bg-gray-100/60">
                    <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                      <div className="flex flex-col items-center space-y-1 py-1">
                        {service.slug && serviceIcons[service.slug as keyof typeof serviceIcons] || <BadgeCheck className="h-5 w-5" />}
                        <span>{detailsHeading}</span>
                      </div>
                    </TabsTrigger>
                    {procedureSteps && (
                      <TabsTrigger value="procedure" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                        <div className="flex flex-col items-center space-y-1 py-1">
                          <Scissors className="h-5 w-5" />
                          <span>{procedureStepsHeading}</span>
                        </div>
                      </TabsTrigger>
                    )}
                    {candidateInfo && (
                      <TabsTrigger value="candidates" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                        <div className="flex flex-col items-center space-y-1 py-1">
                          <User className="h-5 w-5" />
                          <span>{candidateInfoHeading}</span>
                        </div>
                      </TabsTrigger>
                    )}
                    {postCare && (
                      <TabsTrigger value="postcare" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                        <div className="flex flex-col items-center space-y-1 py-1">
                          <Heart className="h-5 w-5" />
                          <span>{postCareHeading}</span>
                        </div>
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-8 animate-in fade-in-50 duration-500">
                    {detailedContent ? (
                      <div className="prose prose-lg prose-headings:text-primary prose-h3:font-semibold prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-200 max-w-none mx-auto">
                        {renderMarkdownLikeContent(detailedContent)}
                      </div>
                    ) : (
                      <div className="max-w-3xl mx-auto prose prose-lg">
                        {service.slug === 'hair-transplantation' && (
                          <>
                            <h2 className="text-2xl font-bold mb-4">Saç Ekimi Detayları / Hair Transplantation Details</h2>
                            <p>
                              Saç ekimi, kalıcı saç kaybı yaşayan kişilere kendi saç foliküllerinin nakledilmesiyle gerçekleştirilen 
                              etkili ve kalıcı bir çözüm sunar. FUE (Follicular Unit Extraction) ve DHI (Direct Hair Implantation) 
                              tekniklerini kullanarak, doğal görünümlü ve kalıcı sonuçlar elde ediyoruz. / 
                              Hair transplantation offers an effective and permanent solution for people experiencing permanent hair 
                              loss by transplanting their own hair follicles. Using FUE (Follicular Unit Extraction) and DHI (Direct 
                              Hair Implantation) techniques, we achieve natural-looking and permanent results.
                            </p>
                            <p>
                              Kliniklerimizde kullanılan en son teknoloji ekipmanlar ve deneyimli ekibimizle, her hastamıza özel 
                              olarak tasarlanmış saç çizgisi ve doğal görünümlü sonuçlar sunuyoruz. Saç ekimi seansında, donör 
                              bölgeden alınan sağlıklı saç folikülleri, saç dökülmesi yaşanan alıcı bölgeye yerleştirilir. / 
                              With the latest technology equipment used in our clinics and our experienced team, we offer a specially 
                              designed hairline and natural-looking results for each of our patients. In a hair transplantation session, 
                              healthy hair follicles taken from the donor area are placed in the recipient area experiencing hair loss.
                            </p>
                          </>
                        )}

                        {service.slug === 'eyebrow-transplantation' && (
                          <>
                            <h2 className="text-2xl font-bold mb-4">Kaş Ekimi Detayları / Eyebrow Transplantation Details</h2>
                            <p>
                              Kaş ekimi, seyrek veya şekilsiz kaşları olan kişilere kalıcı bir çözüm sunan özel bir saç nakli 
                              prosedürüdür. Bu işlem, donör bölgeden (genellikle ense kısmı) alınan sağlıklı saç foliküllerinin 
                              kaş bölgesine nakledilmesiyle gerçekleştirilir. / 
                              Eyebrow transplantation is a special hair transplant procedure that offers a permanent solution for 
                              people with sparse or shapeless eyebrows. This procedure is performed by transplanting healthy hair 
                              follicles taken from the donor area (usually the nape area) to the eyebrow area.
                            </p>
                            <p>
                              Kliniklerimizde, her hastanın yüz yapısına uygun, doğal ve zarif görünümlü kaşlar tasarlanır. 
                              Profesyonel ekibimiz, doğal kaş büyüme açılarına uygun şekilde greftleri yerleştirerek estetik ve 
                              doğal sonuçlar elde eder. / 
                              In our clinics, natural and elegant-looking eyebrows suitable for each patient's facial structure are 
                              designed. Our professional team achieves aesthetic and natural results by placing the grafts in 
                              accordance with natural eyebrow growth angles.
                            </p>
                          </>
                        )}

                        {service.slug === 'beard-transplantation' && (
                          <>
                            <h2 className="text-2xl font-bold mb-4">Sakal Ekimi Detayları / Beard Transplantation Details</h2>
                            <p>
                              Sakal ekimi, seyrek veya düzensiz sakal büyümesi yaşayan erkekler için kalıcı bir çözüm sunan 
                              özelleştirilmiş bir saç nakli prosedürüdür. Bu işlem, donör bölgeden alınan sağlıklı saç foliküllerinin 
                              sakal bölgesindeki boş alanlara nakledilmesini içerir. / 
                              Beard transplantation is a customized hair transplant procedure that offers a permanent solution for 
                              men experiencing sparse or irregular beard growth. This procedure involves transplanting healthy hair 
                              follicles from the donor area to empty areas in the beard region.
                            </p>
                            <p>
                              Kliniklerimizde, her hastanın yüz yapısına ve şekline uygun doğal görünümlü sakal tasarımları yapılır. 
                              Uzman ekibimiz, sakal kıllarının doğal çıkış açılarına uygun şekilde greftleri yerleştirir ve 
                              böylece doğal ve dolgun bir görünüm elde edilir. / 
                              In our clinics, natural-looking beard designs suitable for each patient's facial structure and shape 
                              are created. Our expert team places the grafts in accordance with the natural exit angles of beard 
                              hairs, thus achieving a natural and full appearance.
                            </p>
                          </>
                        )}

                        {service.slug === 'prp-treatment' && (
                          <>
                            <h2 className="text-2xl font-bold mb-4">PRP Tedavisi Detayları / PRP Treatment Details</h2>
                            <p>
                              PRP (Platelet Rich Plasma) tedavisi, kişinin kendi kanından elde edilen trombositten zengin 
                              plazmanın saç derisine enjekte edildiği non-invazif bir işlemdir. Bu tedavi, saç dökülmesini 
                              azaltmak ve saç büyümesini uyarmak için kullanılır. / 
                              PRP (Platelet Rich Plasma) treatment is a non-invasive procedure in which platelet-rich plasma 
                              obtained from the person's own blood is injected into the scalp. This treatment is used to 
                              reduce hair loss and stimulate hair growth.
                            </p>
                            <p>
                              Trombositler, içerdikleri büyüme faktörleri sayesinde saç foliküllerinin beslenmesini artırır, 
                              doku yenilenmesini hızlandırır ve yeni hücre oluşumunu destekler. PRP tedavisi, tek başına 
                              uygulanabildiği gibi saç ekimi sonrası iyileşme sürecini hızlandırmak için de kullanılabilir. / 
                              Platelets increase the nutrition of hair follicles, accelerate tissue regeneration, and support 
                              the formation of new cells thanks to the growth factors they contain. PRP treatment can be applied 
                              alone or it can be used to accelerate the healing process after hair transplantation.
                            </p>
                          </>
                        )}

                        {service.slug === 'hair-mesotherapy' && (
                          <>
                            <h2 className="text-2xl font-bold mb-4">Saç Mezoterapisi Detayları / Hair Mesotherapy Details</h2>
                            <p>
                              Saç mezoterapisi, vitamin, mineral, amino asit ve antioksidanlardan oluşan özel bir karışımın 
                              saç derisine doğrudan enjekte edildiği yenileyici bir tedavidir. Bu işlem, saç köklerini 
                              besleyerek güçlendirir ve saç dökülmesini azaltmayı amaçlar. / 
                              Hair mesotherapy is a rejuvenating treatment in which a special mixture of vitamins, minerals, 
                              amino acids, and antioxidants is directly injected into the scalp. This procedure aims to 
                              strengthen the hair roots by nourishing them and reduce hair loss.
                            </p>
                            <p>
                              Mezoterapide kullanılan kokteyller, DHT (Dihidrotestosteron) blokerleri ve saç büyümesini 
                              destekleyen bileşenler içerir. Bu tedavi, saç dökülmesinin erken evrelerinde etkili olup, 
                              saçların daha gür ve sağlıklı görünmesini sağlar. Düzenli seanslarla kalıcı sonuçlar elde edilir. / 
                              Cocktails used in mesotherapy contain DHT (Dihydrotestosterone) blockers and components that 
                              support hair growth. This treatment is effective in the early stages of hair loss and makes 
                              the hair look fuller and healthier. Permanent results are obtained with regular sessions.
                            </p>
                          </>
                        )}

                        {/* Hair Transplant Techniques Section for Hair Transplant Service */}
                        {service.slug === 'hair-transplantation' && (
                          <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                {t("services.fueTechnique")}
                              </h3>
                              <p className="text-muted-foreground">
                                {t("services.fueDescription")}
                              </p>
                            </div>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                {t("services.dhiTechnique")}
                              </h3>
                              <p className="text-muted-foreground">
                                {t("services.dhiDescription")}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Eyebrow Transplantation Techniques Section */}
                        {service.slug === 'eyebrow-transplantation' && (
                          <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Mikro FUE Tekniği / Micro FUE Technique
                              </h3>
                              <p className="text-muted-foreground">
                                Kaş ekiminde özel mikro FUE tekniği kullanılarak tek tek greftler toplanır ve yerleştirilir. Bu teknik minimum iz bırakarak maksimum doğal sonuç sağlar. / In eyebrow transplantation, individual grafts are collected and placed using a special micro FUE technique. This technique provides maximum natural results with minimal scarring.
                              </p>
                            </div>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Özel Tasarım / Custom Design
                              </h3>
                              <p className="text-muted-foreground">
                                Her kaş ekimi öncesinde, uzman estetisyen yüz hatlarınıza en uygun kaş tasarımını çizer ve onayınızı alır. Böylece tamamen kişiye özel sonuçlar elde edilir. / Before each eyebrow transplantation, an expert aesthetician draws the most suitable eyebrow design for your facial features and gets your approval. This ensures completely personalized results.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Beard Transplantation Techniques Section */}
                        {service.slug === 'beard-transplantation' && (
                          <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Hassas FUE Tekniği / Precise FUE Technique
                              </h3>
                              <p className="text-muted-foreground">
                                Sakal ekiminde özel hassasiyet gerektiren FUE tekniği kullanılarak greftler toplanır ve yüz hatlarına en uygun açılarda yerleştirilir. / In beard transplantation, grafts are collected using a FUE technique that requires special precision and placed at the most suitable angles for facial features.
                              </p>
                            </div>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Doğal Görünüm / Natural Look
                              </h3>
                              <p className="text-muted-foreground">
                                Sakal ekimi, yüz hatlarınıza uygun, simetrik ve doğal görünümlü bir sakal elde etmenizi sağlar. Uzmanlarımız, kişiye özel sakal tasarımı ile istediğiniz görünümü elde etmenize yardımcı olur. / Beard transplantation allows you to achieve a beard that suits your facial features, symmetrical and natural-looking. Our experts help you achieve the look you want with personalized beard design.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* PRP Treatment Techniques Section */}
                        {service.slug === 'prp-treatment' && (
                          <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Trombositten Zengin Plazma / Platelet-Rich Plasma
                              </h3>
                              <p className="text-muted-foreground">
                                PRP tedavisi, hastanın kendi kanından elde edilen trombositten zengin plazmayı kullanarak saç köklerini besler ve uyarır. Bu doğal yöntem, saç dökülmesini azaltır ve saç büyümesini teşvik eder. / PRP treatment nourishes and stimulates hair follicles using platelet-rich plasma obtained from the patient's own blood. This natural method reduces hair loss and promotes hair growth.
                              </p>
                            </div>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Büyüme Faktörleri / Growth Factors
                              </h3>
                              <p className="text-muted-foreground">
                                PRP içinde bulunan büyüme faktörleri, saç köklerinin beslenmesini artırır, dokuların iyileşmesini hızlandırır ve yeni hücrelerin oluşumunu destekler. Bu sayede saç kalitesi ve miktarı zaman içinde iyileşir. / Growth factors in PRP increase the nutrition of hair follicles, accelerate tissue healing, and support the formation of new cells. This improves hair quality and quantity over time.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Hair Mesotherapy Techniques Section */}
                        {service.slug === 'hair-mesotherapy' && (
                          <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Vitamin Kokteylli / Vitamin Cocktail
                              </h3>
                              <p className="text-muted-foreground">
                                Saç mezoterapisi, vitamin, mineral, amino asit ve antioksidanlardan oluşan özel bir kokteylin saç derisine enjekte edilmesiyle uygulanır. Bu kokteyller, saç foliküllerinin ihtiyaç duyduğu besinleri doğrudan sağlar. / Hair mesotherapy is applied by injecting a special cocktail of vitamins, minerals, amino acids, and antioxidants into the scalp. These cocktails directly provide the nutrients that hair follicles need.
                              </p>
                            </div>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -z-10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                              <h3 className="text-xl font-semibold mb-2 text-primary">
                                Mikro İğneler / Micro Needles
                              </h3>
                              <p className="text-muted-foreground">
                                Saç mezoterapisinde kullanılan mikro iğneler, vitamin kokteylinin saç kökleri seviyesine kadar etkili bir şekilde ulaşmasını sağlar. Bu işlem minimal rahatsızlıkla gerçekleştirilir ve hızlı bir iyileşme süreci sunar. / Micro needles used in hair mesotherapy ensure that the vitamin cocktail effectively reaches to the level of hair roots. This procedure is performed with minimal discomfort and offers a quick recovery process.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  {procedureSteps && (
                    <TabsContent value="procedure" className="mt-8 animate-in fade-in-50 duration-500">
                      <div className="prose prose-lg prose-headings:text-primary prose-h3:font-semibold prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-200 max-w-none mx-auto">
                        {renderMarkdownLikeContent(procedureSteps)}
                      </div>
                    </TabsContent>
                  )}
                  
                  {candidateInfo && (
                    <TabsContent value="candidates" className="mt-8 animate-in fade-in-50 duration-500">
                      <div className="prose prose-lg prose-headings:text-primary prose-h3:font-semibold prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-200 max-w-none mx-auto">
                        {renderMarkdownLikeContent(candidateInfo)}
                      </div>
                    </TabsContent>
                  )}
                  
                  {postCare && (
                    <TabsContent value="postcare" className="mt-8 animate-in fade-in-50 duration-500">
                      <div className="prose prose-lg prose-headings:text-primary prose-h3:font-semibold prose-h2:border-b prose-h2:pb-2 prose-h2:border-gray-200 max-w-none mx-auto">
                        {renderMarkdownLikeContent(postCare)}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          )}

          {/* Appointment CTA */}
          <div className="relative z-10 mb-20 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 via-primary/15 to-primary/5 rounded-2xl p-8 lg:p-12 shadow-xl relative">
              {/* Background patterns */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent"></div>
              <div className="absolute top-12 left-12 w-24 h-24 rounded-full border-8 border-primary/10 opacity-60"></div>
              <div className="absolute bottom-12 right-12 w-16 h-16 rounded-full border-4 border-primary/20 opacity-70"></div>
              
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <Badge variant="secondary" className="mb-6 bg-white/80 backdrop-blur-sm">
                  {t("services.exclusive")}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  {t("services.readyToStart")}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t("services.appointmentCTA")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={addPrefix(`/appointment?service=${service.id}`)}>
                    <Button 
                      size="lg" 
                      className="px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group relative overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                      <span className="relative flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {appointmentButton}
                      </span>
                    </Button>
                  </Link>
                  <Link href={addPrefix(`/contact`)}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="px-8 py-6 text-lg bg-white/70 hover:bg-white backdrop-blur-sm transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {t("common.contactUs")}
                      </span>
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-primary" />
                    <span>{t("services.satisfaction")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="relative z-10">
            {/* Treatment Timeline */}
            {(service.slug === 'hair-transplantation' || 
              service.slug === 'eyebrow-transplantation' || 
              service.slug === 'beard-transplantation' || 
              service.slug === 'prp-treatment' || 
              service.slug === 'hair-mesotherapy') && (
              <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-6">{t("services.procedureTimeline")}</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  {t("services.timelineDescription")}
                </p>
                
                <TreatmentTimeline 
                  steps={[
                    {
                      id: 1,
                      title: service.slug === 'prp-treatment' ? 'Kan Alma İşlemi / Blood Collection' : 
                             service.slug === 'hair-mesotherapy' ? 'Saç Analizi / Hair Analysis' :
                             t("services.timeline.step1Title"),
                      description: service.slug === 'prp-treatment' ? 'Küçük bir miktar kan alınır ve özel tüplerde hazırlanır / A small amount of blood is drawn and prepared in special tubes' :
                                  service.slug === 'hair-mesotherapy' ? 'Saç ve kafa derisi değerlendirmesi yapılır / Hair and scalp evaluation is performed' :
                                  service.slug === 'eyebrow-transplantation' ? 'Kaş şekli ve tasarımı kişiye özel olarak planlanır / Eyebrow shape and design is planned individually' :
                                  service.slug === 'beard-transplantation' ? 'Sakal yoğunluğu ve tasarımı planlanır / Beard density and design is planned' :
                                  t("services.timeline.step1Description"),
                      duration: service.slug === 'prp-treatment' ? "15-20 min" : 
                               service.slug === 'hair-mesotherapy' ? "20-30 min" : "30-60 min",
                      highlights: [
                        service.slug === 'prp-treatment' ? 'Ağrısız işlem / Painless procedure' : 
                        service.slug === 'hair-mesotherapy' ? 'Detaylı saç analizi / Detailed hair analysis' :
                        service.slug === 'eyebrow-transplantation' ? 'Yüz şekline uygun tasarım / Design suitable for face shape' :
                        service.slug === 'beard-transplantation' ? 'Yüz hatlarına uygun planlama / Planning suitable for facial features' :
                        t("services.timeline.step1Highlight1"),
                        
                        service.slug === 'prp-treatment' ? 'Hızlı işlem / Quick procedure' : 
                        service.slug === 'hair-mesotherapy' ? 'Kişiye özel formül belirleme / Determining custom formula' :
                        service.slug === 'eyebrow-transplantation' ? 'Doğal görünüm için açı planlaması / Angle planning for natural look' :
                        service.slug === 'beard-transplantation' ? 'Doğal sakal hattı belirleme / Determining natural beard line' :
                        t("services.timeline.step1Highlight2")
                      ],
                      icon: "Scissors"
                    },
                    {
                      id: 2,
                      title: service.slug === 'prp-treatment' ? 'Santrifüj İşlemi / Centrifugation' : 
                             service.slug === 'hair-mesotherapy' ? 'Mezoterapi Karışımı / Mesotherapy Mixture' :
                             service.slug === 'eyebrow-transplantation' ? 'Donör Bölge Hazırlığı / Donor Area Preparation' :
                             service.slug === 'beard-transplantation' ? 'Donör Bölge Hazırlığı / Donor Area Preparation' :
                             t("services.timeline.step2Title"),
                      description: service.slug === 'prp-treatment' ? 'Alınan kan trombositleri ayırmak için santrifüj edilir / Blood is centrifuged to separate platelets' :
                                  service.slug === 'hair-mesotherapy' ? 'Vitaminden zengin mezoterapi karışımı hazırlanır / Vitamin-rich mesotherapy mixture is prepared' :
                                  service.slug === 'eyebrow-transplantation' ? 'Ense bölgesinden alınacak greftler belirlenir / Grafts to be taken from the nape area are determined' :
                                  service.slug === 'beard-transplantation' ? 'Sakal için uygun greftler belirlenir / Suitable grafts for beard are determined' :
                                  t("services.timeline.step2Description"),
                      duration: service.slug === 'prp-treatment' ? "5-10 min" : 
                               service.slug === 'hair-mesotherapy' ? "10-15 min" : "1-3 hours",
                      highlights: [
                        service.slug === 'prp-treatment' ? 'Trombositlerin ayrılması / Separation of platelets' : 
                        service.slug === 'hair-mesotherapy' ? 'Vitamin ve peptit karışımı / Vitamin and peptide mixture' :
                        service.slug === 'eyebrow-transplantation' ? 'Sağlıklı ve kaliteli greftler / Healthy and quality grafts' :
                        service.slug === 'beard-transplantation' ? 'Doğal büyüme açılarına uygun greftler / Grafts suitable for natural growth angles' :
                        t("services.timeline.step2Highlight1"),
                        
                        service.slug === 'prp-treatment' ? 'Yüksek konsantrasyonlu plazma / High concentration plasma' : 
                        service.slug === 'hair-mesotherapy' ? 'Kişiye özel formülasyon / Personalized formulation' :
                        service.slug === 'eyebrow-transplantation' ? 'Minimum travma ile toplama / Collection with minimal trauma' :
                        service.slug === 'beard-transplantation' ? 'Ağrısız toplama işlemi / Painless collection procedure' :
                        t("services.timeline.step2Highlight2")
                      ],
                      icon: "Zap"
                    },
                    {
                      id: 3,
                      title: service.slug === 'prp-treatment' ? 'Uygulama / Application' : 
                             service.slug === 'hair-mesotherapy' ? 'Mezoterapi Uygulaması / Mesotherapy Application' :
                             service.slug === 'eyebrow-transplantation' ? 'Kaş Çizimi ve Kanalların Açılması / Eyebrow Drawing and Channel Opening' :
                             service.slug === 'beard-transplantation' ? 'Sakal Çizimi ve Kanalların Açılması / Beard Drawing and Channel Opening' :
                             t("services.timeline.step3Title"),
                      description: service.slug === 'prp-treatment' ? 'Hazırlanan trombositten zengin plazma saç derisine enjekte edilir / Platelet-rich plasma is injected into the scalp' :
                                  service.slug === 'hair-mesotherapy' ? 'Vitamin kokteyli saç derisine ince iğnelerle uygulanır / Vitamin cocktail is applied to the scalp with fine needles' :
                                  service.slug === 'eyebrow-transplantation' ? 'Kaş şekli çizilir ve greftlerin yerleştirileceği kanallar açılır / Eyebrow shape is drawn and channels are opened for grafts' :
                                  service.slug === 'beard-transplantation' ? 'Sakal hattı çizilerek greftlerin yerleştirileceği kanallar açılır / Beard line is drawn and channels are opened for grafts' :
                                  t("services.timeline.step3Description"),
                      duration: service.slug === 'prp-treatment' ? "15-20 min" : 
                               service.slug === 'hair-mesotherapy' ? "20-30 min" : 
                               service.slug === 'eyebrow-transplantation' ? "1-1.5 hours" : "2-4 hours",
                      highlights: [
                        service.slug === 'prp-treatment' ? 'Mikroiğnelerle uygulama / Application with microneedles' : 
                        service.slug === 'hair-mesotherapy' ? 'DHT blokerleri içeren karışım / Mixture containing DHT blockers' :
                        service.slug === 'eyebrow-transplantation' ? 'Doğal büyüme açılarına uygun kanallar / Channels suitable for natural growth angles' :
                        service.slug === 'beard-transplantation' ? 'Yüz hatlarına uygun sakal hattı / Beard line suitable for facial features' :
                        t("services.timeline.step3Highlight1"),
                        
                        service.slug === 'prp-treatment' ? 'Büyüme faktörlerinin direkt etkisi / Direct effect of growth factors' : 
                        service.slug === 'hair-mesotherapy' ? 'Ağrısız ve konforlu işlem / Painless and comfortable procedure' :
                        service.slug === 'eyebrow-transplantation' ? 'Uzman tarafından yapılan tasarım / Design done by an expert' :
                        service.slug === 'beard-transplantation' ? 'Sık ve dolgun görünüm için planlama / Planning for a dense and full appearance' :
                        t("services.timeline.step3Highlight2")
                      ],
                      icon: "Check"
                    },
                    {
                      id: 4,
                      title: service.slug === 'prp-treatment' ? 'İyileşme Süreci / Healing Process' : 
                             service.slug === 'hair-mesotherapy' ? 'İyileşme / Recovery' :
                             service.slug === 'eyebrow-transplantation' ? 'Greft Yerleştirme / Graft Placement' :
                             service.slug === 'beard-transplantation' ? 'Greft Yerleştirme / Graft Placement' :
                             t("services.timeline.step4Title"),
                      description: service.slug === 'prp-treatment' ? 'Kızarıklık ve hafif şişlik ilk günlerde görülebilir / Redness and mild swelling may be seen in the first days' :
                                  service.slug === 'hair-mesotherapy' ? 'İşlem sonrası hafif yanma ve kızarıklık olabilir / Mild burning and redness may occur after the procedure' :
                                  service.slug === 'eyebrow-transplantation' ? 'Greftler açılan kanallara özenle yerleştirilir / Grafts are carefully placed into opened channels' :
                                  service.slug === 'beard-transplantation' ? 'Toplanan greftler açılan kanallara yerleştirilir / Collected grafts are placed into opened channels' :
                                  t("services.timeline.step4Description"),
                      duration: service.slug === 'prp-treatment' ? "2-3 days" : 
                               service.slug === 'hair-mesotherapy' ? "1-2 days" : 
                               service.slug === 'eyebrow-transplantation' ? "1-2 hours" : "1-2 weeks",
                      highlights: [
                        service.slug === 'prp-treatment' ? 'Hızlı iyileşme / Quick recovery' : 
                        service.slug === 'hair-mesotherapy' ? 'İşlem günü duş alınabilir / Shower can be taken on the day of the procedure' :
                        service.slug === 'eyebrow-transplantation' ? 'Doğal büyüme yönünde yerleşim / Placement in natural growth direction' :
                        service.slug === 'beard-transplantation' ? 'Doğal görünüm için açıları uygun yerleşim / Placement with proper angles for natural look' :
                        t("services.timeline.step4Highlight1"),
                        
                        service.slug === 'prp-treatment' ? 'Herhangi bir özel bakım gerektirmez / No special care required' : 
                        service.slug === 'hair-mesotherapy' ? 'Günlük aktivitelere hemen dönüş / Immediate return to daily activities' :
                        service.slug === 'eyebrow-transplantation' ? 'Milimetrik hassasiyetle yerleştirme / Placement with millimetric precision' :
                        service.slug === 'beard-transplantation' ? 'Uzman teknisyenler tarafından uygulama / Application by expert technicians' :
                        t("services.timeline.step4Highlight2")
                      ],
                      icon: "Heart"
                    },
                    {
                      id: 5,
                      title: service.slug === 'prp-treatment' ? 'Sonuçlar / Results' : 
                             service.slug === 'hair-mesotherapy' ? 'Sonuçlar ve Takip / Results and Follow-up' :
                             service.slug === 'eyebrow-transplantation' ? 'Sonuçlar ve Bakım / Results and Care' :
                             service.slug === 'beard-transplantation' ? 'İyileşme ve Sonuçlar / Recovery and Results' :
                             t("services.timeline.step5Title"),
                      description: service.slug === 'prp-treatment' ? 'Büyüme ve kalınlaşma 3-4 hafta sonra görülmeye başlar / Growth and thickening begins to be seen after 3-4 weeks' :
                                  service.slug === 'hair-mesotherapy' ? 'Bir aylık tedavi sonrası belirgin farklar gözlenir / Significant differences are observed after one month of treatment' :
                                  service.slug === 'eyebrow-transplantation' ? 'Kaşlar doğal yönde ve kalıcı olarak büyür / Eyebrows grow in a natural direction and permanently' :
                                  service.slug === 'beard-transplantation' ? 'Sakal greftleri kalıcı olarak büyümeye devam eder / Beard grafts continue to grow permanently' :
                                  t("services.timeline.step5Description"),
                      duration: service.slug === 'prp-treatment' ? "1-3 months" : 
                               service.slug === 'hair-mesotherapy' ? "1-2 months" : "3-6 months",
                      highlights: [
                        service.slug === 'prp-treatment' ? 'Saç dökülmesinde azalma / Reduction in hair loss' : 
                        service.slug === 'hair-mesotherapy' ? 'Saç kalitesinde iyileşme / Improvement in hair quality' :
                        service.slug === 'eyebrow-transplantation' ? 'Kalıcı doğal sonuçlar / Permanent natural results' :
                        service.slug === 'beard-transplantation' ? 'Kalıcı ve doğal sakal görünümü / Permanent and natural beard appearance' :
                        t("services.timeline.step5Highlight1"),
                        
                        service.slug === 'prp-treatment' ? 'Tedavi tekrarı ile kalıcı sonuçlar / Permanent results with treatment repetition' : 
                        service.slug === 'hair-mesotherapy' ? 'Düzenli seanslarla kalıcı etki / Permanent effect with regular sessions' :
                        service.slug === 'eyebrow-transplantation' ? 'Kişiye özel kaş tasarımı / Personalized eyebrow design' :
                        service.slug === 'beard-transplantation' ? 'Keskin ve belirgin yüz hatları / Sharp and pronounced facial features' :
                        t("services.timeline.step5Highlight2")
                      ],
                      icon: "Sparkles"
                    }
                  ]}
                />
              </div>
            )}
            
            {/* FAQs related to this service */}
            {(service.slug === 'hair-transplantation' || 
              service.slug === 'eyebrow-transplantation' || 
              service.slug === 'beard-transplantation' || 
              service.slug === 'prp-treatment' || 
              service.slug === 'hair-mesotherapy') ? (
              <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-6">{t("services.faqsTitle")}</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  {t("services.faqsDescription")}
                </p>
                
                <EnhancedFAQs 
                  faqs={[
                    {
                      id: 1,
                      question: t("services.faqs.question1"),
                      answer: t("services.faqs.answer1"),
                      category: "general"
                    },
                    {
                      id: 2,
                      question: t("services.faqs.question2"),
                      answer: t("services.faqs.answer2"),
                      category: "procedure"
                    },
                    {
                      id: 3,
                      question: t("services.faqs.question3"),
                      answer: t("services.faqs.answer3"),
                      category: "recovery"
                    },
                    {
                      id: 4,
                      question: t("services.faqs.question4"),
                      answer: t("services.faqs.answer4"),
                      category: "general"
                    },
                    {
                      id: 5,
                      question: t("services.faqs.question5"),
                      answer: t("services.faqs.answer5"),
                      category: "procedure"
                    },
                    {
                      id: 6,
                      question: t("services.faqs.question6"),
                      answer: t("services.faqs.answer6"),
                      category: "recovery"
                    },
                    {
                      id: 7,
                      question: t("services.faqs.question7"),
                      answer: t("services.faqs.answer7"),
                      category: "general"
                    },
                    {
                      id: 8,
                      question: t("services.faqs.question8"),
                      answer: t("services.faqs.answer8"),
                      category: "procedure"
                    }
                  ]}
                  categories={true}
                  title={t("services.faqsTitle")}
                  subtitle={t("services.faqsDescription")}
                />
              </div>
            ) : (
              <FaqsSection serviceId={service.id} />
            )}

            {/* Customer Reviews Section */}
            {/* Success Statistics */}
            <ResultsStats language={language} />
            
            {/* Reviews */}
            <ReviewsSection serviceId={service.id} />
            
            {/* Before/After Gallery */}
            {(service.slug === 'hair-transplantation' || 
              service.slug === 'eyebrow-transplantation' || 
              service.slug === 'beard-transplantation') && (
              <div className="mb-24">
                <div className="text-center mb-12">
                  <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                    {t("services.results")}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    {t("services.beforeAfter")}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t("services.beforeAfterDescription")}
                  </p>
                </div>
                
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-xl -z-10"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-xl -z-10"></div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -z-10 rounded-bl-full"></div>
                    
                    <BeforeAfterGallery 
                      items={[
                        {
                          id: 1,
                          type: "image",
                          beforeImageUrl: "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                          afterImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                          descriptionTR: "Saç ekiminden 6 ay sonra belirgin değişim",
                          descriptionEN: "Significant change 6 months after hair transplantation",
                          descriptionRU: "Значительное изменение через 6 месяцев после трансплантации волос",
                          descriptionKA: "მნიშვნელოვანი ცვლილება თმის გადანერგვიდან 6 თვის შემდეგ",
                          category: "FUE"
                        },
                        {
                          id: 2,
                          type: "image",
                          beforeImageUrl: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                          afterImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                          descriptionTR: "Tepe kısmında yapılan saç ekimi sonuçları",
                          descriptionEN: "Hair transplantation results on the crown area",
                          descriptionRU: "Результаты пересадки волос в области макушки",
                          descriptionKA: "თმის გადანერგვის შედეგები თხემის არეში",
                          category: "DHI"
                        },
                        {
                          id: 3,
                          type: "image",
                          beforeImageUrl: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                          afterImageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                          descriptionTR: "Alın çizgisi ve saç ekimi - 1 yıl sonrası",
                          descriptionEN: "Hairline and transplantation - 1 year after",
                          descriptionRU: "Линия роста волос и трансплантация - 1 год спустя",
                          descriptionKA: "თმის ხაზი და გადანერგვა - 1 წლის შემდეგ",
                          category: "FUE"
                        }
                      ]} 
                      title={getLocalizedTitle(service)}
                    />
                    
                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("services.beforeAfterDisclaimer")}
                      </p>
                      <Link href={addPrefix("/gallery")}>
                        <Button variant="outline" size="sm" className="group">
                          <span className="flex items-center">
                            {t("services.viewMoreResults")}
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}