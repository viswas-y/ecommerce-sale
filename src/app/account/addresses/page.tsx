"use client";

import React, { useState } from "react";
import { useToast } from "@/components/provider/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AddressesPage() {
  const { toast } = useToast();
  const [address, setAddress] = useState({
    street: "124 W 18th St, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10011",
    country: "United States",
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Address updated successfully!", "success");
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 rounded-lg shadow-xs">
      <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 font-editorial mb-6">
        Saved Addresses
      </h2>
      <form onSubmit={handleUpdate} className="space-y-6 max-w-xl">
        <Input
          label="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <Input
            label="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <Input
            label="ZIP"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
          />
        </div>
        <Button variant="primary" type="submit">
          Update Address
        </Button>
      </form>
    </div>
  );
}
