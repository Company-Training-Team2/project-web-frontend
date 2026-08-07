"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import MarketplaceHeader from "@/components/shared/MarketplaceHeader";
import MarketplaceFooter from "@/components/shared/MarketplaceFooter";
import BottomNav from "@/components/shared/BottomNav";
import FiltersSidebar, { SearchFilters } from "./FiltersSidebar";
import SearchResultsHeader from "./SearchResultsHeader";
import CategoryPillFilter from "./CategoryPillFilter";
import VendorGrid from "./VendorGrid";
import Pagination from "./Pagination";
import NoResultsFound from "./NoResultsFound";
import { MOCK_VENDORS } from "@/lib/mock/vendors";

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

  const filtered = useMemo(() => {
    return MOCK_VENDORS.filter((vendor) => {
      const matchesCategory = !filters.category || vendor.categoryId === filters.category;
      const matchesRating = vendor.rating >= filters.minRating;
      return matchesCategory && matchesRating;
    });
  }, [filters]);

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
          {filtered.length === 0 ? (
            <NoResultsFound />
          ) : (
            <>
              <SearchResultsHeader count={filtered.length} />
              <VendorGrid vendors={filtered} />
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
