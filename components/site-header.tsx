"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site, waUrl } from "@/lib/site-config";

const SERVICES_MENU = [
  {
    href: "/mot",
    label: "MOT Test",
    desc: "DVSA approved, same-day slots",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
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
  const [mobileServices, setMobileServices] = useState(false);
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

          <Link href="/" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
            Home
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

          <Link href="/mot" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
            MOT
          </Link>

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

          <Link href="/contact" className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
            Contact
          </Link>
        </nav>

        {/* ── Desktop actions ── */}
        <div className="hidden xl:flex shrink-0 items-center gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#101a56] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16236e]"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
          >
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
        <div className="border-t border-[color:var(--border)] bg-white px-3 py-3 shadow-lg xl:hidden sm:px-4">
          <nav className="flex flex-col gap-1">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
              Home
            </Link>

            {/* Mobile Services expandable */}
            <button
              type="button"
              onClick={() => setMobileServices(!mobileServices)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              Services
              <svg className={`h-4 w-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {mobileServices && (
              <div className="ml-4 flex flex-col gap-0.5 rounded-xl border border-[#eef4ff] bg-[#f9fbff] p-2">
                {SERVICES_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-white hover:text-[#3f63ff]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#eef4ff] text-[#3f63ff]">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/mot" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
              MOT
            </Link>

            {/* Mobile Car servicing expandable */}
            <button
              type="button"
              onClick={() => setMobileServicing(!mobileServicing)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              Car servicing
              <svg className={`h-4 w-4 transition-transform ${mobileServicing ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {mobileServicing && (
              <div className="ml-4 flex flex-col gap-0.5 rounded-xl border border-[#eef4ff] bg-[#f9fbff] p-2">
                {SERVICING_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-white hover:text-[#3f63ff]"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {item.label}
                      {"popular" in item && item.popular && (
                        <span className="rounded-full bg-[#3f63ff] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Popular</span>
                      )}
                    </span>
                    <span className="block text-xs text-slate-400">{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Repairs expandable */}
            <button
              type="button"
              onClick={() => setMobileRepairs(!mobileRepairs)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              Repairs
              <svg className={`h-4 w-4 transition-transform ${mobileRepairs ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {mobileRepairs && (
              <div className="ml-4 flex flex-col gap-0.5 rounded-xl border border-[#eef4ff] bg-[#f9fbff] p-2">
                {REPAIRS_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-white hover:text-[#3f63ff]"
                  >
                    <span className="block font-medium">{item.label}</span>
                    <span className="block text-xs text-slate-400">{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}

            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]">
              Contact
            </Link>
          </nav>

          <div className="mt-3 flex flex-col gap-2 border-t border-[#edf2f8] pt-3">
            <a
              href={`tel:${site.phoneTel}`}
              className="flex min-h-11 items-center justify-center rounded-lg bg-[#101a56] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16236e]"
            >
              Call {site.phoneDisplay}
            </a>
            <a
              href={waUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
