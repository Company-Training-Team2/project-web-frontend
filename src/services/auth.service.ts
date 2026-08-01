import apiClient from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
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
    console.log("Reset link sent to:", payload.email);
  },

  // TODO: replace mock with → apiClient.post("/auth/reset-password", payload)
  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await delay(800);
    console.log("Password reset for token:", payload.token);
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
