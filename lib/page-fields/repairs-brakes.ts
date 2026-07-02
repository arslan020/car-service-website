// Brakes repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-brakes-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Brake pad replacement (front & rear)
Brake disc replacement & resurfacing
Calliper replacement & rebuild
Brake fluid flush & replacement
Handbrake cable adjustment & replacement
Brake lines & hydraulic hose replacement
ABS sensor diagnosis & replacement
Full brake performance test after every job`;

export const REPAIRS_BRAKES_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Safety First", "Hero"),
  T("hero_title", "Hero — heading", "Brakes", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Brakes are your car's most important safety system. We diagnose, quote clearly, and only replace what genuinely needs doing — no upselling.", "Hero"),
  T("hero_walkin", "Hero — walk-in badge", "Walk-in service available — no need to book", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Brake Repair", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "Only replace what's worn", "Stats"),
  T("stat_1_label", "Stat 1 — label", "We show you the evidence first", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Quality OE Standard", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Original equipment quality", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Brake test drive", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Road tested before you collect", "Stats"),
  T("stat_4_value", "Stat 4 — value", "ABS Safety Check", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Included with every brake job", "Stats"),
  // What we cover
  T("includes_kicker", "Includes — kicker", "What we cover", "What we cover"),
  T("includes_title", "Includes — heading", "Full brake repair service", "What we cover"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we cover"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your brakes need attention", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Squealing or grinding", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "High-pitched squealing means worn pads. Grinding means metal-on-metal — stop driving and call us.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Pulling to one side", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "Uneven braking, often a seized calliper or uneven pad wear. Affects steering and safety.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Soft or spongy pedal", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Air in the brake lines or a fluid leak. The pedal should feel firm every time.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Vibration when braking", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Warped or corroded discs cause a judder through the pedal or steering wheel under braking.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "How do I know when my brake pads need replacing?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "Common signs include a high-pitched squealing when braking, a longer stopping distance, a vibrating brake pedal, or the brake warning light illuminating on your dashboard.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Should I replace brake pads and discs at the same time?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Not necessarily — but if a disc is scored, corroded, or worn below its minimum thickness, fitting new pads to a worn disc reduces the lifespan of both. We inspect and advise when you bring the car in.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "How long do brake pads last in the UK?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Typically 25,000–60,000 miles, but this varies with driving style. Urban stop-start driving wears pads much faster than motorway use. Front pads usually wear before rear.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "Is it safe to drive with a brake warning light on?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "No — book in immediately. The light can indicate worn pads, low brake fluid, or a more serious hydraulic fault. Brakes are safety-critical and should never be ignored.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Don't delay", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Get your brakes checked today", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "We quote before we start — no obligation.", "Bottom CTA"),
  T("bottom_btn_book", "Bottom CTA — book button", "Book brake check", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp for a quote", "Bottom CTA"),
];
