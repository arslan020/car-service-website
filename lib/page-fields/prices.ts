// Prices page — full editable field set.
// Defaults mirror the previous hardcoded copy in app/prices/page.tsx.
//
// Table fields: one row per line, cells separated by "|".
// First cell = service name, remaining cells = one per price column.
// A row with fewer price cells than columns spans the full table width.
// Special cell values: QUOTE renders the call/WhatsApp quote buttons,
// DIAGNOSTIC renders the "Book Diagnostic First" button.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const SERVICING_TABLE_DEFAULT = `Oil Service|£139|£179|£219|QUOTE
Full Service|£239|£319|£369|QUOTE
Major Service|£269|£349|£399|QUOTE
Brake Fluid Service|£99|£99|£99|£99`;

const ADDITIONAL_TABLE_DEFAULT = `Diagnostics|£54|£54|£54
Brakes|Free check / walk-in|Free check / walk-in|Free check / walk-in
Tyres|Free check / walk-in|Free check / walk-in|Free check / walk-in
Battery Check|Free check / walk-in|Free check / walk-in|Free check / walk-in
Air Con Re-gas (R134a)|£79|£79|£79
Air Con Re-gas (R1234yf)|£149|£149|£149
EV Battery Health|£79
Gearbox Service|QUOTE`;

const REPAIRS_TABLE_DEFAULT = `Engine & Cooling|Exact price confirmed after diagnostic|DIAGNOSTIC
Suspension & Steering|Exact price confirmed after diagnostic|DIAGNOSTIC
Clutch & Gearbox|Exact price confirmed after diagnostic|DIAGNOSTIC
Electrical|Exact price confirmed after diagnostic|DIAGNOSTIC
Exhaust & Emissions|Exact price confirmed after diagnostic|DIAGNOSTIC`;

export const PRICES_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Our Prices", "Hero"),
  T("hero_title", "Hero — heading", "Clear, upfront pricing", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Prices by engine size — all inclusive of VAT, no hidden extras. Not sure which band your car falls into? Just call or WhatsApp and we'll confirm.", "Hero"),
  T("mot_badge_label", "Hero — MOT badge label", "MOT", "Hero"),
  T("mot_badge_price", "Hero — MOT badge price", "£49 for all vehicles", "Hero"),
  // Servicing table
  T("servicing_title", "Servicing — table title", "Servicing", "Servicing prices"),
  T("servicing_cols", "Servicing — column headings (separated by |)", "0cc–1400cc|1401cc–2000cc|2001cc–3000cc|Over 3000cc", "Servicing prices"),
  A("servicing_table", "Servicing — rows (one per line: Service|price|price|price|price)", SERVICING_TABLE_DEFAULT, "Servicing prices"),
  // Additional services table
  T("additional_title", "Additional — table title", "Additional Services", "Additional services prices"),
  T("additional_cols", "Additional — column headings (separated by |)", "0cc–1400cc|1401cc–2000cc|2001cc–3000cc", "Additional services prices"),
  A("additional_table", "Additional — rows (one per line: Service|price|price|price)", ADDITIONAL_TABLE_DEFAULT, "Additional services prices"),
  // Repairs table
  T("repairs_title", "Repairs — table title", "Repairs", "Repairs prices"),
  T("repairs_col_price", "Repairs — price column heading", "Price", "Repairs prices"),
  A("repairs_table", "Repairs — rows (one per line: Service|note|DIAGNOSTIC)", REPAIRS_TABLE_DEFAULT, "Repairs prices"),
  // Shared table buttons & note
  T("quote_label", "Tables — quote button label", "Get a Quote", "Table buttons & note"),
  T("diagnostic_btn", "Tables — diagnostic button label", "Book Diagnostic First", "Table buttons & note"),
  A("tables_note", "Tables — footnote", "All prices include VAT. Final price confirmed once we've identified your exact vehicle.", "Table buttons & note"),
  // Bottom CTA
  T("cta_title", "Bottom CTA — heading", "Not sure what you need?", "Bottom CTA"),
  A("cta_subtitle", "Bottom CTA — subtitle", "Send us your reg and we'll give you an exact price. 235 Yeading Lane, Hayes, UB4 9AD — walk-ins welcome.", "Bottom CTA"),
  T("cta_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp us", "Bottom CTA"),
];
