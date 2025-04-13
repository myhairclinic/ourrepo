import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Play, PauseCircle, Image as ImageIcon, Clock, Camera, Clapperboard, Split, 
  Heart, Share2, Download, ChevronRight, Sparkles, Filter, Sun, Award } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { getGalleryTranslation } from '@/lib/galleryTranslations';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/container';

type BeforeAfterItem = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  month: number;
  type: 'hair' | 'beard' | 'eyebrow';
};

type VideoItem = {
  id: number;
  url: string;
  thumbnail?: string;
  title: string;
  duration: string;
};

type ClinicImage = {
  id: number;
  url: string;
  title: string;
  category: 'procedure' | 'facility' | 'team';
};

export default function GalleryPage() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState('clinic');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Klinik görüntüleri
  const clinicImages: ClinicImage[] = [
    // Prosedür görselleri
    { id: 1, url: '/images/clinic-gallery/IMG-20250325-WA0046.jpg', title: getGalleryTranslation('gallery.hairTransplantProcedure', language), category: 'procedure' },
    { id: 2, url: '/images/clinic-gallery/IMG-20250325-WA0047.jpg', title: getGalleryTranslation('gallery.hairAnalysis', language), category: 'procedure' },
    { id: 3, url: '/images/clinic-gallery/IMG-20250325-WA0048.jpg', title: getGalleryTranslation('gallery.donorAreaPreparation', language), category: 'procedure' },
    { id: 4, url: '/images/clinic-gallery/IMG-20250325-WA0049.jpg', title: getGalleryTranslation('gallery.graftExtraction', language), category: 'procedure' },
    { id: 5, url: '/images/clinic-gallery/IMG-20250325-WA0050.jpg', title: getGalleryTranslation('gallery.hairTransplantTechnique', language), category: 'procedure' },
    { id: 6, url: '/images/clinic-gallery/IMG-20250325-WA0051.jpg', title: getGalleryTranslation('gallery.recipientSiteCreation', language), category: 'procedure' },
    { id: 7, url: '/images/clinic-gallery/IMG-20250325-WA0053.jpg', title: getGalleryTranslation('gallery.implantationProcess', language), category: 'procedure' },
    { id: 8, url: '/images/clinic-gallery/IMG-20250325-WA0054.jpg', title: getGalleryTranslation('gallery.precisionTools', language), category: 'procedure' },
    
    // Tesis görselleri
    { id: 9, url: '/images/clinic-gallery/IMG-20250325-WA0055.jpg', title: getGalleryTranslation('gallery.operationRoom', language), category: 'facility' },
    { id: 10, url: '/images/clinic-gallery/IMG-20250325-WA0056.jpg', title: getGalleryTranslation('gallery.consultationRoom', language), category: 'facility' },
    { id: 11, url: '/images/clinic-gallery/IMG-20250325-WA0057.jpg', title: getGalleryTranslation('gallery.advancedEquipment', language), category: 'facility' },
    { id: 12, url: '/images/clinic-gallery/IMG-20250325-WA0058.jpg', title: getGalleryTranslation('gallery.sterilizationArea', language), category: 'facility' },
    
    // Ekip görselleri
    { id: 13, url: '/images/clinic-gallery/IMG-20250325-WA0059.jpg', title: getGalleryTranslation('gallery.medicalTeam', language), category: 'team' },
    { id: 14, url: '/images/clinic-gallery/IMG-20250325-WA0060.jpg', title: getGalleryTranslation('gallery.surgicalTeam', language), category: 'team' },
    { id: 15, url: '/images/clinic-gallery/IMG-20250325-WA0061.jpg', title: getGalleryTranslation('gallery.technicalStaff', language), category: 'team' },
    { id: 16, url: '/images/clinic-gallery/IMG-20250325-WA0062.jpg', title: getGalleryTranslation('gallery.supportStaff', language), category: 'team' }
  ];

  // Videolar
  const videos: VideoItem[] = [
    { 
      id: 1, 
      url: '/videos/VID-20250325-WA0004.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0046.jpg', 
      title: getGalleryTranslation('gallery.hairTransplantProcess', language), 
      duration: '0:42' 
    },
    { 
      id: 2, 
      url: '/videos/VID-20250325-WA0005.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0053.jpg', 
      title: t('gallery.patientTestimonial'), 
      duration: '1:03' 
    },
    { 
      id: 3, 
      url: '/videos/VID-20250325-WA0006.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0062.jpg', 
      title: t('gallery.clinicTour'), 
      duration: '1:15' 
    },
    { 
      id: 4, 
      url: '/videos/VID-20250325-WA0007.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0059.jpg', 
      title: t('gallery.doctorInterview'), 
      duration: '0:59' 
    },
    { 
      id: 5, 
      url: '/videos/VID-20250325-WA0008.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0055.jpg', 
      title: t('gallery.consultationSession'), 
      duration: '0:50' 
    },
    { 
      id: 6, 
      url: '/videos/VID-20250325-WA0009.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0048.jpg', 
      title: t('gallery.operationOverview'), 
      duration: '0:55' 
    },
    { 
      id: 7, 
      url: '/videos/VID-20250325-WA0010.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0050.jpg', 
      title: t('gallery.hairTransplantResults'), 
      duration: '1:30' 
    },
    { 
      id: 8, 
      url: '/videos/VID-20250325-WA0011.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0051.jpg', 
      title: t('gallery.patientJourney'), 
      duration: '0:48' 
    },
    { 
      id: 9, 
      url: '/videos/VID-20250325-WA0012.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0057.jpg', 
      title: t('gallery.testimonialVideo'), 
      duration: '2:15' 
    },
    { 
      id: 10, 
      url: '/videos/VID-20250325-WA0013.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0047.jpg', 
      title: t('gallery.treatmentExplained'), 
      duration: '1:25' 
    },
    { 
      id: 11, 
      url: '/videos/VID-20250325-WA0014.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0056.jpg', 
      title: t('gallery.facilityTour'), 
      duration: '1:20' 
    },
    { 
      id: 12, 
      url: '/videos/VID-20250325-WA0015.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0058.jpg', 
      title: t('gallery.hairTransplantProcess'), 
      duration: '1:45' 
    },
    { 
      id: 13, 
      url: '/videos/VID-20250325-WA0016.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0061.jpg', 
      title: t('gallery.patientTestimonial'), 
      duration: '1:12' 
    },
    { 
      id: 14, 
      url: '/videos/VID-20250325-WA0017.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0060.jpg', 
      title: t('gallery.clinicTour'), 
      duration: '0:35' 
    },
    { 
      id: 15, 
      url: '/videos/VID-20250325-WA0018.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0049.jpg', 
      title: t('gallery.doctorInterview'), 
      duration: '1:55' 
    },
    { 
      id: 16, 
      url: '/videos/VID-20250325-WA0019.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0054.jpg', 
      title: t('gallery.operationOverview'), 
      duration: '3:15' 
    },
    { 
      id: 17, 
      url: '/videos/VID-20250325-WA0022.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0062.jpg', 
      title: t('gallery.testimonialVideo'), 
      duration: '1:48' 
    },
    { 
      id: 18, 
      url: '/videos/VID-20250325-WA0023.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0063.jpg', 
      title: t('gallery.patientJourney'), 
      duration: '2:35' 
    },
    { 
      id: 19, 
      url: '/videos/VID-20250325-WA0031.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0046.jpg', 
      title: t('gallery.facilityTour'), 
      duration: '0:40' 
    },
    { 
      id: 20, 
      url: '/videos/VID-20250325-WA0032.mp4', 
      thumbnail: '/images/clinic-gallery/IMG-20250325-WA0050.jpg', 
      title: t('gallery.treatmentExplained'), 
      duration: '0:30' 
    }
  ];

  // Öncesi/sonrası görseller
  const beforeAfterImages: BeforeAfterItem[] = [
    { 
      id: 1, 
      imageUrl: '/images/before-after/IMG-20250325-WA0067.jpg', 
      title: t('gallery.malePatterBaldness'), 
      description: t('gallery.fullHairTransformation'),
      month: 12,
      type: 'hair'
    },
    { 
      id: 2, 
      imageUrl: '/images/before-after/IMG-20250325-WA0068.jpg', 
      title: t('gallery.recededHairline'), 
      description: t('gallery.naturalHairlineRestoration'),
      month: 10,
      type: 'hair'
    },
    { 
      id: 3, 
      imageUrl: '/images/before-after/IMG-20250325-WA0069.jpg', 
      title: t('gallery.advancedBaldness'), 
      description: t('gallery.completeHairRestoration'),
      month: 12,
      type: 'hair'
    },
    { 
      id: 4, 
      imageUrl: '/images/before-after/IMG-20250325-WA0070.jpg', 
      title: t('gallery.eyebrowTransplant'), 
      description: t('gallery.naturalEyebrowEnhancement'),
      month: 6,
      type: 'eyebrow'
    },
    { 
      id: 5, 
      imageUrl: '/images/before-after/IMG-20250325-WA0071.jpg', 
      title: t('gallery.youngPatientTransformation'), 
      description: t('gallery.improvedHairDensity'),
      month: 8,
      type: 'hair'
    },
    { 
      id: 6, 
      imageUrl: '/images/before-after/IMG-20250325-WA0072.jpg', 
      title: t('gallery.hairlinePlanning'), 
      description: t('gallery.precisionHairlineDesign'),
      month: 10,
      type: 'hair'
    },
    { 
      id: 7, 
      imageUrl: '/images/before-after/IMG-20250325-WA0073.jpg', 
      title: t('gallery.extensiveRestoration'), 
      description: t('gallery.completeHairCoverage'),
      month: 12,
      type: 'hair'
    },
    { 
      id: 8, 
      imageUrl: '/images/before-after/IMG-20250325-WA0092.jpg', 
      title: t('gallery.seniorPatientTransformation'), 
      description: t('gallery.naturalRejuvenation'),
      month: 10,
      type: 'hair'
    },
    { 
      id: 9, 
      imageUrl: '/images/before-after/IMG-20250325-WA0093.jpg', 
      title: t('gallery.hairTransplantProcedure'), 
      description: t('gallery.professionalApplication'),
      month: 8,
      type: 'hair'
    },
    { 
      id: 10, 
      imageUrl: '/images/before-after/IMG-20250325-WA0095.jpg', 
      title: t('gallery.advancedThinning'), 
      description: t('gallery.dramaticImprovement'),
      month: 12,
      type: 'hair'
    },
    { 
      id: 11, 
      imageUrl: '/images/before-after/WhatsApp Görsel 2025-03-25 saat 22.05.29_4bed7d5d.jpg', 
      title: t('gallery.youngMaleTransformation'), 
      description: t('gallery.naturalHairlineAndDensity'),
      month: 10,
      type: 'hair'
    }
  ];

  const filteredImages = selectedCategory 
    ? clinicImages.filter(img => img.category === selectedCategory) 
    : clinicImages;

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
      } else {
        videoRef.current.play();
        progressInterval.current = setInterval(() => {
          if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setCurrentProgress(progress);
            
            if (progress >= 100 && progressInterval.current) {
              clearInterval(progressInterval.current);
              progressInterval.current = null;
              setIsPlaying(false);
            }
          }
        }, 100);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <PageHeader
        title={getGalleryTranslation('gallery.pageTitle', language)}
        description={getGalleryTranslation('gallery.pageDescription', language)}
        isSpecialPage={true}
        imageUrl="/images/clinic-gallery/IMG-20250325-WA0055.jpg"
      />

      <div className="bg-gradient-to-b from-blue-50 to-white">
        <Container className="py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
              <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider">{getGalleryTranslation('gallery.exploreOurWork', language)}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{getGalleryTranslation('gallery.transformationShowcase', language)}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{getGalleryTranslation('gallery.showcaseDescription', language)}</p>
          </div>
          
          <Tabs defaultValue="clinic" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 bg-white rounded-lg shadow-sm p-4">
              <TabsList className="grid grid-cols-3 md:w-auto bg-blue-50/80">
                <TabsTrigger value="clinic" className="flex items-center gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Camera className="h-4 w-4" />
                  <span>{getGalleryTranslation('gallery.clinicImages', language)}</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Clapperboard className="h-4 w-4" />
                  <span>{getGalleryTranslation('gallery.videos', language)}</span>
                </TabsTrigger>
                <TabsTrigger value="beforeAfter" className="flex items-center gap-1.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Split className="h-4 w-4" />
                  <span>{getGalleryTranslation('gallery.beforeAfter', language)}</span>
                </TabsTrigger>
              </TabsList>

              {activeTab === 'clinic' && (
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className={selectedCategory === null ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
                    {getGalleryTranslation('gallery.all', language)}
                  </Button>
                  <Button
                    variant={selectedCategory === 'procedure' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory('procedure')}
                    className={selectedCategory === 'procedure' ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {getGalleryTranslation('gallery.procedures', language)}
                  </Button>
                  <Button
                    variant={selectedCategory === 'facility' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory('facility')}
                    className={selectedCategory === 'facility' ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {getGalleryTranslation('gallery.facilities', language)}
                  </Button>
                  <Button
                    variant={selectedCategory === 'team' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory('team')}
                    className={selectedCategory === 'team' ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {getGalleryTranslation('gallery.team', language)}
                  </Button>
                </div>
              )}
            </div>

            <TabsContent value="clinic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                        <AspectRatio ratio={4/3} className="bg-muted">
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </AspectRatio>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-base">{image.title}</h3>
                            <Badge variant="outline" className="text-xs capitalize">
                              {image.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                      <div className="flex flex-col gap-4">
                        <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="object-contain w-full h-full"
                          />
                        </AspectRatio>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Badge variant="outline" className="capitalize">
                              {image.category}
                            </Badge>
                            <p className="flex items-center gap-1">
                              <ImageIcon className="h-3.5 w-3.5" />
                              {t('gallery.highResolution')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Dialog key={video.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                        <div className="relative">
                          <AspectRatio ratio={16/9} className="bg-muted">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
                                <Play className="h-8 w-8 text-white" fill="white" />
                              </div>
                            </div>
                          </AspectRatio>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-base">{video.title}</h3>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl" onInteractOutside={() => {
                      if (isPlaying) {
                        setIsPlaying(false);
                        if (videoRef.current) {
                          videoRef.current.pause();
                        }
                        if (progressInterval.current) {
                          clearInterval(progressInterval.current);
                          progressInterval.current = null;
                        }
                      }
                    }}>
                      <div className="flex flex-col gap-4">
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          <video 
                            ref={videoRef}
                            src={video.url} 
                            className="w-full"
                            onEnded={() => {
                              setIsPlaying(false);
                              if (progressInterval.current) {
                                clearInterval(progressInterval.current);
                                progressInterval.current = null;
                              }
                            }}
                          />
                          {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handleVideoPlay}>
                              <div className="bg-black/30 rounded-full p-3 backdrop-blur-sm">
                                <Play className="h-12 w-12 text-white" fill="white" />
                              </div>
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0">
                            <Progress value={currentProgress} className="rounded-none h-1" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{video.title}</h3>
                            <p className="text-muted-foreground text-sm flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {video.duration}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleVideoPlay}
                          >
                            {isPlaying ? (
                              <PauseCircle className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beforeAfter">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beforeAfterImages.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                        <AspectRatio ratio={1/1} className="bg-muted">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </AspectRatio>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-medium text-base">{item.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {getGalleryTranslation('gallery.resultAfter', language, { time: item.month })} {getGalleryTranslation('gallery.months', language)}
                            </p>
                            <Badge variant="outline" className="w-fit mt-1 text-xs capitalize">
                              {item.type === 'hair' ? getGalleryTranslation('gallery.hairTransplant', language) : 
                               item.type === 'beard' ? getGalleryTranslation('gallery.beardTransplant', language) : 
                               getGalleryTranslation('gallery.eyebrowTransplant', language)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                      <div className="flex flex-col gap-4">
                        <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="object-contain w-full h-full"
                          />
                        </AspectRatio>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge className="capitalize">
                              {item.type === 'hair' ? t('gallery.hairTransplant') : 
                               item.type === 'beard' ? t('gallery.beardTransplant') : 
                               t('gallery.eyebrowTransplant')}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {item.month} {t('gallery.months')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}