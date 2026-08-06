import { MockVendor } from "@/lib/mock/types";
import VendorCard from "./VendorCard";

export default function VendorGrid({ vendors }: { vendors: MockVendor[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-8 lg:px-8 xl:grid-cols-3">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} layout="grid" />
      ))}
    </div>
  );
}
