// Air Con page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/air-con-page-client.tsx.
// Keys hero_title, hero_subtitle, hero_eyebrow, btn_book, btn_whatsapp,
// bottom_kicker, bottom_title, bottom_body, bottom_btn are pre-existing and may
// already have saved DB values — do not rename them.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Recover and recycle existing refrigerant
Vacuum test to check for leaks
Recharge with correct refrigerant to manufacturer spec
Cabin (pollen) filter inspection
Antibacterial treatment to remove bacteria & odours
System performance test — temperature output check`;

export const AIR_CON_FIELDS: FieldDef[] = [
  // Hero
  T("hero_eyebrow", "Hero — kicker", "Air Conditioning", "Hero"),
  T("hero_title", "Hero — heading", "Air Con Regas & Service", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Full air conditioning regas and system health check. Get your cabin cool and fresh again — recommended every 2 years.", "Hero"),
  T("hero_walkin", "Hero — walk-in badge", "Walk-in service available — no need to book", "Hero"),
  T("btn_book", "Hero — book button", "Book AC Service", "Hero"),
  T("btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "£79", "Stats"),
  T("stat_1_label", "Stat 1 — label", "R134a Regas", "Stats"),
  T("stat_2_value", "Stat 2 — value", "£149", "Stats"),
  T("stat_2_label", "Stat 2 — label", "R1234yf Regas", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Every 2 yrs", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Recommended Interval", "Stats"),
  T("stat_4_value", "Stat 4 — value", "~1 hr", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Typical Service Time", "Stats"),
  // What's included
  T("includes_kicker", "Includes — kicker", "What's included", "What's included"),
  T("includes_title", "Includes — heading", "Full AC Service", "What's included"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What's included"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Does Your AC Need Attention?", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Blowing warm air", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "If your AC no longer cools properly, it's usually low on refrigerant — a regas fixes this.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Unpleasant smells", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "Musty or stale air when you turn on the AC means bacteria has built up in the system.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Last serviced 2+ years ago", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "AC systems lose around 10–15% of refrigerant per year even without a fault.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Windows fogging slowly", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "A healthy AC system clears fog fast. Slow clearing means reduced performance.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently Asked Questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "How often should I have my air con regassed?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "Most manufacturers recommend an AC regas every 2 years. Even without a fault, air con systems lose around 10–15% of their refrigerant annually through natural permeation.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Why does my air con smell musty?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Bacteria and mould build up in the evaporator over time, producing unpleasant odours when the fan runs. Our service includes an antibacterial treatment that eliminates the source of the smell.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "What refrigerant does my car use?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Cars registered before 2017 typically use R134a. Newer models use the more eco-friendly R1234yf. We carry both and will always use the correct refrigerant for your vehicle.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "Will a regas fix my air con if it isn't cooling at all?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Low refrigerant is the most common cause of poor cooling, so a regas resolves it in most cases. If a leak or component fault is present, we'll diagnose and advise before any work begins.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Stay cool", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Book Your AC Regas Today", "Bottom CTA"),
  A("bottom_body", "Bottom CTA — subtitle", "235 Yeading Lane, Hayes, UB4 9AD.", "Bottom CTA"),
  T("bottom_btn", "Bottom CTA — book button", "Book AC service", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
