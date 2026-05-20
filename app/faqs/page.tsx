import { site } from "@/lib/site-config";
import Link from "next/link";
import { Metadata } from "next";
import { getPageContentWithDefaults } from "@/lib/page-content";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${site.name}`,
  description: "Find answers to commonly asked questions about our car servicing, MOT testing, repairs, and our online booking process.",
};

export default async function FaqsPage() {
  const content = await getPageContentWithDefaults("faqs");

  const heroTitle = content.hero_title;
  const heroSubtitle = content.hero_subtitle;
  const ctaTitle = content.cta_title;
  const ctaSubtitle = content.cta_subtitle;
  const pageKicker = content.page_kicker;

  const FAQS = [
    { q: content.faq_1_q, a: content.faq_1_a },
    { q: content.faq_2_q, a: content.faq_2_a },
    { q: content.faq_3_q, a: content.faq_3_a },
    { q: content.faq_4_q, a: content.faq_4_a },
    { q: content.faq_5_q, a: content.faq_5_a },
    { q: content.faq_6_q, a: content.faq_6_a },
    { q: content.faq_7_q, a: content.faq_7_a },
    { q: content.faq_8_q, a: content.faq_8_a },
    { q: content.faq_9_q, a: content.faq_9_a },
    { q: content.faq_10_q, a: content.faq_10_a },
    { q: content.faq_11_q, a: content.faq_11_a },
    { q: content.faq_12_q, a: content.faq_12_a },
  ];

  return (
    <div className="bg-[#f4f8ff] min-h-screen pb-16">
      {/* ── Page Header ── */}
      <section className="bg-white px-4 py-16 sm:py-20 border-b border-[#e0ebff]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#0F63FF]">{pageKicker}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#020F3D] sm:text-5xl">
            {heroTitle}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            {heroSubtitle}
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
                  {faq.q}
                  <span className="ml-4 shrink-0 rounded-full bg-[#f4f8ff] p-1.5 text-[#0F63FF] transition duration-200 group-open:rotate-180 group-open:bg-[#e6ebf5]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-5 pr-10 text-sm leading-relaxed text-slate-500">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Still have questions CTA ── */}
        <div className="mt-12 text-center rounded-2xl bg-[#020F3D] px-6 py-10 shadow-lg">
          <h2 className="text-xl font-bold text-white">{ctaTitle}</h2>
          <p className="mt-2 text-sm text-[#8a99d9]">
            {ctaSubtitle}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-5 py-2 text-sm font-bold text-[#020F3D] transition hover:bg-slate-100"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#0F63FF] bg-[#020F3D] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#0F63FF]/20"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
