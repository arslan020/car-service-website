import type { Metadata } from "next";
import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Full Car Service Hayes UB4 | Annual Service | Marieston",
  description: "Full annual car service in Hayes. Comprehensive 50-point inspection, oil, filters & safety checks. Transparent pricing and qualified mechanics. Book online.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/car-servicing/full" },
};

const INCLUDES = [
  {
    title: "Everything in the Oil Service",
    desc: "Every check and replacement from our Oil Service, included as standard.",
  },
  {
    title: "Engine Oil & Filter Replacement",
    desc: "Correct-grade oil and a fresh filter, fitted to manufacturer specification.",
  },
  {
    title: "Air Filter Replacement",
    desc: "Fresh air filter fitted to protect engine performance and fuel economy.",
  },
  {
    title: "Pollen / Cabin Filter Replacement",
    desc: "Replaced where needed — keeps cabin air clean from London traffic pollution.",
  },
  {
    title: "Brake Pad & Disc Measurement",
    desc: "Front and rear pads and discs measured against minimum safe limits.",
  },
  {
    title: "Suspension & Steering Check",
    desc: "Shock absorbers, bushes and steering components inspected for wear.",
  },
  {
    title: "Exhaust System Inspection",
    desc: "Checked for leaks, corrosion and secure mounting.",
  },
  {
    title: "60-Point Vehicle Health Check",
    desc: "A full inspection of safety and mechanical systems, with a written report.",
  },
];

export default async function FullServicePage() {
  const content = await getPageContent("car-servicing-full");
  const title = f(content, "hero_title", "Full Service");
  const subtitle = f(content, "hero_subtitle", "The UK standard annual service — comprehensive, warranty-safe, and stamped. Covers everything from oil and filters to a full 60-point vehicle health check.");

  const FAQS = [
    { q: f(content, "faq_1_q", "What is a Full Service?"), a: f(content, "faq_1_a", "A Full Service is the UK standard annual car service covering all the checks an Oil Service does, plus filter replacements, brake measurements, and a comprehensive 60-point health check of your vehicle.") },
    { q: f(content, "faq_2_q", "How often should I have a Full Service?"), a: f(content, "faq_2_a", "Every 12 months or 12,000 miles — whichever comes first. If you do high mileage, combine it with an Oil Service at 6 months.") },
    { q: f(content, "faq_3_q", "Will it keep my manufacturer warranty valid?"), a: f(content, "faq_3_a", "Yes. Under the UK Block Exemption Regulation, having your car serviced at an independent garage using the manufacturer-specified oil and parts does not void your warranty.") },
    { q: f(content, "faq_4_q", "Do I get a service stamp?"), a: f(content, "faq_4_a", "Yes — we stamp your service book and can update digital service histories (Volkswagen Group, Ford, BMW etc.) where the system allows.") },
    { q: f(content, "faq_5_q", "How long does a Full Service take?"), a: f(content, "faq_5_a", "Typically 2–3 hours. We text you when your car is ready for collection.") },
  ];

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Car Servicing</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#0F63FF]/30 bg-[#eef4ff] px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#0F63FF]" />
                <span className="text-sm font-semibold text-[#0F63FF]">Most popular</span>
                <span className="text-sm text-slate-500">— every 12 months or 12,000 miles</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/online-booking?service=full" className="flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]">
                  Book Full Service
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <a href={waUrl("Hi, I'd like to book a Full Service please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "~2–3 hrs", label: "Typical duration" },
                { stat: "60-point", label: "Vehicle health check" },
                { stat: "Warranty safe", label: "Block exemption compliant" },
                { stat: "Service stamp", label: "Book & digital history" },
              ].map((s) => (
                <div key={s.label} className="flex h-full flex-col justify-center rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                  <p className="text-2xl font-extrabold capitalize text-[#0F63FF]">{s.stat}</p>
                  <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">What&apos;s included</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Full Service checklist</h2>
              <ul className="mt-6 space-y-4">
                {INCLUDES.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>
                      <span className="font-semibold text-[#020F3D]">{item.title}:</span> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">High mileage?</p>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  If you cover more than 12,000 miles a year, pair your annual Full Service with an
                  <strong className="text-[#020F3D]"> Oil Service</strong> at the 6-month mark to keep oil fresh and catch issues early.
                </p>
                <div className="mt-3 flex gap-3">
                  <Link href="/car-servicing/interim" className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F63FF] hover:text-[#020F3D]">
                    Oil Service
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                  <Link href="/car-servicing/major" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-[#020F3D]">
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">FAQs</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Common questions</h2>
          </div>
          <div className="mt-8 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#020F3D]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Book today</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Book your Full Service</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Typical service time 2–3 hours. We text you when ready. {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/online-booking?service=full" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
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
