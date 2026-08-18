import React from "react";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, slug, image }) => {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(name)}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900"
    >
      <img
        src={image}
        alt={`${name} collection`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex flex-col justify-end p-6">
        <div className="flex justify-between items-center text-white">
          <h3 className="text-lg font-bold tracking-wide font-editorial">{name}</h3>
          <ArrowRight className="w-5 h-5 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
    </Link>
  );
};
