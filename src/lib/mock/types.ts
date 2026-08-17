// MOCK DATA TYPES — these shapes stand in for real backend DTOs that don't
// exist yet (no WorkPostController/VendorController/PaymentController/
// CategoryController in the API today). Field names deliberately mirror the
// REAL domain entities (WorkPost, VendorProfile, Booking, Payment, Category)
// so swapping fixtures for real API responses later is a rename, not a
// redesign. See docs/figma audit notes for the source screens.

/** Mirrors the real `Category` table (Id, Name, Description) — there is no
 * seed data or fixed enum backing this yet, so keep it open-ended rather
 * than a union type. */
export interface Category {
  id: string;
  name: string;
  description?: string;
}

/** Flattens WorkPost + VendorProfile + WorkPostImage fields onto one object
 * (there's no real join to preserve yet). `workPostTitle/description/price/
 * city/address` mirror WorkPost.cs; `businessName/bioDescription` mirror
 * VendorProfile.cs. */
export interface MockVendor {
  id: string;
  workPostTitle: string;
  description: string;
  price: number;
  pricingUnit: "guest" | "flat";
  categoryId: string;
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  eventsCount: number;
  yearsExperience: number;
  images: string[];
  businessName: string;
  bioDescription: string;
  credential?: string;
}

/** Mirrors the real `ServicePackage` entity: `Price` there is one flat/tiered
 * amount for the whole package (see back-end/EventHub.Domain/Entities/
 * ServicePackage.cs — "tiered pricing... replacing single-price
 * constraints"), not a per-guest rate — there's no per-guest field on it at
 * all. Was named `pricePerGuest` and multiplied by guest count in
 * BudgetSummaryCard, which is how a 25,000 EGP venue package turned into a
 * 3,000,000 EGP total for 120 guests. */
export interface MockPackage {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  badge?: "MOST BOOKED";
}

export interface MockReview {
  id: string;
  vendorId: string;
  authorName: string;
  avatarUrl?: string;
  date: string;
  rating: number;
  quote: string;
}

/** Field names + status vocabulary copied from the real Booking entity /
 * BookingStatus enum (Pending/Confirmed/Completed/Cancelled/Rejected). The
 * "Upcoming/Ongoing/Completed/Cancelled" tabs on My Bookings are a UI-layer
 * mapping done in the component, not part of this data shape. */
export interface MockBooking {
  id: string;
  vendorId: string;
  packageId: string;
  bookingDate: string;
  guestCount: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Rejected";
  totalPrice: number;
  quantity: number;
  notes?: string;
}

/** Mirrors the real Payment entity's field names (`paymentMethod` uses the
 * exact real `PaymentMethod` enum values: Cash/Visa/MasterCard/VodafoneCash/
 * InstaPay/BankTransfer). There's no real payment gateway wired up anywhere
 * in this codebase — checkout uses InstaPay as the single mocked method
 * (matches the Egyptian market and needs no card-number fixtures), so
 * `accountLabel`/`isConnected` are the fields that actually get used;
 * `cardBrand`/`last4`/`expiry` are kept on the type for whenever a real
 * card-based method is added, not currently populated. */
export interface MockPayment {
  id: string;
  bookingId?: string;
  amount?: number;
  paymentMethod: "Visa" | "MasterCard" | "Cash" | "VodafoneCash" | "InstaPay" | "BankTransfer";
  paymentStatus?: "Pending" | "Paid" | "Failed" | "Refunded";
  /** InstaPay: the linked mobile number/handle shown to the customer, e.g. "01xx xxx 214". */
  accountLabel?: string;
  isConnected?: boolean;
  cardBrand?: "Visa" | "Mastercard";
  last4?: string;
  expiry?: string;
  isDefault?: boolean;
}
