import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function NeedHelpCard() {
  return (
    <div className="mx-4 md:mx-6 mt-8 rounded-[16px] bg-[#1B2421] text-white p-4 flex items-center justify-between gap-3">
      <div>
        <h3 className="font-semibold text-sm">Need Help?</h3>
        <p className="text-xs text-white/60 mt-0.5">Chat with the AI Planner.</p>
      </div>

      <Link
        href="/ai-planner"
        className="w-10 h-10 rounded-full bg-[#2B3632] flex items-center justify-center shrink-0 hover:bg-[#3a453f]"
      >
        <MessageCircle size={16} />
      </Link>
    </div>
  );
}
