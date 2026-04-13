"use server";

import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/app/login/actions";
import { PAGES_CONFIG } from "@/lib/pages-config";

/** Save a single field value for a page. */
export async function savePageField(
  pageKey: string,
  fieldKey: string,
  value: string
): Promise<{ ok: boolean; message?: string }> {
  const session = await getSession();
  if (!session) return { ok: false, message: "Not authorised." };

  // Validate pageKey and fieldKey exist in our config
  const pageDef = PAGES_CONFIG.find((p) => p.slug === pageKey);
  if (!pageDef) return { ok: false, message: "Unknown page." };
  const fieldDef = pageDef.fields.find((f) => f.key === fieldKey);
  if (!fieldDef) return { ok: false, message: "Unknown field." };

  try {
    const id = randomBytes(12).toString("hex");
    await prisma.$executeRaw`
      INSERT INTO "PageContent" (id, "pageKey", "fieldKey", "value", "updatedAt")
      VALUES (${id}, ${pageKey}, ${fieldKey}, ${value}, NOW())
      ON CONFLICT ("pageKey", "fieldKey")
      DO UPDATE SET "value" = ${value}, "updatedAt" = NOW()
    `;

    // Revalidate the public page
    const publicPath =
      pageKey === "car-servicing" ? "/car-servicing" : `/${pageKey}`;
    revalidatePath(publicPath);
    revalidatePath(`/dashboard/pages/${pageKey}`);

    return { ok: true };
  } catch (e) {
    console.error("savePageField error:", e);
    return { ok: false, message: "Failed to save." };
  }
}

/** Reset a field to its default (delete from DB). */
export async function resetPageField(
  pageKey: string,
  fieldKey: string
): Promise<{ ok: boolean }> {
  const session = await getSession();
  if (!session) return { ok: false };

  try {
    await prisma.$executeRaw`
      DELETE FROM "PageContent"
      WHERE "pageKey" = ${pageKey} AND "fieldKey" = ${fieldKey}
    `;
    const publicPath =
      pageKey === "car-servicing" ? "/car-servicing" : `/${pageKey}`;
    revalidatePath(publicPath);
    revalidatePath(`/dashboard/pages/${pageKey}`);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
