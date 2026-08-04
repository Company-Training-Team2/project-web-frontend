import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#faf9f7] px-6 text-center">
      <Logo />

      <div className="space-y-3">
        <p className="font-serif text-[96px] font-bold leading-none text-[#b23a19]">404</p>
        <h1 className="font-serif text-2xl font-bold text-[#252323]">Page not found</h1>
        <p className="mx-auto max-w-sm text-[15px] text-[#6d5d54]">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>

      <Button asChild className="h-[49px] rounded-[7px] bg-[#af3718] px-8 text-[14px] font-medium text-white hover:bg-[#9f3216]">
        <Link href="/login">Back to EventHub</Link>
      </Button>
    </main>
  );
}
