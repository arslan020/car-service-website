import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { getPageContentWithDefaults, fl } from "@/lib/page-content";

const COVER_FALLBACK = [
  "OBD-II / serial diagnostics — all makes & models",
  "Engine management & ECU fault reading",
  "ABS, airbag & traction control system faults",
  "Transmission & gearbox fault codes",
  "Emission & DPF system diagnosis",
  "Live data analysis — sensors, injectors, MAF",
  "Electrical circuit testing & short tracing",
  "Pre-purchase inspection & health check",
] as const;

const FAQS = [
  {
    q: "What does a car diagnostic check actually do?",
    a: "We connect professional OBD-II equipment to your car's onboard system, reading fault codes and live sensor data across the engine, ABS, airbag, transmission, and other modules — giving a precise picture of what's wrong.",
  },
  {
    q: "Can you find a fault even if the warning light has gone off?",
    a: "Yes. Fault codes are stored in the ECU even after a warning light clears. We can retrieve historical codes and identify intermittent faults that don't keep a light on permanently.",
  },
  {
    q: "How long does a diagnostic check take?",
    a: "A standard scan takes 30–60 minutes. More complex faults requiring live data analysis or circuit testing may take longer — we'll advise once we've assessed the vehicle.",
  },
  {
    q: "Do you charge for the diagnostic check?",
    a: "We charge a clearly quoted diagnostic fee upfront. If you proceed with the repair at our garage, the diagnostic cost is factored into the overall quote — ask us for details when you book.",
  },
] as const;

export default async function DiagnosticsPage() {
  const c = await getPageContentWithDefaults("diagnostics");
  const services = fl(c, "cover_list", COVER_FALLBACK);

  const stats = [
    { stat: c.stat_1_value, label: c.stat_1_label },
    { stat: c.stat_2_value, label: c.stat_2_label },
    { stat: c.stat_3_value, label: c.stat_3_label },
    { stat: c.stat_4_value, label: c.stat_4_label },
  ];

  const signs = [
    { title: c.sign_1_title, body: c.sign_1_body },
    { title: c.sign_2_title, body: c.sign_2_body },
    { title: c.sign_3_title, body: c.sign_3_body },
    { title: c.sign_4_title, body: c.sign_4_body },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">{c.hero_eyebrow}</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{c.hero_title}</h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{c.hero_subtitle}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/online-booking?service=diagnostics" className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]">
                  Book Diagnostics
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <a href={waUrl("Hi, I'd like to book a diagnostics check please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
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
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">{c.cover_kicker}</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">{c.cover_title}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((item) => (
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">{c.signs_kicker}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">{c.signs_title}</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {signs.map((s) => (
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">{c.bottom_kicker}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">{c.bottom_title}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              {c.bottom_body} {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/online-booking?service=diagnostics" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                {c.bottom_btn}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
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
