"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { documentService, DocumentType, EventDocument } from "@/services/document.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import DocumentsHeader from "@/components/client/documents/DocumentsHeader";
import DocumentSearchBar from "@/components/client/documents/DocumentSearchBar";
import DocumentsTopBar from "@/components/client/documents/DocumentsTopBar";
import DocumentsList from "@/components/client/documents/DocumentsList";
import DocumentUploadForm from "@/components/client/documents/DocumentUploadForm";

function DocumentsInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();

  const [documents, setDocuments] = useState<EventDocument[] | null>(null);
  const [docStatus, setDocStatus] = useState<"loading" | "error" | "ready">("loading");
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const load = useCallback((eventId: number) => {
    setDocStatus("loading");
    documentService
      .getDocuments(eventId)
      .then((data) => {
        setDocuments(data);
        setDocStatus("ready");
      })
      .catch(() => setDocStatus("error"));
  }, []);

  useEffect(() => {
    if (event) load(event.id);
  }, [event, load]);

  const handleUpload = async (file: File, type: DocumentType) => {
    if (!event) return;
    setIsUploading(true);
    try {
      await documentService.uploadDocument(event.id, file, { type });
      load(event.id);
      toast.success("Document uploaded.");
    } catch {
      toast.error("Couldn't upload that document.");
    } finally {
      setIsUploading(false);
    }
  };

  const filtered = useMemo(() => {
    if (!documents) return [];
    const q = search.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((d) => d.fileName.toLowerCase().includes(q));
  }, [documents, search]);

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <DocumentsTopBar />
      <DocumentsHeader />
      <DocumentSearchBar value={search} onChange={setSearch} />
      <DocumentUploadForm onUpload={handleUpload} isSubmitting={isUploading} />

      {docStatus === "error" ? (
        <p className="mt-6 px-4 text-center text-sm text-[#8a3b3b]">Couldn&apos;t load documents for this event.</p>
      ) : docStatus === "loading" || !documents ? (
        <div className="mt-6 px-4 md:px-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
          ))}
        </div>
      ) : (
        <DocumentsList documents={filtered} />
      )}

      <ClientBottomNav />
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <DocumentsInner />
    </Suspense>
  );
}
