"use client";

import { useEffect, useRef, useState } from "react";

const BOOKING_URL =
  "https://booking-system.motasoftvgm.co.uk/#/5ca95796-14a1-44d1-8807-1fcfa810ce47/758/booking/select-services";

const DESKTOP_LAYOUT_WIDTH = 1280;
const IFRAME_CONTENT_HEIGHT = 2400;
const MOBILE_BREAKPOINT = 768;

export function OnlineBookingClient() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const didSetSrc = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const iframe = iframeRef.current;
    if (!wrapper || !iframe) return;

    function applyLayout() {
      const available = wrapper!.getBoundingClientRect().width || window.innerWidth;
      const isMobile = available < MOBILE_BREAKPOINT;

      if (isMobile) {
        iframe!.style.width = "100%";
        iframe!.style.minWidth = "0";
        iframe!.style.height = `${IFRAME_CONTENT_HEIGHT}px`;
        iframe!.style.transform = "none";
        iframe!.style.transformOrigin = "top left";
        wrapper!.style.height = `${IFRAME_CONTENT_HEIGHT}px`;
      } else {
        const layoutWidth = Math.max(DESKTOP_LAYOUT_WIDTH, available);
        const scale = Math.min(1, available / layoutWidth);

        iframe!.style.width = `${layoutWidth}px`;
        iframe!.style.minWidth = `${DESKTOP_LAYOUT_WIDTH}px`;
        iframe!.style.height = `${IFRAME_CONTENT_HEIGHT / scale}px`;
        iframe!.style.transform = `scale(${scale})`;
        iframe!.style.transformOrigin = "top left";
        wrapper!.style.height = `${IFRAME_CONTENT_HEIGHT}px`;
      }
    }

    applyLayout();

    if (!didSetSrc.current) {
      didSetSrc.current = true;
      iframe.src = BOOKING_URL;
    }

    const onLoad = () => setLoading(false);
    iframe.addEventListener("load", onLoad);

    window.addEventListener("resize", applyLayout);
    const ro = new ResizeObserver(applyLayout);
    ro.observe(wrapper);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", applyLayout);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="border-b border-[#e0ebff] bg-[#f8fbff] px-4 py-3 text-center">
        <h1 className="text-sm font-semibold text-[#020F3D]">Book Your MOT or Car Service Online</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          Choose your service and time slot below — secure booking powered by our workshop system.
        </p>
      </div>

      <div ref={wrapperRef} className="relative w-full max-w-full overflow-x-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex min-h-[420px] flex-col items-center justify-center gap-3 bg-white/95">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e0ebff] border-t-[#0F63FF]" />
            <p className="text-sm font-semibold text-[#020F3D]">Loading booking system…</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          title="Online booking — Marieston Service Centre"
          className="block w-full border-none"
          style={{
            height: `${IFRAME_CONTENT_HEIGHT}px`,
            minHeight: 600,
          }}
          allow="payment *; fullscreen"
        />
      </div>
    </div>
  );
}
