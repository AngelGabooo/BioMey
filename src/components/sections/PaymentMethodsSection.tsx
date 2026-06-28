'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const paymentMethods = [
  { name: 'Transferencia', description: 'Bancaria' },
  { name: 'BBVA', description: 'Banco' },
  { name: 'Mercado Pago', description: 'Digital' },
  { name: 'Efectivo', description: 'Presencial' },
  { name: 'SPEI', description: 'Transferencia inmediata' },
];

export const PaymentMethodsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const headerItems = section.querySelectorAll('.payment-header-item');

    gsap.set(headerItems, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotationX: -20,
      filter: 'blur(4px)',
    });

    gsap.set(itemsRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: 'blur(2px)',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
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

    tl.to(itemsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.4,
      stagger: 0.08,
      ease: 'back.out(1.7)',
    }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 20px',
        background: '#000',
        color: '#fff',
        fontFamily: "'Space Grotesk', sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Efectos visuales */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255,255,255,.03) 0%, transparent 65%)',
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: .03,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundSize: '180px',
        animation: 'sv-ns .4s steps(2) infinite',
      }} />
      
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        animation: 'sv-scan 8s linear infinite',
      }} />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent)',
        zIndex: 2,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.1), transparent)',
        backgroundSize: '300%',
        animation: 'sv-bl2 5s linear infinite',
        zIndex: 2,
      }} />

      {/* Contenido principal centrado */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <div className="payment-header-item" style={{ marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,.5)',
            border: '1px solid rgba(255,255,255,.12)',
            background: 'rgba(255,255,255,.03)',
            padding: '6px 14px',
            backdropFilter: 'blur(4px)',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 6px #fff',
              animation: 'sv-pd 2s ease-in-out infinite',
            }} />
            Pagos
          </div>
        </div>

        {/* Título en mayúsculas */}
        <h2
          ref={titleRef}
          className="payment-header-item"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: '.92',
            letterSpacing: '-.04em',
            color: '#fff',
            perspective: '800px',
            margin: '0 0 8px',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          MÉTODOS DE<br />
          <span style={{
            WebkitTextStroke: '2.5px #06b6d4',
            color: 'transparent',
            textTransform: 'uppercase',
          }}>
            PAGO
          </span>
        </h2>

        {/* Línea decorativa */}
        <div className="payment-header-item" style={{ marginBottom: 48 }}>
          <span style={{
            display: 'block',
            width: 60,
            height: '1px',
            background: 'rgba(255,255,255,.4)',
            margin: '0 auto',
          }} />
        </div>

        {/* Grid de métodos de pago - 5 columnas iguales */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
            width: '100%',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              style={{
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: '12px',
                padding: '28px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all .4s cubic-bezier(.22,1,.36,1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)';
                e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,.03)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Número decorativo */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '12px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '8px',
                letterSpacing: '.1em',
                color: 'rgba(255,255,255,.06)',
                fontWeight: 700,
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Nombre del método */}
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)',
                fontWeight: 600,
                color: '#fff',
                letterSpacing: '-.01em',
                textTransform: 'uppercase',
              }}>
                {method.name}
              </span>

              {/* Línea decorativa pequeña */}
              <div style={{
                width: 20,
                height: 1,
                background: 'rgba(255,255,255,.15)',
                margin: '4px 0',
                transition: 'width .3s ease',
              }} />

              {/* Descripción */}
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.5rem, 0.65vw, 0.65rem)',
                letterSpacing: '.12em',
                color: 'rgba(255,255,255,.25)',
                textTransform: 'uppercase',
              }}>
                {method.description}
              </span>
            </div>
          ))}
        </div>

        {/* Mensaje adicional */}
        <div
          className="payment-header-item"
          style={{
            marginTop: 48,
            padding: '16px 32px',
            border: '1px solid rgba(255,255,255,.06)',
            background: 'rgba(255,255,255,.02)',
            borderRadius: '8px',
            transition: 'all .3s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)';
            e.currentTarget.style.background = 'rgba(255,255,255,.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,.06)';
            e.currentTarget.style.background = 'rgba(255,255,255,.02)';
          }}
        >
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(0.65rem, 0.8vw, 0.8rem)',
            letterSpacing: '.08em',
            color: 'rgba(255,255,255,.3)',
            textTransform: 'uppercase',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.5,
              animation: 'sv-pd 2s ease-in-out infinite',
            }} />
            MUY IMPORTANTE
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.5,
              animation: 'sv-pd 2s ease-in-out infinite',
            }} />
          </p>
        </div>
      </div>

      {/* Keyframes para animaciones */}
      <style>{`
        @keyframes sv-ns {
          0% { background-position: 0 0; }
          33% { background-position: 20px -20px; }
          66% { background-position: -15px 10px; }
        }
        @keyframes sv-scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }
        @keyframes sv-pd {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .3; transform: scale(.6); }
        }
        @keyframes sv-bl2 {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};