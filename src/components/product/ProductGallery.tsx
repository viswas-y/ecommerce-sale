"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Large preview showcase */}
      <div className="relative aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 overflow-hidden rounded-md border border-zinc-100 dark:border-zinc-900">
        <img
          src={images[activeIndex]}
          alt="Product details view"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails grid */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 rounded overflow-hidden border-2 shrink-0 ${
                activeIndex === idx
                  ? "border-zinc-950 dark:border-white"
                  : "border-transparent"
              } transition`}
            >
              <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
