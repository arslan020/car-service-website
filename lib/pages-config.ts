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

export const PAGES_CONFIG: PageDef[] = [
  {
    slug: "services",
    label: "Services",
    icon: "🔧",
    fields: [
      {
        key: "hero_title",
        label: "Page Title",
        type: "text",
        default: "Everything we offer",
        section: "Hero",
      },
      {
        key: "hero_subtitle",
        label: "Subtitle",
        type: "textarea",
        default:
          "From scheduled servicing and MOTs to diagnostics and repairs — all under one roof in Hayes.",
        section: "Hero",
      },
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
        default: "from £54",
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
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    icon: "📞",
    fields: [
      {
        key: "hero_subtitle",
        label: "Hero Description",
        type: "textarea",
        default:
          "Call us, WhatsApp, or book online. We respond as soon as we're off the ramp.",
        section: "Hero",
      },
      {
        key: "collection_note",
        label: "Collection Service Note",
        type: "textarea",
        default:
          "Can't make it to us? We offer a collection and delivery service for customers in the local area. Ask us when you book or give us a call to arrange.",
        section: "Other",
      },
    ],
  },
  {
    slug: "faqs",
    label: "FAQs",
    icon: "❓",
    fields: [
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
      { key: "faq_5_a", label: "FAQ 5 — Answer", type: "textarea", default: "If we find any issues during a service or an MOT failure, we will systematically explain the problem and provide a no-obligation quote. We never proceed with extra work without your explicit approval. No surprises.", section: "FAQs" },
      { key: "faq_6_q", label: "FAQ 6 — Question", type: "text", default: "Do you offer a collection and delivery service?", section: "FAQs" },
      { key: "faq_6_a", label: "FAQ 6 — Answer", type: "textarea", default: "Yes! We offer a local collection and delivery service to make taking care of your car as convenient as possible. Just let us know when making your booking.", section: "FAQs" },
      { key: "faq_7_q", label: "FAQ 7 — Question", type: "text", default: "How much does a service or MOT cost?", section: "FAQs" },
      { key: "faq_7_a", label: "FAQ 7 — Answer", type: "textarea", default: "Our prices are transparent and shown upfront when you book online — no hidden fees. The final cost only changes if we discover additional work needed, and we will always contact you for approval before proceeding.", section: "FAQs" },
      { key: "faq_8_q", label: "FAQ 8 — Question", type: "text", default: "What payment methods do you accept?", section: "FAQs" },
      { key: "faq_8_a", label: "FAQ 8 — Answer", type: "textarea", default: "We accept all major credit and debit cards, as well as cash. Payment is taken on collection of your vehicle once all work is completed and explained to you.", section: "FAQs" },
      { key: "faq_9_q", label: "FAQ 9 — Question", type: "text", default: "Is there somewhere I can wait while my car is being worked on?", section: "FAQs" },
      { key: "faq_9_a", label: "FAQ 9 — Answer", type: "textarea", default: "Yes, we have a comfortable waiting area with free Wi-Fi and refreshments. Alternatively, if the job is longer, you are welcome to drop your car off and collect it later.", section: "FAQs" },
      { key: "faq_10_q", label: "FAQ 10 — Question", type: "text", default: "Do you work on electric and hybrid vehicles?", section: "FAQs" },
      { key: "faq_10_a", label: "FAQ 10 — Answer", type: "textarea", default: "Yes, we service and maintain electric and hybrid vehicles. Our technicians are trained to work on EV and hybrid systems safely and to manufacturer standards.", section: "FAQs" },
      { key: "faq_11_q", label: "FAQ 11 — Question", type: "text", default: "Can you carry out a diagnostic check on my car?", section: "FAQs" },
      { key: "faq_11_a", label: "FAQ 11 — Answer", type: "textarea", default: "Absolutely. We use the latest diagnostic equipment to read fault codes and identify issues across all makes and models. A diagnostic check is a great first step if a warning light has appeared on your dashboard.", section: "FAQs" },
      { key: "faq_12_q", label: "FAQ 12 — Question", type: "text", default: "Do you supply and fit tyres?", section: "FAQs" },
      { key: "faq_12_a", label: "FAQ 12 — Answer", type: "textarea", default: "Yes, we supply and fit a wide range of tyres to suit all budgets — from premium to budget brands. We can advise on the best option for your vehicle and driving needs.", section: "FAQs" },
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
    ],
  },
  {
    slug: "air-con",
    label: "Air Con",
    icon: "❄️",
    fields: [
      { key: "hero_title", label: "Page Title", type: "text", default: "Air Con Regas & Service", section: "Hero" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea", default: "Full air conditioning regas and system health check. Get your cabin cool and fresh again — recommended every 2 years.", section: "Hero" },
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
