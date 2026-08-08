"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import UserManagementHeader from "@/components/admin/users/UserManagementHeader";
import UsersTable, { Member } from "@/components/admin/users/UsersTable";
import MemberProfilePanel from "@/components/admin/users/MemberProfilePanel";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";

export default function UsersPage() {
  useRequireAdminAuth();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Search members, roles..." />
        <UserManagementHeader />

        <div className="flex flex-col lg:flex-row gap-6 items-start min-w-0">
          <div className="flex-1 w-full min-w-0">
            <UsersTable key={refreshKey} onSelect={setSelectedMember} />
          </div>

          {selectedMember && (
            <div className="w-full lg:w-80 shrink-0">
              <MemberProfilePanel
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                onChanged={() => setRefreshKey((k) => k + 1)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
