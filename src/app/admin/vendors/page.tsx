"use client";

import { useState } from "react";
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
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { ADMIN_PENDING_VENDORS } from "@/lib/mock/adminVendors";

export default function AdminVendorDirectoryPage() {
  useRequireAdminAuth();
  const [vendors, setVendors] = useState(ADMIN_PENDING_VENDORS);
  const [selectedId, setSelectedId] = useState(ADMIN_PENDING_VENDORS[0]?.id ?? "");

  const selected = vendors.find((v) => v.id === selectedId) ?? vendors[0];

  // No real vendor-review payload exists yet to persist these decisions
  // against (see admin.service.ts header comment) — this just removes the
  // vendor from the local pending queue and confirms the action.
  const resolveVendor = (action: "approved" | "rejected" | "changes requested") => {
    if (!selected) return;
    toast.success(`${selected.businessName} ${action}.`);
    const remaining = vendors.filter((v) => v.id !== selected.id);
    setVendors(remaining);
    setSelectedId(remaining[0]?.id ?? "");
  };

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
                onReject={() => resolveVendor("rejected")}
                onRequestChanges={() => resolveVendor("changes requested")}
                onApprove={() => resolveVendor("approved")}
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
