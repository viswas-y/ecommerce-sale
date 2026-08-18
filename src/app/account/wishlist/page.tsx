"use client";

import React from "react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/provider/ToastProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleMoveToCart = (product: any) => {
    // defaults colors/sizes variants if any
    const color = product.colors.length > 0 ? product.colors[0] : undefined;
    const size = product.sizes.length > 0 ? product.sizes[0] : undefined;

    addItem(product, 1, color, size);
    removeItem(product.id);
    toast(`Moved ${product.name} to shopping cart!`, "success");
  };

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast(`Removed ${name} from your wishlist.`, "info");
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        description="Save your favorite premium items here to track them or move them directly to checkout."
        actionText="Continue Shopping"
        onAction={() => (window.location.href = "/shop")}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-lg shadow-xs">
      <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-editorial mb-6">
        Saved Wishlist
      </h2>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.map((prod) => {
          const price = prod.salePrice ?? prod.price;
          return (
            <div key={prod.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="relative w-16 h-20 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded border">
                <img src={prod.images[0]} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {prod.name}
                  </h4>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-1 block">
                    {formatPrice(price)}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleMoveToCart(prod)}
                    className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition"
                  >
                    <ShoppingBag size={12} />
                    <span>Move to Cart</span>
                  </button>
                  <button
                    onClick={() => handleRemove(prod.id, prod.name)}
                    className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={12} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
