"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, CalendarCheck, Heart, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Browse", href: "/vendors" },
  { icon: CalendarCheck, label: "Bookings", href: "/bookings" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: User, label: "Profile", href: "/profile" },
];

// Routes that get this tab bar. An allow-list (rather than excluding admin/
// vendor/auth/event routes one by one) is the safer default here — a route
// added later without updating this list simply won't show the bar, instead
// of silently gaining one it was never designed for.
const visibleOn = ["/", "/vendors", "/bookings", "/favorites", "/profile", "/notifications", "/settings", "/payment-methods"];

/** Fixed bottom tab bar for the main customer flow on mobile web widths —
 * this is a responsive site, not a native app, so it only takes over below
 * the md breakpoint where a sidebar/header nav no longer fits comfortably.
 * Pages that render it must also reserve space at the bottom (see
 * `pb-16 md:pb-0` wrapper in layout.tsx) so the bar doesn't cover content. */
export default function MobileBottomNav() {
  const pathname = usePathname();

  const shouldShow = visibleOn.some((path) =>
    path === "/" ? pathname === "/" : pathname === path || pathname?.startsWith(`${path}/`)
  );

  if (!shouldShow) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#DCCFC0] bg-[#F6ECE0] py-2 [padding-bottom:env(safe-area-inset-bottom)]">
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition ${
              isActive ? "text-[#A3391C]" : "text-[#8B716A]"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
