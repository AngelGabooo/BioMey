'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MessageCircle, 
  Search, 
  FileText, 
  Palette, 
  Code, 
  Rocket, 
  LifeBuoy,
  CheckCircle2
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Cuéntanos tu idea',
    description: 'Comparte tu visión y necesidades con nosotros.',
    color: '#06b6d4',
  },
  {
    number: '02',
    icon: Search,
    title: 'Analizamos el proyecto',
    description: 'Estudiamos tu idea y definimos objetivos.',
    color: '#8b5cf6',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Enviamos cotización',
    description: 'Plan detallado con tiempos y costos.',
    color: '#f59e0b',
  },
  {
    number: '04',
    icon: Palette,
    title: 'Diseño',
    description: 'Creamos la interfaz visual de tu proyecto.',
    color: '#ec4899',
  },
  {
    number: '05',
    icon: Code,
    title: 'Desarrollo',
    description: 'Transformamos el diseño en código funcional.',
    color: '#22c55e',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Entrega',
    description: 'Lanzamos tu proyecto al mundo.',
    color: '#f97316',
  },
  {
    number: '07',
    icon: LifeBuoy,
    title: 'Soporte',
    description: 'Te acompañamos después de la entrega.',
    color: '#06b6d4',
  },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    if (!sec) return;

    // ── Animación de entrada ──
    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(stepsRef.current, { opacity: 0, y: 50, scale: 0.9 });

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
      .to(stepsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'back.out(1.5)',
      }, 0.3);

    // ── Animación de la línea ──
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, 
        { scaleX: 0, scaleY: 0, transformOrigin: 'left center top' },
        {
          scaleX: isMobile ? 1 : 1,
          scaleY: isMobile ? 1 : 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  // Convertir color hex a rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
  };

  return (
    <>
      

      <section ref={sectionRef} className="process-root" id="proceso">
        <div className="process-bg" />

        <div className="process-container">
          {/* Badge */}
          <div className="process-badge">
            <span className="process-dot" />
            {'<'}/{'>'} Cómo trabajamos
          </div>

          {/* Título con "EXCEPCIONAL" en celeste */}
          <h2 ref={titleRef} className="process-title">
            CÓMO
            <span className="line2">TRABAJAMOS</span>
          </h2>

          <p ref={subtitleRef} className="process-sub">
            Un proceso transparente y estructurado para llevar tu idea a la realidad.
          </p>

          {/* Timeline */}
          <div className="process-timeline">
            {/* Línea */}
            <div ref={lineRef} className="process-line">
              <div className="process-line-fill" />
            </div>

            {/* Pasos */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const rgb = hexToRgb(step.color);

              return (
                <div
                  key={index}
                  ref={el => { stepsRef.current[index] = el; }}
                  className="process-step"
                  style={{ '--step-color': step.color, '--step-color-rgb': rgb } as React.CSSProperties}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="process-step-number" style={{ borderColor: activeStep === index ? step.color : undefined }}>
                    <span className="step-number-text">{step.number}</span>
                    <Icon className="process-step-icon" size={isMobile ? 18 : 22} />
                  </div>

                  <div className="process-step-content">
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-desc">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};