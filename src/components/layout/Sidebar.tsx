"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  BarChart3,
  Settings,
  LifeBuoy,
} from "lucide-react";

const menu = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/dashboard" },
  { icon: Users, title: "User Management", href: "/users" },
  { icon: Store, title: "Vendor Directory", href: "/vendors" },
  { icon: BarChart3, title: "Analytics", href: "/analytics" },
  { icon: Settings, title: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 md:w-64 bg-[#1B2421] text-white flex flex-col justify-between min-h-screen shrink-0 transition-all">
      <div>
        <div className="p-3 md:p-8">
          <h2 className="font-bold text-xl hidden md:block">EventHub</h2>
          <p className="text-xs opacity-60 hidden md:block">
            EXECUTIVE PORTAL
          </p>
          <div className="md:hidden flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-[#2B3632] flex items-center justify-center font-bold text-sm">
              E
            </div>
          </div>
        </div>

        <nav className="space-y-2 px-2 md:px-4">
          {menu.map((item) => {
            const isActive = pathname?.startsWith(item.href);

            return (
              <Link
                key={item.title}
                href={item.href}
                title={item.title}
                className={`flex items-center justify-center md:justify-start gap-3 w-full px-2 md:px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-[#2B3632] text-[#E48B58]"
                    : "hover:bg-[#2B3632]"
                }`}
              >
                <item.icon size={18} className="shrink-0" />
                <span className="hidden md:inline">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-2 md:p-4">
        <button
          title="Live Support"
          className="flex items-center justify-center md:justify-start gap-3 w-full px-2 md:px-4 py-3 rounded-xl bg-[#D97745] text-white font-medium hover:opacity-90 transition"
        >
          <LifeBuoy size={18} className="shrink-0" />
          <span className="hidden md:inline">Live Support</span>
        </button>
      </div>
    </aside>
  );
}