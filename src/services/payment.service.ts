// Real, callable endpoints — PaymentsController is genuinely live
// (POST /payments/checkout/{bookingId}, GET /payments/my, GET /payments/
// {bookingId}, GET/POST /payments/methods, DELETE /payments/methods/{id}).
// It existed fully built on the backend (Paymob checkout session creation +
// HMAC-verified webhook confirmation, see PaymentWebhookController) but had
// no frontend service at all — CheckoutScreen/PaymentSummaryCard/
// PaymentMethodsScreen all just simulated success or showed hardcoded data
// instead. Wired here for real.
//
// Note: checkout only works once Paymob credentials are actually configured
// (back-end/EventHub.API/appsettings.json's "Paymob" section — ApiKey/
// HmacSecret/IntegrationId/IframeId are empty out of the box). Until then,
// initiateCheckout() will reach the real endpoint and get a clear
// "Payment gateway error" back rather than silently pretending to succeed.
import apiClient from "@/lib/axios";

export type PaymentMethodType = "Cash" | "Visa" | "MasterCard" | "VodafoneCash" | "InstaPay" | "BankTransfer";
export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export interface PaymentDto {
  id: number;
  bookingId: number;
  grossAmount: number;
  commissionRateSnapshot: number;
  platformFeeAmount: number;
  vendorPayoutAmount: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paymentGateway?: string;
  paidAt?: string;
}

/// Result of POST /payments/checkout/{bookingId}.
export interface CheckoutResult {
  paymentId: number;
  bookingId: number;
  grossAmount: number;
  platformFeeAmount: number;
  vendorPayoutAmount: number;
  paymentStatus: PaymentStatus;
  /** Paymob iframe/unified checkout URL — redirect the browser here to pay. */
  checkoutUrl: string;
}

export interface SavedPaymentMethod {
  id: number;
  type: PaymentMethodType;
  maskedNumber: string;
  cardHolderName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface AddPaymentMethodPayload {
  type: PaymentMethodType;
  maskedNumber: string;
  cardHolderName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  gatewayToken?: string;
  isDefault?: boolean;
}

export function getPaymentErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return fallback;
}

export const paymentService = {
  /** Only valid once the booking is Accepted (vendor confirmed it) — the
   * backend rejects Pending/Completed/Cancelled/Rejected bookings with a
   * clear error message via getPaymentErrorMessage. */
  async initiateCheckout(bookingId: number): Promise<CheckoutResult> {
    const { data } = await apiClient.post<CheckoutResult>(`/payments/checkout/${bookingId}`);
    return data;
  },

  async getMyPayments(): Promise<PaymentDto[]> {
    const { data } = await apiClient.get<PaymentDto[]>("/payments/my");
    return data;
  },

  /** Returns null (not throws) when no Payment row exists yet for this
   * booking — e.g. a Pending booking nobody has paid for — since that's a
   * normal, expected state, not an error. */
  async getPaymentByBookingId(bookingId: number): Promise<PaymentDto | null> {
    try {
      const { data } = await apiClient.get<PaymentDto>(`/payments/${bookingId}`);
      return data;
    } catch {
      return null;
    }
  },

  async getMyPaymentMethods(): Promise<SavedPaymentMethod[]> {
    const { data } = await apiClient.get<SavedPaymentMethod[]>("/payments/methods");
    return data;
  },

  async addPaymentMethod(payload: AddPaymentMethodPayload): Promise<SavedPaymentMethod> {
    const { data } = await apiClient.post<SavedPaymentMethod>("/payments/methods", payload);
    return data;
  },

  async deletePaymentMethod(id: number): Promise<void> {
    await apiClient.delete(`/payments/methods/${id}`);
  },
};
