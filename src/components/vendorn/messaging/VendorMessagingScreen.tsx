"use client";

import { useState } from "react";
import { ChevronLeft, Info } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { MOCK_CONVERSATIONS, MockChatMessage } from "@/lib/mock/vendorMessagingScript";

import ConversationsList from "./ConversationsList";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";
import BookingContextPanel from "./BookingContextPanel";

type MobileView = "list" | "thread" | "context";

export default function VendorMessagingScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();

  const [activeId, setActiveId] = useState(MOCK_CONVERSATIONS[0].id);
  const [mobileView, setMobileView] = useState<MobileView>("list");
  // Extra messages appended locally during this session only (not persisted,
  // never sent anywhere) — see ChatComposer's disclaimer.
  const [draftMessages, setDraftMessages] = useState<Record<string, MockChatMessage[]>>({});

  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === activeId) ?? MOCK_CONVERSATIONS[0];
  const messages = [...conversation.messages, ...(draftMessages[activeId] ?? [])];

  const appendDraft = (text: string) => {
    setDraftMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] ?? []),
        {
          id: `draft-${Date.now()}`,
          sender: "vendor",
          text,
          time: new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
        },
      ],
    }));
  };

  const handleSelect = (id: string) => {
    setActiveId(id);
    setMobileView("thread");
  };

  if (authLoading || !isVendor) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 flex flex-col pb-16 md:pb-0 min-w-0 overflow-hidden">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] min-h-0 overflow-hidden">
          {/* Conversations list */}
          <div
            className={`${mobileView === "list" ? "flex" : "hidden"} lg:flex flex-col border-b lg:border-b-0 lg:border-r border-[#DCCFC0] bg-[#F6ECE0] min-h-0`}
          >
            <ConversationsList
              conversations={MOCK_CONVERSATIONS}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>

          {/* Thread */}
          <div
            className={`${mobileView === "thread" ? "flex" : "hidden"} lg:flex flex-col bg-[#FAF6F0] min-h-0 min-w-0`}
          >
            <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-[#DCCFC0] bg-[#F6ECE0]">
              <button onClick={() => setMobileView("list")} className="text-[#8B716A]">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-medium text-[#2B2622] flex-1 truncate">
                {conversation.clientName}
              </span>
              <button onClick={() => setMobileView("context")} className="text-[#8B716A]">
                <Info size={18} />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <ChatThread conversation={conversation} messages={messages} />
            </div>
            <ChatComposer onSend={appendDraft} onQuickAction={appendDraft} />
          </div>

          {/* Booking context */}
          <div
            className={`${mobileView === "context" ? "flex" : "hidden"} lg:flex flex-col border-t lg:border-t-0 lg:border-l border-[#DCCFC0] bg-[#F6ECE0] min-h-0`}
          >
            <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-[#DCCFC0]">
              <button onClick={() => setMobileView("thread")} className="text-[#8B716A]">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-medium text-[#2B2622]">Booking Details</span>
            </div>
            <BookingContextPanel conversation={conversation} />
          </div>
        </div>
      </main>

      <VendorBottomNav />
    </div>
  );
}
