"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/provider/ToastProvider";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ product, className }) => {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { toast } = useToast();
  const active = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (active) {
      toast(`Removed ${product.name} from wishlist.`, "info");
    } else {
      toast(`Added ${product.name} to wishlist!`, "success");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow hover:scale-105 transition-all text-zinc-400 hover:text-red-500",
        active && "text-red-500 fill-red-500 border-red-200 dark:border-red-900",
        className
      )}
    >
      <Heart size={16} />
    </button>
  );
};
