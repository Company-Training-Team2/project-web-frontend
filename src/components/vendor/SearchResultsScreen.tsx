"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import MarketplaceHeader from "@/components/shared/MarketplaceHeader";
import MarketplaceFooter from "@/components/shared/MarketplaceFooter";
import BottomNav from "@/components/shared/BottomNav";
import FiltersSidebar, { SearchFilters } from "./FiltersSidebar";
import SearchResultsHeader from "./SearchResultsHeader";
import CategoryPillFilter from "./CategoryPillFilter";
import VendorGrid from "./VendorGrid";
import Pagination from "./Pagination";
import NoResultsFound from "./NoResultsFound";
import { MockVendor } from "@/lib/mock/types";
import { searchVendors } from "@/services/vendor.service";
import SampleDataNotice from "@/components/shared/SampleDataNotice";

function SearchResultsScreenInner() {
  // MarketplaceHeader's nav links (Venues/Catering/Floral/Planning) send
  // ?category=<id> — read it once on load so those links actually filter
  // instead of always landing on the unfiltered default.
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [filters, setFilters] = useState<SearchFilters>({
    location: "Alexandria, Egypt",
    category: initialCategory,
    minRating: 0,
    guestCount: 150,
  });
  const [page, setPage] = useState(1);
  const [vendors, setVendors] = useState<MockVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Real WorkPostController.Search is public and live — queried for real,
  // with a fixture fallback baked into searchVendors() if it's unreachable.
  useEffect(() => {
    let cancelled = false;
    // A real network call kicking off on filter change, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    searchVendors({ category: filters.category ?? undefined, minRating: filters.minRating || undefined }).then(
      (results) => {
        if (!cancelled) {
          setVendors(results);
          setIsLoading(false);
        }
      }
    );
    return () => {
      cancelled = true;
    };
  }, [filters.category, filters.minRating]);

  return (
    <div className="min-h-screen bg-[#faf6f0] pb-20 lg:pb-0">
      <MarketplaceHeader />

      {/* FiltersSidebar is desktop-only (lg:block); phones/tablets get an
       * inline category-pill row instead of the full sidebar so filtering
       * still works below lg. */}
      <div className="border-b border-[#e5ded2] py-3 lg:hidden">
        <CategoryPillFilter active={filters.category} onChange={(category) => setFilters((f) => ({ ...f, category }))} />
      </div>

      <div className="flex">
        <FiltersSidebar filters={filters} onChange={setFilters} />

        <main className="min-w-0 flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-24 text-[#a79a90]">
              <Loader2 className="size-5 animate-spin" />
              Loading vendors…
            </div>
          ) : vendors.length === 0 ? (
            <NoResultsFound />
          ) : (
            <>
              <SearchResultsHeader count={vendors.length} />
              {!/^\d+$/.test(vendors[0].id) ? <SampleDataNotice className="px-4 pb-2 sm:px-6 lg:px-8" /> : null}
              <VendorGrid vendors={vendors} />
              <Pagination page={page} totalPages={12} onChange={setPage} />
            </>
          )}
        </main>
      </div>

      <MarketplaceFooter />
      <BottomNav active="browse" />
    </div>
  );
}

export default function SearchResultsScreen() {
  return (
    <Suspense>
      <SearchResultsScreenInner />
    </Suspense>
  );
}
