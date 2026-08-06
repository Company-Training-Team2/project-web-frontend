"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Fingerprint,
  Shield,
  FileText,
  ExternalLink,
  Trash2,
  ChevronRight,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

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

export default function PrivacySecurity() {
  const [biometric, setBiometric] = useState(true);

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-[#DCCFC0] bg-[#FBF3EA] px-6 py-5">
          <Link
            href="/settings"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#A3391C] transition-colors hover:bg-[#A3391C]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#A3391C]">
            Privacy &amp; Security
          </h1>
        </div>

        <div className="mx-auto w-full max-w-3xl px-6 py-10">
          {/* Hero banner */}
          <div className="relative mb-8 overflow-hidden rounded-[20px]">
            <img
              src="https://i.pravatar.cc/800/300?img=68"
              alt=""
              className="h-[160px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <p className="absolute bottom-5 left-6 right-6 font-serif text-lg font-semibold text-white">
              Your trust is our highest priority.
            </p>
          </div>

          {/* Security settings */}
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#8B7E72]">
            Security Settings
          </p>
          <div className="mb-8 flex flex-col gap-3">
            <Link
              href="/settings/security/change-password"
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4 transition-colors hover:bg-[#EDE0D2]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A3391C]/10 text-[#A3391C]">
                <Lock className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">
                  Change Password
                </p>
                <p className="mt-0.5 text-xs text-[#8B7E72]">
                  Update your account login credentials
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#8B7E72]" />
            </Link>

            <div className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2F4A3E]/10 text-[#2F4A3E]">
                <Fingerprint className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">
                  Biometric Login
                </p>
                <p className="mt-0.5 text-xs text-[#8B7E72]">
                  Use Face ID or Fingerprint for access
                </p>
              </div>
              <Toggle checked={biometric} onChange={() => setBiometric((v) => !v)} />
            </div>
          </div>

          {/* Privacy controls */}
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#8B7E72]">
            Privacy Controls
          </p>
          <div className="mb-8 flex flex-col gap-3">
            <Link
              href="/settings/privacy/data-permissions"
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4 transition-colors hover:bg-[#EDE0D2]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A24C]/15 text-[#A3391C]">
                <Shield className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">
                  Data Permissions
                </p>
                <p className="mt-0.5 text-xs text-[#8B7E72]">
                  Manage how your data is shared with vendors
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#8B7E72]" />
            </Link>

            <a
              href="/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4 transition-colors hover:bg-[#EDE0D2]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B7E72]/10 text-[#8B7E72]">
                <FileText className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">
                  Privacy Policy
                </p>
                <p className="mt-0.5 text-xs text-[#8B7E72]">
                  Read our commitment to your privacy
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-[#8B7E72]" />
            </a>
          </div>

          {/* Danger zone */}
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#B23A19]">
            Danger Zone
          </p>
          <div className="rounded-[16px] border border-[#E3AFA0] bg-[#FBEEE9] px-5 py-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B23A19]/10 text-[#B23A19]">
                <Trash2 className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">
                  Delete Account
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#8B7E72]">
                  Deleting your account will permanently remove all your
                  event history, vendor contacts, and preferences. This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-[10px] border border-[#B23A19] py-2.5 text-sm font-semibold text-[#B23A19] transition-colors hover:bg-[#B23A19]/10">
              Permanently Delete Account
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-[#B2A79E]">
            EventHub Version 2.4.1 (Build 882)
            <br />
            Encrypted with 256-bit AES protection
          </p>
        </div>
      </main>
    </div>
  );
}