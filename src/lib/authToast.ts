import { toast } from "sonner";

/**
 * Shared copy for every "you need an account for this" redirect to /login —
 * the useRequireAuth/useRequireVendorAuth guards, and the manual mid-flow
 * gates (AI Planner send, Checkout pay, message-a-vendor). One string, one
 * place, so a guest sees the same friendly heads-up everywhere instead of
 * being silently bounced to /login with no explanation.
 */
export function notifyLoginRequired() {
  toast.info("Please log in first to continue.");
}
