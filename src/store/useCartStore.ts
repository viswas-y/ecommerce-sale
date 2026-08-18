import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountPercentage: number;
  discountFixed: number;
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  getTotals: () => {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountPercentage: 0,
      discountFixed: 0,

      addItem: (product, quantity = 1, color, size) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [...state.items, { product, quantity, selectedColor: color, selectedSize: size }],
          };
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === color &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, color, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, color, size);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      applyCoupon: (code) => {
        const cleaned = code.trim().toUpperCase();
        if (cleaned === "WELCOME10") {
          set({ couponCode: "WELCOME10", discountPercentage: 10, discountFixed: 0 });
          return true;
        } else if (cleaned === "NOVARA25") {
          set({ couponCode: "NOVARA25", discountPercentage: 0, discountFixed: 25 });
          return true;
        } else if (cleaned === "FREESHIP") {
          set({ couponCode: "FREESHIP", discountPercentage: 0, discountFixed: 0 });
          return true; // Shipping override logic in getTotals
        }
        return false;
      },

      removeCoupon: () => set({ couponCode: null, discountPercentage: 0, discountFixed: 0 }),
      clearCart: () => set({ items: [], couponCode: null, discountPercentage: 0, discountFixed: 0 }),

      getTotals: () => {
        const items = get().items;
        const subtotal = items.reduce((acc, item) => {
          const price = item.product.salePrice ?? item.product.price;
          return acc + price * item.quantity;
        }, 0);

        let discount = 0;
        if (get().discountPercentage > 0) {
          discount = subtotal * (get().discountPercentage / 100);
        } else if (get().discountFixed > 0) {
          discount = Math.min(get().discountFixed, subtotal);
        }

        // Apply threshold or coupon for shipping
        const isFreeShipCoupon = get().couponCode === "FREESHIP";
        const shipping = subtotal === 0 || subtotal >= 100 || isFreeShipCoupon ? 0 : 15;
        const tax = (subtotal - discount) * 0.08; // 8% sales tax
        const total = Math.max(0, subtotal - discount + shipping + tax);

        return { subtotal, discount, shipping, tax, total };
      },
    }),
    {
      name: "novara-cart-storage",
    }
  )
);
