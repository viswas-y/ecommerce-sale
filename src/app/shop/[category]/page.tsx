"use client";

import React, { use } from "react";
import { categories } from "@/data/categories";
import { ShopPageInner } from "../page";
import { Suspense } from "react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

function CategoryPageInner({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;

  // Find the actual category name based on the slug
  const matchedCategory = categories.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase()
  );
  
  const categoryName = matchedCategory ? matchedCategory.name : categorySlug;

  return <ShopPageInner categoryOverride={categoryName} />;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-zinc-500">Loading catalog...</div>}>
      <CategoryPageInner params={params} />
    </Suspense>
  );
}
