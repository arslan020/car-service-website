import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";
import { BookingBar } from "@/components/booking-bar";

const D = {
  hero_title: "Repairs",
  hero_subtitle:
    "From brakes and suspension to clutches, exhausts and timing components. We diagnose first, quote clearly, and only proceed with your approval — no surprises.",
};

const REPAIR_CATEGORIES = [
  { href: "/repairs/brakes",             title: "Brakes",               desc: "Pads, discs, callipers, brake lines and handbrake cables. We measure wear and advise only when action is genuinely needed.",           items: ["Brake pads & discs", "Callipers & cylinders", "Brake lines & hoses", "ABS sensor faults"],                         icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg> },
  { href: "/repairs/clutch-gearbox",     title: "Clutch & Gearbox",     desc: "Slipping clutch, stiff biting point, grinding gears — we diagnose and repair manual and automatic transmissions.",               items: ["Clutch plate & pressure", "Flywheel replacement", "Gear linkage", "Automatic transmission service"],                icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 6.75 2.906"/></svg> },
  { href: "/repairs/suspension-steering",title: "Suspension & Steering", desc: "Knocking on bumps, pulling to one side, or vague steering? We check and replace worn components.",                                items: ["Shock absorbers & struts", "Wishbones & ball joints", "Track rod ends", "Power steering faults"],               icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg> },
  { href: "/repairs/exhaust-emissions",  title: "Exhaust & Emissions",  desc: "Blowing exhaust, rattling heat shields, catalytic converter issues, or failed emissions on MOT — we fix it.",                   items: ["Exhaust pipe & silencer", "Catalytic converter", "DPF cleaning & replacement", "Lambda / O2 sensors"],          icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"/></svg> },
  { href: "/repairs/engine-cooling",     title: "Engine & Cooling",     desc: "Overheating, oil leaks, warning lights — we trace the root cause with diagnostics before quoting.",                            items: ["Coolant system leaks", "Thermostat replacement", "Water pump", "Timing belt & chain"],                           icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/></svg> },
  { href: "/repairs/electrical",         title: "Electrical & Lighting",desc: "Warning lights, failed electrics, battery drain or blown bulbs — diagnosed and repaired.",                                    items: ["Battery testing & replacement", "Alternator & starter motor", "Bulb & light unit replacement", "Central locking & windows"], icon: <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg> },
] as const;

const PROCESS = [
  { n: 1, title: "We diagnose first", body: "We identify the root cause using diagnostic tools, visual inspection, and a road test where needed." },
  { n: 2, title: "You get a clear quote", body: "Parts and labour quoted upfront. No work starts until you approve the price." },
  { n: 3, title: "We carry out the repair", body: "Quality parts fitted by experienced technicians. We text you when the car is ready." },
  { n: 4, title: "We test & road check", body: "Every repair is tested before we hand the car back — no guesswork." },
] as const;

export default async function RepairsPage() {
  const c = await getPageContent("repairs");

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">All makes & models</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{f(c, "hero_title", D.hero_title)}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{f(c, "hero_subtitle", D.hero_subtitle)}</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/quote" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto">
              Request a quote
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href={waUrl("Hi, I need a repair quote please.")} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp for a quote
            </a>
          </div>
          <BookingBar defaultService="brakes" category="repairs" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we repair</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Repair categories</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REPAIR_CATEGORIES.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">{cat.icon}</span>
                    <h3 className="font-bold text-[#101a56] transition-colors group-hover:text-[#3f63ff]">{cat.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500">{cat.desc}</p>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-[#eef4ff] pt-4">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3f63ff]" />{item}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#3f63ff] group-hover:text-[#101a56]">
                  View details
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">How it works</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Our repair process</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3f63ff] to-[#6b8fff] text-sm font-extrabold text-white shadow-md shadow-[#3f63ff]/25">{step.n}</span>
                  <h3 className="font-bold text-[#101a56]">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Get it fixed</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Need a repair quote?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">Tell us your reg and what&apos;s happening — we&apos;ll come back with a clear price. No obligation.</p>
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
