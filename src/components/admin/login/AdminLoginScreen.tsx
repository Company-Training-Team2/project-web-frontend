"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarCheck, HelpCircle, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import OTPInput from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService, getAuthErrorMessage } from "@/services/auth.service";

const schema = z.object({
  email: z.string().email("Enter a valid institutional email"),
  password: z.string().min(1, "Security key is required"),
  code: z.string().optional(),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

/**
 * Admin Portal login (Desktop Figma frame). Wired to the real backend:
 * POST /auth/admin/login, and — if that response says requiresMfa — POST
 * /auth/admin/mfa/verify. The verify endpoint is a documented stub on the
 * backend today (AuthController.cs: "MFA verification not yet
 * implemented.", never issues a token), so admin accounts with MFA enabled
 * can't fully sign in yet — that failure is surfaced honestly via toast
 * rather than faked.
 *
 * "Remember this workstation for 30 days" has no backend field
 * (AdminLoginRequest.cs is just Email/Password) — it's collected but not
 * sent anywhere, same pattern as VendorRegisterWizard's UI-only fields.
 *
 * Background: matches docs/figma/Admin/Admin Login.jpeg (an arched lobby
 * interior) via a stock photo, with the same dark gradient wash over it for
 * text legibility.
 */
export default function AdminLoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mfaRequired, setMfaRequired] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { code: "", remember: false } });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.adminLogin({ email: data.email, password: data.password });

      if (!result.requiresMfa) {
        authService.saveSession(result.session);
        toast.success("Access authorized.");
        router.push("/admin/dashboard");
        return;
      }

      setMfaRequired(true);

      if (!data.code || data.code.length < 6) {
        toast.info("Enter the 2FA code from your authenticator to continue.");
        return;
      }

      const verify = await authService.verifyAdminMfa({ email: result.email, code: data.code });
      // Backend stub — never issues a token yet, so there's nothing to save.
      // Surface its real message rather than pretending this succeeded.
      toast.info(verify.message);
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Authorization failed. Check your credentials."));
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1b2421] px-6 py-12">
      <img
        src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1600&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(228,139,88,0.14),transparent_35%),linear-gradient(160deg,rgba(27,36,33,0.9),rgba(27,36,33,0.75)_45%,rgba(175,55,24,0.28))]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(180deg,transparent,rgba(10,14,13,0.85))]" />

      <div className="relative z-10 flex w-full max-w-[500px] flex-col items-center">
        <div className="w-full rounded-[18px] bg-[#fdfaf6] px-9 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-center gap-2">
            <CalendarCheck className="size-6 text-[#af3718]" />
            <span className="font-serif text-[24px] font-bold text-[#af3718]">EventHub</span>
          </div>
          <h1 className="mt-2 text-center font-serif text-[30px] font-bold text-[#1f3a2e]">Admin Portal</h1>
          <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b716a]">
            Secure Enterprise Access
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-5">
            <div className="border-b border-[#e5ded2] pb-2">
              <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">
                Institutional Email
              </label>
              <div className="mt-1.5 flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-[#a79a90]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@eventhub.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className="h-auto border-0 bg-transparent p-0 text-[15px] shadow-none focus-visible:ring-0"
                  {...register("email")}
                />
              </div>
              {errors.email ? <p className="mt-1 text-[11px] text-[#af3718]">{errors.email.message}</p> : null}
            </div>

            <div className="border-b border-[#e5ded2] pb-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">
                  Security Key
                </label>
                <a href="/forgot-password" className="text-[12px] font-bold text-[#af3718] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Lock className="size-4 shrink-0 text-[#a79a90]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  className="h-auto border-0 bg-transparent p-0 text-[15px] tracking-[0.2em] shadow-none focus-visible:ring-0"
                  {...register("password")}
                />
              </div>
              {errors.password ? <p className="mt-1 text-[11px] text-[#af3718]">{errors.password.message}</p> : null}
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6d5d54]">
                Two-Factor Authentication
                {mfaRequired ? <span className="ml-1.5 font-normal normal-case text-[#af3718]">— required for this account</span> : null}
              </p>
              <div className="mt-2">
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <OTPInput value={field.value ?? ""} onChange={field.onChange} disabled={isLoading} />
                  )}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-[13px] text-[#6d5d54]">
              <input type="checkbox" {...register("remember")} className="size-4 accent-[#af3718]" />
              Remember this workstation for 30 days
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-[50px] w-full rounded-[8px] bg-[#af3718] text-[15px] font-bold hover:bg-[#9f3216]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Authorizing
                </>
              ) : (
                "Authorize Access"
              )}
            </Button>
          </form>

          <div className="mt-6 border-t border-[#e5ded2] pt-5 text-center">
            <p className="text-[11px] leading-[1.5] text-[#a79a90]">
              Authorized personnel only. Access is monitored and logged in accordance with enterprise security
              policy.
            </p>
            <div className="mt-3 flex items-center justify-center gap-5 text-[12px] font-bold text-[#252323]">
              <button
                type="button"
                onClick={() => toast.info("Support contact — not wired up yet.")}
                className="flex items-center gap-1 hover:text-[#af3718]"
              >
                <HelpCircle className="size-3.5" />
                Support
              </button>
              <button
                type="button"
                onClick={() => toast.info("Security policy — not wired up yet.")}
                className="flex items-center gap-1 hover:text-[#af3718]"
              >
                <ShieldCheck className="size-3.5" />
                Security Policy
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-[12px] text-white/50">EventHub Enterprise Admin v2.4.0</p>
      </div>
    </div>
  );
}
