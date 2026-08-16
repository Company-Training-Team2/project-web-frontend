"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import Sidebar from "@/components/layout/Sidebar";
import AdminBottomNav from "@/components/layout/AdminBottomNav";
import AdminTopBar from "@/components/admin/AdminTopBar";
import AdminConnectionError from "@/components/admin/AdminConnectionError";
import ChatListPanel from "@/components/admin/messages/ChatListPanel";
import ChatWindow from "@/components/admin/messages/ChatWindow";
import ConversationDetailsPanel from "@/components/admin/messages/BookingDetailsPanel";
import NewConversationDialog from "@/components/admin/messages/NewConversationDialog";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import {
  adminService,
  AdminConversationDto,
  AdminConversationMessageDto,
  getAdminErrorMessage,
} from "@/services/admin.service";

// Real, callable endpoints — AdminController's CRM inbox: GET/POST
// /admin/conversations, GET/POST .../messages, PATCH .../status (see
// admin.service.ts). This is admin<->platform-user support messaging —
// unrelated to vendor<->customer messaging (see /vendor/messages), which is
// a separate system.
export default function MessagesPage() {
  useRequireAdminAuth();

  const [conversations, setConversations] = useState<AdminConversationDto[] | null>(null);
  const [listStatus, setListStatus] = useState<"loading" | "error" | "ready">("loading");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<AdminConversationMessageDto[]>([]);
  const [threadStatus, setThreadStatus] = useState<"idle" | "loading" | "error" | "ready">("idle");
  const [isNewOpen, setIsNewOpen] = useState(false);

  const loadConversations = useCallback((selectId?: number) => {
    setListStatus("loading");
    adminService
      .getConversations()
      .then((data) => {
        setConversations(data);
        setListStatus("ready");
        if (selectId) {
          setActiveId(selectId);
        } else if (data.length > 0 && activeId === null) {
          setActiveId(data[0].id);
        }
      })
      .catch(() => setListStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // One-time fetch on mount — a real network call, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadConversations();
  }, [loadConversations]);

  const loadMessages = useCallback((conversationId: number) => {
    setThreadStatus("loading");
    adminService
      .getConversationMessages(conversationId)
      .then((data) => {
        setMessages(data);
        setThreadStatus("ready");
      })
      .catch(() => setThreadStatus("error"));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (activeId !== null) loadMessages(activeId);
  }, [activeId, loadMessages]);

  const activeConversation = conversations?.find((c) => c.id === activeId) ?? null;

  const handleSend = async (body: string) => {
    if (activeId === null) return;
    try {
      const sent = await adminService.sendConversationMessage(activeId, body);
      setMessages((prev) => [...prev, sent]);
      loadConversations(activeId); // refresh snippet/order without losing selection
    } catch (error) {
      toast.error(getAdminErrorMessage(error, "Message failed to send."));
    }
  };

  const handleStatusChange = async (status: "Open" | "Resolved" | "Closed") => {
    if (activeId === null) return;
    try {
      await adminService.updateConversationStatus(activeId, status);
      loadConversations(activeId);
    } catch (error) {
      toast.error(getAdminErrorMessage(error, "Couldn't update status."));
    }
  };

  const handleCreated = (conversation: AdminConversationDto) => {
    setIsNewOpen(false);
    loadConversations(conversation.id);
  };

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-[#EDE0D2]">
      <Sidebar />

      {/* pb-16 reserves room for the fixed AdminBottomNav below md so it
          never overlaps the chat panels. */}
      <div className="flex-1 flex min-w-0 pb-16 md:pb-0">
        {listStatus === "error" ? (
          <div className="flex-1 p-6">
            <AdminTopBar searchPlaceholder="Search conversations..." />
            <div className="mt-6">
              <AdminConnectionError label="conversations" />
            </div>
          </div>
        ) : (
          <>
            <ChatListPanel
              conversations={conversations ?? []}
              isLoading={listStatus === "loading"}
              activeId={activeId}
              onSelect={setActiveId}
              onNew={() => setIsNewOpen(true)}
            />
            <ChatWindow
              conversation={activeConversation}
              messages={messages}
              status={threadStatus}
              onSend={handleSend}
              onStatusChange={handleStatusChange}
            />
            <ConversationDetailsPanel conversation={activeConversation} messageCount={messages.length} />
          </>
        )}
      </div>

      {isNewOpen ? (
        <NewConversationDialog onClose={() => setIsNewOpen(false)} onCreated={handleCreated} />
      ) : null}

      <AdminBottomNav />
    </div>
  );
}
