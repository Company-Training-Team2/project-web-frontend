import { MockVendor } from "@/lib/mock/types";
import VendorCard from "./VendorCard";
import NoResultsFound from "./NoResultsFound";

/**
 * Two Tailwind-only trees (CSS toggling visibility, both render), same
 * pattern already used by MarketplaceHeader / SearchResultsScreen's
 * mobile-pill-row-vs-FiltersSidebar split: below `lg` this stays the
 * original single-column horizontal list card; at `lg`+ it switches to the
 * same multi-column grid card style Search Results Desktop uses, so Browse
 * Vendors (which has no dedicated Desktop Figma frame) doesn't look like a
 * narrow mobile column stranded in the middle of a wide viewport.
 */
export default function VendorList({ vendors }: { vendors: MockVendor[] }) {
  if (vendors.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <>
      <div className="space-y-3 px-5 pb-28 pt-1 lg:hidden">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} layout="list" />
        ))}
      </div>

      <div className="hidden gap-6 px-10 pb-16 pt-2 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <VendorCard key={`${vendor.id}-grid`} vendor={vendor} layout="grid" />
        ))}
      </div>
    </>
  );
}
