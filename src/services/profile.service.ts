import apiClient from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
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

// ─── Service ──────────────────────────────────────────────────────────────────

export const profileService = {
  /**
   * GET /users/me
   * Fetch the currently authenticated user's profile.
   */
  async getProfile(): Promise<UserProfile> {
    const { data } = await apiClient.get<UserProfile>("/users/me");

    return data;
  },

  /**
   * PUT /users/me
   * Update the currently authenticated user's profile.
   */
  async updateProfile(
    payload: UpdateProfilePayload
  ): Promise<void> {
    await apiClient.put("/users/me", payload);
  },
};