// Real, callable endpoints — DocumentsController (Module 7). The
// endpoints are fully wired on the backend, but the blob-storage pipeline
// (S3 / Azure Blob / MinIO) behind them isn't configured yet — uploads
// create a real DB row, but downloadUrl/fileUrl come back null until that
// infra exists. Callers should treat a null URL as "not available yet",
// not as an error.
import apiClient from "@/lib/axios";

export type DocumentType = "Contract" | "Invoice" | "Receipt";

export interface EventDocument {
  id: number;
  eventId: number;
  type: DocumentType;
  fileName: string;
  fileUrl?: string;
  uploadedAt: string;
  amount?: number;
  status?: string;
}

export interface DocumentDownload {
  documentId: number;
  fileName: string;
  downloadUrl?: string;
  expiresAt?: string;
}

export const documentService = {
  async getDocuments(eventId: number): Promise<EventDocument[]> {
    const { data } = await apiClient.get<EventDocument[]>(`/events/${eventId}/documents`);
    return data;
  },

  async uploadDocument(
    eventId: number,
    file: File,
    meta: { type: DocumentType; amount?: number; status?: string }
  ): Promise<EventDocument> {
    const form = new FormData();
    form.append("File", file);
    form.append("Type", meta.type);
    if (meta.amount != null) form.append("Amount", String(meta.amount));
    if (meta.status) form.append("Status", meta.status);

    // Same fix as auth.service.ts's register() / vendorPortal.service.ts's
    // uploadServiceImages(): a hardcoded Content-Type with no boundary
    // blocks the browser from adding the real one, so the server can't
    // parse the multipart body — `undefined` lets it fill the boundary in.
    const { data } = await apiClient.post<EventDocument>(`/events/${eventId}/documents`, form, {
      headers: { "Content-Type": undefined },
    });
    return data;
  },

  async getDownloadLink(documentId: number): Promise<DocumentDownload> {
    const { data } = await apiClient.get<DocumentDownload>(`/documents/${documentId}/download`);
    return data;
  },
};
