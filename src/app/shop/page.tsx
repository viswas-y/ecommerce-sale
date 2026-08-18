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
import { SlidersHorizontal, ArrowUpDown, X, Star, Check } from "lucide-react";
import { Suspense } from "react";

export function ShopPageInner({ categoryOverride }: { categoryOverride?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search Param state keys
  const categoryParam = categoryOverride || searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "featured";
  const searchParam = searchParams.get("q") || "";

  // Page index
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter local attributes states
  const [priceMax, setPriceMax] = useState<number>(1500);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [localSearch, setLocalSearch] = useState<string>(searchParam);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

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
      // 2. Search check (local search bar or query param)
      const searchQuery = localSearch.trim().toLowerCase();
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery) && !p.description.toLowerCase().includes(searchQuery)) {
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
      // 6. Rating limit
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // 7. Availability limit
      if (inStockOnly && p.status === "Out of Stock") {
        return false;
      }
      return true;
    });
  }, [categoryParam, localSearch, priceMax, selectedBrand, selectedColor, minRating, inStockOnly]);

  // Sort logic compute
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortParam === "price-low") {
      arr.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (sortParam === "price-high") {
      arr.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    } else if (sortParam === "rating") {
      arr.sort((a, b) => b.rating - a.rating);
    } else if (sortParam === "newest") {
      arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortParam === "featured") {
      arr.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
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
    setMinRating(0);
    setInStockOnly(false);
    setLocalSearch("");
    const params = new URLSearchParams();
    router.push(`/shop`);
  };

  // Shared Filters Node
  const filtersContent = (
    <div className="flex flex-col gap-8">
      {/* Search Input Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-3">
          Search products
        </h3>
        <Input
          type="text"
          placeholder="Type keywords..."
          value={localSearch}
          onChange={(e) => {
            setLocalSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs py-1.5"
        />
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
          Categories
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              handleCategorySelect("");
              setIsMobileDrawerOpen(false);
            }}
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
              onClick={() => {
                handleCategorySelect(cat.name);
                setIsMobileDrawerOpen(false);
              }}
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
          onChange={(e) => {
            setPriceMax(Number(e.target.value));
            setCurrentPage(1);
          }}
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
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            setCurrentPage(1);
          }}
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
          onChange={(e) => {
            setSelectedColor(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Rating Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
          Minimum Rating
        </h3>
        <div className="flex flex-col gap-2">
          {[0, 4.5, 4.0, 3.5].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() => {
                setMinRating(ratingVal);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 text-sm text-left font-medium transition ${
                minRating === ratingVal
                  ? "text-zinc-950 dark:text-white font-bold"
                  : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center border-zinc-300 dark:border-zinc-700 ${
                minRating === ratingVal ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : ""
              }`}>
                {minRating === ratingVal && <Check size={10} />}
              </div>
              <span>
                {ratingVal === 0 ? "All Ratings" : `${ratingVal} Stars & Above`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white mb-4">
          Availability
        </h3>
        <button
          onClick={() => {
            setInStockOnly(!inStockOnly);
            setCurrentPage(1);
          }}
          className={`flex items-center gap-2 text-sm text-left font-medium transition ${
            inStockOnly
              ? "text-zinc-950 dark:text-white font-bold"
              : "text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
          }`}
        >
          <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center border-zinc-300 dark:border-zinc-700 ${
            inStockOnly ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : ""
          }`}>
            {inStockOnly && <Check size={10} />}
          </div>
          <span>In Stock Only</span>
        </button>
      </div>

      <Button variant="outline" size="sm" onClick={resetFilters} className="w-full justify-center">
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Shop", href: "/shop" }]} />

      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        {/* Desktop Left Side Filters Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-8 bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/40">
          {filtersContent}
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
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Mobile Filter Trigger */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 text-xs py-2"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </Button>

              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-zinc-400" />
                <Select
                  options={[
                    { label: "Featured", value: "featured" },
                    { label: "New Arrivals", value: "newest" },
                    { label: "Price: Low to High", value: "price-low" },
                    { label: "Price: High to Low", value: "price-high" },
                    { label: "Top Rated", value: "rating" },
                  ]}
                  value={sortParam}
                  onChange={handleSortChange}
                  className="w-36 sm:w-48 text-xs py-1.5"
                />
              </div>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg min-h-[300px]">
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

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer content panel */}
          <div className="relative flex flex-col w-full max-w-xs h-full bg-white dark:bg-zinc-950 p-6 overflow-y-auto shadow-2xl border-r border-zinc-200 dark:border-zinc-800 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-editorial text-zinc-950 dark:text-white">Filters</h2>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            {filtersContent}
          </div>
        </div>
      )}
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
