"use client";

import React, { useState } from "react";
import Link from "next/link";
import { orders as initialOrders } from "@/data/orders";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/provider/ToastProvider";

export default function AdminOrdersPage() {
  const { toast } = useToast();
  const [list, setList] = useState(initialOrders);

  const updateStatus = (id: string, newStatus: any) => {
    setList(
      list.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    toast(`Order ${id} marked as "${newStatus}".`, "success");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Orders Ledger
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Track and process customer order shipping status.
        </span>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {list.map((ord) => (
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
                  <td className="px-6 py-4 text-right flex justify-end gap-2.5">
                    <select
                      onChange={(e) => updateStatus(ord.id, e.target.value)}
                      value={ord.status}
                      className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 px-2 py-1 rounded focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
