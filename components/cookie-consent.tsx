"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const STORAGE_KEY = "msc_cookie_consent";
const GA_ID = "G-PFFK3WFMGF";

type Choice = "accepted" | "rejected";

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "rejected") setChoice(saved);
    else setOpen(true);
    setReady(true);

    function reopen() {
      setOpen(true);
    }
    window.addEventListener("msc-cookie-settings", reopen);
    return () => window.removeEventListener("msc-cookie-settings", reopen);
  }, []);

  function choose(next: Choice) {
    localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    setOpen(false);
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("consent", "update", {
      analytics_storage: next === "accepted" ? "granted" : "denied",
    });
  }

  return (
    <>
      {ready && choice === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', { analytics_storage: 'granted' });
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {open && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-[0_16px_48px_rgba(2,15,61,0.16)] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-600">
              We use a cookie for Google Analytics so we can see which pages help drivers book.
              Essential cookies stay on either way.{" "}
              <Link href="/privacy" className="font-semibold text-[#0F63FF] hover:underline">
                Privacy policy
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="rounded-xl border border-[#d0dcea] px-4 py-2.5 text-sm font-bold text-[#020F3D] transition hover:bg-[#f4f8ff]"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-xl bg-[#020F3D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#061744]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
