import { useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/hooks/use-language";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPostCard } from "./BlogPostCard";

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
};

interface BlogListSectionProps {
  blogPosts: BlogPost[];
  activeTab: string;
  setActiveTab: (value: string) => void;
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
  const { addPrefix } = useLanguage();
  
  // Tab filtreleme
  const filteredPosts = blogPosts;
  
  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="latest" className="flex-1">{t('blog.recentPosts')}</TabsTrigger>
          <TabsTrigger value="popular" className="flex-1">{t('blog.mostPopular')}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isLoading ? (
        // Loading state
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(index => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                formatDate={formatDate}
                getCategoryName={getCategoryName}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {getPaginationArray().map((page, index) => (
                  typeof page === 'number' ? (
                    <Button
                      key={index}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ) : (
                    <span key={index} className="h-8 w-8 flex items-center justify-center">
                      {page}
                    </span>
                  )
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">{t('blog.noPosts')}</p>
        </div>
      )}
    </div>
  );
}