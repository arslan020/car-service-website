// Engine & Cooling repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-engine-cooling-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Coolant system pressure test & leak trace
Thermostat replacement
Water pump replacement
Radiator replacement & flush
Head gasket diagnosis & repair
Timing belt & chain replacement
Engine oil leak repair
Cooling fan & sensor replacement`;

export const REPAIRS_ENGINE_COOLING_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Engine Repairs", "Hero"),
  T("hero_title", "Hero — heading", "Engine & Cooling", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Overheating, oil leaks, warning lights — we trace the root cause with diagnostics before quoting. No guesswork, no unnecessary parts.", "Hero"),
  T("hero_badge", "Hero — fixed-quote badge", "After diagnostic, we'll quote you a fixed repair cost before any work starts.", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Diagnostic", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "Cooling pressure test", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Leak pinpointed before parts ordered", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Head gasket check", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Combustion gas test included", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Thermostat & water pump", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Common culprits always checked", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Temp monitored test drive", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Live temp gauge checked on road", "Stats"),
  // What we repair
  T("includes_kicker", "Includes — kicker", "What we repair", "What we repair"),
  T("includes_title", "Includes — heading", "Engine & cooling services", "What we repair"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we repair"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your engine needs attention", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Temperature gauge rising", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "If your temperature gauge creeps toward red, pull over safely. Overheating causes serious engine damage quickly.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Oil or coolant leaks", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "Puddles under the car or a sweet smell while driving — coolant leaks need tracing before they get worse.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Engine warning light", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "A solid or flashing engine light can indicate anything from a loose sensor to a more serious fault.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "White exhaust smoke", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Thick white smoke from the exhaust often means coolant is burning — a potential head gasket issue.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "What causes a car to overheat?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "The most common causes are low coolant level, a faulty thermostat, a failing water pump, a blocked radiator, or a head gasket fault. Overheating is urgent — pull over safely and switch off the engine.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Can I drive with the temperature warning light on?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "No. Pull over safely as soon as possible and switch off the engine. Continuing to drive an overheating engine can cause catastrophic and very expensive damage within just a few minutes.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "How do I know if I have a head gasket problem?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Tell-tale signs include white smoke from the exhaust, a sweet smell under the bonnet, coolant loss with no visible leak, milky residue under the oil cap, or the engine overheating repeatedly.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "How often should engine coolant be changed?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Most manufacturers recommend a coolant flush every 2–5 years or 30,000–50,000 miles. Old coolant loses its anti-freeze protection and anti-corrosion additives, which can damage the cooling system over time.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Don't ignore it", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Engine or cooling concern?", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "Early diagnosis prevents costly damage.", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
