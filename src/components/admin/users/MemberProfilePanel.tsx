"use client";

import { X } from "lucide-react";
import { toast } from "sonner";
import { adminService } from "@/services/admin.service";
import type { Member } from "./UsersTable";

// "Lifetime Value"/"Booking Freq."/"Recent Activity"/"Send Direct Message"
// from the original mockup had no backing endpoint (no per-user analytics
// or messaging system on the backend) and were dropped rather than shown as
// fake numbers. Suspend/Activate is wired to the real
// PUT /admin/users/:id/suspend|activate.
export default function MemberProfilePanel({
  member,
  onClose,
  onChanged,
}: {
  member: Member | null;
  onClose: () => void;
  onChanged?: () => void;
}) {
  if (!member) return null;

  const isActive = member.isActive && !member.isDeleted;
  const name = member.fullName || member.businessName || member.email;

  const toggleStatus = async () => {
    try {
      if (isActive) {
        await adminService.suspendUser(member.id);
        toast.success(`${name} suspended.`);
      } else {
        await adminService.activateUser(member.id);
        toast.success(`${name} activated.`);
      }
      onChanged?.();
      onClose();
    } catch {
      toast.error("Couldn't update this user. Try again.");
    }
  };

  return (
    <>
      {/* Overlay خلفية بيظهر بس في الموبايل */}
      <div
        onClick={onClose}
        className="md:hidden fixed inset-0 bg-black/40 z-40"
      />

      <aside
        className="
          fixed lg:static bottom-0 left-0 right-0 lg:bottom-auto
          w-full
          max-h-[85vh] lg:max-h-none
          overflow-y-auto
          rounded-t-[16px] lg:rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-6 h-fit
          z-50
        "
      >
        <div className="flex justify-between items-start">
          <button
            onClick={toggleStatus}
            className={`text-xs font-medium rounded-lg px-3 py-1.5 ${
              isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {isActive ? "Suspend" : "Activate"}
          </button>

          <button onClick={onClose} className="text-[#8B716A] hover:text-[#2B2622]">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-20 h-20 rounded-full bg-[#DCCFC0]" />
          <h2 className="font-semibold text-lg mt-3 text-[#2B2622]">{name}</h2>
          <p className="text-sm text-[#8B716A]">{member.email}</p>

          <span
            className={`mt-2 text-xs font-medium px-3 py-1 rounded-full ${
              isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {member.role} · {isActive ? "Active" : "Suspended"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-[#EDE0D2] rounded-xl p-3">
            <p className="text-xs text-[#8B716A]">Joined</p>
            <p className="font-semibold mt-1 text-[#2B2622]">
              {new Date(member.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-[#EDE0D2] rounded-xl p-3">
            <p className="text-xs text-[#8B716A]">Email Verified</p>
            <p className="font-semibold mt-1 text-[#2B2622]">{member.isEmailVerified ? "Yes" : "No"}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
