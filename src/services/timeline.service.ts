// Real, callable endpoint — TimelineController (Module 6). Milestones are
// computed server-side from Event/Booking/Payment state — there's no
// separate "edit timeline" endpoint, it just reflects reality.
import apiClient from "@/lib/axios";

export interface TimelineMilestone {
  key: string;
  label: string;
  isCompleted: boolean;
  completedAt?: string;
  description?: string;
}

export interface EventTimeline {
  eventId: number;
  eventName: string;
  milestones: TimelineMilestone[];
}

export const timelineService = {
  async getTimeline(eventId: number): Promise<EventTimeline> {
    const { data } = await apiClient.get<EventTimeline>(`/events/${eventId}/timeline`);
    return data;
  },
};
