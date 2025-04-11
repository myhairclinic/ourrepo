import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { 
  Card, 
  CardBackground,
  CardContent, 
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
  
  return (
    <Card className="group overflow-hidden rounded-xl transition-all duration-200 hover:shadow-md flex flex-col md:flex-row h-full">
      <div className="relative min-h-[300px] md:min-h-0 md:w-1/2">
        <div className="absolute inset-0 z-20">
          <Link href={addPrefix(`/blog/${post.slug}`)}>
            <span className="sr-only">{title}</span>
            <span className="absolute inset-0"></span>
          </Link>
        </div>
        
        <CardBackground src={post.imageUrl || '/images/blog/default-blog.jpg'} />
        <div className="absolute top-4 left-4 z-10">
          <Badge 
            variant="secondary" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
          >
            {getCategoryName(post.category)}
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-col md:w-1/2 p-6">
        <CardHeader className="p-0 pb-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
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
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 pb-4 flex-grow">
          <p className="text-muted-foreground line-clamp-4">{summary}</p>
        </CardContent>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {post.authorAvatar ? (
                <AvatarImage src={post.authorAvatar} alt={post.author} />
              ) : null}
              <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.authorTitle}</p>
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="gap-1 text-primary group-hover:bg-primary/5"
          >
            {t('common.readMore')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}