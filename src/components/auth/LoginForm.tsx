"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import AuthCard from "./AuthCard";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getAuthErrorMessage } from "@/services/auth.service";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

function LoginFormInner() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // Screens that require an account only at the point of action (AI
  // Planner's first message, Checkout's "Pay" button) send guests here as
  // /login?redirect=/original/path so a successful sign-in resumes exactly
  // where they left off instead of dumping them on the Home landing.
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data, redirectTo);
      toast.success("Welcome back!");
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Invalid email or password."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="px-[16px] pt-[18px] lg:px-[42px] lg:pt-[82px]">
        <h1 className="font-serif text-[31px] font-bold leading-none tracking-[-0.02em] text-[#b23a19]">
          EventHub
        </h1>

        <div className="mt-[54px] space-y-[18px] lg:mt-[68px]">
          <h2 className="font-serif text-[44px] font-bold leading-[1.02] tracking-[-0.03em] text-[#252323]">
            Welcome back
          </h2>
          <p className="max-w-[330px] text-[18px] leading-[1.38] text-[#6d5d54]">
            Please enter your details to access your curated events and vendor lists.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[20px] space-y-[24px]">
          <FormField id="email" label="Email address" error={errors.email?.message}>
            <div className="relative">
              <Mail className="absolute left-[13px] top-1/2 size-[20px] -translate-y-1/2 text-[#b7aaa0]" />
              <Input
                id="email"
                type="email"
                placeholder="Team2Off@SpaceTech.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="h-[53px] rounded-[12px] border-0 bg-[#fffdfb] pl-[44px] text-[15px] shadow-none"
                {...register("email")}
              />
            </div>
          </FormField>

          <FormField
            id="password"
            label="Password"
            error={errors.password?.message}
            action={
              <Link
                href="/forgot-password"
                className="text-[12px] font-bold leading-none text-[#b23a19] hover:underline"
              >
                Forgot Password?
              </Link>
            }
          >
            <div>
              <div className="relative">
                <Lock className="absolute left-[13px] top-1/2 z-10 size-[20px] -translate-y-1/2 text-[#b7aaa0]" />
                <PasswordInput
                  id="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  className="h-[53px] rounded-[12px] border-0 bg-[#fffdfb] pl-[44px] text-[15px] tracking-[0.18em] shadow-none"
                  {...register("password")}
                />
              </div>
            </div>
          </FormField>

          <Button
            type="submit"
            className="mt-[13px] h-[49px] w-full rounded-[7px] bg-[#af3718] text-[14px] font-medium text-white hover:bg-[#9f3216]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-[34px]">
          <SocialLogin redirectTo={redirectTo} />
        </div>

        <p className="mt-[22px] text-center text-[14px] text-[#6d5d54]">
          Don&apos;t have an account?{" "}
          <Link href="/register-option" className="font-medium text-[#b23a19] hover:underline">
            Create an account
          </Link>
        </p>

        <p className="absolute bottom-[22px] left-0 w-full text-center text-[11px] text-[#b2a79e] lg:bottom-[30px]">
          © 2026 EventHub Concierge &nbsp;&nbsp; Privacy Policy &nbsp;&nbsp; Terms of Service
        </p>
      </div>
    </AuthCard>
  );
}

// useSearchParams() requires a Suspense boundary (same pattern as
// ReserveScreen) so the /login route doesn't opt out of static rendering.
export default function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
