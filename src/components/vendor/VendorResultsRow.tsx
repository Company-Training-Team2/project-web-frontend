export default function VendorResultsRow({ count, city }: { count: number; city: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 lg:px-10">
      <p className="text-[13px] text-[#6d5d54]">
        <span className="font-bold text-[#252323]">{count}</span> vendors in {city}
      </p>
      <p className="text-[13px] font-medium text-[#af3718]">Sort: Curated</p>
    </div>
  );
}
