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
  components/
    auth/         Login, Register (+ Vendor wizard), OTP, Forgot/Reset Password
    vendor/       Customer-facing vendor browsing (Browse, Search, Vendor Details)
    booking/      Reserve → Checkout → Success, My Bookings, Booking Details, Payment Methods
    ai-planner/   AI Planner chat UI
    admin/        Admin Dashboard, Analytics, Reports, User Management
    users/        Customer Profile / Edit Profile / Settings
    layout/       Sidebar (admin shell), Container
    shared/       Cross-cutting chrome: MarketplaceHeader/Footer, BottomNav, Logo, LoadingScreen, SparkleFab...
    ui/           Design-system primitives (button, input, calendar, dialog, tabs, textarea...)
  lib/
    mock/         Fixture data + types standing in for endpoints the backend doesn't have yet
    axios.ts      Configured API client
  services/       Typed API call wrappers (auth, booking, vendor, event)
  context/        AuthContext (session state)
  hooks/          useRequireAuth (client-side route gate)
```

## Routes

| Route | What it is | Status |
|---|---|---|
| `/login`, `/register`, `/register-option`, `/forgot-password`, `/otp`, `/reset-password` | Auth flow (customer + vendor) | ✅ |
| `/complete-profile` | Post-signup profile completion | ✅ |
| `/vendors` | Browse Vendors (customer) — **also** wraps the admin "Vendor Directory" inside `Sidebar`, see [Known issues](#known-issues) | ⚠️ |
| `/vendors/search` | Search Results (desktop-first, filters) | ✅ |
| `/vendors/[id]` | Vendor Details | ✅ |
| `/booking/reserve` → `/booking/checkout` → `/booking/success` | Booking wizard (date/guests/package → InstaPay checkout → confirmation) | ✅ |
| `/bookings`, `/bookings/[id]` | My Bookings list + detail | ✅ |
| `/payment-methods` | InstaPay connection management | ✅ |
| `/ai-planner` | AI Planner (scripted demo chat, no live model) | ✅ |
| `/profile`, `/profile/edit`, `/settings` | Customer profile & settings | ✅ |
| `/dashboard`, `/analytics`, `/admin/reports`, `/users` | Admin portal (executive Sidebar shell) | ✅ |
| `/terms`, `/privacy` | Placeholder legal pages | ✅ (stub copy) |
| `/` | Currently just renders the Login screen | ⚠️ no real Home page yet |

Not yet built anywhere in this repo: a real **Home** page, **Favorites**, **Notifications**, **Budget Overview/Planner**, **Booking History**, **Checklist/Timeline/Documents/Event Dashboard/My Events**, the vendor's own management panel (**Vendor Dashboard/Profile/Analytics/Services/Booking Requests/Availability/Approval/Directory/Messaging**), and **Admin Login/Admin Settings**.

## Architecture notes

- **Mock data layer** (`src/lib/mock/`): the backend has almost no public endpoints yet (no vendor search/details, no payments, no categories seed data), so vendor/booking/payment screens run entirely on typed fixtures. Field names deliberately mirror the real backend entities (`WorkPost`, `VendorProfile`, `Booking`, `Payment`) so swapping in real API calls later is a rename, not a redesign. `src/services/booking.service.ts` already has working methods against the real, live `BookingController` — just not called from any page yet.
- **Payment**: no real gateway is integrated. Checkout/Payment Methods mock a single connected **InstaPay** account (matches the real `PaymentMethod.InstaPay` backend enum value) — "Pay" just simulates a redirect-and-return round trip.
- **Booking draft state**: the Reserve → Checkout → Success wizard hands off `vendorId`/`packageId` via the URL and the in-progress selection via `sessionStorage` (`src/lib/mock/bookingDraft.ts`, `useBookingDraft()`). Reads it with `useState` + `useEffect` rather than `useSyncExternalStore` — the latter caused a real "Maximum update depth exceeded" loop in practice, see the comments in that file.
- **Auth gating**: no middleware; `useRequireAuth()` is a client-side redirect-to-`/login` guard used by every transactional page (booking flow, bookings, payment methods, AI planner). Browsing (`/vendors`, `/vendors/search`, `/vendors/[id]`) stays public.
- **Responsive strategy**: screens with only a mobile Figma frame get a centered max-width column above `lg:` rather than stretching edge-to-edge; the two desktop-only frames (Search Results, Booking Details) get a compact header + inline filters below `lg:` instead of no navigation at all.

## Known issues

- **`/vendors` route collision**: this URL currently serves the customer's mobile "Browse Vendors" page *wrapped inside* the admin executive Sidebar shell — the admin "Vendor Directory" link and the customer nav both point here. Needs to be split into two routes.
- **Post-login redirect**: `AuthContext.login()` sends users to `/vendors` (not `/`, which is just the Login screen) — update this once a real Home page exists.
- **Broken/mismatched links to sort out**: the admin Sidebar's "Settings" link opens the *customer* settings page, not an admin one; `components/users/profileSettings.tsx` and `settingsPage.tsx` link to several routes that don't exist yet (`/profile/saved-vendors`, `/profile/payment-methods` — the real page is `/payment-methods`, `/profile/notifications`, `/settings/security`, `/legal/*`, `/help`).

## Team split (for context)

Work here has been split roughly along:
- **Auth + Booking Flow + AI Planner + Splash/Loading** — fully built (this is the bulk of what's documented above as ✅).
- **Home Flow + Budget + Profile** — Profile/Settings shipped; Home/Favorites/Notifications/Budget/Booking History still open.
- **Vendor management panel + Admin** — Admin Dashboard/Analytics/Reports/User Management shipped; the vendor-side panel and Admin Login/Settings still open.
