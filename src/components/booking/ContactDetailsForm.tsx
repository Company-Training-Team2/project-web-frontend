import SectionEyebrow from "@/components/shared/SectionEyebrow";
import FormField from "@/components/auth/FormField";
import { Input } from "@/components/ui/input";

export default function ContactDetailsForm({
  fullName,
  email,
  onFullNameChange,
  onEmailChange,
}: {
  fullName: string;
  email: string;
  onFullNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
}) {
  return (
    <div className="px-5 pt-6 lg:px-10">
      <SectionEyebrow>Where to reach you</SectionEyebrow>
      <h3 className="mt-1 font-serif text-[20px] font-bold text-[#252323]">Contact details</h3>

      <div className="mt-3 space-y-3">
        <FormField id="fullName" label="Full name">
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
          />
        </FormField>
        <FormField id="email" label="Email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="h-[48px] rounded-[10px] border border-[#ded8d2] bg-white px-[14px] text-[15px]"
          />
        </FormField>
      </div>
    </div>
  );
}
