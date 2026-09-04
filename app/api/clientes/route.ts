import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { nombre, celular, servicio } = await request.json();
    if (typeof nombre !== "string" || !nombre.trim() || nombre.trim().length > 100 || typeof celular !== "string" || !celular.trim() || celular.trim().length > 30 || typeof servicio !== "string" || !servicio.trim() || servicio.trim().length > 100) {
      return NextResponse.json({ message: "Completa correctamente todos los campos." }, { status: 400 });
    }
    await createClient({ nombre: nombre.trim(), celular: celular.trim(), servicio: servicio.trim() });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "No fue posible registrar tu solicitud. Intenta nuevamente." }, { status: 500 });
  }
}
