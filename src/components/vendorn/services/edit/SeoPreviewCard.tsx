// Live preview derived straight from the real title/description/city fields
// above — not fabricated copy.
export default function SeoPreviewCard({
  title,
  description,
  city,
}: {
  title: string;
  description: string;
  city: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4">
      <h2 className="font-semibold text-[#2B2622] mb-3 text-sm">
        SEO Preview
      </h2>

      <div className="rounded-lg bg-white border border-[#DCCFC0] p-3">
        <p className="text-[#A3391C] text-sm font-medium truncate">
          {title || "Your service name"}
        </p>
        {city && (
          <p className="text-[#8B716A] text-xs mt-1">Events in {city}</p>
        )}
        <p className="text-[#8B7E72] text-xs mt-1 line-clamp-2">
          {description || "Your service description will appear here."}
        </p>
      </div>
    </div>
  );
}
