"use client";

import { FileText, Phone, Video, MoreVertical } from "lucide-react";
import { MockChatMessage, MockConversation } from "@/lib/mock/vendorMessagingScript";

export default function ChatThread({
  conversation,
  messages,
}: {
  conversation: MockConversation;
  messages: MockChatMessage[];
}) {
  return (
    <div className="flex h-full flex-col min-w-0">
      <div className="flex items-center justify-between gap-3 border-b border-[#DCCFC0] px-4 py-3">
        <div className="min-w-0">
          <h2 className="font-serif font-bold text-[#2B2622] truncate">{conversation.clientName}</h2>
          <p className="text-xs text-[#8B7E72] truncate">
            {conversation.eventType} · {conversation.eventDate}
          </p>
        </div>
        <div className="flex items-center gap-3 text-[#8B716A] shrink-0">
          <Video size={17} className="hidden sm:block" />
          <Phone size={16} />
          <MoreVertical size={17} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 md:px-5 py-4 space-y-4">
        {messages.map((m) => {
          const isVendor = m.sender === "vendor";
          return (
            <div key={m.id} className={`flex ${isVendor ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] sm:max-w-[70%] ${isVendor ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isVendor
                      ? "bg-[#2B2622] text-white rounded-br-sm"
                      : "bg-white border border-[#DCCFC0] text-[#2B2622] rounded-bl-sm"
                  }`}
                >
                  {m.text && <p>{m.text}</p>}
                  {m.attachment && (
                    <div
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 mt-2 ${
                        isVendor ? "bg-white/10" : "bg-[#EDE0D2]"
                      }`}
                    >
                      <FileText size={18} className={isVendor ? "text-white" : "text-[#A3391C]"} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{m.attachment.name}</p>
                        <p className={`text-[10px] ${isVendor ? "text-white/70" : "text-[#8B7E72]"}`}>
                          {m.attachment.meta}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#8B7E72] mt-1 px-1">{m.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
