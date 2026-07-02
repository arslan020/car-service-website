"use client";

import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";

const SERVICES = [
  {
    href: "/mot",
    eyebrowKey: "svc_mot_eyebrow",
    titleKey: "svc_mot_title",
    descKey: "svc_mot_desc",
    priceKey: "svc_mot_price",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" viewBox="0 0 24 24">
        <polygon points="7.5,2 1.5,13 13.5,13"/><polygon points="16.5,2 10.5,13 22.5,13"/><polygon points="12,11.5 5,22 19,22"/>
      </svg>
    ),
  },
  {
    href: "/diagnostics",
    eyebrowKey: "svc_diag_eyebrow",
    titleKey: "svc_diag_title",
    descKey: "svc_diag_desc",
    priceKey: "svc_diag_price",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM1 19h22M7 11h1.5l1.5-2 2 4 1.5-2H17"/>
      </svg>
    ),
  },
  {
    href: "/repairs/tyres",
    eyebrowKey: "svc_tyres_eyebrow",
    titleKey: "svc_tyres_title",
    descKey: "svc_tyres_desc",
    priceKey: "svc_tyres_price",
    noPrice: true,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5l1.5-1.5M17 7l1.5-1.5" />
      </svg>
    ),
  },
  {
    href: "/repairs/brakes",
    eyebrowKey: "svc_brakes_eyebrow",
    titleKey: "svc_brakes_title",
    descKey: "svc_brakes_desc",
    priceKey: "svc_brakes_price",
    noPrice: true,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    href: "/car-servicing/interim",
    eyebrowKey: "svc_oil_eyebrow",
    titleKey: "svc_oil_title",
    descKey: "svc_oil_desc",
    priceKey: "svc_oil_price",
    priceLabel: "from",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    href: "/car-servicing/full",
    eyebrowKey: "svc_full_eyebrow",
    titleKey: "svc_full_title",
    descKey: "svc_full_desc",
    priceKey: "svc_full_price",
    priceLabel: "from",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 7 2 2 4-4m-6 5h4"/>
      </svg>
    ),
  },
  {
    href: "/car-servicing/major",
    eyebrowKey: "svc_major_eyebrow",
    titleKey: "svc_major_title",
    descKey: "svc_major_desc",
    priceKey: "svc_major_price",
    priceLabel: "from",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7.65 7.65 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/brake-fluid",
    eyebrowKey: "svc_bf_eyebrow",
    titleKey: "svc_bf_title",
    descKey: "svc_bf_desc",
    priceKey: "svc_bf_price",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c4.142 0 7.5-3.358 7.5-7.5 0-3.5-4.5-9-7.5-12-3 3-7.5 8.5-7.5 12 0 4.142 3.358 7.5 7.5 7.5Z" />
      </svg>
    ),
  },
  {
    href: "/repairs",
    eyebrowKey: "svc_rep_eyebrow",
    titleKey: "svc_rep_title",
    descKey: "svc_rep_desc",
    priceKey: "svc_rep_price",
    noPrice: true,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.585l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"/>
      </svg>
    ),
  },
];

const REASON_ICONS = [
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
];

export function ServicesPageClient({ content: c, editable = false }: { content: ContentMap; editable?: boolean }) {
  const reasons = [
    { titleKey: "why_1_title", bodyKey: "why_1_body", icon: REASON_ICONS[0], title: c.why_1_title, body: c.why_1_body },
    { titleKey: "why_2_title", bodyKey: "why_2_body", icon: REASON_ICONS[1], title: c.why_2_title, body: c.why_2_body },
    { titleKey: "why_3_title", bodyKey: "why_3_body", icon: REASON_ICONS[2], title: c.why_3_title, body: c.why_3_body },
    { titleKey: "why_4_title", bodyKey: "why_4_body", icon: REASON_ICONS[3], title: c.why_4_title, body: c.why_4_body },
  ];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="services" fieldKey="hero_kicker" value={c.hero_kicker} editable={editable} /></p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl"><EditableText pageKey="services" fieldKey="hero_title" value={c.hero_title} editable={editable} /></h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg"><EditableText pageKey="services" fieldKey="hero_subtitle" value={c.hero_subtitle} type="textarea" editable={editable} /></p>
          <div className="mt-7">
            <Link
              href="/online-booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
            >
              Book now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc) => (
              <Link key={svc.href} href={svc.href} className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F63FF]/30 hover:shadow-[0_6px_24px_rgba(15,99,255,0.1)]">
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF] transition-all group-hover:bg-[#0F63FF] group-hover:text-white">{svc.icon}</span>
                    <h2 className="font-bold text-[#020F3D] transition-colors group-hover:text-[#0F63FF]"><EditableText pageKey="services" fieldKey={svc.titleKey} value={c[svc.titleKey]} editable={editable} /></h2>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-slate-500"><EditableText pageKey="services" fieldKey={svc.descKey} value={c[svc.descKey]} type="textarea" editable={editable} /></p>
                    <span className="mt-3 inline-block rounded-full bg-[#f4f8ff] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0F63FF]"><EditableText pageKey="services" fieldKey={svc.eyebrowKey} value={c[svc.eyebrowKey]} editable={editable} /></span>
                  </div>
                </div>
                <div className={`mt-4 flex items-center border-t border-[#eef4ff] pt-4 ${"noPrice" in svc && svc.noPrice ? "justify-end" : "justify-between"}`}>
                  {!("noPrice" in svc && svc.noPrice) && (
                    <span className="text-xs font-medium text-slate-400">{"priceLabel" in svc ? svc.priceLabel : <EditableText pageKey="services" fieldKey="card_price_label" value={c.card_price_label} editable={editable} />}</span>
                  )}
                  <span className="font-extrabold text-[#020F3D]"><EditableText pageKey="services" fieldKey={svc.priceKey} value={c[svc.priceKey]} editable={editable} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="services" fieldKey="why_kicker" value={c.why_kicker} editable={editable} /></p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl"><EditableText pageKey="services" fieldKey="why_title" value={c.why_title} editable={editable} /></h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">{r.icon}</span>
                  <h3 className="font-bold text-[#020F3D]"><EditableText pageKey="services" fieldKey={r.titleKey} value={r.title} editable={editable} /></h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500"><EditableText pageKey="services" fieldKey={r.bodyKey} value={r.body} type="textarea" editable={editable} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]"><EditableText pageKey="services" fieldKey="cta_band_kicker" value={c.cta_band_kicker} editable={editable} /></p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl"><EditableText pageKey="services" fieldKey="cta_band_title" value={c.cta_band_title} editable={editable} /></h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/online-booking" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                <EditableText pageKey="services" fieldKey="cta_band_primary" value={c.cta_band_primary} editable={editable} />
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a href={waUrl("Hi, I'd like to book a service please.")} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto">
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
  );
}
