import { useTranslation } from "@/hooks/use-translation";
import { useState } from "react";
import { BlogPostCard } from "./BlogPostCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Blog Post tipi
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
  
  // Blog gönderisi yüklenirken görünecek iskelet yükleyici
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="space-y-3">
        <Skeleton className="h-[250px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2 w-16 mt-1" />
              </div>
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
    ));
  };
  
  // Blog yazısı yoksa gösterilecek boş durum
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium">{t('blog.noPosts')}</h3>
      <p className="text-muted-foreground mt-2">
        {t('blog.noPosts')}
      </p>
    </div>
  );
  
  return (
    <div className="space-y-8">
      {/* Sekmeler - En son, En popüler */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-muted/50 p-1 rounded-lg shadow-sm">
          <TabsTrigger 
            value="latest" 
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
          >
            {t('blog.newest')}
          </TabsTrigger>
          <TabsTrigger 
            value="popular" 
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
          >
            {t('blog.mostPopular')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Blog yazıları listesi */}
      <div className="grid grid-cols-1 gap-8">
        {isLoading ? (
          renderSkeletons()
        ) : blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              formatDate={formatDate}
              getCategoryName={getCategoryName}
            />
          ))
        ) : (
          renderEmptyState()
        )}
      </div>
      
      {/* Sayfalama kontrolleri */}
      {totalPages > 1 && !isLoading && (
        <div className="flex items-center justify-center gap-2 pt-10">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="rounded-full h-9 w-9 hover:bg-muted/80 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {getPaginationArray().map((page, i) => {
            if (typeof page === 'string') {
              return (
                <Button
                  key={`ellipsis-${i}`}
                  variant="ghost"
                  size="icon"
                  disabled
                  className="rounded-full h-9 w-9"
                >
                  ...
                </Button>
              );
            }
            
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`rounded-full h-9 w-9 ${
                  currentPage === page 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-muted/80 hover:text-primary transition-colors"
                }`}
              >
                {page}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="rounded-full h-9 w-9 hover:bg-muted/80 hover:text-primary transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}