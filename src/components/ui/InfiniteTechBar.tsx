'use client';

import { useEffect, useRef } from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiHtml5,
  SiGit,
  SiGithub,
  SiVercel,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiRust,
  SiGo,
  SiSwift,
  SiKotlin,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiDeno,
  SiBun,
  SiPrisma,
  SiSupabase,
  SiRedis,
  SiElasticsearch,
  SiKubernetes,
  SiTerraform,
  SiGooglecloud,
} from 'react-icons/si';
import { 
  FaJava,
  FaPhp,
  FaAws
} from 'react-icons/fa';

interface TechIcon {
  icon: React.ElementType;
  name: string;
  color: string;
  category: string;
}

const techIcons: TechIcon[] = [
  // Frontend
  { icon: SiReact, name: 'React', color: '#61DAFB', category: 'Frontend' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000', category: 'Frontend' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', category: 'Frontend' },
  { icon: SiVuedotjs, name: 'Vue.js', color: '#4FC08D', category: 'Frontend' },
  { icon: SiAngular, name: 'Angular', color: '#DD0031', category: 'Frontend' },
  { icon: SiSvelte, name: 'Svelte', color: '#FF3E00', category: 'Frontend' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4', category: 'Frontend' },
  { icon: SiHtml5, name: 'HTML5', color: '#E34F26', category: 'Frontend' },
  
  // Backend
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933', category: 'Backend' },
  { icon: SiPython, name: 'Python', color: '#3776AB', category: 'Backend' },
  { icon: FaJava, name: 'Java', color: '#007396', category: 'Backend' },
  { icon: FaPhp, name: 'PHP', color: '#777BB4', category: 'Backend' },
  { icon: SiRust, name: 'Rust', color: '#000000', category: 'Backend' },
  { icon: SiGo, name: 'Go', color: '#00ADD8', category: 'Backend' },
  { icon: SiDeno, name: 'Deno', color: '#000000', category: 'Backend' },
  { icon: SiBun, name: 'Bun', color: '#FBF0DF', category: 'Backend' },
  
  // Mobile
  { icon: SiSwift, name: 'Swift', color: '#FA7343', category: 'Mobile' },
  { icon: SiKotlin, name: 'Kotlin', color: '#7F52FF', category: 'Mobile' },
  
  // Database
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248', category: 'Database' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1', category: 'Database' },
  { icon: SiRedis, name: 'Redis', color: '#DC382D', category: 'Database' },
  { icon: SiElasticsearch, name: 'Elastic', color: '#005571', category: 'Database' },
  { icon: SiPrisma, name: 'Prisma', color: '#2D3748', category: 'Database' },
  { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E', category: 'Database' },
  
  // DevOps & Cloud
  { icon: SiDocker, name: 'Docker', color: '#2496ED', category: 'DevOps' },
  { icon: SiKubernetes, name: 'K8s', color: '#326CE5', category: 'DevOps' },
  { icon: SiTerraform, name: 'Terraform', color: '#7B42BC', category: 'DevOps' },
  { icon: FaAws, name: 'AWS', color: '#FF9900', category: 'Cloud' },
  { icon: SiGooglecloud, name: 'GCP', color: '#4285F4', category: 'Cloud' },
  
  // Tools
  { icon: SiGit, name: 'Git', color: '#F05032', category: 'Tools' },
  { icon: SiGithub, name: 'GitHub', color: '#181717', category: 'Tools' },
  { icon: SiVercel, name: 'Vercel', color: '#000000', category: 'Tools' },
  { icon: SiFirebase, name: 'Firebase', color: '#FFCA28', category: 'Tools' },
  { icon: SiGraphql, name: 'GraphQL', color: '#E10098', category: 'Tools' },
];

const categoryColors: Record<string, string> = {
  Frontend: '#E8F5FE',
  Backend: '#E8F5E9',
  Mobile: '#FCE4EC',
  Database: '#E3F2FD',
  DevOps: '#EDE7F6',
  Cloud: '#FFF3E0',
  Tools: '#F5F5F5',
};

const categoryBorderColors: Record<string, string> = {
  Frontend: '#61DAFB',
  Backend: '#4CAF50',
  Mobile: '#E91E63',
  Database: '#2196F3',
  DevOps: '#7B1FA2',
  Cloud: '#FF9800',
  Tools: '#9E9E9E',
};

export const InfiniteTechBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Duplicar el contenido para efecto infinito
    const content = scrollContainer.innerHTML;
    scrollContainer.innerHTML = content + content + content;

    let animationId: number;
    let position = 0;
    const speed = 0.6; // Velocidad ajustable

    const animate = () => {
      position -= speed;
      
      const totalWidth = scrollContainer.scrollWidth / 3;
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      
      scrollContainer.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    // Iniciar animación inmediatamente
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-8 border-y border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium text-gray-400 tracking-wider uppercase">
          Tecnologías que utilizo
        </h3>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-2" />
      </div>

      {/* Efecto de degradado en los bordes - Siempre visible */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      
      {/* Contenedor del scroll infinito - SIN pausa al hover */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-6 whitespace-nowrap will-change-transform select-none"
        style={{ width: 'max-content' }}
      >
        {techIcons.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="group relative flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${categoryColors[tech.category]} 0%, transparent 100%)`,
              border: `1px solid ${categoryBorderColors[tech.category]}20`,
            }}
          >
            <div className="relative">
              <div 
                className="w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ color: tech.color }}
              >
                <tech.icon className="w-8 h-8" />
              </div>
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                style={{ background: tech.color }}
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-medium text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider">
                {tech.category}
              </span>
            </div>

            {/* Hover tooltip con más info */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-gray-900 text-white text-[10px] px-3 py-1 rounded-lg whitespace-nowrap font-medium">
                {tech.name} • {tech.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con contador */}
      <div className="text-center mt-6">
        <span className="text-xs text-gray-400 font-medium tracking-wider">
          {techIcons.length}+ tecnologías en mi stack
        </span>
      </div>
    </div>
  );
};