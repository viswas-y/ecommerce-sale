"use client";

import React, { useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useUiStore } from "@/store/useUiStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "../ui/RatingStars";
import { QuantitySelector } from "../ui/QuantitySelector";
import { Button } from "../ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView } = useUiStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (!quickViewProduct) return null;

  // Initialize variant defaults if empty
  if (quickViewProduct.colors.length > 0 && !selectedColor) {
    setSelectedColor(quickViewProduct.colors[0]);
  }
  if (quickViewProduct.sizes.length > 0 && !selectedSize) {
    setSelectedSize(quickViewProduct.sizes[0]);
  }

  const handleAddToCart = () => {
    // Check Authentication state
    const { isAuthenticated, setAuthModalOpen } = useUiStore.getState();
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      toast("Please sign in to add items to your cart.", "info");
      return;
    }

    addItem(quickViewProduct, qty, selectedColor || undefined, selectedSize || undefined);
    toast(`Added ${qty}x ${quickViewProduct.name} to cart.`, "success");
    closeQuickView();
    setQty(1);
    setSelectedColor("");
    setSelectedSize("");
  };

  const price = quickViewProduct.salePrice ?? quickViewProduct.price;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 rounded-lg shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 z-10"
        >
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Carousel section */}
            <div className="relative aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 md:h-full">
              <img
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Product Options Info */}
            <div className="p-6 md:p-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {quickViewProduct.brand}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial mt-1 leading-tight">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center gap-3 mt-3">
                  <RatingStars rating={quickViewProduct.rating} size={15} />
                  <span className="text-xs text-zinc-400">
                    ({quickViewProduct.reviewsCount} reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-2.5 mt-5">
                  <span className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
                    {formatPrice(price)}
                  </span>
                  {quickViewProduct.salePrice && (
                    <span className="text-sm text-zinc-400 line-through">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Colors block */}
                {quickViewProduct.colors.length > 0 && (
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Color: {selectedColor}
                    </span>
                    <div className="flex gap-2.5 mt-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`w-7 h-7 rounded-full border-2 ${
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

                {/* Sizes block */}
                {quickViewProduct.sizes.length > 0 && (
                  <div className="mt-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Size: {selectedSize}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 text-xs font-semibold border rounded ${
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
              </div>

              {/* Action Buttons panel */}
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Quantity
                  </span>
                  <QuantitySelector quantity={qty} onChange={setQty} />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1 justify-center gap-2"
                    onClick={handleAddToCart}
                    disabled={quickViewProduct.stock === 0}
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Cart</span>
                  </Button>
                  <Link href={`/product/${quickViewProduct.slug}`} className="flex-1" onClick={closeQuickView}>
                    <Button variant="outline" className="w-full justify-center">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
