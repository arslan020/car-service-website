import Link from "next/link";
import Image from "next/image";
import { site, waUrl } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#020F3D]">

      {/* ── Main columns ── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block w-[160px]">
              <Image
                src="/updated-logo.png"
                alt={site.name}
                width={160}
                height={44}
                className="h-auto w-full object-contain brightness-0 invert"
                loading="eager"
                unoptimized
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              MOT, oil and full servicing, repairs, diagnostics, tyres and brakes — DVSA approved garage in Hayes, UB4.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href={waUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#25D366] hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href={`mailto:${site.email}`}
                aria-label="Email us"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#0F63FF]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#1877F2]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-[#E4405F]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Company</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "About Us",      href: "/about-us" },
                { label: "Areas We Serve", href: "/areas" },
                { label: "FAQs",          href: "/faqs" },
                { label: "Contact",       href: "/contact" },
                { label: "Request a Quote", href: "/quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Services</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "MOT",            href: "/mot" },
                { label: "Oil Service",    href: "/car-servicing/oil" },
                { label: "Full Service",   href: "/car-servicing/full" },
                { label: "Major Service",  href: "/car-servicing/major" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm font-semibold text-[#4DA3FF] transition hover:text-white">
                  See more →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Repairs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Repairs</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Engine & Cooling",    href: "/repairs/engine-cooling" },
                { label: "Suspension",          href: "/repairs/suspension-steering" },
                { label: "Clutch & Gearbox",   href: "/repairs/clutch-gearbox" },
                { label: "Electrical",          href: "/repairs/electrical" },
                { label: "Exhaust",             href: "/repairs/exhaust-emissions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Areas We Serve */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Areas We Serve</p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Southall",
                "Uxbridge",
                "West Drayton",
                "Northolt",
                "Greenford",
                "Hounslow",
              ].map((area) => (
                <li key={area} className="text-sm text-slate-400">
                  {area}
                </li>
              ))}
              <li>
                <Link href="/areas" className="text-sm font-semibold text-[#4DA3FF] transition hover:text-white">
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5 — Contact & Visit */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Contact</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <a href={`tel:${site.phoneTel}`} className="text-sm text-slate-400 transition hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${site.email}`} className="text-sm text-slate-400 transition hover:text-white break-all">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=235+Yeading+Lane+Hayes+UB4+9AD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  235 Yeading Lane, Hayes, UB4 9AD
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="text-sm text-slate-400">Mon–Sat 9:00–18:00<br /><span className="text-red-400">Closed Sunday</span></span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Bottom bar ── */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3">
          <ul className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <li><Link href="/privacy" className="transition hover:text-slate-300">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="transition hover:text-slate-300">Terms &amp; Conditions</Link></li>
          </ul>
          <p className="text-xs text-slate-500 text-center">
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
