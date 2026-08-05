// MOCK DATA — stands in for real GET /api/workposts (search/browse) and
// GET /api/workposts/:id (details) endpoints. Neither exists on the backend
// yet (no WorkPostController) — this fixture set is the closest realistic
// approximation of what those responses will look like, based on the real
// WorkPost/VendorProfile entity field names (see ./types.ts).
import { MockPackage, MockReview, MockVendor } from "./types";

export const MOCK_VENDORS: MockVendor[] = [
  {
    id: "v1",
    workPostTitle: "Fine Dining Catering",
    description:
      "A Lisbon atelier crafting seasonal tasting menus for intimate weddings and galas. Every dish is plated to feel like a keepsake — sourced, seasonal, unforgettable.",
    price: 120,
    pricingUnit: "guest",
    categoryId: "catering",
    city: "Alex, Egypt",
    address: "12 Corniche Road, Alexandria",
    rating: 5.0,
    reviewCount: 328,
    eventsCount: 640,
    yearsExperience: 12,
    images: ["/vendor-placeholder-1.jpg"],
    businessName: "Savoré House",
    bioDescription: "Michelin-trained fine dining catering studio.",
    credential: "Michelin-trained",
  },
  {
    id: "v2",
    workPostTitle: "Bridal Makeup Artistry",
    description: "Editorial-grade bridal and event makeup with a soft, long-wear finish.",
    price: 4200,
    pricingUnit: "flat",
    categoryId: "makeup",
    city: "Alex, Egypt",
    address: "Atelier Fleur Studio, Alexandria",
    rating: 4.9,
    reviewCount: 214,
    eventsCount: 410,
    yearsExperience: 8,
    images: ["/vendor-placeholder-2.jpg"],
    businessName: "Atelier Fleur",
    bioDescription: "Makeup artistry studio specializing in bridal looks.",
  },
  {
    id: "v3",
    workPostTitle: "Decor & Floral Styling",
    description: "Waterside styling and floral installations for statement receptions.",
    price: 6800,
    pricingUnit: "flat",
    categoryId: "decoration",
    city: "Alex, Egypt",
    address: "Maison Lumière Studio, Alexandria",
    rating: 4.8,
    reviewCount: 156,
    eventsCount: 290,
    yearsExperience: 6,
    images: ["/vendor-placeholder-3.jpg"],
    businessName: "Maison Lumière",
    bioDescription: "Decor and floral styling for waterside receptions.",
  },
  {
    id: "v4",
    workPostTitle: "Lakeside Estate Venue",
    description: "A private lakeside estate with terraced gardens and a heated pool pavilion.",
    price: 14000,
    pricingUnit: "flat",
    categoryId: "venue",
    city: "Alex, Egypt",
    address: "Villa Serena, Alexandria",
    rating: 4.9,
    reviewCount: 98,
    eventsCount: 140,
    yearsExperience: 15,
    images: ["/vendor-placeholder-4.jpg"],
    businessName: "Villa Serena",
    bioDescription: "Private lakeside estate venue for weddings and galas.",
  },
  {
    id: "v5",
    workPostTitle: "Tablescape Design",
    description: "Gilded tablescapes and place settings for candlelit banquets.",
    price: 3400,
    pricingUnit: "flat",
    categoryId: "decoration",
    city: "Alex, Egypt",
    address: "The Gilded Table Studio, Alexandria",
    rating: 4.7,
    reviewCount: 87,
    eventsCount: 120,
    yearsExperience: 5,
    images: ["/vendor-placeholder-5.jpg"],
    businessName: "The Gilded Table",
    bioDescription: "Tablescape and place-setting design studio.",
  },
];

export const MOCK_PACKAGES: MockPackage[] = [
  {
    id: "p1",
    vendorId: "v1",
    name: "Intimate Tasting",
    description: "5-course seasonal menu • up to 30 guests",
    pricePerGuest: 120,
  },
  {
    id: "p2",
    vendorId: "v1",
    name: "Signature Banquet",
    description: "7-course + wine pairing • up to 120 guests",
    pricePerGuest: 210,
    badge: "MOST BOOKED",
  },
  {
    id: "p3",
    vendorId: "v1",
    name: "Grand Gala",
    description: "Full concierge • 120+ guests, bespoke menu",
    pricePerGuest: 310,
  },
];

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: "r1",
    vendorId: "v1",
    authorName: "Amara Okonkwo",
    date: "March 2025",
    rating: 5.0,
    quote:
      "Every course felt like a love letter. Our guests are still talking about the tasting menu months later.",
  },
  {
    id: "r2",
    vendorId: "v1",
    authorName: "Julien Marchand",
    date: "Jan 2025",
    rating: 4.9,
    quote: "Flawless service for 200 guests. The concierge anticipated everything before we even asked.",
  },
];

export function getVendorById(id: string): MockVendor | undefined {
  return MOCK_VENDORS.find((v) => v.id === id);
}

export function getPackagesForVendor(vendorId: string): MockPackage[] {
  return MOCK_PACKAGES.filter((p) => p.vendorId === vendorId);
}

export function getPackageById(id: string): MockPackage | undefined {
  return MOCK_PACKAGES.find((p) => p.id === id);
}

export function getReviewsForVendor(vendorId: string): MockReview[] {
  return MOCK_REVIEWS.filter((r) => r.vendorId === vendorId);
}
