export default function SearchResultsHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 px-4 pt-6 sm:px-6 sm:pt-8 md:flex-row md:items-start lg:px-8">
      <div>
        <h1 className="font-serif text-[24px] font-bold leading-[1.15] text-[#252323] sm:text-[28px] lg:text-[36px] lg:leading-[1.1]">
          Showing {count} premium venues
        </h1>
        <p className="mt-2 text-[13px] text-[#6d5d54] sm:text-[14px]">Curated locations for your event.</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-[13px] text-[#6d5d54]">
        Sort by
        <select className="h-9 rounded-[8px] border border-[#e5ded2] bg-white px-2 text-[13px] text-[#252323]">
          <option>Most Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Rated</option>
        </select>
      </div>
    </div>
  );
}
