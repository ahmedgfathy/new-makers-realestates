import { createHmac, scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export const SESSION_COOKIE = "makers_session";
const SECRET = process.env.AUTH_SECRET ?? "makers-real-estates-development-secret";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${key}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(key, "hex");
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}

export function createSessionToken(userId: string) {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, iat: Date.now() })
  ).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSessionToken(token: string): string | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", SECRET).update(payload).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.uid === "string" ? data.uid : null;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const userId = readSessionToken(token);
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
