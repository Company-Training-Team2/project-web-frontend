"use client";

import { useMemo, useState } from "react";

import BrowseVendorsHeader from "./BrowseVendorsHeader";
import VendorSearchBar from "./VendorSearchBar";
import CategoryPillFilter from "./CategoryPillFilter";
import VendorResultsRow from "./VendorResultsRow";
import VendorList from "./VendorList";
import BottomNav from "@/components/shared/BottomNav";
import SparkleFab from "@/components/shared/SparkleFab";
import { MOCK_VENDORS } from "@/lib/mock/vendors";

export default function BrowseVendorsScreen() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MOCK_VENDORS.filter((vendor) => {
      const matchesCategory = !category || vendor.categoryId === category;
      const matchesSearch =
        !search ||
        vendor.businessName.toLowerCase().includes(search.toLowerCase()) ||
        vendor.workPostTitle.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-24 lg:pb-0">
      <BrowseVendorsHeader />

      <div className="mt-5 space-y-4">
        <VendorSearchBar value={search} onChange={setSearch} />
        <CategoryPillFilter active={category} onChange={setCategory} />
        <VendorResultsRow count={filtered.length} city="Alexandria" />
        <VendorList vendors={filtered} />
      </div>

      <SparkleFab />
      <BottomNav active="browse" />
    </div>
  );
}
