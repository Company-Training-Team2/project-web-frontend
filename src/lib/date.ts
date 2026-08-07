// Timezone-safe helpers for date-only (no time-of-day) values like a
// booking date. `Date#toISOString()` converts to UTC, which silently shifts
// the calendar date backward by one day for anyone in a positive UTC offset
// (Cairo, and most of this app's target market included) — e.g. selecting
// "May 18" at local midnight serialized as "2027-05-17". `new Date("YYYY-MM-DD")`
// has the mirror-image problem: it's parsed as UTC midnight, which shifts
// forward/backward depending on the reader's own offset. These two helpers
// do both directions using local Date components only, so a date picked
// here always reads back as the same day everywhere.

/** Date -> "YYYY-MM-DD" using local year/month/day (no UTC conversion). */
export function toDateOnlyString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** "YYYY-MM-DD" -> Date at local midnight (no UTC conversion). */
export function parseDateOnly(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}
