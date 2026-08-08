import { Download, CalendarDays, FileSpreadsheet } from "lucide-react";

// Matches docs/figma/Admin/Reports.jpeg: title + subtitle on the left,
// "Last 30 Days" / "Export PDF" / "Excel" on the right. The search bar and
// account chrome now live in the shared AdminTopBar above this, so this
// component doesn't duplicate them.
export default function ReportsHeader() {
  return (
    <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2B2622]">
          Reports &amp; Intelligence
        </h1>
        <p className="mt-2 max-w-xl text-[#8B716A]">
          Deep dive into platform performance metrics, vendor growth
          trajectories, and commission distributions for the current fiscal
          period.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-xl border border-[#DCCFC0] bg-white/60 px-4 py-2 text-sm text-[#2B2622] hover:bg-[#EDE0D2]">
          <CalendarDays size={16} />
          Last 30 Days
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-[#2F4A3E] px-4 py-2 text-sm text-white hover:bg-[#26392f]">
          <Download size={16} />
          Export PDF
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-[#DCCFC0] bg-white/60 px-4 py-2 text-sm text-[#2B2622] hover:bg-[#EDE0D2]">
          <FileSpreadsheet size={16} />
          Excel
        </button>
      </div>
    </div>
  );
}