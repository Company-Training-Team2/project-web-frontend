// Real, live endpoints — VendorController (api/vendor/*), [Authorize(Roles =
// "Vendor")] on every route. Every method here is a thin wrapper: the DTOs
// below mirror the backend's EventHub.Application/DTOs/Vendor/*.cs shapes
// field-for-field, so no adapter layer is needed the way vendor.service.ts
// (the customer-facing browsing service) needs one for its mock fallback.
// This service has no mock fallback — a vendor account with no data yet is a
// real empty state (e.g. GetWorkPosts returns []), not a sign the backend is
// unreachable, so failures surface as real errors instead of silently
// swapping in fake data.
import apiClient from "@/lib/axios";

// ─── Dashboard ──────────────────────────────────────────────────────────────

export interface UpcomingVendorBooking {
  bookingId: number;
  customerName: string;
  workPostTitle: string;
  bookingDate: string; // DateOnly "YYYY-MM-DD"
  totalPrice: number;
  status: string;
}

export interface VendorDashboard {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  totalRevenue: number;
  monthRevenue: number;
  averageRating: number;
  reviewCount: number;
  totalWorkPosts: number;
  upcomingBookings: UpcomingVendorBooking[];
}

// ─── Services (WorkPosts) ───────────────────────────────────────────────────

export interface WorkPostImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface ServicePackage {
  id: number;
  name: string;
  description?: string;
  price: number;
  includes?: string;
}

export interface VendorWorkPost {
  id: number;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  categoryName: string;
  approvalStatus: string;
  averageRating: number;
  reviewCount: number;
  totalBookings: number;
  images: WorkPostImage[];
  servicePackages: ServicePackage[];
}

export interface CreateServicePackagePayload {
  name: string;
  description?: string;
  price: number;
  includes?: string;
}

export interface CreateWorkPostPayload {
  categoryId: number;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  servicePackages?: CreateServicePackagePayload[];
}

export interface UpdateWorkPostPayload {
  categoryId?: number;
  title?: string;
  description?: string;
  price?: number;
  city?: string;
  address?: string;
}

// ─── Availability ───────────────────────────────────────────────────────────

export interface AvailabilityDay {
  id: number;
  date: string; // "YYYY-MM-DD"
  isAvailable: boolean;
  notes?: string;
}

export interface VendorAvailability {
  workPostId: number;
  workPostTitle: string;
  days: AvailabilityDay[];
}

export interface AvailabilityDayUpdate {
  date: string;
  isAvailable: boolean;
  notes?: string;
}

// ─── Bookings ───────────────────────────────────────────────────────────────

export interface VendorBooking {
  id: number;
  workPostId: number;
  workPostTitle: string;
  customerName: string;
  customerPhone?: string;
  bookingDate: string;
  quantity: number;
  totalPrice: number;
  status: string;
  notes?: string;
  createdAt: string;
}

// ─── Analytics ──────────────────────────────────────────────────────────────

export interface MonthlyRevenue {
  year: number;
  month: number;
  revenue: number;
  bookingCount: number;
}

export interface WorkPostPerformance {
  workPostId: number;
  title: string;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
}

export interface VendorAnalytics {
  totalRevenue: number;
  revenueThisMonth: number;
  totalBookings: number;
  completedBookings: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
  monthlyRevenue: MonthlyRevenue[];
  workPostPerformance: WorkPostPerformance[];
}

// ─── Profile ────────────────────────────────────────────────────────────────

export interface VendorProfile {
  id: number;
  businessName: string;
  bioDescription: string;
  phoneNumber?: string;
  city?: string;
  logoUrl?: string;
  isVerified: boolean;
  approvalStatus: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}

export interface UpdateVendorProfilePayload {
  businessName?: string;
  bioDescription?: string;
  phoneNumber?: string;
  city?: string;
  logoUrl?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}

// ─── Earnings / Payouts ─────────────────────────────────────────────────────

export interface VendorEarningItem {
  bookingId: number;
  paymentId: number;
  grossAmount: number;
  platformFeeAmount: number;
  vendorPayoutAmount: number;
  paymentStatus: string;
  paidAt?: string;
}

export interface VendorEarnings {
  totalEarnings: number;
  pendingPayoutAmount: number;
  processedPayoutAmount: number;
  items: VendorEarningItem[];
}

export interface Payout {
  id: number;
  paymentId: number;
  bookingId: number;
  amount: number;
  status: string;
  processedAt?: string;
}

export function getVendorPortalErrorMessage(error: unknown, fallback: string) {
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

export const vendorPortalService = {
  async getDashboard(): Promise<VendorDashboard> {
    const { data } = await apiClient.get<VendorDashboard>("/vendor/dashboard");
    return data;
  },

  async getServices(): Promise<VendorWorkPost[]> {
    const { data } = await apiClient.get<VendorWorkPost[]>("/vendor/services");
    return data;
  },

  async getService(id: number): Promise<VendorWorkPost> {
    const { data } = await apiClient.get<VendorWorkPost>(`/vendor/services/${id}`);
    return data;
  },

  async createService(payload: CreateWorkPostPayload): Promise<VendorWorkPost> {
    const { data } = await apiClient.post<VendorWorkPost>("/vendor/services", payload);
    return data;
  },

  async updateService(id: number, payload: UpdateWorkPostPayload): Promise<VendorWorkPost> {
    const { data } = await apiClient.put<VendorWorkPost>(`/vendor/services/${id}`, payload);
    return data;
  },

  async deleteService(id: number): Promise<void> {
    await apiClient.delete(`/vendor/services/${id}`);
  },

  async uploadServiceImages(id: number, files: File[]): Promise<VendorWorkPost> {
    const form = new FormData();
    files.forEach((file) => form.append("files", file));
    const { data } = await apiClient.post<VendorWorkPost>(
      `/vendor/services/${id}/images`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
  },

  // Real backend returns one VendorAvailabilityDto per WorkPost (a vendor can
  // have several services, each with its own calendar) — an array, not a
  // single object.
  async getAvailability(): Promise<VendorAvailability[]> {
    const { data } = await apiClient.get<VendorAvailability[]>("/vendor/availability");
    return data;
  },

  async updateAvailability(workPostId: number, days: AvailabilityDayUpdate[]): Promise<void> {
    await apiClient.put("/vendor/availability", { workPostId, days });
  },

  async getBookings(status?: string): Promise<VendorBooking[]> {
    const { data } = await apiClient.get<VendorBooking[]>("/vendor/bookings", {
      params: status ? { status } : undefined,
    });
    return data;
  },

  async approveBooking(id: number): Promise<VendorBooking> {
    const { data } = await apiClient.put<VendorBooking>(`/vendor/bookings/${id}/approve`);
    return data;
  },

  async declineBooking(id: number): Promise<VendorBooking> {
    const { data } = await apiClient.put<VendorBooking>(`/vendor/bookings/${id}/decline`);
    return data;
  },

  async completeBooking(id: number): Promise<VendorBooking> {
    const { data } = await apiClient.put<VendorBooking>(`/vendor/bookings/${id}/complete`);
    return data;
  },

  async getAnalytics(): Promise<VendorAnalytics> {
    const { data } = await apiClient.get<VendorAnalytics>("/vendor/analytics");
    return data;
  },

  async getProfile(): Promise<VendorProfile> {
    const { data } = await apiClient.get<VendorProfile>("/vendor/profile");
    return data;
  },

  async updateProfile(payload: UpdateVendorProfilePayload): Promise<VendorProfile> {
    const { data } = await apiClient.put<VendorProfile>("/vendor/profile", payload);
    return data;
  },

  async getEarnings(): Promise<VendorEarnings> {
    const { data } = await apiClient.get<VendorEarnings>("/vendor/earnings");
    return data;
  },

  async getPayouts(): Promise<Payout[]> {
    const { data } = await apiClient.get<Payout[]>("/vendor/payouts");
    return data;
  },
};
