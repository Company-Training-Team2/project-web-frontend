"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Lock,
  Fingerprint,
  Trash2,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getUserErrorMessage, userService } from "@/services/user.service";

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

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmNewPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) });

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      await userService.changePassword(data);
      toast.success("Password changed successfully.");
      onClose();
    } catch (error: unknown) {
      toast.error(getUserErrorMessage(error, "Couldn't change your password."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-[16px] bg-[#FBF3EA] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[#A3391C]">Change Password</h2>
          <button aria-label="Close" onClick={onClose} className="text-[#8B7E72]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="password"
              placeholder="Current password"
              className="w-full rounded-[10px] border border-[#DCCFC0] bg-white px-4 py-2.5 text-sm outline-none"
              {...register("currentPassword")}
            />
            {errors.currentPassword ? (
              <p className="mt-1 text-xs text-destructive">{errors.currentPassword.message}</p>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              placeholder="New password"
              className="w-full rounded-[10px] border border-[#DCCFC0] bg-white px-4 py-2.5 text-sm outline-none"
              {...register("newPassword")}
            />
            {errors.newPassword ? (
              <p className="mt-1 text-xs text-destructive">{errors.newPassword.message}</p>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full rounded-[10px] border border-[#DCCFC0] bg-white px-4 py-2.5 text-sm outline-none"
              {...register("confirmNewPassword")}
            />
            {errors.confirmNewPassword ? (
              <p className="mt-1 text-xs text-destructive">{errors.confirmNewPassword.message}</p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#A3391C] py-2.5 text-sm font-semibold text-white hover:bg-[#8B2E17]"
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
            Save new password
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PrivacySecurity() {
  useRequireAuth();
  const { logout } = useAuth();
  const [biometric, setBiometric] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivate = async () => {
    const confirmed = window.confirm(
      "Deactivate your EventHub account? You'll be signed out and your account marked inactive until you contact support to restore it."
    );
    if (!confirmed) return;
    setIsDeactivating(true);
    try {
      await userService.deactivateAccount();
      toast.success("Account deactivated.");
      await logout();
    } catch (error: unknown) {
      toast.error(getUserErrorMessage(error, "Couldn't deactivate your account."));
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    // Was rendering <Sidebar/> — the admin executive-portal nav, wrong for
    // a customer settings page (see profileSettings.tsx for the full note).
    // This screen already has its own back-to-/settings top bar below.
    <div className="min-h-screen bg-[#EDE0D2] overflow-x-hidden">
      <main className="overflow-x-hidden">
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
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F5EDE0] px-5 py-4 text-left transition-colors hover:bg-[#EDE0D2]"
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
            </button>

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
                  Deactivate Account
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#8B7E72]">
                  Deactivating your account signs you out and marks it
                  inactive. Contact support to reactivate it later.
                </p>
              </div>
            </div>
            <button
              onClick={handleDeactivate}
              disabled={isDeactivating}
              className="mt-4 w-full rounded-[10px] border border-[#B23A19] py-2.5 text-sm font-semibold text-[#B23A19] transition-colors hover:bg-[#B23A19]/10"
            >
              {isDeactivating ? "Deactivating…" : "Deactivate Account"}
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-[#B2A79E]">
            EventHub Version 2.4.1 (Build 882)
            <br />
            Encrypted with 256-bit AES protection
          </p>
        </div>
      </main>

      {showPasswordModal ? <ChangePasswordModal onClose={() => setShowPasswordModal(false)} /> : null}
    </div>
  );
}
