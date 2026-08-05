export default function QuoteCallout({ text }: { text: string }) {
  return (
    <div className="mt-2 w-full max-w-[320px] rounded-[12px] border border-[#2E9E68]/25 bg-[#f1f8f4] p-3.5">
      <p className="text-[13px] italic leading-[1.5] text-[#1f7a4d]">&ldquo;{text}&rdquo;</p>
    </div>
  );
}
