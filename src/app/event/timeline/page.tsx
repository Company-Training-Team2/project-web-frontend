import ClientBottomNav from "@/components/layout/ClientBottomNav";
import TimelineTopBar from "@/components/client/timeline/TimelineTopBar";
import TimelineHeader from "@/components/client/timeline/TimelineHeader";
import TimelineStep, { Step } from "@/components/client/timeline/TimelineStep";
import NeedHelpCard from "@/components/client/timeline/NeedHelpCard";
import { Sparkles } from "lucide-react";

const steps: Step[] = [
  {
    id: "1",
    status: "completed",
    title: "Planning Started",
    description:
      "The vision was cast on October 12th. Theme: Midnight Garden.",
    badge: "COMPLETED",
    children: (
      <div className="rounded-xl border border-[#DCCFC0] bg-white p-3 mt-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-[#DCCFC0] shrink-0" />
        <div>
          <p className="text-sm font-medium text-[#2B2622]">
            Moodboard Created
          </p>
          <p className="text-xs text-[#8B716A]">42 items curated</p>
        </div>
      </div>
    ),
  },
  {
    id: "2",
    status: "completed",
    title: "Vendor Booked",
    description: "Secured the primary venue and catering team.",
    badge: "COMPLETED",
    children: (
      <div className="flex -space-x-2 mt-3">
        <div className="w-8 h-8 rounded-full bg-[#DCCFC0] border-2 border-[#EDE0D2]" />
        <div className="w-8 h-8 rounded-full bg-[#DCCFC0] border-2 border-[#EDE0D2]" />
      </div>
    ),
  },
  {
    id: "3",
    status: "current",
    title: "Invitation Sent",
    description: "\"Sending the whispers of the garden to your loved ones.\"",
    badge: "IN PROGRESS",
    children: (
      <div className="rounded-xl border border-[#DCCFC0] bg-white p-3 mt-3">
        <p className="text-xs font-medium text-[#2B2622] mb-2">
          Physical Mailer Batch #1
        </p>
        <p className="text-[10px] text-[#8B7E72] mb-1.5">
          120 / 250 Delivered
        </p>
        <div className="w-full bg-[#EDE0D2] rounded-full h-1.5 mb-3">
          <div className="bg-[#A3391C] h-1.5 rounded-full" style={{ width: "48%" }} />
        </div>
        <button className="w-full bg-[#A3391C] text-white rounded-lg py-2 text-xs font-medium hover:opacity-90">
          Track RSVP Live
        </button>
      </div>
    ),
  },
  {
    id: "4",
    status: "upcoming",
    title: "Payments & Deposits",
    description: "Final settlement scheduled for 45 days before event.",
    badge: "LOCKED",
  },
  {
    id: "5",
    status: "upcoming",
    title: "Final Confirmation",
    description: "The last checks and balances before the big day.",
  },
  {
    id: "6",
    status: "upcoming",
    title: "Event Day",
    description: "June 24, 2024. Your masterpiece unfolds.",
  },
  {
    id: "7",
    status: "upcoming",
    title: "Completed",
    description: "Memories archived and galleries shared.",
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-28 md:pb-8 relative">
      <TimelineTopBar />
      <TimelineHeader />

      <div className="px-4 md:px-6 pt-6 max-w-2xl">
        {steps.map((s, i) => (
          <TimelineStep key={s.id} step={s} isLast={i === steps.length - 1} />
        ))}
      </div>

      <NeedHelpCard />

      <button className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 rounded-full bg-[#A3391C] text-white flex items-center justify-center shadow-lg hover:opacity-90 z-30">
        <Sparkles size={20} />
      </button>

      <ClientBottomNav />
    </div>
  );
}