import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

const PEPPER = "heston_automotive_2024";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function isLegacyHash(stored: string) {
  return !stored.startsWith("scrypt$");
}

export function verifyPassword(plain: string, stored: string): boolean {
  if (stored.startsWith("scrypt$")) {
    const [, salt, hash] = stored.split("$");
    if (!salt || !hash) return false;
    const next = scryptSync(plain, salt, 64);
    const prev = Buffer.from(hash, "hex");
    if (next.length !== prev.length) return false;
    return timingSafeEqual(next, prev);
  }

  const legacy = createHash("sha256").update(plain + PEPPER).digest("hex");
  return safeEqual(legacy, stored);
}
