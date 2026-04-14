"use client";

import { useState } from "react";
import { upsertServicePrice, deleteServicePrice } from "@/app/dashboard/pricing/actions";

const BOOKING_SERVICES = [
  { id: "mot",         label: "MOT" },
  { id: "full",        label: "Full service" },
  { id: "interim",     label: "Interim service" },
  { id: "brakes",      label: "Brakes" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "tyres",       label: "Tyres" },
  { id: "ac",          label: "Air-con" },
  { id: "general",     label: "Other / General" },
];

const BRANDS: { key: string; label: string }[] = [
  { key: "all",        label: "Default"    },
  { key: "alfaromeo",  label: "Alfa Romeo" },
  { key: "audi",       label: "Audi"       },
  { key: "bmw",        label: "BMW"        },
  { key: "chevrolet",  label: "Chevrolet"  },
  { key: "citroen",    label: "Citroën"    },
  { key: "dacia",      label: "Dacia"      },
  { key: "fiat",       label: "Fiat"       },
  { key: "ford",       label: "Ford"       },
  { key: "honda",      label: "Honda"      },
  { key: "hyundai",    label: "Hyundai"    },
  { key: "jaguar",     label: "Jaguar"     },
  { key: "jeep",       label: "Jeep"       },
  { key: "kia",        label: "Kia"        },
  { key: "landrover",  label: "Land Rover" },
  { key: "lexus",      label: "Lexus"      },
  { key: "mazda",      label: "Mazda"      },
  { key: "mercedes",   label: "Mercedes-Benz" },
  { key: "mini",       label: "MINI"       },
  { key: "mitsubishi", label: "Mitsubishi" },
  { key: "nissan",     label: "Nissan"     },
  { key: "peugeot",    label: "Peugeot"    },
  { key: "porsche",    label: "Porsche"    },
  { key: "renault",    label: "Renault"    },
  { key: "seat",       label: "SEAT"       },
  { key: "skoda",      label: "Škoda"      },
  { key: "smart",      label: "Smart"      },
  { key: "subaru",     label: "Subaru"     },
  { key: "suzuki",     label: "Suzuki"     },
  { key: "tesla",      label: "Tesla"      },
  { key: "toyota",     label: "Toyota"     },
  { key: "vauxhall",   label: "Vauxhall"   },
  { key: "volkswagen", label: "Volkswagen"  },
  { key: "volvo",      label: "Volvo"      },
];

// Known-good carlogos.org URLs for brands where generic pattern doesn't work
const CARLOGOS_KNOWN: Record<string, string> = {
  audi:         "https://www.carlogos.org/car-logos/audi-logo-2016-download.png",
  bmw:          "https://www.carlogos.org/car-logos/bmw-logo-2020-gray-download.png",
  alfaromeo:    "https://www.carlogos.org/car-logos/alfa-romeo-logo.png",
  ford:         "https://www.carlogos.org/car-logos/ford-logo-2017-download.png",
  honda:        "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
  hyundai:      "https://www.carlogos.org/car-logos/hyundai-logo-2011-download.png",
  kia:          "https://www.carlogos.org/car-logos/kia-logo-2021-download.png",
  landrover:    "https://logo.clearbit.com/landrover.com",
  mazda:        "https://www.carlogos.org/car-logos/mazda-logo-1997-download.png",
  mercedes:     "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-download.png",
  mini:         "https://www.carlogos.org/car-logos/mini-logo-2018-download.png",
  nissan:       "https://www.carlogos.org/car-logos/nissan-logo-2020-download.png",
  peugeot:      "https://www.carlogos.org/car-logos/peugeot-logo-2021-download.png",
  porsche:      "https://www.carlogos.org/car-logos/porsche-logo-download.png",
  renault:      "https://www.carlogos.org/car-logos/renault-logo-2021-download.png",
  skoda:        "https://www.carlogos.org/car-logos/skoda-logo-2016-download.png",
  suzuki:       "https://www.carlogos.org/car-logos/suzuki-logo-download.png",
  tesla:        "https://www.carlogos.org/car-logos/tesla-logo-download.png",
  toyota:       "https://www.carlogos.org/car-logos/toyota-logo-download.png",
  vauxhall:     "https://www.carlogos.org/car-logos/vauxhall-logo-download.png",
  volkswagen:   "https://www.carlogos.org/car-logos/volkswagen-logo-2019-download.png",
  volvo:        "https://www.carlogos.org/car-logos/volvo-logo-2014-download.png",
};

/** Derive logo URLs — tries vehapi first, then known carlogos URL, then clearbit */
function getLogoSources(brandKey: string, label: string): string[] {
  const dashed = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const sources: string[] = [
    `https://vehapi.com/apis/logo-api/img/logo/${dashed}.png`,
  ];
  if (CARLOGOS_KNOWN[brandKey]) sources.push(CARLOGOS_KNOWN[brandKey]);
  return sources;
}

type PriceMap = Record<string, Record<string, number>>;

function BrandLogo({ brandKey, label, size = "md" }: { brandKey: string; label: string; size?: "sm" | "md" }) {
  const sources = brandKey === "all" ? [] : getLogoSources(brandKey, label);
  const [srcIndex, setSrcIndex] = useState(0);
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  if (!sources.length || srcIndex >= sources.length) {
    return (
      <div className={`mx-auto mb-1 flex ${dim} items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold uppercase text-[#101a56]`}>
        {label.slice(0, 2)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[srcIndex]}
      alt={label}
      className={`mx-auto mb-1 ${dim} object-contain`}
      onError={() => setSrcIndex((i) => i + 1)}
    />
  );
}

function ServicePriceRow({
  serviceId,
  label,
  currentPrice,
  brand,
  onSaved,
}: {
  serviceId: string;
  label: string;
  currentPrice: number | undefined;
  brand: string;
  onSaved: (price: number | null) => void;
}) {
  const [value, setValue] = useState(currentPrice !== undefined ? String(currentPrice) : "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSave() {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    setStatus("saving");
    const res = await upsertServicePrice(brand, serviceId, num);
    if (res.ok) {
      setStatus("saved");
      onSaved(num);
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  async function handleClear() {
    setStatus("saving");
    await deleteServicePrice(brand, serviceId);
    setValue("");
    setStatus("idle");
    onSaved(null);
  }

  return (
    <div className="flex items-center gap-3 border-b border-[#f0f5ff] py-3 last:border-0">
      <span className="w-36 text-sm font-medium text-slate-700">{label}</span>

      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-slate-400">£</span>
        <input
          type="number"
          min={0}
          step={1}
          placeholder="—"
          value={value}
          onChange={(e) => { setValue(e.target.value); setStatus("idle"); }}
          className="w-24 rounded-lg border border-[#d0dcea] bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-[#3f63ff] focus:ring-2 focus:ring-[#3f63ff]/15"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={status === "saving" || value === ""}
        className="rounded-lg bg-[#101a56] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#16236e] disabled:opacity-40"
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Save"}
      </button>

      {currentPrice !== undefined && (
        <button
          onClick={handleClear}
          disabled={status === "saving"}
          className="text-xs text-slate-400 hover:text-red-500"
        >
          Clear
        </button>
      )}

      {status === "error" && (
        <span className="text-xs text-red-500">Failed</span>
      )}
    </div>
  );
}

export function PricingEditor({ initialPrices }: { initialPrices: PriceMap }) {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [prices, setPrices] = useState<PriceMap>(initialPrices);

  function handlePriceSaved(serviceId: string, price: number | null) {
    setPrices((prev) => {
      const brandPrices = { ...prev[selectedBrand] };
      if (price === null) {
        delete brandPrices[serviceId];
      } else {
        brandPrices[serviceId] = price;
      }
      return { ...prev, [selectedBrand]: brandPrices };
    });
  }

  const activeBrand = BRANDS.find((b) => b.key === selectedBrand)!;
  const brandPrices = prices[selectedBrand] ?? {};
  const isDefault = selectedBrand === "all";

  return (
    <div className="mt-6 space-y-6">
      {/* Brand grid */}
      <div className="rounded-2xl border border-[#e0ebff] bg-white p-5 shadow-sm">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
          Select a brand
        </p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {BRANDS.map((brand) => (
            <button
              key={brand.key}
              onClick={() => setSelectedBrand(brand.key)}
              className={`flex flex-col items-center rounded-xl border p-2.5 text-center transition ${
                selectedBrand === brand.key
                  ? "border-[#101a56] bg-[#eef4ff] ring-1 ring-[#101a56]"
                  : "border-[#e0ebff] bg-white hover:border-[#101a56]/40 hover:bg-[#f8faff]"
              }`}
            >
              <BrandLogo brandKey={brand.key} label={brand.label} />
              <span className="mt-0.5 text-[10px] font-semibold leading-tight text-slate-600">
                {brand.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Service prices for selected brand */}
      <div className="rounded-2xl border border-[#e0ebff] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#e0ebff] px-6 py-4">
          <BrandLogo brandKey={activeBrand.key} label={activeBrand.label} size="sm" />
          <div>
            <h2 className="font-bold text-[#101a56]">{activeBrand.label}</h2>
            <p className="text-xs text-slate-400">
              {isDefault
                ? "These prices apply to all brands unless overridden per-brand."
                : "Brand-specific prices override the default."}
            </p>
          </div>
        </div>

        <div className="px-6 py-2">
          {BOOKING_SERVICES.map((s) => (
            <ServicePriceRow
              key={`${selectedBrand}-${s.id}`}
              serviceId={s.id}
              label={s.label}
              currentPrice={brandPrices[s.id]}
              brand={selectedBrand}
              onSaved={(price) => handlePriceSaved(s.id, price)}
            />
          ))}
        </div>

        <div className="border-t border-[#f0f5ff] px-6 py-3">
          <p className="text-xs text-slate-400">
            Prices are shown as &ldquo;From £X&rdquo; to customers during booking.
          </p>
        </div>
      </div>
    </div>
  );
}
