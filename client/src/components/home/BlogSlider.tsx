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
    <section className="py-8 bg-[#f9fafc] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="inline-block px-2.5 py-1 text-[10px] font-medium rounded-full bg-primary/10 text-primary mb-2">
              {t("blog.badge")}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("common.latestFromOurBlog")}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={`/${language.toLowerCase()}/blog`}
              className="text-xs text-primary font-medium hidden sm:flex items-center hover:underline"
            >
              {t("common.viewAllBlogs")}
              <ArrowRight className="h-3 w-3 ml-1" />
            </a>
            <div className="flex gap-1.5">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border-gray-200 bg-white hover:bg-primary/5 text-gray-600 shadow-sm"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border-gray-200 bg-white hover:bg-primary/5 text-gray-600 shadow-sm"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Responsive grid - 4 per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {visibleBlogs?.map((blog) => (
            <Card key={blog.id} className="border border-gray-200/70 dark:border-gray-800 h-full hover:shadow-md transition-all duration-300 hover:border-primary/20 group overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="relative h-36 max-lg:h-28 overflow-hidden">
                  <img 
                    src={blog.imageUrl} 
                    alt={getBlogTitle(blog)} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <div className="bg-primary text-white text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-semibold shadow-sm">
                      {getBlogCategory(blog)}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-2 w-full flex justify-between items-center">
                    <div className="text-[9px] text-white/90 flex items-center">
                      <Calendar className="h-2.5 w-2.5 mr-1 text-white/70" />
                      {formatBlogDate(blog.createdAt)}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3 flex-1 flex flex-col">
                  <a href={`/${language.toLowerCase()}/blog/${blog.slug}`} className="group-hover:text-primary transition-colors">
                    <h3 className="text-sm font-semibold line-clamp-2 mb-1.5">
                      {getBlogTitle(blog)}
                    </h3>
                  </a>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] line-clamp-2 leading-normal flex-1">
                    {getExcerpt(blog)}
                  </p>
                  
                  <div className="flex justify-between items-center mt-2.5 pt-1.5 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[9px] text-gray-500 flex items-center">
                      <User className="h-2.5 w-2.5 mr-1 text-gray-400" />
                      {blog.author || "MyHair Clinic"}
                    </span>
                    
                    <a 
                      href={`/${language.toLowerCase()}/blog/${blog.slug}`}
                      className="text-primary group-hover:text-primary/80 text-[9px] font-medium flex items-center transition-colors"
                    >
                      {t("blog.readMore")}
                      <ArrowRight className="h-2.5 w-2.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Pagination indicators */}
        {blogs.length > itemsPerPage && (
          <div className="flex justify-center mt-6 gap-1.5">
            {Array.from({ length: Math.ceil(blogs.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? "bg-primary w-6" 
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}