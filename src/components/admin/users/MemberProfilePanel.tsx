"use client";

import { X } from "lucide-react";
import type { Member } from "./UsersTable";

export default function MemberProfilePanel({
  member,
  onClose,
}: {
  member: Member | null;
  onClose: () => void;
}) {
  if (!member) return null;

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
    bg-white rounded-t-2xl lg:rounded-2xl shadow-sm p-6 h-fit
    z-50
  "
>
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <button className="text-xs font-medium border rounded-lg px-3 py-1.5 hover:bg-gray-50">
              Edit Profile
            </button>
            <button className="text-xs font-medium bg-red-50 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-100">
              Suspend
            </button>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-20 h-20 rounded-full bg-gray-300" />
          <h2 className="font-semibold text-lg mt-3">{member.name}</h2>
          <p className="text-sm text-gray-500">{member.email}</p>

          <span className="mt-2 text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {member.membership} Member
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-[#F6F1EB] rounded-xl p-3">
            <p className="text-xs text-gray-500">Lifetime Value</p>
            <p className="font-semibold mt-1">$124,500</p>
          </div>
          <div className="bg-[#F6F1EB] rounded-xl p-3">
            <p className="text-xs text-gray-500">Booking Freq.</p>
            <p className="font-semibold mt-1">4.2/mo</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
            Recent Activity
          </p>

          <ul className="space-y-3 text-sm">
            <li>
              <p className="text-gray-700">
                Booked The Grand Atrium for June 2025
              </p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </li>
            <li>
              <p className="text-gray-700">
                Opened &quot;Annual Planner Survey&quot; email
              </p>
              <p className="text-xs text-gray-400">Yesterday, 14:20</p>
            </li>
            <li>
              <p className="text-gray-700">Membership renewed automatically</p>
              <p className="text-xs text-gray-400">Oct 12, 2024</p>
            </li>
          </ul>
        </div>

        <button className="w-full bg-[#1B2421] text-white rounded-xl py-3 mt-6 font-medium hover:opacity-90">
          Send Direct Message
        </button>
      </aside>
    </>
  );
}