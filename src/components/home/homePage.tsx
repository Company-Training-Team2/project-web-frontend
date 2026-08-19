"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart, Bell, Search, MapPin,
  ShieldCheck, Headphones, CreditCard, Lock, Star, ArrowRight,
  Share, Info
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { platformService, PlatformStats } from "@/services/platform.service";
import { searchVendors } from "@/services/vendor.service";
import { homeService, HomeDashboard } from "@/services/home.service";
import SampleDataNotice from "@/components/shared/SampleDataNotice";
import MobileNavDrawer from "@/components/shared/MobileNavDrawer";
import BottomNav from "@/components/shared/BottomNav";
import { MAIN_NAV_LINKS } from "@/components/shared/mainNavLinks";
import { MockVendor } from "@/lib/mock/types";
import { notifyLoginRequired } from "@/lib/authToast";

// --- بيانات وهمية للتصميم (تم تحديث روابط الصور لضمان ظهورها) ---

const occasions = [
  { name: "Weddings", categoryId: "venue", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
  { name: "Corporate Galas", categoryId: "planning", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
  { name: "Private Dining", categoryId: "catering", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" },
  { name: "Decor & Florals", categoryId: "florals", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
];

// Fallback stock photos used when a real WorkPost has no uploaded image yet.
const FALLBACK_VENDOR_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
];

const packages = [
  { name: "Intimate", price: "8,500", guests: "Up to 50 Guests", features: ["Curated vendor shortlist", "Concierge messaging", "Standard contracts"], highlighted: false },
  { name: "Signature", price: "24,000", guests: "Up to 150 Guests", features: ["Dedicated event planner", "Priority vendor access", "Full design direction", "24/7 concierge line"], highlighted: true },
  { name: "Grand Estate", price: "60,000+", guests: "300+ Guests", features: ["White-glove production", "Bespoke vendor sourcing", "On-site day coordination", "Guest logistics suite"], highlighted: false },
];

const testimonials = [
  { name: "Amara Okonkwo", event: "Wedding · Lake Como", quote: "EventHub turned a daunting to-do list into pure delight. Our concierge anticipated needs we didn't know we had.", img: "https://i.pravatar.cc/150?img=47" },
  { name: "Julian Alvarez", event: "Gala Dinner · Barcelona", quote: "The vendors were exceptional and the booking felt effortless. It genuinely felt like a private members' club.", img: "https://i.pravatar.cc/150?img=59" },
];

export default function LandingPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [vendors, setVendors] = useState<MockVendor[]>([]);
  const [keyword, setKeyword] = useState("");
  const [dashboard, setDashboard] = useState<HomeDashboard | null>(null);

  useEffect(() => {
    platformService
      .getStats()
      .then(setStats)
      .catch(() => setStats(null)); // public endpoint down (e.g. DB unreachable) — hero/stats just fall back to copy below
    searchVendors({ pageSize: 3 })
      .then((result) => setVendors(result.vendors))
      .catch(() => setVendors([]));
  }, []);

  // Personalized strip for signed-in customers — GET /api/home/dashboard.
  // Guests (and vendors/admins, who have no CustomerProfile) never call
  // this, and any failure (backend down, profile incomplete) just hides it
  // rather than breaking the public landing page underneath it.
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "customer") {
      // Clears a previous user's dashboard on logout rather than leaving it
      // stale on screen — not deriving render state, syncing to auth state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDashboard(null);
      return;
    }
    homeService
      .getDashboard()
      .then(setDashboard)
      .catch(() => setDashboard(null));
  }, [isAuthenticated, user?.role]);

  // The nav (mainNavLinks.ts) links to /home#packages etc. from OTHER
  // pages now, not just same-page anchor clicks. On a fresh cross-page
  // navigation the target element (getElementById confirms it's there,
  // correctly positioned) exists well before this fires, yet the page
  // still sits at scrollY 0 — Next.js App Router's own post-navigation
  // scroll-restoration resets to the top *after* mount, racing (and
  // beating) a same-tick/rAF scroll attempt. A short delay lets that
  // restoration finish first so our scroll isn't the one that gets
  // overridden; retrying on an interval (cleared once it succeeds) makes
  // this resilient to exactly how long that race turns out to be instead
  // of guessing a single magic delay.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      const el = document.getElementById(id);
      if (el && window.scrollY < 10) {
        el.scrollIntoView({ behavior: "instant" });
      }
      if (attempts >= 10 || (el && window.scrollY > 10)) {
        clearInterval(timer);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    router.push(`/vendors/search${params.toString() ? `?${params}` : ""}`);
  };

  return (
    // pb-20 reserves room for the fixed BottomNav below lg: (it hides at
    // lg:, same cutoff as the desktop nav row above) so the footer isn't
    // covered on phones/tablets.
    <div className="min-h-screen bg-[#F5F0EB] text-[#1A1A1A] selection:bg-[#A3391C] selection:text-white font-sans pb-20 lg:pb-0">

      {/* --- 1. HEADER --- */}
      <header className="sticky top-0 z-50 border-b border-[#E3DCD2] bg-[#F5F0EB]/90 px-4 py-4 backdrop-blur-md sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-3">
            {/* Hamburger — opens the same links as the desktop nav row below,
                since that <nav> is hidden below lg:. Sits before the logo
                rather than with the action icons on the right. */}
            <MobileNavDrawer />
            <Link href="/home" className="font-serif text-xl font-bold tracking-tight text-[#A3391C] sm:text-2xl lg:text-3xl">
              EventHub
            </Link>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#5A524A] transition-colors hover:text-[#A3391C]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
  {/* Heart Icon — guests go straight to /login instead of bouncing through
      /favorites first (that page redirects them there anyway via
      useRequireAuth, but skipping the detour avoids the flash-then-redirect).
      A plain href wouldn't run the toast before the route changes, so this
      one click is intercepted to show it first. */}
    <Link
      href={isAuthenticated ? "/favorites" : "/login?redirect=/favorites"}
      onClick={(e) => {
        if (isAuthenticated) return;
        e.preventDefault();
        notifyLoginRequired();
        router.push("/login?redirect=/favorites");
      }}
      className="text-[#5A524A] hover:text-[#A3391C] transition-colors"
    >
    <Heart className="h-5 w-5" />
    </Link>

  {/* 🔵 NEW BELL LINK TO NOTIFICATIONS */}
    <Link href="/notifications" className="text-[#5A524A] hover:text-[#A3391C] transition-colors">
    <Bell className="h-5 w-5" />
    </Link>

    {isAuthenticated ? (
      <Link
        href="/profile"
        aria-label="Account"
        className="grid size-8 shrink-0 place-items-center rounded-full bg-[#A3391C] text-xs font-bold text-white"
      >
        {user?.name?.[0]?.toUpperCase() ?? "U"}
      </Link>
    ) : (
      <Link href="/login" className="whitespace-nowrap text-sm font-bold text-[#5A524A] hover:text-[#A3391C]">
        Sign In
      </Link>
    )}
    {/* Secondary CTA — hidden below sm: to keep the mobile header on one
        row; still reachable via /register-option's own vendor path. */}
    <Link href="/register-option" className="ml-1 hidden shrink-0 rounded-md bg-[#A3391C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#8B2E17] sm:ml-2 sm:inline-block">
        Partner with Us
    </Link>
        </div>
        </div>
      </header>

      {/* --- Personalized strip (signed-in customers only) --- */}
      {dashboard ? (
        <div className="bg-[#2F4A3E] px-6 py-3 text-white md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-sm">
              Welcome back, <span className="font-bold">{dashboard.customerName}</span>
              {dashboard.nextEvent ? (
                <>
                  {" "}
                  — your next event, <span className="font-bold">{dashboard.nextEvent.name}</span>, is in{" "}
                  {dashboard.nextEvent.daysRemaining} day{dashboard.nextEvent.daysRemaining === 1 ? "" : "s"}.
                </>
              ) : (
                " — no upcoming events yet."
              )}
            </p>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
              <Link href="/event/list" className="hover:underline">
                My Events
              </Link>
              <Link href="/messages" className="hover:underline">
                Messages
              </Link>
              <Link href="/bookings" className="hover:underline">
                {dashboard.pendingBookingsCount + dashboard.confirmedBookingsCount} Bookings
              </Link>
              <Link href="/favorites" className="hover:underline">
                {dashboard.favoritesCount} Favorites
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* --- 2. HERO SECTION --- */}
      <section className="relative h-[85vh] min-h-[650px] w-full">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80" alt="Luxury Event" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8B088]">The Art of Celebration</span>
          <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight md:text-[64px] md:leading-[1.1]">
            Extraordinary events, curated <br /> with intention.
          </h1>
          
          {/* Search Bar — wired to the real GET /workposts/search flow via /vendors/search */}
          <div className="mt-12 flex w-full max-w-4xl flex-col items-center rounded-xl bg-white p-3 shadow-2xl md:flex-row md:p-2">
            <div className="flex w-full flex-1 items-center gap-3 border-b border-[#E3DCD2] px-4 py-3 md:border-b-0 md:border-r">
              <MapPin className="h-5 w-5 text-[#A3391C]" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Vendor, city, or event type"
                className="w-full bg-transparent text-sm font-medium text-[#1A1A1A] placeholder:text-[#8A827A] outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A3391C] px-6 py-3 font-bold text-white transition hover:bg-[#8B2E17] md:mt-0 md:w-auto md:rounded-md"
            >
              Search Vendors <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- 3. STATS BAR --- real numbers from GET /api/platform/stats (public);
           falls back to illustrative marketing copy if the backend/DB is
           unreachable, so the section never shows a broken zero. */}
      <section className="bg-[#EBE5DB] py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 text-center md:grid-cols-4">
          <div><span className="font-serif text-4xl font-bold text-[#2F4A3E]">24/7</span><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Concierge</p></div>
          <div>
            <span className="font-serif text-4xl font-bold text-[#2F4A3E]">
              {stats ? `${stats.averagePlatformRating.toFixed(1)}★` : "98%"}
            </span>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">{stats ? "Avg. Rating" : "Satisfaction"}</p>
          </div>
          <div>
            <span className="font-serif text-4xl font-bold text-[#2F4A3E]">
              {stats ? stats.totalCompletedBookings.toLocaleString() : "10K+"}
            </span>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Bookings</p>
          </div>
          <div>
            <span className="font-serif text-4xl font-bold text-[#2F4A3E]">
              {stats ? stats.totalVendors.toLocaleString() : "2,500+"}
            </span>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Verified Vendors</p>
          </div>
        </div>
      </section>

      {/* --- 4. OCCASIONS --- category tiles route into the real, live
           GET /workposts/search flow via /vendors/search?category=... */}
      <section id="occasions" className="bg-[#F5F0EB] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between md:flex-row md:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3391C]">Curated Categories</span>
              <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Occasions worth remembering</h2>
            </div>
            <Link href="/vendors" className="mt-4 flex items-center gap-1 text-sm font-bold text-[#1A1A1A] hover:underline md:mt-0">Explore all categories <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((item) => (
              <Link
                key={item.name}
                href={`/vendors/search?category=${item.categoryId}`}
                className="group relative h-[320px] overflow-hidden rounded-2xl"
              >
                <img src={item.img} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="mt-1 text-xs font-light text-white/80">Browse vendors</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FEATURED VENDORS --- */}
      <section className="bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3391C]">Handpicked Talent</span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Featured vendors</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#5A524A]">Every vendor is vetted through a rigorous 40-point quality curation process before joining EventHub, ensuring only the finest artisans serve your vision.</p>
            {vendors.length > 0 && !/^\d+$/.test(vendors[0].id) ? <SampleDataNotice className="mt-3" /> : null}
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {(vendors.length > 0 ? vendors : []).map((vendor, i) => (
              <Link
                key={vendor.id}
                href={`/vendors/${vendor.id}`}
                className="rounded-2xl border border-[#E3DCD2] bg-white p-4 pb-6 transition hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden rounded-xl">
                  <img
                    src={vendor.images[0] ?? FALLBACK_VENDOR_IMAGES[i % FALLBACK_VENDOR_IMAGES.length]}
                    alt={vendor.businessName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold shadow-sm">
                     <Star className="h-3 w-3 fill-[#D4A24C] text-[#D4A24C]" /> {vendor.rating.toFixed(1)}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A3391C]">{vendor.categoryId}</p>
                  <h3 className="mt-1 text-xl font-bold text-[#1A1A1A]">{vendor.businessName}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#5A524A]"><MapPin className="h-3 w-3" /> {vendor.city}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#E3DCD2] pt-4">
                    <span className="rounded border border-[#A3391C] px-4 py-1.5 text-xs font-bold uppercase text-[#A3391C] transition hover:bg-[#A3391C] hover:text-white">View profile</span>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#5A524A]">From</p>
                      <p className="font-serif text-2xl font-bold text-[#A3391C]">${vendor.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. TRUST SECTION --- */}
      <section className="bg-[#EBE5DB] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#F5F0EB] shadow-sm lg:flex">
          <div className="relative lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" alt="Trust" className="h-80 w-full object-cover grayscale lg:h-full" />
            {/* Floating Card */}
            <div className="absolute -bottom-6 left-1/2 w-40 -translate-x-1/2 rounded-xl bg-white p-4 text-center shadow-xl lg:left-10 lg:-bottom-10 lg:w-48 lg:-translate-x-0">
               <p className="font-serif text-4xl font-bold text-[#A3391C] lg:text-5xl">98%</p>
               <p className="mt-1 text-[9px] font-medium leading-tight text-[#1A1A1A] lg:text-[10px]">of clients rebook<br/>with EventHub</p>
            </div>
          </div>
          
          <div className="p-10 lg:w-1/2 lg:p-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3391C]">Why EventHub</span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A] lg:text-5xl">A marketplace built on <br/> trust</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5A524A]">We obsess over the details so you can savour the moment. Every element of EventHub is engineered for confidence, transparency, and quiet luxury.</p>
            
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                 <ShieldCheck className="mt-1 h-5 w-5 text-[#2F4A3E]" />
                 <div><p className="text-sm font-bold text-[#1A1A1A]">Handpicked & Verified</p><p className="text-[10px] text-[#5A524A]">Each vendor passes a 40-point quality review.</p></div>
              </div>
              <div className="flex items-start gap-3">
                 <Headphones className="mt-1 h-5 w-5 text-[#2F4A3E]" />
                 <div><p className="text-sm font-bold text-[#1A1A1A]">Dedicated Concierge</p><p className="text-[10px] text-[#5A524A]">A personal planner available around the clock.</p></div>
              </div>
              <div className="flex items-start gap-3">
                 <CreditCard className="mt-1 h-5 w-5 text-[#2F4A3E]" />
                 <div><p className="text-sm font-bold text-[#1A1A1A]">Transparent Pricing</p><p className="text-[10px] text-[#5A524A]">No hidden fees—ever, from quote to final booking.</p></div>
              </div>
              <div className="flex items-start gap-3">
                 <Lock className="mt-1 h-5 w-5 text-[#2F4A3E]" />
                 <div><p className="text-sm font-bold text-[#1A1A1A]">Secure Booking</p><p className="text-[10px] text-[#5A524A]">Protected payments and guaranteed contracts.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. PREMIUM PACKAGES --- */}
      <section id="packages" className="bg-[#1D2824] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Signature Experiences</span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">Premium packages</h2>
          
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div 
                key={pkg.name} 
                className={`relative flex flex-col rounded-2xl p-8 text-left transition hover:-translate-y-1 ${
                  pkg.highlighted 
                    ? "bg-[#A3391C] text-white shadow-xl" 
                    : "bg-white text-[#1A1A1A]"
                }`}
              >
                {pkg.highlighted && <div className="absolute -top-3 right-6 rounded bg-[#2F4A3E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Most Loved</div>}
                
                <h3 className={`font-serif text-3xl font-bold ${pkg.highlighted ? 'text-white' : 'text-[#1A1A1A]'}`}>{pkg.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-serif text-2xl font-bold text-[#A3391C]">${pkg.price}</span>
                </div>
                <p className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${pkg.highlighted ? 'text-white/60' : 'text-[#5A524A]'}`}>{pkg.guests}</p>
                
                <ul className="mt-6 space-y-3 text-sm">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span className="mt-1.5">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`mt-8 w-full rounded border py-3 text-xs font-bold uppercase tracking-wider transition ${
                    pkg.highlighted
                      ? "border-white bg-white text-[#A3391C] hover:bg-opacity-90"
                      : "border-[#A3391C] text-[#A3391C] hover:bg-[#A3391C] hover:text-white"
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 8. TESTIMONIALS --- */}
      <section id="testimonials" className="bg-[#F5F0EB] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3391C]">In Their Words</span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Loved by hosts</h2>
          
          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            {testimonials.map((test) => (
              <div key={test.name} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex gap-1 text-[#A87C41]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 font-serif text-lg italic leading-relaxed text-[#1A1A1A]">&ldquo;{test.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={test.img} alt={test.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1A1A]">{test.name}</p>
                    <p className="text-[11px] text-[#5A524A]">{test.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 9. CTA BANNER --- */}
      <section className="bg-[#A3391C] px-6 py-24 text-center md:px-12">
        <div className="mx-auto max-w-4xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Begin the story</span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-white md:text-6xl">Let&apos;s create something <br/> unforgettable together</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">Tell us about your occasion and your concierge will curate a bespoke shortlist within 24 hours.</p>
          <button className="mt-8 rounded bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#A3391C] transition hover:bg-gray-100">Start planning — it&apos;s free</button>
        </div>
      </section>

      {/* --- 10. FOOTER --- */}
      <footer className="bg-[#EBE5DB] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl border-b border-[#D6CDC1] pb-10 lg:flex lg:justify-between">
           <div className="max-w-sm">
             <Link href="/home" className="font-serif text-3xl font-bold tracking-tight text-[#A3391C]">EventHub</Link>
             <p className="mt-4 text-xs leading-relaxed text-[#5A524A]">The curated marketplace for extraordinary events — connecting discerning hosts with the world&apos;s finest vendors.</p>
           </div>
           
           <div className="mt-10 grid grid-cols-2 gap-10 lg:mt-0 lg:gap-20">
             <div>
               <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Support</p>
               <ul className="mt-4 space-y-2 text-xs text-[#5A524A]">
                 <li><Link href="#" className="hover:text-[#A3391C]">Help Center</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Concierge</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Contact</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Trust & Safety</Link></li>
               </ul>
             </div>
             <div>
               <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Company</p>
               <ul className="mt-4 space-y-2 text-xs text-[#5A524A]">
                 <li><Link href="#" className="hover:text-[#A3391C]">About Us</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Careers</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Press</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Journal</Link></li>
               </ul>
             </div>
             <div>
               <p className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Marketplace</p>
               <ul className="mt-4 space-y-2 text-xs text-[#5A524A]">
                 <li><Link href="#" className="hover:text-[#A3391C]">Browse Vendors</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Categories</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Premium Packages</Link></li>
                 <li><Link href="#" className="hover:text-[#A3391C]">Gift Cards</Link></li>
               </ul>
             </div>
           </div>
        </div>
        
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-6 text-xs text-[#5A524A] lg:flex-row">
           <p>© 2026 EventHub Luxury Marketplace. All rights reserved.</p>
           <div className="flex gap-6">
             <Link href="#" className="hover:text-[#A3391C]">Privacy Policy</Link>
             <Link href="#" className="hover:text-[#A3391C]">Terms of Service</Link>
             <Link href="#" className="hover:text-[#A3391C]">Vendor Portal</Link>
           </div>
           <div className="flex gap-3">
             <button className="rounded-full bg-white p-2 shadow-sm"><Share className="h-4 w-4" /></button>
             <button className="rounded-full bg-white p-2 shadow-sm"><Info className="h-4 w-4" /></button>
           </div>
        </div>
      </footer>

      <BottomNav active="home" />
    </div>
  );
}