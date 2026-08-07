// Shared checkout pricing math — used by OrderSummaryBlock (Checkout) and
// ConfirmationCard (Payment Success) so the total a customer sees at
// checkout is the exact same number they see on the confirmation screen.
// Not real invoicing logic (no backend PaymentController exists), just a
// consistent mock formula: guests × package price + a flat services add-on,
// then tax on top of both.
export interface OrderTotal {
  servicePrice: number;
  additionalServices: number;
  taxes: number;
  total: number;
}

export function calculateOrderTotal(
  guestCount: number,
  pricePerGuest: number,
  additionalServices = 1890,
  taxRate = 0.14
): OrderTotal {
  const servicePrice = guestCount * pricePerGuest;
  const taxes = Math.round((servicePrice + additionalServices) * taxRate);
  return {
    servicePrice,
    additionalServices,
    taxes,
    total: servicePrice + additionalServices + taxes,
  };
}
