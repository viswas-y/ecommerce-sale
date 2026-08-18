import React from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArrowRight } from "lucide-react";

export default function BlogListingPage() {
  const featured = blogPosts.find((p) => p.isFeatured) || blogPosts[0];
  const list = blogPosts.filter((p) => p.id !== featured.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb items={[{ label: "Journal", href: "/blog" }]} />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial mt-4">
        Our Journal & Musings
      </h1>

      {/* Featured Article showcase banner */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-200 dark:border-zinc-900 pb-12">
        <div className="lg:col-span-7 relative aspect-[16/10] bg-zinc-100 rounded-md overflow-hidden">
          <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
            Featured in {featured.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-editorial text-zinc-950 dark:text-white leading-tight">
            {featured.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
            {featured.summary}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <img src={featured.author.avatar} alt={featured.author.name} className="w-8 h-8 rounded-full" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-white block">{featured.author.name}</span>
              <span className="text-zinc-400">{featured.date} &bull; {featured.readingTime}</span>
            </div>
          </div>
          <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-950 dark:text-white hover:opacity-80 transition mt-4">
            <span>Read Article</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Remaining journal items listing grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {list.map((post) => (
          <div key={post.id} className="flex flex-col gap-4">
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] bg-zinc-100 rounded overflow-hidden">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-103 transition duration-500" />
            </Link>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                {post.category}
              </span>
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white font-editorial leading-tight">
                  {post.title}
                </h3>
              </Link>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mt-1">
                {post.summary}
              </p>
              <span className="text-[10px] text-zinc-400 mt-2 block font-semibold">
                {post.date} &bull; {post.readingTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
