"use client";

import React, { useState } from "react";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/provider/ToastProvider";

export default function AdminReviewsPage() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      author: "Juliana V.",
      rating: 5,
      date: "2 weeks ago",
      title: "Pure Luxury",
      content: "Exactly as described. The craftsmanship is pristine, the material weight is perfect.",
      approved: false,
    },
    {
      id: "rev-2",
      author: "Marc K.",
      rating: 4.5,
      date: "1 month ago",
      title: "Excellent structure and fit",
      content: "Beautiful drape. Fits slightly relaxed as noted in description. Material is very breathable.",
      approved: true,
    },
  ]);

  const handleApprove = (id: string) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
    toast("Review approved and published to product page.", "success");
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
    toast("Review entry deleted.", "info");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-editorial">
          Reviews Moderation
        </h1>
        <span className="text-xs text-zinc-400 mt-1 block">
          Approve or reject customer review submissions.
        </span>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 divide-y divide-zinc-200 dark:divide-zinc-800">
        {reviews.map((rev) => (
          <div key={rev.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-zinc-900 dark:text-white">{rev.author}</span>
                <span className="text-xs text-zinc-400">{rev.date}</span>
                <Badge variant={rev.approved ? "success" : "warning"}>
                  {rev.approved ? "Approved" : "Pending Approval"}
                </Badge>
              </div>
              <RatingStars rating={rev.rating} />
              <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mt-2">{rev.title}</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">{rev.content}</p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {!rev.approved && (
                <Button variant="primary" size="sm" onClick={() => handleApprove(rev.id)}>
                  Approve
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => handleDelete(rev.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
