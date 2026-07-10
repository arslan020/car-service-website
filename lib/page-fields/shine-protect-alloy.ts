// Shine! Protect Alloy page — full editable field set.
// Defaults are the EXACT copy from the official Shine! Protect Alloy web content pack (AutoProtect).

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const INCLUDES_DEFAULT = `Up to 5 maintenance requests per year of your plan.
Up to 4 areas of minor damage in every maintenance request.
Repairs to minor chips.
Repairs to minor scuffs or scratches.`;

export const SHINE_PROTECT_ALLOY_FIELDS: FieldDef[] = [
  // Intro
  T("hero_tagline", "Intro — teal tagline", "KEEP YOUR ALLOY WHEELS IN SHOWROOM CONDITION WITH THIS MAINTENANCE PLAN", "Intro"),
  A("hero_intro", "Intro — paragraphs", "Potholes, stone chips and kerbs that are higher than expected? We've all been there.\n\nWhat if there was an easy way to fix the problem? Welcome to Shine! Protect Alloy.", "Intro"),
  // What does it do
  T("what_title", "What does it do — heading", "What does Shine! Protect Alloy do?", "What does it do"),
  A("what_body", "What does it do — text", "This plan is designed to give you a convenient, cost-effective way to repair minor damage to your alloy wheels caused by the wear and tear of everyday motoring.\n\nOur mobile maintenance techniques restore areas as close to the original condition as possible, making sure you get a great result.", "What does it do"),
  // What does the plan include
  T("includes_title", "Plan includes — heading", "What does the plan include?", "Plan includes"),
  A("includes_list", "Plan includes — bullets (one per line)", INCLUDES_DEFAULT, "Plan includes"),
  // How to submit a request
  T("how_title", "Maintenance request — heading", "How can I submit a maintenance request?", "Maintenance request"),
  A("how_body", "Maintenance request — text", "Maintenance requests can be made using our dedicated Shine! Protect App.\n\nSimply upload pictures of the damage and tell us more about how it happened.\n\nOnce your request is approved, you'll be able to book an appointment for one of our friendly technicians to visit your choice of location to carry out the request.", "Maintenance request"),
  // Nationwide coverage
  T("coverage_title", "Nationwide coverage — heading", "Nationwide Coverage", "Nationwide coverage"),
  A("coverage_body", "Nationwide coverage — text", "Our fleet of friendly, mobile technicians are stationed across mainland UK so we're ready to come to you at home, work, or another more convenient location.", "Nationwide coverage"),
  // Find out more
  T("more_title", "Find out more — heading", "Where can I find out more?", "Find out more"),
  A("more_body", "Find out more — text (before link)", "Find out more about Shine! Protect Alloy", "Find out more"),
  T("more_link_label", "Find out more — link text", "here", "Find out more"),
  // Disclaimer
  A("disclaimer", "Disclaimer — above divider (service)", "This information is for promotional purposes only. It is not advisory and does not demonstrate the full terms and conditions of the service.", "Disclaimer"),
  A("disclaimer_product", "Disclaimer — beside badges (product)", "This information is for promotional purposes only. It is not advisory and does not demonstrate the full terms and conditions of the product.", "Disclaimer"),
  A("admin_note", "Disclaimer — administered by", "Administered by: AutoProtect Administration Limited, Warwick House, Roydon Road, Harlow Essex CM19 5DY", "Disclaimer"),
];
