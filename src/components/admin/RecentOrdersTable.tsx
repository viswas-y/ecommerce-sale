"use client";

import React from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Badge } from "../ui/Badge";
import { orders } from "@/data/orders";

export const RecentOrdersTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm mt-8">
      <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
        <h3 className="font-bold text-zinc-950 dark:text-zinc-50 font-editorial">Recent Orders</h3>
        <Link href="/admin/orders" className="text-xs uppercase font-bold text-amber-500 hover:opacity-80 transition">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition">
                <td className="px-6 py-4 font-semibold text-zinc-950 dark:text-white">
                  <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                    {ord.id}
                  </Link>
                </td>
                <td className="px-6 py-4">{ord.customerName}</td>
                <td className="px-6 py-4">{ord.date}</td>
                <td className="px-6 py-4 font-semibold">{formatPrice(ord.amount)}</td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      ord.status === "Delivered"
                        ? "success"
                        : ord.status === "Processing"
                        ? "warning"
                        : "primary"
                    }
                  >
                    {ord.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
