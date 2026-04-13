import { NextResponse } from "next/server";
import { lookupDvlaVehicle } from "@/lib/dvla";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { registrationNumber?: string }
    | null;

  const registrationNumber =
    typeof body?.registrationNumber === "string" ? body.registrationNumber : "";

  const result = await lookupDvlaVehicle(registrationNumber);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true, vehicle: result.vehicle });
}
