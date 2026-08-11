import Link from "next/link";
import { Package } from "lucide-react";
import { WorkPostPerformance } from "@/services/vendorPortal.service";

export default function HighPerformingPackages({ performance }: { performance: WorkPostPerformance[] }) {
  const ranked = [...performance].sort((a, b) => b.totalRevenue - a.totalRevenue);

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-[#2B2622]">High-Performing Services</h2>
        <Link href="/vendor/services" className="whitespace-nowrap text-xs font-medium text-[#A3391C] md:text-sm">
          View All Services
        </Link>
      </div>

      {ranked.length === 0 ? (
        <p className="text-sm text-[#8B7E72]">No services with bookings yet.</p>
      ) : (
        <>
          {/* Mobile: cards */}
          <div className="space-y-3 md:hidden">
            {ranked.map((p) => (
              <div key={p.workPostId} className="flex gap-3 rounded-xl border border-[#DCCFC0] p-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EDE0D2] text-[#A3391C]">
                  <Package size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#2B2622]">{p.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-[#8B7E72]">
                    <span>{p.totalBookings} bookings</span>
                    <span>EGP {p.totalRevenue.toLocaleString()}</span>
                    <span>★ {p.averageRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[420px]">
              <thead className="text-left text-xs uppercase tracking-wide text-[#8B7E72]">
                <tr>
                  <th className="pb-3">Service Name</th>
                  <th className="pb-3">Bookings</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p) => (
                  <tr key={p.workPostId} className="border-t border-[#DCCFC0]">
                    <td className="flex items-center gap-3 py-3">
                      <div className="grid size-9 place-items-center rounded-lg bg-[#EDE0D2] text-[#A3391C]">
                        <Package size={16} />
                      </div>
                      <p className="text-sm font-medium text-[#2B2622]">{p.title}</p>
                    </td>
                    <td className="text-sm text-[#2B2622]">{p.totalBookings}</td>
                    <td className="text-sm text-[#2B2622]">EGP {p.totalRevenue.toLocaleString()}</td>
                    <td className="text-sm text-[#2B2622]">★ {p.averageRating.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
