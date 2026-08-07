"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Heart,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { userService, UserProfile, UserActivityItem } from "@/services/user.service";
import { homeService } from "@/services/home.service";

const quickLinks = [
  { icon: CreditCard, label: "Payment Methods", href: "/payment-methods" },
  { icon: Bell, label: "Notification Settings", href: "/settings" },
];

export default function ProfilePage() {
  useRequireAuth();
  const { logout } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({ bookings: 0, favorites: 0 });
  const [activity, setActivity] = useState<UserActivityItem[]>([]);

  useEffect(() => {
    userService.getMe().then(setProfile).catch(() => setProfile(null));
    homeService
      .getDashboard()
      .then((d) =>
        setStats({
          bookings: d.pendingBookingsCount + d.confirmedBookingsCount,
          favorites: d.favoritesCount,
        })
      )
      .catch(() => setStats({ bookings: 0, favorites: 0 }));
    userService.getActivityLog().then(setActivity).catch(() => setActivity([]));
  }, []);

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-[#F6F1EB] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="mb-6 text-2xl font-bold text-foreground">Profile</h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            {/* Left column: identity + stats + quick links */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="relative mx-auto mb-4 w-fit">
                  <img
                    src={profile?.avatarUrl || "https://i.pravatar.cc/160?img=47"}
                    alt={profile?.fullName ?? "Profile photo"}
                    className="h-24 w-24 rounded-full border-4 border-background object-cover shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card">
                    <Settings className="h-3 w-3" />
                  </span>
                </div>
                <h2 className="text-lg font-semibold">{profile?.fullName || "—"}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{profile?.email ?? ""}</p>
                {memberSince ? (
                  <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                    Member since {memberSince}
                  </p>
                ) : null}

                <Link
                  href="/profile/edit"
                  className="mt-5 block w-full rounded-lg border border-primary/30 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  Edit profile
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: "Total Bookings", value: stats.bookings },
                  { icon: Heart, label: "Favorite Vendors", value: stats.favorites },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-card p-4 text-center"
                  >
                    <Icon className="mx-auto h-5 w-5 text-accent" />
                    <p className="mt-2 text-2xl font-semibold text-primary">{value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-card p-2">
                {quickLinks.map(({ icon: Icon, label, href }, i) => (
                  <Link
                    key={label}
                    href={href}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
                      i > 0 ? "mt-1" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
                <button
                  onClick={() => logout()}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>

            {/* Right column: recent activity */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent activity</h3>
              </div>

              {activity.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No recent activity yet.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {activity.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium text-primary">{item.action}</span>{" "}
                          <span className="text-muted-foreground">{item.detail}</span>
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
