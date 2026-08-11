"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { eventService, EventSummary } from "@/services/event.service";

/**
 * Every /event/* screen (dashboard, checklist, budget, timeline, documents,
 * expenses, vendors) needs to know *which* Event it's showing — the backend
 * supports many events per customer (GET /events returns an array), so
 * there's no single implicit "the event". Resolves it from `?id=` in the
 * URL; if that's missing, loads the customer's events and redirects to the
 * most recently created one. `status: "empty"` means the customer has no
 * events yet — callers should show a "create your first event" prompt
 * instead of erroring.
 */
export function useActiveEvent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");

  const [event, setEvent] = useState<EventSummary | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      setStatus("loading");
      try {
        if (idParam) {
          const found = await eventService.getEventById(Number(idParam));
          if (cancelled) return;
          if (found) {
            setEvent(found);
            setStatus("ready");
            return;
          }
          // Id in the URL doesn't resolve (wrong account, deleted, typo'd) —
          // fall through to picking the customer's own most recent event.
        }

        const events = await eventService.getMyEvents();
        if (cancelled) return;
        if (events.length === 0) {
          setEvent(null);
          setStatus("empty");
          return;
        }
        const mostRecent = events.slice().sort((a, b) => b.id - a.id)[0];
        setEvent(mostRecent);
        setStatus("ready");
        router.replace(`${pathname}?id=${mostRecent.id}`);
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idParam]);

  return { event, status };
}
