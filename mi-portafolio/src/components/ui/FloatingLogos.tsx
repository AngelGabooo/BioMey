'use client';

import { useEffect, useRef, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiVercel,
  SiFirebase,
  SiMongodb,
  SiPostgresql
} from 'react-icons/si';
import { 
  FaJava,
  FaPhp,
  FaSwift,
  FaDocker
} from 'react-icons/fa';

interface FloatingLogo {
  id: number;
  icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  delay: number;
}

const logos = [
  { icon: SiReact, color: '#61DAFB' },
  { icon: SiNextdotjs, color: '#000000' },
  { icon: SiTypescript, color: '#3178C6' },
  { icon: SiJavascript, color: '#F7DF1E' },
  { icon: SiNodedotjs, color: '#339933' },
  { icon: SiPython, color: '#3776AB' },
  { icon: SiTailwindcss, color: '#06B6D4' },
  { icon: SiHtml5, color: '#E34F26' },
  { icon: SiCss, color: '#1572B6' },
  { icon: SiGit, color: '#F05032' },
  { icon: SiGithub, color: '#181717' },
  { icon: SiVercel, color: '#000000' },
  { icon: SiFirebase, color: '#FFCA28' },
  { icon: SiMongodb, color: '#47A248' },
  { icon: SiPostgresql, color: '#4169E1' },
  { icon: FaJava, color: '#007396' },
  { icon: FaPhp, color: '#777BB4' },
  { icon: FaSwift, color: '#FA7343' },
  { icon: FaDocker, color: '#2496ED' },
];

export const FloatingLogos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const logosData: FloatingLogo[] = logos.map((logo, index) => ({
      id: index,
      icon: logo.icon,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 28 + Math.random() * 32,
      speed: 0.2 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      delay: Math.random() * 2,
    }));

    const elements: HTMLDivElement[] = [];

    logosData.forEach((logoData) => {
      const el = document.createElement('div');
      el.className = 'floating-logo';
      el.style.cssText = `
        position: absolute;
        left: ${logoData.x}%;
        top: ${logoData.y}%;
        font-size: ${logoData.size}px;
        opacity: 0.15;
        transform: rotate(${logoData.rotation}deg);
        transition: opacity 0.3s ease;
        pointer-events: none;
        animation: floatLogo ${15 + Math.random() * 10}s ease-in-out infinite;
        animation-delay: ${logoData.delay}s;
        z-index: 0;
      `;
      
      // Renderizar el ícono
      const Icon = logoData.icon;
      el.innerHTML = `<div style="color: ${logos[logoData.id].color};">${renderToStaticMarkup(createElement(Icon))}</div>`;
      
      container.appendChild(el);
      elements.push(el);

      // Animación de rotación continua
      let rotation = logoData.rotation;
      setInterval(() => {
        rotation += logoData.rotationSpeed;
        el.style.transform = `rotate(${rotation}deg)`;
      }, 50);
    });

    return () => {
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Estilos para la animación de flotación
const styles = `
  @keyframes floatLogo {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -40px) scale(1.1); }
    50% { transform: translate(-20px, -70px) scale(0.9); }
    75% { transform: translate(40px, -30px) scale(1.05); }
  }
`;

// Agregar estilos al head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}