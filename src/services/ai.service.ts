// Talks to the standalone AI Planner service (/ai-service in the repo
// root — a separate FastAPI app, not the .NET backend). Kept on its own
// axios instance since it has a different base URL and doesn't need the
// auth-token / 401-redirect interceptors from `apiClient`.
import axios from "axios";
import { AI_SERVICE_URL } from "@/config/env";

const aiClient = axios.create({
  baseURL: AI_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export interface AiChatResponse {
  conversationId: string;
  reply: string;
}

export async function sendAiChatMessage(
  message: string,
  conversationId?: string | null
): Promise<AiChatResponse> {
  const { data } = await aiClient.post<AiChatResponse>("/api/ai/chat", {
    conversationId: conversationId ?? null,
    message,
  });
  return data;
}
