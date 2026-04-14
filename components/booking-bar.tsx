"use client";

import Link from "next/link";
import { useState } from "react";

const SERVICE_OPTIONS = [
  { id: "mot", label: "MOT Test" },
  { id: "full", label: "Full Service" },
  { id: "interim", label: "Interim Service" },
  { id: "brakes", label: "Brakes" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "tyres", label: "Tyres" },
  { id: "ac", label: "Air-Con" },
  { id: "oil", label: "Oil Change" },
  { id: "battery", label: "Battery Check" },
] as const;

type ServiceId = (typeof SERVICE_OPTIONS)[number]["id"];

export function BookingBar({ defaultService = "mot" }: { defaultService?: ServiceId }) {
  const [selected, setSelected] = useState<ServiceId>(defaultService);
  const [reg, setReg] = useState("");

  return (
    <div className="mx-auto mt-7 max-w-2xl">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Select a service to book
      </p>

      {/* Scrollable service tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SERVICE_OPTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelected(s.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              selected === s.id
                ? "bg-[#101a56] text-white shadow-sm"
                : "border border-[#d0dcea] bg-white text-slate-600 hover:border-[#101a56] hover:text-[#101a56]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* UK plate + button */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex w-full overflow-hidden rounded-xl border-2 border-[#F5C518] bg-[#F5C518] shadow-md sm:flex-1">
          <div className="flex w-[3.25rem] shrink-0 flex-col items-center justify-center bg-[#003399] py-3">
            <span className="text-[9px] font-bold leading-none text-yellow-300">★</span>
            <span className="mt-0.5 text-[9px] font-extrabold leading-none text-white">UK</span>
          </div>
          <input
            type="text"
            placeholder="YOUR REG"
            maxLength={8}
            value={reg}
            onChange={(e) => setReg(e.target.value.toUpperCase())}
            className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-center text-lg font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#8b7200] focus:outline-none"
          />
        </div>
        <Link
          href={`/book?service=${selected}${reg ? `&reg=${encodeURIComponent(reg)}&autoLookup=1` : ""}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto sm:shrink-0"
        >
          Start booking
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
