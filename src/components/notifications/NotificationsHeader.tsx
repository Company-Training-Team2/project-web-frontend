"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotificationsHeader({
  unreadCount,
  onMarkAllRead,
}: {
  unreadCount: number;
  onMarkAllRead: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b border-[#e5ded2] bg-[#faf6f0] px-5 py-4 lg:px-10">
      <button onClick={() => router.back()} aria-label="Back" className="text-[#252323]">
        <ArrowLeft className="size-5" />
      </button>
      <div className="text-center">
        <h1 className="font-serif text-[20px] font-bold text-[#252323]">Notifications</h1>
        {unreadCount > 0 ? (
          <p className="text-[12px] text-[#af3718]">{unreadCount} unread</p>
        ) : null}
      </div>
      <button
        onClick={onMarkAllRead}
        disabled={unreadCount === 0}
        className="text-[12px] font-bold text-[#af3718] hover:underline disabled:opacity-40"
      >
        Mark all read
      </button>
    </div>
  );
}
