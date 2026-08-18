"use client";

import React, { use, useState, useEffect } from "react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useUiStore } from "@/store/useUiStore";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { useToast } from "@/components/provider/ToastProvider";
import { Heart, ShoppingBag, ArrowLeftRight, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { toast } = useToast();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [recentlyViewed, setRecentlyViewed] = useState<typeof products>([]);

  // Track recently viewed items via session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("novara-recent-views");
      let list: string[] = stored ? JSON.parse(stored) : [];
      list = list.filter((id) => id !== product.id);
      list.unshift(product.id);
      const trimmedList = list.slice(0, 4); // max 4 items
      sessionStorage.setItem("novara-recent-views", JSON.stringify(trimmedList));

      const recentItems = products.filter((p) => trimmedList.includes(p.id) && p.id !== product.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecentlyViewed(recentItems);
    }
  }, [product.id]);

  const handleAddToCart = () => {
    // Check Authentication state
    const { isAuthenticated, setAuthModalOpen } = useUiStore.getState();
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      toast("Please sign in to add items to your cart.", "info");
      return;
    }

    addItem(product, qty, selectedColor || undefined, selectedSize || undefined);
    toast(`Added ${qty}x ${product.name} to your cart.`, "success");
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    if (isInWishlist(product.id)) {
      toast(`Removed ${product.name} from wishlist.`, "info");
    } else {
      toast(`Added ${product.name} to wishlist!`, "success");
    }
  };

  const finalPrice = product.salePrice ?? product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side Column: Product Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} />
        </div>

        {/* Right Side Column: Buying Controls and Options */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {product.brand}
            </span>
            <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial mt-1 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <RatingStars rating={product.rating} size={15} />
              <span className="text-xs text-zinc-400">
                ({product.reviewsCount} Customer Reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 border-y border-zinc-200 dark:border-zinc-800 py-4">
            <span className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
              {formatPrice(finalPrice)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-zinc-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          {/* Color pickers */}
          {product.colors.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Color Choice: {selectedColor}
              </span>
              <div className="flex gap-3 mt-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === c
                        ? "border-zinc-950 dark:border-white scale-110"
                        : "border-transparent"
                    } hover:scale-105 transition`}
                    style={{
                      backgroundColor:
                        c.toLowerCase() === "oatmeal"
                          ? "#E0D6C8"
                          : c.toLowerCase() === "charcoal"
                          ? "#36454F"
                          : c.toLowerCase() === "emerald"
                          ? "#046307"
                          : c.toLowerCase() === "champagne"
                          ? "#F0E2B6"
                          : c.toLowerCase() === "noir" || c.toLowerCase() === "black"
                          ? "#18181B"
                          : c.toLowerCase() === "white" || c.toLowerCase() === "chalk"
                          ? "#FAFAFA"
                          : "#A1A1AA",
                    }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size buttons */}
          {product.sizes.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Size Choice: {selectedSize}
              </span>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-xs font-semibold border rounded ${
                      selectedSize === s
                        ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white"
                        : "border-zinc-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 hover:border-zinc-400"
                    } transition`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Checkout buttons */}
          <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Quantity
              </span>
              <QuantitySelector quantity={qty} onChange={setQty} />
            </div>

            <div className="flex gap-4">
              <Button
                variant="primary"
                className="flex-1 justify-center gap-2"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag size={15} />
                <span>Add to Cart</span>
              </Button>
              <button
                onClick={handleWishlistToggle}
                className="p-3 rounded border border-zinc-200 dark:border-zinc-800 hover:border-red-500 text-zinc-400 hover:text-red-500 transition"
              >
                <Heart size={18} className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} />
              </button>
            </div>
          </div>

          {/* Delivery & details accordions */}
          <div className="mt-8 space-y-4 text-sm text-zinc-500">
            <div className="flex items-center gap-3">
              <Truck size={16} className="text-zinc-400" />
              <span>Free delivery on orders over $100</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={16} className="text-zinc-400" />
              <span>Complimentary returns within 30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Details Box */}
      <div className="mt-16 border-t border-zinc-200 dark:border-zinc-900 pt-12">
        <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-editorial mb-6">
          Product Specifications
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div key={key} className="flex justify-between py-3 border-b border-zinc-100 dark:border-zinc-900 text-sm">
              <dt className="font-semibold text-zinc-500 dark:text-zinc-400">{key}</dt>
              <dd className="text-zinc-900 dark:text-zinc-100 pl-4 text-right">{val}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Reviews, Related Collections and Recently viewed items */}
      <ProductReviews rating={product.rating} reviewsCount={product.reviewsCount} />
      
      <RelatedProducts currentCategory={product.category} currentProductId={product.id} />

      {recentlyViewed.length > 0 && (
        <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-900">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-editorial mb-6">
            Recently Viewed
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => {
              const itemPrice = item.salePrice ?? item.price;
              return (
                <Link key={item.id} href={`/product/${item.slug}`} className="group flex flex-col gap-2">
                  <div className="relative aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 rounded-md overflow-hidden border border-zinc-100 dark:border-zinc-900">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 group-hover:underline truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs font-bold text-zinc-500">{formatPrice(itemPrice)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
