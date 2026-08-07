import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EditHeader({ name }: { name: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6">
      <div>
        <Link
          href="/vendor/services"
          className="flex items-center gap-1 text-xs text-[#8B716A] hover:text-[#2B2622] mb-2"
        >
          <ChevronLeft size={14} />
          Back to Services
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#A3391C]">
          {name}
        </h1>
      </div>

      <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1.5 rounded-full w-fit">
        Live
      </span>
    </div>
  );
}