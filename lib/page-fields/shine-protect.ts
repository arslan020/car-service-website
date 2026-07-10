// Shine! Protect page — full editable field set.
// Defaults are the EXACT copy from the official Shine! Protect web content pack (AutoProtect).

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INTRO_DEFAULT = `Maintaining the cosmetic appearance of your vehicle is now so simple.

Most of us have experienced minor damage to our cars at some point in time. Everyday wear and tear like chips, dents and scuffs are hard to avoid, no matter how careful a driver you are.

The solution is a Shine! Protect cosmetic maintenance plan.`;

export const SHINE_PROTECT_FIELDS: FieldDef[] = [
  // Intro
  T("hero_tagline", "Intro — teal tagline", "MAINTAIN THE COSMETIC APPEARANCE OF YOUR VEHICLE", "Intro"),
  A("hero_intro", "Intro — paragraphs", INTRO_DEFAULT, "Intro"),
  // What is Shine! Protect
  T("what_title", "What is it — heading", "What is Shine! Protect?", "What is Shine! Protect"),
  A("what_body", "What is it — text", "As the name suggests, Shine! Protect is a service designed to help you keep your car in great condition, without compromising your insurance no claims bonus. So, your vehicle's bodywork will remain in great condition and its value will be maintained.\n\nShine! Protect is not insurance as there is no contract of insurance offered.", "What is Shine! Protect"),
  // How it works
  T("how_title", "How it works — heading", "How Shine! Protect works", "How it works"),
  A("how_body", "How it works — text", "Upon damaging your car request your repair using the simple-to-use Shine! Protect smartphone app. Once we've confirmed that the damage is minor, as described in your agreement, a Shine! expert repair technician will come to you at home or work at a time that suits.", "How it works"),
  // Trusted experts
  T("experts_title", "Trusted experts — heading", "Trusted Experts", "Trusted experts"),
  A("experts_body", "Trusted experts — text", "Shine! offer a state-of-the-art, award-winning cosmetic repair service. Chips, dents, scuffs, or light scratches can be erased on the spot*.", "Trusted experts"),
  // Peace of mind
  T("peace_title", "Peace of mind — heading", "Real peace of mind", "Peace of mind"),
  A("peace_body", "Peace of mind — text", "Shine! Protect is designed to help you keep your car in tip-top condition.\n\nYour sales consultant can tell you all you need to know about the service and the company that provides it - so please don't hesitate to ask!", "Peace of mind"),
  // What damage
  T("damage_title", "Damage covered — heading", "What damage can you repair?", "Damage covered"),
  A("damage_body", "Damage covered — text", "Shine! Protect includes repairs to areas of minor damage including dents, scratches and scuffs up to 30cm and no deeper than 3mm. Chips up to 5mm in diameter.", "Damage covered"),
  // Find out more
  T("more_title", "Find out more — heading", "Where can I find out more?", "Find out more"),
  A("more_body", "Find out more — text (before link)", "Find out more about Shine! Protect", "Find out more"),
  T("more_link_label", "Find out more — link text", "here", "Find out more"),
  // Disclaimer
  A("disclaimer", "Disclaimer — above divider (service)", "This information is for promotional purposes only. It is not advisory and does not demonstrate the full terms and conditions of the service.", "Disclaimer"),
  A("disclaimer_product", "Disclaimer — beside badges (product)", "This information is for promotional purposes only. It is not advisory and does not demonstrate the full terms and conditions of the product.", "Disclaimer"),
  A("admin_note", "Disclaimer — administered by", "Administered by: AutoProtect Administration Limited, Warwick House, Roydon Road, Harlow Essex CM19 5DY", "Disclaimer"),
];
