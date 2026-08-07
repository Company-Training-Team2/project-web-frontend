"use client";

import { useEffect, useState } from "react";
import { BellOff, Loader2 } from "lucide-react";

import NotificationsHeader from "./NotificationsHeader";
import NotificationSection from "./NotificationSection";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { notificationsService, NotificationFeed } from "@/services/notifications.service";

/**
 * Real backend wiring — NotificationsController is genuinely live
 * (GET /notifications, PATCH /notifications/{id}/read), so this screen
 * fetches for real rather than reading a mock fixture. If the request fails
 * (backend not running, network error) it shows an explicit error state
 * instead of silently falling back to fake data — a stale/fake notification
 * feed would be actively misleading in a way a stale vendor listing isn't.
 */
export default function NotificationsScreen() {
  useRequireAuth();
  const [feed, setFeed] = useState<NotificationFeed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await notificationsService.getFeed();
      setFeed(data);
    } catch {
      setError("Couldn't load notifications. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // One-time fetch on mount — not derived state, a real network call.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleRead = async (id: number) => {
    if (!feed) return;
    // Optimistic update, then confirm with the server.
    const patch = (list: typeof feed.today) =>
      list.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setFeed({
      ...feed,
      today: patch(feed.today),
      yesterday: patch(feed.yesterday),
      earlier: patch(feed.earlier),
      unreadCount: Math.max(0, feed.unreadCount - 1),
    });
    try {
      await notificationsService.markAsRead(id);
    } catch {
      // Best-effort — leave the optimistic update in place rather than
      // reverting and flickering; a manual refresh will resync on failure.
    }
  };

  const handleMarkAllRead = async () => {
    if (!feed) return;
    const unread = [...feed.today, ...feed.yesterday, ...feed.earlier].filter((n) => !n.isRead);
    for (const n of unread) {
      await handleRead(n.id);
    }
  };

  const isEmpty =
    feed && feed.today.length === 0 && feed.yesterday.length === 0 && feed.earlier.length === 0;

  return (
    <div className="min-h-screen bg-[#f6f1ea] pb-10">
      <div className="mx-auto w-full max-w-2xl">
        <NotificationsHeader unreadCount={feed?.unreadCount ?? 0} onMarkAllRead={handleMarkAllRead} />

        <div className="space-y-6 px-4 pt-6 sm:px-5 lg:px-10">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-[#a79a90]">
              <Loader2 className="size-5 animate-spin" />
              Loading notifications…
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-[14px] text-[#af3718]">{error}</p>
              <button onClick={load} className="text-[13px] font-bold text-[#af3718] hover:underline">
                Try again
              </button>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center text-[#a79a90]">
              <BellOff className="size-8" />
              <p className="text-[14px]">You&apos;re all caught up — no notifications yet.</p>
            </div>
          ) : feed ? (
            <>
              <NotificationSection label="Today" notifications={feed.today} onRead={handleRead} />
              <NotificationSection label="Yesterday" notifications={feed.yesterday} onRead={handleRead} />
              <NotificationSection label="Earlier" notifications={feed.earlier} onRead={handleRead} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
