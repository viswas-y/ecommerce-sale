"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Pagination } from "@/components/ui/Pagination";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

import { Suspense } from "react";

function ShopPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search Param state keys
  const categoryParam = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "featured";
  const searchParam = searchParams.get("q") || "";

  // Page index
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter local attributes states
  const [priceMax, setPriceMax] = useState<number>(1500);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Extract unique brands and colors
  const allBrands = useMemo(() => {
    const brandsSet = new Set(products.map((p) => p.brand));
    return Array.from(brandsSet);
  }, []);

  const allColors = useMemo(() => {
    const colorsSet = new Set<string>();
    products.forEach((p) => p.colors.forEach((c) => colorsSet.add(c)));
    return Array.from(colorsSet);
  }, []);

  // Filter logic compute
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Category check
      if (categoryParam && p.category.toLowerCase() !== categoryParam.toLowerCase()) {
        return false;
      }
      // 2. Search check
      if (searchParam && !p.name.toLowerCase().includes(searchParam.toLowerCase())) {
        return false;
      }
      // 3. Price limit
      const currentPrice = p.salePrice ?? p.price;
      if (currentPrice > priceMax) {
        return false;
      }
      // 4. Brand limit
      if (selectedBrand && p.brand !== selectedBrand) {
        return false;
      }
      // 5. Color limit
      if (selectedColor && !p.colors.includes(selectedColor)) {
        return false;
      }
      return true;
    });
  }, [categoryParam, searchParam, priceMax, selectedBrand, selectedColor]);

  // Sort logic compute
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortParam === "price-low") {
      arr.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (sortParam === "price-high") {
      arr.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    } else if (sortParam === "rating") {
      arr.sort((a, b) => b.rating - a.rating);
    }
    return arr;
  }, [filteredProducts, sortParam]);

  // Pagination details
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const handleCategorySelect = (catName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (catName) {
      params.set("category", catName);
    } else {
      params.delete("category");
    }
    params.delete("q"); // clear text search when navigating categories
    setCurrentPage(1);
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  const resetFilters = () => {
    setPriceMax(1500);
    setSelectedBrand("");
    setSelectedColor("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Shop", href: "/shop" }]} />

      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        {/* Left Side Filters Sidebar (Desktop) */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/40">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Categories
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleCategorySelect("")}
                className={`text-left text-sm py-1 font-medium transition ${
                  categoryParam === ""
                    ? "text-zinc-950 dark:text-white font-bold"
                    : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                All Departments
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`text-left text-sm py-1 font-medium transition ${
                    categoryParam.toLowerCase() === cat.name.toLowerCase()
                      ? "text-zinc-950 dark:text-white font-bold"
                      : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Price Range Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Max Price: ${priceMax}
            </h3>
            <input
              type="range"
              min="20"
              max="1500"
              step="20"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-zinc-950 dark:accent-white"
            />
          </div>

          <hr className="border-zinc-200 dark:border-zinc-800" />

          {/* Brand Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Brands
            </h3>
            <Select
              options={[{ label: "All Brands", value: "" }, ...allBrands.map((b) => ({ label: b, value: b }))]}
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
          </div>

          {/* Colors Filter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
              Colors
            </h3>
            <Select
              options={[{ label: "All Colors", value: "" }, ...allColors.map((c) => ({ label: c, value: c }))]}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </div>

          <Button variant="outline" size="sm" onClick={resetFilters} className="w-full justify-center">
            Reset Filters
          </Button>
        </aside>

        {/* Right side Products Grid panel */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-zinc-200 dark:border-zinc-900 pb-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
                {categoryParam ? `${categoryParam}` : "Shop Essentials"}
              </h1>
              <span className="text-xs text-zinc-400 mt-1 block">
                Showing {sortedProducts.length} items
              </span>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowUpDown size={14} className="text-zinc-400" />
                <Select
                  options={[
                    { label: "Featured", value: "featured" },
                    { label: "Price: Low to High", value: "price-low" },
                    { label: "Price: High to Low", value: "price-high" },
                    { label: "Top Rated", value: "rating" },
                  ]}
                  value={sortParam}
                  onChange={handleSortChange}
                  className="w-full sm:w-48 text-xs py-1.5"
                />
              </div>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed rounded-lg min-h-[300px]">
              <span className="text-sm text-zinc-400">No items match your selected filter options.</span>
              <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <ProductGrid products={paginatedProducts} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-zinc-500">Loading catalog...</div>}>
      <ShopPageInner />
    </Suspense>
  );
}
