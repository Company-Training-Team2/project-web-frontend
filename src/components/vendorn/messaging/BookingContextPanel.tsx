import Link from "next/link";
import { Calendar, ExternalLink, User as UserIcon } from "lucide-react";
import { Conversation } from "@/services/messaging.service";

// Was a fully hardcoded "booking context" panel (package/deposit/timeline/
// shared files) — Conversation has no booking, package, or file-sharing
// concept on the backend (it's a plain direct-message thread, optionally
// anchored to the WorkPost it started from), so this shows what's actually
// real instead of a booking that may not even exist yet.
export default function BookingContextPanel({ conversation }: { conversation: Conversation }) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#8B7E72]">Conversation With</p>
        <p className="font-serif text-lg font-bold text-[#2B2622] flex items-center gap-2">
          <UserIcon size={16} className="text-[#A3391C]" />
          {conversation.otherPartyName}
        </p>
        <p className="text-xs text-[#8B7E72] mt-1">{conversation.otherPartyRole}</p>
      </div>

      <div className="flex items-start gap-2.5 text-sm">
        <Calendar size={15} className="text-[#A3391C] mt-0.5 shrink-0" />
        <div>
          <p className="text-[10px] uppercase text-[#8B7E72]">Started</p>
          <p className="text-[#2B2622] font-medium">
            {new Date(conversation.createdAt).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {conversation.workPostTitle && conversation.workPostId ? (
        <div className="rounded-xl border border-[#DCCFC0] bg-white p-3">
          <p className="text-[10px] uppercase tracking-wide text-[#8B7E72] mb-2">About This Listing</p>
          <Link
            href={`/vendors/${conversation.workPostId}`}
            className="flex items-center justify-between gap-2 text-sm font-semibold text-[#A3391C] hover:underline"
          >
            <span className="truncate">{conversation.workPostTitle}</span>
            <ExternalLink size={13} className="shrink-0" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
