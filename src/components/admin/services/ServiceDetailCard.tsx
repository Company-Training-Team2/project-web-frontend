import { MapPin, Tag, Users } from "lucide-react";
import { AdminWorkPostDto } from "@/services/admin.service";

export default function ServiceDetailCard({ service }: { service: AdminWorkPostDto }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#2B2622]">{service.title}</h2>
          <p className="text-[13px] text-[#8B716A]">
            by <span className="font-medium text-[#2B2622]">{service.vendorBusinessName}</span>
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[13px] font-bold text-[#A3391C]">
          EGP {service.price.toLocaleString()}
        </span>
      </div>

      <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-[#2B2622]/80">
        {service.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-[#2B2622]/80">
        <span className="flex items-center gap-1.5">
          <Tag size={14} className="text-[#8B716A]" />
          {service.categoryName}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-[#8B716A]" />
          {service.city}
          {service.address ? ` — ${service.address}` : ""}
        </span>
        {service.minGuests || service.maxGuests ? (
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-[#8B716A]" />
            {service.minGuests ?? "?"}–{service.maxGuests ?? "?"} guests
          </span>
        ) : null}
      </div>

      {service.imageUrls.length > 0 ? (
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {service.imageUrls.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="aspect-square w-full rounded-lg object-cover"
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[13px] italic text-[#8B716A]">No photos uploaded for this listing.</p>
      )}
    </div>
  );
}
