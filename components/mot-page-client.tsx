"use client";

import { site, waUrl } from "@/lib/site-config";
import { EditableText } from "@/components/editable-text";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import type { ContentMap } from "@/lib/page-content";

const CHECKS_FALLBACK = [
  "Lights, reflectors & electrical equipment",
  "Steering & suspension components",
  "Brakes — pads, discs & hydraulics",
  "Tyres — tread depth, condition & pressure",
  "Seatbelts & restraint systems",
  "Windscreen, wipers & washers",
  "Horn & mirrors",
  "Exhaust emissions & noise",
  "Fuel system integrity",
  "Vehicle identification (VIN / number plate)",
  "Body structure & underbody",
  "Driver's view of the road",
] as const;

export function MotPageClient({ content: c, editable = false }: { content: ContentMap; editable?: boolean }) {
  const checks =
    c.checks_list !== undefined && c.checks_list.trim()
      ? c.checks_list.split("\n").map((s) => s.trim()).filter(Boolean)
      : [...CHECKS_FALLBACK];

  const faqs = [
    { qKey: "faq_1_q", aKey: "faq_1_a", q: c.faq_1_q, a: c.faq_1_a },
    { qKey: "faq_2_q", aKey: "faq_2_a", q: c.faq_2_q, a: c.faq_2_a },
    { qKey: "faq_3_q", aKey: "faq_3_a", q: c.faq_3_q, a: c.faq_3_a },
    { qKey: "faq_4_q", aKey: "faq_4_a", q: c.faq_4_q, a: c.faq_4_a },
  ];

  const steps = [
    { n: 1, titleKey: "step_1_title", bodyKey: "step_1_body", title: c.step_1_title, body: c.step_1_body },
    { n: 2, titleKey: "step_2_title", bodyKey: "step_2_body", title: c.step_2_title, body: c.step_2_body },
    { n: 3, titleKey: "step_3_title", bodyKey: "step_3_body", title: c.step_3_title, body: c.step_3_body },
    { n: 4, titleKey: "step_4_title", bodyKey: "step_4_body", title: c.step_4_title, body: c.step_4_body },
  ];

  const stats = [
    { statKey: "hero_price", labelKey: "stat_1_label", stat: c.hero_price, label: c.stat_1_label },
    { statKey: "stat_2_value", labelKey: "stat_2_label", stat: c.stat_2_value, label: c.stat_2_label },
    { statKey: "stat_3_value", labelKey: "stat_3_label", stat: c.stat_3_value, label: c.stat_3_label },
    { statKey: "stat_4_value", labelKey: "stat_4_label", stat: c.stat_4_value, label: c.stat_4_label },
  ];

  const motServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MOT Test",
    provider: {
      "@type": "AutoRepair",
      name: site.name,
      url: "https://www.mariestonservicecentre.co.uk",
    },
    areaServed: [
      "Hayes", "Southall", "Uxbridge", "Slough", "Hounslow", "Ealing", "Greenford",
      "Northolt", "Harrow", "Wembley", "Richmond", "Twickenham", "Windsor", "Feltham",
      "Isleworth", "Ruislip", "Acton", "Chiswick", "Brentford", "Hanwell",
      "West Drayton", "Hillingdon", "Watford", "Kingston upon Thames", "Staines-upon-Thames",
    ].map((name) => ({ "@type": "Place", name })),
    description: "DVSA-approved MOT testing for cars and light vehicles in Hayes UB4, serving West London and surrounding areas.",
    url: "https://www.mariestonservicecentre.co.uk/mot",
  };

  return (
    <>
      <JsonLd data={motServiceSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "MOT Test", url: "https://www.mariestonservicecentre.co.uk/mot" },
      ]} />
    <div className="bg-white">

      <section className="relative bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">

        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="mot" fieldKey="hero_eyebrow" value={c.hero_eyebrow} editable={editable} /></p>
              <div className="mt-2 flex items-center gap-4">
                <h1 className="text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl"><EditableText pageKey="mot" fieldKey="hero_title" value={c.hero_title} editable={editable} /></h1>
                {/* Coming Soon sticker */}
                <div className="flex h-20 w-20 shrink-0 rotate-12 items-center justify-center rounded-full bg-[#020F3D] shadow-xl sm:h-24 sm:w-24">
                  <p className="text-center text-[10px] font-extrabold uppercase leading-tight tracking-wide text-white sm:text-[11px]">
                    🚧 Coming<br />Soon
                  </p>
                </div>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg"><EditableText pageKey="mot" fieldKey="hero_subtitle" value={c.hero_subtitle} type="textarea" editable={editable} /></p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 shadow-sm">
                <span className="text-2xl font-extrabold text-[#020F3D]"><EditableText pageKey="mot" fieldKey="hero_price" value={c.hero_price} editable={editable} /></span>
                <span className="text-sm text-slate-500"><EditableText pageKey="mot" fieldKey="hero_price_suffix" value={c.hero_price_suffix} editable={editable} /></span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#eef4ff] px-4 py-2">
                <span className="text-sm font-semibold text-[#0F63FF]">Book with any service & pay just £35 for your MOT</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <span className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-400 px-6 py-3.5 text-sm font-bold text-white shadow-md opacity-75">
                  🚧 <EditableText pageKey="mot" fieldKey="btn_book_mot" value={c.btn_book_mot} editable={editable} />
                </span>
                <a
                  href={waUrl("Hi, I'd like to book an MOT please.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <EditableText pageKey="mot" fieldKey="btn_whatsapp" value={c.btn_whatsapp} editable={editable} />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                  <p className="text-2xl font-extrabold text-[#0F63FF]"><EditableText pageKey="mot" fieldKey={item.statKey} value={item.stat} editable={editable} /></p>
                  <p className="mt-1 text-xs text-slate-500"><EditableText pageKey="mot" fieldKey={item.labelKey} value={item.label} editable={editable} /></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="mot" fieldKey="checks_kicker" value={c.checks_kicker} editable={editable} /></p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl"><EditableText pageKey="mot" fieldKey="checks_title" value={c.checks_title} editable={editable} /></h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {checks.map((check) => (
              <div key={check} className="flex items-center gap-3 rounded-xl border border-[#e8effa] bg-white px-4 py-3 shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#0F63FF]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-sm text-slate-700">
                  <EditableText pageKey="mot" fieldKey="checks_list" value={c.checks_list ?? ""} type="textarea" editable={editable} display={check} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="mot" fieldKey="process_kicker" value={c.process_kicker} editable={editable} /></p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl"><EditableText pageKey="mot" fieldKey="process_title" value={c.process_title} editable={editable} /></h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F63FF] to-[#4DA3FF] text-sm font-extrabold text-white shadow-md shadow-[#0F63FF]/25">{step.n}</span>
                  <h3 className="font-bold text-[#020F3D]"><EditableText pageKey="mot" fieldKey={step.titleKey} value={step.title} editable={editable} /></h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500"><EditableText pageKey="mot" fieldKey={step.bodyKey} value={step.body} type="textarea" editable={editable} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="mot" fieldKey="faq_section_kicker" value={c.faq_section_kicker} editable={editable} /></p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl"><EditableText pageKey="mot" fieldKey="faq_section_title" value={c.faq_section_title} editable={editable} /></h2>
          </div>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#020F3D]"><EditableText pageKey="mot" fieldKey={faq.qKey} value={faq.q} editable={editable} /></h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500"><EditableText pageKey="mot" fieldKey={faq.aKey} value={faq.a} type="textarea" editable={editable} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]"><EditableText pageKey="mot" fieldKey="bottom_kicker" value={c.bottom_kicker} editable={editable} /></p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl"><EditableText pageKey="mot" fieldKey="bottom_title" value={c.bottom_title} editable={editable} /></h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              <EditableText pageKey="mot" fieldKey="bottom_body" value={c.bottom_body} type="textarea" editable={editable} /> {site.phoneDisplay}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <span className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-400 px-7 py-3.5 text-sm font-bold text-white shadow-md opacity-75 sm:w-auto">
                🚧 <EditableText pageKey="mot" fieldKey="bottom_btn_book" value={c.bottom_btn_book} editable={editable} />
              </span>
              <a href={waUrl("Hi, I'd like to book an MOT please.")} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                WhatsApp Us
              </a>
              <a href={`tel:${site.phoneTel}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF] sm:w-auto">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
