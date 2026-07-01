"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const WAY_AVAILABLE_MAKES = [
  "Mercedes", "Audi", "BMW", "Volvo", "SEAT",
  "Porsche", "Toyota", "Lexus", "Volkswagen (VW)", "Skoda",
];

function WayAvailableBadge() {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  function show() {
    if (!badgeRef.current) return;
    const r = badgeRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + 8, left: r.left });
  }

  return (
    <>
      <span
        ref={badgeRef}
        onMouseEnter={show}
        onMouseLeave={() => setPos(null)}
        className="ml-1.5 inline-flex cursor-pointer items-center gap-1 rounded-full bg-[#0F63FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        Way Available
      </span>
      {mounted && pos && createPortal(
        <div
          style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
          className="w-52 rounded-xl border border-[#e0ebff] bg-white p-3 shadow-2xl"
          onMouseEnter={() => {}}
          onMouseLeave={() => setPos(null)}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#0F63FF]">Digital History Supported</p>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {WAY_AVAILABLE_MAKES.map((make) => (
              <li key={make} className="flex items-center gap-1 text-xs text-slate-600">
                <span className="h-1 w-1 shrink-0 rounded-full bg-[#0F63FF]" />
                {make}
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </>
  );
}

type Tier = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  popular: boolean;
  includes: string[];
  showMotUpsell?: boolean;
};

const AUTOPLAY_MS = 4500;
const MAX_CARD_WIDTH = 380;
const GAP = 20;

export function ServicingTiersCarousel({
  tiers,
  popularBadge,
  bookPrefix,
}: {
  tiers: Tier[];
  popularBadge: string;
  bookPrefix: string;
}) {
  const n = tiers.length;
  const extended = [tiers[n - 1], ...tiers, tiers[0]];

  const [trackIndex, setTrackIndex] = useState(1);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setTrackIndex((p) => (p === n + 1 ? p : p + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, n]);

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  function next() {
    setTrackIndex((p) => (p === n + 1 || p === 0 ? p : p + 1));
  }

  function prev() {
    setTrackIndex((p) => (p === 0 || p === n + 1 ? p : p - 1));
  }

  function goToReal(realIndex: number) {
    setTrackIndex(realIndex + 1);
  }

  function handleTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    if (trackIndex === n + 1) {
      setInstant(true);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setInstant(true);
      setTrackIndex(n);
    }
  }

  const realIndex = ((trackIndex - 1) % n + n) % n;
  const cardWidth = containerWidth > 0 ? Math.min(MAX_CARD_WIDTH, containerWidth * 0.8) : MAX_CARD_WIDTH;
  const offsetPx = trackIndex * (cardWidth + GAP) - (containerWidth - cardWidth) / 2;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
      <div className="relative px-0 sm:px-12">
        <div ref={containerRef} className="overflow-hidden pt-4">
          <div
            ref={trackRef}
            className="flex items-center transition-transform ease-out"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${-offsetPx}px)`,
              transitionDuration: instant ? "0ms" : "500ms",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((tier, i) => {
              const isActive = i === trackIndex;
              return (
                <div
                  key={`slide-${i}`}
                  className={`shrink-0 transition-all ${
                    isActive ? "z-10 scale-100 opacity-100" : "z-0 translate-y-2 scale-[0.86] opacity-60"
                  }`}
                  style={{ width: `${cardWidth}px`, transitionDuration: instant ? "0ms" : "500ms" }}
                >
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all ${
                      isActive
                        ? "border-[#0F63FF] shadow-[0_12px_40px_rgba(15,99,255,0.3)]"
                        : "border-[#e8effa] shadow-sm"
                    }`}
                    style={{ transitionDuration: instant ? "0ms" : "500ms" }}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0F63FF] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
                        {popularBadge}
                      </span>
                    )}
                    <div>
                      <h3 className="text-lg font-extrabold text-[#020F3D]">{tier.title}</h3>
                      <p className="mt-0.5 text-xs text-slate-400">{tier.subtitle}</p>
                      <p className="mt-3 text-2xl font-extrabold text-[#0F63FF]">{tier.price}</p>
                      {tier.showMotUpsell && (
                        <p className="mt-1.5 text-xs font-semibold text-[#0F63FF]">+ Add MOT for £35</p>
                      )}
                    </div>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {tier.includes.map((item) => {
                        const isWayAvailable = item.includes("Reset Service Light");
                        return (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#0F63FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span>
                              {item}
                              {isWayAvailable && <WayAvailableBadge />}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={`/online-booking?service=${tier.id}`}
                      className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
                        isActive && tier.popular
                          ? "bg-[#020F3D] text-white shadow-md hover:bg-[#061744]"
                          : "border-2 border-[#020F3D] text-[#020F3D] hover:bg-[#020F3D] hover:text-white"
                      }`}
                    >
                      {bookPrefix} {tier.title}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous service"
          onClick={prev}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#e8effa] bg-white p-2 shadow-md transition hover:bg-[#eef4ff] sm:flex"
        >
          <svg className="h-4 w-4 text-[#020F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next service"
          onClick={next}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#e8effa] bg-white p-2 shadow-md transition hover:bg-[#eef4ff] sm:flex"
        >
          <svg className="h-4 w-4 text-[#020F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {tiers.map((tier, i) => (
          <button
            key={tier.id}
            type="button"
            aria-label={`Go to ${tier.title}`}
            onClick={() => goToReal(i)}
            className={`h-2 rounded-full transition-all ${i === realIndex ? "w-6 bg-[#0F63FF]" : "w-2 bg-[#d9e4f2]"}`}
          />
        ))}
      </div>
    </div>
  );
}
