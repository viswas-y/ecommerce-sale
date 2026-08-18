"use client";

import React, { use, useState, useEffect } from "react";
import { products } from "@/data/products";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";
import { useRouter } from "next/navigation";

const productFormSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  sku: z.string().min(4, "SKU must be at least 4 characters"),
  price: z.coerce.number().min(1, "Price is required"),
  salePrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(0, "Stock count must be positive"),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface EditProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const prod = products.find((p) => p.id === resolvedParams.id) || products[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: {
      name: prod.name,
      brand: prod.brand,
      sku: prod.sku,
      price: prod.price,
      salePrice: prod.salePrice,
      stock: prod.stock,
      category: prod.category,
      description: prod.description,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    toast(`Successfully modified product "${data.name}" catalog details!`, "success");
    router.push("/admin/products");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Modify Product
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Edit details of &quot;{prod.name}&quot; in the store database.
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Product Name" {...register("name")} error={errors.name?.message} />
          <Input label="Brand" {...register("brand")} error={errors.brand?.message} />
          <Input label="SKU Code" {...register("sku")} error={errors.sku?.message} />
          <Select
            label="Category"
            options={[
              { label: "Fashion", value: "Fashion" },
              { label: "Electronics", value: "Electronics" },
              { label: "Home & Living", value: "Home & Living" },
              { label: "Beauty & Cosmetics", value: "Beauty & Cosmetics" },
            ]}
            {...register("category")}
            error={errors.category?.message}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Price ($)" type="number" {...register("price")} error={errors.price?.message} />
          <Input label="Sale Price ($)" type="number" {...register("salePrice")} error={errors.salePrice?.message} />
          <Input label="Stock Count" type="number" {...register("stock")} error={errors.stock?.message} />
        </div>

        <div className="w-full flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Description
          </label>
          <textarea
            rows={5}
            {...register("description")}
            className={`w-full px-3.5 py-2.5 rounded-md border text-sm bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-100 ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && <span className="text-xs text-red-500 mt-1">{errors.description.message}</span>}
        </div>

        <div className="flex gap-4">
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            Save Modifications
          </Button>
          <Button variant="outline" type="button" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
