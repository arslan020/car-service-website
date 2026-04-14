import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

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

export default function ElectricalPage() {
  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Auto Electrics</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">Electrical & Lighting</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Warning lights, failed electrics, battery drain, or blown bulbs — diagnosed
            with professional equipment and repaired correctly.
          </p>
          <div className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/book?service=electrical" className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]">
              Request a quote
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href={waUrl("Hi, I need an electrical repair quote please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
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
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Electrical & lighting services</h2>
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
                { stat: "OBD scan", label: "professional diagnostics" },
                { stat: "All makes", label: "cars & light vans" },
                { stat: "Same day", label: "many faults fixed" },
                { stat: "Clear quote", label: "before any work starts" },
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
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Signs your electrics need attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex items-start gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm sm:flex-col sm:gap-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] sm:mb-3">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-bold text-[#101a56]">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500" dangerouslySetInnerHTML={{ __html: s.body }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Get it diagnosed</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Electrical problem? Let&apos;s find it.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{site.addressLines.join(", ")}. We diagnose first, quote before we fix.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=electrical" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
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
