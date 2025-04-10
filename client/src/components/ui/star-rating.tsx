import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  size?: number;
}

export function StarRating({ value = 0, onChange, readOnly = false, size = 24 }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (rating: number) => {
    if (readOnly) return;
    onChange(rating);
  };

  return (
    <div className="flex space-x-1">
      {stars.map((star) => (
        <Star
          key={star}
          size={size}
          className={`cursor-pointer transition-colors ${
            star <= value
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } ${readOnly ? "cursor-default" : "hover:text-yellow-300"}`}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
}

interface StarRatingDisplayProps {
  rating: number;
  size?: number;
}

export function StarRatingDisplay({ rating, size = 16 }: StarRatingDisplayProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex space-x-0.5">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={size} className="fill-yellow-400 text-yellow-400" />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-gray-300" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={size} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  );
}