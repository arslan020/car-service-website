// Page content field definitions — used by both dashboard editor and public pages.
// Keep this file client-safe (no prisma/server imports).

import { EV_BATTERY_FIELDS } from "@/lib/page-fields/ev-battery";
import { PRICES_FIELDS } from "@/lib/page-fields/prices";
import { BATTERY_CHECK_FIELDS } from "@/lib/page-fields/battery-check";
import { AIR_CON_FIELDS } from "@/lib/page-fields/air-con";
import { REPAIRS_BRAKES_FIELDS } from "@/lib/page-fields/repairs-brakes";
import { REPAIRS_TYRES_FIELDS } from "@/lib/page-fields/repairs-tyres";
import { REPAIRS_CLUTCH_GEARBOX_FIELDS } from "@/lib/page-fields/repairs-clutch-gearbox";
import { REPAIRS_SUSPENSION_STEERING_FIELDS } from "@/lib/page-fields/repairs-suspension-steering";
import { REPAIRS_EXHAUST_EMISSIONS_FIELDS } from "@/lib/page-fields/repairs-exhaust-emissions";
import { REPAIRS_ENGINE_COOLING_FIELDS } from "@/lib/page-fields/repairs-engine-cooling";
import { REPAIRS_ELECTRICAL_FIELDS } from "@/lib/page-fields/repairs-electrical";
import { CAR_SERVICING_INTERIM_FIELDS } from "@/lib/page-fields/car-servicing-interim";
import { CAR_SERVICING_FULL_FIELDS } from "@/lib/page-fields/car-servicing-full";
import { CAR_SERVICING_MAJOR_FIELDS } from "@/lib/page-fields/car-servicing-major";
import { SHINE_PROTECT_FIELDS } from "@/lib/page-fields/shine-protect";
import { SHINE_PROTECT_ALLOY_FIELDS } from "@/lib/page-fields/shine-protect-alloy";
import { CUSTOMER_PROTECT_COMPREHENSIVE_FIELDS } from "@/lib/page-fields/customer-protect-comprehensive";
import { CERAMIC_COAT_FIELDS } from "@/lib/page-fields/ceramic-coat";

export type FieldType = "text" | "textarea";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  default: string;
  section: string;
}

export interface PageDef {
  slug: string;
  label: string;
  icon: string; // emoji for sidebar
  publicPath?: string; // public URL if different from /slug
  fields: FieldDef[];
}

function T(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "text", default: default_, section };
}

function A(key: string, label: string, default_: string, section: string): FieldDef {
  return { key, label, type: "textarea", default: default_, section };
}

const BOOKING_TABS_DEFAULT = `mot|MOT Test
full|Full Service
interim|Oil Service
major|Major Service
brakes|Brakes
clutch|Clutch & Gearbox
suspension|Suspension & Steering
exhaust|Exhaust & Emissions
engine|Engine & Cooling
electrical|Electrical
diagnostics|Diagnostics
tyres|Tyres
ac|Air-Con
battery|Battery Check`;

const CONTACT_SERVICE_OPTIONS_DEFAULT = `MOT Test
Full Service
Oil Service
Major Service
Diagnostics
Brakes & Tyres
Air Conditioning
Battery Check
Clutch & Gearbox
Suspension & Steering
Exhaust & Emissions
Engine & Cooling
Electrical
Other`;

const HOME_FIELDS: FieldDef[] = [
  T("hero_title_line1", "Hero — first line (navy)", "Car maintenance,", "Hero"),
  T("hero_title_accent", "Hero — accent line (blue)", "made easy", "Hero"),
  A("hero_typewriter", "Hero — typing subtitle (one phrase)", "Drop off, we fix, drive away happy", "Hero"),
  T("booking_widget_label", "Booking — label above service tabs", "Select a service to book", "Booking widget"),
  A("booking_service_labels", "Booking — tabs (one per line: id|Label)", BOOKING_TABS_DEFAULT, "Booking widget"),
  T("booking_placeholder", "Booking — reg input placeholder", "YOUR REG", "Booking widget"),
  T("booking_cta", "Booking — primary button", "Start booking", "Booking widget"),
  T("booking_reg_error_empty", "Booking — error: empty reg", "Please enter your registration number.", "Booking widget"),
  T("booking_reg_error_invalid", "Booking — error: invalid UK reg", "Please enter a valid UK reg (e.g. AB12 CDE).", "Booking widget"),
  T("booking_manual_link", "Booking — manual entry link text", "Enter car details manually instead", "Booking widget"),
  T("why_kicker", "Why us — kicker", "Why drivers choose us", "Why choose us"),
  T("why_title", "Why us — heading", "Why Choose Us", "Why choose us"),
  A("why_intro", "Why us — intro paragraph", "Reliable service, practical advice, and a garage team that keeps things simple from booking to collection.", "Why choose us"),
  T("why_1_title", "Why card 1 — title", "DVSA-approved garage", "Why choose us"),
  A("why_1_body", "Why card 1 — text", "Trusted MOT testing, servicing, diagnostics, and repairs from an experienced local team.", "Why choose us"),
  T("why_2_title", "Why card 2 — title", "Same-day help available", "Why choose us"),
  A("why_2_body", "Why card 2 — text", "Need something sorted quickly? We aim to offer fast turnaround and practical booking slots.", "Why choose us"),
  T("why_3_title", "Why card 3 — title", "Clear, honest pricing", "Why choose us"),
  A("why_3_body", "Why card 3 — text", "Straightforward advice, fair quotes, and no extra work carried out without your approval.", "Why choose us"),
  T("why_4_title", "Why card 4 — title", "Local and easy to reach", "Why choose us"),
  A("why_4_body", "Why card 4 — text", "Conveniently based in Hayes with online booking, phone support, and quick WhatsApp contact.", "Why choose us"),
  T("svc_block_kicker", "Our services — kicker", "What we offer", "Our services"),
  T("svc_block_title", "Our services — heading", "Our Services", "Our services"),
  T("svc_block_from_label", "Our services — price prefix", "From", "Our services"),
  T("svc_block_view_all", "Our services — view all button", "View all services", "Our services"),
  T("svc_1_title", "Featured 1 — title", "MOT Testing", "Our services"),
  A("svc_1_desc", "Featured 1 — description", "DVSA approved, same-day slots available", "Our services"),
  T("svc_1_price", "Featured 1 — price display", "£49", "Our services"),
  T("svc_2_title", "Featured 2 — title", "Diagnostics", "Our services"),
  A("svc_2_desc", "Featured 2 — description", "Engine warning lights & fault code diagnosis", "Our services"),
  T("svc_2_price", "Featured 2 — price (or £???)", "£54", "Our services"),
  T("svc_3_title", "Featured 3 — title", "Tyres", "Our services"),
  A("svc_3_desc", "Featured 3 — description", "Fitting, balancing & puncture repair for all makes", "Our services"),
  T("svc_3_price", "Featured 3 — price", "Free check", "Our services"),
  T("svc_4_title", "Featured 4 — title", "Brakes", "Our services"),
  A("svc_4_desc", "Featured 4 — description", "Pads, discs, callipers & handbrake cables checked", "Our services"),
  T("svc_4_price", "Featured 4 — price", "Free check", "Our services"),
  T("brands_title", "Brands row — heading", "Brands We Service", "Brands"),
  T("hiw_kicker", "How it works — kicker", "Simple process", "How it works"),
  T("hiw_title", "How it works — heading", "How It Works", "How it works"),
  T("hiw_1_title", "Step 1 — title", "Choose Your Service", "How it works"),
  A("hiw_1_body", "Step 1 — text", "Select your service and a preferred time slot in just a few minutes.", "How it works"),
  T("hiw_2_title", "Step 2 — title", "We Confirm by Text or Call", "How it works"),
  A("hiw_2_body", "Step 2 — text", "No chasing, no waiting on hold. You'll receive an instant text and email confirmation straight to your details the moment your booking is placed.", "How it works"),
  T("hiw_3_title", "Step 3 — title", "Drop Off & Relax", "How it works"),
  A("hiw_3_body", "Step 3 — text", "Arrive at your time, hand over the keys, and leave the rest to us.", "How it works"),
  T("hiw_4_title", "Step 4 — title", "Drive Away Happy", "How it works"),
  A("hiw_4_body", "Step 4 — text", "Full paperwork provided. We text you when ready, you pay on collection.", "How it works"),
  T("find_title", "Find us — heading", "Find Us", "Find us"),
  A("find_address_line", "Find us — address line under heading", "We're located at 235 Yeading Lane, Hayes, UB4 9AD", "Find us"),
  T("hours_kicker", "Opening times — kicker", "Opening Times", "Opening times"),
  A("hours_grid", "Opening times — lines (Day|hours, one per line)", "Monday|9:00 – 18:00\nTuesday|9:00 – 18:00\nWednesday|9:00 – 18:00\nThursday|9:00 – 18:00\nFriday|9:00 – 18:00\nSaturday|9:00 – 18:00\nSunday|Closed", "Opening times"),
];

export const PAGES_CONFIG: PageDef[] = [
  {
    slug: "home",
    label: "Homepage",
    icon: "🏠",
    publicPath: "/",
    fields: HOME_FIELDS,
  },
  {
    slug: "about-us",
    label: "About Us",
    icon: "🧑‍🔧",
    publicPath: "/about-us",
    fields: [
      T("hero_kicker", "Hero — kicker", "About Us", "Hero"),
      T("hero_title", "Hero — heading", "Your Local Garage in Hayes, West London", "Hero"),
      A("hero_subtitle", "Hero — intro paragraph", "Marieston Service Centre is a DVSA-approved independent garage on Yeading Lane, Hayes. We keep West London cars roadworthy — with honest advice, qualified mechanics, and prices that won't leave you guessing.", "Hero"),
      T("stat_1_value", "Stat 1 — value", "West London", "Stats"),
      T("stat_1_label", "Stat 1 — label", "Serving", "Stats"),
      T("stat_2_value", "Stat 2 — value", "DVSA", "Stats"),
      T("stat_2_label", "Stat 2 — label", "Approved MOT Station", "Stats"),
      T("stat_3_value", "Stat 3 — value", "All Makes", "Stats"),
      T("stat_3_label", "Stat 3 — label", "Cars & Light Vans", "Stats"),
      T("stat_4_value", "Stat 4 — value", "5★", "Stats"),
      T("stat_4_label", "Stat 4 — label", "Customer Rating", "Stats"),
      T("story_kicker", "Our story — kicker", "Our Story", "Our story"),
      T("story_title", "Our story — heading", "A Garage Built on Trust", "Our story"),
      A("story_p1", "Our story — paragraph 1", "Marieston Service Centre opened its doors on Yeading Lane with one simple goal: to give drivers in Hayes and West London a garage they could actually trust. No upselling, no mystery faults, no inflated bills — just straightforward, professional car care.", "Our story"),
      A("story_p2", "Our story — paragraph 2", "Over the years we've grown into a fully equipped, DVSA-approved workshop. We handle everything from routine oil changes and MOT tests to complex engine diagnostics and EV battery health checks. Whatever your car needs, our team has the tools and training to sort it.", "Our story"),
      A("story_p3", "Our story — paragraph 3", "Our customers keep coming back — and they send their family and friends too. That word-of-mouth reputation is something we work hard to earn every single day.", "Our story"),
      T("why_kicker", "Why us — kicker", "Why Choose Us", "Why us"),
      T("why_title", "Why us — heading", "What Sets Us Apart", "Why us"),
      T("value_1_title", "Value 1 — title", "Honest & Transparent", "Why us"),
      A("value_1_body", "Value 1 — text", "No hidden charges. We explain every job in plain English and give you a clear quote before any work starts.", "Why us"),
      T("value_2_title", "Value 2 — title", "Qualified Mechanics", "Why us"),
      A("value_2_body", "Value 2 — text", "Our technicians are fully trained and experienced across all makes and models, from city cars to light vans.", "Why us"),
      T("value_3_title", "Value 3 — title", "Fast Turnaround", "Why us"),
      A("value_3_body", "Value 3 — text", "Most services and MOTs are completed same day. We respect your time and always aim to get you back on the road quickly.", "Why us"),
      T("value_4_title", "Value 4 — title", "Competitive Pricing", "Why us"),
      A("value_4_body", "Value 4 — text", "Main-dealer quality at independent garage prices. You get the best of both worlds — expertise without the premium.", "Why us"),
      T("value_5_title", "Value 5 — title", "5-Star Rated", "Why us"),
      A("value_5_body", "Value 5 — text", "Hundreds of 5-star reviews from drivers across Hayes, Southall, Uxbridge and the wider West London area.", "Why us"),
      T("value_6_title", "Value 6 — title", "DVSA Approved", "Why us"),
      A("value_6_body", "Value 6 — text", "Officially approved MOT testing station. Every MOT is carried out to strict DVSA standards by authorised testers.", "Why us"),
      T("services_kicker", "Services block — kicker", "What We Do", "Services block"),
      T("services_title", "Services block — heading", "Our Services", "Services block"),
      A("services_intro", "Services block — intro", "From a quick MOT to a full major service, we cover everything your car needs under one roof.", "Services block"),
      T("cta_kicker", "Bottom CTA — kicker", "Ready to book?", "Bottom CTA"),
      T("cta_title", "Bottom CTA — heading", "Get Your Car Booked In Today", "Bottom CTA"),
      A("cta_body", "Bottom CTA — paragraph", "Book online in minutes or give us a call. We're open Mon–Sat, 9:00–18:00.", "Bottom CTA"),
    ],
  },
  {
    slug: "services",
    label: "Services",
    icon: "🔧",
    fields: [
      {
        key: "hero_title",
        label: "Page Title",
        type: "text",
        default: "Everything we do...",
        section: "Hero",
      },
      {
        key: "hero_subtitle",
        label: "Subtitle",
        type: "textarea",
        default:
          "From scheduled servicing and MOTs to diagnostics and repairs — all under one roof.",
        section: "Hero",
      },
      T("hero_kicker", "Hero — small kicker above title", "What we offer", "Hero"),
      T("cta_book", "Hero — primary button", "Book online", "Hero"),
      T("cta_pricing", "Hero — secondary button", "View pricing", "Hero"),
      T("card_price_label", "Service cards — price row label", "Price", "Service grid"),
      T("svc_mot_eyebrow", "Card MOT — eyebrow tag", "DVSA Approved", "Service grid"),
      T("svc_mot_title", "Card MOT — title", "MOT Testing", "Service grid"),
      A("svc_mot_desc", "Card MOT — description", "Annual MOT inspections to keep your car legal and safe. Same-day slots available. If it fails, we explain every advisory clearly and can quote for repair work on the spot.", "Service grid"),
      T("svc_mot_price", "Card MOT — price", "£49", "Service grid"),
      T("svc_cs_eyebrow", "Card Car Servicing — eyebrow", "Scheduled", "Service grid"),
      T("svc_cs_title", "Card Car Servicing — title", "Car Servicing", "Service grid"),
      A("svc_cs_desc", "Card Car Servicing — description", "Oil, full, and major servicing tailored to your make and model. Manufacturer-scheduled checks keep your warranty valid and your car running smoothly.", "Service grid"),
      T("svc_cs_price", "Card Car Servicing — price", "From £139", "Service grid"),
      T("svc_rep_eyebrow", "Card Repairs — eyebrow", "All Makes", "Service grid"),
      T("svc_rep_title", "Card Repairs — title", "Repairs", "Service grid"),
      A("svc_rep_desc", "Card Repairs — description", "Brakes, clutch, exhausts, suspension, steering and more. We diagnose first, give you a clear quote, and only proceed with your approval — no surprises.", "Service grid"),
      T("svc_rep_price", "Card Repairs — price", "Get a Quote", "Service grid"),
      T("svc_diag_eyebrow", "Card Diagnostics — eyebrow", "OBD & Live Data", "Service grid"),
      T("svc_diag_title", "Card Diagnostics — title", "Diagnostics", "Service grid"),
      A("svc_diag_desc", "Card Diagnostics — description", "Engine warning lights, fault codes, and intermittent issues. We use professional-grade diagnostic equipment to trace the root cause — not just clear the light.", "Service grid"),
      T("svc_diag_price", "Card Diagnostics — price", "£54", "Service grid"),
      T("svc_oil_eyebrow", "Card Oil — eyebrow", "Premium Oil", "Service grid"),
      T("svc_oil_title", "Card Oil — title", "Oil Service", "Service grid"),
      A("svc_oil_desc", "Card Oil — description", "Right-spec oil and filter for your engine. Fast turnaround — often while you wait. Helps fuel economy and protects against premature wear.", "Service grid"),
      T("svc_oil_price", "Card Oil — price", "£139", "Service grid"),
      T("svc_full_eyebrow", "Card Full Service — eyebrow", "Most Popular", "Service grid"),
      T("svc_full_title", "Card Full Service — title", "Full Service", "Service grid"),
      A("svc_full_desc", "Card Full Service — description", "The UK standard annual service — oil, filters and a full 60-point health check. Keeps your manufacturer warranty valid.", "Service grid"),
      T("svc_full_price", "Card Full Service — price", "£239", "Service grid"),
      T("svc_major_eyebrow", "Card Major Service — eyebrow", "Manufacturer Schedule", "Service grid"),
      T("svc_major_title", "Card Major Service — title", "Major Service", "Service grid"),
      A("svc_major_desc", "Card Major Service — description", "Everything in a Full Service plus a timing belt inspection, multi-point check and a full road test — due every 2 years or 24,000 miles.", "Service grid"),
      T("svc_major_price", "Card Major Service — price", "£269", "Service grid"),
      T("svc_brakes_eyebrow", "Card Brakes — eyebrow", "Safety First", "Service grid"),
      T("svc_brakes_title", "Card Brakes — title", "Brakes", "Service grid"),
      A("svc_brakes_desc", "Card Brakes — description", "Brake pads, discs, callipers and handbrake cables. We check wear and brake performance and advise only when action is genuinely needed.", "Service grid"),
      T("svc_brakes_price", "Card Brakes — price", "Free check", "Service grid"),
      T("svc_tyres_eyebrow", "Card Tyres — eyebrow", "Safety First", "Service grid"),
      T("svc_tyres_title", "Card Tyres — title", "Tyres", "Service grid"),
      A("svc_tyres_desc", "Card Tyres — description", "New tyre fitting, balancing and puncture repair for all makes. We check tread depth and pressure and advise only when action is genuinely needed.", "Service grid"),
      T("svc_tyres_price", "Card Tyres — price", "Free check", "Service grid"),
      T("svc_bf_eyebrow", "Card Brake Fluid — eyebrow", "Safety Critical", "Service grid"),
      T("svc_bf_title", "Card Brake Fluid — title", "Brake Fluid Service", "Service grid"),
      A("svc_bf_desc", "Card Brake Fluid — description", "Old brake fluid absorbs moisture and reduces braking performance. We flush and replace it with fresh, correct-spec fluid.", "Service grid"),
      T("svc_bf_price", "Card Brake Fluid — price", "£99", "Service grid"),
      T("svc_spark_eyebrow", "Card Spark Plugs — eyebrow", "Takes ~1 Hour", "Service grid"),
      T("svc_spark_title", "Card Spark Plugs — title", "Spark Plug Replacement", "Service grid"),
      A("svc_spark_desc", "Card Spark Plugs — description", "Worn spark plugs cause misfires, rough idling and poor fuel economy. We fit new plugs to your manufacturer's spec — done in around an hour.", "Service grid"),
      T("svc_spark_price", "Card Spark Plugs — price", "Get a Quote", "Service grid"),
      T("svc_fuel_eyebrow", "Card Fuel Filter — eyebrow", "Takes ~30 Mins", "Service grid"),
      T("svc_fuel_title", "Card Fuel Filter — title", "Fuel Filter Change", "Service grid"),
      A("svc_fuel_desc", "Card Fuel Filter — description", "A clogged fuel filter starves your engine of fuel, causing poor starting and sluggish performance. We fit a fresh filter in about 30 minutes.", "Service grid"),
      T("svc_fuel_price", "Card Fuel Filter — price", "Get a Quote", "Service grid"),
      T("why_kicker", "Why us — kicker", "Why Marieston Service Centre", "Why us"),
      T("why_title", "Why us — heading", "The difference you'll notice", "Why us"),
      T("why_1_title", "Why card 1 — title", "Transparent pricing", "Why us"),
      A("why_1_body", "Why card 1 — text", "You get a clear quote before we touch the car. No hidden extras, no surprises at collection.", "Why us"),
      T("why_2_title", "Why card 2 — title", "DVSA approved", "Why us"),
      A("why_2_body", "Why card 2 — text", "Authorised MOT testing station with qualified technicians working to DVSA standards.", "Why us"),
      T("why_3_title", "Why card 3 — title", "Same-day turnaround", "Why us"),
      A("why_3_body", "Why card 3 — text", "Most MOTs, services and repairs are completed the same day — book a morning slot and drive away by evening.", "Why us"),
      T("why_4_title", "Why card 4 — title", "All makes & models", "Why us"),
      A("why_4_body", "Why card 4 — text", "From city cars to SUVs and light commercials. Foreign plates welcome.", "Why us"),
      T("cta_band_kicker", "Bottom CTA — kicker", "Ready to book?", "Bottom CTA"),
      T("cta_band_title", "Bottom CTA — heading", "Get your car booked in today", "Bottom CTA"),
      T("cta_band_primary", "Bottom CTA — primary button", "Book online now", "Bottom CTA"),
    ],
  },
  {
    slug: "gearbox-service",
    label: "Gearbox Service",
    icon: "⚙️",
    publicPath: "/gearbox-service",
    fields: [
      T("hero_kicker", "Hero — kicker", "Gearbox Service", "Hero"),
      T("hero_title", "Hero — heading", "Manual, Automatic & DSG Gearbox Service", "Hero"),
      A("hero_subtitle", "Hero — intro paragraph", "Specialist gearbox servicing for all makes and types — manual, automatic, DSG, PDK and CVT. Correct fluids, proper inspection, honest advice. Serving Hayes, West London and surrounding areas.", "Hero"),
      T("price_note", "Hero — price note pill", "Price confirmed after vehicle check — no hidden charges", "Hero"),
      T("stat_1_value", "Stat 1 — value", "All Types", "Stats"),
      T("stat_1_label", "Stat 1 — label", "Manual, Auto, DSG, CVT", "Stats"),
      T("stat_2_value", "Stat 2 — value", "OBD Scan", "Stats"),
      T("stat_2_label", "Stat 2 — label", "Fault code check included", "Stats"),
      T("stat_3_value", "Stat 3 — value", "Get a Quote", "Stats"),
      T("stat_3_label", "Stat 3 — label", "Price by vehicle & type", "Stats"),
      T("stat_4_value", "Stat 4 — value", "West London", "Stats"),
      T("stat_4_label", "Stat 4 — label", "Hayes UB4 & surrounding areas", "Stats"),
      T("includes_kicker", "What's included — kicker", "What's included", "What's included"),
      T("includes_title", "What's included — heading", "Our Gearbox Service", "What's included"),
      A(
        "includes_list",
        "What's included — bullet lines (one per line)",
        `Drain and refill gearbox oil to manufacturer specification
Visual inspection of gearbox casing, mounts and seals
Check for oil leaks and contamination
Road test to assess gear selection and shift quality
Inspect clutch linkage (manual) or fluid condition (automatic)
OBD scan for transmission fault codes
Written report with any recommended further work`,
        "What's included",
      ),
      T("types_kicker", "Gearbox types — kicker", "Gearbox types we cover", "Gearbox types"),
      T("types_title", "Gearbox types — heading", "All Transmission Types", "Gearbox types"),
      T("type_1_title", "Type 1 — title", "Manual Gearbox", "Gearbox types"),
      A("type_1_body", "Type 1 — text", "Regular gearbox oil changes keep gear selection smooth and prevent premature wear on synchromesh rings — especially important in urban stop-start driving common across West London.", "Gearbox types"),
      T("type_2_title", "Type 2 — title", "Automatic Transmission", "Gearbox types"),
      A("type_2_body", "Type 2 — text", "Automatic transmission fluid (ATF) degrades with heat and mileage. A fluid service restores smooth gear changes and protects the torque converter and valve body.", "Gearbox types"),
      T("type_3_title", "Type 3 — title", "DSG / DCT Gearbox", "Gearbox types"),
      A("type_3_body", "Type 3 — text", "Dual-clutch gearboxes (DSG, PDK, S-Tronic) require specialist fluid and filter changes. We service VW, Audi, BMW and Porsche DSG units using approved fluids.", "Gearbox types"),
      T("type_4_title", "Type 4 — title", "CVT Gearbox", "Gearbox types"),
      A("type_4_body", "Type 4 — text", "Continuously variable transmissions need dedicated CVT fluid at correct intervals. We cover Toyota, Honda, Nissan, Subaru and other CVT vehicles common on UK roads.", "Gearbox types"),
      T("signs_kicker", "Warning signs — kicker", "Warning signs", "Warning signs"),
      T("signs_title", "Warning signs — heading", "Does Your Gearbox Need Attention?", "Warning signs"),
      T("sign_1_title", "Sign 1 — title", "Difficulty selecting gears", "Warning signs"),
      A("sign_1_body", "Sign 1 — text", "Stiff, notchy or crunching gear changes usually indicate low or degraded gearbox oil — a fluid service often resolves this.", "Warning signs"),
      T("sign_2_title", "Sign 2 — title", "Slipping or jumping gears", "Warning signs"),
      A("sign_2_body", "Sign 2 — text", "If your car unexpectedly jumps out of gear or slips on acceleration, the gearbox needs inspection before further damage occurs.", "Warning signs"),
      T("sign_3_title", "Sign 3 — title", "Grinding or whining noise", "Warning signs"),
      A("sign_3_body", "Sign 3 — text", "Unusual noises during gear changes or while driving in gear point to worn bearings or low oil — don't ignore these early warning signs.", "Warning signs"),
      T("sign_4_title", "Sign 4 — title", "Transmission warning light", "Warning signs"),
      A("sign_4_body", "Sign 4 — text", "A gearbox or transmission warning light means a fault code has been logged. Our OBD diagnostic scan identifies the exact cause before any work begins.", "Warning signs"),
      T("faq_kicker", "FAQ block — kicker", "Common questions", "FAQs"),
      T("faq_title", "FAQ block — heading", "Gearbox Service FAQs", "FAQs"),
      T("faq_1_q", "FAQ 1 — question", "How often should I have my gearbox serviced?", "FAQs"),
      A("faq_1_a", "FAQ 1 — answer", "For manual gearboxes, most manufacturers recommend an oil change every 30,000–60,000 miles or every 3–5 years, whichever comes first. Automatic and DSG gearboxes typically need servicing every 40,000 miles. Urban driving in and around West London — with frequent stop-start traffic — can accelerate wear, so earlier intervals are worth considering.", "FAQs"),
      T("faq_2_q", "FAQ 2 — question", "What is included in a gearbox service?", "FAQs"),
      A("faq_2_a", "FAQ 2 — answer", "Our gearbox service includes draining and replacing the gearbox oil with the correct fluid to manufacturer spec, a visual inspection of the casing and seals, a road test to check shift quality, and an OBD scan for any stored transmission fault codes. We provide a written report of our findings.", "FAQs"),
      T("faq_3_q", "FAQ 3 — question", "How much does a gearbox service cost?", "FAQs"),
      A("faq_3_a", "FAQ 3 — answer", "Price depends on your vehicle's make, model and gearbox type — a DSG or automatic service involves more fluid and specialist steps than a manual. Contact us with your registration number for an exact quote. We aim to beat main dealer prices while using the correct approved fluids.", "FAQs"),
      T("faq_4_q", "FAQ 4 — question", "Can you service DSG gearboxes?", "FAQs"),
      A("faq_4_a", "FAQ 4 — answer", "Yes. We service DSG, S-Tronic, PDK and other dual-clutch gearboxes for VW, Audi, BMW, Porsche, SEAT and Skoda vehicles using the correct Genuine or OEM-equivalent fluid and filter.", "FAQs"),
      T("faq_5_q", "FAQ 5 — question", "Is a gearbox service the same as a gearbox repair?", "FAQs"),
      A("faq_5_a", "FAQ 5 — answer", "No. A gearbox service is preventative maintenance — oil changes and inspections to keep the gearbox healthy. A gearbox repair addresses an existing fault such as a worn synchro, failed bearing or damaged selector. We can advise on which is needed after a diagnostic inspection.", "FAQs"),
      T("cta_kicker", "Bottom CTA — kicker", "Get in touch", "Bottom CTA"),
      T("cta_title", "Bottom CTA — heading", "Get a Gearbox Service Quote", "Bottom CTA"),
      A("cta_body", "Bottom CTA — paragraph", "Send us your reg plate and we'll confirm the price for your exact vehicle.", "Bottom CTA"),
    ],
  },
  {
    slug: "spark-plugs",
    label: "Spark Plug",
    icon: "⚡",
    publicPath: "/spark-plugs",
    fields: [
      T("hero_kicker", "Hero — kicker", "Engine Maintenance", "Hero"),
      T("hero_title", "Hero — heading", "Spark Plug Replacement", "Hero"),
      A("hero_subtitle", "Hero — intro paragraph", "Misfires, rough idling or poor fuel economy? We replace worn spark plugs with the correct manufacturer-spec plugs for your engine. Serving Hayes, West London and surrounding areas.", "Hero"),
      T("price_note", "Hero — note pill", "Takes around 1 hour — price confirmed before any work starts", "Hero"),
      T("stat_1_value", "Stat 1 — value", "~1 Hour", "Stats"),
      T("stat_1_label", "Stat 1 — label", "Typical job time", "Stats"),
      T("stat_2_value", "Stat 2 — value", "OEM Spec", "Stats"),
      T("stat_2_label", "Stat 2 — label", "Manufacturer-spec plugs", "Stats"),
      T("stat_3_value", "Stat 3 — value", "All Makes", "Stats"),
      T("stat_3_label", "Stat 3 — label", "Petrol & hybrid engines", "Stats"),
      T("stat_4_value", "Stat 4 — value", "No Surprises", "Stats"),
      T("stat_4_label", "Stat 4 — label", "Quote agreed up front", "Stats"),
      T("includes_kicker", "What's included — kicker", "What's included", "What's included"),
      T("includes_title", "What's included — heading", "Our Spark Plug Service", "What's included"),
      A(
        "includes_list",
        "What's included — bullet lines (one per line)",
        `New spark plugs fitted to manufacturer specification
Correct torque settings applied to every plug
Ignition coils and leads visually inspected
Old plugs inspected for signs of engine issues
Engine idle and running quality checked after fitting
Fault codes cleared and road-checked where needed`,
        "What's included",
      ),
      T("signs_kicker", "Warning signs — kicker", "Warning signs", "Warning signs"),
      T("signs_title", "Warning signs — heading", "Do Your Spark Plugs Need Replacing?", "Warning signs"),
      T("sign_1_title", "Sign 1 — title", "Engine misfires", "Warning signs"),
      A("sign_1_body", "Sign 1 — text", "Stuttering, shaking or a sudden loss of power under acceleration is the classic sign of a worn or fouled spark plug.", "Warning signs"),
      T("sign_2_title", "Sign 2 — title", "Rough idle", "Warning signs"),
      A("sign_2_body", "Sign 2 — text", "If the engine feels lumpy or vibrates at a standstill, one or more plugs may not be firing cleanly.", "Warning signs"),
      T("sign_3_title", "Sign 3 — title", "Poor fuel economy", "Warning signs"),
      A("sign_3_body", "Sign 3 — text", "Worn plugs burn fuel inefficiently — if you're filling up more often than usual, plugs are a common cause.", "Warning signs"),
      T("sign_4_title", "Sign 4 — title", "Hard starting", "Warning signs"),
      A("sign_4_body", "Sign 4 — text", "Extended cranking before the engine catches, especially on cold mornings, often points to tired spark plugs.", "Warning signs"),
      T("faq_kicker", "FAQ block — kicker", "Common questions", "FAQs"),
      T("faq_title", "FAQ block — heading", "Spark Plug FAQs", "FAQs"),
      T("faq_1_q", "FAQ 1 — question", "How often should spark plugs be replaced?", "FAQs"),
      A("faq_1_a", "FAQ 1 — answer", "It varies by engine and plug type — standard plugs typically last 20,000–30,000 miles, while long-life iridium or platinum plugs can last 60,000–100,000 miles. We follow your manufacturer's schedule and can check your service history to confirm when they're due.", "FAQs"),
      T("faq_2_q", "FAQ 2 — question", "How long does spark plug replacement take?", "FAQs"),
      A("faq_2_a", "FAQ 2 — answer", "Around an hour for most engines. Some engines with restricted access (certain V6s or engines with intake manifolds over the plugs) can take longer — we'll confirm the time when you book.", "FAQs"),
      T("faq_3_q", "FAQ 3 — question", "Does my diesel car have spark plugs?", "FAQs"),
      A("faq_3_a", "FAQ 3 — answer", "No — diesel engines use glow plugs instead, which help cold starting. We check and replace glow plugs too, so if your diesel is struggling to start, get in touch.", "FAQs"),
      T("faq_4_q", "FAQ 4 — question", "Will new spark plugs improve performance?", "FAQs"),
      A("faq_4_a", "FAQ 4 — answer", "If your current plugs are worn, yes — you'll typically notice smoother idling, better throttle response and improved fuel economy. New plugs won't add power beyond factory spec, but they restore how the engine should feel.", "FAQs"),
      T("cta_kicker", "Bottom CTA — kicker", "Get in touch", "Bottom CTA"),
      T("cta_title", "Bottom CTA — heading", "Get a Spark Plug Quote", "Bottom CTA"),
      A("cta_body", "Bottom CTA — paragraph", "Send us your reg plate and we'll confirm the right plugs and price for your engine.", "Bottom CTA"),
    ],
  },
  {
    slug: "fuel-filter",
    label: "Fuel Filter",
    icon: "⛽",
    publicPath: "/fuel-filter",
    fields: [
      T("hero_kicker", "Hero — kicker", "Fuel System", "Hero"),
      T("hero_title", "Hero — heading", "Fuel Filter Change", "Hero"),
      A("hero_subtitle", "Hero — intro paragraph", "A clogged fuel filter starves your engine of fuel — causing poor starting, hesitation and sluggish performance. We fit a fresh, correct-spec filter for petrol and diesel cars. Serving Hayes, West London and surrounding areas.", "Hero"),
      T("price_note", "Hero — note pill", "Takes around 30 minutes — price confirmed before any work starts", "Hero"),
      T("stat_1_value", "Stat 1 — value", "~30 Mins", "Stats"),
      T("stat_1_label", "Stat 1 — label", "Typical job time", "Stats"),
      T("stat_2_value", "Stat 2 — value", "Petrol & Diesel", "Stats"),
      T("stat_2_label", "Stat 2 — label", "All fuel systems covered", "Stats"),
      T("stat_3_value", "Stat 3 — value", "OEM Spec", "Stats"),
      T("stat_3_label", "Stat 3 — label", "Correct filter for your car", "Stats"),
      T("stat_4_value", "Stat 4 — value", "No Surprises", "Stats"),
      T("stat_4_label", "Stat 4 — label", "Quote agreed up front", "Stats"),
      T("includes_kicker", "What's included — kicker", "What's included", "What's included"),
      T("includes_title", "What's included — heading", "Our Fuel Filter Service", "What's included"),
      A(
        "includes_list",
        "What's included — bullet lines (one per line)",
        `New fuel filter fitted to manufacturer specification
Fuel lines and connections checked for leaks
Fuel system primed and engine run-tested
Old filter inspected for dirt and contamination
Advice on fuel system health if we spot anything`,
        "What's included",
      ),
      T("signs_kicker", "Warning signs — kicker", "Warning signs", "Warning signs"),
      T("signs_title", "Warning signs — heading", "Does Your Fuel Filter Need Changing?", "Warning signs"),
      T("sign_1_title", "Sign 1 — title", "Hard starting", "Warning signs"),
      A("sign_1_body", "Sign 1 — text", "Long cranking before the engine fires, or an engine that starts then dies, often means fuel isn't flowing freely.", "Warning signs"),
      T("sign_2_title", "Sign 2 — title", "Loss of power", "Warning signs"),
      A("sign_2_body", "Sign 2 — text", "Noticeable power drop under load — uphill or when overtaking — is a classic sign of a restricted fuel filter.", "Warning signs"),
      T("sign_3_title", "Sign 3 — title", "Engine hesitation", "Warning signs"),
      A("sign_3_body", "Sign 3 — text", "Stumbling or jerking when you accelerate suggests the engine is being starved of fuel at higher demand.", "Warning signs"),
      T("sign_4_title", "Sign 4 — title", "Poor fuel economy", "Warning signs"),
      A("sign_4_body", "Sign 4 — text", "A struggling fuel system makes the engine work harder — if consumption has crept up, the filter is worth checking.", "Warning signs"),
      T("faq_kicker", "FAQ block — kicker", "Common questions", "FAQs"),
      T("faq_title", "FAQ block — heading", "Fuel Filter FAQs", "FAQs"),
      T("faq_1_q", "FAQ 1 — question", "How often should the fuel filter be changed?", "FAQs"),
      A("faq_1_a", "FAQ 1 — answer", "Most manufacturers recommend every 20,000–40,000 miles, though it varies by make and fuel type. Diesel filters generally need changing more often than petrol. We can check your service schedule and advise exactly when yours is due.", "FAQs"),
      T("faq_2_q", "FAQ 2 — question", "How long does a fuel filter change take?", "FAQs"),
      A("faq_2_a", "FAQ 2 — answer", "About 30 minutes for most cars. Some vehicles with in-tank filters take longer — we'll confirm when you book with your registration number.", "FAQs"),
      T("faq_3_q", "FAQ 3 — question", "What happens if I don't change the fuel filter?", "FAQs"),
      A("faq_3_a", "FAQ 3 — answer", "A blocked filter strains the fuel pump and starves the engine — leading to poor performance, breakdowns, and eventually a failed fuel pump, which is a much more expensive repair than a filter change.", "FAQs"),
      T("faq_4_q", "FAQ 4 — question", "Is the fuel filter more important on a diesel?", "FAQs"),
      A("faq_4_a", "FAQ 4 — answer", "Yes — diesel fuel systems run at very high pressure and are sensitive to dirt and water. Many diesel filters also separate water from the fuel, so regular changes protect the injectors and pump from costly damage.", "FAQs"),
      T("cta_kicker", "Bottom CTA — kicker", "Get in touch", "Bottom CTA"),
      T("cta_title", "Bottom CTA — heading", "Get a Fuel Filter Quote", "Bottom CTA"),
      A("cta_body", "Bottom CTA — paragraph", "Send us your reg plate and we'll confirm the right filter and price for your car.", "Bottom CTA"),
    ],
  },
  {
    slug: "mot",
    label: "MOT",
    icon: "🚗",
    fields: [
      {
        key: "hero_title",
        label: "Page Title",
        type: "text",
        default: "MOT Testing",
        section: "Hero",
      },
      {
        key: "hero_subtitle",
        label: "Subtitle",
        type: "textarea",
        default:
          "Annual MOT inspections carried out by our qualified technicians. Same-day slots available. If your vehicle fails, we explain every advisory clearly and can quote for any work needed.",
        section: "Hero",
      },
      {
        key: "hero_price",
        label: "Price Badge (e.g. \"From £49\")",
        type: "text",
        default: "From £49",
        section: "Hero",
      },
      {
        key: "faq_1_q",
        label: "FAQ 1 — Question",
        type: "text",
        default: "How much does an MOT cost?",
        section: "FAQs",
      },
      {
        key: "faq_1_a",
        label: "FAQ 1 — Answer",
        type: "textarea",
        default:
          "Our MOT is a fixed £49 — no hidden extras, no surprises.",
        section: "FAQs",
      },
      {
        key: "faq_2_q",
        label: "FAQ 2 — Question",
        type: "text",
        default: "What happens if my car fails?",
        section: "FAQs",
      },
      {
        key: "faq_2_a",
        label: "FAQ 2 — Answer",
        type: "textarea",
        default:
          "We give you a clear written list of failures and advisories. You can choose to have us repair it or take the car elsewhere — no obligation.",
        section: "FAQs",
      },
      {
        key: "faq_3_q",
        label: "FAQ 3 — Question",
        type: "text",
        default: "Can I combine MOT with a service?",
        section: "FAQs",
      },
      {
        key: "faq_3_a",
        label: "FAQ 3 — Answer",
        type: "textarea",
        default:
          "Yes. Booking an MOT and service together often saves money and means only one drop-off. Select a package when you book online.",
        section: "FAQs",
      },
      {
        key: "faq_4_q",
        label: "FAQ 4 — Question",
        type: "text",
        default: "How long does an MOT take?",
        section: "FAQs",
      },
      {
        key: "faq_4_a",
        label: "FAQ 4 — Answer",
        type: "textarea",
        default: "Usually 45–60 minutes for a straightforward test. We'll text you when it's ready.",
        section: "FAQs",
      },
      T("hero_eyebrow", "Hero — kicker", "DVSA Approved", "Hero"),
      T("hero_price_suffix", "Hero — text after price badge", "— DVSA Max Fee", "Hero"),
      T("btn_book_mot", "Hero — book button", "Book MOT", "Hero"),
      T("btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
      T("stat_1_label", "Stat tile 1 — label (value uses price badge)", "DVSA Max Fee", "Stat tiles"),
      T("stat_2_value", "Stat tile 2 — value", "~1 hr", "Stat tiles"),
      T("stat_2_label", "Stat tile 2 — label", "Typical Test Time", "Stat tiles"),
      T("stat_3_value", "Stat tile 3 — value", "Same Day", "Stat tiles"),
      T("stat_3_label", "Stat tile 3 — label", "Slots Often Available", "Stat tiles"),
      T("stat_4_value", "Stat tile 4 — value", "Free", "Stat tiles"),
      T("stat_4_label", "Stat tile 4 — label", "Free Retest if We Do Repairs", "Stat tiles"),
      T("checks_kicker", "Inspection — kicker", "The inspection", "What we check"),
      T("checks_title", "Inspection — heading", "What we check", "What we check"),
      A(
        "checks_list",
        "Inspection checklist (one line per item)",
        `Lights, reflectors & electrical equipment
Steering & suspension components
Brakes — pads, discs & hydraulics
Tyres — tread depth, condition & pressure
Seatbelts & restraint systems
Windscreen, wipers & washers
Horn & mirrors
Exhaust emissions & noise
Fuel system integrity
Vehicle identification (VIN / number plate)
Body structure & underbody
Driver's view of the road`,
        "What we check",
      ),
      T("process_kicker", "Process — kicker", "Simple process", "How it works"),
      T("process_title", "Process — heading", "How the MOT works", "How it works"),
      T("step_1_title", "Step 1 — title", "Book your slot", "How it works"),
      A("step_1_body", "Step 1 — text", "Choose a date and time online or call us. Same-day slots often available.", "How it works"),
      T("step_2_title", "Step 2 — title", "Drop off your car", "How it works"),
      A("step_2_body", "Step 2 — text", "Arrive at your booked time. Tests typically take 45–60 minutes.", "How it works"),
      T("step_3_title", "Step 3 — title", "Pass or advisory", "How it works"),
      A("step_3_body", "Step 3 — text", "We walk you through the result clearly. No jargon, no pressure.", "How it works"),
      T("step_4_title", "Step 4 — title", "Repair & retest (if needed)", "How it works"),
      A("step_4_body", "Step 4 — text", "We can quote and carry out any work, then retest at a reduced rate.", "How it works"),
      T("faq_section_kicker", "FAQ block — kicker", "FAQs", "FAQ intro"),
      T("faq_section_title", "FAQ block — heading", "Common questions", "FAQ intro"),
      T("bottom_kicker", "Bottom CTA — kicker", "Book today", "Bottom CTA"),
      T("bottom_title", "Bottom CTA — heading", "Ready for your MOT?", "Bottom CTA"),
      A("bottom_body", "Bottom CTA — paragraph", "Same-day slots often available. Book online in under a minute or call us.", "Bottom CTA"),
      T("bottom_btn_book", "Bottom CTA — book button", "Book MOT online", "Bottom CTA"),
    ],
  },
  {
    slug: "car-servicing",
    label: "Car Servicing",
    icon: "⚙️",
    fields: [
      {
        key: "hero_title",
        label: "Page Title",
        type: "text",
        default: "Car Servicing",
        section: "Hero",
      },
      {
        key: "hero_subtitle",
        label: "Subtitle",
        type: "textarea",
        default:
          "Manufacturer-scheduled servicing tailored to your make and model. Helps reliability, fuel economy, and resale value — with no dealership prices.",
        section: "Hero",
      },
      {
        key: "tier_interim_price",
        label: "Oil Service — Price",
        type: "text",
        default: "From £139",
        section: "Service Tier Prices",
      },
      {
        key: "tier_full_price",
        label: "Full Service — Price",
        type: "text",
        default: "From £239",
        section: "Service Tier Prices",
      },
      {
        key: "tier_major_price",
        label: "Major Service — Price",
        type: "text",
        default: "From £269",
        section: "Service Tier Prices",
      },
      {
        key: "tier_bf_price",
        label: "Brake Fluid Service — Price",
        type: "text",
        default: "£99",
        section: "Service Tier Prices",
      },
      T("hero_eyebrow", "Hero — kicker", "Scheduled servicing", "Hero"),
      T("btn_book", "Hero — book button", "Book a service", "Hero"),
      T("btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
      T("tier_section_kicker", "Tiers section — kicker", "Service levels", "Service tiers"),
      T("tier_section_title", "Tiers section — heading", "Choose your service", "Service tiers"),
      T("tier_popular_badge", "“Most popular” badge text", "Most popular", "Service tiers"),
      T("tier_interim_title", "Oil — card title", "Oil Service", "Service tiers"),
      T("tier_interim_subtitle", "Oil — subtitle", "Every 6 months or 6,000 miles", "Service tiers"),
      A(
        "tier_interim_includes",
        "Oil — bullet lines (one per line)",
        `Premium Engine Oil Flush & Refill
OEM-Quality Oil Filter Replacement
Sump Plug Washer Replacement
Essential Fluids Top-Up
Reset Service Light & Digital History`,
        "Service tiers",
      ),
      T("tier_full_title", "Full — card title", "Full Service", "Service tiers"),
      T("tier_full_subtitle", "Full — subtitle", "Every 12 months or 12,000 miles", "Service tiers"),
      A(
        "tier_full_includes",
        "Full — bullet lines (one per line)",
        `Everything in Oil Service
Air filter replacement
Fuel filter inspection
Brake pad & disc measurement
Suspension & steering inspection
Exhaust system check
60-point vehicle health check
Reset Service Light & Digital History`,
        "Service tiers",
      ),
      T("tier_major_title", "Major — card title", "Major Service", "Service tiers"),
      T("tier_major_subtitle", "Major — subtitle", "As per manufacturer schedule", "Service tiers"),
      A(
        "tier_major_includes",
        "Major — bullet lines (one per line)",
        `Everything in Full Service
Timing belt inspection
Cabin filter inspection
Comprehensive multi-point check
Full road test & report
Reset Service Light & Digital History`,
        "Service tiers",
      ),
      T("tier_bf_title", "Brake Fluid — card title", "Brake Fluid Service", "Service tiers"),
      T("tier_bf_subtitle", "Brake Fluid — subtitle", "Flush & replacement, fixed price", "Service tiers"),
      A(
        "tier_bf_includes",
        "Brake Fluid — bullet lines (one per line)",
        `Drain old, contaminated brake fluid
Refill with correct DOT-spec brake fluid
Bleed all four brake lines to remove air
Check brake pedal feel & response
Visual inspection of lines, hoses & callipers
Written report on brake system condition`,
        "Service tiers",
      ),
      T("tier_book_prefix", "Tier cards — book button prefix", "Book", "Service tiers"),
      T("benefits_kicker", "Benefits — kicker", "Why service regularly", "Benefits"),
      T("benefits_title", "Benefits — heading", "The benefits", "Benefits"),
      T("ben_1_title", "Benefit 1 — title", "Protects your warranty", "Benefits"),
      A("ben_1_body", "Benefit 1 — text", "Manufacturer-scheduled servicing maintains your vehicle warranty — even at independent garages.", "Benefits"),
      T("ben_2_title", "Benefit 2 — title", "Saves money long-term", "Benefits"),
      A("ben_2_body", "Benefit 2 — text", "Regular servicing catches small problems before they become expensive repairs.", "Benefits"),
      T("ben_3_title", "Benefit 3 — title", "Improves fuel economy", "Benefits"),
      A("ben_3_body", "Benefit 3 — text", "Fresh oil, clean filters and correct tyre pressures all contribute to better MPG.", "Benefits"),
      T("ben_4_title", "Benefit 4 — title", "Boosts resale value", "Benefits"),
      A("ben_4_body", "Benefit 4 — text", "A full service history is one of the most valuable things you can have when selling your car.", "Benefits"),
      T("bottom_kicker", "Bottom CTA — kicker", "Book today", "Bottom CTA"),
      T("bottom_title", "Bottom CTA — heading", "Ready to book your service?", "Bottom CTA"),
      A("bottom_body", "Bottom CTA — intro paragraph", "Typical service time 1.5–3 hours. Drop your car off and we'll text you the moment it's ready to collect.", "Bottom CTA"),
      T("bottom_btn", "Bottom CTA — primary button", "Book online now", "Bottom CTA"),
    ],
  },
  {
    slug: "repairs",
    label: "Repairs",
    icon: "🔩",
    fields: [
      {
        key: "hero_title",
        label: "Page Title",
        type: "text",
        default: "Repairs",
        section: "Hero",
      },
      {
        key: "hero_subtitle",
        label: "Subtitle",
        type: "textarea",
        default:
          "From brakes and suspension to clutches, exhausts and timing components. We diagnose first, quote clearly, and only proceed with your approval — no surprises.",
        section: "Hero",
      },
      T("hero_eyebrow", "Hero — kicker", "All makes & models", "Hero"),
      T("btn_quote", "Hero — quote button", "Request a quote", "Hero"),
      T("btn_whatsapp", "Hero — WhatsApp button", "WhatsApp for a quote", "Hero"),
      T("cats_kicker", "Categories — kicker", "What we repair", "Repair categories"),
      T("cats_title", "Categories — heading", "Repair categories", "Repair categories"),
      T("cat_link_text", "Category cards — link text", "View details", "Repair categories"),
      T("cat_brakes_title", "Brakes — title", "Brakes", "Repair categories"),
      A("cat_brakes_desc", "Brakes — intro", "Pads, discs, callipers, brake lines and handbrake cables. We measure wear and advise only when action is genuinely needed.", "Repair categories"),
      A("cat_brakes_items", "Brakes — bullets (one per line)", "Brake pads & discs\nCallipers & cylinders\nBrake lines & hoses\nABS sensor faults", "Repair categories"),
      T("cat_clutch_title", "Clutch & Gearbox — title", "Clutch & Gearbox", "Repair categories"),
      A("cat_clutch_desc", "Clutch & Gearbox — intro", "Slipping clutch, stiff biting point, grinding gears — we diagnose and repair manual and automatic transmissions.", "Repair categories"),
      A("cat_clutch_items", "Clutch — bullets (one per line)", "Clutch plate & pressure\nFlywheel replacement\nGear linkage\nAutomatic transmission service", "Repair categories"),
      T("cat_sus_title", "Suspension — title", "Suspension & Steering", "Repair categories"),
      A("cat_sus_desc", "Suspension — intro", "Knocking on bumps, pulling to one side, or vague steering? We check and replace worn components.", "Repair categories"),
      A("cat_sus_items", "Suspension — bullets (one per line)", "Shock absorbers & struts\nWishbones & ball joints\nTrack rod ends\nPower steering faults", "Repair categories"),
      T("cat_exhaust_title", "Exhaust — title", "Exhaust & Emissions", "Repair categories"),
      A("cat_exhaust_desc", "Exhaust — intro", "Blowing exhaust, rattling heat shields, catalytic converter issues, or failed emissions on MOT — we fix it.", "Repair categories"),
      A("cat_exhaust_items", "Exhaust — bullets (one per line)", "Exhaust pipe & silencer\nCatalytic converter\nDPF cleaning & replacement\nLambda / O2 sensors", "Repair categories"),
      T("cat_engine_title", "Engine — title", "Engine & Cooling", "Repair categories"),
      A("cat_engine_desc", "Engine — intro", "Overheating, oil leaks, warning lights — we trace the root cause with diagnostics before quoting.", "Repair categories"),
      A("cat_engine_items", "Engine — bullets (one per line)", "Coolant system leaks\nThermostat replacement\nWater pump\nTiming belt & chain", "Repair categories"),
      T("cat_elec_title", "Electrical — title", "Electrical & Lighting", "Repair categories"),
      A("cat_elec_desc", "Electrical — intro", "Warning lights, failed electrics, battery drain or blown bulbs — diagnosed and repaired.", "Repair categories"),
      A("cat_elec_items", "Electrical — bullets (one per line)", "Battery testing & replacement\nAlternator & starter motor\nBulb & light unit replacement\nCentral locking & windows", "Repair categories"),
      T("process_kicker", "Process — kicker", "How it works", "Our process"),
      T("process_title", "Process — heading", "Our repair process", "Our process"),
      T("proc_1_title", "Process 1 — title", "We diagnose first", "Our process"),
      A("proc_1_body", "Process 1 — text", "We identify the root cause using diagnostic tools, visual inspection, and a road test where needed.", "Our process"),
      T("proc_2_title", "Process 2 — title", "You get a clear quote", "Our process"),
      A("proc_2_body", "Process 2 — text", "Parts and labour quoted upfront. No work starts until you approve the price.", "Our process"),
      T("proc_3_title", "Process 3 — title", "We carry out the repair", "Our process"),
      A("proc_3_body", "Process 3 — text", "Quality parts fitted by experienced technicians. We text you when the car is ready.", "Our process"),
      T("proc_4_title", "Process 4 — title", "We test & road check", "Our process"),
      A("proc_4_body", "Process 4 — text", "Every repair is tested before we hand the car back — no guesswork.", "Our process"),
      T("bottom_kicker", "Bottom CTA — kicker", "Get it fixed", "Bottom CTA"),
      T("bottom_title", "Bottom CTA — heading", "Need a repair quote?", "Bottom CTA"),
      A("bottom_body", "Bottom CTA — paragraph", "Tell us your registration and what's happening — we'll come back with a clear price. No obligation.", "Bottom CTA"),
      T("bottom_btn", "Bottom CTA — button", "Request a quote", "Bottom CTA"),
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    icon: "📞",
    fields: [
      T("hero_kicker", "Hero — kicker", "We're here to help", "Hero"),
      T("hero_title", "Hero — heading", "Get in touch", "Hero"),
      A(
        "hero_subtitle",
        "Hero — intro (use {{address}} for the site address)",
        "Call us, WhatsApp, or book online. Visit us at {{address}}. We respond as soon as we're off the ramp.",
        "Hero"
      ),
      T("status_open_template", "Status — when open (include {time} for closing time)", "Open now · closes {time}", "Hero"),
      T("status_closed", "Status — when closed", "Currently closed", "Hero"),
      T("status_closing_time", "Status — default closing time label", "18:00", "Hero"),
      T("form_kicker", "Form block — kicker", "Send a message", "Form"),
      T("form_title", "Form block — heading", "Get in touch directly", "Form"),
      T("success_title", "After send — heading", "Message sent!", "Form"),
      A(
        "success_body",
        "After send — paragraph",
        "Thanks for getting in touch. We'll get back to you as soon as possible — usually within a few hours during opening times.",
        "Form"
      ),
      T("success_again", "After send — button", "Send another message", "Form"),
      T("label_name", "Field — full name", "Full Name", "Form"),
      T("label_email", "Field — email", "Email Address", "Form"),
      T("label_phone", "Field — phone", "Phone Number", "Form"),
      T("label_service", "Field — service", "Service Required", "Form"),
      T("label_message", "Field — message", "Message", "Form"),
      T("ph_name", "Placeholder — name", "John Smith", "Form"),
      T("ph_email", "Placeholder — email", "john@example.com", "Form"),
      T("ph_phone", "Placeholder — phone", "07700 900000", "Form"),
      T("ph_message", "Placeholder — message", "Tell us about your vehicle and what you need help with...", "Form"),
      T("service_select_placeholder", "Service dropdown — first option", "Select a service...", "Form"),
      A("contact_service_options", "Service dropdown — options (one per line)", CONTACT_SERVICE_OPTIONS_DEFAULT, "Form"),
      T("required_suffix", "Required marker note", "* Required fields", "Form"),
      T("err_name", "Validation — name", "Name is required.", "Form"),
      T("err_email", "Validation — email missing", "Email is required.", "Form"),
      T("err_email_fmt", "Validation — email format", "Enter a valid email address.", "Form"),
      T("err_message", "Validation — message", "Message is required.", "Form"),
      T("btn_sending", "Submit — loading", "Sending...", "Form"),
      T("btn_send", "Submit — default", "Send message", "Form"),
      T("reach_kicker", "Reach us — kicker", "Contact us", "Reach us"),
      T("reach_title", "Reach us — heading", "How to reach us", "Reach us"),
      T("card_phone", "Card label — phone", "Phone", "Reach us"),
      T("card_whatsapp", "Card label — WhatsApp", "WhatsApp", "Reach us"),
      T("card_email", "Card label — email", "Email", "Reach us"),
      T("card_address", "Card label — address", "Address", "Reach us"),
      T("hours_kicker", "Hours card — kicker", "Opening hours", "Reach us"),
      A(
        "contact_hours_grid",
        "Hours — lines (Day|hours, one per line)",
        "Monday – Saturday|9:00 – 18:00\nSunday|Closed",
        "Reach us"
      ),
      T("btn_book", "Hours card — book button", "Book online now", "Reach us"),
      T("btn_call_prefix", "Hours card — call button prefix", "Call", "Reach us"),
      T("collection_kicker", "Info box — kicker", "Not sure what's wrong?", "Reach us"),
      A(
        "collection_body",
        "Info box — paragraph (plain text)",
        "Describe the problem over WhatsApp or give us a call — our advisors will tell you honestly what it's likely to be and what it should cost, before you book anything. No pressure, no obligation.",
        "Reach us"
      ),
      T("map_kicker", "Map — kicker", "Find us", "Map"),
      T("map_iframe_title", "Map — iframe title", "Marieston Service Centre — 235 Yeading Lane, Hayes UB4 9AD", "Map"),
      A(
        "map_embed_src",
        "Map — iframe src (full URL)",
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586!2d-0.399722!3d51.5268571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766dd076f12283%3A0x9b182de007f87a84!2sMarieston%20Service%20Centre!5e0!3m2!1sen!2suk!4v1715769600000!5m2!1sen!2suk",
        "Map"
      ),
      T("map_caption", "Map — caption under frame", "235 Yeading Lane, Hayes, UB4 9AD — free parking on site", "Map"),
      T("map_open_label", "Map — Google Maps button", "Open in Google Maps", "Map"),
      A(
        "map_open_url",
        "Map — Google Maps link (full URL)",
        "https://www.google.com/maps/place/Marieston+Service+Centre/@51.5268571,-0.4022969,586m/data=!3m2!1e3!4b1!4m6!3m5!1s0x48766dd076f12283:0x9b182de007f87a84!8m2!3d51.5268571!4d-0.399722!16s%2Fg%2F11njnzzcdd",
        "Map"
      ),
      A(
        "address_maps_url",
        "Address card — Google Maps link (full URL)",
        "https://www.google.com/maps/place/Marieston+Service+Centre/@51.5268571,-0.4022969,586m/data=!3m2!1e3!4b1!4m6!3m5!1s0x48766dd076f12283:0x9b182de007f87a84!8m2!3d51.5268571!4d-0.399722!16s%2Fg%2F11njnzzcdd",
        "Reach us"
      ),
    ],
  },
  {
    slug: "faqs",
    label: "FAQs",
    icon: "❓",
    fields: [
      { key: "page_kicker", label: "Header — kicker above title", type: "text", default: "Support", section: "Hero" },
      { key: "hero_title", label: "Page Title", type: "text", default: "Frequently Asked Questions", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Have a question? We're here to help. Find answers to common questions about our services, booking process, and more.", section: "Hero" },
      { key: "faq_1_q", label: "FAQ 1 — Question", type: "text", default: "What service does my car need?", section: "FAQs" },
      { key: "faq_1_a", label: "FAQ 1 — Answer", type: "textarea", default: "Use your manufacturer schedule and mileage. If you are unsure, book a free health check or call us — we will gladly recommend whether you need an oil, full, or major service.", section: "FAQs" },
      { key: "faq_2_q", label: "FAQ 2 — Question", type: "text", default: "How long does an MOT or full service take?", section: "FAQs" },
      { key: "faq_2_a", label: "FAQ 2 — Answer", type: "textarea", default: "A standard MOT test takes around 45 to 60 minutes. A full service typically takes 1.5–3 hours depending on the vehicle and our findings. We will give you a clear time window when you book.", section: "FAQs" },
      { key: "faq_3_q", label: "FAQ 3 — Question", type: "text", default: "Can I book an MOT and service together?", section: "FAQs" },
      { key: "faq_3_a", label: "FAQ 3 — Answer", type: "textarea", default: "Yes! We highly recommend it as it saves you time and money. Just choose the MOT + Service package in our online booking flow.", section: "FAQs" },
      { key: "faq_4_q", label: "FAQ 4 — Question", type: "text", default: "Do you use genuine parts and are they under warranty?", section: "FAQs" },
      { key: "faq_4_a", label: "FAQ 4 — Answer", type: "textarea", default: "Absolutely. We use high-quality OE (Original Equipment) or equivalent replacement parts. All parts and labour are fully guaranteed, giving you complete peace of mind.", section: "FAQs" },
      { key: "faq_5_q", label: "FAQ 5 — Question", type: "text", default: "What happens if extra work is needed or my car fails its MOT?", section: "FAQs" },
      { key: "faq_5_a", label: "FAQ 5 — Answer", type: "textarea", default: "If we find any issues during a service or an MOT failure, we will concisely explain the problem and provide a no-obligation quote. We never proceed with extra work without your explicit approval. No surprises.", section: "FAQs" },
      { key: "faq_6_q", label: "FAQ 6 — Question", type: "text", default: "Do you service electric and hybrid vehicles?", section: "FAQs" },
      { key: "faq_6_a", label: "FAQ 6 — Answer", type: "textarea", default: "Yes — we work on EVs and hybrids alongside petrol and diesel cars, and we also offer a dedicated EV battery health check with a State-of-Health report. Book online or get in touch for details.", section: "FAQs" },
      { key: "faq_7_q", label: "FAQ 7 — Question", type: "text", default: "How much does a service or MOT cost?", section: "FAQs" },
      { key: "faq_7_a", label: "FAQ 7 — Answer", type: "textarea", default: "Our prices are transparent and shown upfront when you book online — no hidden fees. The final cost only changes if we discover additional work needed, and we will always contact you for approval before proceeding.", section: "FAQs" },
      { key: "faq_8_q", label: "FAQ 8 — Question", type: "text", default: "What payment methods do you accept?", section: "FAQs" },
      { key: "faq_8_a", label: "FAQ 8 — Answer", type: "textarea", default: "We accept all major credit and debit cards, as well as cash. Payment is taken on collection of your vehicle once all work is completed and explained to you.", section: "FAQs" },
      { key: "faq_9_q", label: "FAQ 9 — Question", type: "text", default: "Is there somewhere I can wait while my car is being worked on?", section: "FAQs" },
      { key: "faq_9_a", label: "FAQ 9 — Answer", type: "textarea", default: "Yes, we have a comfortable waiting area with free Wi-Fi and refreshments. Alternatively, if the job requires a longer period of time, you are welcome to drop your car off and collect it later.", section: "FAQs" },
      { key: "faq_10_q", label: "FAQ 10 — Question", type: "text", default: "Do you work on electric and hybrid vehicles?", section: "FAQs" },
      { key: "faq_10_a", label: "FAQ 10 — Answer", type: "textarea", default: "Yes, we service and maintain electric and hybrid vehicles. Our technicians are trained to work on EV and hybrid systems safely and to manufacturer standards. We also offer battery health tests for EV vehicles — contact us for more information.", section: "FAQs" },
      { key: "faq_11_q", label: "FAQ 11 — Question", type: "text", default: "Can you carry out a diagnostic check on my car?", section: "FAQs" },
      { key: "faq_11_a", label: "FAQ 11 — Answer", type: "textarea", default: "Absolutely. We use the latest diagnostic equipment to read fault codes and identify issues across all makes and models. A diagnostic check is a great first step if a warning light has appeared on your dashboard.", section: "FAQs" },
      { key: "faq_12_q", label: "FAQ 12 — Question", type: "text", default: "Do you supply and fit tyres?", section: "FAQs" },
      { key: "faq_12_a", label: "FAQ 12 — Answer", type: "textarea", default: "Yes, we supply and fit new tyres across a wide range of makes, models, and budgets — from economy to premium brands. We also offer tyre balancing. Contact us or visit our tyres page to get a quote for new tyres.", section: "FAQs" },
      { key: "faq_13_q", label: "FAQ 13 — Question", type: "text", default: "Do you service and regas air conditioning systems?", section: "FAQs" },
      { key: "faq_13_a", label: "FAQ 13 — Answer", type: "textarea", default: "Yes. We offer a full air conditioning regas and system health check, recommended every two years. We handle both R134a and R1234yf refrigerant systems. A regas restores cooling performance and removes moisture that can cause odours and damage to the system.", section: "FAQs" },
      { key: "faq_14_q", label: "FAQ 14 — Question", type: "text", default: "How often should brake fluid be changed?", section: "FAQs" },
      { key: "faq_14_a", label: "FAQ 14 — Answer", type: "textarea", default: "Brake fluid should typically be changed every two years, regardless of mileage. Over time it absorbs moisture, which lowers its boiling point and reduces braking performance. Our brake fluid service includes a full flush and replacement to keep your brakes safe and responsive.", section: "FAQs" },
      { key: "faq_15_q", label: "FAQ 15 — Question", type: "text", default: "How do I know if my clutch or gearbox needs attention?", section: "FAQs" },
      { key: "faq_15_a", label: "FAQ 15 — Answer", type: "textarea", default: "Common signs include a slipping clutch (engine revving without the car accelerating), difficulty changing gears, grinding or crunching noises, or a burning smell. We start with a full diagnostic to identify the exact fault, then provide a clear, no-obligation quote for the repair before any work begins.", section: "FAQs" },
      { key: "faq_16_q", label: "FAQ 16 — Question", type: "text", default: "What are the signs of suspension or steering problems?", section: "FAQs" },
      { key: "faq_16_a", label: "FAQ 16 — Answer", type: "textarea", default: "Look out for excessive bouncing after bumps, pulling to one side when driving, uneven tyre wear, clunking noises over rough roads, or a vibrating steering wheel. We carry out a full diagnostic inspection of your suspension and steering components, then provide a no-obligation quote for any work required.", section: "FAQs" },
      { key: "faq_17_q", label: "FAQ 17 — Question", type: "text", default: "Can you repair exhausts and DPF systems?", section: "FAQs" },
      { key: "faq_17_a", label: "FAQ 17 — Answer", type: "textarea", default: "Yes. We repair and replace exhaust systems including silencers, catalytic converters, and diesel particulate filters (DPF). A blocked or damaged DPF can trigger limp mode, increase fuel consumption, and cause an MOT failure. We diagnose the issue first, then give you a clear quote for the fix — no guesswork repairs.", section: "FAQs" },
      { key: "faq_18_q", label: "FAQ 18 — Question", type: "text", default: "What should I do if my engine overheats or is leaking oil?", section: "FAQs" },
      { key: "faq_18_a", label: "FAQ 18 — Answer", type: "textarea", default: "Stop driving as soon as it is safe to do so and contact us. Continuing to drive with an overheating engine or a serious oil leak can cause severe internal damage. We carry out a full diagnostic to identify the root cause — whether it is a head gasket, water pump, thermostat, or oil leak — then provide a no-obligation quote before any work starts.", section: "FAQs" },
      { key: "faq_19_q", label: "FAQ 19 — Question", type: "text", default: "Can you fix electrical faults and warning lights?", section: "FAQs" },
      { key: "faq_19_a", label: "FAQ 19 — Answer", type: "textarea", default: "Yes. We use professional diagnostic equipment to trace the exact cause of electrical faults — including battery and alternator issues, starter motor problems, lighting faults, and sensor failures. Once we have identified the problem we provide a clear quote, so you know exactly what the repair will cost before we proceed.", section: "FAQs" },
      { key: "cta_title", label: "Bottom CTA Title", type: "text", default: "Still have questions?", section: "Bottom CTA" },
      { key: "cta_subtitle", label: "Bottom CTA Subtitle", type: "textarea", default: "Can't find the answer you are looking for? Our team is ready to assist you.", section: "Bottom CTA" },
    ],
  },
  {
    slug: "diagnostics",
    label: "Diagnostics",
    icon: "🔍",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Diagnostics", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Warning lights, limp mode, odd noises, or poor running — we use serial diagnostics and measured tests to find the root cause before replacing parts.", section: "Hero" },
      T("hero_eyebrow", "Hero — kicker", "Diagnostics", "Hero"),
      T("hero_price_badge", "Hero — price badge", "Diagnostics From £54", "Hero"),
      T("btn_book", "Hero — book button", "Book diagnostics", "Hero"),
      T("btn_whatsapp", "Hero — WhatsApp", "WhatsApp us", "Hero"),
      T("cover_kicker", "What we cover — kicker", "What we cover", "Coverage"),
      T("cover_title", "What we cover — heading", "Full diagnostic service", "Coverage"),
      A(
        "cover_list",
        "Coverage bullet list (one line per item)",
        `OBD-II / serial diagnostics — all makes & models
Engine management & ECU fault reading
ABS, airbag & traction control system faults
Transmission & gearbox fault codes
Emission & DPF system diagnosis
Live data analysis — sensors, injectors, MAF
Electrical circuit testing & short tracing
Pre-purchase inspection & health check`,
        "Coverage",
      ),
      T("stat_1_value", "Stat 1 — value", "Root cause", "Stats"),
      T("stat_1_label", "Stat 1 — label", "Not Guesswork Repairs", "Stats"),
      T("stat_2_value", "Stat 2 — value", "All makes", "Stats"),
      T("stat_2_label", "Stat 2 — label", "Petrol, Diesel & Hybrid", "Stats"),
      T("stat_3_value", "Stat 3 — value", "Live data", "Stats"),
      T("stat_3_label", "Stat 3 — label", "Sensor & Injector Analysis", "Stats"),
      T("stat_4_value", "Stat 4 — value", "Clear report", "Stats"),
      T("stat_4_label", "Stat 4 — label", "Written Fault Summary", "Stats"),
      T("signs_kicker", "Warning signs — kicker", "Warning signs", "Warning signs"),
      T("signs_title", "Warning signs — heading", "Signs your car needs a diagnostic check", "Warning signs"),
      T("sign_1_title", "Sign card 1 — title", "Engine warning light", "Warning signs"),
      A("sign_1_body", "Sign card 1 — text", "A solid or flashing engine light can mean anything from a loose sensor to a serious fault — we read the codes and tell you exactly what's wrong.", "Warning signs"),
      T("sign_2_title", "Sign card 2 — title", "Limp mode", "Warning signs"),
      A("sign_2_body", "Sign card 2 — text", "If your car suddenly loses power and rev-limits itself, the ECU has detected a fault. We diagnose the root cause before any guesswork repairs.", "Warning signs"),
      T("sign_3_title", "Sign card 3 — title", "Odd noises or running", "Warning signs"),
      A("sign_3_body", "Sign card 3 — text", "Misfires, rough idle, hesitation under load — live data lets us pinpoint faulty sensors, injectors, or ignition issues fast.", "Warning signs"),
      T("sign_4_title", "Sign card 4 — title", "Multiple dashboard lights", "Warning signs"),
      A("sign_4_body", "Sign card 4 — text", "ABS, traction control, airbag or TPMS lights all on often point to a shared fault. We trace it properly rather than replacing parts blindly.", "Warning signs"),
      T("bottom_kicker", "Bottom CTA — kicker", "Don't ignore it", "Bottom CTA"),
      T("bottom_title", "Bottom CTA — heading", "Get your car diagnosed today", "Bottom CTA"),
      A("bottom_body", "Bottom CTA — paragraph", "We find the fault first — then quote for the fix. No parts replaced on guesswork.", "Bottom CTA"),
      T("bottom_btn", "Bottom CTA — book button", "Book diagnostics", "Bottom CTA"),
    ],
  },
  {
    slug: "air-con",
    label: "Air Con",
    icon: "❄️",
    fields: AIR_CON_FIELDS,
  },
  {
    slug: "ev-battery",
    label: "EV Battery Health",
    icon: "⚡",
    fields: EV_BATTERY_FIELDS,
  },
  {
    slug: "shine-protect",
    label: "Shine Protect",
    icon: "✨",
    fields: SHINE_PROTECT_FIELDS,
  },
  {
    slug: "shine-protect-alloy",
    label: "Shine Protect Alloy",
    icon: "🛞",
    fields: SHINE_PROTECT_ALLOY_FIELDS,
  },
  {
    slug: "customer-protect-comprehensive",
    label: "Comprehensive Warranty",
    icon: "🛡️",
    fields: CUSTOMER_PROTECT_COMPREHENSIVE_FIELDS,
  },
  {
    slug: "ceramic-coat",
    label: "Ceramic Coat",
    icon: "💎",
    fields: CERAMIC_COAT_FIELDS,
  },
  {
    slug: "battery-check",
    label: "Battery Check",
    icon: "🔋",
    fields: BATTERY_CHECK_FIELDS,
  },
  {
    slug: "car-servicing-interim",
    label: "Oil Service",
    icon: "🔧",
    publicPath: "/car-servicing/oil",
    fields: CAR_SERVICING_INTERIM_FIELDS,
  },
  {
    slug: "car-servicing-full",
    label: "Full Service",
    icon: "⚙️",
    publicPath: "/car-servicing/full",
    fields: CAR_SERVICING_FULL_FIELDS,
  },
  {
    slug: "car-servicing-major",
    label: "Major Service",
    icon: "🔩",
    publicPath: "/car-servicing/major",
    fields: CAR_SERVICING_MAJOR_FIELDS,
  },
  {
    slug: "brake-fluid",
    label: "Brake Fluid Service",
    icon: "🩸",
    publicPath: "/brake-fluid",
    fields: [
      T("hero_kicker", "Hero — kicker", "Safety Critical", "Hero"),
      T("hero_title", "Hero — heading", "Brake Fluid Service", "Hero"),
      A("hero_subtitle", "Hero — intro paragraph", "Brake fluid absorbs moisture over time, reducing stopping power when you need it most. We flush the old fluid and replace it with fresh, correct-spec fluid to restore full braking performance.", "Hero"),
      T("price_display", "Hero — price", "£99", "Hero"),
      T("price_note", "Hero — price note", "Fixed price — all makes & engine sizes", "Hero"),
      T("stat_1_value", "Stat 1 — value", "£99", "Stats"),
      T("stat_1_label", "Stat 1 — label", "Fixed Price", "Stats"),
      T("stat_2_value", "Stat 2 — value", "~30 min", "Stats"),
      T("stat_2_label", "Stat 2 — label", "Quick Turnaround", "Stats"),
      T("stat_3_value", "Stat 3 — value", "All makes", "Stats"),
      T("stat_3_label", "Stat 3 — label", "Cars & Light Vans", "Stats"),
      T("stat_4_value", "Stat 4 — value", "DOT spec", "Stats"),
      T("stat_4_label", "Stat 4 — label", "Correct Fluid Grade", "Stats"),
      T("includes_kicker", "What's included — kicker", "What's included", "What's included"),
      T("includes_title", "What's included — heading", "Full Brake Fluid Flush & Replacement", "What's included"),
      A(
        "includes_list",
        "What's included — bullet lines (one per line)",
        `Drain old, contaminated brake fluid
Refill with correct DOT-spec brake fluid
Bleed all four brake lines to remove air
Check brake pedal feel & response
Visual inspection of lines, hoses & callipers
Written report on brake system condition`,
        "What's included",
      ),
      T("signs_kicker", "Warning signs — kicker", "Warning signs", "Warning signs"),
      T("signs_title", "Warning signs — heading", "When to Get Your Brake Fluid Checked", "Warning signs"),
      T("sign_1_title", "Sign 1 — title", "Soft or spongy pedal", "Warning signs"),
      A("sign_1_body", "Sign 1 — text", "Moisture in the fluid lowers its boiling point, making the brake pedal feel less firm.", "Warning signs"),
      T("sign_2_title", "Sign 2 — title", "Fluid looks dark or murky", "Warning signs"),
      A("sign_2_body", "Sign 2 — text", "Fresh brake fluid is clear to pale yellow. Dark, cloudy fluid has absorbed moisture and contaminants.", "Warning signs"),
      T("sign_3_title", "Sign 3 — title", "Longer stopping distances", "Warning signs"),
      A("sign_3_body", "Sign 3 — text", "Degraded fluid reduces hydraulic efficiency, meaning it takes longer for the brakes to respond fully.", "Warning signs"),
      T("sign_4_title", "Sign 4 — title", "Not changed in 2+ years", "Warning signs"),
      A("sign_4_body", "Sign 4 — text", "Brake fluid absorbs moisture from the air over time, even if it's never leaked or run low.", "Warning signs"),
      T("faq_kicker", "FAQ block — kicker", "Common questions", "FAQs"),
      T("faq_title", "FAQ block — heading", "Frequently Asked Questions", "FAQs"),
      T("faq_1_q", "FAQ 1 — question", "How often should brake fluid be changed?", "FAQs"),
      A("faq_1_a", "FAQ 1 — answer", "Most manufacturers recommend every 2 years, regardless of mileage. Brake fluid is hygroscopic — it absorbs moisture from the air over time, which lowers its boiling point and can affect braking performance.", "FAQs"),
      T("faq_2_q", "FAQ 2 — question", "Why does brake fluid need replacing if it isn't leaking?", "FAQs"),
      A("faq_2_a", "FAQ 2 — answer", "Moisture absorption happens gradually through seals and hoses, not just from leaks. Contaminated fluid can boil under hard braking, causing a spongy pedal or reduced stopping power — known as brake fade.", "FAQs"),
      T("faq_3_q", "FAQ 3 — question", "Is this the same as a brake pad or disc replacement?", "FAQs"),
      A("faq_3_a", "FAQ 3 — answer", "No — this is a separate service covering just the hydraulic brake fluid. If we spot worn pads, discs, or callipers during the check, we'll quote separately before doing any extra work.", "FAQs"),
      T("faq_4_q", "FAQ 4 — question", "How long does a brake fluid service take?", "FAQs"),
      A("faq_4_a", "FAQ 4 — answer", "Typically around 30 minutes for most cars. We bleed all four brake lines to make sure there's no trapped air alongside the old fluid.", "FAQs"),
      T("cta_kicker", "Bottom CTA — kicker", "Don't risk brake fade", "Bottom CTA"),
      T("cta_title", "Bottom CTA — heading", "Book Your Brake Fluid Service Today", "Bottom CTA"),
      T("cta_note", "Bottom CTA — note after address", "— walk-ins welcome", "Bottom CTA"),
    ],
  },
  {
    slug: "repairs-brakes",
    label: "Brakes",
    icon: "🛑",
    publicPath: "/repairs/brakes",
    fields: REPAIRS_BRAKES_FIELDS,
  },
  {
    slug: "repairs-tyres",
    label: "Tyres",
    icon: "🛞",
    publicPath: "/repairs/tyres",
    fields: REPAIRS_TYRES_FIELDS,
  },
  {
    slug: "repairs-clutch-gearbox",
    label: "Clutch & Gearbox",
    icon: "⚙️",
    publicPath: "/repairs/clutch-gearbox",
    fields: REPAIRS_CLUTCH_GEARBOX_FIELDS,
  },
  {
    slug: "repairs-suspension-steering",
    label: "Suspension & Steering",
    icon: "🚗",
    publicPath: "/repairs/suspension-steering",
    fields: REPAIRS_SUSPENSION_STEERING_FIELDS,
  },
  {
    slug: "repairs-exhaust-emissions",
    label: "Exhaust & Emissions",
    icon: "💨",
    publicPath: "/repairs/exhaust-emissions",
    fields: REPAIRS_EXHAUST_EMISSIONS_FIELDS,
  },
  {
    slug: "repairs-engine-cooling",
    label: "Engine & Cooling",
    icon: "🌡️",
    publicPath: "/repairs/engine-cooling",
    fields: REPAIRS_ENGINE_COOLING_FIELDS,
  },
  {
    slug: "repairs-electrical",
    label: "Electrical",
    icon: "⚡",
    publicPath: "/repairs/electrical",
    fields: REPAIRS_ELECTRICAL_FIELDS,
  },
  {
    slug: "prices",
    label: "Prices",
    icon: "💷",
    publicPath: "/prices",
    fields: PRICES_FIELDS,
  },
];

/** Get a PageDef by slug */
export function getPageDef(slug: string): PageDef | undefined {
  return PAGES_CONFIG.find((p) => p.slug === slug);
}

/** Get unique section names for a page */
export function getSections(page: PageDef): string[] {
  return [...new Set(page.fields.map((f) => f.section))];
}
