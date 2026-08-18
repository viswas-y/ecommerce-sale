"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WishlistRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/wishlist");
  }, [router]);

  return <div className="p-10 text-center text-xs text-zinc-500">Redirecting to wishlist...</div>;
}

