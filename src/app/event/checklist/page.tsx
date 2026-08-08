import ClientBottomNav from "@/components/layout/ClientBottomNav";
import ChecklistTopBar from "@/components/client/checklist/ChecklistTopBar";
import PlanningProgressHeader from "@/components/client/checklist/PlanningProgressHeader";
import ChecklistTabs from "@/components/client/checklist/ChecklistTabs";
import PendingTasksList from "@/components/client/checklist/PendingTasksList";
import CompletedTasksList from "@/components/client/checklist/CompletedTasksList";
import AiConciergeFab from "@/components/client/checklist/AiConciergeFab";

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] relative">
      <ChecklistTopBar />
      <PlanningProgressHeader />
      <ChecklistTabs />
      <PendingTasksList />
      <CompletedTasksList />

      <AiConciergeFab />
      <ClientBottomNav />
    </div>
  );
}