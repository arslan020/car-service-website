"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, isLegacyHash, verifyPassword } from "@/lib/auth";
import { signSession, readSession } from "@/lib/session";

const SESSION_COOKIE = "ha_session";

export async function loginAction(formData: FormData): Promise<{ error: string } | never> {
  const email = (formData.get("email") as string ?? "").trim().toLowerCase();
  const password = (formData.get("password") as string ?? "").trim();

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || !verifyPassword(password, admin.password)) {
    return { error: "Invalid email or password." };
  }

  if (isLegacyHash(admin.password)) {
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashPassword(password) },
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await signSession(admin.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}

export async function getSession(): Promise<{ id: string; name: string; email: string } | null> {
  const cookieStore = await cookies();
  const session = await readSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) return null;

  const admin = await prisma.admin.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true },
  });

  return admin ?? null;
}
