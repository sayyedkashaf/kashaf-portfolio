import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { timelineData } from '../data/experience';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div 
        className="resume-modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Sayyed Kashaf Academic CV"
      >
        {/* Modal Controls Bar */}
        <div className="resume-modal-bar">
          <span className="resume-modal-title">Curriculum Vitae Preview</span>
          <div className="resume-bar-actions">
            <button
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close CV preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="resume-sheet">
          {/* Header */}
          <header className="resume-doc-header">
            <div>
              <h1 className="doc-name">Sayyed Kashaf</h1>
              <p className="doc-role">B.Sc. Data Science Student &bull; SDBI, Mumbai University</p>
              <div className="doc-contact-line">
                <span><MapPin size={13} /> Mumbai, India</span>
                <span>&bull;</span>
                <a href="mailto:kashafsayyed2008@gmail.com"><Mail size={13} /> kashafsayyed2008@gmail.com</a>
                <span>&bull;</span>
                <a href="https://github.com/sayyedkashaf" target="_blank" rel="noreferrer"><Github size={13} /> github.com/sayyedkashaf</a>
                <span>&bull;</span>
                <a href="https://www.linkedin.com/in/kashaf-sayyed-712635379" target="_blank" rel="noreferrer"><Linkedin size={13} /> LinkedIn</a>
              </div>
            </div>
          </header>

          <hr className="doc-divider" />

          {/* Education */}
          <section className="doc-section">
            <h2 className="doc-section-title">Education</h2>
            <div className="doc-item">
              <div className="doc-item-row">
                <span className="doc-item-title">B.Sc. in Data Science</span>
                <span className="doc-item-date">2025 — 2028 (Expected)</span>
              </div>
              <div className="doc-item-sub">SDBI &bull; Mumbai University, Mumbai</div>
              <p className="doc-item-text">
                Foundational studies in Mathematical Statistics, Probability, Python Programming, 
                Data Structures, Database Management Systems (SQL), Data Analysis, and Machine Learning concepts.
              </p>
            </div>
          </section>

          {/* Key Projects */}
          <section className="doc-section">
            <h2 className="doc-section-title">Featured Technical Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="doc-item">
                <div className="doc-item-row">
                  <span className="doc-item-title">{proj.title}</span>
                  <a href={proj.github} target="_blank" rel="noreferrer" className="doc-github-link">
                    GitHub Repo <ExternalLink size={11} />
                  </a>
                </div>
                <div className="doc-item-tech">Technologies: {proj.technologies.join(', ')}</div>
                <p className="doc-item-text">{proj.description}</p>
                <ul className="doc-bullets">
                  {proj.highlights?.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Technical Skills */}
          <section className="doc-section">
            <h2 className="doc-section-title">Technical Competencies</h2>
            <div className="doc-skills-grid">
              {skillGroups.map((group, idx) => (
                <div key={idx} className="doc-skill-line">
                  <span className="doc-skill-label">{group.title}:</span>
                  <span className="doc-skill-items">
                    {group.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Current Focus */}
          <section className="doc-section">
            <h2 className="doc-section-title">Active Learning Focus</h2>
            <p className="doc-item-text">
              Strengthening Python data engineering, advanced SQL queries, Power BI visual narratives, 
              RESTful APIs with FastAPI, and defensive cybersecurity mechanisms.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
