"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";
import { cn } from "@/lib/utils";

export default function LiveDossierHeading({ eventName }: { eventName: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <button
      onClick={() => setCollapsed((c) => !c)}
      className="flex w-full items-center justify-between rounded-[14px] bg-white px-5 py-4"
    >
      <div className="text-left">
        <SectionEyebrow>Live Dossier</SectionEyebrow>
        {!collapsed ? <h2 className="mt-0.5 font-serif text-[20px] font-bold text-[#252323]">{eventName}</h2> : null}
      </div>
      <ChevronDown className={cn("size-5 text-[#a79a90] transition-transform", collapsed && "-rotate-90")} />
    </button>
  );
}
