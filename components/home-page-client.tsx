"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { site } from "@/lib/site-config";
import { BookingBar } from "@/components/booking-bar";
import type { ContentMap } from "@/lib/page-content";

function isValidUKReg(value: string): boolean {
  const clean = value.toUpperCase().replace(/\s/g, "");
  return /^([A-Z]{2}[0-9]{2}[A-Z]{3}|[A-Z][0-9]{1,3}[A-Z]{3}|[A-Z]{3}[0-9]{1,3}[A-Z]|[0-9]{1,4}[A-Z]{1,3}|[A-Z]{1,3}[0-9]{1,4})$/.test(clean);
}

const SERVICE_OPTIONS: readonly { id: string; label: string }[] = [
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

const FEATURED_SERVICES = [
  {
    href: "/mot",
    titleKey: "svc_1_title",
    descKey: "svc_1_desc",
    priceKey: "svc_1_price",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    href: "/car-servicing",
    titleKey: "svc_2_title",
    descKey: "svc_2_desc",
    priceKey: "svc_2_price",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/oil-change",
    titleKey: "svc_3_title",
    descKey: "svc_3_desc",
    priceKey: "svc_3_price",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    href: "/battery-check",
    titleKey: "svc_4_title",
    descKey: "svc_4_desc",
    priceKey: "svc_4_price",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
] as const;

const WHY_ICONS = [
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7.5 3v6c0 5.25-3.438 8.25-7.5 9-4.062-.75-7.5-3.75-7.5-9V6L12 3Z" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5c0-1.38-1.567-2.5-3.5-2.5S8.5 8.12 8.5 9.5 10.067 12 12 12s3.5 1.12 3.5 2.5S13.933 17 12 17s-3.5-1.12-3.5-2.5" />
    </svg>
  ),
  (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
] as const;

function parseBookingTabs(raw: string) {
  const map = new Map<string, string>();
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const i = t.indexOf("|");
    if (i === -1) continue;
    const id = t.slice(0, i).trim();
    const label = t.slice(i + 1).trim();
    if (id) map.set(id, label || id);
  }
  return SERVICE_OPTIONS.map((row) => ({ id: row.id, label: map.get(row.id) ?? row.label }));
}

function parseHoursRows(raw: string) {
  const idx: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };
  const fallback = [
    { label: "Monday", hours: "9:00 – 18:00", dayIndex: 1 },
    { label: "Tuesday", hours: "9:00 – 18:00", dayIndex: 2 },
    { label: "Wednesday", hours: "9:00 – 18:00", dayIndex: 3 },
    { label: "Thursday", hours: "9:00 – 18:00", dayIndex: 4 },
    { label: "Friday", hours: "9:00 – 18:00", dayIndex: 5 },
    { label: "Saturday", hours: "9:00 – 18:00", dayIndex: 6 },
    { label: "Sunday", hours: "Closed", dayIndex: 0 },
  ];
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return fallback;
  return lines.map((line) => {
    const [dayPart, hoursPart = ""] = line.split("|").map((s) => s.trim());
    const dayIndex = idx[dayPart.toLowerCase()] ?? 0;
    return { label: dayPart, hours: hoursPart, dayIndex };
  });
}

export function HomePageClient({ content }: { content: ContentMap }) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [closingTime, setClosingTime] = useState("");
  const [today, setToday] = useState(0);
  const [typed, setTyped] = useState(content.hero_typewriter);
  const hoursRows = useMemo(() => parseHoursRows(content.hours_grid), [content.hours_grid]);

  const whyCards = useMemo(
    () => [
      { title: content.why_1_title, body: content.why_1_body, icon: WHY_ICONS[0] },
      { title: content.why_2_title, body: content.why_2_body, icon: WHY_ICONS[1] },
      { title: content.why_3_title, body: content.why_3_body, icon: WHY_ICONS[2] },
      { title: content.why_4_title, body: content.why_4_body, icon: WHY_ICONS[3] },
    ],
    [content],
  );

  const howSteps = useMemo(
    () => [
      { n: 1, title: content.hiw_1_title, body: content.hiw_1_body },
      { n: 2, title: content.hiw_2_title, body: content.hiw_2_body },
      { n: 3, title: content.hiw_3_title, body: content.hiw_3_body },
      { n: 4, title: content.hiw_4_title, body: content.hiw_4_body },
    ],
    [content],
  );

  const phrase = content.hero_typewriter;

  useEffect(() => {
    let i = phrase.length;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (!deleting) {
        i++;
        setTyped(phrase.slice(0, i));
        if (i >= phrase.length) {
          timeout = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
      } else {
        i--;
        setTyped(phrase.slice(0, i));
        if (i <= 0) {
          timeout = setTimeout(() => { deleting = false; tick(); }, 600);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 70);
    }

    timeout = setTimeout(tick, 2000);
    return () => clearTimeout(timeout);
  }, [phrase]);

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
      // Mon–Sat 9:00–18:00
      setIsOpen(mins >= 540 && mins < 1080);
      setClosingTime("18:00");
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
          <a
            href="https://www.google.com/maps/place/Marieston+Service+Centre/@51.5268571,-0.4022969,586m/data=!3m2!1e3!4b1!4m6!3m5!1s0x48766dd076f12283:0x9b182de007f87a84!8m2!3d51.5268571!4d-0.399722!16s%2Fg%2F11njnzzcdd"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d0dcea] bg-white px-4 py-2 shadow-sm transition hover:border-[#0F63FF]/40 hover:shadow-md"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff]">
              <svg className="h-3.5 w-3.5 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {site.addressLines.join(", ")}
            </span>
          </a>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#020F3D] sm:text-5xl lg:text-6xl">
            {content.hero_title_line1}
            <br />
            <span className="text-[#0F63FF]">{content.hero_title_accent}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-base text-slate-500 sm:mt-4 sm:text-lg">
            {typed}
            <span className="inline-block w-0.5 h-[1em] align-middle bg-slate-400 ml-0.5 animate-pulse" />
          </p>

          {/* ── CTA buttons ── */}
          <BookingBar defaultService="mot" />

          {/* Car image with bottom fade */}
          <div className="relative mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/big-removebg-preview.png"
              alt="Marieston Service Centre"
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">{content.why_kicker}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">{content.why_title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">{content.why_intro}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {whyCards.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F63FF]/30 hover:shadow-[0_6px_24px_rgba(15,99,255,0.1)]"
              >
                <span className="flex flex-1 flex-col gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF] transition-all group-hover:bg-[#0F63FF] group-hover:text-white">
                      {item.icon}
                    </span>
                    <span className="font-semibold leading-snug text-[#020F3D] transition-colors group-hover:text-[#0F63FF]">
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">{content.svc_block_kicker}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">{content.svc_block_title}</h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {FEATURED_SERVICES.map((svc) => {
              const title = content[svc.titleKey];
              const desc = content[svc.descKey];
              const price = content[svc.priceKey];
              return (
              <Link
                key={svc.href}
                href={svc.href}
                className="group flex flex-col rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F63FF]/30 hover:shadow-[0_6px_24px_rgba(15,99,255,0.1)]"
              >
                <span className="flex flex-1 flex-col gap-3">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#0F63FF] transition-all group-hover:bg-[#0F63FF] group-hover:text-white">
                      {svc.icon}
                    </span>
                    <span className="font-semibold text-[#020F3D] transition-colors group-hover:text-[#0F63FF]">
                      {title}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-slate-500">
                    {desc}
                  </span>
                </span>
                <span className="mt-4 flex items-center justify-between border-t border-[#eef4ff] pt-4">
                  <span className="text-xs font-medium text-slate-400">{content.svc_block_from_label}</span>
                  <span className="text-xl font-extrabold text-[#020F3D]">
                    {!price || price === "£???" ? "£???" : price}
                  </span>
                </span>
              </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4ff] px-6 py-2.5 text-sm font-bold text-[#0F63FF] transition hover:bg-[#0F63FF] hover:text-white"
            >
              {content.svc_block_view_all}
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
          <h2 className="mt-1 mb-8 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">{content.brands_title}</h2>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">{content.hiw_kicker}</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#020F3D] sm:text-3xl">{content.hiw_title}</h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howSteps.map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-3 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F63FF] to-[#4DA3FF] text-sm font-extrabold text-white shadow-md shadow-[#0F63FF]/25">
                    {step.n}
                  </span>
                  <h3 className="font-bold text-[#020F3D]">{step.title}</h3>
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
            <h2 className="text-3xl font-extrabold text-[#020F3D]">{content.find_title}</h2>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
              <svg className="h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {content.find_address_line}
            </p>
          </div>

          {/* Map with side padding */}
          <div className="px-6 sm:px-12">
            <div className="overflow-hidden rounded-2xl border border-[#e0ebff]">
              <iframe
                title="Marieston Service Centre location"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586!2d-0.399722!3d51.5268571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766dd076f12283%3A0x9b182de007f87a84!2sMarieston%20Service%20Centre!5e0!3m2!1sen!2suk!4v1715769600000!5m2!1sen!2suk"
              />
            </div>
          </div>

          {/* Opening Times */}
          <div className="bg-white border-b border-[#e0ebff]">
            <div className="px-6 py-5 sm:px-12">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">{content.hours_kicker}</p>
                {isOpen !== null && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-[#f4f8ff] px-4 py-1.5">
                    <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-400"}`} />
                    <span className="text-sm font-semibold text-[#020F3D]">
                      {isOpen ? `Open now · closes ${closingTime}` : "Currently closed"}
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {hoursRows.map((d) => {
                  const isToday = today === d.dayIndex;
                  const isClosed = d.hours.toLowerCase().includes("closed");
                  return (
                    <div
                      key={d.label}
                      className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all ${isToday
                          ? "border-[#020F3D] bg-[#020F3D] text-white shadow-md"
                          : isClosed
                            ? "border-red-100 bg-red-50 text-red-500"
                            : "border-[#e0ebff] bg-white text-[#020F3D]"
                        }`}
                    >
                      <span className={`text-xs font-bold ${isToday ? "text-white" : isClosed ? "text-red-400" : "text-slate-500"}`}>{d.label}</span>
                      <span className={`mt-1 text-[11px] font-semibold ${isToday ? "text-blue-200" : isClosed ? "text-red-400" : "text-[#0F63FF]"}`}>{d.hours}</span>
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
