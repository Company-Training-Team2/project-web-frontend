"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#102b1f] px-6 text-center text-white">
        <span className="font-serif text-[31px] font-bold leading-none tracking-[-0.02em]">
          EventHub
        </span>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold">Something went wrong</h1>
          <p className="mx-auto max-w-sm text-white/70">
            The application ran into a problem while loading. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="h-[49px] rounded-[7px] bg-[#af3718] px-8 text-[14px] font-medium text-white hover:bg-[#9f3216]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
