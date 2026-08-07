"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Bell,
  Lock,
  FileText,
  Info,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { userService, UserProfile } from "@/services/user.service";

interface SettingsItem {
  icon: LucideIcon;
  title: string;
  href?: string;
  trailing?: string;
}

interface SettingsSection {
  label: string;
  items: SettingsItem[];
}

// "Payment Methods" and "Privacy Policy"/"Terms & Conditions" used to point
// at /profile/payment-methods and /legal/privacy /legal/terms — none of
// which exist; the real routes are /payment-methods, /privacy, /terms (see
// README route table). "Help Center" had nowhere real to go, so it's dropped.
const sections: SettingsSection[] = [
  {
    label: "Account",
    items: [
      { icon: User, title: "Profile Information", href: "/profile/edit" },
      { icon: Shield, title: "Security", href: "/settings/security" },
      { icon: CreditCard, title: "Payment Methods", href: "/payment-methods" },
    ],
  },
  {
    label: "Legal",
    items: [
      { icon: Lock, title: "Privacy Policy", href: "/privacy" },
      { icon: FileText, title: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    label: "Support",
    items: [{ icon: Info, title: "About EventHub", trailing: "v2.4.0" }],
  },
];

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      style={{
        position: "relative",
        width: "42px",
        height: "24px",
        borderRadius: "999px",
        flexShrink: 0,
        border: "none",
        padding: 0,
        cursor: "pointer",
        backgroundColor: checked ? "#A3391C" : "#D8CCC0",
        transition: "background-color 0.2s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "21px" : "3px",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );
}

export default function SettingsPage() {
  useRequireAuth();
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language] = useState("English (US)");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    userService.getMe().then(setProfile).catch(() => setProfile(null));
  }, []);

  return (
    // Was rendering <Sidebar/> — the admin executive-portal nav, wrong for
    // a customer settings page (see profileSettings.tsx for the full note).
    // This screen already has its own back-to-/profile top bar below, so no
    // replacement nav is needed once Sidebar is gone.
    <div className="min-h-screen bg-[#EDE0D2] overflow-x-hidden">
      <main className="overflow-x-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-[#DCCFC0] bg-[#FBF3EA] px-6 py-5">
          <Link
            href="/profile"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#A3391C] transition-colors hover:bg-[#A3391C]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#A3391C]">
            Settings
          </h1>
        </div>

        <div className="mx-auto w-full max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            {/* Left: identity card */}
            <div className="h-fit rounded-[20px] border border-[#DCCFC0] bg-[#F6ECE0] p-6 text-center">
              <img
                src={profile?.avatarUrl || "https://i.pravatar.cc/160?img=45"}
                alt={profile?.fullName ?? "Profile photo"}
                className="mx-auto mb-4 h-20 w-20 rounded-2xl object-cover"
              />
              <h2 className="text-lg font-semibold text-[#2B2622]">
                {profile?.fullName || "—"}
              </h2>
              <p className="mt-0.5 text-sm text-[#8B7E72]">{profile?.email ?? "Premium Member"}</p>

              <Link
                href="/profile"
                className="mt-6 block w-full rounded-lg border border-[#A3391C]/30 py-2.5 text-sm font-medium text-[#A3391C] transition-colors hover:bg-[#A3391C]/5"
              >
                View profile
              </Link>
            </div>

            {/* Right: settings sections */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#A3391C]">
                  Preferences
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4">
                    <Globe className="h-[18px] w-[18px] text-[#8B7E72]" />
                    <span className="flex-1 text-sm text-[#2B2622]">
                      Language
                    </span>
                    <span className="text-sm text-[#8B7E72]">{language}</span>
                    <ChevronRight className="h-4 w-4 text-[#8B7E72]" />
                  </div>
                  <div className="flex items-center gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4">
                    <Moon className="h-[18px] w-[18px] text-[#8B7E72]" />
                    <span className="flex-1 text-sm text-[#2B2622]">
                      Dark Mode
                    </span>
                    <Toggle checked={darkMode} onChange={() => setDarkMode((v) => !v)} />
                  </div>
                  <Link
                    href="/notifications"
                    className="flex w-full items-center gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4 text-left transition-colors hover:bg-[#EDE0D2]"
                  >
                    <Bell className="h-[18px] w-[18px] text-[#8B7E72]" />
                    <span className="flex-1 text-sm text-[#2B2622]">
                      Notifications
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#8B7E72]" />
                  </Link>
                </div>
              </div>

              {sections.map(({ label, items }) => (
                <div key={label}>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#A3391C]">
                    {label}
                  </p>
                  <div className="flex flex-col gap-3">
                    {items.map(({ icon: Icon, title, href, trailing }) =>
                      href ? (
                        <Link
                          key={title}
                          href={href}
                          className="flex items-center gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4 transition-colors hover:bg-[#EDE0D2]"
                        >
                          <Icon className="h-[18px] w-[18px] text-[#8B7E72]" />
                          <span className="flex-1 text-sm text-[#2B2622]">
                            {title}
                          </span>
                          <ChevronRight className="h-4 w-4 text-[#8B7E72]" />
                        </Link>
                      ) : (
                        <div
                          key={title}
                          className="flex items-center gap-3 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4"
                        >
                          <Icon className="h-[18px] w-[18px] text-[#8B7E72]" />
                          <span className="flex-1 text-sm text-[#2B2622]">
                            {title}
                          </span>
                          <span className="text-sm text-[#8B7E72]">
                            {trailing}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() => logout()}
                className="flex items-center justify-center gap-2 rounded-[16px] border border-[#A3391C]/40 py-4 text-sm font-medium text-[#A3391C] transition-colors hover:bg-[#A3391C]/5"
              >
                <LogOut className="h-[18px] w-[18px]" />
                Logout
              </button>

              <p className="text-center text-xs italic text-[#B2A79E]">
                Hand-crafted by EventHub Concierge Team
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}