"use client";

import { LayoutGrid, List, Search } from "lucide-react";

export interface ServiceFiltersState {
  search: string;
  category: string | null;
  status: string | null;
  view: "grid" | "list";
}

export default function ServiceFilters({
  categories,
  filters,
  onChange,
}: {
  categories: string[];
  filters: ServiceFiltersState;
  onChange: (next: ServiceFiltersState) => void;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
      <div className="flex max-w-xs flex-1 items-center gap-2 rounded-lg border border-[#DCCFC0] bg-[#F6ECE0] px-3 py-2 text-[#8B716A]">
        <Search size={15} />
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Filter by name..."
          className="w-full bg-transparent text-sm text-[#2B2622] outline-none placeholder:text-[#8B716A]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.category ?? ""}
          onChange={(e) => onChange({ ...filters, category: e.target.value || null })}
          className="rounded-lg border border-[#DCCFC0] bg-[#F6ECE0] px-3 py-2 text-sm text-[#2B2622] hover:bg-[#EDE0D2]"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={filters.status ?? ""}
          onChange={(e) => onChange({ ...filters, status: e.target.value || null })}
          className="rounded-lg border border-[#DCCFC0] bg-[#F6ECE0] px-3 py-2 text-sm text-[#2B2622] hover:bg-[#EDE0D2]"
        >
          <option value="">All Statuses</option>
          <option value="Approved">Active</option>
          <option value="Pending">Pending Review</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex w-fit items-center gap-1 rounded-lg border border-[#DCCFC0] p-1 md:ml-auto">
        <button
          onClick={() => onChange({ ...filters, view: "grid" })}
          aria-label="Grid view"
          className={`rounded-md p-1.5 ${filters.view === "grid" ? "bg-[#A3391C] text-white" : "text-[#8B716A]"}`}
        >
          <LayoutGrid size={15} />
        </button>
        <button
          onClick={() => onChange({ ...filters, view: "list" })}
          aria-label="List view"
          className={`rounded-md p-1.5 ${filters.view === "list" ? "bg-[#A3391C] text-white" : "text-[#8B716A]"}`}
        >
          <List size={15} />
        </button>
      </div>
    </div>
  );
}
