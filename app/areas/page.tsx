import type { Metadata } from "next";
import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Areas We Serve | MOT & Car Service Near You | Marieston Service Centre",
  description: "Marieston Service Centre in Hayes UB4 serves Southall, Uxbridge, Hounslow, Greenford, Northolt, West Drayton, Ealing, Ruislip, Isleworth, Twickenham, Stanwell, Staines-upon-Thames, Feltham and surrounding West London areas.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/areas" },
};

const AREAS = [
  {
    name: "Southall",
    postcode: "UB1 / UB2",
    desc: "Just a short drive from our Hayes garage, we regularly service and MOT cars from Southall and the surrounding streets.",
  },
  {
    name: "Uxbridge",
    postcode: "UB8 / UB10",
    desc: "Customers from Uxbridge trust us for MOT tests, full servicing and repairs — all at transparent, fixed prices.",
  },
  {
    name: "West Drayton",
    postcode: "UB7",
    desc: "West Drayton drivers are just minutes away. Book online and drop your car in for an MOT, service or repair.",
  },
  {
    name: "Harlington",
    postcode: "UB3",
    desc: "Our Hayes garage is the nearest DVSA-approved MOT centre for most Harlington residents.",
  },
  {
    name: "Northolt",
    postcode: "UB5",
    desc: "We see a lot of cars from Northolt — brakes, clutch, diagnostics and full services are our most popular jobs.",
  },
  {
    name: "Greenford",
    postcode: "UB6",
    desc: "Greenford customers benefit from our same-day slots and online booking for MOTs and interim services.",
  },
  {
    name: "Hounslow",
    postcode: "TW3 / TW4",
    desc: "An easy drive along the A4 brings Hounslow drivers straight to our forecourt on Yeading Lane.",
  },
  {
    name: "Hanwell",
    postcode: "W7",
    desc: "We welcome Hanwell motorists for everything from oil changes to major car services and engine diagnostics.",
  },
  {
    name: "Hillingdon",
    postcode: "UB8 / UB10",
    desc: "Hillingdon residents choose Marieston for honest advice, quality parts and competitive labour rates.",
  },
  {
    name: "Yiewsley",
    postcode: "UB7",
    desc: "Yiewsley is right on our doorstep — drop in or book online for fast, reliable car care.",
  },
  {
    name: "Heston",
    postcode: "TW5",
    desc: "Heston customers come to us for MOT retests, brake inspections and air-con recharges all year round.",
  },
  {
    name: "Feltham",
    postcode: "TW13 / TW14",
    desc: "A short trip from Feltham to Hayes gives you access to a full DVSA-approved garage with online booking.",
  },
  {
    name: "Ruislip",
    postcode: "HA4",
    desc: "Ruislip drivers head to our Hayes garage for MOT tests, full services and reliable repairs at honest prices.",
  },
  {
    name: "Ealing",
    postcode: "W5 / W13",
    desc: "We regularly see cars from Ealing for diagnostics, brake work and interim services — quick drive down the A40.",
  },
  {
    name: "Isleworth",
    postcode: "TW7",
    desc: "Isleworth customers choose Marieston for competitive MOT and servicing prices with no hidden charges.",
  },
  {
    name: "Twickenham",
    postcode: "TW1 / TW2",
    desc: "A straightforward drive from Twickenham brings you to our fully equipped workshop in Hayes, UB4.",
  },
  {
    name: "Stanwell",
    postcode: "TW19",
    desc: "Just near Heathrow, Stanwell drivers are a short trip from our Hayes garage for MOT tests and servicing.",
  },
  {
    name: "Staines-upon-Thames",
    postcode: "TW18",
    desc: "Near Heathrow and the M25, Staines customers come to us for reliable MOT, servicing and repairs.",
  },
];

const SERVICES = [
  { label: "MOT Test", href: "/mot" },
  { label: "Full Service", href: "/car-servicing/full" },
  { label: "Interim Service", href: "/car-servicing/interim" },
  { label: "Oil Change", href: "/oil-change" },
  { label: "Brakes", href: "/repairs/brakes" },
  { label: "Diagnostics", href: "/diagnostics" },
];

export default function AreasPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">West London</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
            Areas We Serve
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Based at 235 Yeading Lane, Hayes UB4, we're centrally located for drivers across West London.
            MOT tests, car servicing and repairs — all available online booking, same-day slots.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/online-booking"
              className="flex items-center gap-2 rounded-xl bg-[#020F3D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#061744]"
            >
              Book Online
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="flex items-center gap-2 rounded-xl border-2 border-[#020F3D] px-6 py-3.5 text-sm font-bold text-[#020F3D] transition hover:bg-[#020F3D] hover:text-white"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Coverage</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">
              Serving All of West London
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              We cover Hayes and every area listed below. All within easy reach of our garage.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area) => (
              <div
                key={area.name}
                className="flex flex-col gap-2 rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F63FF]/30 hover:shadow-[0_6px_24px_rgba(15,99,255,0.1)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-bold text-[#020F3D]">{area.name}</p>
                    <p className="text-xs text-slate-400">{area.postcode}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">What We Offer</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">Popular Services</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-[#e0ebff] bg-white px-5 py-2.5 text-sm font-semibold text-[#020F3D] shadow-sm transition hover:border-[#0F63FF] hover:text-[#0F63FF]"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 pt-12 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl bg-[#020F3D] px-8 py-10 text-center shadow-xl sm:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#4DA3FF]">Ready to Book?</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              Your local garage in Hayes, UB4
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
              Serving Hayes and all surrounding West London areas. Book online in minutes or call us on {site.phoneDisplay}.
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
                href={waUrl("Hi, I'd like to book a service please.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
