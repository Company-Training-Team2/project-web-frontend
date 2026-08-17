import apiClient from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export type RegisterRole = "customer" | "vendor";

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: RegisterRole;
  /** Vendor-only — ignored by the backend for Customer registrations. */
  businessName?: string;
  /** Vendor-only — maps to RegisterRequest.cs's BioDescription field. */
  bioDescription?: string;
  /** Vendor-only — up to 3 ids from categoriesService.getAll(). Maps to RegisterRequest.cs's CategoryIds field. */
  categoryIds?: number[];
  /** Vendor-only, public — shown on the storefront. */
  businessLogo?: File;
  /** Vendor-only, public — shown on the storefront. */
  coverImage?: File;
  /** Vendor-only, private — reviewed by admin during KYC approval only. */
  commercialRegistration?: File;
  /** Vendor-only, private — reviewed by admin during KYC approval only. */
  nationalId?: File;
  /** Vendor-only, private — reviewed by admin during KYC approval only. */
  businessLicense?: File;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
  purpose: "register" | "reset-password";
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminMfaVerifyPayload {
  email: string;
  code: string;
}

export type AdminLoginResult =
  | { requiresMfa: true; email: string; message?: string }
  | { requiresMfa: false; session: AuthResponse };

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "vendor" | "admin";
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

// Shape returned by the backend's AuthResponse DTO (Id/Token/RefreshToken/Role/
// Email/Name/Message/RequiresMfa). Role/Name/Id are absent on responses that
// don't carry a session yet (e.g. Register, or a "requiresMfa" reply).
interface BackendAuthResponse {
  id?: number;
  token?: string;
  refreshToken?: string;
  role?: "Customer" | "Vendor" | "Admin";
  email?: string;
  name?: string;
  message?: string;
  requiresMfa?: boolean;
}

const roleToBackend: Record<RegisterRole, "Customer" | "Vendor"> = {
  customer: "Customer",
  vendor: "Vendor",
};

function toAuthResponse(data: BackendAuthResponse): AuthResponse {
  return {
    token: data.token ?? "",
    refreshToken: data.refreshToken ?? "",
    user: {
      id: String(data.id ?? ""),
      name: data.name ?? "",
      email: data.email ?? "",
      role: (data.role ?? "Customer").toLowerCase() as AuthUser["role"],
    },
  };
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
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

// ─── Service ──────────────────────────────────────────────────────────────────

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<BackendAuthResponse>("/auth/login", payload);
    return toAuthResponse(data);
  },

  // Real, live endpoint — POST /auth/google (AuthController.GoogleLogin).
  // idToken is the credential Google Identity Services hands back to
  // GoogleSignInButton's callback; the backend verifies it against Google's
  // public keys (AuthService.ValidateGoogleIdTokenAsync) before trusting it.
  async googleLogin(idToken: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<BackendAuthResponse>("/auth/google", { idToken });
    return toAuthResponse(data);
  },

  // Real, live endpoint — POST /auth/apple (AuthController.AppleLogin).
  // idToken is what AppleID.auth.signIn() resolves with (the popup flow);
  // same verify-against-the-provider's-public-keys pattern as Google.
  async appleLogin(idToken: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<BackendAuthResponse>("/auth/apple", { idToken });
    return toAuthResponse(data);
  },

  // Registration never returns a session — the account can't sign in until the
  // email is verified via the OTP screen, so there is nothing to save yet.
  //
  // multipart/form-data (not JSON) because vendor registration attaches real
  // files (logo, cover image, KYC documents) — see RegisterRequest.cs's
  // [FromForm] binding. Customer registration has no files but still posts
  // as a form; ASP.NET Core binds plain fields from a fileless multipart
  // form exactly the same way.
  async register(payload: RegisterPayload): Promise<{ message: string }> {
    const form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);
    form.append("confirmPassword", payload.confirmPassword);
    form.append("role", roleToBackend[payload.role]);
    form.append("fullName", payload.name);
    form.append("phoneNumber", payload.phone);
    if (payload.businessName) form.append("businessName", payload.businessName);
    if (payload.bioDescription) form.append("bioDescription", payload.bioDescription);
    payload.categoryIds?.forEach((id) => form.append("categoryIds", String(id)));
    if (payload.businessLogo) form.append("businessLogo", payload.businessLogo);
    if (payload.coverImage) form.append("coverImage", payload.coverImage);
    if (payload.commercialRegistration) form.append("commercialRegistration", payload.commercialRegistration);
    if (payload.nationalId) form.append("nationalId", payload.nationalId);
    if (payload.businessLicense) form.append("businessLicense", payload.businessLicense);

    // Content-Type explicitly unset (not "multipart/form-data") so the browser
    // fills in the multipart boundary itself — apiClient's default JSON
    // Content-Type would otherwise ship on this request and the boundary-less
    // header we'd set manually can't be parsed by the server.
    const { data } = await apiClient.post<{ message: string }>("/auth/register", form, {
      headers: { "Content-Type": undefined },
    });
    return data;
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>("/auth/forgot-password", payload);
    return data;
  },

  // Real, live endpoint — POST /auth/resend-otp (AuthController.ResendOtp).
  // Register-verification only; a "reset-password" OTP is resent by calling
  // forgotPassword() again instead (see OTPForm's handleResend). The
  // backend enforces its own 60s cooldown (AuthConstants.
  // ResendOtpCooldownSeconds) and returns a specific "wait N seconds"
  // message if called too soon.
  async resendOtp(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>("/auth/resend-otp", { email });
    return data;
  },

  async verifyOtp(payload: VerifyOtpPayload): Promise<{ message: string }> {
    const endpoint = payload.purpose === "register" ? "/auth/verify-email" : "/auth/verify-reset-code";
    const { data } = await apiClient.post<{ message: string }>(endpoint, {
      email: payload.email,
      code: payload.code,
    });
    return data;
  },

  // Real, working endpoint — POST /auth/admin/login (AuthController.AdminLogin).
  // Returns either {requiresMfa:true, email, message} or a full session.
  async adminLogin(payload: AdminLoginPayload): Promise<AdminLoginResult> {
    const { data } = await apiClient.post<BackendAuthResponse>("/auth/admin/login", payload);
    if (data.requiresMfa) {
      return { requiresMfa: true, email: data.email ?? payload.email, message: data.message };
    }
    return { requiresMfa: false, session: toAuthResponse(data) };
  },

  // Real endpoint (POST /auth/admin/mfa/verify) — but it's a backend stub
  // today: it always replies "MFA verification not yet implemented." and
  // never actually issues a token (see AuthController.cs). Called for real
  // anyway so this screen needs no changes once the backend finishes it.
  async verifyAdminMfa(payload: AdminMfaVerifyPayload): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>("/auth/admin/mfa/verify", payload);
    return data;
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<{ message: string }> {
    const { data } = await apiClient.post<{ message: string }>("/auth/reset-password", {
      email: payload.email,
      code: payload.code,
      newPassword: payload.password,
      confirmPassword: payload.confirmPassword,
    });
    return data;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const { data } = await apiClient.post<BackendAuthResponse>("/auth/refresh", { refreshToken });
    return toAuthResponse(data);
  },

  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Best-effort: even if the server call fails (expired token, offline,
      // etc.) the local session must still be cleared below.
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },

  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  saveSession(data: AuthResponse) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
  },
};
