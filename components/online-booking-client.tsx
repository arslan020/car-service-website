"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GarageHiveBooking, type GarageHiveDataSet } from "@/components/garagehive-booking";

const SERVICING_PARAMS = new Set(["full", "major", "interim", "oil"]);
const MOT_PARAMS = new Set(["mot"]);

function tabForService(service: string | null): GarageHiveDataSet {
  if (!service) return "mot";
  if (service === "motserv") return "motserv";
  if (MOT_PARAMS.has(service)) return "mot";
  if (SERVICING_PARAMS.has(service)) return "serv";
  return "add";
}

const TABS: { key: GarageHiveDataSet; label: string }[] = [
  { key: "mot", label: "MOT" },
  { key: "serv", label: "Servicing" },
  { key: "motserv", label: "MOT + Servicing" },
  { key: "add", label: "Additional Services" },
];

export function OnlineBookingClient() {
  const searchParams = useSearchParams();
  const initialTab = useMemo(() => tabForService(searchParams.get("service")), [searchParams]);
  const [activeTab, setActiveTab] = useState<GarageHiveDataSet>(initialTab);

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-[#eefdff] via-[#f5feff] to-white px-4 pb-2 pt-10 text-center sm:pt-14">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0F63FF]">Online booking</p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-[#020F3D] sm:text-5xl">
          Book your MOT or service
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 sm:text-lg">
          Choose a category, then enter your registration. The form is the workshop booking system.
        </p>
      </section>

      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 px-4 py-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-[#0F63FF] text-white shadow-md"
                : "bg-[#f4f8ff] text-[#020F3D] hover:bg-[#e8effa]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-12">
        <GarageHiveBooking key={activeTab} dataSet={activeTab} />
      </div>
    </div>
  );
}
