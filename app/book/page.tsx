"use client";

import { useEffect } from "react";

export default function BookPage() {
  useEffect(() => {
    if (document.getElementById("motasoftScript")) return;

    const script = document.createElement("script");
    script.id = "motasoftScript";
    script.src = "https://booking-system.motasoftvgm.co.uk/scripts/script.js";
    script.setAttribute("data-booking-system-id", "758");
    script.setAttribute("data-guid", "5ca95796-14a1-44d1-8807-1fcfa810ec47");
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("motasoftScript");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-5">
        <div id="motasoft" suppressHydrationWarning></div>
      </div>
    </div>
  );
}
