"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import AuthCard from "./AuthCard";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import UploadField from "./UploadField";
import GalleryUploadField from "./GalleryUploadField";
import CategoryChipSelect from "./CategoryChipSelect";
import PlanTierCard, { VENDOR_PLAN_TIERS } from "./PlanTierCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authService, getAuthErrorMessage } from "@/services/auth.service";
import { categoriesService, Category } from "@/services/categories.service";

const STEP_LABELS = ["Account Information", "Profile Setup", "Verification & Finish"];

// REG-VEN-036: "Maximum Capacity (Guests)" stayed on screen no matter which
// category was selected — the QA report's example was Makeup Artist, where
// a guest-capacity number doesn't apply at all. Scoped to just this one
// field (the only one an actual test case named) rather than guessing a
// full category→field matrix with nothing specifying the rest of it. Shown
// whenever any of the vendor's selected categories is capacity-relevant.
//
// Keyword substring match, not an exact-name Set: the live category names
// (GET /api/categories against the real deployed DB) turned out to be
// Arabic strings ("قاعات وأندية أفراح", "بوفيه وكب كيك وكاترينج", ...) that
// don't match the English seed data ("Venue", "Catering", ...) in this
// repo's migrations at all — that seed data has clearly been edited
// directly on the live database since. Matching on "venue/hall/قاعة" and
// "catering/buffet/كاترينج/بوفيه" as substrings is resilient to that kind
// of wording drift in a way an exact-name Set isn't.
const CAPACITY_RELEVANT_KEYWORDS = [
  "venue", "hall", "قاعة", "قاعات",
  "catering", "buffet", "كاترينج", "بوفيه",
  "planning", "تنظيم",
];
const isCapacityRelevantCategory = (name: string) => {
  const lower = name.toLowerCase();
  return CAPACITY_RELEVANT_KEYWORDS.some((kw) => lower.includes(kw));
};

// businessName/ownerName/email/phone/password/confirmPassword map to real
// RegisterRequest.cs fields (Email, Password, ConfirmPassword, Role,
// FullName, PhoneNumber, BusinessName), and `categories` maps to
// RegisterRequest.CategoryIds (sent in onSubmit below). country/city are
// still collected for the UI flow but NOT part of RegisterRequest.cs yet.
// All of it stays local state below rather than in this validated schema.
const schema = z
  .object({
    businessName: z.string().min(2, "Business name is required"),
    ownerName: z.string().min(2, "Owner name is required"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .max(20, "Phone number must be 20 characters or fewer")
      .regex(/^[+\d\s\-()]+$/, "Invalid phone number"),
    password: z
      .string()
      .min(8, "Min. 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

/** 3-step Vendor Registration wizard, matching the Figma Desktop frames
 * ("Begin Your Heritage Journey" / "Showcase Your Business" / "Verification
 * & Finish"). Only the fields RegisterRequest.cs actually accepts are sent
 * to the real API on final submit — everything else here is collected for
 * the UI flow and kept in local component state, each marked with a
 * "Not part of RegisterRequest.cs yet" comment. The 5 file uploads (logo,
 * cover image, commercial registration, national ID, business license) ARE
 * sent for real as part of the multipart request — see authService.register
 * and RegisterRequest.cs's "Vendor uploads" section. The image gallery field
 * is the one exception, still visual-only (see its own comment below). */
export default function VendorRegisterWizard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // REG-VEN-032: step lived only in local state, with the URL staying at a
  // bare /register?role=vendor throughout — so there was no browser-history
  // entry per step for the Back button to land on. One press of Back from
  // step 2 or 3 fell straight past the whole wizard to whatever was in
  // history before it (role-selection), restarting the flow. Mirroring step
  // into a ?step= param and pushing a history entry on every transition
  // makes Back step back through 3→2→1 like any other multi-step flow, and
  // this effect keeps local `step` in sync when the *browser's* Back/Forward
  // is what changes the URL (rather than goNext/goBack below).
  const stepFromUrl = (() => {
    const s = Number(searchParams.get("step"));
    return s === 2 || s === 3 ? (s as 2 | 3) : 1;
  })();
  const [step, setStep] = useState<1 | 2 | 3>(stepFromUrl);
  useEffect(() => {
    setStep(stepFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepFromUrl]);

  const goToStep = (next: 1 | 2 | 3) => {
    setStep(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", String(next));
    router.push(`${pathname}?${params.toString()}`);
  };

  const [isLoading, setIsLoading] = useState(false);
  // REG-CUS-013: one key per mount, reused across every submit of this
  // wizard — see RegisterPayload.idempotencyKey.
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  // Step 1 extras — not part of RegisterRequest.cs yet.
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [commercialRegistrationFile, setCommercialRegistrationFile] = useState<File | null>(null);
  const [businessLogoFile, setBusinessLogoFile] = useState<File | null>(null);

  // Step 2 — not part of RegisterRequest.cs yet.
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [experienceYears, setExperienceYears] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [address, setAddress] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  // REG-VEN-036: fetched here (not just inside CategoryChipSelect) because
  // deciding whether to show Maximum Capacity needs each selected id's
  // *name*, not just the id CategoryChipSelect already tracks.
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  useEffect(() => {
    categoriesService.getAll().then(setAllCategories).catch(() => setAllCategories([]));
  }, []);

  const showCapacityField = categories.some((id) => {
    const category = allCategories.find((c) => String(c.id) === id);
    return category ? isCapacityRelevantCategory(category.name) : false;
  });
  useEffect(() => {
    if (!showCapacityField && maxCapacity) setMaxCapacity("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCapacityField]);

  // Step 3.
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [businessLicenseFile, setBusinessLicenseFile] = useState<File | null>(null);
  const [bankHolder, setBankHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  // Not part of RegisterRequest.cs yet — no PlanTier concept exists on
  // VendorProfile/anywhere in the backend, so this stays local-only.
  const [planTier, setPlanTier] = useState("professional");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeVendorAgreement, setAgreeVendorAgreement] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const goNext = async () => {
    if (step === 1) {
      const valid = await trigger(["businessName", "ownerName", "email", "phone", "password", "confirmPassword"]);
      if (!valid) return;
    }
    goToStep(step === 3 ? 3 : ((step + 1) as 1 | 2 | 3));
  };

  const goBack = () => goToStep(step === 1 ? 1 : ((step - 1) as 1 | 2 | 3));

  const onSubmit = handleSubmit(async (data) => {
    if (!agreeTerms || !agreeVendorAgreement) {
      toast.error("Please accept the required agreements to continue.");
      return;
    }
    setIsLoading(true);
    try {
      await authService.register({
        name: data.ownerName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "vendor",
        businessName: data.businessName,
        bioDescription: description || undefined,
        categoryIds: categories.length > 0 ? categories.map(Number) : undefined,
        businessLogo: businessLogoFile ?? undefined,
        coverImage: coverImageFile ?? undefined,
        galleryImages: galleryFiles.length > 0 ? galleryFiles : undefined,
        commercialRegistration: commercialRegistrationFile ?? undefined,
        nationalId: nationalIdFile ?? undefined,
        businessLicense: businessLicenseFile ?? undefined,
        bankName: bankName || undefined,
        accountName: bankHolder || undefined,
        accountNumber: iban || undefined,
        idempotencyKey,
      });
      toast.success("Vendor account details saved. Verify your email next.");
      router.push(`/otp?email=${encodeURIComponent(data.email)}&purpose=register`);
    } catch (error: unknown) {
      toast.error(getAuthErrorMessage(error, "Registration failed. Try again."));
    } finally {
      setIsLoading(false);
    }
  });

  const values = watch();

  return (
    <div className="px-[19px] pt-[28px] pb-[32px] lg:px-[56px] lg:pt-[40px]">
      <div className="mx-auto max-w-[720px]">
        <h1 className="font-serif text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] lg:text-[32px]">
          Vendor Registration
        </h1>

        {/* Step indicator */}
        <div className="mt-5 flex items-center gap-3">
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isDone = stepNum < step;
            return (
              <div key={label} className="flex flex-1 flex-col gap-1.5">
                <div
                  className={`h-1 rounded-full ${isActive || isDone ? "bg-[#af3718]" : "bg-[#e5ded2]"}`}
                />
                <p
                  className={`hidden text-[11px] font-bold uppercase tracking-[0.06em] sm:block ${
                    isActive ? "text-[#af3718]" : "text-[#a79a90]"
                  }`}
                >
                  Step {stepNum}: {label}
                </p>
              </div>
            );
          })}
        </div>

        <AuthCard className="mt-[22px] rounded-[16px] bg-[#fffdfb] p-[20px] shadow-[0_2px_10px_rgba(47,35,24,0.06)] lg:p-[32px]">
          <form onSubmit={onSubmit}>
            {step === 1 ? (
              <div className="space-y-[18px]">
                <div className="space-y-[3px]">
                  <h2 className="font-serif text-[22px] font-bold leading-[1.2] text-[#b23a19]">
                    Begin Your Heritage Journey
                  </h2>
                  <p className="text-[14px] leading-[1.35] text-[#6d5d54]">
                    Join our curated collective of elite service providers.
                  </p>
                </div>

                <div className="grid gap-[18px] sm:grid-cols-2">
                  <FormField id="businessName" label="Business Name" error={errors.businessName?.message}>
                    <Input
                      id="businessName"
                      placeholder="e.g. Atelier Valois"
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      {...register("businessName")}
                    />
                  </FormField>

                  <FormField id="ownerName" label="Owner Name" error={errors.ownerName?.message}>
                    <Input
                      id="ownerName"
                      placeholder="Full legal name"
                      autoComplete="name"
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      {...register("ownerName")}
                    />
                  </FormField>

                  <FormField id="email" label="Business Email" error={errors.email?.message}>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@domain.com"
                      autoComplete="email"
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      {...register("email")}
                    />
                  </FormField>

                  <FormField id="phone" label="Phone Number" error={errors.phone?.message}>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      maxLength={20}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      {...register("phone")}
                    />
                  </FormField>

                  <FormField id="country" label="Country">
                    <Input
                      id="country"
                      placeholder="e.g. Egypt"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>

                  <FormField id="city" label="City">
                    <Input
                      id="city"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>

                  <FormField id="password" label="Password" error={errors.password?.message}>
                    <PasswordInput
                      id="password"
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      {...register("password")}
                    />
                  </FormField>

                  <FormField id="confirmPassword" label="Confirm Password" error={errors.confirmPassword?.message}>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      {...register("confirmPassword")}
                    />
                  </FormField>
                </div>

                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b23a19]">
                  Compliance & Visuals
                </p>
                <UploadField
                  id="commercialRegistration"
                  label="Commercial Registration"
                  hint="Upload PDF or JPG (Max 5MB)"
                  accept="application/pdf,image/jpeg"
                  value={commercialRegistrationFile}
                  onFileChange={setCommercialRegistrationFile}
                />
                <UploadField
                  id="businessLogo"
                  label="Business Logo"
                  hint="Upload High-Res Logo"
                  accept="image/*"
                  value={businessLogoFile}
                  onFileChange={setBusinessLogoFile}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-[18px]">
                <div className="space-y-[3px]">
                  <h2 className="font-serif text-[22px] font-bold leading-[1.2] text-[#b23a19]">
                    Showcase Your Business
                  </h2>
                  <p className="text-[14px] leading-[1.35] text-[#6d5d54]">
                    Help clients discover your unique services by completing your detailed business profile.
                  </p>
                </div>

                <FormField id="description" label="Business Description">
                  <Textarea
                    id="description"
                    placeholder="Tell clients about your unique approach, aesthetic, and what makes your service exceptional..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="rounded-[10px] border border-[#ded8d2] bg-white px-[14px] py-[10px] text-[15px]"
                  />
                </FormField>

                <FormField id="categories" label="Which services do you offer? (choose up to 3)">
                  <CategoryChipSelect selected={categories} onChange={setCategories} />
                </FormField>

                <div className="grid gap-[18px] sm:grid-cols-2">
                  <FormField id="experience" label="Years of Experience">
                    <Input
                      id="experience"
                      type="number"
                      placeholder="e.g. 5"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                  <FormField id="teamSize" label="Team Size">
                    <Input
                      id="teamSize"
                      placeholder="Select size"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                  <FormField id="startingPrice" label="Starting Price (EGP)">
                    <Input
                      id="startingPrice"
                      type="number"
                      placeholder="25,000"
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                  {showCapacityField ? (
                    <FormField id="maxCapacity" label="Maximum Capacity (Guests)">
                      <Input
                        id="maxCapacity"
                        type="number"
                        placeholder="e.g. 300"
                        value={maxCapacity}
                        onChange={(e) => setMaxCapacity(e.target.value)}
                        className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                      />
                    </FormField>
                  ) : null}
                </div>

                <FormField id="address" label="Business Address">
                  <Input
                    id="address"
                    placeholder="Search address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                  />
                </FormField>
                <div className="flex h-[100px] items-center justify-center rounded-[10px] border border-dashed border-[#ded8d2] bg-[#f8f6f2] text-[13px] text-[#a79a90]">
                  Map picker — coming soon
                </div>

                <div className="grid gap-[18px] sm:grid-cols-2">
                  <FormField id="websiteUrl" label="Website URL">
                    <Input
                      id="websiteUrl"
                      placeholder="https://"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                  <FormField id="instagramUrl" label="Instagram Profile URL">
                    <Input
                      id="instagramUrl"
                      placeholder="https://instagram.com/"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                </div>

                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b23a19]">
                  Portfolio Uploads
                </p>
                <UploadField
                  id="coverImage"
                  label="Cover Image"
                  hint="Click to upload or drag and drop (PNG, JPG up to 10MB)"
                  accept="image/*"
                  value={coverImageFile}
                  onFileChange={setCoverImageFile}
                />
                {/* REG-VEN-034/035/037: now backed for real by
                    VendorPortfolioImage (see AuthService.RegisterAsync's
                    GalleryImages handling) — was visual-only with no table
                    to save into and a single-file input mislabeled "up to
                    10". */}
                <GalleryUploadField
                  id="gallery"
                  label="Image Gallery"
                  hint="Add photo"
                  files={galleryFiles}
                  onFilesChange={setGalleryFiles}
                  max={10}
                />
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-[18px]">
                <div className="space-y-[3px]">
                  <h2 className="font-serif text-[22px] font-bold leading-[1.2] text-[#b23a19]">
                    Verification & Finish
                  </h2>
                  <p className="text-[14px] leading-[1.35] text-[#6d5d54]">
                    Complete your registration to start receiving bookings.
                  </p>
                </div>

                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b23a19]">
                  1. Business Verification
                </p>
                <div className="grid gap-[14px] sm:grid-cols-2">
                  <UploadField
                    id="nationalId"
                    label="National ID or Passport"
                    hint="JPEG, PNG or PDF (Max 5MB)"
                    accept="application/pdf,image/*"
                    value={nationalIdFile}
                    onFileChange={setNationalIdFile}
                  />
                  <UploadField
                    id="businessLicense"
                    label="Business License"
                    hint="JPEG, PNG or PDF (Max 5MB)"
                    accept="application/pdf,image/*"
                    value={businessLicenseFile}
                    onFileChange={setBusinessLicenseFile}
                  />
                </div>

                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b23a19]">
                  2. Bank Information
                </p>
                <FormField id="bankHolder" label="Account Holder Name">
                  <Input
                    id="bankHolder"
                    placeholder="As it appears on your bank statement"
                    value={bankHolder}
                    onChange={(e) => setBankHolder(e.target.value)}
                    className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                  />
                </FormField>
                <div className="grid gap-[14px] sm:grid-cols-2">
                  <FormField id="bankName" label="Bank Name">
                    <Input
                      id="bankName"
                      placeholder="e.g. Commercial International Bank"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                  <FormField id="iban" label="IBAN">
                    <Input
                      id="iban"
                      placeholder="EG00 0000 0000 0000 0000 0000"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                      className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
                    />
                  </FormField>
                </div>

                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#b23a19]">
                  3. Subscription Plan
                </p>
                <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
                  {VENDOR_PLAN_TIERS.map((tier) => (
                    <PlanTierCard
                      key={tier.id}
                      tier={tier}
                      selected={planTier === tier.id}
                      onSelect={() => setPlanTier(tier.id)}
                    />
                  ))}
                </div>

                <div className="rounded-[12px] border border-[#e5ded2] bg-[#faf6f0] p-4">
                  <h4 className="font-serif text-[16px] font-bold text-[#252323]">Registration Dossier Summary</h4>
                  <dl className="mt-2 space-y-1 text-[13px]">
                    <div className="flex justify-between"><dt className="text-[#6d5d54]">Business Name:</dt><dd className="font-bold text-[#252323]">{values.businessName || "—"}</dd></div>
                    <div className="flex justify-between"><dt className="text-[#6d5d54]">Location:</dt><dd className="font-bold text-[#252323]">{[city, country].filter(Boolean).join(", ") || "—"}</dd></div>
                    <div className="flex justify-between"><dt className="text-[#6d5d54]">Selected Plan:</dt><dd className="font-bold text-[#af3718]">{VENDOR_PLAN_TIERS.find((t) => t.id === planTier)?.name}</dd></div>
                  </dl>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-2 text-[13px] text-[#6d5d54]">
                    <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 size-4 accent-[#af3718]" />
                    {/* REG-VEN-025: "Privacy Policy" was plain text here, not a
                        link at all — nothing happened when clicked.
                        REG-VEN-026: Terms & Conditions *was* a same-tab Link,
                        which navigated the whole wizard away — since none of
                        its step/field/file state is persisted anywhere
                        (sessionStorage, URL, etc.), that unmounted the wizard
                        and lost everything entered so far. Both open in a new
                        tab now instead, so the registration tab itself never
                        navigates and nothing is lost. */}
                    I agree to EventHub&apos;s{" "}
                    <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-[#af3718]">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-[#af3718]">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                  <label className="flex items-start gap-2 text-[13px] text-[#6d5d54]">
                    <input type="checkbox" checked={agreeVendorAgreement} onChange={(e) => setAgreeVendorAgreement(e.target.checked)} className="mt-0.5 size-4 accent-[#af3718]" />
                    I confirm that I have read and accept the Vendor Agreement and acknowledge that my documents are valid and true.
                  </label>
                </div>
              </div>
            ) : null}

            <div className="mt-[26px] flex items-center justify-between gap-3">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={goBack} className="h-[48px] rounded-[8px] border-[#ded8d2] px-6">
                  ← Previous
                </Button>
              ) : (
                <span />
              )}

              {step < 3 ? (
                <Button type="button" onClick={goNext} className="h-[48px] rounded-[8px] bg-[#af3718] px-8 text-white hover:bg-[#9f3216]">
                  Continue →
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} className="h-[52px] rounded-[8px] bg-[#af3718] px-8 text-white hover:bg-[#9f3216]">
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating vendor account
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              )}
            </div>
          </form>
        </AuthCard>

        <p className="mt-[18px] pb-[8px] text-center text-[14px] text-[#6d5d54]">
          Already have a vendor account?{" "}
          <Link href="/login" className="font-medium text-[#b23a19] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
