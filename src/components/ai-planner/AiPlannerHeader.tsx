"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AiPlannerHeader() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between border-b border-[#e5ded2] bg-white px-5 py-4 lg:px-10">
      <button onClick={() => router.back()} aria-label="Back" className="text-[#252323]">
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="font-serif text-[18px] font-bold text-[#252323]">AI Planner</h1>
      <span className="grid size-9 place-items-center rounded-full bg-[#e9dfd1] text-[13px] font-bold text-[#252323]">
        {user?.name?.[0]?.toUpperCase() ?? "U"}
      </span>
    </div>
  );
}
