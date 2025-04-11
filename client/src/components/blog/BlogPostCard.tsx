import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { 
  Card, 
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
  
  const blogUrl = addPrefix(`/blog/${post.slug}`);
  
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="relative md:col-span-4 aspect-[16/9] md:aspect-auto">
          <div className="absolute inset-0 z-20">
            <Link href={blogUrl}>
              <span className="sr-only">{title}</span>
              <span className="absolute inset-0"></span>
            </Link>
          </div>
          <img 
            src={post.imageUrl || '/images/blog/default-blog.jpg'} 
            alt={title}
            className="object-cover w-full h-full" 
          />
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="bg-white/80 hover:bg-white/90 text-primary">
              {getCategoryName(post.category)}
            </Badge>
          </div>
        </div>
        
        <div className="md:col-span-8 p-6">
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
            <CardTitle className="text-xl">
              <Link href={blogUrl}>
                <span className="hover:text-primary transition-colors">{title}</span>
              </Link>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 pb-4">
            <p className="text-muted-foreground line-clamp-3">{summary}</p>
          </CardContent>
          
          <CardFooter className="p-0 flex items-center justify-between">
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
            
            <Link href={blogUrl}>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1 text-primary group-hover:bg-primary/5"
              >
                {t('common.readMore')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}