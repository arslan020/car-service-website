import { createHash } from "crypto";

const PEPPER = "heston_automotive_2024";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password + PEPPER).digest("hex");
}

export function verifyPassword(plain: string, hashed: string): boolean {
  return hashPassword(plain) === hashed;
}
