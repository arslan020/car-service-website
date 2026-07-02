// EV Battery Health page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/ev-battery-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const CHECKS_DEFAULT = `State of Health (SoH) percentage reading
Full cell voltage balance & deviation analysis
Battery Management System (BMS) fault code scan
Charge & discharge cycle history review
Thermal management system inspection
Onboard charger & charging port function test
12V auxiliary battery condition check
Written health report with pass / advisory / replace recommendation`;

export const EV_BATTERY_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Electric Vehicle", "Hero"),
  T("hero_title", "Hero — heading", "EV Battery Health Check", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Professional battery diagnostics for electric and hybrid vehicles. Get a full State-of-Health report, understand your true range, and catch cell degradation before it becomes a costly repair.", "Hero"),
  T("hero_walkin", "Hero — walk-in badge", "Walk-in service available — no need to book", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book EV Battery Check", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "from £79", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Battery Health Check", "Stats"),
  T("stat_2_value", "Stat 2 — value", "BEV & PHEV", "Stats"),
  T("stat_2_label", "Stat 2 — label", "All EV & Hybrid Types", "Stats"),
  T("stat_3_value", "Stat 3 — value", "~25 min", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Full Diagnostic", "Stats"),
  T("stat_4_value", "Stat 4 — value", "SoH Report", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Written Health Certificate", "Stats"),
  // What we test
  T("checks_kicker", "Checks — kicker", "What we test", "What we test"),
  T("checks_title", "Checks — heading", "Full EV Battery Diagnostic", "What we test"),
  A("checks_list", "Checks — list (one per line)", CHECKS_DEFAULT, "What we test"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "When to Book an EV Battery Check", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Range dropping below expected", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "Your EV is covering significantly fewer miles per charge than the manufacturer's stated range — a clear sign of battery degradation.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Charging won't reach 100%", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "The battery cuts off early or shows inconsistent charge levels, pointing to cell imbalance or a BMS fault.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Battery or BMS warning light", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Any battery-related warning on your dashboard needs immediate professional diagnosis to prevent further damage.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Longer charge times than usual", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Taking noticeably longer to charge to the same level suggests cell degradation or a fault in the charging system.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently Asked Questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "How do I know if my EV battery is degrading?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "EV batteries degrade slowly — typically 2–3% per year under normal UK driving conditions. Signs include reduced range, longer charge times, and the battery not reaching 100%. Our State-of-Health test gives you an accurate percentage reading so you know exactly where you stand.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Will a battery health check affect my manufacturer warranty?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "No. Our diagnostic is entirely non-invasive — we read data from the Battery Management System (BMS) without opening the battery pack. This does not void any manufacturer or battery warranty.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "How long does an EV battery health check take?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Most checks take around 30–45 minutes. We connect specialist diagnostic equipment to the BMS, run a full cell analysis, and produce a written health report before you leave.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "Do you check hybrid (HEV/PHEV) batteries too?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Yes — we test both full battery electric vehicles (BEVs) and hybrid battery packs. Just let us know your vehicle type when booking and we'll ensure the right equipment is ready.", "FAQs"),
  T("faq_5_q", "FAQ 5 — question", "Can you recondition or replace an EV battery?", "FAQs"),
  A("faq_5_a", "FAQ 5 — answer", "For batteries showing moderate degradation, cell rebalancing can restore some capacity. For severely degraded packs, we can advise on replacement options and source compatible units for most makes and models sold in the UK.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Don't guess your range", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Book Your EV Battery Check Today", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle", "235 Yeading Lane, Hayes, UB4 9AD — walk-ins welcome or book online for a guaranteed slot.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book EV battery check", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
