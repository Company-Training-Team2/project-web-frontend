"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { MockPayment } from "@/lib/mock/types";
import { Button } from "@/components/ui/button";

// No real payment gateway is wired up anywhere in this codebase — this
// toggles a local "connected" flag only, standing in for what would be an
// OAuth-style InstaPay account-linking flow.
export default function InstaPayAccountCard({
  account,
  onToggle,
}: {
  account: MockPayment;
  onToggle: () => void;
}) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleClick = () => {
    if (account.isConnected) {
      onToggle();
      return;
    }
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onToggle();
    }, 700);
  };

  return (
    <div className="rounded-[14px] border border-[#e5ded2] bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[#f3ede3] text-[14px] font-black tracking-tight text-[#7B2FF2]">
          IP
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-[#252323]">InstaPay</p>
          <p className="text-[12px] text-[#6d5d54]">
            {account.isConnected ? account.accountLabel : "Not connected yet"}
          </p>
        </div>
        {account.isConnected ? (
          <span className="flex items-center gap-1 text-[12px] font-bold text-[#2E9E68]">
            <CheckCircle2 className="size-4" />
            Connected
          </span>
        ) : null}
      </div>

      <Button
        onClick={handleClick}
        disabled={isConnecting}
        variant={account.isConnected ? "outline" : "default"}
        className={account.isConnected ? "mt-3 h-10 w-full rounded-[8px] border-[#e5ded2] text-[13px]" : "mt-3 h-10 w-full rounded-[8px] bg-[#af3718] text-[13px] hover:bg-[#9f3216]"}
      >
        {isConnecting ? "Connecting…" : account.isConnected ? "Disconnect Account" : "Connect InstaPay Account"}
      </Button>
    </div>
  );
}
