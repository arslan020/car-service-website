import Link from "next/link";
import { site } from "@/lib/site-config";
import { getPageContent, f } from "@/lib/page-content";
import { BookingBar } from "@/components/booking-bar";

const DEFAULTS = {
  hero_title: "Everything we offer",
  hero_subtitle:
    "From scheduled servicing and MOTs to diagnostics and repairs — all under one roof in Hayes.",
};

const SERVICES = [
  {
    href: "/mot",
    eyebrow: "DVSA Approved",
    title: "MOT Test",
    desc: "Annual MOT inspections to keep your car legal and safe. Same-day slots available. If it fails, we explain every advisory clearly and can quote for repair work on the spot.",
    price: "from £54",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    href: "/car-servicing",
    eyebrow: "Scheduled",
    title: "Car Servicing",
    desc: "Interim, full, and major servicing tailored to your make and model. Manufacturer-scheduled checks keep your warranty valid and your car running smoothly.",
    price: "from £X",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/repairs",
    eyebrow: "All Makes",
    title: "Repairs",
    desc: "Brakes, clutch, exhausts, suspension, steering and more. We diagnose first, give you a clear quote, and only proceed with your approval — no surprises.",
    price: "Quote provided",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    href: "/diagnostics",
    eyebrow: "OBD & Live Data",
    title: "Diagnostics",
    desc: "Engine warning lights, fault codes, and intermittent issues. We use professional-grade diagnostic equipment to trace the root cause — not just clear the light.",
    price: "from £X",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    href: "/oil-change",
    eyebrow: "Premium Oil",
    title: "Oil Change",
    desc: "Right-spec oil and filter for your engine. Fast turnaround — often while you wait. Helps fuel economy and protects against premature wear.",
    price: "from £X",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    href: "/repairs/brakes",
    eyebrow: "Safety First",
    title: "Brakes & Tyres",
    desc: "Brake pads, discs, callipers, and tyre fitting or replacement. We check tread depth and brake performance and advise only when action is genuinely needed.",
    price: "from £X",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
] as const;

const REASONS = [
  {
    title: "Transparent pricing",
    body: "You get a clear quote before we touch the car. No hidden extras, no surprises at collection.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "DVSA approved",
    body: "Authorised MOT testing station with qualified technicians working to DVSA standards.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
  },
  {
    title: "Collection & delivery",
    body: "Can't get to us? We can collect your car, carry out the work, and return it when ready.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "All makes & models",
    body: "From city cars to SUVs and light commercials. Foreign plates welcome.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
] as const;

export default async function ServicesPage() {
  const content = await getPageContent("services");
  const title = f(content, "hero_title", DEFAULTS.hero_title);
  const subtitle = f(content, "hero_subtitle", DEFAULTS.hero_subtitle);

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we offer</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/book" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto">
              Book online
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/pricing" className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#101a56] px-6 py-3.5 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white sm:w-auto">
              View pricing
            </Link>
          </div>
          <BookingBar defaultService="mot" />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc) => (
              <Link key={svc.title} href={svc.href} className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]">
                <div className="flex flex-1 items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white sm:h-12 sm:w-12 sm:mb-4">{svc.icon}</span>
                  <div className="flex-1">
                    <h2 className="font-bold text-[#101a56] transition-colors group-hover:text-[#3f63ff]">{svc.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{svc.desc}</p>
                    <span className="mt-3 inline-block rounded-full bg-[#f4f8ff] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3f63ff]">{svc.eyebrow}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#eef4ff] pt-4">
                  <span className="text-xs font-medium text-slate-400">Price</span>
                  <span className="font-extrabold text-[#101a56]">{svc.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Why Heston Automotive</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">The difference you&apos;ll notice</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div key={r.title} className="flex items-center gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm sm:flex-col sm:items-start sm:gap-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] sm:mb-3">{r.icon}</span>
                <div>
                  <h3 className="font-bold text-[#101a56]">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#101a56] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#6b8fff]">Ready to book?</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Get your car booked in today</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">{site.addressLines.join(", ")}.</p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3f63ff] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#2f53ef] sm:w-auto">
                Book online now
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
