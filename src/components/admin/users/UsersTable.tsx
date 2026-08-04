"use client";

import { MoreVertical } from "lucide-react";

export type Member = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Suspended";
  membership: "Executive" | "Standard" | "Premium";
  bookings: number;
  joinDate: string;
  avatar?: string;
};

const members: Member[] = [
  {
    id: "1",
    name: "Elena Moretti",
    email: "elena.m@vogueevents.com",
    status: "Active",
    membership: "Executive",
    bookings: 142,
    joinDate: "Oct 12, 2021",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@athenalux.io",
    status: "Pending",
    membership: "Standard",
    bookings: 12,
    joinDate: "Jan 05, 2024",
  },
  {
    id: "3",
    name: "Sienna Blake",
    email: "sienna@blakeandco.design",
    status: "Active",
    membership: "Premium",
    bookings: 58,
    joinDate: "May 19, 2022",
  },
  {
    id: "4",
    name: "Arthur Sterling",
    email: "a.sterling@capital-events.uk",
    status: "Suspended",
    membership: "Executive",
    bookings: 204,
    joinDate: "Feb 28, 2019",
  },
];

const statusStyles: Record<Member["status"], string> = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Suspended: "bg-red-100 text-red-700",
};

const membershipStyles: Record<Member["membership"], string> = {
  Executive: "text-gray-700",
  Standard: "text-gray-700",
  Premium: "text-[#C95B2B] font-semibold",
};

export default function UsersTable({
  onSelect,
}: {
  onSelect: (member: Member) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm mt-6 p-4 md:p-6">
      {/* ===== Mobile: Cards ===== */}
      <div className="md:hidden space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            onClick={() => onSelect(member)}
            className="border rounded-xl p-4 flex flex-col gap-3 active:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>

              <button
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[member.status]}`}
              >
                {member.status}
              </span>
              <span className={membershipStyles[member.membership]}>
                {member.membership}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
              <span>{member.bookings} bookings</span>
              <span>Joined {member.joinDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Desktop: Table ===== */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="text-left text-gray-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="pb-4">User Identity</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Membership</th>
              <th className="pb-4">Bookings</th>
              <th className="pb-4">Join Date</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                onClick={() => onSelect(member)}
                className="border-t cursor-pointer hover:bg-gray-50"
              >
                <td className="py-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-300" />
                  <div>
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </td>

                <td>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[member.status]}`}
                  >
                    {member.status}
                  </span>
                </td>

                <td className={membershipStyles[member.membership]}>
                  {member.membership}
                </td>

                <td>{member.bookings}</td>

                <td>{member.joinDate}</td>

                <td>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 text-sm text-gray-500">
        <span>Showing 1 to 4 of 1,240 members</span>

        <div className="flex items-center gap-2">
          <button className="px-2 py-1 rounded hover:bg-gray-100">‹</button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-lg ${
                n === 1
                  ? "bg-[#1B2421] text-white"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {n}
            </button>
          ))}
          <button className="px-2 py-1 rounded hover:bg-gray-100">›</button>
        </div>
      </div>
    </div>
  );
}