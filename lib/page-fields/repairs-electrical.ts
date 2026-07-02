// Electrical repair page — full editable field set.
// Defaults mirror the previous hardcoded copy in components/repairs-electrical-page-client.tsx.

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Battery testing, charging & replacement
Alternator & starter motor replacement
Headlight, tail light & bulb replacement
HID & LED light unit repair
Central locking & electric window repair
Dashboard warning light diagnosis
Fuse & relay diagnosis & replacement
Sensor replacement (MAF, crank, cam, etc.)`;

export const REPAIRS_ELECTRICAL_FIELDS: FieldDef[] = [
  // Hero
  T("hero_kicker", "Hero — kicker", "Auto Electrics", "Hero"),
  T("hero_title", "Hero — heading", "Electrical Repairs", "Hero"),
  A("hero_subtitle", "Hero — subtitle", "Warning lights, failed electrics, battery drain, or blown bulbs — diagnosed with professional equipment and repaired correctly.", "Hero"),
  T("hero_badge", "Hero — fixed-quote badge", "After diagnostic, we'll quote you a fixed repair cost before any work starts.", "Hero"),
  T("hero_btn_book", "Hero — book button", "Book Diagnostic", "Hero"),
  T("hero_btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
  // Stats
  T("stat_1_value", "Stat 1 — value", "Live fault scan", "Stats"),
  T("stat_1_label", "Stat 1 — label", "Exact fault code read-out shown to you", "Stats"),
  T("stat_2_value", "Stat 2 — value", "No guess repairs", "Stats"),
  T("stat_2_label", "Stat 2 — label", "Diagnosed before anything is replaced", "Stats"),
  T("stat_3_value", "Stat 3 — value", "Warning light off", "Stats"),
  T("stat_3_label", "Stat 3 — label", "Fault fixed & cleared same visit", "Stats"),
  T("stat_4_value", "Stat 4 — value", "Fixed price repair", "Stats"),
  T("stat_4_label", "Stat 4 — label", "Agreed before we start, no surprises", "Stats"),
  // What we repair
  T("includes_kicker", "Includes — kicker", "What we repair", "What we repair"),
  T("includes_title", "Includes — heading", "Electrical & lighting services", "What we repair"),
  A("includes_list", "Includes — list (one per line)", INCLUDES_DEFAULT, "What we repair"),
  // Warning signs
  T("signs_kicker", "Signs — kicker", "Warning signs", "Warning signs"),
  T("signs_title", "Signs — heading", "Signs your electrics need attention", "Warning signs"),
  T("sign_1_title", "Sign 1 — title", "Warning lights on dash", "Warning signs"),
  A("sign_1_body", "Sign 1 — text", "Multiple warning lights or one that won't clear after a reset usually means a real fault to diagnose.", "Warning signs"),
  T("sign_2_title", "Sign 2 — title", "Battery draining overnight", "Warning signs"),
  A("sign_2_body", "Sign 2 — text", "A parasitic drain — something is drawing power when the car is off. We trace and fix the culprit.", "Warning signs"),
  T("sign_3_title", "Sign 3 — title", "Flickering lights", "Warning signs"),
  A("sign_3_body", "Sign 3 — text", "Headlights or interior lights flickering often point to a failing alternator or loose connection.", "Warning signs"),
  T("sign_4_title", "Sign 4 — title", "Electrics not working", "Warning signs"),
  A("sign_4_body", "Sign 4 — text", "Windows, locks, or the radio cutting out — usually a fuse, relay, or wiring fault we can trace quickly.", "Warning signs"),
  // FAQs
  T("faqs_kicker", "FAQs — kicker", "Common questions", "FAQs"),
  T("faqs_title", "FAQs — heading", "Frequently asked questions", "FAQs"),
  T("faq_1_q", "FAQ 1 — question", "What does OBD diagnostic equipment find in electrical faults?", "FAQs"),
  A("faq_1_a", "FAQ 1 — answer", "It reads fault codes from the ECU, ABS, airbag, and body control modules, showing exactly which circuit, sensor, or component is reporting a problem — removing the guesswork from electrical diagnosis.", "FAQs"),
  T("faq_2_q", "FAQ 2 — question", "Why do I have multiple warning lights on at once?", "FAQs"),
  A("faq_2_a", "FAQ 2 — answer", "Multiple warning lights frequently appear when battery voltage drops or a central control module develops a fault — it doesn't always mean separate faults. A diagnostic scan quickly identifies the root cause.", "FAQs"),
  T("faq_3_q", "FAQ 3 — question", "Can you fix a car that won't start due to an electrical fault?", "FAQs"),
  A("faq_3_a", "FAQ 3 — answer", "Yes. We trace starting system faults including the starter motor, ignition circuit, immobiliser, battery, and wiring to identify and fix the underlying cause.", "FAQs"),
  T("faq_4_q", "FAQ 4 — question", "How long does an electrical repair take?", "FAQs"),
  A("faq_4_a", "FAQ 4 — answer", "Simple repairs like bulb or fuse replacement are completed same day. More complex wiring or module faults vary — we'll give you a clear timeline and a quote before any work begins.", "FAQs"),
  // Bottom CTA
  T("bottom_kicker", "Bottom CTA — kicker", "Get it diagnosed", "Bottom CTA"),
  T("bottom_title", "Bottom CTA — heading", "Electrical problem? Let's find it.", "Bottom CTA"),
  A("bottom_subtitle", "Bottom CTA — subtitle (address prepended automatically)", "We diagnose first, quote before we fix.", "Bottom CTA"),
  T("bottom_btn_whatsapp", "Bottom CTA — WhatsApp button", "WhatsApp Us", "Bottom CTA"),
];
