"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import AuthCard from "./AuthCard";
import OTPInput from "./OTPInput";
import { Button } from "@/components/ui/button";
import { authService, getAuthErrorMessage } from "@/services/auth.service";

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 44;

const schema = z.object({
  code: z.string().length(OTP_LENGTH, "Enter the 6-digit code"),
});

type FormData = z.infer<typeof schema>;

export default function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const purpose = searchParams.get("purpose") === "register" ? "register" : "reset-password";
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const canResend = countdown <= 0;

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleResend = () => {
    setCountdown(COUNTDOWN_SECONDS);
    resetField("code");
    toast.info("New code sent to your email.");
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authService.verifyOtp({ email, code: data.code, purpose });
      toast.success("Verification complete.");
      if (purpose === "register") {
        router.push("/login");
      } else {
        // Carry the verified email + code forward so Reset Password can
        // submit the new password without asking the user to re-enter it.
        router.push(
          `/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(data.code)}`
        );
      }
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Invalid code. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className="px-[19px] pt-[34px] lg:px-[42px] lg:pt-[52px]">
        <div className="h-[243px] overflow-hidden rounded-[5px]">
          <Image
            src="/auth-otp-hero.png"
            alt="Verification code"
            width={497}
            height={372}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-[44px] space-y-[11px] text-center">
          <h1 className="font-serif text-[30px] font-bold leading-none tracking-[-0.03em] text-[#252323]">
            Verify Identity
          </h1>
          <p className="mx-auto max-w-[278px] text-[16px] leading-[1.38] text-[#6d5d54]">
            We&apos;ve sent a 6-digit code to your registered email address.
          </p>
        </div>

        <div className="mt-[41px] space-y-2">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
                error={!!errors.code}
              />
            )}
          />
          {errors.code ? (
            <p className="text-center text-xs font-medium text-destructive">{errors.code.message}</p>
          ) : null}
        </div>

        <div className="mt-[30px] space-y-[12px] text-center">
          {!canResend ? (
            <p className="text-[14px] font-bold text-[#b23a19]">
              Resend in {formatTime(countdown)}
            </p>
          ) : null}
          <p className="text-[13px] font-medium text-[#b8aea8]">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className="font-medium text-[#b8aea8] underline hover:text-[#b23a19] disabled:cursor-not-allowed disabled:opacity-80"
            >
              Resend
            </button>
          </p>
        </div>

        <Button
          type="submit"
          className="mt-[48px] h-[49px] w-full rounded-[8px] bg-[#af3718] text-[14px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_5px_10px_rgba(175,55,24,0.25)] hover:bg-[#9f3216]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Verifying
            </>
          ) : (
            "VERIFY"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
