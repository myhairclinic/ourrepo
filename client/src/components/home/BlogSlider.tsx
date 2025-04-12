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
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
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
      <section className="py-8 overflow-hidden bg-[#f9fafc] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-6">
            <Skeleton className="h-6 w-24 mb-2 rounded-full" />
            <Skeleton className="h-8 w-64 mb-2" />
            <div className="flex gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            </div>
          </div>
          
          <div className="relative mt-4">
            <div className="flex gap-2 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="min-w-[220px] w-full flex-shrink-0">
                  <Skeleton className="h-28 w-full rounded-t-lg" />
                  <CardContent className="p-2">
                    <div className="flex gap-2 mb-1">
                      <Skeleton className="h-2.5 w-16" />
                      <Skeleton className="h-2.5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-2.5 w-full mb-0.5" />
                    <Skeleton className="h-2.5 w-full mb-0.5" />
                    <Skeleton className="h-2.5 w-14 mt-1.5" />
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
    <section className="py-8 overflow-hidden bg-[#f9fafc] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start mb-6">
          <div className="mb-2 px-3 py-1 text-xs font-medium rounded-full border-primary/30 bg-primary/5 shadow-sm">
            {t("blog.badge")}
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 leading-tight">
            {t("common.latestFromOurBlog")}
          </h2>
          <div className="flex gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70"></div>
          </div>
        </div>
        
        <div className="relative mt-4">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 px-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white dark:bg-gray-800 shadow-md hover:bg-primary/10 text-primary border border-primary/10 h-8 w-8"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white dark:bg-gray-800 shadow-md hover:bg-primary/10 text-primary border border-primary/10 h-8 w-8"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Blog cards */}
          <div className="flex gap-2 overflow-hidden">
            {visibleBlogs?.map((blog) => (
              <Card key={blog.id} className="min-w-[220px] w-full flex-shrink-0 transform transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-800">
                <div className="relative h-28 overflow-hidden rounded-t-lg">
                  <img 
                    src={blog.imageUrl} 
                    alt={getBlogTitle(blog)} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1.5">
                    <div className="flex items-center text-white text-[10px] gap-0.5">
                      <Tag className="h-2.5 w-2.5" />
                      <span>{getBlogCategory(blog)}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-2">
                  <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400 mb-1 gap-2">
                    <div className="flex items-center gap-0.5">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{formatBlogDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <User className="h-2.5 w-2.5" />
                      <span>{blog.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold line-clamp-2 mb-1 hover:text-primary transition-colors">
                    <a href={`/${language.toLowerCase()}/blog/${blog.slug}`}>{getBlogTitle(blog)}</a>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-[10px] line-clamp-2 leading-relaxed">
                    {getExcerpt(blog)}
                  </p>
                  
                  <div className="mt-1.5">
                    <a 
                      href={`/${language.toLowerCase()}/blog/${blog.slug}`}
                      className="text-primary hover:text-primary/80 font-medium text-[10px] flex items-center"
                    >
                      {t("blog.readMore")}
                      <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Pagination indicators */}
          {blogs.length > itemsPerPage && (
            <div className="flex justify-start mt-4 gap-1.5">
              {Array.from({ length: Math.ceil(blogs.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-primary w-5" : "bg-gray-300 dark:bg-gray-600"
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