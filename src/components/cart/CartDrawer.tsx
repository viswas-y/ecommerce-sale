"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUiStore } from "@/store/useUiStore";
import { formatPrice } from "@/lib/utils";
import { QuantitySelector } from "../ui/QuantitySelector";
import { Button } from "../ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/components/provider/ToastProvider";

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setCartOpen } = useUiStore();
  const { items, updateQuantity, removeItem, getTotals } = useCartStore();
  const { toast } = useToast();
  const { subtotal } = getTotals();

  const handleQtyChange = (productId: string, qty: number, color?: string, size?: string) => {
    updateQuantity(productId, qty, color, size);
  };

  const handleRemove = (productId: string, name: string, color?: string, size?: string) => {
    removeItem(productId, color, size);
    toast(`Removed ${name} from your cart.`, "info");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-xs"
          />

          {/* Drawer container body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-base font-bold uppercase tracking-widest text-zinc-950 dark:text-white font-editorial">
                Shopping Cart
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Scrollable list items panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-zinc-500 text-sm">Your shopping cart is currently empty.</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => {
                  const currentPrice = item.product.salePrice ?? item.product.price;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-5 last:border-0"
                    >
                      <div className="relative w-20 h-24 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 leading-tight">
                              {item.product.name}
                            </h4>
                            <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 pl-2">
                              {formatPrice(currentPrice)}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">
                            {item.product.brand}
                          </p>
                          {(item.selectedColor || item.selectedSize) && (
                            <div className="flex gap-3 text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-1.5">
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <QuantitySelector
                            quantity={item.quantity}
                            onChange={(q) =>
                              handleQtyChange(
                                item.product.id,
                                q,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              handleRemove(
                                item.product.id,
                                item.product.name,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="text-zinc-400 hover:text-red-500 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Subtotals checkout section */}
            {items.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Estimated Subtotal
                  </span>
                  <span className="text-xl font-bold text-zinc-950 dark:text-zinc-50 font-editorial">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/cart" onClick={() => setCartOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">
                      View Cart & Coupons
                    </Button>
                  </Link>
                  <Link href="/checkout" onClick={() => setCartOpen(false)}>
                    <Button variant="primary" className="w-full justify-between">
                      <span>Secure Checkout</span>
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
