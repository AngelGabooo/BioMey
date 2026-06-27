'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin de ScrollTrigger solo en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    id: 1,
    name: 'María García',
    role: 'CEO, TechStart',
    content: 'Excelente trabajo, superó todas nuestras expectativas. El sitio web es rápido, moderno y fácil de administrar.',
    rating: 5,
    avatar: 'MG',
    company: 'TechStart',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'CTO, InnovateCorp',
    content: 'Un desarrollador excepcional. Entendió perfectamente nuestras necesidades y entregó un producto de alta calidad.',
    rating: 5,
    avatar: 'CR',
    company: 'InnovateCorp',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Fundadora, EcoGreen',
    content: 'La mejor experiencia de desarrollo que hemos tenido. Profesional, puntual y con un diseño impecable.',
    rating: 5,
    avatar: 'AM',
    company: 'EcoGreen',
  },
  {
    id: 4,
    name: 'David López',
    role: 'Director, TechHub',
    content: 'Increíble capacidad para transformar ideas complejas en soluciones funcionales. Su atención al detalle es excepcional.',
    rating: 5,
    avatar: 'DL',
    company: 'TechHub',
  },
  {
    id: 5,
    name: 'Laura Fernández',
    role: 'CEO, DigitalWave',
    content: 'Un profesional completo. Aporta valor estratégico a cada proyecto. Altamente recomendado.',
    rating: 5,
    avatar: 'LF',
    company: 'DigitalWave',
  },
  {
    id: 6,
    name: 'Javier Méndez',
    role: 'CTO, CloudSolutions',
    content: 'Excelente comunicación y entrega impecable. Transformó nuestra visión en un producto digital superior.',
    rating: 5,
    avatar: 'JM',
    company: 'CloudSolutions',
  },
];

const VISIBLE = 3;

export const TestimonialsSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const autoRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const [current, setCurrent]   = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalPages = useCallback(() =>
    isMobile ? testimonials.length : testimonials.length - VISIBLE + 1,
  [isMobile]);

  // ── CANVAS ──────────────────────────────────────────────────
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
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.1 + 0.2, a: Math.random() * 0.3 + 0.06,
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
        const d  = Math.sqrt(dx * dx + dy * dy);
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

    // ── Elementos a animar ──
    const headerItems = content.querySelectorAll('.tm-header-item');
    const cards = content.querySelectorAll('.tm-card-animate');
    const dots = content.querySelector('.tm-dots-animate');
    const stat = content.querySelector('.tm-stat-animate');

    // ── Estado inicial: Header "destruido" ──
    gsap.set(headerItems, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotationX: -20,
      filter: 'blur(4px)',
    });

    // ── Estado inicial: Dots ──
    gsap.set(dots, {
      opacity: 0,
      y: 30,
      scale: 0.7,
    });

    // ── Estado inicial: Stat ──
    gsap.set(stat, {
      opacity: 0,
      y: 40,
      scale: 0.8,
      filter: 'blur(3px)',
    });

    // ── Estado inicial: Cada card se "rompe" en partes ──
    cards.forEach((card) => {
      const num = card.querySelector('.tm-card-num');
      const avatar = card.querySelector('.tm-avatar');
      const name = card.querySelector('.tm-name');
      const role = card.querySelector('.tm-role');
      const stars = card.querySelector('.tm-stars');
      const quote = card.querySelector('.tm-quote');
      const content = card.querySelector('.tm-content');
      const divider = card.querySelector('.tm-card-divider');
      const company = card.querySelector('.tm-company');

      // Posiciones iniciales diferentes para cada parte
      gsap.set(num, { 
        opacity: 0, 
        x: -30, 
        rotation: -10, 
        scale: 0.5,
        filter: 'blur(2px)'
      });
      
      gsap.set(avatar, { 
        opacity: 0, 
        scale: 0, 
        rotation: -180,
        filter: 'blur(3px)'
      });
      
      gsap.set(name, { 
        opacity: 0, 
        y: -20, 
        rotationX: -30,
        filter: 'blur(3px)'
      });
      
      gsap.set(role, { 
        opacity: 0, 
        x: -15,
        filter: 'blur(2px)'
      });
      
      gsap.set(stars, { 
        opacity: 0, 
        scale: 0.5,
        filter: 'blur(2px)'
      });
      
      gsap.set(quote, { 
        opacity: 0, 
        scale: 0.3,
        rotation: -15,
        filter: 'blur(3px)'
      });
      
      gsap.set(content, { 
        opacity: 0, 
        y: 20,
        filter: 'blur(2px)'
      });
      
      gsap.set(divider, { 
        opacity: 0, 
        scaleX: 0
      });
      
      gsap.set(company, { 
        opacity: 0, 
        y: 15,
        filter: 'blur(2px)'
      });
    });

    // ── Timeline de construcción ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    // 1. Header se construye
    tl.to(headerItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.08,
    }, 0)

    // 2. Cada card se construye con stagger
    cards.forEach((card, cardIndex) => {
      const num = card.querySelector('.tm-card-num');
      const avatar = card.querySelector('.tm-avatar');
      const name = card.querySelector('.tm-name');
      const role = card.querySelector('.tm-role');
      const stars = card.querySelector('.tm-stars');
      const quote = card.querySelector('.tm-quote');
      const content = card.querySelector('.tm-content');
      const divider = card.querySelector('.tm-card-divider');
      const company = card.querySelector('.tm-company');

      const delay = 0.15 + cardIndex * 0.12;

      // Número
      tl.to(num, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, delay)

      // Avatar (aparece con efecto de giro)
      .to(avatar, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: 'back.out(2)',
      }, '-=0.2')

      // Nombre
      .to(name, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.15')

      // Role
      .to(role, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.1')

      // Estrellas
      .to(stars, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, '-=0.1')

      // Quote
      .to(quote, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, '-=0.1')

      // Contenido
      .to(content, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.1')

      // Divider
      .to(divider, {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.05')

      // Company
      .to(company, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.35,
        ease: 'power2.out',
      }, '-=0.05');
    });

    // 3. Dots aparecen
    tl.to(dots, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.6)

    // 4. Stat aparece
    .to(stat, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, 0.7);

    // ── Limpiar ──
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ── RESPONSIVE ──────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── SLIDE ───────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    setCurrent(prev => {
      const pages = isMobile ? testimonials.length : testimonials.length - VISIBLE + 1;
      const next  = ((idx % pages) + pages) % pages;
      if (trackRef.current && wrapRef.current) {
        const sw = isMobile
          ? wrapRef.current.offsetWidth
          : (wrapRef.current.offsetWidth - 24) / VISIBLE;
        trackRef.current.style.transform = `translateX(-${next * sw}px)`;
      }
      return next;
    });
  }, [isMobile]);

  // ── AUTOPLAY ────────────────────────────────────────────────
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo(current + 1), 4000);
  }, [current, goTo]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => { startAuto(); return stopAuto; }, [current, startAuto, stopAuto]);

  // ── TOUCH ───────────────────────────────────────────────────
  const touchStart = useRef(0);

  return (
    <>
   

      <section
        ref={sectionRef}
        className="tm-root"
        id="testimonios"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        <div className="tm-grid-bg" />
        <div className="tm-glow" />
        <div className="tm-noise" />
        <div className="tm-scanlines" />
        <div className="tm-topline" />

        <div 
          ref={contentRef}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '88px 28px 96px' }}
        >

          {/* HEADER - cada elemento con clase tm-header-item */}
          <div style={{ maxWidth: 520, marginBottom: 0 }}>
            <div className="tm-badge tm-header-item">
              <span className="tm-dot-pulse" />
              {'<'}/{'>'} Clientes
            </div>
            <p className="tm-eyebrow tm-header-item">// testimonials.tsx</p>
            <span className="tm-dline tm-header-item" />
            <h2 className="tm-title tm-header-item">
              LO QUE DICEN<br />
              <span className="tm-outline">MIS CLIENTES</span>
            </h2>
            <p className="tm-sub tm-header-item">Experiencias reales de quienes ya confiaron en mi trabajo.</p>
          </div>

          {/* CAROUSEL */}
          <div
            ref={wrapRef}
            style={{ overflow: 'hidden', marginTop: 52 }}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
            onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const dx = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
            }}
          >
            <div ref={trackRef} className="tm-track">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={`tm-slide ${isMobile ? 'tm-slide-mobile' : 'tm-slide-desktop'}`}
                >
                  <div className="tm-card tm-card-animate">
                    <div className="tm-corner tm-corner-tl" />
                    <div className="tm-corner tm-corner-tr" />
                    <div className="tm-corner tm-corner-bl" />
                    <div className="tm-corner tm-corner-br" />

                    <div className="tm-card-num">
                      {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div className="tm-avatar">{t.avatar}</div>
                      <div>
                        <div className="tm-name">{t.name}</div>
                        <div className="tm-role">{t.role}</div>
                      </div>
                    </div>

                    <div className="tm-stars" style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <span key={s} className="tm-star" style={{ fontSize: 11, color: '#fff' }}>★</span>
                      ))}
                    </div>

                    <div className="tm-quote">"</div>
                    <p className="tm-content">{t.content}</p>
                    <div className="tm-card-divider" />
                    <div className="tm-company">{t.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOTS */}
          <div className="tm-dots-animate" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 32 }}>
            {Array.from({ length: totalPages() }).map((_, i) => (
              <button key={i} className="tm-dot-btn" onClick={() => goTo(i)} aria-label={`Ir al testimonio ${i + 1}`}>
                <div className={`tm-dot-bar${i === current ? ' active' : ''}`} />
              </button>
            ))}
          </div>

          {/* STAT */}
          <div className="tm-stat-animate" style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <div className="tm-stat">
              <span className="tm-dot-pulse" />
              <span className="tm-stat-val">{testimonials.length}</span> clientes satisfechos
              <div className="tm-stat-sep" />
              <span className="tm-stat-val">5.0</span> ★ rating
            </div>
          </div>

        </div>
        <div className="tm-bline" />
      </section>
    </>
  );
};