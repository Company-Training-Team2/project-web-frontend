"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#faf9f7] px-6 text-center">
      <Logo />

      <div className="space-y-3">
        <h1 className="font-serif text-2xl font-bold text-[#252323]">Something went wrong</h1>
        <p className="mx-auto max-w-sm text-[15px] text-[#6d5d54]">
          An unexpected error occurred. Please try again.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={reset}
          className="h-[49px] rounded-[7px] border-[#b23a19] px-8 text-[14px] font-medium text-[#b23a19]"
        >
          Try again
        </Button>
        <Button asChild className="h-[49px] rounded-[7px] bg-[#af3718] px-8 text-[14px] font-medium text-white hover:bg-[#9f3216]">
          <Link href="/login">Back to EventHub</Link>
        </Button>
      </div>
    </main>
  );
}
