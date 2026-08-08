"use client";

import { useState } from "react";
import MessagingSidebar from "@/components/admin/messages/MessagingSidebar";
import ChatListPanel from "@/components/admin/messages/ChatListPanel";
import ChatWindow from "@/components/admin/messages/ChatWindow";
import BookingDetailsPanel from "@/components/admin/messages/BookingDetailsPanel";

export default function MessagesPage() {
  const [activeId, setActiveId] = useState("amara");

  return (
    <div className="h-screen flex overflow-hidden bg-[#EDE0D2]">
      <MessagingSidebar />

      <div className="flex-1 flex min-w-0">
        <ChatListPanel activeId={activeId} onSelect={setActiveId} />
        <ChatWindow />
        <BookingDetailsPanel />
      </div>
    </div>
  );
}