// Oil / Interim Service page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/car-servicing-interim-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Premium Engine Oil Flush & Refill: Full oil flush and refill using high-quality fully synthetic oil, correctly graded for your engine — built for West London's stop-start traffic.
OEM-Quality Oil Filter Replacement: Old filter replaced with a genuine, OEM-quality filter to keep contaminants out of the engine.
Sump Plug Washer Replacement: Sump plug washer replaced every time to prevent oil leaks.
Essential Fluids Top-Up: Screenwash and coolant topped up — not just checked.
Reset Service Light & Digital History: Service reminder light reset on your dashboard and your digital service history updated.`;

export const CAR_SERVICING_INTERIM_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Car Servicing", "Hero"),
  T("hero_title", "Page Title", "Oil Service", "Hero"),
  A("hero_subtitle", "Subtitle", "Fresh engine oil and filter, plus a full multi-point safety check — keeps your engine protected and your warranty intact between full services. Ideal for high-mileage drivers.", "Hero"),
  T("price_display", "Hero — price", "From £139", "Hero"),
  T("price_note", "Hero — price note", "+ Add MOT for £35", "Hero"),
  T("interval_prefix", "Interval badge — prefix", "Every", "Hero"),
  T("interval_time", "Interval badge — time (bold)", "6 months", "Hero"),
  T("interval_joiner", "Interval badge — joiner", "or", "Hero"),
  T("interval_miles", "Interval badge — miles (bold)", "6,000 miles", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Oil Service", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "~1.5–2 hrs", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Typical duration", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Same day", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Drop-off & collect", "Stats"),
  T("stat_3_value", "Stat 3 — value", "All makes", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Petrol, diesel & hybrid", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Warranty safe", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Block exemption compliant", "Stats"),
  // What's included
  T("includes_kicker", "Included — kicker", "What's included", "What's included"),
  T("includes_title", "Included — heading", "Oil Service checklist", "What's included"),
  A("includes_list", "Included — list (one per line, 'Title: description')", INCLUDES_DEFAULT, "What's included"),
  // Upsell box
  T("upsell_kicker", "Upsell — kicker", "Need more?", "Upsell"),
  T("upsell_pre", "Upsell — text before bold", "Due a more thorough check? Our", "Upsell"),
  T("upsell_bold", "Upsell — bold text", "Full Service", "Upsell"),
  A("upsell_post", "Upsell — text after bold", "covers everything here plus air filter replacement, brake measurements, and a 60-point health check.", "Upsell"),
  T("upsell_link", "Upsell — link label", "View Full Service", "Upsell"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "FAQs", "FAQs"),
  T("faqs_title", "FAQs — heading", "Common questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — Question", "Who is an oil service for?", "FAQs"),
  A("faq_1_a", "FAQ 1 — Answer", "Drivers covering more than 12,000 miles a year benefit most — the extra oil change keeps the engine protected between annual full services.", "FAQs"),
  T("faq_2_q", "FAQ 2 — Question", "Does it protect my warranty?", "FAQs"),
  A("faq_2_a", "FAQ 2 — Answer", "Yes. UK law (Block Exemption Regulation) means manufacturer warranties remain valid when serviced at an independent garage using the correct oil grade and parts.", "FAQs"),
  T("faq_3_q", "FAQ 3 — Question", "How long does it take?", "FAQs"),
  A("faq_3_a", "FAQ 3 — Answer", "Usually 1.5–2 hours. Many customers drop off and collect the same morning.", "FAQs"),
  T("faq_4_q", "FAQ 4 — Question", "Will I get a service stamp?", "FAQs"),
  A("faq_4_a", "FAQ 4 — Answer", "Yes — we provide a stamped service record for your handbook and can update digital service records where supported.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Book today", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Ready to book your Oil Service?", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "Most customers are back on the road within 2 hours.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book Oil Service", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
