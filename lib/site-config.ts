export const site = {
  name: "Marieston Service Centre",
  tagline: "Professional garage care for every car",
  description:
    "MOT, interim and full servicing, repairs, diagnostics, tyres, and brakes — DVSA approved garage in Hayes, UB4 with transparent pricing.",
  phoneDisplay: "020 8178 8031",
  phoneTel: "+442081788031",
  email: "hello@mariestonservicecentre.co.uk",
  addressLines: ["235 Yeading Lane", "Hayes", "UB4 9AD"] as const,
  hours: "Mon–Sat 9:00–18:00 • Closed Sun",
  /** WhatsApp number without + for wa.me */
  whatsappE164: "447487694578",
} as const;

export function waUrl(message?: string) {
  const base = `https://wa.me/${site.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
