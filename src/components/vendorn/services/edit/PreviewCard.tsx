export default function PreviewCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 overflow-hidden">
      <div className="h-32 rounded-xl bg-[#DCCFC0] mb-3" />
      <h3 className="font-semibold text-[#2B2622] text-sm">
        Signature Heritage Banquet
      </h3>
      <p className="text-lg font-bold text-[#A3391C] mt-1">£32,900</p>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 text-xs font-medium bg-[#A3391C] text-white rounded-lg py-2 hover:opacity-90">
          Publish Signature Heritage Banquet
        </button>
      </div>
    </div>
  );
}