export const site = {
  name: "Your Garage",
  tagline: "Book your car service online in minutes",
  description:
    "MOT, interim and full servicing, repairs, diagnostics, tyres, and brakes — trusted UK garage with transparent pricing.",
  phoneDisplay: "01234 567890",
  phoneTel: "+441234567890",
  email: "book@yourgarage.example",
  addressLines: ["245 Yeading Ln", "Hayes", "UB4 9AD"] as const,
  hours: "Mon–Fri 8:00–18:00 • Sat 8:00–13:00 • Closed Sun",
  /** WhatsApp number without + for wa.me */
  whatsappE164: "441234567890",
} as const;

export function waUrl(message?: string) {
  const base = `https://wa.me/${site.whatsappE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
