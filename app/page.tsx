"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { site, waUrl } from "@/lib/site-config";

function isValidUKReg(value: string): boolean {
  const clean = value.toUpperCase().replace(/\s/g, "");
  return /^([A-Z]{2}[0-9]{2}[A-Z]{3}|[A-Z][0-9]{1,3}[A-Z]{3}|[A-Z]{3}[0-9]{1,3}[A-Z]|[0-9]{1,4}[A-Z]{1,3}|[A-Z]{1,3}[0-9]{1,4})$/.test(clean);
}

const SERVICE_OPTIONS = [
  { id: "mot", label: "MOT Test" },
  { id: "full", label: "Full Service" },
  { id: "interim", label: "Interim Service" },
  { id: "major", label: "Major Service" },
  { id: "oil", label: "Oil Change" },
  { id: "brakes", label: "Brakes" },
  { id: "clutch", label: "Clutch & Gearbox" },
  { id: "suspension", label: "Suspension & Steering" },
  { id: "exhaust", label: "Exhaust & Emissions" },
  { id: "engine", label: "Engine & Cooling" },
  { id: "electrical", label: "Electrical" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "tyres", label: "Tyres" },
  { id: "ac", label: "Air-Con" },
  { id: "battery", label: "Battery Check" },
] as const;

const BRANDS = [
  { key: "alfaromeo", label: "Alfa Romeo" },
  { key: "audi", label: "Audi" },
  { key: "bmw", label: "BMW" },
  { key: "chevrolet", label: "Chevrolet" },
  { key: "citroen", label: "Citroën" },
  { key: "dacia", label: "Dacia" },
  { key: "fiat", label: "Fiat" },
  { key: "ford", label: "Ford" },
  { key: "honda", label: "Honda" },
  { key: "hyundai", label: "Hyundai" },
  { key: "jaguar", label: "Jaguar" },
  { key: "jeep", label: "Jeep" },
  { key: "kia", label: "Kia" },
  { key: "landrover", label: "Land Rover" },
  { key: "lexus", label: "Lexus" },
  { key: "mazda", label: "Mazda" },
  { key: "mercedes", label: "Mercedes-Benz" },
  { key: "mini", label: "MINI" },
  { key: "mitsubishi", label: "Mitsubishi" },
  { key: "nissan", label: "Nissan" },
  { key: "peugeot", label: "Peugeot" },
  { key: "porsche", label: "Porsche" },
  { key: "renault", label: "Renault" },
  { key: "seat", label: "SEAT" },
  { key: "skoda", label: "Škoda" },
  { key: "smart", label: "Smart" },
  { key: "subaru", label: "Subaru" },
  { key: "suzuki", label: "Suzuki" },
  { key: "tesla", label: "Tesla" },
  { key: "toyota", label: "Toyota" },
  { key: "vauxhall", label: "Vauxhall" },
  { key: "volkswagen", label: "Volkswagen" },
  { key: "volvo", label: "Volvo" },
];

const SERVICES = [
  {
    href: "/mot",
    title: "MOT Test",
    desc: "DVSA approved, same-day slots available",
    price: "£54",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    href: "/car-servicing",
    title: "Full Service",
    desc: "Oil, filters & comprehensive 60-point check",
    price: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/oil-change",
    title: "Oil Change",
    desc: "Premium oil and filter replacement",
    price: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    href: "/battery-check",
    title: "Battery Check",
    desc: "Testing, charging, and replacement",
    price: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
] as const;

const HOW_IT_WORKS = [
  {
    n: 1,
    title: "Choose your service",
    body: "Select your service and a preferred time slot in just a few minutes.",
  },
  {
    n: 2,
    title: "We confirm by text or call",
    body: "Confirmation within the hour — no chasing, no waiting on hold.",
  },
  {
    n: 3,
    title: "Drop off & relax",
    body: "Arrive at your time or use our collection service if arranged.",
  },
  {
    n: 4,
    title: "Drive away happy",
    body: "Full paperwork provided. We text you when ready, you pay on collection.",
  },
] as const;

const WHY_CHOOSE_US = [
  {
    title: "DVSA-approved garage",
    body: "Trusted MOT testing, servicing, diagnostics, and repairs from an experienced local team.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7.5 3v6c0 5.25-3.438 8.25-7.5 9-4.062-.75-7.5-3.75-7.5-9V6L12 3Z" />
      </svg>
    ),
  },
  {
    title: "Same-day help available",
    body: "Need something sorted quickly? We aim to offer fast turnaround and practical booking slots.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Clear, honest pricing",
    body: "Straightforward advice, fair quotes, and no extra work carried out without your approval.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5c0-1.38-1.567-2.5-3.5-2.5S8.5 8.12 8.5 9.5 10.067 12 12 12s3.5 1.12 3.5 2.5S13.933 17 12 17s-3.5-1.12-3.5-2.5" />
      </svg>
    ),
  },
  {
    title: "Local and easy to reach",
    body: "Conveniently based in Hayes with online booking, phone support, and quick WhatsApp contact.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
] as const;

const TYPEWRITER_TEXT = "Drop off, we fix, drive away happy";

export default function HomePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("mot");
  const [reg, setReg] = useState("");
  const [regError, setRegError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [closingTime, setClosingTime] = useState("");
  const [today, setToday] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (!deleting) {
        i++;
        setTyped(TYPEWRITER_TEXT.slice(0, i));
        if (i >= TYPEWRITER_TEXT.length) {
          // pause at end, then start deleting
          timeout = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
      } else {
        i--;
        setTyped(TYPEWRITER_TEXT.slice(0, i));
        if (i <= 0) {
          // pause at start, then start typing again
          timeout = setTimeout(() => { deleting = false; tick(); }, 600);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 70);
    }

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    setToday(day);
    if (day === 0) {
      // Sunday — closed
      setIsOpen(false);
      setClosingTime("");
    } else {
      // Mon–Sat 10:00–20:00
      setIsOpen(mins >= 600 && mins < 1200);
      setClosingTime("20:00");
    }
  }, []);

  return (
    <div className="bg-white">

      {/* ════════════════════════════════
          HERO — text left, car right
      ════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-0 pt-10 text-center sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-3xl">

          {/* Location pill */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d0dcea] bg-white px-4 py-2 shadow-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff]">
              <svg className="h-3.5 w-3.5 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {site.addressLines.join(", ")}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#101a56] sm:text-5xl lg:text-6xl">
            Car maintenance,<br />
            <span className="text-[#3f63ff]">made easy</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-base text-slate-500 sm:mt-4 sm:text-lg">
            {typed}
            <span className="inline-block w-0.5 h-[1em] align-middle bg-slate-400 ml-0.5 animate-pulse" />
          </p>

          {/* ── Booking widget ── */}
          <div className="mx-auto mt-7 max-w-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Select a service to book
            </p>

            {/* Scrollable service tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedService(s.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${selectedService === s.id
                      ? "bg-[#101a56] text-white shadow-sm"
                      : "border border-[#d0dcea] bg-white text-slate-600 hover:border-[#101a56] hover:text-[#101a56]"
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* UK plate + button */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className={`relative flex w-full overflow-hidden rounded-xl border-2 shadow-md sm:flex-1 ${regError ? "border-red-400 bg-[#F5C518]" : "border-[#F5C518] bg-[#F5C518]"}`}>
                <div className="flex w-[3.25rem] shrink-0 flex-col items-center justify-center bg-[#003399] py-3">
                  <span className="text-[9px] font-bold leading-none text-yellow-300">★</span>
                  <span className="mt-0.5 text-[9px] font-extrabold leading-none text-white">UK</span>
                </div>
                <input
                  type="text"
                  placeholder="YOUR REG"
                  maxLength={8}
                  value={reg}
                  onChange={(e) => {
                    setReg(e.target.value.toUpperCase());
                    setRegError(null);
                  }}
                  className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-center text-lg font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#8b7200] focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!reg.trim()) {
                    setRegError("Please enter your registration number.");
                    return;
                  }
                  if (!isValidUKReg(reg)) {
                    setRegError("Please enter a valid UK reg (e.g. AB12 CDE).");
                    return;
                  }
                  setRegError(null);
                  router.push(`/book?service=${selectedService}&reg=${encodeURIComponent(reg)}&autoLookup=1`);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto sm:shrink-0"
              >
                Start booking
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            {regError && (
              <div className="mt-2 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                <p className="text-sm font-medium text-red-600">{regError}</p>
                <button
                  type="button"
                  onClick={() => router.push(`/book?service=${selectedService}&manual=1${reg ? `&reg=${encodeURIComponent(reg)}` : ""}`)}
                  className="text-sm font-semibold text-[#3f63ff] underline underline-offset-2 hover:text-[#101a56]"
                >
                  Enter car details manually instead
                </button>
              </div>
            )}
          </div>

          {/* Car image with bottom fade */}
          <div className="relative mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/big-removebg-preview.png"
              alt="Heston Automotive"
              className="mx-auto w-full max-w-md sm:max-w-lg" style={{ filter: "none" }}
              draggable={false}
            />
            {/* smooth fade to white at the bottom */}
            <div className="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-white to-transparent" />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          OUR SERVICES
      ════════════════════════════════ */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Why drivers choose us</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Why Choose Us</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
              Reliable service, practical advice, and a garage team that keeps things simple from booking to collection.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]"
              >
                <span className="flex flex-1 flex-col gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                      {item.icon}
                    </span>
                    <span className="font-semibold text-[#101a56] transition-colors group-hover:text-[#3f63ff]">
                      {item.title}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-slate-500">
                    {item.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we offer</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Our services</h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]"
              >
                <span className="flex flex-1 flex-col gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                      {svc.icon}
                    </span>
                    <span className="font-semibold text-[#101a56] transition-colors group-hover:text-[#3f63ff]">
                      {svc.title}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-slate-500">
                    {svc.desc}
                  </span>
                </span>
                <span className="mt-4 flex items-center justify-between border-t border-[#eef4ff] pt-4">
                  <span className="text-xs font-medium text-slate-400">from</span>
                  <span className="text-xl font-extrabold text-[#101a56]">
                    {svc.price ?? "£???"}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4ff] px-6 py-2.5 text-sm font-bold text-[#3f63ff] transition hover:bg-[#3f63ff] hover:text-white"
            >
              View all services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          BRANDS WE SERVICE (MARQUEE)
      ════════════════════════════════ */}
      <section className="overflow-hidden border-y border-[#e0ebff] bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="mt-1 mb-8 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Brands we service</h2>
        </div>

        {/* Marquee container */}
        <div className="relative flex w-full overflow-hidden">
          {/* Left/Right Fading Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-32 bg-gradient-to-r from-white to-transparent sm:block" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-32 bg-gradient-to-l from-white to-transparent sm:block" />

          {/* Scrolling track */}
          <div className="flex w-max animate-marquee items-center gap-10 pr-10 hover:animation-play-state-paused">
            {BRANDS.map((brand) => (
              <img
                key={`a-${brand.key}`}
                src={`/api/logo?brand=${encodeURIComponent(brand.key)}&label=${encodeURIComponent(brand.label)}`}
                alt={brand.label}
                title={brand.label}
                className="h-10 w-auto object-contain sm:h-12 lg:h-14 transition-transform hover:scale-110"
                draggable={false}
                loading="lazy"
              />
            ))}
            {/* Duplicate set for seamless looping */}
            {BRANDS.map((brand) => (
              <img
                key={`b-${brand.key}`}
                src={`/api/logo?brand=${encodeURIComponent(brand.key)}&label=${encodeURIComponent(brand.label)}`}
                alt={brand.label}
                title={brand.label}
                className="h-10 w-auto object-contain sm:h-12 lg:h-14 transition-transform hover:scale-110"
                draggable={false}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════ */}
      <section className="bg-[#f4f8ff] px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Simple process</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">How it works</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3f63ff] to-[#6b8fff] text-sm font-extrabold text-white shadow-md shadow-[#3f63ff]/25">
                    {step.n}
                  </span>
                  <h3 className="font-bold text-[#101a56]">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT / HOURS
      ════════════════════════════════ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-full">

          {/* Section heading + contact info — all centered */}
          <div className="px-6 pb-8 text-center sm:px-12">
            <h2 className="text-3xl font-extrabold text-[#101a56]">Find Us</h2>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
              <svg className="h-4 w-4 shrink-0 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              We&apos;re located at 235 Yeading Ln, Hayes, UB4 9AD
            </p>
          </div>

          {/* Map with side padding */}
          <div className="px-6 sm:px-12">
            <div className="overflow-hidden rounded-2xl border border-[#e0ebff]">
              <iframe
                title="Heston Automotive location"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=235+Yeading+Lane,+Hayes,+UB4+9AD,+UK&output=embed&z=16&iwloc=near"
              />
            </div>
          </div>

          {/* Opening Times */}
          <div className="bg-white border-b border-[#e0ebff]">
            <div className="px-6 py-5 sm:px-12">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Opening Times</p>
                {isOpen !== null && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-[#f4f8ff] px-4 py-1.5">
                    <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-400"}`} />
                    <span className="text-sm font-semibold text-[#101a56]">
                      {isOpen ? `Open now · closes ${closingTime}` : "Currently closed"}
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {[
                  { label: "Monday", hours: "10:00 – 20:00", dayIndex: 1 },
                  { label: "Tuesday", hours: "10:00 – 20:00", dayIndex: 2 },
                  { label: "Wednesday", hours: "10:00 – 20:00", dayIndex: 3 },
                  { label: "Thursday", hours: "10:00 – 20:00", dayIndex: 4 },
                  { label: "Friday", hours: "10:00 – 20:00", dayIndex: 5 },
                  { label: "Saturday", hours: "10:00 – 20:00", dayIndex: 6 },
                  { label: "Sunday", hours: "Closed", dayIndex: 0 },
                ].map((d) => {
                  const isToday = today === d.dayIndex;
                  const isClosed = d.dayIndex === 0;
                  return (
                    <div
                      key={d.label}
                      className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all ${isToday
                          ? "border-[#101a56] bg-[#101a56] text-white shadow-md"
                          : isClosed
                            ? "border-red-100 bg-red-50 text-red-500"
                            : "border-[#e0ebff] bg-white text-[#101a56]"
                        }`}
                    >
                      <span className={`text-xs font-bold ${isToday ? "text-white" : isClosed ? "text-red-400" : "text-slate-500"}`}>{d.label}</span>
                      <span className={`mt-1 text-[11px] font-semibold ${isToday ? "text-blue-200" : isClosed ? "text-red-400" : "text-[#3f63ff]"}`}>{d.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
