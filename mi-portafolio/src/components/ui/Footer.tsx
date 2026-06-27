'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  return (
    <>
      <footer ref={footerRef} className="footer-root">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <Link href="/" className="footer-logo-text">BIOMEY</Link>
              <p className="footer-desc">Transformando ideas en experiencias digitales extraordinarias.</p>
            </div>

            <div className="footer-links">
              <span className="footer-label">Enlaces</span>
              <div className="footer-links-group">
                <Link href="/#sobre-mi" className="footer-link">Sobre mí</Link>
                <Link href="/#servicios" className="footer-link">Servicios</Link>
                <Link href="/#portafolio" className="footer-link">Portafolio</Link>
                <Link href="/#precios" className="footer-link">Precios</Link>
                <Link href="/#contacto" className="footer-link">Contacto</Link>
              </div>
            </div>

            <div className="footer-social">
              <span className="footer-label">Redes</span>
              <div className="footer-social-group">
                <a href="#" className="footer-social-btn"><Github size={14} /></a>
                <a href="#" className="footer-social-btn"><Linkedin size={14} /></a>
                <a href="#" className="footer-social-btn"><Twitter size={14} /></a>
              </div>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <span className="footer-copy">© {currentYear} BIOMEY. Todos los derechos reservados.</span>
            <span className="footer-heart">Hecho con <Heart className="footer-heart-icon" /> desde México</span>
          </div>
        </div>
      </footer>
    </>
  );
};