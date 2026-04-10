import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

const trust = [
  "UK garage with certified technicians",
  "Genuine / OE parts where specified",
  "Transparent pricing - quote before work begins",
  "Collection & delivery available on request",
] as const;

const steps = [
  { title: "Book online", body: "Choose your service and a preferred slot in a few minutes." },
  { title: "We confirm", body: "We check the diary and confirm by phone or email." },
  { title: "Drop off", body: "Arrive at your time - or use collection if arranged." },
  { title: "Drive away", body: "Work completed with paperwork and honest advice." },
] as const;

const featuredCards = [
  { href: "/mot", title: "MOT testing", desc: "DVSA-approved testing and retests." },
  { href: "/car-servicing", title: "Servicing", desc: "Interim, full, and major schedules." },
  { href: "/repairs", title: "Repairs", desc: "Brakes, suspension, exhaust, and more." },
  { href: "/diagnostics", title: "Diagnostics", desc: "Warning lights and fault finding." },
  { href: "/services", title: "All services", desc: "Tyres, batteries, A/C, and fleet." },
  { href: "/pricing", title: "Pricing", desc: "Clear starting prices and packages." },
] as const;

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="w-full bg-[linear-gradient(180deg,#eefdff_0%,#f3fcff_58%,#ffffff_100%)]">
        <div className="mx-auto flex min-h-screen max-w-7xl items-start justify-center px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-22 sm:pb-28 lg:pt-24 lg:pb-32">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-[#101a56] sm:text-4xl lg:text-5xl">
              Professional Garage Care For Every Car
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#101a56] sm:text-2xl">Why drivers choose us</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[#d9e4f2] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-4 text-sm font-medium text-slate-800 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#101a56] sm:text-2xl">Featured services</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-2xl border border-[#d9e4f2] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9db4ff] hover:shadow-md sm:p-5"
              >
                <h3 className="font-semibold text-[#101a56] group-hover:text-[#3f63ff]">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#101a56] sm:text-2xl">How it works</h2>
          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-[#d9e4f2] bg-white p-4 shadow-sm sm:p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9efff] text-sm font-bold text-[#101a56]">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-semibold text-[#101a56]">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="w-full bg-[#101a56] py-10 text-slate-100 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Coverage</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            {site.name} - {site.addressLines.join(", ")}. Easy access for Hayes, Yeading, Southall, and nearby M4/A40 routes.
          </p>
          <div className="mt-6 aspect-video w-full max-w-2xl overflow-hidden rounded-2xl border border-[#253685] bg-[#18246d]">
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
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#101a56] shadow-md transition hover:bg-[#eef4ff]"
            >
              Book a service
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#3b57ca] bg-[#18246d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20318f]"
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
