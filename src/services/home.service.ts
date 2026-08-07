// Real, callable, authenticated endpoint — HomeController.GetDashboard is
// genuinely live (GET /home/dashboard). Requires a signed-in customer with a
// completed CustomerProfile (see AuthContext's post-login complete-profile
// redirect) — it 500s otherwise, since it looks the profile up directly.
import apiClient from "@/lib/axios";

export interface UpcomingEventSummary {
  id: number;
  name: string;
  eventType: string;
  targetDate: string;
  daysRemaining: number;
}

// Mirrors WorkPostSummaryDto (see vendor.service.ts) — kept local rather
// than shared to avoid coupling the two services over an internal type.
export interface RecommendedWorkPost {
  id: number;
  title: string;
  categoryName: string;
  vendorBusinessName: string;
  city: string;
  price: number;
  primaryImageUrl?: string;
  averageRating: number;
  reviewCount: number;
}

export interface HomeDashboard {
  customerName: string;
  upcomingEventsCount: number;
  nextEvent: UpcomingEventSummary | null;
  favoritesCount: number;
  pendingBookingsCount: number;
  confirmedBookingsCount: number;
  recommendedWorkPosts: RecommendedWorkPost[];
}

export const homeService = {
  async getDashboard(): Promise<HomeDashboard> {
    const { data } = await apiClient.get<HomeDashboard>("/home/dashboard");
    return data;
  },
};
