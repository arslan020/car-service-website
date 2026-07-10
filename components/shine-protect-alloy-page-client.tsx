"use client";

import Image from "next/image";
import { BUSINESS_JSONLD } from "@/lib/business-jsonld";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

const shineProtectAlloySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Shine! Protect Alloy Maintenance Plan",
  provider: BUSINESS_JSONLD,
  description:
    "Shine! Protect Alloy maintenance plan — keep your alloy wheels in showroom condition. Convenient mobile repairs to minor chips, scuffs and scratches on your alloy wheels.",
  url: "https://www.mariestonservicecentre.co.uk/shine-protect-alloy",
};

const FONT = "Lato, Tahoma, Verdana, Segoe, sans-serif";

// Column layout in plain CSS — the dev Tailwind pipeline misses newly added
// fractional width classes, so these are shipped with the component instead.
const COLS_CSS = `
.cpc-row{display:flex;flex-direction:column}
.cpc-w2,.cpc-w4,.cpc-w6{width:100%}
@media (min-width:768px){
.cpc-row{flex-direction:row}
.cpc-w2{width:16.6667%}
.cpc-w4{width:33.3333%}
.cpc-w6{width:50%}
}`;

function lines(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ShineProtectAlloyPageClient({ content, editable = false }: { content: ContentMap; editable?: boolean }) {
  const c = content;
  const E = (fieldKey: string, type: "text" | "textarea" = "text") => (
    <EditableText pageKey="shine-protect-alloy" fieldKey={fieldKey} value={c[fieldKey] ?? ""} type={type} editable={editable} />
  );

  const heading: React.CSSProperties = {
    color: "#26b4b0",
    fontFamily: FONT,
    fontSize: 23,
    fontWeight: 700,
    lineHeight: "120%",
    textAlign: "left",
  };
  const bodyText: React.CSSProperties = {
    color: "#000000",
    fontSize: 16,
    lineHeight: "24px",
    whiteSpace: "pre-line",
  };

  const includes = lines(c.includes_list);

  return (
    <>
      <JsonLd data={shineProtectAlloySchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Shine! Protect Alloy", url: "https://www.mariestonservicecentre.co.uk/shine-protect-alloy" },
      ]} />
    <div className="bg-white" style={{ fontFamily: FONT, color: "#000000" }}>
      <style>{COLS_CSS}</style>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>

        {/* ── Logo ── */}
        <div className="px-5 pt-6">
          <Image
            src="/shine-protect-alloy/shine-protect-alloy-logo.jpg"
            alt="Shine! Protect Alloy Logo"
            title="Shine! Protect Alloy Logo"
            width={360}
            height={200}
            style={{ width: "100%", maxWidth: 180, height: "auto", objectFit: "contain" }}
            priority
          />
        </div>

        {/* ── Tagline ── */}
        <div className="px-5 pt-4">
          <h1 style={heading}>{E("hero_tagline")}</h1>
        </div>

        {/* ── Intro ── */}
        <div className="px-5 py-3">
          <p style={{ color: "#000000", fontSize: 16, lineHeight: "19px", whiteSpace: "pre-line", textAlign: "left" }}>
            {E("hero_intro", "textarea")}
          </p>
        </div>

        {/* ── Row: What does it do / Plan includes + video ── */}
        <div className="cpc-row gap-2 py-2">
          <div className="cpc-w6">
            <h2 className="px-5 py-1" style={heading}>{E("what_title")}</h2>
            <div className="px-5 py-2.5">
              <p style={bodyText}>{E("what_body", "textarea")}</p>
            </div>
            <h2 className="px-5 py-1" style={heading}>{E("includes_title")}</h2>
            <div className="px-5 py-2.5">
              <ul className="list-disc pl-6">
                {includes.map((item) => (
                  <li key={item} style={{ ...bodyText, whiteSpace: "normal" }}>
                    <EditableText pageKey="shine-protect-alloy" fieldKey="includes_list" value={c.includes_list ?? ""} type="textarea" editable={editable} display={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="cpc-w6">
            <div className="pt-1.5">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1129813432"
                  title="Shine! Protect Alloy"
                  allow="fullscreen"
                  allowFullScreen
                  frameBorder={0}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Row: How to submit / Nationwide coverage + image ── */}
        <div className="cpc-row gap-2 py-2">
          <div className="cpc-w6">
            <h2 className="px-5 py-1" style={heading}>{E("how_title")}</h2>
            <div className="px-5 py-2.5">
              <p style={bodyText}>{E("how_body", "textarea")}</p>
            </div>
            <h2 className="px-5 py-1" style={heading}>{E("coverage_title")}</h2>
            <div className="px-5 py-2.5">
              <p style={bodyText}>{E("coverage_body", "textarea")}</p>
            </div>
          </div>
          <div className="cpc-w6 flex items-start justify-center">
            <div className="pt-1.5">
              <Image
                src="/shine-protect-alloy/shine-alloy.jpg"
                alt="Shine! Protect Alloy technician repairing an alloy wheel"
                width={1200}
                height={800}
                style={{ width: "100%", maxWidth: 600, height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* ── Find out more ── */}
        <div className="py-2">
          <h2 className="px-5 py-1" style={heading}>{E("more_title")}</h2>
          <div className="px-5 py-2.5">
            <p style={{ ...bodyText, whiteSpace: "normal" }}>
              {E("more_body", "textarea")}{" "}
              <a
                href="https://www.autoprotect.co.uk/shine-protect-alloy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", color: "#8a3b8f" }}
              >
                {E("more_link_label")}
              </a>
              .
            </p>
          </div>
        </div>

        {/* ── Disclaimer + divider ── */}
        <div className="px-2.5 pt-4">
          <div className="p-2.5">
            <p style={{ color: "#555555", fontSize: 12, lineHeight: "14px", whiteSpace: "pre-line" }}>
              {E("disclaimer", "textarea")}
            </p>
          </div>
          <div className="p-2.5">
            <div style={{ borderTop: "1px solid #BBBBBB", width: "100%" }} />
          </div>
        </div>

        {/* ── Badges + small print ── */}
        <div className="cpc-row items-center gap-4 px-2.5 pb-8 pt-1">
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-people-love-us.png" alt="People Love Us" title="People Love Us" width={220} height={220} style={{ width: "100%", maxWidth: 110, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-motor-trader.png" alt="Motor Trader Independent Winner" title="Motor Trader Independent Winner" width={320} height={320} style={{ width: "100%", maxWidth: 160, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-motor-ombudsman.png" alt="Motor Ombudsman logo" title="Motor Ombudsman logo" width={340} height={340} style={{ width: "100%", maxWidth: 170, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/shine-protect/badge-smmt.png" alt="SMMT Industry Awards" title="SMMT Industry Awards" width={140} height={140} style={{ width: "100%", maxWidth: 70, height: "auto", objectFit: "contain" }} />
          </div>
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
