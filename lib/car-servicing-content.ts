import { fl, type ContentMap } from "./page-content";

const INTERIM_FALLBACK = [
  "Engine oil & filter change",
  "Air filter inspection",
  "Brake fluid level check",
  "Coolant level check",
  "Battery check",
  "Tyre condition & pressure",
  "Lights & electrics check",
  "Wiper blade inspection",
] as const;

const FULL_FALLBACK = [
  "Everything in Oil Service",
  "Air filter replacement",
  "Fuel filter inspection",
  "Brake pad & disc measurement",
  "Suspension & steering inspection",
  "Exhaust system check",
  "60-point vehicle health check",
] as const;

const MAJOR_FALLBACK = [
  "Everything in Full Service",
  "Spark plugs replacement",
  "Timing belt inspection (if due)",
  "Coolant flush (if due)",
  "Comprehensive multi-point check",
  "Full road test & report",
] as const;

const BRAKE_FLUID_FALLBACK = [
  "Drain old, contaminated brake fluid",
  "Refill with correct DOT-spec brake fluid",
  "Bleed all four brake lines to remove air",
  "Check brake pedal feel & response",
  "Visual inspection of lines, hoses & callipers",
  "Written report on brake system condition",
] as const;

export function buildCarServicingTiers(c: ContentMap) {
  const interimIncludes = fl(c, "tier_interim_includes", INTERIM_FALLBACK);
  const fullIncludes = fl(c, "tier_full_includes", FULL_FALLBACK);
  const majorIncludes = fl(c, "tier_major_includes", MAJOR_FALLBACK);
  const brakeFluidIncludes = fl(c, "tier_bf_includes", BRAKE_FLUID_FALLBACK);

  return [
    {
      id: "interim",
      title: c.tier_interim_title,
      titleKey: "tier_interim_title",
      subtitle: c.tier_interim_subtitle,
      subtitleKey: "tier_interim_subtitle",
      price: c.tier_interim_price,
      priceKey: "tier_interim_price",
      popular: false,
      includes: interimIncludes,
      includesKey: "tier_interim_includes",
      includesRaw: c.tier_interim_includes ?? "",
      showMotUpsell: true,
    },
    {
      id: "full",
      title: c.tier_full_title,
      titleKey: "tier_full_title",
      subtitle: c.tier_full_subtitle,
      subtitleKey: "tier_full_subtitle",
      price: c.tier_full_price,
      priceKey: "tier_full_price",
      popular: true,
      includes: fullIncludes,
      includesKey: "tier_full_includes",
      includesRaw: c.tier_full_includes ?? "",
      showMotUpsell: true,
    },
    {
      id: "major",
      title: c.tier_major_title,
      titleKey: "tier_major_title",
      subtitle: c.tier_major_subtitle,
      subtitleKey: "tier_major_subtitle",
      price: c.tier_major_price,
      priceKey: "tier_major_price",
      popular: false,
      includes: majorIncludes,
      includesKey: "tier_major_includes",
      includesRaw: c.tier_major_includes ?? "",
      showMotUpsell: true,
    },
    {
      id: "brake-fluid",
      title: c.tier_bf_title,
      titleKey: "tier_bf_title",
      subtitle: c.tier_bf_subtitle,
      subtitleKey: "tier_bf_subtitle",
      price: c.tier_bf_price,
      priceKey: "tier_bf_price",
      popular: false,
      includes: brakeFluidIncludes,
      includesKey: "tier_bf_includes",
      includesRaw: c.tier_bf_includes ?? "",
      showMotUpsell: false,
    },
  ];
}

export function buildCarServicingBenefits(c: ContentMap) {
  return [
    { title: c.ben_1_title, titleKey: "ben_1_title", body: c.ben_1_body, bodyKey: "ben_1_body", icon: "shield" as const },
    { title: c.ben_2_title, titleKey: "ben_2_title", body: c.ben_2_body, bodyKey: "ben_2_body", icon: "money" as const },
    { title: c.ben_3_title, titleKey: "ben_3_title", body: c.ben_3_body, bodyKey: "ben_3_body", icon: "oil" as const },
    { title: c.ben_4_title, titleKey: "ben_4_title", body: c.ben_4_body, bodyKey: "ben_4_body", icon: "chart" as const },
  ];
}
