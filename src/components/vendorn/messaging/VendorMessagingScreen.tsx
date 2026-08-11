"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, Info } from "lucide-react";
import { toast } from "sonner";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { messagingService, Conversation, ConversationMessage } from "@/services/messaging.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

import ConversationsList from "./ConversationsList";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";
import BookingContextPanel from "./BookingContextPanel";

type MobileView = "list" | "thread" | "context";

// Real, callable endpoints — MessagingController (see messaging.service.ts).
export default function VendorMessagingScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [listStatus, setListStatus] = useState<"loading" | "error" | "ready">("loading");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [threadStatus, setThreadStatus] = useState<"loading" | "error" | "ready">("loading");
  const [mobileView, setMobileView] = useState<MobileView>("list");

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
    if (!authLoading && isVendor) loadConversations();
  }, [authLoading, isVendor, loadConversations]);

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

  if (authLoading || !isVendor) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 flex flex-col pb-16 md:pb-0 min-w-0 overflow-hidden">
        {listStatus === "error" ? (
          <div className="p-6">
            <AdminConnectionError label="your conversations" />
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] min-h-0 overflow-hidden">
            <div
              className={`${mobileView === "list" ? "flex" : "hidden"} lg:flex flex-col border-b lg:border-b-0 lg:border-r border-[#DCCFC0] bg-[#F6ECE0] min-h-0`}
            >
              <ConversationsList
                conversations={conversations}
                activeId={activeId}
                onSelect={handleSelect}
                isLoading={listStatus === "loading"}
              />
            </div>

            <div
              className={`${mobileView === "thread" ? "flex" : "hidden"} lg:flex flex-col bg-[#FAF6F0] min-h-0 min-w-0`}
            >
              {conversation ? (
                <>
                  <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-[#DCCFC0] bg-[#F6ECE0]">
                    <button onClick={() => setMobileView("list")} className="text-[#8B716A]">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-medium text-[#2B2622] flex-1 truncate">
                      {conversation.otherPartyName}
                    </span>
                    <button onClick={() => setMobileView("context")} className="text-[#8B716A]">
                      <Info size={18} />
                    </button>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ChatThread conversation={conversation} messages={messages} status={threadStatus} />
                  </div>
                  <ChatComposer onSend={handleSend} />
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center text-sm text-[#8B7E72]">
                  {listStatus === "loading" ? "Loading…" : "Select a conversation to view it here."}
                </div>
              )}
            </div>

            <div
              className={`${mobileView === "context" ? "flex" : "hidden"} lg:flex flex-col border-t lg:border-t-0 lg:border-l border-[#DCCFC0] bg-[#F6ECE0] min-h-0`}
            >
              {conversation ? (
                <>
                  <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-[#DCCFC0]">
                    <button onClick={() => setMobileView("thread")} className="text-[#8B716A]">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-medium text-[#2B2622]">Details</span>
                  </div>
                  <BookingContextPanel conversation={conversation} />
                </>
              ) : null}
            </div>
          </div>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
