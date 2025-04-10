import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { API_ROUTES } from "@/lib/constants";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ReviewsListProps {
  serviceId?: number | null;
  limit?: number;
}

export function ReviewsList({ serviceId, limit }: ReviewsListProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
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
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">
          {t({
            TR: "Henüz yorum bulunmuyor",
            EN: "No reviews yet",
            RU: "Пока нет отзывов",
            KA: "ჯერ არ არის მიმოხილვები",
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review: any) => (
        <div key={review.id} className="border rounded-lg p-5 bg-card shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-lg">{review.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <StarRatingDisplay rating={review.rating} />
                <span className="text-sm text-muted-foreground">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}