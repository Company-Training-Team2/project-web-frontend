// Shared "the request actually failed" state — same pattern already used by
// favorites.tsx/NotificationsScreen.tsx. Used anywhere a failed fetch would
// otherwise leave a screen showing empty/placeholder values that could be
// mistaken for genuine (if empty) data, e.g. a profile with blank fields
// instead of an explicit "couldn't load your profile."
export default function ConnectionError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-sm text-[#A3391C]">{message}</p>
      {onRetry ? (
        <button onClick={onRetry} className="text-sm font-semibold text-[#A3391C] hover:underline">
          Try again
        </button>
      ) : null}
    </div>
  );
}
