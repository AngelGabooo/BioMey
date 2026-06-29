'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  Printer,
  FileText,
  Smartphone,
  Wrench,
  Shield,
  Camera,
  Monitor,
  Palette,
  HardDrive,
  X,
  Info,
  MessageCircle,
  Globe,
  Mail,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const extraServices = [
  // ── Documentos ──
  {
    id: 'tramites-digitales',
    icon: FileText,
    color: '#0ea5e9',
    title: 'Trámites Digitales',
    description: 'Citas SAT, INE, Pasaporte, IMSS y más en línea.',
    longDescription:
      'Brindamos apoyo para realizar diferentes trámites digitales y agendar citas en plataformas oficiales. Te guiamos durante todo el proceso para que obtengas tu comprobante o cita correctamente.',
    features: [
      'Citas SAT',
      'Citas INE',
      'Citas Pasaporte',
      'Citas IMSS',
      'Citas ISSSTE',
      'Registro de Becas',
      'Constancia de Situación Fiscal',
      'CURP y documentos oficiales',
    ],
    price: 'Desde $100',
    cat: 'Documentos',
    hot: true,
  },
  {
    id: 'curp',
    icon: FileText,
    color: '#f59e0b',
    title: 'CURP',
    description: 'Consulta e impresión inmediata de tu CURP.',
    longDescription: 'Consulta e impresión de CURP actualizada de forma oficial y rápida.',
    features: ['Consulta oficial', 'Impresión', 'Entrega inmediata'],
    price: '$15',
    cat: 'Documentos',
    hot: false,
  },
  {
    id: 'rfc',
    icon: FileText,
    color: '#8b5cf6',
    title: 'RFC y Constancia Fiscal',
    description: 'Trámites ante el SAT rápidos y seguros.',
    longDescription: 'Obtención de RFC y constancias de situación fiscal ante el SAT.',
    features: ['RFC', 'Constancia', 'Actualización'],
    price: 'Desde $150 - 250',
    cat: 'Documentos',
    hot: false,
  },
  {
    id: 'acta',
    icon: FileText,
    color: '#ef4444',
    title: 'Actas de Nacimiento',
    description: 'Impresión oficial a través de RENAPO.',
    longDescription: 'Impresión de actas de nacimiento actualizadas con formato oficial.',
    features: ['RENAPO', 'Formato oficial', 'Entrega inmediata'],
    price: 'Desde $150',
    cat: 'Documentos',
    hot: false,
  },
  {
    id: 'recibo',
    icon: FileText,
    color: '#22c55e',
    title: 'Recibos CFE',
    description: 'Impresión rápida de recibos de luz.',
    longDescription: 'Impresión de recibos de luz CFE en formato oficial.',
    features: ['Impresión inmediata', 'Formato oficial'],
    price: '$15',
    cat: 'Documentos',
    hot: false,
  },

  // ── Diseño & Web ──
  {
    id: 'paginas-web',
    icon: Globe,
    color: '#06b6d4',
    title: 'Páginas Web',
    description: 'Sitios modernos y rápidos para impulsar tu negocio.',
    longDescription:
      'Desarrollamos páginas web profesionales, adaptables a celulares, optimizadas para buscadores y con diseño moderno.',
    features: [
      'Diseño responsivo',
      'SEO básico',
      'Formulario de contacto',
      'WhatsApp',
      'Hosting y dominio (opcional)',
    ],
    price: 'Desde $1,999',
    cat: 'Diseño & Web',
    hot: true,
  },
  {
    id: 'logos',
    icon: Palette,
    color: '#f97316',
    title: 'Diseño de Logos',
    description: 'Creamos la identidad visual de tu negocio.',
    longDescription:
      'Diseñamos logotipos modernos y profesionales para empresas, negocios y emprendimientos.',
    features: ['3 propuestas', 'Revisiones incluidas', 'PNG / SVG / PDF', 'Fondo transparente'],
    price: 'Desde $500',
    cat: 'Diseño & Web',
    hot: true,
  },
  {
    id: 'correo',
    icon: Mail,
    color: '#8b5cf6',
    title: 'Correo Empresarial',
    description: 'Correos profesionales con tu dominio.',
    longDescription:
      'Configuramos correos empresariales para brindar una imagen profesional a tu negocio.',
    features: ['Google Workspace', 'Microsoft 365', 'Configuración completa', 'Soporte'],
    price: 'Desde $300',
    cat: 'Diseño & Web',
    hot: false,
  },

  // ── Dispositivos ──
  {
    id: 'celulares',
    icon: Smartphone,
    color: '#22c55e',
    title: 'Servicios para Celulares',
    description: 'Formateo, cuentas Google y configuración básica.',
    longDescription:
      'Realizamos servicios básicos para celulares Android: creación de cuenta Google, instalación de apps, formateo y configuración inicial.',
    features: [
      'Formateo',
      'Cuenta Google',
      'Descarga de aplicaciones',
      'Configuración inicial',
      'Transferencia de datos',
    ],
    price: 'Desde $150',
    cat: 'Dispositivos',
    hot: true,
  },
  {
    id: 'transferencia',
    icon: HardDrive,
    color: '#0ea5e9',
    title: 'Transferencia de Datos',
    description: 'Pasamos tu información de un dispositivo a otro.',
    longDescription:
      'Transferimos fotografías, videos, contactos, documentos y aplicaciones entre dispositivos.',
    features: ['Fotos', 'Videos', 'Contactos', 'Documentos', 'Aplicaciones'],
    price: 'Desde $150',
    cat: 'Dispositivos',
    hot: false,
  },
  {
    id: 'camaras',
    icon: Camera,
    color: '#eab308',
    title: 'Cámaras de Seguridad',
    description: 'Instalación profesional de cámaras CCTV.',
    longDescription:
      'Instalamos y configuramos cámaras de seguridad con acceso desde el celular.',
    features: ['Instalación', 'Configuración', 'Desde tu celular', 'Capacitación'],
    price: 'Desde $200 por cámara',
    cat: 'Dispositivos',
    hot: false,
  },

  // ── Mantenimiento ──
  {
    id: 'preventivo',
    icon: Shield,
    color: '#10b981',
    title: 'Mantenimiento Preventivo',
    description: 'Evita fallas y prolonga la vida de tu computadora.',
    longDescription:
      'Limpieza física, optimización del sistema y revisión general para prevenir futuras fallas.',
    features: [
      'Limpieza interna',
      'Pasta térmica',
      'Optimización Windows',
      'Actualización de drivers',
    ],
    price: 'Desde $250',
    cat: 'Mantenimiento',
    hot: false,
  },
  {
    id: 'correctivo',
    icon: Wrench,
    color: '#f43f5e',
    title: 'Mantenimiento Correctivo',
    description: 'Solucionamos problemas de hardware y software.',
    longDescription:
      'Diagnosticamos y corregimos fallas en computadoras y laptops para restaurar su funcionamiento.',
    features: ['Diagnóstico', 'Corrección de errores', 'Reemplazo de componentes', 'Pruebas'],
    price: 'Desde $350',
    cat: 'Mantenimiento',
    hot: false,
  },
  {
    id: 'formateo',
    icon: HardDrive,
    color: '#3b82f6',
    title: 'Formateo e Instalación',
    description: 'Deja tu computadora como nueva con Windows.',
    longDescription:
      'Instalamos Windows, drivers y programas básicos para que tu equipo quede listo para trabajar.',
    features: ['Windows 10/11', 'Drivers', 'Chrome / Adobe / WinRAR', 'Configuración inicial'],
    price: 'Desde $400',
    cat: 'Mantenimiento',
    hot: false,
  },
  {
    id: 'antivirus',
    icon: Shield,
    color: '#14b8a6',
    title: 'Antivirus y Seguridad',
    description: 'Protege tu computadora contra virus y amenazas.',
    longDescription:
      'Instalamos antivirus, eliminamos amenazas y verificamos el estado de seguridad del equipo.',
    features: ['Instalación de antivirus', 'Escaneo completo', 'Eliminación de amenazas'],
    price: 'Desde $150',
    cat: 'Mantenimiento',
    hot: false,
  },

  // ── Software ──
  {
    id: 'software',
    icon: Monitor,
    color: '#6366f1',
    title: 'Instalación de Software',
    description: 'Instalamos los programas que necesitas.',
    longDescription:
      'Instalamos Microsoft Office, navegadores, lectores PDF, antivirus y demás programas esenciales.',
    features: ['Microsoft Office', 'Google Chrome', 'Adobe Reader', 'WinRAR', 'Antivirus'],
    price: 'Desde $200',
    cat: 'Software',
    hot: false,
  },
  {
    id: 'impresoras',
    icon: Printer,
    color: '#f59e0b',
    title: 'Impresoras',
    description: 'Instalación y configuración de cualquier impresora.',
    longDescription:
      'Instalamos y configuramos impresoras de cualquier marca. Solucionamos problemas de conexión, errores y drivers.',
    features: ['Drivers', 'Conexión USB y WiFi', 'Solución de errores', 'Configuración'],
    price: 'Desde $150',
    cat: 'Software',
    hot: false,
  },
  {
    id: 'soporte-remoto',
    icon: Monitor,
    color: '#6366f1',
    title: 'Soporte Remoto',
    description: 'Asistencia técnica sin salir de casa.',
    longDescription:
      'Brindamos soporte técnico remoto mediante AnyDesk o TeamViewer de forma rápida y segura.',
    features: ['Conexión segura', 'Sin desplazarte', 'Solución en minutos', 'PC y Laptop'],
    price: 'Desde $100',
    cat: 'Software',
    hot: false,
  },
];

const CAT_ORDER = ['Todos', 'Documentos', 'Diseño & Web', 'Dispositivos', 'Mantenimiento', 'Software'];

const CAT_COLORS: Record<string, string> = {
  Documentos: '#0ea5e9',
  'Diseño & Web': '#f97316',
  Dispositivos: '#22c55e',
  Mantenimiento: '#f43f5e',
  Software: '#6366f1',
  Todos: '#ffffff',
};

export const FeaturedExtraServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<typeof extraServices[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('Documentos');

  const filteredServices = useMemo(() => {
    if (activeFilter === 'Todos') return extraServices;
    return extraServices.filter((s) => s.cat === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { Todos: extraServices.length };
    extraServices.forEach((s) => {
      c[s.cat] = (c[s.cat] || 0) + 1;
    });
    return c;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const sec = sectionRef.current;
    if (!sec) return;
    const title = titleRef.current;
    gsap.set(title, { opacity: 0, y: 24 });
    gsap.to(title, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sec, start: 'top 82%', toggleActions: 'play none none reverse' },
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.fes-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.055, ease: 'power2.out' }
    );
  }, [filteredServices]);

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedService]);

  return (
    <>
      <section ref={sectionRef} className="py-16 px-4 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
<div className="text-center mb-10">
  <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 mb-4">
    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
    <span className="text-white/50 text-xs font-mono">SERVICIOS ADICIONALES</span>
  </div>
  
  {/* Título con el mismo grosor que "SERVICIOS DIGITALES" */}
  <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1]">
    <span className="text-white">SOLUCIONES</span>{' '}
    <span className="fes-title-outline">PRÁCTICAS</span>{' '}
    <span className="text-white">PARA TI</span>
  </h2>
  
  <p className="text-white/40 font-mono text-sm mt-4 tracking-[0.02em]">
    SERVICIOS QUE FACILITAN TU VIDA DIGITAL Y PERSONAL
  </p>
</div>

          {/* ── Filter pills ── */}
          <div className="fes-pills">
            {CAT_ORDER.map((cat) => {
              const color = CAT_COLORS[cat] || '#fff';
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  className={`fes-pill${isActive ? ' active' : ''}`}
                  style={{ color: isActive ? color : undefined, '--pill-color': color } as React.CSSProperties}
                  onClick={() => setActiveFilter(cat)}
                >
                  <span
                    className="fes-pill-dot"
                    style={{ background: color, opacity: isActive ? 1 : 0.45 }}
                  />
                  {cat}
                  <span className="fes-pill-count">{counts[cat] ?? 0}</span>
                </button>
              );
            })}
          </div>

          {/* ── Cards grid ── */}
          <div className="fes-grid" ref={gridRef}>
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="fes-card"
                  style={{ '--card-color': service.color } as React.CSSProperties}
                >
                  {service.hot && <span className="fes-card-hot">HOT</span>}

                  <div
                    className="fes-card-icon"
                    style={{ background: `${service.color}18`, border: `1px solid ${service.color}35` }}
                  >
                    <Icon size={20} style={{ color: service.color }} />
                  </div>

                  <h3 className="fes-card-title">{service.title}</h3>
                  <p className="fes-card-desc">{service.description}</p>

                  <div className="fes-card-tags">
                    {service.features.slice(0, 2).map((f, i) => (
                      <span key={i} className="fes-card-tag">{f}</span>
                    ))}
                  </div>

                  <p className="fes-card-price">{service.price}</p>

                  <div className="fes-card-actions">
                    <button className="fes-btn-info" onClick={() => setSelectedService(service)}>
                      <Info size={12} />
                      <span>Ver más</span>
                    </button>
                    <button className="fes-btn-contact" onClick={scrollToContact}>
                      <MessageCircle size={12} />
                      <span>Contactar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {selectedService && (
        <div className="fes-overlay" onClick={() => setSelectedService(null)}>
          <div className="fes-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fes-modal-close" onClick={() => setSelectedService(null)}>
              <X size={16} />
            </button>

            <div className="fes-modal-header">
              <div
                className="fes-modal-icon-wrap"
                style={{
                  background: `${selectedService.color}18`,
                  border: `1px solid ${selectedService.color}35`,
                }}
              >
                <selectedService.icon size={26} style={{ color: selectedService.color }} />
              </div>
              <div className="fes-modal-meta">
                <p className="fes-modal-cat">{selectedService.cat}</p>
                <h2 className="fes-modal-title">{selectedService.title}</h2>
                <p className="fes-modal-price" style={{ color: selectedService.color }}>
                  {selectedService.price}
                </p>
              </div>
            </div>

            <p className="fes-modal-desc">{selectedService.longDescription}</p>

            <p className="fes-modal-feat-label">Qué incluye</p>
            {selectedService.features.map((feature, i) => (
              <div key={i} className="fes-modal-feat">
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: selectedService.color, flexShrink: 0,
                  }}
                />
                {feature}
              </div>
            ))}

            <div className="fes-modal-actions">
              <button
                className="fes-modal-primary"
                onClick={() => { setSelectedService(null); scrollToContact(); }}
              >
                <MessageCircle size={15} />
                Solicitar este servicio
              </button>
              <button
                className="fes-modal-secondary"
                onClick={() => { setSelectedService(null); window.open('/servicios-plus', '_blank'); }}
              >
                Ver más servicios
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};