import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Tag, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";

interface BlogAuthor {
  id: number;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

interface BlogSidebarProps {
  popularTags: string[];
  featuredAuthors: BlogAuthor[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  allCategories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  getCategoryName: (category: string) => string;
}

export function BlogSidebar({
  popularTags,
  featuredAuthors,
  searchQuery,
  setSearchQuery,
  allCategories,
  selectedCategory,
  setSelectedCategory,
  getCategoryName
}: BlogSidebarProps) {
  const { t } = useTranslation();
  const { addPrefix } = useLanguage();
  
  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{t('blog.search')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('blog.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{t('blog.categoriesTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              className="justify-start"
              onClick={() => setSelectedCategory(null)}
            >
              {t('blog.allCategories')}
            </Button>
            {allCategories.map((category) => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Popular Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{t('blog.popularTags')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => setSearchQuery(tag)}>
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Featured Authors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{t('blog.featuredAuthors')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {featuredAuthors.map((author) => (
            <div key={author.id} className="flex gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-sm">{author.name}</h4>
                <p className="text-xs text-muted-foreground">{author.title}</p>
                <p className="text-xs mt-1 line-clamp-2">{author.bio}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Newsletter */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">{t('blog.subscribeNewsletter')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t('blog.subscribeDescription')}</p>
          <form className="space-y-3">
            <Input 
              placeholder={t('blog.emailPlaceholder')} 
              type="email"
            />
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              {t('blog.subscribe')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}