export default function SeoPreviewCard() {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
      <h2 className="font-semibold text-[#2B2622] mb-3 text-sm">
        SEO Preview
      </h2>

      <div className="rounded-lg bg-white border border-[#DCCFC0] p-3">
        <p className="text-[#A3391C] text-sm font-medium">
          Signature Heritage Banquet
        </p>
        <p className="text-[#8B716A] text-xs mt-1">
          Luxury Events in Charleston
        </p>
        <p className="text-[#8B7E72] text-xs mt-1 line-clamp-2">
          Experience the grand heritage of Maison Events with our signature
          Heritage Banquet — a full culinary journey blended with elegant
          floor programming.
        </p>
      </div>
    </div>
  );
}