import { NextResponse } from "next/server";
import { createSession, safeEquals, sessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ message: "El acceso no está configurado." }, { status: 500 });
  }

  const isValid = typeof email === "string" && typeof password === "string" &&
    safeEquals(email.trim().toLowerCase(), adminEmail.toLowerCase()) && safeEquals(password, adminPassword);

  if (!isValid) return NextResponse.json({ message: "Correo o contraseña incorrectos." }, { status: 401 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie.name, createSession(adminEmail), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionCookie.maxAge,
  });
  return response;
}
