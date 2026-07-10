"use client";

import Image from "next/image";
import { BUSINESS_JSONLD } from "@/lib/business-jsonld";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

const customerProtectSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Customer Protect Comprehensive Vehicle Warranty",
  provider: BUSINESS_JSONLD,
  description:
    "Customer Protect Comprehensive warranty — easing the impact of mechanical and electrical failures. Cover for all mechanical and electrical components on vehicles up to 10 years or 100,000 miles.",
  url: "https://www.mariestonservicecentre.co.uk/customer-protect-comprehensive",
};

const FONT = "Lato, Tahoma, Verdana, Segoe, sans-serif";
const GREEN = "#5eb132";
const DARK = "#373935";

// Column layout in plain CSS — the dev Tailwind pipeline misses newly added
// fractional width classes, so these are shipped with the component instead.
const COLS_CSS = `
.cpc-row{display:flex;flex-direction:column}
.cpc-w2,.cpc-w3,.cpc-w4,.cpc-w6,.cpc-w9{width:100%}
@media (min-width:768px){
.cpc-row{flex-direction:row}
.cpc-w2{width:16.6667%}
.cpc-w3{width:25%}
.cpc-w4{width:33.3333%}
.cpc-w6{width:50%}
.cpc-w9{width:75%}
}`;

function lines(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

const PARTS_IMAGES = [
  { src: "/customer-protect/alternator.png", key: 1 },
  { src: "/customer-protect/clutch.png", key: 2 },
  { src: "/customer-protect/water-pump.png", key: 3 },
  { src: "/customer-protect/brake-callipers.png", key: 4 },
] as const;

export function CustomerProtectComprehensivePageClient({ content, editable = false }: { content: ContentMap; editable?: boolean }) {
  const c = content;
  const E = (fieldKey: string, type: "text" | "textarea" = "text") => (
    <EditableText pageKey="customer-protect-comprehensive" fieldKey={fieldKey} value={c[fieldKey] ?? ""} type={type} editable={editable} />
  );

  const sectionHeading: React.CSSProperties = {
    color: "#000000",
    fontFamily: FONT,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: "120%",
    textAlign: "left",
  };
  const bulletText: React.CSSProperties = {
    color: "#000000",
    fontSize: 16,
    lineHeight: "24px",
  };
  const buttonStyle: React.CSSProperties = {
    backgroundColor: DARK,
    border: "1px solid #ffffff",
    borderRadius: 4,
    color: "#ffffff",
    fontSize: 16,
    letterSpacing: 2,
    lineHeight: "200%",
    padding: "10px 20px",
    display: "inline-block",
    textDecoration: "none",
  };

  const includesLeft = lines(c.includes_list_left);
  const includesRight = lines(c.includes_list_right);
  const notIncluded = lines(c.notincluded_list);
  const parts = PARTS_IMAGES.map((img) => ({ ...img, name: `part_${img.key}_name`, price: `part_${img.key}_price` }));

  return (
    <>
      <JsonLd data={customerProtectSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Customer Protect Comprehensive", url: "https://www.mariestonservicecentre.co.uk/customer-protect-comprehensive" },
      ]} />
    <div className="bg-white" style={{ fontFamily: FONT, color: "#000000" }}>
      <style>{COLS_CSS}</style>
      <div className="mx-auto pt-8" style={{ maxWidth: 1200 }}>

        {/* ── Logo + heading ── */}
        <div className="cpc-row items-center gap-2">
          <div className="cpc-w3">
            <Image
              src="/customer-protect/customer-protect-logo.png"
              alt="Customer Protect logo"
              width={600}
              height={240}
              style={{ width: "100%", maxWidth: 300, height: "auto", objectFit: "contain", margin: "0 auto" }}
              priority
            />
          </div>
          <div className="cpc-w9 px-4 md:pr-5">
            <h1 style={{ color: GREEN, fontFamily: FONT, fontSize: 38, fontWeight: 700, lineHeight: "120%", textAlign: "right" }}>
              {E("hero_title")}
            </h1>
            <p className="mt-2" style={{ color: "#000000", fontSize: 16, lineHeight: "120%", textAlign: "right" }}>
              {E("hero_subtitle")}
            </p>
          </div>
        </div>

        {/* ── Hero image + intro ── */}
        <div className="pt-2">
          <Image
            src="/customer-protect/comprehensive-hero.png"
            alt="Customer Protect Comprehensive"
            width={2400}
            height={800}
            style={{ width: "100%", maxWidth: 1200, height: "auto", objectFit: "contain", margin: "0 auto" }}
          />
          <div className="px-5 py-5 md:pr-8">
            <p style={{ color: "#000000", fontSize: 22, lineHeight: "33px", fontWeight: 700, textAlign: "left" }}>
              {E("intro_title")}
            </p>
            <p className="mt-4" style={{ color: "#000000", fontSize: 16, lineHeight: "24px", whiteSpace: "pre-line", textAlign: "left" }}>
              {E("intro_body", "textarea")}
            </p>
          </div>
        </div>

        {/* ── Video ── */}
        <div className="pt-1">
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/982510875?controls=0"
              title="Customer Protect Comprehensive"
              allow="fullscreen"
              allowFullScreen
              frameBorder={0}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* ── What's included (green) ── */}
        <div className="mt-3" style={{ backgroundColor: GREEN }}>
          <div className="px-5 pt-6">
            <h2 style={sectionHeading}>{E("includes_title")}</h2>
          </div>
          <div className="cpc-row gap-2 pb-4 pt-2">
            <div className="cpc-w6 px-5">
              <ul className="list-disc pl-6">
                {includesLeft.map((item) => (
                  <li key={item} style={bulletText}>
                    <EditableText pageKey="customer-protect-comprehensive" fieldKey="includes_list_left" value={c.includes_list_left ?? ""} type="textarea" editable={editable} display={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="cpc-w6 px-5">
              <ul className="list-disc pl-6">
                {includesRight.map((item) => (
                  <li key={item} style={bulletText}>
                    <EditableText pageKey="customer-protect-comprehensive" fieldKey="includes_list_right" value={c.includes_list_right ?? ""} type="textarea" editable={editable} display={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="cpc-row items-center gap-3 py-4">
          <div className="cpc-w6 p-2.5 text-center">
            <a
              href="https://customerprotect.com/customer-protect-comprehensive-exclusions/"
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
            >
              <u>{E("btn_exclusions")}</u>
            </a>
          </div>
          <div className="cpc-w6 p-2.5 text-center">
            <a
              href="https://www.flipsnack.com/ECEA8FFF8D6/ap416a-comprehensive-leaflet/full-view.html"
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
            >
              <u>{E("btn_leaflet")}</u>
            </a>
          </div>
        </div>

        {/* ── Not included (dark) ── */}
        <div className="mt-2" style={{ backgroundColor: DARK }}>
          <div className="cpc-row">
            <div className="cpc-w6 pb-4">
              <div className="px-5 pt-6">
                <h2 style={{ ...sectionHeading, color: "#ffffff" }}>{E("notincluded_title")}</h2>
              </div>
              <div className="px-5 pt-2">
                <ul className="list-disc pl-6">
                  {notIncluded.map((item) => (
                    <li key={item} style={{ ...bulletText, color: "#ffffff" }}>
                      <EditableText pageKey="customer-protect-comprehensive" fieldKey="notincluded_list" value={c.notincluded_list ?? ""} type="textarea" editable={editable} display={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cpc-w6" />
          </div>
        </div>

        {/* ── Parts costs ── */}
        <div className="px-5 pt-14">
          <h2 style={sectionHeading}>{E("costs_title")}</h2>
        </div>
        <div className="cpc-row gap-2 pt-12">
          {parts.map((part) => (
            <div key={part.key} className="cpc-w3">
              <Image
                src={part.src}
                alt={c[part.name] ?? ""}
                width={330}
                height={330}
                style={{ width: "100%", maxWidth: 165, height: "auto", objectFit: "contain", margin: "0 auto" }}
              />
              <p className="pt-6" style={{ color: "#000000", fontSize: 16, lineHeight: "120%", textAlign: "center" }}>
                {E(part.name)}
              </p>
              <h2 className="p-2.5" style={{ color: GREEN, fontFamily: FONT, fontSize: 30, fontWeight: 700, lineHeight: "120%", textAlign: "center" }}>
                {E(part.price)}
              </h2>
            </div>
          ))}
        </div>
        <div className="px-2.5 py-5">
          <p style={{ color: "#000000", fontSize: 16, lineHeight: "120%", whiteSpace: "pre-line", textAlign: "center" }}>
            {E("costs_note", "textarea")}
          </p>
        </div>

        {/* ── How to make a claim ── */}
        <div className="cpc-row items-center gap-2 pb-6 pt-16">
          <div className="cpc-w3 flex items-center justify-center">
            <Image
              src="/customer-protect/make-a-claim.png"
              alt="Make a claim"
              width={526}
              height={526}
              style={{ width: "100%", maxWidth: 263, height: "auto", objectFit: "contain", margin: "0 auto" }}
            />
          </div>
          <div className="cpc-w9">
            <div className="px-5 pt-5">
              <h2 style={sectionHeading}>{E("claim_title")}</h2>
            </div>
            <div className="px-5 py-2.5">
              <p style={{ color: "#000000", fontSize: 16, lineHeight: "24px", whiteSpace: "pre-line", textAlign: "left" }}>
                {E("claim_body", "textarea")}
              </p>
              <p className="pt-3" style={{ color: "#000000", fontSize: 16, lineHeight: "24px", fontWeight: 700, textAlign: "left" }}>
                {E("claim_phone")}
              </p>
            </div>
          </div>
        </div>

        {/* ── Badges + small print ── */}
        <div className="cpc-row items-center gap-4 px-2.5 pb-8 pt-12">
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-motor-ombudsman.png" alt="Motor Ombudsman logo" title="Motor Ombudsman logo" width={340} height={340} style={{ width: "100%", maxWidth: 170, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-smmt.png" alt="SMMT Industry Awards" title="SMMT Industry Awards" width={140} height={140} style={{ width: "100%", maxWidth: 70, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-people-love-us.png" alt="People Love Us" title="People Love Us" width={220} height={220} style={{ width: "100%", maxWidth: 110, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w2" />
          <div className="cpc-w4">
            <div className="p-2.5">
              <p style={{ color: "#555555", fontSize: 12, lineHeight: "14px", whiteSpace: "pre-line", textAlign: "left" }}>
                {E("disclaimer_product", "textarea")}
              </p>
              <p className="mt-3" style={{ color: "#555555", fontSize: 12, lineHeight: "14px", whiteSpace: "pre-line", textAlign: "left" }}>
                {E("admin_note", "textarea")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
