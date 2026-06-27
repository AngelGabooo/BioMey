'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const buttonsRef   = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const cursorRef    = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const magnetBtn1   = useRef<HTMLButtonElement>(null);
  const magnetBtn2   = useRef<HTMLButtonElement>(null);
  const trailRefs    = useRef<(HTMLDivElement | null)[]>([]);

  // ── CURSOR + TRAIL ──────────────────────────────────────────
  useEffect(() => {
    const cursor    = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const trails    = trailRefs.current;
    if (!cursor || !cursorDot) return;

    const TRAIL = 8;
    const positions = Array(TRAIL).fill({ x: 0, y: 0 });
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.14;
      curY += (mouseY - curY) * 0.14;
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';

      positions.unshift({ x: mouseX, y: mouseY });
      positions.pop();
      trails.forEach((el, i) => {
        if (!el) return;
        const pos = positions[i] || positions[0];
        el.style.left    = pos.x + 'px';
        el.style.top     = pos.y + 'px';
        el.style.opacity = String(((TRAIL - i) / TRAIL) * 0.25);
        el.style.transform = `translate(-50%, -50%) scale(${1 - i * 0.1})`;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    const hovers = document.querySelectorAll('button, a, [data-expand]');
    hovers.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cx'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cx'));
    });

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── CANVAS PARTÍCULAS B&W ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.4 + 0.1,
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
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - d / 130)})`;
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
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    if (!sec) return;

    // ── Split del título (SOLO UNA VEZ) ──
    const titleEl = titleRef.current;
    if (titleEl && !titleEl.querySelector('.ch')) {
      // Texto original dividido en dos líneas
      const line1 = "DESARROLLO";
      const line2 = "EXCEPCIONAL";
      
      // Creamos el HTML con las líneas separadas y letras divididas
      const line1Chars = line1.split('').map(c => 
        `<span class="ch" style="display:inline-block;opacity:0;transform:translateY(80px) rotateX(-90deg);transform-origin:center bottom">${c}</span>`
      ).join('');
      
      const line2Chars = line2.split('').map(c => 
        `<span class="ch" style="display:inline-block;opacity:0;transform:translateY(80px) rotateX(-90deg);transform-origin:center bottom">${c}</span>`
      ).join('');
      
      // Unimos con un <br /> entre líneas
      titleEl.innerHTML = `
        <span style="display:block">${line1Chars}</span>
        <span style="display:block; -webkit-text-stroke: 2px #fff; color: transparent;">${line2Chars}</span>
      `;
    }

    const els = [subtitleRef, descRef, buttonsRef].map(r => r.current).filter(Boolean);
    gsap.set(els, { opacity: 0, y: 32 });
    gsap.set(statsRef.current?.querySelectorAll('.si') || [], { opacity: 0, y: 50, scale: 0.75 });
    gsap.set(cardRef.current, { opacity: 0, x: 100, rotateY: -20 });

    gsap.fromTo('.sbadge', { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut', delay: 0.1,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.to('.ch', { opacity: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.025 }, 0.15)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
      .to(descRef.current,     { opacity: 1, y: 0, duration: 0.7 }, 0.55)
      .to(buttonsRef.current,  { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to(statsRef.current?.querySelectorAll('.si') || [], {
        opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(2)',
      }, 0.85)
      .to(cardRef.current, { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out' }, 0.3);

    [
      { id: '#sn0', end: 50,  sfx: '+' },
      { id: '#sn1', end: 100, sfx: '%' },
      { id: '#sn2', end: 247, sfx: '' },
    ].forEach(({ id, end, sfx }) => {
      const el = document.querySelector(id);
      if (!el) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 2.2, delay: 1.1, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.v) + sfx; },
      });
    });

    const card = cardRef.current, inner = cardInnerRef.current;
    if (card && inner) {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        gsap.to(inner, { rotateY: dx * 14, rotateX: -dy * 14, duration: 0.35, ease: 'power2.out', transformPerspective: 900 });
        const gl = card.querySelector('.cg') as HTMLElement;
        if (gl) gl.style.background = `radial-gradient(circle at ${(dx+1)*50}% ${(dy+1)*50}%, rgba(255,255,255,0.12) 0%, transparent 55%)`;
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' });
        const gl = card.querySelector('.cg') as HTMLElement;
        if (gl) gl.style.background = 'none';
      });
    }

    [magnetBtn1, magnetBtn2].forEach(ref => {
      const b = ref.current; if (!b) return;
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width/2) * 0.4, y: (e.clientY - r.top - r.height/2) * 0.4, duration: 0.3, ease: 'power2.out' });
      });
      b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' }));
    });

    const nameEl = nameRef.current;
    if (nameEl) {
      const orig = nameEl.innerText;
      const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&*';
      nameEl.addEventListener('mouseenter', () => {
        let it = 0;
        const iv = setInterval(() => {
          nameEl.innerText = orig.split('').map((c, i) =>
            i < it ? orig[i] : pool[Math.floor(Math.random() * pool.length)]
          ).join('');
          if (it >= orig.length) clearInterval(iv);
          it += 0.5;
        }, 38);
      });
    }

    const skillIcons = document.querySelectorAll('.sk-icon');
    skillIcons.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(el, { y: -6, scale: 1.15, duration: 0.25, ease: 'back.out(3)' }));
      el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' }));
    });

    gsap.to(canvasRef.current, { 
      yPercent: -28, 
      ease: 'none', 
      scrollTrigger: { 
        trigger: sec, 
        start: 'top top', 
        end: 'bottom top', 
        scrub: 1 
      } 
    });
    gsap.to('.lcol', { 
      yPercent: -10, 
      ease: 'none', 
      scrollTrigger: { 
        trigger: sec, 
        start: 'top top', 
        end: 'bottom top', 
        scrub: 1.5 
      } 
    });
    gsap.to(cardRef.current, { 
      yPercent: -20, 
      ease: 'none', 
      scrollTrigger: { 
        trigger: sec, 
        start: 'top top', 
        end: 'bottom top', 
        scrub: 1 
      } 
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const SKILLS = [
    { icon: '⌨️', label: 'Frontend' },
    { icon: '⚙️', label: 'Backend'  },
    { icon: '🚀', label: 'DevOps'   },
    { icon: '🗄️', label: 'Database' },
  ];

  const SOCIALS = [
    { 
      label: 'GitHub', 
      url: 'https://github.com/AngelGabooo',
      path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' 
    },
    { 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/angel-gabriel-garcia-4634432a3',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' 
    },
    { 
      label: 'X (Twitter)', 
      url: 'https://x.com/eg_angel2',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' 
    },
  ];

  const TECH = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind', 'GraphQL', 'Redis', 'AWS'];

  return (
    <>
      {/* Cursores */}
      <div ref={cursorRef} className="ccursor" />
      <div ref={cursorDotRef} className="cdot" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="ctrail" ref={el => { trailRefs.current[i] = el; }} />
      ))}

      <section
        ref={sectionRef}
        className="hero-root"
        style={{ 
          position: 'relative', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          overflow: 'hidden',
          paddingBottom: 40
        }}
      >
        {/* Fondos */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, willChange: 'transform' }} />
        <div className="gbg" />
        <div className="glow" />
        <div className="noise" />
        <div className="scanlines" />

        {/* Contenido central */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: 'auto', padding: '80px 32px' }}>
          <div className="hgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* ── IZQUIERDA ── */}
            <div className="lcol" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>

              <div>
                <div className="sbadge">
                  <span className="sdot" />
                  &lt;/&gt; Software Engineer · Disponible para proyectos
                </div>
              </div>

              <div>
                <span className="dline" />
                <h1 ref={titleRef} className="htitle">
                  {/* El contenido se genera en el useEffect */}
                </h1>
              </div>

              <div ref={subtitleRef} style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,.35)', letterSpacing: '.1em' }}>
                <Typewriter words={['React & Next.js', 'TypeScript', 'Node.js', 'Full Stack Dev', 'UI / UX Engineer']} />
              </div>

              <p ref={descRef} className="hdesc">
                Transformo ideas en experiencias digitales que superan expectativas.
                Cada línea de código, pensada para impactar.
              </p>

              <div ref={buttonsRef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button ref={magnetBtn1} className="btn-p">
                  Iniciar proyecto
                  <svg className="arr" width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button ref={magnetBtn2} className="btn-g">
                  Ver portfolio
                  <svg className="arr" width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { id: 'sn0', init: '0+',  label: 'Proyectos' },
                  { id: 'sn1', init: '0%',  label: 'Satisfacción' },
                  { id: 'sn2', init: '0',   label: 'Horas / año' },
                ].map(s => (
                  <div key={s.id} className="si">
                    <span id={s.id} className="snum">{s.init}</span>
                    <span className="slbl">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DERECHA — CARD ── */}
            <div ref={cardRef} className="card-wrap rcol" style={{ willChange: 'transform' }}>
              <div ref={cardInnerRef} className="card-inner">
                {/* Glare */}
                <div className="cg" />
                {/* Corner marks */}
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />

                {/* Avatar */}
                <div className="avatar">AG</div>

                {/* Nombre scramble */}
                <div ref={nameRef} className="nscramble" data-expand>ANGEL GABRIEL</div>
                <div style={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', marginTop: 3 }}>
                  GARCÍA SAMAYOA
                </div>

                <div style={{ textAlign: 'center', marginTop: 8 }}>
                  <div className="status-ring">
                    <span className="sring-dot" />
                    SOFTWARE DEV ENGINEER
                  </div>
                </div>

                <div className="cdiv" />

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginBottom: 16 }}>
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'].map(t => (
                    <span key={t} className="ttag">{t}</span>
                  ))}
                </div>

                {/* Skills */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
                  {SKILLS.map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div className="sk-icon">{s.icon}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: 'rgba(255,255,255,.25)', marginTop: 5, letterSpacing: '.1em' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Code snippet (aparece al hover en la card) */}
                <div className="code-snippet">
                  <span style={{ color: 'rgba(255,255,255,.25)' }}>const</span>{' '}
                  <span style={{ color: 'rgba(255,255,255,.55)' }}>dev</span>{' = {'}
                  <br />
                  {'  '}<span style={{ color: 'rgba(255,255,255,.35)' }}>name</span>{': '}
                  <span style={{ color: 'rgba(255,255,255,.55)' }}>"Angel Gabriel"</span>,
                  <br />
                  {'  '}<span style={{ color: 'rgba(255,255,255,.35)' }}>stack</span>{': '}
                  <span style={{ color: 'rgba(255,255,255,.55)' }}>["React","Node","TS"]</span>
                  <br />
                  {'}'}
                </div>

                <div className="cdiv" style={{ marginTop: 14 }} />

                {/* Socials */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  {SOCIALS.map(s => (
                    <a 
                      key={s.label} 
                      href={s.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="soc" 
                      aria-label={s.label}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MARQUEE DE TECNOLOGÍAS ── */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', marginTop: 'auto' }}>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...TECH, ...TECH].map((t, i) => (
                <span key={i} className="mtag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Línea inferior animada */}
        <div className="bline" />

        {/* Scroll indicator */}
        <div className="scroll-ind">
          <span>scroll</span>
          <div className="sline" />
        </div>
      </section>
    </>
  );
};

/* ── TYPEWRITER ── */
const Typewriter = ({ words }: { words: string[] }) => {
  const el = useRef<HTMLSpanElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const node = el.current; if (!node) return;
    let wi = 0, ci = 0, del = false;
    
    const tick = () => {
      const w = words[wi];
      del ? ci-- : ci++;
      node.textContent = w.slice(0, ci);
      
      if (!del && ci === w.length) { 
        del = true; 
        setIsComplete(true);
        setTimeout(tick, 1800); 
        return; 
      }
      if (del && ci === 0) { 
        del = false; 
        wi = (wi + 1) % words.length; 
        setIsComplete(false);
      }
      setTimeout(tick, del ? 55 : 95);
    };
    tick();
  }, [words]);
  
  return (
    <span>
      // especialidad:{' '}
      <span ref={el} className="twword" />
      <span className="twcur" style={{ opacity: isComplete ? 0 : 1 }} />
    </span>
  );
};