import Link from "next/link";
import { SearchX, WifiOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import VendorCard from "./VendorCard";
import { MOCK_VENDORS } from "@/lib/mock/vendors";

/**
 * The Figma frame named "not found" is NOT a route-404 page — it's a rich
 * marketplace "no search results" empty state (hero + curated
 * recommendations below). The actual 404 page lives at
 * src/app/not-found.tsx and is intentionally left untouched; this component
 * is rendered inline by Search Results / Browse Vendors when a filtered
 * query yields zero matches — both of those screens already render their
 * own header/footer chrome around it, so this renders content only. It
 * previously also rendered MarketplaceHeader/MarketplaceFooter itself,
 * which duplicated the parent screen's nav bar whenever the list came back
 * empty (visible at desktop width — two stacked "EventHub" nav bars).
 */
export default function NoResultsFound() {
  const recommendations = MOCK_VENDORS.slice(0, 3);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-[#f3ede3] text-[#af3718]">
          <SearchX className="size-8" />
        </div>
        <h2 className="font-serif text-[30px] font-bold text-[#af3718]">A Quiet Moment in Curation</h2>
        <p className="mt-2 font-serif text-[22px] font-bold text-[#252323]">No results found.</p>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.5] text-[#6d5d54]">
          Our artisans and venues are currently out of view, but your next extraordinary event is just a
          discovery away. Allow us to guide you toward other curated experiences.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 w-full rounded-[8px] bg-[#af3718] px-6 hover:bg-[#9f3216] sm:w-auto">
            <Link href="/vendors/search">Explore Vendors →</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 w-full rounded-[8px] border-[#252323] px-6 sm:w-auto">
            <Link href="/vendors">Back Home</Link>
          </Button>
        </div>
      </div>

      <div className="px-6 pb-16 lg:px-10">
        <div className="mb-6 text-center">
          <h3 className="font-serif text-[26px] font-bold text-[#af3718]">Continue Your Journey</h3>
          <p className="text-[13px] text-[#6d5d54]">Explore our most sought-after curation</p>
          {/* Distinct from SampleDataNotice's copy — these are always sample
              listings here (curated recommendations for an empty result),
              not a stand-in for a failed live request. */}
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[12px] text-[#8B7E72]">
            <WifiOff size={12} className="shrink-0" />
            Sample listings shown for inspiration — not live search results.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} layout="grid" />
          ))}
        </div>
      </div>
    </div>
  );
}
