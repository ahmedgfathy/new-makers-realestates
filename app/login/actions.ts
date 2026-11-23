"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE, verifyPassword } from "@/lib/auth";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirect(`/login?error=invalid${next !== "/dashboard" ? `&next=${encodeURIComponent(next)}` : ""}`);
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(next.startsWith("/dashboard") ? next : "/dashboard");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/login");
}
