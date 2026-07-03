import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Serves blog cover images stored in the database.
// Image ids are immutable (a new upload gets a new id) so cache aggressively.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return new NextResponse(null, { status: 404 });

  try {
    const rows = await prisma.$queryRaw<Array<{ mimeType: string; data: Buffer }>>`
      SELECT "mimeType", "data" FROM "BlogImage" WHERE "id" = ${id} LIMIT 1
    `;
    const row = rows[0];
    if (!row) return new NextResponse(null, { status: 404 });

    return new NextResponse(new Uint8Array(row.data), {
      headers: {
        "Content-Type": row.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
