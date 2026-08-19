import { Loader2 } from "lucide-react";

export default function PreviewCard({
  title,
  price,
  imageUrl,
  mode,
  submitting,
  onSubmit,
  error,
  isFormInvalid,
}: {
  title: string;
  price: string;
  imageUrl?: string;
  mode: "create" | "edit";
  submitting: boolean;
  onSubmit: () => void;
  error?: string | null;
  // Only dims the button (never blocks the click) — a hard `disabled` would
  // stop onSubmit from ever firing, which is exactly what reveals the
  // field-level errors on the first attempt. Communicates "not ready yet"
  // without creating a dead button.
  isFormInvalid: boolean;
}) {
  const displayPrice = Number(price) > 0 ? `EGP ${Number(price).toLocaleString()}` : "EGP —";

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 overflow-hidden">
      <div className="h-32 rounded-xl bg-[#DCCFC0] mb-3 overflow-hidden">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- vendor-uploaded/staged image is an arbitrary URL
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <h3 className="font-semibold text-[#2B2622] text-sm truncate">
        {title || "Untitled service"}
      </h3>
      <p className="text-lg font-bold text-[#A3391C] mt-1">{displayPrice}</p>

      {error && <p className="text-xs text-[#A3391C] mt-3">{error}</p>}

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          aria-disabled={isFormInvalid}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-medium bg-[#A3391C] text-white rounded-lg py-2 hover:opacity-90 disabled:opacity-60 ${
            isFormInvalid ? "opacity-60" : ""
          }`}
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          {mode === "create" ? "Submit for Review" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
