"use client";

import React from "react";
import { customers } from "@/data/orders";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Customers Registry
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Track customer profiles and total storefront expenditures.
        </span>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {cust.avatar ? (
                      <img src={cust.avatar} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">
                        {cust.name.substring(0, 1)}
                      </div>
                    )}
                    <span className="font-semibold text-zinc-950 dark:text-white">
                      <Link href={`/admin/customers/${cust.id}`} className="hover:underline">
                        {cust.name}
                      </Link>
                    </span>
                  </td>
                  <td className="px-6 py-4">{cust.email}</td>
                  <td className="px-6 py-4">{cust.ordersCount} Orders</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(cust.totalSpent)}</td>
                  <td className="px-6 py-4">{cust.joinedDate}</td>
                  <td className="px-6 py-4">
                    <Badge variant={cust.status === "Active" ? "success" : "secondary"}>
                      {cust.status}
                    </Badge>
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
