"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";

import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Venues", href: "/vendors/search?category=venue" },
  { label: "Catering", href: "/vendors/search?category=catering" },
  { label: "Floral", href: "/vendors/search?category=florals" },
  { label: "Planning", href: "/vendors/search?category=planning" },
];

/** Desktop top nav shared by the marketplace/booking-flow desktop screens
 * (Search Results Desktop, Booking Details Desktop, NoResultsFound). Hidden
 * below `lg:` — mobile screens use BottomNav instead. */
export default function MarketplaceHeader({ className }: { className?: string }) {
  const { user, isAuthenticated } = useAuth();

  return (
    <header
      className={cn(
        "hidden w-full items-center justify-between border-b border-[#e5ded2] bg-[#faf6f0] px-10 py-4 lg:flex",
        className
      )}
    >
      <div className="flex items-center gap-10">
        <Logo href="/vendors" />
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-[#252323] transition hover:text-[#af3718]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#a79a90]" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-56 rounded-full border border-[#e5ded2] bg-white pl-9 pr-4 text-[13px] placeholder:text-[#a79a90] focus:outline-none focus:ring-2 focus:ring-[#af3718]/30"
          />
        </div>

        <button aria-label="Wishlist" className="text-[#252323] transition hover:text-[#af3718]">
          <Heart className="size-5" />
        </button>
        <button aria-label="Cart" className="text-[#252323] transition hover:text-[#af3718]">
          <ShoppingBag className="size-5" />
        </button>

        {isAuthenticated ? (
          <Link
            href="/bookings"
            className="grid size-9 place-items-center rounded-full bg-[#af3718] text-[13px] font-bold text-white"
            aria-label="Account"
          >
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </Link>
        ) : (
          <Button asChild size="sm" className="bg-[#af3718] hover:bg-[#9f3216]">
            <Link href="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
