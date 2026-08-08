// Real, callable endpoints (BookingController: create/accept/reject/cancel/
// getById/getCustomerBookings/getVendorBookings all exist and work today).
// Wired for real via getMyBookings()/getMyBookingById() below, which adapt
// the thin real BookingResponse into the existing MockBooking shape (same
// adapter pattern as vendor.service.ts) so BookingCard/BookingDetailsScreen
// don't need to change — only their data source does — and fall back to
// src/lib/mock/bookings.ts fixtures when there's no real data yet (guest
// demo, backend/DB unreachable, or a brand-new account with no bookings).
import apiClient from "@/lib/axios";
import { MockBooking } from "@/lib/mock/types";
import { MOCK_BOOKINGS, getBookingById as getMockBookingById } from "@/lib/mock/bookings";
import { registerResolvedVendor } from "@/lib/mock/vendors";
import { getVendorDetail } from "./vendor.service";
import { eventService } from "./event.service";

// ─── Types (mirror CreateBookingDto/BookingDto exactly) ────────────────────

export interface CreateBookingPayload {
  eventId: number;
  workPostId: number;
  bookingDate: string; // "YYYY-MM-DD" (DateOnly on the backend)
  quantity: number;
  notes?: string;
}

export interface BookingResponse {
  id: number;
  eventId: number;
  workPostId: number;
  bookingDate: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Rejected";
  totalPrice: number;
  quantity: number;
  notes?: string;
}

export function getBookingErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return fallback;
}

// ─── Service ────────────────────────────────────────────────────────────────

export const bookingService = {
  async createBooking(payload: CreateBookingPayload): Promise<BookingResponse> {
    const { data } = await apiClient.post<BookingResponse>("/Booking", payload);
    return data;
  },

  async acceptBooking(id: number): Promise<BookingResponse> {
    const { data } = await apiClient.put<BookingResponse>(`/Booking/${id}/accept`);
    return data;
  },

  async rejectBooking(id: number): Promise<BookingResponse> {
    const { data } = await apiClient.put<BookingResponse>(`/Booking/${id}/reject`);
    return data;
  },

  async cancelBooking(id: number): Promise<BookingResponse> {
    const { data } = await apiClient.put<BookingResponse>(`/Booking/${id}/cancel`);
    return data;
  },

  async getBookingById(id: number): Promise<BookingResponse> {
    const { data } = await apiClient.get<BookingResponse>(`/Booking/${id}`);
    return data;
  },

  async getCustomerBookings(customerId: number): Promise<BookingResponse[]> {
    const { data } = await apiClient.get<BookingResponse[]>(`/Booking/customer/${customerId}`);
    return data;
  },

  async getVendorBookings(vendorId: number): Promise<BookingResponse[]> {
    const { data } = await apiClient.get<BookingResponse[]>(`/Booking/vendor/${vendorId}`);
    return data;
  },

  // ─── Adapters: real BookingResponse -> existing MockBooking shape ─────────
  //
  // BookingResponse has no `vendorId` (only `workPostId`, which lines up
  // 1:1 since a WorkPost id *is* what MockVendor.id holds for real vendors)
  // and no package concept at all — packageId is left blank, which every
  // consumer already treats as optional/missing.

  // Returns `isLive: true` whenever the real customer/events lookup itself
  // succeeded — including when it legitimately comes back empty (a real,
  // brand-new account with zero events/bookings yet). Mock fixtures are
  // only ever substituted, with `isLive: false`, when the real call
  // actually failed — a genuinely-empty real account must never be shown
  // MOCK_BOOKINGS, which would look like real bookings that aren't theirs.
  async getMyBookings(): Promise<{ bookings: MockBooking[]; isLive: boolean }> {
    try {
      // BookingController.GetCustomerBookings needs a CustomerProfile.Id,
      // which isn't exposed anywhere except EventResponse.customerId — see
      // event.service.ts. No events yet means no real bookings are possible
      // either (creating one requires an event) — that's a real empty
      // state, not a failure.
      const events = await eventService.getMyEvents();
      if (events.length === 0) return { bookings: [], isLive: true };

      const { data } = await apiClient.get<BookingResponse[]>(`/Booking/customer/${events[0].customerId}`);
      await registerVendorsFor(data);
      return { bookings: data.map(toMockBooking), isLive: true };
    } catch {
      return { bookings: MOCK_BOOKINGS, isLive: false };
    }
  },

  async getMyBookingById(id: string): Promise<{ booking: MockBooking | undefined; isLive: boolean }> {
    if (/^\d+$/.test(id)) {
      try {
        const { data } = await apiClient.get<BookingResponse>(`/Booking/${id}`);
        await registerVendorsFor([data]);
        return { booking: toMockBooking(data), isLive: true };
      } catch {
        // fall through to mock lookup below
      }
    }
    return { booking: getMockBookingById(id), isLive: false };
  },
};

// Resolves each distinct real workPostId via the same public, real
// WorkPostController.GetById that Vendor Details already uses, and caches
// the results so BookingCard/BookingDetailsScreen's synchronous
// getVendorById(booking.vendorId) lookups find real vendor data instead of
// coming back empty.
async function registerVendorsFor(bookings: BookingResponse[]) {
  const ids = Array.from(new Set(bookings.map((b) => String(b.workPostId))));
  await Promise.all(
    ids.map(async (id) => {
      const detail = await getVendorDetail(id);
      if (detail) registerResolvedVendor(detail.vendor);
    })
  );
}

function toMockBooking(dto: BookingResponse): MockBooking {
  return {
    id: String(dto.id),
    vendorId: String(dto.workPostId),
    packageId: "",
    bookingDate: dto.bookingDate,
    guestCount: dto.quantity,
    status: dto.status,
    totalPrice: dto.totalPrice,
    quantity: dto.quantity,
    notes: dto.notes,
  };
}
