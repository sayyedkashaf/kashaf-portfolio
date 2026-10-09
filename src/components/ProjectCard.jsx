import React, { useRef } from 'react';
import { Github, ExternalLink, Check, Sparkles, ShieldCheck, Server, Layers } from 'lucide-react';

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI / Data':
        return <Sparkles size={14} />;
      case 'Cybersecurity':
        return <ShieldCheck size={14} />;
      case 'Development':
        return <Server size={14} />;
      default:
        return <Layers size={14} />;
    }
  };

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${(py - 0.5) * -3}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 3}deg`);
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="project-card glass-card tilt-card"
      data-reveal
      style={{ '--rd': `${(index % 3) * 110}ms` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="project-card-inner">

        <div className="project-header">
          <span className="project-badge">
            {getCategoryIcon(project.category)}
            <span>{project.badge}</span>
          </span>

          <div className="project-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link-btn"
              title={`View ${project.title} source code on GitHub`}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        <h3 className="project-title">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>
        <p className="project-tagline">{project.tagline}</p>

        <p className="project-description">{project.description}</p>

        {project.highlights && (
          <div className="project-highlights">
            <span className="highlights-label">Architecture Highlights:</span>
            <ul className="project-highlights-list">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="project-hl-item">
                  <Check size={14} className="hl-bullet-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-tech-tags">
          {project.technologies.map((tech, idx) => (
            <span key={idx} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-footer">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm project-btn"
          >
            <Github size={15} />
            <span>Verify Repository</span>
            <ExternalLink size={13} className="ext-icon" />
          </a>
        </div>

      </div>
    </article>
  );
}