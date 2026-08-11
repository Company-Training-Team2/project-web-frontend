"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Info } from "lucide-react";
import { toast } from "sonner";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { messagingService, Conversation, ConversationMessage } from "@/services/messaging.service";
import ConnectionError from "@/components/shared/ConnectionError";

import ConversationsList from "@/components/vendorn/messaging/ConversationsList";
import ChatThread from "@/components/vendorn/messaging/ChatThread";
import ChatComposer from "@/components/vendorn/messaging/ChatComposer";
import BookingContextPanel from "@/components/vendorn/messaging/BookingContextPanel";

type MobileView = "list" | "thread" | "context";

// Real, callable endpoints — MessagingController (see messaging.service.ts).
// Shares its list/thread/composer/details components with
// /vendor/messages — the shape (Conversation/ConversationMessage) and the
// UI are identical from either side of a thread, only the page chrome
// around them differs.
export default function MessagesScreen() {
  useRequireAuth();
  const searchParams = useSearchParams();
  const deepLinkId = searchParams.get("c");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [listStatus, setListStatus] = useState<"loading" | "error" | "ready">("loading");
  const [activeId, setActiveId] = useState<number | null>(deepLinkId ? Number(deepLinkId) : null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [threadStatus, setThreadStatus] = useState<"loading" | "error" | "ready">("loading");
  const [mobileView, setMobileView] = useState<MobileView>(deepLinkId ? "thread" : "list");

  const loadConversations = useCallback(() => {
    setListStatus("loading");
    messagingService
      .getConversations()
      .then((data) => {
        setConversations(data);
        setListStatus("ready");
        setActiveId((prev) => prev ?? data[0]?.id ?? null);
      })
      .catch(() => setListStatus("error"));
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (activeId === null) return;
    setThreadStatus("loading");
    messagingService
      .getMessages(activeId)
      .then((data) => {
        setMessages(data);
        setThreadStatus("ready");
      })
      .catch(() => setThreadStatus("error"));
  }, [activeId]);

  const conversation = conversations.find((c) => c.id === activeId) ?? null;

  const handleSelect = (id: number) => {
    setActiveId(id);
    setMobileView("thread");
  };

  const handleSend = async (text: string) => {
    if (activeId === null) return;
    try {
      const sent = await messagingService.sendMessage(activeId, text);
      setMessages((prev) => [...prev, sent]);
      loadConversations();
    } catch {
      toast.error("Message failed to send.");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#faf6f0]">
      <div className="flex items-center gap-3 border-b border-[#e5ded2] bg-white px-4 py-3">
        <Link href="/home" className="text-[#252323]">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="font-serif text-lg font-bold text-[#252323]">Messages</h1>
      </div>

      {listStatus === "error" ? (
        <div className="p-6">
          <ConnectionError message="Couldn't load your conversations. Check your connection and try again." onRetry={loadConversations} />
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr_300px] min-h-0 overflow-hidden">
          <div className={`${mobileView === "list" ? "flex" : "hidden"} lg:flex flex-col border-b lg:border-b-0 lg:border-r border-[#e5ded2] bg-white min-h-0`}>
            <ConversationsList
              conversations={conversations}
              activeId={activeId}
              onSelect={handleSelect}
              isLoading={listStatus === "loading"}
            />
          </div>

          <div className={`${mobileView === "thread" ? "flex" : "hidden"} lg:flex flex-col bg-[#faf6f0] min-h-0 min-w-0`}>
            {conversation ? (
              <>
                <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-[#e5ded2] bg-white">
                  <button onClick={() => setMobileView("list")} className="text-[#6d5d54]">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-medium text-[#252323] flex-1 truncate">{conversation.otherPartyName}</span>
                  <button onClick={() => setMobileView("context")} className="text-[#6d5d54]">
                    <Info size={18} />
                  </button>
                </div>
                <div className="flex-1 min-h-0">
                  <ChatThread conversation={conversation} messages={messages} status={threadStatus} />
                </div>
                <ChatComposer onSend={handleSend} />
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-[#8b7e72]">
                {listStatus === "loading"
                  ? "Loading…"
                  : conversations.length === 0
                  ? "No conversations yet — message a vendor from their listing to start one."
                  : "Select a conversation to view it here."}
              </div>
            )}
          </div>

          <div className={`${mobileView === "context" ? "flex" : "hidden"} lg:flex flex-col border-t lg:border-t-0 lg:border-l border-[#e5ded2] bg-white min-h-0`}>
            {conversation ? (
              <>
                <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-[#e5ded2]">
                  <button onClick={() => setMobileView("thread")} className="text-[#6d5d54]">
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-medium text-[#252323]">Details</span>
                </div>
                <BookingContextPanel conversation={conversation} />
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
