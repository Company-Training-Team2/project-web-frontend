"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import BrowseVendorsHeader from "./BrowseVendorsHeader";
import VendorSearchBar from "./VendorSearchBar";
import CategoryPillFilter from "./CategoryPillFilter";
import VendorResultsRow from "./VendorResultsRow";
import VendorList from "./VendorList";
import BottomNav from "@/components/shared/BottomNav";
import SparkleFab from "@/components/shared/SparkleFab";
import { MockVendor } from "@/lib/mock/types";
import { searchVendors } from "@/services/vendor.service";

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
    searchVendors({ category: category ?? undefined, keyword: search || undefined }).then((results) => {
      if (!cancelled) {
        setVendors(results);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [search, category]);

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-10">
      {/* No separate Desktop Figma exists for this screen — centering it in
       * a content-width column (rather than letting cards stretch edge to
       * edge) is the responsive treatment for tablet/desktop widths. */}
      <div className="mx-auto w-full max-w-2xl">
        <BrowseVendorsHeader />

        <div className="mt-5 space-y-4">
          <VendorSearchBar value={search} onChange={setSearch} />
          <CategoryPillFilter active={category} onChange={setCategory} />
          <VendorResultsRow count={vendors.length} city="Alexandria" />
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

      <SparkleFab />
      <BottomNav active="browse" />
    </div>
  );
}
