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
    <Card className="group relative h-[450px] overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardBackground src={post.imageUrl || '/images/blog/default-blog.jpg'} />
      
      <div className="relative z-10 h-full flex flex-col justify-end text-white">
        <div className="absolute inset-0 z-20">
          <Link href={blogUrl}>
            <span className="sr-only">{title}</span>
            <span className="absolute inset-0"></span>
          </Link>
        </div>
        
        <CardHeader className="pt-0 mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/80 hover:bg-white/90 text-primary z-10">
              {getCategoryName(post.category)}
            </Badge>
            
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="bg-black/20 backdrop-blur-sm border-white/30 text-white z-10">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-white/80 mb-3">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readingTime} {t('blog.minutes')}
            </span>
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {post.viewCount} {t('blog.views')}
            </span>
          </div>
          
          <CardTitle className="text-2xl text-white mb-2">
            <Link href={blogUrl}>
              <span className="hover:text-white/90 transition-colors">{title}</span>
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-6 pb-2">
          <p className="text-white/80 line-clamp-2">{summary}</p>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-white/20">
              {post.authorAvatar ? (
                <AvatarImage src={post.authorAvatar} alt={post.author} />
              ) : null}
              <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none text-white">{post.author}</p>
              <p className="text-xs text-white/70">{post.authorTitle}</p>
            </div>
          </div>
          
          <Link href={blogUrl}>
            <Button
              size="sm"
              variant="outline"
              className="gap-1 bg-black/20 backdrop-blur-sm text-white border-white/30 hover:bg-black/40 hover:text-white z-10"
            >
              {t('common.readMore')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}