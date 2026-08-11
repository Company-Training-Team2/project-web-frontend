import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AiConciergeFab() {
  return (
    <Link
      href="/ai-planner"
      title="Ask the AI Planner"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-[#A3391C] text-white flex items-center justify-center shadow-lg hover:opacity-90 z-30"
    >
      <Sparkles size={20} />
    </Link>
  );
}
