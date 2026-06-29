'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/ui/Hero';
import { InfiniteTechBar } from '@/components/ui/InfiniteTechBar';
import { Footer } from '@/components/ui/Footer';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

// Componente de carga (skeleton)
const SectionLoader = () => (
  <div className="w-full py-20 px-4 bg-black">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-white/5 rounded mx-auto mb-8" />
        <div className="h-16 w-96 bg-white/5 rounded mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/5 rounded" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Componente wrapper con Intersection Observer
const LazySection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{isVisible ? children : <SectionLoader />}</div>;
};

// Carga dinámica de secciones
const ServicesSection = dynamic(
  () => import('@/components/sections/ServicesSection').then((mod) => mod.default || mod.ServicesSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const FeaturedExtraServices = dynamic(
  () => import('@/components/sections/FeaturedExtraServices').then((mod) => mod.default || mod.FeaturedExtraServices),
  { loading: () => <SectionLoader />, ssr: false }
);

const WhyChooseUs = dynamic(
  () => import('@/components/sections/WhyChooseUs').then((mod) => mod.default || mod.WhyChooseUs),
  { loading: () => <SectionLoader />, ssr: false }
);

const ProcessSection = dynamic(
  () => import('@/components/sections/ProcessSection').then((mod) => mod.default || mod.ProcessSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const StatsSection = dynamic(
  () => import('@/components/sections/StatsSection').then((mod) => mod.default || mod.StatsSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const PortfolioSection = dynamic(
  () => import('@/components/sections/PortfolioSection').then((mod) => mod.default || mod.PortfolioSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const PricingSection = dynamic(
  () => import('@/components/sections/PricingSection').then((mod) => mod.default || mod.PricingSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const CoverageSection = dynamic(
  () => import('@/components/sections/CoverageSection').then((mod) => mod.default || mod.CoverageSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const PaymentMethodsSection = dynamic(
  () => import('@/components/sections/PaymentMethodsSection').then((mod) => mod.default || mod.PaymentMethodsSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection').then((mod) => mod.default || mod.FAQSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((mod) => mod.default || mod.AboutSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then((mod) => mod.default || mod.TestimonialsSection),
  { loading: () => <SectionLoader />, ssr: false }
);

const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then((mod) => mod.default || mod.ContactSection),
  { loading: () => <SectionLoader />, ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      {/* 1. Entrada principal */}
      <Hero />
      <InfiniteTechBar />

      {/* 2. Qué ofreces */}
      <ServicesSection />
      <FeaturedExtraServices />

      {/* 3. Por qué confiar en ti */}
      <LazySection>
        <WhyChooseUs />
      </LazySection>

      {/* 4. Cómo trabajas */}
      <LazySection>
        <ProcessSection />
      </LazySection>

      {/* 5. Números / confianza rápida */}
      <LazySection>
        <StatsSection />
      </LazySection>

      {/* 6. Evidencia de trabajo */}
      <LazySection>
        <PortfolioSection />
      </LazySection>

      {/* 7. Precios */}
      <LazySection>
        <PricingSection />
      </LazySection>

      {/* 8. Cobertura */}
      <LazySection>
        <CoverageSection />
      </LazySection>

      {/* 9. Métodos de pago */}
      <LazySection>
        <PaymentMethodsSection />
      </LazySection>

      {/* 10. Dudas frecuentes */}
      <LazySection>
        <FAQSection />
      </LazySection>

      {/* 11. Presentación personal */}
      <LazySection>
        <AboutSection />
      </LazySection>

      {/* 12. Opiniones */}
      <LazySection>
        <TestimonialsSection />
      </LazySection>

      {/* 13. Contacto */}  
      <LazySection>
        <ContactSection />
      </LazySection>

      <Footer />
    </main>
  );
}