"use client";

import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { ServicingTiersCarousel } from "@/components/servicing-tiers-carousel";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";

type Tier = {
  id: string;
  title: string;
  titleKey: string;
  subtitle: string;
  subtitleKey: string;
  price: string;
  priceKey: string;
  popular: boolean;
  includes: string[];
  includesKey: string;
  includesRaw: string;
  showMotUpsell?: boolean;
};

type Benefit = {
  title: string;
  titleKey: string;
  body: string;
  bodyKey: string;
  icon: "shield" | "money" | "oil" | "chart";
};

export function CarServicingPageClient({
  content: c,
  tiers,
  benefits,
  editable = false,
}: {
  content: ContentMap;
  tiers: Tier[];
  benefits: Benefit[];
  editable?: boolean;
}) {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
            <EditableText pageKey="car-servicing" fieldKey="hero_eyebrow" value={c.hero_eyebrow} editable={editable} />
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
            <EditableText pageKey="car-servicing" fieldKey="hero_title" value={c.hero_title} editable={editable} />
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            <EditableText pageKey="car-servicing" fieldKey="hero_subtitle" value={c.hero_subtitle} type="textarea" editable={editable} />
          </p>
          <div className="mt-7">
            <Link
              href="/online-booking?service=full"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
            >
              <EditableText pageKey="car-servicing" fieldKey="btn_book" value={c.btn_book} editable={editable} />
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
              <EditableText pageKey="car-servicing" fieldKey="tier_section_kicker" value={c.tier_section_kicker} editable={editable} />
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
              <EditableText pageKey="car-servicing" fieldKey="tier_section_title" value={c.tier_section_title} editable={editable} />
            </h2>
          </div>
          <div className="mt-7">
            <ServicingTiersCarousel tiers={tiers} popularBadge={c.tier_popular_badge} bookPrefix={c.tier_book_prefix} editable={editable} />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">
              <EditableText pageKey="car-servicing" fieldKey="benefits_kicker" value={c.benefits_kicker} editable={editable} />
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
              <EditableText pageKey="car-servicing" fieldKey="benefits_title" value={c.benefits_title} editable={editable} />
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.titleKey} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                    {b.icon === "shield" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                    )}
                    {b.icon === "money" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    )}
                    {b.icon === "oil" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                      </svg>
                    )}
                    {b.icon === "chart" && (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
                      </svg>
                    )}
                  </span>
                  <h3 className="font-bold text-[#020F3D]">
                    <EditableText pageKey="car-servicing" fieldKey={b.titleKey} value={b.title} editable={editable} />
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">
                  <EditableText pageKey="car-servicing" fieldKey={b.bodyKey} value={b.body} type="textarea" editable={editable} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">
              <EditableText pageKey="car-servicing" fieldKey="bottom_kicker" value={c.bottom_kicker} editable={editable} />
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              <EditableText pageKey="car-servicing" fieldKey="bottom_title" value={c.bottom_title} editable={editable} />
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              <EditableText pageKey="car-servicing" fieldKey="bottom_body" value={c.bottom_body} type="textarea" editable={editable} /> {site.addressLines.join(", ")}.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/online-booking?service=full" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                <EditableText pageKey="car-servicing" fieldKey="bottom_btn" value={c.bottom_btn} editable={editable} />
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a href={waUrl("Hi, I'd like to book a service please.")} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                <EditableText pageKey="car-servicing" fieldKey="btn_whatsapp" value={c.btn_whatsapp} editable={editable} />
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
