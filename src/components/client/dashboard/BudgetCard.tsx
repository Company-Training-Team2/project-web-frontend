export default function BudgetCard() {
  const percent = 75;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622]">Budget</h2>

      <div className="flex items-center gap-5 mt-4">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#EDE0D2"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#A3391C"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - percent / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#A3391C]">
              {percent}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold text-[#2B2622]">$18,450</p>
          <p className="text-xs text-[#8B716A] mt-1">
            Remaining of $25,000
          </p>
        </div>
      </div>
    </div>
  );
}