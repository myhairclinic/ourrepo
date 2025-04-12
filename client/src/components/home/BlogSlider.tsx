import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { useQuery } from "@tanstack/react-query";
import { Blog } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, User, Tag } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function BlogSlider() {
  const { language } = useLanguage();
  const { t, formatCurrency } = useTranslation(language);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  
  const {
    data: blogs,
    isLoading,
    error
  } = useQuery<Blog[]>({
    queryKey: ["/api/blog"],
    staleTime: 60000 // 1 minute
  });

  // Responsive slider - adjusts items per view based on screen size
  function getItemsPerPage() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  // Update items per page on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Format date using our translation utility
  const formatBlogDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      language.toLowerCase() === 'tr' ? 'tr-TR' : 
      language.toLowerCase() === 'ru' ? 'ru-RU' : 
      language.toLowerCase() === 'ka' ? 'ka-GE' : 'en-US', 
      {year: 'numeric', month: 'long', day: 'numeric'}
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
                   
    // Strip HTML tags and limit to 100 characters
    const textContent = content?.replace(/<[^>]+>/g, '') || '';
    return textContent.length > 120 ? textContent.substring(0, 120) + '...' : textContent;
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-12 overflow-hidden bg-[#f9fafc] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionTitle
            title={t("common.latestFromOurBlog")}
            subtitle={t("blog.exploreRecentArticles")}
            centered={true}
          />
          
          <div className="relative mt-10">
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="min-w-[320px] w-full max-w-sm flex-shrink-0">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardContent className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
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
    <section className="py-12 overflow-hidden bg-[#f9fafc] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start mb-12">
          <div className="mb-3 px-4 py-1 text-sm font-medium rounded-full border-primary/30 bg-primary/5 shadow-sm">
            {t("blog.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
            {t("common.latestFromOurBlog")}
          </h2>
          <p className="text-foreground/70 max-w-xl text-base font-light leading-relaxed">
            {t("blog.exploreRecentArticles")}
          </p>
            
          <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-primary/30"></div>
            <div className="w-2 h-2 rounded-full bg-primary/50"></div>
            <div className="w-2 h-2 rounded-full bg-primary/70"></div>
          </div>
        </div>
        
        <div className="relative mt-10">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 px-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white dark:bg-gray-800 shadow-md hover:bg-primary/10 text-primary"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white dark:bg-gray-800 shadow-md hover:bg-primary/10 text-primary"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Blog cards */}
          <div className="flex gap-6 overflow-hidden">
            {visibleBlogs?.map((blog) => (
              <Card key={blog.id} className="min-w-[320px] w-full max-w-sm flex-shrink-0 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={blog.imageUrl} 
                    alt={getBlogTitle(blog)} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                    <div className="flex items-center text-white text-sm gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{getBlogCategory(blog)}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatBlogDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
                    <a href={`/${language.toLowerCase()}/blog/${blog.slug}`}>{getBlogTitle(blog)}</a>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {getExcerpt(blog)}
                  </p>
                  
                  <div className="mt-4">
                    <a 
                      href={`/${language.toLowerCase()}/blog/${blog.slug}`}
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                    >
                      {t("blog.readMore")}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination indicators */}
          {blogs.length > itemsPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.ceil(blogs.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === index ? "bg-primary w-6" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}