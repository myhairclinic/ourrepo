import { useTranslation } from "@/hooks/use-translation";
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
      <Card>
        <CardHeader>
          <CardTitle>{t('blog.search')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('blog.searchPlaceholder')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </CardContent>
      </Card>

      {/* Kategoriler */}
      <Card>
        <CardHeader>
          <CardTitle>{t('blog.categoriesTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Button
              variant={selectedCategory === null ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedCategory(null)}
            >
              {t('blog.allCategories')}
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Etiketler */}
      <Card>
        <CardHeader>
          <CardTitle>{t('blog.popularTags')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className={getTagClasses(index)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Öne Çıkan Yazarlar */}
      <Card>
        <CardHeader>
          <CardTitle>{t('blog.featuredAuthors')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredAuthors.map((author) => (
            <div key={author.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {author.avatar ? (
                    <AvatarImage src={author.avatar} alt={author.name} />
                  ) : null}
                  <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold">{author.name}</h4>
                  <p className="text-xs text-muted-foreground">{author.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{author.bio}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bülten Aboneliği */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>{t('blog.newsletter')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {t('blog.newsletterDescription')}
          </p>
          <form className="space-y-3">
            <Input placeholder={t('common.emailPlaceholder')} type="email" required />
            <Button type="submit" className="w-full gap-1">
              {t('blog.subscribe')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}