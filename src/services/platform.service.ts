// Real, callable, unauthenticated endpoint — PlatformController is public
// (GET /platform/stats) and exists specifically so marketing/landing
// surfaces can show real marketplace numbers instead of hardcoded copy.
import apiClient from "@/lib/axios";

export interface PlatformStats {
  totalVendors: number;
  totalCustomers: number;
  totalApprovedWorkPosts: number;
  totalCategories: number;
  totalCompletedBookings: number;
  totalEventsPlanned: number;
  averagePlatformRating: number;
}

interface BackendPlatformStatsDto {
  totalVendors: number;
  totalCustomers: number;
  totalApprovedWorkPosts: number;
  totalCategories: number;
  totalCompletedBookings: number;
  totalEventsPlanned: number;
  averagePlatformRating: number;
}

export const platformService = {
  async getStats(): Promise<PlatformStats> {
    const { data } = await apiClient.get<BackendPlatformStatsDto>("/platform/stats");
    return data;
  },
};
