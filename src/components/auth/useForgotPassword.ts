"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService, getAuthErrorMessage } from "@/services/auth.service";

const schema = z.object({
  // .min(1, …) runs before .email(), so an empty field reports "required"
  // instead of the format error ("Enter a valid email address") that used
  // to show for a blank submission.
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof schema>;

/** Shared form logic for both the mobile ForgotPasswordForm and the
 * bespoke ForgotPasswordDesktop layout — one useForm/onSubmit, two JSX
 * trees, so the two Figma-mandated layouts never fall out of sync on
 * behavior. */
export function useForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormData>({ resolver: zodResolver(schema) });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data);
      toast.success("Verification code sent.");
      router.push(`/otp?email=${encodeURIComponent(data.email)}&purpose=reset-password`);
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Something went wrong."));
    } finally {
      setIsLoading(false);
    }
  });

  return { ...form, onSubmit, isLoading };
}
