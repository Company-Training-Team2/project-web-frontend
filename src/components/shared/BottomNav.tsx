"use client";

import Link from "next/link";
import { Compass, Heart, House, User } from "lucide-react";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

type NavKey = "home" | "browse" | "bookings" | "favorites" | "profile";

const ITEMS: { key: NavKey; label: string; href: string; icon: typeof House }[] = [
  { key: "home", label: "Home", href: "/vendors", icon: House },
  { key: "browse", label: "Browse", href: "/vendors", icon: Compass },
  { key: "bookings", label: "Bookings", href: "/bookings", icon: CalendarDays },
  { key: "favorites", label: "Fav", href: "/vendors/search", icon: Heart },
  { key: "profile", label: "Profile", href: "/payment-methods", icon: User },
];

/** Mobile bottom tab bar shared by the customer-facing booking-flow screens.
 * Hidden at `lg:` — desktop screens use MarketplaceHeader's top nav instead. */
export default function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-[#e5ded2] bg-[#fffdfb] px-2 py-2.5 lg:hidden">
      {ITEMS.map(({ key, label, href, icon: Icon }) => {
        const isActive = key === active;
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 text-[10px] font-medium",
              isActive ? "text-[#af3718]" : "text-[#a79a90]"
            )}
          >
            <Icon className="size-5" strokeWidth={isActive ? 2.4 : 2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
