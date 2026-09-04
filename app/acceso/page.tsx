"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email"), password: formData.get("password") }),
    });
    setIsLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.message ?? "No fue posible iniciar sesión.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="access-page">
      <section className="access-intro">
        <Link className="brand" href="/">
          <span className="brand-icon">
            <Image src="/images/Logo.jpg" alt="Logo La Fisioterapeuta Li" width={34} height={34} />
          </span>
          La Fisioterapeuta Li
        </Link>

        <div className="access-message">
          <p className="eyebrow">ÁREA ADMINISTRATIVA</p>
          <h1>Todo tu negocio, en un solo lugar.</h1>
          <p>
            Gestiona tu agenda, reservas, clientes y la operación diaria
            de forma simple y segura.
          </p>
        </div>

        <Link className="back-site" href="/">
          ← Volver al sitio web
        </Link>
      </section>

      <section className="access-form-area">
        <form className="access-form" onSubmit={handleSubmit}>
          <p className="eyebrow">ACCESO PROFESIONAL</p>
          <h2>Bienvenida de nuevo Lina.</h2>
          <p className="form-description">
            Ingresa tus datos para acceder al panel administrativo.
          </p>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              required
            />
          </label>

          <div className="access-options">
            <label className="remember">
              <input type="checkbox" name="remember" />
              Recordarme
            </label>
            <button type="button" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && <p className="access-error" role="alert">{error}</p>}

          <button className="button primary access-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Verificando…" : <>Ingresar al dashboard <span>→</span></>}
          </button>

          <p className="access-note">
            Acceso reservado para personal autorizado.
          </p>
        </form>
      </section>
    </main>
  );
}
