import { NextRequest, NextResponse } from "next/server";

const SLUG_OVERRIDES: Record<string, { carlogos: string; clearbit: string; direct?: string }> = {
  mercedes:    { carlogos: "mercedes-benz",  clearbit: "mercedes-benz.com"    },
  landrover:   { carlogos: "land-rover",     clearbit: "landrover.com"        },
  alfaromeo:   { carlogos: "alfa-romeo",     clearbit: "alfaromeo.com"        },
  mini:        { carlogos: "mini",           clearbit: "mini.com"             },
  skoda:       { carlogos: "skoda",          clearbit: "skoda-auto.com"       },
  mg:          { carlogos: "mg",             clearbit: "mg.co.uk"             },
  byd:         { carlogos: "byd",            clearbit: "byd.com"              },
  genesis:     { carlogos: "genesis",        clearbit: "genesis.com"          },
  infiniti:    { carlogos: "infiniti",       clearbit: "infiniti.com"         },
  gwm:         { carlogos: "great-wall",     clearbit: "gwm.com"              },
  bentley:     { carlogos: "bentley",        clearbit: "bentleymotors.com"    },
  maserati:    { carlogos: "maserati",       clearbit: "maserati.com"         },
  polestar:    { carlogos: "polestar",       clearbit: "polestar.com"         },
  astonmartin: {
    carlogos: "aston-martin",
    clearbit: "astonmartin.com",
    direct: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Aston_Martin_logo.svg/320px-Aston_Martin_logo.svg.png",
  },
  rollsroyce: {
    carlogos: "rolls-royce",
    clearbit: "rolls-roycemotorcars.com",
    direct: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rolls-Royce_Motor_Cars_logo.svg/320px-Rolls-Royce_Motor_Cars_logo.svg.png",
  },
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

  const dashedSlug = label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const plainSlug = label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  const overrides = SLUG_OVERRIDES[brand];
  const carlogosSlug = overrides?.carlogos ?? plainSlug;
  const clearbitDomain = overrides?.clearbit ?? `${plainSlug}.com`;

  const sources: string[] = [
    // direct URL first (for brands with known working URLs)
    ...(overrides?.direct ? [overrides.direct] : []),
    `https://vehapi.com/apis/logo-api/img/logo/${dashedSlug}.png`,
    `https://www.carlogos.org/car-logos/${carlogosSlug}-logo.png`,
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
