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

// Sentinel value — renders a WhatsApp "Request a quote" button instead of a price
const QUOTE = "QUOTE";

type PriceRow = { service: string; prices: string[]; flat?: boolean };

// Car Servicing — priced by engine size (inc. VAT)
const CAR_SERVICING: PriceRow[] = [
  { service: "Oil Service", prices: ["£139", "£179", "£219", QUOTE] },
  { service: "Full Service", prices: ["£239", "£319", "£369", QUOTE] },
  { service: "Major Service", prices: ["£269", "£349", "£399", QUOTE] },
];

// Additional Services — same value shown under each engine-size column
const ADDITIONAL_SERVICES: PriceRow[] = [
  { service: "Diagnostics", prices: ["£54", "£54", "£54"] },
  { service: "Brakes & Tyres", prices: ["Free check / walk-in", "Free check / walk-in", "Free check / walk-in"] },
  { service: "Battery Check", prices: ["Free check / walk-in", "Free check / walk-in", "Free check / walk-in"] },
  { service: "Air Con Re-gas (R134a)", prices: ["£79", "£79", "£79"] },
  { service: "Air Con Re-gas (R1234yf)", prices: ["£149", "£149", "£149"] },
  { service: "EV Battery Health", prices: ["£79"], flat: true },
];

// Repairs — quote-based. Empty cells keep the grid aligned with the table above;
// the quote button sits under the rightmost column.
const REPAIRS_COLS = ["", "", "Price"];
const REPAIRS: PriceRow[] = [
  { service: "Engine & Cooling", prices: ["", "", QUOTE] },
  { service: "Suspension & Steering", prices: ["", "", QUOTE] },
  { service: "Clutch & Gearbox", prices: ["", "", QUOTE] },
  { service: "Electrical", prices: ["", "", QUOTE] },
  { service: "Exhaust & Emissions", prices: ["", "", QUOTE] },
];

function QuoteButton({ message }: { message: string }) {
  return (
    <a
      href={waUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1ebe5d]"
    >
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      Request a quote
    </a>
  );
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
                      {r.prices[0] === QUOTE ? <QuoteButton message={`Hi, I'd like a quote for ${r.service} please.`} /> : r.prices[0]}
                    </td>
                  ) : (
                    r.prices.map((p, j) => (
                      <td key={j} className="border-t border-[#eef4ff] px-5 py-4 text-center text-sm text-slate-700">
                        {p === QUOTE ? <QuoteButton message={`Hi, I'd like a quote for ${r.service} please.`} /> : p}
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
          <PriceTable title="Car Servicing" cols={CAR_SERVICING_COLS} rows={CAR_SERVICING} serviceColWidth={24} />
          <PriceTable title="Additional Services" cols={ENGINE_COLS} rows={ADDITIONAL_SERVICES} />
          <PriceTable title="Repairs" cols={REPAIRS_COLS} rows={REPAIRS} />

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
