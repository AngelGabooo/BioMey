'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Code2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiTailwindcss,
  SiVercel,
  SiFigma
} from 'react-icons/si';

const navItems = [
  { name: 'Sobre mí', href: '/sobre-mi' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Portafolio', href: '/portafolio' },
  { name: 'Videos', href: '#videos' },
  { name: 'Precios', href: '/precios' },
  { name: 'Contacto', href: '/contacto' },
];

const techIcons = [
  { icon: SiReact, color: '#61DAFB', label: 'React' },
  { icon: SiNextdotjs, color: '#000000', label: 'Next.js' },
  { icon: SiTypescript, color: '#3178C6', label: 'TypeScript' },
  { icon: SiNodedotjs, color: '#339933', label: 'Node.js' },
  { icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind' },
  { icon: SiVercel, color: '#000000', label: 'Vercel' },
  { icon: SiFigma, color: '#F24E1E', label: 'Figma' },
];

export const NavbarWithLogos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-700',
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' 
          : 'bg-black/80 backdrop-blur-md border-b border-white/5'
      )}
      onMouseEnter={() => setIsHoveringNav(true)}
      onMouseLeave={() => setIsHoveringNav(false)}
    >
      {/* Efecto de brillo sutil en la parte superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Efecto de scanline sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }} />
      </div>

      {/* Contenido del navbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo mejorado */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group relative"
          >
            {/* Iconos tecnológicos con mejor animación */}
            <div className="flex items-center gap-1.5">
              {techIcons.slice(0, 3).map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 0.8 }}
                  animate={{ 
                    y: [0, -6, 0],
                    opacity: isHoveringNav ? 1 : 0.7,
                  }}
                  transition={{ 
                    duration: 2.5 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                  className="relative"
                  onMouseEnter={() => setHoveredIcon(i)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500",
                      hoveredIcon === i 
                        ? "scale-110 bg-white text-black shadow-lg shadow-white/20" 
                        : "bg-black/40 text-white/70 hover:bg-white/10"
                    )}
                    style={{ color: hoveredIcon === i ? 'black' : tech.color }}
                  >
                    <tech.icon className="w-4 h-4" />
                  </div>
                  {/* Efecto de brillo */}
                  {hoveredIcon === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.5 }}
                      className="absolute inset-0 rounded-full bg-white/20 blur-xl -z-10"
                    />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Nombre con efecto de luz */}
            <div className="relative">
              <span className="font-pixel text-xl md:text-2xl text-white tracking-wider group-hover:text-white/90 transition-colors duration-300">
                BIOMEY
              </span>
              {/* Línea de luz debajo del logo */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
            </div>

            {/* Badge flotante mejorado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute -top-3 -right-14 bg-white/10 backdrop-blur-sm text-white text-[8px] px-2.5 py-0.5 font-pixel border border-white/20 rounded-full flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              DEV
            </motion.div>
          </Link>

          {/* Desktop Menu mejorado */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-retro text-sm text-white/60 hover:text-white transition-all duration-300 tracking-wider relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/60 transition-all duration-300 group-hover:w-full" />
                <span className="absolute -bottom-1 left-0 w-full h-px bg-white/20 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </Link>
            ))}

            {/* Indicador de estado mejorado */}
            <div className="flex items-center gap-2 ml-4 px-3 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-retro text-[10px] text-white/40 tracking-wider">
                DISPONIBLE
              </span>
            </div>

            {/* Código decorativo */}
            <div className="hidden xl:flex items-center gap-1.5 text-white/20 font-mono text-[10px]">
              <span className="text-white/30">&lt;</span>
              <span className="text-white/40">/&gt;</span>
              <span className="text-white/30">code</span>
              <span className="text-white/30">&gt;</span>
            </div>
          </div>

          {/* Mobile Menu Button mejorado */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 border border-white/20 rounded-lg transition-all duration-300 relative z-20 group"
            aria-label="Toggle menu"
          >
            <span className="absolute inset-0 rounded-lg bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            {isOpen ? (
              <X size={24} className="relative z-10" />
            ) : (
              <Menu size={24} className="relative z-10" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu mejorado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 relative z-10"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 font-retro text-base text-white/60 hover:text-white hover:bg-white/5 px-4 rounded-lg border border-transparent hover:border-white/10 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Iconos de tecnología en móvil */}
              <div className="flex gap-2 pt-4 mt-2 border-t border-white/10">
                {techIcons.map((tech, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5"
                    style={{ color: tech.color }}
                  >
                    <tech.icon className="w-4 h-4" />
                  </div>
                ))}
              </div>

              {/* Estado en móvil */}
              <div className="flex items-center gap-2 pt-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-retro text-[10px] text-white/30 tracking-wider">
                  DISPONIBLE PARA PROYECTOS
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};