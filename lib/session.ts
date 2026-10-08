const SECRET = process.env.AUTH_SECRET || "heston_automotive_2024";

function bytesToB64url(bytes: Uint8Array) {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64urlToBytes(value: string) {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
  const bin = atob(value.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signSession(id: string, maxAgeSec = 60 * 60 * 8) {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSec;
  const payload = bytesToB64url(new TextEncoder().encode(JSON.stringify({ id, exp })));
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(), new TextEncoder().encode(payload));
  return `${payload}.${bytesToB64url(new Uint8Array(signature))}`;
}

export async function readSession(token: string | undefined | null): Promise<{ id: string } | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const valid = await crypto.subtle.verify(
    "HMAC",
    await hmacKey(),
    b64urlToBytes(signature),
    new TextEncoder().encode(payload),
  );
  if (!valid) return null;

  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload))) as { id?: string; exp?: number };
    if (!data.id || !data.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    return { id: data.id };
  } catch {
    return null;
  }
}
