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

export type UpdateEventPayload = CreateEventPayload;

// Real, callable endpoint — GET /api/events/{id}/dashboard. Backs the
// Countdown/Budget/Task-Velocity/Guest-RSVP widgets on /event/dashboard.
export interface EventDashboard {
  eventId: number;
  name: string;
  daysUntilEvent: number;
  totalBudget: number;
  spentBudget: number;
  remainingBudget: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  confirmedGuests: number;
  pendingGuests: number;
  declinedGuests: number;
}

// Real, callable endpoint — GET /api/events/{id}/vendors.
export interface EventVendor {
  bookingId: number;
  vendorProfileId: number;
  vendorName: string;
  serviceTitle: string;
  bookingStatus: string;
  amount: number;
  bookingDate: string;
}

// Real, callable endpoints — POST/GET /api/events/{id}/guests, PATCH
// /api/guests/{guestId}/rsvp, DELETE /api/guests/{guestId}.
export interface Guest {
  id: number;
  eventId: number;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: string;
}

export interface CreateGuestPayload {
  name: string;
  email?: string;
  phone?: string;
}

export const eventService = {
  async getMyEvents(): Promise<EventSummary[]> {
    const { data } = await apiClient.get<EventSummary[]>("/events");
    return data;
  },

  async getEventById(id: number): Promise<EventSummary | null> {
    try {
      const { data } = await apiClient.get<EventSummary>(`/events/${id}`);
      return data;
    } catch {
      return null;
    }
  },

  async createEvent(payload: CreateEventPayload): Promise<EventSummary> {
    const { data } = await apiClient.post<EventSummary>("/events", payload);
    return data;
  },

  async updateEvent(id: number, payload: UpdateEventPayload): Promise<EventSummary> {
    const { data } = await apiClient.put<EventSummary>(`/events/${id}`, payload);
    return data;
  },

  async deleteEvent(id: number): Promise<void> {
    await apiClient.delete(`/events/${id}`);
  },

  async getDashboard(id: number): Promise<EventDashboard> {
    const { data } = await apiClient.get<EventDashboard>(`/events/${id}/dashboard`);
    return data;
  },

  async getVendors(id: number): Promise<EventVendor[]> {
    const { data } = await apiClient.get<EventVendor[]>(`/events/${id}/vendors`);
    return data;
  },

  async getGuests(id: number): Promise<Guest[]> {
    const { data } = await apiClient.get<Guest[]>(`/events/${id}/guests`);
    return data;
  },

  async addGuest(id: number, payload: CreateGuestPayload): Promise<Guest> {
    const { data } = await apiClient.post<Guest>(`/events/${id}/guests`, payload);
    return data;
  },

  /** status: Confirmed | Pending | Declined */
  async updateGuestRsvp(guestId: number, status: string): Promise<void> {
    await apiClient.patch(`/events/guests/${guestId}/rsvp`, JSON.stringify(status), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async removeGuest(guestId: number): Promise<void> {
    await apiClient.delete(`/events/guests/${guestId}`);
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
