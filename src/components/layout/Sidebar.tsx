"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  BarChart3,
  FileText,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const menu = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, title: "User Management", href: "/admin/users" },
  { icon: Store, title: "Vendor Directory", href: "/admin/vendors" },
  { icon: BarChart3, title: "Analytics", href: "/admin/analytics" },
  { icon: FileText, title: "Reports", href: "/admin/reports" },
  { icon: Settings, title: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

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

      <div className="space-y-2 p-2 md:p-4">
        <button
          onClick={handleLogout}
          title="Log Out"
          className="flex items-center justify-center md:justify-start gap-3 w-full px-2 md:px-4 py-3 rounded-xl text-white/70 hover:bg-[#2B3632] hover:text-white transition"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="hidden md:inline">Log Out</span>
        </button>
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
