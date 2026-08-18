"use client";

import React, { useEffect, useState } from "react";
import { orders as defaultOrders } from "@/data/orders";
import { OrderCard } from "@/components/account/OrderCard";
import { useUiStore } from "@/store/useUiStore";
import { Order } from "@/types";

export default function OrderHistoryPage() {
  const { user } = useUiStore();
  const [ordersList, setOrdersList] = useState<Order[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = user?.email || "sarah.j@example.com";
      const stored = localStorage.getItem("novara-local-orders");
      const localList: Order[] = stored ? JSON.parse(stored) : [];
      
      const filteredDefaults = defaultOrders.filter((o) => o.customerEmail === email);
      setOrdersList([...localList, ...filteredDefaults]);
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-editorial mb-4">
        Order History
      </h2>
      {ordersList.length === 0 ? (
        <p className="text-sm text-zinc-500">No orders found.</p>
      ) : (
        ordersList.map((ord) => <OrderCard key={ord.id} order={ord} />)
      )}
    </div>
  );
}
