'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

// Registrar el plugin de ScrollTrigger solo en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── TUS CREDENCIALES DE EMAILJS ──
const EMAILJS_CONFIG = {
  PUBLIC_KEY: '9o1-iq4oNrAxy0XDo',      // <--- REEMPLAZA CON TU PUBLIC KEY
  SERVICE_ID: 'service_nmcqlce',          // <--- TU SERVICE ID
  TEMPLATE_ID: 'template_kd0vifi',        // <--- TU TEMPLATE ID
};

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.1 + 0.2,
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

    const headerItems = content.querySelectorAll('.ct-header-item');
    const infoItems = content.querySelectorAll('.ct-info-item');
    const scheduleItem = content.querySelector('.ct-schedule-item');
    const formCard = content.querySelector('.ct-form-card');
    const formFields = content.querySelectorAll('.ct-form-field');
    const formBtn = content.querySelector('.ct-form-btn');

    gsap.set(headerItems, {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotationX: -30,
      filter: 'blur(4px)',
    });

    gsap.set(infoItems, {
      opacity: 0,
      scale: 0.5,
      rotation: -15,
      x: (i) => i === 0 ? -80 : i === 1 ? 80 : 0,
      y: (i) => i === 0 ? -40 : i === 1 ? -40 : 60,
    });

    gsap.set(scheduleItem, {
      opacity: 0,
      y: 80,
      scale: 0.9,
      clipPath: 'inset(0 0 100% 0)',
    });

    gsap.set(formCard, {
      opacity: 0,
      scale: 0.8,
      rotationY: 30,
      rotationX: 15,
      filter: 'blur(6px)',
    });

    gsap.set(formFields, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: 'blur(3px)',
    });

    gsap.set(formBtn, {
      opacity: 0,
      scale: 0.5,
      rotation: -10,
      filter: 'blur(4px)',
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
      duration: 0.7,
      stagger: 0.08,
    }, 0)
    .to(infoItems, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    }, 0.3)
    .to(scheduleItem, {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.7,
      ease: 'power2.out',
    }, 0.5)
    .to(formCard, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
    }, 0.3)
    .to(formFields, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      stagger: 0.07,
      ease: 'power2.out',
    }, 0.5)
    .to(formBtn, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'back.out(2)',
    }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ── Enviar correo con EmailJS ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSent(false);

    try {
      // Inicializar EmailJS con tu public key
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Datos para enviar - Ajusta los nombres de los campos según tu plantilla
      const templateParams = {
        name: formData.name,           // {{name}} en tu plantilla
        email: formData.email,         // {{email}} en tu plantilla
        message: formData.message,     // {{message}} en tu plantilla
        title: 'Contacto desde portafolio', // {{title}} en tu plantilla
        to_email: '231183@ids.upchiapas.edu.mx', // Tu email
      };

      // Enviar el correo
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('Correo enviado:', response);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSent(false), 5000);

    } catch (err) {
      console.error('Error al enviar:', err);
      setError('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <section
        ref={sectionRef}
        className="ct-root"
        id="contacto"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        <div className="ct-grid-bg" />
        <div className="ct-glow" />
        <div className="ct-noise" />
        <div className="ct-scanlines" />
        <div className="ct-topline" />

        <div 
          ref={contentRef}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '72px 20px 80px' }}
        >

          {/* HEADER */}
          <div className="ct-header" style={{ marginBottom: 40, maxWidth: 520 }}>
            <div className="ct-badge ct-header-item">
              <span className="ct-dot" />
              {'<'}/{'>'} Contáctame
            </div>
            <p className="ct-eyebrow ct-header-item">// contact.tsx</p>
            <span className="ct-dline ct-header-item" />
            <h2 className="ct-title ct-header-item">
              ¿HABLAMOS<br />
              <span className="ct-outline">DE TU PROYECTO?</span>
            </h2>
            <p className="ct-sub ct-header-item">
              Cuéntame tu idea y trabajemos juntos para hacerla realidad.
            </p>
          </div>

          {/* GRID */}
          <div className="ct-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

            {/* INFO */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                {
                  icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
                  label: 'Email',
                  value: 'a20624646@gmail.com',
                },
                {
                  icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.59 2 2 0 012-2.18h3a2 2 0 012 1.72c.13 1 .37 1.98.72 2.91a2 2 0 01-.45 2.11L6.09 6.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.93.35 1.91.59 2.91.72A2 2 0 0122 16.92z',
                  label: 'Teléfono',
                  value: '+52 81 4438 4806',
                },
                {
                  icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0',
                  label: 'Ubicación',
                  value: 'Tuxtla Gutiérrez, Chiapas, México',
                },
              ].map((item, index) => (
                <div 
                  key={item.label} 
                  className="ct-info-item"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 12,
                    flexWrap: 'wrap'
                  }}
                >
                  <div className="ct-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <p className="ct-info-label">{item.label}</p>
                    <p className="ct-info-val" style={{ wordBreak: 'break-all' }}>{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="ct-schedule ct-schedule-item">
                <p className="ct-schedule-title">// horario.ts</p>
                {[['Lunes – Viernes', '06:00 – 11:00'], ['Sábado', '10:00 – 20:00']].map(([day, time]) => (
                  <div key={day} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: 11, 
                    color: 'rgba(255,255,255,.3)', 
                    padding: '3px 0',
                    flexWrap: 'wrap',
                    gap: 4
                  }}>
                    <span>{day}</span>
                    <span style={{ color: 'rgba(255,255,255,.5)' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <form className="ct-form-card" onSubmit={handleSubmit}>
              <div className="ct-corner ct-corner-tl" />
              <div className="ct-corner ct-corner-tr" />
              <div className="ct-corner ct-corner-bl" />
              <div className="ct-corner ct-corner-br" />

              <div className="ct-form-num ct-form-field">FORM / 01</div>

              {([
                { id: 'name',    label: 'Nombre completo',    type: 'text',  placeholder: 'Tu nombre' },
                { id: 'email',   label: 'Correo electrónico', type: 'email', placeholder: 'tu@email.com' },
              ] as const).map(f => (
                <div key={f.id} className="ct-form-field" style={{ marginBottom: 14 }}>
                  <label className="ct-label" htmlFor={`ct-${f.id}`}>{f.label}</label>
                  <input
                    className="ct-input"
                    id={`ct-${f.id}`}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={formData[f.id as 'name' | 'email']}
                    onChange={e => setFormData({ ...formData, [f.id]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <div className="ct-form-field" style={{ marginBottom: 14 }}>
                <label className="ct-label" htmlFor="ct-message">Mensaje</label>
                <textarea
                  className="ct-input"
                  id="ct-message"
                  placeholder="¿En qué puedo ayudarte?"
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <div className="ct-divider ct-form-field" />

              <button type="submit" className="ct-btn ct-form-btn" disabled={loading}>
                <span>{loading ? 'Enviando...' : 'Enviar mensaje'}</span>
                <span className="ct-btn-arrow">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              {sent && (
                <div className="ct-success">
                  <span className="ct-dot" />
                  Mensaje enviado — te respondo pronto.
                </div>
              )}

              {error && (
                <div className="ct-error">
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  {error}
                </div>
              )}
            </form>

          </div>
        </div>
        <div className="ct-bline" />
      </section>
    </>
  );
};