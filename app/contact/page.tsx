"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, waUrl } from "@/lib/site-config";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [closingTime, setClosingTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    if (day === 0) {
      setIsOpen(false);
      setClosingTime("");
    } else {
      setIsOpen(mins >= 600 && mins < 1200);
      setClosingTime("20:00");
    }
  }, []);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">We&apos;re here to help</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#101a56] sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Call us, WhatsApp, or book online. Visit us at {site.addressLines.join(", ")}.
            We respond as soon as we&apos;re off the ramp.
          </p>
          {isOpen !== null && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-4 py-2 shadow-sm">
              <span className={`h-2.5 w-2.5 animate-pulse rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-400"}`} />
              <span className="text-sm font-semibold text-[#101a56]">
                {isOpen ? `Open now · closes ${closingTime}` : "Currently closed"}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT CARDS + HOURS ── */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Left col — contact methods */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Contact us</p>
              <h2 className="text-2xl font-extrabold text-[#101a56]">How to reach us</h2>

              {/* Phone */}
              <a
                href={`tel:${site.phoneTel}`}
                className="group flex items-center gap-4 rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone</p>
                  <p className="mt-0.5 font-bold text-[#101a56] group-hover:text-[#3f63ff]">{site.phoneDisplay}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#25D366]/40 hover:shadow-[0_6px_24px_rgba(37,211,102,0.1)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#25D366] group-hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">WhatsApp</p>
                  <p className="mt-0.5 font-bold text-[#101a56]">Message us on WhatsApp</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3f63ff]/30 hover:shadow-[0_6px_24px_rgba(63,99,255,0.1)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff] transition-all group-hover:bg-[#3f63ff] group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</p>
                  <p className="mt-0.5 font-bold text-[#101a56] group-hover:text-[#3f63ff]">{site.email}</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3f63ff]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Address</p>
                  {site.addressLines.map((line) => (
                    <p key={line} className="mt-0.5 font-bold text-[#101a56] leading-snug">{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col — hours + book */}
            <div className="flex flex-col gap-5">
              {/* Opening hours card */}
              <div className="rounded-2xl border border-[#e8effa] bg-white p-6 shadow-sm">
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
                <div className="my-5 border-t border-[#e8f0fb]" />
                <div className="flex flex-col gap-3">
                  <Link
                    href="/book"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e]"
                  >
                    Book online now
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#101a56] py-3.5 text-sm font-bold text-[#101a56] transition hover:bg-[#101a56] hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    Call {site.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Quick note */}
              <div className="rounded-2xl border border-[#e0ebff] bg-[#f4f8ff] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Collection service</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Can&apos;t make it to us? We offer a collection and delivery service for customers in the local area.
                  Ask us when you book or give us a call to arrange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#3f63ff]">Find us</p>
          <div className="overflow-hidden rounded-2xl border border-[#e8effa] shadow-sm">
            <div className="aspect-video w-full overflow-hidden bg-slate-100">
              <iframe
                title="Heston Automotive location"
                className="h-full w-full border-0"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.435%2C51.505%2C-0.415%2C51.519&amp;layer=mapnik"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">
            {site.addressLines.join(", ")} &mdash; free parking on site
          </p>
        </div>
      </section>

    </div>
  );
}
