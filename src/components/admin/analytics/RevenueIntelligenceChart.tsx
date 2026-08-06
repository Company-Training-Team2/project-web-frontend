const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const thisYear = "0,120 40,95 80,100 120,70 160,80 200,40 240,55 280,20 320,60 360,90 400,50 440,15";
const lastYear = "0,140 40,130 80,135 120,120 160,125 200,110 240,118 280,100 320,115 360,125 400,110 440,95";

export default function RevenueIntelligenceChart() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold text-xl text-[#2B2622]">Revenue Intelligence</h2>
          <p className="text-sm text-[#8B716A] mt-1">
            Monthly revenue progression and year over year comparison
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#8B716A]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3391C]" />
            This Year
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DCCFC0]" />
            Last Year
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox="0 0 440 160" className="w-full min-w-[500px] h-56" preserveAspectRatio="none">
          <polyline points={lastYear} fill="none" stroke="#DCCFC0" strokeWidth="2" strokeDasharray="4 4" />
          <polyline points={thisYear} fill="none" stroke="#A3391C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="flex justify-between text-xs text-[#8B7E72] mt-2 min-w-[500px]">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}