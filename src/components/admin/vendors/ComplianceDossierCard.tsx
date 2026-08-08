import { FileText, ShieldCheck, Stamp, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const ICONS = [FileText, Stamp, ShieldCheck];

export default function ComplianceDossierCard({ documents }: { documents: { name: string; meta: string }[] }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-white p-5">
      <h3 className="border-l-[3px] border-[#A3391C] pl-2.5 font-serif text-lg font-bold text-[#2B2622]">
        Compliance Dossier
      </h3>

      {documents.length === 0 ? (
        <p className="mt-3 text-sm text-[#8B716A]">No documents submitted yet.</p>
      ) : (
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {documents.map((doc, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={doc.name} className="rounded-xl border border-[#DCCFC0] p-3.5">
              <Icon size={18} className="text-[#2f5c46]" />
              <p className="mt-2 text-sm font-bold text-[#2B2622]">{doc.name}</p>
              <p className="text-[12px] text-[#8B716A]">{doc.meta}</p>
              {/* Mock — no real document storage endpoint yet. */}
              <button
                onClick={() => toast.info(`${doc.name} — file preview not wired up yet.`)}
                className="mt-1.5 flex items-center gap-1 text-[12px] font-bold text-[#A3391C] hover:underline"
              >
                View File
                <ExternalLink size={11} />
              </button>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
