export default function VendorPortfolioGallery({ images }: { images: string[] }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-white p-5">
      <h3 className="border-l-[3px] border-[#A3391C] pl-2.5 font-serif text-lg font-bold text-[#2B2622]">
        Signature Portfolio
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src + i}
            className={`aspect-square rounded-lg bg-[#DCCFC0] ${i === 0 ? "col-span-2 row-span-2 aspect-auto h-full min-h-[160px] sm:col-span-2" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
