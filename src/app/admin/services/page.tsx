"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WifiOff } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import AdminBottomNav from "@/components/layout/AdminBottomNav";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PendingServiceList from "@/components/admin/services/PendingServiceList";
import ServiceDetailCard from "@/components/admin/services/ServiceDetailCard";
import ServiceApprovalActionBar from "@/components/admin/services/ServiceApprovalActionBar";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { adminService, AdminWorkPostDto, getAdminErrorMessage } from "@/services/admin.service";

/**
 * Service Listing approval queue — a vendor's individual WorkPost is
 * created Pending ("admin must approve new listings", VendorService.
 * CreateWorkPostAsync) and every public read path (search/detail/featured)
 * only surfaces Approved ones. There was no admin surface to actually clear
 * that queue before this page — vendor *account* approval (/admin/vendors)
 * is a separate flow and never touches WorkPost.ApprovalStatus.
 */
export default function AdminServiceApprovalsPage() {
  useRequireAdminAuth();
  const [services, setServices] = useState<AdminWorkPostDto[] | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    adminService
      .getPendingWorkPosts()
      .then((list) => {
        setServices(list);
        setSelectedId(list[0]?.id ?? null);
      })
      .catch(() => {
        setServices([]);
        setLoadError(true);
      });
  }, []);

  const selected = services?.find((s) => s.id === selectedId) ?? services?.[0];

  const resolve = async (action: "approved" | "rejected", apiCall: (id: number) => Promise<void>) => {
    if (!selected || !services) return;

    try {
      await apiCall(selected.id);
    } catch (error: unknown) {
      toast.error(getAdminErrorMessage(error, "Couldn't save that decision. Try again."));
      return;
    }

    toast.success(`${selected.title} ${action}.`);
    const remaining = services.filter((s) => s.id !== selected.id);
    setServices(remaining);
    setSelectedId(remaining[0]?.id ?? null);
  };

  if (services === undefined) {
    return (
      <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
          <AdminTopBar searchPlaceholder="Search service listings..." />
          <LoadingScreen fullScreen={false} />
        </main>
        <AdminBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Search service listings..." />

        {loadError ? (
          <div className="mt-6 flex items-center gap-2 rounded-[16px] border border-[#e3aea0] bg-[#fbeee9] px-4 py-3 text-sm text-[#8a3b3b]">
            <WifiOff size={16} className="shrink-0" />
            <span>Couldn&apos;t reach the server — try refreshing the page.</span>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start min-w-0">
          <PendingServiceList services={services} selectedId={selected?.id ?? null} onSelect={setSelectedId} />

          {selected ? (
            <div className="min-w-0 flex-1 space-y-6">
              <ServiceDetailCard service={selected} />
              <ServiceApprovalActionBar
                onReject={() => resolve("rejected", (id) => adminService.rejectWorkPost(id))}
                onApprove={() => resolve("approved", (id) => adminService.approveWorkPost(id))}
              />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-[16px] border border-dashed border-[#DCCFC0] p-10 text-center text-[#8B716A]">
              No service listings awaiting review.
            </div>
          )}
        </div>
      </main>

      <AdminBottomNav />
    </div>
  );
}
