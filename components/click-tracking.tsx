"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

/** Site-wide GA4 events for the two lead actions that happen via plain links. */
export function ClickTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href });
      } else if (href.includes("wa.me")) {
        trackEvent("whatsapp_click", { link_url: href });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
