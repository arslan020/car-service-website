"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function isValidUKReg(value: string): boolean {
  const clean = value.toUpperCase().replace(/\s/g, "");
  return /^([A-Z]{2}[0-9]{2}[A-Z]{3}|[A-Z][0-9]{1,3}[A-Z]{3}|[A-Z]{3}[0-9]{1,3}[A-Z]|[0-9]{1,4}[A-Z]{1,3}|[A-Z]{1,3}[0-9]{1,4})$/.test(clean);
}

const SERVICE_OPTIONS = [
  { id: "mot",         label: "MOT Test",              category: "servicing" },
  { id: "full",        label: "Full Service",           category: "servicing" },
  { id: "interim",     label: "Interim Service",        category: "servicing" },
  { id: "major",       label: "Major Service",          category: "servicing" },
  { id: "oil",         label: "Oil Change",             category: "services"  },
  { id: "brakes",      label: "Brakes",                 category: "repairs"   },
  { id: "clutch",      label: "Clutch & Gearbox",       category: "repairs"   },
  { id: "suspension",  label: "Suspension & Steering",  category: "repairs"   },
  { id: "exhaust",     label: "Exhaust & Emissions",    category: "repairs"   },
  { id: "engine",      label: "Engine & Cooling",       category: "repairs"   },
  { id: "electrical",  label: "Electrical",             category: "repairs"   },
  { id: "diagnostics", label: "Diagnostics",            category: "services"  },
  { id: "tyres",       label: "Tyres",                  category: "services"  },
  { id: "ac",          label: "Air-Con",                category: "services"  },
  { id: "battery",     label: "Battery Check",          category: "services"  },
] as const;

type ServiceId = (typeof SERVICE_OPTIONS)[number]["id"];
type Category = "servicing" | "repairs" | "services" | "all";

export function BookingBar({
  defaultService = "mot",
  category = "all",
}: {
  defaultService?: ServiceId;
  category?: Category;
}) {
  const visible = category === "all"
    ? SERVICE_OPTIONS
    : SERVICE_OPTIONS.filter((s) => s.category === category);

  const router = useRouter();
  const [selected, setSelected] = useState<ServiceId>(defaultService);
  const [reg, setReg] = useState("");
  const [regError, setRegError] = useState<string | null>(null);

  function handleBooking() {
    if (!reg.trim()) {
      setRegError("Please enter your registration number.");
      return;
    }
    if (!isValidUKReg(reg)) {
      setRegError("Please enter a valid UK reg (e.g. AB12 CDE).");
      return;
    }
    setRegError(null);
    router.push(`/book?service=${selected}&reg=${encodeURIComponent(reg)}&autoLookup=1`);
  }

  return (
    <div className="mx-auto mt-7 max-w-2xl">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Select a service to book
      </p>

      {/* Scrollable service tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visible.map((s) => (
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
        <div className={`relative flex w-full overflow-hidden rounded-xl border-2 bg-[#F5C518] shadow-md sm:flex-1 ${regError ? "border-red-400" : "border-[#F5C518]"}`}>
          <div className="flex w-[3.25rem] shrink-0 flex-col items-center justify-center bg-[#003399] py-3">
            <span className="text-[9px] font-bold leading-none text-yellow-300">★</span>
            <span className="mt-0.5 text-[9px] font-extrabold leading-none text-white">UK</span>
          </div>
          <input
            type="text"
            placeholder="YOUR REG"
            maxLength={8}
            value={reg}
            onChange={(e) => {
              setReg(e.target.value.toUpperCase());
              setRegError(null);
            }}
            className="min-w-0 flex-1 bg-transparent py-3 pr-3 text-center text-lg font-extrabold uppercase tracking-widest text-[#101a56] placeholder-[#8b7200] focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleBooking}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101a56] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#16236e] sm:w-auto sm:shrink-0"
        >
          Start booking
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      {regError && (
        <p className="mt-2 text-sm font-medium text-red-600">{regError}</p>
      )}
    </div>
  );
}
