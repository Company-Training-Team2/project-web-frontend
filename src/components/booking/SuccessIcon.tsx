import { Check } from "lucide-react";

export default function SuccessIcon() {
  return (
    <div className="mx-auto grid size-28 place-items-center rounded-full bg-white shadow-[0_0_0_10px_rgba(255,255,255,0.5)]">
      <div className="grid size-20 place-items-center rounded-full bg-[#2E9E68]">
        <Check className="size-9 text-white" strokeWidth={3} />
      </div>
    </div>
  );
}
