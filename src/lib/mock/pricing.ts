// Shared checkout pricing math — used by OrderSummaryBlock (Checkout) and
// ConfirmationCard (Payment Success) so the total a customer sees at
// checkout is the exact same number they see on the confirmation screen.
// Not real invoicing logic (no backend PaymentController exists), just a
// consistent mock formula: flat package price + a flat services add-on,
// then tax on top of both.
//
// `price` is the package's one flat amount (see MockPackage's doc comment
// in lib/mock/types.ts) — it does not scale with guest count. This used to
// multiply it by guestCount, which is how a 25,000 EGP venue package
// turned into a 3,000,000 EGP total for 120 guests. guestCount is kept as
// a parameter (screens still want to display it) but no longer factors
// into the math.
export interface OrderTotal {
  servicePrice: number;
  additionalServices: number;
  taxes: number;
  total: number;
}

export function calculateOrderTotal(
  guestCount: number,
  price: number,
  additionalServices = 1890,
  taxRate = 0.14
): OrderTotal {
  const servicePrice = price;
  const taxes = Math.round((servicePrice + additionalServices) * taxRate);
  return {
    servicePrice,
    additionalServices,
    taxes,
    total: servicePrice + additionalServices + taxes,
  };
}
