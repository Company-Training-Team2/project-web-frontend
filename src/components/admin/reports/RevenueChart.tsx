export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-[500px]">
      <h2 className="text-xl font-bold text-[#2E2E2E]">
        Revenue Dossier
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        Platform liquidity and annual growth cycle.
      </p>

      <div className="flex justify-end gap-5 text-sm mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C75B29]" />
          Current Year
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-300" />
          Last Year
        </div>
      </div>

      <div className="relative mt-10 h-[330px] rounded-xl bg-[#FBF7F2] overflow-hidden">
        <svg
          viewBox="0 0 700 300"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M20 240
               C90 220,120 250,170 200
               S270 180,330 130
               S420 260,480 160
               S590 120,680 40"
            fill="none"
            stroke="#C75B29"
            strokeWidth="4"
          />

          <path
            d="M20 250
               C100 240,150 235,210 220
               S340 210,400 190
               S520 180,680 170"
            fill="none"
            stroke="#DDDDDD"
            strokeWidth="3"
            strokeDasharray="8 8"
          />
        </svg>
      </div>
    </div>
  );
}