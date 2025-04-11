import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { 
  Card, 
  CardBackground, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Eye, ArrowRight } from "lucide-react";

interface BlogPost {
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
}

interface FeaturedPostCardProps {
  post: BlogPost;
  formatDate: (date: string) => string;
  getCategoryName: (category: string) => string;
}

export function FeaturedPostCard({ post, formatDate, getCategoryName }: FeaturedPostCardProps) {
  const { t } = useTranslation();
  const { language, addPrefix } = useLanguage();
  
  // Title and summary based on language
  const title = post[`title${language.toUpperCase() as 'TR' | 'EN' | 'RU' | 'KA'}`] || post.titleEN;
  const summary = post[`summary${language.toUpperCase() as 'TR' | 'EN' | 'RU' | 'KA'}`] || post.summaryEN;
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const blogUrl = addPrefix(`/blog/${post.slug}`);
  
  return (
    <Card className="group relative h-[500px] overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-xl featured-post-card before:absolute before:inset-0 before:z-10 before:bg-gradient-to-t before:from-black/90 before:via-black/60 before:to-transparent before:opacity-70 before:group-hover:opacity-90 before:transition-all before:duration-500">
      {/* Görsel arka planı */}
      <div className="absolute inset-0 z-0">
        <img 
          src={post.imageUrl || '/images/blog/default-blog.jpg'} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:rotate-1 scale-105" 
        />
        
        {/* Modern arka plan desenleri */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay"></div>
        
        {/* Ek Efektler */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-primary/40 to-primary/5 transition-opacity duration-700"></div>
      </div>
      
      <div className="relative z-20 h-full flex flex-col justify-end text-white p-2">
        <div className="absolute inset-0">
          <Link href={blogUrl}>
            <span className="sr-only">{title}</span>
            <span className="absolute inset-0"></span>
          </Link>
        </div>
        
        {/* Öne çıkan etiketi - Animasyonlu */}
        <div className="absolute top-5 right-5">
          <div className="relative">
            <Badge className="bg-primary text-white shadow-lg px-3 py-1 text-sm font-medium">
              {t('blog.featured')}
            </Badge>
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 z-[-1]"></span>
          </div>
        </div>
        
        {/* Kategori etiketi - Sol üstte */}
        <div className="absolute top-5 left-5">
          <Badge 
            variant="secondary" 
            className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm shadow-md border border-white/20 transition-all duration-300"
          >
            {getCategoryName(post.category)}
          </Badge>
        </div>
        
        <CardHeader className="pt-0 mt-auto pb-3 relative px-6">
          {/* Yeni: Dekoratif süs çizgisi */}
          <div className="absolute left-0 top-0 w-1 h-20 bg-gradient-to-b from-transparent via-primary to-transparent opacity-70 rounded-full"></div>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 mb-4 mt-2">
            <span className="flex items-center bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
              <Calendar className="h-3 w-3 mr-1 text-primary" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
              <Clock className="h-3 w-3 mr-1 text-primary" />
              {post.readingTime} {t('blog.minutes')}
            </span>
            <span className="flex items-center bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 shadow-sm">
              <Eye className="h-3 w-3 mr-1 text-primary" />
              {post.viewCount} {t('blog.views')}
            </span>
          </div>
          
          <CardTitle className="text-3xl font-bold mb-4 group-hover:transform group-hover:-translate-y-1 transition-all duration-300 relative">
            <Link href={blogUrl}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 group-hover:to-primary/90 leading-tight block text-shadow-sm">{title}</span>
            </Link>
            {/* Dekoratif çizgi */}
            <div className="h-1 w-16 bg-primary/70 rounded-full mt-4 group-hover:w-32 transition-all duration-500"></div>
          </CardTitle>
          
          {/* Etiketler - Yeni konum */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-black/40 backdrop-blur-sm border-white/30 text-white shadow-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pb-3">
          <p className="text-white/80 group-hover:text-white/90 line-clamp-3 text-base leading-relaxed transition-colors duration-300">{summary}</p>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 flex items-center justify-between border-t border-white/10 pt-4 mt-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white/20 group-hover:ring-primary/40 shadow-md transition-all duration-300">
              {post.authorAvatar ? (
                <AvatarImage src={post.authorAvatar} alt={post.author} />
              ) : null}
              <AvatarFallback className="bg-primary/80 text-white">{getInitials(post.author)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none text-white">{post.author}</p>
              <p className="text-xs text-white/70">{post.authorTitle}</p>
            </div>
          </div>
          
          <Link href={blogUrl}>
            <Button
              size="sm"
              className="gap-1 bg-primary/90 hover:bg-primary text-white shadow-md group-hover:translate-x-1 transition-all duration-300 group-hover:shadow-lg"
            >
              <span className="relative overflow-hidden inline-block">
                <span className="relative z-10">{t('common.readMore')}</span>
              </span>
              <ArrowRight className="h-4 w-4 group-hover:animate-bounce-x" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}