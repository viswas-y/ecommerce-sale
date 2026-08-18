import React from "react";
import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  salePrice?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  salePrice,
  className = "",
  size = "md",
}) => {
  const hasSale = typeof salePrice === "number" && salePrice < price;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl md:text-2xl font-semibold",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {hasSale ? (
        <>
          <span className={`font-semibold text-zinc-900 dark:text-zinc-50 ${sizeClasses[size]}`}>
            {formatPrice(salePrice!)}
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 line-through text-xs md:text-sm">
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span className={`font-semibold text-zinc-900 dark:text-zinc-50 ${sizeClasses[size]}`}>
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
};
