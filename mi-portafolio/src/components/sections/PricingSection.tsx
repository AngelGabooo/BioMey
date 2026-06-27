'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin de ScrollTrigger solo en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const plans = [
  {
    name: 'Básico',
    price: '$2,999',
    priceSub: '/ proyecto',
    description: 'Perfecto para empezar tu presencia digital.',
    features: [
      'Sitio web responsive',
      'Hasta 5 páginas',
      'Formulario de contacto',
      'SEO básico',
      '1 mes de soporte',
      'Hosting incluido',
    ],
    popular: false,
    code: '01 / 03',
    cta: 'Comenzar proyecto',
  },
  {
    name: 'Profesional',
    price: '$6,999',
    priceSub: '/ proyecto',
    description: 'Ideal para negocios que quieren crecer online.',
    features: [
      'Sitio web personalizado',
      'Hasta 10 páginas',
      'E-commerce básico',
      'SEO avanzado',
      '3 meses de soporte',
      'Analytics integrado',
      'Panel de administración',
    ],
    popular: true,
    code: '02 / 03',
    cta: 'Comenzar proyecto',
  },
  {
    name: 'Empresarial',
    price: 'Custom',
    priceSub: 'a medida',
    description: 'Para grandes proyectos que requieren soluciones únicas.',
    features: [
      'Solución completa',
      'Páginas ilimitadas',
      'E-commerce completo',
      'SEO premium',
      'Soporte prioritario',
      'Consultoría incluida',
      'Escalabilidad garantizada',
    ],
    popular: false,
    code: '03 / 03',
    cta: 'Contactar',
  },
];

const CheckIcon = () => (
  <span style={{
    width: 14, height: 14, flexShrink: 0,
    border: '1px solid rgba(255,255,255,.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'border-color .25s',
  }}>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path d="M1.5 4L3.5 6L6.5 2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  </span>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    // ── Elementos a animar ──
    const headerItems = content.querySelectorAll('.pr-header-item');
    const cards = content.querySelectorAll('.pr-card-animate');
    
    // ── Estado inicial: Header "destruido" ──
    gsap.set(headerItems, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotationX: -20,
      filter: 'blur(4px)',
    });

    // ── Estado inicial: Cards "destruidas" ──
    cards.forEach((card) => {
      // Cada card se "rompe" en partes
      const num = card.querySelector('.pr-num');
      const name = card.querySelector('.pr-plan-name');
      const price = card.querySelector('.pr-price');
      const priceSub = card.querySelector('.pr-price-sub');
      const desc = card.querySelector('.pr-desc');
      const divider = card.querySelector('.pr-divider');
      const features = card.querySelector('.pr-features-list');
      const btn = card.querySelector('.pr-btn');

      // Posiciones iniciales diferentes para cada parte
      gsap.set(num, { opacity: 0, x: -30, rotation: -10, scale: 0.5 });
      gsap.set(name, { opacity: 0, y: -30, rotationX: -40, filter: 'blur(3px)' });
      gsap.set(price, { opacity: 0, scale: 0.3, rotation: -15, y: 20 });
      gsap.set(priceSub, { opacity: 0, x: -20, y: -10 });
      gsap.set(desc, { opacity: 0, y: 30, filter: 'blur(2px)' });
      gsap.set(divider, { opacity: 0, scaleX: 0 });
      
      // Features: cada ítem viene desde diferentes lados
      const featureItems = features?.querySelectorAll('li') || [];
      featureItems.forEach((item, i) => {
        const side = i % 2 === 0 ? -20 : 20;
        gsap.set(item, { 
          opacity: 0, 
          x: side, 
          scale: 0.7,
          filter: 'blur(2px)'
        });
      });
      
      gsap.set(btn, { 
        opacity: 0, 
        y: 30, 
        scale: 0.8,
        rotation: -5,
        filter: 'blur(3px)'
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
      const num = card.querySelector('.pr-num');
      const name = card.querySelector('.pr-plan-name');
      const price = card.querySelector('.pr-price');
      const priceSub = card.querySelector('.pr-price-sub');
      const desc = card.querySelector('.pr-desc');
      const divider = card.querySelector('.pr-divider');
      const features = card.querySelector('.pr-features-list');
      const btn = card.querySelector('.pr-btn');
      const featureItems = features?.querySelectorAll('li') || [];

      // Construcción de cada card
      tl
        .to(num, {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.5)',
        }, 0.2 + cardIndex * 0.15)
        
        .to(name, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.1')
        
        .to(price, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.5,
          ease: 'back.out(2)',
        }, '-=0.1')
        
        .to(priceSub, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.1')
        
        .to(desc, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.1')
        
        .to(divider, {
          opacity: 1,
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.1')
        
        // Features: cada ítem aparece con stagger
        .to(featureItems, {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }, '-=0.1')
        
        // Botón
        .to(btn, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'back.out(1.7)',
        }, '-=0.05');
    });

    // ── Limpiar ──
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      

      <section
        ref={sectionRef}
        className="pr-root"
        id="precios"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        <div className="pr-grid-bg" />
        <div className="pr-glow" />
        <div className="pr-noise" />
        <div className="pr-scanlines" />
        <div className="pr-topline" />

        <div 
          ref={contentRef}
          style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '80px 20px 80px' }}
        >

          {/* HEADER - cada elemento con clase pr-header-item */}
          <div className="pr-header" style={{ marginBottom: 0, maxWidth: 520 }}>
            <div className="pr-badge pr-header-item">
              <span className="pr-dot" />
              {'<'}/{'>'} Inversión
            </div>
            <p className="pr-eyebrow pr-header-item">// pricing.tsx</p>
            <span className="pr-dline pr-header-item" />
            <h2 className="pr-title pr-header-item">
              PLANES Y<br />
              <span className="pr-outline">PRECIOS</span>
            </h2>
            <p className="pr-sub pr-header-item">Elige el plan que mejor se adapte a tus necesidades.</p>
          </div>

          {/* GRID - cada card con clase pr-card-animate */}
          <div className="pr-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 52 }}>
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`pr-card pr-card-animate${plan.popular ? ' popular' : ''}`}
              >
                <div className="pr-corner pr-corner-tl" />
                <div className="pr-corner pr-corner-tr" />
                <div className="pr-corner pr-corner-bl" />
                <div className="pr-corner pr-corner-br" />

                <div className="pr-num">
                  <span>{plan.code}</span>
                  {plan.popular && <span className="pr-popular-tag">Más popular</span>}
                </div>

                <p className="pr-plan-name">{plan.name}</p>
                <p className="pr-price">{plan.price}</p>
                <p className="pr-price-sub">{plan.priceSub}</p>
                <p className="pr-desc">{plan.description}</p>

                <div className="pr-divider" />

                <ul className="pr-features-list" style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 24px', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 10 
                }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`pr-btn${plan.popular ? '' : ' pr-btn-ghost'}`}>
                  <span>{plan.cta}</span>
                  <span className="pr-btn-arrow"><ArrowIcon /></span>
                </button>
              </div>
            ))}
          </div>

        </div>
        <div className="pr-bline" />
      </section>
    </>
  );
};