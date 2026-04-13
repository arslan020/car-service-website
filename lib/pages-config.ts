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
];

/** Get a PageDef by slug */
export function getPageDef(slug: string): PageDef | undefined {
  return PAGES_CONFIG.find((p) => p.slug === slug);
}

/** Get unique section names for a page */
export function getSections(page: PageDef): string[] {
  return [...new Set(page.fields.map((f) => f.section))];
}
