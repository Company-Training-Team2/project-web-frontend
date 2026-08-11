"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { adminService, AdminConversationDto, AdminUserDto, getAdminErrorMessage } from "@/services/admin.service";

export default function NewConversationDialog({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (conversation: AdminConversationDto) => void;
}) {
  const [users, setUsers] = useState<AdminUserDto[] | null>(null);
  const [userId, setUserId] = useState<number | "">("");
  const [subject, setSubject] = useState("");
  const [initialMessage, setInitialMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    adminService
      .getUsers(undefined, false, 1, 100)
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  const handleSubmit = async () => {
    if (!userId || !subject.trim()) return;
    setIsSubmitting(true);
    try {
      const conversation = await adminService.createConversation({
        userId: Number(userId),
        subject: subject.trim(),
        initialMessage: initialMessage.trim() || undefined,
      });
      toast.success("Conversation started.");
      onCreated(conversation);
    } catch (error) {
      toast.error(getAdminErrorMessage(error, "Couldn't start conversation."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogDescription>Open a support thread with any platform user.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-[#2B2622]">User</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value ? Number(e.target.value) : "")}
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            >
              <option value="">{users === null ? "Loading users…" : "Select a user"}</option>
              {users?.map((u) => (
                <option key={u.id} value={u.id}>
                  {(u.fullName || u.businessName || u.email) + ` — ${u.role}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-[#2B2622]">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Payout delay"
              className="mt-1.5 h-11 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>

          <div>
            <label className="text-sm text-[#2B2622]">Opening message (optional)</label>
            <textarea
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-[#DCCFC0] bg-white px-3 py-2 text-sm outline-none focus:border-[#A3391C]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!userId || !subject.trim() || isSubmitting}
            className="rounded-xl bg-[#A3391C] hover:bg-[#8a2f16]"
          >
            {isSubmitting ? "Starting…" : "Start Conversation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
