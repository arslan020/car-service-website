import { NextRequest, NextResponse } from "next/server";

// Brands where the auto-generated slug doesn't match the real carlogos/clearbit slug
const SLUG_OVERRIDES: Record<string, { carlogos: string; clearbit: string }> = {
  mercedes:  { carlogos: "mercedes-benz", clearbit: "mercedes-benz.com" },
  landrover: { carlogos: "land-rover",    clearbit: "landrover.com"     },
  alfaromeo: { carlogos: "alfa-romeo",    clearbit: "alfaromeo.com"     },
  mini:      { carlogos: "mini",          clearbit: "mini.com"          },
  skoda:     { carlogos: "skoda",         clearbit: "skoda-auto.com"    },
};

async function tryFetch(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(4000),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; bot)",
        "Accept": "image/*",
      },
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return null;
    return res;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const brand = req.nextUrl.searchParams.get("brand");
  const label = req.nextUrl.searchParams.get("label");

  if (!brand || !label || brand === "all") {
    return new NextResponse(null, { status: 404 });
  }

  // Same slug logic as car dealer software vehicle overview
  // vehapi uses dashes:  "Land Rover" → "land-rover"
  const dashedSlug = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  // carlogos / clearbit use no separator: "Land Rover" → "landrover"
  const plainSlug = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  const overrides = SLUG_OVERRIDES[brand];
  const carlogosSlug = overrides?.carlogos ?? plainSlug;
  const clearbitDomain = overrides?.clearbit ?? `${plainSlug}.com`;

  const sources: string[] = [
    // 1st — vehapi.com
    `https://vehapi.com/apis/logo-api/img/logo/${dashedSlug}.png`,
    // 2nd — carlogos.org
    `https://www.carlogos.org/car-logos/${carlogosSlug}-logo.png`,
    // 3rd — clearbit
    `https://logo.clearbit.com/${clearbitDomain}`,
  ];

  for (const url of sources) {
    const res = await tryFetch(url);
    if (res) {
      const data = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") ?? "image/png";
      return new NextResponse(data, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
        },
      });
    }
  }

  return new NextResponse(null, { status: 404 });
}
