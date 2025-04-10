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

  // Handle image navigation
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Load more images
  const loadMoreImages = () => {
    setVisibleImages(images.slice(0, visibleImages.length + 6));
  };

  // Filter images by category
  const filterImagesByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setVisibleImages(images.slice(0, 6));
    } else {
      const filteredImages = images.filter(img => img.category === category);
      setVisibleImages(filteredImages.slice(0, 6));
    }
  };

  // Handle slider position change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">
          {serviceTitle ? 
            t("Before & After Results: {service}", { service: serviceTitle }) :
            t("Before & After Gallery")
          }
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => filterImagesByCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* View toggle */}
      <div className="flex justify-end mb-6">
        <div className="border rounded-lg inline-flex">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-r-none"
            onClick={() => setViewMode("grid")}
          >
            {t("Grid View")}
          </Button>
          <Button
            variant={viewMode === "slider" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-l-none"
            onClick={() => setViewMode("slider")}
          >
            {t("Slider View")}
          </Button>
        </div>
      </div>
      
      {/* Grid View */}
      {viewMode === "grid" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full h-64 cursor-pointer">
                  <div 
                    className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image.beforeImage} 
                      alt={`Before ${image.title}`}
                      className="absolute h-full w-[200%] max-w-none object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors">
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {t("Before")}
                      </div>
                    </div>
                  </div>
                  <div 
                    className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image.afterImage} 
                      alt={`After ${image.title}`}
                      className="absolute h-full w-[200%] max-w-none object-cover right-0"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors">
                      <div className="absolute bottom-4 right-4 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                        {t("After")}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 h-full w-[2px] bg-white -translate-x-1/2 -translate-y-1/2 z-10" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg">{image.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.description}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block bg-muted px-2 py-1 text-xs rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {visibleImages.length < (selectedCategory === "All" ? images.length : images.filter(img => img.category === selectedCategory).length) && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                onClick={loadMoreImages}
              >
                {t("Load More")}
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* Slider View */}
      {viewMode === "slider" && images.length > 0 && (
        <div className="bg-card rounded-xl overflow-hidden border shadow-md">
          <div className="relative w-full h-[500px]">
            {/* Image slider */}
            <div className="relative w-full h-full overflow-hidden">
              <div className="relative h-full">
                {/* Before image - full width, will be clipped by the container */}
                <img 
                  src={images[currentIndex].beforeImage}
                  alt={`Before ${images[currentIndex].title}`}
                  className="absolute top-0 left-0 h-full w-full object-cover"
                />
                
                {/* After image - shown based on slider position */}
                <div 
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={images[currentIndex].afterImage}
                    alt={`After ${images[currentIndex].title}`}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                  />
                </div>
                
                {/* Slider handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute h-8 w-8 bg-white rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-primary flex items-center justify-center">
                    <div className="relative w-4 h-4">
                      <ChevronLeft className="absolute top-0 left-0 h-4 w-4 text-primary" />
                      <ChevronRight className="absolute top-0 left-0 h-4 w-4 text-primary" />
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
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 z-20 opacity-0 cursor-pointer h-8"
                />
                
                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
                  {t("Before")}
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white text-sm px-3 py-1 rounded">
                  {t("After")}
                </div>
              </div>
            </div>
            
            {/* Navigation controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white z-10 rounded-full h-10 w-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white z-10 rounded-full h-10 w-10"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 bottom-4 bg-white/70 hover:bg-white z-10 rounded-full h-10 w-10"
              onClick={() => setSelectedImage(images[currentIndex])}
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <h3 className="font-semibold text-xl mb-2">{images[currentIndex].title}</h3>
            <p className="text-muted-foreground">{images[currentIndex].description}</p>
          </div>
          
          {/* Thumbnails */}
          <div className="p-4 border-t">
            <div className="flex overflow-x-auto gap-3 pb-1 px-1">
              {images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`flex-shrink-0 w-24 h-24 rounded-md cursor-pointer overflow-hidden border-2 transition-all duration-200
                    ${currentIndex === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image.afterImage}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl p-0">
              <div className="relative w-full h-[80vh] max-h-[80vh]">
                <div className="relative h-full overflow-hidden">
                  {/* Before image - full width, will be clipped by the container */}
                  <img 
                    src={selectedImage.beforeImage}
                    alt={`Before ${selectedImage.title}`}
                    className="absolute top-0 left-0 h-full w-full object-contain"
                  />
                  
                  {/* After image - shown based on slider position */}
                  <div 
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img 
                      src={selectedImage.afterImage}
                      alt={`After ${selectedImage.title}`}
                      className="absolute top-0 left-0 h-full w-full object-contain"
                    />
                  </div>
                  
                  {/* Slider handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute h-8 w-8 bg-white rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 border-2 border-primary flex items-center justify-center">
                      <div className="relative w-4 h-4">
                        <ChevronLeft className="absolute top-0 left-0 h-4 w-4 text-primary" />
                        <ChevronRight className="absolute top-0 left-0 h-4 w-4 text-primary" />
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 z-20 opacity-0 cursor-pointer h-8"
                  />
                  
                  {/* Labels */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
                    {t("Before")}
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-white text-sm px-3 py-1 rounded">
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