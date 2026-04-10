import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

const links = [
  { href: "/mot", title: "MOT testing", desc: "Class IV and packages with servicing." },
  { href: "/car-servicing", title: "Car servicing", desc: "Interim, full, and major schedules." },
  { href: "/repairs", title: "Repairs", desc: "Mechanical repairs and component replacement." },
  { href: "/diagnostics", title: "Diagnostics", desc: "Fault codes, live data, and tracing." },
  { href: "/pricing", title: "Pricing", desc: "Transparent “from” prices." },
  { href: "/book", title: "Book online", desc: "Reserve a slot in minutes." },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Everything we offer">
        <p>
          From scheduled servicing and MOTs to diagnostics and repairs — book online or request a quote for anything
          unusual.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block h-full rounded-xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
              >
                <h2 className="font-semibold text-slate-900">{l.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{l.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
