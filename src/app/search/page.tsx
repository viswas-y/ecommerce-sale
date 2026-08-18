import React from "react";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Search Results", href: "/search" }]} />

      <div className="border-b border-zinc-200 dark:border-zinc-900 pb-6 mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
            Search Results
          </h1>
          <span className="text-xs text-zinc-400 mt-1 block">
            {query ? `Showing ${results.length} items matching "${query}"` : "Enter a search query."}
          </span>
        </div>
      </div>

      <div className="mt-8">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-16 border border-dashed rounded-lg min-h-[300px]">
            <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
              No results found
            </h3>
            <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
              We couldn&apos;t find any items matching your search query. Try looking for items like &quot;Linen&quot;, &quot;Headphones&quot;, &quot;Trousers&quot;.
            </p>
          </div>
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </div>
  );
}
