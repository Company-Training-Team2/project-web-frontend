"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div className="space-y-1">
        <h1
          className="text-3xl font-bold"
          style={{ color: "#1A1A1A", fontFamily: "var(--font-heading)" }}
        >
          Welcome back
        </h1>
        <p className="text-sm" style={{ color: "#6B6B68" }}>
          Please enter your details to access your curated events and vendor lists.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" style={{ color: "#1A1A1A" }}>Email Address</Label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#8A8070" }}
            />
            <Input
              id="email"
              type="email"
              placeholder="Team2Off@SpaceTech.com"
              className="pl-9"
              {...register("email")}
              style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
            />
          </div>
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" style={{ color: "#1A1A1A" }}>Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium hover:underline"
              style={{ color: "#C1502E" }}
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
              style={{ color: "#8A8070" }}
            />
            <PasswordInput
              id="password"
              placeholder="••••••••"
              className="pl-9"
              {...register("password")}
              style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
            />
          </div>
          {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full font-semibold h-12 text-base rounded-xl"
          disabled={isLoading}
          style={{ backgroundColor: "#C1502E", color: "white" }}
        >
          {isLoading ? (
            <><Loader2 size={18} className="mr-2 animate-spin" /> Signing in...</>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <SocialLogin />

      <p className="text-center text-sm" style={{ color: "#6B6B68" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold hover:underline" style={{ color: "#C1502E" }}>
          Create an account
        </Link>
      </p>

      {/* Footer */}
      <div className="pt-4 border-t text-center" style={{ borderColor: "#E8E0D0" }}>
        <p className="text-xs" style={{ color: "#A8A4A0" }}>
          © 2026 EventHub Concierge ·{" "}
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          {" · "}
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}
