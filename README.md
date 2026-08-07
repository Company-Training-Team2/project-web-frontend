# EventHub — Front-end

A luxury event-planning marketplace: customers browse and book vendors (venues, catering, florists, photographers…), vendors manage their listings, and admins run the platform. This is the Next.js front-end; it talks to a separate .NET backend (`../back-end`).

Design source of truth: [Figma — Event HUB](https://www.figma.com/design/O0vqB7ioPy0wNPb8Oa4QXM/Event-HUB).

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Radix UI primitives, `lucide-react` icons |
| Forms | `react-hook-form` + `zod` |
| Data fetching | `axios` (typed service layer) — `@tanstack/react-query` is installed but not wired up yet |
| Charts | `recharts` (admin analytics/reports) |
| Toasts | `sonner` |

> `AGENTS.md` in this folder is a reminder that this repo pins a customized Next.js build with breaking changes from the version most tooling assumes (e.g. `params`/`searchParams` are `Promise`s). Check `node_modules/next/dist/docs/` before assuming an API.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

### Backend connection

The API base URL comes from `NEXT_PUBLIC_API_URL` (see `src/config/env.ts`), defaulting to `http://localhost:5006/api` — point a `.env.local` at wherever the ASP.NET backend (`../back-end`) is actually running. Auth tokens are stored in `localStorage` (`token`, `refreshToken`, `user`) and attached by `src/lib/axios.ts`.

## Project structure

```
src/
  app/            Routes (App Router) — each page.tsx is thin, just composes components
    admin/        Every admin route lives here: dashboard, users, vendors, analytics, reports, settings, login
  components/
    auth/         Login, Register (+ Vendor wizard), OTP, Forgot/Reset Password
    vendor/       Customer-facing vendor browsing (Browse, Search, Vendor Details)
    booking/      Reserve → Checkout → Success, My Bookings, Booking Details, Payment Methods
    ai-planner/   AI Planner chat UI
    admin/        Admin Dashboard, Analytics, Reports, User Management, Settings, Vendor Directory, Login
    users/        Customer Profile / Edit Profile / Settings
    home/, favorites/, settings/  Home Flow screens (Home, Favorites, Notifications, Privacy & Security)
    layout/       Sidebar (admin shell), Container
    shared/       Cross-cutting chrome: MarketplaceHeader/Footer, BottomNav, Logo, LoadingScreen, SparkleFab...
    ui/           Design-system primitives (button, input, calendar, dialog, tabs, textarea...)
  lib/
    mock/         Fixture data + types standing in for endpoints the backend doesn't have yet
    axios.ts      Configured API client
  services/       Typed API call wrappers (auth, admin, booking, vendor, event)
  context/        AuthContext (session state)
  hooks/          useRequireAuth (customer routes), useRequireAdminAuth (admin routes)
```

## Routes

| Route | What it is | Status |
|---|---|---|
| `/login`, `/register`, `/register-option`, `/forgot-password`, `/otp`, `/reset-password` | Auth flow (customer + vendor) | ✅ |
| `/complete-profile` | Post-signup profile completion | ✅ |
| `/vendors` | Browse Vendors (customer only — the admin equivalent moved to `/admin/vendors`) | ✅ |
| `/vendors/search` | Search Results (desktop-first, filters) | ✅ |
| `/vendors/[id]` | Vendor Details | ✅ |
| `/booking/reserve` → `/booking/checkout` → `/booking/success` | Booking wizard (date/guests/package → InstaPay checkout → confirmation) | ✅ |
| `/bookings`, `/bookings/[id]` | My Bookings list + detail | ✅ |
| `/payment-methods` | InstaPay connection management | ✅ |
| `/ai-planner` | AI Planner (scripted demo chat, no live model) | ✅ |
| `/profile`, `/profile/edit`, `/settings`, `/settings/security` | Customer profile & settings | ✅ |
| `/home`, `/favorites`, `/notifications` | Home Flow | ✅ |
| `/admin/login` | Admin Portal login — **wired to the real backend** (`POST /auth/admin/login`; 2FA step calls the real `POST /auth/admin/mfa/verify`, which is itself still a backend stub) | ✅ |
| `/admin/dashboard`, `/admin/users`, `/admin/vendors`, `/admin/analytics`, `/admin/reports`, `/admin/settings` | Admin portal (executive `Sidebar` shell), gated by `useRequireAdminAuth` | ✅ |
| `/dashboard`, `/users`, `/analytics` | Legacy paths — permanent `redirect()` to their `/admin/*` equivalent | ↪️ redirect only |
| `/terms`, `/privacy` | Placeholder legal pages | ✅ (stub copy) |
| `/` | Currently just renders the Login screen | ⚠️ no real Home page routed at `/` yet — see `/home` |

Not yet built anywhere in this repo: **Budget Overview/Planner**, **Booking History**, **Checklist/Timeline/Documents/Event Dashboard/My Events**, and the vendor's own management panel (**Vendor Dashboard/Profile/Analytics/Services/Booking Requests/Availability Calendar/messaging** — not to be confused with `/admin/vendors`, which is the *admin's* vendor-approval queue, already built).

## Architecture notes

- **Mock data layer** (`src/lib/mock/`): the backend has almost no public endpoints yet (no vendor search/details, no payments, no categories seed data), so vendor/booking/payment screens run entirely on typed fixtures. Field names deliberately mirror the real backend entities (`WorkPost`, `VendorProfile`, `Booking`, `Payment`) so swapping in real API calls later is a rename, not a redesign. `src/services/booking.service.ts` and `admin.service.ts` already have working methods against the real, live `BookingController`/`AdminController` — just not called from any page yet (the admin vendor-approval queue needs richer fields — portfolio images, compliance docs, verification insights — than `AdminVendorDto` currently returns).
- **Payment**: no real gateway is integrated. Checkout/Payment Methods mock a single connected **InstaPay** account (matches the real `PaymentMethod.InstaPay` backend enum value) — "Pay" just simulates a redirect-and-return round trip.
- **Booking draft state**: the Reserve → Checkout → Success wizard hands off `vendorId`/`packageId` via the URL and the in-progress selection via `sessionStorage` (`src/lib/mock/bookingDraft.ts`, `useBookingDraft()`). Reads it with `useState` + `useEffect` rather than `useSyncExternalStore` — the latter caused a real "Maximum update depth exceeded" loop in practice, see the comments in that file.
- **Auth gating**: no middleware. `useRequireAuth()` guards customer transactional pages (booking flow, bookings, payment methods, AI planner), redirecting to `/login`. `useRequireAdminAuth()` guards every `/admin/*` page except `/admin/login` itself, checking `user.role === "admin"` and redirecting to `/admin/login`. Browsing (`/vendors`, `/vendors/search`, `/vendors/[id]`) stays public.
- **Responsive strategy**: screens with only a mobile Figma frame get a centered max-width column above `lg:` rather than stretching edge-to-edge; the two desktop-only frames (Search Results, Booking Details) get a compact header + inline filters below `lg:` instead of no navigation at all.

## Known issues

- **Post-login redirect**: `AuthContext.login()` sends users to `/vendors` (not `/`, which is just the Login screen) — update this once `/home` is wired as the real root.
- **Broken/mismatched links to sort out**: `components/users/profileSettings.tsx` links to `/profile/saved-vendors` and `/profile/payment-methods` (the real payment page is `/payment-methods`, no `/profile` prefix) and `/help`, none of which exist yet.
- **Admin MFA is a real call into a backend stub**: `/admin/login`'s 2FA step calls the genuine `POST /auth/admin/mfa/verify` endpoint, but per `AuthController.cs` that endpoint always replies "MFA verification not yet implemented" and never issues a token — an admin account with MFA enabled can authenticate step 1 but can't complete sign-in until the backend finishes this.
- **`/admin/login`'s background photo** is a CSS gradient stand-in (no real asset supplied yet) — same pattern as `/forgot-password`'s desktop view.

## Team split (for context)

Work here has been split roughly along:
- **Auth + Booking Flow + AI Planner + Splash/Loading** — fully built (this is the bulk of what's documented above as ✅).
- **Home Flow + Budget + Profile** — Home/Favorites/Notifications/Profile/Settings shipped; Budget Overview/Planner and Booking History still open.
- **Vendor management panel + Admin** — the full Admin portal shipped (Dashboard/Users/Vendor Directory/Analytics/Reports/Settings/Login, all under `/admin/*`); the *vendor's own* management panel (their dashboard/profile/services/etc., as opposed to the admin's view of vendors) still open.
