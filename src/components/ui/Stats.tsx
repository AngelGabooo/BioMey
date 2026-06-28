'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Cpu, Terminal, Users } from 'lucide-react';

const stats = [
  { number: '50+', label: 'PROYECTOS', icon: Code },
  { number: '100%', label: 'SATISFACCIÓN', icon: Cpu },
  { number: '24/7', label: 'SOPORTE', icon: Terminal },
];

export const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-mono text-gray-400">
            <span className="text-black">//</span> Estadísticas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="glassmorphism-light rounded-2xl p-8 text-center hover:bg-black/5 transition-all duration-300 group border border-black/5"
            >
              <stat.icon className="w-10 h-10 text-gray-400 mx-auto mb-4 group-hover:text-black transition-colors" />
              <div className="text-5xl font-bold text-black font-mono mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};