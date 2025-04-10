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
  const getDurationText = (duration: string) => `${duration} ${t("common.duration")}`;
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

      <main className="py-12 overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative">
          {/* Modern background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute right-10 top-1/3 w-[30rem] h-[30rem] rounded-full bg-blue-300/5 blur-3xl"></div>
          </div>
          
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground relative z-10">
            <Link href={addPrefix("/")}>
              <span className="hover:text-primary cursor-pointer">{t("common.home")}</span>
            </Link>
            <span className="mx-2">/</span>
            <Link href={addPrefix("/services")}>
              <span className="hover:text-primary cursor-pointer">{t("common.services")}</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{getLocalizedTitle(service)}</span>
          </div>

          {/* Hero section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
            {/* Service Image */}
            <div className="overflow-hidden rounded-xl shadow-xl">
              <img 
                src={service.slug === 'hair-transplantation' ? hairTransplantImage : service.imageUrl}
                alt={getLocalizedTitle(service)} 
                className="w-full h-auto object-cover"
              />
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
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full max-w-lg mx-auto mb-8 grid grid-cols-4">
                  <TabsTrigger value="details">{detailsHeading}</TabsTrigger>
                  {procedureSteps && (
                    <TabsTrigger value="procedure">{procedureStepsHeading}</TabsTrigger>
                  )}
                  {candidateInfo && (
                    <TabsTrigger value="candidates">{candidateInfoHeading}</TabsTrigger>
                  )}
                  {postCare && (
                    <TabsTrigger value="postcare">{postCareHeading}</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <div className="prose prose-lg max-w-none mx-auto">
                    {renderMarkdownLikeContent(detailedContent)}
                  </div>
                </TabsContent>
                
                {procedureSteps && (
                  <TabsContent value="procedure" className="mt-6">
                    <div className="prose prose-lg max-w-none mx-auto">
                      {renderMarkdownLikeContent(procedureSteps)}
                    </div>
                  </TabsContent>
                )}
                
                {candidateInfo && (
                  <TabsContent value="candidates" className="mt-6">
                    <div className="prose prose-lg max-w-none mx-auto">
                      {renderMarkdownLikeContent(candidateInfo)}
                    </div>
                  </TabsContent>
                )}
                
                {postCare && (
                  <TabsContent value="postcare" className="mt-6">
                    <div className="prose prose-lg max-w-none mx-auto">
                      {renderMarkdownLikeContent(postCare)}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          )}

          {/* Appointment CTA */}
          <div className="relative z-10 mb-20">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("services.readyToStart")}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">{t("services.appointmentCTA")}</p>
                <Link href={addPrefix(`/appointment?service=${service.id}`)}>
                  <Button size="lg" className="px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    {appointmentButton}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="relative z-10">
            {/* Treatment Timeline */}
            {service.slug === 'hair-transplantation' && (
              <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-6">{t("services.procedureTimeline")}</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  {t("services.timelineDescription")}
                </p>
                
                <TreatmentTimeline 
                  steps={[
                    {
                      id: 1,
                      title: t("services.timeline.step1Title"),
                      description: t("services.timeline.step1Description"),
                      duration: "30-60 min",
                      highlights: [
                        t("services.timeline.step1Highlight1"),
                        t("services.timeline.step1Highlight2")
                      ],
                      icon: "Scissors"
                    },
                    {
                      id: 2,
                      title: t("services.timeline.step2Title"),
                      description: t("services.timeline.step2Description"),
                      duration: "1-3 hours",
                      highlights: [
                        t("services.timeline.step2Highlight1"),
                        t("services.timeline.step2Highlight2")
                      ],
                      icon: "Zap"
                    },
                    {
                      id: 3,
                      title: t("services.timeline.step3Title"),
                      description: t("services.timeline.step3Description"),
                      duration: "2-4 hours",
                      highlights: [
                        t("services.timeline.step3Highlight1"),
                        t("services.timeline.step3Highlight2")
                      ],
                      icon: "Check"
                    },
                    {
                      id: 4,
                      title: t("services.timeline.step4Title"),
                      description: t("services.timeline.step4Description"),
                      duration: "1-2 weeks",
                      highlights: [
                        t("services.timeline.step4Highlight1"),
                        t("services.timeline.step4Highlight2")
                      ],
                      icon: "Heart"
                    },
                    {
                      id: 5,
                      title: t("services.timeline.step5Title"),
                      description: t("services.timeline.step5Description"),
                      duration: "3-6 months",
                      highlights: [
                        t("services.timeline.step5Highlight1"),
                        t("services.timeline.step5Highlight2")
                      ],
                      icon: "Sparkles"
                    }
                  ]}
                />
              </div>
            )}
            
            {/* FAQs related to this service */}
            {service.slug === 'hair-transplantation' ? (
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
            <ReviewsSection serviceId={service.id} />
            
            {/* Before/After Gallery */}
            {service.slug === 'hair-transplantation' && (
              <div className="mb-24">
                <h2 className="text-3xl font-bold text-center mb-6">{t("services.beforeAfter")}</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  {t("services.beforeAfterDescription")}
                </p>
                
                <BeforeAfterGallery items={[
                  {
                    id: 1,
                    type: "image",
                    beforeImageUrl: "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    afterImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    descriptionTR: "Saç ekiminden 6 ay sonra belirgin değişim",
                    descriptionEN: "Significant change 6 months after hair transplantation",
                    descriptionRU: "Значительное изменение через 6 месяцев после трансплантации волос",
                    descriptionKA: "მნიშვნელოვანი ცვლილება თმის გადანერგვიდან 6 თვის შემდეგ"
                  },
                  {
                    id: 2,
                    type: "image",
                    beforeImageUrl: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    afterImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    descriptionTR: "Tepe kısmında yapılan saç ekimi sonuçları",
                    descriptionEN: "Hair transplantation results on the crown area",
                    descriptionRU: "Результаты пересадки волос в области макушки",
                    descriptionKA: "თმის გადანერგვის შედეგები თხემის არეში"
                  },
                  {
                    id: 3,
                    type: "image",
                    beforeImageUrl: "https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    afterImageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                    descriptionTR: "Alın çizgisi ve saç ekimi - 1 yıl sonrası",
                    descriptionEN: "Hairline and transplantation - 1 year after",
                    descriptionRU: "Линия роста волос и трансплантация - 1 год спустя",
                    descriptionKA: "თმის ხაზი და გადანერგვა - 1 წლის შემდეგ"
                  }
                ]} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}