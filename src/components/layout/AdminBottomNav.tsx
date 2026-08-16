"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Store, BarChart3, Settings } from "lucide-react";

// Mobile counterpart to Sidebar.tsx (hidden below md) — trimmed to the 5
// most-used destinations out of Sidebar's full menu (Payments/Reports/
// Messages stay reachable from the desktop sidebar) to keep the bar
// legible on a phone, same trimming precedent as VendorBottomNav.
const items = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Store, label: "Vendors", href: "/admin/vendors" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F6ECE0] border-t border-[#DCCFC0] flex items-center justify-around py-2">
      {items.map((item) => {
        const isActive = pathname?.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${
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
