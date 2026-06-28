'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Info, X } from 'lucide-react';

// Registrar el plugin de ScrollTrigger solo en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Función para navegar a contacto ──
const scrollToContact = () => {
  const contactSection = document.getElementById('contacto');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const plans = [
  {
    name: 'Básico',
    price: '$1,999',
    priceSub: 'desde / proyecto',
    description: 'Ideal para emprendedores y pequeños negocios.',
    longDescription:
      'El plan Básico está pensado para emprendedores, profesionistas y pequeños negocios que desean tener presencia en internet con una página sencilla, moderna y adaptable a celulares.',
    features: [
      'Landing Page o hasta 4 secciones',
      'Diseño 100% responsive',
      'Botón de WhatsApp',
      'Formulario de contacto',
      'Mapa de Google',
      'Optimización básica',
      'Entrega de 3 a 5 días',
    ],
    extras: [
      { name: 'Dominio y hosting', price: 'Cotizar' },
      { name: 'Sección adicional', price: '$300 c/u' },
      { name: 'Soporte mensual', price: 'Desde $300/mes' },
    ],
    popular: false,
    code: '01 / 03',
    cta: 'Comenzar proyecto',
  },
  {
    name: 'Profesional',
    price: '$3,999',
    priceSub: 'desde / proyecto',
    description: 'Ideal para negocios que buscan una página más completa.',
    longDescription:
      'El plan Profesional es ideal para negocios que desean una página web más completa, con diseño personalizado, más secciones, mejor presentación visual e integración con redes sociales.',
    features: [
      'Hasta 8 páginas',
      'Diseño completamente personalizado',
      'Animaciones modernas',
      'SEO básico',
      'Galería de imágenes',
      'Integración con redes sociales',
      'Formularios avanzados',
      'Panel básico de administración si aplica',
      'Entrega de 7 a 10 días',
    ],
    extras: [
      { name: 'Dominio y hosting', price: 'Cotizar' },
      { name: 'Página adicional', price: '$250 c/u' },
      { name: 'Soporte mensual', price: 'Desde $500/mes' },
    ],
    popular: true,
    code: '02 / 03',
    cta: 'Comenzar proyecto',
  },
  {
    name: 'Premium',
    price: '$7,999',
    priceSub: 'desde / proyecto',
    description: 'Para proyectos que requieren soluciones personalizadas.',
    longDescription:
      'El plan Premium está pensado para empresas o proyectos que necesitan una solución más avanzada, como sistemas web, panel administrativo, base de datos, inicio de sesión o funciones personalizadas.',
    features: [
      'Diseño exclusivo y personalizado',
      'Sistema web a la medida',
      'Base de datos',
      'Inicio de sesión y gestión de usuarios',
      'Panel administrativo',
      'Integración con APIs',
      'Múltiples niveles de usuario',
      'Soporte prioritario',
    ],
    extras: [
      { name: 'Dominio y hosting', price: 'Cotizar' },
      { name: 'Módulos adicionales', price: 'Cotizar' },
      { name: 'Integraciones personalizadas', price: 'Cotizar' },
    ],
    popular: false,
    code: '03 / 03',
    cta: 'Solicitar cotización',
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
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);

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

    const headerItems = content.querySelectorAll('.pr-header-item');
    const cards = content.querySelectorAll('.pr-card-animate');
    
    gsap.set(headerItems, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotationX: -20,
      filter: 'blur(4px)',
    });

    cards.forEach((card) => {
      const num = card.querySelector('.pr-num');
      const name = card.querySelector('.pr-plan-name');
      const price = card.querySelector('.pr-price');
      const priceSub = card.querySelector('.pr-price-sub');
      const desc = card.querySelector('.pr-desc');
      const divider = card.querySelector('.pr-divider');
      const features = card.querySelector('.pr-features-list');
      const btn = card.querySelector('.pr-btn');
      const extraBtn = card.querySelector('.pr-extra-btn');

      gsap.set(num, { opacity: 0, x: -30, rotation: -10, scale: 0.5 });
      gsap.set(name, { opacity: 0, y: -30, rotationX: -40, filter: 'blur(3px)' });
      gsap.set(price, { opacity: 0, scale: 0.3, rotation: -15, y: 20 });
      gsap.set(priceSub, { opacity: 0, x: -20, y: -10 });
      gsap.set(desc, { opacity: 0, y: 30, filter: 'blur(2px)' });
      gsap.set(divider, { opacity: 0, scaleX: 0 });
      gsap.set(extraBtn, { opacity: 0, y: 20, scale: 0.8, filter: 'blur(2px)' });
      
      const featureItems = features?.querySelectorAll('li') || [];
      featureItems.forEach((item, i) => {
        const side = i % 2 === 0 ? -20 : 20;
        gsap.set(item, { opacity: 0, x: side, scale: 0.7, filter: 'blur(2px)' });
      });
      
      gsap.set(btn, { opacity: 0, y: 30, scale: 0.8, rotation: -5, filter: 'blur(3px)' });
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
      const num = card.querySelector('.pr-num');
      const name = card.querySelector('.pr-plan-name');
      const price = card.querySelector('.pr-price');
      const priceSub = card.querySelector('.pr-price-sub');
      const desc = card.querySelector('.pr-desc');
      const divider = card.querySelector('.pr-divider');
      const features = card.querySelector('.pr-features-list');
      const btn = card.querySelector('.pr-btn');
      const extraBtn = card.querySelector('.pr-extra-btn');
      const featureItems = features?.querySelectorAll('li') || [];

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
        .to(featureItems, {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }, '-=0.1')
        .to(extraBtn, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.05')
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // ── Cerrar modal ──
  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPlan]);

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

          <div className="pr-header" style={{ marginBottom: 0, maxWidth: 520 }}>
            <div className="pr-badge pr-header-item">
              <span className="pr-dot" />
              {'<'}/{'>'} Inversión
            </div>
            <p className="pr-eyebrow pr-header-item">// pricing.tsx</p>
            <span className="pr-dline pr-header-item" />
            <h2 className="pr-title pr-header-item">
  PLANES Y<br />
  <span 
    className="pr-outline"
    style={{ 
      WebkitTextStroke: '2.8px #06b6d4', 
      color: 'transparent',
      WebkitTextFillColor: 'transparent',
      paintOrder: 'stroke fill'
    }}
  >
    PRECIOS
  </span>
</h2>
            <p className="pr-sub pr-header-item">Elige el plan que mejor se adapte a tus necesidades.</p>
          </div>

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
                  margin: '0 0 16px', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 10 
                }}>
                  {plan.features.slice(0, 4).map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: 'rgba(255,255,255,.2)' }}>
                      <span style={{ width: 14, height: 14, flexShrink: 0 }} />
                      +{plan.features.length - 4} características más
                    </li>
                  )}
                </ul>

                <button 
                  className="pr-extra-btn"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <Info size={14} />
                  Ver detalles del plan
                </button>

                <button 
                  className={`pr-btn${plan.popular ? '' : ' pr-btn-ghost'}`}
                  onClick={scrollToContact}
                >
                  <span>{plan.cta}</span>
                  <span className="pr-btn-arrow"><ArrowIcon /></span>
                </button>
              </div>
            ))}
          </div>

        </div>
        <div className="pr-bline" />
      </section>

      {/* ── MODAL ── */}
      {selectedPlan && (
        <div className="pr-modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pr-modal-close" onClick={() => setSelectedPlan(null)}>
              <X size={18} />
            </button>

            <h2 className="pr-modal-title">{selectedPlan.name}</h2>
            <p className="pr-modal-price">{selectedPlan.price} <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,.3)' }}>{selectedPlan.priceSub}</span></p>

            <div className="pr-modal-desc">
              {selectedPlan.longDescription}
            </div>

            <p className="pr-modal-section-title">// Lo que incluye</p>
            {selectedPlan.features.map((f, i) => (
              <div key={i} className="pr-modal-feat">
                <CheckIcon />
                {f}
              </div>
            ))}

            <div className="pr-modal-extras">
              <p className="pr-modal-section-title" style={{ marginBottom: 6 }}>// Extras y personalización</p>
              <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.2)', marginBottom: 10 }}>
                Los precios mostrados son desde. El costo final puede variar según tus necesidades.
              </p>
              {selectedPlan.extras.map((extra, i) => (
                <div key={i} className="pr-modal-extra">
                  <span>{extra.name}</span>
                  <span className="pr-modal-extra-price">{extra.price}</span>
                </div>
              ))}
            </div>

            <button 
              className="pr-modal-btn"
              onClick={() => {
                setSelectedPlan(null);
                scrollToContact();
              }}
            >
              Solicitar este plan
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};