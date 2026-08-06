// Booking-flow-in-progress state, kept in sessionStorage rather than a
// context/store. This is the first sessionStorage-based flow state in the
// codebase — revisit with react-query/server state once real booking
// endpoints (create + persisted drafts) exist. Scoped to a single browser
// tab/session on purpose: a half-finished reservation shouldn't leak across
// tabs or persist indefinitely like localStorage would.
//
// Reading sessionStorage during the initial render (e.g. useState(() =>
// getBookingDraft())) causes a server/client hydration mismatch — the
// server has no `window`, so it always sees null, while the client sees the
// real value immediately. useBookingDraft() below uses useSyncExternalStore
// instead, which is the React-sanctioned way to read a browser-only external
// store without that mismatch (and without the "setState in an effect"
// anti-pattern of loading it in a useEffect).

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "eventhub.booking.draft";

export interface BookingDraft {
  vendorId: string;
  packageId: string;
  bookingDate?: string; // ISO date
  guestCount?: number;
  contactName?: string;
  contactEmail?: string;
  paymentMethodId?: string;
}

export function getBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BookingDraft;
  } catch {
    return null;
  }
}

export function saveBookingDraft(partial: Partial<BookingDraft>): BookingDraft {
  const current = getBookingDraft() ?? { vendorId: "", packageId: "" };
  const next = { ...current, ...partial };
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function clearBookingDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}

function subscribe(callback: () => void) {
  // sessionStorage writes from *this* tab (saveBookingDraft/clearBookingDraft)
  // don't fire the "storage" event — only other tabs would. That's fine here:
  // this flow is single-tab by design, and callers re-read the draft
  // explicitly right after every save via the returned value.
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): BookingDraft | null {
  return null;
}

/** Hydration-safe read of the in-progress booking draft. Returns null on the
 * server and on the client's first paint, then the real sessionStorage value
 * once React reconciles — see the file header comment for why this can't
 * just be `useState(getBookingDraft())`. */
export function useBookingDraft(): BookingDraft | null {
  return useSyncExternalStore(subscribe, getBookingDraft, getServerSnapshot);
}

/** Mock confirmation code generator for Payment Success — not a real booking
 * id since no booking is actually persisted server-side in this pass. */
export function generateConfirmationCode(): string {
  const chars = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `EVH-${code}`;
}
