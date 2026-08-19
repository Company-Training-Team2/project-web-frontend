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
  MessageSquare,
  Wallet,
  ClipboardCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const menu = [
  { icon: LayoutDashboard, title: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, title: "User Management", href: "/admin/users" },
  { icon: Store, title: "Vendor Directory", href: "/admin/vendors" },
  // WorkPost.ApprovalStatus queue — distinct from vendor *account* approval
  // above, which never touches an individual listing's status.
  { icon: ClipboardCheck, title: "Service Listings", href: "/admin/services" },
  { icon: MessageSquare, title: "Messages", href: "/admin/messages" },
  { icon: Wallet, title: "Payments", href: "/admin/payments" },
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
    // Hidden below md — AdminBottomNav (rendered by every /admin/* screen)
    // covers navigation on phones/small tablets instead. Previously this
    // stayed visible as a 64px icon-only rail at every width with no mobile
    // nav fallback at all on 8 of the 9 admin pages.
    <aside className="hidden md:flex md:w-64 bg-[#1B2421] text-white flex-col justify-between min-h-screen shrink-0">
      <div>
        <div className="p-8">
          <h2 className="font-bold text-xl">EventHub</h2>
          <p className="text-xs opacity-60">EXECUTIVE PORTAL</p>
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

        <div className="mt-6 px-4">
          <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Preview
          </p>
          <nav className="space-y-2">
            {previewMenu.map((item) => {
              const isActive = pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-[#2B3632] text-[#E48B58]"
                      : "hover:bg-[#2B3632] text-white/70"
                  }`}
                >
                  <item.icon size={18} className="shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Matches docs/figma/Admin/*.jpeg — no real "admin creates an
            event" concept exists on the backend (Events are scoped to a
            CustomerProfile, not an admin), so this is a placeholder action
            rather than a wired feature. */}
        <div className="px-4 pt-4">
          <button
            onClick={() => toast.info("Coming soon.")}
            className="flex w-full items-center gap-2 rounded-xl bg-[#A3391C] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#8B2E17]"
          >
            <Plus size={18} className="shrink-0" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/70 hover:bg-[#2B3632] hover:text-white transition"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Log Out</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#D97745] text-white font-medium hover:opacity-90 transition">
          <LifeBuoy size={18} className="shrink-0" />
          <span>Live Support</span>
        </button>
      </div>
    </aside>
  );
}
