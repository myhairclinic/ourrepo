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
  Calendar,
  MessageCircle,
  Bookmark
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

interface FeaturedPostCardProps {
  post: BlogPost;
  getCategoryName: (category: string) => string;
  formatDate: (date: string) => string;
}

export function FeaturedPostCard({ post, getCategoryName, formatDate }: FeaturedPostCardProps) {
  const { language, addPrefix } = useLanguage();
  const { t } = useTranslation();

  return (
    <Card className="overflow-hidden h-full group transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="relative h-full min-h-[280px] overflow-hidden">
          <CardBackground src={post.imageUrl} />
          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
            <Badge className="self-start bg-primary/90 hover:bg-primary text-white backdrop-blur-sm border-0">
              {getCategoryName(post.category)}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col p-6">
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-10 w-10 border border-border">
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
              <div className="flex text-xs text-muted-foreground gap-3">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readingTime} {post.readingTime === 1 ? t('blog.minute') : t('blog.minutes')}
                </span>
              </div>
            </div>
          </div>
          
          <Link href={addPrefix(`/blog/${post.slug}`)}>
            <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
              {post[`title${language.toUpperCase()}` as keyof BlogPost] as string}
            </h3>
          </Link>
          
          <p className="text-muted-foreground mb-5 line-clamp-3 flex-grow">
            {post[`summary${language.toUpperCase()}` as keyof BlogPost] as string}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex space-x-3 text-sm text-muted-foreground">
              <span className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.viewCount || 0}
              </span>
              <Button size="sm" variant="ghost" className="p-0 h-auto">
                <Bookmark className="h-4 w-4" />
              </Button>
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
          </div>
        </div>
      </div>
    </Card>
  );
}