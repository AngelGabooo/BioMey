'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- Importar usePathname
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// En Navbar.tsx
const navItems = [
  { name: 'Sobre mí',   href: '#sobre-mi',   isExternal: false },
  { name: 'Servicios',  href: '#servicios',  isExternal: false },
  { name: 'Servicios+', href: '/servicios', isExternal: true },
  { name: 'Portafolio', href: '#portafolio', isExternal: false },
  { name: 'Precios',    href: '#precios',    isExternal: false },
  { name: 'Contacto',   href: '#contacto',   isExternal: false },
];

export const Navbar = () => {
  const pathname = usePathname(); // <-- Hook para saber en qué página estamos
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navBlur = useTransform(scrollY, [0, 80], [8, 20]);

  // ── Detectar qué enlace está activo según la ruta ──
  useEffect(() => {
    // Si estamos en la página de servicios adicionales
    if (pathname === '/servicios-plus') {
      const idx = navItems.findIndex(item => item.href === '/servicios-plus');
      if (idx !== -1) setActiveIndex(idx);
    } else {
      // En el home, detectar por scroll
      const handleScroll = () => {
        const sections = navItems
          .filter(item => !item.isExternal)
          .map(item => document.querySelector(item.href))
          .filter(Boolean);

        if (sections.length === 0) return;

        let currentIndex = -1;
        let minDistance = Infinity;

        navItems.forEach((item, index) => {
          if (item.isExternal) return;
          const element = document.querySelector(item.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              currentIndex = index;
            }
          }
        });

        if (currentIndex !== -1 && minDistance < window.innerHeight * 0.6) {
          setActiveIndex(currentIndex);
        }
      };

      const rafId = requestAnimationFrame(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
      });

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [pathname]);

  // ── scroll state ──
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  // ── magnetic glow ──
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  // ── Variantes de animación para el navbar ──
  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    }
  };

  // ── Manejador de click en enlaces ──
  const handleLinkClick = (index: number, item: typeof navItems[0], e: React.MouseEvent) => {
    // Si es un enlace externo (página separada), dejar que Next.js maneje la navegación
    if (item.isExternal) {
      setIsOpen(false);
      return; // Dejar que el Link maneje la navegación
    }

    e.preventDefault();
    setActiveIndex(index);
    setIsOpen(false);
    
    const target = document.querySelector(item.href);
    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.div
        className="nb2-root nb2-wrap"
        ref={wrapRef}
        variants={navbarVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: '18px 24px',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <motion.div
          className={`nb2-pill${scrolled ? ' scrolled' : ''}`}
          style={{
            backdropFilter: `blur(${navBlur}px)`,
            WebkitBackdropFilter: `blur(${navBlur}px)`,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'all' : 'none',
          } as React.CSSProperties}
          transition={{ duration: 0.3 }}
        >
          {/* backgrounds */}
          <div className="nb2-pill-grid" />
          <div
            className="nb2-glow"
            style={{ '--mx': `${mousePos.x}px`, '--my': `${mousePos.y}px` } as React.CSSProperties}
          />
          <div className="nb2-shine" />

          {/* Logo */}
          <Link href="/" className="nb2-logo" onClick={() => {
            setActiveIndex(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <div className="nb2-logo-mark">B/</div>
            <span className="nb2-logo-text">BIOMEY</span>
          </Link>

          {/* Desktop links */}
          <div className="nb2-links">
            {navItems.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nb2-link${activeIndex === i ? ' active' : ''}`}
                onClick={(e) => handleLinkClick(i, item, e)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="nb2-right">
            <div className="nb2-status">
              <div className="nb2-pulse" />
              Disponible
            </div>
            <Link 
              href="#contacto" 
              className="nb2-cta"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#contacto');
                if (target) {
                  const navbarHeight = 80;
                  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
              }}
            >
              Hablemos
              <span className="nb2-cta-arrow">→</span>
            </Link>
            <button
              className="nb2-ham"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nb2-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="nb2-drawer-grid" />
            <div className="nb2-drawer-shine" />

            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.4, ease: 'easeOut' }}
              >
                <Link
                  href={item.href}
                  className="nb2-m-link"
                  onClick={(e) => {
                    // Si es un enlace externo, dejar que Next.js maneje la navegación
                    if (item.isExternal) {
                      setIsOpen(false);
                      return;
                    }
                    
                    e.preventDefault();
                    setActiveIndex(i);
                    setIsOpen(false);
                    const target = document.querySelector(item.href);
                    if (target) {
                      const navbarHeight = 80;
                      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="nb2-m-link-num">{(i + 1).toString().padStart(2, '0')}</span>
                  <span className="nb2-m-link-name">{item.name}</span>
                  <span className="nb2-m-link-arr">→</span>
                </Link>
              </motion.div>
            ))}

            <div className="nb2-m-footer">
              <div className="nb2-m-footer-pulse" />
              <span className="nb2-m-footer-text">Disponible para proyectos</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;

