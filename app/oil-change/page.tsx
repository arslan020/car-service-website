import Link from "next/link";
import { site } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";
import { getPageContent, f } from "@/lib/page-content";

const INCLUDES = [
  "Drain old engine oil completely",
  "Replace oil filter with OEM-spec part",
  "Fill with correct-grade oil for your engine",
  "Top up screen wash, coolant & brake fluid",
  "Environmentally responsible oil disposal",
  "Visual check of belts, hoses & leaks",
  "Tyre pressure check & report",
];

const BENEFITS = [
  { title: "Protects your engine", body: "Fresh oil keeps moving parts lubricated and reduces friction, preventing premature wear." },
  { title: "Better fuel economy", body: "Clean oil reduces drag inside the engine, so less fuel is wasted on internal friction." },
  { title: "Prevents overheating", body: "Oil also helps carry heat away from critical engine components between coolant cycles." },
  { title: "Catches problems early", body: "We inspect while we work — if we spot something, we tell you before it becomes expensive." },
] as const;

export default async function OilChangePage() {
  const content = await getPageContent("oil-change");
  const title = f(content, "hero_title", "Oil Change");
  const subtitle = f(content, "hero_subtitle", "Right-spec oil and filter for your engine. Fast turnaround — often while you wait. Helps fuel economy and protects against premature wear.");

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Premium Oil</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            {subtitle}
          </p>
          <BookingBar defaultService="oil" category="services" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What&apos;s included</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Every oil change includes</h2>
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
            <div className="grid grid-cols-2 gap-4 content-start">
              {[
                { stat: "~30 min", label: "typical turnaround" },
                { stat: "All grades", label: "synthetic, semi & mineral" },
                { stat: "OEM spec", label: "manufacturer-approved oils" },
                { stat: "Free check", label: "visual inspection included" },
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Why it matters</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">The benefits of regular oil changes</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff]">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                    </svg>
                  </span>
                  <h3 className="font-bold text-[#101a56]">{b.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Book today</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Ready for a fresh oil change?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">Fast, clean, and done right. {site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=oil" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book oil change
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
