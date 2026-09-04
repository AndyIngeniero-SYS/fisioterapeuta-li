import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fisioterapeuta Lii | Movimiento que transforma",
  description: "Fisioterapia personalizada para recuperar bienestar, confianza y movimiento.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
