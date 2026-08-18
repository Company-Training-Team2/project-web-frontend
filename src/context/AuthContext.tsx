"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authService, AuthResponse, AuthUser, LoginPayload, RegisterPayload } from "@/services/auth.service";
import { userService } from "@/services/user.service";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload, redirectTo?: string) => Promise<void>;
  loginWithGoogle: (idToken: string, redirectTo?: string) => Promise<void>;
  loginWithApple: (idToken: string, redirectTo?: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Session lives in localStorage, which the server can never see — reading
  // it inside useState's initializer (the old approach) made the very first
  // client render disagree with the server-rendered HTML whenever a session
  // existed, throwing a hydration error and, worse, leaving a one-frame
  // window where useRequireAuth/useRequireAdminAuth saw isAuthenticated as
  // false and redirected an already-logged-in user to /login. Starting from
  // `null`/`isLoading: true` on both server and first client paint, then
  // reading the real session in an effect (client-only, post-hydration),
  // keeps the two in sync and gives the guard hooks a load signal to wait on.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // One-time read of a browser-only store (localStorage) on mount — not a
    // case of deriving state from props/state that belongs in render. Same
    // justification as useBookingDraft() in lib/mock/bookingDraft.ts.
    const savedUser = authService.getUser();
    const token = authService.getToken();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(savedUser && token ? savedUser : null);
    setIsLoading(false);
  }, []);

  // Shared by login()/loginWithGoogle()/loginWithApple() — once any of them
  // has a session back from the backend, "what do we do with it" is
  // identical regardless of which provider it came from.
  const completeSignIn = async (data: AuthResponse, redirectTo?: string) => {
    authService.saveSession(data);
    setUser(data.user);

    // No explicit redirectTo (the common case — just visiting /login and
    // signing in, not being bounced there mid-task) sends each role to its
    // own home: vendors land on their portal, everyone else on the public
    // Home page. An explicit redirectTo always wins — vendor-only
    // destinations are still enforced by useRequireVendorAuth regardless of
    // what a login URL claims.
    const roleHome = data.user.role === "vendor" ? "/vendor/dashboard" : "/";
    const fallback = redirectTo && redirectTo.startsWith("/") ? redirectTo : roleHome;

    // A customer whose profile is still missing the basics (never finished
    // /complete-profile after registering) gets routed there instead of
    // wherever they were headed — HomeController's dashboard, for one,
    // 500s without a CustomerProfile row filled in. Best-effort: if this
    // check itself fails (backend/DB down), don't block sign-in on it.
    if (data.user.role === "customer") {
      try {
        const profile = await userService.getMe();
        if (!profile.fullName || !profile.city) {
          // Carry the original destination through so completing the
          // profile can still land back on, say, /booking/checkout instead
          // of losing that context.
          router.push(`/complete-profile?redirect=${encodeURIComponent(fallback)}`);
          return;
        }
      } catch {
        // fall through to the normal redirect below
      }
    }

    // "/" (app/page.tsx) is now the real public Home landing (see
    // components/home/homePage.tsx) rather than the Login screen, so it's
    // safe to land a just-logged-in user back there by default. Screens that
    // sent a guest to /login mid-task (AI Planner, Checkout's "Pay" button)
    // pass `redirectTo` so login returns them to what they were doing
    // instead of losing their place.
    router.push(fallback);
  };

  const login = async (payload: LoginPayload, redirectTo?: string) => {
    const data = await authService.login(payload);
    await completeSignIn(data, redirectTo);
  };

  const loginWithGoogle = async (idToken: string, redirectTo?: string) => {
    const data = await authService.googleLogin(idToken);
    await completeSignIn(data, redirectTo);
  };

  const loginWithApple = async (idToken: string, redirectTo?: string) => {
    const data = await authService.appleLogin(idToken);
    await completeSignIn(data, redirectTo);
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
        loginWithGoogle,
        loginWithApple,
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
