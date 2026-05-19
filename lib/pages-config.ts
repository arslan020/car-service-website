// Page content field definitions — used by both dashboard editor and public pages.
// Keep this file client-safe (no prisma/server imports).

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
interim|Interim Service
major|Major Service
oil|Oil Change
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
Interim Service
Major Service
Oil Change
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
  T("svc_block_from_label", "Our services — price prefix", "from", "Our services"),
  T("svc_block_view_all", "Our services — view all button", "View all services", "Our services"),
  T("svc_1_title", "Featured 1 — title", "MOT Testing", "Our services"),
  A("svc_1_desc", "Featured 1 — description", "DVSA approved, same-day slots available", "Our services"),
  T("svc_1_price", "Featured 1 — price display", "£54", "Our services"),
  T("svc_2_title", "Featured 2 — title", "Full Service", "Our services"),
  A("svc_2_desc", "Featured 2 — description", "Oil, filters & comprehensive 60-point check", "Our services"),
  T("svc_2_price", "Featured 2 — price (or £???)", "£???", "Our services"),
  T("svc_3_title", "Featured 3 — title", "Oil Change", "Our services"),
  A("svc_3_desc", "Featured 3 — description", "Premium oil and filter replacement", "Our services"),
  T("svc_3_price", "Featured 3 — price", "£???", "Our services"),
  T("svc_4_title", "Featured 4 — title", "Battery Check", "Our services"),
  A("svc_4_desc", "Featured 4 — description", "Testing, charging, and replacement", "Our services"),
  T("svc_4_price", "Featured 4 — price", "£???", "Our services"),
  T("brands_title", "Brands row — heading", "Brands We Service", "Brands"),
  T("hiw_kicker", "How it works — kicker", "Simple process", "How it works"),
  T("hiw_title", "How it works — heading", "How It Works", "How it works"),
  T("hiw_1_title", "Step 1 — title", "Choose Your Service", "How it works"),
  A("hiw_1_body", "Step 1 — text", "Select your service and a preferred time slot in just a few minutes.", "How it works"),
  T("hiw_2_title", "Step 2 — title", "We Confirm by Text or Call", "How it works"),
  A("hiw_2_body", "Step 2 — text", "Confirmation within the hour — no chasing, no waiting on hold.", "How it works"),
  T("hiw_3_title", "Step 3 — title", "Drop Off & Relax", "How it works"),
  A("hiw_3_body", "Step 3 — text", "Arrive at your time or use our collection service if arranged.", "How it works"),
  T("hiw_4_title", "Step 4 — title", "Drive Away Happy", "How it works"),
  A("hiw_4_body", "Step 4 — text", "Full paperwork provided. We text you when ready, you pay on collection.", "How it works"),
  T("find_title", "Find us — heading", "Find Us", "Find us"),
  A("find_address_line", "Find us — address line under heading", "We're located at 235 Yeading Ln, Hayes, UB4 9AD", "Find us"),
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
      T("svc_mot_price", "Card MOT — price", "From £54", "Service grid"),
      T("svc_cs_eyebrow", "Card Car Servicing — eyebrow", "Scheduled", "Service grid"),
      T("svc_cs_title", "Card Car Servicing — title", "Car Servicing", "Service grid"),
      A("svc_cs_desc", "Card Car Servicing — description", "Interim, full, and major servicing tailored to your make and model. Manufacturer-scheduled checks keep your warranty valid and your car running smoothly.", "Service grid"),
      T("svc_cs_price", "Card Car Servicing — price", "from £X", "Service grid"),
      T("svc_rep_eyebrow", "Card Repairs — eyebrow", "All Makes", "Service grid"),
      T("svc_rep_title", "Card Repairs — title", "Repairs", "Service grid"),
      A("svc_rep_desc", "Card Repairs — description", "Brakes, clutch, exhausts, suspension, steering and more. We diagnose first, give you a clear quote, and only proceed with your approval — no surprises.", "Service grid"),
      T("svc_rep_price", "Card Repairs — price", "Quote provided", "Service grid"),
      T("svc_diag_eyebrow", "Card Diagnostics — eyebrow", "OBD & Live Data", "Service grid"),
      T("svc_diag_title", "Card Diagnostics — title", "Diagnostics", "Service grid"),
      A("svc_diag_desc", "Card Diagnostics — description", "Engine warning lights, fault codes, and intermittent issues. We use professional-grade diagnostic equipment to trace the root cause — not just clear the light.", "Service grid"),
      T("svc_diag_price", "Card Diagnostics — price", "from £X", "Service grid"),
      T("svc_oil_eyebrow", "Card Oil — eyebrow", "Premium Oil", "Service grid"),
      T("svc_oil_title", "Card Oil — title", "Oil Change", "Service grid"),
      A("svc_oil_desc", "Card Oil — description", "Right-spec oil and filter for your engine. Fast turnaround — often while you wait. Helps fuel economy and protects against premature wear.", "Service grid"),
      T("svc_oil_price", "Card Oil — price", "from £X", "Service grid"),
      T("svc_brakes_eyebrow", "Card Brakes — eyebrow", "Safety First", "Service grid"),
      T("svc_brakes_title", "Card Brakes — title", "Brakes & Tyres", "Service grid"),
      A("svc_brakes_desc", "Card Brakes — description", "Brake pads, discs, callipers, and tyre fitting or replacement. We check tread depth and brake performance and advise only when action is genuinely needed.", "Service grid"),
      T("svc_brakes_price", "Card Brakes — price", "from £X", "Service grid"),
      T("why_kicker", "Why us — kicker", "Why Marieston Service Centre", "Why us"),
      T("why_title", "Why us — heading", "The difference you'll notice", "Why us"),
      T("why_1_title", "Why card 1 — title", "Transparent pricing", "Why us"),
      A("why_1_body", "Why card 1 — text", "You get a clear quote before we touch the car. No hidden extras, no surprises at collection.", "Why us"),
      T("why_2_title", "Why card 2 — title", "DVSA approved", "Why us"),
      A("why_2_body", "Why card 2 — text", "Authorised MOT testing station with qualified technicians working to DVSA standards.", "Why us"),
      T("why_3_title", "Why card 3 — title", "Collection & delivery", "Why us"),
      A("why_3_body", "Why card 3 — text", "Can't get to us? We can collect your car, carry out the work, and return it when ready.", "Why us"),
      T("why_4_title", "Why card 4 — title", "All makes & models", "Why us"),
      A("why_4_body", "Why card 4 — text", "From city cars to SUVs and light commercials. Foreign plates welcome.", "Why us"),
      T("cta_band_kicker", "Bottom CTA — kicker", "Ready to book?", "Bottom CTA"),
      T("cta_band_title", "Bottom CTA — heading", "Get your car booked in today", "Bottom CTA"),
      T("cta_band_primary", "Bottom CTA — primary button", "Book online now", "Bottom CTA"),
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
        label: "Price Badge (e.g. \"from £54\")",
        type: "text",
        default: "From £54",
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
          "Our MOT starts from £54 — the government maximum fee. We never charge more than the legal cap.",
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
      T("stat_4_label", "Stat tile 4 — label", "Partial Retest if We Do Repairs", "Stat tiles"),
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
          "Manufacturer-schedule servicing tailored to your make and model. Helps reliability, fuel economy, and resale value — with no dealership prices.",
        section: "Hero",
      },
      {
        key: "tier_interim_price",
        label: "Interim Service — Price",
        type: "text",
        default: "from £X",
        section: "Service Tier Prices",
      },
      {
        key: "tier_full_price",
        label: "Full Service — Price",
        type: "text",
        default: "from £X",
        section: "Service Tier Prices",
      },
      {
        key: "tier_major_price",
        label: "Major Service — Price",
        type: "text",
        default: "from £X",
        section: "Service Tier Prices",
      },
      T("hero_eyebrow", "Hero — kicker", "Scheduled servicing", "Hero"),
      T("btn_book", "Hero — book button", "Book a service", "Hero"),
      T("btn_whatsapp", "Hero — WhatsApp button", "WhatsApp us", "Hero"),
      T("tier_section_kicker", "Tiers section — kicker", "Service levels", "Service tiers"),
      T("tier_section_title", "Tiers section — heading", "Choose your service", "Service tiers"),
      T("tier_popular_badge", "“Most popular” badge text", "Most popular", "Service tiers"),
      T("tier_interim_title", "Interim — card title", "Interim Service", "Service tiers"),
      T("tier_interim_subtitle", "Interim — subtitle", "Every 6 months or 6,000 miles", "Service tiers"),
      A(
        "tier_interim_includes",
        "Interim — bullet lines (one per line)",
        `Engine oil & filter change
Air filter inspection
Brake fluid level check
Coolant level check
Battery check
Tyre condition & pressure
Lights & electrics check
Wiper blade inspection`,
        "Service tiers",
      ),
      T("tier_full_title", "Full — card title", "Full Service", "Service tiers"),
      T("tier_full_subtitle", "Full — subtitle", "Every 12 months or 12,000 miles", "Service tiers"),
      A(
        "tier_full_includes",
        "Full — bullet lines (one per line)",
        `Everything in Interim Service
Air filter replacement
Pollen / cabin filter check
Fuel filter inspection
Brake pad & disc measurement
Suspension & steering inspection
Exhaust system check
60-point vehicle health check`,
        "Service tiers",
      ),
      T("tier_major_title", "Major — card title", "Major Service", "Service tiers"),
      T("tier_major_subtitle", "Major — subtitle", "As per manufacturer schedule", "Service tiers"),
      A(
        "tier_major_includes",
        "Major — bullet lines (one per line)",
        `Everything in Full Service
Spark plugs replacement
Timing belt inspection (if due)
Gearbox oil check
Differential oil check
Brake fluid flush
Coolant flush (if due)
Full road test & report`,
        "Service tiers",
      ),
      T("tier_book_prefix", "Tier cards — book button prefix", "Book", "Service tiers"),
      T("benefits_kicker", "Benefits — kicker", "Why service regularly", "Benefits"),
      T("benefits_title", "Benefits — heading", "The benefits", "Benefits"),
      T("ben_1_title", "Benefit 1 — title", "Protects your warranty", "Benefits"),
      A("ben_1_body", "Benefit 1 — text", "Manufacturer-schedule servicing maintains your vehicle warranty — even at independent garages.", "Benefits"),
      T("ben_2_title", "Benefit 2 — title", "Saves money long-term", "Benefits"),
      A("ben_2_body", "Benefit 2 — text", "Regular servicing catches small problems before they become expensive repairs.", "Benefits"),
      T("ben_3_title", "Benefit 3 — title", "Improves fuel economy", "Benefits"),
      A("ben_3_body", "Benefit 3 — text", "Fresh oil, clean filters and correct tyre pressures all contribute to better MPG.", "Benefits"),
      T("ben_4_title", "Benefit 4 — title", "Boosts resale value", "Benefits"),
      A("ben_4_body", "Benefit 4 — text", "A full service history is one of the most valuable things you can have when selling your car.", "Benefits"),
      T("bottom_kicker", "Bottom CTA — kicker", "Book today", "Bottom CTA"),
      T("bottom_title", "Bottom CTA — heading", "Ready to book your service?", "Bottom CTA"),
      A("bottom_body", "Bottom CTA — intro paragraph", "Typical service time 1.5–3 hours. Drop off and collect, or ask about our collection service.", "Bottom CTA"),
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
      T("collection_kicker", "Collection — kicker", "Collection service", "Reach us"),
      A(
        "collection_body",
        "Collection — paragraph (plain text)",
        "Can't make it to us? We offer a free collection and delivery service for customers in the local area. Drop us a WhatsApp or give us a call to arrange — we'll come to you, carry out the work, and bring it back when ready.",
        "Reach us"
      ),
      T("map_kicker", "Map — kicker", "Find us", "Map"),
      T("map_iframe_title", "Map — iframe title", "Marieston Service Centre — 235 Yeading Ln, Hayes UB4 9AD", "Map"),
      A(
        "map_embed_src",
        "Map — iframe src (full URL)",
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586!2d-0.399722!3d51.5268571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766dd076f12283%3A0x9b182de007f87a84!2sMarieston%20Service%20Centre!5e0!3m2!1sen!2suk!4v1715769600000!5m2!1sen!2suk",
        "Map"
      ),
      T("map_caption", "Map — caption under frame", "235 Yeading Ln, Hayes, UB4 9AD — free parking on site", "Map"),
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
      { key: "faq_1_a", label: "FAQ 1 — Answer", type: "textarea", default: "Use your manufacturer schedule and mileage. If you are unsure, book a free health check or call us — we will gladly recommend whether you need an interim, full, or major service.", section: "FAQs" },
      { key: "faq_2_q", label: "FAQ 2 — Question", type: "text", default: "How long does an MOT or full service take?", section: "FAQs" },
      { key: "faq_2_a", label: "FAQ 2 — Answer", type: "textarea", default: "A standard MOT test takes around 45 to 60 minutes. A full service typically takes 1.5–3 hours depending on the vehicle and our findings. We will give you a clear time window when you book.", section: "FAQs" },
      { key: "faq_3_q", label: "FAQ 3 — Question", type: "text", default: "Can I book an MOT and service together?", section: "FAQs" },
      { key: "faq_3_a", label: "FAQ 3 — Answer", type: "textarea", default: "Yes! We highly recommend it as it saves you time and money. Just choose the MOT + Service package in our online booking flow.", section: "FAQs" },
      { key: "faq_4_q", label: "FAQ 4 — Question", type: "text", default: "Do you use genuine parts and are they under warranty?", section: "FAQs" },
      { key: "faq_4_a", label: "FAQ 4 — Answer", type: "textarea", default: "Absolutely. We use high-quality OE (Original Equipment) or equivalent replacement parts. All parts and labor are fully guaranteed, giving you complete peace of mind.", section: "FAQs" },
      { key: "faq_5_q", label: "FAQ 5 — Question", type: "text", default: "What happens if extra work is needed or my car fails its MOT?", section: "FAQs" },
      { key: "faq_5_a", label: "FAQ 5 — Answer", type: "textarea", default: "If we find any issues during a service or an MOT failure, we will concisely explain the problem and provide a no-obligation quote. We never proceed with extra work without your explicit approval. No surprises.", section: "FAQs" },
      { key: "faq_6_q", label: "FAQ 6 — Question", type: "text", default: "Do you offer a collection and delivery service?", section: "FAQs" },
      { key: "faq_6_a", label: "FAQ 6 — Answer", type: "textarea", default: "Yes! We offer a local collection and delivery service to make taking care of your car as convenient as possible. Just let us know when making your booking.", section: "FAQs" },
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
      { key: "faq_12_a", label: "FAQ 12 — Answer", type: "textarea", default: "We do not currently offer tyre supply and fitting, but this service will be available soon. Please contact us for more information or to be notified when it becomes available.", section: "FAQs" },
      { key: "cta_title", label: "Bottom CTA Title", type: "text", default: "Still have questions?", section: "Bottom CTA" },
      { key: "cta_subtitle", label: "Bottom CTA Subtitle", type: "textarea", default: "Cant find the answer you are looking for? Our team is ready to assist you.", section: "Bottom CTA" },
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
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Air Con Regas & Service", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Full air conditioning regas and system health check. Get your cabin cool and fresh again — recommended every 2 years.", section: "Hero" },
      T("hero_eyebrow", "Hero — kicker", "Air conditioning", "Hero"),
      T("btn_book", "Hero — book button", "Book air-con service", "Hero"),
      T("btn_whatsapp", "Hero — WhatsApp", "WhatsApp us", "Hero"),
      T("bottom_kicker", "Bottom CTA — kicker", "Stay comfortable", "Bottom CTA"),
      T("bottom_title", "Bottom CTA — heading", "Book your regas or check", "Bottom CTA"),
      A("bottom_body", "Bottom CTA — paragraph", "Keep your cabin cool and your system healthy. Book online or call us.", "Bottom CTA"),
      T("bottom_btn", "Bottom CTA — button", "Book online", "Bottom CTA"),
    ],
  },
  {
    slug: "battery-check",
    label: "Battery Check",
    icon: "🔋",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Battery Check", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "A full battery and charging system test using professional diagnostic equipment. Know your battery's health before it leaves you stranded.", section: "Hero" },
    ],
  },
  {
    slug: "oil-change",
    label: "Oil Change",
    icon: "🛢️",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Oil Change", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Right-spec oil and filter for your engine. Fast turnaround — often while you wait. Helps fuel economy and protects against premature wear.", section: "Hero" },
    ],
  },
  {
    slug: "car-servicing-interim",
    label: "Interim Service",
    icon: "🔧",
    publicPath: "/car-servicing/interim",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Interim Service", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "A thorough mid-year health check to keep oil fresh, fluids topped up, and potential problems caught early — ideal for high-mileage drivers.", section: "Hero" },
      { key: "faq_1_q", label: "FAQ 1 — Question", type: "text", default: "Who is an interim service for?", section: "FAQs" },
      { key: "faq_1_a", label: "FAQ 1 — Answer", type: "textarea", default: "Drivers covering more than 12,000 miles a year benefit most — the extra oil change keeps the engine protected between annual full services.", section: "FAQs" },
      { key: "faq_2_q", label: "FAQ 2 — Question", type: "text", default: "Does it protect my warranty?", section: "FAQs" },
      { key: "faq_2_a", label: "FAQ 2 — Answer", type: "textarea", default: "Yes. UK law (Block Exemption Regulation) means manufacturer warranties remain valid when serviced at an independent garage using the correct oil grade and parts.", section: "FAQs" },
      { key: "faq_3_q", label: "FAQ 3 — Question", type: "text", default: "How long does it take?", section: "FAQs" },
      { key: "faq_3_a", label: "FAQ 3 — Answer", type: "textarea", default: "Usually 1–1.5 hours. Many customers drop off and collect the same morning.", section: "FAQs" },
      { key: "faq_4_q", label: "FAQ 4 — Question", type: "text", default: "Will I get a service stamp?", section: "FAQs" },
      { key: "faq_4_a", label: "FAQ 4 — Answer", type: "textarea", default: "Yes — we provide a stamped service record for your handbook and can update digital service records where supported.", section: "FAQs" },
    ],
  },
  {
    slug: "car-servicing-full",
    label: "Full Service",
    icon: "⚙️",
    publicPath: "/car-servicing/full",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Full Service", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "The UK standard annual service — comprehensive, warranty-safe, and stamped. Covers everything from oil and filters to a full 60-point vehicle health check.", section: "Hero" },
      { key: "faq_1_q", label: "FAQ 1 — Question", type: "text", default: "What is a Full Service?", section: "FAQs" },
      { key: "faq_1_a", label: "FAQ 1 — Answer", type: "textarea", default: "A Full Service is the UK standard annual car service covering all the checks an Interim does, plus filter replacements, brake measurements, and a comprehensive 60-point health check of your vehicle.", section: "FAQs" },
      { key: "faq_2_q", label: "FAQ 2 — Question", type: "text", default: "How often should I have a Full Service?", section: "FAQs" },
      { key: "faq_2_a", label: "FAQ 2 — Answer", type: "textarea", default: "Every 12 months or 12,000 miles — whichever comes first. If you do high mileage, combine it with an Interim at 6 months.", section: "FAQs" },
      { key: "faq_3_q", label: "FAQ 3 — Question", type: "text", default: "Will it keep my manufacturer warranty valid?", section: "FAQs" },
      { key: "faq_3_a", label: "FAQ 3 — Answer", type: "textarea", default: "Yes. Under the UK Block Exemption Regulation, having your car serviced at an independent garage using the manufacturer-specified oil and parts does not void your warranty.", section: "FAQs" },
      { key: "faq_4_q", label: "FAQ 4 — Question", type: "text", default: "Do I get a service stamp?", section: "FAQs" },
      { key: "faq_4_a", label: "FAQ 4 — Answer", type: "textarea", default: "Yes — we stamp your service book and can update digital service histories (Volkswagen Group, Ford, BMW etc.) where the system allows.", section: "FAQs" },
      { key: "faq_5_q", label: "FAQ 5 — Question", type: "text", default: "How long does a Full Service take?", section: "FAQs" },
      { key: "faq_5_a", label: "FAQ 5 — Answer", type: "textarea", default: "Typically 2–3 hours. We text you when your car is ready for collection.", section: "FAQs" },
    ],
  },
  {
    slug: "car-servicing-major",
    label: "Major Service",
    icon: "🔩",
    publicPath: "/car-servicing/major",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Major Service", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "The most comprehensive service — everything in a Full Service plus spark plugs, brake fluid flush, coolant change, and a full road test.", section: "Hero" },
      { key: "faq_1_q", label: "FAQ 1 — Question", type: "text", default: "What is a Major Service?", section: "FAQs" },
      { key: "faq_1_a", label: "FAQ 1 — Answer", type: "textarea", default: "A Major Service is the most comprehensive annual service, following your car's manufacturer schedule. It includes everything in a Full Service plus spark plugs, brake fluid flush, coolant change, and a full road test — typically due every 2 years or 24,000 miles.", section: "FAQs" },
      { key: "faq_2_q", label: "FAQ 2 — Question", type: "text", default: "How is it different from a Full Service?", section: "FAQs" },
      { key: "faq_2_a", label: "FAQ 2 — Answer", type: "textarea", default: "A Full Service covers the standard 12-month checks. A Major Service adds component replacements that are due on a longer cycle — spark plugs, fluids that degrade over time, and a manufacturer-schedule compliance check.", section: "FAQs" },
      { key: "faq_3_q", label: "FAQ 3 — Question", type: "text", default: "Does this protect my manufacturer warranty?", section: "FAQs" },
      { key: "faq_3_a", label: "FAQ 3 — Answer", type: "textarea", default: "Yes. UK Block Exemption Regulation law means using a qualified independent garage with correct spec parts and oils keeps your warranty fully valid.", section: "FAQs" },
      { key: "faq_4_q", label: "FAQ 4 — Question", type: "text", default: "How long does a Major Service take?", section: "FAQs" },
      { key: "faq_4_a", label: "FAQ 4 — Answer", type: "textarea", default: "Typically 3–4 hours depending on the vehicle. We will always confirm timing when you book and text you when the car is ready.", section: "FAQs" },
      { key: "faq_5_q", label: "FAQ 5 — Question", type: "text", default: "Can I combine it with an MOT?", section: "FAQs" },
      { key: "faq_5_a", label: "FAQ 5 — Answer", type: "textarea", default: "Absolutely — many customers book both together. It saves a separate trip and we can usually fit both in one visit.", section: "FAQs" },
    ],
  },
  {
    slug: "repairs-brakes",
    label: "Brakes",
    icon: "🛑",
    publicPath: "/repairs/brakes",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Brakes & Tyres", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Brakes are your car's most important safety system. We diagnose, quote clearly, and only replace what genuinely needs doing — no upselling.", section: "Hero" },
    ],
  },
  {
    slug: "repairs-clutch-gearbox",
    label: "Clutch & Gearbox",
    icon: "⚙️",
    publicPath: "/repairs/clutch-gearbox",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Clutch & Gearbox", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Slipping clutch, stiff biting point, or grinding gears — we diagnose the root cause and give you a clear quote before any work starts.", section: "Hero" },
    ],
  },
  {
    slug: "repairs-suspension-steering",
    label: "Suspension & Steering",
    icon: "🚗",
    publicPath: "/repairs/suspension-steering",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Suspension & Steering", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Knocking, pulling, or vague steering — we inspect, diagnose, and repair. Wheel alignment included after every relevant repair.", section: "Hero" },
    ],
  },
  {
    slug: "repairs-exhaust-emissions",
    label: "Exhaust & Emissions",
    icon: "💨",
    publicPath: "/repairs/exhaust-emissions",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Exhaust & Emissions", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Blowing exhaust, DPF warning, or emissions failure — we repair or replace to get you through your MOT and running cleanly.", section: "Hero" },
    ],
  },
  {
    slug: "repairs-engine-cooling",
    label: "Engine & Cooling",
    icon: "🌡️",
    publicPath: "/repairs/engine-cooling",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Engine & Cooling", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Overheating, coolant leaks, timing issues — we diagnose and repair engine and cooling system faults before they become expensive.", section: "Hero" },
    ],
  },
  {
    slug: "repairs-electrical",
    label: "Electrical",
    icon: "⚡",
    publicPath: "/repairs/electrical",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Electrical Repairs", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "From faulty sensors and warning lights to wiring faults and ECU issues — we trace and fix electrical problems properly.", section: "Hero" },
    ],
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
