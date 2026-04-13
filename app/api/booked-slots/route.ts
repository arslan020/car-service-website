import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { ok: false, message: "Invalid date" },
      { status: 400 },
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      appointmentDate: date,
      status: { not: "cancelled" },
    },
    select: { appointmentTime: true },
  });

  const bookedTimes = bookings
    .map((b) => b.appointmentTime)
    .filter((t): t is string => Boolean(t));

  return NextResponse.json({ ok: true, bookedTimes });
}
