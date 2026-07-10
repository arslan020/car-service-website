// Customer Protect Comprehensive (10 years / 100,000 miles) warranty page — full editable field set.
// Defaults are the EXACT copy from the official Customer Protect web content pack (AutoProtect).

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_LEFT_DEFAULT = `All mechanical and electrical components
Failure due to wear and tear on vehicles up to 10 years or 100,000 miles
Catalytic converters
Diesel particulate filter
Air-conditioning`;

const INCLUDES_RIGHT_DEFAULT = `Anti-lock brakes
Turbo
Multimedia systems
Extended service intervals: 12 months or 12,000 miles
£50 contribution to vehicle recovery`;

const NOT_INCLUDED_DEFAULT = `Vehicles used for hire or reward, non-standard modifications.
Repairs made before obtaining approval from us.
Damage caused by neglect, rust, corrosion.`;

export const CUSTOMER_PROTECT_COMPREHENSIVE_FIELDS: FieldDef[] = [
  // Header
  T("hero_title", "Header — big green heading", "Comprehensive", "Header"),
  T("hero_subtitle", "Header — line under heading", "Easing the impact of mechanical and electrical failures.", "Header"),
  // Intro
  T("intro_title", "Intro — bold heading", "Easing the impact of mechanical and electrical failures.", "Intro"),
  A("intro_body", "Intro — paragraph", "If you experience a sudden mechanical or electrical failure on your vehicle, its inconvenient and can end up being costly. We help ease the stress and reduce the impact on your finances. Enjoy the peace of mind of our Comprehensive warranty with wide ranging protection.", "Intro"),
  // What's included
  T("includes_title", "Included — heading", "What's included?", "What's included"),
  A("includes_list_left", "Included — left bullets (one per line)", INCLUDES_LEFT_DEFAULT, "What's included"),
  A("includes_list_right", "Included — right bullets (one per line)", INCLUDES_RIGHT_DEFAULT, "What's included"),
  T("btn_exclusions", "Buttons — excluded parts button", "View all excluded parts here", "Buttons"),
  T("btn_leaflet", "Buttons — leaflet button", "View our leaflet here", "Buttons"),
  // Not included
  T("notincluded_title", "Not included — heading", "Not included", "Not included"),
  A("notincluded_list", "Not included — bullets (one per line)", NOT_INCLUDED_DEFAULT, "Not included"),
  // Parts costs
  T("costs_title", "Costs — heading", "Parts and repairs can get expensive", "Parts costs"),
  T("part_1_name", "Part 1 — name", "Alternator", "Parts costs"),
  T("part_1_price", "Part 1 — price", "£872.69", "Parts costs"),
  T("part_2_name", "Part 2 — name", "Clutch", "Parts costs"),
  T("part_2_price", "Part 2 — price", "£1,258.48", "Parts costs"),
  T("part_3_name", "Part 3 — name", "Water pump", "Parts costs"),
  T("part_3_price", "Part 3 — price", "£489.53", "Parts costs"),
  T("part_4_name", "Part 4 — name", "Differential", "Parts costs"),
  T("part_4_price", "Part 4 — price", "£3,784.24", "Parts costs"),
  A("costs_note", "Costs — small print", "The parts and labour estimates given are for illustrative purposes only and are based on replacement parts for a BMW 320TD M Sport 2020 and all costs include VAT.", "Parts costs"),
  // How to make a claim
  T("claim_title", "Claim — heading", "How to make a claim", "How to make a claim"),
  A("claim_body", "Claim — text", "To make a claim on this warranty, give us a call and a member of our claims team will be ready to help you. It's important to call us before having any repair work done to avoid invalidating your claim.", "How to make a claim"),
  T("claim_phone", "Claim — phone number", "01279 456 500.", "How to make a claim"),
  // Disclaimer
  A("disclaimer_product", "Disclaimer — small print", "This information is for promotional purposes only. It is not advisory and does not demonstrate the full terms and conditions of the product.", "Disclaimer"),
  A("admin_note", "Disclaimer — administered by", "Administered by: AutoProtect Administration Limited,\nWarwick House, Roydon Road, Harlow Essex CM19 5DY", "Disclaimer"),
];
