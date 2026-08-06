"use client";

import Link from "next/link";
import { 
  Heart, Bell, User, Search, MapPin, Calendar, ChevronDown, 
  ShieldCheck, Headphones, CreditCard, Lock, Star, ArrowRight,
  Share, Info 
} from "lucide-react";

// --- بيانات وهمية للتصميم (تم تحديث روابط الصور لضمان ظهورها) ---
const navLinks = [
  { name: "Marketplace", href: "#", active: true },
  { name: "Packages", href: "#" },
  { name: "Upcoming Events", href: "#" },
  { name: "How It Works", href: "#" },
  { name: "Testimonials", href: "#" },
];

const occasions = [
  { name: "Weddings", vendors: "740", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
  { name: "Corporate Galas", vendors: "512", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" },
  { name: "Private Dining", vendors: "386", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80" },
  { name: "Decor & Florals", vendors: "628", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" },
];

const featuredVendors = [
  { name: "Maison Lumière", role: "Photography", location: "Paris, France", price: "3,200", rating: "4.9", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { name: "Atelier Fleur", role: "Floral Design", location: "Milan, Italy", price: "1,800", rating: "4.8", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { name: "Savoré House", role: "Fine Dining", location: "Lisbon, Portugal", price: "120/guest", rating: "5.0", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" },
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
  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#1A1A1A] selection:bg-[#A3391C] selection:text-white font-sans">
      
      {/* --- 1. HEADER --- */}
      <header className="sticky top-0 z-50 border-b border-[#E3DCD2] bg-[#F5F0EB]/90 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-[#A3391C]">
            EventHub
          </Link>
          
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-[#A3391C] ${link.active ? "border-b-2 border-[#A3391C] pb-1 text-[#A3391C]" : "text-[#5A524A]"}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
  {/* Heart Icon */}
    <Link href="/favorites" className="text-[#5A524A] hover:text-[#A3391C] transition-colors">
    <Heart className="h-5 w-5" />
    </Link>

  {/* 🔵 NEW BELL LINK TO NOTIFICATIONS */}
    <Link href="/notifications" className="text-[#5A524A] hover:text-[#A3391C] transition-colors">
    <Bell className="h-5 w-5" />
    </Link>

    <button className="text-[#5A524A] hover:text-[#A3391C]"><User className="h-5 w-5" /></button>
    <Link href="/register-option" className="ml-2 rounded-md bg-[#A3391C] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#8B2E17]">
        Partner with Us
    </Link>
        </div>
        </div>
      </header>

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
          
          {/* Search Bar */}
          <div className="mt-12 flex w-full max-w-4xl flex-col items-center rounded-xl bg-white p-3 shadow-2xl md:flex-row md:p-2">
            <div className="flex w-full flex-1 items-center gap-3 border-b border-[#E3DCD2] px-4 py-3 md:border-b-0 md:border-r">
              <MapPin className="h-5 w-5 text-[#A3391C]" />
              <input type="text" placeholder="Where is your event?" className="w-full bg-transparent text-sm font-medium text-[#1A1A1A] placeholder:text-[#8A827A] outline-none" />
            </div>
            <div className="flex w-full flex-1 items-center gap-3 border-b border-[#E3DCD2] px-4 py-3 md:border-b-0 md:border-r">
              <Calendar className="h-5 w-5 text-[#A3391C]" />
              <input type="text" placeholder="Select Date" className="w-full bg-transparent text-sm font-medium text-[#1A1A1A] placeholder:text-[#8A827A] outline-none" />
            </div>
            <div className="flex w-full flex-1 items-center gap-3 px-4 py-3 md:border-r">
              <span className="text-sm font-medium text-[#1A1A1A]">Wedding</span>
              <ChevronDown className="ml-auto h-4 w-4 text-[#8A827A]" />
            </div>
            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A3391C] px-6 py-3 font-bold text-white transition hover:bg-[#8B2E17] md:mt-0 md:w-auto md:rounded-md">
              Search Vendors <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- 3. STATS BAR --- */}
      <section className="bg-[#EBE5DB] py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 text-center md:grid-cols-4">
          <div><span className="font-serif text-4xl font-bold text-[#2F4A3E]">24/7</span><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Concierge</p></div>
          <div><span className="font-serif text-4xl font-bold text-[#2F4A3E]">98%</span><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Satisfaction</p></div>
          <div><span className="font-serif text-4xl font-bold text-[#2F4A3E]">10K+</span><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Bookings</p></div>
          <div><span className="font-serif text-4xl font-bold text-[#2F4A3E]">2,500+</span><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5A524A]">Verified Vendors</p></div>
        </div>
      </section>

      {/* --- 4. OCCASIONS --- */}
      <section className="bg-[#F5F0EB] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-start justify-between md:flex-row md:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3391C]">Curated Categories</span>
              <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Occasions worth remembering</h2>
            </div>
            <Link href="#" className="mt-4 flex items-center gap-1 text-sm font-bold text-[#1A1A1A] hover:underline md:mt-0">Explore all categories <ArrowRight className="h-4 w-4" /></Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((item) => (
              <div key={item.name} className="group relative h-[320px] overflow-hidden rounded-2xl">
                {/* تم إصلاح الصور هنا */}
                <img src={item.img} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="mt-1 text-xs font-light text-white/80">{item.vendors} verified vendors</p>
                </div>
              </div>
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
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredVendors.map((vendor) => (
              <div key={vendor.name} className="rounded-2xl border border-[#E3DCD2] bg-white p-4 pb-6 transition hover:shadow-lg">
                <div className="relative h-56 w-full overflow-hidden rounded-xl">
                  {/* تم إصلاح الصور هنا */}
                  <img src={vendor.img} alt={vendor.name} className="h-full w-full object-cover" />
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold shadow-sm">
                     <Star className="h-3 w-3 fill-[#D4A24C] text-[#D4A24C]" /> {vendor.rating}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A3391C]">{vendor.role}</p>
                  <h3 className="mt-1 text-xl font-bold text-[#1A1A1A]">{vendor.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#5A524A]"><MapPin className="h-3 w-3" /> {vendor.location}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#E3DCD2] pt-4">
                    <button className="rounded border border-[#A3391C] px-4 py-1.5 text-xs font-bold uppercase text-[#A3391C] transition hover:bg-[#A3391C] hover:text-white">View profile</button>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#5A524A]">From</p>
                      <p className="font-serif text-2xl font-bold text-[#A3391C]">${vendor.price}</p>
                    </div>
                  </div>
                </div>
              </div>
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
      <section className="bg-[#1D2824] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Signature Experiences</span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">Premium packages</h2>
          
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {packages.map((pkg, idx) => (
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
      <section className="bg-[#F5F0EB] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A3391C]">In Their Words</span>
          <h2 className="mt-2 font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">Loved by hosts</h2>
          
          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
            {testimonials.map((test) => (
              <div key={test.name} className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex gap-1 text-[#A87C41]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 font-serif text-lg italic leading-relaxed text-[#1A1A1A]">"{test.quote}"</p>
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
          <h2 className="mt-2 font-serif text-4xl font-bold text-white md:text-6xl">Let's create something <br/> unforgettable together</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">Tell us about your occasion and your concierge will curate a bespoke shortlist within 24 hours.</p>
          <button className="mt-8 rounded bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#A3391C] transition hover:bg-gray-100">Start planning — it's free</button>
        </div>
      </section>

      {/* --- 10. FOOTER --- */}
      <footer className="bg-[#EBE5DB] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl border-b border-[#D6CDC1] pb-10 lg:flex lg:justify-between">
           <div className="max-w-sm">
             <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-[#A3391C]">EventHub</Link>
             <p className="mt-4 text-xs leading-relaxed text-[#5A524A]">The curated marketplace for extraordinary events — connecting discerning hosts with the world's finest vendors.</p>
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
    </div>
  );
}