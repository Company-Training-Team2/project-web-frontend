export default function AnalyticsFooter() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-2 mt-6 py-4 text-xs text-[#8B7E72]">
      <p>EventHub &middot; © {new Date().getFullYear()} Executive Analytics. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-[#A3391C]">Privacy Policy</a>
        <a href="#" className="hover:text-[#A3391C]">Terms of Service</a>
        <a href="#" className="hover:text-[#A3391C]">Help Center</a>
      </div>
    </footer>
  );
}