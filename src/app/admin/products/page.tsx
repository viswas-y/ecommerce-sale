"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products as initialProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Trash2, Edit, Plus } from "lucide-react";
import { useToast } from "@/components/provider/ToastProvider";

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [list, setList] = useState(initialProducts);

  const handleDelete = (id: string, name: string) => {
    setList(list.filter((p) => p.id !== id));
    toast(`Successfully deleted ${name} from products list.`, "info");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Products Catalog
          </h1>
          <span className="text-xs text-zinc-400 mt-1 block">
            Manage your store items, details, and color variants values.
          </span>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary" className="gap-2">
            <Plus size={16} />
            <span>Add Product</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 text-zinc-400 text-xs font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4">Product details</th>
                <th className="px-6 py-4">SKU Code</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {list.map((prod) => (
                <tr key={prod.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={prod.images[0]} alt="" className="w-8 h-10 object-cover rounded" />
                    <div>
                      <span className="font-semibold text-zinc-950 dark:text-white block">{prod.name}</span>
                      <span className="text-[10px] text-zinc-450 uppercase font-bold tracking-wider">{prod.brand}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{prod.sku}</td>
                  <td className="px-6 py-4">{prod.category}</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(prod.salePrice ?? prod.price)}</td>
                  <td className="px-6 py-4">{prod.stock} items</td>
                  <td className="px-6 py-4">
                    <Badge variant={prod.stock === 0 ? "danger" : prod.stock < 10 ? "warning" : "success"}>
                      {prod.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2.5">
                    <Link href={`/admin/products/${prod.id}/edit`}>
                      <button className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded transition">
                        <Edit size={14} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(prod.id, prod.name)}
                      className="text-zinc-400 hover:text-red-500 p-1.5 rounded transition"
                    >
                      <Trash2 size={14} />
                    </button>
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
