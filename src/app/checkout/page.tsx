"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CreditCard, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

// Form validation schema via Zod
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State selection is required"),
  zip: z.string().min(5, "ZIP code must be at least 5 digits"),
  country: z.string().min(2, "Country selection is required"),
  paymentMethod: z.enum(["card", "gpay", "cod"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).superRefine((values, ctx) => {
  if (values.paymentMethod === "card") {
    if (!values.cardNumber || values.cardNumber.length < 16) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Card number must be 16 digits",
        path: ["cardNumber"],
      });
    }
    if (!values.cardExpiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(values.cardExpiry)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Use MM/YY format",
        path: ["cardExpiry"],
      });
    }
    if (!values.cardCvc || values.cardCvc.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVC must be at least 3 digits",
        path: ["cardCvc"],
      });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, getTotals, clearCart } = useCartStore();

  const { subtotal, discount, shipping, tax, total } = getTotals();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema) as any,
    defaultValues: {
      country: "US",
      paymentMethod: "card",
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormValues) => {
    // Simulate payment response
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Save simulated order reference
    const orderNo = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderNo,
      customerName: `${data.firstName} ${data.lastName}`,
      customerEmail: data.email,
      date: new Date().toISOString().split("T")[0],
      amount: total,
      status: "Processing",
      paymentStatus: data.paymentMethod === "cod" ? "Unpaid" : "Paid",
      paymentMethod: data.paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment",
      shippingMethod: "Standard",
      shippingCost: shipping,
      discount: discount,
      tax: tax,
      shippingAddress: {
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country
      },
      items: items.map((item, idx) => ({
        id: `item-${idx}-${Date.now()}`,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.salePrice ?? item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
        image: item.product.images[0]
      }))
    };

    // Store in localStorage
    if (typeof window !== "undefined") {
      const storedOrders = localStorage.getItem("novara-local-orders");
      const list = storedOrders ? JSON.parse(storedOrders) : [];
      list.unshift(newOrder);
      localStorage.setItem("novara-local-orders", JSON.stringify(list));

      sessionStorage.setItem("novara-latest-order", JSON.stringify({
        orderNo,
        itemsCount: items.length,
        total,
        address: `${data.address}, ${data.city}, ${data.state} ${data.zip}`
      }));
    }

    toast("Payment processed successfully!", "success");
    clearCart();
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-zinc-500 text-sm">Your cart is currently empty. Redirecting...</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/shop")}>
          Return to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Checkout", href: "/checkout" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial mt-4">
        Checkout Shipping & Payment
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
        {/* Left Side Form inputs */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Customer Details info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-6 border-b border-zinc-150 pb-3">
              1. Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="First Name" {...register("firstName")} error={errors.firstName?.message} />
              <Input label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
              <Input label="Email Address" type="email" {...register("email")} error={errors.email?.message} />
              <Input label="Phone Number" {...register("phone")} error={errors.phone?.message} />
            </div>
          </div>

          {/* Shipping destination address inputs */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-6 border-b border-zinc-150 pb-3">
              2. Shipping Address
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <Input label="Street Address" {...register("address")} error={errors.address?.message} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="City" {...register("city")} error={errors.city?.message} />
                <Input label="State / Region" {...register("state")} error={errors.state?.message} />
                <Input label="ZIP / Postal Code" {...register("zip")} error={errors.zip?.message} />
              </div>
              <Select
                label="Country"
                options={[
                  { label: "United States", value: "US" },
                  { label: "Canada", value: "CA" },
                  { label: "United Kingdom", value: "UK" },
                ]}
                {...register("country")}
                error={errors.country?.message}
              />
            </div>
          </div>

          {/* Payment method selection controls block */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-6 border-b border-zinc-150 pb-3 flex items-center gap-2">
              <CreditCard size={18} />
              <span>3. Select Payment Method</span>
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition ${
                  selectedPaymentMethod === "card"
                    ? "border-zinc-950 dark:border-white bg-zinc-50/50 dark:bg-zinc-900/30"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}>
                  <input
                    type="radio"
                    value="card"
                    {...register("paymentMethod")}
                    className="accent-zinc-950 dark:accent-white"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
                    Credit Card
                  </span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition ${
                  selectedPaymentMethod === "gpay"
                    ? "border-zinc-950 dark:border-white bg-zinc-50/50 dark:bg-zinc-900/30"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}>
                  <input
                    type="radio"
                    value="gpay"
                    {...register("paymentMethod")}
                    className="accent-zinc-950 dark:accent-white"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
                    UPI Payment
                  </span>
                </label>

                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition ${
                  selectedPaymentMethod === "cod"
                    ? "border-zinc-950 dark:border-white bg-zinc-50/50 dark:bg-zinc-900/30"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}>
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    className="accent-zinc-950 dark:accent-white"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
                    Cash on Delivery
                  </span>
                </label>
              </div>

              {/* Conditional Display Pane based on selection */}
              {selectedPaymentMethod === "card" && (
                <div className="grid grid-cols-1 gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 mt-4">
                  <Input label="Cardholder Number" placeholder="4111 2222 3333 4444" {...register("cardNumber")} error={errors.cardNumber?.message} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Expiration Date" placeholder="MM/YY" {...register("cardExpiry")} error={errors.cardExpiry?.message} />
                    <Input label="Security Code (CVC)" placeholder="123" {...register("cardCvc")} error={errors.cardCvc?.message} />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2 block uppercase tracking-wider">
                    Novara uses encrypted sandbox endpoints. No charge will be placed.
                  </span>
                </div>
              )}

              {selectedPaymentMethod === "gpay" && (
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center mt-4">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Payable Amount: <span className="text-lg font-bold font-editorial">{formatPrice(total)}</span>
                  </span>
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded font-bold text-sm tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-98 transition shadow cursor-pointer mt-4"
                  >
                    <span>Confirm UPI Payment</span>
                  </button>
                  <span className="text-[10px] text-zinc-400 mt-4 block uppercase tracking-wider">
                    Secure transaction powered by sandbox UPI gateways.
                  </span>
                </div>
              )}

              {selectedPaymentMethod === "cod" && (
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-center mt-4">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Pay with cash directly to our delivery courier upon receiving your shipment.
                  </p>
                  <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider mt-4 block">
                    No extra handling fees applied.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Summary panel */}
        <div className="lg:col-span-4">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-zinc-50 dark:bg-zinc-900/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-6">
              Review Order
            </h3>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-[300px] overflow-y-auto pr-2 mb-6">
              {items.map((item) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3 py-3 first:pt-0">
                    <img src={item.product.images[0]} alt="" className="w-10 h-12 object-cover rounded" />
                    <div className="flex-1 text-xs">
                      <h4 className="font-semibold text-zinc-900 dark:text-white truncate max-w-[150px]">{item.product.name}</h4>
                      <span className="text-zinc-400 mt-0.5 block">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{formatPrice(price * item.quantity)}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <hr className="border-zinc-200 dark:border-zinc-800" />
              <div className="flex justify-between text-sm font-bold text-zinc-950 dark:text-white">
                <span>Order Total</span>
                <span className="font-editorial text-base">{formatPrice(total)}</span>
              </div>
            </div>

            <Button variant="primary" type="submit" isLoading={isSubmitting} className="w-full justify-center mt-8">
              Pay {formatPrice(total)}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
