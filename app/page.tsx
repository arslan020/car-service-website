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
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:pt-14 lg:pb-8">

          {/* mobile: heading on top */}
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-[#101a56] text-center w-full lg:hidden">
            Professional Garage Care{" "}
            <span className="text-[#3f63ff]">For Every Car</span>
          </h1>

          {/* mobile: widget full-width, desktop: side by side */}
          <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-[1fr_480px] lg:items-center lg:gap-8">

            {/* ── Left: car image with heading in the top-center empty area ── */}
            <div className="relative w-full">
              <h1 className="hidden lg:block absolute top-[30%] -translate-y-1/2 left-0 z-10 text-4xl font-extrabold leading-tight tracking-tight text-[#101a56] xl:text-5xl whitespace-nowrap">
                Professional Garage Care<br />
                <span className="block text-center text-[#3f63ff]">For Every Car</span>
              </h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/big-removebg-preview.png"
                alt="Cars at Heston Automotive"
                className="mx-auto w-full max-w-sm drop-shadow-2xl sm:max-w-md lg:mx-0 lg:max-w-full lg:pt-36"
                draggable={false}
              />
            </div>

            {/* ── Right: booking widget ── */}
            <div className="flex w-full justify-center lg:justify-end">
              <form
                action="/book"
                method="GET"
                className="w-full max-w-sm rounded-[28px] border border-[#d9e4f2] bg-white p-7 shadow-[0_24px_60px_rgba(16,26,86,0.14)] ring-1 ring-[#e8f0fe] lg:w-[480px] lg:max-w-none lg:p-10"
              >
                {/* header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4ff]">
                    <svg className="h-5 w-5 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0Z" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold leading-tight text-[#101a56]">What service you looking for?</p>
                </div>

                {/* service dropdown */}
                <div className="relative">
                  <select
                    name="service"
                    className="w-full appearance-none rounded-xl border border-[#d9e4f2] bg-[#f8faff] px-4 py-4 pr-12 text-center text-lg text-slate-700 shadow-sm focus:border-[#3f63ff] focus:outline-none focus:ring-2 focus:ring-[#3f63ff]/20"
                  >
                    <option value="tyres">Tyres</option>
                    <option value="mot">MOT</option>
                    <option value="service">Service</option>
                    <option value="air-con">Air-Con</option>
                    <option value="batteries">Batteries</option>
                    <option value="brakes">Brakes</option>
                    <option value="car-mats">Car Mats</option>
                    <option value="exhaust">Exhaust</option>
                    <option value="spare-wheel">Road Hero Spare Wheel</option>
                    <option value="safety-check">Vehicle Safety Check</option>
                    <option value="wheel-alignment">Wheel Alignment</option>
                    <option value="windscreen">Windscreen Wipers</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </div>

                {/* number plate input */}
                <div className="relative mt-4 overflow-hidden rounded-xl border-2 border-[#F5C518] bg-[#F5C518] shadow-md">
                  <div className="absolute inset-y-0 left-0 flex w-[3.75rem] flex-col items-center justify-center bg-[#003399] px-3 py-2">
                    <span className="text-[10px] font-bold leading-none text-yellow-300">★</span>
                    <span className="mt-0.5 text-[10px] font-extrabold leading-none text-white">UK</span>
                  </div>
                  <input
                    type="text"
                    name="reg"
                    placeholder="YOUR REG"
                    maxLength={8}
                    className="w-full bg-transparent py-4 pl-[3.75rem] pr-[3.75rem] text-center text-xl font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#8b7200] focus:outline-none"
                  />
                </div>

                {/* start booking button */}
                <button
                  type="submit"
                  className="mt-5 w-full rounded-xl bg-[#4f63f5] py-4 text-lg font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#4457e6]"
                >
                  Start Booking
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>


      <section className="w-full bg-white py-16 sm:py-20">
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

