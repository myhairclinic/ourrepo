import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { META } from "@/lib/constants";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/container";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Filter,
  SortAsc,
  SortDesc,
  Search,
  Users,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { getBlogTranslation, Language } from "@/lib/blogTranslations";

// Blog sayfası için özel stiller
import '../styles/blog-page.css';

// Import our new blog components
import { BlogListSection } from "@/components/blog/BlogListSection";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { FeaturedPostsSection } from "@/components/blog/FeaturedPostsSection";

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
        <title>{getBlogTranslation('blog.title', language as Language)}</title>
        <meta name="description" content={getBlogTranslation('blog.description', language as Language)} />
        <meta name="keywords" content="saç ekimi, saç nakli, saç dökülmesi, FUE, DHI, kaş ekimi, sakal ekimi, PRP, saç mezoterapisi, saç bakımı, tıbbi turizm" />
        <link rel="canonical" href={window.location.origin + addPrefix("/blog")} />
        <link rel="alternate" hrefLang="tr" href={window.location.origin + "/tr/blog"} />
        <link rel="alternate" hrefLang="en" href={window.location.origin + "/en/blog"} />
        <link rel="alternate" hrefLang="ru" href={window.location.origin + "/ru/blog"} />
        <link rel="alternate" hrefLang="ka" href={window.location.origin + "/ka/blog"} />
        <link rel="alternate" hrefLang="az" href={window.location.origin + "/az/blog"} />
        <link rel="alternate" hrefLang="kz" href={window.location.origin + "/kz/blog"} />
        <link rel="alternate" hrefLang="ir" href={window.location.origin + "/ir/blog"} />
        <meta property="og:title" content={getBlogTranslation('blog.title', language as Language)} />
        <meta property="og:description" content={getBlogTranslation('blog.description', language as Language)} />
        <meta property="og:url" content={window.location.origin + addPrefix("/blog")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyHair Clinic" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getBlogTranslation('blog.title', language as Language)} />
        <meta name="twitter:description" content={getBlogTranslation('blog.description', language as Language)} />
      </Helmet>
      
      <PageHeader
        title="Saç Ekimi Blogu | Uzman Makaleler ve Başarı Hikayeleri"
        description="Saç ekimi, saç dökülmesi tedavileri ve saç bakımı hakkında uzman makaleler ve gerçek başarı hikayeleri. Saç sağlığınız için en güncel bilgiler ve klinik deneyimlerimiz burada."
        imageUrl="/images/blog/blog-header-bg.jpg"
        className="blog-header"
      />
      
      <Container className="py-12">
        {/* Öne çıkan blog yazıları */}
        {!searchQuery && !selectedCategory && currentPage === 1 && (
          <FeaturedPostsSection
            featuredPosts={blogPosts.filter(post => post.viewCount > 50 || (post.tags && post.tags.includes('öne çıkan'))).slice(0, 1)}
            getCategoryName={getCategoryName}
            formatDate={formatDate}
            isLoading={isLoading}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ana içerik bölümü */}
          <div className="lg:col-span-8">
            {/* Arama ve Filtreler */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={getBlogTranslation('blog.searchPosts', language as Language)}
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
                      <span className="hidden sm:inline">{getBlogTranslation('blog.categoriesTitle', language as Language)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      {getBlogTranslation('blog.allCategories', language as Language)}
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
                        {activeSort === 'date-desc' ? getBlogTranslation('blog.newest', language as Language) : 
                         activeSort === 'date-asc' ? getBlogTranslation('blog.oldest', language as Language) : 
                         getBlogTranslation('blog.mostPopular', language as Language)}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setActiveSort('date-desc')}>
                      <SortDesc className="h-4 w-4 mr-2" />
                      {getBlogTranslation('blog.newest', language as Language)}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveSort('date-asc')}>
                      <SortAsc className="h-4 w-4 mr-2" />
                      {getBlogTranslation('blog.oldest', language as Language)}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveSort('popular')}>
                      <Users className="h-4 w-4 mr-2" />
                      {getBlogTranslation('blog.mostPopular', language as Language)}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Blog listesi */}
            <BlogListSection 
              blogPosts={blogPosts}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentPage={currentPage}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              goToPage={goToPage}
              getPaginationArray={getPaginationArray}
              formatDate={formatDate}
              getCategoryName={getCategoryName}
              isLoading={isLoading}
            />
          </div>
          
          {/* Yan panel */}
          <div className="lg:col-span-4 space-y-8">
            <BlogSidebar 
              popularTags={POPULAR_TAGS}
              featuredAuthors={FEATURED_AUTHORS}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              allCategories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              getCategoryName={getCategoryName}
            />
          </div>
        </div>
      </Container>
    </>
  );
}