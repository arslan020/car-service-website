import Link from "next/link";
import { site } from "@/lib/site-config";

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-12 lg:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-[#101a56]">{site.name}</p>
          <p className="mt-2 text-sm text-slate-600">{site.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#101a56]">Visit</p>
          <address className="mt-2 not-italic text-sm text-slate-600">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3 text-sm text-slate-600">{site.hours}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#101a56]">Contact</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            <li>
              <a className="font-medium text-[#3f63ff] hover:text-[#101a56] hover:underline" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="font-medium text-[#3f63ff] hover:text-[#101a56] hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <Link className="font-medium text-[#3f63ff] hover:text-[#101a56] hover:underline" href="/faqs">
                FAQs
              </Link>
            </li>
            <li>
              <Link className="font-medium text-[#3f63ff] hover:text-[#101a56] hover:underline" href="/quote">
                Request a quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#edf2f8] bg-[#f6fbff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-4">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-slate-800">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
