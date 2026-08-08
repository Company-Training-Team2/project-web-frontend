export default function ServicesFooter() {
  return (
    <footer className="mt-10 pt-6 border-t border-[#DCCFC0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#8B716A]">
      <span className="font-semibold text-[#2B2622]">EventHub</span>

      <div className="flex flex-wrap items-center gap-4">
        <a href="#" className="hover:text-[#2B2622]">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-[#2B2622]">
          Terms of Service
        </a>
        <a href="#" className="hover:text-[#2B2622]">
          Help Center
        </a>
        <a href="#" className="hover:text-[#2B2622]">
          Contact Support
        </a>
      </div>

      <span>© 2024 EventHub Vendor Portal. All rights reserved.</span>
    </footer>
  );
}