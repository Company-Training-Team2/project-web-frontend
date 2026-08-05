import { Trash2 } from "lucide-react";
import { MockPayment } from "@/lib/mock/types";

export default function SavedCardRow({ method, onRemove }: { method: MockPayment; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] border border-[#e5ded2] bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-12 place-items-center rounded-[6px] border border-[#e5ded2] text-[11px] font-bold text-[#252323]">
          {method.cardBrand === "Mastercard" ? "MC" : "VISA"}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-bold text-[#252323]">
              {method.cardBrand} ending in {method.last4}
            </p>
            {method.isDefault ? (
              <span className="rounded-full bg-[#2E9E68]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[#1f7a4d]">
                Default
              </span>
            ) : null}
          </div>
          <p className="text-[12px] text-[#a79a90]">Expires {method.expiry}</p>
        </div>
      </div>

      {!method.isDefault ? (
        <button onClick={onRemove} aria-label="Remove card" className="text-[#a79a90] hover:text-[#af3718]">
          <Trash2 className="size-4" />
        </button>
      ) : (
        <button aria-label="More options" className="text-[#a79a90]">
          ⋮
        </button>
      )}
    </div>
  );
}
