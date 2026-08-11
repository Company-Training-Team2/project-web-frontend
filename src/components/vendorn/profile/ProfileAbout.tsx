export default function ProfileAbout({ bioDescription }: { bioDescription: string }) {
  return (
    <div className="rounded-[16px] border border-[#DCCFC0] bg-[#F6ECE0] p-4 md:p-6">
      <h2 className="font-serif text-lg md:text-xl font-bold text-[#2B2622] mb-3">About</h2>
      {bioDescription ? (
        <p className="text-sm text-[#6d5d54] leading-relaxed whitespace-pre-line">{bioDescription}</p>
      ) : (
        <p className="text-sm text-[#8B7E72] italic">
          No business description yet — add one from Edit Profile.
        </p>
      )}
    </div>
  );
}
