import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";
import { getPageContent, f } from "@/lib/page-content";

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

export default async function BrakesPage() {
  const content = await getPageContent("repairs-brakes");
  const title = f(content, "hero_title", "Brakes & Tyres");
  const subtitle = f(content, "hero_subtitle", "Brakes are your car's most important safety system. We diagnose, quote clearly, and only replace what genuinely needs doing — no upselling.");

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Safety First</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            {subtitle}
          </p>
          <BookingBar defaultService="brakes" category="repairs" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we cover</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Full brake repair service</h2>
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
                { stat: "Same day", label: "most repairs completed" },
                { stat: "All makes", label: "cars & light vans" },
                { stat: "Quality parts", label: "OEM & premium brands" },
                { stat: "Road tested", label: "before every handback" },
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
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Signs your brakes need attention</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNS.map((s) => (
              <div key={s.title} className="flex items-start gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm sm:flex-col sm:gap-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] sm:mb-3">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Don&apos;t delay</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Get your brakes checked today</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">We quote before we start — no obligation. {site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=brakes" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
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
  );
}
