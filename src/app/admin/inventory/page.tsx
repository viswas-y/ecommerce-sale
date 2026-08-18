"use client";

import React, { useState } from "react";
import { products as initialProducts } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";

export default function AdminInventoryPage() {
  const { toast } = useToast();
  const [list, setList] = useState(initialProducts);

  const handleRestock = (id: string, name: string) => {
    setList(
      list.map((p) => (p.id === id ? { ...p, stock: p.stock + 20, status: "In Stock" as const } : p))
    );
    toast(`Restocked 20 units for "${name}".`, "success");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Inventory Control
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Track item stock counts and trigger bulk restocks.
        </span>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Level Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {list.map((prod) => (
                <tr key={prod.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition">
                  <td className="px-6 py-4 font-semibold text-zinc-950 dark:text-white">{prod.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{prod.sku}</td>
                  <td className="px-6 py-4">{prod.stock} items</td>
                  <td className="px-6 py-4">
                    <Badge variant={prod.stock === 0 ? "danger" : prod.stock < 10 ? "warning" : "success"}>
                      {prod.stock === 0 ? "Out of Stock" : prod.stock < 10 ? "Low Stock" : "In Stock"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" onClick={() => handleRestock(prod.id, prod.name)}>
                      Restock +20
                    </Button>
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
