// Exhaust & Emissions repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-exhaust-emissions-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Exhaust pipe, centre section & back box replacement
Manifold gasket replacement
Catalytic converter replacement
DPF (diesel particulate filter) cleaning & replacement
Lambda / O2 sensor replacement
EGR valve cleaning & replacement
Emissions diagnostic scan & readiness check
MOT emissions retest after repair`;

export const REPAIRS_EXHAUST_EMISSIONS_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Exhaust & Emissions", "Hero"),
  T("hero_title", "Hero — heading", "Exhaust & Emissions", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Blowing exhaust, failed emissions on MOT, or a DPF warning light — we diagnose and repair with quality parts and clear pricing.", "Hero"),
  T("hero_badge", "Hero — fixed-quote badge", "After diagnostic, we'll quote you a fixed repair cost before any work starts.", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Diagnostic", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "DPF regeneration", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Forced regen before replacing filter", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Emissions pass guarantee", "Stats"),
  T("stat_2_label", "Stat 2 — label", "MOT retest included free", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Cat & lambda sensors", "Stats"),
  T("stat_3_label", "Stat 3 — label", "OEM sensors, not unbranded", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Custom exhaust welding", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Sections repaired, not always replaced", "Stats"),
  // What we repair
  T("includes_kicker", "Includes — kicker", "What we repair", "What we repair"),
  T("includes_title", "Includes — heading", "Full exhaust & emissions service", "What we repair"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we repair"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your exhaust needs attention", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Loud blowing noise", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "A sudden roar or hissing from under the car — usually a blown joint, cracked pipe or failed back box.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Failed MOT emissions", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "High CO, HC, or NOx readings often point to a faulty cat, lambda sensor, or DPF issue.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "DPF warning light", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Diesel vehicles: a solid or flashing DPF light means the filter is blocked and needs attention quickly.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Rattling underneath", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "A heat shield loose on the exhaust or a loose mounting bracket — annoying but easy to fix.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "Why is my car failing its MOT on emissions?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "High emissions typically point to a faulty catalytic converter, a failed lambda or O2 sensor, a blocked DPF, or a rich-running engine. We diagnose the root cause before quoting for any parts.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "What is a DPF and why does it get blocked?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "A diesel particulate filter (DPF) captures soot from the exhaust. Short, low-speed journeys prevent it from reaching the temperature needed to self-clean (regenerate), causing it to block over time.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "Can a DPF be cleaned instead of replaced?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "In many cases yes — a forced regeneration or a professional clean can restore a partially blocked DPF. We'll assess your vehicle and recommend the most cost-effective solution.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "Is a blowing exhaust an MOT failure?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Yes. An exhaust leaking through a crack, hole, or failed joint creates excessive noise and is an MOT failure. It's also a safety concern as carbon monoxide can enter the cabin.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Get it fixed", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Exhaust or emissions issue?", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address prepended automatically)", "Quote before we start — no surprises.", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
