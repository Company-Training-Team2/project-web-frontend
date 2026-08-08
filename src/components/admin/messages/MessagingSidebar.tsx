"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Store,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/admin/dashboard" },
  { icon: CalendarDays, title: "Events", href: "/admin/events" },
  { icon: Store, title: "Vendors", href: "/vendors" },
  { icon: Users, title: "Clients", href: "/admin/messages" },
  { icon: BarChart3, title: "Analytics", href: "/admin/reports" },
];

const footerMenu = [
  { icon: Settings, title: "Settings", href: "/admin/settings" },
  { icon: HelpCircle, title: "Support", href: "/admin/support" },
];

export default function MessagingSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-56 bg-[#1B2421] text-white flex-col justify-between min-h-screen shrink-0">
      <div>
        <div className="p-6">
          <h2 className="font-serif font-bold text-lg">EventHub</h2>
          <p className="text-[10px] opacity-60 mt-0.5">ADMIN PORTAL</p>
        </div>

        <nav className="space-y-1 px-3">
          {menu.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition
                ${
                  isActive
                    ? "bg-[#2B3632] text-[#E48B58] border-l-2 border-[#A3391C]"
                    : "hover:bg-[#2B3632]"
                }`}
              >
                <item.icon size={16} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 space-y-1">
        {footerMenu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-[#2B3632] transition"
          >
            <item.icon size={16} />
            {item.title}
          </Link>
        ))}
      </div>
    </aside>
  );
}