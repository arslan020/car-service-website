import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

const AREA_SERVED = [
  "Hayes","Southall","Uxbridge","Slough","Hounslow","Ealing","Greenford",
  "Northolt","Harrow","Wembley","Richmond","Twickenham","Windsor","Feltham",
  "Isleworth","Ruislip","Acton","Chiswick","Brentford","Hanwell",
  "West Drayton","Hillingdon","Watford","Kingston upon Thames","Staines-upon-Thames",
].map((name) => ({ "@type": "Place", name }));

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Car Electrical Repair & Diagnostics",
  provider: { "@type": "AutoRepair", name: site.name, url: "https://www.mariestonservicecentre.co.uk" },
  areaServed: AREA_SERVED,
  description: "Car electrical diagnostics, battery, alternator, starter motor and fault code clearing in Hayes UB4.",
  url: "https://www.mariestonservicecentre.co.uk/repairs/electrical",
};

export const metadata: Metadata = {
  title: "Car Electrical Repair Hayes UB4 | Diagnostics & Faults | Marieston",
  description: "Car electrical diagnostics and repair in Hayes. Battery, alternator, starter motor & fault code clearing. Book a diagnostic check online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/electrical" },
};

const SERVICES = [
  "Battery testing, charging & replacement",
  "Alternator & starter motor replacement",
  "Headlight, tail light & bulb replacement",
  "HID & LED light unit repair",
  "Central locking & electric window repair",
  "Dashboard warning light diagnosis",
  "Fuse & relay diagnosis & replacement",
  "Sensor replacement (MAF, crank, cam, etc.)",
];

const SIGNS = [
  { title: "Warning lights on dash", body: "Multiple warning lights or one that won&apos;t clear after a reset usually means a real fault to diagnose." },
  { title: "Battery draining overnight", body: "A parasitic drain — something is drawing power when the car is off. We trace and fix the culprit." },
  { title: "Flickering lights", body: "Headlights or interior lights flickering often point to a failing alternator or loose connection." },
  { title: "Electrics not working", body: "Windows, locks, or the radio cutting out — usually a fuse, relay, or wiring fault we can trace quickly." },
] as const;

const FAQS = [
  {
    q: "What does OBD diagnostic equipment find in electrical faults?",
    a: "It reads fault codes from the ECU, ABS, airbag, and body control modules, showing exactly which circuit, sensor, or component is reporting a problem — removing the guesswork from electrical diagnosis.",
  },
  {
    q: "Why do I have multiple warning lights on at once?",
    a: "Multiple warning lights frequently appear when battery voltage drops or a central control module develops a fault — it doesn't always mean separate faults. A diagnostic scan quickly identifies the root cause.",
  },
  {
    q: "Can you fix a car that won't start due to an electrical fault?",
    a: "Yes. We trace starting system faults including the starter motor, ignition circuit, immobiliser, battery, and wiring to identify and fix the underlying cause.",
  },
  {
    q: "How long does an electrical repair take?",
    a: "Simple repairs like bulb or fuse replacement are completed same day. More complex wiring or module faults vary — we'll give you a clear timeline and a quote before any work begins.",
  },
] as const;

export default async function ElectricalPage() {
  const content = await getPageContent("repairs-electrical");
  const title = f(content, "hero_title", "Electrical Repairs");
  const subtitle = f(content, "hero_subtitle", "Warning lights, failed electrics, battery drain, or blown bulbs — diagnosed with professional equipment and repaired correctly.");

  return (
    <>
      <JsonLd data={serviceSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Repairs", url: "https://www.mariestonservicecentre.co.uk/repairs" },
        { name: "Electrical & Lighting", url: "https://www.mariestonservicecentre.co.uk/repairs/electrical" },
      ]} />
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Auto Electrics</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
              <div className="mt-4 inline-flex items-start gap-2 rounded-2xl border border-[#e0ebff] bg-white px-4 py-3 shadow-sm">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="text-sm font-semibold text-[#020F3D]">After diagnostic, we&apos;ll quote you a fixed repair cost before any work starts.</span>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/online-booking?service=diagnostics" className="flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]">
                  Book Diagnostic
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Live fault scan", label: "Exact fault code read-out shown to you" },
                { stat: "No guess repairs", label: "Diagnosed before anything is replaced" },
                { stat: "Warning light off", label: "Fault fixed & cleared same visit" },
                { stat: "Fixed price repair", label: "Agreed before we start, no surprises" },
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
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">What we repair</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Electrical & lighting services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-red-500">Warning signs</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Signs your electrics need attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                  </span>
                  <h3 className="font-bold text-[#020F3D]">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500" dangerouslySetInnerHTML={{ __html: s.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Common questions</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Frequently asked questions</h2>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Get it diagnosed</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Electrical problem? Let&apos;s find it.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{site.addressLines.join(", ")}. We diagnose first, quote before we fix.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href={`tel:${site.phoneTel}`} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}




