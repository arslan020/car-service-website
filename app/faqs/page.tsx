import { site } from "@/lib/site-config";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${site.name}`,
  description: "Find answers to commonly asked questions about our car servicing, MOT testing, repairs, and our online booking process.",
};

const FAQS = [
  {
    q: "What service does my car need?",
    a: "Use your manufacturer schedule and mileage. If you are unsure, book a free health check or call us — we will gladly recommend whether you need an interim, full, or major service.",
  },
  {
    q: "How long does an MOT or full service take?",
    a: "A standard MOT test takes around 45 to 60 minutes. A full service typically takes 1.5–3 hours depending on the vehicle and our findings. We will give you a clear time window when you book.",
  },
  {
    q: "Can I book an MOT and service together?",
    a: "Yes! We highly recommend it as it saves you time and money. Just choose the MOT + Service package in our online booking flow.",
  },
  {
    q: "Do you use genuine parts and are they under warranty?",
    a: "Absolutely. We use high-quality OE (Original Equipment) or equivalent replacement parts. All parts and labor are fully guaranteed, giving you complete peace of mind.",
  },
  {
    q: "What happens if extra work is needed or my car fails its MOT?",
    a: "If we find any issues during a service or an MOT failure, we will systematically explain the problem and provide a no-obligation quote. We never proceed with extra work without your explicit approval. No surprises.",
  },
  {
    q: "Do you offer a collection and delivery service?",
    a: "Yes! We offer a local collection and delivery service to make taking care of your car as convenient as possible. Just let us know when making your booking.",
  },
];

export default function FaqsPage() {
  return (
    <div className="bg-[#f4f8ff] min-h-screen pb-16">
      {/* ── Page Header ── */}
      <section className="bg-white px-4 py-16 sm:py-20 border-b border-[#e0ebff]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#3f63ff]">Support</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#101a56] sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Have a question? We’re here to help. Find answers to common questions about our services, booking process, and more.
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
                <summary className="flex cursor-pointer select-none items-center justify-between py-5 font-semibold text-[#101a56] outline-none">
                  {faq.q}
                  <span className="ml-4 shrink-0 rounded-full bg-[#f4f8ff] p-1.5 text-[#3f63ff] transition duration-200 group-open:rotate-180 group-open:bg-[#e6ebf5]">
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
        <div className="mt-12 text-center rounded-2xl bg-[#101a56] px-6 py-10 shadow-lg">
          <h2 className="text-xl font-bold text-white">Still have questions?</h2>
          <p className="mt-2 text-sm text-[#8a99d9]">
            Cant find the answer you are looking for? Our team is ready to assist you.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-5 py-2 text-sm font-bold text-[#101a56] transition hover:bg-slate-100"
            >
              Contact Us
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#3f63ff] bg-[#101a56] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#3f63ff]/20"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
