"use client";

import { useEffect, useRef } from "react";


const BOOKING_URL =
  "https://booking-system.motasoftvgm.co.uk/#/5ca95796-14a1-44d1-8807-1fcfa810ce47/758/booking/select-services";

const IFRAME_MIN_WIDTH = 1280;
const HEADER_OFFSET_PX = 72;
const IFRAME_CONTENT_HEIGHT = 2400;

export default function OnlineBookingPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const didSetSrc = useRef(false);

  useEffect(() => {
    // Mobile: redirect directly to Mota Soft URL
    if (window.innerWidth < 768) {
      window.location.replace(BOOKING_URL);
      return;
    }

    // Desktop: scale iframe to fit
    const wrapper = wrapperRef.current;
    const iframe = iframeRef.current;
    if (!wrapper || !iframe) return;

    function applyScale() {
      const available = wrapper!.getBoundingClientRect().width || window.innerWidth;
      const layoutWidth = Math.max(IFRAME_MIN_WIDTH, available);
      const scale = Math.min(1, available / layoutWidth);

      iframe!.style.width = `${layoutWidth}px`;
      iframe!.style.height = `${IFRAME_CONTENT_HEIGHT / scale}px`;
      iframe!.style.transform = `scale(${scale})`;
      iframe!.style.transformOrigin = "top left";
      wrapper!.style.height = `${IFRAME_CONTENT_HEIGHT}px`;
    }

    applyScale();

    if (!didSetSrc.current) {
      didSetSrc.current = true;
      iframe.src = BOOKING_URL;
    }

    window.addEventListener("resize", applyScale);
    const ro = new ResizeObserver(applyScale);
    ro.observe(wrapper);

    return () => {
      window.removeEventListener("resize", applyScale);
      ro.disconnect();
    
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full max-w-full overflow-x-hidden">
      <iframe
        ref={iframeRef}
        title="Online booking — Marieston Service Centre"
        style={{
          display: "block",
          border: "none",
          minWidth: IFRAME_MIN_WIDTH,
          height: `${IFRAME_CONTENT_HEIGHT}px`,
          minHeight: 600,
        }}
        allow="payment *; fullscreen"
      />
    </div>
  );
}
