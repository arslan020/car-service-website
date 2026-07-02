// Full Service page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/car-servicing-full-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Everything in the Oil Service: Every check and replacement from our Oil Service, included as standard.
Engine Oil & Filter Replacement: Correct-grade oil and a fresh filter, fitted to manufacturer specification.
Air Filter Replacement: Fresh air filter fitted to protect engine performance and fuel economy.
Brake Pad & Disc Measurement: Front and rear pads and discs measured against minimum safe limits.
Suspension & Steering Check: Shock absorbers, bushes and steering components inspected for wear.
Exhaust System Inspection: Checked for leaks, corrosion and secure mounting.
60-Point Vehicle Health Check: A full inspection of safety and mechanical systems, with a written report.`;

export const CAR_SERVICING_FULL_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Car Servicing", "Hero"),
  T("hero_title", "Page Title", "Full Service", "Hero"),
  A("hero_subtitle", "Subtitle", "The UK standard annual service — comprehensive, warranty-safe, and stamped. Covers everything from oil and filters to a full 60-point vehicle health check.", "Hero"),
  T("price_display", "Hero — price", "from £239", "Hero"),
  T("price_note", "Hero — price note", "+ Add MOT for £35", "Hero"),
  T("badge_highlight", "Popular badge — highlight", "Most popular", "Hero"),
  T("badge_detail", "Popular badge — detail", "— every 12 months or 12,000 miles", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Full Service", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "~2–3 hrs", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Typical duration", "Stats"),
  T("stat_2_value", "Stat 2 — value", "60-point", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Vehicle health check", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Warranty safe", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Block exemption compliant", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Service stamp", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Book & digital history", "Stats"),
  // What's included
  T("includes_kicker", "Included — kicker", "What's included", "What's included"),
  T("includes_title", "Included — heading", "Full Service checklist", "What's included"),
  A("includes_list", "Included — list (one per line, 'Title: description')", INCLUDES_DEFAULT, "What's included"),
  // Upsell box
  T("upsell_kicker", "Upsell — kicker", "High mileage?", "Upsell"),
  A("upsell_pre", "Upsell — text before bold", "If you cover more than 12,000 miles a year, pair your annual Full Service with an", "Upsell"),
  T("upsell_bold", "Upsell — bold text", "Oil Service", "Upsell"),
  A("upsell_post", "Upsell — text after bold", "at the 6-month mark to keep oil fresh and catch issues early.", "Upsell"),
  T("upsell_link_1", "Upsell — link 1 label", "Oil Service", "Upsell"),
  T("upsell_link_2", "Upsell — link 2 label", "Major Service", "Upsell"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "FAQs", "FAQs"),
  T("faqs_title", "FAQs — heading", "Common questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — Question", "What is a Full Service?", "FAQs"),
  A("faq_1_a", "FAQ 1 — Answer", "A Full Service is the UK standard annual car service covering all the checks an Oil Service does, plus filter replacements, brake measurements, and a comprehensive 60-point health check of your vehicle.", "FAQs"),
  T("faq_2_q", "FAQ 2 — Question", "How often should I have a Full Service?", "FAQs"),
  A("faq_2_a", "FAQ 2 — Answer", "Every 12 months or 12,000 miles — whichever comes first. If you do high mileage, combine it with an Oil Service at 6 months.", "FAQs"),
  T("faq_3_q", "FAQ 3 — Question", "Will it keep my manufacturer warranty valid?", "FAQs"),
  A("faq_3_a", "FAQ 3 — Answer", "Yes. Under the UK Block Exemption Regulation, having your car serviced at an independent garage using the manufacturer-specified oil and parts does not void your warranty.", "FAQs"),
  T("faq_4_q", "FAQ 4 — Question", "Do I get a service stamp?", "FAQs"),
  A("faq_4_a", "FAQ 4 — Answer", "Yes — we stamp your service book and can update digital service histories (Volkswagen Group, Ford, BMW etc.) where the system allows.", "FAQs"),
  T("faq_5_q", "FAQ 5 — Question", "How long does a Full Service take?", "FAQs"),
  A("faq_5_a", "FAQ 5 — Answer", "Typically 2–3 hours. We text you when your car is ready for collection.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Book today", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Book your Full Service", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "Typical service time 2–3 hours. We text you when ready.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book Full Service", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
