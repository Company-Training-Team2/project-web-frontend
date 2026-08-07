// Real, callable endpoints — EventsController is genuinely live
// (POST/GET /events, GET /events/:id). No "create/manage an Event" UI
// exists anywhere in this app yet (Budget/Checklist/Timeline/My Events are
// all unbuilt — see README), so this service exists mainly to support
// booking.service.ts: creating a real Booking requires a real eventId, so
// CheckoutScreen ensures the customer has at least one Event (creating a
// minimal default one from the booking draft if they have none) before
// calling bookingService.createBooking.
import apiClient from "@/lib/axios";

export type EventType = "Wedding" | "Birthday" | "Corporate" | "Conference" | "Party" | "Graduation" | "Other";

export interface EventSummary {
  id: number;
  customerId: number;
  name: string;
  eventType: string;
  targetDate: string;
  guestCount: number;
  totalBudget: number;
  city: string;
  location: string;
  notes?: string;
  createdAt: string;
}

export interface CreateEventPayload {
  name: string;
  eventType: EventType;
  targetDate: string; // ISO date
  guestCount: number;
  totalBudget: number;
  city: string;
  location: string;
  notes?: string;
}

export const eventService = {
  async getMyEvents(): Promise<EventSummary[]> {
    const { data } = await apiClient.get<EventSummary[]>("/events");
    return data;
  },

  async createEvent(payload: CreateEventPayload): Promise<EventSummary> {
    const { data } = await apiClient.post<EventSummary>("/events", payload);
    return data;
  },

  /** Returns the customer's most recent event, creating a minimal default
   * one from booking-draft details if they don't have one yet. */
  async ensureEvent(defaults: {
    city: string;
    guestCount: number;
    bookingDate?: string;
  }): Promise<EventSummary> {
    const events = await this.getMyEvents();
    if (events.length > 0) {
      return events.slice().sort((a, b) => b.id - a.id)[0];
    }
    return this.createEvent({
      name: "My Event",
      eventType: "Other",
      targetDate: defaults.bookingDate
        ? new Date(defaults.bookingDate).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      guestCount: defaults.guestCount || 1,
      totalBudget: 0,
      city: defaults.city,
      location: defaults.city,
    });
  },
};
