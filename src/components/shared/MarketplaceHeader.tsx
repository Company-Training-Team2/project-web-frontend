"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, Search, ShoppingBag, X } from "lucide-react";

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

/**
 * Marketplace top nav, shared by every desktop-oriented screen (Search
 * Results, Booking Details, NoResultsFound). Fully responsive on its own:
 * the full nav row (logo + links + search + icons) renders at `lg:` and up;
 * below that it collapses to a compact bar (back button + logo + a
 * search-icon toggle) so these screens are never left without navigation on
 * phones/tablets, since no separate mobile Figma frame exists for this
 * header specifically.
 */
export default function MarketplaceHeader({ className }: { className?: string }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      {/* Compact bar: <lg */}
      <header className={cn("flex w-full items-center justify-between border-b border-[#e5ded2] bg-[#faf6f0] px-4 py-3 lg:hidden", className)}>
        {mobileSearchOpen ? (
          <div className="flex w-full items-center gap-2">
            <Search className="size-4 shrink-0 text-[#a79a90]" />
            <input
              autoFocus
              type="search"
              placeholder="Search vendors..."
              className="h-9 w-full rounded-full border border-[#e5ded2] bg-white px-3 text-[13px] placeholder:text-[#a79a90] focus:outline-none"
            />
            <button aria-label="Close search" onClick={() => setMobileSearchOpen(false)} className="shrink-0 text-[#252323]">
              <X className="size-5" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => router.back()} aria-label="Back" className="text-[#252323]">
              <ArrowLeft className="size-5" />
            </button>
            <Logo href="/vendors" className="scale-90" />
            <div className="flex items-center gap-3">
              <button aria-label="Search" onClick={() => setMobileSearchOpen(true)} className="text-[#252323]">
                <Search className="size-5" />
              </button>
              {isAuthenticated ? (
                <Link
                  href="/bookings"
                  className="grid size-8 place-items-center rounded-full bg-[#af3718] text-[12px] font-bold text-white"
                  aria-label="Account"
                >
                  {user?.name?.[0]?.toUpperCase() ?? "U"}
                </Link>
              ) : (
                <Link href="/login" className="text-[12px] font-bold text-[#af3718]">
                  Sign In
                </Link>
              )}
            </div>
          </>
        )}
      </header>

      {/* Full nav row: lg+ */}
      <header className={cn("hidden w-full items-center justify-between border-b border-[#e5ded2] bg-[#faf6f0] px-6 py-4 lg:flex xl:px-10", className)}>
        <div className="flex items-center gap-6 xl:gap-10">
          <Logo href="/vendors" />
          <nav className="flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-[#252323] transition hover:text-[#af3718] xl:text-[14px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 xl:gap-6">
          <div className="relative hidden xl:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#a79a90]" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-44 rounded-full border border-[#e5ded2] bg-white pl-9 pr-4 text-[13px] placeholder:text-[#a79a90] focus:outline-none focus:ring-2 focus:ring-[#af3718]/30 xl:w-56"
            />
          </div>
          <button aria-label="Search" className="text-[#252323] transition hover:text-[#af3718] xl:hidden">
            <Search className="size-5" />
          </button>

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
    </>
  );
}
