import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { sessionCookie, verifySession } from "@/lib/auth";
import { Client, getClients } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function formatClientDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function latestClient(clients: Client[]) {
  return clients[0];
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = verifySession(cookieStore.get(sessionCookie.name)?.value);
  if (!session) redirect("/acceso");

  let clients: Client[] = [];
  let clientsError = "";

  try {
    clients = await getClients();
  } catch {
    clientsError = "No fue posible cargar las solicitudes de la base de datos.";
  }

  const lastRequest = latestClient(clients);

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <a className="brand" href="/">
          <span className="brand-icon">
            <Image src="/images/Logo.jpg" alt="Logo La Fisioterapeuta Li" width={34} height={34} />
          </span>
          La Fisioterapeuta Li
        </a>

        <nav className="dashboard-menu">
          <a className="active" href="/dashboard">Resumen</a>
          <a href="#agenda">Agenda</a>
          <a href="#clientes">Clientes</a>
          <a href="#servicios">Servicios</a>
          <a href="#configuracion">Configuración</a>
        </nav>

        <a className="back-site" href="/">← Ver sitio web</a>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">{formatDate(new Date()).toUpperCase()}</p>
            <h1>Buenos días Lina.</h1>
          </div>
          <a className="new-appointment" href="/#reservas">+ Nueva solicitud</a>
        </header>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Solicitudes recibidas</span>
            <strong>{clients.length}</strong>
            <p>Desde el formulario web</p>
          </article>
          <article className="stat-card">
            <span>Último contacto</span>
            <strong>{lastRequest ? formatClientDate(lastRequest.creado_en) : "-"}</strong>
            <p>{lastRequest?.nombre ?? "Aún no hay solicitudes"}</p>
          </article>
          <article className="stat-card">
            <span>Estado</span>
            <strong>{clientsError ? "!" : "OK"}</strong>
            <p>{clientsError ? "Revisa la conexión" : "Base de datos conectada"}</p>
          </article>
        </div>

        <section className="dashboard-section" id="clientes">
          <div className="section-title">
            <div>
              <p className="eyebrow">CLIENTES</p>
              <h2>Solicitudes recientes</h2>
            </div>
            <a href="/#reservas">Ver formulario →</a>
          </div>

          <div className="appointments">
            {clientsError && <p className="dashboard-error">{clientsError}</p>}
            {!clientsError && clients.length === 0 && (
              <p className="empty-state">Cuando alguien complete el formulario, aparecerá aquí con su nombre, celular y servicio.</p>
            )}
            {clients.map((client) => (
              <article className="appointment" key={client.id}>
                <time>{formatClientDate(client.creado_en)}</time>
                <div>
                  <h3>{client.nombre}</h3>
                  <p>{client.celular}</p>
                </div>
                <span className="status pendiente">{client.servicio}</span>
                <a className="client-whatsapp" href={`https://wa.me/${client.celular.replace(/\D/g, "")}`} aria-label={`Escribir a ${client.nombre}`}>→</a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
