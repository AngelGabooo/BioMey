'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: '¿Cuánto tarda una página web?',
    answer: 'El tiempo de entrega depende del tipo de proyecto. Una landing page puede estar lista en 3-5 días, mientras que un sitio web más completo puede tomar de 7 a 15 días. Siempre acordamos plazos realistas y te mantenemos informado durante todo el proceso.',
    category: 'general',
  },
  {
    question: '¿Aceptan anticipo?',
    answer: 'Sí, para iniciar cualquier proyecto solicitamos un anticipo del 50% del costo total. El 50% restante se liquida al momento de la entrega final del proyecto. Esto nos permite asegurar el compromiso y comenzar a trabajar de inmediato.',
    category: 'pagos',
  },
  {
    question: '¿Entregan factura?',
    answer: 'Sí, emitimos factura fiscal (CFDI) con todos los requisitos legales. Solo necesitamos tus datos fiscales (RFC, razón social, régimen, etc.) para generar el comprobante correspondiente.',
    category: 'pagos',
  },
  {
    question: '¿Puedo pagar en partes?',
    answer: 'Claro. Aceptamos pagos en parcialidades según lo acordemos en la cotización. El plan de pago se establece de común acuerdo, adaptándonos a tus necesidades. Generalmente manejamos: 50% de anticipo y 50% al finalizar.',
    category: 'pagos',
  },
  {
    question: '¿Trabajan fuera de Chiapas?',
    answer: 'Sí, trabajamos con clientes de toda la República Mexicana e incluso del extranjero. Todo el proceso se maneja de forma remota: reuniones por videollamada, entregas digitales y comunicación constante por WhatsApp o correo.',
    category: 'general',
  },
  {
    question: '¿Incluye dominio?',
    answer: 'El dominio no está incluido en el costo base, pero podemos asesorarte para que elijas el mejor dominio para tu negocio y ayudarte con la compra y configuración. El costo del dominio varía según la extensión (.com, .mx, etc.).',
    category: 'hosting',
  },
  {
    question: '¿Incluye hosting?',
    answer: 'Ofrecemos hosting con un costo adicional muy accesible. Incluye alojamiento seguro, respaldos automáticos y soporte técnico. También podemos trabajar con tu proveedor de hosting actual si ya tienes uno.',
    category: 'hosting',
  },
  {
    question: '¿Ofrecen garantía?',
    answer: 'Sí, todos nuestros trabajos cuentan con garantía por 30 días después de la entrega. Durante este periodo, corregimos cualquier error o problema que pueda surgir sin costo adicional. Además, ofrecemos soporte extendido con costo preferencial.',
    category: 'general',
  },
  {
    question: '¿Qué información necesitan para empezar?',
    answer: 'Para iniciar necesitamos: 1) Una descripción clara de tu proyecto, 2) Referencias visuales (sitios que te gusten), 3) Contenido básico (textos, imágenes, logos), 4) Tus datos de contacto y preferencias de comunicación.',
    category: 'general',
  },
  {
    question: '¿Trabajan con diseños preexistentes?',
    answer: 'Sí, podemos trabajar con diseños que ya tengas. También podemos rediseñar tu sitio actual si ya cuentas con una página web que necesite actualización. El costo se ajusta según el alcance del trabajo.',
    category: 'general',
  },
  {
    question: '¿Pueden integrar redes sociales?',
    answer: 'Sí, podemos integrar tus redes sociales (Facebook, Instagram, TikTok, WhatsApp, YouTube, etc.) en tu sitio web. También configuramos botones de compartir y feeds sociales para mantener tu contenido actualizado.',
    category: 'general',
  },
];

const categories = [
  { id: 'todos', label: 'Todas' },
  { id: 'general', label: 'Generales' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'hosting', label: 'Hosting & Dominio' },
];

export const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredFaqs = activeFilter === 'todos' 
    ? faqs 
    : faqs.filter(f => f.category === activeFilter);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    if (!sec) return;

    // ── Animación de entrada ──
    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(faqRefs.current, { opacity: 0, y: 30 });

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
      .to(faqRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
 
      <section ref={sectionRef} className="faq-root" id="faq">
        <div className="faq-bg" />

        <div className="faq-container">
          {/* Badge */}
          <div className="faq-badge">
            <span className="faq-dot" />
            {'<'}/{'>'} Preguntas frecuentes
          </div>

          {/* Título */}
         <h2 ref={titleRef} className="faq-title">
  RESOLVEMOS TUS{' '}
  <span 
    className="accent"
    style={{ 
      WebkitTextStroke: '2.5px #06b6d4', 
      color: 'transparent',
      WebkitTextFillColor: 'transparent',
      paintOrder: 'stroke fill'
    }}
  >
    DUDAS
  </span>
</h2>

          {/* Filtros */}
          <div className="faq-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`faq-filter${activeFilter === cat.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div>
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                ref={el => { faqRefs.current[index] = el; }}
                className="faq-item"
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span className="faq-question-text">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`faq-icon${openIndex === index ? ' open' : ''}`}
                  />
                </div>
                <div className={`faq-answer${openIndex === index ? ' open' : ''}`}>
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Si no hay resultados */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle size={40} className="mx-auto text-white/10 mb-4" />
              <p className="text-white/30 font-mono text-sm">
                No hay preguntas en esta categoría aún.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};