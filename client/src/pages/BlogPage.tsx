import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { META } from "@/lib/constants";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/container";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Search, 
  Tag, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail,
  BookOpen,
  Users,
  ArrowRight,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";

// Örnek blog etiketleri
const POPULAR_TAGS = [
  'saç ekimi', 'fue yöntemi', 'saç dökülmesi', 'doğal saç çizgisi', 
  'kaş ekimi', 'sakal ekimi', 'saç bakımı', 'prp tedavisi', 'tıbbi turizm'
];

// Örnek popüler yazar
const FEATURED_AUTHORS = [
  {
    id: 1,
    name: 'Dr. Mehmet Yılmaz',
    title: 'Saç Ekimi Uzmanı',
    avatar: '/images/team/doctor1.jpg',
    bio: 'FUE ve DHI teknikleri konusunda 15 yıllık deneyime sahip saç ekimi uzmanı.'
  },
  {
    id: 2,
    name: 'Dr. Ayşe Kaya',
    title: 'Dermatoloji Uzmanı',
    avatar: '/images/team/doctor2.jpg',
    bio: 'Saç dökülmesi ve cilt problemleri üzerine uzmanlaşmış dermatoloji doktoru.'
  }
];

type BlogPost = {
  id: number;
  slug: string;
  titleTR: string;
  titleEN: string;
  titleRU: string;
  titleKA: string;
  contentTR: string;
  contentEN: string;
  contentRU: string;
  contentKA: string;
  summaryTR: string;
  summaryEN: string;
  summaryRU: string;
  summaryKA: string;
  imageUrl: string;
  author: string;
  authorTitle: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  readingTime: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
};

export default function BlogPage() {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<'date-desc' | 'date-asc' | 'popular'>('date-desc');
  const [activeTab, setActiveTab] = useState('latest');
  
  // URL'den kategori parametresi varsa seçili kategoriyi ayarla
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);
  
  // Fetch blog posts
  const { data: allBlogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  
  // Filter ve sıralama işlemleri
  const processedPosts = () => {
    if (!allBlogPosts) return [];
    
    // Kategori filtresi
    let filtered = selectedCategory 
      ? allBlogPosts.filter(post => post.category === selectedCategory)
      : allBlogPosts;
    
    // Arama filtresi
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post[`title${language.toUpperCase()}` as keyof typeof post]?.toString().toLowerCase().includes(query) ||
        post[`summary${language.toUpperCase()}` as keyof typeof post]?.toString().toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Tab filtresi
    if (activeTab === 'popular') {
      filtered = [...filtered].sort((a, b) => b.viewCount - a.viewCount);
    }
    
    // Sıralama
    return [...filtered].sort((a, b) => {
      if (activeSort === 'date-desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (activeSort === 'date-asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return b.viewCount - a.viewCount;
      }
    });
  };
  
  const filteredPosts = processedPosts();
  
  // Eşsiz kategorileri al
  const categories = allBlogPosts 
    ? [...new Set(allBlogPosts.map(post => post.category))]
    : [];
  
  // Tarih formatı
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      language === 'tr' ? 'tr-TR' :
      language === 'ru' ? 'ru-RU' :
      language === 'ka' ? 'ka-KA' :
      'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };
  
  // Kategori adını dil bazlı getir
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hair-transplant':
        return language === 'tr' ? 'Saç Ekimi' :
               language === 'ru' ? 'Пересадка волос' :
               language === 'ka' ? 'თმის გადანერგვა' :
               'Hair Transplant';
      case 'eyebrow-transplant':
        return language === 'tr' ? 'Kaş Ekimi' :
               language === 'ru' ? 'Пересадка бровей' :
               language === 'ka' ? 'წარბების გადანერგვა' :
               'Eyebrow Transplant';
      case 'beard-transplant':
        return language === 'tr' ? 'Sakal Ekimi' :
               language === 'ru' ? 'Пересадка бороды' :
               language === 'ka' ? 'წვერის გადანერგვა' :
               'Beard Transplant';
      case 'prp':
        return 'PRP';
      case 'travel':
        return language === 'tr' ? 'Seyahat' :
               language === 'ru' ? 'Путешествие' :
               language === 'ka' ? 'მოგზაურობა' :
               'Travel';
      case 'clinic':
        return language === 'tr' ? 'Klinik' :
               language === 'ru' ? 'Клиника' :
               language === 'ka' ? 'კლინიკა' :
               'Clinic';
      case 'before-after':
        return language === 'tr' ? 'Öncesi ve Sonrası' :
               language === 'ru' ? 'До и После' :
               language === 'ka' ? 'მანამდე და შემდეგ' :
               'Before and After';
      case 'patient-stories':
        return language === 'tr' ? 'Hasta Hikayeleri' :
               language === 'ru' ? 'Истории пациентов' :
               language === 'ka' ? 'პაციენტების ისტორიები' :
               'Patient Stories';
      case 'hair-care':
        return language === 'tr' ? 'Saç Bakımı' :
               language === 'ru' ? 'Уход за волосами' :
               language === 'ka' ? 'თმის მოვლა' :
               'Hair Care';
      default:
        return category;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{t('blog.title')}</title>
        <meta name="description" content={t('blog.description')} />
        <meta name="keywords" content="saç ekimi, saç nakli, saç dökülmesi, FUE, DHI, kaş ekimi, sakal ekimi, PRP, saç mezoterapisi, saç bakımı, tıbbi turizm" />
        <link rel="canonical" href={window.location.origin + addPrefix("/blog")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/blog"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/blog"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/blog"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/blog"} />
        <meta property="og:title" content={t('blog.title')} />
        <meta property="og:description" content={t('blog.description')} />
        <meta property="og:url" content={window.location.origin + addPrefix("/blog")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyHair Clinic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('blog.title')} />
        <meta name="twitter:description" content={t('blog.description')} />
      </Helmet>
      
      <PageHeader
        title={t('blog.title')}
        description={t('blog.description')}
      />
      
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ana içerik bölümü */}
          <div className="lg:col-span-8">
            {/* Arama ve Filtreler */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t('blog.searchPosts')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">{t('blog.categoriesTitle')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      {t('blog.allCategories')}
                    </DropdownMenuItem>
                    <Separator />
                    {categories.map((category) => (
                      <DropdownMenuItem 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {getCategoryName(category)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      {activeSort === 'date-desc' ? <SortDesc className="h-4 w-4" /> : 
                       activeSort === 'date-asc' ? <SortAsc className="h-4 w-4" /> : 
                       <SortDesc className="h-4 w-4" />}
                      <span className="hidden sm:inline">
                        {activeSort === 'date-desc' ? t('blog.newest') : 
                         activeSort === 'date-asc' ? t('blog.oldest') : 
                         t('blog.mostPopular')}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setActiveSort('date-desc')}>
                      <SortDesc className="h-4 w-4 mr-2" />
                      {t('blog.newest')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveSort('date-asc')}>
                      <SortAsc className="h-4 w-4 mr-2" />
                      {t('blog.oldest')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveSort('popular')}>
                      <Users className="h-4 w-4 mr-2" />
                      {t('blog.mostPopular')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Kategoriler (mobil için scroll) */}
            <div className="mb-8 pb-2 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                <Button 
                  variant={selectedCategory === null ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t('blog.allCategories')}
                </Button>
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {getCategoryName(category)}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="latest" className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {t('blog.recentPosts')}
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {t('blog.popularPosts')}
                </TabsTrigger>
              </TabsList>
              
              {/* İçerik tüm tablar için aynı, sadece sıralama değişiyor */}
              <TabsContent value="latest" className="mt-0">
                {/* Blog Posts Grid */}
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : filteredPosts && filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden h-full group hover:shadow-md transition-shadow duration-300">
                        <Link href={addPrefix(`/blog/${post.slug}`)}>
                          <div className="relative h-52 overflow-hidden">
                            <img 
                              src={post.imageUrl} 
                              alt={post[`title${language.toUpperCase()}`]} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <Badge className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm hover:bg-primary">
                              {getCategoryName(post.category)}
                            </Badge>
                          </div>
                        </Link>
                        
                        <CardContent className="p-5">
                          <div className="flex items-center text-xs text-muted-foreground gap-4 mb-3">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(post.createdAt)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.readingTime} {t('blog.minutes')}
                            </div>
                          </div>
                          
                          <Link href={addPrefix(`/blog/${post.slug}`)}>
                            <h3 className="text-xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">
                              {post[`title${language.toUpperCase()}` as keyof typeof post]}
                            </h3>
                          </Link>
                          
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post[`summary${language.toUpperCase()}` as keyof typeof post]}
                          </p>
                        </CardContent>
                        
                        <CardFooter className="pt-0 px-5 pb-5 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {post.authorAvatar && (
                              <img 
                                src={post.authorAvatar} 
                                alt={post.author}
                                className="w-8 h-8 rounded-full" 
                              />
                            )}
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          
                          <Link href={addPrefix(`/blog/${post.slug}`)}>
                            <Button variant="ghost" size="sm" className="group/button flex items-center gap-1 text-primary hover:text-primary">
                              {t('common.readMore')}
                              <ArrowRight className="h-3.5 w-3.5 group-hover/button:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">{t('blog.noPosts')}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                {/* İçerik "latest" tab ile aynı, sıralama processedPosts içinde yapılıyor */}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Yan panel (Sidebar) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Abone ol kutusu */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{t('blog.subscribeTitle')}</CardTitle>
                <CardDescription>{t('blog.subscribeDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="pb-3 space-y-3">
                <Input placeholder={t('blog.emailAddress')} type="email" />
                <Button className="w-full">{t('blog.subscribe')}</Button>
              </CardContent>
            </Card>
            
            {/* Kategoriler */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{t('blog.categoriesTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex justify-between items-center pb-2 border-b border-muted last:border-0">
                      <Button 
                        variant="link" 
                        className="p-0 justify-start h-auto text-base font-normal hover:underline hover:text-primary"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {getCategoryName(category)}
                      </Button>
                      <Badge variant="outline">
                        {allBlogPosts?.filter(post => post.category === category).length || 0}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Popüler etiketler */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{t('blog.tagsTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Öne çıkan yazarlar */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{t('blog.authorInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3 space-y-4">
                {FEATURED_AUTHORS.map((author) => (
                  <div key={author.id} className="flex items-start gap-3">
                    <img 
                      src={author.avatar} 
                      alt={author.name}
                      className="w-14 h-14 rounded-full object-cover" 
                    />
                    <div>
                      <h4 className="font-semibold">{author.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{author.title}</p>
                      <p className="text-xs">{author.bio}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Sosyal medya paylaşım */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{t('blog.shareThis')}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
