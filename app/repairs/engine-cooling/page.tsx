import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

const SERVICES = [
  "Coolant system pressure test & leak trace",
  "Thermostat replacement",
  "Water pump replacement",
  "Radiator replacement & flush",
  "Head gasket diagnosis & repair",
  "Timing belt & chain replacement",
  "Engine oil leak repair",
  "Cooling fan & sensor replacement",
];

const SIGNS = [
  { title: "Temperature gauge rising", body: "If your temperature gauge creeps toward red, pull over safely. Overheating causes serious engine damage quickly." },
  { title: "Oil or coolant leaks", body: "Puddles under the car or a sweet smell while driving — coolant leaks need tracing before they get worse." },
  { title: "Engine warning light", body: "A solid or flashing engine light can indicate anything from a loose sensor to a more serious fault." },
  { title: "White exhaust smoke", body: "Thick white smoke from the exhaust often means coolant is burning — a potential head gasket issue." },
] as const;

export default function EngineCoolingPage() {
  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Engine Repairs</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">Engine & Cooling</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Overheating, oil leaks, warning lights — we trace the root cause with diagnostics
            before quoting. No guesswork, no unnecessary parts.
          </p>
          <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/quote" className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]">
              Request a quote
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href={waUrl("Hi, I need an engine/cooling repair quote please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we repair</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Engine & cooling services</h2>
              <ul className="mt-6 space-y-3">
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
            <div className="grid grid-cols-2 gap-4 content-start">
              {[
                { stat: "Diagnose first", label: "before any parts" },
                { stat: "Clear quote", label: "upfront pricing" },
                { stat: "All makes", label: "petrol & diesel" },
                { stat: "Road tested", label: "after every repair" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                  <p className="text-xl font-extrabold text-[#3f63ff]">{s.stat}</p>
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
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Signs your engine needs attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex items-start gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm sm:flex-col sm:gap-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] sm:mb-3">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Don&apos;t ignore it</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Engine or cooling concern?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">Early diagnosis prevents costly damage. {site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/quote" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Request a quote
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
