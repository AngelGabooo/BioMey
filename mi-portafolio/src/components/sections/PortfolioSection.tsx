'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

/*
  PORTFOLIO — B&W EDITION (matching Hero aesthetic)
  ──────────────────────────────────────────────────
  ✦ Fondo negro con noise + scanlines + grid
  ✦ Canvas: partículas blancas con conexiones
  ✦ Header con split-letter reveal (ScrollTrigger)
  ✦ Carrusel Embla con cards B&W
  ✦ Cards con marching-ants border + corner marks
  ✦ Imagen en grayscale → color al hover
  ✦ Overlay con info al hover (mismo estilo Hero)
  ✦ Indicadores de slide estilo Space Mono
  ✦ Badge de estado con pulsing dot
  ✦ CTA magnético
  ✦ Marquee de tecnologías usadas
  ✦ Línea de luz inferior animada
*/

const PROJECTS = [
  {
    id: 1,
    title: 'The Nomad Love Stories',
    description: 'Studio — Fiestas y eventos para nómadas digitales. Plataforma de reservas y comunidad global.',
    status: 'En desarrollo',
    imageUrl: 'https://static.wixstatic.com/media/0784b1_f744b6d88d4f434d939a9e7b8f4688f2~mv2.png/v1/fill/w_697,h_402,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/temp1.png',
    link: 'https://www.thenomadslovestories.com/en',
    tags: ['Next.js', 'Wix CMS', 'UI/UX'],
    code: 'PROJ_001',
  },
  {
    id: 2,
    title: 'La Feliz',
    description: 'Sistema de gestión integral para cadenas de cafeterías. POS, inventario y analytics en tiempo real.',
    status: 'Completado',
    imageUrl: 'https://static.wixstatic.com/media/0784b1_581c2cf340394dfe80e2af5c1aca770b~mv2.png/v1/fill/w_697,h_402,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/temp1.png',
    link: 'https://www.lafeliz.com/',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    code: 'PROJ_002',
  },
  {
    id: 3,
    title: 'Yoga Platform',
    description: 'Landing page para plataforma de yoga online. Diseño minimalista con booking integrado.',
    status: 'Completado',
    imageUrl: 'https://cdn.dribbble.com/userupload/15023899/file/original-f1d09c3fec6bb0b54841951f7dc43d47.png?format=webp&resize=640x480&vertical=center',
    link: '#',
    tags: ['Next.js', 'Tailwind', 'Stripe'],
    code: 'PROJ_003',
  },
  {
    id: 4,
    title: 'Agency Landing Page',
    description: 'Landing page para agencia de marketing digital. Animaciones avanzadas y conversión optimizada.',
    status: 'Completado',
    imageUrl: 'https://cdn.dribbble.com/userupload/25286809/file/original-0a2ba3c6dd8a133111981eb7414e28a8.png?format=webp&resize=640x480&vertical=center',
    link: 'https://nixtio.com/',
    tags: ['React', 'GSAP', 'Framer Motion'],
    code: 'PROJ_004',
  },
];

const TECH_MARQUEE = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
  'Tailwind CSS', 'GSAP', 'Framer Motion', 'Stripe', 'AWS',
  'Docker', 'Figma', 'GraphQL', 'Prisma',
];

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const magnetRef  = useRef<HTMLAnchorElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', slidesToScroll: 1, dragFree: false },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps]     = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded]   = useState<Record<number, boolean>>({});

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.plugins()?.autoplay?.play();
    return () => { emblaApi.plugins()?.autoplay?.stop(); };
  }, [emblaApi, onSelect]);

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
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.28 + 0.06,
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
          ctx.strokeStyle = `rgba(255,255,255,${0.055 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); };
  }, []);

  // ── GSAP ──────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      let gsap: any, ST: any;
      try {
        const a = await import('gsap');
        const b = await import('gsap/ScrollTrigger');
        gsap = a.gsap; ST = b.ScrollTrigger;
        gsap.registerPlugin(ST);
      } catch { return; }

      // ── Split del título ──
      const titleEl = titleRef.current;
      if (titleEl && !titleEl.querySelector('.pf-ch')) {
        // Texto original: "PORTAFOLIO DE TRABAJO"
        const raw = "PORTAFOLIO DE TRABAJO";
        
        // Dividir en dos líneas: "PORTAFOLIO" y "DE TRABAJO"
        const partes = raw.split(' ');
        const primeraLinea = partes[0]; // "PORTAFOLIO"
        const segundaLinea = partes.slice(1).join(' '); // "DE TRABAJO"
        
        // Crear el HTML con las letras separadas
        const line1Chars = primeraLinea.split('').map(c => 
          `<span class="pf-ch" style="display:inline-block;opacity:0;transform:translateY(65px) rotateX(-85deg);transform-origin:center bottom">${c}</span>`
        ).join('');
        
        const line2Chars = segundaLinea.split('').map(c => {
          if (c === ' ') {
            return `<span class="pf-ch" style="display:inline-block;opacity:0;transform:translateY(65px) rotateX(-85deg);transform-origin:center bottom">&nbsp;</span>`;
          }
          return `<span class="pf-ch" style="display:inline-block;opacity:0;transform:translateY(65px) rotateX(-85deg);transform-origin:center bottom">${c}</span>`;
        }).join('');
        
        // Unir con un salto de línea
        titleEl.innerHTML = `
          <span style="display:block">${line1Chars}</span>
          <span style="display:block; -webkit-text-stroke: 2px #fff; color: transparent;">${line2Chars}</span>
        `;
      }

      gsap.set('.pf-header-sub', { opacity: 0, y: 20 });
      gsap.set('.pf-carousel-wrap', { opacity: 0, y: 30 });

      ST.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
          tl.to('.pf-ch', { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.022 }, 0)
            .to('.pf-header-sub', { opacity: 1, y: 0, duration: 0.7 }, 0.28)
            .to('.pf-carousel-wrap', { opacity: 1, y: 0, duration: 0.8 }, 0.4);
        },
      });

      gsap.fromTo('.pf-badge', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.to(canvasRef.current, {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      // Botón magnético
      const b = magnetRef.current;
      if (b) {
        b.addEventListener('mousemove', (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.38, y: (e.clientY - r.top - r.height / 2) * 0.38, duration: 0.3, ease: 'power2.out' });
        });
        b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' }));
      }

      return () => ST.getAll().forEach((t: any) => t.kill());
    };
    load();
  }, []);

  const completedCount = PROJECTS.filter(p => p.status === 'Completado').length;

  return (
    <>
     

      <section
        ref={sectionRef}
        className="pf-root"
        id="portafolio"
        style={{ position: 'relative', overflow: 'hidden', paddingBottom: 0 }}
      >
        {/* Fondos */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, willChange: 'transform' }} />
        <div className="pf-grid" />
        <div className="pf-glow" />
        <div className="pf-noise" />
        <div className="pf-scanlines" />
        <div className="pf-topline" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '96px 32px 80px' }}>

          {/* ══ HEADER ══ */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="pf-badge">
              <span className="pf-dot" />
              {'<'}/{'>'} Proyectos recientes
            </div>
            <p className="pf-eyebrow">// portfolio.tsx</p>
            <span className="pf-dline" style={{ margin: '0 auto 12px' }} />
            <h2 ref={titleRef} className="pf-title">
              {/* El contenido se genera en el useEffect */}
            </h2>
            <p className="pf-header-sub" style={{
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              letterSpacing: '.08em', color: 'rgba(255,255,255,.3)',
              lineHeight: 1.8, maxWidth: 400, margin: '0 auto',
            }}>
              Soluciones digitales construidas con precisión técnica
              y foco en resultados reales para clientes reales.
            </p>
          </div>

          {/* ══ CARRUSEL ══ */}
          <div className="pf-carousel-wrap">
            <div style={{ overflow: 'hidden' }} ref={emblaRef}>
              <div style={{ display: 'flex', gap: 24 }}>
                {PROJECTS.map((project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className="pf-slide"
                    style={{ flex: '0 0 calc(55% - 12px)', minWidth: 0 }}
                  >
                    <div className="pf-card">
                      {/* Corner marks */}
                      <div className="pf-corner pf-corner-tl" />
                      <div className="pf-corner pf-corner-tr" />
                      <div className="pf-corner pf-corner-bl" />
                      <div className="pf-corner pf-corner-br" />

                      {/* Imagen */}
                      <div className="pf-img-wrap">
                        {/* Badge estado */}
                        <div className={`pf-status ${project.status === 'Completado' ? 'done' : 'wip'}`}>
                          <span className="pf-status-dot" />
                          {project.status}
                        </div>

                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 92vw, 55vw"
                          quality={90}
                          priority={index < 2}
                          style={{ opacity: imagesLoaded[index] ? 1 : 0, transition: 'opacity .4s' }}
                          onLoad={() => setImagesLoaded(prev => ({ ...prev, [index]: true }))}
                          onError={() => setImagesLoaded(prev => ({ ...prev, [index]: true }))}
                        />

                        {/* Skeleton */}
                        {!imagesLoaded[index] && (
                          <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'pf-sk 1.5s infinite',
                          }} />
                        )}

                        {/* Overlay con info */}
                        <div className="pf-overlay">
                          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                            {project.title}
                          </h3>
                          <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.7, marginBottom: 12 }}>
                            {project.description}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {project.tags.map(t => (
                              <span key={t} style={{
                                fontFamily: "'Space Mono', monospace", fontSize: 9,
                                letterSpacing: '.08em', padding: '3px 10px',
                                background: 'rgba(255,255,255,.15)', color: 'rgba(255,255,255,.8)',
                                border: '1px solid rgba(255,255,255,.2)',
                              }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Info debajo */}
                      <div className="pf-info">
                        <p className="pf-code">{project.code}</p>
                        <h3 className="pf-card-title">{project.title}</h3>
                        <p className="pf-card-desc">{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 0 }}>
                          {project.tags.map(t => (
                            <span key={t} className="pf-tag">{t}</span>
                          ))}
                        </div>
                        <div className="pf-card-div" />
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pf-card-cta"
                        >
                          Visitar proyecto
                          <svg className="pf-arr" width="13" height="13" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores */}
            <div className="pf-dots">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`pf-dot-btn ${i === selectedIndex ? 'active' : ''}`}
                  style={{ width: i === selectedIndex ? 40 : 16 }}
                  aria-label={`Proyecto ${i + 1}`}
                />
              ))}
            </div>

            {/* Autoplay indicator */}
            <div className="pf-autoplay">
              <span className="pf-autoplay-dot" />
              Desplazamiento automático
            </div>

            {/* Stats */}
            <div className="pf-stats">
              <span>{PROJECTS.length} proyectos</span>
              <div className="pf-stat-div" />
              <span>{completedCount} completados</span>
              <div className="pf-stat-div" />
              <span>{PROJECTS.length - completedCount} en desarrollo</span>
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div className="pf-cta-wrap">
            <p className="pf-cta-label">¿Listo para construir algo juntos?</p>
            <a ref={magnetRef} href="#contacto" className="pf-btn-p" style={{ willChange: 'transform' }}>
              Iniciar proyecto
              <svg className="pf-arr" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ══ MARQUEE DE TECNOLOGÍAS ══ */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="pf-marquee-wrap">
            <div className="pf-marquee-track">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                <span key={i} className="pf-mtag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="pf-bline" />
      </section>
    </>
  );
};