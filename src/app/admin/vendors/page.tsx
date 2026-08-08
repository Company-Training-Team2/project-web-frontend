"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Sidebar from "@/components/layout/Sidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import PendingApprovalsList from "@/components/admin/vendors/PendingApprovalsList";
import VendorApprovalHeader from "@/components/admin/vendors/VendorApprovalHeader";
import VendorPortfolioGallery from "@/components/admin/vendors/VendorPortfolioGallery";
import VerificationInsightsCard from "@/components/admin/vendors/VerificationInsightsCard";
import ComplianceDossierCard from "@/components/admin/vendors/ComplianceDossierCard";
import InternalNotesCard from "@/components/admin/vendors/InternalNotesCard";
import ApprovalActionBar from "@/components/admin/vendors/ApprovalActionBar";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { adminService } from "@/services/admin.service";
import { AdminPendingVendor } from "@/lib/mock/adminVendors";

export default function AdminVendorDirectoryPage() {
  useRequireAdminAuth();
  const [vendors, setVendors] = useState<AdminPendingVendor[] | undefined>(undefined);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    adminService.getPendingVendorsAdapted().then((list) => {
      setVendors(list);
      setSelectedId(list[0]?.id ?? "");
    });
  }, []);

  const selected = vendors?.find((v) => v.id === selectedId) ?? vendors?.[0];

  const resolveVendor = async (
    action: "approved" | "rejected" | "changes requested",
    apiCall: (id: number) => Promise<void>
  ) => {
    if (!selected || !vendors) return;

    // A real, numeric vendorProfileId means this came from the live
    // GET /admin/vendors/pending — persist the decision for real. A mock
    // fixture id ("pv1"...) has nothing real to call against (backend/DB
    // down, or genuinely a demo entry), so it's just removed locally.
    if (/^\d+$/.test(selected.id)) {
      try {
        await apiCall(Number(selected.id));
      } catch (error: unknown) {
        toast.error(
          error && typeof error === "object" && "response" in error
            ? "Couldn't save that decision. Try again."
            : "Couldn't reach the server."
        );
        return;
      }
    }

    toast.success(`${selected.businessName} ${action}.`);
    const remaining = vendors.filter((v) => v.id !== selected.id);
    setVendors(remaining);
    setSelectedId(remaining[0]?.id ?? "");
  };

  if (vendors === undefined) {
    return (
      <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
          <AdminTopBar searchPlaceholder="Search vendors..." />
          <LoadingScreen fullScreen={false} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Search vendors..." />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start min-w-0">
          <PendingApprovalsList vendors={vendors} selectedId={selectedId} onSelect={setSelectedId} />

          {selected ? (
            <div className="min-w-0 flex-1 space-y-6">
              <VendorApprovalHeader vendor={selected} />
              <VendorPortfolioGallery images={selected.images} />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
                <ComplianceDossierCard documents={selected.documents} />
                <VerificationInsightsCard verification={selected.verification} />
              </div>

              <InternalNotesCard />

              <ApprovalActionBar
                onReport={() => toast.info(`${selected.businessName} reported for review.`)}
                onReject={() => resolveVendor("rejected", (id) => adminService.rejectVendor(id))}
                onRequestChanges={() =>
                  resolveVendor("changes requested", (id) => adminService.requestVendorChanges(id))
                }
                onApprove={() => resolveVendor("approved", (id) => adminService.approveVendor(id))}
              />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-[16px] border border-dashed border-[#DCCFC0] p-10 text-center text-[#8B716A]">
              No vendors awaiting review.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
