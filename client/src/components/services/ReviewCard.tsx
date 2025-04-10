import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageSquare, ThumbsUp, Quote, CheckCircle, Award, Calendar, MapPin, Share2 } from "lucide-react";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/lib/translations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
    language: string;
    location?: string;
    imageUrl?: string;
  };
  featured?: boolean;
}

export function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(Math.floor(Math.random() * 12)); // Initial random helpful count
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);
  const [isVerified] = useState(Math.random() > 0.3); // 70% chance to be verified

  // Get initials from name
  const initials = review.name
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Check if comment is long
  const isLongComment = review.comment.length > 200;
  const displayComment = isExpanded ? review.comment : review.comment.substring(0, 200);

  // Handle helpful click
  const handleHelpfulClick = () => {
    if (!isHelpfulClicked) {
      setHelpfulCount(prevCount => prevCount + 1);
      setIsHelpfulClicked(true);
    } else {
      setHelpfulCount(prevCount => prevCount - 1);
      setIsHelpfulClicked(false);
    }
  };

  // Handle share click
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${review.name} - ${t({
          TR: "MyHair Clinic Değerlendirmesi",
          EN: "MyHair Clinic Review",
          RU: "Отзыв о MyHair Clinic",
          KA: "MyHair Clinic-ის მიმოხილვა"
        })}`,
        text: review.comment,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden border rounded-lg ${
        featured 
          ? "bg-gradient-to-br from-primary/5 to-transparent shadow-sm p-4" 
          : "bg-card shadow-sm p-3"
      }`}
    >
      {/* Decorative elements for featured reviews - simplified */}
      {featured && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10"></div>
      )}

      {/* Featured badge */}
      {featured && (
        <Badge 
          variant="secondary" 
          className="absolute right-2 top-2 bg-primary/10 text-primary font-medium text-xs"
        >
          {t("Featured Review")}
        </Badge>
      )}
      
      {/* User info and rating - more compact */}
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border">
          {review.imageUrl ? (
            <AvatarImage src={review.imageUrl} alt={review.name} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-xs">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap">
            <h4 className="font-semibold text-base flex items-center gap-1 mr-1">
              {review.name}
              {featured && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Award size={14} className="text-amber-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {t({
                          TR: "En yüksek puanlı yorumlardan biri",
                          EN: "One of our highest rated reviews",
                          RU: "Один из наших отзывов с самым высоким рейтингом",
                          KA: "ჩვენი ერთ-ერთი ყველაზე მაღალი შეფასების მქონე მიმოხილვა"
                        })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </h4>
            
            {/* Verified badge moved here */}
            {isVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className="ml-auto bg-green-50 text-green-600 border-green-200 flex items-center gap-1 text-xs px-1.5 h-5"
                    >
                      <CheckCircle size={10} className="fill-green-100" />
                      <span className="truncate">{t("reviews.verifiedCustomer")}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {t({
                        TR: "Bu kullanıcı gerçekten kliniğimizde tedavi görmüştür",
                        EN: "This user has actually received treatment at our clinic",
                        RU: "Этот пользователь действительно получил лечение в нашей клинике",
                        KA: "ეს მომხმარებელი ნამდვილად იმკურნალა ჩვენს კლინიკაში"
                      })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            <div className="flex items-center">
              <StarRatingDisplay rating={review.rating} size={14} showValue />
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar size={10} />
              {formatDate(review.createdAt)}
            </span>
            
            {review.location && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin size={10} />
                <span className="truncate max-w-[100px]">{review.location}</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Review content - more compact */}
      <div className="mt-3 relative bg-muted/10 p-3 rounded-md border border-muted/20">
        <div className="absolute -left-1 -top-1 opacity-10">
          <Quote size={24} className="text-primary" />
        </div>
        <div className="pl-4 pt-1 relative">
          <p className="text-foreground/80 leading-relaxed text-sm">
            {displayComment}
            {isLongComment && !isExpanded && (
              <span className="text-muted-foreground">...</span>
            )}
          </p>
          
          {isLongComment && (
            <Button 
              variant="link" 
              className="px-0 mt-0.5 h-auto text-primary text-xs"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? t("Show Less") : t("Read More")}
            </Button>
          )}
        </div>
      </div>
      
      {/* Action buttons - simplified */}
      <div className="flex justify-between items-center mt-2.5 pt-2 border-t text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[0.65rem] h-4 px-1.5">
            {review.language.toUpperCase()}
          </Badge>
          
          {featured && (
            <Badge variant="secondary" className="text-[0.65rem] h-4 px-1.5 bg-primary/10 text-primary">
              {t({
                TR: "Saç Ekimi",
                EN: "Hair Transplant",
                RU: "Трансплантация волос",
                KA: "თმის გადანერგვა"
              })}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 h-7 px-2 text-xs"
            onClick={handleShare}
          >
            <Share2 size={12} className="text-muted-foreground" />
            <span className="hidden sm:inline">{t("Share")}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-1 h-7 px-2 text-xs ${isHelpfulClicked ? 'bg-primary/10' : ''}`}
            onClick={handleHelpfulClick}
          >
            <ThumbsUp size={12} className={isHelpfulClicked ? "fill-primary text-primary" : ""} />
            <span>{helpfulCount > 0 ? `${helpfulCount}` : ""} {t("Helpful")}</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}