"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, LogOut, Trash2, X, Loader2 } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { useAuth } from "@/context/AuthContext";
import { getUserErrorMessage, userService } from "@/services/user.service";

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

// SET-001: the sidebar linked here (VendorSidebar.tsx: "Settings" ->
// /vendor/settings) but no page ever existed at that route, so it 404'd.
// No dedicated vendor-settings endpoints/Figma frame exist, so this reuses
// the same real, generic account endpoints the customer settings screen
// already uses (UsersController: PUT /users/me/password, DELETE
// /users/me/deactivate) rather than adding fake toggles with nothing behind
// them. Business-facing settings (name, logo, bio, bank info) already live
// on Edit Profile — this is account-level only.
export default function VendorSettingsScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const { logout } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivate = async () => {
    const confirmed = window.confirm(
      "Deactivate your vendor account? You'll be signed out and your listings hidden until you contact support to restore it."
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

  if (authLoading || !isVendor) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <div className="border-b border-[#DCCFC0] pb-4">
          <h1 className="font-serif text-2xl font-bold text-[#2B2622]">Settings</h1>
          <p className="mt-1 text-sm text-[#8B7E72]">Manage your account credentials and access.</p>
        </div>

        <div className="mx-auto mt-6 w-full max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#8B7E72]">Account</p>
          <div className="mb-8 flex flex-col gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-5 py-4 text-left transition-colors hover:bg-[#EDE0D2]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A3391C]/10 text-[#A3391C]">
                <Lock className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">Change Password</p>
                <p className="mt-0.5 text-xs text-[#8B7E72]">Update your account login credentials</p>
              </div>
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-4 rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-5 py-4 text-left transition-colors hover:bg-[#EDE0D2]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2F4A3E]/10 text-[#2F4A3E]">
                <LogOut className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">Sign Out</p>
                <p className="mt-0.5 text-xs text-[#8B7E72]">Sign out of the vendor portal on this device</p>
              </div>
            </button>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[#B23A19]">Danger Zone</p>
          <div className="rounded-[16px] border border-[#E3AFA0] bg-[#FBEEE9] px-5 py-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B23A19]/10 text-[#B23A19]">
                <Trash2 className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B2622]">Deactivate Account</p>
                <p className="mt-1 text-xs leading-relaxed text-[#8B7E72]">
                  Deactivating your account signs you out, hides your services from customers, and marks your
                  account inactive. Contact support to reactivate it later.
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
        </div>
      </main>

      <VendorBottomNav />
      {showPasswordModal ? <ChangePasswordModal onClose={() => setShowPasswordModal(false)} /> : null}
    </div>
  );
}
