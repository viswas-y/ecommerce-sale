"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, ArrowRight, Percent } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/provider/ToastProvider";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function CartPage() {
  const { items, updateQuantity, removeItem, couponCode, applyCoupon, removeCoupon, getTotals } =
    useCartStore();
  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState("");

  const { subtotal, discount, shipping, tax, total } = getTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const success = applyCoupon(couponInput);
    if (success) {
      toast(`Coupon "${couponInput.toUpperCase()}" applied successfully!`, "success");
      setCouponInput("");
    } else {
      toast("Invalid coupon code. Try WELCOME10 or NOVARA25.", "error");
    }
  };

  const handleRemoveItem = (id: string, name: string, color?: string, size?: string) => {
    removeItem(id, color, size);
    toast(`Removed ${name} from cart.`, "info");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any premium essentials to your bag yet."
          actionText="Explore Shop"
          onAction={() => (window.location.href = "/shop")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial mt-4">
        Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        {/* Left Side: Items Table List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950">
            <div className="p-6 divide-y divide-zinc-200 dark:divide-zinc-800">
              {items.map((item) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="relative w-24 aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            {item.product.brand}
                          </span>
                          <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 leading-tight">
                            {item.product.name}
                          </h4>
                          {(item.selectedColor || item.selectedSize) && (
                            <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-zinc-400 mt-2">
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            </div>
                          )}
                        </div>
                        <span className="text-base font-bold text-zinc-950 dark:text-zinc-50 font-editorial shrink-0 pl-2">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-6">
                        <QuantitySelector
                          quantity={item.quantity}
                          onChange={(q) => updateQuantity(item.product.id, q, item.selectedColor, item.selectedSize)}
                        />
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.product.name, item.selectedColor, item.selectedSize)}
                          className="text-zinc-400 hover:text-red-500 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition"
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Right Side: Order Summary reductions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span className="flex items-center gap-1.5">
                    <Percent size={14} />
                    <span>Discount Applied</span>
                  </span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping cost</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span className="font-semibold text-zinc-900 dark:text-white">{formatPrice(tax)}</span>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              <div className="flex justify-between text-base font-bold text-zinc-950 dark:text-white">
                <span>Grand Total</span>
                <span className="font-editorial text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Coupons block */}
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-850">
              {couponCode ? (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
                    <Percent size={14} />
                    <span>Code: {couponCode}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs uppercase font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    placeholder="Coupon Code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="py-2.5"
                  />
                  <Button variant="outline" type="submit">
                    Apply
                  </Button>
                </form>
              )}
            </div>

            <Link href="/checkout" className="block mt-6">
              <Button variant="primary" className="w-full justify-center gap-2">
                <span>Secure Checkout</span>
                <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
