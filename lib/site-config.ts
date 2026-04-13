export const site = {
  name: "Heston Automotive",
  tagline: "Professional garage care for every car",
  description:
    "MOT, interim and full servicing, repairs, diagnostics, tyres, and brakes — DVSA approved garage in Hayes, UB4 with transparent pricing.",
  phoneDisplay: "01234 567890",
  phoneTel: "+441234567890",
  email: "book@hestonautomotive.co.uk",
  addressLines: ["245 Yeading Ln", "Hayes", "UB4 9AD"] as const,
  hours: "Mon–Sat 10:00–20:00 • Closed Sun",
  /** WhatsApp number without + for wa.me */
  whatsappE164: "441234567890",
} as const;

export function waUrl(message?: string) {
  const base = `https://wa.me/${site.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
