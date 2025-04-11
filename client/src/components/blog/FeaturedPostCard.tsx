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
    <Card className="group relative h-[460px] overflow-hidden transition-all duration-300 hover:shadow-xl rounded-xl">
      {/* Görsel arka planı */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1">
        <img 
          src={post.imageUrl || '/images/blog/default-blog.jpg'} 
          alt={title}
          className="object-cover w-full h-full" 
        />
        {/* Renk gradyanı katmanı */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end text-white">
        <div className="absolute inset-0 z-20">
          <Link href={blogUrl}>
            <span className="sr-only">{title}</span>
            <span className="absolute inset-0"></span>
          </Link>
        </div>
        
        {/* Öne çıkan etiketi */}
        <div className="absolute top-5 right-5 z-20">
          <Badge className="bg-primary text-white shadow-lg px-3 py-1 text-sm font-medium animate-pulse">
            {t('blog.featured')}
          </Badge>
        </div>
        
        <CardHeader className="pt-0 mt-auto pb-3">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/90 hover:bg-primary text-white z-10 shadow-md">
              {getCategoryName(post.category)}
            </Badge>
            
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-black/40 backdrop-blur-sm border-white/30 text-white z-10 shadow-sm group-hover:bg-black/60 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/90 mb-4">
            <span className="flex items-center bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              {post.readingTime} {t('blog.minutes')}
            </span>
            <span className="flex items-center bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
              <Eye className="h-3 w-3 mr-1" />
              {post.viewCount} {t('blog.views')}
            </span>
          </div>
          
          <CardTitle className="text-3xl font-bold text-white mb-3 drop-shadow-sm group-hover:text-primary/90 transition-colors">
            <Link href={blogUrl}>
              <span>{title}</span>
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-6 pb-3">
          <p className="text-white/90 line-clamp-3 text-base leading-relaxed">{summary}</p>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 flex items-center justify-between border-t border-white/10 pt-4 mt-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/30 shadow-md">
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
              className="gap-1 bg-primary/90 hover:bg-primary text-white z-10 shadow-md group-hover:translate-x-1 transition-transform"
            >
              {t('common.readMore')}
              <ArrowRight className="h-4 w-4 animate-pulse-slow" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}