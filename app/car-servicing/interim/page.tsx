import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";

const INCLUDES = [
  "Engine oil drain & refill with correct-grade oil",
  "Oil filter replacement",
  "Air filter visual inspection",
  "Brake fluid level check & top-up",
  "Coolant & antifreeze level check",
  "Battery health check (voltage & charge)",
  "Tyre condition, tread depth & pressure check",
  "Lights & indicators check (all round)",
  "Wiper blade condition & washer fluid top-up",
  "Visual check of belts, hoses & fluid leaks",
  "Stamped service record provided",
];

const FAQS = [
  { q: "Who is an interim service for?", a: "Drivers covering more than 12,000 miles a year benefit most — the extra oil change keeps the engine protected between annual full services." },
  { q: "Does it protect my warranty?", a: "Yes. UK law (Block Exemption Regulation) means manufacturer warranties remain valid when serviced at an independent garage using the correct oil grade and parts." },
  { q: "How long does it take?", a: "Usually 1–1.5 hours. Many customers drop off and collect the same morning." },
  { q: "Will I get a service stamp?", a: "Yes — we provide a stamped service record for your handbook and can update digital service records where supported." },
] as const;

export default function InterimServicePage() {
  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Car Servicing</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">Interim Service</h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
            <svg className="h-4 w-4 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 7v5l3 3"/></svg>
            Recommended every <strong className="text-[#101a56]">6 months</strong> or <strong className="text-[#101a56]">6,000 miles</strong>
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            A thorough mid-year health check to keep oil fresh, fluids topped up, and potential
            problems caught early — ideal for high-mileage drivers.
          </p>
          <BookingBar defaultService="interim" category="servicing" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What&apos;s included</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Interim Service checklist</h2>
              <ul className="mt-6 space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "~1–1.5 hrs", label: "typical duration" },
                  { stat: "Same day", label: "drop-off & collect" },
                  { stat: "All makes", label: "petrol, diesel & hybrid" },
                  { stat: "Warranty safe", label: "block exemption compliant" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                    <p className="text-xl font-extrabold text-[#3f63ff]">{s.stat}</p>
                    <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Upgrade banner */}
              <div className="rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Need more?</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Due a more thorough check? Our <strong className="text-[#101a56]">Full Service</strong> covers everything here
                  plus air filter replacement, brake measurements, and a 60-point health check.
                </p>
                <Link href="/car-servicing/full" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#3f63ff] hover:text-[#101a56]">
                  View Full Service
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">FAQs</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Common questions</h2>
          </div>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#101a56]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Book today</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Ready to book your Interim Service?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Most customers are back on the road within 1.5 hours. {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=interim" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book Interim Service
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
              <a href={`tel:${site.phoneTel}`} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
