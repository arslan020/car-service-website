"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { site, waUrl } from "@/lib/site-config";

const SERVICE_OPTIONS = [
  { id: "mot", label: "MOT Test" },
  { id: "full", label: "Full Service" },
  { id: "interim", label: "Interim Service" },
  { id: "brakes", label: "Brakes" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "tyres", label: "Tyres" },
  { id: "ac", label: "Air-Con" },
  { id: "oil", label: "Oil Change" },
  { id: "battery", label: "Battery Check" },
] as const;

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
    href: "/car-servicing",
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
    href: "/services",
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

const TYPEWRITER_TEXT = "We collect, we fix & we return your car";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState("mot");
  const [reg, setReg] = useState("");
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [closingTime, setClosingTime] = useState("");
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-0 pt-16 text-center sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl">

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
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    selectedService === s.id
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
              <div className="relative flex w-full overflow-hidden rounded-xl border-2 border-[#F5C518] bg-[#F5C518] shadow-md sm:flex-1">
                <div className="flex w-[3.25rem] shrink-0 flex-col items-center justify-center bg-[#003399] py-3">
                  <span className="text-[9px] font-bold leading-none text-yellow-300">★</span>
                  <span className="mt-0.5 text-[9px] font-extrabold leading-none text-white">UK</span>
                </div>
                <input
                  type="text"
                  placeholder="YOUR REG"
                  maxLength={8}
                  value={reg}
                  onChange={(e) => setReg(e.target.value.toUpperCase())}
                  className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-center text-lg font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#8b7200] focus:outline-none"
                />
              </div>
              <Link
                href={`/book?service=${selectedService}${reg ? `&reg=${encodeURIComponent(reg)}&autoLookup=1` : ""}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto sm:shrink-0"
              >
                Start booking
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Car image with bottom fade */}
          <div className="relative mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/big-removebg-preview.png"
              alt="Heston Automotive"
              className="mx-auto w-full max-w-md sm:max-w-lg" style={{filter: "none"}}
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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">What we offer</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#101a56] sm:text-3xl">Our services</h2>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1 text-sm font-semibold text-[#3f63ff] hover:text-[#101a56]"
            >
              View all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                  {svc.icon}
                </span>
                <span className="mt-4 flex-1">
                  <span className="block font-semibold text-[#101a56] transition-colors group-hover:text-[#3f63ff]">
                    {svc.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-slate-500">
                    {svc.desc}
                  </span>
                </span>
                <span className="mt-5 flex items-center justify-between border-t border-[#eef4ff] pt-4">
                  <span className="text-xs font-medium text-slate-400">from</span>
                  <span className="text-xl font-extrabold text-[#101a56]">
                    {svc.price ?? "£???"}
                  </span>
                </span>
              </Link>
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
                className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3f63ff] to-[#6b8fff] text-sm font-extrabold text-white shadow-md shadow-[#3f63ff]/25">
                  {step.n}
                </span>
                <h3 className="mt-4 font-bold text-[#101a56]">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT / HOURS
      ════════════════════════════════ */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-[#e0ebff] bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">

              {/* Left: status + buttons */}
              <div className="flex flex-col justify-between gap-6 border-b border-[#e0ebff] p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <div>
                  {isOpen !== null && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-[#f4f8ff] px-4 py-1.5">
                      <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-400"}`} />
                      <span className="text-sm font-semibold text-[#101a56]">
                        {isOpen ? `Open now · closes ${closingTime}` : "Currently closed"}
                      </span>
                    </div>
                  )}
                  <h2 className="text-2xl font-extrabold text-[#101a56]">Get in touch</h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Call us, WhatsApp, or book online — we&apos;re here to help.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-[#101a56] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    Call {site.phoneDisplay}
                  </a>
                  <a
                    href={waUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d]"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp us
                  </a>
                </div>

                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="h-4 w-4 shrink-0 text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {site.addressLines.join(", ")}
                </p>
              </div>

              {/* Right: opening hours */}
              <div className="p-5 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Opening hours</p>
                <ul className="mt-5 space-y-4">
                  {[
                    { day: "Monday – Saturday", hours: "10:00 – 20:00", closed: false },
                    { day: "Sunday", hours: "Closed", closed: true },
                  ].map((row) => (
                    <li key={row.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{row.day}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${row.closed ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-700"}`}>
                        {row.hours}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="my-6 border-t border-[#e8f0fb]" />

                <Link
                  href="/book"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#101a56] py-3 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white"
                >
                  Book online now
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
