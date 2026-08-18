"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

interface OrderInfo {
  orderNo: string;
  itemsCount: number;
  total: number;
  address: string;
}

export default function OrderSuccessPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("novara-latest-order");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrderInfo(JSON.parse(stored));
      }
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <CheckCircle2 className="w-16 h-16 text-zinc-950 dark:text-white mb-6" />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
        Thank You for Your Order
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 max-w-sm">
        We have received your payment details and are processing the items inside your shipment.
      </p>

      {orderInfo && (
        <div className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 my-8 text-left space-y-4 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <span className="font-semibold uppercase tracking-wider text-zinc-400">Order Number</span>
            <span className="font-bold text-zinc-950 dark:text-zinc-50 text-sm">{orderInfo.orderNo}</span>
          </div>
          <div className="flex justify-between">
            <span>Items count</span>
            <span className="font-semibold text-zinc-900 dark:text-white">{orderInfo.itemsCount} Items</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated delivery</span>
            <span className="font-semibold text-zinc-900 dark:text-white">3 – 5 Business Days</span>
          </div>
          <div className="flex justify-between items-start">
            <span>Shipping address</span>
            <span className="font-semibold text-zinc-900 dark:text-white max-w-[200px] text-right">
              {orderInfo.address}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-950 dark:text-white">
            <span>Total charged</span>
            <span className="font-editorial text-base">{formatPrice(orderInfo.total)}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Link href="/shop" className="flex-1 sm:flex-initial">
          <Button variant="primary" className="w-full justify-center gap-2">
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Button>
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 px-5 py-2.5 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-medium transition"
        >
          <Printer size={14} />
          <span>Print Receipt</span>
        </button>
      </div>
    </div>
  );
}
