"use client";

import { Loader2 } from "lucide-react";

import AuthCard from "./AuthCard";
import FormField from "./FormField";
import { useForgotPasswordForm } from "./useForgotPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mobile/tablet layout only — the Desktop breakpoint for this screen is a
// bespoke full-bleed design (see ForgotPasswordDesktop.tsx) rendered as a
// sibling tree by the page itself, not by this component.
export default function ForgotPasswordForm() {
  const {
    register,
    onSubmit,
    isLoading,
    formState: { errors },
  } = useForgotPasswordForm();

  return (
    <AuthCard>
      <div className="px-[19px] pt-[78px] lg:px-[42px] lg:pt-[86px]">
        <div className="mx-auto flex h-[160px] w-[178px] items-center justify-center text-[#af3718]">
          <div className="relative h-[132px] w-[150px]">
            <div className="absolute left-[12px] top-[18px] h-[94px] w-[74px] rounded-[32px] bg-[#af3718]" />
            <div className="absolute right-[2px] top-[18px] h-[94px] w-[72px] rounded-r-[32px] bg-[#af3718]" />
            <div className="absolute left-[82px] top-0 h-[132px] w-[12px] rounded-full bg-[#af3718]" />
            <span className="absolute left-[35px] top-[60px] size-[18px] rounded-full bg-[#eadfce]" />
            <span className="absolute left-[69px] top-[60px] size-[18px] rounded-full bg-[#eadfce]" />
          </div>
        </div>

        <div className="mt-[62px] space-y-[17px]">
          <h1 className="text-[32px] font-normal leading-none tracking-[-0.03em] text-[#252323]">
            Forgot Password?
          </h1>
          <p className="max-w-[336px] text-[18px] leading-[1.45] text-[#6d5d54]">
            Enter the email address associated with your account and we&apos;ll send you a link to
            reset your password.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-[40px] space-y-[45px]">
          <FormField id="email" label="EMAIL ADDRESS" uppercase error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="Team2Off@SpaceTech.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="h-[51px] rounded-[10px] border border-[#ded8d2] bg-[#fffdfb] px-[14px] text-[15px]"
              {...register("email")}
            />
          </FormField>

          <Button
            type="submit"
            className="h-[56px] w-full rounded-[8px] bg-[#af3718] text-[14px] font-medium uppercase tracking-[0.12em] text-white hover:bg-[#9f3216]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending code
              </>
            ) : (
              "SEND RESET LINK  →"
            )}
          </Button>
        </form>
      </div>
    </AuthCard>
  );
}
