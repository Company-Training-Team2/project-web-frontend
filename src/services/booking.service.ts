// Real, callable endpoints (BookingController: create/accept/reject/cancel/
// getById/getCustomerBookings/getVendorBookings all exist and work today).
// NOT wired into any page yet — every booking-flow page in this pass reads
// from src/lib/mock/bookings.ts fixtures instead, because the richer UI
// (vendor name/image, package, payment info) needs data this thin DTO
// doesn't return yet, and there's no real "create Event" flow to supply the
// required eventId. Swap these in once the flow needs to persist real
// bookings and the backend grows the supporting endpoints.
import apiClient from "@/lib/axios";

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
};
