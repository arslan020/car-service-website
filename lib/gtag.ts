/** Fire a GA4 event from the browser; no-op if gtag isn't loaded (e.g. ad blocker). */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
