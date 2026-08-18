import React from "react";
import { Review } from "@/types";
import { RatingStars } from "../ui/RatingStars";

interface ProductReviewsProps {
  reviewsCount: number;
  rating: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ reviewsCount, rating }) => {
  // Generate mock entries dynamically
  const reviewsList: Review[] = [
    {
      id: "rev-1",
      author: "Juliana V.",
      rating: 5,
      date: "2 weeks ago",
      title: "Pure Luxury",
      content: "Exactly as described. The craftsmanship is pristine, the material weight is perfect, and it layers incredibly well.",
      approved: true
    },
    {
      id: "rev-2",
      author: "Marc K.",
      rating: 4.5,
      date: "1 month ago",
      title: "Excellent structure and fit",
      content: "Beautiful drape. Fits slightly relaxed as noted in description. Material is very breathable.",
      approved: true
    }
  ];

  return (
    <div className="space-y-8 mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-editorial">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <RatingStars rating={rating} size={18} />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {rating} out of 5 stars
            </span>
            <span className="text-zinc-400 text-xs">
              (Based on {reviewsCount} entries)
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-900 mt-6">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="py-6 first:pt-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{rev.author}</span>
                <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block sm:inline sm:ml-3">
                  Verified Purchase &bull; {rev.date}
                </span>
              </div>
              <RatingStars rating={rev.rating} />
            </div>
            {rev.title && (
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-3">
                {rev.title}
              </h4>
            )}
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              {rev.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
