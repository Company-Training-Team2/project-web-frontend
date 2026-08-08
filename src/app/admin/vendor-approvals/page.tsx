import Sidebar from "@/components/layout/Sidebar";
import ApprovalsTopBar from "@/components/admin/vendor-approvals/ApprovalsTopBar";
import ApprovalsSearch from "@/components/admin/vendor-approvals/ApprovalsSearch";
import CategoryFilters from "@/components/admin/vendor-approvals/CategoryFilters";
import ApprovalsList from "@/components/admin/vendor-approvals/ApprovalsList";
import BottomNav from "@/components/admin/vendor-approvals/BottomNav";

export default function VendorApprovalsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0 relative">
        <ApprovalsTopBar />
        <ApprovalsSearch />
        <CategoryFilters />
        <ApprovalsList />
        <BottomNav />
      </div>
    </div>
  );
}