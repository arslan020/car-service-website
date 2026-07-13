"use client";

import Image from "next/image";
import { BUSINESS_JSONLD } from "@/lib/business-jsonld";
import { EditableText } from "@/components/editable-text";
import type { ContentMap } from "@/lib/page-content";
import { JsonLd } from "@/components/json-ld";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-json-ld";

const ceramicCoatSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Williams Ceramic Coat Paint Protection",
  provider: BUSINESS_JSONLD,
  description:
    "Williams Ceramic Coat — third-generation paint protection for paintwork, alloys, bumpers and glass, plus interior surfaces and fabrics. Guaranteed for as long as you own the vehicle.",
  url: "https://www.mariestonservicecentre.co.uk/ceramic-coat",
};

const FONT = "Lato, Tahoma, Verdana, Segoe, sans-serif";
const NAVY = "#0e2050";
const BLUE = "#00a0de";

// Column layout in plain CSS — the dev Tailwind pipeline misses newly added
// fractional width classes, so these are shipped with the component instead.
const COLS_CSS = `
.cpc-row{display:flex;flex-direction:column}
.cpc-w2,.cpc-w3,.cpc-w4,.cpc-w8{width:100%}
@media (min-width:768px){
.cpc-row{flex-direction:row}
.cpc-w2{width:16.6667%}
.cpc-w3{width:25%}
.cpc-w4{width:33.3333%}
.cpc-w8{width:66.6667%}
}`;

function lines(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function CeramicCoatPageClient({ content, editable = false }: { content: ContentMap; editable?: boolean }) {
  const c = content;
  const E = (fieldKey: string, type: "text" | "textarea" = "text") => (
    <EditableText pageKey="ceramic-coat" fieldKey={fieldKey} value={c[fieldKey] ?? ""} type={type} editable={editable} />
  );

  const heading: React.CSSProperties = {
    color: BLUE,
    fontFamily: FONT,
    fontSize: 23,
    fontWeight: 700,
    lineHeight: "120%",
    textAlign: "left",
  };
  const bodyText: React.CSSProperties = {
    color: "#393d47",
    fontSize: 16,
    lineHeight: "19px",
    whiteSpace: "pre-line",
  };

  const exteriorList = lines(c.exterior_list);
  const interiorList = lines(c.interior_list);

  return (
    <>
      <JsonLd data={ceramicCoatSchema} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.mariestonservicecentre.co.uk" },
        { name: "Ceramic Coat", url: "https://www.mariestonservicecentre.co.uk/ceramic-coat" },
      ]} />
    <div className="bg-white" style={{ fontFamily: FONT, color: "#000000" }}>
      <style>{COLS_CSS}</style>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>

        {/* ── Heading ── */}
        <div className="px-5 pb-4 pt-8">
          <h1 style={{ fontFamily: FONT, fontSize: 34, fontWeight: 700, lineHeight: "120%", textAlign: "left" }}>
            <span style={{ color: NAVY }}>{E("hero_title_1")}</span>{" "}
            <span style={{ color: BLUE }}>{E("hero_title_2")}</span>
          </h1>
        </div>

        {/* ── Bold intro ── */}
        <div className="px-5 pb-5">
          <p style={{ color: "#555555", fontSize: 16, lineHeight: "19px", fontWeight: 700, whiteSpace: "pre-line", textAlign: "left" }}>
            {E("hero_intro", "textarea")}
          </p>
        </div>

        {/* ── A Gleaming Exterior + video ── */}
        <div className="cpc-row gap-2 py-2">
          <div className="cpc-w8">
            <h2 className="px-5 py-1" style={heading}>{E("exterior_title")}</h2>
            <div className="px-5 py-2.5">
              <p style={bodyText}>{E("exterior_body", "textarea")}</p>
              <ul className="list-disc pl-6 pt-2">
                {exteriorList.map((item) => (
                  <li key={item} style={{ ...bodyText, whiteSpace: "normal" }}>
                    <EditableText pageKey="ceramic-coat" fieldKey="exterior_list" value={c.exterior_list ?? ""} type="textarea" editable={editable} display={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-5 py-2.5">
              <p style={{ color: "#393d47", fontSize: 12, lineHeight: "14px" }}>{E("exterior_note")}</p>
            </div>
          </div>
          <div className="cpc-w4">
            <div className="pt-1.5">
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/642359553"
                  title="Williams Ceramic Coat"
                  allow="fullscreen"
                  allowFullScreen
                  frameBorder={0}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── A Spotless Interior + image ── */}
        <div className="cpc-row gap-2 py-2">
          <div className="cpc-w8">
            <h2 className="px-5 py-1" style={heading}>{E("interior_title")}</h2>
            <div className="px-5 py-2.5">
              <p style={{ ...bodyText, lineHeight: "24px" }}>{E("interior_body", "textarea")}</p>
              <ul className="list-disc pl-6 pt-4">
                {interiorList.map((item) => (
                  <li key={item} style={{ ...bodyText, lineHeight: "24px", whiteSpace: "normal" }}>
                    <EditableText pageKey="ceramic-coat" fieldKey="interior_list" value={c.interior_list ?? ""} type="textarea" editable={editable} display={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="cpc-w4 flex items-start justify-center">
            <div className="pt-1.5">
              <Image
                src="/ceramic-coat/williams-f1-car.jpg"
                alt="Williams F1 Car on track"
                width={800}
                height={534}
                style={{ width: "100%", maxWidth: 400, height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* ── Manufacturer small print ── */}
        <div className="p-2.5 px-5">
          <p style={{ color: "#393d47", fontSize: 12, lineHeight: "14px", whiteSpace: "pre-line" }}>
            {E("manufacturer_note", "textarea")}
          </p>
        </div>

        {/* ── Badges ── */}
        <div className="cpc-row items-center gap-4 px-2.5 pt-2">
          <div className="cpc-w3 flex items-center justify-center">
            <Image src="/ceramic-coat/williams-racing-logo.png" alt="Williams Racing Official Licensee" width={390} height={390} style={{ width: "100%", maxWidth: 195, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w3">
            <Image src="/ceramic-coat/autoprotect-logo.jpg" alt="AutoProtect" width={390} height={390} style={{ width: "100%", maxWidth: 195, height: "auto", objectFit: "contain", margin: "0 auto" }} />
            <p className="p-2.5" style={{ color: "#555555", fontSize: 12, lineHeight: "14px", fontWeight: 700, textAlign: "center" }}>
              {E("distributor_label")}
            </p>
          </div>
          <div className="cpc-w2 flex items-center justify-center">
            <Image src="/ceramic-coat/mta-2020-winner.jpg" alt="MTA 2020 Winner" width={300} height={300} style={{ width: "100%", maxWidth: 150, height: "auto", objectFit: "contain" }} />
          </div>
          <div className="cpc-w4 flex items-center justify-center">
            <Image src="/ceramic-coat/trustpilot-badge.png" alt="Trustpilot" width={160} height={160} style={{ width: "100%", maxWidth: 80, height: "auto", objectFit: "contain" }} />
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="p-2.5 px-5 pb-8">
          <p style={{ color: "#555555", fontSize: 12, lineHeight: "14px", whiteSpace: "pre-line" }}>
            {E("disclaimer", "textarea")}
          </p>
          <p className="mt-3" style={{ color: "#555555", fontSize: 12, lineHeight: "14px", whiteSpace: "pre-line" }}>
            {E("admin_note", "textarea")}
          </p>
        </div>

      </div>
    </div>
    </>
  );
}
