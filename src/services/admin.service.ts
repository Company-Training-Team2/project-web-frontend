// Real, callable endpoints (AdminController — api/admin/*). Dashboard and
// User Management are wired for real below. /admin/vendors (the approval
// queue) is wired for real too via getPendingVendorsAdapted() — but
// AdminVendorDto only has Id/UserId/Email/BusinessName/BioDescription/
// PhoneNumber/City/ApprovalStatus/IsVerified, no portfolio images,
// compliance documents, or verification-insight fields, so the adapter
// below fills those with honest empty states ("Pending"/no documents)
// rather than inventing data, and falls back to
// src/lib/mock/adminVendors.ts fixtures if the real call fails or returns
// nothing (backend/DB down, demo mode).
import apiClient from "@/lib/axios";
import { ADMIN_PENDING_VENDORS, AdminPendingVendor } from "@/lib/mock/adminVendors";

export interface AdminVendorDto {
  vendorProfileId: number;
  userId: number;
  email: string;
  businessName: string;
  bioDescription: string;
  phoneNumber?: string;
  city?: string;
  approvalStatus: "Pending" | "Approved" | "Rejected";
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface AdminUserDto {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  isEmailVerified: boolean;
  createdAt: string;
  fullName?: string;
  businessName?: string;
}

export interface AdminDashboardDto {
  totalUsers: number;
  totalCustomers: number;
  totalVendors: number;
  pendingVendorApprovals: number;
  totalBookings: number;
  bookingsThisMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  totalEvents: number;
  activeWorkPosts: number;
}

export interface VendorDecisionPayload {
  reason?: string;
}

// Real, callable endpoints — AdminController's GET /admin/workposts/pending,
// GET /admin/workposts, PUT .../approve, PUT .../reject. A vendor's
// individual listing (WorkPost) is created Pending — separate from the
// vendor *account* approval above — and every public read path only
// surfaces Approved ones, so this queue is what actually lets a new
// listing go live.
export interface AdminWorkPostDto {
  id: number;
  vendorProfileId: number;
  vendorBusinessName: string;
  categoryId: number;
  categoryName: string;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  minGuests?: number;
  maxGuests?: number;
  approvalStatus: "Pending" | "Approved" | "Rejected";
  primaryImageUrl?: string;
  imageUrls: string[];
  createdAt: string;
}

export interface WorkPostDecisionPayload {
  reason?: string;
}

// Real, callable endpoints — AdminController's GET/PUT /admin/settings, backed
// by a real AdminSettings row (auto-created on first read). Only these seven
// fields exist on the backend; PlatformSettingsCard/CommissionFinancialsCard
// bind to them directly. Language, brand color, vendor-category CRUD, and the
// system/2FA toggles the original mockup had have no backing field or
// endpoint at all, so those stay local-only, clearly marked, rather than
// pretending "Save" persists them.
export interface AdminSettingsDto {
  commissionPercentage: number;
  taxPercentage: number;
  maxImagesPerWorkPost: number;
  maxPackagesPerWorkPost: number;
  platformName: string;
  platformLogoUrl?: string;
  supportEmail: string;
}

export interface UpdateAdminSettingsPayload {
  commissionPercentage?: number;
  taxPercentage?: number;
  maxImagesPerWorkPost?: number;
  maxPackagesPerWorkPost?: number;
  platformName?: string;
  platformLogoUrl?: string;
  supportEmail?: string;
}

// Real, callable endpoints — AdminController's CRM inbox (GET/POST
// /admin/conversations, plus GET/POST .../messages — the latter two added
// alongside this frontend wiring; see AdminController.cs). Distinct from
// vendor<->customer messaging (messaging.service.ts), which is a separate
// system: this is admin support/CRM threads with any platform user.
export interface AdminConversationDto {
  id: number;
  userId: number;
  userEmail: string;
  userDisplayName?: string;
  subject: string;
  status: "Open" | "Resolved" | "Closed";
  lastMessageSnippet?: string;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
}

export interface CreateAdminConversationPayload {
  userId: number;
  subject: string;
  initialMessage?: string;
}

export interface AdminConversationMessageDto {
  id: number;
  conversationId: number;
  senderUserId?: number; // absent/null = sent by admin
  body: string;
  sentAt: string;
  isReadByUser: boolean;
  isReadByAdmin: boolean;
}

// Real, callable endpoints — PaymentController's admin-only Payment module
// surfaced through AdminController (GET /admin/payments, POST
// /admin/payments/{id}/refund, GET /admin/payments/kpis) plus
// IPayoutService (POST /admin/payouts/process). Backend enums
// (PaymentMethod/PaymentStatus) serialize as their underlying number.
export type PaymentMethodValue = 1 | 2 | 3 | 4 | 5 | 6;
export type PaymentStatusValue = 1 | 2 | 3 | 4;

export const PAYMENT_METHOD_LABEL: Record<PaymentMethodValue, string> = {
  1: "Cash",
  2: "Visa",
  3: "MasterCard",
  4: "Vodafone Cash",
  5: "InstaPay",
  6: "Bank Transfer",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatusValue, string> = {
  1: "Pending",
  2: "Paid",
  3: "Failed",
  4: "Refunded",
};

export interface AdminPaymentLedgerItemDto {
  paymentId: number;
  bookingId: number;
  customerName: string;
  vendorName: string;
  amount: number;
  paymentMethod: PaymentMethodValue;
  status: PaymentStatusValue;
  timestamp: string;
}

export interface AdminPaymentKpisDto {
  totalRevenue: number;
  totalPlatformFees: number;
  totalTransactions: number;
  refundRate: number;
  failedTransactionRate: number;
}

// Real, callable endpoint — GET /api/admin/reports/analytics. Consolidated
// revenue/booking/user metrics with a real monthly breakdown and a real
// top-vendors leaderboard. Powers Admin Reports and Admin Analytics —
// neither page had ever called this before; both drew hand-invented numbers
// instead. There's no category-of-booking breakdown, funnel/traffic-source,
// or geographic data anywhere on the backend, so those original-mockup
// widgets have no real replacement and were dropped rather than faked.
export interface AdminMonthlyRevenueDto {
  year: number;
  month: number;
  grossRevenue: number;
  commission: number;
  bookingCount: number;
}

export interface TopVendorDto {
  vendorProfileId: number;
  businessName: string;
  totalRevenue: number;
  completedBookings: number;
  averageRating: number;
}

export interface AdminReportDto {
  totalRevenue: number;
  revenueThisMonth: number;
  totalCommissionEarned: number;
  commissionThisMonth: number;
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  bookingCompletionRate: number;
  totalUsers: number;
  newUsersThisMonth: number;
  totalVendors: number;
  activeVendors: number;
  monthlyRevenue: AdminMonthlyRevenueDto[];
  topVendors: TopVendorDto[];
}

export function getAdminErrorMessage(error: unknown, fallback: string) {
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

export const adminService = {
  async getDashboard(): Promise<AdminDashboardDto> {
    const { data } = await apiClient.get<AdminDashboardDto>("/admin/dashboard");
    return data;
  },

  async getUsers(role?: string, isDeleted?: boolean, page = 1, pageSize = 50): Promise<AdminUserDto[]> {
    const { data } = await apiClient.get<AdminUserDto[]>("/admin/users", {
      params: { role, isDeleted, page, pageSize },
    });
    return data;
  },

  async suspendUser(id: number): Promise<void> {
    await apiClient.put(`/admin/users/${id}/suspend`);
  },

  async activateUser(id: number): Promise<void> {
    await apiClient.put(`/admin/users/${id}/activate`);
  },

  async getPendingVendors(): Promise<AdminVendorDto[]> {
    const { data } = await apiClient.get<AdminVendorDto[]>("/admin/vendors/pending");
    return data;
  },

  async getVendors(approvalStatus?: string, page = 1, pageSize = 20): Promise<AdminVendorDto[]> {
    const { data } = await apiClient.get<AdminVendorDto[]>("/admin/vendors", {
      params: { approvalStatus, page, pageSize },
    });
    return data;
  },

  async approveVendor(id: number, payload?: VendorDecisionPayload): Promise<void> {
    await apiClient.put(`/admin/vendors/${id}/approve`, payload);
  },

  async rejectVendor(id: number, payload?: VendorDecisionPayload): Promise<void> {
    await apiClient.put(`/admin/vendors/${id}/reject`, payload);
  },

  async requestVendorChanges(id: number, payload?: VendorDecisionPayload): Promise<void> {
    await apiClient.put(`/admin/vendors/${id}/request-changes`, payload);
  },

  // Adapter: real AdminVendorDto -> the richer AdminPendingVendor shape the
  // approval-queue UI already expects (same pattern as vendor.service.ts /
  // booking.service.ts). `id` stays numeric-string so the page can tell a
  // real vendor (approve/reject calls the real API) from a mock fixture
  // (local-only demo action). Only falls back to fixtures when the real
  // call actually fails — a genuinely empty real queue (`[]`) is returned
  // as-is rather than silently swapped for mock data that would look real.
  async getPendingVendorsAdapted(): Promise<{ vendors: AdminPendingVendor[]; isLive: boolean }> {
    try {
      const vendors = await this.getPendingVendors();
      return { isLive: true, vendors: vendors.map(
        (v): AdminPendingVendor => ({
          id: String(v.vendorProfileId),
          businessName: v.businessName,
          category: "Vendor",
          location: v.city ?? "—",
          ownerName: v.email,
          description: v.bioDescription,
          idVerified: v.isVerified,
          yearsInBusiness: 0,
          images: [],
          verification: {
            identityCheck: "Pending",
            backgroundCheck: "Pending",
            bankVerification: "Pending",
            riskLevel: "Medium",
          },
          documents: [],
        })
      ) };
    } catch {
      return { isLive: false, vendors: ADMIN_PENDING_VENDORS };
    }
  },

  async getPendingWorkPosts(): Promise<AdminWorkPostDto[]> {
    const { data } = await apiClient.get<AdminWorkPostDto[]>("/admin/workposts/pending");
    return data;
  },

  async getWorkPosts(approvalStatus?: string, page = 1, pageSize = 20): Promise<AdminWorkPostDto[]> {
    const { data } = await apiClient.get<AdminWorkPostDto[]>("/admin/workposts", {
      params: { approvalStatus, page, pageSize },
    });
    return data;
  },

  async approveWorkPost(id: number): Promise<void> {
    await apiClient.put(`/admin/workposts/${id}/approve`);
  },

  async rejectWorkPost(id: number, payload?: WorkPostDecisionPayload): Promise<void> {
    await apiClient.put(`/admin/workposts/${id}/reject`, payload);
  },

  async getAnalyticsReport(): Promise<AdminReportDto> {
    const { data } = await apiClient.get<AdminReportDto>("/admin/reports/analytics");
    return data;
  },

  async getSettings(): Promise<AdminSettingsDto> {
    const { data } = await apiClient.get<AdminSettingsDto>("/admin/settings");
    return data;
  },

  async updateSettings(payload: UpdateAdminSettingsPayload): Promise<AdminSettingsDto> {
    const { data } = await apiClient.put<AdminSettingsDto>("/admin/settings", payload);
    return data;
  },

  async getConversations(): Promise<AdminConversationDto[]> {
    const { data } = await apiClient.get<AdminConversationDto[]>("/admin/conversations");
    return data;
  },

  async createConversation(payload: CreateAdminConversationPayload): Promise<AdminConversationDto> {
    const { data } = await apiClient.post<AdminConversationDto>("/admin/conversations", payload);
    return data;
  },

  async getConversationMessages(conversationId: number): Promise<AdminConversationMessageDto[]> {
    const { data } = await apiClient.get<AdminConversationMessageDto[]>(
      `/admin/conversations/${conversationId}/messages`
    );
    return data;
  },

  async sendConversationMessage(conversationId: number, body: string): Promise<AdminConversationMessageDto> {
    const { data } = await apiClient.post<AdminConversationMessageDto>(
      `/admin/conversations/${conversationId}/messages`,
      { body }
    );
    return data;
  },

  async updateConversationStatus(
    conversationId: number,
    status: "Open" | "Resolved" | "Closed"
  ): Promise<AdminConversationDto> {
    const { data } = await apiClient.patch<AdminConversationDto>(
      `/admin/conversations/${conversationId}/status`,
      { status }
    );
    return data;
  },

  async getPaymentLedger(status?: string, page = 1, pageSize = 20): Promise<AdminPaymentLedgerItemDto[]> {
    const { data } = await apiClient.get<AdminPaymentLedgerItemDto[]>("/admin/payments", {
      params: { status, page, pageSize },
    });
    return data;
  },

  async getPaymentKpis(): Promise<AdminPaymentKpisDto> {
    const { data } = await apiClient.get<AdminPaymentKpisDto>("/admin/payments/kpis");
    return data;
  },

  async refundPayment(paymentId: number, reason?: string): Promise<void> {
    await apiClient.post(`/admin/payments/${paymentId}/refund`, { reason });
  },

  async processDuePayouts(): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>("/admin/payouts/process");
    return data;
  },
};
