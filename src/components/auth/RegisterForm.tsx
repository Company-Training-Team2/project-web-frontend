"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "./PasswordInput";
import SocialLogin from "./SocialLogin";
import { useAuth } from "@/context/AuthContext";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .regex(/^[+\d\s\-()]+$/, "Invalid phone number"),
    password: z.string().min(8, "Min. 8 characters"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      });
      toast.success("Account created! Welcome to EventHub 🎉");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div className="text-center space-y-1">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#1A1A1A", fontFamily: "var(--font-heading)" }}
        >
          Join EventHub
        </h1>
        <p className="text-sm" style={{ color: "#6B6B68" }}>
          Plan your next milestone with professional ease and elegance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" style={{ color: "#1A1A1A" }}>Full Name</Label>
          <Input
            id="name"
            placeholder="Team2Off@SpaceTech.com"
            {...register("name")}
            style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" style={{ color: "#1A1A1A" }}>Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Team2Off@SpaceTech.com"
            {...register("email")}
            style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" style={{ color: "#1A1A1A" }}>Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+20 (1) 5577-88744"
            {...register("phone")}
            style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
          />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" style={{ color: "#1A1A1A" }}>Password</Label>
          <PasswordInput
            id="password"
            placeholder="Min. 8 characters"
            {...register("password")}
            style={{ backgroundColor: "white", borderColor: "#D5CCBC" }}
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="mt-0.5 w-4 h-4 rounded accent-[#C1502E] cursor-pointer"
          />
          <label htmlFor="terms" className="text-sm leading-snug cursor-pointer" style={{ color: "#4F4F4F" }}>
            I agree to the{" "}
            <Link href="/terms" className="font-medium hover:underline" style={{ color: "#C1502E" }}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#C1502E" }}>
              Privacy Policy
            </Link>{" "}
            of EventHub.
          </label>
        </div>
        {errors.terms && <p className="text-xs text-red-600">{errors.terms.message}</p>}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full font-semibold h-12 text-base rounded-xl"
          disabled={isLoading}
          style={{ backgroundColor: "#C1502E", color: "white" }}
        >
          {isLoading ? (
            <><Loader2 size={18} className="mr-2 animate-spin" /> Creating...</>
          ) : (
            "Create Account →"
          )}
        </Button>
      </form>

      <SocialLogin />

      <p className="text-center text-sm" style={{ color: "#6B6B68" }}>
        Already have an account?{" "}
        <Link href="/login" className="font-semibold hover:underline" style={{ color: "#C1502E" }}>
          Sign In
        </Link>
      </p>
    </div>
  );
}
