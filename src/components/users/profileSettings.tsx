"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Bookmark,
  CreditCard,
  Bell,
  LogOut,
  Search,
  Crown,
} from "lucide-react";
import BottomNav from "@/components/shared/BottomNav";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { userService, UserProfile } from "@/services/user.service";
import { homeService } from "@/services/home.service";

// "Saved vendors"/"Payment methods"/"Notifications" used to point at
// /profile/saved-vendors, /profile/payment-methods, /profile/notifications —
// none of which exist (see README "Known issues"). Retargeted at the real
// routes. "Help center" had nowhere real to go (no /help page anywhere in
// this app) so it's dropped rather than link to a 404.
const settingsItems = [
  {
    icon: User,
    title: "Edit profile",
    desc: "Update your personal details",
    href: "/profile/edit",
  },
  {
    icon: Bookmark,
    title: "Saved vendors",
    desc: "View your shortlisted vendors",
    href: "/favorites",
  },
  {
    icon: CreditCard,
    title: "Payment methods",
    desc: "Manage cards and billing",
    href: "/payment-methods",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Alerts and updates",
    href: "/notifications",
  },
];

// Was rendering <Sidebar/> from components/layout/Sidebar — that's the
// admin executive-portal nav (Dashboard/User Management/Vendor Directory/
// Analytics/Reports/Admin Settings, "EXECUTIVE PORTAL" branding, and a
// logout button that sent customers to /admin/login). A signed-in customer
// viewing their own profile was getting the admin's navigation instead of
// their own. Swapped for the same BottomNav other customer screens use.
export default function ProfileSettings() {
  useRequireAuth();
  const { logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookingCount, setBookingCount] = useState<number | null>(null);

  useEffect(() => {
    userService.getMe().then(setProfile).catch(() => setProfile(null));
    homeService
      .getDashboard()
      .then((d) => setBookingCount(d.pendingBookingsCount + d.confirmedBookingsCount))
      .catch(() => setBookingCount(null));
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1EB] overflow-x-hidden pb-20 lg:pb-6">
      <main className="p-3 md:p-6 min-w-0 overflow-x-hidden">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search settings"
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            {/* Profile summary card */}
            <div className="h-fit rounded-2xl border border-border bg-card p-6 text-center">
              <img
                src={profile?.avatarUrl || "https://i.pravatar.cc/160?img=47"}
                alt={profile?.fullName ?? "Profile photo"}
                className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-background object-cover shadow-sm"
              />
              <h2 className="text-lg font-semibold">{profile?.fullName || "—"}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{profile?.email ?? ""}</p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Crown className="h-3 w-3" />
                  Premium member
                </span>
                {bookingCount !== null ? (
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                    {bookingCount} bookings
                  </span>
                ) : null}
              </div>

              <Link
                href="/profile/edit"
                className="mt-6 block w-full rounded-lg border border-border py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Edit profile
              </Link>
            </div>

            {/* Right column: settings grid + promo */}
            <div className="flex flex-col gap-6 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {settingsItems.map(({ icon: Icon, title, desc, href }) => (
                  <Link
                    key={title}
                    href={href}
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                  </Link>
                ))}

                <button
                  onClick={() => logout()}
                  className="flex items-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-left transition-colors hover:bg-destructive/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-destructive">
                      Sign out
                    </p>
                    <p className="mt-0.5 text-xs text-destructive/70">
                      Securely log out of session
                    </p>
                  </div>
                </button>
              </div>

              {/* Promo banner */}
              <div className="relative overflow-hidden rounded-2xl bg-secondary px-6 py-7 sm:px-8 text-secondary-foreground">
                <div className="relative z-10 max-w-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-accent">
                    Plan your next milestone
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    Unlock exclusive vendor rates and premium support
                  </h3>
                  <p className="mt-1.5 text-sm text-secondary-foreground/70">
                    Get priority booking windows and a dedicated concierge
                    with Gold membership.
                  </p>
                  <button className="mt-5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90">
                    Learn more
                  </button>
                </div>
                <Crown className="absolute -right-4 -top-4 h-40 w-40 text-secondary-foreground/5" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav active="profile" />
    </div>
  );
}
