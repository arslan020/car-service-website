"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site, waUrl } from "@/lib/site-config";

const SERVICES_MENU = [
  {
    href: "/car-servicing",
    label: "Car Servicing",
    desc: "Interim, full & major service",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    href: "/oil-change",
    label: "Oil Change",
    desc: "Premium oil & filter replacement",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      </svg>
    ),
  },
  {
    href: "/diagnostics",
    label: "Diagnostics",
    desc: "Engine lights & fault codes",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    href: "/repairs/brakes",
    label: "Brakes & Tyres",
    desc: "Pads, discs & tyre fitting",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    href: "/battery-check",
    label: "Battery Check",
    desc: "Testing, charging & replacement",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    href: "/air-con",
    label: "Air Con",
    desc: "Regas & system inspection",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
] as const;

const SERVICING_MENU = [
  { href: "/car-servicing/interim", label: "Interim Service", desc: "Every 6 months or 6,000 miles" },
  { href: "/car-servicing/full",    label: "Full Service",    desc: "Every 12 months or 12,000 miles", popular: true },
  { href: "/car-servicing/major",   label: "Major Service",  desc: "As per manufacturer schedule" },
] as const;

const REPAIRS_MENU = [
  { href: "/repairs/brakes", label: "Brakes", desc: "Pads, discs & callipers" },
  { href: "/repairs/clutch-gearbox", label: "Clutch & Gearbox", desc: "Slipping clutch, gear faults" },
  { href: "/repairs/suspension-steering", label: "Suspension & Steering", desc: "Shock absorbers, ball joints" },
  { href: "/repairs/exhaust-emissions", label: "Exhaust & Emissions", desc: "Silencer, DPF, catalytic converter" },
  { href: "/repairs/engine-cooling", label: "Engine & Cooling", desc: "Overheating, oil leaks, timing" },
  { href: "/repairs/electrical", label: "Electrical & Lighting", desc: "Battery, alternator, bulbs" },
] as const;

function ChevronDown() {
  return (
    <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover/nav:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileServicing, setMobileServicing] = useState(false);
  const [mobileRepairs, setMobileRepairs] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/98 shadow-[0_6px_18px_rgba(16,26,86,0.05)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/business-logo.png"
            alt={site.name}
            width={160}
            height={48}
            className="h-auto w-[132px] object-contain sm:w-[160px] lg:w-[180px]"
            priority
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden xl:flex flex-1 items-center gap-1 px-1">

          <Link href="/mot" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
            MOT
          </Link>

          {/* Services dropdown */}
          <div className="group/nav relative">
            <Link
              href="/services"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              Services
              <ChevronDown />
            </Link>
            {/* invisible bridge so dropdown doesn't close when moving mouse */}
            <div className="absolute left-0 top-full h-2 w-full" />
            <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] w-[520px] opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
              <div className="rounded-2xl border border-[#e8effa] bg-white p-4 shadow-[0_16px_48px_rgba(16,26,86,0.12)]">
                <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Our services</p>
                <div className="grid grid-cols-2 gap-1">
                  {SERVICES_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-[#eef4ff]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4f8ff] text-[#3f63ff] transition group-hover/item:bg-[#3f63ff] group-hover/item:text-white">
                        {item.icon}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-[#101a56] group-hover/item:text-[#3f63ff]">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#eef4ff] pt-3">
                  <Link href="/services" className="flex items-center gap-1 px-1 text-xs font-semibold text-[#3f63ff] hover:text-[#101a56]">
                    View all services
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Car servicing dropdown */}
          <div className="group/nav relative">
            <Link
              href="/car-servicing"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              Car servicing
              <ChevronDown />
            </Link>
            <div className="absolute left-0 top-full h-2 w-full" />
            <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] w-[300px] opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
              <div className="rounded-2xl border border-[#e8effa] bg-white p-4 shadow-[0_16px_48px_rgba(16,26,86,0.12)]">
                <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service levels</p>
                <div className="flex flex-col gap-0.5">
                  {SERVICING_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#eef4ff]"
                    >
                      <span>
                        <span className="flex items-center gap-2 text-sm font-semibold text-[#101a56] group-hover/item:text-[#3f63ff]">
                          {item.label}
                          {"popular" in item && item.popular && (
                            <span className="rounded-full bg-[#3f63ff] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Popular</span>
                          )}
                        </span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                      <svg className="h-4 w-4 shrink-0 text-slate-300 group-hover/item:text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#eef4ff] pt-3">
                  <Link href="/car-servicing" className="flex items-center gap-1 px-1 text-xs font-semibold text-[#3f63ff] hover:text-[#101a56]">
                    View all servicing options
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Repairs dropdown */}
          <div className="group/nav relative">
            <Link
              href="/repairs"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              Repairs
              <ChevronDown />
            </Link>
            <div className="absolute left-0 top-full h-2 w-full" />
            <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] w-[340px] opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
              <div className="rounded-2xl border border-[#e8effa] bg-white p-4 shadow-[0_16px_48px_rgba(16,26,86,0.12)]">
                <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Repair categories</p>
                <div className="flex flex-col gap-0.5">
                  {REPAIRS_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#eef4ff]"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-[#101a56] group-hover/item:text-[#3f63ff]">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                      <svg className="h-4 w-4 shrink-0 text-slate-300 group-hover/item:text-[#3f63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#eef4ff] pt-3">
                  <Link href="/repairs" className="flex items-center gap-1 px-1 text-xs font-semibold text-[#3f63ff] hover:text-[#101a56]">
                    View all repairs
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/faqs" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
            FAQs
          </Link>
          <Link href="/contact" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
            Contact
          </Link>
        </nav>

        {/* ── Desktop actions ── */}
        <div className="hidden xl:flex shrink-0 items-center gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#101a56] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16236e]"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            Call us
          </a>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5d]"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/book"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#3f63ff] px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-[#3354e0]"
          >
            Book now
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#3f63ff] px-3 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[#3354e0] sm:px-4 sm:text-sm"
          >
            Book now
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[color:var(--border)] bg-white text-slate-600 transition hover:bg-[#eef4ff]"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="border-t border-[#edf2f8] bg-white xl:hidden overflow-y-auto max-h-[85vh]">
          <div className="px-4 py-5 space-y-4">

            {/* Our services card */}
            <div>
              <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Our services</p>
              <div className="overflow-hidden rounded-2xl border border-[#edf2f8] bg-white shadow-sm divide-y divide-[#f0f4fa]">

                {/* MOT */}
                <Link href="/mot" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#101a56] text-white">
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M12 7v5l3 3"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101a56]">MOT Test</p>
                    <p className="text-xs text-slate-400">DVSA approved, same-day slots</p>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </Link>

                {/* Car Servicing — expandable */}
                <div>
                  <button type="button" onClick={() => setMobileServicing(!mobileServicing)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3f63ff] text-white">
                      <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-[#101a56]">Car Servicing</p>
                      <p className="text-xs text-slate-400">Interim, full & major service</p>
                    </div>
                    <svg className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${mobileServicing ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                  </button>
                  {mobileServicing && (
                    <div className="bg-[#f9fbff] border-t border-[#eef4ff]">
                      {SERVICING_MENU.map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
                          className="flex items-center justify-between px-5 py-3 text-sm transition hover:bg-[#eef4ff] border-b border-[#f0f4fa] last:border-0">
                          <span>
                            <span className="flex items-center gap-2 font-medium text-[#101a56]">
                              {item.label}
                              {"popular" in item && item.popular && (
                                <span className="rounded-full bg-[#3f63ff] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Popular</span>
                              )}
                            </span>
                            <span className="text-xs text-slate-400">{item.desc}</span>
                          </span>
                          <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Repairs — expandable */}
                <div>
                  <button type="button" onClick={() => setMobileRepairs(!mobileRepairs)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-[#101a56]">Repairs</p>
                      <p className="text-xs text-slate-400">Brakes, clutch, suspension & more</p>
                    </div>
                    <svg className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${mobileRepairs ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                  </button>
                  {mobileRepairs && (
                    <div className="bg-[#f9fbff] border-t border-[#eef4ff]">
                      {REPAIRS_MENU.map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
                          className="flex items-center justify-between px-5 py-3 text-sm transition hover:bg-[#eef4ff] border-b border-[#f0f4fa] last:border-0">
                          <span>
                            <span className="block font-medium text-[#101a56]">{item.label}</span>
                            <span className="text-xs text-slate-400">{item.desc}</span>
                          </span>
                          <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Diagnostics */}
                <Link href="/diagnostics" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101a56]">Diagnostics</p>
                    <p className="text-xs text-slate-400">Warning lights & fault codes</p>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </Link>

                {/* Oil Change */}
                <Link href="/oil-change" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101a56]">Oil Change</p>
                    <p className="text-xs text-slate-400">Premium oil & filter replacement</p>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </Link>

                {/* Battery Check */}
                <Link href="/battery-check" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-white">
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101a56]">Battery Check</p>
                    <p className="text-xs text-slate-400">Testing, charging & replacement</p>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </Link>

                {/* Air Con */}
                <Link href="/air-con" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#f4f8ff]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-white">
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101a56]">Air Con</p>
                    <p className="text-xs text-slate-400">Regas & system inspection</p>
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </Link>

              </div>
            </div>

            {/* Other links */}
            <div className="overflow-hidden rounded-2xl border border-[#edf2f8] bg-white shadow-sm divide-y divide-[#f0f4fa]">
              <Link href="/contact" onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-[#f4f8ff]">
                Contact
                <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
              </Link>
            </div>

            {/* Call & WhatsApp */}
            <div className="flex flex-col gap-2 pb-2">
              <a href={`tel:${site.phoneTel}`}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#101a56] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#16236e]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
                Call {site.phoneDisplay}
              </a>
              <a href={waUrl()} target="_blank" rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
