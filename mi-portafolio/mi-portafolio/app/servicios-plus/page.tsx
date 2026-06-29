'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ChevronRight, Printer, FileText, Monitor,
  Palette, Camera, Wrench, Shield, Phone, MapPin,
  CheckCircle, X, Wifi, HardDrive, Smartphone, Mail,
  Clock, Zap, Globe, ArrowUpRight, MessageCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WHATSAPP_BASE = 'https://wa.me/528144384806';
const PHONE = '8144384806';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  { id: 'paginas-web', icon: Globe, title: 'Páginas Web', short: 'Sitios modernos y rápidos para que tu negocio brille en internet.', long: 'Creamos sitios web profesionales, rápidos y optimizados para dispositivos móviles. Incluye diseño responsivo, integración con redes sociales, formularios de contacto y optimización SEO básica.', features: ['Diseño profesional y responsivo', 'Tiendas en línea (e-commerce)', 'Integración con redes sociales', 'Formularios de contacto', 'Optimización SEO básica'], price: 'Desde $2,999', cat: 'Diseño & Web', hot: true },
  { id: 'diseno-logos', icon: Palette, title: 'Diseño de Logos', short: 'Logos únicos y profesionales que definen tu identidad de marca.', long: 'Diseñamos logos personalizados que representan la identidad de tu marca. Incluye diseño profesional en alta calidad y entrega en múltiples formatos PNG, SVG y PDF para web, impresión y redes sociales.', features: ['Diseño 100% personalizado', 'Hasta 3 propuestas de concepto', 'Revisiones incluidas', 'Entrega en PNG, SVG y PDF', 'Derechos de autor incluidos'], price: 'Desde $500', cat: 'Diseño & Web', hot: true },
  { id: 'correo-empresarial', icon: Mail, title: 'Correo Empresarial', short: 'Correos profesionales con tu propio dominio.', long: 'Configuramos correos electrónicos profesionales con tu dominio en Google Workspace o Microsoft 365. Da imagen formal a tu negocio y administra comunicaciones de forma centralizada.', features: ['Correo con tu dominio', 'Google Workspace o M365', 'Múltiples cuentas', 'Configuración en dispositivos'], price: 'Desde $300', cat: 'Diseño & Web', hot: false },
  { id: 'desbloqueo', icon: Smartphone, title: 'Desbloqueo de Celulares', short: 'Liberamos tu celular de cualquier compañía, rápido y seguro.', long: 'Liberamos tu celular de cualquier compañía telefónica (Telcel, AT&T, Movistar) para que puedas usar cualquier operador. Proceso rápido, seguro y con garantía. Compatible con todas las marcas.', features: ['Todas las compañías', 'Todas las marcas y modelos', 'Proceso rápido y seguro', 'Garantía incluida'], price: 'Consultar', cat: 'Dispositivos', hot: false },
  { id: 'transferencia-datos', icon: HardDrive, title: 'Transferencia de Datos', short: 'Respaldo y migración de archivos entre equipos sin pérdida.', long: 'Transferimos tu información de un dispositivo a otro de forma segura. Ideal al cambiar de celular, laptop o cuando un equipo presenta fallas. Disponible para PC, Mac, Android e iOS.', features: ['PC, Mac, Android, iOS', 'Fotos, documentos y contactos', 'Migración completa o selectiva', 'Sin pérdida de datos'], price: 'Desde $150', cat: 'Dispositivos', hot: false },
  { id: 'camaras-seguridad', icon: Camera, title: 'Cámaras de Seguridad', short: 'Videovigilancia profesional con acceso desde tu celular.', long: 'Instalación y configuración de sistemas de videovigilancia CCTV e IP con visualización remota desde tu celular. Incluye cámaras, DVR/NVR, cableado y soporte técnico post-instalación.', features: ['Cámaras interiores y exteriores', 'Grabación 24/7', 'Visualización desde celular', 'Instalación incluida', 'Garantía en equipos'], price: 'Desde $1,500', cat: 'Dispositivos', hot: false },
  { id: 'mantenimiento-correctivo', icon: Wrench, title: 'Mant. Correctivo', short: 'Reparamos fallas de hardware y software para rescatar tu equipo.', long: 'Diagnosticamos y reparamos fallas en hardware y software de computadoras y laptops. Desde cambio de componentes hasta solución de errores de sistema. Diagnóstico sin costo.', features: ['Diagnóstico gratuito', 'Reparación de hardware', 'Solución de errores de software', 'Garantía en reparaciones'], price: 'Desde $350', cat: 'Mantenimiento', hot: false },
  { id: 'mantenimiento-preventivo', icon: Shield, title: 'Mant. Preventivo', short: 'Limpieza y optimización para que tu equipo dure más.', long: 'Realizamos limpieza física interna, optimización de software y revisión completa de tu equipo para prevenir fallas y mejorar el rendimiento. Incluye actualización de drivers.', features: ['Limpieza interna y pasta térmica', 'Optimización de Windows', 'Actualización de drivers', 'Revisión de disco duro'], price: 'Desde $250', cat: 'Mantenimiento', hot: false },
  { id: 'formateo', icon: HardDrive, title: 'Formateo y Reinstalación', short: 'Tu PC o laptop como nueva con Windows limpio y actualizado.', long: 'Servicio completo de formateo con reinstalación de Windows 10 u 11, instalación de drivers, configuración de usuario y paquetería básica. Respaldo de datos previo incluido.', features: ['Windows 10 u 11 limpio', 'Instalación de drivers', 'Paquetería básica incluida', 'Respaldo de datos previo'], price: 'Desde $400', cat: 'Mantenimiento', hot: false },
  { id: 'antivirus', icon: Shield, title: 'Antivirus y Seguridad', short: 'Eliminación de virus, malware y protección total para tu PC.', long: 'Diagnóstico y eliminación completa de virus, malware, ransomware y spyware. Instalación y configuración de antivirus actualizado. Tu equipo queda limpio y optimizado.', features: ['Eliminación de virus y malware', 'Instalación de antivirus', 'Limpieza de archivos corruptos', 'Optimización post-limpieza'], price: 'Desde $180', cat: 'Mantenimiento', hot: false },
  { id: 'instalacion-paquetes', icon: Monitor, title: 'Instalación de Paquetería', short: 'Instalamos Office, Windows y más software esencial.', long: 'Instalación y configuración de Microsoft Office (Word, Excel, PowerPoint, Outlook), Windows y otras herramientas esenciales. Activación y soporte incluidos.', features: ['Office (Word, Excel, PowerPoint)', 'Instalación de Windows', 'Configuración completa', 'Activación segura'], price: 'Desde $200', cat: 'Software', hot: false },
  { id: 'paqueteria-office', icon: Monitor, title: 'Paquetería Office', short: 'Instalamos y activamos Microsoft Office completo.', long: 'Instalación y activación de Microsoft Office con todas las herramientas esenciales: Word, Excel, PowerPoint, Outlook. Incluye soporte y configuración de cuenta Microsoft.', features: ['Word, Excel, PowerPoint', 'Outlook y OneNote', 'Configuración de cuenta Microsoft', 'Activación segura'], price: 'Desde $250', cat: 'Software', hot: false },
  { id: 'impresoras', icon: Printer, title: 'Impresoras', short: 'Instalación, configuración y solución de problemas.', long: 'Instalación y configuración de impresoras incluyendo drivers, conexión USB, WiFi y red compartida. Solucionamos errores de impresión, atascos y problemas de tinta.', features: ['Instalación de drivers', 'Conexión USB / WiFi / Red', 'Solución de errores', 'Configuración en red'], price: 'Desde $150', cat: 'Software', hot: false },
  { id: 'wifi-redes', icon: Wifi, title: 'Redes y WiFi', short: 'Configuración de routers y redes para hogar o negocio.', long: 'Configuramos tu router, repetidores, redes LAN y WiFi para hogar o negocio. Solucionamos problemas de conexión, velocidad lenta y caídas frecuentes.', features: ['Configuración de router', 'Extensores y repetidores WiFi', 'Redes LAN cableadas', 'Seguridad de red'], price: 'Desde $200', cat: 'Software', hot: false },
  { id: 'soporte-remoto', icon: Zap, title: 'Soporte Remoto', short: 'Asistencia técnica inmediata sin necesidad de moverte.', long: 'Resolvemos problemas de software, configuraciones y consultas técnicas de forma remota vía TeamViewer o AnyDesk. Rápido, cómodo y sin traer tu equipo.', features: ['Conexión segura y encriptada', 'Sin desplazarte', 'Solución en minutos', 'PC y Mac'], price: 'Desde $100/hr', cat: 'Software', hot: false },
  { id: 'recibos-luz', icon: FileText, title: 'Recibos de Luz', short: 'Impresión rápida de tu recibo CFE en formato oficial.', long: 'Impresión de recibos de luz CFE en formato oficial actualizado. Servicio rápido y confiable para que puedas realizar tus pagos sin complicaciones.', features: ['Impresión inmediata', 'Formato oficial CFE', 'Sin cita previa', 'Atención rápida'], price: '$15', cat: 'Documentos', hot: false },
  { id: 'actas-nacimiento', icon: FileText, title: 'Actas de Nacimiento', short: 'Trámite e impresión vía RENAPO, sin filas.', long: 'Gestionamos e imprimimos actas de nacimiento actualizadas vía RENAPO de manera rápida y segura. Trámite oficial con entrega inmediata.', features: ['Trámite en línea (RENAPO)', 'Formato oficial', 'Entrega inmediata', 'Sin filas'], price: 'Consultar', cat: 'Documentos', hot: false },
  { id: 'curp', icon: FileText, title: 'CURP', short: 'Impresión de tu CURP actualizada al momento.', long: 'Impresión de CURP actualizada al día desde la base oficial de RENAPO. Sin filas ni esperas.', features: ['Consulta oficial RENAPO', 'Actualizada al día', 'Impresión inmediata', 'Sin filas'], price: '$20', cat: 'Documentos', hot: false },
  { id: 'rfc', icon: FileText, title: 'RFC y Constancia Fiscal', short: 'RFC y constancias fiscales ante el SAT.', long: 'Apoyamos en el trámite del RFC ante el SAT, emisión de constancias de situación fiscal, recuperación de contraseña y consultas de perfil tributario.', features: ['Trámite de RFC', 'Constancia fiscal', 'Recuperación de contraseña SAT', 'Consultas fiscales'], price: 'Desde $80', cat: 'Documentos', hot: false },
  { id: 'comprobante', icon: FileText, title: 'Comprobante de Domicilio', short: 'Impresión de comprobantes válidos para trámites.', long: 'Imprimimos comprobantes de domicilio digitales de portales oficiales (CFE, Telmex, agua, predial). Válido para trámites bancarios, notariales y de identificación.', features: ['Portales oficiales', 'Válido para trámites', 'Alta calidad', 'Entrega inmediata'], price: '$20', cat: 'Documentos', hot: false },
  { id: 'asesoria', icon: Clock, title: 'Asesoría Tecnológica', short: 'Orientación experta para tus decisiones tecnológicas.', long: 'Te asesoramos en compra de equipos, elección de software y estrategias digitales para tu negocio o uso personal. Consulta personalizada enfocada en tus necesidades.', features: ['Compra de equipos', 'Elección de software', 'Estrategia digital', 'Consulta personalizada'], price: 'Desde $200/hr', cat: 'Software', hot: false },
];

const CATS = ['Todos', 'Diseño & Web', 'Dispositivos', 'Mantenimiento', 'Software', 'Documentos'];

const CAT_COLORS: Record<string, string> = {
  'Diseño & Web': '#06b6d4',
  'Dispositivos': '#a78bfa',
  'Mantenimiento': '#f59e0b',
  'Software': '#34d399',
  'Documentos': '#f472b6',
};

export default function ServiciosAdicionalesPage() {
  const [selected, setSelected] = useState<typeof SERVICES[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const catalogRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      let gsap: any, ST: any;
      try {
        const a = await import('gsap');
        const b = await import('gsap/ScrollTrigger');
        gsap = a.gsap;
        ST = b.ScrollTrigger;
        gsap.registerPlugin(ST);
      } catch { return; }

      const titleEl = titleRef.current;
      if (titleEl && !titleEl.querySelector('.anly-ch')) {
        const words = [
          { text: 'SOLUCIONES', class: 'anly-h1-accent' },
          { text: 'QUE TE', class: 'anly-h1-white' },
          { text: 'CONECTAN', class: 'anly-h1-ghost' },
        ];

        const wordsHtml = words.map(word => {
          const chars = word.text.split('').map(c => 
            `<span class="anly-ch" style="display:inline-block;opacity:0;transform:translateY(60px) rotateX(-85deg);transform-origin:center bottom">${c}</span>`
          ).join('');
          return `<span class="${word.class}" style="display:block;line-height:1.1">${chars}</span>`;
        }).join('');

        titleEl.innerHTML = wordsHtml;

        ST.create({
          trigger: titleEl,
          start: 'top bottom',
          onEnter: () => {
            gsap.to('.anly-ch', {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.6,
              stagger: 0.025,
              ease: 'power4.out',
            });
          },
        });
      }

      const heroDesc = document.querySelector('.anly-hero-desc');
      const heroCtas = document.querySelector('.anly-hero-ctas');
      const stats = statsRef.current?.querySelectorAll('.anly-stat') || [];
      const stripItems = stripRef.current?.querySelectorAll('.anly-strip-item') || [];
      const cards = catalogRef.current?.querySelectorAll('.anly-card') || [];
      const filters = document.querySelectorAll('.anly-filter');
      const cta = ctaRef.current;

      gsap.set(heroDesc, { opacity: 0, y: 30 });
      gsap.set(heroCtas, { opacity: 0, y: 30 });
      gsap.set(stats, { opacity: 0, y: 40, scale: 0.9 });
      gsap.set(stripItems, { opacity: 0, x: -20 });
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
      gsap.set(filters, { opacity: 0, y: 20 });
      gsap.set(cta, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.to(heroDesc, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .to(heroCtas, { opacity: 1, y: 0, duration: 0.6 }, 0.35)
        .to(stats, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }, 0.5)
        .to(stripItems, { opacity: 1, x: 0, duration: 0.4, stagger: 0.06 }, 0.8)
        .to(filters, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 }, 1.0)
        .to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)' }, 1.2)
        .to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }, 1.8);

      return () => {
        ST.getAll().forEach((t: any) => t.kill());
      };
    };
    load();
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      const orb1 = hero.querySelector<HTMLElement>('.anly-orb-1');
      const orb2 = hero.querySelector<HTMLElement>('.anly-orb-2');
      if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
      if (orb2) orb2.style.transform = `translate(${x * -0.6}px, ${y * -0.6}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const openWA = (svc?: typeof SERVICES[0]) => {
    const msg = svc
      ? `Hola, me interesa el servicio de *${svc.title}* (${svc.price}). ¿Me pueden dar más información?`
      : `Hola, me gustaría conocer más sobre sus servicios disponibles.`;
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const filtered = activeFilter === 'Todos' ? SERVICES : SERVICES.filter(s => s.cat === activeFilter);

  return (
    <>
    

      <div className="anly-root">
        {/* ── HERO ── */}
        <section className="anly-hero" ref={heroRef} aria-label="Encabezado">
          <div className="anly-hero-bg" />
          <div className="anly-hero-stripes" />
          <div className="anly-orb-1" />
          <div className="anly-orb-2" />

          <div className="anly-topbar">
            <Link href="/#servicios" className="anly-back">
              <ArrowLeft size={13} /> Volver a servicios
            </Link>
            <div className="anly-badge">
              <div className="anly-badge-dot" />
              Atención disponible
            </div>
          </div>

          <div className="anly-hero-body">
            <div className="anly-eyebrow">Servicios adicionales</div>
            <h1 className="anly-h1" ref={titleRef} />
            <p className="anly-hero-desc">
              Todo lo que tu negocio o vida digital necesita, en un solo lugar.
              Tecnología accesible, atención personalizada.
            </p>
            <div className="anly-hero-ctas">
              <button className="anly-btn-primary" onClick={() => openWA()}>
                <MessageCircle size={15} /> WhatsApp
              </button>
              <a href={`tel:+52${PHONE}`} className="anly-btn-outline">
                <Phone size={14} /> {PHONE}
              </a>
            </div>
          </div>

          <div className="anly-hero-stats" ref={statsRef}>
            {[
              { val: `${SERVICES.length}+`, label: 'Servicios disponibles' },
              { val: '+10', label: 'Años de experiencia' },
              { val: '100%', label: 'Satisfacción garantizada' },
              { val: '1 día', label: 'Tiempo de respuesta' },
            ].map(s => (
              <div key={s.label} className="anly-stat">
                <div className="anly-stat-val">{s.val}</div>
                <div className="anly-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <div className="anly-strip" ref={stripRef}>
          <a href={`tel:+52${PHONE}`} className="anly-strip-item">
            <Phone size={15} />
            <span className="anly-strip-num">{PHONE}</span>
          </a>
          <div className="anly-strip-sep" />
          <span className="anly-strip-item">
            <MapPin size={15} />
            Av. Central Norte — Ciber y Papelería Anly
          </span>
        </div>

        {/* ── CATALOG ── */}
        <section className="anly-catalog" ref={catalogRef} aria-label="Catálogo de servicios">
          <div className="anly-catalog-header">
            <div>
              <div className="anly-section-tag">Catálogo completo</div>
              <h2 className="anly-section-title">Todo lo que ofrecemos</h2>
            </div>
            <span className="anly-count-pill">{filtered.length} servicios</span>
          </div>

          <div className="anly-filters" role="group" aria-label="Filtrar por categoría">
            {CATS.map(cat => (
              <button
                key={cat}
                className={`anly-filter${activeFilter === cat ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="anly-grid">
            {filtered.map(svc => {
              const Icon = svc.icon;
              const catColor = CAT_COLORS[svc.cat] ?? '#06b6d4';
              return (
                <article
                  key={svc.id}
                  className={`anly-card${svc.hot ? ' hot' : ''}`}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setSelected(svc)}
                >
                  <div className="anly-card-toprow">
                    <div className="anly-card-icon"><Icon size={18} /></div>
                    {svc.hot
                      ? <div className="anly-hot-tag">Popular</div>
                      : <div className="anly-cat-tag" style={{ color: catColor, background: `${catColor}18`, border: `1px solid ${catColor}30` }}>{svc.cat}</div>
                    }
                  </div>

                  <h3 className="anly-card-title">{svc.title}</h3>
                  <p className="anly-card-short">{svc.short}</p>
                  <p className="anly-card-price">{svc.price}</p>

                  <div className="anly-card-features">
                    {svc.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="anly-card-feat">
                        <div className="anly-feat-dot" />
                        {f}
                      </div>
                    ))}
                    {svc.features.length > 3 && (
                      <div className="anly-card-feat" style={{ color: 'rgba(255,255,255,.18)' }}>
                        <div className="anly-feat-dot" style={{ opacity: .25 }} />
                        +{svc.features.length - 3} más incluidos
                      </div>
                    )}
                  </div>

                  <div className="anly-card-divider" />

                  <div className="anly-card-actions">
                    <button className="anly-card-btn-ghost" onClick={() => setSelected(svc)}>
                      Ver detalles
                    </button>
                    <button className="anly-card-btn-main" onClick={() => openWA(svc)}>
                      Solicitar <ArrowUpRight size={12} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="anly-cta-wrap">
          <div className="anly-cta" ref={ctaRef}>
            <div className="anly-cta-bg" />
            <div className="anly-cta-text">
              <div className="anly-cta-tag">¿No encontraste lo que buscas?</div>
              <h2 className="anly-cta-title">Si lo necesitas,<br />lo tenemos.</h2>
              <p className="anly-cta-sub">
                Pregúntanos. Tenemos muchas soluciones para ti<br />
                y te atendemos de forma personalizada.
              </p>
            </div>
            <div className="anly-cta-actions">
              <button className="anly-btn-primary" onClick={() => openWA()}>
                <MessageCircle size={15} /> WhatsApp
              </button>
              <a href={`tel:+52${PHONE}`} className="anly-btn-outline">
                <Phone size={14} /> Llamar ahora
              </a>
            </div>
          </div>
        </div>

        {/* ── MODAL ── */}
        {selected && (
          <div
            className="anly-overlay"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <div className="anly-modal" onClick={e => e.stopPropagation()}>
              <button
                className="anly-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
              >
                <X size={15} />
              </button>

              <div className="anly-modal-head">
                <div className="anly-modal-icon"><selected.icon size={20} /></div>
                {selected.hot && (
                  <div style={{ marginBottom: 8 }}>
                    <span className="anly-hot-tag">Popular</span>
                  </div>
                )}
                <h2 className="anly-modal-title">{selected.title}</h2>
                <p className="anly-modal-price">{selected.price}</p>
              </div>

              <div className="anly-modal-body">
                <p className="anly-modal-desc">{selected.long}</p>
                <p className="anly-modal-feats-label">Qué incluye</p>
                {selected.features.map((f, i) => (
                  <div key={i} className="anly-modal-feat">
                    <CheckCircle size={13} /> {f}
                  </div>
                ))}
                <div className="anly-modal-sep" />
                <div className="anly-modal-actions">
                  <button className="anly-modal-btn-p" onClick={() => openWA(selected)}>
                    <MessageCircle size={14} /> Solicitar por WhatsApp
                  </button>
                  <a href={`tel:+52${PHONE}`} className="anly-modal-btn-s">
                    <Phone size={13} /> Llamar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}