import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Language } from "@shared/types";

export interface GalleryItem {
  id: number;
  type: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  descriptionTR: string;
  descriptionEN: string;
  descriptionRU: string;
  descriptionKA: string;
  category?: string;
}

export interface BeforeAfterGalleryProps {
  items: GalleryItem[];
  title?: string;
}

export function BeforeAfterGallery({ 
  items,
  title = ""
}: BeforeAfterGalleryProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 6));
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [categories, setCategories] = useState<string[]>(() => {
    const uniqueCategories = items
      .filter(item => item.category)
      .map(item => item.category as string);
    const allCategories = ["All", ...Array.from(new Set(uniqueCategories))];
    return allCategories;
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get localized description based on language
  const getLocalizedDescription = (item: GalleryItem) => {
    switch (language) {
      case Language.Turkish:
        return item.descriptionTR;
      case Language.English:
        return item.descriptionEN;
      case Language.Russian:
        return item.descriptionRU;
      case Language.Georgian:
        return item.descriptionKA;
      default:
        return item.descriptionEN;
    }
  };

  // Handle image navigation
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === items.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Load more images
  const loadMoreItems = () => {
    setVisibleItems(items.slice(0, visibleItems.length + 6));
  };

  // Filter images by category
  const filterItemsByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setVisibleItems(items.slice(0, 6));
    } else {
      const filteredItems = items.filter(item => item.category === category);
      setVisibleItems(filteredItems.slice(0, 6));
    }
  };

  // Handle slider position change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-3 sm:mb-0">
          {title ? 
            `${t("Before & After Results")}: ${title}` :
            t("Before & After Gallery")
          }
        </h2>
        
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => filterItemsByCategory(category)}
                className="text-xs md:text-sm h-7 md:h-9 px-2 md:px-3"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* View toggle */}
      <div className="flex justify-end mb-4 md:mb-6">
        <div className="border rounded-lg inline-flex">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-r-none h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm"
            onClick={() => setViewMode("grid")}
          >
            {t("Grid View")}
          </Button>
          <Button
            variant={viewMode === "slider" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-l-none h-8 md:h-9 px-2 md:px-3 text-xs md:text-sm"
            onClick={() => setViewMode("slider")}
          >
            {t("Slider View")}
          </Button>
        </div>
      </div>
      
      {/* Grid View */}
      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden border rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full h-48 md:h-64 cursor-pointer">
                  <div 
                    className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img 
                      src={item.beforeImageUrl} 
                      alt={`Before - ${getLocalizedDescription(item)}`}
                      className="absolute h-full w-[200%] max-w-none object-cover"
                      onError={(e) => {
                        console.log("Resim yükleme hatası düzeltiliyor:", item.id);
                        e.currentTarget.src = "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors">
                      <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-black/70 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                        {t("Before")}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img 
                      src={item.afterImageUrl} 
                      alt={`After - ${getLocalizedDescription(item)}`}
                      className="absolute h-full w-[200%] max-w-none object-cover right-0"
                      onError={(e) => {
                        console.log("Resim yükleme hatası düzeltiliyor:", item.id);
                        e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors">
                      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-primary/90 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                        {t("After")}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 h-full w-[2px] bg-white/80 -translate-x-1/2 -translate-y-1/2 z-10" />
                </div>
                
                <div className="p-3 md:p-4">
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {getLocalizedDescription(item)}
                  </p>
                  {item.category && (
                    <div className="mt-1.5 md:mt-2">
                      <span className="inline-block bg-muted px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {visibleItems.length < (selectedCategory === "All" ? items.length : items.filter(item => item.category === selectedCategory).length) && (
            <div className="flex justify-center mt-6 md:mt-8">
              <Button 
                variant="outline" 
                onClick={loadMoreItems}
                className="text-xs md:text-sm h-8 md:h-9"
              >
                {t("Load More")}
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* Slider View */}
      {viewMode === "slider" && items.length > 0 && (
        <div className="bg-card rounded-lg md:rounded-xl overflow-hidden border shadow-md">
          <div className="relative w-full h-[300px] md:h-[500px]">
            {/* Image slider */}
            <div className="relative w-full h-full overflow-hidden">
              <div className="relative h-full">
                {/* Before image - full width, will be clipped by the container */}
                <img 
                  src={items[currentIndex].beforeImageUrl}
                  alt={`Before treatment - ${getLocalizedDescription(items[currentIndex])} | MyHair Clinic Hair Transplant Results`}
                  className="absolute top-0 left-0 h-full w-full object-cover"
                  onError={(e) => {
                    console.log("Slider resim yükleme hatası düzeltiliyor:", items[currentIndex].id);
                    e.currentTarget.src = "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                  }}
                />
                
                {/* After image - shown based on slider position */}
                <div 
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={items[currentIndex].afterImageUrl}
                    alt={`After treatment - ${getLocalizedDescription(items[currentIndex])} | MyHair Clinic Hair Transplant Success Story`}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    onError={(e) => {
                      console.log("Slider after resim yükleme hatası düzeltiliyor:", items[currentIndex].id);
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                    }}
                  />
                </div>
                
                {/* Slider handle */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 md:w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute h-6 w-6 md:h-8 md:w-8 bg-white rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-primary flex items-center justify-center shadow-md">
                    <div className="relative w-3 h-3 md:w-4 md:h-4">
                      <ChevronLeft className="absolute top-0 left-0 h-3 w-3 md:h-4 md:w-4 text-primary" />
                      <ChevronRight className="absolute top-0 left-0 h-3 w-3 md:h-4 md:w-4 text-primary" />
                    </div>
                  </div>
                </div>
                
                {/* Slider input for accessibility and mobile */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] md:w-3/4 z-20 opacity-0 cursor-pointer h-8"
                />
                
                {/* Labels */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-black/70 text-white text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded">
                  {t("Before")}
                </div>
                <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-primary text-white text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded">
                  {t("After")}
                </div>
              </div>
            </div>
            
            {/* Navigation controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white z-10 rounded-full h-8 w-8 md:h-10 md:w-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white z-10 rounded-full h-8 w-8 md:h-10 md:w-10"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 md:right-4 bottom-2 md:bottom-4 bg-white/70 hover:bg-white z-10 rounded-full h-8 w-8 md:h-10 md:w-10"
              onClick={() => setSelectedItem(items[currentIndex])}
            >
              <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
          
          <div className="p-3 md:p-6">
            <p className="text-muted-foreground text-xs md:text-sm">
              {getLocalizedDescription(items[currentIndex])}
            </p>
          </div>
          
          {/* Thumbnails */}
          <div className="p-3 md:p-4 border-t">
            <div className="flex overflow-x-auto gap-2 md:gap-3 pb-1 px-1">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-md cursor-pointer overflow-hidden border-2 transition-all duration-200
                    ${currentIndex === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={item.afterImageUrl}
                    alt={getLocalizedDescription(item)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Thumbnail resim yükleme hatası düzeltiliyor:", item.id);
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-4xl p-0">
              <div className="relative w-full h-[60vh] md:h-[80vh] max-h-[80vh]">
                <div className="relative h-full overflow-hidden">
                  {/* Before image - full width, will be clipped by the container */}
                  <img 
                    src={selectedItem.beforeImageUrl}
                    alt={`Before - ${getLocalizedDescription(selectedItem)}`}
                    className="absolute top-0 left-0 h-full w-full object-contain"
                  />
                  
                  {/* After image - shown based on slider position */}
                  <div 
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img 
                      src={selectedItem.afterImageUrl}
                      alt={`After - ${getLocalizedDescription(selectedItem)}`}
                      className="absolute top-0 left-0 h-full w-full object-contain"
                    />
                  </div>
                  
                  {/* Slider handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 md:w-1 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute h-6 w-6 md:h-8 md:w-8 bg-white rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-primary flex items-center justify-center shadow-md">
                      <div className="relative w-3 h-3 md:w-4 md:h-4">
                        <ChevronLeft className="absolute top-0 left-0 h-3 w-3 md:h-4 md:w-4 text-primary" />
                        <ChevronRight className="absolute top-0 left-0 h-3 w-3 md:h-4 md:w-4 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Slider input for accessibility and mobile */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] md:w-3/4 z-20 opacity-0 cursor-pointer h-8"
                  />
                  
                  {/* Labels */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-black/70 text-white text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded">
                    {t("Before")}
                  </div>
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-primary text-white text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded">
                    {t("After")}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}