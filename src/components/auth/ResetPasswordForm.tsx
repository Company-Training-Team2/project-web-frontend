"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordInput from "./PasswordInput";
import { authService, getAuthErrorMessage } from "@/services/auth.service";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
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
  const token = searchParams.get("token") || "";

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
      await authService.resetPassword({ token, ...data });
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
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EEF3EF" }}>
            <CheckCircle2 size={32} color="#2F4A3E" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Password updated!</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Redirecting you to sign in...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a strong password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <PasswordInput id="password" placeholder="Min. 8 characters" {...register("password")} />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <PasswordInput id="confirmPassword" placeholder="••••••••" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={isLoading}
          style={{ backgroundColor: "#C1502E", color: "white" }}
        >
          {isLoading ? (
            <><Loader2 size={16} className="mr-2 animate-spin" /> Updating...</>
          ) : (
            "Update password"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="font-medium hover:underline" style={{ color: "#C1502E" }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
