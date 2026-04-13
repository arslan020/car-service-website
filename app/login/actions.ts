"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

const SESSION_COOKIE = "ha_session";

export async function loginAction(formData: FormData): Promise<{ error: string } | never> {
  const email = (formData.get("email") as string ?? "").trim().toLowerCase();
  const password = (formData.get("password") as string ?? "").trim();

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || !verifyPassword(password, admin.password)) {
    return { error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, admin.id, {
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
  const adminId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!adminId) return null;

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, name: true, email: true },
  });

  return admin ?? null;
}
