import type { Metadata } from "next";
import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
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
  name: "Brake Repair & Replacement",
  provider: { "@type": "AutoRepair", name: site.name, url: "https://www.mariestonservicecentre.co.uk" },
  areaServed: AREA_SERVED,
  description: "Brake pad, disc, calliper and brake fluid replacement in Hayes UB4. Safety-critical repairs carried out by qualified mechanics.",
  url: "https://www.mariestonservicecentre.co.uk/repairs/brakes",
};

export const metadata: Metadata = {
  title: "Brake Repair & Replacement Hayes UB4 | Marieston Service Centre",
  description: "Expert brake repair and replacement in Hayes. Pads, discs, callipers & brake fluid. Fast turnaround and competitive prices. Book online today.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/brakes" },
};

const SERVICES = [
  "Brake pad replacement (front & rear)",
  "Brake disc replacement & resurfacing",
  "Calliper replacement & rebuild",
  "Brake fluid flush & replacement",
  "Handbrake cable adjustment & replacement",
  "Brake lines & hydraulic hose replacement",
  "ABS sensor diagnosis & replacement",
  "Full brake performance test after every job",
];

const SIGNS = [
  { title: "Squealing or grinding", body: "High-pitched squealing means worn pads. Grinding means metal-on-metal — stop driving and call us." },
  { title: "Pulling to one side", body: "Uneven braking, often a seized calliper or uneven pad wear. Affects steering and safety." },
  { title: "Soft or spongy pedal", body: "Air in the brake lines or a fluid leak. The pedal should feel firm every time." },
  { title: "Vibration when braking", body: "Warped or corroded discs cause a judder through the pedal or steering wheel under braking." },
] as const;

const FAQS = [
  {
    q: "How do I know when my brake pads need replacing?",
    a: "Common signs include a high-pitched squealing when braking, a longer stopping distance, a vibrating brake pedal, or the brake warning light illuminating on your dashboard.",
  },
  {
    q: "Should I replace brake pads and discs at the same time?",
    a: "Not necessarily — but if a disc is scored, corroded, or worn below its minimum thickness, fitting new pads to a worn disc reduces the lifespan of both. We inspect and advise when you bring the car in.",
  },
  {
    q: "How long do brake pads last in the UK?",
    a: "Typically 25,000–60,000 miles, but this varies with driving style. Urban stop-start driving wears pads much faster than motorway use. Front pads usually wear before rear.",
  },
  {
    q: "Is it safe to drive with a brake warning light on?",
    a: "No — book in immediately. The light can indicate worn pads, low brake fluid, or a more serious hydraulic fault. Brakes are safety-critical and should never be ignored.",
  },
] as const;

export default async function BrakesPage() {
  const content = await getPageContent("repairs-brakes");
  const title = f(content, "hero_title", "Brakes & Tyres");
  const subtitle = f(content, "hero_subtitle", "Brakes are your car's most important safety system. We diagnose, quote clearly, and only replace what genuinely needs doing — no upselling.");

  return (
    <>
      <JsonLd data={serviceSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Repairs", url: "https://www.mariestonservicecentre.co.uk/repairs" },
        { name: "Brakes", url: "https://www.mariestonservicecentre.co.uk/repairs/brakes" },
      ]} />
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Safety First</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/online-booking?service=brakes" className="flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]">
                  Book Brake Repair
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <a href={waUrl("Hi, I need a brake repair please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Only replace what's worn", label: "We show you the evidence first" },
                { stat: "Brembo & TRW parts", label: "OEM-grade, not budget brands" },
                { stat: "Brake test drive", label: "Road tested before you collect" },
                { stat: "Free tyre check", label: "Depth & pressure checked every visit" },
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
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">What we cover</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Full brake repair service</h2>
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
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Signs your brakes need attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
                    </svg>
                  </span>
                  <h3 className="font-bold text-[#020F3D]">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{s.body}</p>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Don&apos;t delay</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Get your brakes checked today</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">We quote before we start — no obligation. {site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/online-booking?service=brakes" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book brake check
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
              <a href={waUrl("Hi, I need a brake repair quote please.")} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto">
                WhatsApp for a quote
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
