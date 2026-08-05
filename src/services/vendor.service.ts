// Intentionally left as a stub. There is no WorkPostController, VendorController,
// or CategoryController on the backend yet — no public browse/search/vendor-
// details endpoint exists to call. Every vendor-browsing page in this pass
// reads from src/lib/mock/vendors.ts fixtures instead.
//
// When a real endpoint exists, add methods here following the same
// convention as src/services/auth.service.ts (typed payload/response
// interfaces, a getVendorErrorMessage helper, then a `vendorService` object
// of async methods calling `apiClient`) — do not reshape the mock fixture
// types casually, since src/lib/mock/types.ts was deliberately named to
// mirror the real WorkPost/VendorProfile entity fields for an easy swap.

export {};
