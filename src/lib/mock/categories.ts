// MOCK DATA — stands in for a real GET /api/categories endpoint that doesn't
// exist yet (no CategoryController/seed data on the backend). Same stand-in
// concept as the VENDOR_CATEGORIES list in VendorRegisterForm — consolidate
// the two once a real endpoint exists.
import { Category } from "./types";

export const MOCK_CATEGORIES: Category[] = [
  { id: "catering", name: "Catering", description: "Fine dining, buffets, tastings" },
  { id: "florals", name: "Florals", description: "Bouquets, centerpieces, installations" },
  { id: "venue", name: "Venue", description: "Halls, estates, rooftops, gardens" },
  { id: "photography", name: "Photography", description: "Photo & video coverage" },
  { id: "makeup", name: "Makeup Artist", description: "Bridal & event makeup" },
  { id: "decoration", name: "Decoration", description: "Styling, tablescapes, lighting" },
  { id: "music", name: "Music", description: "Live bands, DJs, ensembles" },
  { id: "planning", name: "Planning", description: "Full-service event coordination" },
];

// Vendors sourced from the real backend (src/services/vendor.service.ts)
// store the raw CategoryName string in `categoryId` (there's no shared
// category-id space between the mock fixtures and real WorkPost.CategoryId
// yet — no CategoryController/seed data exists). Falling back to a
// case-insensitive name match here means real category names "just work"
// as a display label even though they don't match a mock `id`.
export function getCategoryById(id: string): Category | undefined {
  return (
    MOCK_CATEGORIES.find((c) => c.id === id) ??
    MOCK_CATEGORIES.find((c) => c.name.toLowerCase() === id.toLowerCase()) ?? {
      id,
      name: id,
    }
  );
}
