"use client";

import Link from "next/link";
import { site, waUrl } from "@/lib/site-config";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";

// Sentinel values in table cells — render an action button instead of a price
const QUOTE = "QUOTE";
const DIAGNOSTIC = "DIAGNOSTIC";

type PriceRow = { service: string; prices: string[] };

/** Parse a table field: one row per line, cells separated by "|". */
function parseRows(value: string | undefined): PriceRow[] {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim());
      return { service: parts[0] ?? "", prices: parts.slice(1) };
    });
}

function parseCols(value: string | undefined): string[] {
  return (value ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function PricesPageClient({ content, editable = false }: { content: ContentMap; editable?: boolean }) {
  const c = content;
  const E = (fieldKey: string, type: "text" | "textarea" = "text") => (
    <EditableText pageKey="prices" fieldKey={fieldKey} value={c[fieldKey] ?? ""} type={type} editable={editable} />
  );
  // A single cell of a multi-line table field: shows its own text, edits the full table string.
  const Cell = (fieldKey: string, display: string) => (
    <EditableText pageKey="prices" fieldKey={fieldKey} value={c[fieldKey] ?? ""} type="textarea" editable={editable} display={display} />
  );

  function QuoteButton({ message }: { message: string }) {
    return (
      <span className="inline-flex items-center justify-center gap-1.5">
        <span className="mr-1 text-xs font-semibold text-slate-500">{E("quote_label")}</span>
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
        {E("diagnostic_btn")}
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    );
  }

  function renderCell(value: string, service: string, rowsKey: string) {
    if (value === QUOTE) return <QuoteButton message={`Hi, I'd like a quote for ${service} please.`} />;
    if (value === DIAGNOSTIC) return <DiagnosticButton />;
    return Cell(rowsKey, value);
  }

  function PriceCards({
    titleKey,
    colLabels,
    rowsKey,
  }: {
    titleKey: string;
    colLabels: string[];
    rowsKey: string;
  }) {
    const rows = parseRows(c[rowsKey]);
    const priceLabels = colLabels.filter(Boolean);

    return (
      <div className="space-y-3 md:hidden">
        <div className="rounded-2xl bg-[#020F3D] px-5 py-4 text-sm font-bold text-white">
          {E(titleKey)}
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-[#e8effa] bg-white px-5 py-6 text-center text-sm text-slate-400 shadow-sm">
            Pricing coming soon — call or WhatsApp us for a quote.
          </div>
        ) : (
          rows.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#e8effa] bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-[#020F3D]">
                {Cell(rowsKey, r.service)}
              </p>

              <div className="mt-3 space-y-2">
                {r.prices.length < colLabels.length ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {priceLabels[0] ?? "Price"}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {renderCell(r.prices[0] ?? "", r.service, rowsKey)}
                    </span>
                  </div>
                ) : (
                  r.prices.map((p, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between gap-3 rounded-xl bg-[#f8fbff] px-4 py-3"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {colLabels[j] || `Option ${j + 1}`}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {renderCell(p, r.service, rowsKey)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  function PriceTable({
    titleKey,
    cols,
    colLabels,
    rowsKey,
    serviceColWidth = 40,
  }: {
    titleKey: string;
    cols: React.ReactNode[];
    colLabels: string[];
    rowsKey: string;
    serviceColWidth?: number;
  }) {
    const rows = parseRows(c[rowsKey]);
    const span = cols.length + 1;
    const priceColWidth = (100 - serviceColWidth) / cols.length;
    return (
      <>
        <PriceCards titleKey={titleKey} colLabels={colLabels} rowsKey={rowsKey} />

        <div className="hidden overflow-hidden rounded-2xl border border-[#e8effa] bg-white shadow-sm md:block">
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
                <th className="px-5 py-4 text-sm font-bold">{E(titleKey)}</th>
                {cols.map((col, i) => (
                  <th key={i} className="px-5 py-4 text-center text-sm font-bold">
                    {col}
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
                  <tr key={i} className={i % 2 ? "bg-[#f8fbff]" : "bg-white"}>
                    <td className="border-t border-[#eef4ff] px-5 py-4 text-sm font-semibold text-[#020F3D]">
                      {Cell(rowsKey, r.service)}
                    </td>
                    {r.prices.length < cols.length ? (
                      // Row with fewer price cells than columns spans the full width
                      <td colSpan={cols.length} className="border-t border-[#eef4ff] px-5 py-4 text-center text-sm text-slate-700">
                        {renderCell(r.prices[0] ?? "", r.service, rowsKey)}
                      </td>
                    ) : (
                      r.prices.map((p, j) => (
                        <td key={j} className="border-t border-[#eef4ff] px-5 py-4 text-center text-sm text-slate-700">
                          {renderCell(p, r.service, rowsKey)}
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
      </>
    );
  }

  // Column headings: single "|"-separated text field per table; each heading edits the full string.
  const HeadCell = (fieldKey: string, display: string) => (
    <EditableText pageKey="prices" fieldKey={fieldKey} value={c[fieldKey] ?? ""} type="text" editable={editable} display={display} />
  );
  const servicingColLabels = parseCols(c.servicing_cols);
  const additionalColLabels = parseCols(c.additional_cols);
  const servicingCols = servicingColLabels.map((col, i) => <span key={i}>{HeadCell("servicing_cols", col)}</span>);
  const additionalCols = additionalColLabels.map((col, i) => <span key={i}>{HeadCell("additional_cols", col)}</span>);
  // Repairs table: empty first column keeps the grid aligned; only the "Price" heading is editable.
  const repairsColLabels = ["", "Price"];
  const repairsCols: React.ReactNode[] = ["", E("repairs_col_price")];

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] via-60% to-white px-4 pb-10 pt-16 sm:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">{E("hero_kicker")}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#020F3D] sm:text-5xl">
            {E("hero_title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            {E("hero_subtitle", "textarea")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e0ebff] bg-white px-5 py-2.5 shadow-sm">
            <span className="text-sm font-semibold text-[#020F3D]">{E("mot_badge_label")}</span>
            <span className="text-sm font-extrabold text-[#0F63FF]">{E("mot_badge_price")}</span>
          </div>
        </div>
      </section>

      {/* ── Tables ── */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-5xl space-y-8">
          <PriceTable titleKey="servicing_title" cols={servicingCols} colLabels={servicingColLabels} rowsKey="servicing_table" serviceColWidth={24} />
          <PriceTable titleKey="additional_title" cols={additionalCols} colLabels={additionalColLabels} rowsKey="additional_table" />
          <PriceTable titleKey="repairs_title" cols={repairsCols} colLabels={repairsColLabels} rowsKey="repairs_table" serviceColWidth={30} />

          <p className="text-center text-xs text-slate-400">
            {E("tables_note", "textarea")}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-[#020F3D] px-6 py-10 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{E("cta_title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
            {E("cta_subtitle", "textarea")}
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
              {E("cta_btn_whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
