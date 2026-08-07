"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";

// Was rendering <Sidebar/> — the admin executive-portal nav, wrong for a
// customer settings page (see profileSettings.tsx for the full note). This
// screen already has its own back-to-/profile top bar below.
export default function EditProfile() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-[#EDE0D2] overflow-x-hidden">
      <main className="overflow-x-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-[#DCCFC0] bg-[#FBF3EA] px-6 py-5">
          <Link
            href="/profile"
            aria-label="Back to profile"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#A3391C] transition-colors hover:bg-[#A3391C]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#A3391C]">
            Edit Profile
          </h1>
        </div>

        <div className="flex justify-center px-6 py-12">
          <div className="w-full max-w-[560px] rounded-[20px] border border-[#DCCFC0] bg-[#F6ECE0] p-10 shadow-[0_2px_20px_rgba(43,38,34,0.05)]">
          <form className="space-y-10">
            {/* Photo */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/160?img=47"
                  alt="Eleanor St. James"
                  className="h-28 w-28 rounded-2xl border-2 border-[#A3391C]/50 object-cover"
                />
                <button
                  type="button"
                  aria-label="Change photo"
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#A3391C] text-white ring-4 ring-[#EDE0D2]"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                className="text-sm font-semibold uppercase tracking-wide text-[#A3391C] hover:underline"
              >
                Change photo
              </button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] text-[#8B7E72]">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Eleanor St. James"
                  className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] text-[#8B7E72]">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="eleanor.sj@eventhub.com"
                  className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] text-[#8B7E72]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 012-3456"
                  className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] text-[#8B7E72]">
                  Location / City
                </label>
                <input
                  type="text"
                  defaultValue="San Francisco, CA"
                  className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                />
              </div>
            </div>

            {/* Preferences */}
            <div>
              <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#A3391C]">
                Preferences
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[15px] text-[#2B2622]">
                  Email Notifications
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={emailNotifications}
                  onClick={() => setEmailNotifications((v) => !v)}
                  style={{
                    position: "relative",
                    width: "46px",
                    height: "26px",
                    borderRadius: "999px",
                    flexShrink: 0,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    backgroundColor: emailNotifications ? "#A3391C" : "#D8CCC0",
                    transition: "background-color 0.2s ease",
                }}
                >
                <span
                    style={{
                    position: "absolute",
                    top: "3px",
                    left: emailNotifications ? "23px" : "3px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    transition: "left 0.2s ease",
                    }}
                />
                </button>
            </div>
            </div>

            <button
            type="submit"
            className="w-full rounded-[10px] bg-[#A3391C] py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
            Save Changes
            </button>
        </form>
        </div>
        </div>
    </main>
    </div>
);
}