"use client";

import { Plus, X } from "lucide-react";
import { ServicePackage } from "@/services/vendorPortal.service";

export interface PackageDraft {
  name: string;
  price: string;
  includes: string;
}

const emptyPackage: PackageDraft = { name: "", price: "", includes: "" };

export default function PricingLogisticsCard({
  mode,
  price,
  onPriceChange,
  packages,
  onPackagesChange,
  existingPackages,
  minGuests,
  onMinGuestsChange,
  maxGuests,
  onMaxGuestsChange,
}: {
  mode: "create" | "edit";
  price: string;
  onPriceChange: (value: string) => void;
  packages: PackageDraft[];
  onPackagesChange: (packages: PackageDraft[]) => void;
  existingPackages?: ServicePackage[];
  minGuests: string;
  onMinGuestsChange: (value: string) => void;
  maxGuests: string;
  onMaxGuestsChange: (value: string) => void;
}) {
  const updatePackage = (index: number, patch: Partial<PackageDraft>) => {
    onPackagesChange(packages.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  };

  const removePackage = (index: number) => {
    onPackagesChange(packages.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-semibold text-[#2B2622] mb-4">
        Pricing &amp; Logistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Base Price (EGP)
          </label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        {/* Min/Max Guests — not part of CreateWorkPostDto/UpdateWorkPostDto
            yet, kept as local-only UI state (not sent to the backend). */}
        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Min Guests
          </label>
          <input
            type="number"
            min={0}
            value={minGuests}
            onChange={(e) => onMinGuestsChange(e.target.value)}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Max Guests
          </label>
          <input
            type="number"
            min={0}
            value={maxGuests}
            onChange={(e) => onMaxGuestsChange(e.target.value)}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-[#8B7E72]">Guest Packaging</label>
          {mode === "create" && (
            <button
              type="button"
              onClick={() => onPackagesChange([...packages, { ...emptyPackage }])}
              className="flex items-center gap-1 text-xs font-medium text-[#A3391C]"
            >
              <Plus size={12} />
              Add Tier
            </button>
          )}
        </div>

        {mode === "edit" ? (
          <>
            <p className="text-[11px] text-[#8B7E72] mb-2">
              Package tiers can only be set when a service is first created —
              there&apos;s no backend endpoint yet to edit them afterward.
            </p>
            {existingPackages && existingPackages.length > 0 ? (
              <div className="flex flex-col gap-2">
                {existingPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{pkg.name}</span>
                      <span className="text-[#8B716A]">
                        EGP {pkg.price.toLocaleString()}
                      </span>
                    </div>
                    {pkg.includes && (
                      <p className="text-xs text-[#8B7E72] mt-1">{pkg.includes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8B7E72]">No package tiers set.</p>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2">
            {packages.length === 0 && (
              <p className="text-xs text-[#8B7E72]">
                Optional — add pricing tiers guests can choose from.
              </p>
            )}
            {packages.map((pkg, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#DCCFC0] bg-white p-2 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    value={pkg.name}
                    onChange={(e) => updatePackage(i, { name: e.target.value })}
                    placeholder="Tier name (e.g. Silver Package)"
                    className="flex-1 min-w-0 rounded-md border border-[#DCCFC0] px-2 py-1.5 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
                  />
                  <input
                    type="number"
                    min={0}
                    value={pkg.price}
                    onChange={(e) => updatePackage(i, { price: e.target.value })}
                    placeholder="Price"
                    className="w-24 shrink-0 rounded-md border border-[#DCCFC0] px-2 py-1.5 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
                  />
                  <button
                    type="button"
                    onClick={() => removePackage(i)}
                    className="shrink-0 text-[#8B716A] hover:text-[#A3391C]"
                  >
                    <X size={16} />
                  </button>
                </div>
                <input
                  value={pkg.includes}
                  onChange={(e) => updatePackage(i, { includes: e.target.value })}
                  placeholder="What's included (e.g. Catering, décor, DJ)"
                  className="w-full rounded-md border border-[#DCCFC0] px-2 py-1.5 text-xs text-[#2B2622] outline-none focus:border-[#A3391C]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
