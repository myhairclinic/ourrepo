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
import { Play, PauseCircle, Image, Clock, Camera, Video, Clapperboard, Split } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/container';

type BeforeAfterItem = {
  id: number;
  before: string;
  after: string;
  title: string;
  month: number;
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

  // Örnek resimler
  const clinicImages: ClinicImage[] = [
    { id: 1, url: '/images/clinic-procedures/IMG-20250325-WA0046.jpg', title: t('gallery.hairTransplantProcedure'), category: 'procedure' },
    { id: 2, url: '/images/clinic-procedures/IMG-20250325-WA0053.jpg', title: t('gallery.hairAnalysis'), category: 'procedure' },
    { id: 3, url: '/images/clinic-procedures/IMG-20250325-WA0062.jpg', title: t('gallery.postOperativeCare'), category: 'procedure' },
    { id: 4, url: '/images/clinic-procedures/IMG-20250325-WA0063.jpg', title: t('gallery.consultationProcess'), category: 'procedure' },
    { id: 5, url: '/images/clinic-procedures/IMG-20250325-WA0064.jpg', title: t('gallery.donorAreaPreparation'), category: 'procedure' },
    { id: 6, url: '/images/clinic-procedures/IMG-20250325-WA0065.jpg', title: t('gallery.hairTransplantTechnique'), category: 'procedure' },
    { id: 7, url: '/images/clinic-procedures/IMG-20250325-WA0066.jpg', title: t('gallery.microscopicView'), category: 'procedure' },
    { id: 8, url: '/images/tbilisi-landmarks/colorful-houses.jpg', title: t('gallery.clinicExterior'), category: 'facility' },
    { id: 9, url: '/images/tbilisi-landmarks/peace-bridge.webp', title: t('gallery.receptionArea'), category: 'facility' },
    { id: 10, url: '/images/tbilisi-landmarks/night-panorama.webp', title: t('gallery.surgeryRoom'), category: 'facility' },
    { id: 11, url: '/images/tbilisi-landmarks/trinity-cathedral.jpg', title: t('gallery.recoveryRoom'), category: 'facility' },
    { id: 12, url: '/images/services/hair-transplant.jpg', title: t('gallery.headSurgeon'), category: 'team' },
    { id: 13, url: '/images/services/eyebrow-transplant.jpg', title: t('gallery.medicalTeam'), category: 'team' },
    { id: 14, url: '/images/services/beard-transplant.jpg', title: t('gallery.supportStaff'), category: 'team' }
  ];

  // Örnek videolar
  const videos: VideoItem[] = [
    { 
      id: 1, 
      url: '/images/videos/VID-20250325-WA0010.mp4', 
      thumbnail: '/images/clinic-procedures/IMG-20250325-WA0046.jpg', 
      title: t('gallery.hairTransplantProcess'), 
      duration: '1:30' 
    },
    { 
      id: 2, 
      url: '/images/videos/VID-20250325-WA0010.mp4', 
      thumbnail: '/images/clinic-procedures/IMG-20250325-WA0053.jpg', 
      title: t('gallery.patientTestimonial'), 
      duration: '2:15' 
    },
    { 
      id: 3, 
      url: '/images/videos/VID-20250325-WA0010.mp4', 
      thumbnail: '/images/clinic-procedures/IMG-20250325-WA0062.jpg', 
      title: t('gallery.clinicTour'), 
      duration: '3:40' 
    },
    { 
      id: 4, 
      url: '/images/videos/VID-20250325-WA0010.mp4', 
      thumbnail: '/images/clinic-procedures/IMG-20250325-WA0063.jpg', 
      title: t('gallery.doctorInterview'), 
      duration: '4:20' 
    }
  ];

  // Örnek öncesi/sonrası görseller
  const beforeAfterImages: BeforeAfterItem[] = [
    { 
      id: 1, 
      before: '/images/clinic-procedures/IMG-20250325-WA0046.jpg', 
      after: '/images/clinic-procedures/IMG-20250325-WA0066.jpg', 
      title: t('gallery.malePatterBaldness'), 
      month: 12 
    },
    { 
      id: 2, 
      before: '/images/clinic-procedures/IMG-20250325-WA0053.jpg', 
      after: '/images/clinic-procedures/IMG-20250325-WA0065.jpg', 
      title: t('gallery.recededHairline'), 
      month: 8 
    },
    { 
      id: 3, 
      before: '/images/clinic-procedures/IMG-20250325-WA0062.jpg', 
      after: '/images/clinic-procedures/IMG-20250325-WA0064.jpg', 
      title: t('gallery.crownThinning'), 
      month: 10 
    },
    { 
      id: 4, 
      before: '/images/clinic-procedures/IMG-20250325-WA0063.jpg', 
      after: '/images/clinic-procedures/IMG-20250325-WA0066.jpg', 
      title: t('gallery.eyebrowTransplant'), 
      month: 6 
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
    <>
      <PageHeader
        title={t('gallery.pageTitle')}
        description={t('gallery.pageDescription')}
      />

      <Container className="py-12">
        <Tabs defaultValue="clinic" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <TabsList className="grid grid-cols-3 md:w-auto">
              <TabsTrigger value="clinic" className="flex items-center gap-1.5">
                <Camera className="h-4 w-4" />
                <span>{t('gallery.clinicImages')}</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-1.5">
                <Clapperboard className="h-4 w-4" />
                <span>{t('gallery.videos')}</span>
              </TabsTrigger>
              <TabsTrigger value="beforeAfter" className="flex items-center gap-1.5">
                <Split className="h-4 w-4" />
                <span>{t('gallery.beforeAfter')}</span>
              </TabsTrigger>
            </TabsList>

            {activeTab === 'clinic' && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t('gallery.all')}
                </Button>
                <Button
                  variant={selectedCategory === 'procedure' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('procedure')}
                >
                  {t('gallery.procedures')}
                </Button>
                <Button
                  variant={selectedCategory === 'facility' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('facility')}
                >
                  {t('gallery.facilities')}
                </Button>
                <Button
                  variant={selectedCategory === 'team' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('team')}
                >
                  {t('gallery.team')}
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
                            <Image className="h-3.5 w-3.5" />
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
            <div className="space-y-8">
              {beforeAfterImages.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="p-4 bg-muted">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('gallery.resultAfter')} {item.month} {t('gallery.months')}
                    </p>
                  </div>
                  <Separator />
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <AspectRatio ratio={4/3} className="bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={item.before} 
                            alt={`${item.title} - ${t('gallery.before')}`}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <p className="text-center font-medium">{t('gallery.before')}</p>
                      </div>
                      <div className="space-y-2">
                        <AspectRatio ratio={4/3} className="bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={item.after} 
                            alt={`${item.title} - ${t('gallery.after')}`}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <p className="text-center font-medium">{t('gallery.after')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}