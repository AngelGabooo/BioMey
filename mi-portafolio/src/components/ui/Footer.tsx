'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  return (
    <>
      <style>{`
        .footer-root {
          font-family: 'Space Grotesk', sans-serif;
          background: #000;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow: hidden;
        }

        .footer-container {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 28px 48px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .footer-logo {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-logo-text {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #fff;
          text-decoration: none;
        }

        .footer-desc {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.3);
          max-width: 240px;
          line-height: 1.8;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .footer-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 6px;
          width: 100%;
          text-align: center;
        }

        .footer-links-group {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
        }

        .footer-link {
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: rgba(255,255,255,0.8);
        }

        .footer-social {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .footer-social .footer-label {
          text-align: right;
        }

        .footer-social-group {
          display: flex;
          gap: 10px;
        }

        .footer-social-btn {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
          transition: all 0.25s;
          text-decoration: none;
          cursor: pointer;
        }

        .footer-social-btn:hover {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.08);
          color: #fff;
          transform: translateY(-2px);
        }

        .footer-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 8px 0 16px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
        }

        .footer-heart {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .footer-heart-icon {
          width: 12px;
          height: 12px;
          color: #ff6b6b;
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 32px 20px 36px;
          }
          .footer-content {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
          }
          .footer-logo {
            align-items: center;
          }
          .footer-desc {
            max-width: 100%;
          }
          .footer-social {
            align-items: center;
          }
          .footer-social .footer-label {
            text-align: center;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>

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
                <a href="https://github.com/AngelGabooo" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <span className="footer-copy">© {currentYear} BIOMEY. Todos los derechos reservados.</span>
            <span className="footer-heart">
              Hecho con <Heart className="footer-heart-icon" /> desde México
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};