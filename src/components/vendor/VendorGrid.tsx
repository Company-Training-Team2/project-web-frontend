import { MockVendor } from "@/lib/mock/types";
import VendorCard from "./VendorCard";

export default function VendorGrid({ vendors }: { vendors: MockVendor[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 px-8 py-8 sm:grid-cols-2">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} layout="grid" />
      ))}
    </div>
  );
}
