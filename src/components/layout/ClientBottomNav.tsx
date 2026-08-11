"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, CalendarCheck, Heart, Plus } from "lucide-react";

// "Bookings"/"Favorites" point at the real top-level /bookings and
// /favorites pages (there's no /event/bookings or /event/favorites route —
// those were dead links) since bookings/favorites aren't scoped to a
// single event anyway.
const items = [
  { icon: Home, label: "Home", href: "/event/dashboard" },
  { icon: Compass, label: "Browse", href: "/event/vendors" },
  { icon: CalendarCheck, label: "Bookings", href: "/bookings" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
];

export default function ClientBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F6ECE0] border-t border-[#DCCFC0] flex items-center justify-around py-2 z-40">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition ${
              isActive ? "text-[#A3391C]" : "text-[#8B716A]"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}