import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { getBlogTranslation, Language } from "@/lib/blogTranslations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Tag, ArrowRight } from "lucide-react";

interface Author {
  id: number;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

interface BlogSidebarProps {
  popularTags: string[];
  featuredAuthors: Author[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  allCategories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  getCategoryName: (category: string) => string;
}

export function BlogSidebar({
  popularTags,
  featuredAuthors,
  searchQuery,
  setSearchQuery,
  allCategories,
  selectedCategory,
  setSelectedCategory,
  getCategoryName
}: BlogSidebarProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Etiket bulutu için farklı boyut ve renk tonları
  const getTagClasses = (index: number) => {
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    
    return `${size} ${index % 3 === 0 ? 'bg-primary/10 hover:bg-primary/20 text-primary' : ''}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search işlemi ana sayfada yapıldığı için sadece form submit'i engellemek yeterli
  };

  // Avatar başharfleri için yardımcı fonksiyon
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      {/* Arama Kutusu */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-300 border-muted/60 blog-sidebar-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex gap-2 items-center">
            <Search className="h-4 w-4 text-primary" />
            {getBlogTranslation('blog.search', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="relative">
            <Input
              placeholder={getBlogTranslation('blog.searchPlaceholder', language as Language)}
              className="pl-3 border-primary/20 focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Kategoriler */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-300 border-muted/60 overflow-hidden blog-sidebar-card blog-categories-card">
        <CardHeader className="pb-3 bg-muted/30">
          <CardTitle className="text-lg flex gap-2 items-center">
            <Tag className="h-4 w-4 text-primary" />
            {t('blog.categoriesTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-1.5">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              size="sm"
              className={`w-full justify-start rounded-md text-sm font-medium ${
                selectedCategory === null 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "hover:bg-muted/80 hover:text-primary"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              {t('blog.allCategories')}
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start rounded-md text-sm font-medium ${
                  selectedCategory === category 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-muted/80 hover:text-primary"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Etiketler */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-300 border-muted/60 overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30">
          <CardTitle className="text-lg flex gap-2 items-center">
            <Tag className="h-4 w-4 text-primary" />
            {getBlogTranslation('blog.popularTags', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {popularTags && Array.isArray(popularTags) && popularTags.length > 0 && popularTags.map((tag, index) => (
              <Badge
                key={tag}
                variant={index % 3 === 0 ? "default" : "secondary"}
                className={`${getTagClasses(index)} cursor-pointer transition-all hover:scale-105 ${
                  index % 3 === 0 
                    ? "bg-primary/80 hover:bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Öne Çıkan Yazarlar */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-300 border-muted/60 overflow-hidden">
        <CardHeader className="pb-3 bg-muted/30">
          <CardTitle className="text-lg flex gap-2 items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4 text-primary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {getBlogTranslation('blog.featuredAuthors', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-5">
          {featuredAuthors.map((author) => (
            <div key={author.id} className="space-y-3 group">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  {author.avatar ? (
                    <AvatarImage src={author.avatar} alt={author.name} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary">{getInitials(author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{author.name}</h4>
                  <p className="text-xs text-muted-foreground">{author.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bülten Aboneliği */}
      <Card className="bg-primary/5 border-primary/20 shadow-sm hover:shadow transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-lg flex gap-2 items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
            {t('blog.newsletter')}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-sm text-muted-foreground mb-4">
            {t('blog.newsletterDescription')}
          </p>
          <form className="space-y-3">
            <Input 
              placeholder={t('common.emailPlaceholder')} 
              type="email" 
              required 
              className="bg-background/80 border-primary/20 focus-visible:ring-primary/30"
            />
            <Button 
              type="submit" 
              className="w-full gap-1 bg-primary hover:bg-primary/90"
            >
              {t('blog.subscribe')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}