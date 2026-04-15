import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";
import { getPageContent, f } from "@/lib/page-content";

const SERVICES = [
  "OBD-II / serial diagnostics — all makes & models",
  "Engine management & ECU fault reading",
  "ABS, airbag & traction control system faults",
  "Transmission & gearbox fault codes",
  "Emission & DPF system diagnosis",
  "Live data analysis — sensors, injectors, MAF",
  "Electrical circuit testing & short tracing",
  "Pre-purchase inspection & health check",
];

const SIGNS = [
  { title: "Engine warning light", body: "A solid or flashing engine light can mean anything from a loose sensor to a serious fault — we read the codes and tell you exactly what's wrong." },
  { title: "Limp mode", body: "If your car suddenly loses power and rev-limits itself, the ECU has detected a fault. We diagnose the root cause before any guesswork repairs." },
  { title: "Odd noises or running", body: "Misfires, rough idle, hesitation under load — live data lets us pinpoint faulty sensors, injectors, or ignition issues fast." },
  { title: "Multiple dashboard lights", body: "ABS, traction control, airbag or TPMS lights on together often point to a shared fault. We trace it properly rather than replacing parts blindly." },
] as const;

export default async function DiagnosticsPage() {
  const content = await getPageContent("diagnostics");
  const title = f(content, "hero_title", "Diagnostics");
  const subtitle = f(content, "hero_subtitle", "Warning lights, limp mode, odd noises, or poor running — we use serial diagnostics and measured tests to find the root cause before replacing parts.");

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Diagnostics</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            {subtitle}
          </p>
          <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/book?service=diagnostics" className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]">
              Book diagnostics
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href={waUrl("Hi, I need a diagnostics check please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
              WhatsApp us
            </a>
          </div>
          <BookingBar defaultService="diagnostics" category="services" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we cover</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Full diagnostic service</h2>
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
                { stat: "Root cause", label: "not guesswork repairs" },
                { stat: "All makes", label: "petrol, diesel & hybrid" },
                { stat: "Live data", label: "sensor & injector analysis" },
                { stat: "Clear report", label: "written fault summary" },
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
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Signs your car needs a diagnostic check</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Don&apos;t ignore it</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Get your car diagnosed today</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              We find the fault first — then quote for the fix. No parts replaced on guesswork. {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=diagnostics" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book diagnostics
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
