import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { getBlogTranslation } from "@/lib/blogTranslations";
import { Language } from "@shared/types";
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

  // Simplified tag styling - now we'll use consistent styling (white bg for unselected, blue for selected)
  const getTagClasses = (index: number, isSelected: boolean = false) => {
    return isSelected 
      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
      : "bg-white text-foreground border border-gray-200 hover:bg-muted/10";
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
        <CardHeader className="pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-4">
          <CardTitle className="text-base md:text-lg flex gap-1.5 md:gap-2 items-center">
            <Search className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            {getBlogTranslation('blog.search', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 md:px-6 pt-0 pb-3 md:pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              placeholder={getBlogTranslation('blog.searchPlaceholder', language as Language)}
              className="pl-3 border-primary/20 focus-visible:ring-primary/20 text-xs md:text-sm h-8 md:h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full text-muted-foreground hover:text-primary">
              <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Kategoriler */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-300 border-muted/60 overflow-hidden blog-sidebar-card blog-categories-card">
        <CardHeader className="pb-2 md:pb-3 bg-muted/30 px-3 md:px-6 pt-3 md:pt-4">
          <CardTitle className="text-base md:text-lg flex gap-1.5 md:gap-2 items-center">
            <Tag className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            {getBlogTranslation('blog.categoriesTitle', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 md:pt-4 px-2 md:px-3 pb-3 md:pb-4">
          <div className="space-y-1 md:space-y-1.5">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              size="sm"
              className={`w-full justify-start rounded-md text-xs md:text-sm font-medium h-7 md:h-8 ${
                selectedCategory === null 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "hover:bg-muted/80 hover:text-primary"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              {getBlogTranslation('blog.allCategories', language as Language)}
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start rounded-md text-xs md:text-sm font-medium h-7 md:h-8 ${
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
        <CardHeader className="pb-2 md:pb-3 bg-muted/30 px-3 md:px-6 pt-3 md:pt-4">
          <CardTitle className="text-base md:text-lg flex gap-1.5 md:gap-2 items-center">
            <Tag className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
            {getBlogTranslation('blog.popularTags', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 md:pt-4 px-3 md:px-6 pb-3 md:pb-4">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {popularTags && Array.isArray(popularTags) && popularTags.length > 0 && popularTags.map((tag, index) => {
              const isSelected = index % 3 === 0; // This is just for demonstration, replace with actual selection logic
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 py-0.5 h-5 md:h-6 text-[10px] md:text-xs ${getTagClasses(index, isSelected)}`}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Öne Çıkan Yazarlar */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-300 border-muted/60 overflow-hidden">
        <CardHeader className="pb-2 md:pb-3 bg-muted/30 px-3 md:px-6 pt-3 md:pt-4">
          <CardTitle className="text-base md:text-lg flex gap-1.5 md:gap-2 items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {getBlogTranslation('blog.featuredAuthors', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 md:pt-4 px-3 md:px-6 pb-3 md:pb-4 space-y-3 md:space-y-5">
          {featuredAuthors.map((author) => (
            <div key={author.id} className="space-y-2 md:space-y-3 group">
              <div className="flex items-center gap-2 md:gap-3">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-1 md:ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  {author.avatar ? (
                    <AvatarImage src={author.avatar} alt={author.name} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] md:text-xs">{getInitials(author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xs md:text-sm font-semibold group-hover:text-primary transition-colors">{author.name}</h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{author.title}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bülten Aboneliği */}
      <Card className="bg-primary/5 border-primary/20 shadow-sm hover:shadow transition-shadow duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50"></div>
        <CardHeader className="relative z-10 pb-2 md:pb-3 px-3 md:px-6 pt-3 md:pt-4">
          <CardTitle className="text-base md:text-lg flex gap-1.5 md:gap-2 items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
            {getBlogTranslation('blog.newsletter', language as Language)}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 px-3 md:px-6 pb-3 md:pb-4">
          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
            {getBlogTranslation('blog.newsletterDescription', language as Language)}
          </p>
          <form className="space-y-2 md:space-y-3">
            <Input 
              placeholder={getBlogTranslation('common.emailPlaceholder', language as Language)} 
              type="email" 
              required 
              className="bg-background/80 border-primary/20 focus-visible:ring-primary/30 text-xs md:text-sm h-8 md:h-9"
            />
            <Button 
              type="submit" 
              className="w-full gap-1 bg-primary hover:bg-primary/90 h-8 md:h-9 text-xs md:text-sm"
            >
              {getBlogTranslation('blog.subscribe', language as Language)}
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}