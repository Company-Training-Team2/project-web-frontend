"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useActiveEvent } from "@/hooks/useActiveEvent";
import { checklistService, EventChecklist } from "@/services/checklist.service";
import EventStateScreen from "@/components/client/shared/EventStateScreen";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ClientBottomNav from "@/components/layout/ClientBottomNav";
import AiConciergeFab from "@/components/client/checklist/AiConciergeFab";
import ChecklistTabs, { ChecklistTab } from "@/components/client/checklist/ChecklistTabs";
import ChecklistTopBar from "@/components/client/checklist/ChecklistTopBar";
import CompletedTasksList from "@/components/client/checklist/CompletedTasksList";
import PendingTasksList from "@/components/client/checklist/PendingTasksList";
import PlanningProgressHeader from "@/components/client/checklist/PlanningProgressHeader";
import AddTaskBar from "@/components/client/checklist/AddTaskBar";

function ChecklistInner() {
  useRequireAuth();
  const { event, status } = useActiveEvent();

  const [checklist, setChecklist] = useState<EventChecklist | null>(null);
  const [listStatus, setListStatus] = useState<"loading" | "error" | "ready">("loading");
  const [tab, setTab] = useState<ChecklistTab>("All Tasks");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const load = useCallback((eventId: number) => {
    setListStatus("loading");
    checklistService
      .getChecklist(eventId)
      .then((data) => {
        setChecklist(data);
        setListStatus("ready");
      })
      .catch(() => setListStatus("error"));
  }, []);

  useEffect(() => {
    if (event) load(event.id);
  }, [event, load]);

  const handleToggle = async (id: number) => {
    setBusyId(id);
    try {
      await checklistService.toggleItem(id);
      if (event) load(event.id);
    } catch {
      toast.error("Couldn't update that task.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setBusyId(id);
    try {
      await checklistService.deleteItem(id);
      if (event) load(event.id);
    } catch {
      toast.error("Couldn't delete that task.");
    } finally {
      setBusyId(null);
    }
  };

  const handleAdd = async (title: string) => {
    if (!event) return;
    setIsAdding(true);
    try {
      await checklistService.createItem(event.id, { title });
      load(event.id);
    } catch {
      toast.error("Couldn't add that task.");
    } finally {
      setIsAdding(false);
    }
  };

  if (status === "loading") return <LoadingScreen fullScreen={false} />;
  if (status === "empty" || status === "error") return <EventStateScreen status={status} />;
  if (!event) return null;

  const applyTab = (items: EventChecklist["pending"]) => {
    if (tab === "High Priority") return items.filter((t) => t.priority === "High");
    if (tab === "Vendor Follow-ups") return items.filter((t) => !!t.category);
    return items;
  };

  const percent = checklist && checklist.totalCount > 0 ? Math.round((checklist.completedCount / checklist.totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#EDE0D2] pb-24 md:pb-8">
      <ChecklistTopBar />
      <PlanningProgressHeader eventName={event.name} targetDate={event.targetDate} percent={percent} />
      <ChecklistTabs active={tab} onChange={setTab} />
      <AddTaskBar onAdd={handleAdd} isSubmitting={isAdding} />

      {listStatus === "error" ? (
        <p className="mt-6 text-center text-sm text-[#8a3b3b]">Couldn&apos;t load the checklist.</p>
      ) : listStatus === "loading" || !checklist ? (
        <div className="mt-4 px-4 md:px-6 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-[16px] bg-[#F6ECE0]" />
          ))}
        </div>
      ) : (
        <>
          <PendingTasksList tasks={applyTab(checklist.pending)} onToggle={handleToggle} onDelete={handleDelete} busyId={busyId} />
          <CompletedTasksList tasks={applyTab(checklist.completed)} onToggle={handleToggle} onDelete={handleDelete} busyId={busyId} />
        </>
      )}

      <AiConciergeFab />
      <ClientBottomNav />
    </div>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={<LoadingScreen fullScreen={false} />}>
      <ChecklistInner />
    </Suspense>
  );
}
