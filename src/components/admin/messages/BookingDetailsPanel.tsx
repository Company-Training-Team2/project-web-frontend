import { Mail, Calendar, MessagesSquare, Tag } from "lucide-react";
import { AdminConversationDto } from "@/services/admin.service";

// Was a hardcoded "booking details" side panel — AdminConversation has no
// booking link at all (it's a flat admin<->user support thread, not tied to
// a specific booking), so faking one would misrepresent which booking a
// message is even about. This shows what the thread actually carries
// instead: who it's with, when it was opened, and how many messages it has.
export default function ConversationDetailsPanel({
  conversation,
  messageCount,
}: {
  conversation: AdminConversationDto | null;
  messageCount: number;
}) {
  if (!conversation) {
    return <div className="hidden lg:flex w-72 border-l border-[#DCCFC0] bg-[#F6ECE0] shrink-0" />;
  }

  return (
    <div className="hidden lg:flex w-72 border-l border-[#DCCFC0] bg-[#F6ECE0] flex-col overflow-y-auto shrink-0">
      <div className="p-5 border-b border-[#DCCFC0]">
        <h3 className="font-serif font-semibold text-[#2B2622]">Conversation Details</h3>

        <div className="space-y-2.5 mt-4 text-sm">
          <div className="flex items-center gap-2 text-[#2B2622]">
            <Mail size={14} className="text-[#A3391C] shrink-0" />
            <span className="truncate">{conversation.userEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-[#2B2622]">
            <Tag size={14} className="text-[#A3391C] shrink-0" />
            <span className="truncate">{conversation.subject}</span>
          </div>
          <div className="flex items-center gap-2 text-[#2B2622]">
            <Calendar size={14} className="text-[#A3391C] shrink-0" />
            Opened {new Date(conversation.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 text-[#2B2622]">
            <MessagesSquare size={14} className="text-[#A3391C] shrink-0" />
            {messageCount} message{messageCount === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h4 className="font-semibold text-sm text-[#2B2622] mb-2">Status</h4>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            conversation.status === "Open"
              ? "bg-[#fdf0ec] text-[#af3718]"
              : conversation.status === "Resolved"
              ? "bg-[#eaf6ef] text-[#2E9E68]"
              : "bg-[#EDE0D2] text-[#8B716A]"
          }`}
        >
          {conversation.status}
        </span>
        <p className="mt-3 text-[11px] text-[#8B7E72]">Change status from the buttons above the message thread.</p>
      </div>
    </div>
  );
}
