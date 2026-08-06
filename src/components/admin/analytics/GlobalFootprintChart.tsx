const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const primary = "0,110 40,100 80,95 120,60 160,40 200,55 240,80 280,20 320,10 360,30 400,50 440,20";
const secondary = "0,130 40,125 80,120 160,110 200,105 240,112 280,100 320,108 360,102 400,98 440,100";

export default function GlobalFootprintChart() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6 mt-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold text-xl text-[#2B2622]">Global Footprint</h2>
          <p className="text-sm text-[#8B716A] mt-1">
            Geographical booking density &amp; market penetration
          </p>
        </div>

        <button className="text-sm font-medium text-[#A3391C] hover:underline self-start md:self-auto">
          View Regional Breakdown
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox="0 0 440 150" className="w-full min-w-[500px] h-56" preserveAspectRatio="none">
          <polyline points={secondary} fill="none" stroke="#DCCFC0" strokeWidth="2" strokeDasharray="4 4" />
          <polyline points={primary} fill="none" stroke="#A3391C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="200" cy="55" r="4" fill="#3F5B4E" />
          <circle cx="240" cy="80" r="4" fill="#A3391C" />
        </svg>

        <div className="flex justify-between text-xs text-[#8B7E72] mt-2 min-w-[500px]">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 rounded-xl border border-[#DCCFC0] bg-white/50 px-4 py-2 text-xs text-[#8B716A] w-fit">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#A3391C]" /> High
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3F5B4E]" /> Medium
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DCCFC0]" /> Moderate
        </span>
      </div>
    </div>
  );
}