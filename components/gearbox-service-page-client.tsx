"use client";

import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";

const gearboxSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Gearbox Service",
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
  description: "Manual, automatic, DSG and CVT gearbox service in Hayes UB4. Gearbox oil change, inspection and fault diagnosis for all makes across West London.",
  url: "https://www.mariestonservicecentre.co.uk/gearbox-service",
};

function parseLines(raw: string): string[] {
  return raw.split("\n").map((l) => l.trim()).filter(Boolean);
}

export function GearboxServicePageClient({ content: c, editable = false }: { content: ContentMap; editable?: boolean }) {
  const includes = parseLines(c.includes_list);

  const stats = [
    { valueKey: "stat_1_value", labelKey: "stat_1_label", value: c.stat_1_value, label: c.stat_1_label },
    { valueKey: "stat_2_value", labelKey: "stat_2_label", value: c.stat_2_value, label: c.stat_2_label },
    { valueKey: "stat_3_value", labelKey: "stat_3_label", value: c.stat_3_value, label: c.stat_3_label },
    { valueKey: "stat_4_value", labelKey: "stat_4_label", value: c.stat_4_value, label: c.stat_4_label },
  ];

  const types = [
    { titleKey: "type_1_title", bodyKey: "type_1_body", title: c.type_1_title, body: c.type_1_body },
    { titleKey: "type_2_title", bodyKey: "type_2_body", title: c.type_2_title, body: c.type_2_body },
    { titleKey: "type_3_title", bodyKey: "type_3_body", title: c.type_3_title, body: c.type_3_body },
    { titleKey: "type_4_title", bodyKey: "type_4_body", title: c.type_4_title, body: c.type_4_body },
  ];

  const signs = [
    { titleKey: "sign_1_title", bodyKey: "sign_1_body", title: c.sign_1_title, body: c.sign_1_body },
    { titleKey: "sign_2_title", bodyKey: "sign_2_body", title: c.sign_2_title, body: c.sign_2_body },
    { titleKey: "sign_3_title", bodyKey: "sign_3_body", title: c.sign_3_title, body: c.sign_3_body },
    { titleKey: "sign_4_title", bodyKey: "sign_4_body", title: c.sign_4_title, body: c.sign_4_body },
  ];

  const faqs = [
    { qKey: "faq_1_q", aKey: "faq_1_a", q: c.faq_1_q, a: c.faq_1_a },
    { qKey: "faq_2_q", aKey: "faq_2_a", q: c.faq_2_q, a: c.faq_2_a },
    { qKey: "faq_3_q", aKey: "faq_3_a", q: c.faq_3_q, a: c.faq_3_a },
    { qKey: "faq_4_q", aKey: "faq_4_a", q: c.faq_4_q, a: c.faq_4_a },
    { qKey: "faq_5_q", aKey: "faq_5_a", q: c.faq_5_q, a: c.faq_5_a },
  ];

  return (
    <>
      <JsonLd data={gearboxSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Gearbox Service", url: "https://www.mariestonservicecentre.co.uk/gearbox-service" },
      ]} />
      <div className="bg-white">

        {/* Hero */}
        <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                  <EditableText pageKey="gearbox-service" fieldKey="hero_kicker" value={c.hero_kicker} editable={editable} />
                </p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
                  <EditableText pageKey="gearbox-service" fieldKey="hero_title" value={c.hero_title} editable={editable} />
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
                  <EditableText pageKey="gearbox-service" fieldKey="hero_subtitle" value={c.hero_subtitle} type="textarea" editable={editable} />
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 shadow-sm">
                  <svg className="h-4 w-4 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="text-sm font-semibold text-[#020F3D]">
                    <EditableText pageKey="gearbox-service" fieldKey="price_note" value={c.price_note} editable={editable} />
                  </span>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={waUrl("Hi, I'd like a quote for a gearbox service please.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                    Get a Quote
                  </a>
                  <Link
                    href="/quote"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF]"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.valueKey} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                    <p className="text-xl font-extrabold text-[#0F63FF]">
                      <EditableText pageKey="gearbox-service" fieldKey={s.valueKey} value={s.value} editable={editable} />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      <EditableText pageKey="gearbox-service" fieldKey={s.labelKey} value={s.label} editable={editable} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
              <EditableText pageKey="gearbox-service" fieldKey="includes_kicker" value={c.includes_kicker} editable={editable} />
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
              <EditableText pageKey="gearbox-service" fieldKey="includes_title" value={c.includes_title} editable={editable} />
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gearbox types */}
        <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                <EditableText pageKey="gearbox-service" fieldKey="types_kicker" value={c.types_kicker} editable={editable} />
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
                <EditableText pageKey="gearbox-service" fieldKey="types_title" value={c.types_title} editable={editable} />
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {types.map((g) => (
                <div key={g.titleKey} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                      </svg>
                    </span>
                    <h3 className="font-bold text-[#020F3D]">
                      <EditableText pageKey="gearbox-service" fieldKey={g.titleKey} value={g.title} editable={editable} />
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500">
                    <EditableText pageKey="gearbox-service" fieldKey={g.bodyKey} value={g.body} type="textarea" editable={editable} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning signs */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-red-500">
                <EditableText pageKey="gearbox-service" fieldKey="signs_kicker" value={c.signs_kicker} editable={editable} />
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
                <EditableText pageKey="gearbox-service" fieldKey="signs_title" value={c.signs_title} editable={editable} />
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {signs.map((s) => (
                <div key={s.titleKey} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </span>
                    <h3 className="font-bold text-[#020F3D]">
                      <EditableText pageKey="gearbox-service" fieldKey={s.titleKey} value={s.title} editable={editable} />
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-500">
                    <EditableText pageKey="gearbox-service" fieldKey={s.bodyKey} value={s.body} type="textarea" editable={editable} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#f4f8ff] px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                <EditableText pageKey="gearbox-service" fieldKey="faq_kicker" value={c.faq_kicker} editable={editable} />
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
                <EditableText pageKey="gearbox-service" fieldKey="faq_title" value={c.faq_title} editable={editable} />
              </h2>
            </div>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.qKey} className="rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-[#020F3D]">
                    <EditableText pageKey="gearbox-service" fieldKey={faq.qKey} value={faq.q} editable={editable} />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    <EditableText pageKey="gearbox-service" fieldKey={faq.aKey} value={faq.a} type="textarea" editable={editable} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
              <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">
                <EditableText pageKey="gearbox-service" fieldKey="cta_kicker" value={c.cta_kicker} editable={editable} />
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                <EditableText pageKey="gearbox-service" fieldKey="cta_title" value={c.cta_title} editable={editable} />
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                <EditableText pageKey="gearbox-service" fieldKey="cta_body" value={c.cta_body} type="textarea" editable={editable} /> {site.addressLines.join(", ")}.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={waUrl("Hi, I'd like a quote for a gearbox service please.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                  WhatsApp for a Quote
                </a>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto"
                >
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
