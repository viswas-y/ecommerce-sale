import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  className,
  size = 14,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, idx) => {
        const starNum = idx + 1;
        const isFull = starNum <= fullStars;
        const isHalf = !isFull && starNum === fullStars + 1 && hasHalf;

        return (
          <Star
            key={idx}
            size={size}
            className={cn(
              "stroke-zinc-300 dark:stroke-zinc-700 fill-transparent",
              isFull && "fill-yellow-400 stroke-yellow-400 dark:fill-yellow-500 dark:stroke-yellow-500",
              isHalf && "fill-yellow-400 stroke-yellow-400/50 dark:fill-yellow-500"
            )}
          />
        );
      })}
    </div>
  );
};
