"use client";

import {
  Calendar,
  Heart,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Utensils,
  MessageSquare,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

const stats = [
  { icon: Calendar, label: "Total Bookings", value: "12" },
  { icon: Heart, label: "Favorite Vendors", value: "48" },
];

const activity = [
  {
    icon: Utensils,
    title: "Booked",
    highlight: "Savoré House",
    rest: "Catering for Wedding Anniversary",
    time: "2h ago",
  },
  {
    icon: Heart,
    title: "Added",
    highlight: "Atelier Fleur",
    rest: "to Favorites · Floral Design",
    time: "Yesterday",
  },
  {
    icon: MessageSquare,
    title: "Left a review for",
    highlight: "Grand Hall",
    rest: "Venue",
    time: "3 days ago",
  },
];

const quickLinks = [
  { icon: CreditCard, label: "Payment Methods" },
  { icon: Bell, label: "Notification Settings" },
];

export default function ProfilePage() {
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
                    src="https://i.pravatar.cc/160?img=47"
                    alt="Amara Okonkwo"
                    className="h-24 w-24 rounded-full border-4 border-background object-cover shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card">
                    <Settings className="h-3 w-3" />
                  </span>
                </div>
                <h2 className="text-lg font-semibold">Amara Okonkwo</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  amara.okonkwo@design.com
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  Member since Oct 2023
                </p>

                <button className="mt-5 w-full rounded-lg border border-primary/30 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5">
                  Edit profile
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-card p-4 text-center"
                  >
                    <Icon className="mx-auto h-5 w-5 text-accent" />
                    <p className="mt-2 text-2xl font-semibold text-primary">
                      {value}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-card p-2">
                {quickLinks.map(({ icon: Icon, label }, i) => (
                  <button
                    key={label}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-muted ${
                      i > 0 ? "mt-1" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
                <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-destructive transition-colors hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>

            {/* Right column: recent activity */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent activity</h3>
                <button className="text-sm font-medium text-primary hover:underline">
                  View all
                </button>
              </div>

              <ul className="divide-y divide-border">
                {activity.map(({ icon: Icon, title, highlight, rest, time }, i) => (
                  <li key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {title}{" "}
                        <span className="font-medium text-primary">
                          {highlight}
                        </span>{" "}
                        <span className="text-muted-foreground">{rest}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {time}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}