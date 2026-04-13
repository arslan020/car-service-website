import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand")?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "";
  const service = searchParams.get("service") ?? "";

  if (!service) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Try brand-specific price first, then fall back to "all"
  const prices = await prisma.servicePrice.findMany({
    where: {
      serviceType: service,
      brand: { in: [brand, "all"] },
    },
    select: { brand: true, startingFrom: true },
  });

  const brandSpecific = prices.find((p) => p.brand === brand);
  const defaultPrice = prices.find((p) => p.brand === "all");
  const match = brandSpecific ?? defaultPrice;

  if (!match) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true, price: match.startingFrom });
}
