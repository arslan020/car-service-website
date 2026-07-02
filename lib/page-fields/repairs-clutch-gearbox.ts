// Clutch & Gearbox repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-clutch-gearbox-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Clutch plate, pressure plate & release bearing
Dual-mass flywheel inspection & replacement
Gear linkage adjustment & replacement
Manual gearbox oil change
Automatic transmission fluid service
Gear selector & shift cable repair
Clutch hydraulic system (master & slave cylinder)`;

export const REPAIRS_CLUTCH_GEARBOX_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Drivetrain Repairs", "Hero"),
  T("hero_title", "Hero — heading", "Clutch & Gearbox", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Slipping clutch, stiff biting point, or grinding gears — we diagnose the root cause and give you a clear quote before any work starts.", "Hero"),
  T("hero_badge", "Hero — quote badge", "After diagnostic, we'll quote you a fixed repair cost before any work starts.", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Diagnostic", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "Biting point check", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Clutch wear assessed before quoting", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Manual & auto gearboxes", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Including DSG & CVT", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Flywheel inspection", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Checked every clutch job, no extras", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Gear change road test", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Verified through all gears before return", "Stats"),
  // What we repair
  T("includes_kicker", "Includes — kicker", "What we repair", "What we repair"),
  T("includes_title", "Includes — heading", "Clutch & gearbox services", "What we repair"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we repair"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your clutch or gearbox needs work", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Slipping clutch", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "Engine revs rise but the car doesn't accelerate — the clutch disc is worn and slipping under load.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "High biting point", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "If the clutch only bites near the top of the pedal travel, the friction material is running thin.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Grinding when changing gear", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Often a worn synchromesh or a clutch that isn't fully disengaging. Needs investigation before it worsens.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Judder on take-off", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "A shudder when pulling away smoothly usually points to a contaminated or worn clutch plate.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "How do I know if my clutch is worn?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "Symptoms include the clutch biting very high or very low in its travel, slipping under acceleration (revs rise without speed increasing), a burning smell, or difficulty selecting gears smoothly.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "How long does a clutch replacement take?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Most clutch replacements take 3–5 hours depending on the vehicle and drivetrain layout. We'll give you an accurate time estimate when you book.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "Is clutch wear covered by manufacturer warranty?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Clutches are classified as wear-and-tear items and are not covered under most manufacturer warranties. Our replacement parts come with their own warranty.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "Do you work on automatic gearboxes?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Yes. We service and repair both manual and automatic gearboxes, including diagnosing hesitation, slipping, delayed engagement, and gearbox warning lights.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Get it sorted", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Need a clutch or gearbox quote?", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "Tell us your registration and symptoms — we'll come back with a clear price.", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
