import Link from "next/link";

const TICKER_ITEMS = Array.from({ length: 8 }, (_, index) => index);

function TickerCopy({ className }: { className: string }) {
  return (
    <span className="flex shrink-0 items-center whitespace-nowrap">
      {TICKER_ITEMS.map((index) => (
        <span key={index} className={className}>
          Black Friday · MOT just £39
        </span>
      ))}
    </span>
  );
}

export function BlackFridayTicker({ size = "header" }: { size?: "header" | "footer" }) {
  const tall = size === "footer";
  return (
    <Link
      href="/mot"
      aria-label="Black Friday offer, MOT just £39"
      className={`relative block overflow-hidden bg-black text-white ${tall ? "h-12 sm:h-14" : "h-10"}`}
    >
      <span className="bf-ticker-track">
        <TickerCopy className={`bf-now-open inline-block shrink-0 font-black uppercase tracking-[0.18em] ${tall ? "px-10 text-sm sm:text-xl" : "px-8 text-xs sm:text-sm"}`} />
        <TickerCopy className={`bf-now-open inline-block shrink-0 font-black uppercase tracking-[0.18em] ${tall ? "px-10 text-sm sm:text-xl" : "px-8 text-xs sm:text-sm"}`} />
      </span>
    </Link>
  );
}
