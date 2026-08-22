"use client";

import { FormEvent, useState } from "react";

const services = [
  { number: "01", title: "Fisioterapia deportiva", text: "Vuelve a entrenar con un plan pensado para tu deporte, tu cuerpo y tus metas." },
  { number: "02", title: "Rehabilitación funcional", text: "Recupera fuerza, movilidad y seguridad después de una lesión o cirugía." },
  { number: "03", title: "Bienestar y prevención", text: "Cuida tu postura y previene molestias antes de que limiten tu día." },
];

export default function Home() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className="nav wrap">
        <a className="brand" href="#inicio" aria-label="Fisioterapeuta Li, inicio"><span>li</span> Fisioterapeuta CODE MASTERS</a>
        <nav aria-label="Navegación principal">
          <a href="#nosotros">Acerca de mí</a>
          <a href="#servicios">Servicios</a>
          <a href="#reservas">Reservas</a>
        </nav>
        <a className="nav-cta" href="#reservas">Agenda tu cita <span>↗</span></a>
      </header>

      <section id="inicio" className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">FISIOTERAPIA PERSONALIZADA</p>
          <h1>Recupera tu movimiento, <em>recupera tu bienestar.</em></h1>  
          <p className="lead">Acompañamiento profesional para recuperar movimiento, aliviar el dolor y volver a disfrutar lo que más te gusta.</p>
          <div className="hero-actions">
            <a className="button primary" href="#reservas">Reserva tu valoración <span>→</span></a>
            <a className="text-link" href="#servicios">Conoce los servicios <span>↓</span></a>
          </div>
          <div className="trust"><span>Atención cercana</span><i /> <span>Plan personalizado</span><i /> <span>Enfoque integral</span></div>
        </div>
        <div className="hero-art" aria-label="Ilustración abstracta de bienestar y movimiento">
          <div className="sun" />
          <div className="arch" />
          <div className="orb orb-one" /><div className="orb orb-two" />
          <p>Muévete<br />con libertad.</p>
        </div>
      </section>

      <section id="nosotros" className="intro">
        <div className="wrap intro-grid">
          <p className="eyebrow">ACERCA DE MÍ</p>
          <div><h2>Escuchar, entender y acompañar: así empieza cada proceso.</h2></div>
          <p>Mi propósito es que encuentres una atención clara, humana y basada en tus necesidades. Trabajaremos juntos para que recuperes confianza en tu movimiento.</p>
        </div>
      </section>

      <section id="servicios" className="services wrap">
        <div className="section-heading"><div><p className="eyebrow">SERVICIOS</p><h2>Un plan para volver a lo que te mueve.</h2></div><p>Cada sesión se adapta a tu momento y objetivos, con seguimiento durante todo el proceso.</p></div>
        <div className="service-list">
          {services.map((service) => <article className="service" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#reservas" aria-label={`Reservar ${service.title}`}>↗</a></article>)}
        </div>
      </section>

      <section id="reservas" className="booking">
        <div className="wrap booking-grid">
          <div><p className="eyebrow">RESERVA TU ESPACIO</p><h2>Comienza tu proceso hoy.</h2><p className="booking-copy">Déjanos tus datos y te confirmaremos el horario disponible para tu primera valoración.</p><div className="contact-mini"><span>✦</span><p>¿Tienes preguntas?<br /><a href="mailto:hola@fisioterapeutali.com">hola@fisioterapeutali.com</a></p></div></div>
          <form onSubmit={handleSubmit}>
            {sent ? <div className="success"><strong>¡Gracias por escribirnos!</strong><p>Recibimos tu solicitud. Pronto confirmaremos tu cita.</p><button type="button" onClick={() => setSent(false)}>Enviar otra solicitud</button></div> : <>
              <label>Nombre completo<input required name="name" placeholder="¿Cómo te llamas?" /></label>
              <label>Correo electrónico<input required type="email" name="email" placeholder="tu@correo.com" /></label>
              <div className="form-row"><label>Servicio<select name="service" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Fisioterapia deportiva</option><option>Rehabilitación funcional</option><option>Bienestar y prevención</option></select></label><label>Teléfono<input required name="phone" placeholder="Tu número" /></label></div>
              <button className="button primary submit" type="submit">Solicitar reserva <span>→</span></button>
              <small>Al enviar aceptas ser contactado para coordinar tu cita.</small>
            </>}
          </form>
        </div>
      </section>

      <footer className="footer wrap"><a className="brand" href="#inicio"><span>li</span> Fisioterapeuta</a><p>Movimiento que transforma.</p><p>© 2026 Fisioterapeuta Li</p></footer>
    </main>
  );
}
