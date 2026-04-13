"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/app/login/actions";

export async function deleteBooking(id: string): Promise<{ ok: boolean; message?: string }> {
  const session = await getSession();
  if (!session) return { ok: false, message: "Not authorised." };

  try {
    await prisma.booking.delete({ where: { id } });
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "Could not delete booking." };
  }
}
