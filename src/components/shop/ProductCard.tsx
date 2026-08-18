"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUiStore } from "@/store/useUiStore";
import { Product } from "@/types";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { PriceDisplay } from "../ui/PriceDisplay";
import { RatingStars } from "../ui/RatingStars";
import { Badge } from "../ui/Badge";
import { useToast } from "@/components/provider/ToastProvider";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { openQuickView } = useUiStore();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const activeWishlist = isInWishlist(product.id);
  const discountRate = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check Authentication state
    const { isAuthenticated, setAuthModalOpen } = useUiStore.getState();
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      toast("Please sign in to add items to your cart.", "info");
      return;
    }
    
    // Choose first variant details by default
    const color = product.colors.length > 0 ? product.colors[0] : undefined;
    const size = product.sizes.length > 0 ? product.sizes[0] : undefined;
    
    addItem(product, 1, color, size);
    toast(`Added ${product.name} to shopping cart!`, "success");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (activeWishlist) {
      toast(`Removed ${product.name} from wishlist.`, "info");
    } else {
      toast(`Added ${product.name} to wishlist!`, "success");
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-zinc-950 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image & Overlays Panel */}
      <Link href={`/product/${product.slug}`} className="relative w-full aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 overflow-hidden rounded-md border border-zinc-100 dark:border-zinc-900">
        
        {/* Badges list */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && <Badge variant="primary">New</Badge>}
          {discountRate > 0 && <Badge variant="danger">{discountRate}% OFF</Badge>}
          {product.stock === 0 && <Badge variant="secondary">Sold Out</Badge>}
        </div>

        {/* Wishlist Button Overlay */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-400 hover:text-red-500 shadow transition-all duration-200"
        >
          <Heart size={15} className={activeWishlist ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* Product Images (Secondary hover swap layout) */}
        <div className="w-full h-full">
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Hover Quick actions overlay drawer (Desktop hover, visible on mobile tap/focus) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 lg:group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/60 to-transparent flex gap-2 md:translate-y-full max-sm:translate-y-0 max-sm:bg-black/40">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-white/95 dark:bg-zinc-900/95 hover:bg-zinc-100 text-zinc-900 dark:text-white text-xs font-semibold py-2.5 px-3 rounded flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-semibold py-2.5 px-3.5 rounded flex items-center justify-center hover:opacity-90 active:scale-95 transition"
            >
              <ShoppingBag size={13} />
            </button>
          )}
        </div>
      </Link>

      {/* Info labels panel */}
      <div className="mt-3.5 flex flex-col gap-1 px-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {product.brand}
        </span>
        <Link href={`/product/${product.slug}`} className="hover:underline">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          <RatingStars rating={product.rating} />
          <span className="text-[10px] text-zinc-400 font-semibold">
            ({product.reviewsCount})
          </span>
        </div>
        <PriceDisplay
          price={product.price}
          salePrice={product.salePrice}
          className="mt-1"
          size="sm"
        />
      </div>
    </div>
  );
};
