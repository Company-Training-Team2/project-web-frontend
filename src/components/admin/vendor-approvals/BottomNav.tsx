"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UserSearch, History, CircleUser } from "lucide-react";

const items = [
  { icon: Home, label: "Home", href: "/admin/vendor-approvals/home" },
  { icon: UserSearch, label: "Users", href: "/admin/vendor-approvals" },
  { icon: History, label: "Logs", href: "/admin/vendor-approvals/logs" },
  { icon: CircleUser, label: "Profile", href: "/admin/vendor-approvals/profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F6ECE0] border-t border-[#DCCFC0] flex items-center justify-around py-2">
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