"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site, waUrl } from "@/lib/site-config";

const SERVICES_MENU = [
  {
    href: "/diagnostics",
    label: "Diagnostics",
    desc: "Engine lights & fault codes",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM1 19h22M7 11h1.5l1.5-2 2 4 1.5-2H17" />
      </svg>
    ),
  },
  {
    href: "/repairs/brakes",
    label: "Brakes",
    desc: "Pads, discs & callipers",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    href: "/repairs/tyres",
    label: "Tyres",
    desc: "Fitting, balancing & repairs",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5l1.5-1.5M17 7l1.5-1.5" />
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
  {
    href: "/ev-battery",
    label: "EV Battery Health",
    desc: "State-of-Health report for EVs & hybrids",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z" />
      </svg>
    ),
  },
] as const;

const SERVICING_MENU = [
  { href: "/car-servicing/interim", label: "Oil Service", desc: "Every 6 months or 6,000 miles" },
  { href: "/car-servicing/full",    label: "Full Service",    desc: "Every 12 months or 12,000 miles", popular: true },
  { href: "/car-servicing/major",   label: "Major Service",  desc: "As per manufacturer schedule" },
  { href: "/brake-fluid",           label: "Brake Fluid Service", desc: "Flush & replacement, £99 fixed" },
] as const;

const REPAIRS_MENU = [
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
    <>
    <header className="sticky top-0 z-50 bg-white/98 shadow-[0_6px_18px_rgba(2,15,61,0.05)] backdrop-blur">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8 xl:px-10">
        <Link
          href="/"
          className="block w-[170px] shrink-0 sm:w-[240px] lg:w-[280px] xl:w-[220px] 2xl:w-[280px]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/updated-logo.png"
            alt={site.name}
            width={800}
            height={220}
            className="h-auto w-full object-contain"
            priority
            fetchPriority="high"
            unoptimized
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden xl:flex flex-1 items-center justify-center gap-0.5 px-1 2xl:gap-1">

          <Link href="/about" className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]">
            About
          </Link>

          <Link href="/mot" className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]">
            MOT
          </Link>

          {/* Car servicing dropdown */}
          <div className="group/nav relative">
            <Link
              href="/car-servicing"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]"
            >
              Servicing
              <ChevronDown />
            </Link>
            <div className="absolute left-0 top-full h-2 w-full" />
            <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] w-[300px] opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
              <div className="rounded-2xl border border-[#e8effa] bg-white p-4 shadow-[0_16px_48px_rgba(2,15,61,0.12)]">
                <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service Levels</p>
                <div className="flex flex-col gap-0.5">
                  {SERVICING_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#eef4ff]"
                    >
                      <span>
                        <span className="flex items-center gap-2 text-sm font-semibold text-[#020F3D] group-hover/item:text-[#0F63FF]">
                          {item.label}
                          {"popular" in item && item.popular && (
                            <span className="rounded-full bg-[#0F63FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Popular</span>
                          )}
                        </span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                      <svg className="h-4 w-4 shrink-0 text-slate-300 group-hover/item:text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#eef4ff] pt-3">
                  <Link href="/car-servicing" className="flex items-center gap-1 px-1 text-xs font-semibold text-[#0F63FF] hover:text-[#020F3D]">
                    View all servicing options
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services dropdown */}
          <div className="group/nav relative">
            <Link
              href="/services"
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]"
            >
              <span className="xl:hidden 2xl:inline">Additional </span>Services
              <ChevronDown />
            </Link>
            {/* invisible bridge so dropdown doesn't close when moving mouse */}
            <div className="absolute left-0 top-full h-2 w-full" />
            <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] w-[520px] opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
              <div className="rounded-2xl border border-[#e8effa] bg-white p-4 shadow-[0_16px_48px_rgba(2,15,61,0.12)]">
                <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Our Services</p>
                <div className="grid grid-cols-2 gap-1">
                  {SERVICES_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-[#eef4ff]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4f8ff] text-[#0F63FF] transition group-hover/item:bg-[#0F63FF] group-hover/item:text-white">
                        {item.icon}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-[#020F3D] group-hover/item:text-[#0F63FF]">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#eef4ff] pt-3">
                  <Link href="/services" className="flex items-center gap-1 px-1 text-xs font-semibold text-[#0F63FF] hover:text-[#020F3D]">
                    View all services
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
              className="flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]"
            >
              Repairs
              <ChevronDown />
            </Link>
            <div className="absolute left-0 top-full h-2 w-full" />
            <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] w-[340px] opacity-0 transition-all duration-150 group-hover/nav:pointer-events-auto group-hover/nav:opacity-100">
              <div className="rounded-2xl border border-[#e8effa] bg-white p-4 shadow-[0_16px_48px_rgba(2,15,61,0.12)]">
                <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">Repair Categories</p>
                <div className="flex flex-col gap-0.5">
                  {REPAIRS_MENU.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[#eef4ff]"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-[#020F3D] group-hover/item:text-[#0F63FF]">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                      <svg className="h-4 w-4 shrink-0 text-slate-300 group-hover/item:text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-[#eef4ff] pt-3">
                  <Link href="/repairs" className="flex items-center gap-1 px-1 text-xs font-semibold text-[#0F63FF] hover:text-[#020F3D]">
                    View all repairs
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/prices" className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]">
            Prices
          </Link>

          <Link href="/faqs" className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]">
            FAQs
          </Link>
          <Link href="/contact" className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#020F3D]">
            Contact
          </Link>
        </nav>

        {/* ── Desktop actions ── */}
        <div className="hidden xl:flex shrink-0 items-center gap-1.5 2xl:gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#020F3D] px-2.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#061744] 2xl:px-3"
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span className="hidden 2xl:inline">Call us</span>
          </a>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-2.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5d] 2xl:px-3"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span className="hidden 2xl:inline">WhatsApp</span>
          </a>
          <Link
            href="/quote"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0F63FF] px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF]"
          >
            Request a Quote
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="flex flex-1 items-center justify-end gap-1.5 xl:hidden sm:gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            aria-label="Call us"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#020F3D] text-white transition hover:bg-[#0F63FF] sm:h-11 sm:w-11"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </a>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white transition hover:bg-[#20b958] sm:h-11 sm:w-11"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:var(--border)] bg-white text-slate-600 transition hover:bg-[#eef4ff] sm:h-11 sm:w-11"
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

    </header>

      {/* ── Mobile menu ── */}
      <>
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
          onClick={() => setOpen(false)}
        />
        <div
          className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white xl:hidden overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out"
          style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="text-base font-bold text-[#020F3D]">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Nav list */}
            <nav className="divide-y divide-slate-100">

              {/* About Us */}
              <Link href="/about" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">About Us</span>
              </Link>

              {/* MOT */}
              <Link href="/mot" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="7.5,2 1.5,13 13.5,13"/><polygon points="16.5,2 10.5,13 22.5,13"/><polygon points="12,11.5 5,22 19,22"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">MOT</span>
              </Link>

              {/* Prices */}
              <Link href="/prices" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">Prices</span>
              </Link>

              {/* Car Servicing — expandable */}
              <div>
                <button type="button" onClick={() => setMobileServicing(!mobileServicing)}
                  className="flex w-full items-center gap-3 px-5 py-4 hover:bg-slate-50">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 7 2 2 4-4m-6 5h4"/></svg>
                  </span>
                  <span className="flex-1 text-left text-sm font-semibold text-[#020F3D]">Servicing</span>
                  <svg className={`h-4 w-4 text-slate-400 transition-transform ${mobileServicing ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                </button>
                {mobileServicing && (
                  <div className="bg-slate-50 divide-y divide-slate-100 border-t border-slate-100">
                    {SERVICING_MENU.map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
                        className="flex items-center justify-between pl-8 pr-5 py-3.5 hover:bg-slate-100">
                        <span className="flex items-center gap-2 text-sm text-[#020F3D]">
                          {item.label}
                          {"popular" in item && item.popular && (
                            <span className="rounded-full bg-[#0F63FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">Popular</span>
                          )}
                        </span>
                        <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Repairs — expandable */}
              <div>
                <button type="button" onClick={() => setMobileRepairs(!mobileRepairs)}
                  className="flex w-full items-center gap-3 px-5 py-4 hover:bg-slate-50">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.585l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"/></svg>
                  </span>
                  <span className="flex-1 text-left text-sm font-semibold text-[#020F3D]">Repairs</span>
                  <svg className={`h-4 w-4 text-slate-400 transition-transform ${mobileRepairs ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/></svg>
                </button>
                {mobileRepairs && (
                  <div className="bg-slate-50 divide-y divide-slate-100 border-t border-slate-100">
                    {REPAIRS_MENU.map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
                        className="flex items-center justify-between pl-8 pr-5 py-3.5 hover:bg-slate-100">
                        <span className="text-sm text-[#020F3D]">{item.label}</span>
                        <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Diagnostics */}
              <Link href="/diagnostics" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM1 19h22M7 11h1.5l1.5-2 2 4 1.5-2H17"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">Diagnostics</span>
              </Link>

              {/* Oil Change */}
              <Link href="/oil-change" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">Oil Change</span>
              </Link>

              {/* Battery Check */}
              <Link href="/battery-check" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">Battery Check</span>
              </Link>

              {/* EV Battery */}
              <Link href="/ev-battery" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">EV Battery Health</span>
              </Link>

              {/* Air Con */}
              <Link href="/air-con" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">Air Con</span>
              </Link>

              {/* Contact */}
              <Link href="/contact" onClick={() => setOpen(false)} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0F63FF]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                </span>
                <span className="text-sm font-semibold text-[#020F3D]">Contact Us</span>
              </Link>

            </nav>

            {/* Call & WhatsApp */}
            <div className="flex flex-col gap-2 px-5 py-5">
              <a href={`tel:${site.phoneTel}`}
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#020F3D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#061744]">
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
      </>
    </>
  );
}
