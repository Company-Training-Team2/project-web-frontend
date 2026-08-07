// Real, callable endpoints — UsersController is genuinely live
// (GET/PUT /users/me, PUT /users/me/password, DELETE /users/me/deactivate,
// GET /users/me/activity). Wired here for real so Profile/Settings/Privacy
// screens stop showing hardcoded numbers.
import apiClient from "@/lib/axios";

export interface UserProfile {
  id: number;
  email: string;
  role: "Customer" | "Vendor" | "Admin";
  isEmailVerified: boolean;
  isActive: boolean;
  fullName?: string;
  phoneNumber?: string;
  city?: string;
  avatarUrl?: string;
  businessName?: string;
  bioDescription?: string;
  approvalStatus?: string;
  createdAt: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  phoneNumber?: string;
  city?: string;
  avatarUrl?: string;
  email?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserActivityItem {
  action: string;
  detail?: string;
  ipAddress: string;
  timestamp: string;
}

export function getUserErrorMessage(error: unknown, fallback: string) {
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

export const userService = {
  async getMe(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>("/users/me");
    return data;
  },

  async updateMe(payload: UpdateProfilePayload): Promise<UserProfile> {
    const { data } = await apiClient.put<UserProfile>("/users/me", payload);
    return data;
  },

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await apiClient.put("/users/me/password", payload);
  },

  async deactivateAccount(): Promise<void> {
    await apiClient.delete("/users/me/deactivate");
  },

  // Always returns [] today — GetActivityLogAsync is a real, wired endpoint
  // but the backend hasn't built a UserAuditLog entity yet (see
  // UserService.cs). Called anyway so this screen needs no changes once it
  // does; callers should treat an empty result as "no activity yet", not
  // an error.
  async getActivityLog(page = 1, pageSize = 20): Promise<UserActivityItem[]> {
    const { data } = await apiClient.get<UserActivityItem[]>("/users/me/activity", {
      params: { page, pageSize },
    });
    return data;
  },
};
