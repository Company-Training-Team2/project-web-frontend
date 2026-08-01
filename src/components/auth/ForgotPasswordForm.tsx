"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data);
      setSent(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center space-y-4 py-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#FDEBE7" }}
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" stroke="#C1502E" strokeWidth="1.5" fill="#FDEBE7"/>
              <path d="M20 6L12 13 4 6" stroke="#C1502E" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M9 14l-2 2m8-2l2 2" stroke="#C1502E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold" style={{ color: "#1A1A1A" }}>Check your email</h2>
        <p className="text-sm" style={{ color: "#6B6B68" }}>
          We sent a reset link to your email address.
        </p>
        <Button
          onClick={() => setSent(false)}
          variant="outline"
          className="w-full h-12 rounded-xl"
          style={{ borderColor: "#C1502E", color: "#C1502E" }}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Icon */}
      <div className="flex justify-center py-4">
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: "#FDEBE7" }}
        >
          {/* Lock / message icon matching Figma */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="26" height="22" rx="4" fill="#C1502E" opacity="0.9"/>
            <circle cx="21" cy="19" r="3" fill="white" opacity="0.8"/>
            <circle cx="21" cy="19" r="1.5" fill="white"/>
            <rect x="30" y="22" width="26" height="22" rx="4" fill="#C1502E"/>
            <circle cx="43" cy="33" r="3" fill="white" opacity="0.8"/>
            <circle cx="43" cy="33" r="1.5" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#1A1A1A", fontFamily: "var(--font-heading)" }}
        >
          Forgot Password?
        </h1>
        <p className="text-sm" style={{ color: "#6B6B68" }}>
          Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-semibold tracking-wider uppercase"
            style={{ color: "#8A8070" }}
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Team2Off@SpaceTech.com"
            {...register("email")}
            style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <Button
          type="submit"
          className="w-full font-semibold h-12 text-base rounded-xl tracking-wide"
          disabled={isLoading}
          style={{ backgroundColor: "#C1502E", color: "white" }}
        >
          {isLoading ? (
            <><Loader2 size={18} className="mr-2 animate-spin" /> Sending...</>
          ) : (
            "SEND RESET LINK →"
          )}
        </Button>
      </form>
    </div>
  );
}
