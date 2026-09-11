"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GarageHiveBooking, type GarageHiveDataSet } from "@/components/garagehive-booking";

const SERVICING_PARAMS = new Set(["full", "major", "interim", "oil"]);
const MOT_PARAMS = new Set(["mot"]);

function tabForService(service: string | null): GarageHiveDataSet {
  if (!service) return "add";
  if (MOT_PARAMS.has(service)) return "mot";
  if (SERVICING_PARAMS.has(service)) return "serv";
  return "add";
}

const TABS: { key: GarageHiveDataSet; label: string }[] = [
  { key: "mot", label: "MOT" },
  { key: "serv", label: "Servicing" },
  { key: "add", label: "Additional Services" },
];

export function OnlineBookingClient() {
  const searchParams = useSearchParams();
  const initialTab = useMemo(() => tabForService(searchParams.get("service")), [searchParams]);
  const [activeTab, setActiveTab] = useState<GarageHiveDataSet>(initialTab);

  return (
    <div className="bg-white">
      <div className="border-b border-[#e0ebff] bg-[#f8fbff] px-4 py-3 text-center">
        <h1 className="text-sm font-semibold text-[#020F3D]">Book Your MOT or Car Service Online</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          Choose a category below and pick your date and time, secure booking powered by our workshop system.
        </p>
      </div>

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
