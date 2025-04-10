import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  size?: number;
  showTooltips?: boolean;
}

export function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  size = 24,
  showTooltips = true,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const [hoverValue, setHoverValue] = useState(0);
  const [animateStar, setAnimateStar] = useState<number | null>(null);

  const tooltips = [
    "Çok Kötü / Very Poor",
    "Kötü / Poor",
    "Ortalama / Average", 
    "İyi / Good",
    "Mükemmel / Excellent"
  ];

  const handleClick = (rating: number) => {
    if (readOnly) return;
    setAnimateStar(rating);
    setTimeout(() => setAnimateStar(null), 500);
    onChange(rating);
  };

  const handleMouseEnter = (rating: number) => {
    if (readOnly) return;
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(0);
  };

  return (
    <div className="inline-flex flex-col">
      <div 
        className="flex space-x-1 relative" 
        onMouseLeave={handleMouseLeave}
      >
        {stars.map((star) => (
          <div 
            key={star}
            className="relative"
            onMouseEnter={() => handleMouseEnter(star)}
          >
            <motion.div
              animate={animateStar === star ? {
                scale: [1, 1.5, 1],
                rotate: [0, 15, -15, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              <Star
                size={size}
                className={`cursor-pointer transition-colors ${
                  (hoverValue || value) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                } ${
                  readOnly 
                    ? "cursor-default" 
                    : (hoverValue || value) >= star 
                      ? "hover:text-yellow-500" 
                      : "hover:text-yellow-300"
                }`}
                onClick={() => handleClick(star)}
                strokeWidth={1.5}
              />
            </motion.div>
            
            {/* Tooltips */}
            {showTooltips && !readOnly && hoverValue === star && (
              <motion.div 
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-background border shadow-md rounded-md px-2 py-1 text-xs z-10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tooltips[star - 1]}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-background border-r border-b"></div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      
      {/* Rating text display */}
      {value > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs mt-1 text-muted-foreground"
        >
          {tooltips[Math.round(value) - 1]}
        </motion.div>
      )}
    </div>
  );
}

interface StarRatingDisplayProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRatingDisplay({ 
  rating, 
  size = 16, 
  showValue = false,
  className = ""
}: StarRatingDisplayProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex space-x-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <motion.div
            key={`full-${i}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <Star 
              size={size} 
              className="fill-yellow-400 text-yellow-400" 
              strokeWidth={1.5}
            />
          </motion.div>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: fullStars * 0.08 }}
          >
            <Star size={size} className="text-gray-300" strokeWidth={1.5} />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star size={size} className="fill-yellow-400 text-yellow-400" strokeWidth={1.5} />
            </div>
          </motion.div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <motion.div
            key={`empty-${i}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.08 
            }}
          >
            <Star size={size} className="text-gray-300" strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>
      
      {/* Display actual rating value */}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}