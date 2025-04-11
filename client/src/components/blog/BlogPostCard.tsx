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
import { Clock, Calendar, Eye } from "lucide-react";

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

interface BlogPostCardProps {
  post: BlogPost;
  formatDate: (date: string) => string;
  getCategoryName: (category: string) => string;
}

export function BlogPostCard({ post, formatDate, getCategoryName }: BlogPostCardProps) {
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
    <Card className="group overflow-hidden rounded-xl transition-all duration-200 hover:shadow-md h-full flex flex-col">
      <div className="absolute inset-0 z-20">
        <Link href={addPrefix(`/blog/${post.slug}`)}>
          <span className="sr-only">{title}</span>
          <span className="absolute inset-0"></span>
        </Link>
      </div>
      
      <div className="relative h-48">
        <CardBackground src={post.imageUrl || '/images/blog/default-blog.jpg'} />
        <CardHeader className="relative z-10 text-white">
          <div className="flex justify-between items-start">
            <Badge 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
            >
              {getCategoryName(post.category)}
            </Badge>
          </div>
          <CardTitle className="text-white drop-shadow-md mt-auto">{title}</CardTitle>
        </CardHeader>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <p className="text-muted-foreground line-clamp-3 text-sm">{summary}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          
          <div className="flex items-center ml-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readingTime} {t('blog.minutes')}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <Eye className="h-3 w-3 mr-1" />
          <span>{post.viewCount} {t('blog.views')}</span>
        </div>
      </CardFooter>
      
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-md">
          {t('common.readMore')} →
        </span>
      </div>
    </Card>
  );
}