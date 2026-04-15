import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";
import { getPageContent, f } from "@/lib/page-content";

const INCLUDES = [
  "Everything in the Full Service",
  "Spark plugs replacement (petrol engines)",
  "Glow plugs inspection (diesel engines)",
  "Timing belt visual inspection (replacement quoted separately if due)",
  "Gearbox oil level check & top-up",
  "Differential oil check (where applicable)",
  "Brake fluid flush & replacement (DOT spec)",
  "Coolant flush & replacement (if due per manufacturer schedule)",
  "Fuel filter replacement",
  "Throttle body & idle control inspection",
  "Full road test with written report",
  "Manufacturer schedule check — advise on anything due",
  "Stamped service record & digital history update",
];

export default async function MajorServicePage() {
  const content = await getPageContent("car-servicing-major");
  const title = f(content, "hero_title", "Major Service");
  const subtitle = f(content, "hero_subtitle", "The most comprehensive service — everything in a Full Service plus spark plugs, brake fluid flush, coolant change, and a full road test.");

  const FAQS = [
    { q: f(content, "faq_1_q", "What is a Major Service?"), a: f(content, "faq_1_a", "A Major Service is the most comprehensive annual service, following your car's manufacturer schedule. It includes everything in a Full Service plus spark plugs, brake fluid flush, coolant change, and a full road test — typically due every 2 years or 24,000 miles.") },
    { q: f(content, "faq_2_q", "How is it different from a Full Service?"), a: f(content, "faq_2_a", "A Full Service covers the standard 12-month checks. A Major Service adds component replacements that are due on a longer cycle — spark plugs, fluids that degrade over time, and a manufacturer-schedule compliance check.") },
    { q: f(content, "faq_3_q", "Does this protect my manufacturer warranty?"), a: f(content, "faq_3_a", "Yes. UK Block Exemption Regulation law means using a qualified independent garage with correct spec parts and oils keeps your warranty fully valid.") },
    { q: f(content, "faq_4_q", "How long does a Major Service take?"), a: f(content, "faq_4_a", "Typically 3–4 hours depending on the vehicle. We will always confirm timing when you book and text you when the car is ready.") },
    { q: f(content, "faq_5_q", "Can I combine it with an MOT?"), a: f(content, "faq_5_a", "Absolutely — many customers book both together. It saves a separate trip and we can usually fit both in one visit.") },
  ];

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Car Servicing</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
            <svg className="h-4 w-4 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 7v5l3 3"/></svg>
            As per <strong className="text-[#101a56]">manufacturer schedule</strong> — typically every 2 years or 24,000 miles
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            {subtitle}
          </p>
          <BookingBar defaultService="major" category="servicing" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What&apos;s included</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Major Service checklist</h2>
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
                  { stat: "~3–4 hrs", label: "typical duration" },
                  { stat: "Road test", label: "included with report" },
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Combine & save</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Booking a Major Service alongside your annual <strong className="text-[#101a56]">MOT</strong> means
                  one drop-off, one collection, and any MOT advisories can be quoted and fixed the same day.
                </p>
                <Link href="/mot" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#3f63ff] hover:text-[#101a56]">
                  Learn about our MOT
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
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Book your Major Service</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Full manufacturer-schedule service. We text you when ready. {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=major" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book Major Service
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
