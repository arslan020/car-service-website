import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.mariestonservicecentre.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // No `%s | site name` template — every page already brands its own title,
  // the template was doubling the name ("… | Marieston | Marieston Service Centre")
  title: `${site.name} | Book MOT & car servicing online`,
  description: site.description,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    url: siteUrl,
    title: `${site.name} | Book MOT & car servicing online`,
    description: site.description,
    images: [{ url: "/updated-logo.png", alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Book MOT & car servicing online`,
    description: site.description,
    images: ["/updated-logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#business`,
  name: site.name,
  url: siteUrl,
  telephone: site.phoneTel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressLines[0],
    addressLocality: site.addressLines[1],
    postalCode: site.addressLines[2],
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "££",
  image: `${siteUrl}/updated-logo.png`,
  sameAs: [`https://wa.me/${site.whatsappE164}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PFFK3WFMGF" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PFFK3WFMGF');
          `}
        </Script>
        <JsonLd data={localBusinessSchema} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
