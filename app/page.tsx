import Link from "next/link";
import { RegQuickJump } from "@/components/reg-quick-jump";
import { site, waUrl } from "@/lib/site-config";

const trust = [
  "UK garage with certified technicians",
  "Genuine / OE parts where specified",
  "Transparent pricing — quote before work begins",
  "Collection & delivery available on request",
] as const;

const steps = [
  { title: "Book online", body: "Choose your service and a preferred slot in a few minutes." },
  { title: "We confirm", body: "We check the diary and confirm by phone or email." },
  { title: "Drop off", body: "Arrive at your time — or use collection if arranged." },
  { title: "Drive away", body: "Work completed with paperwork and honest advice." },
] as const;

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="w-full bg-[#0e1555]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F1B500] sm:text-sm">
              Book your car service online
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              MOT, interim and full service, repairs, diagnostics, tyres, brakes — based in Hayes, UB4,
              serving Hillingdon and West London.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/book"
                className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000] sm:col-span-1 sm:min-w-[9rem]"
              >
                Book a service
              </Link>
              <Link
                href="/quote"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white/30 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:min-w-[9rem]"
              >
                Get a quote
              </Link>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1c2a61] px-5 py-3 text-sm font-bold text-white hover:bg-[#1d4e89] sm:min-w-[9rem]"
              >
                Call us
              </a>
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] sm:min-w-[9rem]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Reg plate card */}
          <div className="mt-8 w-full max-w-xl rounded-2xl border border-[#1c2a61] bg-[#1c2a61]/60 p-4 sm:p-6">
            <p className="text-sm font-semibold text-white">Start with your registration</p>
            <p className="mt-1 text-sm text-slate-300">
              Enter your number plate — we will pre-fill step one on the booking form.
            </p>
            <RegQuickJump />
            <p className="mt-3 text-center text-sm text-slate-400">
              Or{" "}
              <Link href="/book" className="font-semibold text-[#F1B500] underline-offset-2 hover:underline">
                open the full booking form
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#0e1555] sm:text-2xl">Why drivers choose us</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => (
              <li
                key={t}
                className="rounded-xl border-l-4 border-l-[#F1B500] border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-800 shadow-sm"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="w-full border-y border-slate-200 bg-slate-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#0e1555] sm:text-2xl">Featured services</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/mot", title: "MOT testing", desc: "DVSA-approved testing and retests." },
              { href: "/car-servicing", title: "Servicing", desc: "Interim, full, and major schedules." },
              { href: "/repairs", title: "Repairs", desc: "Brakes, suspension, exhaust, and more." },
              { href: "/diagnostics", title: "Diagnostics", desc: "Warning lights and fault finding." },
              { href: "/services", title: "All services", desc: "Tyres, batteries, A/C, and fleet." },
              { href: "/pricing", title: "Pricing", desc: "Clear starting prices and packages." },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#F1B500] hover:shadow-md sm:p-5"
              >
                <h3 className="font-semibold text-[#0e1555] group-hover:text-[#0071CE]">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#0e1555] sm:text-2xl">How it works</h2>
          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1B500] text-sm font-bold text-[#0e1555]">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold text-[#0e1555]">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="w-full bg-[#0e1555] py-10 text-slate-100 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Coverage</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            {site.name} — {site.addressLines.join(", ")}. Easy access for Hayes, Yeading, Southall, and nearby M4/A40 routes.
          </p>
          <div className="mt-6 aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-[#1c2a61] bg-[#1c2a61]">
            <iframe
              title="Garage location map"
              className="h-full w-full border-0 grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.435%2C51.505%2C-0.415%2C51.519&amp;layer=mapnik"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/book"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#F1B500] px-5 py-3 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000]"
            >
              Book a service
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-[#1d4e89] bg-[#1c2a61] px-5 py-3 text-sm font-bold text-white hover:bg-[#1d4e89]"
            >
              Call {site.phoneDisplay}
            </a>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
