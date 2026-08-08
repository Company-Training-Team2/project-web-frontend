"use client";

import { useState } from "react";
import { Search, ChevronDown, LayoutGrid, List } from "lucide-react";

export default function ServiceFilters() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mt-6">
      <div className="flex items-center gap-2 text-[#8B716A] border border-[#DCCFC0] bg-[#F6ECE0] rounded-lg px-3 py-2 flex-1 max-w-xs">
        <Search size={15} />
        <input
          placeholder="Filter by name..."
          className="outline-none text-sm w-full bg-transparent text-[#2B2622] placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="flex items-center gap-1 text-sm border border-[#DCCFC0] bg-[#F6ECE0] rounded-lg px-3 py-2 text-[#2B2622] hover:bg-[#EDE0D2]">
          All Categories
          <ChevronDown size={14} />
        </button>

        <button className="flex items-center gap-1 text-sm border border-[#DCCFC0] bg-[#F6ECE0] rounded-lg px-3 py-2 text-[#2B2622] hover:bg-[#EDE0D2]">
          All Statuses
          <ChevronDown size={14} />
        </button>

        <button className="flex items-center gap-1 text-sm border border-[#DCCFC0] bg-[#F6ECE0] rounded-lg px-3 py-2 text-[#2B2622] hover:bg-[#EDE0D2]">
          Sort by: Recently Updated
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-center gap-1 border border-[#DCCFC0] rounded-lg p-1 md:ml-auto w-fit">
        <button
          onClick={() => setView("grid")}
          className={`p-1.5 rounded-md ${
            view === "grid" ? "bg-[#A3391C] text-white" : "text-[#8B716A]"
          }`}
        >
          <LayoutGrid size={15} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-1.5 rounded-md ${
            view === "list" ? "bg-[#A3391C] text-white" : "text-[#8B716A]"
          }`}
        >
          <List size={15} />
        </button>
      </div>
    </div>
  );
}