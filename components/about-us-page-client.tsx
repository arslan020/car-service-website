"use client";

import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Marieston Service Centre",
  url: "https://www.mariestonservicecentre.co.uk/about-us",
  description: "DVSA-approved garage in Hayes UB4 serving West London.",
  mainEntity: {
    "@type": "AutoRepair",
    name: site.name,
    url: "https://www.mariestonservicecentre.co.uk",
    telephone: site.phoneTel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressLines[0],
      addressLocality: site.addressLines[1],
      postalCode: site.addressLines[2],
      addressCountry: "GB",
    },
    description: "DVSA-approved independent garage in Hayes, West London, offering MOT tests, car servicing, repairs, diagnostics and more.",
  },
};

const VALUE_ICONS = [
  (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
  (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  ),
];

const SERVICES = [
  { label: "MOT Tests", href: "/mot" },
  { label: "Car Servicing", href: "/car-servicing" },
  { label: "Brakes & Clutch", href: "/repairs/brakes" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Air Con Regas", href: "/air-con" },
  { label: "EV Battery Check", href: "/ev-battery" },
  { label: "Oil Service", href: "/car-servicing/interim" },
  { label: "Suspension & Steering", href: "/repairs/suspension-steering" },
];

export function AboutUsPageClient({ content: c, editable = false }: { content: ContentMap; editable?: boolean }) {
  const stats = [
    { valueKey: "stat_1_value", labelKey: "stat_1_label", value: c.stat_1_value, label: c.stat_1_label },
    { valueKey: "stat_2_value", labelKey: "stat_2_label", value: c.stat_2_value, label: c.stat_2_label },
    { valueKey: "stat_3_value", labelKey: "stat_3_label", value: c.stat_3_value, label: c.stat_3_label },
    { valueKey: "stat_4_value", labelKey: "stat_4_label", value: c.stat_4_value, label: c.stat_4_label },
  ];

  const values = [
    { titleKey: "value_1_title", bodyKey: "value_1_body", title: c.value_1_title, body: c.value_1_body, icon: VALUE_ICONS[0] },
    { titleKey: "value_2_title", bodyKey: "value_2_body", title: c.value_2_title, body: c.value_2_body, icon: VALUE_ICONS[1] },
    { titleKey: "value_3_title", bodyKey: "value_3_body", title: c.value_3_title, body: c.value_3_body, icon: VALUE_ICONS[2] },
    { titleKey: "value_4_title", bodyKey: "value_4_body", title: c.value_4_title, body: c.value_4_body, icon: VALUE_ICONS[3] },
    { titleKey: "value_5_title", bodyKey: "value_5_body", title: c.value_5_title, body: c.value_5_body, icon: VALUE_ICONS[4] },
    { titleKey: "value_6_title", bodyKey: "value_6_body", title: c.value_6_title, body: c.value_6_body, icon: VALUE_ICONS[5] },
  ];

  return (
    <>
      <JsonLd data={aboutSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "About Us", url: "https://www.mariestonservicecentre.co.uk/about-us" },
      ]} />
      <div className="bg-white">

        {/* Hero */}
        <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                  <EditableText pageKey="about-us" fieldKey="hero_kicker" value={c.hero_kicker} editable={editable} />
                </p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
                  <EditableText pageKey="about-us" fieldKey="hero_title" value={c.hero_title} editable={editable} />
                </h1>
                <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
                  <EditableText pageKey="about-us" fieldKey="hero_subtitle" value={c.hero_subtitle} type="textarea" editable={editable} />
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/online-booking"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
                  >
                    Book a Service
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <a
                    href={waUrl("Hi, I'd like to find out more about your garage.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.valueKey} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                    <p className="text-xl font-extrabold text-[#0F63FF] sm:text-2xl">
                      <EditableText pageKey="about-us" fieldKey={s.valueKey} value={s.value} editable={editable} />
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      <EditableText pageKey="about-us" fieldKey={s.labelKey} value={s.label} editable={editable} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                  <EditableText pageKey="about-us" fieldKey="story_kicker" value={c.story_kicker} editable={editable} />
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
                  <EditableText pageKey="about-us" fieldKey="story_title" value={c.story_title} editable={editable} />
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-500 sm:text-base">
                  <p><EditableText pageKey="about-us" fieldKey="story_p1" value={c.story_p1} type="textarea" editable={editable} /></p>
                  <p><EditableText pageKey="about-us" fieldKey="story_p2" value={c.story_p2} type="textarea" editable={editable} /></p>
                  <p><EditableText pageKey="about-us" fieldKey="story_p3" value={c.story_p3} type="textarea" editable={editable} /></p>
                </div>
              </div>
              <div className="rounded-3xl bg-[#f4f8ff] p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Where to find us</p>
                <h3 className="mt-2 text-lg font-extrabold text-[#020F3D]">{site.name}</h3>
                <address className="mt-3 space-y-2 not-italic">
                  <p className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    {site.addressLines.join(", ")}
                  </p>
                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <svg className="h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
                    </svg>
                    <a href={`tel:${site.phoneTel}`} className="hover:text-[#0F63FF]">{site.phoneDisplay}</a>
                  </p>
                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <svg className="h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${site.email}`} className="hover:text-[#0F63FF]">{site.email}</a>
                  </p>
                  <p className="flex items-center gap-3 text-sm text-slate-600">
                    <svg className="h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {site.hours}
                  </p>
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="bg-[#f4f8ff] px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                <EditableText pageKey="about-us" fieldKey="why_kicker" value={c.why_kicker} editable={editable} />
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
                <EditableText pageKey="about-us" fieldKey="why_title" value={c.why_title} editable={editable} />
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <div key={v.titleKey} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                    {v.icon}
                  </span>
                  <h3 className="font-bold text-[#020F3D]">
                    <EditableText pageKey="about-us" fieldKey={v.titleKey} value={v.title} editable={editable} />
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    <EditableText pageKey="about-us" fieldKey={v.bodyKey} value={v.body} type="textarea" editable={editable} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
                <EditableText pageKey="about-us" fieldKey="services_kicker" value={c.services_kicker} editable={editable} />
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
                <EditableText pageKey="about-us" fieldKey="services_title" value={c.services_title} editable={editable} />
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
                <EditableText pageKey="about-us" fieldKey="services_intro" value={c.services_intro} type="textarea" editable={editable} />
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="flex items-center justify-between rounded-xl border border-[#e8effa] bg-white px-5 py-4 text-sm font-semibold text-[#020F3D] shadow-sm transition hover:border-[#0F63FF] hover:text-[#0F63FF]"
                >
                  {s.label}
                  <svg className="h-4 w-4 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
              <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">
                <EditableText pageKey="about-us" fieldKey="cta_kicker" value={c.cta_kicker} editable={editable} />
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                <EditableText pageKey="about-us" fieldKey="cta_title" value={c.cta_title} editable={editable} />
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                <EditableText pageKey="about-us" fieldKey="cta_body" value={c.cta_body} type="textarea" editable={editable} />
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/online-booking"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto"
                >
                  Book Online
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href={waUrl("Hi, I'd like to find out more about your garage.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF] sm:w-auto"
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
