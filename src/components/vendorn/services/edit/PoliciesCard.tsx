"use client";

import { useState } from "react";

// Not part of CreateWorkPostDto/UpdateWorkPostDto yet — kept as local-only
// UI state, not sent to the backend on submit.
export default function PoliciesCard() {
  const [cancellation, setCancellation] = useState(
    "50% refund if cancelled 30+ days before event."
  );
  const [depositPercent, setDepositPercent] = useState("50");

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-1">Policies</h2>
      <p className="text-[11px] text-[#8B7E72] mb-4">
        Not yet saved with your service — the backend doesn&apos;t support
        policies yet.
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Cancellation Policy
          </label>
          <input
            value={cancellation}
            onChange={(e) => setCancellation(e.target.value)}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Deposit Required (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={depositPercent}
            onChange={(e) => setDepositPercent(e.target.value)}
            className="w-24 rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>
    </div>
  );
}
