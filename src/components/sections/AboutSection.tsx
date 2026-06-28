'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export const AboutSection = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imgWrapRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const magnetBtn1   = useRef<HTMLAnchorElement>(null);
  const magnetBtn2   = useRef<HTMLAnchorElement>(null);

  // ── CANVAS PARTÍCULAS ─────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = (sectionRef.current?.offsetHeight || window.innerHeight);
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = sectionRef.current?.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.35 + 0.08,
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); };
  }, []);

  // ── GSAP ─────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      let gsap: any, ST: any;
      try {
        const a = await import('gsap');
        const b = await import('gsap/ScrollTrigger');
        gsap = a.gsap; ST = b.ScrollTrigger;
        gsap.registerPlugin(ST);
      } catch {
        return;
      }
      run(gsap, ST);
    };

    const run = (gsap: any, ST: any) => {
      const section = sectionRef.current;

      // ── Split del título ──
      const titleEl = titleRef.current;
      if (titleEl && !titleEl.querySelector('.ab-ch')) {
        // Texto original: "CÓDIGO CON PROPÓSITO"
        const raw = "CÓDIGO CON PROPÓSITO";
        
        // Dividir en dos líneas: "CÓDIGO" y "CON PROPÓSITO"
        const partes = raw.split(' ');
        const primeraLinea = partes[0]; // "CÓDIGO"
        const segundaLinea = partes.slice(1).join(' '); // "CON PROPÓSITO"
        
        // Crear el HTML con las letras separadas
        const line1Chars = primeraLinea.split('').map(c => 
          `<span class="ab-ch" style="display:inline-block;opacity:0;transform:translateY(70px) rotateX(-85deg);transform-origin:center bottom">${c}</span>`
        ).join('');
        
        const line2Chars = segundaLinea.split('').map(c => {
          if (c === ' ') {
            return `<span class="ab-ch" style="display:inline-block;opacity:0;transform:translateY(70px) rotateX(-85deg);transform-origin:center bottom">&nbsp;</span>`;
          }
          return `<span class="ab-ch" style="display:inline-block;opacity:0;transform:translateY(70px) rotateX(-85deg);transform-origin:center bottom">${c}</span>`;
        }).join('');
        
        // Unir con un salto de línea
       titleEl.innerHTML = `
  <span style="display:block">${line1Chars}</span>
  <span style="display:block; 
               -webkit-text-stroke: 2.5px #06b6d4; 
               color: transparent;">
    ${line2Chars}
  </span>
`;
      }

      // ── Estados iniciales ──
      gsap.set(contentRef.current, { opacity: 0, y: 40 });
      gsap.set(statsRef.current?.querySelectorAll('.ab-si') || [], { opacity: 0, y: 30, scale: 0.8 });
      gsap.set(timelineRef.current?.querySelectorAll('.ab-tl-item') || [], { opacity: 0, x: -20 });
      gsap.set(imgWrapRef.current, { opacity: 0, scale: 0.92, x: -30 });

      // ── ScrollTrigger reveal ──
      ST.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
          tl.to(imgWrapRef.current, { opacity: 1, scale: 1, x: 0, duration: 1.1 }, 0)
            .to('.ab-ch', { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.022 }, 0.15)
            .to(contentRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.35)
            .to(statsRef.current?.querySelectorAll('.ab-si') || [], {
              opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(2)',
            }, 0.55)
            .to(timelineRef.current?.querySelectorAll('.ab-tl-item') || [], {
              opacity: 1, x: 0, duration: 0.5, stagger: 0.12,
            }, 0.7);

          // Contadores
          [
            { sel: '#ab-n0', end: 5,   sfx: '+' },
            { sel: '#ab-n1', end: 50,  sfx: '+' },
            { sel: '#ab-n2', end: 10,  sfx: '+' },
          ].forEach(({ sel, end, sfx }) => {
            const el = document.querySelector(sel);
            if (!el) return;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end, duration: 2, delay: 0.8, ease: 'power2.out',
              onUpdate() { el.textContent = Math.round(obj.v) + sfx; },
            });
          });
        },
      });

      // ── Clip-path del badge disponible ──
      gsap.fromTo('.ab-badge', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      });

      // ── Parallax scroll ──
      gsap.to(canvasRef.current, {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to(imgWrapRef.current, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });

      // ── Botones magnéticos ──
      [magnetBtn1, magnetBtn2].forEach(ref => {
        const b = ref.current; if (!b) return;
        b.addEventListener('mousemove', (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          gsap.to(b, { x: (e.clientX - r.left - r.width/2) * 0.38, y: (e.clientY - r.top - r.height/2) * 0.38, duration: 0.3, ease: 'power2.out' });
        });
        b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' }));
      });

      // ── Foto: scramble filter al hover ──
      const img = imgWrapRef.current?.querySelector('img');
      if (img) {
        img.addEventListener('mouseenter', () => gsap.to(img, { filter: 'grayscale(0%) brightness(1.08)', duration: 0.5 }));
        img.addEventListener('mouseleave', () => gsap.to(img, { filter: 'grayscale(100%) brightness(0.9)', duration: 0.5 }));
      }

      return () => ST.getAll().forEach((t: any) => t.kill());
    };
    load();
  }, []);

  const TIMELINE = [
    { year: '2023–hoy', role: 'Senior Full Stack Dev', company: 'Freelance / Remoto', tag: 'actual' },
    { year: '2021–2023', role: 'Frontend Engineer',    company: 'Startup SaaS · CDMX',   tag: '' },
    { year: '2019–2021', role: 'Web Developer Jr.',    company: 'Agencia Digital',        tag: '' },
  ];

  const SKILLS_MARQUEE = [
    'Resolución de problemas', 'Código limpio', 'Comunicación técnica',
    'Trabajo en equipo', 'Entrega a tiempo', 'Aprendizaje continuo',
    'Mentoría', 'Diseño centrado en usuario',
  ];

  return (
    <section
      ref={sectionRef}
      className="ab-root"
      id="sobre-mi"
      style={{ position: 'relative', overflow: 'hidden', paddingBottom: 0 }}
    >
      {/* Fondos */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, willChange: 'transform' }} />
      <div className="ab-grid" />
      <div className="ab-glow" />
      <div className="ab-noise" />
      <div className="ab-scanlines" />
      <div className="ab-topline" />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '96px 32px 80px' }}>

        {/* GRID PRINCIPAL */}
        <div
          className="ab-main-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
        >

          {/* ══ COLUMNA IZQUIERDA: IMAGEN ══ */}
          <div className="ab-img-col" ref={imgWrapRef}>
            <div className="ab-img-outer">
              <div className="ab-img-badge-top">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0l2 6h6l-5 3.5 2 6L8 12l-5 3.5 2-6L0 6h6z"/>
                </svg>
                Sobre mí
              </div>

              <div style={{ position: 'relative' }}>
                <div className="ab-hex-frame" />
                <div className="ab-img-hex">
                  <Image
                    src="/img/perfil.png"
                    alt="Angel Gabriel García Samayoa — Desarrollador Web"
                    width={600}
                    height={700}
                    priority
                  />
                </div>
              </div>

              <div className="ab-img-badge-bot">
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff', animation: 'ab-pd 2s infinite', flexShrink: 0 }} />
                Disponible para proyectos
              </div>
            </div>

            <div className="ab-terminal">
              <div className="ab-terminal-bar">
                <div className="ab-terminal-dot" />
                <div className="ab-terminal-dot" />
                <div className="ab-terminal-dot" />
              </div>
              <div className="ab-terminal-code">
                <span className="cm">{'// perfil.ts'}</span><br />
                <span className="kw">const</span> developer = {'{'}<br />
                &nbsp;&nbsp;name: <span className="str">"Angel Gabriel"</span>,<br />
                &nbsp;&nbsp;location: <span className="str">"Guatemala 🌎"</span>,<br />
                &nbsp;&nbsp;focus: <span className="str">"Full Stack Dev"</span>,<br />
                &nbsp;&nbsp;available: <span className="kw">true</span>,<br />
                {'}'};<br />
                <span className="ab-cursor-blink" />
              </div>
            </div>
          </div>

          {/* ══ COLUMNA DERECHA: CONTENIDO ══ */}
          <div ref={contentRef} className="ab-content-col">
            <div className="ab-badge">
              <span className="ab-sdot" />
              {'<'}/{'>'} Conoce al desarrollador
            </div>

            <p className="ab-eyebrow">// about_me.tsx</p>
            <span className="ab-dline" />
            <h2 ref={titleRef} className="ab-title">
              {/* El contenido se genera en el useEffect */}
            </h2>

            <p className="ab-mono">// especialidad: Software Development Engineer</p>

            <p className="ab-desc">
              Soy un desarrollador web apasionado por transformar ideas complejas
              en experiencias digitales limpias y funcionales. Mi enfoque combina
              precisión técnica con sensibilidad de diseño — cada proyecto es
              una oportunidad de crear algo significativo.
            </p>

            <blockquote className="ab-quote">
              "Cada línea de código debería tener un propósito claro y resolver
              un problema real para las personas que lo usan."
            </blockquote>

            <div ref={statsRef} className="ab-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 36 }}>
              {[
                { id: 'ab-n0', init: '0+', label: 'Años exp.' },
                { id: 'ab-n1', init: '0+', label: 'Proyectos' },
                { id: 'ab-n2', init: '0+', label: 'Países' },
              ].map(s => (
                <div key={s.id} className="ab-si">
                  <span id={s.id} className="ab-snum">{s.init}</span>
                  <span className="ab-slbl">{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 0, justifyContent: 'center' }}>
              <a ref={magnetBtn1} href="#contacto" className="ab-btn-p">
                Trabajemos juntos
                <svg className="ab-arr" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <a ref={magnetBtn2} href="#portafolio" className="ab-btn-g">
                Ver trabajo
                <svg className="ab-arr" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            <div className="ab-cdiv" />

            <div ref={timelineRef} className="ab-timeline">
              <p className="ab-tl-header">// experiencia</p>
              {TIMELINE.map((item, i) => (
                <div key={i} className="ab-tl-item">
                  <div className="ab-tl-left">
                    <div className={`ab-tl-dot ${item.tag}`} />
                    {i < TIMELINE.length - 1 && <div className="ab-tl-line" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="ab-tl-year">{item.year}</p>
                    <p className="ab-tl-role">
                      {item.role}
                      {item.tag && <span className="ab-tl-tag">{item.tag}</span>}
                    </p>
                    <p className="ab-tl-company">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="ab-marquee-wrap">
          <div className="ab-marquee-track">
            {[...SKILLS_MARQUEE, ...SKILLS_MARQUEE].map((s, i) => (
              <span key={i} className="ab-mtag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="ab-bline" />
    </section>
  );
};