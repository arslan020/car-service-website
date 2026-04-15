import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";
import { BookingBar } from "@/components/booking-bar";

const D = {
  hero_title: "Car Servicing",
  hero_subtitle:
    "Manufacturer-schedule servicing tailored to your make and model. Helps reliability, fuel economy, and resale value — with no dealership prices.",
  tier_interim_price: "from £X",
  tier_full_price: "from £X",
  tier_major_price: "from £X",
};

const TIER_INCLUDES = {
  interim: [
    "Engine oil & filter change", "Air filter inspection", "Brake fluid level check",
    "Coolant level check", "Battery check", "Tyre condition & pressure",
    "Lights & electrics check", "Wiper blade inspection",
  ],
  full: [
    "Everything in Interim", "Air filter replacement", "Pollen / cabin filter check",
    "Fuel filter inspection", "Brake pad & disc measurement", "Suspension & steering inspection",
    "Exhaust system check", "60-point vehicle health check",
  ],
  major: [
    "Everything in Full Service", "Spark plugs replacement", "Timing belt inspection (if due)",
    "Gearbox oil check", "Differential oil check", "Brake fluid flush",
    "Coolant flush (if due)", "Full road test & report",
  ],
};

const BENEFITS = [
  { title: "Protects your warranty", body: "Manufacturer-schedule servicing maintains your vehicle warranty — even at independent garages.", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg> },
  { title: "Saves money long-term", body: "Regular servicing catches small problems before they become expensive repairs.", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
  { title: "Improves fuel economy", body: "Fresh oil, clean filters and correct tyre pressures all contribute to better MPG.", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg> },
  { title: "Boosts resale value", body: "A full service history is one of the most valuable things you can have when selling your car.", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" /></svg> },
] as const;

export default async function CarServicingPage() {
  const c = await getPageContent("car-servicing");

  const tiers = [
    { id: "interim", title: "Interim Service", subtitle: "Every 6 months or 6,000 miles", price: f(c, "tier_interim_price", D.tier_interim_price), popular: false, includes: TIER_INCLUDES.interim },
    { id: "full",    title: "Full Service",    subtitle: "Every 12 months or 12,000 miles", price: f(c, "tier_full_price",    D.tier_full_price),    popular: true,  includes: TIER_INCLUDES.full },
    { id: "major",   title: "Major Service",   subtitle: "As per manufacturer schedule",    price: f(c, "tier_major_price",   D.tier_major_price),   popular: false, includes: TIER_INCLUDES.major },
  ];

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Scheduled servicing</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{f(c, "hero_title", D.hero_title)}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{f(c, "hero_subtitle", D.hero_subtitle)}</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/book?service=full" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto">
              Book a service
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href={waUrl("Hi, I'd like to book a car service please.")} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              WhatsApp us
            </a>
          </div>
          <BookingBar defaultService="full" category="servicing" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Service levels</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Choose your service</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.id} className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm ${tier.popular ? "border-[#3f63ff] shadow-[0_6px_24px_rgba(63,99,255,0.15)]" : "border-[#e8effa]"}`}>
                {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#3f63ff] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">Most popular</span>}
                <div>
                  <h3 className="text-lg font-extrabold text-[#101a56]">{tier.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-400">{tier.subtitle}</p>
                  <p className="mt-3 text-2xl font-extrabold text-[#3f63ff]">{tier.price}</p>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/book?service=${tier.id}`} className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${tier.popular ? "bg-[#101a56] text-white shadow-md hover:bg-[#16236e]" : "border-2 border-[#101a56] text-[#101a56] hover:bg-[#101a56] hover:text-white"}`}>
                  Book {tier.title}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Why service regularly</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">The benefits</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff]">{b.icon}</span>
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
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Ready to book your service?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">Typical service time 1.5–3 hours. Drop off and collect, or ask about our collection service. {site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=full" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book online now
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
