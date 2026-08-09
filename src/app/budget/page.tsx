"use client";

import Link from "next/link";
import { 
  ChevronLeft, Plus, Download, Banknote, 
  Calendar, MoreHorizontal, Filter, TrendingUp
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-[#FBF3EA] flex overflow-x-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden">
        <div className="mx-auto w-full max-w-5xl">
          
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between border-b border-[#E3DCD2] pb-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center justify-center rounded-full border border-[#DCCFC0] bg-white p-2 text-[#2B2622] hover:bg-[#F5EDE0] transition shadow-sm w-10 h-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B7E72]">Executive Summary</p>
                <h1 className="font-serif text-3xl font-bold text-[#2B2622]">Budget Allocation</h1>
                <p className="mt-1 text-xs text-[#8B7E72]">An overview of your investment for the 2026 Gala. You have utilized 75% of your total budget.</p>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="mt-4 flex items-center gap-3 sm:mt-0">
              <button className="flex items-center gap-2 rounded-lg bg-[#A3391C] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8B2E17] shadow-sm">
                <Plus className="h-4 w-4" /> Add Expense
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#DCCFC0] bg-white px-5 py-2.5 text-xs font-semibold text-[#2B2622] transition hover:bg-[#F5EDE0]">
                <Download className="h-4 w-4" /> Export PDF
              </button>
            </div>
          </div>

          {/* --- Top Grid (Summary Cards) --- */}
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* 1. Circular Progress (Budget Overview) */}
            <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-white p-8 border border-[#F0EAE2] shadow-sm">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-[#F0EAE2]">
                {/* الجزء الملون من الدائرة (لون بني) */}
                <div 
                  className="absolute inset-0 rounded-full border-[6px] border-[#A3391C]" 
                  style={{ 
                    clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%)", // مؤشر 75% تقريبًا
                    transform: "rotate(45deg)" 
                  }}
                />
                <div className="text-center">
                  <p className="font-serif text-4xl font-bold text-[#A3391C]">75%</p>
                  <p className="text-[10px] font-medium text-[#8B7E72]">Used</p>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#2B2622]">$120,000</h3>
              <p className="text-xs text-[#8B7E72]">Estimated Total Budget</p>
            </div>

            {/* 2. Total Spend */}
            <div className="col-span-1 rounded-2xl bg-white p-6 border border-[#F0EAE2] shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[#8B7E72]">Total Spend</p>
                  <h3 className="mt-1 font-serif text-3xl font-bold text-[#2B2622]">$90,000</h3>
                </div>
                <div className="rounded-lg bg-[#FBF3EA] p-2.5 text-[#A3391C]">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-[#2F4A3E] px-2 py-0.5 text-[9px] font-bold text-white">-12%</span>
                <span className="text-[10px] text-[#8B7E72]">vs last month</span>
              </div>
            </div>

            {/* 3. Remaining Budget */}
            <div className="col-span-1 rounded-2xl bg-white p-6 border border-[#F0EAE2] shadow-sm flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-[#8B7E72]">Remaining</p>
                  <h3 className="mt-1 font-serif text-3xl font-bold text-[#2F4A3E]">$50,000</h3>
                </div>
                <div className="rounded-lg bg-[#EBF5F1] p-2.5 text-[#2F4A3E]">
                  <Banknote className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-[10px] text-[#8B7E72]">On Track</p>
            </div>
          </div>

          {/* --- Middle Section: Venue Deposit (Highlighted Card) --- */}
          <div className="mb-8 overflow-hidden rounded-2xl bg-[#2B2622] text-white shadow-sm border border-[#1A1A1A] grid grid-cols-1 md:grid-cols-2">
            
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-[#A3391C] px-3 py-1 text-[9px] font-bold uppercase tracking-wider">Payment Due</span>
                <h2 className="mt-3 font-serif text-2xl font-bold">Venue Deposit Due</h2>
                <p className="mt-2 max-w-xs text-xs text-white/70 leading-relaxed">
                  Your final payment of $5,000 for the Grand Plaza Ballroom is due on October 15th.
                </p>
              </div>
              <button className="mt-6 w-fit rounded-full bg-white px-6 py-2.5 text-xs font-bold text-[#2B2622] transition hover:bg-gray-100">
                Make Payment
              </button>
            </div>
            
            <div className="h-48 md:h-auto">
              {/* 👇 تم إصلاح الصورة هنا باستخدام Pexels (مضمونة وشغالة) */}
              <img 
                src="https://images.pexels.com/photos/2659472/pexels-photo-2659472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Venue" 
                className="h-full w-full object-cover opacity-70 hover:opacity-90 transition" 
              />
            </div>
          </div>

          {/* --- Bottom Section: Category Breakdown --- */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#2B2622]">Category Breakdown</h2>
              <button className="flex items-center gap-2 rounded-full border border-[#DCCFC0] bg-white px-4 py-1.5 text-xs font-semibold text-[#5A524A] hover:bg-[#F5EDE0]">
                <Filter className="h-3 w-3" /> Filter
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Category 1 */}
              <div className="rounded-2xl bg-white p-6 border border-[#F0EAE2] shadow-sm relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF3EA] text-[#A3391C]">
                    <MapPinIcon className="h-5 w-5" />
                  </div>
                  <button className="text-[#8B7E72]"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold text-[#2B2622]">Venue & Rentals</p>
                  <p className="font-serif text-xl font-bold text-[#A3391C]">$45,000</p>
                  <p className="text-[10px] text-[#8B7E72]">75% Used</p>
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-[#F0EAE2]">
                  <div className="h-1 w-[75%] rounded-full bg-[#A3391C]" />
                </div>
                <p className="mt-3 text-[9px] text-[#8B7E72]">Renovation & Setup</p>
              </div>

              {/* Category 2 */}
              <div className="rounded-2xl bg-white p-6 border border-[#F0EAE2] shadow-sm relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF3EA] text-[#A3391C]">
                    <UtensilsIcon className="h-5 w-5" />
                  </div>
                  <button className="text-[#8B7E72]"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold text-[#2B2622]">Catering & Beverage</p>
                  <p className="font-serif text-xl font-bold text-[#A3391C]">$32,000</p>
                  <p className="text-[10px] text-[#8B7E72]">45% Used</p>
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-[#F0EAE2]">
                  <div className="h-1 w-[45%] rounded-full bg-[#A3391C]" />
                </div>
                <p className="mt-3 text-[9px] text-[#8B7E72]">Buffet & Bar</p>
              </div>

              {/* Category 3 */}
              <div className="rounded-2xl bg-white p-6 border border-[#F0EAE2] shadow-sm relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FBF3EA] text-[#A3391C]">
                    <FlowerIcon className="h-5 w-5" />
                  </div>
                  <button className="text-[#8B7E72]"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold text-[#2B2622]">Florals & Decor</p>
                  <p className="font-serif text-xl font-bold text-[#A3391C]">$12,000</p>
                  <p className="text-[10px] text-[#8B7E72]">20% Used</p>
                </div>
                <div className="mt-3 h-1 w-full rounded-full bg-[#F0EAE2]">
                  <div className="h-1 w-[20%] rounded-full bg-[#A3391C]" />
                </div>
                <p className="mt-3 text-[9px] text-[#8B7E72]">Centerpieces & Arrangements</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- Helper Icons ---
function MapPinIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
}
function UtensilsIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
}
function FlowerIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 1 4 4v4h-4a4 4 0 0 1-4-4V2"/><path d="M12 22a4 4 0 0 0 4-4v-4h-4a4 4 0 0 0-4 4v4"/><path d="M2 12a4 4 0 0 1 4-4h4v4a4 4 0 0 1-4 4H2"/><path d="M22 12a4 4 0 0 0-4-4h-4v4a4 4 0 0 0 4 4h4"/></svg>
}