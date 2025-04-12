import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSlider() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const {
    data: blogs,
    isLoading,
    error
  } = useQuery<Blog[]>({
    queryKey: ["/api/blog"],
    staleTime: 60000 // 1 minute
  });

  // 4 blog per page for all screen sizes
  const itemsPerPage = 4;
  
  // Navigation functions
  const nextSlide = () => {
    if (!blogs || blogs.length === 0) return;
    setCurrentSlide((prev) => 
      prev === Math.ceil(blogs.length / itemsPerPage) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!blogs || blogs.length === 0) return;
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(blogs.length / itemsPerPage) - 1 : prev - 1
    );
  };

  // Calculate visible blogs
  const visibleBlogs = blogs?.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  // Format date based on language
  const formatBlogDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      language.toLowerCase() === 'tr' ? 'tr-TR' : 
      language.toLowerCase() === 'ru' ? 'ru-RU' : 
      language.toLowerCase() === 'ka' ? 'ka-GE' : 'en-US', 
      {year: 'numeric', month: 'short', day: 'numeric'}
    ).format(date);
  };

  // Title and category based on language
  const getBlogTitle = (blog: Blog) => {
    switch (language.toLowerCase()) {
      case 'tr': return blog.titleTR;
      case 'en': return blog.titleEN;
      case 'ru': return blog.titleRU;
      case 'ka': return blog.titleKA;
      default: return blog.titleEN;
    }
  };

  const getBlogCategory = (blog: Blog) => {
    return blog.categoryTR || "Saç Ekimi";
  };

  // Getting a short excerpt 
  const getExcerpt = (blog: Blog) => {
    const content = language.toLowerCase() === 'tr' ? blog.contentTR : 
                   language.toLowerCase() === 'en' ? blog.contentEN :
                   language.toLowerCase() === 'ru' ? blog.contentRU : 
                   language.toLowerCase() === 'ka' ? blog.contentKA : blog.contentEN;
                   
    // Strip HTML tags and limit to 60 characters for very compact view
    const textContent = content?.replace(/<[^>]+>/g, '') || '';
    return textContent.length > 60 ? textContent.substring(0, 60) + '...' : textContent;
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-6 bg-[#f9fafc] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-6 w-60" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col h-full">
                  <Skeleton className="h-24 w-full rounded-t-lg" />
                  <CardContent className="p-2 flex-1 flex flex-col">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-24 mt-auto" />
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !blogs || blogs.length === 0) {
    return null; // Hide section completely if no blogs
  }

  return (
    <section className="py-6 bg-[#f9fafc] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-primary font-medium mb-1">{t("blog.badge")}</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("common.latestFromOurBlog")}</h2>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 border-gray-200 hover:bg-primary/5 text-gray-600"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 border-gray-200 hover:bg-primary/5 text-gray-600"
              onClick={nextSlide}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {/* Responsive grid - 4 per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {visibleBlogs?.map((blog) => (
            <Card key={blog.id} className="border border-gray-100 h-full dark:border-gray-800 hover:shadow-sm transition-shadow">
              <div className="flex flex-col h-full">
                <div className="relative h-24 overflow-hidden rounded-t-lg">
                  <img 
                    src={blog.imageUrl} 
                    alt={getBlogTitle(blog)} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-primary/80 px-1.5 py-0.5 text-[9px] text-white font-medium">
                    {getBlogCategory(blog)}
                  </div>
                </div>
                
                <CardContent className="p-2 flex-1 flex flex-col">
                  <div className="text-[9px] text-gray-500 mb-1">
                    {formatBlogDate(blog.createdAt)}
                  </div>
                  
                  <h3 className="text-xs font-semibold line-clamp-1 mb-1 hover:text-primary transition-colors">
                    <a href={`/${language.toLowerCase()}/blog/${blog.slug}`}>{getBlogTitle(blog)}</a>
                  </h3>
                  
                  <p className="text-gray-500 text-[9px] line-clamp-2 leading-snug flex-1">
                    {getExcerpt(blog)}
                  </p>
                  
                  <a 
                    href={`/${language.toLowerCase()}/blog/${blog.slug}`}
                    className="text-primary hover:text-primary/80 text-[9px] font-medium flex items-center mt-1"
                  >
                    {t("blog.readMore")}
                    <ArrowRight className="h-2 w-2 ml-0.5" />
                  </a>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Pagination indicators */}
        {blogs.length > itemsPerPage && (
          <div className="flex justify-center mt-4 gap-1">
            {Array.from({ length: Math.ceil(blogs.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}