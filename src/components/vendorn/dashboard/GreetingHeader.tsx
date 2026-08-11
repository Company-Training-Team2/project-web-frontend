import { Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { VendorDashboard } from "@/services/vendorPortal.service";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function GreetingHeader({ dashboard }: { dashboard: VendorDashboard }) {
  const { user } = useAuth();

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold text-[#2B2622] md:text-2xl">
            {greeting()}, {user?.name || "there"}
          </h1>

          <div className="mt-1 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={13}
                className={
                  n <= Math.round(dashboard.averageRating)
                    ? "fill-[#B08D3E] text-[#B08D3E]"
                    : "fill-transparent text-[#DCCFC0]"
                }
              />
            ))}
            <span className="ml-1 text-xs text-[#8B716A]">
              {dashboard.averageRating.toFixed(1)} ({dashboard.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-2 text-xs text-[#8B7E72] md:text-sm">
            {dashboard.totalWorkPosts} active service{dashboard.totalWorkPosts === 1 ? "" : "s"} ·{" "}
            {dashboard.totalBookings} total bookings
          </p>
        </div>

        <div className="w-full rounded-xl bg-[#EDE0D2] px-5 py-3 text-center md:w-auto md:text-left">
          <p className="text-[10px] uppercase tracking-wide text-[#8B7E72]">This Month&apos;s Revenue</p>
          <p className="mt-1 text-lg font-bold text-[#A3391C] md:text-xl">
            EGP {dashboard.monthRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
