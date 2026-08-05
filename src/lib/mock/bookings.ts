// MOCK DATA — stands in for the real GET /api/booking/customer/:id response,
// enriched with vendor/payment fields that BookingDto doesn't return yet.
// Real endpoint exists (BookingController.GetCustomerBookings) but returns a
// much thinner shape — see src/services/booking.service.ts for the real,
// callable (but not-yet-wired) methods.
import { MockBooking, MockPayment } from "./types";

export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: "b1",
    vendorId: "v4",
    packageId: "p2",
    bookingDate: "2026-10-14",
    guestCount: 120,
    status: "Confirmed",
    totalPrice: 13928,
    quantity: 120,
  },
  {
    id: "b2",
    vendorId: "v1",
    packageId: "p2",
    bookingDate: "2026-11-03",
    guestCount: 80,
    status: "Pending",
    totalPrice: 16800,
    quantity: 80,
    notes: "Action required — confirm final headcount.",
  },
  {
    id: "b3",
    vendorId: "v3",
    packageId: "p1",
    bookingDate: "2026-12-21",
    guestCount: 60,
    status: "Confirmed",
    totalPrice: 6800,
    quantity: 1,
  },
  {
    id: "b4",
    vendorId: "v5",
    packageId: "p1",
    bookingDate: "2026-06-02",
    guestCount: 100,
    status: "Completed",
    totalPrice: 3400,
    quantity: 1,
  },
  {
    id: "b5",
    vendorId: "v2",
    packageId: "p1",
    bookingDate: "2026-05-19",
    guestCount: 1,
    status: "Cancelled",
    totalPrice: 4200,
    quantity: 1,
  },
];

export const MOCK_PAYMENTS: MockPayment[] = [
  { id: "pm1", paymentMethod: "Visa", cardBrand: "Visa", last4: "4291", expiry: "09/32", isDefault: true },
  { id: "pm2", paymentMethod: "MasterCard", cardBrand: "Mastercard", last4: "8802", expiry: "12/25", isDefault: false },
];

export function getBookingById(id: string): MockBooking | undefined {
  return MOCK_BOOKINGS.find((b) => b.id === id);
}
