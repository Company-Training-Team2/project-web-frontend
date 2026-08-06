"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"]

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Builds a 6-row grid of dates for the given month, padding with the
 * previous/next month's days (rendered muted) so every week row is full. */
function buildMonthGrid(month: Date) {
  const first = startOfMonth(month)
  const startWeekday = first.getDay()
  const gridStart = new Date(first)
  gridStart.setDate(first.getDate() - startWeekday)

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    return date
  })
}

interface CalendarProps {
  month: Date
  onMonthChange?: (month: Date) => void
  selectedDate?: Date | null
  onSelect?: (date: Date) => void
  disabledBefore?: Date
  /** Compact renders a smaller variant (fewer paddings, smaller text) for use
   * inside sidebars, e.g. Search Results Desktop's "Availability" filter. */
  size?: "default" | "compact"
  className?: string
}

export function Calendar({
  month,
  onMonthChange,
  selectedDate,
  onSelect,
  disabledBefore,
  size = "default",
  className,
}: CalendarProps) {
  const days = React.useMemo(() => buildMonthGrid(month), [month]);
  const compact = size === "compact"

  const goToMonth = (delta: number) => {
    onMonthChange?.(new Date(month.getFullYear(), month.getMonth() + delta, 1))
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        <p className={cn("font-serif font-bold text-[#252323]", compact ? "text-[13px]" : "text-[18px]")}>
          {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => goToMonth(-1)}
            className="grid size-6 place-items-center rounded-full text-[#6d5d54] transition hover:bg-[#f3ede3]"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => goToMonth(1)}
            className="grid size-6 place-items-center rounded-full text-[#6d5d54] transition hover:bg-[#f3ede3]"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className={cn("mt-3 grid grid-cols-7", compact ? "gap-y-1 text-[10px]" : "gap-y-2 text-[13px]")}>
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={`${label}-${i}`} className="text-center font-medium text-[#a79a90]">
            {label}
          </div>
        ))}

        {days.map((date) => {
          const inMonth = date.getMonth() === month.getMonth()
          const selected = selectedDate ? isSameDay(date, selectedDate) : false
          const disabled = disabledBefore ? date < disabledBefore : false

          return (
            <div key={date.toISOString()} className="grid place-items-center py-0.5">
              <button
                type="button"
                disabled={disabled || !inMonth}
                onClick={() => onSelect?.(date)}
                className={cn(
                  "grid aspect-square w-full max-w-9 place-items-center rounded-full text-[13px] transition",
                  compact && "max-w-6 text-[11px]",
                  !inMonth && "text-transparent",
                  inMonth && !selected && !disabled && "text-[#252323] hover:bg-[#f3ede3]",
                  disabled && inMonth && "text-[#d8cbbc]",
                  selected && "bg-[#af3718] font-bold text-white"
                )}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
