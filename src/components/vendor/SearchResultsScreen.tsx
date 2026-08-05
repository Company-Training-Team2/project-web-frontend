"use client";

import { useMemo, useState } from "react";

import MarketplaceHeader from "@/components/shared/MarketplaceHeader";
import MarketplaceFooter from "@/components/shared/MarketplaceFooter";
import FiltersSidebar, { SearchFilters } from "./FiltersSidebar";
import SearchResultsHeader from "./SearchResultsHeader";
import VendorGrid from "./VendorGrid";
import Pagination from "./Pagination";
import NoResultsFound from "./NoResultsFound";
import { MOCK_VENDORS } from "@/lib/mock/vendors";

export default function SearchResultsScreen() {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "Alexandria, Egypt",
    category: null,
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
    <div className="min-h-screen bg-[#faf6f0]">
      <MarketplaceHeader />

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
    </div>
  );
}
