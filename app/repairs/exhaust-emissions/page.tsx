import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";

const SERVICES = [
  "Exhaust pipe, centre section & back box replacement",
  "Manifold gasket replacement",
  "Catalytic converter replacement",
  "DPF (diesel particulate filter) cleaning & replacement",
  "Lambda / O2 sensor replacement",
  "EGR valve cleaning & replacement",
  "Emissions diagnostic scan & readiness check",
  "MOT emissions retest after repair",
];

const SIGNS = [
  { title: “Loud blowing noise”, body: “A sudden roar or hissing from under the car — usually a blown joint, cracked pipe or failed back box.” },
  { title: "Failed MOT emissions", body: "High CO, HC, or NOx readings often point to a faulty cat, lambda sensor, or DPF issue." },
  { title: "DPF warning light", body: "Diesel vehicles: a solid or flashing DPF light means the filter is blocked and needs attention quickly." },
  { title: “Rattling underneath”, body: “A heat shield loose on the exhaust or a loose mounting bracket — annoying but easy to fix.” },
] as const;

const FAQS = [
  {
    q: "Why is my car failing its MOT on emissions?",
    a: "High emissions typically point to a faulty catalytic converter, a failed lambda or O2 sensor, a blocked DPF, or a rich-running engine. We diagnose the root cause before quoting for any parts.",
  },
  {
    q: "What is a DPF and why does it get blocked?",
    a: "A diesel particulate filter (DPF) captures soot from the exhaust. Short, low-speed journeys prevent it from reaching the temperature needed to self-clean (regenerate), causing it to block over time.",
  },
  {
    q: "Can a DPF be cleaned instead of replaced?",
    a: "In many cases yes — a forced regeneration or a professional clean can restore a partially blocked DPF. We'll assess your vehicle and recommend the most cost-effective solution.",
  },
  {
    q: "Is a blowing exhaust an MOT failure?",
    a: "Yes. An exhaust leaking through a crack, hole, or failed joint creates excessive noise and is an MOT failure. It's also a safety concern as carbon monoxide can enter the cabin.",
  },
] as const;

export default async function ExhaustEmissionsPage() {
  const content = await getPageContent("repairs-exhaust-emissions");
  const title = f(content, "hero_title", "Exhaust & Emissions");
  const subtitle = f(content, “hero_subtitle”, “Blowing exhaust, failed emissions on MOT, or a DPF warning light — we diagnose and repair with quality parts and clear pricing.”);

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Exhaust & Emissions</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/online-booking?service=exhaust" className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]">
                  Book Exhaust Repair
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <a href={waUrl("Hi, I need an exhaust repair please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Diagnose first", label: "scan before quoting" },
                { stat: "MOT retest", label: "included after repair" },
                { stat: "Petrol & diesel", label: "all fuel types" },
                { stat: "Same day", label: "most repairs" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                  <p className="text-2xl font-extrabold text-[#3f63ff]">{s.stat}</p>
                  <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we repair</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Full exhaust & emissions service</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SERVICES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Warning signs</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Signs your exhaust needs attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                  </span>
                  <h3 className="font-bold text-[#101a56]">{s.title}</h3>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Common questions</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Frequently asked questions</h2>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Get it fixed</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Exhaust or emissions issue?</h2>
            <p className=”mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300”>{site.addressLines.join(“, “)}. Quote before we start — no surprises.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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




