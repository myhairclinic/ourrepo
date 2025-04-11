import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,  
  Share2, 
  ThumbsUp,
  MessageCircle,
  Heart,
  Eye,
  Clock,
  ChevronRight 
} from "lucide-react";
import { TikTokIcon as TikTok } from "@/components/icons/TikTokIcon";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
// Layout'a ihtiyaç yok çünkü Header ve Footer App.tsx'de otomatik olarak ekleniyor

const socialPlatforms = [
  { 
    name: "Instagram", 
    handle: "@myhair_clinic", 
    url: "https://instagram.com/myhair_clinic", 
    icon: <Instagram className="h-5 w-5" />,
    followers: "15.6K",
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  { 
    name: "Facebook", 
    handle: "MyHair Clinic", 
    url: "https://facebook.com/myhairclinic", 
    icon: <Facebook className="h-5 w-5" />,
    followers: "12.8K",
    color: "bg-blue-600"
  },
  { 
    name: "Twitter", 
    handle: "@MyHairClinic", 
    url: "https://twitter.com/myhairclinic", 
    icon: <Twitter className="h-5 w-5" />,
    followers: "8.3K",
    color: "bg-sky-500"
  },
  { 
    name: "YouTube", 
    handle: "MyHair Clinic Official", 
    url: "https://youtube.com/myhairclinic", 
    icon: <Youtube className="h-5 w-5" />,
    followers: "24.5K",
    color: "bg-red-600"
  },
  { 
    name: "TikTok", 
    handle: "@myhairclinic", 
    url: "https://tiktok.com/@myhairclinic", 
    icon: <TikTok className="h-5 w-5" />,
    followers: "32.7K",
    color: "bg-black"
  }
];

const featuredPosts = [
  {
    id: 1,
    platform: "Instagram",
    icon: <Instagram className="h-4 w-4" />,
    imageUrl: "/images/social/instagram-post-1.jpg",
    type: "image",
    date: "2 gün önce",
    likes: 1243,
    comments: 87,
    content: "Saç ekimi sonrası önemli bakım ipuçları! Doğal ve güçlü saçlar için #MyHairClinic uzmanlarından tavsiyeler ⬇️"
  },
  {
    id: 2,
    platform: "Facebook",
    icon: <Facebook className="h-4 w-4" />,
    imageUrl: "/images/social/facebook-post-1.jpg",
    type: "video",
    date: "3 gün önce",
    likes: 856,
    comments: 45,
    shares: 32,
    content: "Kliniğimizin direktörü Dr. Aliyev'in saç ekimi teknikleri hakkında bilgilendirici videosu. Merak ettiğiniz tüm sorular bu videoda!"
  },
  {
    id: 3,
    platform: "YouTube",
    icon: <Youtube className="h-4 w-4" />,
    imageUrl: "/images/social/youtube-post-1.jpg",
    type: "video",
    date: "1 hafta önce",
    views: 15678,
    likes: 2345,
    comments: 198,
    content: "Saç ekimi öncesi ve sonrası: Hastalarımızın 6 aylık dönüşüm süreçleri | MyHair Klinik başarı hikayeleri"
  },
  {
    id: 4,
    platform: "Instagram",
    icon: <Instagram className="h-4 w-4" />,
    imageUrl: "/images/social/instagram-post-2.jpg",
    type: "carousel",
    date: "4 gün önce",
    likes: 1578,
    comments: 95,
    content: "Kaş ekimi ile ilgili en çok sorulan 5 soru ve cevapları. Kaydırın ve detaylı bilgileri öğrenin! #KaşEkimi #MyHairClinic"
  },
  {
    id: 5,
    platform: "TikTok",
    icon: <TikTok className="h-4 w-4" />,
    imageUrl: "/images/social/tiktok-post-1.jpg",
    type: "video",
    date: "2 gün önce",
    views: 45678,
    likes: 9876,
    comments: 543,
    content: "Saç ekimi sonrası ilk yıkama nasıl yapılır? Step by step rehberimiz #SaçEkimi #HairTransplant #Aftercare"
  },
  {
    id: 6,
    platform: "Facebook",
    icon: <Facebook className="h-4 w-4" />,
    imageUrl: "/images/social/facebook-post-2.jpg",
    type: "image",
    date: "1 hafta önce",
    likes: 678,
    comments: 34,
    shares: 12,
    content: "Tiflis'te konaklama paketlerimiz hakkında detaylı bilgi almak için mesaj gönderin. Saç ekimi + 5 yıldızlı otel + transfer hepsi dahil paketlerimiz mevcut!"
  }
];

const reviews = [
  {
    id: 1,
    platform: "Instagram",
    username: "ahmet_kaya",
    avatar: "/images/social/avatar-1.jpg",
    date: "3 hafta önce",
    rating: 5,
    comment: "MyHair Clinic'te saç ekimi operasyonum harika sonuçlar verdi. Ekip profesyonel ve çok ilgiliydi. Kesinlikle tavsiye ederim!"
  },
  {
    id: 2,
    platform: "Facebook",
    username: "Elena Petrova",
    avatar: "/images/social/avatar-2.jpg",
    date: "1 ay önce",
    rating: 5,
    comment: "Saç ekimi için Tiflis'e geldim ve bu kliniği seçtiğim için çok mutluyum. Rusça konuşan ekip ve mükemmel sonuçlar!"
  },
  {
    id: 3,
    platform: "Google",
    username: "David Williams",
    avatar: "/images/social/avatar-3.jpg",
    date: "2 hafta önce",
    rating: 4,
    comment: "Great experience with MyHair Clinic in Tbilisi. The hotel and transportation package was excellent value. Results starting to show after 3 months."
  }
];

export default function SocialMediaPage() {
  const { language, t, addPrefix } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper function for number formatting
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <>
      <Helmet>
        <title>{t('socialMedia.pageTitle')} | MyHair Clinic</title>
        <meta name="description" content={t('socialMedia.metaDescription')} />
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl overflow-hidden">
            <div className="px-6 py-16 md:py-20 md:px-12 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t('socialMedia.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-3xl mb-8">
                {t('socialMedia.heroDescription')}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialPlatforms.map((platform, index) => (
                  <a 
                    key={index}
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white text-primary px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
                  >
                    {platform.icon}
                    <span className="ml-2 font-medium">{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Accounts Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('socialMedia.followUs')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {socialPlatforms.map((platform, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-md transition-all">
                <div className={`h-3 ${platform.color}`}></div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${platform.color}`}>
                        {platform.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">{platform.name}</h3>
                        <p className="text-sm text-muted-foreground">{platform.handle}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col mb-4">
                    <span className="text-2xl font-bold">{platform.followers}</span>
                    <span className="text-sm text-muted-foreground">{t('socialMedia.followers')}</span>
                  </div>
                  
                  <a 
                    href={platform.url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full" size="sm">
                      {t('socialMedia.follow')}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('socialMedia.featuredPosts')}
            </h2>
            <Button variant="ghost" className="gap-1">
              {t('socialMedia.viewAllPosts')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="all">{t('socialMedia.allPosts')}</TabsTrigger>
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(6).fill(null).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-64 w-full" />
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-2" />
                        <Skeleton className="h-4 w-4/6" />
                        <div className="flex gap-4 mt-4">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden group">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={`${post.platform} post`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${
                            post.platform === 'Instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                            post.platform === 'Facebook' ? 'bg-blue-600' :
                            post.platform === 'YouTube' ? 'bg-red-600' :
                            post.platform === 'TikTok' ? 'bg-black' : 'bg-gray-700'
                          } text-white font-medium px-2 py-1`}>
                            <span className="flex items-center">
                              {post.icon}
                              <span className="ml-1">{post.platform}</span>
                            </span>
                          </Badge>
                        </div>
                        {post.type === 'video' && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-black/70 text-white font-medium">
                              Video
                            </Badge>
                          </div>
                        )}
                        {post.type === 'carousel' && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-black/70 text-white font-medium">
                              Carousel
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex gap-1 items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.date}</span>
                          </div>
                          {post.views && (
                            <div className="flex gap-1 items-center text-sm text-muted-foreground">
                              <Eye className="h-3.5 w-3.5" />
                              <span>{formatNumber(post.views)}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{formatNumber(post.comments)}</span>
                          </div>
                          {post.shares && (
                            <div className="flex items-center gap-1">
                              <Share2 className="h-4 w-4" />
                              <span>{formatNumber(post.shares)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="instagram">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts
                  .filter(post => post.platform === "Instagram")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden group">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={`Instagram post`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-2 py-1">
                            <span className="flex items-center">
                              <Instagram className="h-4 w-4" />
                              <span className="ml-1">Instagram</span>
                            </span>
                          </Badge>
                        </div>
                        {post.type === 'carousel' && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-black/70 text-white font-medium">
                              Carousel
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex gap-1 items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{formatNumber(post.comments)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            {/* Similar content for other tab contents (facebook, youtube, tiktok) */}
            <TabsContent value="facebook">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts
                  .filter(post => post.platform === "Facebook")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden group">
                      {/* Facebook post content similar to Instagram above */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={`Facebook post`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-blue-600 text-white font-medium px-2 py-1">
                            <span className="flex items-center">
                              <Facebook className="h-4 w-4" />
                              <span className="ml-1">Facebook</span>
                            </span>
                          </Badge>
                        </div>
                        {post.type === 'video' && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-black/70 text-white font-medium">
                              Video
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex gap-1 items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{formatNumber(post.comments)}</span>
                          </div>
                          {post.shares && (
                            <div className="flex items-center gap-1">
                              <Share2 className="h-4 w-4" />
                              <span>{formatNumber(post.shares)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="youtube">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts
                  .filter(post => post.platform === "YouTube")
                  .length > 0 ? (
                  featuredPosts
                    .filter(post => post.platform === "YouTube")
                    .map((post) => (
                      <Card key={post.id} className="overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={`YouTube post`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-600 text-white font-medium px-2 py-1">
                              <span className="flex items-center">
                                <Youtube className="h-4 w-4" />
                                <span className="ml-1">YouTube</span>
                              </span>
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-black/70 text-white font-medium">
                              Video
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex gap-1 items-center text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex gap-1 items-center text-sm text-muted-foreground">
                              <Eye className="h-3.5 w-3.5" />
                              <span>{formatNumber(post.views)}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{formatNumber(post.likes)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{formatNumber(post.comments)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="col-span-3 py-16 text-center">
                    <p className="text-muted-foreground">{t('socialMedia.noPostsYet')}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="tiktok">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts
                  .filter(post => post.platform === "TikTok")
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden group">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={`TikTok post`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-black text-white font-medium px-2 py-1">
                            <span className="flex items-center">
                              <TikTok className="h-4 w-4" />
                              <span className="ml-1">TikTok</span>
                            </span>
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-black/70 text-white font-medium">
                            Video
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex gap-1 items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex gap-1 items-center text-sm text-muted-foreground">
                            <Eye className="h-3.5 w-3.5" />
                            <span>{formatNumber(post.views)}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{formatNumber(post.comments)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Social Reviews Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('socialMedia.socialReviews')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.username} />
                        <AvatarFallback>{review.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{review.username}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-sm">
                          {review.platform === "Instagram" && <Instagram className="h-3 w-3" />}
                          {review.platform === "Facebook" && <Facebook className="h-3 w-3" />}
                          {review.platform === "Google" && (
                            <svg className="h-3 w-3" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
                            </svg>
                          )}
                          <span>{review.platform}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section>
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                {t('socialMedia.ctaTitle')}
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                {t('socialMedia.ctaDescription')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {socialPlatforms.map((platform, index) => (
                  <a 
                    key={index}
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center ${
                      platform.platform === 'Instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                      platform.name === 'Facebook' ? 'bg-blue-600' :
                      platform.name === 'YouTube' ? 'bg-red-600' :
                      platform.name === 'TikTok' ? 'bg-black' : 'bg-primary'
                    } text-white px-4 py-2 rounded-full hover:opacity-90 transition-all`}
                  >
                    {platform.icon}
                    <span className="ml-2 font-medium">{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}