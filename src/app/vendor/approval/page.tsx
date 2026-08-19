"use client";

import VendorComingSoon from "@/components/vendorn/VendorComingSoon";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";

export default function VendorApprovalPage() {
  useRequireVendorAuth();
  return <VendorComingSoon title="Approval Status" />;
}
