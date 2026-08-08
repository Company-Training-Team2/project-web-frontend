import { Upload } from "lucide-react";

export default function DocumentsHeader() {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 pt-6 gap-3">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2B2622]">
          Documents
        </h1>
        <p className="text-sm text-[#8B7E72] mt-1 max-w-sm">
          Manage your event contracts, vendor invoices, and payment
          receipts in one secure editorial space.
        </p>
      </div>

      <button className="flex items-center gap-1.5 bg-[#A3391C] text-white rounded-xl px-3 md:px-4 py-2.5 text-xs md:text-sm font-medium hover:opacity-90 whitespace-nowrap shrink-0">
        <Upload size={14} />
        <span className="hidden sm:inline">Upload Document</span>
      </button>
    </div>
  );
}