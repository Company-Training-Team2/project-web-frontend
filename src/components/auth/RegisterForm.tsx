"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";

import AuthCard from "./AuthCard";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService, getAuthErrorMessage } from "@/services/auth.service";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .regex(/^[+\d\s\-()]+$/, "Invalid phone number"),
    password: z
      .string()
      .min(8, "Min. 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
    terms: z.literal(true, "You must agree to the terms"),
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "vendor" ? "vendor" : "customer";
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authService.register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.password,
        role,
      });
      toast.success("Account details saved. Verify your email next.");
      router.push(`/otp?email=${encodeURIComponent(data.email)}&purpose=register`);
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Registration failed. Try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="px-[19px] pt-[49px] lg:px-[42px] lg:pt-[54px]">
        <div className="space-y-[9px] text-center">
          <h1 className="font-serif text-[30px] font-bold leading-none tracking-[-0.03em] text-[#252323]">
            Join EventHub
          </h1>
          <p className="mx-auto max-w-[324px] text-[16px] leading-[1.35] text-[#6d5d54]">
            Plan your next milestone with professional ease and elegance.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[17px] space-y-[15px]">
          <FormField id="name" label="Full name" error={errors.name?.message}>
            <div className="relative">
              <User className="hidden" />
              <Input
                id="name"
                placeholder="Team2Off@SpaceTech.com"
                autoComplete="name"
                aria-invalid={!!errors.name}
                className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
                {...register("name")}
              />
            </div>
          </FormField>

          <FormField id="email" label="Email address" error={errors.email?.message}>
            <div className="relative">
              <Mail className="hidden" />
              <Input
                id="email"
                type="email"
                placeholder="Team2Off@SpaceTech.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
                {...register("email")}
              />
            </div>
          </FormField>

          <FormField id="phone" label="Phone number" error={errors.phone?.message}>
            <div className="relative">
              <Phone className="hidden" />
              <Input
                id="phone"
                type="tel"
                placeholder="+20 (1) 5577-88744"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
                {...register("phone")}
              />
            </div>
          </FormField>

          <FormField id="password" label="Password" error={errors.password?.message}>
            <PasswordInput
              id="password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
              {...register("password")}
            />
          </FormField>

          <div className="space-y-1 pt-[2px]">
            <div className="flex items-start gap-[10px]">
              <input
                type="checkbox"
                id="terms"
                {...register("terms")}
                className="mt-[3px] size-[18px] shrink-0 rounded-none border border-[#a79a90] accent-[#b23a19]"
              />
              <label htmlFor="terms" className="text-[14px] leading-[1.25] text-[#6d5d54]">
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-[#b23a19] hover:underline">
                  Terms of Service
                </Link>{" "}
                and
                <Link href="/privacy" className="font-medium text-[#b23a19] hover:underline">
                  Privacy Policy
                </Link>{" "}
                of EventHub.
              </label>
            </div>
            {errors.terms ? (
              <p className="text-xs font-medium text-destructive">{errors.terms.message}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="h-[52px] w-full rounded-[8px] bg-[#af3718] text-[14px] font-bold text-white hover:bg-[#9f3216]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account
              </>
            ) : (
              "Create Account  →"
            )}
          </Button>
        </form>

        <div className="mt-[17px]">
          <SocialLogin label="Or sign up with" />
        </div>

        <p className="mt-[18px] text-center text-[14px] text-[#6d5d54]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#b23a19] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
