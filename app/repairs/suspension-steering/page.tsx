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
  name: "Suspension & Steering Repair",
  provider: { "@type": "AutoRepair", name: site.name, url: "https://www.mariestonservicecentre.co.uk" },
  areaServed: AREA_SERVED,
  description: "Suspension and steering repair in Hayes UB4. Shock absorbers, springs, ball joints, bushes and wheel alignment.",
  url: "https://www.mariestonservicecentre.co.uk/repairs/suspension-steering",
};

export const metadata: Metadata = {
  title: "Suspension & Steering Repair Hayes UB4 | Marieston",
  description: "Suspension and steering repair in Hayes UB4. Springs, shock absorbers, bushes & wheel alignment. Book online for a fast, reliable fix.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/repairs/suspension-steering" },
};

const SERVICES = [
  "Shock absorber & strut replacement",
  "Coil spring replacement",
  "Wishbone & control arm replacement",
  "Ball joint replacement",
  "Track rod & track rod end replacement",
  "Anti-roll bar link & bush replacement",
  "Power steering pump & rack repair",
  "Wheel alignment & tracking (post-repair)",
];

const SIGNS = [
  { title: "Knocking over bumps", body: "A clunking noise from the suspension usually means a worn ball joint, shock absorber, or bush." },
  { title: "Pulling to one side", body: "The car drifting left or right on a straight road points to worn steering components or misalignment." },
  { title: "Bouncy or unstable ride", body: "If the car continues bouncing after a bump, the shock absorbers have worn and need replacing." },
  { title: "Vague or heavy steering", body: "Excessive play in the steering wheel or heavy effort to turn indicates worn steering rack or pump." },
] as const;

const FAQS = [
  {
    q: "What are the signs of worn suspension?",
    a: "Your car continues bouncing after a bump, you hear clunking or knocking over uneven roads, the car pulls to one side, or you notice uneven tyre wear — all common signs that suspension components need inspection.",
  },
  {
    q: "Is wheel alignment included with a suspension repair?",
    a: "Yes. We carry out a wheel alignment check after any repair where tracking could be affected. Correct alignment ensures even tyre wear and prevents the car pulling to one side.",
  },
  {
    q: "Can worn suspension cause an MOT failure?",
    a: "Yes. Excessive play in steering components, failed shock absorbers, and damaged springs are all MOT failure points. We can identify and repair these before your test.",
  },
  {
    q: "How long does a suspension repair take?",
    a: "Individual component repairs such as a ball joint or shock absorber typically take 1–2 hours per corner. We always road-test the vehicle after any suspension work.",
  },
] as const;

export default async function SuspensionSteeringPage() {
  const content = await getPageContent("repairs-suspension-steering");
  const title = f(content, "hero_title", "Suspension & Steering");
  const subtitle = f(content, "hero_subtitle", "Knocking, pulling, or vague steering — we inspect, diagnose, and repair. Wheel alignment included after every relevant repair.");

  return (
    <>
      <JsonLd data={serviceSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Repairs", url: "https://www.mariestonservicecentre.co.uk/repairs" },
        { name: "Suspension & Steering", url: "https://www.mariestonservicecentre.co.uk/repairs/suspension-steering" },
      ]} />
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Chassis & Handling</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/online-booking?service=suspension" className="flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]">
                  Book Suspension Repair
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <a href={waUrl("Hi, I need a suspension/steering repair please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "4-wheel alignment", label: "Laser alignment after every job" },
                { stat: "Shock absorber bounce test", label: "Shown to you before we quote" },
                { stat: "Steering play check", label: "Rack & track rod ends inspected" },
                { stat: "Straight-line pull test", label: "Road tested before handback" },
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
          <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Suspension & steering services</h2>
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
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Signs your suspension needs attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Get it fixed</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Suspension or steering concern?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">We quote before we touch the car. {site.addressLines.join(", ")}.</p>
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




