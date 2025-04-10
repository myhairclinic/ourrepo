import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import { API_ROUTES } from "@/lib/constants";
import { Loader2, FlameIcon } from "lucide-react";
import { ReviewCard } from "./ReviewCard";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ReviewsListProps {
  serviceId?: number | null;
  limit?: number;
}

export function ReviewsList({ serviceId, limit }: ReviewsListProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
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
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">
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
        className="text-center py-12 px-8 border rounded-xl bg-muted/10"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <FlameIcon className="text-primary h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {t("Be the First to Review")}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {t("No reviews yet. Share your experience and help others make their decision.")}
        </p>
        <Button variant="outline" onClick={() => document.querySelector('[value="write"]')?.dispatchEvent(new Event('click'))}>
          {t("Write a Review")}
        </Button>
      </motion.div>
    );
  }

  // Sort reviews by rating (highest first)
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
  
  // Get featured review (highest rating)
  const featuredReview = sortedReviews[0];
  
  // Get other reviews
  const otherReviews = sortedReviews.slice(1);

  // Filter reviews by rating (5★, 4★, etc.)
  const filterByRating = (rating: number) => {
    return sortedReviews.filter(review => Math.floor(review.rating) === rating);
  };

  // Calculate average rating
  const averageRating = sortedReviews.reduce((acc, review) => acc + review.rating, 0) / sortedReviews.length;

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: filterByRating(rating).length,
    percentage: (filterByRating(rating).length / sortedReviews.length) * 100
  }));

  return (
    <div>
      {sortedReviews.length > 0 && (
        <div className="mb-8 p-6 border rounded-xl bg-card/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Average rating */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</h3>
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {t("Based on")} {sortedReviews.length} {t("reviews")}
              </p>
            </div>
            
            {/* Rating distribution */}
            <div className="col-span-2">
              <h4 className="text-sm font-medium mb-4">{t("Rating Distribution")}</h4>
              <div className="space-y-2">
                {ratingCounts.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="w-12 text-sm">{rating} ★</div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">{t("All Reviews")}</TabsTrigger>
          <TabsTrigger value="5">{t("5 Stars")}</TabsTrigger>
          <TabsTrigger value="4">{t("4 Stars")}</TabsTrigger>
          <TabsTrigger value="3">{t("3 Stars & Below")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6 space-y-6">
          {/* Featured review */}
          <ReviewCard review={featuredReview} featured={true} />
          
          {/* Other reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {otherReviews.map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="5" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterByRating(5).map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {filterByRating(5).length === 0 && (
            <p className="text-center py-8 text-muted-foreground">
              {t("No 5-star reviews yet")}
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="4" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterByRating(4).map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {filterByRating(4).length === 0 && (
            <p className="text-center py-8 text-muted-foreground">
              {t("No 4-star reviews yet")}
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="3" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...filterByRating(3), ...filterByRating(2), ...filterByRating(1)].map((review: any) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {[...filterByRating(3), ...filterByRating(2), ...filterByRating(1)].length === 0 && (
            <p className="text-center py-8 text-muted-foreground">
              {t("No reviews with 3 stars or below yet")}
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}