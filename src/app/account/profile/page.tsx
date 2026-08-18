"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account");
  }, [router]);

  return <div className="p-10 text-center text-xs text-zinc-500">Redirecting to profile...</div>;
}
