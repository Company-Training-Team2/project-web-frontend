import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatBubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-[16px] rounded-tr-[4px] bg-[#af3718] px-4 py-3 text-[14px] leading-[1.5] text-white">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-[#af3718] text-white">
        <Sparkles className="size-3.5" />
      </span>
      <div
        className={cn(
          "max-w-[85%] rounded-[16px] rounded-tl-[4px] bg-white px-4 py-3 text-[14px] leading-[1.5] text-[#252323] shadow-[0_2px_10px_rgba(47,35,24,0.06)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
