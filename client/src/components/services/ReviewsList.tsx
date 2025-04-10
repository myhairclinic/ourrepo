import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { API_ROUTES } from "@/lib/constants";
import { Loader2, FlameIcon, Search, Filter, List, Grid2X2, MessageSquare, Calendar } from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

interface ReviewsListProps {
  serviceId?: number | null;
  limit?: number;
}

type SortOption = "newest" | "oldest" | "highest" | "lowest";

// Mock data for when there are no real reviews
const mockReviews = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    rating: 5,
    comment: "Harika bir deneyimdi. Doktor ve tüm ekip çok profesyoneldi. 6 ay sonra sonuçlar mükemmel. Saç ekimi sürecinde her adımda bana yardımcı oldular, tüm sorularıma sabırla cevap verdiler. Özellikle ameliyat sonrası bakım talimatları çok açık ve faydalıydı. Kesinlikle tavsiye ederim.",
    createdAt: "2025-01-15T09:30:00Z",
    language: "tr",
    location: "Istanbul, Turkey",
  },
  {
    id: 2,
    name: "John Smith",
    rating: 4.5,
    comment: "I had my hair transplantation procedure done at MyHair Clinic and I'm very satisfied with the results. The clinic is modern and clean, and the staff is very professional. Dr. Mehmet was very thorough in explaining the procedure and setting realistic expectations. The only reason I'm not giving 5 stars is because the waiting time was a bit longer than expected.",
    createdAt: "2025-02-05T14:20:00Z",
    language: "en",
    location: "London, UK",
  },
  {
    id: 3,
    name: "Иван Петров",
    rating: 5,
    comment: "Отличная клиника с профессиональными врачами. Результаты трансплантации волос превзошли мои ожидания. Персонал очень заботливый и внимательный, процедура была почти безболезненной. Особенно хочу отметить качество послеоперационного ухода и подробные инструкции.",
    createdAt: "2025-02-22T11:45:00Z",
    language: "ru",
    location: "Moscow, Russia",
  },

  {
    id: 5,
    name: "Mehmet Kaya",
    rating: 5,
    comment: "MyHair Clinic'de saç ekimi yaptırdım ve sonuçlardan çok memnunum. Doktorlar ve hemşireler son derece profesyonel ve nazikti. İşlem sırasında hiç ağrı hissetmedim. Kliniğin temizliği ve kullanılan teknoloji de etkileyiciydi. 8 ay sonra saçlarım doğal ve gür görünüyor. Herkese tavsiye ederim!",
    createdAt: "2025-03-18T10:00:00Z",
    language: "tr",
    location: "Ankara, Turkey"
  }
];

export function ReviewsList({ serviceId, limit }: ReviewsListProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<SortOption>("highest");
  
  const { data: reviews, isLoading } = useQuery({
    queryKey: serviceId 
      ? [`${API_ROUTES.REVIEWS}/${serviceId}`] 
      : [API_ROUTES.REVIEWS],
    queryFn: async () => {
      const url = serviceId 
        ? `${API_ROUTES.REVIEWS}?serviceId=${serviceId}&approved=true${limit ? `&limit=${limit}` : ''}`
        : `${API_ROUTES.REVIEWS}?approved=true${limit ? `&limit=${limit}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      
      // If no reviews in database, use mock data for demo purposes
      return data.length === 0 ? mockReviews : data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-dashed border-primary animate-pulse"></div>
        </div>
        <p className="text-muted-foreground animate-pulse mt-4">
          {t("Loading reviews...")}
        </p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 px-8 border rounded-xl bg-muted/10"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="text-primary h-10 w-10" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">
          {t("Be the First to Review")}
        </h3>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t("No reviews yet. Share your experience and help others make their decision.")}
        </p>
        <Button 
          size="lg"
          onClick={() => document.querySelector('[value="write"]')?.dispatchEvent(new Event('click'))}
          className="px-6 py-2 transition-all hover:shadow-md"
        >
          {t("Write a Review")}
        </Button>
      </motion.div>
    );
  }

  // Sort reviews based on selected option
  const getSortedReviews = () => {
    if (!reviews) return [];
    
    switch (sortOption) {
      case "newest":
        return [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "oldest":
        return [...reviews].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "highest":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case "lowest":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      default:
        return [...reviews].sort((a, b) => b.rating - a.rating);
    }
  };
  
  const sortedReviews = getSortedReviews();
  
  // Filter reviews by search term
  const filteredReviews = sortedReviews.filter(review => 
    review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get featured review (highest rating)
  const featuredReview = sortedReviews.find(review => review.rating >= 4.5) || sortedReviews[0];
  
  // Get other reviews (excluding featured)
  const otherReviews = sortedReviews.filter(review => review.id !== featuredReview.id);

  // Filter reviews by rating (5★, 4★, etc.)
  const filterByRating = (rating: number) => {
    return filteredReviews.filter(review => {
      if (rating === 5) return review.rating >= 4.5;
      if (rating === 4) return review.rating >= 3.5 && review.rating < 4.5;
      return review.rating < 3.5;
    });
  };

  // Calculate average rating
  const averageRating = sortedReviews.reduce((acc, review) => acc + review.rating, 0) / sortedReviews.length;

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3].map(rating => {
    const reviews = filterByRating(rating);
    return {
      rating,
      count: reviews.length,
      percentage: (reviews.length / sortedReviews.length) * 100
    };
  });

  return (
    <div>
      {/* Rating summary card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 p-8 border rounded-xl bg-gradient-to-br from-white to-primary/5 shadow-sm relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl -z-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Average rating */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/80">
              {averageRating.toFixed(1)}
            </h3>
            <div className="flex items-center mb-2">
              <StarRatingDisplay rating={averageRating} size={24} showValue={false} />
            </div>
            <p className="text-sm text-muted-foreground">
              {t("reviews.basedOn")} <span className="font-semibold">{sortedReviews.length}</span> {t("reviews")}
            </p>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="mt-4"
            >
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 px-3 py-1">
                {averageRating > 4.5 ? 
                  t({
                    TR: "Mükemmel",
                    EN: "Excellent",
                    RU: "Отлично",
                    KA: "შესანიშნავი"
                  }) : 
                  t({
                    TR: "Çok İyi",
                    EN: "Very Good",
                    RU: "Очень хорошо",
                    KA: "ძალიან კარგი"
                  })
                }
              </Badge>
            </motion.div>
          </div>
          
          {/* Rating distribution */}
          <div className="col-span-2">
            <h4 className="font-medium mb-4">{t("reviews.overview")}</h4>
            <div className="space-y-3">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="w-16 text-sm font-medium">
                    {rating === 5 ? "5★" : rating === 4 ? "4★" : "≤3★"}
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      className={`h-3 rounded-full ${
                        rating === 5 ? "bg-green-500" : 
                        rating === 4 ? "bg-blue-500" : 
                        "bg-amber-500"
                      }`}
                    />
                  </div>
                  <div className="w-16 text-sm text-right">
                    {count} <span className="text-muted-foreground">({Math.round(percentage)}%)</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Rating by category */}
            <h4 className="font-medium mt-6 mb-3">{t("reviews.byCategory")}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: t("reviews.experienceRating"), rating: 4.9 },
                { name: t("reviews.staffRating"), rating: 4.8 },
                { name: t("reviews.facilityRating"), rating: 4.7 },
                { name: t("reviews.valueRating"), rating: 4.8 }
              ].map((category, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-sm mb-1">{category.name}</div>
                  <div className="flex items-center gap-2">
                    <StarRatingDisplay rating={category.rating} size={14} />
                    <span className="text-sm font-medium">{category.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Filters and controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t({
              TR: "Yorumlarda ara...",
              EN: "Search in reviews...",
              RU: "Поиск в отзывах...",
              KA: "მიმოხილვებში ძიება..."
            })}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full sm:w-64"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("Sort by")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highest">
                {t({
                  TR: "En Yüksek Puan",
                  EN: "Highest Rating",
                  RU: "Самый высокий рейтинг",
                  KA: "უმაღლესი შეფასება"
                })}
              </SelectItem>
              <SelectItem value="lowest">
                {t({
                  TR: "En Düşük Puan",
                  EN: "Lowest Rating",
                  RU: "Самый низкий рейтинг",
                  KA: "უმდაბლესი შეფასება"
                })}
              </SelectItem>
              <SelectItem value="newest">
                {t({
                  TR: "En Yeni",
                  EN: "Most Recent",
                  RU: "Самые последние",
                  KA: "უახლესი"
                })}
              </SelectItem>
              <SelectItem value="oldest">
                {t({
                  TR: "En Eski",
                  EN: "Oldest",
                  RU: "Самые старые",
                  KA: "უძველესი"
                })}
              </SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md p-1 bg-muted/50">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-2.5"
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-2.5"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {searchTerm && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredReviews.length} {t("reviews found for")} "{searchTerm}"
          </p>
        </div>
      )}
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-muted/70 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white rounded-md">
            {t("All Reviews")}
          </TabsTrigger>
          <TabsTrigger value="5" className="data-[state=active]:bg-white rounded-md">
            {t("5 Stars")}
          </TabsTrigger>
          <TabsTrigger value="4" className="data-[state=active]:bg-white rounded-md">
            {t("4 Stars")}
          </TabsTrigger>
          <TabsTrigger value="3" className="data-[state=active]:bg-white rounded-md">
            {t("3 Stars & Below")}
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="all" className="mt-8 space-y-8">
            {filteredReviews.length > 0 ? (
              <>
                {!searchTerm && (
                  <>
                    {/* Recently added section */}
                    <div className="mb-10">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {t("reviews.recentlyAdded")}
                      </h3>
                      <div className="border-l-4 pl-4 py-2 border-primary/30 bg-primary/5 rounded-r-md italic text-sm mb-5">
                        <p className="text-muted-foreground">
                          "{sortedReviews[0].comment.slice(0, 180)}..."
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="font-medium text-foreground">{sortedReviews[0].name}</div>
                          <div className="text-xs">{formatDate(sortedReviews[0].createdAt)}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Featured review */}
                    <div className="mb-10">
                      <h3 className="text-lg font-semibold mb-4">
                        {t("Featured Review")}
                      </h3>
                      <ReviewCard review={featuredReview} featured={true} />
                    </div>
                  </>
                )}
                
                {/* Other reviews */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {searchTerm ? t("Search Results") : t("All Reviews")}
                  </h3>
                  <motion.div 
                    layout
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                        : "space-y-4"
                    }
                  >
                    {(searchTerm ? filteredReviews : otherReviews).map((review: any) => (
                      <ReviewCard 
                        key={review.id} 
                        review={review} 
                      />
                    ))}
                  </motion.div>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-dashed rounded-lg bg-muted/10"
              >
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">
                  {t({
                    TR: "Eşleşen yorum bulunamadı",
                    EN: "No matching reviews found",
                    RU: "Соответствующих отзывов не найдено",
                    KA: "შესაბამისი მიმოხილვები ვერ მოიძებნა"
                  })}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {t({
                    TR: "Arama terimini değiştirmeyi veya tüm yorumları görüntülemek için aramanızı temizlemeyi deneyin.",
                    EN: "Try changing your search term or clear your search to view all reviews.",
                    RU: "Попробуйте изменить условия поиска или очистите поиск, чтобы просмотреть все отзывы.",
                    KA: "შეეცადეთ შეცვალოთ საძიებო ტერმინი ან გაასუფთავოთ ძებნა ყველა მიმოხილვის სანახავად."
                  })}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  {t({
                    TR: "Aramayı Temizle",
                    EN: "Clear Search",
                    RU: "Очистить поиск",
                    KA: "ძიების გასუფთავება"
                  })}
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <TabsContent value="5" className="mt-8">
            <motion.div 
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  : "space-y-4"
              }
            >
              {filterByRating(5).map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
            {filterByRating(5).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-dashed rounded-lg bg-muted/10"
              >
                <p className="text-muted-foreground">
                  {t("No 5-star reviews yet")}
                </p>
              </motion.div>
            )}
          </TabsContent>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <TabsContent value="4" className="mt-8">
            <motion.div 
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  : "space-y-4"
              }
            >
              {filterByRating(4).map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
            {filterByRating(4).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-dashed rounded-lg bg-muted/10"
              >
                <p className="text-muted-foreground">
                  {t("No 4-star reviews yet")}
                </p>
              </motion.div>
            )}
          </TabsContent>
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <TabsContent value="3" className="mt-8">
            <motion.div 
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  : "space-y-4"
              }
            >
              {filterByRating(3).map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
            {filterByRating(3).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 border border-dashed rounded-lg bg-muted/10"
              >
                <p className="text-muted-foreground">
                  {t("No reviews with 3 stars or below yet")}
                </p>
              </motion.div>
            )}
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}