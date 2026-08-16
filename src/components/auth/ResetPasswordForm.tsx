"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import AuthCard from "./AuthCard";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import { authService, getAuthErrorMessage } from "@/services/auth.service";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({ email, code, ...data });
      setDone(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Reset failed. Try again."));
    } finally {
      setIsLoading(false);
    }
  };

  if (done) {
    return (
      <AuthCard>
        <div className="flex min-h-[420px] flex-col items-center justify-center px-[19px] text-center lg:px-[42px]">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#EEF3EF]">
            <CheckCircle2 size={32} color="#2F4A3E" />
          </div>
          <h1 className="mt-5 font-serif text-[24px] font-bold text-[#252323]">Password updated!</h1>
          <p className="mt-2 text-[14px] text-[#6d5d54]">Redirecting you to sign in...</p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="px-[19px] pb-[32px] pt-[49px] lg:px-[42px] lg:pt-[54px]">
        <div className="space-y-[9px] text-center">
          <h1 className="font-serif text-[30px] font-bold leading-none tracking-[-0.03em] text-[#252323]">
            Set new password
          </h1>
          <p className="mx-auto max-w-[324px] text-[16px] leading-[1.35] text-[#6d5d54]">
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[17px] space-y-[15px]">
          <FormField id="password" label="New password" error={errors.password?.message}>
            <PasswordInput
              id="password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
              {...register("password")}
            />
          </FormField>

          <FormField id="confirmPassword" label="Confirm new password" error={errors.confirmPassword?.message}>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              autoComplete="new-password"
              aria-invalid={!!errors.confirmPassword}
              className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
              {...register("confirmPassword")}
            />
          </FormField>

          <Button
            type="submit"
            className="h-[52px] w-full rounded-[8px] bg-[#af3718] text-[14px] font-bold text-white hover:bg-[#9f3216]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update password"
            )}
          </Button>
        </form>

        <p className="mt-[18px] text-center text-[14px] text-[#6d5d54]">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-[#b23a19] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
