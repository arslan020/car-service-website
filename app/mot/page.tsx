import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";
import { BookingBar } from "@/components/booking-bar";

const CHECKS = [
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

const STEPS = [
  { n: 1, title: "Book your slot", body: "Choose a date and time online or call us. Same-day slots often available." },
  { n: 2, title: "Drop off your car", body: "Arrive at your booked time. Tests typically take 45–60 minutes." },
  { n: 3, title: "Pass or advisory", body: "We walk you through the result clearly. No jargon, no pressure." },
  { n: 4, title: "Repair & retest (if needed)", body: "We can quote and carry out any work, then retest at a reduced rate." },
] as const;

const D = {
  hero_title: "MOT Testing",
  hero_subtitle:
    "Annual MOT inspections carried out by our qualified technicians. Same-day slots available. If your vehicle fails, we explain every advisory clearly and can quote for any work needed.",
  hero_price: "from £54",
  faq_1_q: "How much does an MOT cost?",
  faq_1_a: "Our MOT starts from £54 — the government maximum fee. We never charge more than the legal cap.",
  faq_2_q: "What happens if my car fails?",
  faq_2_a: "We give you a clear written list of failures and advisories. You can choose to have us repair it or take the car elsewhere — no obligation.",
  faq_3_q: "Can I combine MOT with a service?",
  faq_3_a: "Yes. Booking an MOT and service together often saves money and means only one drop-off. Select a package when you book online.",
  faq_4_q: "How long does an MOT take?",
  faq_4_a: "Usually 45–60 minutes for a straightforward test. We'll text you when it's ready.",
};

export default async function MotPage() {
  const c = await getPageContent("mot");

  const faqs = [
    { q: f(c, "faq_1_q", D.faq_1_q), a: f(c, "faq_1_a", D.faq_1_a) },
    { q: f(c, "faq_2_q", D.faq_2_q), a: f(c, "faq_2_a", D.faq_2_a) },
    { q: f(c, "faq_3_q", D.faq_3_q), a: f(c, "faq_3_a", D.faq_3_a) },
    { q: f(c, "faq_4_q", D.faq_4_q), a: f(c, "faq_4_a", D.faq_4_a) },
  ];

  return (
    <div className="bg-white">

      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">DVSA Approved</p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">
                {f(c, "hero_title", D.hero_title)}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
                {f(c, "hero_subtitle", D.hero_subtitle)}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 shadow-sm">
                <span className="text-2xl font-extrabold text-[#101a56]">{f(c, "hero_price", D.hero_price)}</span>
                <span className="text-sm text-slate-500">— DVSA max fee</span>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/book?service=mot" className="flex items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]">
                  Book MOT
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a href={waUrl("Hi, I'd like to book an MOT please.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: f(c, "hero_price", D.hero_price), label: "DVSA max fee" },
                { stat: "~1 hr", label: "typical test time" },
                { stat: "Same day", label: "slots often available" },
                { stat: "Free", label: "partial retest if we do repairs" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#e8effa] bg-white p-5 text-center shadow-sm">
                  <p className="text-2xl font-extrabold text-[#3f63ff]">{item.stat}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-[#e8effa] pt-8">
            <BookingBar defaultService="mot" category="servicing" />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">The inspection</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">What we check</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map((check) => (
              <div key={check} className="flex items-center gap-3 rounded-xl border border-[#e8effa] bg-white px-4 py-3 shadow-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#3f63ff]">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-sm text-slate-700">{check}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Simple process</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">How the MOT works</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3f63ff] to-[#6b8fff] text-sm font-extrabold text-white shadow-md shadow-[#3f63ff]/25">{step.n}</span>
                  <h3 className="font-bold text-[#101a56]">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">FAQs</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Common questions</h2>
          </div>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-[#101a56]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Book today</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Ready for your MOT?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">Same-day slots often available. Book online in under a minute or call us on {site.phoneDisplay}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book?service=mot" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book MOT online
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
