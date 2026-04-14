import Link from "next/link";
import { site } from "@/lib/site-config";

const PRICING_GROUPS = [
  {
    group: "MOT",
    color: "text-[#3f63ff]",
    bg: "bg-[#eef4ff]",
    items: [
      { name: "MOT Test (Class IV)", price: "from £54", note: "DVSA maximum fee" },
      { name: "MOT + Interim Service", price: "from £X", note: "Combined saving" },
      { name: "MOT + Full Service", price: "from £X", note: "Combined saving" },
    ],
  },
  {
    group: "Servicing",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    items: [
      { name: "Interim Service", price: "from £X", note: "Every 6 months / 6k miles" },
      { name: "Full Service", price: "from £X", note: "Every 12 months / 12k miles" },
      { name: "Major Service", price: "from £X", note: "As per manufacturer schedule" },
      { name: "Oil & Filter Change", price: "from £X", note: "Right-spec oil for your engine" },
    ],
  },
  {
    group: "Repairs",
    color: "text-orange-600",
    bg: "bg-orange-50",
    items: [
      { name: "Brake Pads (front)", price: "from £X", note: "Includes fitting" },
      { name: "Brake Pads (rear)", price: "from £X", note: "Includes fitting" },
      { name: "Brake Discs & Pads", price: "from £X", note: "Per axle, includes fitting" },
      { name: "Exhaust repair", price: "Quote provided", note: "Depends on section" },
      { name: "Clutch replacement", price: "Quote provided", note: "Parts + labour quoted" },
    ],
  },
  {
    group: "Other",
    color: "text-slate-600",
    bg: "bg-slate-100",
    items: [
      { name: "Diagnostics", price: "from £X", note: "OBD scan & live data" },
      { name: "Battery supply & fit", price: "from £X", note: "Correct spec for your car" },
      { name: "Air-con recharge", price: "from £X", note: "Includes leak check" },
      { name: "Tyre fitting (each)", price: "from £X", note: "Balance included" },
    ],
  },
] as const;

const NOTES = [
  "All prices are starting prices. Final cost depends on your vehicle specification, age, and parts required.",
  "We confirm your exact quote before any work begins — no surprises at collection.",
  "Parts used are OEM-quality or equivalent. We can discuss options if you prefer a specific brand.",
  "Labour is charged per job, not per hour — you know the price before we start.",
] as const;

export default function PricingPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">No hidden fees</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">
            Clear pricing
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Starting prices for all our services. Your exact quote is confirmed before we touch the car — no surprises, ever.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto"
            >
              Book online
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/quote"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#101a56] px-6 py-3.5 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white sm:w-auto"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLES ── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-8">
          {PRICING_GROUPS.map((group) => (
            <div key={group.group} className="overflow-hidden rounded-2xl border border-[#e8effa] bg-white shadow-sm">
              {/* Group header */}
              <div className={`flex items-center gap-3 border-b border-[#e8effa] px-5 py-4 ${group.bg}`}>
                <span className={`text-sm font-extrabold uppercase tracking-widest ${group.color}`}>
                  {group.group}
                </span>
              </div>
              {/* Rows */}
              <div className="divide-y divide-[#f0f5ff]">
                {group.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p className="font-semibold text-[#101a56]">{item.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{item.note}</p>
                    </div>
                    <span className="shrink-0 rounded-xl bg-[#f4f8ff] px-4 py-1.5 text-sm font-extrabold text-[#101a56]">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTES ── */}
      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Good to know</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">About our prices</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {NOTES.map((note, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-extrabold text-[#3f63ff]">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-600">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Transparent & fair</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              Ready to book or get a quote?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Book online in under a minute, or call us on {site.phoneDisplay} and we&apos;ll give you a price over the phone.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto"
              >
                Book online now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href={`tel:${site.phoneTel}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
