"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site, waUrl } from "@/lib/site-config";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/mot", label: "MOT" },
  { href: "/car-servicing", label: "Car servicing" },
  { href: "/repairs", label: "Repairs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-2 sm:px-4">

        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/business-logo.png"
            alt={site.name}
            width={160}
            height={48}
            className="h-auto w-[160px] object-contain sm:w-[192px]"
            priority
          />
        </Link>

        {/* Nav links — desktop only */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 px-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-[#0e1555] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop action buttons */}
        <div className="hidden lg:flex shrink-0 items-center gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0e1555] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1c2a61]"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={waUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
          >
            WhatsApp
          </a>
          <Link
            href="/book"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#F1B500] px-4 py-2 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000]"
          >
            Book now
          </Link>
        </div>

        {/* Mobile: Book now + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/book"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#F1B500] px-3 py-2 text-sm font-bold text-[#0e1555] shadow-md hover:bg-[#d4a000]"
          >
            Book now
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 hover:bg-slate-200"
            aria-label="Toggle menu"
          >
            {open ? (
              /* X icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-[#0e1555]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            <a
              href={`tel:${site.phoneTel}`}
              className="flex min-h-11 items-center justify-center rounded-lg bg-[#0e1555] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1c2a61]"
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
