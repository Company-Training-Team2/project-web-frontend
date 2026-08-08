import ClientBottomNav from "@/components/layout/ClientBottomNav";
import DocumentsTopBar from "@/components/client/documents/DocumentsTopBar";
import DocumentsHeader from "@/components/client/documents/DocumentsHeader";
import DocumentSearchBar from "@/components/client/documents/DocumentSearchBar";
import ContractCard from "@/components/client/documents/ContractCard";
import FinancialRecordCard from "@/components/client/documents/FinancialRecordCard";
import StorageLimitCard from "@/components/client/documents/StorageLimitCard";

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#EDE0D2]">
      <DocumentsTopBar />
      <DocumentsHeader />
      <DocumentSearchBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <ContractCard />
        <FinancialRecordCard />
      </div>

      <StorageLimitCard />

      <ClientBottomNav />
    </div>
  );
}