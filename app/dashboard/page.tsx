const appointments = [
  { time: "09:00", patient: "Laura Gómez", service: "Valoración inicial", status: "Confirmada" },
  { time: "10:30", patient: "María Torres", service: "Fisioterapia deportiva", status: "Confirmada" },
  { time: "14:00", patient: "Carlos Ruiz", service: "Rehabilitación funcional", status: "Pendiente" },
  { time: "16:00", patient: "Sofía Martínez", service: "Seguimiento", status: "Confirmada" },
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = verifySession(cookieStore.get(sessionCookie.name)?.value);
  if (!session) redirect("/acceso");

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <a className="brand" href="/">
          <span>Li</span> Fisioterapeuta Li
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
            <p className="eyebrow">SÁBADO, 23 DE AGOSTO</p>
            <h1>Buenos días, Li.</h1>
          </div>
          <button className="new-appointment">+ Nueva cita</button>
        </header>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Citas de hoy</span>
            <strong>4</strong>
            <p>2 ya completadas</p>
          </article>
          <article className="stat-card">
            <span>Próxima cita</span>
            <strong>10:30</strong>
            <p>María Torres</p>
          </article>
          <article className="stat-card">
            <span>Espacios libres</span>
            <strong>3</strong>
            <p>Durante esta semana</p>
          </article>
        </div>

        <section className="dashboard-section" id="agenda">
          <div className="section-title">
            <div>
              <p className="eyebrow">AGENDA</p>
              <h2>Tu día de hoy</h2>
            </div>
            <a href="#ver-agenda">Ver agenda completa →</a>
          </div>

          <div className="appointments">
            {appointments.map((appointment) => (
              <article className="appointment" key={`${appointment.time}-${appointment.patient}`}>
                <time>{appointment.time}</time>
                <div>
                  <h3>{appointment.patient}</h3>
                  <p>{appointment.service}</p>
                </div>
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
                <button aria-label={`Ver cita de ${appointment.patient}`}>→</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookie, verifySession } from "@/lib/auth";
