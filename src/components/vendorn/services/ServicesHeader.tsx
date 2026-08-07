import { Plus } from "lucide-react";

export default function ServicesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#A3391C]">
          Service Collection
        </h1>
        <p className="text-[#8B7E72] mt-2 max-w-md text-sm md:text-base">
          Manage your premium offerings and heritage experiences.
        </p>
      </div>

      <button className="flex items-center justify-center gap-2 bg-[#A3391C] text-white rounded-xl px-4 py-2.5 font-medium hover:opacity-90 text-sm whitespace-nowrap shrink-0">
        <Plus size={16} />
        Add New Service
      </button>
    </div>
  );
}