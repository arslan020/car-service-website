"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export type GarageHiveDataSet = "add" | "mot" | "serv";

const GARAGEHIVE_INSTANCE = "hestonautomotive";
const GARAGEHIVE_BASE = "https://onlinebooking.garagehive.co.uk";

declare global {
  interface Window {
    iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement | string) => void;
  }
}

// Mirrors GarageHive's own embed script (onlinebooking.garagehive.co.uk/js/iframe/form.js):
// it sets no explicit iframe height at all and lets iframeResizer own it entirely, with
// scrolling off so the resizer's height detection isn't thrown off by an inner scrollbar.
// Their script only binds the resizer once per page load, so on every tab switch here we
// re-bind it to the freshly mounted iframe ourselves.
export function GarageHiveBooking({ dataSet }: { dataSet: GarageHiveDataSet }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scriptReady = useRef(false);

  const bindResizer = () => {
    const iframe = iframeRef.current;
    if (!iframe || !window.iFrameResize) return;
    window.iFrameResize({ inPageLinks: true, checkOrigin: false }, iframe);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.setAttribute("allowtransparency", "true");
    if (scriptReady.current) bindResizer();
  }, [dataSet]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title="Online booking"
        src={`${GARAGEHIVE_BASE}/${GARAGEHIVE_INSTANCE}/${dataSet}/booking/`}
        frameBorder={0}
        scrolling="no"
        width="100%"
        className="min-h-[300px]"
        style={{ border: 0 }}
        onLoad={bindResizer}
      />
      <Script
        src={`${GARAGEHIVE_BASE}/js/iframe/iframeResizer.min.js`}
        strategy="afterInteractive"
        onReady={() => {
          scriptReady.current = true;
          bindResizer();
        }}
      />
    </>
  );
}
