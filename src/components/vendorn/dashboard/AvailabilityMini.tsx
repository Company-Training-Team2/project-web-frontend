"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { parseDateOnly } from "@/lib/date";
import { vendorPortalService, AvailabilityDay } from "@/services/vendorPortal.service";

export default function AvailabilityMini() {
  const [days, setDays] = useState<AvailabilityDay[] | null>(null);
  const [monthLabel, setMonthLabel] = useState("");

  useEffect(() => {
    vendorPortalService
      .getAvailability()
      // A vendor can have several services, each with its own calendar —
      // union every service's blocked dates for this at-a-glance mini view.
      .then((res) => {
        setDays(res.flatMap((r) => r.days));
        setMonthLabel(new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" }));
      })
      .catch(() => setDays([]));
  }, []);

  const blockedDates = new Set(
    (days ?? []).filter((d) => !d.isAvailable).map((d) => parseDateOnly(d.date).getDate())
  );

  const now = new Date();
  const firstWeekday = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const grid = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#2B2622]">Availability</h2>
        <span className="text-xs text-[#8B716A]">{monthLabel}</span>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-[#8B7E72]">
        {weekdays.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => (
          <div
            key={i}
            className={`flex h-8 items-center justify-center rounded-md text-xs ${d === null ? "invisible" : ""} ${
              d !== null && blockedDates.has(d)
                ? "bg-[#A3391C]/10 font-medium text-[#A3391C]"
                : "text-[#2B2622]"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <Link
        href="/vendor/calendar"
        className="mt-4 block w-full rounded-lg border border-[#DCCFC0] py-2 text-center text-xs font-medium text-[#A3391C] hover:bg-[#EDE0D2]"
      >
        Manage Full Calendar
      </Link>
    </div>
  );
}
