"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = authService.getUser();
    const token = authService.getToken();
    if (savedUser && token) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (payload: LoginPayload) => {
    const data = await authService.login(payload);
    authService.saveSession(data);
    setUser(data.user);
    router.push("/");
  };

  const register = async (payload: RegisterPayload) => {
    const data = await authService.register(payload);
    authService.saveSession(data);
    setUser(data.user);
    router.push("/");
  };

  const logout = () => {
    authService.logout();
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
