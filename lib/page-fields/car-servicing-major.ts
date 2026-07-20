// Major Service page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/car-servicing-major-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Everything in the Full Service: Every check and replacement from our Full Service, included as standard.
Timing Belt Inspection: Checked against your manufacturer's replacement interval — avoids costly engine damage if due.
Comprehensive Multi-Point Check: A thorough inspection of the engine, drivetrain and underbody to catch issues early.
Full Road Test & Report: Test driven and a full written report provided before collection.`;

export const CAR_SERVICING_MAJOR_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Car Servicing", "Hero"),
  T("hero_title", "Page Title", "Major Service", "Hero"),
  A("hero_subtitle", "Subtitle", "The most comprehensive service — everything in a Full Service plus a timing belt inspection, a multi-point check, and a full road test.", "Hero"),
  T("price_display", "Hero — price", "From £269", "Hero"),
  T("price_note", "Hero — price note", "+ Add MOT for £35", "Hero"),
  T("interval_prefix", "Interval badge — prefix", "Every", "Hero"),
  T("interval_time", "Interval badge — time (bold)", "2 years", "Hero"),
  T("interval_joiner", "Interval badge — joiner", "or", "Hero"),
  T("interval_miles", "Interval badge — miles (bold)", "24,000 miles", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Major Service", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "~2–3 hrs", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Typical duration", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Road test", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Included with report", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Warranty safe", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Block exemption compliant", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Service stamp", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Book & digital history", "Stats"),
  // What's included
  T("includes_kicker", "Included — kicker", "What's included", "What's included"),
  T("includes_title", "Included — heading", "Major Service checklist", "What's included"),
  A("includes_list", "Included — list (one per line, 'Title: description')", INCLUDES_DEFAULT, "What's included"),
  // Upsell box
  T("upsell_kicker", "Upsell — kicker", "Combine & save", "Upsell"),
  A("upsell_pre", "Upsell — text before bold", "Booking a Major Service alongside your annual", "Upsell"),
  T("upsell_bold", "Upsell — bold text", "MOT", "Upsell"),
  A("upsell_post", "Upsell — text after bold", "means one drop-off, one collection, and any MOT advisories can be quoted and fixed the same day.", "Upsell"),
  T("upsell_link", "Upsell — link label", "Learn about our MOT", "Upsell"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "FAQs", "FAQs"),
  T("faqs_title", "FAQs — heading", "Common questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — Question", "What is a Major Service?", "FAQs"),
  A("faq_1_a", "FAQ 1 — Answer", "A Major Service is the most comprehensive service we offer, following your car's manufacturer schedule. It includes everything in a Full Service plus a timing belt inspection, a comprehensive multi-point check, and a full road test with written report — typically due every 2 years or 24,000 miles.", "FAQs"),
  T("faq_2_q", "FAQ 2 — Question", "How is it different from a Full Service?", "FAQs"),
  A("faq_2_a", "FAQ 2 — Answer", "A Full Service covers the standard 12-month checks. A Major Service adds the longer-cycle items — a timing belt inspection, a deeper multi-point inspection of the engine, drivetrain and underbody, and a full road test with a written report.", "FAQs"),
  T("faq_3_q", "FAQ 3 — Question", "Does this protect my manufacturer warranty?", "FAQs"),
  A("faq_3_a", "FAQ 3 — Answer", "Yes. UK Block Exemption Regulation law means using a qualified independent garage with correct spec parts and oils keeps your warranty fully valid.", "FAQs"),
  T("faq_4_q", "FAQ 4 — Question", "How long does a Major Service take?", "FAQs"),
  A("faq_4_a", "FAQ 4 — Answer", "Typically 2–3 hours depending on the vehicle. We will always confirm timing when you book and text you when the car is ready.", "FAQs"),
  T("faq_5_q", "FAQ 5 — Question", "Can I combine it with an MOT?", "FAQs"),
  A("faq_5_a", "FAQ 5 — Answer", "Absolutely — many customers book both together. It saves a separate trip and we can usually fit both in one visit.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Book today", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Book your Major Service", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "Full manufacturer-schedule service. We text you when ready.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book Major Service", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
