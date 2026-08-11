"use client";

import { Category } from "@/services/categories.service";

export interface BasicInfoValue {
  title: string;
  categoryId: number | "";
  description: string;
  city: string;
  address: string;
}

export default function BasicInfoCard({
  value,
  onChange,
  categories,
  categoriesLoading,
}: {
  value: BasicInfoValue;
  onChange: (patch: Partial<BasicInfoValue>) => void;
  categories: Category[];
  categoriesLoading: boolean;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Service Name
          </label>
          <input
            value={value.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Signature Heritage Banquet"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Category
          </label>
          <select
            value={value.categoryId}
            onChange={(e) =>
              onChange({ categoryId: e.target.value ? Number(e.target.value) : "" })
            }
            disabled={categoriesLoading}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C] disabled:opacity-60"
          >
            <option value="">
              {categoriesLoading ? "Loading…" : "Select a category"}
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">City</label>
          <input
            value={value.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="e.g. Cairo"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Description
          </label>
          <textarea
            rows={4}
            value={value.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe what makes this service stand out…"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C] resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Address
          </label>
          <input
            value={value.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="e.g. Grosvenor Manor, District 12"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>
    </div>
  );
}
