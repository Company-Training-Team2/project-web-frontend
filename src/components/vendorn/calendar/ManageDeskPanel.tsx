"use client";

import { useState } from "react";
import { Lock, LockOpen, Loader2 } from "lucide-react";
import { toDateOnlyString } from "@/lib/date";
import { vendorPortalService, getVendorPortalErrorMessage } from "@/services/vendorPortal.service";

export default function ManageDeskPanel({
  workPostId,
  onUpdated,
}: {
  workPostId: number | null;
  onUpdated: () => void;
}) {
  const today = toDateOnlyString(new Date());
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const datesInRange = (): string[] => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || startDate > endDate) {
      return [];
    }
    const dates: string[] = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(toDateOnlyString(d));
    }
    return dates;
  };

  const apply = async (isAvailable: boolean) => {
    if (!workPostId) return;
    const dates = datesInRange();
    if (dates.length === 0) {
      setError("Pick a valid date range.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await vendorPortalService.updateAvailability(
        workPostId,
        dates.map((date) => ({ date, isAvailable }))
      );
      onUpdated();
    } catch (err) {
      setError(getVendorPortalErrorMessage(err, "Couldn't update your availability."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Manage Desk</h2>

      <p className="text-xs text-[#8B7E72] mb-1">Date Range</p>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full rounded-lg border border-[#DCCFC0] bg-white px-2.5 py-2 text-xs text-[#2B2622] outline-none focus:border-[#A3391C]"
        />
        <span className="text-[#8B7E72] text-xs">to</span>
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full rounded-lg border border-[#DCCFC0] bg-white px-2.5 py-2 text-xs text-[#2B2622] outline-none focus:border-[#A3391C]"
        />
      </div>

      {error && <p className="text-xs text-[#A3391C] mb-3">{error}</p>}

      <div className="flex flex-col gap-2">
        <button
          onClick={() => apply(false)}
          disabled={submitting || !workPostId}
          className="flex items-center justify-center gap-2 bg-[#2B2622] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
          Block Dates
        </button>

        <button
          onClick={() => apply(true)}
          disabled={submitting || !workPostId}
          className="flex items-center justify-center gap-2 border border-[#DCCFC0] text-[#A3391C] rounded-xl py-2.5 text-sm font-medium hover:bg-[#EDE0D2] disabled:opacity-60"
        >
          <LockOpen size={15} />
          Reopen Dates
        </button>
      </div>
    </div>
  );
}
