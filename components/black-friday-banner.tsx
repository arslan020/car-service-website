"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BlackFridayBanner({ disabled = false }: { disabled?: boolean }) {
  const pathname = usePathname();
  const titleId = useId();
  const previousPath = useRef(pathname);
  const showOnPage = pathname === "/";
  const [closed, setClosed] = useState(false);
  const [bannerLeaving, setBannerLeaving] = useState(false);

  const dismiss = useCallback(() => {
    setClosed(true);
    setBannerLeaving(true);
  }, []);

  useEffect(() => {
    if (showOnPage && previousPath.current !== pathname) {
      setClosed(false);
      setBannerLeaving(false);
    }
    previousPath.current = pathname;
  }, [showOnPage, pathname]);

  useEffect(() => {
    if (!bannerLeaving) return;
    const timeout = window.setTimeout(() => setBannerLeaving(false), 500);
    return () => window.clearTimeout(timeout);
  }, [bannerLeaving]);

  const showBanner = !disabled && showOnPage && (!closed || bannerLeaving);

  useEffect(() => {
    if (!showBanner) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showBanner, dismiss]);

  if (!showBanner) return null;

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center p-4 transition-opacity duration-500 ease-out sm:p-8 ${
        bannerLeaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <button
        type="button"
        aria-label="Close Black Friday banner"
        className="absolute inset-0 bg-black/80 backdrop-blur-[3px]"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out ${
          bannerLeaving ? "scale-95" : "scale-100"
        }`}
      >
        <h2 id={titleId} className="sr-only">Black Friday offer, MOT just £39</h2>
        <Link href="/mot" onClick={dismiss} aria-label="Black Friday offer, MOT just £39. Book now.">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/black-friday-poster.jpg"
            alt="Marieston Service Centre Black Friday offer. MOT just £39. Book now."
            width={1400}
            height={1045}
            className="h-auto w-full"
          />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
