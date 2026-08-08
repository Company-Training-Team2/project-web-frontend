"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type DayStatus = "confirmed" | "pending" | "blocked" | null;

type Day = {
  date: number;
  otherMonth?: boolean;
  status?: DayStatus;
  label?: string;
};

const days: Day[] = [
  { date: 30, otherMonth: true },
  { date: 1, otherMonth: true },
  { date: 2, otherMonth: true },
  { date: 3, status: "confirmed" },
  { date: 4, status: "blocked" },
  { date: 5 },
  { date: 6 },

  { date: 7 },
  { date: 8 },
  { date: 9 },
  { date: 10 }, // today, selected
  { date: 11, status: "confirmed" },
  { date: 12 },
  { date: 13 },

  { date: 14 },
  { date: 15 },
  { date: 16, status: "blocked" },
  { date: 17 },
  { date: 18 },
  { date: 19 },
  { date: 20 },

  { date: 21 },
  { date: 22 },
  { date: 23 },
  { date: 24, status: "pending" },
  { date: 25, status: "pending" },
  { date: 26 },
  { date: 27, label: "Holiday" },

  { date: 28 },
  { date: 29 },
  { date: 30 },
  { date: 31 },
];

const statusDot: Record<Exclude<DayStatus, null>, string> = {
  confirmed: "bg-green-600",
  pending: "bg-yellow-500",
  blocked: "bg-red-600",
};

export default function CalendarGrid() {
  const [selected, setSelected] = useState(10);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs text-[#2B2622]">
          <span className="font-medium text-[#8B7E72]">
            Availability Legend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-600" /> Confirmed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-500" /> Pending
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600" /> Blocked
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-[#8B716A] hover:text-[#2B2622]">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-[#2B2622] whitespace-nowrap">
            October 2024
          </span>
          <button className="text-[#8B716A] hover:text-[#2B2622]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mt-6 text-center text-xs text-[#8B7E72] font-medium">
        {weekdays.map((d) => (
          <div key={d} className="pb-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isSelected = !d.otherMonth && d.date === selected;

          return (
            <button
              key={i}
              disabled={d.otherMonth}
              onClick={() => setSelected(d.date)}
              className={`
                relative h-14 md:h-16 rounded-lg flex flex-col items-center justify-center text-sm
                ${d.otherMonth ? "text-[#DCCFC0]" : "text-[#2B2622]"}
                ${isSelected ? "bg-[#2B2622] text-white" : "hover:bg-[#EDE0D2]"}
              `}
            >
              <span>{d.date}</span>

              {d.status && !isSelected && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-1 ${statusDot[d.status]}`}
                />
              )}

              {d.label && (
                <span className="absolute bottom-1 text-[9px] text-[#A3391C]">
                  {d.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}