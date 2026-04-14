"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site, waUrl } from "@/lib/site-config";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/mot", label: "MOT" },
  { href: "/car-servicing", label: "Car servicing" },
  { href: "/repairs", label: "Repairs" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

        <nav className="hidden xl:flex flex-1 items-center gap-1 px-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-white px-3 py-3 shadow-lg xl:hidden sm:px-4">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#eef4ff] hover:text-[#101a56]"
              >
                {item.label}
              </Link>
            ))}
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
