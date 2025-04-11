import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

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
  const { language, addPrefix } = useLanguage();
  
  // Handle email subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;
    
    // Implement subscription logic here (e.g. API call)
    console.log(`Subscribing email: ${email}`);
    
    // Reset the form
    form.reset();
    
    // Show success message (in a real app, you'd want to use a toast notification)
    alert('Successfully subscribed!');
  };
  
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative">
        <h3 className="text-lg font-medium mb-4">{t('blog.search')}</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('blog.searchPlaceholder')}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">{t('blog.categoriesTitle')}</h3>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className="mr-2 mb-2"
            onClick={() => setSelectedCategory(null)}
          >
            {t('blog.allCategories')}
          </Button>
          
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="mr-2 mb-2"
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryName(category)}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Popular Tags */}
      <div>
        <h3 className="text-lg font-medium mb-4">{t('blog.popularTags')}</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => setSearchQuery(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Featured Authors */}
      <div>
        <h3 className="text-lg font-medium mb-4">{t('blog.featuredAuthors')}</h3>
        <div className="space-y-4">
          {featuredAuthors.map((author) => (
            <div key={author.id} className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{author.name}</h4>
                <p className="text-sm text-muted-foreground">{author.title}</p>
                <p className="text-xs mt-1">{author.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Subscription */}
      <div className="bg-secondary/30 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">{t('blog.subscribeNewsletter')}</h3>
        <p className="text-sm text-muted-foreground mb-4">{t('blog.subscribeDescription')}</p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <Input 
            name="email"
            type="email"
            placeholder={t('blog.emailPlaceholder')}
            required
          />
          <Button type="submit" className="w-full">
            {t('blog.subscribe')}
          </Button>
        </form>
      </div>
    </div>
  );
}