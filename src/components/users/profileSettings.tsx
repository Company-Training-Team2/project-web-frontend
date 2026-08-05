"use client";

import Link from "next/link";
import {
  User,
  Bookmark,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Search,
  Crown,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

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
    href: "/profile/saved-vendors",
  },
  {
    icon: CreditCard,
    title: "Payment methods",
    desc: "Manage cards and billing",
    href: "/profile/payment-methods",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Alerts and updates",
    href: "/profile/notifications",
  },
  {
    icon: HelpCircle,
    title: "Help center",
    desc: "FAQs and support contact",
    href: "/help",
  },
];

export default function ProfileSettings() {
  return (
    <div className="min-h-screen bg-[#F6F1EB] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
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
                src="https://i.pravatar.cc/160?img=47"
                alt="Amara Okonkwo"
                className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-background object-cover shadow-sm"
              />
              <h2 className="text-lg font-semibold">Amara Okonkwo</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                amara.okonkwo@design.com
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Crown className="h-3 w-3" />
                  Premium member
                </span>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                  12 bookings
                </span>
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

                <button className="flex items-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-5 text-left transition-colors hover:bg-destructive/10">
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
    </div>
  );
}