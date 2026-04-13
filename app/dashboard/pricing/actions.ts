"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/app/login/actions";

export async function upsertServicePrice(
  brand: string,
  serviceType: string,
  startingFrom: number,
): Promise<{ ok: boolean; message?: string }> {
  const session = await getSession();
  if (!session) return { ok: false, message: "Not authorised." };

  if (!brand || !serviceType || isNaN(startingFrom) || startingFrom < 0) {
    return { ok: false, message: "Invalid data." };
  }

  await prisma.servicePrice.upsert({
    where: { brand_serviceType: { brand, serviceType } },
    update: { startingFrom },
    create: { brand, serviceType, startingFrom },
  });

  revalidatePath("/dashboard/pricing");
  return { ok: true };
}

export async function deleteServicePrice(
  brand: string,
  serviceType: string,
): Promise<{ ok: boolean }> {
  const session = await getSession();
  if (!session) return { ok: false };

  await prisma.servicePrice.deleteMany({ where: { brand, serviceType } });
  revalidatePath("/dashboard/pricing");
  return { ok: true };
}
