import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardFooter, CardBackground } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowRight, 
  Clock, 
  Heart, 
  Bookmark, 
  Eye, 
  TrendingUp,
  Calendar
} from "lucide-react";

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
  getCategoryName: (category: string) => string;
  formatDate: (date: string) => string;
}

export function BlogPostCard({ post, getCategoryName, formatDate }: BlogPostCardProps) {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden h-full group transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20 relative">
      <Link href={addPrefix(`/blog/${post.slug}`)}>
        <div className="relative h-56 overflow-hidden">
          <CardBackground src={post.imageUrl} />
          <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
            <div className="flex justify-between">
              <Badge className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm border-0">
                {getCategoryName(post.category)}
              </Badge>
              <Badge variant="outline" className="bg-black/50 text-white backdrop-blur-sm border-0">
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readingTime} {post.readingTime === 1 ? t('blog.minute') : t('blog.minutes')}</span>
              </Badge>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-md line-clamp-2 mb-2">
                {post[`title${language.toUpperCase()}` as keyof BlogPost] as string}
              </h3>
              <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md">
                {post[`summary${language.toUpperCase()}` as keyof BlogPost] as string}
              </p>
            </div>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border border-border">
              {post.authorAvatar ? (
                <AvatarImage src={post.authorAvatar} alt={post.author} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  {post.author.substring(0, 1)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Views</span>
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Like</span>
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Bookmark className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 text-primary mr-1" />
          <span className="text-xs font-medium">{post.viewCount || 0} {t('blog.views')}</span>
        </div>
        <Button 
          variant="default" 
          size="sm"
          className="group/button flex items-center gap-1"
          asChild
        >
          <Link href={addPrefix(`/blog/${post.slug}`)}>
            {t('common.readMore')}
            <ArrowRight className="h-3.5 w-3.5 group-hover/button:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}