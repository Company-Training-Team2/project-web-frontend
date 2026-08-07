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
// real value immediately. An earlier version of useBookingDraft() used
// useSyncExternalStore for this, which is the textbook-correct tool, but it
// produced a real bug in practice on a full page load: the redirect guard's
// effect in CheckoutScreen/PaymentSuccessScreen ran with the
// getServerSnapshot() (null) value on the very first commit and navigated
// away before the corrected client snapshot arrived. useState + useEffect
// below is the more predictable fix — an explicit "hasLoaded" gate so
// consumers can tell "haven't checked sessionStorage yet" apart from
// "checked it and there's genuinely no draft," instead of relying on
// useSyncExternalStore's commit-timing guarantees.

import { useEffect, useState } from "react";

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

// getSnapshot for useSyncExternalStore (below) must return a referentially
// STABLE value when nothing has actually changed — JSON.parse() on every
// call would return a new object each time even when the underlying string
// is identical, which makes React think the store is changing on every
// render and throws "Maximum update depth exceeded". This tiny cache keyed
// on the raw string is what keeps it stable.
let cachedRaw: string | null = null;
let cachedDraft: BookingDraft | null = null;

export function getBookingDraft(): BookingDraft | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedDraft;

  cachedRaw = raw;
  if (!raw) {
    cachedDraft = null;
    return null;
  }
  try {
    cachedDraft = JSON.parse(raw) as BookingDraft;
  } catch {
    cachedDraft = null;
  }
  return cachedDraft;
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

/** Hydration-safe read of the in-progress booking draft. `undefined` means
 * "haven't checked sessionStorage yet" (server render + first client tick);
 * `null` means "checked, and there genuinely isn't one." Consumers must
 * treat these differently — see CheckoutScreen/PaymentSuccessScreen, which
 * render a loading state on `undefined` and only redirect away on `null`. */
export function useBookingDraft(): BookingDraft | null | undefined {
  const [draft, setDraft] = useState<BookingDraft | null | undefined>(undefined);

  useEffect(() => {
    // One-time read of a browser-only store on mount — not a case of
    // deriving state from props/state that belongs in render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(getBookingDraft());
  }, []);

  return draft;
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
