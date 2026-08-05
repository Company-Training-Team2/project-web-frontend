import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** Floating shortcut to the AI Planner, seen bottom-right on Browse Vendors,
 * Booking Screen, and My Bookings. */
export default function SparkleFab({ className }: { className?: string }) {
  return (
    <Link
      href="/ai-planner"
      aria-label="Open AI Planner"
      className={cn(
        "fixed right-5 bottom-24 z-30 grid size-14 place-items-center rounded-full bg-[#af3718] text-white shadow-[0_10px_24px_rgba(175,55,24,0.35)] transition hover:bg-[#9f3216] lg:bottom-10",
        className
      )}
    >
      <Sparkles className="size-6" />
    </Link>
  );
}
