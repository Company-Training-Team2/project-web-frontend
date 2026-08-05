"use client";

import Link from "next/link";
import { KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPasswordForm } from "./useForgotPassword";

/**
 * Bespoke Desktop-only layout for Forgot Password (Figma: full-bleed
 * background photo, vendor-specific copy, centered floating card). Rendered
 * by src/app/(auth)/forgot-password/page.tsx as a `hidden lg:block` sibling
 * to the shared AuthLayout tree — AuthLayout itself is untouched since it's
 * reused by Login/Register/OTP.
 *
 * TODO: real photo asset — this uses a CSS gradient stand-in in the same
 * dark-green/rust palette as AuthLayout's sidebar gradient. Ask the user to
 * supply/approve a real background photo (e.g. a vendor venue/gate image)
 * before shipping — do not fetch/fabricate a stock photo without approval.
 */
export default function ForgotPasswordDesktop() {
  const {
    register,
    onSubmit,
    isLoading,
    formState: { errors },
  } = useForgotPasswordForm();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#102b1f] p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,247,241,0.12),transparent_30%),linear-gradient(160deg,rgba(16,43,31,0.96),rgba(16,43,31,0.75)_45%,rgba(175,55,24,0.35))]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(180deg,transparent,rgba(8,23,16,0.9))]" />

      <div className="relative z-10 w-full max-w-[420px] rounded-[20px] bg-[#fffdfb] px-10 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h1 className="font-serif text-[26px] font-bold text-[#b23a19]">EventHub</h1>

        <div className="mx-auto mt-6 grid size-14 place-items-center rounded-[14px] bg-[#f8e6e0] text-[#af3718]">
          <KeyRound className="size-6" />
        </div>

        <h2 className="mt-6 font-serif text-[24px] font-bold text-[#252323]">Forgot your password?</h2>
        <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-[1.5] text-[#6d5d54]">
          Enter the email address associated with your vendor account and we&apos;ll send you a link to
          reset your password.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4 text-left">
          <Input
            id="desktop-email"
            type="email"
            placeholder="Business Email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-center text-[14px]"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-center text-xs font-medium text-destructive">{errors.email.message}</p>
          ) : null}

          <Button
            type="submit"
            className="h-[52px] w-full rounded-[8px] bg-[#af3718] text-[14px] font-bold text-white hover:bg-[#9f3216]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <Link
          href="/login"
          className="mt-5 inline-block text-[13px] font-medium text-[#252323] hover:text-[#af3718]"
        >
          ← Back to Sign In
        </Link>
      </div>

      <p className="absolute bottom-8 z-10 text-[12px] text-white/70">
        Need help? <span className="font-semibold text-white">Contact Vendor Support</span>
      </p>
    </div>
  );
}
