"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  adminService,
  AdminPaymentLedgerItemDto,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  getAdminErrorMessage,
} from "@/services/admin.service";
import AdminConnectionError from "@/components/admin/AdminConnectionError";

const STATUS_FILTERS = ["All", "Pending", "Paid", "Failed", "Refunded"] as const;

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Paid: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
  Refunded: "bg-[#EDE0D2] text-[#8B716A]",
};

// Real, callable endpoints — GET /api/admin/payments (Global Payment
// Ledger) and POST /api/admin/payments/{id}/refund.
export default function PaymentLedgerTable({ onChanged }: { onChanged?: () => void }) {
  const [items, setItems] = useState<AdminPaymentLedgerItemDto[]>([]);
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [refundingId, setRefundingId] = useState<number | null>(null);

  const load = () => {
    setIsLoading(true);
    setLoadError(false);
    adminService
      .getPaymentLedger(status === "All" ? undefined : status, page, 20)
      .then(setItems)
      .catch(() => setLoadError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // Refetch whenever the filter/page changes — not derived render state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  const handleRefund = async (paymentId: number) => {
    if (!window.confirm("Issue a refund for this payment? This cannot be undone.")) return;
    setRefundingId(paymentId);
    try {
      await adminService.refundPayment(paymentId);
      toast.success(`Payment #${paymentId} refunded.`);
      load();
      onChanged?.();
    } catch (error) {
      toast.error(getAdminErrorMessage(error, "Couldn't issue refund."));
    } finally {
      setRefundingId(null);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] mt-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-serif text-lg font-bold text-[#2B2622]">Payment Ledger</h2>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                status === s ? "bg-[#A3391C] text-white" : "border border-[#DCCFC0] text-[#2B2622] hover:bg-[#EDE0D2]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <p className="py-10 text-center text-sm text-[#8B716A]">Loading…</p>
        ) : loadError ? (
          <AdminConnectionError label="the payment ledger" />
        ) : items.length === 0 ? (
          <p className="py-10 text-center text-sm text-[#8B716A]">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="text-left text-[#8B7E72] text-xs uppercase tracking-wide">
                <tr>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Vendor</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const statusLabel = PAYMENT_STATUS_LABEL[item.status];
                  return (
                    <tr key={item.paymentId} className="border-t border-[#DCCFC0]">
                      <td className="py-3 text-[#2B2622]">#{item.paymentId}</td>
                      <td className="text-[#2B2622]">{item.customerName}</td>
                      <td className="text-[#2B2622]">{item.vendorName}</td>
                      <td className="text-[#2B2622] font-medium">EGP {item.amount.toLocaleString()}</td>
                      <td className="text-[#8B716A]">{PAYMENT_METHOD_LABEL[item.paymentMethod]}</td>
                      <td>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_STYLES[statusLabel]}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="text-[#8B716A]">{new Date(item.timestamp).toLocaleDateString()}</td>
                      <td>
                        {statusLabel === "Paid" ? (
                          <button
                            onClick={() => handleRefund(item.paymentId)}
                            disabled={refundingId === item.paymentId}
                            className="text-xs font-medium border border-[#DCCFC0] rounded-lg px-3 py-1.5 text-[#2B2622] hover:bg-[#EDE0D2] disabled:opacity-50"
                          >
                            {refundingId === item.paymentId ? "Refunding…" : "Refund"}
                          </button>
                        ) : (
                          <span className="text-xs text-[#8B7E72]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
          className="rounded-lg border border-[#DCCFC0] px-3 py-1.5 text-xs font-medium text-[#2B2622] hover:bg-[#EDE0D2] disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-xs text-[#8B716A]">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isLoading || items.length < 20}
          className="rounded-lg border border-[#DCCFC0] px-3 py-1.5 text-xs font-medium text-[#2B2622] hover:bg-[#EDE0D2] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
