import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";

const INCLUDES = [
  "Everything in the Interim Service",
  "Engine oil & filter replacement (correct grade for your engine)",
  "Air filter replacement",
  "Pollen / cabin filter inspection & replacement if needed",
  "Fuel filter inspection",
  "Brake pad thickness measurement (front & rear)",
  "Brake disc condition & measurement",
  "Suspension & steering component check",
  "Exhaust system visual inspection",
  "Coolant concentration & freeze-point check",
  "60-point vehicle health check",
  "Stamped service record & digital update where supported",
];

const FAQS = [
  { q: "What is a Full Service?", a: "A Full Service is the UK standard annual car service covering all the checks an Interim does, plus filter replacements, brake measurements, and a comprehensive 60-point health check of your vehicle." },
  { q: "How often should I have a Full Service?", a: "Every 12 months or 12,000 miles — whichever comes first. If you do high mileage, combine it with an Interim at 6 months." },
  { q: "Will it keep my manufacturer warranty valid?", a: "Yes. Under the UK Block Exemption Regulation, having your car serviced at an independent garage using the manufacturer-specified oil and parts does not void your warranty." },
  { q: "Do I get a service stamp?", a: "Yes — we stamp your service book and can update digital service histories (Volkswagen Group, Ford, BMW etc.) where the system allows." },
  { q: "How long does a Full Service take?", a: "Typically 2–3 hours. We text you when your car is ready for collection." },
] as const;

export default function FullServicePage() {
  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Car Servicing</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">Full Service</h1>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3f63ff]/30 bg-[#eef4ff] px-4 py-2 text-sm shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#3f63ff]" />
            <span className="font-semibold text-[#3f63ff]">Most popular</span>
            <span className="text-slate-500">— recommended every 12 months or 12,000 miles</span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            The UK standard annual service — comprehensive, warranty-safe, and stamped.
            Covers everything from oil and filters to a full 60-point vehicle health check.
          </p>
          <BookingBar defaultService="full" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What&apos;s included</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Full Service checklist</h2>
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
                  { stat: "~2–3 hrs", label: "typical duration" },
                  { stat: "60-point", label: "vehicle health check" },
                  { stat: "Warranty safe", label: "block exemption compliant" },
                  { stat: "Service stamp", label: "book & digital history" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                    <p className="text-xl font-extrabold text-[#3f63ff]">{s.stat}</p>
                    <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">High mileage?</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  If you cover more than 12,000 miles a year, pair your annual Full Service with an
                  <strong className="text-[#101a56]"> Interim Service</strong> at the 6-month mark to keep oil fresh and catch issues early.
                </p>
                <div className="mt-3 flex gap-3">
                  <Link href="/car-servicing/interim" className="inline-flex items-center gap-1 text-sm font-semibold text-[#3f63ff] hover:text-[#101a56]">
                    Interim Service
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                  <Link href="/car-servicing/major" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-[#101a56]">
                    Major Service
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
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
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Book your Full Service</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Typical service time 2–3 hours. We text you when ready. {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=full" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book Full Service
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
