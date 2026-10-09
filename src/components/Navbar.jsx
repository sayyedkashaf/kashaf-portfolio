import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText, Github, Linkedin, Terminal } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Focus', href: '#focus' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      // Slide in only after the hero showcase has scrolled out of view
      const hero = document.getElementById('hero');
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
      setIsVisible(y > heroBottom - Math.min(140, window.innerHeight * 0.2));

      // Scrollspy calculation
      const sections = ['about', 'focus', 'education', 'projects', 'skills', 'contact'];
      const scrollPosition = y + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('hero');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`navbar-wrapper ${isVisible ? 'visible' : ''} ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container nav-container">
        {/* Brand / Logo */}
        <a href="#hero" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon">
            <Terminal size={18} />
          </div>
          <span className="brand-text">
            Sayyed Kashaf<span className="brand-dot">.</span>
          </span>
          <span className="brand-tag">Data Science</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Main Navigation">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.name}
                {isActive && <span className="active-indicator" />}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons (Theme, Resume, Socials) */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <a
            href="https://github.com/sayyedkashaf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="Sayyed Kashaf's GitHub Profile"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/kashaf-sayyed-712635379"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="Sayyed Kashaf's LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>

          <button
            onClick={onOpenResume}
            className="btn btn-secondary btn-sm resume-btn"
            aria-label="View Academic Resume"
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="container mobile-nav-content">
          <div className="mobile-links-list">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn btn-primary btn-sm mobile-resume-action"
            >
              <FileText size={16} />
              <span>View Academic CV</span>
            </button>
            <div className="mobile-social-row">
              <a
                href="https://github.com/sayyedkashaf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kashaf-sayyed-712635379"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
