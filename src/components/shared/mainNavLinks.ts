// Single source of truth for the customer-facing marketplace nav — shared by
// MarketplaceHeader (Search Results, Vendor Details, Booking Details, Browse
// Vendors, NoResultsFound) and the Home page's own header, so every screen
// in the customer flow shows the same links pointing at the same places.
// "/home#..." (rather than a bare "#...") is deliberate: these links render
// on pages other than Home too, and a bare hash would just edit the current
// URL instead of navigating there.
export interface MainNavLink {
  label: string;
  href: string;
}

export const MAIN_NAV_LINKS: MainNavLink[] = [
  { label: "Marketplace", href: "/vendors/search" },
  { label: "Packages", href: "/home#packages" },
  { label: "Upcoming Events", href: "/home#occasions" },
  { label: "How It Works", href: "/ai-planner" },
  { label: "Testimonials", href: "/home#testimonials" },
];
