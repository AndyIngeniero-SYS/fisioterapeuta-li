"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Rehabilitación física",
    text: "Sesiones de fisioterapia para recuperar movilidad, fuerza y funcionalidad después de una lesión o cirugía.",
    price: "Desde $85.000 la sesión",
    image: "/images/rehabilitacion.jpg",
  },
  {
    number: "02",
    title: "Prescripción de ejercicio",
    text: "Planes de entrenamiento individuales o grupales con seguimiento profesional para tu recuperación y rendimiento.",
    price: "Desde $40.000 por sesión",
    image: "/images/prescripcion.jpg",
  },
  {
    number: "03",
    title: "Modulación postejercicio",
    text: "Descargas musculares con terapia manual, ventosas, presoterapia y pistola percutora para acelerar tu recuperación.",
    price: "Desde $70.000",
    image: "/images/modulacion.jpg",
  },
  {
    number: "04",
    title: "Procedimientos especializados",
    text: "Punción seca, terapia neural, PRP y sueroterapia para casos que requieren un abordaje más profundo.",
    price: "Desde $120.000",
    image: "/images/TerapiaNeuronal.jpg",
  },
];

const credentials = [
  "Fisioterapeuta — Universidad de Boyacá",
  "Especialización y Maestría en Neurorrehabilitación (en formación) — Universidad Autónoma de Manizales",
  "Diplomado en Terapias Alternativas — Fisioterapia en Movimiento",
  "Certificación en ATM y Bruxismo — CAAFYR",
  "Diplomado Internacional en Rehabilitación Deportiva — CRAPTICA",
];

const schedule = [
  {
    title: "Sede Tunja",
    text: "Atención entre semana, lunes a viernes.",
  },
  {
    title: "Sede Turmequé",
    text: "Atención fines de semana, sábados y domingos.",
  },
];

const navLinks = [
  { href: "#nosotros", label: "Acerca de mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#horarios", label: "Horarios" },
  { href: "#reservas", label: "Reservas" },
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serviceListRef = useRef<HTMLDivElement>(null);

  function scrollServices(direction: number) {
    const el = serviceListRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.85, 340), behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: formData.get("name"), celular: formData.get("phone"), servicio: formData.get("service") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setSent(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "No fue posible enviar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <header className="nav wrap">
        <a className="brand" href="#inicio" aria-label="Fisioterapeuta Lii, inicio">
          <span className="brand-icon">
            <Image src="/images/Logo.jpg" alt="Logo La Fisioterapeuta Li" width={32} height={32} />
          </span>
          La Fisioterapeuta Li
        </a>
        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="nav-cta" href="/acceso">Acceso al Dashboard <span>↗</span></a>
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
        <div className="hero-art-wrap">
          <div className="hero-art-accent" aria-hidden="true" />
          <div className="hero-art">
            <Image
              src="/images/Rodilla.jpg"
              alt="Sesión de fisioterapia con estimulación eléctrica en la rodilla"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 560px"
              className="hero-photo"
            />
            
          </div>
        </div>
      </section>

      <section id="nosotros" className="intro">
        <div className="wrap intro-grid">
          <p className="eyebrow">ACERCA DE MÍ</p>
          <p className="intro-lead">Soy Lina Murillo, La Fisioterapeuta Li. Mi propósito es que encuentres una atención clara, humana y basada en tus necesidades, con enfoque en neurorrehabilitación y rehabilitación deportiva.</p>
        </div>
        <div className="wrap">
          <p className="credentials-label">Formación y certificaciones</p>
          <ul className="credentials-list">
            {credentials.map((item) => (
              <li key={item} className="credentials-item">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="servicios" className="services wrap">
        <div className="section-heading">
          <div><p className="eyebrow">SERVICIOS</p><h2>Un plan para volver a lo que te mueve.</h2></div>
          <p>Cada sesión se adapta a tu momento y objetivos, con seguimiento durante todo el proceso. Valoración inicial: $100.000 (gratis al adquirir un paquete de rehabilitación).</p>
        </div>
        <div className="service-list-wrap">
          <div className="service-list" ref={serviceListRef}>
            {services.map((service) => (
              <article className="service" key={service.number}>
                <div className="service-media">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 760px) 78vw, 300px" />
                  <span className="service-number">{service.number}</span>
                </div>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="service-footer">
                    <p className="service-price">{service.price}</p>
                    <a href="#reservas" aria-label={`Reservar ${service.title}`}>↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="service-nav">
            <button type="button" aria-label="Ver servicio anterior" onClick={() => scrollServices(-1)}>←</button>
            <button type="button" aria-label="Ver siguiente servicio" onClick={() => scrollServices(1)}>→</button>
          </div>
        </div>
        <div className="promo-banner">
          <p><strong>Programa de referidos:</strong> por cada 5 pacientes que agenden y asistan por tu recomendación, obtienes 10% OFF en tu próximo servicio o paquete.</p>
        </div>
      </section>

      <section id="horarios" className="schedule wrap">
        <div className="section-heading">
          <div><p className="eyebrow">HORARIOS Y SEDES</p><h2>Atención de lunes a domingo.</h2></div>
          <p>7:00 a.m. a 8:00 p.m. (franja de almuerzo de 12:00 p.m. a 2:00 p.m.).</p>
        </div>
        <div className="schedule-list">
          {schedule.map((place) => (
            <article className="schedule-item" key={place.title}>
              <h3>{place.title}</h3>
              <p>{place.text}</p>
            </article>
          ))}
        </div>
        <p className="schedule-note">La reserva de cita requiere el pago anticipado del 100%. Reagendamientos o cancelaciones con mínimo 24 a 48 horas de anticipación; de lo contrario, la cita se da por realizada.</p>
      </section>

      <section id="reservas" className="booking">
        <div className="wrap booking-grid">
          <div><p className="eyebrow">RESERVA TU ESPACIO</p><h2>Comienza tu proceso hoy.</h2><p className="booking-copy">Déjanos tus datos y te confirmaremos el horario disponible para tu primera valoración.</p><div className="contact-mini"><span>✦</span><p>¿Tienes preguntas?<br /><a href="https://wa.me/573113981422" target="_blank" rel="noopener noreferrer">WhatsApp 311 398 1422</a></p></div></div>
          <form onSubmit={handleSubmit}>
            {sent ? <div className="success"><strong>¡Gracias por escribirnos!</strong><p>Recibimos tu solicitud. Pronto confirmaremos tu cita.</p><button type="button" onClick={() => setSent(false)}>Enviar otra solicitud</button></div> : <>
              <label>Nombre completo<input required name="name" maxLength={100} placeholder="¿Cómo te llamas?" /></label>
              <label>Celular<input required type="tel" name="phone" maxLength={30} placeholder="Tu número de celular" /></label>
              <label>Servicio<select required name="service" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Valoración inicial</option><option>Rehabilitación física</option><option>Prescripción de ejercicio</option><option>Modulación postejercicio</option><option>Procedimientos especializados</option></select></label>
              {error && <p className="booking-error" role="alert">{error}</p>}
              <button className="button primary submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Enviando…" : <>Solicitar reserva <span>→</span></>}</button>
              <small>Al enviar aceptas ser contactado para coordinar tu cita.</small>
            </>}
          </form>
        </div>
      </section>
      <footer className="footer wrap">
      <a className="brand" href="#inicio">
        <span className="brand-icon">
          <Image src="/images/Logo.jpg" alt="Logo La Fisioterapeuta Li" width={28} height={28} />
        </span>
        La Fisioterapeuta Li
      </a>
      <div className="footer-links">
        <a href="https://www.instagram.com/lafisioterapeutali/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <p className="footer-payments">Pagos por Nequi / Llave: 311 398 1422 (Lina Murillo) o efectivo.</p>
      <p>© 2026 La Fisioterapeuta Li</p>
      </footer>
    </main>
  );
}