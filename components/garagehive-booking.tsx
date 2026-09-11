"use client";

import { useEffect } from "react";
import Script from "next/script";

export type GarageHiveDataSet = "add" | "mot" | "serv";

const GARAGEHIVE_INSTANCE = "hestonautomotive";
const GARAGEHIVE_BASE = "https://onlinebooking.garagehive.co.uk";
const IFRAME_ID = "ghonlinebooking-iframe";

declare global {
  interface Window {
    iFrameResize?: (options: Record<string, unknown>, selector: string) => void;
  }
}

// GarageHive's own embed script mounts via document.write, which only runs
// during synchronous HTML parsing, not when the script is created dynamically
// (e.g. from a React effect on tab switch). We build the iframe URL ourselves
// using the same convention their script uses, and load their resizer script
// separately so the iframe still auto-sizes to its content.
export function GarageHiveBooking({ dataSet }: { dataSet: GarageHiveDataSet }) {
  useEffect(() => {
    window.iFrameResize?.({ checkOrigin: false, inPageLinks: true }, `#${IFRAME_ID}`);
  }, [dataSet]);

  return (
    <>
      <iframe
        id={IFRAME_ID}
        title="Online booking"
        src={`${GARAGEHIVE_BASE}/${GARAGEHIVE_INSTANCE}/${dataSet}/booking/`}
        frameBorder={0}
        scrolling="yes"
        width="100%"
        style={{ height: 1400, border: 0 }}
      />
      <Script
        src={`${GARAGEHIVE_BASE}/js/iframe/iframeResizer.min.js`}
        strategy="afterInteractive"
        onReady={() => {
          window.iFrameResize?.({ checkOrigin: false, inPageLinks: true }, `#${IFRAME_ID}`);
        }}
      />
    </>
  );
}
