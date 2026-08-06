import { Filter, Download } from "lucide-react";

export default function UserManagementHeader() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#A3391C]">
          User Management
        </h1>
        <p className="text-[#8B7E72] mt-2 max-w-md text-sm md:text-base">
          Manage your directory of premium event planners and executive
          vendors.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex items-center justify-center gap-2 border border-[#DCCFC0] bg-[#F6ECE0] rounded-xl px-4 py-2.5 font-medium text-[#2B2622] hover:bg-[#EDE0D2] text-sm whitespace-nowrap">
          <Filter size={16} />
          Filter Directory
        </button>

        <button className="flex items-center justify-center gap-2 bg-[#A3391C] text-white rounded-xl px-4 py-2.5 font-medium hover:opacity-90 text-sm whitespace-nowrap">
          <Download size={16} />
          Export CSV
        </button>
      </div>
    </div>
  );
}