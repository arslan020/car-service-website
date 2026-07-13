// Williams Ceramic Coat page — full editable field set.
// Defaults are the EXACT copy from the official Williams Ceramic Coat web content pack (AutoProtect).

import type { FieldDef } from "@/lib/pages-config";

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const EXTERIOR_LIST_DEFAULT = `Can be applied to new and used vehicles.
Maintains showroom condition.
Protects against dirt and grime, temperature extremes, plant and tree sap, UV light, car washing chemicals, bird lime and pollutants.
Independently tested at a 9H pencil hardness.
Saves you time, money and elbow-grease!`;

const INTERIOR_LIST_DEFAULT = `Environmentally-friendly.
Non-aerosol.
Hydrophobic.
And makes everyday spills, dirt and grime easier to remove.`;

export const CERAMIC_COAT_FIELDS: FieldDef[] = [
  // Header
  T("hero_title_1", "Heading — first word (navy)", "CERAMIC", "Header"),
  T("hero_title_2", "Heading — second word (blue)", "COAT", "Header"),
  A("hero_intro", "Header — bold intro paragraph", "Ceramic Coat is the latest in third-generation paint protection technology designed to protect paintwork, alloys, bumpers and glass* from traffic pollutants and everyday weathering. It even protects interior surfaces and fabrics, and is guaranteed for as long as you own the vehicle.", "Header"),
  // Exterior
  T("exterior_title", "Exterior — heading", "A GLEAMING EXTERIOR", "Exterior"),
  A("exterior_body", "Exterior — text before bullets", "Ceramic Coat bonds with the pores in your paintwork to form an extremely durable, crystal clear finish, which needs no maintenance except washing, and:", "Exterior"),
  A("exterior_list", "Exterior — bullets (one per line)", EXTERIOR_LIST_DEFAULT, "Exterior"),
  T("exterior_note", "Exterior — small note", "*Not suitable for front or rear windscreens.", "Exterior"),
  // Interior
  T("interior_title", "Interior — heading", "A SPOTLESS INTERIOR", "Interior"),
  A("interior_body", "Interior — text before bullets", "When combined with an innovative interior protection system, Ceramic Coat also provides outstanding protection for carpets, mats, fabrics and leather inside your vehicle. It is:", "Interior"),
  A("interior_list", "Interior — bullets (one per line)", INTERIOR_LIST_DEFAULT, "Interior"),
  // Manufacturer small print
  A("manufacturer_note", "Small print — manufacturer", "Manufactured by Ultimotive Ltd, a Williams Racing Official Licensee. Ultimotive Ltd, 4 Altbarn Close, Severalls Business Park, Colchester, Essex, CO4 9HY, UK. Tel: +44 (0)1206 855232.\nThe Williams name, logo and car design are trademarks and/or intellectual property rights owned or used under licence by Williams Grand Prix Engineering Limited (WGPE). All rights reserved © WGPE 2022.", "Small print"),
  T("distributor_label", "Badges — distributor caption", "UK SOLE DISTRIBUTOR:", "Badges"),
  // Disclaimer
  A("disclaimer", "Disclaimer — small print", "This information is for promotional purposes only.\nIt is not advisory and does not demonstrate the full terms and conditions of the product.", "Disclaimer"),
  A("admin_note", "Disclaimer — administered by", "Administered by: AutoProtect Administration Limited, Warwick House, Roydon Road, Harlow Essex CM19 5DY", "Disclaimer"),
];
