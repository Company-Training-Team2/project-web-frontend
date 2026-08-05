import Link from "next/link";
import { ArrowRight, Building2, UserRound } from "lucide-react";

import AuthCard from "./AuthCard";
import { Button } from "@/components/ui/button";

const options = [
  {
    title: "Customer",
    description: "Plan events, save vendors, and manage bookings.",
    icon: UserRound,
    href: "/register?role=customer",
  },
  {
    title: "Vendor",
    description: "Create a business profile and receive event leads.",
    icon: Building2,
    href: "/register?role=vendor",
  },
];

export default function RegisterOption() {
  return (
    <AuthCard>
      <div className="px-[19px] pt-[74px] lg:px-[42px] lg:pt-[96px]">
        <div className="space-y-[12px] text-center">
          <h1 className="font-serif text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-[#252323]">
            Join EventHub
          </h1>
          <p className="mx-auto max-w-[304px] text-[16px] leading-[1.38] text-[#6d5d54]">
            Choose how you want to start planning and managing events.
          </p>
        </div>

        <div className="mt-[42px] grid gap-[16px]">
          {options.map(({ title, description, icon: Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex min-h-[104px] items-center gap-[15px] rounded-[12px] border border-[#d8cbbc] bg-[#fffdfb] p-[16px] text-left transition hover:border-[#b23a19] hover:bg-[#f8f0e8]"
            >
              <span className="grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-[#f5eee6] text-[#b23a19]">
                <Icon className="size-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[18px] font-bold text-[#252323]">{title}</span>
                <span className="mt-[5px] block text-[13px] leading-[1.35] text-[#6d5d54]">
                  {description}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-[#b23a19] transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          className="mt-[40px] h-[52px] w-full rounded-[8px] border-[#b23a19] bg-transparent text-[14px] font-bold text-[#b23a19]"
        >
          <Link href="/login">Already have an account?</Link>
        </Button>
      </div>
    </AuthCard>
  );
}
