// Tyres repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-tyres-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `New tyre supply & fitting (all sizes, makes & models)
Wheel balancing after every fitment
Puncture repair where safe and legal to repair
Valve replacement
Tyre pressure check & adjustment
Tread depth measurement & wear report
TPMS (tyre pressure sensor) reset where fitted
Old tyre removal & responsible disposal`;

export const REPAIRS_TYRES_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Safety First", "Hero"),
  T("hero_title", "Hero — heading", "Tyres", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "New tyre fitting, balancing and puncture repair for all makes — plus a free tread and pressure check every time you visit.", "Hero"),
  T("hero_walkin", "Hero — walk-in badge", "Walk-in service available — no need to book", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Tyre Fitting", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "Free Tyre Check", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Tread depth & pressure, every visit", "Stats"),
  T("stat_2_value", "Stat 2 — value", "All Major Brands", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Budget to premium options", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Balancing Included", "Stats"),
  T("stat_3_label", "Stat 3 — label", "With every new tyre fitted", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Same Day", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Most sizes fitted while you wait", "Stats"),
  // What we cover
  T("includes_kicker", "Includes — kicker", "What we cover", "What we cover"),
  T("includes_title", "Includes — heading", "Full tyre service", "What we cover"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we cover"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your tyres need attention", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Tread below 3mm", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "The legal minimum is 1.6mm, but braking distance increases sharply below 3mm — especially in the wet.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Cuts, bulges or cracks", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "Sidewall damage can cause a sudden blowout. Get it inspected before your next journey.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Vibration at speed", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Often a sign of imbalance or a damaged tyre — left unchecked it wears suspension components too.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Uneven wear across the tyre", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Can point to incorrect pressure, alignment issues, or worn suspension components.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "What's the legal tyre tread depth in the UK?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "1.6mm across the central three-quarters of the tread, around the full circumference. Driving below this risks a fine of up to £2,500 and 3 penalty points — per tyre.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Do I need to replace tyres in pairs?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Not always, but tyres on the same axle should be closely matched for tread and type. We'll advise whether a single replacement is safe or a pair makes more sense.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "Can a punctured tyre always be repaired?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Only if the damage is small and within the central tread area. Sidewall damage or large punctures mean replacement is needed for safety.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "How long does tyre fitting take?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Usually 20–30 minutes per tyre, including balancing. Most customers wait or drop off and collect.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Don't risk a fine", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Get your tyres checked today", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "Free tread and pressure check on every visit.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book tyre check", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp for a quote", "Bottom CTA"),
];
