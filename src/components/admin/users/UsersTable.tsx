"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminService, AdminUserDto } from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

// Real shape from GET /api/admin/users — no per-user "membership tier" or
// booking count exists on the backend (AdminUserDto has none), so those
// columns from the original mockup are dropped rather than faked.
export type Member = AdminUserDto;

function displayName(member: Member) {
  return member.fullName || member.businessName || member.email;
}

function statusOf(member: Member): "Active" | "Suspended" {
  return member.isActive && !member.isDeleted ? "Active" : "Suspended";
}

const statusStyles: Record<"Active" | "Suspended", string> = {
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-700",
};

export default function UsersTable({
  onSelect,
}: {
  onSelect: (member: Member) => void;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = () => {
    setIsLoading(true);
    setLoadError(false);
    adminService
      .getUsers()
      .then(setMembers)
      .catch(() => setLoadError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // One-time fetch on mount, not state derived from props/state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const toggleStatus = async (member: Member, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (statusOf(member) === "Active") {
        await adminService.suspendUser(member.id);
        toast.success(`${displayName(member)} suspended.`);
      } else {
        await adminService.activateUser(member.id);
        toast.success(`${displayName(member)} activated.`);
      }
      load();
    } catch {
      toast.error("Couldn't update this user. Try again.");
    }
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] mt-6 p-4 md:p-6">
      {isLoading ? (
        <p className="py-10 text-center text-sm text-[#8B716A]">Loading users…</p>
      ) : loadError ? (
        <AdminConnectionError label="the user directory" />
      ) : members.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#8B716A]">No users found.</p>
      ) : (
        <>
          {/* ===== Mobile: Cards ===== */}
          <div className="md:hidden space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelect(member)}
                className="border border-[#DCCFC0] rounded-xl p-4 flex flex-col gap-3 active:bg-[#EDE0D2]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#DCCFC0] shrink-0" />
                    <div>
                      <p className="font-medium text-[#2B2622] text-sm">{displayName(member)}</p>
                      <p className="text-xs text-[#8B716A]">{member.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleStatus(member, e)}
                    className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-2.5 py-1 text-[#2B2622] hover:bg-[#EDE0D2] shrink-0"
                  >
                    {statusOf(member) === "Active" ? "Suspend" : "Activate"}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[statusOf(member)]}`}>
                    {statusOf(member)}
                  </span>
                  <span className="text-[#2B2622]">{member.role}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8B716A] border-t border-[#DCCFC0] pt-3">
                  <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Desktop: Table ===== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="text-left text-[#8B7E72] text-xs uppercase tracking-wide">
                <tr>
                  <th className="pb-4">User Identity</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Join Date</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => onSelect(member)}
                    className="border-t border-[#DCCFC0] cursor-pointer hover:bg-[#EDE0D2]"
                  >
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#DCCFC0]" />
                      <div>
                        <p className="font-medium text-[#2B2622]">{displayName(member)}</p>
                        <p className="text-sm text-[#8B716A]">{member.email}</p>
                      </div>
                    </td>

                    <td>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[statusOf(member)]}`}>
                        {statusOf(member)}
                      </span>
                    </td>

                    <td className="text-[#2B2622]">{member.role}</td>

                    <td className="text-[#8B716A]">{new Date(member.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button
                        onClick={(e) => toggleStatus(member, e)}
                        className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-3 py-1.5 text-[#2B2622] hover:bg-[#EDE0D2]"
                      >
                        {statusOf(member) === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
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
