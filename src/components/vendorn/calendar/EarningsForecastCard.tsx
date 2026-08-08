export default function EarningsForecastCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <p className="text-xs text-[#8B7E72]">October Forecast</p>
      <p className="text-2xl font-bold text-[#A3391C] mt-1">$42,850</p>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-[#8B716A]">Confirmed Earnings</span>
          <span className="font-medium text-[#2B2622]">$31,200</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#8B716A]">Pending Potential</span>
          <span className="font-medium text-[#2B2622]">$11,650</span>
        </div>
      </div>
    </div>
  );
}