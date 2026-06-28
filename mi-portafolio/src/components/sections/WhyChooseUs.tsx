'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Rocket, 
  Shield, 
  MessageCircle, 
  Smartphone, 
  LifeBuoy, 
  Sparkles,
  CheckCircle2,
  Zap,
  Users,
  Star
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    icon: Rocket,
    title: 'Entrega rápida',
    description: 'Cumplimos con los tiempos acordados sin sacrificar la calidad de tu proyecto.',
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
  },
  {
    icon: Shield,
    title: 'Garantía en nuestros trabajos',
    description: 'Respaldamos cada proyecto con garantía. Si algo no funciona, lo solucionamos.',
    color: '#8b5cf6',
    gradient: 'from-purple-500/20 to-purple-600/5',
  },
  {
    icon: MessageCircle,
    title: 'Atención personalizada',
    description: 'Te escuchamos y adaptamos cada solución a tus necesidades específicas.',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-amber-600/5',
  },
  {
    icon: Smartphone,
    title: 'Diseño adaptable',
    description: 'Tu sitio se verá perfecto en cualquier dispositivo: celular, tablet o computadora.',
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-pink-600/5',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte post-entrega',
    description: 'No desaparecemos después de entregar. Te acompañamos con soporte continuo.',
    color: '#22c55e',
    gradient: 'from-green-500/20 to-green-600/5',
  },
  {
    icon: Sparkles,
    title: 'Tecnología moderna',
    description: 'Usamos las herramientas más actuales para que tu proyecto esté a la vanguardia.',
    color: '#f97316',
    gradient: 'from-orange-500/20 to-orange-600/5',
  },
];

export const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    if (!sec) return;

    // ── Animación de entrada ──
    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(cardsRef.current, { opacity: 0, y: 50, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
      .to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.5)',
      }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
   
      <section ref={sectionRef} className="why-root" id="por-que-elegirnos">
        <div className="why-bg" />

        <div className="why-container">
          {/* Badge */}
          <div className="why-badge">
            <span className="why-dot" />
            {'<'}/{'>'} ¿Por qué elegirnos?
          </div>

          {/* Título con "EXCEPCIONAL" en celeste */}
          <h2 ref={titleRef} className="why-title">
            LO QUE AL TRABAJAR CON NOSOTROS
            <span className="line2">GANAS</span>
          </h2>

          <p ref={subtitleRef} className="why-sub">
            Beneficios que marcan la diferencia en tu proyecto y tu experiencia.
          </p>

          {/* Grid */}
          <div ref={gridRef} className="why-grid">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isFirst = index === 0;

              return (
                <div
                  key={index}
                  ref={el => { cardsRef.current[index] = el; }}
                  className="why-card"
                  style={{ '--card-color': reason.color } as React.CSSProperties}
                >
                  {isFirst && <span className="why-card-popular">⭐ Destacado</span>}

                  <div
                    className="why-card-icon"
                    style={{ background: `${reason.color}18`, border: `1px solid ${reason.color}30` }}
                  >
                    <Icon size={22} style={{ color: reason.color }} />
                  </div>

                  <h3 className="why-card-title">{reason.title}</h3>
                  <p className="why-card-desc">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};