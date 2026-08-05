// Centralized runtime configuration. Change NEXT_PUBLIC_API_URL (e.g. in a
// `.env.local` file, or in the hosting provider's env settings) to point at a
// deployed backend later — nothing else in the app should hardcode a URL.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006/api";
