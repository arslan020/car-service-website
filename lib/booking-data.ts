export type ServiceOption = { id: string; label: string; hint?: string };

export const SERVICE_TYPES: ServiceOption[] = [
  { id: "interim", label: "Interim service", hint: "Oil, filters, checks" },
  { id: "full", label: "Full service", hint: "Comprehensive scheduled care" },
  { id: "major", label: "Major service", hint: "Larger scheduled items" },
  { id: "mot", label: "MOT test" },
  { id: "mot_service", label: "MOT + service package" },
  { id: "oil", label: "Oil change" },
  { id: "brakes", label: "Brake service" },
  { id: "tyres", label: "Tyres" },
  { id: "battery", label: "Battery replacement" },
  { id: "ac", label: "Air conditioning service" },
  { id: "diagnostics", label: "Engine diagnostics" },
  { id: "suspension", label: "Suspension / steering checks" },
  { id: "clutch", label: "Clutch repairs" },
  { id: "exhaust", label: "Exhaust repairs" },
  { id: "timing", label: "Timing belt / chain" },
  { id: "dpf", label: "DPF cleaning" },
  { id: "general", label: "General repairs" },
  { id: "ppi", label: "Pre-purchase inspection" },
  { id: "seasonal", label: "Seasonal check" },
  { id: "fleet", label: "Fleet servicing" },
];

export const ADD_ONS: ServiceOption[] = [
  { id: "collect_deliver", label: "Collection & delivery" },
  { id: "pickup_dropoff", label: "Pick-up and drop-off" },
  { id: "courtesy", label: "Courtesy car" },
  { id: "same_day", label: "Same-day service (if available)" },
  { id: "oil_upgrade", label: "Engine oil upgrade" },
  { id: "air_filter", label: "Air filter replacement" },
  { id: "pollen_filter", label: "Pollen (cabin) filter" },
  { id: "spark_plugs", label: "Spark plugs" },
  { id: "brake_fluid", label: "Brake fluid change" },
  { id: "alignment", label: "Wheel alignment" },
  { id: "wipers", label: "Wiper replacement" },
];
