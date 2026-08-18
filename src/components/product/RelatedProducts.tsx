import React from "react";
import { products } from "@/data/products";
import { ProductGrid } from "../shop/ProductGrid";

interface RelatedProductsProps {
  currentCategory: string;
  currentProductId: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentCategory,
  currentProductId,
}) => {
  const filtered = products
    .filter((p) => p.category === currentCategory && p.id !== currentProductId)
    .slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-900">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 font-editorial mb-8">
        Related Collections
      </h3>
      <ProductGrid products={filtered} />
    </div>
  );
};
