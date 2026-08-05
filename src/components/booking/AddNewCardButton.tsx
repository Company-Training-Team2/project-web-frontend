"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MockPayment } from "@/lib/mock/types";

// No real payment gateway is wired up — this appends a fixture-shaped card
// to local state only, purely for the UI flow.
export default function AddNewCardButton({ onAdd }: { onAdd: (card: MockPayment) => void }) {
  const [open, setOpen] = useState(false);
  const [last4, setLast4] = useState("");

  const handleAdd = () => {
    if (last4.length !== 4) return;
    onAdd({
      id: `pm-${Date.now()}`,
      paymentMethod: "Visa",
      cardBrand: "Visa",
      last4,
      expiry: "01/30",
      isDefault: false,
    });
    setLast4("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-dashed border-[#ded8d2] py-4 text-[14px] font-medium text-[#af3718]">
          <Plus className="size-4" />
          Add New Card
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new card</DialogTitle>
          <DialogDescription>Demo only — no real payment gateway is connected yet.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          <Input
            placeholder="Card number (last 4 digits)"
            maxLength={4}
            value={last4}
            onChange={(e) => setLast4(e.target.value.replace(/\D/g, ""))}
            className="h-11 rounded-[8px] border border-[#ded8d2]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} className="bg-[#af3718] hover:bg-[#9f3216]">
            Save Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
