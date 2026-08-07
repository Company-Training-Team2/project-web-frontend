// Real, callable endpoints — WorkPostController is genuinely live and public
// (GET /workposts/search, GET /workposts/{id}). Wired here for real, with a
// graceful fallback to the local src/lib/mock/vendors.ts fixtures if the
// call fails (backend not running, offline demo, etc.) so the browsing
// screens stay usable either way. Responses are adapted into the existing
// MockVendor/MockPackage/MockReview shapes so none of the UI components
// that already consume those shapes need to change — only their data
// source does.
import apiClient from "@/lib/axios";
import { MockPackage, MockReview, MockVendor } from "@/lib/mock/types";
import { getCategoryById } from "@/lib/mock/categories";
import {
  MOCK_VENDORS,
  getPackagesForVendor as getMockPackagesForVendor,
  getReviewsForVendor as getMockReviewsForVendor,
  getVendorById as getMockVendorById,
} from "@/lib/mock/vendors";

// ─── Backend DTO shapes (WorkPostSummaryDto / WorkPostDetailDto / etc.) ────

interface WorkPostSummaryDto {
  id: number;
  title: string;
  categoryName: string;
  vendorBusinessName: string;
  city: string;
  price: number;
  primaryImageUrl?: string;
  averageRating: number;
  reviewCount: number;
}

interface WorkPostImageDto {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

interface ServicePackageDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  includes?: string;
}

interface ReviewSummaryDto {
  id: number;
  customerName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

interface WorkPostDetailDto {
  id: number;
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  categoryName: string;
  vendorProfileId: number;
  vendorBusinessName: string;
  vendorLogoUrl?: string;
  vendorIsVerified: boolean;
  averageRating: number;
  reviewCount: number;
  images: WorkPostImageDto[];
  servicePackages: ServicePackageDto[];
  reviews: ReviewSummaryDto[];
}

export interface VendorSearchFilters {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

// ─── Adapters: backend DTO -> existing Mock* shapes ────────────────────────

function summaryToMockVendor(dto: WorkPostSummaryDto): MockVendor {
  return {
    id: String(dto.id),
    workPostTitle: dto.title,
    description: "",
    price: dto.price,
    pricingUnit: "flat",
    categoryId: dto.categoryName,
    city: dto.city,
    address: "",
    rating: dto.averageRating,
    reviewCount: dto.reviewCount,
    eventsCount: 0,
    yearsExperience: 0,
    images: dto.primaryImageUrl ? [dto.primaryImageUrl] : [],
    businessName: dto.vendorBusinessName,
    bioDescription: "",
  };
}

function detailToMockVendor(dto: WorkPostDetailDto): MockVendor {
  return {
    id: String(dto.id),
    workPostTitle: dto.title,
    description: dto.description,
    price: dto.price,
    pricingUnit: "flat",
    categoryId: dto.categoryName,
    city: dto.city,
    address: dto.address,
    rating: dto.averageRating,
    reviewCount: dto.reviewCount,
    eventsCount: 0,
    yearsExperience: 0,
    images: dto.images.map((i) => i.imageUrl),
    businessName: dto.vendorBusinessName,
    bioDescription: dto.description,
    credential: dto.vendorIsVerified ? "Verified" : undefined,
  };
}

function toMockPackage(dto: ServicePackageDto, vendorId: string): MockPackage {
  return {
    id: String(dto.id),
    vendorId,
    name: dto.name,
    description: dto.description ?? dto.includes ?? "",
    pricePerGuest: dto.price,
  };
}

function toMockReview(dto: ReviewSummaryDto, vendorId: string): MockReview {
  return {
    id: String(dto.id),
    vendorId,
    authorName: dto.customerName,
    date: new Date(dto.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    rating: dto.rating,
    quote: dto.comment ?? "",
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function searchVendors(filters: VendorSearchFilters): Promise<MockVendor[]> {
  try {
    const params: Record<string, string | number> = {
      page: filters.page ?? 1,
      pageSize: filters.pageSize ?? 12,
    };
    // `filters.category` is one of our internal slug ids ("catering",
    // "venue"...) from MOCK_CATEGORIES — translate to the display name
    // before sending, since that's what the backend's own Category rows
    // are actually named.
    if (filters.category) params.category = getCategoryById(filters.category)?.name ?? filters.category;
    if (filters.city) params.city = filters.city;
    if (filters.minRating) params.rating = filters.minRating;
    if (filters.keyword) params.q = filters.keyword;
    if (filters.minPrice != null || filters.maxPrice != null) {
      params.price_range = `${filters.minPrice ?? ""}-${filters.maxPrice ?? ""}`;
    }

    const { data } = await apiClient.get<WorkPostSummaryDto[] | { items: WorkPostSummaryDto[] }>(
      "/workposts/search",
      { params }
    );
    const items = Array.isArray(data) ? data : data.items;
    return items.map(summaryToMockVendor);
  } catch {
    // Backend not reachable — fall back to local fixtures so browsing still works.
    return MOCK_VENDORS.filter((v) => {
      const matchesCategory = !filters.category || v.categoryId === filters.category;
      const matchesKeyword =
        !filters.keyword ||
        v.businessName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        v.workPostTitle.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchesRating = !filters.minRating || v.rating >= filters.minRating;
      return matchesCategory && matchesKeyword && matchesRating;
    });
  }
}

export interface VendorDetail {
  vendor: MockVendor;
  packages: MockPackage[];
  reviews: MockReview[];
}

export async function getVendorDetail(id: string): Promise<VendorDetail | null> {
  // Real WorkPost ids are numeric; mock fixture ids are "v1".."v5" — try the
  // real endpoint only when `id` actually looks numeric, otherwise go
  // straight to fixtures (covers links generated from mock data elsewhere).
  if (/^\d+$/.test(id)) {
    try {
      const { data } = await apiClient.get<WorkPostDetailDto>(`/workposts/${id}`);
      return {
        vendor: detailToMockVendor(data),
        packages: data.servicePackages.map((p) => toMockPackage(p, String(data.id))),
        reviews: data.reviews.map((r) => toMockReview(r, String(data.id))),
      };
    } catch {
      // fall through to mock lookup below
    }
  }

  const vendor = getMockVendorById(id);
  if (!vendor) return null;
  return {
    vendor,
    packages: getMockPackagesForVendor(id),
    reviews: getMockReviewsForVendor(id),
  };
}
