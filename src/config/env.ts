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
