import {
  Search,
  Filter,
  Download,
  CalendarDays,
} from "lucide-react";

export default function ReportsHeader() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-1 items-center gap-3">

          <div className="relative w-full max-w-sm">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Search analytics..."
              className="w-full rounded-xl border pl-10 pr-4 py-2 outline-none focus:border-orange-500"
            />

          </div>

          <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100">

            <Filter size={17} />

            Filters

          </button>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700">

            <CalendarDays size={17} />

            Last 30 Days

          </button>

          <button className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-white hover:bg-orange-700">

            <Download size={17} />

            Export

          </button>

        </div>

      </div>

      <div className="mt-6">

        <h1 className="text-3xl font-bold">
          Reports & Intelligence
        </h1>

        <p className="mt-2 text-gray-500">
          Deep dive into platform performance, trends and business insights.
        </p>

      </div>

    </div>
  );
}