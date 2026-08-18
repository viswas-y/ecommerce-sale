"use client";

import React, { use } from "react";
import { orders } from "@/data/orders";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DetailProps {
  params: Promise<{ id: string }>;
}

export default function AdminOrderDetailPage({ params }: DetailProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { toast } = useToast();
  const ord = orders.find((o) => o.id === id);

  if (!ord) {
    notFound();
  }

  const handleMarkProcessed = () => {
    toast(`Order ${ord.id} marked as Processing.`, "success");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft size={14} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Order Details: {ord.id}
          </h1>
          <span className="text-xs text-zinc-400 mt-1 block">
            Placed on {ord.date} &bull; Payment Method: {ord.paymentMethod}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Shipping details */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Shipping Address
          </h3>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">
            <p className="font-bold text-zinc-950 dark:text-white">{ord.customerName}</p>
            <p className="mt-1">{ord.shippingAddress.address}</p>
            <p>{ord.shippingAddress.city}, {ord.shippingAddress.state} {ord.shippingAddress.zip}</p>
            <p>{ord.shippingAddress.country}</p>
          </div>
        </div>

        {/* Payment summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Payment Summary
          </h3>
          <div className="text-sm space-y-2 text-zinc-700 dark:text-zinc-300">
            <div className="flex justify-between">
              <span>Status</span>
              <Badge variant="success">{ord.paymentStatus}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Gateway</span>
              <span className="font-semibold text-zinc-950 dark:text-white">{ord.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Charged</span>
              <span className="font-bold text-zinc-950 dark:text-white">{formatPrice(ord.amount)}</span>
            </div>
          </div>
        </div>

        {/* Fulfillment */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Fulfillment Status
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={ord.status === "Delivered" ? "success" : "warning"}>{ord.status}</Badge>
            </div>
          </div>
          <Button variant="primary" onClick={handleMarkProcessed} className="w-full justify-center text-xs py-2">
            Process Shipment
          </Button>
        </div>
      </div>

      {/* Items list */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-950 dark:text-zinc-50 font-editorial">Order Items</h3>
        </div>
        <div className="p-6 divide-y divide-zinc-200 dark:divide-zinc-800">
          {ord.items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <img src={item.image} alt="" className="w-12 h-14 object-cover rounded" />
              <div className="flex-1 flex justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{item.name}</h4>
                  <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-1">
                    {item.color && <span>Color: {item.color}</span>}
                    {item.size && <span>Size: {item.size}</span>}
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
