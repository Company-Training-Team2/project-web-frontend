import { Filter, Download } from "lucide-react";

export default function UserManagementHeader() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#252525]">
          User Management
        </h1>
        <p className="text-gray-500 mt-2 max-w-md text-sm md:text-base">
          Manage your directory of premium event planners and executive
          vendors.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex items-center justify-center gap-2 bg-white border rounded-xl px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 text-sm whitespace-nowrap">
          <Filter size={16} />
          Filter Directory
        </button>

        <button className="flex items-center justify-center gap-2 bg-[#1B2421] text-white rounded-xl px-4 py-2.5 font-medium hover:opacity-90 text-sm whitespace-nowrap">
          <Download size={16} />
          Export CSV
        </button>
      </div>
    </div>
  );
}