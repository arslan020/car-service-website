import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";
import { getPageContent, f } from "@/lib/page-content";

const CHECKS = [
  "Battery voltage & state-of-charge test",
  "Cold cranking amps (CCA) capacity test",
  "Alternator output & charging circuit test",
  "Starter motor draw test",
  "Visual inspection for corrosion & damage",
  "Written report with pass / advisory / replace recommendation",
];

const SIGNS = [
  { title: "Slow or sluggish starts", body: "Engine cranks slowly or hesitates before firing — classic sign of a weakening battery." },
  { title: "Battery warning light", body: "The battery or charge light on your dashboard means the system needs attention now." },
  { title: "Electrical gremlins", body: "Flickering lights, random warning lights, or electronics behaving oddly under load." },
  { title: "Battery over 3 years old", body: "Most batteries last 3–5 years. A free health check prevents an unexpected breakdown." },
] as const;

export default async function BatteryCheckPage() {
  const content = await getPageContent("battery-check");
  const title = f(content, "hero_title", "Battery Check");
  const subtitle = f(content, "hero_subtitle", "A full battery and charging system test using professional diagnostic equipment. Know your battery's health before it leaves you stranded.");

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Electrical Health</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            {subtitle}
          </p>
          <BookingBar defaultService="battery" category="services" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we test</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Full charging system check</h2>
              <ul className="mt-6 space-y-3">
                {CHECKS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 content-start">
              {[
                { stat: "Free", label: "battery health test" },
                { stat: "~15 min", label: "quick turnaround" },
                { stat: "All makes", label: "cars & light vans" },
                { stat: "Same day", label: "replacement if needed" },
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

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Warning signs</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">When to get a battery check</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex items-center gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm sm:flex-col sm:items-start sm:gap-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] sm:mb-3">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-[#101a56]">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Don&apos;t get stranded</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Get your battery tested today</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{site.addressLines.join(", ")} — walk-ins welcome.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=battery" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book battery check
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
