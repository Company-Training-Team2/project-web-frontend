"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import BrowseVendorsHeader from "./BrowseVendorsHeader";
import VendorSearchBar from "./VendorSearchBar";
import CategoryPillFilter from "./CategoryPillFilter";
import VendorResultsRow from "./VendorResultsRow";
import VendorList from "./VendorList";
import MarketplaceHeader from "@/components/shared/MarketplaceHeader";
import MarketplaceFooter from "@/components/shared/MarketplaceFooter";
import BottomNav from "@/components/shared/BottomNav";
import SparkleFab from "@/components/shared/SparkleFab";
import { MockVendor } from "@/lib/mock/types";
import { searchVendors } from "@/services/vendor.service";
import SampleDataNotice from "@/components/shared/SampleDataNotice";

export default function BrowseVendorsScreen() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [vendors, setVendors] = useState<MockVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Real WorkPostController.Search is public and live — this queries it for
  // real, with a built-in fallback to the local fixtures if it's
  // unreachable (see src/services/vendor.service.ts).
  useEffect(() => {
    let cancelled = false;
    // A real network call kicking off on filter change, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    searchVendors({ category: category ?? undefined, keyword: search || undefined }).then((result) => {
      if (!cancelled) {
        setVendors(result.vendors);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [search, category]);

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-0">
      {/* No separate Desktop Figma exists for this screen. Below `lg` it
       * keeps its original mobile treatment (BrowseVendorsHeader, centered
       * column, BottomNav). At `lg`+ it borrows the same marketplace chrome
       * every other desktop-oriented screen uses (MarketplaceHeader/Footer)
       * instead of stretching the mobile header across a wide viewport, and
       * the vendor list switches to a multi-column grid (see VendorList) so
       * the page doesn't read as a narrow mobile column stranded in a sea
       * of empty space. */}
      <div className="hidden lg:block">
        <MarketplaceHeader />
      </div>

      <div className="mx-auto w-full max-w-2xl lg:max-w-7xl">
        <div className="lg:hidden">
          <BrowseVendorsHeader />
        </div>

        <div className="mt-5 space-y-4 lg:mt-8 lg:space-y-6">
          <VendorSearchBar value={search} onChange={setSearch} />
          <CategoryPillFilter active={category} onChange={setCategory} />
          <VendorResultsRow count={vendors.length} city="Alexandria" />
          {!isLoading && vendors.length > 0 && !/^\d+$/.test(vendors[0].id) ? <SampleDataNotice /> : null}
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-[#a79a90]">
              <Loader2 className="size-5 animate-spin" />
              Loading vendors…
            </div>
          ) : (
            <VendorList vendors={vendors} />
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <MarketplaceFooter />
      </div>

      <SparkleFab />
      <div className="lg:hidden">
        <BottomNav active="browse" />
      </div>
    </div>
  );
}
