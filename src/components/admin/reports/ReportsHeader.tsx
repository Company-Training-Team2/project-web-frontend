import {
  Search,
  Filter,
  Download,
  CalendarDays,
} from "lucide-react";

export default function ReportsHeader() {
  return (
    <div className="rounded-[16px] bg-[#F6ECE0] border border-[#DCCFC0] p-5">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-1 items-center gap-3">

          <div className="relative w-full max-w-sm">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7E72]"
            />

            <input
              placeholder="Search analytics..."
              className="w-full rounded-xl border border-[#DCCFC0] pl-10 pr-4 py-2 outline-none focus:border-[#A3391C]"
            />

          </div>

          <button className="flex items-center gap-2 rounded-xl border border-[#DCCFC0] px-4 py-2 hover:bg-[#EDE0D2]">

            <Filter size={17} />

            Filters

          </button>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700">

            <CalendarDays size={17} />

            Last 30 Days

          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#A3391C] px-4 py-2 text-white hover:bg-[#8a2f16]">

            <Download size={17} />

            Export

          </button>

        </div>

      </div>

      <div className="mt-6">

        <h1 className="font-serif text-3xl font-bold text-[#2B2622]">
          Reports & Intelligence
        </h1>

        <p className="mt-2 text-[#8B716A]">
          Deep dive into platform performance, trends and business insights.
        </p>

      </div>

    </div>
  );
}