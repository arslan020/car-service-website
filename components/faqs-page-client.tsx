"use client";

import { waUrl } from "@/lib/site-config";
import Link from "next/link";
import { EditableText } from "@/components/editable-text";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";
import type { ContentMap } from "@/lib/page-content";

export function FaqsPageClient({ content, editable = false }: { content: ContentMap; editable?: boolean }) {
  const heroTitle = content.hero_title;
  const heroSubtitle = content.hero_subtitle;
  const ctaTitle = content.cta_title;
  const ctaSubtitle = content.cta_subtitle;
  const pageKicker = content.page_kicker;

  const FAQS = [
    { q: content.faq_1_q, a: content.faq_1_a, qKey: "faq_1_q", aKey: "faq_1_a" },
    {
      q: "Can you update my service record electronically on the manufacturer's database?",
      a: "Yes — for many vehicles we can update your service record directly on the manufacturer's official digital database, exactly as a main dealer would. This keeps your full service history electronically recorded and helps protect your car's resale value. Supported makes include Mercedes, Audi, BMW, Volvo, SEAT, Porsche, Toyota, Lexus, Volkswagen (VW), and Skoda. Not sure if your vehicle is covered? Just ask us when you book and we'll confirm.",
    },
    { q: content.faq_2_q, a: content.faq_2_a, qKey: "faq_2_q", aKey: "faq_2_a" },
    { q: content.faq_3_q, a: content.faq_3_a, qKey: "faq_3_q", aKey: "faq_3_a" },
    { q: content.faq_4_q, a: content.faq_4_a, qKey: "faq_4_q", aKey: "faq_4_a" },
    { q: content.faq_5_q, a: content.faq_5_a, qKey: "faq_5_q", aKey: "faq_5_a" },
    { q: content.faq_6_q, a: content.faq_6_a, qKey: "faq_6_q", aKey: "faq_6_a" },
    { q: content.faq_7_q, a: content.faq_7_a, qKey: "faq_7_q", aKey: "faq_7_a" },
    { q: content.faq_8_q, a: content.faq_8_a, qKey: "faq_8_q", aKey: "faq_8_a" },
    { q: content.faq_9_q, a: content.faq_9_a, qKey: "faq_9_q", aKey: "faq_9_a" },
    { q: content.faq_10_q, a: content.faq_10_a, qKey: "faq_10_q", aKey: "faq_10_a" },
    { q: content.faq_11_q, a: content.faq_11_a, qKey: "faq_11_q", aKey: "faq_11_a" },
    { q: content.faq_12_q, a: content.faq_12_a, qKey: "faq_12_q", aKey: "faq_12_a" },
    { q: content.faq_13_q, a: content.faq_13_a, qKey: "faq_13_q", aKey: "faq_13_a" },
    { q: content.faq_14_q, a: content.faq_14_a, qKey: "faq_14_q", aKey: "faq_14_a" },
    { q: content.faq_15_q, a: content.faq_15_a, qKey: "faq_15_q", aKey: "faq_15_a" },
    { q: content.faq_16_q, a: content.faq_16_a, qKey: "faq_16_q", aKey: "faq_16_a" },
    { q: content.faq_17_q, a: content.faq_17_a, qKey: "faq_17_q", aKey: "faq_17_a" },
    { q: content.faq_18_q, a: content.faq_18_a, qKey: "faq_18_q", aKey: "faq_18_a" },
    { q: content.faq_19_q, a: content.faq_19_a, qKey: "faq_19_q", aKey: "faq_19_a" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.filter((f) => f.q && f.a).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "FAQs", url: "https://www.mariestonservicecentre.co.uk/faqs" },
      ]} />
    <div className="bg-white">
      {/* ── Page Header ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#0F63FF]"><EditableText pageKey="faqs" fieldKey="page_kicker" value={pageKicker} editable={editable} /></p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#020F3D] sm:text-5xl">
            <EditableText pageKey="faqs" fieldKey="hero_title" value={heroTitle} editable={editable} />
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            <EditableText pageKey="faqs" fieldKey="hero_subtitle" value={heroSubtitle} type="textarea" editable={editable} />
          </p>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-2xl border border-[#e0ebff] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-[#e0ebff] last:border-0 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer select-none items-center justify-between py-5 font-semibold text-[#020F3D] outline-none">
                  {faq.qKey ? (
                    <EditableText pageKey="faqs" fieldKey={faq.qKey} value={faq.q} editable={editable} />
                  ) : (
                    faq.q
                  )}
                  <span className="ml-4 shrink-0 rounded-full bg-[#f4f8ff] p-1.5 text-[#0F63FF] transition duration-200 group-open:rotate-180 group-open:bg-[#e6ebf5]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-5 pr-10 text-sm leading-relaxed text-slate-500">
                  {faq.aKey ? (
                    <EditableText pageKey="faqs" fieldKey={faq.aKey} value={faq.a} type="textarea" editable={editable} />
                  ) : (
                    faq.a
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Still have questions CTA ── */}
        <div className="mt-12 text-center rounded-2xl bg-[#020F3D] px-6 py-10 shadow-lg">
          <h2 className="text-xl font-bold text-white"><EditableText pageKey="faqs" fieldKey="cta_title" value={ctaTitle} editable={editable} /></h2>
          <p className="mt-2 text-sm text-[#8a99d9]">
            <EditableText pageKey="faqs" fieldKey="cta_subtitle" value={ctaSubtitle} type="textarea" editable={editable} />
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0F63FF] px-5 py-2 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF]"
            >
              Contact Us
            </Link>
            <a
              href={waUrl("Hi, I have a question about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
