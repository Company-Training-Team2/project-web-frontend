"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Lock, Trash2 } from "lucide-react";

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

// GET /vendor/settings 404'd before this — VendorSidebar linked here but no
// route existed. Change Password (PUT /users/me/password) and Deactivate
// Account (DELETE /users/me/deactivate) are the same real, already-live
// endpoints components/settings/privacySecurity.tsx uses for customers —
// they're generic per-User actions, not customer-specific, so wiring them
// up here for real (instead of a placeholder) costs nothing extra.
export default function VendorSettingsScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const { logout } = useAuth();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({ resolver: zodResolver(passwordSchema) });

  const onSubmitPassword = async (data: PasswordFormData) => {
    setIsSaving(true);
    try {
      await userService.changePassword(data);
      toast.success("Password changed successfully.");
      reset();
    } catch (error: unknown) {
      toast.error(getUserErrorMessage(error, "Couldn't change your password."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeactivate = async () => {
    const confirmed = window.confirm(
      "Deactivate your EventHub vendor account? You'll be signed out and your listings hidden until you contact support to restore it."
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
    <div className="flex min-h-screen overflow-x-hidden bg-[#EDE0D2]">
      <VendorSidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] px-4 py-3 md:px-5">
          <h1 className="font-serif text-lg font-bold text-[#2B2622]">Settings</h1>
        </div>

        <div className="mx-auto mt-6 max-w-xl">
          <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A3391C]/10 text-[#A3391C]">
                <Lock size={16} />
              </div>
              <h2 className="text-sm font-semibold text-[#2B2622]">Change Password</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-xs text-[#A3391C]">{errors.currentPassword.message}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-[#A3391C]">{errors.newPassword.message}</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
                  {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword && (
                  <p className="mt-1 text-xs text-[#A3391C]">{errors.confirmNewPassword.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#A3391C] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
              >
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                Save new password
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-[16px] border border-[#E3AFA0] bg-[#FBEEE9] p-4 md:p-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B23A19]/10 text-[#B23A19]">
                <Trash2 size={16} />
              </div>
              <h2 className="text-sm font-semibold text-[#2B2622]">Deactivate Account</h2>
            </div>
            <p className="text-xs leading-relaxed text-[#8B7E72]">
              Deactivating your account signs you out and hides your listings. Contact support to
              reactivate it later.
            </p>
            <button
              onClick={handleDeactivate}
              disabled={isDeactivating}
              className="mt-4 w-full rounded-lg border border-[#B23A19] py-2.5 text-sm font-semibold text-[#B23A19] transition-colors hover:bg-[#B23A19]/10 disabled:opacity-60"
            >
              {isDeactivating ? "Deactivating…" : "Deactivate Account"}
            </button>
          </div>
        </div>
      </main>

      <VendorBottomNav />
    </div>
  );
}
