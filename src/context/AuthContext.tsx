"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authService, AuthUser, LoginPayload, RegisterPayload } from "@/services/auth.service";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = authService.getUser();
    const token = authService.getToken();
    return savedUser && token ? savedUser : null;
  });
  const [isLoading] = useState(false);
  const router = useRouter();

  const login = async (payload: LoginPayload) => {
    const data = await authService.login(payload);
    authService.saveSession(data);
    setUser(data.user);
    router.push("/");
  };

  const register = async (payload: RegisterPayload) => {
    // Registering never returns a session — the account must verify its email
    // (OTP screen) before it can sign in, so there's nothing to save here.
    await authService.register(payload);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
