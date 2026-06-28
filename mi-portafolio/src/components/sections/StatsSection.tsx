'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  number: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const stats: StatItem[] = [
  { number: 40, label: 'Proyectos realizados', suffix: '+' },
  { number: 20, label: 'Clientes satisfechos', suffix: '+' },
  { number: 8, label: 'Servicios disponibles', suffix: '+' },
  { number: 100, label: 'Soporte personalizado', suffix: '%' },
];

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    stats.forEach((stat, index) => {
      const target = stat.number;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, interval);
    });
  }, [isVisible]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const headerItems = section.querySelectorAll('.stats-header-item');

    gsap.set(headerItems, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotationX: -20,
      filter: 'blur(4px)',
    });

    gsap.set(statsRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: 'blur(3px)',
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

    tl.to(statsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      stagger: 0.1,
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
      {/* Efectos visuales (igual que ServicesSection) */}
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
        background: 'linear-gradient(90deg, transparent, #fff, transparent)',
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
        <div className="stats-header-item" style={{ marginBottom: 24 }}>
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
            Estadísticas
          </div>
        </div>

        {/* Título centrado */}
        <h2
          ref={titleRef}
          className="stats-header-item"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: '.92',
            letterSpacing: '-.04em',
            color: '#fff',
            perspective: '800px',
            margin: '0 0 8px',
            textAlign: 'center',
          }}
        >
          CONFIANZA<br />
          <span style={{
            WebkitTextStroke: '2.5px #06b6d4',
            color: 'transparent',
          }}>
            RESPALDADA
          </span>
        </h2>

        {/* Línea decorativa centrada */}
        <div className="stats-header-item" style={{ marginBottom: 48 }}>
          <span style={{
            display: 'block',
            width: 60,
            height: '1px',
            background: 'rgba(255,255,255,.4)',
            margin: '0 auto',
          }} />
        </div>

        {/* Grid de estadísticas centrado */}
        <div
          className="sv-grid-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            width: '100%',
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => { statsRef.current[index] = el; }}
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: '16px',
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color .35s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)';
              }}
            >
              {/* Esquinas decorativas */}
              <div style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                opacity: .2,
                top: '7px',
                left: '7px',
                borderTop: '1px solid #fff',
                borderLeft: '1px solid #fff',
              }} />
              <div style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                opacity: .2,
                top: '7px',
                right: '7px',
                borderTop: '1px solid #fff',
                borderRight: '1px solid #fff',
              }} />
              <div style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                opacity: .2,
                bottom: '7px',
                left: '7px',
                borderBottom: '1px solid #fff',
                borderLeft: '1px solid #fff',
              }} />
              <div style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                opacity: .2,
                bottom: '7px',
                right: '7px',
                borderBottom: '1px solid #fff',
                borderRight: '1px solid #fff',
              }} />

              {/* Número con contador */}
              <div style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-.02em',
                lineHeight: 1,
                marginBottom: 8,
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                <span style={{ 
                  background: 'linear-gradient(135deg, #fff 60%, rgba(255,255,255,.5))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.prefix}{counts[index]}{stat.suffix}
                </span>
              </div>

              {/* Línea separadora */}
              <div style={{
                width: 32,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                margin: '8px auto 12px',
                transition: 'width .3s ease',
              }} />

              {/* Etiqueta */}
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
                letterSpacing: '.08em',
                color: 'rgba(255,255,255,.4)',
                textTransform: 'uppercase',
                margin: 0,
                lineHeight: 1.4,
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

     
    </section>
  );
};