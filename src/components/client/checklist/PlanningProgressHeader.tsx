export default function PlanningProgressHeader() {
  const percent = 88;

  return (
    <div className="px-4 md:px-6 pt-6">
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622]">
        Planning Progress
      </h1>
      <p className="text-sm text-[#8B7E72] mt-1">
        Wedding Anniversary · Oct 24, 2026
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex-1 bg-[#EDE0D2] rounded-full h-2 mr-3">
          <div
            className="bg-[#A3391C] h-2 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-[#A3391C] whitespace-nowrap">
          {percent}% COMPLETED
        </span>
      </div>
    </div>
  );
}