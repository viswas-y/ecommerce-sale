"use client";

import React from "react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import { useToast } from "@/components/provider/ToastProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function StandaloneWishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleMoveToCart = (product: any) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
      <Breadcrumb items={[{ label: "Wishlist", href: "/wishlist" }]} />

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-zinc-200 dark:border-zinc-900 pb-5">
          <Heart className="w-6 h-6 text-zinc-950 dark:text-white" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Your Wishlist
          </h1>
          <span className="text-xs text-zinc-400 mt-1.5">
            ({items.length} Saved Items)
          </span>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title="Your Wishlist is Empty"
            description="Save your favorite premium items here to track them or move them directly to checkout."
            actionText="Browse Collection"
            onAction={() => (window.location.href = "/shop")}
          />
        ) : (
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-lg overflow-hidden shadow-xs">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {items.map((prod) => {
                const price = prod.salePrice ?? prod.price;
                return (
                  <div key={prod.id} className="flex gap-6 p-6 items-center">
                    <Link href={`/product/${prod.slug}`} className="relative w-20 h-24 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded border shrink-0">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${prod.slug}`} className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 hover:underline block truncate">
                        {prod.name}
                      </Link>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50 font-editorial">
                          {formatPrice(price)}
                        </span>
                        {prod.salePrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            {formatPrice(prod.price)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1 block uppercase tracking-widest">
                        {prod.category} • {prod.brand}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMoveToCart(prod)}
                        className="flex items-center justify-center gap-1.5 text-xs py-1.5 px-3"
                      >
                        <ShoppingBag size={14} />
                        <span>Move to Cart</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(prod.id, prod.name)}
                        className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-red-500 hover:border-red-500 py-1.5 px-3"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
