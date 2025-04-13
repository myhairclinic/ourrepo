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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl border border-border/50 hover:border-primary/20 bg-gradient-to-b from-card to-card/90 hover:from-card/80 hover:to-card blog-post-card rounded-lg md:rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="relative md:col-span-5 aspect-[16/9] md:aspect-auto overflow-hidden md:rounded-l-xl rounded-t-lg md:rounded-t-none">
          <div className="absolute inset-0 z-20">
            <Link href={blogUrl}>
              <span className="sr-only">{title}</span>
              <span className="absolute inset-0"></span>
            </Link>
          </div>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img 
            src={post.imageUrl || '/images/blog/default-blog.jpg'} 
            alt={title}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          <div className="absolute top-3 md:top-4 left-3 md:left-4 z-10">
            <Badge 
              variant="secondary" 
              className="bg-primary text-primary-foreground shadow-md hover:bg-primary/90 backdrop-blur-sm text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1"
            >
              {getCategoryName(post.category)}
            </Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-[5] opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="md:col-span-7 p-4 md:p-6 relative">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          
          <CardHeader className="p-0 pb-3 md:pb-4 relative z-10">
            <div className="mb-2 md:mb-3 flex flex-wrap items-center gap-1.5 md:gap-3 text-[10px] md:text-xs text-muted-foreground">
              <span className="flex items-center bg-muted/70 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full shadow-sm">
                <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1 text-primary" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center bg-muted/70 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full shadow-sm">
                <Clock className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1 text-primary" />
                {post.readingTime} {t('blog.minutes')}
              </span>
              <span className="flex items-center bg-muted/70 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full shadow-sm">
                <Eye className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1 text-primary" />
                {post.viewCount} {t('blog.views')}
              </span>
            </div>
            <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors duration-300">
              <Link href={blogUrl}>
                <span className="bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-primary hover:to-primary/70 transition-all line-clamp-2">{title}</span>
              </Link>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 pb-3 md:pb-5 relative z-10">
            <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 text-xs md:text-sm leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">{summary}</p>
            
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-2 md:mt-3 flex flex-wrap gap-1.5 md:gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-[10px] md:text-xs bg-background/80 backdrop-blur-sm hover:bg-primary/10 transition-colors duration-300 border-primary/20 px-1.5 md:px-2 py-0.5 h-5 md:h-auto"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-0 flex items-center justify-between relative z-10 mt-auto">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Avatar className="h-7 w-7 md:h-9 md:w-9 ring-1 md:ring-2 ring-background shadow-sm transition-transform group-hover:scale-105 duration-300">
                {post.authorAvatar ? (
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] md:text-xs">{getInitials(post.author)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs md:text-sm font-medium leading-none">{post.author}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">{post.authorTitle}</p>
              </div>
            </div>
            
            <Link href={blogUrl}>
              <Button
                size="sm"
                variant="secondary"
                className="gap-1 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 h-7 md:h-9 text-xs md:text-sm px-2 md:px-3"
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="relative z-10">{t('common.readMore')}</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1 duration-300" />
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}