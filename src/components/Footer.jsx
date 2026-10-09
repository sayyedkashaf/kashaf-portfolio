import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Heart 
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-top-row" data-reveal>
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="brand-logo-row">
              <div className="brand-icon">
                <Terminal size={18} />
              </div>
              <span className="brand-text">Sayyed Kashaf<span className="brand-dot">.</span></span>
            </div>
            <p className="footer-tagline">
              B.Sc. Data Science Student &bull; SDBI Mumbai University
            </p>
            <p className="footer-subtext">
              Building practical projects across data analysis, AI, backend development, and cybersecurity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-nav">
            <h4 className="footer-heading">Navigation</h4>
            <div className="footer-links-grid">
              <a href="#about" className="footer-link">About</a>
              <a href="#focus" className="footer-link">Current Focus</a>
              <a href="#education" className="footer-link">Timeline</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#skills" className="footer-link">Skills</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="footer-connect">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social-row">
              <a
                href="https://github.com/sayyedkashaf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/kashaf-sayyed-712635379"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:kashafsayyed2008@gmail.com"
                className="footer-social-btn"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>

        </div>

        <div className="footer-bottom-row" data-reveal style={{ '--rd': '120ms' }}>
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Sayyed Kashaf. Designed &amp; built with modern React &amp; Vite.
          </p>
          <div className="footer-meta-status">
            <span className="footer-status-dot"></span>
            <span>All code publicly verified on GitHub</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
