"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { UpdateVendorProfilePayload, VendorProfile } from "@/services/vendorPortal.service";

export default function ProfileEditForm({
  profile,
  onCancel,
  onSave,
  saving,
  error,
}: {
  profile: VendorProfile;
  onCancel: () => void;
  onSave: (payload: UpdateVendorProfilePayload) => void;
  saving: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<UpdateVendorProfilePayload>({
    businessName: profile.businessName,
    bioDescription: profile.bioDescription,
    phoneNumber: profile.phoneNumber ?? "",
    city: profile.city ?? "",
    logoUrl: profile.logoUrl ?? "",
    bankName: profile.bankName ?? "",
    accountName: profile.accountName ?? "",
    accountNumber: profile.accountNumber ?? "",
  });

  const set = (patch: Partial<UpdateVendorProfilePayload>) => setForm((prev) => ({ ...prev, ...patch }));

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622] mb-4">Edit Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">Business Name</label>
          <input
            value={form.businessName}
            onChange={(e) => set({ businessName: e.target.value })}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">Bio / Description</label>
          <textarea
            rows={4}
            value={form.bioDescription}
            onChange={(e) => set({ bioDescription: e.target.value })}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C] resize-none"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">Phone Number</label>
          <input
            value={form.phoneNumber}
            onChange={(e) => set({ phoneNumber: e.target.value })}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">City</label>
          <input
            value={form.city}
            onChange={(e) => set({ city: e.target.value })}
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">Logo URL</label>
          <input
            value={form.logoUrl}
            onChange={(e) => set({ logoUrl: e.target.value })}
            placeholder="https://…"
            className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
          />
        </div>
      </div>

      <div className="mt-6 border-t border-[#DCCFC0] pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8B7E72] mb-3">
          Payout Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-[#8B7E72] mb-1 block">Bank Name</label>
            <input
              value={form.bankName}
              onChange={(e) => set({ bankName: e.target.value })}
              className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
            />
          </div>
          <div>
            <label className="text-xs text-[#8B7E72] mb-1 block">Account Name</label>
            <input
              value={form.accountName}
              onChange={(e) => set({ accountName: e.target.value })}
              className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
            />
          </div>
          <div>
            <label className="text-xs text-[#8B7E72] mb-1 block">Account Number</label>
            <input
              value={form.accountNumber}
              onChange={(e) => set({ accountNumber: e.target.value })}
              className="w-full rounded-lg border border-[#DCCFC0] bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C]"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-[#A3391C] mt-4">{error}</p>}

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-[#A3391C] text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          Save Changes
        </button>
        <button
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-[#DCCFC0] px-4 py-2 text-sm font-medium text-[#2B2622] hover:bg-[#EDE0D2] disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
