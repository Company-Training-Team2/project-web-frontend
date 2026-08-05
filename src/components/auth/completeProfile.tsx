"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Camera, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import AuthCard from "./AuthCard";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  city: z.string().min(2, "Enter your city"),
});

type FormData = z.infer<typeof schema>;

const eventTypes = ["Wedding", "Engagement", "Graduation", "Birthday", "Corporate"];
const budgetLevels = ["Economy", "Standard", "Premium", "Luxury"];

export default function CompleteProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("Engagement");
  const [budgetIndex, setBudgetIndex] = useState(2);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // TODO: wire to profile completion service
      toast.success("Profile updated");
    } catch {
      toast.error("Couldn't save your profile. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: form */}
      <div className="relative flex items-center justify-center px-[16px] py-[40px] lg:px-[64px] lg:py-[64px]">
        <div className="w-full max-w-[480px]">
          <AuthCard>
      <div className="">
        <h1 className="font-serif text-[31px] font-bold leading-none tracking-[-0.02em] text-[#b23a19]">
          EventHub
        </h1>

        <div className="mt-[40px] space-y-[14px] lg:mt-[48px]">
          <h2 className="font-serif text-[38px] font-bold leading-[1.05] tracking-[-0.03em] text-[#252323]">
            Complete your profile
          </h2>
          <p className="max-w-[360px] text-[16px] leading-[1.38] text-[#6d5d54]">
            Tell us a bit more to personalize your experience.
          </p>
        </div>

        {/* Avatar upload */}
        <div className="mt-[26px] flex items-center gap-[16px]">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/160?img=32"
              alt="Profile photo"
              className="size-[76px] rounded-full object-cover"
            />
            <button
              type="button"
              aria-label="Change photo"
              className="absolute -bottom-[2px] -right-[2px] flex size-[26px] items-center justify-center rounded-full bg-[#af3718] text-white ring-2 ring-[#fffdfb]"
            >
              <Camera className="size-[13px]" />
            </button>
          </div>
          <button
            type="button"
            className="text-[13px] font-bold text-[#b23a19] hover:underline"
          >
            Change Photo
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[24px] space-y-[22px]">
          <div className="grid grid-cols-1 gap-[22px] lg:grid-cols-2">
            <FormField id="fullName" label="Full Name" error={errors.fullName?.message}>
              <Input
                id="fullName"
                placeholder="e.g. Eleanor Vance"
                aria-invalid={!!errors.fullName}
                className="h-[53px] rounded-[12px] border-0 bg-[#fffdfb] text-[15px] shadow-none"
                {...register("fullName")}
              />
            </FormField>

            <FormField id="phone" label="Phone Number" error={errors.phone?.message}>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                aria-invalid={!!errors.phone}
                className="h-[53px] rounded-[12px] border-0 bg-[#fffdfb] text-[15px] shadow-none"
                {...register("phone")}
              />
            </FormField>
          </div>

          <FormField id="city" label="City" error={errors.city?.message}>
            <Input
              id="city"
              placeholder="New York, NY"
              aria-invalid={!!errors.city}
              className="h-[53px] w-full rounded-[12px] border-0 bg-[#fffdfb] text-[15px] shadow-none lg:w-1/2"
              {...register("city")}
            />
          </FormField>

          <FormField id="eventType" label="Event Type Preference">
            <div className="flex flex-wrap gap-[10px]">
              {eventTypes.map((type) => {
                const active = type === selectedType;
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`rounded-full border px-[16px] py-[9px] text-[13px] font-medium transition-colors ${
                      active
                        ? "border-[#b23a19] bg-[#fdf0ea] text-[#b23a19]"
                        : "border-[#e7ddd5] bg-[#fffdfb] text-[#252323] hover:bg-[#f6efe9]"
                    }`}
                  >
                    {type}
                    {active && <span className="ml-[6px]">&#10003;</span>}
                  </button>
                );
              })}
            </div>
          </FormField>

          <FormField
            id="budget"
            label="Preferred Budget Range"
            action={
              <span className="text-[12px] font-bold text-[#b23a19]">
                {"$".repeat(budgetIndex + 1)} &middot; {budgetLevels[budgetIndex]}
              </span>
            }
          >
            <input
              id="budget"
              type="range"
              min={0}
              max={3}
              step={1}
              value={budgetIndex}
              onChange={(e) => setBudgetIndex(Number(e.target.value))}
              className="w-full accent-[#af3718]"
            />
            <div className="mt-[6px] flex justify-between text-[11px] uppercase tracking-[0.06em] text-[#b2a79e]">
              {budgetLevels.map((level) => (
                <span key={level}>{level}</span>
              ))}
            </div>
          </FormField>

          <Button
            type="submit"
            className="mt-[8px] h-[49px] w-full rounded-[7px] bg-[#af3718] text-[14px] font-medium text-white hover:bg-[#9f3216]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-[22px] text-center text-[12px] text-[#6d5d54]">
          By continuing, you agree to our{" "}
          <a href="#" className="font-medium text-[#b23a19] hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
        </AuthCard>

          <p className="mt-[28px] text-center text-[11px] text-[#b2a79e]">
            © 2026 EventHub Concierge &nbsp;&nbsp; Privacy Policy &nbsp;&nbsp; Terms of Service
          </p>
        </div>
      </div>

      {/* Right: visual panel (desktop only) */}
      <div className="relative hidden overflow-hidden bg-[#252323] lg:block">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a1a] via-[#1c1a1a]/30 to-transparent" />
        <div className="absolute bottom-[64px] left-[56px] right-[56px] text-white">
          <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#e8b088]">
            Step 2 of 2
          </p>
          <h3 className="mt-[14px] font-serif text-[34px] font-bold leading-[1.1] tracking-[-0.02em]">
            A few details make every recommendation feel personal.
          </h3>
          <p className="mt-[14px] max-w-[380px] text-[15px] leading-[1.5] text-white/70">
            Vendor picks, pricing, and availability all tune themselves to
            what you share here.
          </p>
        </div>
      </div>
    </div>
  );
}