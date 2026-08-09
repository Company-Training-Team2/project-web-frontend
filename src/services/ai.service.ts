// Talks to the AI Planner endpoint — a Python Vercel Function living in
// this same project (see /api/ai/chat.py), same-origin in production. Kept
// on its own axios instance (rather than reusing `apiClient`) since it
// doesn't need apiClient's auth-token / 401-redirect interceptors, and
// AI_SERVICE_URL only differs from same-origin during local dev.
//
// Stateless by design: the backend keeps no conversation state of its own
// (no database) — every call sends the full `history` the previous call
// returned, and gets an updated one back. The caller (AiPlannerScreen) is
// responsible for persisting it between messages.
import axios from "axios";
import { AI_SERVICE_URL } from "@/config/env";

const aiClient = axios.create({
  baseURL: AI_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Opaque — these are raw OpenAI-format chat messages (system/user/
// assistant/tool roles, tool_calls, etc.). The frontend never needs to
// look inside them, just round-trip them.
export type AiChatHistory = Record<string, unknown>[];

export interface AiChatResponse {
  reply: string;
  history: AiChatHistory;
}

export async function sendAiChatMessage(
  message: string,
  history: AiChatHistory | null
): Promise<AiChatResponse> {
  const { data } = await aiClient.post<AiChatResponse>("/api/ai/chat", {
    message,
    history: history ?? null,
  });
  return data;
}
