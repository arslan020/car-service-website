// Suspension & Steering repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-suspension-steering-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Shock absorber & strut replacement
Coil spring replacement
Wishbone & control arm replacement
Ball joint replacement
Track rod & track rod end replacement
Anti-roll bar link & bush replacement
Power steering pump & rack repair
Wheel alignment & tracking (post-repair)`;

export const REPAIRS_SUSPENSION_STEERING_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Chassis & Handling", "Hero"),
  T("hero_title", "Hero — heading", "Suspension & Steering", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Knocking, pulling, or vague steering — we inspect, diagnose, and repair. Wheel alignment included after every relevant repair.", "Hero"),
  T("hero_badge", "Hero — quote badge", "After diagnostic, we'll quote you a fixed repair cost before any work starts.", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Diagnostic", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "4-wheel alignment", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Laser alignment after every job", "Stats"),
  T("stat_2_value", "Stat 2 — value", "Shock absorber bounce test", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Shown to you before we quote", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Steering play check", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Rack & track rod ends inspected", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Straight-line pull test", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Road tested before handback", "Stats"),
  // What we repair
  T("includes_kicker", "Includes — kicker", "What we repair", "What we repair"),
  T("includes_title", "Includes — heading", "Suspension & steering services", "What we repair"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we repair"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your suspension needs attention", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Knocking over bumps", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "A clunking noise from the suspension usually means a worn ball joint, shock absorber, or bush.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Pulling to one side", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "The car drifting left or right on a straight road points to worn steering components or misalignment.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Bouncy or unstable ride", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "If the car continues bouncing after a bump, the shock absorbers have worn and need replacing.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Vague or heavy steering", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Excessive play in the steering wheel or heavy effort to turn indicates worn steering rack or pump.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "What are the signs of worn suspension?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "Your car continues bouncing after a bump, you hear clunking or knocking over uneven roads, the car pulls to one side, or you notice uneven tyre wear — all common signs that suspension components need inspection.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Is wheel alignment included with a suspension repair?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Yes. We carry out a wheel alignment check after any repair where tracking could be affected. Correct alignment ensures even tyre wear and prevents the car pulling to one side.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "Can worn suspension cause an MOT failure?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Yes. Excessive play in steering components, failed shock absorbers, and damaged springs are all MOT failure points. We can identify and repair these before your test.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "How long does a suspension repair take?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Individual component repairs such as a ball joint or shock absorber typically take 1–2 hours per corner. We always road-test the vehicle after any suspension work.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Get it fixed", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Suspension or steering concern?", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address appended automatically)", "We quote before we touch the car.", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
