"use client";

import { Category } from "@/services/categories.service";

export interface BasicInfoValue {
  title: string;
  categoryId: number | "";
  description: string;
  city: string;
  address: string;
}

const TITLE_MAX = 150;
const DESCRIPTION_MAX = 2000;
const ADDRESS_MAX = 300;

function fieldClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C] ${
    hasError ? "border-[#A3391C]" : "border-[#DCCFC0]"
  }`;
}

export default function BasicInfoCard({
  value,
  onChange,
  categories,
  categoriesLoading,
  showErrors,
}: {
  value: BasicInfoValue;
  onChange: (patch: Partial<BasicInfoValue>) => void;
  categories: Category[];
  categoriesLoading: boolean;
  showErrors: boolean;
}) {
  const titleError = showErrors && !value.title.trim();
  const categoryError = showErrors && value.categoryId === "";
  const descriptionError = showErrors && !value.description.trim();
  const cityError = showErrors && !value.city.trim();
  const addressError = showErrors && !value.address.trim();

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Service Name <span className="text-[#A3391C]">*</span>
          </label>
          <input
            value={value.title}
            onChange={(e) => onChange({ title: e.target.value.slice(0, TITLE_MAX) })}
            maxLength={TITLE_MAX}
            placeholder="e.g. Signature Heritage Banquet"
            className={fieldClass(titleError)}
          />
          {titleError && <p className="mt-1 text-xs text-[#A3391C]">Service name is required.</p>}
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Category <span className="text-[#A3391C]">*</span>
          </label>
          <select
            value={value.categoryId}
            onChange={(e) =>
              onChange({ categoryId: e.target.value ? Number(e.target.value) : "" })
            }
            disabled={categoriesLoading}
            className={`${fieldClass(categoryError)} disabled:opacity-60`}
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
          {categoryError && <p className="mt-1 text-xs text-[#A3391C]">Pick a category.</p>}
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            City <span className="text-[#A3391C]">*</span>
          </label>
          <input
            value={value.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="e.g. Cairo"
            className={fieldClass(cityError)}
          />
          {cityError && <p className="mt-1 text-xs text-[#A3391C]">City is required.</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Description <span className="text-[#A3391C]">*</span>
          </label>
          <textarea
            rows={4}
            value={value.description}
            onChange={(e) => onChange({ description: e.target.value.slice(0, DESCRIPTION_MAX) })}
            maxLength={DESCRIPTION_MAX}
            placeholder="Describe what makes this service stand out…"
            className={`${fieldClass(descriptionError)} resize-none`}
          />
          <div className="mt-1 flex items-center justify-between">
            {descriptionError ? (
              <p className="text-xs text-[#A3391C]">Description is required.</p>
            ) : (
              <span />
            )}
            <span className="text-[10px] text-[#8B7E72]">
              {value.description.length}/{DESCRIPTION_MAX}
            </span>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Address <span className="text-[#A3391C]">*</span>
          </label>
          <input
            value={value.address}
            onChange={(e) => onChange({ address: e.target.value.slice(0, ADDRESS_MAX) })}
            maxLength={ADDRESS_MAX}
            placeholder="e.g. Grosvenor Manor, District 12"
            className={fieldClass(addressError)}
          />
          {addressError && <p className="mt-1 text-xs text-[#A3391C]">Address is required.</p>}
        </div>
      </div>
    </div>
  );
}
