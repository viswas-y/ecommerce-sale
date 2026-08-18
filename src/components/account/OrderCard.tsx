import React from "react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "../ui/Badge";
import Link from "next/link";
import { Button } from "../ui/Button";

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 shadow-xs">
      {/* Header bar summary details */}
      <div className="flex flex-wrap justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/50 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="flex gap-8">
          <div>
            <span className="text-zinc-400 font-semibold uppercase tracking-wider block mb-1">
              Date Placed
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{order.date}</span>
          </div>
          <div>
            <span className="text-zinc-400 font-semibold uppercase tracking-wider block mb-1">
              Total Price
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{formatPrice(order.amount)}</span>
          </div>
          <div>
            <span className="text-zinc-400 font-semibold uppercase tracking-wider block mb-1">
              Shipment Status
            </span>
            <Badge
              variant={
                order.status === "Delivered"
                  ? "success"
                  : order.status === "Processing"
                  ? "warning"
                  : "primary"
              }
              className="mt-0.5"
            >
              {order.status}
            </Badge>
          </div>
        </div>
        <div>
          <span className="text-zinc-400 font-semibold uppercase tracking-wider block mb-1">
            Order Identification
          </span>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">{order.id}</span>
        </div>
      </div>

      {/* Main items listing content */}
      <div className="p-6 divide-y divide-zinc-100 dark:divide-zinc-900">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <div className="relative w-16 h-20 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded border border-zinc-200 dark:border-zinc-800">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{item.name}</h4>
                <div className="flex gap-4 text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-1">
                  {item.color && <span>Color: {item.color}</span>}
                  {item.size && <span>Size: {item.size}</span>}
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 mt-2 block">
                {formatPrice(item.price)}
              </span>
            </div>
            <div className="flex items-end">
              <Link href={`/product/${order.items[0].productId}`}>
                <Button variant="outline" size="sm">
                  Buy Again
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
