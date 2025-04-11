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
  SortDesc,
  ChevronLeft,
  ChevronRight
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // URL'den kategori parametresi varsa seçili kategoriyi ayarla
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);
  
  // Sayfalama sorgusu
  const { 
    data: paginatedData, 
    isLoading 
  } = useQuery<{
    posts: BlogPost[];
    totalPosts: number;
    totalPages: number;
    currentPage: number;
  }>({
    queryKey: [
      "/api/blog/paginated", 
      currentPage,
      selectedCategory || 'all',
      activeSort === 'date-desc' ? 'newest' : 
      activeSort === 'date-asc' ? 'oldest' : 'popular',
      searchQuery
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery);
      }
      
      const sortParam = 
        activeSort === 'date-desc' ? 'newest' :
        activeSort === 'date-asc' ? 'oldest' : 'popular';
      params.append('sort', sortParam);
      
      const response = await fetch(`/api/blog/paginated?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch paginated blog posts');
      }
      
      return await response.json();
    },
  });
  
  // API'dan gelen veriler  
  const blogPosts = paginatedData?.posts || [];
  const totalPostCount = paginatedData?.totalPosts || 0;
  
  // Sayfalama bilgilerini güncelle
  useEffect(() => {
    if (paginatedData) {
      setTotalPages(paginatedData.totalPages);
    }
  }, [paginatedData]);
  
  // Tab filtresi
  useEffect(() => {
    // activeTab değiştiğinde sorgu parametrelerini güncelle
    if (activeTab === 'popular') {
      setActiveSort('popular');
    } else {
      setActiveSort('date-desc');
    }
  }, [activeTab]);
  
  // Filtre değişikliklerinde sayfayı sıfırla
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, activeSort]);
  
  // Kategorileri alma işlemi
  const { data: categoriesData } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca yeni istek gönderme
  });
  
  // Eşsiz kategorileri al
  const categoriesSet = new Set<string>();
  categoriesData?.forEach((post) => categoriesSet.add(post.category));
  const categories = Array.from(categoriesSet);
  
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
  
  // Sayfalama fonksiyonları
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Generate pagination array
  const getPaginationArray = () => {
    const paginationArray = [];
    const maxPagesToShow = 5; // Max sayfa sayısı görüntüsü
    
    if (totalPages <= maxPagesToShow) {
      // Toplam sayfa sayısı az ise tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        paginationArray.push(i);
      }
    } else {
      // Sayfa sayısı çok ise akıllı sayfalama gösterimi
      if (currentPage <= 3) {
        // İlk sayfalar
        for (let i = 1; i <= 4; i++) {
          paginationArray.push(i);
        }
        paginationArray.push('...');
        paginationArray.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Son sayfalar
        paginationArray.push(1);
        paginationArray.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          paginationArray.push(i);
        }
      } else {
        // Orta sayfalar
        paginationArray.push(1);
        paginationArray.push('...');
        paginationArray.push(currentPage - 1);
        paginationArray.push(currentPage);
        paginationArray.push(currentPage + 1);
        paginationArray.push('...');
        paginationArray.push(totalPages);
      }
    }
    
    return paginationArray;
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
              
              <TabsContent value="latest" className="mt-0">
                {/* Blog Posts Grid */}
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : blogPosts && blogPosts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden h-full group hover:shadow-md transition-shadow duration-300">
                          <Link href={addPrefix(`/blog/${post.slug}`)}>
                            <div className="relative h-52 overflow-hidden">
                              <img 
                                src={post.imageUrl} 
                                alt={post[`title${language.toUpperCase()}` as keyof BlogPost] as string} 
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
                                {post[`title${language.toUpperCase()}` as keyof BlogPost] as string}
                              </h3>
                            </Link>
                            
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {post[`summary${language.toUpperCase()}` as keyof BlogPost] as string}
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
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center mt-10 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className="flex items-center px-2.5 h-8"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        {getPaginationArray().map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2">...</span>
                          ) : (
                            <Button
                              key={`page-${page}`}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToPage(page as number)}
                              className="w-8 h-8 p-0"
                            >
                              {page}
                            </Button>
                          )
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="flex items-center px-2.5 h-8"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">{t('blog.noPosts')}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                {/* Blog Posts Grid - aynı içerik, sadece sıralama farklı */}
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : blogPosts && blogPosts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden h-full group hover:shadow-md transition-shadow duration-300">
                          <Link href={addPrefix(`/blog/${post.slug}`)}>
                            <div className="relative h-52 overflow-hidden">
                              <img 
                                src={post.imageUrl} 
                                alt={post[`title${language.toUpperCase()}` as keyof BlogPost] as string} 
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
                                {post[`title${language.toUpperCase()}` as keyof BlogPost] as string}
                              </h3>
                            </Link>
                            
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {post[`summary${language.toUpperCase()}` as keyof BlogPost] as string}
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
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center mt-10 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className="flex items-center px-2.5 h-8"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        {getPaginationArray().map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2">...</span>
                          ) : (
                            <Button
                              key={`page-${page}`}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToPage(page as number)}
                              className="w-8 h-8 p-0"
                            >
                              {page}
                            </Button>
                          )
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="flex items-center px-2.5 h-8"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">{t('blog.noPosts')}</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Recent Posts */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{t('blog.recentPosts')}</h3>
              
              <div className="space-y-4">
                {blogPosts.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-start gap-3">
                    <Link href={addPrefix(`/blog/${post.slug}`)}>
                      <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                        <img 
                          src={post.imageUrl} 
                          alt={post[`title${language.toUpperCase()}` as keyof BlogPost] as string}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    
                    <div>
                      <Link href={addPrefix(`/blog/${post.slug}`)}>
                        <h4 className="text-sm font-medium leading-tight line-clamp-2 hover:text-primary transition-colors">
                          {post[`title${language.toUpperCase()}` as keyof BlogPost] as string}
                        </h4>
                      </Link>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1 inline" />
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Categories Cloud */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{t('blog.categoriesTitle')}</h3>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-1 px-3 py-1.5 text-sm cursor-pointer rounded-full border transition-colors ${
                      selectedCategory === category 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "hover:bg-muted hover:border-muted-foreground/20"
                    }`}
                  >
                    {getCategoryName(category)}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tags Cloud */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{t('blog.tagsTitle')}</h3>
              
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border hover:bg-muted transition-colors cursor-pointer"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Featured Authors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('blog.featuredAuthors')}</h3>
              
              <div className="space-y-4">
                {FEATURED_AUTHORS.map((author) => (
                  <Card key={author.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center gap-4">
                      <img 
                        src={author.avatar} 
                        alt={author.name}
                        className="w-16 h-16 rounded-full border-2 border-primary/20" 
                      />
                      
                      <div>
                        <h4 className="font-semibold text-base">{author.name}</h4>
                        <p className="text-xs text-primary">{author.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{author.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}