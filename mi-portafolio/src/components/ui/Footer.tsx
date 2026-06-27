'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // ── CANVAS para partículas (mismo que testimonios) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = footerRef.current?.offsetHeight || window.innerHeight;
    
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = footerRef.current?.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    
    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 0.8 + 0.2, a: Math.random() * 0.2 + 0.04,
    }));
    
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - d / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <>
     

      <footer ref={footerRef} className="footer-root">
        {/* Canvas de partículas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        
        {/* Fondos (igual que testimonios) */}
        <div className="footer-grid-bg" />
        <div className="footer-glow" />
        <div className="footer-noise" />
        <div className="footer-scanlines" />
        <div className="footer-topline" />
        <div className="footer-bline" />

        {/* Contenido */}
        <div className="footer-container">
          <div className="footer-content">
            {/* Logo y descripción */}
            <div className="footer-logo">
              <Link href="/" className="footer-logo-text">
                BIOMEY
              </Link>
              <p className="footer-desc">
                Transformando ideas en experiencias digitales extraordinarias.
              </p>
            </div>

            {/* Enlaces */}
            <div className="footer-links">
              <span className="footer-label">Enlaces</span>
              <div className="footer-links-group">
                {['Sobre mí', 'Servicios', 'Portafolio', 'Precios', 'Contacto'].map((item) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="footer-link"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="footer-social">
              <span className="footer-label">Redes</span>
              <div className="footer-social-group">
                {[
                  { Icon: Github, url: 'https://github.com' },
                  { Icon: Linkedin, url: 'https://linkedin.com' },
                  { Icon: Twitter, url: 'https://twitter.com' },
                ].map(({ Icon, url }, i) => (
                  <a 
                    key={i}
                    href={url}
                    className="footer-social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Red social ${i + 1}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* Bottom */}
          <div className="footer-bottom">
            <span className="footer-copy">
              © {currentYear} BIOMEY. Todos los derechos reservados.
            </span>
            <span className="footer-heart">
              Hecho con <Heart className="footer-heart-icon" /> desde México
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
