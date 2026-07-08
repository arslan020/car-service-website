import { site } from "@/lib/site-config";

const siteUrl = "https://www.mariestonservicecentre.co.uk";

/** Full business node for JSON-LD `provider` fields — LocalBusiness validation requires `address`. */
export const BUSINESS_JSONLD = {
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#business`,
  name: site.name,
  url: siteUrl,
  telephone: site.phoneTel,
  image: `${siteUrl}/updated-logo.png`,
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressLines[0],
    addressLocality: site.addressLines[1],
    postalCode: site.addressLines[2],
    addressCountry: "GB",
  },
} as const;
