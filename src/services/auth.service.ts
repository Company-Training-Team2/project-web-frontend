// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpPayload {
  email: string;
  code: string;
  purpose: "register" | "reset-password";
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "vendor" | "admin";
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// ─── Mock helpers (remove when backend is ready) ──────────────────────────────

const MOCK_USER: AuthUser = {
  id: "1",
  name: "Aysha Kassem",
  email: "customer@eventhub.com",
  role: "customer",
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
  // TODO: replace mock with → apiClient.post("/auth/login", payload)
  async login(payload: LoginPayload): Promise<AuthResponse> {
    await delay(800);
    if (payload.password.length < 6) {
      throw { response: { data: { message: "Invalid email or password" } } };
    }
    const token = "mock-jwt-token-" + Date.now();
    return { user: MOCK_USER, token };
  },

  // TODO: replace mock with → apiClient.post("/auth/register", payload)
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    await delay(800);
    const token = "mock-jwt-token-" + Date.now();
    const user: AuthUser = {
      id: "2",
      name: payload.name,
      email: payload.email,
      role: "customer",
    };
    return { user, token };
  },

  // TODO: replace mock with → apiClient.post("/auth/forgot-password", payload)
  async forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
    await delay(800);
    void payload;
  },

  // TODO: replace mock with → apiClient.post("/auth/verify-otp", payload)
  async verifyOtp(payload: VerifyOtpPayload): Promise<void> {
    await delay(700);
    if (payload.code.length !== 6) {
      throw { response: { data: { message: "Enter the 6-digit verification code" } } };
    }
  },

  // TODO: replace mock with → apiClient.post("/auth/reset-password", payload)
  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await delay(800);
    void payload;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  saveSession(data: AuthResponse) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },
};
