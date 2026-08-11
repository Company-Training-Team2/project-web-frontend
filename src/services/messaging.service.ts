// Real, callable endpoints — MessagingController (Vendor<->Customer direct
// messaging, the "Contact Vendor" feature). Distinct from admin.service.ts's
// CRM conversations, which is a separate admin<->user support system.
//
// NOTE: this needs a backend rebuild + redeploy before it's live — the
// Conversation/ConversationMessage tables and MessagingController were
// added in this same change (see back-end/EventHub.Infrastructure/
// Migrations/Manual/AddMessagingModule.sql). Until that's applied, these
// calls will fail and callers should treat that as "not available yet",
// not corrupt data.
import apiClient from "@/lib/axios";

export interface Conversation {
  id: number;
  otherPartyUserId: number;
  otherPartyName: string;
  otherPartyRole: "Customer" | "Vendor";
  workPostId?: number;
  workPostTitle?: string;
  lastMessageSnippet?: string;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
}

export interface ConversationMessage {
  id: number;
  conversationId: number;
  senderUserId: number;
  isFromMe: boolean;
  body: string;
  sentAt: string;
}

export interface CreateConversationPayload {
  workPostId: number;
  initialMessage?: string;
}

export const messagingService = {
  async getConversations(): Promise<Conversation[]> {
    const { data } = await apiClient.get<Conversation[]>("/messaging/conversations");
    return data;
  },

  async createConversation(payload: CreateConversationPayload): Promise<Conversation> {
    const { data } = await apiClient.post<Conversation>("/messaging/conversations", payload);
    return data;
  },

  async getMessages(conversationId: number): Promise<ConversationMessage[]> {
    const { data } = await apiClient.get<ConversationMessage[]>(`/messaging/conversations/${conversationId}/messages`);
    return data;
  },

  async sendMessage(conversationId: number, body: string): Promise<ConversationMessage> {
    const { data } = await apiClient.post<ConversationMessage>(`/messaging/conversations/${conversationId}/messages`, {
      body,
    });
    return data;
  },
};
