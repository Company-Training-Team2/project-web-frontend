"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  UpdateVendorProfilePayload,
  VendorProfile,
  vendorPortalService,
  getVendorPortalErrorMessage,
} from "@/services/vendorPortal.service";

// Max lengths mirror UpdateVendorProfileDto.cs's [MaxLength] attributes
// (which mirror VendorProfileConfiguration.cs's column caps) — validated
// here too so a too-long value is caught before submit instead of coming
// back as a raw 400 from the API.
const BUSINESS_NAME_MAX = 200;
const BIO_MAX = 2000;
const PHONE_MAX = 20;
const CITY_MAX = 100;
const BANK_NAME_MAX = 200;
const ACCOUNT_NAME_MAX = 200;
const ACCOUNT_NUMBER_MAX = 50;
const PHONE_REGEX = /^[+\d\s\-()]{7,}$/;

export default function ProfileEditForm({
  profile,
  onCancel,
  onSave,
  onLogoUploaded,
  saving,
  error,
}: {
  profile: VendorProfile;
  onCancel: () => void;
  onSave: (payload: UpdateVendorProfilePayload) => void;
  onLogoUploaded: (updated: VendorProfile) => void;
  saving: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<UpdateVendorProfilePayload>({
    businessName: profile.businessName,
    bioDescription: profile.bioDescription,
    phoneNumber: profile.phoneNumber ?? "",
    city: profile.city ?? "",
    bankName: profile.bankName ?? "",
    accountName: profile.accountName ?? "",
    accountNumber: profile.accountNumber ?? "",
  });
  const [logoUrl, setLogoUrl] = useState(profile.logoUrl);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Errors only surface after a first failed submit attempt — same pattern
  // as ServiceFormScreen's showErrors, not shown on initial render.
  const [showErrors, setShowErrors] = useState(false);

  const set = (patch: Partial<UpdateVendorProfilePayload>) => setForm((prev) => ({ ...prev, ...patch }));

  const errors = {
    businessName:
      !form.businessName?.trim()
        ? "Business name is required."
        : form.businessName.length > BUSINESS_NAME_MAX
        ? `Must be ${BUSINESS_NAME_MAX} characters or fewer.`
        : null,
    bioDescription:
      (form.bioDescription?.length ?? 0) > BIO_MAX ? `Must be ${BIO_MAX} characters or fewer.` : null,
    phoneNumber:
      form.phoneNumber && !PHONE_REGEX.test(form.phoneNumber)
        ? "Enter a valid phone number."
        : form.phoneNumber && form.phoneNumber.length > PHONE_MAX
        ? `Must be ${PHONE_MAX} characters or fewer.`
        : null,
    city: (form.city?.length ?? 0) > CITY_MAX ? `Must be ${CITY_MAX} characters or fewer.` : null,
    bankName:
      (form.bankName?.length ?? 0) > BANK_NAME_MAX ? `Must be ${BANK_NAME_MAX} characters or fewer.` : null,
    accountName:
      (form.accountName?.length ?? 0) > ACCOUNT_NAME_MAX
        ? `Must be ${ACCOUNT_NAME_MAX} characters or fewer.`
        : null,
    accountNumber:
      (form.accountNumber?.length ?? 0) > ACCOUNT_NUMBER_MAX
        ? `Must be ${ACCOUNT_NUMBER_MAX} characters or fewer.`
        : null,
  };
  const isValid = Object.values(errors).every((e) => e === null);

  const handleSave = () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    onSave(form);
  };

  const handleLogoFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLogoError("Choose an image file.");
      return;
    }
    setLogoError(null);
    setUploadingLogo(true);
    try {
      const updated = await vendorPortalService.uploadLogo(file);
      setLogoUrl(updated.logoUrl);
      onLogoUploaded(updated);
      toast.success("Logo updated.");
    } catch (err) {
      setLogoError(getVendorPortalErrorMessage(err, "Couldn't upload that logo."));
    } finally {
      setUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#2B2622] outline-none focus:border-[#A3391C] ${
      hasError ? "border-[#A3391C]" : "border-[#DCCFC0]"
    }`;

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622] mb-4">Edit Profile</h2>

      {/* Logo — real image + upload, not a pasted URL. Was a free-text
          "Logo URL" input that accepted any string (including non-URL text)
          with zero validation and rendered it directly as an <img src>. */}
      <div className="flex items-center gap-4 mb-5">
        <div className="size-16 shrink-0 overflow-hidden rounded-full border border-[#DCCFC0] bg-white">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Business logo" className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-[#8B7E72]">
              <Camera size={20} />
            </div>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingLogo}
            className="flex items-center gap-2 rounded-lg border border-[#DCCFC0] bg-white px-3 py-1.5 text-xs font-medium text-[#2B2622] hover:bg-[#EDE0D2] disabled:opacity-60"
          >
            {uploadingLogo ? <Loader2 size={13} className="animate-spin" /> : <Camera size={13} />}
            {uploadingLogo ? "Uploading…" : "Change Logo"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleLogoFile(e.target.files?.[0])}
          />
          {logoError && <p className="mt-1 text-xs text-[#A3391C]">{logoError}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">
            Business Name <span className="text-[#A3391C]">*</span>
          </label>
          <input
            value={form.businessName}
            onChange={(e) => set({ businessName: e.target.value })}
            maxLength={BUSINESS_NAME_MAX}
            className={fieldClass(showErrors && !!errors.businessName)}
          />
          {showErrors && errors.businessName && (
            <p className="mt-1 text-xs text-[#A3391C]">{errors.businessName}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs text-[#8B7E72] mb-1 block">Bio / Description</label>
          <textarea
            rows={4}
            value={form.bioDescription}
            onChange={(e) => set({ bioDescription: e.target.value })}
            maxLength={BIO_MAX}
            className={`${fieldClass(showErrors && !!errors.bioDescription)} resize-none`}
          />
          {showErrors && errors.bioDescription && (
            <p className="mt-1 text-xs text-[#A3391C]">{errors.bioDescription}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">Phone Number</label>
          <input
            value={form.phoneNumber}
            onChange={(e) => set({ phoneNumber: e.target.value })}
            maxLength={PHONE_MAX}
            className={fieldClass(showErrors && !!errors.phoneNumber)}
          />
          {showErrors && errors.phoneNumber && (
            <p className="mt-1 text-xs text-[#A3391C]">{errors.phoneNumber}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-[#8B7E72] mb-1 block">City</label>
          <input
            value={form.city}
            onChange={(e) => set({ city: e.target.value })}
            maxLength={CITY_MAX}
            className={fieldClass(showErrors && !!errors.city)}
          />
          {showErrors && errors.city && <p className="mt-1 text-xs text-[#A3391C]">{errors.city}</p>}
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
              maxLength={BANK_NAME_MAX}
              className={fieldClass(showErrors && !!errors.bankName)}
            />
            {showErrors && errors.bankName && (
              <p className="mt-1 text-xs text-[#A3391C]">{errors.bankName}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-[#8B7E72] mb-1 block">Account Name</label>
            <input
              value={form.accountName}
              onChange={(e) => set({ accountName: e.target.value })}
              maxLength={ACCOUNT_NAME_MAX}
              className={fieldClass(showErrors && !!errors.accountName)}
            />
            {showErrors && errors.accountName && (
              <p className="mt-1 text-xs text-[#A3391C]">{errors.accountName}</p>
            )}
          </div>
          <div>
            <label className="text-xs text-[#8B7E72] mb-1 block">Account Number</label>
            <input
              value={form.accountNumber}
              onChange={(e) => set({ accountNumber: e.target.value })}
              maxLength={ACCOUNT_NUMBER_MAX}
              className={fieldClass(showErrors && !!errors.accountNumber)}
            />
            {showErrors && errors.accountNumber && (
              <p className="mt-1 text-xs text-[#A3391C]">{errors.accountNumber}</p>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-[#A3391C] mt-4">{error}</p>}

      <div className="flex gap-2 mt-6">
        <button
          onClick={handleSave}
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
