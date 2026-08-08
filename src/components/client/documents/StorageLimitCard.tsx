export default function StorageLimitCard() {
  const percent = 82;

  return (
    <div className="mx-4 md:mx-6 mb-28 md:mb-8 rounded-[16px] bg-[#CFE3D6] p-4">
      <p className="text-sm font-semibold text-[#1F7A4D]">
        Document Storage Limit
      </p>
      <p className="text-xs text-[#1F7A4D]/80 mt-1">
        You&apos;ve used {percent}% of your 5GB premium storage.
      </p>

      <div className="w-full bg-white/50 rounded-full h-1.5 mt-3">
        <div
          className="bg-[#1F7A4D] h-1.5 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>

      <button className="w-full bg-white text-[#1F7A4D] rounded-lg py-2 text-xs font-semibold mt-3 hover:bg-white/80">
        Upgrade Plan
      </button>
    </div>
  );
}