import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageSquare, ThumbsUp, Quote } from "lucide-react";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "@/hooks/use-translation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
    language: string;
  };
  featured?: boolean;
}

export function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`overflow-hidden border rounded-xl p-5 ${
        featured 
          ? "bg-gradient-to-br from-card to-card/80 shadow-md" 
          : "bg-card shadow-sm"
      }`}
    >
      {featured && (
        <Badge 
          variant="secondary" 
          className="absolute right-4 top-4 bg-primary/10 text-primary font-medium"
        >
          {t("Featured Review")}
        </Badge>
      )}
      
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 border">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h4 className="font-semibold text-lg">{review.name}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <StarRatingDisplay rating={review.rating} />
            <span className="text-sm text-muted-foreground">
              {formatDate(review.createdAt)}
            </span>
            <Badge variant="outline" className="ml-1 text-xs">
              {review.language.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="mt-4 relative">
        <div className="absolute -left-1 -top-1 opacity-15">
          <Quote size={40} className="text-primary" />
        </div>
        <div className="pl-6 pt-2 relative">
          <p className="text-muted-foreground">{displayComment}{isLongComment && !isExpanded && "..."}</p>
          
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
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MessageSquare size={14} />
          <span>{review.comment.length} {t("characters")}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleHelpfulClick}
        >
          <ThumbsUp size={14} className={isHelpfulClicked ? "fill-primary text-primary" : ""} />
          <span>{helpfulCount > 0 ? `${helpfulCount} ${t("Helpful")}` : t("Helpful")}</span>
        </Button>
      </div>
    </motion.div>
  );
}