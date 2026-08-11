// Real, callable endpoints — ChecklistController (Module 5). Scoped to a
// single Event; every route requires the signed-in customer to own that
// event (enforced server-side, see ChecklistController.cs).
import apiClient from "@/lib/axios";

export interface ChecklistItem {
  id: number;
  eventId: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "Low" | "Medium" | "High";
  isCompleted: boolean;
  category?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EventChecklist {
  eventId: number;
  totalCount: number;
  completedCount: number;
  pendingCount: number;
  pending: ChecklistItem[];
  completed: ChecklistItem[];
}

export interface CreateChecklistItemPayload {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: "Low" | "Medium" | "High";
  category?: string;
}

export interface UpdateChecklistItemPayload {
  title: string;
  description?: string;
  dueDate?: string;
  priority: "Low" | "Medium" | "High";
  isCompleted: boolean;
  category?: string;
}

export const checklistService = {
  async getChecklist(eventId: number): Promise<EventChecklist> {
    const { data } = await apiClient.get<EventChecklist>(`/events/${eventId}/checklist`);
    return data;
  },

  async createItem(eventId: number, payload: CreateChecklistItemPayload): Promise<ChecklistItem> {
    const { data } = await apiClient.post<ChecklistItem>(`/events/${eventId}/checklist`, payload);
    return data;
  },

  async updateItem(itemId: number, payload: UpdateChecklistItemPayload): Promise<ChecklistItem> {
    const { data } = await apiClient.put<ChecklistItem>(`/checklist/${itemId}`, payload);
    return data;
  },

  async deleteItem(itemId: number): Promise<void> {
    await apiClient.delete(`/checklist/${itemId}`);
  },

  async toggleItem(itemId: number): Promise<ChecklistItem> {
    const { data } = await apiClient.patch<ChecklistItem>(`/checklist/${itemId}/toggle`);
    return data;
  },
};
