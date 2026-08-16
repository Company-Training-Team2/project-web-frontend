export default function Divider({ label = "Or continue with" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[#d7cab9]" />
      <span className="text-[13px] font-medium leading-none text-[#8d7f75]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#d7cab9]" />
    </div>
  );
}
