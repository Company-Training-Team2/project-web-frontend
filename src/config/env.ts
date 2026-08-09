// Centralized runtime configuration. Change NEXT_PUBLIC_API_URL (e.g. in a
// `.env.local` file, or in the hosting provider's env settings) to point at a
// deployed backend later — nothing else in the app should hardcode a URL.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006/api";

// The AI Planner endpoint (POST /api/ai/chat) is a Python Vercel Function
// living in this same project (see /api/ai/chat.py) — same-origin, so no
// base URL is needed in production. NEXT_PUBLIC_AI_SERVICE_URL is only for
// pointing at a Python function running separately during local dev (e.g.
// a plain `uvicorn`), since `next dev` alone doesn't serve /api/*.py.
export const AI_SERVICE_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || "";

// Social sign-in — both are PUBLIC client identifiers (not secrets), safe to
// ship in client-side JS. Empty string means "not configured yet"; the
// button components use that to render a disabled/hidden state instead of
// launching a flow that can only fail. Must match the backend's
// GoogleAuth:ClientId / AppleAuth:ClientId (appsettings.json) — the backend
// verifies the id_token's audience against those same values.
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
export const APPLE_CLIENT_ID = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "";
