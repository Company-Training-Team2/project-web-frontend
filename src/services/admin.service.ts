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
};
