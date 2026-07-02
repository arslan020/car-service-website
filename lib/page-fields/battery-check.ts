// Battery Check page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/battery-check-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const CHECKS_DEFAULT = `Battery voltage & state-of-charge test
Cold cranking amps (CCA) capacity test
Alternator output & charging circuit test
Starter motor draw test
Visual inspection for corrosion & damage
Written report with pass / advisory / replace recommendation`;

export const BATTERY_CHECK_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Electrical Health", "Hero"),
  T("hero_title", "Hero — heading", "Battery Check", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "A full battery and charging system test using professional diagnostic equipment. Know your battery's health before it leaves you stranded.", "Hero"),
  T("hero_walkin", "Hero — walk-in badge", "Walk-in service available — no need to book", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Battery Check", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "Free", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Battery Health Test", "Stats"),
  T("stat_2_value", "Stat 2 — value", "~15 min", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Quick Turnaround", "Stats"),
  T("stat_3_value", "Stat 3 — value", "All makes", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Cars & Light Vans", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Same Day", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Replacement if Needed", "Stats"),
  // What we test
  T("checks_kicker", "Checks — kicker", "What we test", "What we test"),
  T("checks_title", "Checks — heading", "Full Charging System Check", "What we test"),
  A("checks_list", "Checks — list (one per line)", CHECKS_DEFAULT, "What we test"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "When to Get a Battery Check", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Slow or sluggish starts", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "Engine cranks slowly or hesitates before firing — classic sign of a weakening battery.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Battery warning light", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "The battery or charge light on your dashboard means the system needs attention now.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Electrical gremlins", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Flickering lights, random warning lights, or electronics behaving oddly under load.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Battery over 3 years old", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Most batteries last 3–5 years. A free health check prevents an unexpected breakdown.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently Asked Questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "How long does a car battery typically last in the UK?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "Most batteries last 3–5 years. Cold winters, short urban journeys, and leaving the car unused all accelerate wear. If your battery is approaching 3 years old, a free health check is a sensible precaution.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Is the battery check really free?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Yes — our battery health test covering voltage, cold cranking amps, and state-of-charge is completely free with no obligation. If a replacement is needed, we'll quote before touching anything.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "Why does my battery drain overnight?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "A parasitic drain — a component drawing current when the car is switched off — is the most common cause. We can trace the source using specialist equipment and repair it.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "Does the check cover my alternator too?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Yes. Our full charging system test includes the alternator output and starter motor draw alongside the battery, giving you a complete picture of your car's electrical health.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Don't get stranded", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Get Your Battery Tested Today", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle", "235 Yeading Lane, Hayes, UB4 9AD — walk-ins welcome.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book battery check", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
