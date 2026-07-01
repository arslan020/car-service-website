import type { Metadata } from "next";
import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Prices | MOT, Servicing & Repairs Hayes UB4 | Marieston",
  description:
    "Transparent pricing for MOT, car servicing, additional services and repairs at Marieston Service Centre, Hayes UB4. Prices by engine size, all inclusive of VAT.",
  alternates: { canonical: "https://www.mariestonservicecentre.co.uk/prices" },
};

const ENGINE_COLS = ["0cc–1400cc", "1401cc–2000cc", "2001cc–3000cc"];
const CAR_SERVICING_COLS = [...ENGINE_COLS, "Over 3000cc"];

// Sentinel values — render an action button instead of a price
const QUOTE = "QUOTE";
const DIAGNOSTIC = "DIAGNOSTIC";

type PriceRow = { service: string; prices: string[]; flat?: boolean };

// Car Servicing — priced by engine size (inc. VAT)
const CAR_SERVICING: PriceRow[] = [
  { service: "Oil Service", prices: ["£139", "£179", "£219", QUOTE] },
  { service: "Full Service", prices: ["£239", "£319", "£369", QUOTE] },
  { service: "Major Service", prices: ["£269", "£349", "£399", QUOTE] },
  { service: "Brake Fluid Service", prices: ["£99", "£99", "£99", "£99"] },
];

// Additional Services — same value shown under each engine-size column
const ADDITIONAL_SERVICES: PriceRow[] = [
  { service: "Diagnostics", prices: ["£54", "£54", "£54"] },
  { service: "Brakes", prices: ["Free check / walk-in", "Free check / walk-in", "Free check / walk-in"] },
  { service: "Tyres", prices: ["Free check / walk-in", "Free check / walk-in", "Free check / walk-in"] },
  { service: "Battery Check", prices: ["Free check / walk-in", "Free check / walk-in", "Free check / walk-in"] },
  { service: "Air Con Re-gas (R134a)", prices: ["£79", "£79", "£79"] },
  { service: "Air Con Re-gas (R1234yf)", prices: ["£149", "£149", "£149"] },
  { service: "EV Battery Health", prices: ["£79"], flat: true },
];

// Repairs — diagnosis-led. Empty cells keep the grid aligned with the table above;
// the "Book Diagnostic" button sits under the rightmost column.
const REPAIRS_COLS = ["", "Price"];
const REPAIRS: PriceRow[] = [
  { service: "Engine & Cooling", prices: ["Exact price confirmed after diagnostic", DIAGNOSTIC] },
  { service: "Suspension & Steering", prices: ["Exact price confirmed after diagnostic", DIAGNOSTIC] },
  { service: "Clutch & Gearbox", prices: ["Exact price confirmed after diagnostic", DIAGNOSTIC] },
  { service: "Electrical", prices: ["Exact price confirmed after diagnostic", DIAGNOSTIC] },
  { service: "Exhaust & Emissions", prices: ["Exact price confirmed after diagnostic", DIAGNOSTIC] },
];

function QuoteButton({ message }: { message: string }) {
  return (
    <span className="inline-flex items-center justify-center gap-1.5">
      <a
        href={`tel:${site.phoneTel}`}
        aria-label="Call us"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#020F3D] text-white shadow-sm transition hover:bg-[#061744]"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      </a>
      <a
        href={waUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-sm transition hover:bg-[#1ebe5d]"
      >
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </span>
  );
}

function DiagnosticButton() {
  return (
    <Link
      href="/online-booking?service=diagnostics"
      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#020F3D] px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#061744]"
    >
      Book Diagnostic First
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </Link>
  );
}

function renderCell(value: string, service: string) {
  if (value === QUOTE) return <QuoteButton message={`Hi, I'd like a quote for ${service} please.`} />;
  if (value === DIAGNOSTIC) return <DiagnosticButton />;
  return value;
}

function PriceTable({ title, cols, rows, serviceColWidth = 40 }: { title: string; cols: string[]; rows: PriceRow[]; serviceColWidth?: number }) {
  const span = cols.length + 1;
  const priceColWidth = (100 - serviceColWidth) / cols.length;
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8effa] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
          <colgroup>
            {/* Service column fixed, price columns split the rest equally so tables line up */}
            <col style={{ width: `${serviceColWidth}%` }} />
            {cols.map((_, i) => (
              <col key={i} style={{ width: `${priceColWidth}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr className="bg-[#020F3D] text-white">
              <th className="px-5 py-4 text-sm font-bold">{title}</th>
              {cols.map((c, i) => (
                <th key={i} className="px-5 py-4 text-center text-sm font-bold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={span} className="px-5 py-6 text-center text-sm text-slate-400">
                  Pricing coming soon — call or WhatsApp us for a quote.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={r.service} className={i % 2 ? "bg-[#f8fbff]" : "bg-white"}>
                  <td className="border-t border-[#eef4ff] px-5 py-4 text-sm font-semibold text-[#020F3D]">
                    {r.service}
                  </td>
                  {r.flat ? (
                    <td colSpan={cols.length} className="border-t border-[#eef4ff] px-5 py-4 text-center text-sm text-slate-700">
                      {renderCell(r.prices[0], r.service)}
                    </td>
                  ) : (
                    r.prices.map((p, j) => (
                      <td key={j} className="border-t border-[#eef4ff] px-5 py-4 text-center text-sm text-slate-700">
                        {renderCell(p, r.service)}
                      </td>
                    ))
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricesPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-10 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Our Prices</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
            Clear, upfront pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Prices by engine size — all inclusive of VAT, no hidden extras. Not sure which band your car
            falls into? Just call or WhatsApp and we&apos;ll confirm.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-5 py-2.5 shadow-sm">
            <span className="text-sm font-semibold text-[#020F3D]">MOT</span>
            <span className="text-sm font-extrabold text-[#0F63FF]">£49 for all vehicles</span>
          </div>
        </div>
      </section>

      {/* ── Tables ── */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-5xl space-y-8">
          <PriceTable title="Servicing" cols={CAR_SERVICING_COLS} rows={CAR_SERVICING} serviceColWidth={24} />
          <PriceTable title="Additional Services" cols={ENGINE_COLS} rows={ADDITIONAL_SERVICES} />
          <PriceTable title="Repairs" cols={REPAIRS_COLS} rows={REPAIRS} serviceColWidth={30} />

          <p className="text-center text-xs text-slate-400">
            All prices include VAT. Final price confirmed once we&apos;ve identified your exact vehicle.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-[#020F3D] px-6 py-10 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Not sure what you need?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
            Send us your reg and we&apos;ll give you an exact price. {site.addressLines.join(", ")} — walk-ins welcome.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${site.phoneTel}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F63FF] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1E6BFF] sm:w-auto"
            >
              Call {site.phoneDisplay}
            </a>
            <a
              href={waUrl("Hi, I'd like a price please.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1ebe5d] sm:w-auto"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
