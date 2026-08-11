// Real, live endpoint — GET /api/categories (CategoriesController, public).
// Replaces lib/mock/categories.ts wherever a real WorkPost.CategoryId is
// needed (e.g. the vendor Add/Edit Service form) — that fixture stood in for
// this endpoint back when the real Categories table had no rows; it's now
// seeded (see back-end CategoryConfiguration.cs) and reachable for real.
import apiClient from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>("/categories");
    return data;
  },
};
