// Real, callable endpoints — ExpensesController (Module 4: Budget &
// Expenses).
import apiClient from "@/lib/axios";

export interface CategoryBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface BudgetSummary {
  eventId: number;
  totalBudget: number;
  spentBudget: number;
  remainingBudget: number;
  pendingBudget: number;
  categoryBreakdown: CategoryBreakdownItem[];
}

export interface Expense {
  id: number;
  eventId: number;
  category: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending" | "Flagged";
  date: string;
  bookingId?: number;
  isSystemGenerated: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateExpensePayload {
  category: string;
  description: string;
  amount: number;
  status?: "Paid" | "Pending" | "Flagged";
  date?: string;
}

export interface UpdateExpensePayload {
  category: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending" | "Flagged";
  date: string;
}

export const expenseService = {
  async getBudget(eventId: number): Promise<BudgetSummary> {
    const { data } = await apiClient.get<BudgetSummary>(`/events/${eventId}/budget`);
    return data;
  },

  async getExpenses(eventId: number): Promise<Expense[]> {
    const { data } = await apiClient.get<Expense[]>(`/events/${eventId}/expenses`);
    return data;
  },

  async addExpense(eventId: number, payload: CreateExpensePayload): Promise<Expense> {
    const { data } = await apiClient.post<Expense>(`/events/${eventId}/expenses`, payload);
    return data;
  },

  async updateExpense(id: number, payload: UpdateExpensePayload): Promise<Expense> {
    const { data } = await apiClient.put<Expense>(`/expenses/${id}`, payload);
    return data;
  },

  async deleteExpense(id: number): Promise<void> {
    await apiClient.delete(`/expenses/${id}`);
  },
};
