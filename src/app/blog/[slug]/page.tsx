"use client";

import React, { use } from "react";
import { blogPosts } from "@/data/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <Breadcrumb
        items={[
          { label: "Journal", href: "/blog" },
          { label: post.category, href: `/blog?category=${post.category}` },
        ]}
      />

      {/* Meta headers */}
      <header className="mt-6 flex flex-col gap-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500">
          Published in {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-zinc-950 dark:text-white leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between border-y border-zinc-100 dark:border-zinc-900 py-4 mt-2">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-white block">{post.author.name}</span>
              <span className="text-zinc-400">{post.author.role}</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
            <span>{post.date}</span>
            <span className="mx-2">&bull;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Large Featured cover image */}
      <div className="relative aspect-[16/9] bg-zinc-100 rounded-md overflow-hidden my-8">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Rich Markdown html body content */}
      <div
        className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Actions footer tools */}
      <footer className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex justify-between items-center text-xs">
        <Link href="/blog" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition">
          <ArrowLeft size={14} />
          <span>Back to Journal</span>
        </Link>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition"
        >
          <Share2 size={14} />
          <span>Share Link</span>
        </button>
      </footer>
    </article>
  );
}
