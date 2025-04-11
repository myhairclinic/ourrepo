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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/50 hover:border-primary/20 bg-card/50 hover:bg-card">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="relative md:col-span-5 aspect-[16/9] md:aspect-auto overflow-hidden">
          <div className="absolute inset-0 z-20">
            <Link href={blogUrl}>
              <span className="sr-only">{title}</span>
              <span className="absolute inset-0"></span>
            </Link>
          </div>
          <img 
            src={post.imageUrl || '/images/blog/default-blog.jpg'} 
            alt={title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
              {getCategoryName(post.category)}
            </Badge>
          </div>
        </div>
        
        <div className="md:col-span-7 p-6">
          <CardHeader className="p-0 pb-4">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center bg-muted/50 px-2 py-1 rounded-full">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center bg-muted/50 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3 mr-1" />
                {post.readingTime} {t('blog.minutes')}
              </span>
              <span className="flex items-center bg-muted/50 px-2 py-1 rounded-full">
                <Eye className="h-3 w-3 mr-1" />
                {post.viewCount} {t('blog.views')}
              </span>
            </div>
            <CardTitle className="text-xl font-bold">
              <Link href={blogUrl}>
                <span className="hover:text-primary transition-colors line-clamp-2">{title}</span>
              </Link>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 pb-5">
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{summary}</p>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs bg-background">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="p-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 ring-2 ring-background">
                {post.authorAvatar ? (
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(post.author)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorTitle}</p>
              </div>
            </div>
            
            <Link href={blogUrl}>
              <Button
                size="sm"
                variant="secondary"
                className="gap-1 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground"
              >
                {t('common.readMore')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}