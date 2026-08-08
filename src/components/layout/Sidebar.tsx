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
  Plus,
  UserCircle,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const menu = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, title: "User Management", href: "/admin/users" },
  { icon: Store, title: "Vendor Directory", href: "/admin/vendors" },
  { icon: BarChart3, title: "Analytics", href: "/admin/analytics" },
  { icon: FileText, title: "Reports", href: "/admin/reports" },
  { icon: Settings, title: "Settings", href: "/admin/settings" },
];

// Quick jump-off points so an admin can browse the actual customer/vendor
// experience without logging out — these pages carry no role gate, but any
// role-scoped API call inside them (e.g. /api/vendor/*) still requires a
// Vendor/Customer token on the backend, so treat this as a visual preview,
// not a real "log in as" switch.
const previewMenu = [
  { icon: UserCircle, title: "Customer View", href: "/dashboard" },
  { icon: Briefcase, title: "Vendor View", href: "/vendor/dashboard" },
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

        <div className="mt-6 px-2 md:px-4">
          <p className="hidden md:block px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Preview
          </p>
          <nav className="space-y-2">
            {previewMenu.map((item) => {
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
                      : "hover:bg-[#2B3632] text-white/70"
                  }`}
                >
                  <item.icon size={18} className="shrink-0" />
                  <span className="hidden md:inline">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Matches docs/figma/Admin/*.jpeg — no real "admin creates an
            event" concept exists on the backend (Events are scoped to a
            CustomerProfile, not an admin), so this is a placeholder action
            rather than a wired feature. */}
        <div className="px-2 pt-4 md:px-4">
          <button
            onClick={() => toast.info("Coming soon.")}
            title="New Event"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A3391C] px-2 py-3 text-sm font-medium text-white transition hover:bg-[#8B2E17] md:justify-start md:px-4"
          >
            <Plus size={18} className="shrink-0" />
            <span className="hidden md:inline">New Event</span>
          </button>
        </div>
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
