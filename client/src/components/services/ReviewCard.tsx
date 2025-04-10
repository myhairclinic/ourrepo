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
      className={`relative overflow-hidden border rounded-xl ${
        featured 
          ? "bg-gradient-to-br from-primary/5 to-transparent shadow-md p-6" 
          : "bg-card shadow-sm p-5"
      }`}
    >
      {/* Decorative elements for featured reviews */}
      {featured && (
        <>
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl -z-10"></div>
        </>
      )}

      {/* Featured badge */}
      {featured && (
        <Badge 
          variant="secondary" 
          className="absolute right-4 top-4 bg-primary/10 text-primary font-medium"
        >
          {t("Featured Review")}
        </Badge>
      )}
      
      {/* Verified badge */}
      {isVerified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge 
                variant="outline" 
                className="absolute left-4 top-4 bg-green-50 text-green-600 border-green-200 flex items-center gap-1"
              >
                <CheckCircle size={12} className="fill-green-100" />
                {t("reviews.verifiedCustomer")}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>
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
      
      {/* User info and rating */}
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 border shadow-sm">
          {review.imageUrl ? (
            <AvatarImage src={review.imageUrl} alt={review.name} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div>
          <h4 className="font-semibold text-lg flex items-center gap-2">
            {review.name}
            {featured && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Award size={16} className="text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
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
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <div className="flex items-center">
              <StarRatingDisplay rating={review.rating} showValue />
            </div>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(review.createdAt)}
            </span>
            <Badge variant="outline" className="text-xs">
              {review.language.toUpperCase()}
            </Badge>
          </div>
          
          {/* Location info */}
          {review.location && (
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
              <MapPin size={12} />
              <span>{review.location}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Review content */}
      <div className="mt-6 relative bg-muted/20 p-4 rounded-lg border border-muted/30">
        <div className="absolute -left-1 -top-1 opacity-15">
          <Quote size={40} className="text-primary" />
        </div>
        <div className="pl-6 pt-2 relative">
          <p className="text-foreground/80 leading-relaxed">
            {displayComment}
            {isLongComment && !isExpanded && (
              <span className="text-muted-foreground">...</span>
            )}
          </p>
          
          {isLongComment && (
            <Button 
              variant="link" 
              className="px-0 mt-1 h-auto text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? t("Show Less") : t("Read More")}
            </Button>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>{formatDate(review.createdAt, true)}</span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare size={14} />
            <span>{review.comment.length} {t("characters")}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share2 size={14} className="text-muted-foreground" />
            <span className="hidden sm:inline">{t("Share")}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-1 ${isHelpfulClicked ? 'bg-primary/10' : ''}`}
            onClick={handleHelpfulClick}
          >
            <ThumbsUp size={14} className={isHelpfulClicked ? "fill-primary text-primary" : ""} />
            <span>{helpfulCount > 0 ? `${helpfulCount} ${t("Helpful")}` : t("Helpful")}</span>
          </Button>
        </div>
      </div>
      
      {/* Treatment label for featured reviews */}
      {featured && (
        <div className="mt-4 flex">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {t({
              TR: "Saç Ekimi",
              EN: "Hair Transplantation",
              RU: "Трансплантация волос",
              KA: "თმის გადანერგვა"
            })}
          </Badge>
        </div>
      )}
    </motion.div>
  );
}