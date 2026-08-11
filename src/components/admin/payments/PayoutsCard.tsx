"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Banknote } from "lucide-react";
import { adminService, getAdminErrorMessage } from "@/services/admin.service";

// Real, callable endpoint — POST /api/admin/payouts/process. Finds
// Completed bookings with a Paid payment and no Payout yet, and creates
// one for each. There's no admin-wide "list all payouts" endpoint on the
// backend (only GET /vendor/payouts, scoped to the signed-in vendor), so
// this stays an action card rather than a fabricated payouts table.
export default function PayoutsCard() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const { message } = await adminService.processDuePayouts();
      toast.success(message);
    } catch (error) {
      toast.error(getAdminErrorMessage(error, "Couldn't process payouts."));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] mt-6 p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#EDE0D2] text-[#A3391C]">
          <Banknote size={18} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#2B2622]">Vendor Payouts</h3>
          <p className="text-sm text-[#8B716A]">
            Settles every completed, paid booking that hasn&apos;t been paid out to its vendor yet.
          </p>
        </div>
      </div>
      <button
        onClick={handleProcess}
        disabled={isProcessing}
        className="shrink-0 rounded-xl bg-[#A3391C] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#8a2f16] disabled:opacity-60"
      >
        {isProcessing ? "Processing…" : "Process Due Payouts"}
      </button>
    </div>
  );
}
