import { useState } from "react";
import { BlogPostCard } from "./BlogPostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

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

interface BlogListSectionProps {
  blogPosts: BlogPost[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  getPaginationArray: () => (number | string)[];
  formatDate: (date: string) => string;
  getCategoryName: (category: string) => string;
  isLoading: boolean;
}

export function BlogListSection({
  blogPosts,
  activeTab,
  setActiveTab,
  currentPage,
  totalPages,
  goToNextPage,
  goToPrevPage,
  goToPage,
  getPaginationArray,
  formatDate,
  getCategoryName,
  isLoading
}: BlogListSectionProps) {
  const { t } = useTranslation();

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="latest" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {t('blog.recentPosts')}
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {t('blog.popularPosts')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="latest" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[420px] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <BlogPostCard 
                  key={post.id}
                  post={post}
                  getCategoryName={getCategoryName}
                  formatDate={formatDate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">{t('blog.noPosts')}</h3>
              <p className="text-muted-foreground">{t('blog.noPostsDescription')}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="popular" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[420px] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <BlogPostCard 
                  key={post.id}
                  post={post}
                  getCategoryName={getCategoryName}
                  formatDate={formatDate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">{t('blog.noPosts')}</h3>
              <p className="text-muted-foreground">{t('blog.noPostsDescription')}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">{t('blog.prevPage')}</span>
            </Button>
            
            {getPaginationArray().map((page, index) => (
              typeof page === 'number' ? (
                <Button
                  key={index}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className="h-9 w-9 p-0"
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-2">...</span>
              )
            ))}
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">{t('blog.nextPage')}</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}