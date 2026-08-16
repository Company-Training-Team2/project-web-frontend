"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  Calendar,
  MessageSquare,
  BarChart3,
  Star,
  User,
  Settings,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/vendor/dashboard" },
  { icon: Briefcase, title: "Services", href: "/vendor/services" },
  { icon: CalendarDays, title: "Bookings", href: "/vendor/bookings" },
  { icon: Calendar, title: "Calendar", href: "/vendor/calendar" },
  { icon: MessageSquare, title: "Messages", href: "/vendor/messages" },
  { icon: BarChart3, title: "Analytics", href: "/vendor/analytics" },
  { icon: Star, title: "Reviews", href: "/vendor/reviews" },
];

const footerMenu = [
  { icon: User, title: "Profile", href: "/vendor/profile" },
  { icon: Settings, title: "Settings", href: "/vendor/settings" },
];

export default function VendorSidebar() {
  const pathname = usePathname();

  return (
    // Hidden below md — VendorBottomNav (rendered by every /vendor/* screen)
    // covers navigation on phones/small tablets instead. Previously this
    // stayed visible as a 64px icon-only rail at every width, so mobile
    // showed both the rail AND the bottom tab bar at once, eating ~17% of a
    // 375px viewport for a redundant second nav.
    <aside className="hidden md:flex md:w-64 bg-[#1B2421] text-white flex-col justify-between min-h-screen shrink-0">
      <div>
        <div className="p-8">
          <h2 className="font-bold text-xl">Maison Events</h2>
          <p className="text-xs opacity-60">PREMIUM VENDOR</p>
        </div>

        <nav className="space-y-2 px-4">
          {menu.map((item) => {
            const isActive = pathname?.startsWith(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-[#2B3632] text-[#E48B58]"
                    : "hover:bg-[#2B3632]"
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 space-y-2">
        {footerMenu.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
              ${
                isActive
                  ? "bg-[#2B3632] text-[#E48B58]"
                  : "hover:bg-[#2B3632]"
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}