'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Registrar el plugin de ScrollTrigger solo en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Iconos SVG personalizados para cada servicio
const ICONS = {
  WEB_NEGOCIOS: {
    path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
    label: 'Web'
  },
  LANDING: {
    path: 'M12 2v20M2 12h20M2 6h20M2 18h20',
    label: 'Landing'
  },
  CATALOGO: {
    path: 'M3 4h18M3 12h18M3 20h18M8 8v16M16 8v16',
    label: 'Catálogo'
  },
  ECOMMERCE: {
    path: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    label: 'E-commerce'
  },
  SISTEMAS: {
    path: 'M4 4h16v16H4V4zM4 9h16M9 4v5M15 4v5M4 14h16',
    label: 'Sistemas'
  },
  REDISENO: {
    path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM2 8h20M8 8v12M16 8v12',
    label: 'Rediseño'
  },
  MANTENIMIENTO: {
    path: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
    label: 'Mantenimiento'
  },
  ASESORIA: {
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8v4M12 16h.01',
    label: 'Asesoría'
  },
};

const SERVICES = [
  {
    title: 'Páginas Web para Negocios',
    desc: 'Sitios modernos para restaurantes, tiendas, consultorios, estéticas, escuelas y emprendimientos.',
    features: ['Diseño responsive', 'WhatsApp', 'Contacto'],
    code: 'WEB_NEGOCIOS',
    icon: ICONS.WEB_NEGOCIOS,
  },
  {
    title: 'Landing Pages',
    desc: 'Páginas de una sola vista para promocionar servicios, productos, eventos o campañas.',
    features: ['Alta conversión', 'Secciones claras', 'Entrega rápida'],
    code: 'LANDING',
    icon: ICONS.LANDING,
  },
  {
    title: 'Catálogos Digitales',
    desc: 'Muestra productos o servicios sin necesidad de una tienda en línea completa.',
    features: ['Productos', 'Galería', 'WhatsApp'],
    code: 'CATALOGO',
    icon: ICONS.CATALOGO,
  },
  {
    title: 'Tiendas en Línea',
    desc: 'E-commerce para vender productos con carrito, pedidos y métodos de pago.',
    features: ['Carrito', 'Pagos', 'Inventario'],
    code: 'ECOMMERCE',
    icon: ICONS.ECOMMERCE,
  },
  {
    title: 'Sistemas Web',
    desc: 'Plataformas personalizadas para administrar información, usuarios, registros o procesos.',
    features: ['Login', 'Dashboard', 'Base de datos'],
    code: 'SISTEMAS',
    icon: ICONS.SISTEMAS,
  },
  {
    title: 'Rediseño Web',
    desc: 'Modernización de páginas antiguas para mejorar diseño, velocidad y experiencia de usuario.',
    features: ['Nuevo diseño', 'Responsive', 'Optimización'],
    code: 'REDISENO',
    icon: ICONS.REDISENO,
  },
  {
    title: 'Mantenimiento Web',
    desc: 'Actualizaciones, cambios de contenido, respaldo y soporte mensual para tu sitio.',
    features: ['Cambios', 'Soporte', 'Respaldos'],
    code: 'MANTENIMIENTO',
    icon: ICONS.MANTENIMIENTO,
  },
  {
    title: 'Asesoría Digital',
    desc: 'Orientación para elegir dominio, hosting, estructura de página y estrategia digital.',
    features: ['Dominio', 'Hosting', 'Estrategia'],
    code: 'ASESORIA',
    icon: ICONS.ASESORIA,
  },
];

const EXTRA_SERVICES = [
  'Consultoría técnica', 'Code review', 'Mentoría dev', 'Auditoría de código',
  'Migración de sistemas', 'Testing & QA', 'CI/CD pipelines', 'Documentación técnica',
];

export const ServicesSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const magnetRef   = useRef<HTMLAnchorElement>(null);

  // ── CANVAS ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = sectionRef.current?.offsetHeight || window.innerHeight;
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = sectionRef.current?.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.3 + 0.06,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); };
  }, []);

  // ── GSAP + SCROLLTRIGGER (EFECTO DE CONSTRUCCIÓN) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    const content = contentRef.current;
    if (!sec || !content) return;

    const headerItems = content.querySelectorAll('.sv-header-item');
    const cards = content.querySelectorAll('.sv-card-animate');
    const cta = content.querySelector('.sv-cta-animate');
    const marquee = content.querySelector('.sv-marquee-animate');
    const extraBtn = content.querySelector('.sv-extra-btn');

    gsap.set(headerItems, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotationX: -20,
      filter: 'blur(4px)',
    });

    gsap.set(cta, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: 'blur(3px)',
    });

    gsap.set(marquee, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: 'blur(2px)',
    });

    gsap.set(extraBtn, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: 'blur(3px)',
    });

    cards.forEach((card) => {
      const num = card.querySelector('.sv-num');
      const icon = card.querySelector('.sv-icon-wrap');
      const title = card.querySelector('.sv-card-title');
      const desc = card.querySelector('.sv-card-desc');
      const tags = card.querySelectorAll('.sv-tag');
      const divider = card.querySelector('.sv-card-div');
      const code = card.querySelector('.sv-card-code');
      const arrow = card.querySelector('.sv-card-arrow');

      gsap.set(num, { 
        opacity: 0, 
        x: -30, 
        rotation: -10, 
        scale: 0.5,
        filter: 'blur(2px)'
      });
      
      gsap.set(icon, { 
        opacity: 0, 
        scale: 0.3, 
        rotation: -45,
        filter: 'blur(3px)'
      });
      
      gsap.set(title, { 
        opacity: 0, 
        y: -20, 
        rotationX: -30,
        filter: 'blur(3px)'
      });
      
      gsap.set(desc, { 
        opacity: 0, 
        y: 20,
        filter: 'blur(2px)'
      });
      
      tags.forEach((tag) => {
        gsap.set(tag, { 
          opacity: 0, 
          scale: 0.5,
          rotation: -5,
          filter: 'blur(2px)'
        });
      });
      
      gsap.set(divider, { 
        opacity: 0, 
        scaleX: 0
      });
      
      gsap.set(code, { 
        opacity: 0, 
        x: -15,
        filter: 'blur(2px)'
      });
      
      gsap.set(arrow, { 
        opacity: 0, 
        x: 15,
        filter: 'blur(2px)'
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    tl.to(headerItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.08,
    }, 0)

    cards.forEach((card, cardIndex) => {
      const num = card.querySelector('.sv-num');
      const icon = card.querySelector('.sv-icon-wrap');
      const title = card.querySelector('.sv-card-title');
      const desc = card.querySelector('.sv-card-desc');
      const tags = card.querySelectorAll('.sv-tag');
      const divider = card.querySelector('.sv-card-div');
      const code = card.querySelector('.sv-card-code');
      const arrow = card.querySelector('.sv-card-arrow');

      const delay = 0.1 + cardIndex * 0.1;

      tl.to(num, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, delay)
      .to(icon, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'back.out(2)',
      }, '-=0.2')
      .to(title, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.15')
      .to(desc, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.1')
      .to(tags, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(1.5)',
      }, '-=0.05')
      .to(divider, {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.05')
      .to(code, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.05')
      .to(arrow, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.05');
    });

    tl.to(cta, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, 0.6)
    .to(extraBtn, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, 0.7)
    .to(marquee, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power2.out',
    }, 0.8);

    const b = magnetRef.current;
    if (b) {
      b.addEventListener('mousemove', (e: MouseEvent) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { 
          x: (e.clientX - r.left - r.width / 2) * 0.38, 
          y: (e.clientY - r.top - r.height / 2) * 0.38, 
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });
      b.addEventListener('mouseleave', () => 
        gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' })
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
   

      <section
        ref={sectionRef}
        className="sv-root"
        id="servicios"
        style={{ position: 'relative', overflow: 'hidden', paddingBottom: 0 }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, willChange: 'transform' }} />
        <div className="sv-grid" />
        <div className="sv-glow" />
        <div className="sv-noise" />
        <div className="sv-scanlines" />
        <div className="sv-topline" />

        <div 
          ref={contentRef}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '80px 20px 64px' }}
        >

          <div style={{ marginBottom: 40, maxWidth: 560 }}>
  <div className="sv-badge sv-header-item">
    <span className="sv-dot" />
    {'<'}/{'>'} Lo que ofrezco
  </div>
  <p className="sv-eyebrow sv-header-item">// services.tsx</p>
  <span className="sv-dline sv-header-item" />
  
  <h2 ref={titleRef} className="sv-title sv-header-item">
    SERVICIOS<br />
    <span className="sv-outline" style={{
      WebkitTextStroke: '2.5px #06b6d4',
      color: 'transparent'
    }}>
      DIGITALES
    </span>
  </h2>

  <p className="sv-header-sub sv-header-item" style={{
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px',
    letterSpacing: '.08em',
    color: 'rgba(255, 255, 255, 0.3)',
    lineHeight: 1.8,
    maxWidth: 420,
  }}>
    Soluciones técnicas a medida para cada etapa de tu producto digital —
    desde el concepto hasta el despliegue en producción.
  </p>
</div>

          <div
            className="sv-grid-services"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
          >
            {SERVICES.map((svc, i) => (
              <div key={svc.code} className="sv-card sv-card-animate">
                <div className="sv-corner sv-corner-tl" />
                <div className="sv-corner sv-corner-tr" />
                <div className="sv-corner sv-corner-bl" />
                <div className="sv-corner sv-corner-br" />

                <div className="sv-num">{(i + 1).toString().padStart(2, '0')} / {SERVICES.length.toString().padStart(2, '0')}</div>

                <div className="sv-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={svc.icon.path} />
                  </svg>
                </div>

                <h3 className="sv-card-title">{svc.title}</h3>

                <p className="sv-card-desc">{svc.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 0 }}>
                  {svc.features.map(f => (
                    <span key={f} className="sv-tag">{f}</span>
                  ))}
                </div>

                <div className="sv-card-div" />
                <div className="sv-card-footer">
                  <span className="sv-card-code">{svc.code}</span>
                  <span className="sv-card-arrow">
                    Ver más
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ══ CTAS WRAPPER ══ */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 20, 
            marginTop: 64 
          }}>
            {/* CTA Principal */}
            <div className="sv-cta-wrap sv-cta-animate" style={{ marginTop: 0 }}>
              <p className="sv-cta-label">¿Tienes un proyecto en mente?</p>
              <a ref={magnetRef} href="#contacto" className="sv-btn-p" style={{ willChange: 'transform' }}>
                Hablemos
                <svg className="sv-arr" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

           
          </div>

        </div>

        <div className="sv-marquee-animate" style={{ position: 'relative', zIndex: 2 }}>
          <div className="sv-marquee-wrap">
            <div className="sv-marquee-track">
              {[...EXTRA_SERVICES, ...EXTRA_SERVICES].map((s, i) => (
                <span key={i} className="sv-mtag">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="sv-bline" />
      </section>
    </>
  );
};