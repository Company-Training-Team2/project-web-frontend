// Real, callable endpoints (AdminController — api/admin/*). NOT wired into
// the /admin/vendors page yet: AdminVendorDto only has Id/UserId/Email/
// BusinessName/BioDescription/PhoneNumber/City/ApprovalStatus/IsVerified —
// no portfolio images, compliance documents, or verification-insight
// fields the approval-queue UI needs, so that page reads
// src/lib/mock/adminVendors.ts fixtures instead for now. Wire these in once
// the backend grows a richer vendor-review payload.
import apiClient from "@/lib/axios";

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
  createdAt: string;
}

export interface VendorDecisionPayload {
  reason?: string;
}

export const adminService = {
  async getDashboard(): Promise<unknown> {
    const { data } = await apiClient.get("/admin/dashboard");
    return data;
  },

  async getUsers(): Promise<AdminUserDto[]> {
    const { data } = await apiClient.get<AdminUserDto[]>("/admin/users");
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
};
